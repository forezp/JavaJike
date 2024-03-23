---
lang: zh-CN
title: Thread状态、使用详解
headerDepth: 1
order: 5
icon: shijianzhouqi
collapsible: false
description: Java线程状态
---



## Thread状态

Java的线程状态总共有六种，在Thread类的枚举类State中，总共有6种状态，代码如下：

```
  public enum State {
        NEW,
        RUNNABLE,
        BLOCKED,
        WAITING,    
        TIMED_WAITING,
        TERMINATED;
    }
```

每种状态代表的含义如下表所示：

| 线程状态      | 解释                                                     |
| ------------- | -------------------------------------------------------- |
| NEW           | 尚未启动的线程状态，即线程创建，还未调用start方法        |
| RUNNABLE      | 就绪状态（调用start，等待调度）+正在运行                 |
| BLOCKED       | 等待监视器锁时，陷入阻塞状态                             |
| WAITING       | 等待状态的线程正在等待另一线程执行特定的操作（如notify） |
| TIMED_WAITING | 具有指定等待时间的等待状态                               |
| TERMINATED    | 线程完成执行，终止状态                                   |

上面的六种状态代码了一个线程从创建、运行、阻塞、终止的各个状态，代表了线程的生命周期。每种状态都是可以扭转的，状态的扭转如下图所示：

![image-20231211225833220](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/11/image-20231211225833220.png)

### New（新建状态）

用**new关键字**新建一个线程，这个线程就处于**新建状态**。

```
   public static void main(String[] args) {
        Thread newThread=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
        System.out.println("newThread state:"+newThread.getState());
    }
```

执行上面代码，代码输出的线程状态为NEW，代码如下：

>newThread state:NEW



###  Runnable

在操作系统中，线程的就绪和运行是两种不同的状态。在Java中，这两种状态都被统称为RUNNABLE。

1. 当线程调用`start()`方法时，新建状态的线程会转换为就绪状态。
2. 当线程调用`sleep(long)`方法并等待指定的时间到期后，等待状态的线程会转换为就绪状态。
3. 当阻塞式IO操作的结果返回时，阻塞状态的线程会转换为就绪状态。这
4. 当其他线程调用某个线程的`join()`方法，并且该线程执行完毕后，被等待的线程会转换为就绪状态。
5. 当线程拥有对象的锁时，等待获取该锁的其他线程会转换为就绪状态。

在Java中，线程状态会受到操作系统的调度和资源限制。一旦线程处于就绪状态，它可以被操作系统调度为运行状态。然而，并非所有就绪状态的线程都会立即获得CPU时间片。

运行状态的线程则表示正在CPU上执行计算任务。

```
    public static void main(String[] args) {
        Thread t=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
        t.start();
        System.out.println("newThread started, state="+t.getState());

    }
```

执行上面的代码，运行的结果如下：

> Thread-0
> newThread started, state=RUNNABLE



### blocked

阻塞状态（Blocked）：用于处理资源竞争情况下的线程等待，等待获取对象的锁以继续执行。

线程执行synchronized同步方法或者synchronized同步代码块时，如果没有获取到锁，将会被阻塞。

```
public class ThreadStateTest2 {

    public static void main(String[] args) {

        Thread thread=new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (ThreadStateTest2.class){
                    System.out.println(Thread.currentThread().getName());
                }
            }
        });
        thread.start();
        synchronized (ThreadStateTest2.class){
            try {
                Thread.sleep(50);
                System.out.println("thread state ="+thread.getState());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}
```

在上面的示例中，主线程启动子线程之后，立刻执行了同步代码块代码 ，获取了锁；而子线程的由于没有获取锁，处于阻塞状态。这时获取子线程的状态为BLOCKED状态，输出如下：

>thread state =BLOCKED
>Thread-0



### wait

程在等待某个特定条件的发生，需要其他线程通过唤醒操作才能继续执行，用于线程间的异步通信和协作，等待某个条件的发生。

- 线程执行了特定的等待操作（如`wait()`、`join()`等），使线程处于等待状态。

- 需要其他线程显式地调用相应的唤醒操作（如`notify()`、`notifyAll()`）才能将等待状态的线程转换为就绪状态。

```
package io.github.forezp.concurrentlab.thread;

public class ThreadStateTest3 {

    public static void main(String[] args) {
        final Object lock = new Object();

        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (lock) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName());
                }
            }
        });
        thread.start();
        try {
            Thread.sleep(50);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        synchronized (lock) {
            System.out.println("thread state =" + thread.getState());
            lock.notify();
        }

        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

}

```

执行上面代码，输出如下：

>thread state =WAITING
>Thread-0



## 两个线程交替打印奇数和偶数

"两个线程交替打印奇数和偶数"，这时一个非常常见的面试题：

```
package io.github.forezp.concurrentlab.thread;

public class ThreadDemo4 {

    static int i = 0;

    public static void main(String[] args) {
        Object lock = new Object();
        Thread t1 = new Thread(
                new Runnable() {
                    @Override
                    public void run() {
                        while (true) {

                            synchronized (lock) {
                                if (i % 2 == 0) {
                                    try {
                                        lock.wait();
                                    } catch (InterruptedException e) {
                                        e.printStackTrace();
                                    }
                                }
                                try {
                                    Thread.sleep(1000);
                                } catch (InterruptedException e) {
                                    e.printStackTrace();
                                }
                                System.out.println(Thread.currentThread().getName() + " i=" + i);
                                i++;
                                lock.notifyAll();
                            }
                        }
                    }
                }
        );

        Thread t2 = new Thread(
                new Runnable() {
                    @Override
                    public void run() {
                        while (true) {
                            synchronized (lock) {
                                if (i % 2 == 1) {
                                    try {

                                        lock.wait();
                                    } catch (InterruptedException e) {
                                        e.printStackTrace();
                                    }
                                }
                                try {
                                    Thread.sleep(1000);
                                } catch (InterruptedException e) {
                                    e.printStackTrace();
                                }
                                System.out.println(Thread.currentThread().getName() + " i=" + i);
                                i++;
                                lock.notifyAll();
                            }
                        }
                    }
                }
        );

        t1.start();
        t2.start();
        try {
            t1.join();
            t2.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

创建了两个线程`t1`和`t2`，它们通过共享的锁对象`lock`来实现交替打印奇数和偶数。

具体来说，每个线程执行如下操作：

1. 进入一个无限循环，在循环内部使用`synchronized (lock)`来获取对共享锁对象`lock`的独占锁定。
2. 判断当前的计数`i`是偶数还是奇数，根据结果决定是否等待或执行打印操作，并将`i`的值递增。
3. 在打印完成后，调用`lock.notifyAll()`来唤醒其他因等待相同锁而处于暂停状态的线程，并释放锁。
4. 然后线程继续循环执行以上步骤。

这是考察线程同步的例子，通过共享锁对象的`wait()`与`notifyAll()`方法来协调两个线程的执行顺序。从而达到交替打印奇偶输的目的。

<!-- @include: @article-footer.snippet.md -->
