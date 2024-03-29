---
lang: zh-CN
title: CyclicBarrier源码解析
headerDepth: 1
order: 4
icon: tiaoxingma
collapsible: false
description: CyclicBarrier源码解析
---

## CyclicBarrier简介

CyclicBarrier 是 Java 并发包中提供的一种同步工具，它可以让多个线程在某个屏障点（barrier point）上相互等待，直到所有线程都到达屏障点才可以继续执行。

CyclicBarrier 的设计思想是在多线程任务中形成一个屏障，使得线程能够互相等待，然后同时开始后续操作。

CyclicBarrier 的主要特点包括：

1. 循环使用：与 CountDownLatch 不同，CyclicBarrier 可以被重置并再次使用。当所有线程都到达屏障点后，所有线程会被释放，CyclicBarrier 的内部计数器会被重置并重新开始等待。
2. 等待线程数量控制：和 CountDownLatch 不同，CyclicBarrier 要求所有应等待线程数在创建时就指定，并且等待线程数可以动态地改变。
4. 互相等待：在屏障点上，所有线程会相互等待，直到所有线程都到达后才能继续执行后续操作，从而实现了多个线程的同步。



## CyclicBarrier使用示例

在CountDownLatch使用示例，我们每次在执行while (hasOrder) {}方法体里面每次都去创建一个CountDownLatch去做线程的同步等待。我们可以使用CyclicBarrier也可以达到同样的效果。示例代码如下：

```
package io.github.forezp.concurrentlab.syntools;

import java.util.concurrent.*;

public class CyclicBarrierDemo2 {

    static ExecutorService executorService = Executors.newFixedThreadPool(2);

    public static void main(String[] args) throws InterruptedException, BrokenBarrierException {

        CyclicBarrier cyclicBarrier =new CyclicBarrier(3);
        boolean hasOrder = true;
        while (hasOrder) {

            //查询订单
            executorService.submit(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(500);
                        System.out.println("查询订单");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }finally {
                        try {
                            cyclicBarrier.await();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        } catch (BrokenBarrierException e) {
                            e.printStackTrace();
                        }
                    }

                }
            });

            //查询派单
            executorService.submit(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(500);
                        System.out.println("查询派单");
                        cyclicBarrier.await();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    } catch (BrokenBarrierException e) {
                        e.printStackTrace();
                    }


                }
            });

            cyclicBarrier.await();
            //执行对账
            Thread.sleep(500);
            System.out.println("对账成功");
            System.out.println("---------");
        }
    }
}

```

上面这段代码使用了CyclicBarrier来模拟多个线程之间的同步。整个代码的逻辑流程如下：

1. 创建线程池和CyclicBarrier对象。
2. 进入循环，模拟多次执行订单查询、派单查询和对账操作。
3. 在每次循环中，提交查询订单的任务和查询派单的任务。这两个任务都会等待其他线程到达屏障点。
4. 当两个任务提交完成后，进入屏障点等待，直到所有线程都到达屏障点，才会继续执行。
5. 执行对账操作，然后循环继续。

将 `cyclicBarrier.await()` 的位置移到了 `finally` 块中。这样无论线程是否发生异常，都能够保证在最后调用 await 方法，避免出现死锁或永久等待的情况。



## CyclicBarrier源码解析



### CyclicBarrier数据结构

分析源码可以知道，CyclicBarrier底层是基于ReentrantLock和AbstractQueuedSynchronizer来实现的，所以，CyclicBarrier的数据结构也依托于AQS的数据结构，在前面对AQS的分析中已经指出了其数据结构，在这里不再累赘。



### 类的继承关系

```
public class CyclicBarrier {}
```

说明：可以看到CyclicBarrier没有显示继承哪个父类或者实现哪个父接口，根据Java语言规定，可知其父类是Object。



### 类的内部类

CyclicBarrier类存在一个内部类Generation，每一次使用的CycBarrier可以当成Generation的实例，其源代码如下

```
private static class Generation {
    boolean broken = false;
}
```

说明：Generation类有一个属性broken，用来表示当前屏障是否被损坏。



###  类的属性　

