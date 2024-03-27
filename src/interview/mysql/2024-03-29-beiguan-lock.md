---
lang: zh-CN
title: 谈谈悲观锁和乐观锁的区别？
headerDepth: 0
order: 29
description: 谈谈悲观锁和乐观锁的区别？
---

乐观锁和悲观锁是比较高频的面试题，是每个面试者必备 知识。

## 概念

乐观锁和悲观锁是两种截然相反的思想，用于解决并发场景中的数据竞争的问题。

- 乐观锁：认为数据不会被竞争，在执行查询操作的时候不会上锁，只会在更新的时候会判断一下在此期间是否被别人修改了数据；如果修改了则放弃操作，否则，执行成功。
- 悲观锁：在操作数据的时候比较悲观，认为别人会修改数据，因此在操作数据之前会获取锁，如果获取成功会将数据加锁，直到操作完成后才会释放锁。上锁期间，其他人无法读取数据。



## 实现形式

**乐观锁和悲观锁是两种思想，它们的使用是非常广泛的，不局限于某种编程语言或数据库。**



#### 悲观锁的实现方式

悲观锁的实现方式是加锁，比如java语言中的synchronised关键字、golang语言的sync.Lock类。悲观锁在编程中使用的比较频繁。



#### 乐观锁的实现方式

乐观锁的主要实现形式有CAS和版本号机制。



**CAS（Compare And Swap）**

CAS是一种并发编程中常用的原子操作，用于在多线程环境下实现数据的同步和并发控制。

CAS操作包含了三个操作数：

1. 内存位置（通常是一个地址或者指针），即需要读写的变量或者内存位置。
2. 预期值（Expected Value），即当前内存位置所期望的值。
3. 新值（New Value），即将要写入到内存位置的新值。

CAS操作的逻辑如下：
- 首先，读取内存位置的当前值，与预期值进行比较。
- 如果当前值等于预期值，则将内存位置更新为新值。
- 如果当前值不等于预期值，则不进行任何操作。

在执行CAS操作时，如果内存位置的当前值等于预期值，则说明在比较和写入之间没有其他线程对该内存位置进行了修改，此时CAS操作可以成功完成。如果当前值不等于预期值，说明有其他线程已经修改了该内存位置，此时CAS操作会失败。

CAS包含了Compare和Swap两个操作，它又如何保证原子性呢？

答案是CAS（Compare And Swap）是一种原子操作，其原子性是在硬件层面进行保证的。在支持CAS的系统中，CPU提供了特殊的指令来执行CAS操作，这些指令可以确保CAS操作的原子性。



**版本号机制实现**



版本号机制是实现乐观锁的一种实现方式。在使用版本号机制实现乐观锁时，每个数据记录都会关联一个版本号，当数据被修改时，版本号需要更新，通常是在原来的版本的基础之上加 1。

乐观锁基于以下假设：

- 在数据操作期间，不会有其他事务对相同数据进行修改。
- 当一个事务要更新数据时，它首先会读取当前数据的版本号，然后执行更新操作。
- 在提交更新之前，事务会再次检查数据的版本号是否仍然与初始读取时的版本号相同。
  - 如果版本号未发生变化，说明在操作过程中没有其他事务对数据进行修改，事务可以顺利提交更新；
  - 如果版本号发生了变化，说明其他事务已经修改了数据，当前事务则需要根据具体情况进行重试或者放弃更新操作。



## Mysql实现悲观锁和乐观锁

在 MySQL 中，悲观锁和乐观锁的实现方式有所不同：

**MySQL 悲观锁**：

- MySQL 支持使用 `SELECT ... FOR UPDATE` 语句来进行悲观锁定。当执行这个语句时，MySQL 会将选定的行锁定，直到事务结束或者提交后才会释放锁。
- 通过 `FOR UPDATE` 子句，MySQL 会在选定的行上设置排他锁，其他事务在对这些行进行更新或者删除操作时会被阻塞，直到当前事务释放锁。
- 悲观锁在处理并发写操作时保证数据的一致性，但会增加数据库的锁竞争，可能降低系统的并发性能。



**MySQL 乐观锁**：

- 在 MySQL 中，乐观锁通常通过添加一个版本号来实现。
- 在进行更新操作时，先读取数据的版本号或者时间戳，然后在更新时比较读取到的版本号或者时间戳与当前数据库中的版本号或者时间戳是否一致。
- 如果一致，说明数据没有被其他事务修改，可以顺利完成操作；如果不一致，说明数据已经被其他事务修改，当前事务可以选择重试或者放弃操作。
- 乐观锁不会在整个操作过程中持有锁，因此可以提高并发性能，但需要应用程序代码中进行逻辑判断和处理。

举个使用MySQL实现乐观锁的例子：

假设我们有一个名为 `orders` 的表，结构如下：

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    status VARCHAR(20),
    version INT
);
```

首先，插入一些示例数据：

```sql
INSERT INTO orders (order_id, status, version) VALUES (1, '待确认', 1);
```

接下来，我们使用 SQL 来模拟两个用户尝试同时修改订单状态的情况，实现乐观锁：

```sql

-- 读取订单的当前状态和版本号
SELECT status, version INTO @current_status, @current_version FROM orders WHERE order_id = 1;

-- 检查版本号是否匹配
IF @current_version = (SELECT version FROM orders WHERE order_id = 1) THEN
    -- 更新订单状态和版本号
    UPDATE orders SET status = '已取消', version = @current_version + 1 WHERE order_id = 1;
    SELECT '订单已取消' AS message;
ELSE
    SELECT '订单更新失败：版本号不匹配' AS message;
END IF;

COMMIT;

-- 用户B尝试确认订单
START TRANSACTION;

-- 读取订单的当前状态和版本号
SELECT status, version INTO @current_status, @current_version FROM orders WHERE order_id = 1;

-- 检查版本号是否匹配
IF @current_version = (SELECT version FROM orders WHERE order_id = 1) THEN
    -- 更新订单状态和版本号
    UPDATE orders SET status = '已确认', version = @current_version + 1 WHERE order_id = 1;
    SELECT '订单已确认' AS message;
ELSE
    SELECT '订单更新失败：版本号不匹配' AS message;
END IF;

COMMIT;
```

在上面的示例中，我们首先使用 `SELECT` 语句读取订单的当前状态和版本号，然后使用 `UPDATE` 语句来更新订单的状态和版本号。在更新之前，我们检查当前版本号是否与初始版本号匹配，如果匹配则更新订单状态和版本号，否则更新失败。

