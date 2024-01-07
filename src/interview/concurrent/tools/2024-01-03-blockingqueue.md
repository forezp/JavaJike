---
lang: zh-CN
title: BlockingQueue详解
headerDepth: 1
order: 9
icon: wuliu
collapsible: false
description: BlockingQueue详解
---

google-site-verification=5Sx1Ko4M39zIL01OlNc4To63Vx0yoNQ5AnFtinbe278

## 什么是BlockingQueue

`BlockingQueue` 是 Java 并发包中的一个接口，它是一种特殊的队列。该队列支持在队列已满或为空时的阻塞操作。`BlockingQueue`允许线程安全地进行队列操作，并提供了一种有效的方式来进行线程间的数据交换。

以下是 `BlockingQueue` 的一些关键特点：

1. **阻塞操作：** `BlockingQueue` 提供了一系列的阻塞队列操作，如 `put`（插入元素）、`take`（获取并移除队首元素）、`offer`（插入元素但不阻塞）、`poll`（获取并移除队首元素但不阻塞）等。这些操作能够在队列满或为空时进行阻塞，直到条件满足。

2. **线程安全：** `BlockingQueue` 的实现通常是线程安全的，这意味着你可以在多个线程中安全地操作队列而无需额外的同步控制。

3. **数据交换：** `BlockingQueue` 可以用来进行线程间的数据交换。例如，一个线程可以向队列提交任务，而另一个线程则可以从队列中获取任务并执行。

   

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/3/java-thread-x-blocking-queue-1.png)

## BlockingQueue接口定义

`BlockingQueue`接口继承了`Queue`接口，在Queue接口基础上，又提供了其他方法，其源码如下：

```
public interface BlockingQueue<E> extends Queue<E> {
    /**
     * 入队一个元素，如果有空间则直接插入，并返回true；
     * 如果没有空间则抛出IllegalStateException
     */
    boolean add(E e);

    /**
     * 入队一个元素，如果有空间则直接插入，并返回true；
     * 如果没有空间返回false
     */
    boolean offer(E e);

    /**
     * 入队一个元素，如果有空间则直接插入，如果没有空间则一直阻塞等待
     */
    void put(E e) throws InterruptedException;

    /**
     * 入队一个元素，如果有空间则直接插入，并返回true；
     * 如果没有空间则等待timeout时间，插入失败则返回false
     */
    boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException;

    /**
     * 出队一个元素，如果存在则直接出队，如果没有空间则一直阻塞等待
     */
    E take() throws InterruptedException;

    /**
     * 出队一个元素，如果存在则直接出队，如果没有空间则等待timeout时间，无元素则返回null
     */
    E poll(long timeout, TimeUnit unit) throws InterruptedException;

    /**
     * 返回该队列剩余的容量（如果没有限制则返回Integer.MAX_VALUE）
     */
    int remainingCapacity();

    /**
     * 如果元素o在队列中存在，则从队列中删除
     */
    boolean remove(Object o);

    /**
     * 判断队列中是否存在元素o
     */
    public boolean contains(Object o);

    /**
     * 将队列中的所有元素出队，并添加到给定的集合c中，返回出队的元素数量
     */
    int drainTo(Collection<? super E> c);

    /**
     * 将队列中的元素出队，限制数量maxElements个，并添加到给定的集合c中，返回出队的元素数量
     */
    int drainTo(Collection<? super E> c, int maxElements);
}

```



`BlockingQueue` 接口提供了一系列方法来支持队列的操作，包括入队、出队以及获取队首元素，这些方法可以通过不同的方式来处理队列已满或为空的情况，以满足不同的需求。

| 方法         | 抛出异常    | 返回特定值 | 阻塞     | 阻塞特定时间           |
| ------------ | ----------- | ---------- | -------- | ---------------------- |
| 入队         | `add(e)`    | `offer(e)` | `put(e)` | `offer(e, time, unit)` |
| 出队         | `remove()`  | `poll()`   | `take()` | `poll(time, unit)`     |
| 获取队首元素 | `element()` | `peek()`   | 不支持   | 不支持                 |

