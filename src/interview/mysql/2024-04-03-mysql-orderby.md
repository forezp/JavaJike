---
lang: zh-CN
title: mysql order by是怎么实现的
headerDepth: 0
order: 32
description: mysql order by是怎么实现的
---



Mysql的Order by 是经常使用的语法，为某个字段或者是多个字段进行排序。那么这个排序功能是怎么实现的呢？



在 MySQL 中，`ORDER BY` 语句的实现根据实际的字段的是否有索引，会涉及不同的技术：

1. **使用索引排序**：如果查询中的列有适当的索引，并且该索引能够满足 `ORDER BY` 子句中的排序条件，MySQL 可能会使用索引来执行排序操作。这种情况下，MySQL 可以利用 B 树索引的有序性来返回有序的结果集，而无需进行额外的排序操作。
2. **使用临时表**：如果没有合适的索引可用，或者查询中的排序条件复杂，MySQL 可能会使用临时表来执行排序操作。MySQL 在内存或磁盘上创建一个临时表，将查询的结果插入到该表中，然后对临时表进行排序。如果数据量较小且内存足够，MySQL 可能会将临时表存储在内存中，否则会存储在磁盘上。
3. **文件排序**：对于大型数据集或者内存不足的情况，MySQL 可能会执行文件排序。它会将查询的结果写入临时文件，并使用外部排序算法对该文件进行排序。这种情况下，MySQL 会尽量减少磁盘 I/O 的次数，以提高性能。

比如有一个user库：

![image-20240406210141044](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/4/6/image-20240406210141044.png)

表中有四行数据：

![image-20240406210200024](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/4/6/image-20240406210200024.png)

如果对主键进行order by ，会使用主键索引。如果对非索引字段age进行order by排序，不会使用索引，且会使用文件排序，如下图所示：

![image-20240406210259215](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/4/6/image-20240406210259215.png)