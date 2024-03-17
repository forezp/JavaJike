import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as s,c as o,a as e,b as i,d as t,f as a}from"./app-7df8d18f.js";const d={},u=a('<p>Prometheus的告警分为两部分内容：</p><ul><li>Prometheus server中的告警规则、告警发送。</li><li>告警消息的处理程序Alertmanager，Alertmanager的主要功能包括告警消息的分组、路由分发、抑制和静默等核心功能</li></ul><p>工作流程包括：</p><ul><li>配置和启动Alertmanager</li><li>在Prometheus server中配置Alertmanager的地址，用于向Alertmanager发送告警消息</li><li>在Prometheus server中配置告警规则</li></ul><p>一个简单版的Prometheus的架构图如下：</p><figure><img src="https://static.javajike.com/img/2023/10/21/image-20231021170507878.png" alt="image-20231021170507878" tabindex="0" loading="lazy"><figcaption>image-20231021170507878</figcaption></figure><ul><li>Prometheus作为采集端，采集Node-exporter、sdk client的数据</li><li>Prometheus作为存储端，起到了时序数据库的作用，存储采集到的数据</li><li>同时Prometheus读取告警规则文件，在进程内部计算告警规则，如果有告警发生，则向Alertmanager发送告警消息</li><li>Alertmanager作为告警收敛的组件，在它内部进行告警消息的管理，最终将消息发送给第三方组件，通常是webhook</li><li>最后webhook发送给告警平台。</li></ul><p>在前面的文章已经讲解过Prometheus采集数据和查询数据，在本篇文章中将会讲述Prometheus告警与Alertmanager实战。</p><h2 id="alertmanager介绍" tabindex="-1"><a class="header-anchor" href="#alertmanager介绍" aria-hidden="true">#</a> Alertmanager介绍</h2><p>Alertmanager处理来自客户端的告警消息，例如Prometheus server，包括消息的去重、分组、路由、抑制和静默等核心功能。先了解这些核心概念，然后通过配置文件的形式来具体讲解。</p><h3 id="分组" tabindex="-1"><a class="header-anchor" href="#分组" aria-hidden="true">#</a> <strong>分组</strong></h3><p>分组是将同一组多个的相同的告警消息合并成一个高级消息。这在系统出现大量故障的时候非常有用，如果系统发出成千上万条相同的告警消息，对处理者来说是一个灾难。</p><p>比如，某个数据库出现网络故障，导致连接它的应用的几百个实例都出现异常，如果不进行分组合并，则会出现几百上千的告警消息，很可能淹没掉一些其他的告警消息，导致告警处理者漏处理一些告警消息，从而导致一些系统问题。</p><p>分组是</p><p>告警分组，告警时间间隔，以及告警的接受方式可以通过Alertmanager的配置文件进行配置</p><h3 id="抑制" tabindex="-1"><a class="header-anchor" href="#抑制" aria-hidden="true">#</a> <strong>抑制</strong></h3><p>抑制是当某一告警已经发出，可以停止重复发送由此告警引发的其它告警的机制。</p><p>例如，当集群不可用访问出发了告警，通过Alertmanager的配置可以忽略与该集群有关的其它告警功能。这样可以避免接受一些与实际问题相关的告警。</p><h3 id="静默" tabindex="-1"><a class="header-anchor" href="#静默" aria-hidden="true">#</a> <strong>静默</strong></h3><p>静默提供了一个标签匹配的设置，如果告警消息符合匹配，Alertmanager则不会发送消息到下游。</p><p>Alertmanager 通过配置文件去配置一些配置，然后通过命令行的方式的启动它。Alertmanager 可以在运行时重新加载其配置，通过向Alertmanager 进程发送 SIGHUP信号或者请求Alertmanager 的 /-/reload 接口（POST请求）。</p><h2 id="alertmanager安装" tabindex="-1"><a class="header-anchor" href="#alertmanager安装" aria-hidden="true">#</a> Alertmanager安装</h2>',22),c={href:"https://prometheus.io/download/",target:"_blank",rel:"noopener noreferrer"},v=a(`<p>启动alertmanager可以使用以下命令：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>./alertmanager --config.file=alertmanager.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在启动之前，需要修改alertmanager的配置文件，默认的配置文件如下：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>global:
  resolve_timeout: 5m 
route:
  group_by: [&#39;alertname&#39;]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 1h
  receiver: &#39;web.hook&#39;
receivers:
  - name: &#39;web.hook&#39;
    webhook_configs:
      - url: &#39;http://127.0.0.1:5001/&#39;
inhibit_rules:
  - source_match:
      severity: &#39;critical&#39;
    target_match:
      severity: &#39;warning&#39;
    equal: [&#39;alertname&#39;, &#39;dev&#39;, &#39;instance&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件中包含了4个部分，分别是：</p><p>全局配置（global）：用于定义一些全局的公共参数，如全局的SMTP配置，Slack配置等内容； 告警路由（route）：根据标签匹配，确定当前告警应该如何处理； 接收人（receivers）：接收人是一个抽象的概念，它可以是一个邮箱也可以是微信，Slack或者Webhook等，接收人一般配合告警路由使用； 抑制规则（inhibit_rules）：合理设置抑制规则可以减少垃圾告警的产生</p><h2 id="配置讲解" tabindex="-1"><a class="header-anchor" href="#配置讲解" aria-hidden="true">#</a> 配置讲解</h2><p>每个部分包含的可配置的参数很多，参数的配置会在以后的文章中讲解，在此篇文章只讲解最基础的和几个重要的配置：</p><p><strong>gloabl配置</strong></p><ul><li>resolve_timeout</li></ul><blockquote><p>当告警消息没有endTs这个时间戳参数时，Alertmanager会启动它的告警恢复逻辑。当启动告警恢复逻辑时，Alertmanager持续多长时间未接收到告警后标记告警状态为resolved（已解决）。这个对于prometheus的告警消息来说，它会含有endTs这个时间戳参数，所以这个resolve_timeout对于prometheus的告警消息是不生效的。</p></blockquote><p><strong>route配置</strong></p><ul><li>group_by 默认alertname</li></ul><blockquote><p>The labels by which incoming alerts are grouped together.</p><p>将告警消息按照某个标签分组，比如按照alertname</p></blockquote><ul><li>group_wait（default: 30s）</li></ul><blockquote><p>How long to initially wait to send a notification for a group of alerts. Allows to wait for an inhibiting alert to arrive or collect more initial alerts for the same group. (Usually ~0s to few minutes.) 一组告警第一次发送之前等待的时间。用于等待抑制告警，或等待同一组告警采集更多初始告警后一起发送。（一般设置为0秒 ~ 几分钟</p></blockquote><ul><li>group_interval（default: 5m）</li></ul><blockquote><p>How long to wait before sending a notification about new alerts that are added to a group of alerts for which an initial notification has already been sent. (Usually ~5m or more.) 一组已发送初始通知的告警接收到新告警后，再次发送通知前等待的时间（一般设置为5分钟或更多）</p></blockquote><ul><li>repeat_interval（default: 4h）</li></ul><blockquote><p>How long to wait before sending a notification again if it has already been sent successfully for an alert. (Usually ~3h or more). 一条成功发送的告警，在再次发送通知之前等待的时间。 （通常设置为3小时或更长时间）。</p></blockquote><p><strong>receivers配置</strong></p><p>Receiver可以集成邮箱、微信、邮箱等，本文使用webHook的方式，即Alertmanager通过http接口调用来发送告警消息。</p><p><strong>inhibit_rules</strong> 配置</p><p>抑制允许根据另一组警报的存在来静音一组警报。这允许在系统或服务之间建立依赖关系，以便在中断期间仅发送一组互连警报中最相关的警报。</p><p>当存在与另一组匹配器匹配的警报（源）时，禁止规则会静音与一组匹配器匹配的警报（目标）。目标警报和源警报在相等列表中的标签名称必须具有相同的标签值。</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>inhibit_rules:
  - source_match:
      severity: &#39;critical&#39;
    target_match:
      severity: &#39;warning&#39;
    equal: [&#39;alertname&#39;, &#39;dev&#39;, &#39;instance&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如当发生severity=critical的告警时，会屏蔽掉severity=warning的告警，前提条件是两个告警的alertname、dev、instance的标签值相等。</p><p>根据实际情况，最终我的配置修改成如下：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>global:
  resolve_timeout: 5m
route:
  group_by: [&#39;alertname&#39;]
  group_wait: 10s
  group_interval: 30s
  repeat_interval: 1h
  receiver: &#39;web.hook&#39;
receivers:
- name: &#39;web.hook&#39;
  webhook_configs:
  - url: &#39;http://127.0.0.1:8080/webhook&#39;
inhibit_rules:
  - source_match:
      severity: &#39;critical&#39;
    target_match:
      severity: &#39;warning&#39;
    equal: [&#39;alertname&#39;, &#39;dev&#39;, &#39;instance&#39;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新启动alertmanager，获取通过热加载的方式重新加载配置文件。</p><p>在浏览器中访问localhost:9093，可以看到alertmanager的界面。</p><h2 id="在prometheus中配置告警规则" tabindex="-1"><a class="header-anchor" href="#在prometheus中配置告警规则" aria-hidden="true">#</a> 在prometheus中配置告警规则</h2><p>在prometheus的启动程序的同级目录下面，建一个first_rule.yml的文件，这个文件是告警规则计算的配置，内容如下：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>groups:
- name: test
  rules:
  - alert: HighQps
    expr: sum(increase(prometheus_http_requests_total{handler=&quot;/metrics&quot;}[1m])) &gt; 1
    for: 1m
    labels:
      severity: page
      env: test
      region: wuhan
    annotations:
      summary: HighQps
      description: &#39;{{ $value }}&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在告警规则文件中，我们可以将一组相关的规则设置定义在一个group下。在每一个group中我们可以定义多个告警规则(rule)。一条告警规则主要由以下几部分组成：</p><ul><li>alert：告警规则的名称。</li><li>expr：基于PromQL表达式告警触发条件，用于计算是否有时间序列满足该条件。</li><li>for：评估等待时间，可选参数。用于表示只有当触发条件持续一段时间后才发送告警。在等待期间新产生告警的状态为pending。</li><li>labels：自定义标签，允许用户指定要附加到告警上的一组附加标签。</li><li>annotations：用于指定一组附加信息，比如用于描述告警详细信息的文字等，annotations的内容在告警产生时会一同作为参数发送到Alertmanager。</li></ul><p>在Prometheus的配置文件中，增加告警规则的配置：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alerting:
  alertmanagers:
    - static_configs:
        - targets:
           - 127.0.0.1:909
rule_files:
   - ./first_rule.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最好创建一个目录专门存储告警规则文件，然后用*.yml去配置所有的告警规则文件。</p>`,39),m={href:"http://127.0.0.1:9090/rules%EF%BC%89%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E7%9A%84%E8%A7%84%E5%88%99%E7%8A%B6%E6%80%81%E5%A6%82%E4%B8%8B%EF%BC%9A",target:"_blank",rel:"noopener noreferrer"},p=e("figure",null,[e("img",{src:"https://static.javajike.com/img/2023/10/21/image-20231021174512876.png",alt:"image-20231021174512876",tabindex:"0",loading:"lazy"}),e("figcaption",null,"image-20231021174512876")],-1),g={href:"http://127.0.0.1:9090/alerts?search=%EF%BC%89%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E5%B7%B2%E7%BB%8F%E6%9C%89%E4%B8%80%E6%9D%A1%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF%E5%B7%B2%E7%BB%8F%E5%8F%91%E9%80%81%E7%BB%99Alertmanager",target:"_blank",rel:"noopener noreferrer"},b=e("figure",null,[e("img",{src:"https://static.javajike.com/img/2023/10/21/image-20231021174854220.png",alt:"image-20231021174854220",tabindex:"0",loading:"lazy"}),e("figcaption",null,"image-20231021174854220")],-1),h=e("h2",{id:"alertmanager查看告警消息",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#alertmanager查看告警消息","aria-hidden":"true"},"#"),i(" Alertmanager查看告警消息")],-1),_={href:"http://localhost:9093/#/alerts%EF%BC%89%EF%BC%8C%E6%98%BE%E7%A4%BA%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF%E5%B7%B2%E7%BB%8F%E6%94%B6%E5%88%B0%EF%BC%9A",target:"_blank",rel:"noopener noreferrer"},f=e("figure",null,[e("img",{src:"https://static.javajike.com/img/2023/10/21/image-20231021174948512.png",alt:"image-20231021174948512",tabindex:"0",loading:"lazy"}),e("figcaption",null,"image-20231021174948512")],-1),q=e("h2",{id:"webhook",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#webhook","aria-hidden":"true"},"#"),i(" webhook")],-1),k=e("p",null,"Alertmanager收到告警消息后，如果判断需要发送消息给下游的Webhook程序，将通过POST的http请求发送下游程序，发送的告警消息的JSON格式如下：",-1),x={href:"https://prometheus.io/docs/alerting/latest/configuration/#webhook_config",target:"_blank",rel:"noopener noreferrer"},A=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;version&quot;: &quot;4&quot;,
  &quot;groupKey&quot;: &lt;string&gt;,              // key identifying the group of alerts (e.g. to deduplicate)
  &quot;truncatedAlerts&quot;: &lt;int&gt;,          // how many alerts have been truncated due to &quot;max_alerts&quot;
  &quot;status&quot;: &quot;&lt;resolved|firing&gt;&quot;,
  &quot;receiver&quot;: &lt;string&gt;,
  &quot;groupLabels&quot;: &lt;object&gt;,
  &quot;commonLabels&quot;: &lt;object&gt;,
  &quot;commonAnnotations&quot;: &lt;object&gt;,
  &quot;externalURL&quot;: &lt;string&gt;,           // backlink to the Alertmanager.
  &quot;alerts&quot;: [
    {
      &quot;status&quot;: &quot;&lt;resolved|firing&gt;&quot;,
      &quot;labels&quot;: &lt;object&gt;,
      &quot;annotations&quot;: &lt;object&gt;,
      &quot;startsAt&quot;: &quot;&lt;rfc3339&gt;&quot;,
      &quot;endsAt&quot;: &quot;&lt;rfc3339&gt;&quot;,
      &quot;generatorURL&quot;: &lt;string&gt;,      // identifies the entity that caused the alert
      &quot;fingerprint&quot;: &lt;string&gt;        // fingerprint to identify the alert
    },
    ...
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的Java实体如下：</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>
public class Webhook {

    public String receiver;
    public String status;
    public ArrayList&lt;Alert&gt; alerts;
    public Map&lt;String,String&gt; groupLabels;
    public Map&lt;String,String&gt; commonLabels;
    public Map&lt;String,String&gt; commonAnnotations;
    public String externalURL;
    public String version;
    public String groupKey;
    public int truncatedAlerts
  
    public static class Alert {
        public String status;
        public Map&lt;String,String&gt; labels;
        public Map&lt;String,String&gt; annotations;
        public Date startsAt;
        public Date endsAt;
        public String generatorURL;
        public String fingerprint;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Springboot项目中，写一个接口如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @PostMapping(&quot;/webhook&quot;)
    public String webhook(@RequestBody Webhook webhook) {
        logger.info(webhook.toString());
        return &quot;ok&quot;;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样webhook的程序收到告警消息后，就可以具体的执行告警逻辑，比如将告警消息发送给运维人员的邮箱。</p><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档" aria-hidden="true">#</a> 参考文档</h2>`,7),E={href:"https://blog.csdn.net/qq_37843943/article/details/120665690",target:"_blank",rel:"noopener noreferrer"},w={href:"https://www.jianshu.com/p/c661e8050434",target:"_blank",rel:"noopener noreferrer"},B={href:"https://blog.51cto.com/starsliao/5763175",target:"_blank",rel:"noopener noreferrer"},y={href:"https://yunlzheng.gitbook.io/prometheus-book/parti-prometheus-ji-chu/alert/prometheus-alert-rule",target:"_blank",rel:"noopener noreferrer"};function S(P,F){const n=r("ExternalLinkIcon");return s(),o("div",null,[u,e("p",null,[i("下载地址："),e("a",c,[i("https://prometheus.io/download/"),t(n)])]),v,e("p",null,[i("访问Prometheus的规则文件界面（"),e("a",m,[i("http://127.0.0.1:9090/rules），可以看到的规则状态如下："),t(n)])]),p,e("p",null,[i("等待1分钟，访问Prometheus的告警页面界面（"),e("a",g,[i("http://127.0.0.1:9090/alerts?search=），可以看到已经有一条告警消息已经发送给Alertmanager"),t(n)])]),b,h,e("p",null,[i("访问alertmanager的界面（"),e("a",_,[i("http://localhost:9093/#/alerts），显示告警消息已经收到："),t(n)])]),f,q,k,e("p",null,[e("a",x,[i("https://prometheus.io/docs/alerting/latest/configuration/#webhook_config"),t(n)])]),A,e("p",null,[e("a",E,[i("https://blog.csdn.net/qq_37843943/article/details/120665690"),t(n)])]),e("p",null,[e("a",w,[i("https://www.jianshu.com/p/c661e8050434"),t(n)])]),e("p",null,[e("a",B,[i("https://blog.51cto.com/starsliao/5763175"),t(n)])]),e("p",null,[e("a",y,[i("https://yunlzheng.gitbook.io/prometheus-book/parti-prometheus-ji-chu/alert/prometheus-alert-rule"),t(n)])])])}const L=l(d,[["render",S],["__file","2023-10-12-alertmanager.html.vue"]]);export{L as default};
