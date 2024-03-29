---
lang: zh-CN
title: 什么是数据库的范式？
headerDepth: 0
order: 6
icon: haxi
description: 什么是数据库的范式？
---

## 什么是数据库的范式？

数据库的范式指的是关系数据库设计中的一组规范，用于确保数据库中的数据满足无重复数据、一致性和数据依赖性的要求。

常见的范式有以下几种：

### 第一范式

1. 第一范式（1NF）：确保每个表都有一个主键，并且每个字段的值都是不可分割的原子值。这样可以避免数据冗余和复杂的数据依赖关系。简而言之，第一范式就是没有重复的列，每个列的字段具有最小的原子性。

比如：下图中列举了满足第一范式和不满足第一范式的列子：

![image-20240306231843809](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/6/image-20240306231843809.png)

### 第二范式

第二范式（2NF）：在满足1NF的基础上，要求将非主键字段完全依赖于主键，而不是依赖于主键的部分属性。这样可以避免数据部分依赖，提高数据的一致性和可维护性。



举个例子，假设有一个学生选课数据库，其中包含两个表：Student（学生信息）和Course（课程信息），它们之间存在以下设计：

```plaintext
Student表：
- 学生ID（Primary Key）
- 学生姓名
- 所选课程

Course表：
- 课程ID（Primary Key）
- 课程名称
- 学生ID（Foreign Key，关联Student表的学生ID）
```

在这个设计中，Student表中的"所选课程"字段存储了学生所选的课程数据，违反了第二范式，因为"所选课程"不完全依赖于Student表的主键学生ID。

为了改进这个设计，可以将学生选课信息分离出来，创建一个独立的选课表Selection，其设计如下：

```plaintext
Student表：
- 学生ID（Primary Key）
- 学生姓名

Course表：
- 课程ID（Primary Key）
- 课程名称

Selection表：
- 选课ID（Primary Key）
- 学生ID（Foreign Key，关联Student表的学生ID）
- 课程ID（Foreign Key，关联Course表的课程ID）
```

通过引入Selection表，将学生选课关系独立出来，有效避免了信息冗余和部分依赖问题，符合第二范式的要求。现在每个学生可以有多条选课信息记录，每门课程也可以被多名学生选择，数据结构更清晰、一致性更强。

改进后的数据库设计不仅符合第二范式，还可以更好地支持数据操作，避免了数据冗余和异常，并且提高了数据的一致性和完整性。这样的设计使得数据库结构更加健壮和规范，有利于数据的维护和扩展。



### 第三范式

第三范式（3NF）：在满足2NF的基础上，要求消除非主键字段之间的传递依赖关系。如果一个字段依赖于其他非主键字段，应将其提取到一个独立的表中，以减少数据冗余和更新异常。



假设有一个订单管理数据库，其中包含三个表：Order（订单信息）、Customer（客户信息）和Product（产品信息），它们之间存在以下设计：

```plaintext
Order表：
- 订单ID（Primary Key）
- 客户ID（Foreign Key，关联Customer表的客户ID）
- 产品ID（Foreign Key，关联Product表的产品ID）
- 客户姓名
- 客户地址
- 产品名称
- 产品价格

Customer表：
- 客户ID（Primary Key）
- 客户姓名
- 客户地址

Product表：
- 产品ID（Primary Key）
- 产品名称
- 产品价格
```

在这个设计中，Order表中包含了冗余的客户信息和产品信息，违反了第三范式，因为客户姓名和产品名称不仅依赖于客户ID和产品ID，而且也依赖于Customer表和Product表中的对应字段。

为了改进这个设计，可以通过标准化数据，将冗余信息提取到独立的表中，并通过外键关联建立关系。改进后的数据库设计如下：

```plaintext
Order表：
- 订单ID（Primary Key）
- 客户ID（Foreign Key，关联Customer表的客户ID）
- 产品ID（Foreign Key，关联Product表的产品ID）

Customer表：
- 客户ID（Primary Key）
- 客户姓名
- 客户地址

Product表：
- 产品ID（Primary Key）
- 产品名称
- 产品价格
```

新增的Customer表和Product表存储客户信息和产品信息的详细数据，Order表中只存储客户ID和产品ID，通过外键关联到对应的表。这样，客户姓名和产品名称就不再冗余存储于Order表中，避免了数据冗余和部分依赖问题，符合第三范式的要求。



### 反范式

反范式（Denormalization）：是指通过增加冗余数据来提高查询性能。反范式化可以减少表的连接操作，提高查询效率，适用于一些需要频繁查询的场景。简化了开发步骤，在实际开发中意义重大。



<!-- @include: @article-footer.snippet.md -->

