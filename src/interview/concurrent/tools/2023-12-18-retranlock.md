---
lang: zh-CN
title: ReentrantLock源码解析
headerDepth: 1
order: 2
icon: wuliu
collapsible: false
description: ReentrantLock源码解析
---



在分析了AbstractQueuedSynchronier源码后，接下来将具体分析ReentrantLock的源码。

## ReentrantLock数据结构

ReentrantLock的底层数据结构是借助AbstractQueuedSynchronizer实现，所以ReentrantLock数据结构依附于AbstractQueuedSynchronizer的数据结构，关于AQS的数据结构，可以看前面的文章。



## ReentrantLock类继承关系

ReentrantLock的继承关系如下：

```
public class ReentrantLock implements Lock, java.io.Serializable {
}
```

ReentrantLock实现了Lock接口，Lock接口中定义了lock与unlock相关操作，并且还存在newCondition方法，表示生成一个条件。Lock接口代码如下：

```
public interface Lock {

    void lock();
    void lockInterruptibly() throws InterruptedException;
    boolean tryLock();
    boolean tryLock(long time, TimeUnit unit) throws InterruptedException;
    void unlock();
    Condition newCondition();
}

```



## 类的属性

```
public class ReentrantLock implements Lock, java.io.Serializable {
    // 序列号
    private static final long serialVersionUID = 7373984872572414699L;    
    // 同步队列
    private final Sync sync;
}
```

ReentrantLock类的Sync变量是实现Lock功能的关键，Sync继承了AbstractQueuedSynchronizer，对ReentrantLock类的操作大部分都直接转化为对Sync和AbstractQueuedSynchronizer类的操作。

ReentrantLock中的内部抽象类Sync继承了AbstractQueuedSynchronizer；而Sync有两个子类类分别为FairSync和NonfairSync。

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/18/image-20231218220055183.png" alt="image-20231218220055183" style="zoom:50%;" />



## 类的构造函数

无参构造函数默认使用非公平策略的锁：

```
    public ReentrantLock() {
        sync = new NonfairSync();
    }
```

有参构造函数，以传递参数确定采用公平策略或者是非公平策略，参数为true表示公平策略，否则，采用非公平策略。

```
    public ReentrantLock(boolean fair) {
        sync = fair ? new FairSync() : new NonfairSync();
    }

```



## 类的内部类

### Sync类

```
abstract static class Sync extends AbstractQueuedSynchronizer {
        // 序列号
        private static final long serialVersionUID = -5179523762034025860L;
        
        // 获取锁
        abstract void lock();
        
        // 非公平方式获取
        final boolean nonfairTryAcquire(int acquires) {
            // 当前线程
            final Thread current = Thread.currentThread();
            // 获取状态
            int c = getState();
            if (c == 0) { // 表示没有线程正在竞争该锁
                if (compareAndSetState(0, acquires)) { // 比较并设置状态成功，状态0表示锁没有被占用
                    // 设置当前线程独占
                    setExclusiveOwnerThread(current); 
                    return true; // 成功
                }
            }
            else if (current == getExclusiveOwnerThread()) { // 当前线程拥有该锁
                int nextc = c + acquires; // 增加重入次数
                if (nextc < 0) // overflow
                    throw new Error("Maximum lock count exceeded");
                // 设置状态
                setState(nextc); 
                // 成功
                return true; 
            }
            // 失败
            return false;
        }
        
        // 试图在共享模式下获取对象状态，此方法应该查询是否允许它在共享模式下获取对象状态，如果允许，则获取它
        protected final boolean tryRelease(int releases) {
            int c = getState() - releases;
            if (Thread.currentThread() != getExclusiveOwnerThread()) // 当前线程不为独占线程
                throw new IllegalMonitorStateException(); // 抛出异常
            // 释放标识
            boolean free = false; 
            if (c == 0) {
                free = true;
                // 已经释放，清空独占
                setExclusiveOwnerThread(null); 
            }
            // 设置标识
            setState(c); 
            return free; 
        }
        
        // 判断资源是否被当前线程占有
        protected final boolean isHeldExclusively() {
            // While we must in general read state before owner,
            // we don't need to do so to check if current thread is owner
            return getExclusiveOwnerThread() == Thread.currentThread();
        }

        // 新生一个条件
        final ConditionObject newCondition() {
            return new ConditionObject();
        }

        // Methods relayed from outer class
        // 返回资源的占用线程
        final Thread getOwner() {        
            return getState() == 0 ? null : getExclusiveOwnerThread();
        }
        // 返回状态
        final int getHoldCount() {            
            return isHeldExclusively() ? getState() : 0;
        }

        // 资源是否被占用
        final boolean isLocked() {        
            return getState() != 0;
        }

        /**
         * Reconstitutes the instance from a stream (that is, deserializes it).
         */
        // 自定义反序列化逻辑
        private void readObject(java.io.ObjectInputStream s)
            throws java.io.IOException, ClassNotFoundException {
            s.defaultReadObject();
            setState(0); // reset to unlocked state
        }
    }
```

