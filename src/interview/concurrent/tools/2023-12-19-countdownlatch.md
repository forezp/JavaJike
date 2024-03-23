---
lang: zh-CN
title: CountDownLatch源码解析
headerDepth: 1
order: 3
icon: suyuan
collapsible: false
description: CountDownLatch源码解析
---



## CountDownLatch简介

CountDownLatch 是 Java 并发包中提供的一种同步工具，它可以让一个或多个线程等待其他线程完成操作之后再继续执行。

CountDownLatch 主要包括两个重要的方法：

1. `await()`: 当一个线程调用 await() 方法时，它会被阻塞，直到计数器 count 减为 0，即其他线程已经完成任务，才能继续执行。

2. `countDown()`: 每当一个线程完成了自己的任务时，需要调用 countDown() 方法使得计数器 count 减一，表示一个工作任务已经完成。

通过这两个方法，可以实现线程之间的协调和同步，等待所有任务完成后再进行后续操作。



## CountDownLatch使用示例

假设有一个对账系统，订单量和派送单量巨大，需要查询订单和派单的数量，并执行对账操作。其中查询订单和派单是可以异步执行了，执行了这2个操作，再执行对账操作。

其中一种写法，使用join函数：

```
public class JoinDemo {

    public static void main(String[] args) throws InterruptedException {
        //查询订单
        boolean hasOrder=true;
        while (hasOrder){
            Thread t1=new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("查询订单");
                }
            });

            //查询派单
            Thread t2=new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("查询派单");
                }
            });
            t1.start();
            t2.start();
            t1.join();
            t2.join();
            //执行对账
            Thread.sleep(500);
            System.out.println("对账成功");
            System.out.println("---------");
        }
    }
}
```

在上面的代码中，创建了两个线程 T1 和 T2，并行执行查询未对账订单 和查询派送单  这两个操作。在主线程中执行对账操作。不过需要注意的是：主线程需要等待线程 T1 和 T2 执行完才能执行对账操作，为此我们通过调用 T1.join() 和 T2.join() 来实现等待，当 T1 和 T2 线程退出时，调用 T1.join() 和 T2.join() 的主线程就会从阻塞态被唤醒，从而执行之后的对账。



但是有while 循环里面每次都会创建新的线程，而创建线程可是个耗时的操作。所以线程池就能解决这个问题。但是如果使用线程池就不能使用线程的Join()方法。

我们可以使用一个计数器，初始值设置成 2，当执行完未对账订单 和查询派送单操作各减1，知道到0，才执行主线程的对账操作。

在 Java 并发包里提供的CountDownLatch，也可以解决上面的问题，直接上代码：

```
package io.github.forezp.concurrentlab.syntools;

import io.github.forezp.concurrentlab.bfart.threadpool.ThreadPool;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CountDownLatchDemo2 {


    static ExecutorService executorService = Executors.newFixedThreadPool(2);

    public static void main(String[] args) throws InterruptedException {


        boolean hasOrder = true;
        while (hasOrder) {
            CountDownLatch latch=new CountDownLatch(2);
            //查询订单
            executorService.submit(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("查询订单");
                    latch.countDown();
                }
            });

            //查询派单
            executorService.submit(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("查询派单");
                    latch.countDown();
                }
            });

            latch.await();
            //执行对账
            Thread.sleep(500);
            System.out.println("对账成功");
            System.out.println("---------");
        }
    }
}

```

执行上面代码，输出：

> 查询订单
> 查询派单
>
> 对账成功



## CountDownLatch源码解析



### CountDownLatch数据结构

从源码可知，其底层是由AQS提供支持，所以其数据结构可以参考AQS的数据结构，而AQS的数据结构核心就是两个虚拟队列：同步队列sync queue 和条件队列condition queue，不同的条件会有不同的条件队列。读者可以参考之前介绍的AQS。



###  类的继承关系　

```
public class CountDownLatch {}
```

可以看到CountDownLatch没有显示继承哪个父类或者实现哪个父接口，根据Java语言规定，可知其父类是Object。



### 类的属性　

```
public class CountDownLatch {
    // 同步队列
    private final Sync sync;
}
```

可以看到CountDownLatch类的内部只有一个Sync类型的属性，这个属性相当重要，后面会进行分析。