```
public class CyclicBarrier {
    
    /** The lock for guarding barrier entry */
    // 可重入锁
    private final ReentrantLock lock = new ReentrantLock();
    /** Condition to wait on until tripped */
    // 条件队列
    private final Condition trip = lock.newCondition();
    /** The number of parties */
    // 参与的线程数量
    private final int parties;
    /* The command to run when tripped */
    // 由最后一个进入 barrier 的线程执行的操作
    private final Runnable barrierCommand;
    /** The current generation */
    // 当前代
    private Generation generation = new Generation();
    // 正在等待进入屏障的线程数量
    private int count;
}
```

说明：该属性有一个为ReentrantLock对象，有一个为Condition对象，而Condition对象又是基于AQS的，所以，归根到底，底层还是由AQS提供支持。



### 类的构造函数

#### CyclicBarrier(int, Runnable)型构造函数　

```
public CyclicBarrier(int parties, Runnable barrierAction) {
        // 参与的线程数量小于等于0，抛出异常
        if (parties <= 0) throw new IllegalArgumentException();
        // 设置parties
        this.parties = parties;
        // 设置count
        this.count = parties;
        // 设置barrierCommand
        this.barrierCommand = barrierAction;
    }
```

说明：该构造函数可以指定关联该CyclicBarrier的线程数量，并且可以指定在所有线程都进入屏障后的执行动作，该执行动作由最后一个进行屏障的线程执行。

####  CyclicBarrier(int)型构造函数　

```
public CyclicBarrier(int parties) {
        // 调用含有两个参数的构造函数
        this(parties, null);
    }
```

说明：该构造函数仅仅执行了关联该CyclicBarrier的线程数量，没有设置执行动作。

### 核心函数分析

#### dowait函数

此函数为CyclicBarrier类的核心函数，CyclicBarrier类对外提供的await函数在底层都是调用该了doawait函数，其源代码如下：

```
private int dowait(boolean timed, long nanos)
        throws InterruptedException, BrokenBarrierException,
               TimeoutException {
        // 保存当前锁
        final ReentrantLock lock = this.lock;
        // 锁定
        lock.lock();
        try {
            // 保存当前代
            final Generation g = generation;
            
            if (g.broken) // 屏障被破坏，抛出异常
                throw new BrokenBarrierException();

            if (Thread.interrupted()) { // 线程被中断
                // 损坏当前屏障，并且唤醒所有的线程，只有拥有锁的时候才会调用
                breakBarrier();
                // 抛出异常
                throw new InterruptedException();
            }
            
            // 减少正在等待进入屏障的线程数量
            int index = --count;
            if (index == 0) {  // 正在等待进入屏障的线程数量为0，所有线程都已经进入
                // 运行的动作标识
                boolean ranAction = false;
                try {
                    // 保存运行动作
                    final Runnable command = barrierCommand;
                    if (command != null) // 动作不为空
                        // 运行
                        command.run();
                    // 设置ranAction状态
                    ranAction = true;
                    // 进入下一代
                    nextGeneration();
                    return 0;
                } finally {
                    if (!ranAction) // 没有运行的动作
                        // 损坏当前屏障
                        breakBarrier();
                }
            }

            // loop until tripped, broken, interrupted, or timed out
            // 无限循环
            for (;;) {
                try {
                    if (!timed) // 没有设置等待时间
                        // 等待
                        trip.await(); 
                    else if (nanos > 0L) // 设置了等待时间，并且等待时间大于0
                        // 等待指定时长
                        nanos = trip.awaitNanos(nanos);
                } catch (InterruptedException ie) { 
                    if (g == generation && ! g.broken) { // 等于当前代并且屏障没有被损坏
                        // 损坏当前屏障
                        breakBarrier();
                        // 抛出异常
                        throw ie;
                    } else { // 不等于当前带后者是屏障被损坏
                        // We're about to finish waiting even if we had not
                        // been interrupted, so this interrupt is deemed to
                        // "belong" to subsequent execution.
                        // 中断当前线程
                        Thread.currentThread().interrupt();
                    }
                }

                if (g.broken) // 屏障被损坏，抛出异常
                    throw new BrokenBarrierException();

                if (g != generation) // 不等于当前代
                    // 返回索引
                    return index;

                if (timed && nanos <= 0L) { // 设置了等待时间，并且等待时间小于0
                    // 损坏屏障
                    breakBarrier();
                    // 抛出异常
                    throw new TimeoutException();
                }
            }
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
```

