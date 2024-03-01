---
lang: zh-CN
title: 并发容器详解
headerDepth: 1
order: 6
icon: shujujianguan
collapsible: false
description: 并发容器详解
---

Java并发包里有很多内容都是并发容器的内容，在多线程并发情况下也能安全的使用这些容器。在Java 的老版本的SDK中，提供了同步容器，比如Vector、Hashtable，这些都是基于synchronized关键字实现的，通常一个容器的所有操作共用一把锁，当容器数据量达到一定规模和读写量达到一定规模的时候，静态条件经常触发，性能比较差。



新版并发容器在设计上采用了更加细粒度的锁机制和无锁算法，从而提供了更好的并发性能。它们可以在不同的线程之间并发访问容器，而无需在每次访问时都获取全局锁。新版并发容器通过使用同步控制变量、CAS（Compare and Swap）操作、内部锁等机制，实现了高效的并发访问。



在juc包中，并发容器的数量非常多，可以把它们分为四类，分别是List、Map、Set 和 Queue，如下图所示：

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/24/image-20231224112118672.png" alt="image-20231224112118672" style="zoom: 50%;" />

## List

CopyOnWriteArrayList 提供了一种基于"写时复制"（Copy-On-Write）策略，以保证读操作的线程安全性，而在写操作时对数组进行复制，从而避免了写操作对读操作的影响。下面是CopyOnWriteArrayList的简单实现原理：

内部数组：
CopyOnWriteArrayList 内部维护了一个数组，所有的元素都存储在这个数组中。成员变量 array 就指向这个内部数组。

![image-20240101105046850](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/1/image-20240101105046850.png)

写时复制：
当有写操作（如添加、修改、删除元素）发生时，CopyOnWriteArrayList 会创建一个新的数组，并将修改后的元素添加到新数组中。这样一来，原始数组不会被修改，而是保持不变。

![image-20240101105106318](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/1/image-20240101105106318.png)

读操作：
所有的读操作都是基于原始的 array 进行的，因为写操作并不会修改原始数组，所以读操作可以完全不加锁，从而实现了读操作的线程安全性。

CopyOnWriteArrayList 内部采用写时复制的机制，通过创建新的数组来处理写操作，从而在读多写少的场景下提供了较好的性能。由于读操作无需加锁，因此适用于读操作频繁、写操作相对较少的多线程环境。



## Map

在并发包中提供类了ConcurrentHashMap和ConcurrentSkipListMap。ConcurrentHashMap 是一个线程安全且高效的哈希表实现，支持高并发的读写操作。它的key和value都不允许为null值。ConcurrentSkipListMap 是基于跳表的线程安全的有序映射实现，支持高并发的读写操作，并且它的key和value也不允许为null值

下面是一个总结了 Map 相关实现类对于 key 和 value 的要求的表格：

| 实现类                | key            | value          |
| --------------------- | -------------- | -------------- |
| HashMap               | 可为null （1） | 可为null （2） |
| HashTable             | 不可为null     | 不可为null     |
| LinkedHashMap         | 可为null （1） | 可为null （2） |
| TreeMap               | 不可为null     | 可为null       |
| ConcurrentHashMap     | 不可为null     | 不可为null     |
| ConcurrentSkipListMap | 不可为null     | 不可为null     |



## Set

在并发包里，提供了CopyOnWriteArraySet和ConcurrentSkipListSet 的两种实现。

- CopyOnWriteArraySet: 内部使用CopyOnWriteArrayList来实现，保证了读操作的线程安全性。在写操作时，会创建一个新的数组来完成写操作，从而避免了写操作对读操作的影响。适用于读多写少的场景，且无需保持顺序。
- ConcurrentSkipListSet: 内部使用ConcurrentSkipListMap来实现。它基于跳表的数据结构，在插入元素时会自动维护有序性。由于是有序的，适用于需要有序遍历的场景。



## Queue



Java并发包中的Queue是一类相对复杂的并发容器，可以通过以下两个维度进行分类。

1. 阻塞与非阻塞：
   - 阻塞：当队列已满时，入队操作会阻塞；当队列已空时，出队操作也会阻塞。阻塞队列都以Blocking关键字标识。
   - 非阻塞：当队列已满时，入队操作立即返回一个结果，可以是布尔值或异常。当队列已空时，出队操作也立即返回一个结果。

2. 单端与双端：
   - 单端：只能在队尾进行入队操作，在队首进行出队操作。标识为Queue。
   - 双端：既可以在队尾进行入队操作，也可以在队首进行出队操作。标识为Deque。

根据以上维度的组合，可以将Queue细分为四大类：
1. 单端阻塞队列：
   - ArrayBlockingQueue：使用数组实现的有界阻塞队列。
   - LinkedBlockingQueue：使用链表实现的有界或无界阻塞队列。
   - SynchronousQueue：不持有队列的阻塞队列，入队操作必须等待相应的出队操作。
   - LinkedTransferQueue：融合了LinkedBlockingQueue和SynchronousQueue的功能。
   - PriorityBlockingQueue：支持按照优先级出队的阻塞队列。
   - DelayQueue：支持延时出队的阻塞队列。

2. 双端阻塞队列：
   - LinkedBlockingDeque：使用链表实现的双端阻塞队列。

3. 单端非阻塞队列：
   - ConcurrentLinkedQueue：使用链表实现的非阻塞队列。

4. 双端非阻塞队列：
   - ConcurrentLinkedDeque：使用链表实现的双端非阻塞队列。

需要特别注意的是**，使用队列时要注意队列是否支持有界，即内部的队列是否有容量限制。只有ArrayBlockingQueue和LinkedBlockingQueue是支持有界的，其他队列都是无界的。因此，在使用无界队列时要注意潜在的OOM风险。**

以上是对Java并发包中Queue的分类和一些示例的说明。在实际工作中，需要根据具体需求选择适合的队列类型，并注意其特点和潜在的问题。



## 总结

在实际工作中，了解并掌握Java并发容器的特性很重要，但更关键的是能够正确地选择和使用适合的容器。每种容器都有其特定的用途和适应场景，因此，在选择容器时需要根据实际需求进行评估和决策。

同时，熟悉并理解每种容器的使用方法也很重要。可以通过查阅具体容器的API文档来了解它们的用法和详细说明。

接下来会从源码的角度来探讨几种经典的并发容器。