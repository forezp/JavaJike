---
lang: zh-CN
title: 请说说事务的隔离级别？
headerDepth: 0
order: 26
description: 请说说事务的隔离级别？以及Mysql默认的隔离级别
---



## 事务的隔离级别



事务的隔离级别是指多个并发执行的事务之间的隔离程度，不同的隔离级别提供了不同的并发控制机制，以确保事务在并发执行时不会产生不一致的结果。常见的隔离级别包括：

1. **读未提交（Read Uncommitted）**：最低的隔离级别，在该级别下，一个事务可以看到其他事务未提交的修改。这意味着在一个事务中可以读取到其他事务尚未提交的数据，可能导致脏读、不可重复读和幻读问题。

2. **读已提交（Read Committed）**：在该隔离级别下，一个事务只能看到其他事务已经提交的修改。这可以避免脏读问题，但仍可能出现不可重复读和幻读问题。

3. **可重复读（Repeatable Read）**：在该隔离级别下，一个事务在执行期间多次读取同一行数据时，会看到相同的数据，即使其他事务已经对该数据进行了修改。这可以避免脏读和不可重复读问题，但仍可能出现幻读问题。

4. **串行化（Serializable）**：提供最高的隔离级别，通过对事务进行串行化执行来避免并发问题，即每个事务都按顺序执行，因此不会发生并发问题。这可以避免脏读、不可重复读和幻读问题，但会降低并发性能。



## Mysql默认的事务隔离级别



MySQL 默认的隔离级别是**可重复读（Repeatable Read）**。



## 怎么查看默认的事务隔离级别

查看 MySQL 5.7事务的隔离级别，可以执行以下 SQL 查询：

```sql
SELECT @@global.tx_isolation AS 'Global Isolation Level',
       @@session.tx_isolation AS 'Session Isolation Level';
```

查看MySQL 5.8事务的隔离级别，可以执行以下 SQL 查询：

```
SELECT @@global.transaction_isolation AS 'Global Isolation Level', @@session.transaction_isolation AS 'Session Isolation Level';
```

![image-20240323225929035](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/23/image-20240323225929035.png)



## 修改事务的隔离级别

**修改当前会话**

要修改当前会话（连接）的事务隔离级别，可以使用以下 SQL 语句：

```sql
SET SESSION TRANSACTION ISOLATION LEVEL isolation_level;
```

其中，`isolation_level` 是要设置的隔离级别，可以是以下值之一：

- `READ UNCOMMITTED`
- `READ COMMITTED`
- `REPEATABLE READ`
- `SERIALIZABLE`

例如，要将当前会话的隔离级别设置为可重复读（Repeatable Read），可以执行以下命令：

```sql
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
```

请注意，修改隔离级别只会影响当前会话，对其他会话不会产生影响。

![image-20240323230638902](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/3/23/image-20240323230638902.png)



**全局修改**

如果需要全局修改，可以执行以下命令：

```
SET GLOBAL TRANSACTION ISOLATION LEVEL isolation_level;
```

比如：

```
mysql> SET GLOBAL TRANSACTION ISOLATION LEVEL READ COMMITTED;
Query OK, 0 rows affected (0.00 sec)

mysql> SET GLOBAL TRANSACTION ISOLATION LEVEL REPEATABLE READ;
Query OK, 0 rows affected (0.00 sec)
```



<!-- @include: @article-footer.snippet.md -->