说明：dowait方法的逻辑会进行一系列的判断，大致流程如下：

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/23/616953-20160416091245176-498905979.png)

#### nextGeneration函数　

此函数在所有线程进入屏障后会被调用，即生成下一个版本，所有线程又可以重新进入到屏障中，其源代码如下：　　

```
 private void nextGeneration() {
        // signal completion of last generation
        // 唤醒所有线程
        trip.signalAll();
        // set up next generation
        // 恢复正在等待进入屏障的线程数量
        count = parties;
        // 新生一代
        generation = new Generation();
    }
```

在此函数中会调用AQS的signalAll方法，即唤醒所有等待线程。如果所有的线程都在等待此条件，则唤醒所有线程。其源代码如下：

```
public final void signalAll() {
            if (!isHeldExclusively()) // 不被当前线程独占，抛出异常
                throw new IllegalMonitorStateException();
            // 保存condition队列头结点
            Node first = firstWaiter;
            if (first != null) // 头结点不为空
                // 唤醒所有等待线程
                doSignalAll(first);
        }
```

此函数判断头结点是否为空，即条件队列是否为空，然后会调用doSignalAll函数，doSignalAll函数源码如下：

```
private void doSignalAll(Node first) {
            // condition队列的头结点尾结点都设置为空
            lastWaiter = firstWaiter = null;
            // 循环
            do {
                // 获取first结点的nextWaiter域结点
                Node next = first.nextWaiter;
                // 设置first结点的nextWaiter域为空
                first.nextWaiter = null;
                // 将first结点从condition队列转移到sync队列
                transferForSignal(first);
                // 重新设置first
                first = next;
            } while (first != null);
        }
```

此函数会依次将条件队列中的节点转移到同步队列中，会调用到transferForSignal函数，其源码如下：

```
    final boolean transferForSignal(Node node) {
        /*
         * If cannot change waitStatus, the node has been cancelled.
         */
        if (!compareAndSetWaitStatus(node, Node.CONDITION, 0))
            return false;

        /*
         * Splice onto queue and try to set waitStatus of predecessor to
         * indicate that thread is (probably) waiting. If cancelled or
         * attempt to set waitStatus fails, wake up to resync (in which
         * case the waitStatus can be transiently and harmlessly wrong).
         */
        Node p = enq(node);
        int ws = p.waitStatus;
        if (ws > 0 || !compareAndSetWaitStatus(p, ws, Node.SIGNAL))
            LockSupport.unpark(node.thread);
        return true;
    }
```

此函数的作用就是将处于条件队列中的节点转移到同步队列中，并设置结点的状态信息，其中会调用到enq函数，其源代码如下：

```
private Node enq(final Node node) {
        for (;;) { // 无限循环，确保结点能够成功入队列
            // 保存尾结点
            Node t = tail;
            if (t == null) { // 尾结点为空，即还没被初始化
                if (compareAndSetHead(new Node())) // 头结点为空，并设置头结点为新生成的结点
                    tail = head; // 头结点与尾结点都指向同一个新生结点
            } else { // 尾结点不为空，即已经被初始化过
                // 将node结点的prev域连接到尾结点
                node.prev = t; 
                if (compareAndSetTail(t, node)) { // 比较结点t是否为尾结点，若是则将尾结点设置为node
                    // 设置尾结点的next域为node
                    t.next = node; 
                    return t; // 返回尾结点
                }
            }
        }
    }
```

此函数完成了结点插入同步队列的过程，也很好理解。综合上面的分析可知，newGeneration函数的主要方法的调用如下，之后会通过一个例子详细讲解。　　

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/23/616953-20160416105524973-1191616489.png)

#### breakBarrier函数

此函数的作用是损坏当前屏障，会唤醒所有在屏障中的线程。源代码如下：

```
private void breakBarrier() {
        // 设置状态
        generation.broken = true;
        // 恢复正在等待进入屏障的线程数量
        count = parties;
        // 唤醒所有线程
        trip.signalAll();
    }
```

可以看到，此函数也调用了AQS的signalAll函数，由signal函数提供支持。



### 参考

https://www.cnblogs.com/leesf456/p/5392816.html

<!-- @include: @article-footer.snippet.md -->