import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as a,f as n}from"./app-ec9ed2c1.js";const d={},t=n(`<h3 id="什么是聚簇索引" tabindex="-1"><a class="header-anchor" href="#什么是聚簇索引" aria-hidden="true">#</a> 什么是聚簇索引</h3><p>聚簇索引是数据库中的一种索引类型，它对表中的数据行进行排序，并将数据行直接存储在索引的叶子节点中。对于使用聚簇索引的表，数据行按照索引的键值顺序存储在磁盘上。</p><p>聚簇索引的优点包括：</p><ul><li>加速数据检索：由于数据行按照索引的顺序存储，因此使用聚簇索引可以加速范围查询和排序操作。-</li><li>减少磁盘 I/O：聚簇索引可以减少磁盘 I/O 操作，因为查询可以直接定位到数据行所在的位置。</li><li>支持覆盖索引：在某些情况下，聚簇索引还可以支持覆盖索引，即索引中包含了查询所需的所有列，不需要再访问数据行。</li></ul><p>需要注意的是，由于聚簇索引决定了数据的物理存储方式，因此在频繁进行插入、更新和删除操作时，可能会导致数据页的频繁分裂和合并，进而影响性能。</p><p>比如我们创建一个goods表，它的表ddl如下 ：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create table goods(
    id int primary key, 
    name varchar(16),
    category_id int not null, 
    index (category_id)
)engine=InnoDB;


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加数据：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>insert into goods(id,name,category_id) values(100,&#39;手机&#39;,1),(200,&#39;电脑&#39;,2),(300,&#39;汽车&#39;,3);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>goods 表中有一个聚簇索引id，和一个非聚簇索引 category_id。</p><p>聚簇索引id的对应的B+树如下图所示：</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/12/image-20240312232335101.png" alt="image-20240312232335101" tabindex="0" loading="lazy"><figcaption>image-20240312232335101</figcaption></figure><h3 id="什么是非聚簇索引" tabindex="-1"><a class="header-anchor" href="#什么是非聚簇索引" aria-hidden="true">#</a> 什么是非聚簇索引</h3><p>非聚簇索引在 InnoDB 引擎中，也叫二级索引，与聚簇索引相对应。与聚簇索引不同，非聚簇索引在索引的叶子节点中不直接存储数据行，而是存储指向数据行的指针，通常是ID。</p><p>使用非聚簇索引进行查询时，数据库引擎首先根据索引找到对应的行标识符，然后再根据行标识符去表中找到实际的数据行。这样的索引结构使得非聚簇索引在查询时需要进行两次查找，一次是在索引上，另一次是在表上，因此在某些情况下可能会引入额外的 I/O 开销。</p><p>非聚簇索引的优点包括：</p><ol><li><p><strong>支持多个索引</strong>：相比于聚簇索引，非聚簇索引允许在同一张表上创建多个不同的索引。</p></li><li><p><strong>减少索引维护开销</strong>：由于非聚簇索引的叶子节点不包含实际数据行，因此对于插入、更新和删除操作的影响较小，不会像聚簇索引那样频繁地引起数据页的分裂和合并。</p></li><li><p><strong>适用于覆盖索引</strong>：非聚簇索引适合作为覆盖索引，即索引中包含了查询所需的所有列，从而避免了对表的实际数据行的访问。</p></li></ol><p>以上面 goods 表为例，在 goods 中非聚簇索引 category_id 对应 B+ 树如下图所示：</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/12/image-20240312233025028.png" alt="image-20240312233025028" tabindex="0" loading="lazy"><figcaption>image-20240312233025028</figcaption></figure><p>非聚簇索引的叶子节点上存储的并不是真正的行数据，而是主键 ID。使用非聚簇索引进行查询时，首先会查找到主键 ID，然后再使用主键 ID 去聚簇索引上找到真正的行数据。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p>当使用聚簇索引进行查询时，可以直接通过索引找到对应的行数据，而非聚簇索引需要先找到聚簇索引的值，再根据这个值去找行数据，因此查询效率稍低。另外，一个表只能有一个聚簇索引，但可以有多个非聚簇索引。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/common/wxcode.png" alt="方志朋_官方公众号" tabindex="0" loading="lazy"><figcaption>方志朋_官方公众号</figcaption></figure>`,23),s=[t];function l(r,o){return e(),a("div",null,s)}const p=i(d,[["render",l],["__file","2024-03-18-cluster-index.html.vue"]]);export{p as default};