---
lang: zh-CN
title: count(*)比count(1)慢吗，它们有什么区别？
headerDepth: 0
order: 32
description: count(*)比count(1)慢吗，它们有什么区别
---



在绝大多数情况下，`COUNT(*)` 和 `COUNT(1)` 的性能是相同的，因为它们都执行了一个聚合操作来计算行数。不过，它们在语义上略有不同。

- `count(*)`包括了所有的列，相当于行数，在统计结果的时候，不会忽略列值为null
- `count(1)`包括了忽略所有列，用1代表代码行，在统计结果的时候，不会忽略列值为null
- `count(列名)`只包括列名那一列，在统计结果的时候，会忽略列值为空（这里的空不是只空字符串或者0，而是表示null 的计数，即某个字段值为null 时，不统计。

虽然从理论上讲 `COUNT(1)` 可能会稍微快一点，因为它不需要检查列的值是否为空，但是在实际情况下，现代数据库优化器通常会将它们优化为相同的执行计划。因此，大多数数据库系统中 `COUNT(*)` 和 `COUNT(1)` 的性能基本上是相同的。



在 MySQL 5.7 的官方手册中有这么一句话：

*InnoDB handles SELECT COUNT(`\*`) and SELECT COUNT(`1`) operations in the same way. There is no performance difference.*

翻译过来：InnoDB存储引擎中SELECT COUNT(`\*`) and SELECT COUNT(`1`) 执行相同的操作。没有性能上的差异。