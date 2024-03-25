---
lang: zh-CN
title: 请你说说事务的特性？
headerDepth: 0
order: 26
description: 请你说说事务的特性？
---



事务通常是指关系型数据库的一个操作序列，它是多个数据库操作组成的逻辑单元，这个逻辑单元的所有操作要么全部执行成功，要么全部执行失败。事务具有以下四个特性，通常被称为ACID特性：

1. **原子性（Atomicity）**：原子性要求事务中的所有操作要么全部执行成功，要么全部失败回滚，即事务是不可分割的最小执行单位。如果事务中的任何一个操作失败，则整个事务都会被回滚到初始状态。

2. **一致性（Consistency）**：一致性确保事务的执行使数据库从一个一致性状态转移到另一个一致性状态。事务执行前后，数据库的完整性约束不会被破坏。

3. **隔离性（Isolation）**：隔离性指的是多个事务并发执行时，每个事务都不受其他事务的影响。隔离性要求每个事务的操作及其结果对其他事务是隔离的，即使在并发执行的情况下也是如此。

4. **持久性（Durability）**：持久性确保一旦事务提交，其对数据库的修改就是永久性的。即使系统发生故障，如断电、崩溃等，修改的数据也不会丢失。持久性通常通过将事务的操作日志（比如Mysql的redo日志和undo日志）写入到稳定的存储介质（如磁盘）来实现，以便在系统恢复时能够重放日志来重新应用事务。

<!-- @include: @article-footer.snippet.md -->