- **抛出异常：** 通过 `add()`、`remove()`、`element()` 方法在队列已满或为空时会抛出异常。

- **返回特定值：** 通过 `offer()`、`poll()`、`peek()` 方法在队列已满或为空时会返回特定值。

- **阻塞：** 通过 `put()`、`take()` 方法在队列已满或为空时会阻塞当前线程，直到条件满足。

- **阻塞特定时间：** 通过 `offer(e, time, unit)`、`poll(time, unit)` 方法在队列已满或为空时会阻塞当前线程一段特定的时间，在给定的时间内等待条件的成立。



## BlockingQueue实现



`BlockingQueue` 接口有多个实现类，下表列出了 `BlockingQueue` 的主要实现类及其功能：

| 实现类                  | 功能                                               |
| ----------------------- | -------------------------------------------------- |
| `ArrayBlockingQueue`    | 基于数组的阻塞队列，需要指定长度，有界队列         |
| `LinkedBlockingQueue`   | 基于链表的阻塞队列，默认为无界队列，也可以设置容量 |
| `SynchronousQueue`      | 没有缓冲的队列，生产者产生的数据会立即被消费者获取 |
| `PriorityBlockingQueue` | 基于优先级的阻塞队列，元素按优先级顺序出队         |
| `DelayQueue`            | 延迟队列，元素需要等待指定延迟时间后才能出队       |

在日常开发中，最常用的是 `ArrayBlockingQueue` 和 `LinkedBlockingQueue`。下面简要介绍这两个实现类的原理：

**`ArrayBlockingQueue`：** 它基于数组实现，需要指定队列的长度，在队列已满时将会阻塞入队操作，直到队列有空间可用。在队列为空时，出队操作也会被阻塞，直到队列有元素可用。它是一个有界队列，适用于需要限制队列长度的场景。

**`LinkedBlockingQueue`：** 它基于链表实现，默认情况下是一个无界队列，也可以通过指定容量来创建有界队列。它的入队和出队操作都是阻塞的，当队列已满时进行入队操作将会阻塞，直到队列有空间可用。当队列为空时进行出队操作也会被阻塞，直到队列有元素可用。它适用于需要灵活增减队列长度的场景。



## ArrayBlockingQueue使用介绍



下面是一个使用 `ArrayBlockingQueue` 的示例代码，展示了如何在生产者-消费者模式中使用 `ArrayBlockingQueue` 实现线程安全的数据传递。

```java
import java.util.concurrent.ArrayBlockingQueue;

public class ProducerConsumerExample {
    // 创建一个最多存储3个元素的 ArrayBlockingQueue
    private static ArrayBlockingQueue<Integer> queue = new ArrayBlockingQueue<>(3);

    public static void main(String[] args) {
        // 创建一个生产者线程和一个消费者线程
        Thread producerThread = new Thread(new Producer());
        Thread consumerThread = new Thread(new Consumer());

        // 启动两个线程
        producerThread.start();
        consumerThread.start();
    }

    static class Producer implements Runnable {
        @Override
        public void run() {
            try {
                int count = 1;
                while (true) {
                    // 将数据放入队列中
                    queue.put(count);
                    System.out.println("生产者生产数据：" + count);
                    count++;
                    // 等待一段时间后继续生产数据
                    Thread.sleep(1000);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    static class Consumer implements Runnable {
        @Override
        public void run() {
            try {
                while (true) {
                    // 从队列中取出数据
                    int data = queue.take();
                    System.out.println("消费者消费数据：" + data);
                    // 等待一段时间后继续消费数据
                    Thread.sleep(2000);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

在上述示例中，我们创建了一个 `ArrayBlockingQueue` 对象 `queue`，它的容量为3，即最多可以存储3个元素。

然后，我们创建了一个生产者线程和一个消费者线程，并启动这两个线程。

生产者线程持续生产数据，每次生产一个数并将其放入队列中，然后等待1秒钟后继续生产。消费者线程从队列中取出数据并进行消费，每次消费一个数，然后等待2秒钟后继续消费。

通过 `ArrayBlockingQueue` 的阻塞特性，当队列已满时，生产者线程将会被阻塞，直到队列有空间可用。当队列为空时，消费者线程将会被阻塞，直到队列有元素可用。

这样，通过 `ArrayBlockingQueue` 的线程安全和阻塞机制，生产者和消费者可以在多线程环境下安全地进行数据传递，实现了生产者-消费者模式的功能。



## ArrayBlockingQueue源码实现



### 类的继承关系　

```
public class ArrayBlockingQueue<E> extends AbstractQueue<E>
        implements BlockingQueue<E>, java.io.Serializable {}
