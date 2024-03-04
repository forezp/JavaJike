import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as l,c as u,a as e,b as t,d as o,f as n}from"./app-8ad36b66.js";const a={},d=n(`<p>本篇文章主要讲解如何在SpringBoot项目中使用Prometheus监控，实现方式有两种，一种是使用Springboot自带的spring-boot-starter-actuator；另一种是使用Prometheus的Java客户端</p><h2 id="方案一-使用spring-boot-starter-actuator" tabindex="-1"><a class="header-anchor" href="#方案一-使用spring-boot-starter-actuator" aria-hidden="true">#</a> 方案一：使用spring-boot-starter-actuator</h2><p>SpringBoot已经有来Micrometer的指标库，它默认集成在spring-boot-starter-actuator的依赖包中（要求SpringBoot&gt;=2.0版本）。</p><p>新建一个SpringBoot项目，在项目中引入以下的依赖：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>      &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;
            &lt;scope&gt;test&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;io.micrometer&lt;/groupId&gt;
            &lt;artifactId&gt;micrometer-registry-prometheus&lt;/artifactId&gt;
            &lt;version&gt;1.11.4&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中micrometer-registry-prometheus依赖是将Micrometer的指标转换成prometheus格式的指标。</p><p>然后在springboot的配置文件application.properties中开启prometheus的暴露接口：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>management.endpoints.web.exposure.include=prometheus
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在SpringBoot项目创建一个测试接口：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Controller
public class BasicController {

    // http://127.0.0.1:8080/hello?name=lisi
    @RequestMapping(&quot;/hello&quot;)
    @ResponseBody
    public String hello(@RequestParam(name = &quot;name&quot;, defaultValue = &quot;unknown user&quot;) String name) {
        return &quot;Hello &quot; + name;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在浏览器上请求测试接口<code>http://127.0.0.1:8080/hello?name=lisi</code></p><p>然后，在浏览器上请求<code>http://127.0.0.1:8080/actuator/prometheus</code></p><p>可以得到/hello接口相关的指标，当然actuator有很多内置的指标，在这里就不展开讲解了 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP http_server_requests_seconds  
# TYPE http_server_requests_seconds summary
http_server_requests_seconds_count{exception=&quot;None&quot;,method=&quot;GET&quot;,outcome=&quot;SUCCESS&quot;,status=&quot;200&quot;,uri=&quot;/hello&quot;,} 7.0
http_server_requests_seconds_sum{exception=&quot;None&quot;,method=&quot;GET&quot;,outcome=&quot;SUCCESS&quot;,status=&quot;200&quot;,uri=&quot;/hello&quot;,} 0.071374449
# HELP http_server_requests_seconds_max  
# TYPE http_server_requests_seconds_max gauge
http_server_requests_seconds_max{exception=&quot;None&quot;,method=&quot;GET&quot;,outcome=&quot;SUCCESS&quot;,status=&quot;200&quot;,uri=&quot;/hello&quot;,} 0.049234863
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里有三个指标，分别为</p><ul><li>http_server_requests_seconds_count 请求的总次数</li><li>http_server_requests_seconds_sum 请求的总耗时</li><li>http_server_requests_seconds_max 请求的最大耗时</li></ul><p>这个内置指标对请求耗时统计不是做的很好，只能求到最大的耗时和平均耗时，如果要求分位耗时，其实是做不到。而使用Prometheus的Java客户端是可以做到分位耗时的。</p><h2 id="方案二-使用prometheus" tabindex="-1"><a class="header-anchor" href="#方案二-使用prometheus" aria-hidden="true">#</a> 方案二：使用Prometheus</h2><p>Prometheus官方提供了Java客户端，用于Java程序的指标暴露。在SpringBoot项目中的pom文件引入以下的依赖：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>      &lt;dependency&gt;
            &lt;groupId&gt;io.prometheus&lt;/groupId&gt;
            &lt;artifactId&gt;prometheus-metrics-core&lt;/artifactId&gt;
            &lt;version&gt;1.0.0&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.prometheus&lt;/groupId&gt;
            &lt;artifactId&gt;prometheus-metrics-instrumentation-jvm&lt;/artifactId&gt;
            &lt;version&gt;1.0.0&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.prometheus&lt;/groupId&gt;
            &lt;artifactId&gt;prometheus-metrics-exporter-httpserver&lt;/artifactId&gt;
            &lt;version&gt;1.0.0&lt;/version&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中prometheus-metrics-core包是指标的关键包；prometheus-metrics-instrumentation-jvm是用于暴露JVM相关的指标（可选）；prometheus-metrics-exporter-httpserver是用于导出指标的服务（可选）；</p><p>同样的，在项目中有一个测试接口，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @RequestMapping(&quot;/hello&quot;)
    @ResponseBody
    public String hello(@RequestParam(name = &quot;name&quot;, defaultValue = &quot;unknown user&quot;) String name) {
        return &quot;Hello &quot; + name;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，需要创建两个指标，如下：</p><ul><li>Counter类型的http_count_total，用于统计请求的数量，包括两个标签uri（请求路径）和status（请求状态码）</li><li>Histogram类型的http_count_seconds，用于统计请求的耗时，包括两个标签uri（请求路径）和status（请求状态码）</li></ul><p>然后创建一个HandlerInterceptorAdapter的拦截器，用于指标数据的统计：</p><ul><li>在preHandle方法中记录请求的开始时间startTime</li><li>在afterCompletion方法中，统计请求的次数和请求耗时，</li></ul><p>完整的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.prometheuslab.aop;

import io.prometheus.metrics.core.metrics.Counter;
import io.prometheus.metrics.core.metrics.Histogram;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ApiStatInterceptor extends HandlerInterceptorAdapter {
    Counter counter = Counter.builder()
            .name(&quot;http_count_total&quot;)
            .help(&quot;example counter&quot;)
            .labelNames(&quot;uri&quot;,&quot;status&quot;)
            .register();
    Histogram histogram = Histogram.builder()
            .name(&quot;http_count_seconds&quot;)
            .help(&quot;example counter&quot;)
            .labelNames(&quot;uri&quot;,&quot;status&quot;)
            .register();
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        long startTime = System.currentTimeMillis();
        request.setAttribute(&quot;startTime&quot;, startTime);
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
     
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        long startTime = (Long) request.getAttribute(&quot;startTime&quot;);
        long endTime = System.currentTimeMillis();
        String uri=request.getRequestURI();
        counter.labelValues(uri,&quot;ok&quot;).inc();
        histogram.labelValues(uri,&quot;ok&quot;).observe(endTime-startTime);
    }
   
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将ApiStatInterceptor注册到WebMvcConfigurer中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new ApiStatInterceptor());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开启HTTPServer，并已bean的形式注册：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @Bean
    public HTTPServer createHttpServer() throws IOException {

            HTTPServer server = HTTPServer.builder()
                    .port(9400)
                    .buildAndStart();
            return server;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在浏览器上请求测试接口<code>http://127.0.0.1:8080/hello?name=lisi</code></p>`,34),c={href:"http://localhost:9400/metrics%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E6%9C%89%E4%B8%A4%E4%B8%AA%E6%8C%87%E6%A0%87http_count_total%E5%92%8Chttp_count_seconds%EF%BC%8C%E6%8C%87%E6%A0%87%E6%95%B0%E6%8D%AE%E5%A6%82%E4%B8%8B%EF%BC%9A",target:"_blank",rel:"noopener noreferrer"},v=n(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># HELP http_count_total example counter
# TYPE http_count_total counter
http_count_total{status=&quot;ok&quot;,uri=&quot;/hello&quot;} 2.0
# HELP http_count_seconds example counter
# TYPE http_count_seconds histogram
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;0.005&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;0.01&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;0.025&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;0.05&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;0.1&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;0.25&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;0.5&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;1.0&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;2.5&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;5.0&quot;} 0
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;10.0&quot;} 1
http_count_seconds_bucket{status=&quot;ok&quot;,uri=&quot;/hello&quot;,le=&quot;+Inf&quot;} 2
http_count_seconds_count{status=&quot;ok&quot;,uri=&quot;/hello&quot;} 2
http_count_seconds_sum{status=&quot;ok&quot;,uri=&quot;/hello&quot;} 44.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置prometheus采集" tabindex="-1"><a class="header-anchor" href="#配置prometheus采集" aria-hidden="true">#</a> 配置Prometheus采集</h2><p>在Springboot的项目中增加springboot指标的采集，配置如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>scrape_configs:
  - job_name: &quot;springboot&quot;
    static_configs:
      - targets: [&quot;localhost:9400&quot;]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后，重新启动prometheus或者热加载，重新加载一下配置。</p><h2 id="配置grafana视图" tabindex="-1"><a class="header-anchor" href="#配置grafana视图" aria-hidden="true">#</a> 配置grafana视图</h2><p>在grafana中为Springboot项目配置试图，比如配置每分钟的请求量，配置的表达式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sum(increase(http_count_total{}[1m]))by (uri)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://static.javajike.com/img/2023/10/21/image-20231021115719027.png" alt="image-20231021115719027" tabindex="0" loading="lazy"><figcaption>image-20231021115719027</figcaption></figure><p>配置请求的p95耗时，配置的表达式如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>histogram_quantile(0.95,sum(increase(http_count_seconds_bucket{}[1m]))by(uri,le))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://static.javajike.com/img/2023/10/21/image-20231021115611700.png" alt="image-20231021115611700" tabindex="0" loading="lazy"><figcaption>image-20231021115611700</figcaption></figure>`,12);function m(p,b){const i=r("ExternalLinkIcon");return l(),u("div",null,[d,e("p",null,[t("然后在浏览器上访问"),e("a",c,[t("http://localhost:9400/metrics，可以看到有两个指标http_count_total和http_count_seconds，指标数据如下："),o(i)])]),v])}const h=s(a,[["render",m],["__file","2023-10-06-client-java.html.vue"]]);export{h as default};
