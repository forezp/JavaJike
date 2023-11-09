---
lang: zh-CN
title: Prometheus预处理计算-Recording Rule
headerDepth: 0
order: 8
description: Prometheus预处理计算-Recording Rule
---



prometheus支持两种规则表达式，一种是告警告警规则表达式，另外一种是预计算规则recording rule。recording rule是预先计算成本较高的表达式，并将计算结果保存在一组新的时间序列上。预先计算的结果通常它的查询速度要比每次执行原始表达式要快很多。

## 定义Recoding rules

Prometheus会定时的根据拉取expr定时表达式的数据，并将数据的结果存储在新的时间序列中，新的序列名称为record中的值。如果expr表达式的计算结果包含标签，则会把标签添加到新的序列中，如果labels配置中含有额外的标签也会放到新的timeseries中。



和alert rule类似，每个Recording rule的规则定义如下：

```plaintext
groups:
  - name: example
    rules:
    - record: job:http_inprogress_requests:sum
      expr: sum(http_inprogress_requests) by (job)
```

rule_group可以配置两个参数： 

- name，group的名称，需要全局唯一
- interval, rule_group执行的时间间隔，如果没有配置，则默认是global.evaluation_interval

Groups.rules选项是recording-rule的具体配置，可以有以下几个配置项：

- record ： expr执行后生成新的指标的名称，指标名称的定义可以参考下面一小节
- expr：具体预处理生成指标的表达式。

- labels：可以在新生成的指标上额外加一些标签。

记录和告警规则存在于规则组中。组内的规则以固定的时间间隔按顺序运行，评估时间相同。记录规则的名称必须是有效的指标名称。警报规则的名称必须是有效的标签值。



另外如果没有配置groups的interval配置，recording的计算规则和alert的计算规则，都可以通过以下配置，进行全局的计算频次的设置：

```plaintext
global:
  [ evaluation_interval: <duration> | default = 1m ]
```



## recording rule的最佳实践

recording rule的命令规范很重要，一个好的命名规范可以一目了然的知道规则的含义，避免出现一些无意义的计算。

### 命名规范

通过recording rule产生的新的指标，应该遵循通用的方式：level:metric:operations

- level 表示聚合的级别和规则标签的输出
- metric 是和预聚合前的名称保存一致
- Operations 是应用于指标的操作函数列表，最新的操作函数在前。
- 当对counter类型使用rate或者是irate操作，去掉_total的后缀
- 当对指标用作除法,并且是求百分数，可以使用`_per_`

例如：

```plaintext
- record: instance_path:requests:rate5m
  expr: rate(requests_total{job="myjob"}[5m])
```

上面的表达式rate(requests_total{job="myjob"}[5m])，有两个标签分别是instance和path，所以它的level可以命名为instance_path；对meric使用了rate操作将metric原来的名称去掉_total；最后使用是rate操作

最终根据上面的表达式得到的指标的名称是instance_path:requests:rate5m；我们可以根据指标的名称可以反推出指标的表达式，这样真的一目了然。

其他例子：

```plaintext
- record: instance_path:request_failures:rate5m
  expr: rate(request_failures_total{job="myjob"}[5m])

- record: instance_path:request_failures_per_requests:ratio_rate5m
  expr: |2
      instance_path:request_failures:rate5m{job="myjob"}
    /
      instance_path:requests:rate5m{job="myjob"}

# Aggregate up numerator and denominator, then divide to get path-level ratio.
- record: path:request_failures_per_requests:ratio_rate5m
  expr: |2
      sum without (instance)(instance_path:request_failures:rate5m{job="myjob"})
    /
      sum without (instance)(instance_path:requests:rate5m{job="myjob"})

# No labels left from instrumentation or distinguishing instances,
# so we use 'job' as the level.
- record: job:request_failures_per_requests:ratio_rate5m
  expr: |2
      sum without (instance, path)(instance_path:request_failures:rate5m{job="myjob"})
    /
      sum without (instance, path)(instance_path:requests:rate5m{job="myjob"})
```

## 实战

新建一个recoding_rule.yml的文件，在文件中写一个指标聚合的表达式，该表达式的计算时间间隔为1分钟，表达式的含义是计算每分钟handler="/metrics"的请求量，另外在新生成的指标上添加一个新的标签region，具体表达式格式如下：

```plaintext
groups:
- name: recording_rule
  interval: 1m
  rules:
  - record: instance_handler_code:prometheus_http_requests:rate1m
    expr: sum(rate(prometheus_http_requests_total{handler="/metrics"}[1m]) )by(instance,handler,code)
    labels:
      region: wuhan

```

在Prometheus的yaml配置文件中，通过rule_files定义recoding rule规则文件的路径。

```
rule_files:
   - ./first_rule.yml
   - ./recoding_rule.yml
```

重新启动Prometheus，在Prometheus的页面上可以查看新指标的数据，如下：

![image-20231023210926364](https://static.javajike.com/img/2023/10/29/image-20231023210926364.png)