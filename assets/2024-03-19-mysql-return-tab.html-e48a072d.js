import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as a}from"./app-6cf116b3.js";const s={},l=a(`<h3 id="什么是mysql的回表" tabindex="-1"><a class="header-anchor" href="#什么是mysql的回表" aria-hidden="true">#</a> 什么是Mysql的回表</h3><p>在MySQL中，回表（也称为回表查询或回到数据页查询）是指当使用索引来执行查询时，虽然索引可以帮助快速定位到符合条件的行，但是为了获取完整的查询结果，仍然需要回到原始数据页（或称为聚簇索引）中检索所需的数据。</p><p>回表就是在使用索引的情况下，仍然需要额外的IO操作来获取索引以外的其他列的数据。</p><p>通常情况下，当查询的条件列包含在索引中，并且查询只需要索引列时，MySQL可以直接从索引中获取所需的数据，无需回表。</p><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><p>在innodb的存储引擎的MySQL数据库中，创建一张包含(id, username, age)列的表，其中id列是主键，username列是普通索引。</p><ol><li>当执行查询以下Sql语句时，MySQL会使用username索引定位到符合条件的行的地址。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT id, username, age FROM table WHERE username = &#39;forezp&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>然后，MySQL需要回到原始数据页（或聚簇索引）中获取id、age列的值，因为这两列不在索引中，这就是回表操作。</li></ol><p>示意图如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>+------------------------------------------------+
|                索引(username)                       |
+------------------------------------------------+
| username = forezp | 指针(指向聚簇索引)                |
+------------------------------------------------+

+------------------------------------------------+
|               聚簇索引                           |
+------------------------------------------------+
| id | username | age |
+------------------------------------------------+
| 123| forezp   | 25  |
+------------------------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>回表操作增加了额外的IO开销和查询时间，如果能够避免，应尽量避免。</p><h3 id="怎么避免" tabindex="-1"><a class="header-anchor" href="#怎么避免" aria-hidden="true">#</a> 怎么避免</h3><p>要避免回表操作，可以考虑以下几种方法：</p><p><strong>覆盖索引</strong>：</p><ul><li>使用覆盖索引，即创建一个包含所有查询所需列的复合索引。这样，在执行查询时，MySQL可以直接从索引中获取所有需要的列，而无需回表。</li><li>例如，如果查询需要的列是(id, username, age)，则创建一个包含这三列的索引。</li></ul><p><strong>使用合适的索引</strong>：</p><ul><li>确保查询的条件列和需要检索的列都被索引覆盖。如果查询中的列没有适当的索引，MySQL会回表操作来获取缺失的数据。</li><li>分析查询的条件和列，创建合适的索引来覆盖查询的需求。</li></ul>`,18),d=[l];function r(t,c){return i(),n("div",null,d)}const o=e(s,[["render",r],["__file","2024-03-19-mysql-return-tab.html.vue"]]);export{o as default};
