import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as o}from"./app-f31e497e.js";const r={},s=o('<h2 id="mysql的存储引擎有哪些" tabindex="-1"><a class="header-anchor" href="#mysql的存储引擎有哪些" aria-hidden="true">#</a> Mysql的存储引擎有哪些？</h2><p>MySQL支持多种存储引擎，包括InnoDB、MyISAM、Memory、Merge等引擎：</p><ol><li><strong>InnoDB</strong>： <ul><li>默认的存储引擎。</li><li>支持事务处理和行级锁定，适合于高并发、数据完整性要求较高的应用场景。并支持外键。</li></ul></li><li><strong>MyISAM</strong>： <ul><li>不支持事务处理，支持全文本搜索、压缩数据、空间数据索引等。</li><li>适用于读密集型应用，例如数据仓库和日志分析等场景。</li></ul></li><li><strong>Memory</strong>（也称为Heap）： <ul><li>将数据存储在内存中，适合于缓存数据等。</li><li>对于需要快速访问的缓存数据，内存存储引擎提供了很高的性能。</li><li>缺点就是对表的大小有限制，太大的数据无法保存在内存中。</li></ul></li><li><strong>Merge</strong>： <ul><li>可以将多个MyISAM表数据组合成一个逻辑表格。</li><li>适合于需要在多个表数据间进行联合查询的场景，提供了逻辑上的数据组织和查询便利。</li></ul></li></ol><h2 id="innodb存储引擎介绍" tabindex="-1"><a class="header-anchor" href="#innodb存储引擎介绍" aria-hidden="true">#</a> InnoDB存储引擎介绍</h2><p>在MySQL从3.23.34a开始支持了InnnoDB数据库引擎。它提供了表数据的事务处理、回滚、崩溃修复能力和多版本并发控制的能力。</p><ol><li><strong>事务支持</strong>： <ul><li>InnoDB 支持事务，可以将一系列数据库操作组合在一起，并要么全部提交成功，要么全部失败回滚。</li><li>事务提供了数据的一致性和完整性，使得在并发场景下保持数据的正确性成为可能。</li></ul></li><li><strong>行级锁定</strong>： <ul><li>InnoDB 使用行级锁定而不是表级锁定。当一个事务修改一行时，其他事务可以同时修改表中的其他行。</li><li>行级锁定可以显著提高并发性，它减少了事务之间的竞争。</li></ul></li><li><strong>外键约束</strong>： <ul><li>InnoDB 是 MySQL 中唯一支持外键约束的存储引擎。可以在表之间建立关系，确保引用完整性。</li></ul></li><li><strong>崩溃恢复</strong>： <ul><li>InnoDB 提供了崩溃恢复机制，可以在数据库崩溃后自动进行恢复操作，保护数据免受损失。</li><li>这种机制通过事务日志（redo log）来实现，可以确保即使在意外情况下也不会丢失数据。</li></ul></li><li><strong>多版本并发控制（MVCC）</strong>： <ul><li>InnoDB 使用多版本并发控制来实现事务的隔离性。每个事务看到的数据版本是一致的，即使其他事务同时在修改相同的数据。</li><li>MVCC 可以提高并发性，因为它允许读取操作不会被写入操作所阻塞。</li></ul></li><li><strong>自动增长列（AUTO_INCREMENT）</strong>： <ul><li>InnoDB 支持自动增长列，可以为表中的某个列设置自增长属性，使其在插入新记录时自动递增。</li><li>自动增长列通常用作主键，简化了插入操作并确保主键的唯一性。</li></ul></li></ol><h2 id="myisam存储引擎介绍" tabindex="-1"><a class="header-anchor" href="#myisam存储引擎介绍" aria-hidden="true">#</a> MyISAM存储引擎介绍</h2><p>MyISAM 存储引擎的详细介绍如下：</p><ol><li><p><strong>不支持事务</strong>：</p><ul><li>MyISAM 存储引擎不支持事务处理。它不提供数据的原子性、一致性、隔离性和持久性，无法使用 BEGIN、COMMIT 和 ROLLBACK 这样的事务控制命令。</li></ul></li><li><p><strong>全文本搜索</strong>：</p><ul><li>MyISAM 存储引擎支持全文本搜索功能，使得在文本字段上进行高效的全文搜索成为可能。这对于需要在大量文本数据中进行搜索的应用场景非常有用。</li></ul></li><li><p><strong>压缩数据</strong>：</p><ul><li>MyISAM 存储引擎支持对数据进行压缩，可以减小数据占用的磁盘空间，提高存储效率。</li></ul></li><li><p><strong>空间数据索引</strong>：</p><ul><li>MyISAM 存储引擎支持空间数据索引，使得可以在地理信息系统（GIS）等领域应用中存储和查询空间数据，例如点、线、多边形等。</li></ul></li><li><p><strong>适用于读密集型应用</strong>：</p><ul><li>MyISAM 存储引擎在读取操作方面具有较好的性能表现，适用于读密集型应用场景，例如数据仓库、日志分析等。</li></ul></li><li><p><strong>不适合高并发写入</strong>：</p><ul><li>MyISAM 存储引擎由于不支持事务和行级锁定，因此在高并发写入的情况下性能可能较差。并发写入操作可能会导致表级锁定，降低了系统的并发性能。</li></ul></li></ol>',9),t=[s];function e(u,a){return i(),n("div",null,t)}const d=l(r,[["render",e],["__file","2024-03-09-mysql-engin.html.vue"]]);export{d as default};
