import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as e,f as l}from"./app-706af41e.js";const r={},h=l('<p>在为数据库设计索引时，应该遵循一些基本规则和最佳实践。我们设计索引的目的：</p><p>一是提高查询效率和查询性能，二是减少不必要的资源开销和系统维护成本。我们设计索引遵循的规则都应该以这两个目的展开。</p><h3 id="根据查询条件设计索引" tabindex="-1"><a class="header-anchor" href="#根据查询条件设计索引" aria-hidden="true">#</a> 根据查询条件设计索引</h3><ul><li>数据库中频繁执行的查询语句，根据这些查询语句的查询字段、排序字段设计索引。</li></ul><h3 id="选择合适的索引列" tabindex="-1"><a class="header-anchor" href="#选择合适的索引列" aria-hidden="true">#</a> 选择合适的索引列</h3><ul><li>选择具有高基数列且经常查询的列作为索引列，提高查询性能。</li><li>尽量避免在基数低的列上创建索引，这样的索引可能会导致性能下降。</li></ul><h3 id="使用联合索引" tabindex="-1"><a class="header-anchor" href="#使用联合索引" aria-hidden="true">#</a> 使用联合索引</h3><ul><li><p>对于经常一起使用的列，考虑使用联合索引来覆盖多个列，以提高查询性能。</p></li><li><p>在选择联合索引的列顺序时，考虑到查询的频繁性和可选择性，将最常用的列放在最左边。</p></li></ul><h3 id="避免过度索引" tabindex="-1"><a class="header-anchor" href="#避免过度索引" aria-hidden="true">#</a> 避免过度索引</h3><ul><li>避免在每个列上都创建索引，这样会增加存储空间的消耗，并且可能导致索引的性能下降。</li><li>评估每个索引的实际需求和性能影响，只创建那些有助于查询性能提升的索引。</li></ul><h3 id="定期优化和维护索引" tabindex="-1"><a class="header-anchor" href="#定期优化和维护索引" aria-hidden="true">#</a> 定期优化和维护索引</h3><ul><li>定期检查和评估索引的使用情况和性能影响，根据需要进行索引调整和优化。</li><li>删除不再需要的索引，避免过度索引和不必要的资源消耗。</li></ul><h3 id="考虑查询性能和写入性能的平衡" tabindex="-1"><a class="header-anchor" href="#考虑查询性能和写入性能的平衡" aria-hidden="true">#</a> 考虑查询性能和写入性能的平衡</h3><ul><li>索引可以提高查询性能，但会增加写入操作的开销。在设计索引时，要考虑查询性能和写入性能之间的平衡。</li></ul><h3 id="注意索引的数据类型和长度" tabindex="-1"><a class="header-anchor" href="#注意索引的数据类型和长度" aria-hidden="true">#</a> 注意索引的数据类型和长度</h3><ul><li>对于字符串类型的列，可以考虑在索引中使用前缀索引来减少索引大小和存储空间消耗。</li><li>对于数值类型的列，选择合适的数据类型和长度，以减少索引的存储空间和提高查询性能。</li></ul><h3 id="尽量为order-by-和-group-by-后面的字段建立索引" tabindex="-1"><a class="header-anchor" href="#尽量为order-by-和-group-by-后面的字段建立索引" aria-hidden="true">#</a> 尽量为ORDER BY 和 GROUP BY 后面的字段建立索引</h3><ul><li>为Oder By的字段建立索引，这样查询的时候就不需要再去做排序了，因为我们的索引在建立的时候已经排序好了。</li><li>而在执行GROUP BY操作时，通常会首先对GROUP BY后面的字段进行排序，然后再执行聚合操作。</li><li>当没有合适的索引可供ORDER BY或GROUP BY后的字段使用时，数据库系统可能需要创建临时表或进行文件排序来执行排序操作。</li></ul><h3 id="主建索引尽量使用自增的" tabindex="-1"><a class="header-anchor" href="#主建索引尽量使用自增的" aria-hidden="true">#</a> 主建索引尽量使用自增的</h3><ul><li>自增主键通常是单调递增的，这种顺序性可以降低插入新行时索引的分裂成本，并减少索引的维护成本。</li><li>自增主键可以更有效地利用B树索引结构，因为它们保持了数据的有序性，使得索引的遍历更加高效。</li><li>要使用UUID作为主键使用，原因有以下两点： <ul><li>UUID作为主键会导致数据的随机分布，增加了索引的维护成本和磁盘I/O负载。</li><li>UUID主键通常会占用更多的存储空间，因为它们需要存储更长的字符串值。</li></ul></li></ul>',20),d=[h];function n(t,c){return a(),e("div",null,d)}const s=i(r,[["render",n],["__file","2024-03-15-key-specification.html.vue"]]);export{s as default};
