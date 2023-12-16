---
lang: zh-CN
title: Thread状态、使用详解
headerDepth: 1
order: 5
icon: gongchang
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



>newThread state:NEW







###  Runnable



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





> Thread-0
> newThread started, state=RUNNABLE



### blocked



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



>
>
>





### wait



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



## 两个线程交替打印



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

