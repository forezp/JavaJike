import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r,o,c as l,a as e,b as a,d as i,f as t}from"./app-6bf229cf.js";const d={},c=e("p",null,"本文是Prometheus环境的搭建和安装，包括prometheus-sever、node-exporter、grafna的安装。安装成功后，配置prometheus采集node-exporter的指标，然后在grafana展示node-exporter采集的指标。",-1),u=e("h2",{id:"安装prometheus",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#安装prometheus","aria-hidden":"true"},"#"),a(" 安装prometheus")],-1),m={href:"https://prometheus.io/download/",target:"_blank",rel:"noopener noreferrer"},g=t(`<figure><img src="https://static.javajike.com/img/2023/10/8/image-20231008083006727.png" alt="image-20231008083006727" tabindex="0" loading="lazy"><figcaption>image-20231008083006727</figcaption></figure><p>下载完成后，执行解压：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tar -zxvf prometheus-2.47.1.darwin-amd64.tar.gz 
cd prometheus-2.47.1.darwin-amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行启动命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>笔者是mac电脑，运行时会被系统拒绝运行，需要打开系统偏好设置-安全与隐私，允许prometheus运行。</p><p>其他操作系统应该没有这个问题。</p>`,7),p={href:"http://localhost:9090",target:"_blank",rel:"noopener noreferrer"},v=t(`<figure><img src="https://static.javajike.com/img/2023/10/8/image-20231008084050835.png" alt="image-20231008084050835" tabindex="0" loading="lazy"><figcaption>image-20231008084050835</figcaption></figure><h2 id="prometheus配置文件讲解" tabindex="-1"><a class="header-anchor" href="#prometheus配置文件讲解" aria-hidden="true">#</a> prometheus配置文件讲解</h2><p>在prometheus启动文件同级的目录下面有一个配置文件prometheus.yml，这个配置文件是prometheus启动的时候会读取的配置。具体如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># my global config
global:
  scrape_interval: 15s   
  evaluation_interval: 15s 

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

rule_files:
  # - &quot;first_rules.yml&quot;
  # - &quot;second_rules.yml&quot;

scrape_configs:
  - job_name: &quot;prometheus&quot;
    static_configs:
      - targets: [&quot;localhost:9090&quot;]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体的配置介绍如下：</p>`,5),h=e("li",null,"global.scrape_interval 是全局配置默认采集时间间隔（周期性采集监控目标）",-1),_=e("li",null,"global.evaluation_interval是全局配置告警规则任务的计算",-1),b=e("li",null,"alerting.alertmanagers是配置alertmanagers的地址的，alertmanagers是用来处理prometheus根据告警规则任务计算出来的告警消息的",-1),f=e("li",null,"rule_files是配置告警规则文件的路径，可以使用通配符",-1),E={href:"http://localhost:9090/metrics%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%BE%97%E5%88%B0prometheus%E7%9A%84%E7%9B%91%E6%8E%A7%E6%8C%87%E6%A0%87%EF%BC%8C%E5%86%85%E5%AE%B9%E5%A6%82%E4%B8%8B%EF%BC%9A",target:"_blank",rel:"noopener noreferrer"},x=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile=&quot;0&quot;} 4.5782e-05
go_gc_duration_seconds{quantile=&quot;0.25&quot;} 7.745e-05
go_gc_duration_seconds{quantile=&quot;0.5&quot;} 0.000123743
go_gc_duration_seconds{quantile=&quot;0.75&quot;} 0.000251038
go_gc_duration_seconds{quantile=&quot;1&quot;} 0.002707693
go_gc_duration_seconds_sum 0.009608685
go_gc_duration_seconds_count 35
# HELP go_goroutines Number of goroutines that currently exist.
# TYPE go_goroutines gauge
go_goroutines 32
# HELP go_info Information about the Go environment.
# TYPE go_info gauge
go_info{version=&quot;go1.21.1&quot;} 1
# HELP go_memstats_alloc_bytes Number of bytes allocated and still in use.
# TYPE go_memstats_alloc_bytes gauge
go_memstats_alloc_bytes 2.1363728e+07
# HELP go_memstats_alloc_bytes_total Total number of bytes allocated, even if freed.
# TYPE go_memstats_alloc_bytes_total counter
go_memstats_alloc_bytes_total 3.82033736e+08
# HELP go_memstats_buck_hash_sys_bytes Number of bytes used by the profiling bucket hash table.
# TYPE go_memstats_buck_hash_sys_bytes gauge
go_memstats_buck_hash_sys_bytes 1.489234e+06
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="采集node-exporter的指标" tabindex="-1"><a class="header-anchor" href="#采集node-exporter的指标" aria-hidden="true">#</a> 采集Node Exporter的指标</h2><p>Node Exporter是Prometheus生态的一员，它为主机暴露了硬件和内核相关的指标，比如主机的cpu、内存、磁盘、io读写等。目前支持linux系统、windows系统和mac系统，下载地址为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>https://github.com/prometheus/node_exporter/releases
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,4),B={href:"http://localhost:9100/metrics%EF%BC%8C%E5%B0%B1%E5%8F%AF%E4%BB%A5%E6%9F%A5%E7%9C%8Bnode_exporter%E6%9A%B4%E9%9C%B2%E7%9A%84%E7%AB%AF%E5%8F%A3%E6%8C%87%E6%A0%87%E3%80%82",target:"_blank",rel:"noopener noreferrer"},y=t(`<p>在prometheus的配置文prometheus.yml中，增加采集Node Exporter的任务，配置信息如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>scrape_configs:
  - job_name: &quot;prometheus&quot;
    static_configs:
      - targets: [&quot;localhost:9090&quot;]
  - job_name: &quot;node_exporter&quot;
    static_configs:
      - targets: [&quot;localhost:9100&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动prometheus的程序，prometheus 就可以采集Node_Exporter的指标了。</p>`,3),A={href:"http://localhost:9090/graph%EF%BC%8C%E5%9C%A8%E6%9F%A5%E8%AF%A2%E6%A1%86%E9%87%8C%E8%BE%93%E5%85%A5node_filesystem_free_bytes%EF%BC%88%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E9%87%8C%E5%89%A9%E4%BD%99%E7%9A%84%E7%A3%81%E7%9B%98%E5%AD%97%E8%8A%82%E6%95%B0%EF%BC%89%EF%BC%8C%E5%B0%B1%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E5%90%84%E4%B8%AA%E7%9B%AE%E5%BD%95%E7%9A%84%E7%A3%81%E7%9B%98%E5%89%A9%E4%BD%99%E5%AD%97%E8%8A%82%E6%95%B0%E4%BA%86%E3%80%82",target:"_blank",rel:"noopener noreferrer"},q=t(`<figure><img src="https://static.javajike.com/img/2023/10/8/image-20231008231356066.png" alt="image-20231008231356066" tabindex="0" loading="lazy"><figcaption>image-20231008231356066</figcaption></figure><h2 id="prometheus配置文件热更新" tabindex="-1"><a class="header-anchor" href="#prometheus配置文件热更新" aria-hidden="true">#</a> prometheus配置文件热更新</h2><p>在prometheus启动的时候加上启动参数--web.enable-lifecycle，具体命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>prometheus --web.enable-lifecycle
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在更改完配置以后，就可以进行配置的热更新，通过拉prometheus的配置热更新接口，接口如戏：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -XPOST http://localhost:9090/-/reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="grafana安装" tabindex="-1"><a class="header-anchor" href="#grafana安装" aria-hidden="true">#</a> grafana安装</h2><p>Grafana是一个开源的、流行的、炫酷的展示数据的可视化仪表盘，它支持多种类型的数据库，提供了非常多的面板和插件，可以让开发者轻松的实现监控大盘。</p><p>grafana可以完美的和prometheus结合，展示prometheus数据。</p><p>进入grafana官网下载安装包，笔者是mac，所以下载的是mac版本的，下载命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>curl -O https://dl.grafana.com/enterprise/release/grafana-enterprise-10.1.4.darwin-amd64.tar.gz
tar -zxvf grafana-enterprise-10.1.4.darwin-amd64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>下载并解压成功后，进入到grafana的安装目录，启动grafana，启动命令如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>./bin/grafana-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>grafana有很多配置项在conf目录下default.ini文件下，此篇文章不讲解这部分内容。</p><p>启动成功后，进入grafana的页面，地址为localhost:3030 ，grafana的默认登陆用户名admin、密码为admin</p><p>登陆成功后，需要为grafana配置prometheus的数据源，配置界面的路径和配置如下：</p><p><img src="https://static.javajike.com/img/2023/10/9/image-20231009220718330.png" alt="image-20231009220718330" loading="lazy">配置完成后保存。</p>`,17),C={href:"https://grafana.com/grafana/dashboards/?pg=community&plcmt=topnav&search=node+exporter+mac",target:"_blank",rel:"noopener noreferrer"},k=t('<p>搜索成功后，在本地部署的grafana页面导入node exporter的dashboard，页面的导入路径如下：</p><figure><img src="https://static.javajike.com/img/2023/10/10/image-20231010201727866.png" alt="image-20231010201727866" tabindex="0" loading="lazy"><figcaption>image-20231010201727866</figcaption></figure><p>导入成功后，就可以看到本机的资源dashboard（由node exporter采集的指标生产）</p><figure><img src="https://static.javajike.com/img/2023/10/9/image-20231009220040376.png" alt="image-20231009220040376" tabindex="0" loading="lazy"><figcaption>image-20231009220040376</figcaption></figure><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><ul><li>prometheus作为一个采集组件，采集了node-exporter的指标</li><li>同时prometheus作为一个时序数据库，存储了node-expoter的指标时序</li><li>grafana作为数据展示前端，读取prometheus的指标时序，并展示在监控大盘上。</li></ul><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/common/wxcode.png" alt="方志朋_官方公众号" tabindex="0" loading="lazy"><figcaption>方志朋_官方公众号</figcaption></figure>',7);function F(j,P){const n=r("ExternalLinkIcon");return o(),l("div",null,[c,u,e("p",null,[a("去prometheus官网下载prometheus，下载地址为"),e("a",m,[a("https://prometheus.io/download/"),i(n)]),a(" ，目前提供了Linux\\windows\\mac的版本，笔者这里下载mac版本的。")]),g,e("p",null,[a("启动成功后，访问"),e("a",p,[a("http://localhost:9090"),i(n)]),a(" ，就可以访问prometheus页面了，这个页面提供了对prometheus数据的查询和告警信息的查询，页面展示如下：")]),v,e("ul",null,[h,_,b,f,e("li",null,[a("scrape_configs是配置采集任务的，支持多种类型的采集，比如从k8s、consul、也可以配置静态采集任务。上面的配置是采集prometheus自身的监控指标。可以访问prometheus自身的监控指标的暴露端点："),e("a",E,[a("http://localhost:9090/metrics，可以得到prometheus的监控指标，内容如下："),i(n)])])]),x,e("p",null,[a("下载完成后，启动node_exporter，node_exporter的端口为9100，访问"),e("a",B,[a("http://localhost:9100/metrics，就可以查看node_exporter暴露的端口指标。"),i(n)])]),y,e("p",null,[a("访问prometheus的网页，"),e("a",A,[a("http://localhost:9090/graph，在查询框里输入node_filesystem_free_bytes（文件系统里剩余的磁盘字节数），就可以看到各个目录的磁盘剩余字节数了。"),i(n)])]),q,e("p",null,[a("然后去grafana官方网站的dashboard社区找一个node exporter的面板，搜索地址："),e("a",C,[a("https://grafana.com/grafana/dashboards/?pg=community&plcmt=topnav&search=node+exporter+mac"),i(n)])]),k])}const N=s(d,[["render",F],["__file","2023-09-27-get-started.html.vue"]]);export{N as default};