### 类的构造函数

CountDownLatch(int) 型构造函数：

```
public CountDownLatch(int count) {
        if (count < 0) throw new IllegalArgumentException("count < 0");
        // 初始化状态数
        this.sync = new Sync(count);
    }
```

该构造函数可以构造一个用给定计数初始化的CountDownLatch，并且构造函数内完成了sync的初始化，并设置了状态数。



### 类的内部类

CountDownLatch类存在一个内部类Sync，继承自AbstractQueuedSynchronizer，其源代码如下。

```
private static final class Sync extends AbstractQueuedSynchronizer {
        // 版本号
        private static final long serialVersionUID = 4982264981922014374L;
        
        // 构造器
        Sync(int count) {
            setState(count);
        }
        
        // 返回当前计数
        int getCount() {
            return getState();
        }

        // 试图在共享模式下获取对象状态
        protected int tryAcquireShared(int acquires) {
            return (getState() == 0) ? 1 : -1;
        }

        // 试图设置状态来反映共享模式下的一个释放
        protected boolean tryReleaseShared(int releases) {
            // Decrement count; signal when transition to zero
            // 无限循环
            for (;;) {
                // 获取状态
                int c = getState();
                if (c == 0) // 没有被线程占有
                    return false;
                // 下一个状态
                int nextc = c-1;
                if (compareAndSetState(c, nextc)) // 比较并且设置成功
                    return nextc == 0;
            }
        }
    }
```

对CountDownLatch方法的调用会转发到对Sync或AQS的方法的调用，所以，AQS对CountDownLatch提供支持。



### await函数

此函数将会使当前线程在锁存器倒计数至零之前一直等待，除非线程被中断。其源码如下　　

```
 public void await() throws InterruptedException {
        // 转发到sync对象上
        sync.acquireSharedInterruptibly(1);
    }
```

源码可知，对CountDownLatch对象的await的调用会转发为对Sync的acquireSharedInterruptibly（从AQS继承的方法）方法的调用，acquireSharedInterruptibly源码如下　　

```
 public final void acquireSharedInterruptibly(int arg)
            throws InterruptedException {
        if (Thread.interrupted())
            throw new InterruptedException();
        if (tryAcquireShared(arg) < 0)
            doAcquireSharedInterruptibly(arg);
    }
```

从源码中可知，acquireSharedInterruptibly又调用了CountDownLatch的内部类Sync的tryAcquireShared和AQS的doAcquireSharedInterruptibly函数。tryAcquireShared函数的源码如下　

```
  protected int tryAcquireShared(int acquires) {
            return (getState() == 0) ? 1 : -1;
        }
```

该函数只是简单的判断AQS的state是否为0，为0则返回1，不为0则返回-1。doAcquireSharedInterruptibly函数的源码如下　　

```
 private void doAcquireSharedInterruptibly(int arg)
        throws InterruptedException {
        // 添加节点至等待队列
        final Node node = addWaiter(Node.SHARED);
        boolean failed = true;
        try {
            for (;;) { // 无限循环
                // 获取node的前驱节点
                final Node p = node.predecessor();
                if (p == head) { // 前驱节点为头结点
                    // 试图在共享模式下获取对象状态
                    int r = tryAcquireShared(arg);
                    if (r >= 0) { // 获取成功
                        // 设置头结点并进行繁殖
                        setHeadAndPropagate(node, r);
                        // 设置节点next域
                        p.next = null; // help GC
                        failed = false;
                        return;
                    }
                }
                if (shouldParkAfterFailedAcquire(p, node) &&
                    parkAndCheckInterrupt()) // 在获取失败后是否需要禁止线程并且进行中断检查
                    // 抛出异常
                    throw new InterruptedException();
            }
        } finally {
            if (failed)
                cancelAcquire(node);
        }
    }
```

在AQS的doAcquireSharedInterruptibly中可能会再次调用CountDownLatch的内部类Sync的tryAcquireShared方法和AQS的setHeadAndPropagate方法。setHeadAndPropagate方法源码如下。　　

