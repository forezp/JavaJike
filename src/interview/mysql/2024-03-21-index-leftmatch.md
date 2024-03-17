---
lang: zh-CN
title: 谈谈你对索引最最左匹配原则的理解？
headerDepth: 0
order: 22
description: 谈谈你对索引最最左匹配原则的理解？
---

索引最左匹配原则是数据库系统在使用联合索引（Composite Index）时的一个重要原则。这个原则指出，在查询条件中如果使用了联合索引的一部分，那么数据库系统可以利用这个索引进行快速检索，但是查询条件必须从索引的最左边列开始，依次向右。如果使用的不好，可能会导致索引失效。

本文将以案例的形式讲解联合索引的最左匹配原则。

### 数据准备

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



### 联合索引使用示例



#### 索引生效情况：

```
explain select * from user where id_no = '11';
```

![image-20240317183416893](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317183416893.png)

以下语句索引都生效：

-  select * from user where id_no = '11' and username='forezp1';
-  select * from user where id_no = '11' and username='forezp1' and age =11;
-  select * from user where id_no = '11' and age =11;

#### 索引失效的情况

```
explain select * from user where  age =11;
```

![image-20240317183739509](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/17/image-20240317183739509.png)

以下语句索引都失效：

-  select * from user where username = 'forezp1';
-  explain select * from user where username = 'forezp1' and age =11;



### 总结

具体来说，假设有一个联合索引 (A, B, C)，在查询时，如果查询条件包含了索引的前缀列 A，那么数据库可以使用这个索引进行快速检索。但是，如果查询条件中没有包含索引的前缀列 A，而是直接使用了索引后面的列 B 或者 C，那么数据库通常无法使用这个索引，而需要进行全表扫描。