```

可以看到ArrayBlockingQueue继承了AbstractQueue抽象类，AbstractQueue定义了对队列的基本操作；同时实现了BlockingQueue接口，BlockingQueue表示阻塞型的队列，其对队列的操作可能会抛出异常；同时也实现了Searializable接口，表示可以被序列化。



### 类的属性　

```
public class ArrayBlockingQueue<E> extends AbstractQueue<E>
        implements BlockingQueue<E>, java.io.Serializable {
    // 版本序列号
    private static final long serialVersionUID = -817911632652898426L;
    // 存放实际元素的数组
    final Object[] items;
    // 取元素索引
    int takeIndex;
    // 获取元素索引
    int putIndex;
    // 队列中的项
    int count;
    // 可重入锁
    final ReentrantLock lock;
    // 等待获取条件
    private final Condition notEmpty;
    // 等待存放条件
    private final Condition notFull;
    // 迭代器
    transient Itrs itrs = null;
}
```

从类的属性中可以清楚的看到其底层的结构是Object类型的数组，取元素和存元素有不同的索引，有一个可重入锁ReentrantLock，两个条件Condition。



### 类的构造函数

**ArrayBlockingQueue(int)型构造函数**　

```
    public ArrayBlockingQueue(int capacity) {
        // 调用两个参数的构造函数
        this(capacity, false);
    }
```

该构造函数用于创建一个带有给定的（固定）容量和默认访问策略的 ArrayBlockingQueue。



 **ArrayBlockingQueue(int, boolean)型构造函数**　　

```
    public ArrayBlockingQueue(int capacity, boolean fair) {
        // 初始容量必须大于0
        if (capacity <= 0)
            throw new IllegalArgumentException();
        // 初始化数组
        this.items = new Object[capacity];
        // 初始化可重入锁
        lock = new ReentrantLock(fair);
        // 初始化等待条件
        notEmpty = lock.newCondition();
        notFull =  lock.newCondition();
    }