Sync类存在如下方法和作用如下:

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/18/616953-20160412165914863-1444593791.png)

### NonfairSync类

NonfairSync类继承了Sync类，表示采用非公平策略获取锁，其实现了Sync类中抽象的lock方法，源码如下。

```
// 非公平锁
    static final class NonfairSync extends Sync {
        // 版本号
        private static final long serialVersionUID = 7316153563782823691L;

        // 获得锁
        final void lock() {
            if (compareAndSetState(0, 1)) // 比较并设置状态成功，状态0表示锁没有被占用
                // 把当前线程设置独占了锁
                setExclusiveOwnerThread(Thread.currentThread());
            else // 锁已经被占用，或者set失败
                // 以独占模式获取对象，忽略中断
                acquire(1); 
        }

        protected final boolean tryAcquire(int acquires) {
            return nonfairTryAcquire(acquires);
        }
    }
```

从lock方法的源码可知，每一次都尝试获取锁，而并不会按照公平等待的原则进行等待，让等待时间最久的线程获得锁。



### FairSyn类

FairSync类也继承了Sync类，表示采用公平策略获取锁，其实现了Sync类中的抽象lock方法，源码如下：

```
  static final class FairSync extends Sync {
        // 版本序列化
        private static final long serialVersionUID = -3000897897090466540L;

        final void lock() {
            // 以独占模式获取对象，忽略中断
            acquire(1);
        }

        /**
         * Fair version of tryAcquire.  Don't grant access unless
         * recursive call or no waiters or is first.
         */
        // 尝试公平获取锁
        protected final boolean tryAcquire(int acquires) {
            // 获取当前线程
            final Thread current = Thread.currentThread();
            // 获取状态
            int c = getState();
            if (c == 0) { // 状态为0
                if (!hasQueuedPredecessors() &&
                    compareAndSetState(0, acquires)) { // 不存在已经等待更久的线程并且比较并且设置状态成功
                    // 设置当前线程独占
                    setExclusiveOwnerThread(current);
                    return true;
                }
            }
            else if (current == getExclusiveOwnerThread()) { // 状态不为0，即资源已经被线程占据
                // 下一个状态
                int nextc = c + acquires;
                if (nextc < 0) // 超过了int的表示范围
                    throw new Error("Maximum lock count exceeded");
                // 设置状态
                setState(nextc);
                return true;
            }
            return false;
        }
    }
```

跟踪lock方法的源码可知，当资源空闲时，它总是会先判断sync队列（AbstractQueuedSynchronizer中的数据结构）是否有等待时间更长的线程，如果存在，则将该线程加入到等待队列的尾部，实现了公平获取原则。其中，FairSync类的lock的方法调用如下，只给出了主要的方法。

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/18/616953-20160412171846863-1305937448.png)

可以看出只要资源被其他线程占用，该线程就会添加到sync queue中的尾部，而不会先尝试获取资源。这也是和Nonfair最大的区别，Nonfair每一次都会尝试去获取资源，如果此时该资源恰好被释放，则会被当前线程获取，这就造成了不公平的现象，当获取不成功，再加入队列尾部。







## ReentrantLock在Dubbo中的使用

在Dubbo的DefaultFuture类中使用了ReentrantLock去实现以下的功能：

- 当 RPC 返回结果之前，阻塞调用线程，让调用线程等待；
- 当 RPC 返回结果后，唤醒调用线程，让调用线程重新执行。