```
 private void setHeadAndPropagate(Node node, int propagate) {
        // 获取头结点
        Node h = head; // Record old head for check below
        // 设置头结点
        setHead(node);
       
        // 进行判断
        if (propagate > 0 || h == null || h.waitStatus < 0 ||
            (h = head) == null || h.waitStatus < 0) {
            // 获取节点的后继
            Node s = node.next;
            if (s == null || s.isShared()) // 后继为空或者为共享模式
                // 以共享模式进行释放
                doReleaseShared();
        }
    }
```

该方法设置头结点并且释放头结点后面的满足条件的结点，该方法中可能会调用到AQS的doReleaseShared方法，其源码如下。

```
private void doReleaseShared() {
       
        // 无限循环
        for (;;) {
            // 保存头结点
            Node h = head;
            if (h != null && h != tail) { // 头结点不为空并且头结点不为尾结点
                // 获取头结点的等待状态
                int ws = h.waitStatus; 
                if (ws == Node.SIGNAL) { // 状态为SIGNAL
                    if (!compareAndSetWaitStatus(h, Node.SIGNAL, 0)) // 不成功就继续
                        continue;            // loop to recheck cases
                    // 释放后继结点
                    unparkSuccessor(h);
                }
                else if (ws == 0 &&
                         !compareAndSetWaitStatus(h, 0, Node.PROPAGATE)) // 状态为0并且不成功，继续
                    continue;                // loop on failed CAS
            }
            if (h == head) // 若头结点改变，继续循环  
                break;
        }
    }
```

该方法在共享模式下释放，具体的流程再之后会通过一个示例给出。所以，对CountDownLatch的await调用大致会有如下的调用链。

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/19/616953-20160420173519335-325433593.png)

上图给出了可能会调用到的主要方法，并非一定会调用到，之后，会通过一个示例给出详细的分析。



### countDown函数

此函数将递减锁存器的计数，如果计数到达零，则释放所有等待的线程　

```
public void countDown() {
        sync.releaseShared(1);
    }
```

对countDown的调用转换为对Sync对象的releaseShared（从AQS继承而来）方法的调用。releaseShared源码如下　

```
  public final boolean releaseShared(int arg) {
        if (tryReleaseShared(arg)) {
            doReleaseShared();
            return true;
        }
        return false;
    }
```

此函数会以共享模式释放对象，并且在函数中会调用到CountDownLatch的tryReleaseShared函数，并且可能会调用AQS的doReleaseShared函数，其中，tryReleaseShared源码如下　　

```
 protected boolean tryReleaseShared(int releases) {
            // Decrement count; signal when transition to zero
            // 无限循环
            for (;;) {
                // 获取状态
                int c = getState();
                if (c == 0) // 没有被线程占有
                    return false;
                // 下一个状态
                int nextc = c-1;
                if (compareAndSetState(c, nextc)) // 比较并且设置成功
                    return nextc == 0;
            }
        }
```

此函数会试图设置状态来反映共享模式下的一个释放。具体的流程在下面的示例中会进行分析。AQS的doReleaseShared的源码如下　

```
 private void doReleaseShared() {
       
        // 无限循环
        for (;;) {
            // 保存头结点
            Node h = head;
            if (h != null && h != tail) { // 头结点不为空并且头结点不为尾结点
                // 获取头结点的等待状态
                int ws = h.waitStatus; 
                if (ws == Node.SIGNAL) { // 状态为SIGNAL
                    if (!compareAndSetWaitStatus(h, Node.SIGNAL, 0)) // 不成功就继续
                        continue;            // loop to recheck cases
                    // 释放后继结点
                    unparkSuccessor(h);
                }
                else if (ws == 0 &&
                         !compareAndSetWaitStatus(h, 0, Node.PROPAGATE)) // 状态为0并且不成功，继续
                    continue;                // loop on failed CAS
            }
            if (h == head) // 若头结点改变，继续循环  
                break;
        }
    }
```

此函数在共享模式下释放资源。

所以，对CountDownLatch的countDown调用大致会有如下的调用链。

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/19/616953-20160420172401757-1374685850.png)

图给出了可能会调用到的主要方法，并非一定会调用到，之后，会通过一个示例给出详细的分析。



### 参考文档

https://www.cnblogs.com/leesf456/p/5406191.html

<!-- @include: @article-footer.snippet.md -->