```

该构造函数用于创建一个具有给定的（固定）容量和指定访问策略的 ArrayBlockingQueue。



**ArrayBlockingQueue(int, boolean, Collection<? extends E>)型构造函数**　

```
    public ArrayBlockingQueue(int capacity, boolean fair,
                              Collection<? extends E> c) {
        // 调用两个参数的构造函数
        this(capacity, fair);
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 上锁
        lock.lock(); // Lock only for visibility, not mutual exclusion
        try {
            int i = 0;
            try {
                for (E e : c) { // 遍历集合
                    // 检查元素是否为空
                    checkNotNull(e);
                    // 存入ArrayBlockingQueue中
                    items[i++] = e;
                }
            } catch (ArrayIndexOutOfBoundsException ex) { // 当初始化容量小于传入集合的大小时，会抛出异常
                throw new IllegalArgumentException();
            }
            // 元素数量
            count = i;
            // 初始化存元素的索引
            putIndex = (i == capacity) ? 0 : i;
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
```

该构造函数用于创建一个具有给定的（固定）容量和指定访问策略的 ArrayBlockingQueue，它最初包含给定 collection 的元素，并以 collection 迭代器的遍历顺序添加元素。



### 核心函数分析



#### put函数　　

```
    public void put(E e) throws InterruptedException {
        checkNotNull(e);
        // 获取可重入锁
        final ReentrantLock lock = this.lock;
        // 如果当前线程未被中断，则获取锁
        lock.lockInterruptibly();
        try {
            while (count == items.length) // 判断元素是否已满
                // 若满，则等待
                notFull.await();
            // 入队列
            enqueue(e);
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
```

put函数用于存放元素，在当前线程被中断时会抛出异常，并且当队列已经满时，会阻塞一直等待。其中，put会调用enqueue函数，enqueue函数源码如下：

```
private void enqueue(E x) {
        // assert lock.getHoldCount() == 1;
        // assert items[putIndex] == null;
        // 获取数组
        final Object[] items = this.items;
        // 将元素放入
        items[putIndex] = x;
        if (++putIndex == items.length) // 放入后存元素的索引等于数组长度（表示已满）
            // 重置存索引为0
            putIndex = 0;
        // 元素数量加1
        count++;
        // 唤醒在notEmpty条件上等待的线程
        notEmpty.signal();
    }
```

enqueue函数用于将元素存入底层Object数组中，并且会唤醒等待notEmpty条件的线程。



#### offer函数

```
public boolean offer(E e) {
        // 检查元素不能为空
        checkNotNull(e);
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            if (count == items.length) // 元素个数等于数组长度，则返回
                return false; 
            else { // 添加进数组
                enqueue(e);
                return true;
            }
        } finally {
            // 释放数组
            lock.unlock();
        }
    }
```

offer函数也用于存放元素，在调用ArrayBlockingQueue的add方法时，会间接的调用到offer函数，offer函数添加元素不会抛出异常，当底层Object数组已满时，则返回false，否则，会调用enqueue函数，将元素存入底层Object数组。并唤醒等待notEmpty条件的线程。

#### take函数　　

```
 public E take() throws InterruptedException {
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 如果当前线程未被中断，则获取锁，中断会抛出异常
        lock.lockInterruptibly();
        try {
            while (count == 0) // 元素数量为0，即Object数组为空
                // 则等待notEmpty条件
                notEmpty.await();
            // 出队列
            return dequeue();
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
```

take函数用于从ArrayBlockingQueue中获取一个元素，其与put函数相对应，在当前线程被中断时会抛出异常，并且当队列为空时，会阻塞一直等待。其中，take会调用dequeue函数，dequeue函数源码如下：

```
 private E dequeue() {
        // assert lock.getHoldCount() == 1;
        // assert items[takeIndex] != null;
        final Object[] items = this.items;
        @SuppressWarnings("unchecked")
        // 取元素
        E x = (E) items[takeIndex];
        // 该索引的值赋值为null
        items[takeIndex] = null;
        // 取值索引等于数组长度
        if (++takeIndex == items.length)
            // 重新赋值取值索引
            takeIndex = 0;
        // 元素个数减1
        count--;
        if (itrs != null) 
            itrs.elementDequeued();
        // 唤醒在notFull条件上等待的线程
        notFull.signal();
        return x;
    }
```

dequeue函数用于将取元素，并且会唤醒等待notFull条件的线程。



#### poll函数　　

```
 public E poll() {
        // 重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            // 若元素个数为0则返回null，否则，调用dequeue，出队列
            return (count == 0) ? null : dequeue();
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
```

poll函数用于获取元素，其与offer函数相对应，不会抛出异常，当元素个数为0是，返回null，否则，调用dequeue函数，并唤醒等待notFull条件的线程。并返回。



#### clear函数　　

```
public void clear() {
        // 数组
        final Object[] items = this.items;
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            // 保存元素个数
            int k = count;
            if (k > 0) { // 元素个数大于0
                // 存数元素索引
                final int putIndex = this.putIndex;
                // 取元素索引
                int i = takeIndex;
                do {
                    // 赋值为null
                    items[i] = null;
                    if (++i == items.length) // 重新赋值i
                        i = 0;
                } while (i != putIndex);
                // 重新赋值取元素索引
                takeIndex = putIndex;
                // 元素个数为0
                count = 0;
                if (itrs != null)
                    itrs.queueIsEmpty();
                for (; k > 0 && lock.hasWaiters(notFull); k--) // 若有等待notFull条件的线程，则逐一唤醒
                    notFull.signal();
            }
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
```

clear函数用于清空ArrayBlockingQueue，并且会释放所有等待notFull条件的线程（存放元素的线程）。　　



### 参考

https://www.cnblogs.com/leesf456/p/5533770.html