```
// 创建锁与条件变量
private final Lock lock 
    = new ReentrantLock();
private final Condition done 
    = lock.newCondition();

// 调用方通过该方法等待结果
Object get(int timeout){
  long start = System.nanoTime();
  lock.lock();
  try {
  while (!isDone()) {
    done.await(timeout);
      long cur=System.nanoTime();
    if (isDone() || 
          cur-start > timeout){
      break;
    }
  }
  } finally {
  lock.unlock();
  }
  if (!isDone()) {
  throw new TimeoutException();
  }
  return returnFromResponse();
}
// RPC结果是否已经返回
boolean isDone() {
  return response != null;
}
// RPC结果返回时调用该方法   
private void doReceived(Response res) {
  lock.lock();
  try {
    response = res;
    if (done != null) {
      done.signal();
    }
  } finally {
    lock.unlock();
  }
}
```

这个方法里面，你看到的都是熟悉的“面孔”：调用 lock() 获取锁，在 finally 里面调用 unlock() 释放锁；获取锁后，通过经典的在循环中调用 await() 方法来实现等待。

当 RPC 结果返回时，会调用 doReceived() 方法，这个方法里面，调用 lock() 获取锁，在 finally 里面调用 unlock() 释放锁，获取锁后通过调用 signal() 来通知调用线程，结果已经返回，不用继续等待了。



##  ReentrantLock使用示例

使用ReentrantLock和condition实现一个阻塞队列，代码如下：

```
package io.github.forezp.concurrentlab.lock;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockDemo2 {

    public static void main(String[] args) {
        BlockingQ queue = new BlockingQ(300);
        new Producer(queue).produce(300);
        new Producer(queue).produce(200);
        new Consumer(queue).consume(300);
        new Consumer(queue).consume(200);
    }

    static class BlockingQ {
        int size;
        int capacity;

        Lock lock = new ReentrantLock();
        Condition full = lock.newCondition();
        Condition empty = lock.newCondition();

        public BlockingQ(int capacity) {
            this.capacity = capacity;
        }

        public void produce(int num) {
            lock.lock();
            try {
                int left = num;
                while (left > 0) {
                    while (size >= capacity) {
                        System.out.println(Thread.currentThread() + " before await");
                        full.await();
                        System.out.println(Thread.currentThread() + " after await");
                    }
                    int incr=(left + size) > capacity ? (capacity - size) : left;
                    left -= incr;
                    size += incr;
                    System.out.println("produce = " + incr + ", size = " + size);
                    empty.signal();
                }

            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }


        public void consume(int no) {
            lock.lock();
            int left = no;
            try {
                while (left > 0) {
                    while (size <= 0) {
                        System.out.println(Thread.currentThread() + " before await");
                        empty.await();
                        System.out.println(Thread.currentThread() + " after await");
                    }
                    int dec = (size - left) > 0 ? left : size;
                    left -= dec;
                    size -= dec;
                    System.out.println("consume = " + dec + ", size = " + size);
                    full.signal();
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }
    }


   static class Consumer {
        private BlockingQ queue;
        public Consumer(BlockingQ queue) {
            this.queue = queue;
        }

        public void consume(int no) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    queue.consume(no);
                }
            }, no + " consume thread").start();
        }
    }

    static class Producer {
        private BlockingQ queue;
        public Producer(BlockingQ queue) {
            this.queue = queue;
        }

        public void produce(int no) {
            new Thread(new Runnable() {

                @Override
                public void run() {
                    queue.produce(no);
                }
            }, no + " produce thread").start();
        }
    }
}

```

## ReentrantLock的特点总结

ReentrantLock 是 Java 中的一种可重入锁，具有以下特点：

- 可重入性：允许同一个线程多次获取同一把锁而不发生死锁，使得同步代码块或方法在持有锁的情况下可以被多次进入。

- 公平性控制：提供了公平锁和非公平锁的获取方式

- 条件变量支持：通过 Condition 接口支持条件变量，使得线程能够在特定的条件下等待，并在条件满足时被唤醒，实现更灵活的线程协作机制。

- 高度可定制性：支持各种操作的精确控制，如尝试获取锁、限时获取锁等

<!-- @include: @article-footer.snippet.md -->