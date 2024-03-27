import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{o,c as t,f as e}from"./app-ec9ed2c1.js";const i={},n=e("<p>MySQL 中的表锁和行锁是用于控制并发访问的两种锁机制，它们在数据读取和写入时的锁定粒度不同。</p><p><strong>表锁</strong>：</p><ul><li>表锁是对整个表进行锁定，当一个事务获取了对某个表的表锁后，其他事务无法对该表进行写操作，直到持有表锁的事务释放锁为止。</li><li>表锁的粒度比较粗，会导致并发性能较低，在高并发环境下可能会出现大量写操作的阻塞。</li><li>在 MySQL 中，MyISAM 存储引擎使用表级锁，默认情况下对读操作使用共享锁（读锁），对写操作使用排他锁（写锁）。</li></ul><p><strong>行锁</strong>：</p><ul><li>行锁是对表中的行数据进行锁定，当一个事务获取了对某行数据的行锁后，其他事务可以继续访问表中的其他行。</li><li>行锁的粒度较细，可以更好地支持并发访问，减少了锁竞争，提高了并发性能。</li><li>在 MySQL 中，InnoDB 存储引擎支持行级锁，InnoDB 存储引擎通过两种方式实现行锁：共享锁（S锁）和排他锁（X锁）。共享锁允许多个事务同时读取同一行数据，而排他锁只允许一个事务对某一行进行写操作。</li></ul><p>般来说，如果系统的读操作远远多于写操作，并且对数据一致性要求不是特别严格，可以考虑使用表级锁；如果系统的写操作较多，并且对数据一致性有较高要求，那么应该使用行级锁。</p>",6),c=[n];function r(s,_){return o(),t("div",null,c)}const f=l(i,[["render",r],["__file","2024-03-30-table-lock.html.vue"]]);export{f as default};
