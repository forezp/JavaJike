---
lang: zh-CN
title: 什么情况下会导致索引失效？
headerDepth: 0
order: 21
description: 什么情况下会导致索引失效？
---

Mysql的索引是为了加快查询性能的，但是有很多情况下，我们对某些字段创建了索引，但是索引并未生效。在实际的工作中或者面试中，Mysql的索引失效是我们必须需要了解的。

本篇文章将会讲解一些场景不走索引的案例，帮大家更好的理解或者避免踩坑。

### 数据准备

创建的一张 `user` 的表，有以下的列：

- `id`：主键。
- `id_no`：长度为 18 的字符型字段，用于存储身份证编号。
- `username`：长度为 32 的字符型字段，用于存储用户名。
- `age`：整数字段，用于存储年龄。
- `create_time`：一个日期时间字段，存储记录创建时间。

创建了三个索引：

1. `PRIMARY KEY`：这是主键索引，针对 `id` 列。
2. `union_idx`：这是一个联合索引，涵盖了 `id_no`、`username` 和 `age` 列。这个索引可以加速查询同时涉及到这三个列的操作。
3. `create_time_idx`：这是一个单列索引，针对 `create_time` 列。这个索引可以加速按照创建时间进行查询的操作。

创建表字段如下：

```
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `id_no` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '身份编号',
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户名',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `union_idx` (`id_no`,`username`,`age`),
  KEY `create_time_idx` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
```



初始化表数据语句如下：

```
INSERT INTO `user` (`id`, `id_no`, `username`, `age`, `create_time`) VALUES (null, '11', 'forezp1', 11, '2024-03-11 01:01:11');
INSERT INTO `user` (`id`, `id_no`, `username`, `age`, `create_time`) VALUES (null, '12', 'forezp2', 12, '2024-03-11 01:01:11');
INSERT INTO `user` (`id`, `id_no`, `username`, `age`, `create_time`) VALUES (null, '13', 'forezp3', 13, '2024-03-11 01:01:11');
INSERT INTO `user` (`id`, `id_no`, `username`, `age`, `create_time`) VALUES (null, '14', 'forezp4', 14, '2024-03-11 01:01:11');
```

查看数据库版本和查询执行计划：

![image-20240317173245764](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317173245764.png)

执行以下语句索引生效：

```
 explain select * from user where id_no = '11';
```

![image-20240317173625723](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317173625723.png)



### 索引失效的几种情况



#### 1.使用like操作符

MySQL 索引可能会失效，如果查询中使用了不适合索引的操作符，比如对索引列进行了模糊查询（`LIKE '%value%'`）、。

执行以下语句，索引会失效：

```
 explain select * from user where id_no like '%1%';
```

![image-20240317173428123](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317173428123.png)



#### 2.联合索引不满足列的最左匹配原则

执行以下语句，索引生效：

```
 explain select * from user where id_no = '11' and username ='forezp1';
```

![image-20240317174329135](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317174329135.png)

不符合最左匹配原则，索引失效，索引失效的例子如下：

```
explain select * from user where  username ='forezp1' and age =11;
```

![image-20240317174731940](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317174731940.png)



#### 3.**使用了select *  from **

正向例子：

```
explain select id,id_no,username from user where   age =11;
```

![image-20240317175415040](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317175415040.png)

反向例子，索引失效：

```
explain select * from user where   age =11;
```

![image-20240317175720245](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317175720245.png)



#### 4.查询条件中使用了函数或者运算

在查询条件中使用了函数或者运算，导致查询字段的索引失效：

```
explain select * from user where id+1=3;
```

![image-20240317175928211](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317175928211.png)



#### 5. 类型进行了隐式转换

id_no字段类型为varchar，在SQL语句中使用了int类型，出现了查询字段的隐式转换。

```
explain select * from user where id_no=11;
```

![image-20240317180303974](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317180303974.png)



#### 6.order by 在某些情况下会导致索引失效

- 如果查询中的`ORDER BY` 子句涉及到的列没有相应的索引支持，数据库可能会选择进行全表扫描并进行排序操作，而不使用索引，从而导致索引失效。
- 如果数据分布不均匀，可能会导致查询优化器认为使用索引扫描不如全表扫描更有效率，尤其是在排序操作中，这可能导致索引失效。
-  如果需要排序的数据量非常大，数据库可能会选择不使用索引而选择临时表排序，以避免在内存中进行大量的排序操作，这种情况下也可能导致索引失效。

以下order by导致索引失效，一是没有where的索引字段，二是表中数据过少，导致索引失效。

![image-20240317180949980](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317180949980.png)

#### 7.使用了两列比较

以下的执行计划可以看出查询语句会失效：

```
explain select * from user where id > age;
```

![image-20240317181559037](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317181559037.png)

#### 8.使用or操作

以下的执行计划可以看出查询语句会失效：

```
explain select * from user where id = 2 or username = 'forezp1';
```

![image-20240317182531564](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317182531564.png)

#### 9.Mysql会根据数据量而决定走不走索引

当Mysql发现通过索引扫描的行记录数超过全表的10%-30%时，优化器可能会放弃走索引，自动变成全表扫描。某些场景下即便强制SQL语句走索引，也同样会失效。



#### 10.还有一些可能导致索引失效的场景

还有一些场景会导致索引失效，但是不一定，会随着Mysql的版本的不同而有不同的结果。

- not in和not exists可能会导致索引失效，在本文的mysql版本是走索引的。
- is not null可能会导致索引失效，在本文的mysql版本是走索引的。
- 不等于比较 <> 可能会导致索引失效，在本文的mysql版本是走索引的。