

prometheus支持两种规则表达式，一种是告警告警规则表达式，另外一种是预计算规则recording rule。recording rule它是预先计算成本较高的表达式，并将计算结果保存在一组新的时间序列上。预先计算的结果通常它的查询速度要比每次执行原始表达式要快很多。

```plaintext
groups:
  - name: example
    rules:
    - record: job:http_inprogress_requests:sum
      expr: sum(http_inprogress_requests) by (job)
```

记录和告警规则存在于规则组中。组内的规则以固定的时间间隔按顺序运行，评估时间相同。记录规则的名称必须是有效的指标名称。警报规则的名称必须是有效的标签值。