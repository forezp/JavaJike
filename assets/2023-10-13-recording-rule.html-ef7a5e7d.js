import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as r,f as n}from"./app-7f6cebaf.js";const a={},l=n(`<p>prometheus支持两种规则表达式，一种是告警告警规则表达式，另外一种是预计算规则recording rule。recording rule是预先计算成本较高的表达式，并将计算结果保存在一组新的时间序列上。预先计算的结果通常它的查询速度要比每次执行原始表达式要快很多。</p><h2 id="定义recoding-rules" tabindex="-1"><a class="header-anchor" href="#定义recoding-rules" aria-hidden="true">#</a> 定义Recoding rules</h2><p>Prometheus会定时的根据拉取expr定时表达式的数据，并将数据的结果存储在新的时间序列中，新的序列名称为record中的值。如果expr表达式的计算结果包含标签，则会把标签添加到新的序列中，如果labels配置中含有额外的标签也会放到新的timeseries中。</p><p>和alert rule类似，每个Recording rule的规则定义如下：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>groups:
  - name: example
    rules:
    - record: job:http_inprogress_requests:sum
      expr: sum(http_inprogress_requests) by (job)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>rule_group可以配置两个参数：</p><ul><li>name，group的名称，需要全局唯一</li><li>interval, rule_group执行的时间间隔，如果没有配置，则默认是global.evaluation_interval</li></ul><p>Groups.rules选项是recording-rule的具体配置，可以有以下几个配置项：</p><ul><li><p>record ： expr执行后生成新的指标的名称，指标名称的定义可以参考下面一小节</p></li><li><p>expr：具体预处理生成指标的表达式。</p></li><li><p>labels：可以在新生成的指标上额外加一些标签。</p></li></ul><p>记录和告警规则存在于规则组中。组内的规则以固定的时间间隔按顺序运行，评估时间相同。记录规则的名称必须是有效的指标名称。警报规则的名称必须是有效的标签值。</p><p>另外如果没有配置groups的interval配置，recording的计算规则和alert的计算规则，都可以通过以下配置，进行全局的计算频次的设置：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>global:
  [ evaluation_interval: &lt;duration&gt; | default = 1m ]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="recording-rule的最佳实践" tabindex="-1"><a class="header-anchor" href="#recording-rule的最佳实践" aria-hidden="true">#</a> recording rule的最佳实践</h2><p>recording rule的命令规范很重要，一个好的命名规范可以一目了然的知道规则的含义，避免出现一些无意义的计算。</p><h3 id="命名规范" tabindex="-1"><a class="header-anchor" href="#命名规范" aria-hidden="true">#</a> 命名规范</h3><p>通过recording rule产生的新的指标，应该遵循通用的方式：level:metric:operations</p><ul><li>level 表示聚合的级别和规则标签的输出</li><li>metric 是和预聚合前的名称保存一致</li><li>Operations 是应用于指标的操作函数列表，最新的操作函数在前。</li><li>当对counter类型使用rate或者是irate操作，去掉_total的后缀</li><li>当对指标用作除法,并且是求百分数，可以使用<code>_per_</code></li></ul><p>例如：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>- record: instance_path:requests:rate5m
  expr: rate(requests_total{job=&quot;myjob&quot;}[5m])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的表达式rate(requests_total{job=&quot;myjob&quot;}[5m])，有两个标签分别是instance和path，所以它的level可以命名为instance_path；对meric使用了rate操作将metric原来的名称去掉_total；最后使用是rate操作</p><p>最终根据上面的表达式得到的指标的名称是instance_path:requests:rate5m；我们可以根据指标的名称可以反推出指标的表达式，这样真的一目了然。</p><p>其他例子：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>- record: instance_path:request_failures:rate5m
  expr: rate(request_failures_total{job=&quot;myjob&quot;}[5m])

- record: instance_path:request_failures_per_requests:ratio_rate5m
  expr: |2
      instance_path:request_failures:rate5m{job=&quot;myjob&quot;}
    /
      instance_path:requests:rate5m{job=&quot;myjob&quot;}

# Aggregate up numerator and denominator, then divide to get path-level ratio.
- record: path:request_failures_per_requests:ratio_rate5m
  expr: |2
      sum without (instance)(instance_path:request_failures:rate5m{job=&quot;myjob&quot;})
    /
      sum without (instance)(instance_path:requests:rate5m{job=&quot;myjob&quot;})

# No labels left from instrumentation or distinguishing instances,
# so we use &#39;job&#39; as the level.
- record: job:request_failures_per_requests:ratio_rate5m
  expr: |2
      sum without (instance, path)(instance_path:request_failures:rate5m{job=&quot;myjob&quot;})
    /
      sum without (instance, path)(instance_path:requests:rate5m{job=&quot;myjob&quot;})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2><p>新建一个recoding_rule.yml的文件，在文件中写一个指标聚合的表达式，该表达式的计算时间间隔为1分钟，表达式的含义是计算每分钟handler=&quot;/metrics&quot;的请求量，另外在新生成的指标上添加一个新的标签region，具体表达式格式如下：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>groups:
- name: recording_rule
  interval: 1m
  rules:
  - record: instance_handler_code:prometheus_http_requests:rate1m
    expr: sum(rate(prometheus_http_requests_total{handler=&quot;/metrics&quot;}[1m]) )by(instance,handler,code)
    labels:
      region: wuhan

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Prometheus的yaml配置文件中，通过rule_files定义recoding rule规则文件的路径。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rule_files:
   - ./first_rule.yml
   - ./recoding_rule.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动Prometheus，在Prometheus的页面上可以查看新指标的数据，如下：</p><figure><img src="https://static.javajike.com/img/2023/10/29/image-20231023210926364.png" alt="image-20231023210926364" tabindex="0" loading="lazy"><figcaption>image-20231023210926364</figcaption></figure>`,30),s=[l];function t(d,u){return i(),r("div",null,s)}const m=e(a,[["render",t],["__file","2023-10-13-recording-rule.html.vue"]]);export{m as default};
