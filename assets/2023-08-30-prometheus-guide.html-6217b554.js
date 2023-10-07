import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as l,f as r}from"./app-ef76d371.js";const t={},a=r('<h2 id="什么是prometheus" tabindex="-1"><a class="header-anchor" href="#什么是prometheus" aria-hidden="true">#</a> 什么是Prometheus</h2><p>Prometheus是一个开源的监控系统，提供了数据采集、告警计算、告警管理等一系列工具包，周边生态非常的丰富。</p><p>Prometheus受启发于Google的Brogmon监控系统（类似于Kubernetes是从Google的Brog系统演变而来），从2012年开始由前Google工程师以开源软件的形式进行研发，并且于2015年对外发布早期版本。2016年5月继Kubernetes之后成为第二个正式加入CNCF(云原生计算基金会)的项目，同年6月正式发布1.0版本。2017年底发布了基于全新存储层的2.0版本，能更好地与容器平台、云平台配合。</p><p>Prometheus通过时序数据来收集和存储指标。一个时序数据包含了一个时间戳、值和一个或者是多个key-value键值对。</p><h2 id="prometheus提供的特性" tabindex="-1"><a class="header-anchor" href="#prometheus提供的特性" aria-hidden="true">#</a> Prometheus提供的特性</h2><p>作为新一代的监控系统，Prometheus和传统的监控系统相比，有着非常大的创新。Prometheus让监控从传统的黑盒子监控提升到了白盒监控；不仅可以监控系统的一些状态，也可以深入到进程内部关键点的监控（白盒监控）。</p><p>Prometheus提供一些关键的特性：</p><ul><li>多维的数据结构，这个数据结构包括一个指标名和一系列的键值对（指标）。</li><li>提供了数据查询的Promql，Promql非常的强大和灵活。</li><li>提供了单节点和分布式的数据存储方案。也可以使用第三方时序数据去存储，比如influxdb、thanos、victoriaMetrics</li><li>时序数据使用http协议采集，通常是pull模式，也可以使用push模式（通过中间层push_gateway）</li><li>采集目标可以使用服务发现的方式（比如k8s系统、consul），也可以通过静态的配置去发现采集目标。</li><li>可以和开源组件grafana无缝对接。</li></ul><h2 id="组件" tabindex="-1"><a class="header-anchor" href="#组件" aria-hidden="true">#</a> 组件</h2><p>Prometheus生态包含了一系列组件，除了Prometheus很多组件是可选的：</p><ul><li>Prometheus server是最核心的组件，用来抓取和存储时序数据的。</li><li>Client-libraries（sdks）是用来开发应用指标的工具包</li><li>Push_gateway是用来短暂存储push类型指标的</li><li>exporters是用来暴露或者导出被监控对象的指标的，比如虚拟机、nginx、mysql等</li><li>alertmanager是用来管理告警消息的，比如对消息的去重、静默、恢复等管理</li><li>还有一系列其他的组件</li></ul><p>大多数Prometheus组件都是使用go语言写的，非常容易的打包和部署。</p><h2 id="架构" tabindex="-1"><a class="header-anchor" href="#架构" aria-hidden="true">#</a> 架构</h2><p>下图是Prometheus和它周边生态组件的架构图，这些组件构成了一个完整的监控系统：</p><figure><img src="https://static.javajike.com/img/2023/10/7/architecture.png" alt="Prometheus architecture" tabindex="0" loading="lazy"><figcaption>Prometheus architecture</figcaption></figure><ul><li>Prometheus通过pull的方式去周期性（通常15-30s）采集监控对象的指标，健康对象包含： <ul><li>直接采集的jobs和exporters</li><li>也可以是短生命周期的任务推送到pushgateway的指标</li></ul></li><li>监控对象的发现 <ul><li>可以是k8s的集群的服务发现</li><li>也可以是consul</li><li>或者静态的配置文件</li></ul></li><li>prometheus发现到监控目标后，会周期性的去采集指标，并将指标存储在主机的磁盘中</li><li>通过了内置的告警规则计算，并将告警消息发送给alertmanager</li><li>alertmanager提供了对告警消息的管理、去重、静默、分发，可以配置多种分发方式： <ul><li>比如email</li><li>webhook</li></ul></li><li>prometheus提供了http接口的方式让外部第三方访问数据，比如可以将指标数据展示在grafana上。</li></ul><h2 id="prometheus适用的场景" tabindex="-1"><a class="header-anchor" href="#prometheus适用的场景" aria-hidden="true">#</a> prometheus适用的场景</h2><p>prometheus可以很好地记录任何纯粹的数字时间序列。它既适合以机器为中心的监视，也适合高度动态的面向服务的体系结构的监视。</p><p><strong>在微服务的世界里，它对多维数据收集和查询的支持是一个特别的优势。</strong></p><p>Prometheus是为可靠性而设计的。每个Prometheus都是单节点设计的，使用多个节点去采集相通的监控对象可以做到高可用。通过Prometheus建立完善的监控体系，从而达到以下目的：</p><ul><li>长期趋势分析：通过对监控样本数据的持续收集和统计，对监控指标进行长期趋势分析。例如，通过对磁盘空间增长率的判断，我们可以提前预测在未来什么时间节点上需要对资源进行扩容。</li><li>对照分析：两个版本的系统运行资源使用情况的差异如何？在不同容量情况下系统的并发和负载变化如何？通过监控能够方便的对系统进行跟踪和比较。</li><li>告警：当系统出现或者即将出现故障时，监控系统需要迅速反应并通知管理员，从而能够对问题进行快速的处理或者提前预防问题的发生，避免出现对业务的影响。</li><li>故障分析与定位：当问题发生后，需要对问题进行调查和处理。通过对不同监控监控以及历史数据的分析，能够找到并解决根源问题。</li><li>数据可视化：通过可视化仪表盘能够直接获取系统的运行状态、资源使用情况、以及服务运行状态等直观的信息</li></ul><figure><img src="https://static.javajike.com/img/2023/10/7/wps1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>那prometheus不适合什么？</p><p>由于prometheus是使用周期性的采集数据，它并不能保证数据的及时性和绝对正确性，如果是想做与money相关的业务，使用prometheus明显是不合适的。</p>',24),o=[a];function s(h,u){return i(),l("div",null,o)}const n=e(t,[["render",s],["__file","2023-08-30-prometheus-guide.html.vue"]]);export{n as default};
