import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as r,c as n,f as s}from"./app-81fad4d6.js";const i={},t=s(`<p>prometheus支持两种规则表达式，一种是告警告警规则表达式，另外一种是预计算规则recording rule。recording rule它是预先计算成本较高的表达式，并将计算结果保存在一组新的时间序列上。预先计算的结果通常它的查询速度要比每次执行原始表达式要快很多。</p><div class="language-plaintext line-numbers-mode" data-ext="plaintext"><pre class="language-plaintext"><code>groups:
  - name: example
    rules:
    - record: job:http_inprogress_requests:sum
      expr: sum(http_inprogress_requests) by (job)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>记录和告警规则存在于规则组中。组内的规则以固定的时间间隔按顺序运行，评估时间相同。记录规则的名称必须是有效的指标名称。警报规则的名称必须是有效的标签值。</p>`,3),l=[t];function a(c,d){return r(),n("div",null,l)}const p=e(i,[["render",a],["__file","2023-10-13-recording-rule.html.vue"]]);export{p as default};
