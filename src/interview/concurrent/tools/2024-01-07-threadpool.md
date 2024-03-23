---
lang: zh-CN
title: JAVA并发包的线程池:ThreadPoolExecutor详解
headerDepth: 1
order: 11
icon: tiaoxingma
collapsible: false
description: Java线程池:ThreadPoolExecutor详解
---

## 前言

《阿里巴巴Java手册》手册中要求：

>线程资源必须通过`线程池`提供，不允许在应用自行显式创建线程； **说明**：使用线程池的好处是减少在创建和销毁线程上所花的时间以及系统资源的开销，解决资源不足的问题。如果不使用线程池，有可能造成系统创建大量同类线程而导致消耗内存或者“过度切换”的问题。

这么做的原因是，创建线程的开销很大，需要大约2MB的内存。如果创建线程和销毁线程的频次很高，需要频繁的创建线程和销毁线程，会造成频繁的GC，影响程序的整体性能。

使用线程池的主要目的是为了更高效地管理和利用线程资源：

1. 降低线程创建和销毁的开销：线程的创建和销毁是有一定开销的，包括内存分配、上下文切换等。频繁地创建和销毁线程会浪费大量的资源，降低系统性能。**而线程池中的线程可以被重复利用，避免了频繁的创建和销毁，从而降低了开销。**

2. 提高系统的响应速度和吞吐量：线程池中的线程处于就绪状态，可以立即执行任务，不需要等待线程的创建。同时，由于线程池可以控制线程的数量，可以根据系统负载动态调整线程数量，进一步提高系统的吞吐量。

3. 避免线程的过度创建和资源耗尽：如果大量的任务没有采用线程池的方式去执行，而是直接通过创建线程的方式执行，可能会导致系统中的线程数量过度膨胀，消耗大量的系统资源。而线程池可以通过合理的配置，控制线程的数量，避免这种情况的发生。

4. 统一管理线程的执行和状态：线程池提供了统一的管理和监控机制，可以更方便地管理线程的执行状态、优先级、超时时间、中断机制等。可以更好地适应业务需求，提供更加灵活和可控的线程管理方式。



# ThreadPoolExecutor详解



### ThreadPoolExecutor类图

Java并发包中的线程池，核心实现类是ThreadPoolExecutor，它的类图如下所示：

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/7/executor-class-diagram.png)

- `Executor`线程池顶级接口，它有一个任务执行的方法。
- `ExecutorService`继承并扩展了Executor接口，提供了Runnable、FutureTask等主要线程实现接口扩展
- `ThreadPoolExecutor`是线程池的核心实现类，用来执行被提交的任务
- `ScheduledExecutorService`继承`ExecutorService`接口，并定义延迟或定期执行的方法
- `ScheduledThreadPoolExecutor`继承`ThreadPoolExecutor`并实现了`ScheduledExecutorService`接口，是延时执行类任务的主要实现



### ThreadPoolExecutor线程池的生命周期

```
private static final int RUNNING    = -1 << COUNT_BITS;
private static final int SHUTDOWN   =  0 << COUNT_BITS;
private static final int STOP       =  1 << COUNT_BITS;
private static final int TIDYING    =  2 << COUNT_BITS;
private static final int TERMINATED =  3 << COUNT_BITS;
```

- RUNNING：表示线程池处于运行状态，可以接收新的任务并执行。
- SHUTDOWN：表示线程池已经关闭，不再接受新的任务，但会执行已经提交的任务。
- STOP：表示线程池已经停止，不接受新任务，也不再执行已提交的任务，并且会中断正在执行的任务。
- TIDYING：表示线程池正在进行一些清理工作，例如线程回收等。
- TERMINATED：表示线程池已经终止，所有任务已经完成，所有线程已经关闭。此时，线程池的状态已经结束。

![image](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/7/1596294-20220503235605219-1356305405.svg)

总的可以概括线程池的生命周期，包括以下几个阶段：

1. 创建阶段：在这个阶段，线程池被创建，并进行了一些初始化操作，包括创建线程池的内部数据结构、预先启动一定数量的核心线程等。

2. 运行阶段：在创建阶段之后，线程池进入了运行状态。此时，线程池可以接受任务，并使用可用的线程来执行任务。当任务队列中有任务时，线程池会从任务队列中获取任务，并将其分派给空闲的线程执行。

3. 关闭阶段：当不再需要线程池时，可以调用线程池的关闭方法进行关闭操作。在关闭阶段，线程池将不再接受新的任务，并开始逐渐停止执行任务。已经提交但尚未执行的任务，根据具体的关闭策略可能会被丢弃或者等待执行完成。

4. 终止阶段：在关闭阶段之后，线程池进入终止状态。在终止阶段，线程池的所有任务都已经执行完毕，所有的线程都已经关闭。此时，线程池被认为是终止状态，并且可以进行资源清理和释放。



## ThreadPoolExecutor构造函数

查看源码，ThreadPoolExecutor的构造函数如下：

```
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler) {
        if (corePoolSize < 0 ||
            maximumPoolSize <= 0 ||
            maximumPoolSize < corePoolSize ||
            keepAliveTime < 0)
            throw new IllegalArgumentException();
        if (workQueue == null || threadFactory == null || handler == null)
            throw new NullPointerException();
        this.acc = System.getSecurityManager() == null ?
                null :
                AccessController.getContext();
        this.corePoolSize = corePoolSize;
        this.maximumPoolSize = maximumPoolSize;
        this.workQueue = workQueue;
        this.keepAliveTime = unit.toNanos(keepAliveTime);
        this.threadFactory = threadFactory;
        this.handler = handler;
    }
```

ThreadPoolExecutor的构造函数包含了7个核心参数，如下：

- corePoolSize：核心线程池的大小
- maximumPoolSize：最大线程池的大小
- keepAliveTime：当线程池中线程数大于corePoolSize，并且没有可执行任务时，大于corePoolSize那部分线程会被销毁，keepAliveTime被销毁线程的存活时间
- unit：keepAliveTime的时间单位
- workQueue：用来保存任务的工作队列
- threadFactory：线程工厂，用来提供线程的创建方式，默认使用Executors.*defaultThreadFactory*()
- handler：线程池拒绝策略，当线程池所处理的任务数超过其可以处理的容量时，会调用的拒绝策略

如果想要创建一个符合业务场景的线程池，不仅需要对线程池的核心参数需要了解清楚，而且还需要通过压测或者开发经验去大概评估参数的设置。



### corePoolSize

corePoolSize 是线程池中的核心线程数量。在创建线程池时，核心线程会被立即创建并准备好接受任务。这些核心线程会一直存在于线程池中，除非显式地调用了线程池的 `setCorePoolSize()` 或 `allowCoreThreadTimeOut(boolean)` 方法来更改核心线程数量或允许核心线程超时。

在核心线程数量内，线程池的线程会一直存活，即使线程处于空闲状态也不被销毁。这有助于快速响应任务请求并提供较低的响应延迟。

核心线程数量的设置应该根据具体应用的需求来进行调整。过大的核心线程数量可能会占用过多的系统资源，而过小的核心线程数量可能无法满足任务执行的需求。在进行调整时，需要综合考虑任务的类型、数量、执行时间以及系统的硬件资源等因素。

一般工程经验，对于CPU密集型的任务，一般核心线程数是Cpu的个数+1；而对于IO密集型的任务，一般核心线程数是Cpu的个数*2+1。

也可以使用下面的公式去确定核心线程数可以参考以下公式：
[![img](https://cdn.nlark.com/yuque/__latex/4c8ae8034f2c6247e9b0cfc4425463a6.svg#card=math&code=N_{thread}%3DN_{cpu} * U_{cpu} * (1%2BW%2FC)&height=19&id=cxIGD)](https://cdn.nlark.com/yuque/__latex/4c8ae8034f2c6247e9b0cfc4425463a6.svg#card=math&code=N_{thread}%3DN_{cpu} * U_{cpu} * (1%2BW%2FC)&height=19&id=cxIGD)
其中参数含义如下：

- [![img](https://cdn.nlark.com/yuque/__latex/7a5d728438a0f1483a75eb688d741b63.svg#card=math&code=N_{cpu}&height=18&id=d3dLs)](https://cdn.nlark.com/yuque/__latex/7a5d728438a0f1483a75eb688d741b63.svg#card=math&code=N_{cpu}&height=18&id=d3dLs)是处理器的核数目，可以通过Runtime.getRuntime().availableProcessors()获得
- [![img](https://cdn.nlark.com/yuque/__latex/cf73efc57077726281b972e1309ee563.svg#card=math&code=U_{cpu}&height=18&id=TPEIf)](https://cdn.nlark.com/yuque/__latex/cf73efc57077726281b972e1309ee563.svg#card=math&code=U_{cpu}&height=18&id=TPEIf)是期望的CPU利用率，介于0-1之间
- W/C是等待时间与计算时间的比率

### keepAliveTime

keepAliveTime 是指线程在空闲状态下的存活时间。当线程池中的线程数量超过核心线程数时，并且有一段时间没有任务可执行时，多余的线程会根据 keepAliveTime 的设定被回收。

具体来说，当线程池中的线程数量超过 corePoolSize，并且没有新的任务到达时，多余的线程将会根据 keepAliveTime 的设定进行等待。如果在 keepAliveTime 的时间内仍然没有新的任务提交，那么这些多余的线程将会被终止，减少线程池中的线程数量。

通过设置合适的 keepAliveTime 值，可以控制线程池中线程的数量，避免资源浪费和线程过多导致的性能下降。

### workQueue

workQueue 是线程池中用于存放待执行任务的队列。当线程池中的线程数量达到核心线程数(corePoolSize)时，如果有新的任务提交给线程池，，这些新的任务会被放入 workQueue 中等待执行。

workQueue 可以是不同类型的队列，常见的队列类型包括：

1. 无界队列：任务可以无限制地添加进队列中，默认为无界队列。例如，使用无容量限制的 `LinkedBlockingQueue`，它可以存放任意数量的任务，直到内存耗尽。**不建议使用。**
2. 有界队列：任务数量有上限。例如，使用 `ArrayBlockingQueue`，或者有容量限制的LinkedBlockingQueue，需要指定队列的容量，超过容量后会阻塞新任务的提交。
3. 同步队列：任务只能一个一个地被提交给线程池进行执行。例如，使用 `SynchronousQueue`，每个任务都需要等待一个空闲的线程来处理，适合于负载较高的场景。**通常不推荐。**

#### SynchronousQueue

SynchronousQueue并不能算得上一个真正的队列，虽然实现了BlockingQueue接口，但是并没有容量，不能存储任务。只是维护一组线程，在等待着把元素加入或移出队列，相当于直接交接任务给具体执行的线程。
如果没有立即可用的线程来运行任务，则尝试将任务排队失败，因此将构造一个新线程。在处理可能具有内部依赖关系的请求集时，此策略可避免锁定。这种队列方式通常需要无限的maximumPoolSizes以避免拒绝新提交的任务。当任务提交的平均到达速度快于线程处理速度时，线程存在无限增长的可能性，**而CachedThreadPool正式采用这种形式。**

#### LinkedBlockingQueue

LinkedBlockingQueue是采用链表实现的无界队列，如果使用没有预定义容量的LinkedBlockingQueue，当所有corePoolSize线程都在处理任务时，将导致新任务都会在队列中等待，不会创建超过corePoolSize个线程。这种场景下maximumPoolSize的值对于线程数量没有任何影响。
这种依托队列处理任务的方式恰与SynchronousQueue依托线程处理任务的方式相反。

#### ArrayBlockingQueue

ArrayBlockingQueue是通过数组实现的有界队列。有界队列在与有限的maximumPoolSizes一起使用时有助于防止资源耗尽，但可能更难以调整和控制。使用ArrayBlockingQueue可以根据应用场景，预先估计池和队列的容量，互相权衡队列大小和最大池大小：

- 使用大队列和小池：减少线程数量，可以最大限度地减少CPU使用率、操作系统资源和上下文切换开销，但可能会导致吞吐量降低
- 使用小队列大池：较大数量的线程，如果任务提交速度过快，会在短时间内提升CPU使用率，理论上可以提高系统的吞吐量。如果任务经常阻塞（如受到IO限制），会使得CPU切换更加频繁，可能会遇到更大的调度开销，这也会降低吞吐量

### threadFactory

该参数提供了线程池中线程的创建方式，这里使用了工厂模式ThreadFactory创建新线程，默认情况下，会使用 Executors.defaultThreadFactory，它创建的线程都在同一个ThreadGroup中，并具有相同的NORM_PRIORITY优先级和非守护进程状态。


### handler

如果线程池处于饱和状态，没有足够的线程数或者队列空间来处理提交的任务，或者是线程池已经处于关闭状态但还在处理进行中的任务，那么继续提交的任务就会根据线程池的拒绝策略处理。

无论哪种情况，execute方法都会调用其RejectedExecutionHandler的rejectedExecution方法。线程池中提供了四个预定义的处理程序策略：

- CallerRunsPolicy：当线程池无法接受新的任务时，执行任务的线程会使用调用线程来执行该任务。也就是说，提交任务的线程会自己执行任务，这样可以避免任务丢失，但可能会影响提交任务线程的性能。

- AbortPolicy：当线程池无法接受新的任务时，抛出 RejectedExecutionException 异常，拒绝执行该任务。这是默认的处理策略。

- DiscardPolicy：当线程池无法接受新的任务时，直接丢弃该任务，不会有任何异常抛出。

- DiscardOldestPolicy：当线程池无法接受新的任务时，丢弃队列中最旧的等待任务，并尝试重新提交被拒绝的任务。

这些预定义策略都实现了RejectedExecutionHandler接口，也可以定义实现类重写拒绝策略。



## 线程池的工作流程

线程池的工作流程如下如下图所示：



![在这里插入图片描述](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/7/171da139c2155b39~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)



1. 创建线程池：首先，根据需求配置线程池的参数，包括核心线程数、最大线程数、keepAliveTime、workQueue 等。
2. 提交任务：当有任务需要执行时，将任务提交给线程池。
3. 判断核心线程是否创建：线程池会根据核心线程数来判断是否需要创建新的线程来执行任务。如果当前运行的线程数小于核心线程数，线程池就会创建一个新的线程来执行任务，此过程是非阻塞的。
4. 加入工作队列：如果当前运行的线程数已经达到核心线程数，但有新的任务到达，线程池会将任务放入 workQueue 中等待执行。
5. 判断最大线程是否创建：如果线程池中的线程数已经达到核心线程数，并且工作队列已满，此时线程池会判断是否需要创建新的线程来执行任务。如果当前运行的线程数小于最大线程数，线程池会创建一个新的线程来执行任务。
6. 任务被拒绝时的处理：如果线程池已经达到最大线程数，并且工作队列也已满，此时线程池会根据设置的拒绝策略来处理提交的任务，比如抛出异常或者丢弃任务。



## 为什么线程池不允许使用Executors去创建?

线程池不允许使用Executors去创建，而是通过ThreadPoolExecutor的方式，这样的处理方式让写的同学更加明确线程池的运行规则，规避资源耗尽的风险。 说明：Executors各个方法的弊端：

- newFixedThreadPool和newSingleThreadExecutor:   主要问题是堆积的请求处理队列可能会耗费非常大的内存，甚至OOM。
- newCachedThreadPool和newScheduledThreadPool:   主要问题是线程数最大数是Integer.MAX_VALUE，可能会创建数量非常多的线程，甚至OOM。

#### 推荐方式 1

首先引入：commons-lang3包

```java
ScheduledExecutorService executorService = new ScheduledThreadPoolExecutor(1,
        new BasicThreadFactory.Builder().namingPattern("example-schedule-pool-%d").daemon(true).build());
```



#### 推荐方式 2

首先引入：com.google.guava包

```java
ThreadFactory namedThreadFactory = new ThreadFactoryBuilder().setNameFormat("demo-pool-%d").build();

//Common Thread Pool
ExecutorService pool = new ThreadPoolExecutor(5, 200, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>(1024), namedThreadFactory, new ThreadPoolExecutor.AbortPolicy());

// excute
pool.execute(()-> System.out.println(Thread.currentThread().getName()));

 //gracefully shutdown
pool.shutdown();
```



## ThreadPoolExecutor源码详解

### 几个关键属性

```
//这个属性是用来存放 当前运行的worker数量以及线程池状态的
//int是32位的，这里把int的高3位拿来充当线程池状态的标志位,后29位拿来充当当前运行worker的数量
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));
//存放任务的阻塞队列
private final BlockingQueue<Runnable> workQueue;
//worker的集合,用set来存放
private final HashSet<Worker> workers = new HashSet<Worker>();
//历史达到的worker数最大值
private int largestPoolSize;
//当队列满了并且worker的数量达到maxSize的时候,执行具体的拒绝策略
private volatile RejectedExecutionHandler handler;
//超出coreSize的worker的生存时间
private volatile long keepAliveTime;
//常驻worker的数量
private volatile int corePoolSize;
//最大worker的数量,一般当workQueue满了才会用到这个参数
private volatile int maximumPoolSize;

```

### 内部状态

```java
private final AtomicInteger ctl = new AtomicInteger(ctlOf(RUNNING, 0));
private static final int COUNT_BITS = Integer.SIZE - 3;
private static final int CAPACITY   = (1 << COUNT_BITS) - 1;

// runState is stored in the high-order bits
private static final int RUNNING    = -1 << COUNT_BITS;
private static final int SHUTDOWN   =  0 << COUNT_BITS;
private static final int STOP       =  1 << COUNT_BITS;
private static final int TIDYING    =  2 << COUNT_BITS;
private static final int TERMINATED =  3 << COUNT_BITS;

// Packing and unpacking ctl
private static int runStateOf(int c)     { return c & ~CAPACITY; }
private static int workerCountOf(int c)  { return c & CAPACITY; }
private static int ctlOf(int rs, int wc) { return rs | wc; }
```

其中AtomicInteger变量ctl的功能非常强大: 利用低29位表示线程池中线程数，通过高3位表示线程池的运行状态:

- RUNNING: -1 << COUNT_BITS，即高3位为111，该状态的线程池会接收新任务，并处理阻塞队列中的任务；
- SHUTDOWN: 0 << COUNT_BITS，即高3位为000，该状态的线程池不会接收新任务，但会处理阻塞队列中的任务；
- STOP : 1 << COUNT_BITS，即高3位为001，该状态的线程不会接收新任务，也不会处理阻塞队列中的任务，而且会中断正在运行的任务；
- TIDYING : 2 << COUNT_BITS，即高3位为010, 所有的任务都已经终止；
- TERMINATED: 3 << COUNT_BITS，即高3位为011, terminated()方法已经执行完成

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/7/java-thread-x-executors-2.png)

###  任务的执行

> execute –> addWorker –>runworker (getTask)

线程池的工作线程通过Woker类实现，在ReentrantLock锁的保证下，把Woker实例插入到HashSet后，并启动Woker中的线程。 从Woker类的构造方法实现可以发现: 线程工厂在创建线程thread时，将Woker实例本身this作为参数传入，当执行start方法启动线程thread时，本质是执行了Worker的runWorker方法。 firstTask执行完成之后，通过getTask方法从阻塞队列中获取等待的任务，如果队列中没有任务，getTask方法会被阻塞并挂起，不会占用cpu资源；

#### execute()方法

ThreadPoolExecutor.execute(task)实现了Executor.execute(task)

```java
public void execute(Runnable command) {
    if (command == null)
        throw new NullPointerException();
    /*
     * Proceed in 3 steps:
     *
     * 1. If fewer than corePoolSize threads are running, try to
     * start a new thread with the given command as its first
     * task.  The call to addWorker atomically checks runState and
     * workerCount, and so prevents false alarms that would add
     * threads when it shouldn't, by returning false.
     *
     * 2. If a task can be successfully queued, then we still need
     * to double-check whether we should have added a thread
     * (because existing ones died since last checking) or that
     * the pool shut down since entry into this method. So we
     * recheck state and if necessary roll back the enqueuing if
     * stopped, or start a new thread if there are none.
     *
     * 3. If we cannot queue task, then we try to add a new
     * thread.  If it fails, we know we are shut down or saturated
     * and so reject the task.
     */
    int c = ctl.get();
    if (workerCountOf(c) < corePoolSize) {  
    //workerCountOf获取线程池的当前线程数；小于corePoolSize，执行addWorker创建新线程执行command任务
       if (addWorker(command, true))
            return;
        c = ctl.get();
    }
    // double check: c, recheck
    // 线程池处于RUNNING状态，把提交的任务成功放入阻塞队列中
    if (isRunning(c) && workQueue.offer(command)) {
        int recheck = ctl.get();
        // recheck and if necessary 回滚到入队操作前，即倘若线程池shutdown状态，就remove(command)
        //如果线程池没有RUNNING，成功从阻塞队列中删除任务，执行reject方法处理任务
        if (! isRunning(recheck) && remove(command))
            reject(command);
        //线程池处于running状态，但是没有线程，则创建线程
        else if (workerCountOf(recheck) == 0)
            addWorker(null, false);
    }
    // 往线程池中创建新的线程失败，则reject任务
    else if (!addWorker(command, false))
        reject(command);
}
```

- 为什么需要double check线程池的状态?

在多线程环境下，线程池的状态时刻在变化，而ctl.get()是非原子操作，很有可能刚获取了线程池状态后线程池状态就改变了。判断是否将command加入workque是线程池之前的状态。倘若没有double check，万一线程池处于非running状态(在多线程环境下很有可能发生)，那么command永远不会执行。

#### addWorker方法

从方法execute的实现可以看出: addWorker主要负责创建新的线程并执行任务 线程池创建新线程执行任务时，需要 获取全局锁:

```java
private final ReentrantLock mainLock = new ReentrantLock();
private boolean addWorker(Runnable firstTask, boolean core) {
    // CAS更新线程池数量
    retry:
    for (;;) {
        int c = ctl.get();
        int rs = runStateOf(c);

        // Check if queue empty only if necessary.
        if (rs >= SHUTDOWN &&
            ! (rs == SHUTDOWN &&
                firstTask == null &&
                ! workQueue.isEmpty()))
            return false;

        for (;;) {
            int wc = workerCountOf(c);
            if (wc >= CAPACITY ||
                wc >= (core ? corePoolSize : maximumPoolSize))
                return false;
            if (compareAndIncrementWorkerCount(c))
                break retry;
            c = ctl.get();  // Re-read ctl
            if (runStateOf(c) != rs)
                continue retry;
            // else CAS failed due to workerCount change; retry inner loop
        }
    }

    boolean workerStarted = false;
    boolean workerAdded = false;
    Worker w = null;
    try {
        w = new Worker(firstTask);
        final Thread t = w.thread;
        if (t != null) {
            // 线程池重入锁
            final ReentrantLock mainLock = this.mainLock;
            mainLock.lock();
            try {
                // Recheck while holding lock.
                // Back out on ThreadFactory failure or if
                // shut down before lock acquired.
                int rs = runStateOf(ctl.get());

                if (rs < SHUTDOWN ||
                    (rs == SHUTDOWN && firstTask == null)) {
                    if (t.isAlive()) // precheck that t is startable
                        throw new IllegalThreadStateException();
                    workers.add(w);
                    int s = workers.size();
                    if (s > largestPoolSize)
                        largestPoolSize = s;
                    workerAdded = true;
                }
            } finally {
                mainLock.unlock();
            }
            if (workerAdded) {
                t.start();  // 线程启动，执行任务(Worker.thread(firstTask).start());
                workerStarted = true;
            }
        }
    } finally {
        if (! workerStarted)
            addWorkerFailed(w);
    }
    return workerStarted;
}
```

#### Worker类的runworker方法

```java
 private final class Worker extends AbstractQueuedSynchronizer implements Runnable{
     Worker(Runnable firstTask) {
         setState(-1); // inhibit interrupts until runWorker
         this.firstTask = firstTask;
         this.thread = getThreadFactory().newThread(this); // 创建线程
     }
     /** Delegates main run loop to outer runWorker  */
     public void run() {
         runWorker(this);
     }
     // ...
 }
```

- 继承了AQS类，可以方便的实现工作线程的中止操作；
- 实现了Runnable接口，可以将自身作为一个任务在工作线程中执行；
- 当前提交的任务firstTask作为参数传入Worker的构造方法；

一些属性还有构造方法:

```java
//运行的线程,前面addWorker方法中就是直接通过启动这个线程来启动这个worker
final Thread thread;
//当一个worker刚创建的时候,就先尝试执行这个任务
Runnable firstTask;
//记录完成任务的数量
volatile long completedTasks;

Worker(Runnable firstTask) {
    setState(-1); // inhibit interrupts until runWorker
    this.firstTask = firstTask;
    //创建一个Thread,将自己设置给他,后面这个thread启动的时候,也就是执行worker的run方法
    this.thread = getThreadFactory().newThread(this);
}   
```

runWorker方法是线程池的核心:

- 线程启动之后，通过unlock方法释放锁，设置AQS的state为0，表示运行可中断；
- Worker执行firstTask或从workQueue中获取任务: 
  - 进行加锁操作，保证thread不被其他线程中断(除非线程池被中断)
  - 检查线程池状态，倘若线程池处于中断状态，当前线程将中断。
  - 执行beforeExecute
  - 执行任务的run方法
  - 执行afterExecute方法
  - 解锁操作

> 通过getTask方法从阻塞队列中获取等待的任务，如果队列中没有任务，getTask方法会被阻塞并挂起，不会占用cpu资源；

```java
final void runWorker(Worker w) {
    Thread wt = Thread.currentThread();
    Runnable task = w.firstTask;
    w.firstTask = null;
    w.unlock(); // allow interrupts
    boolean completedAbruptly = true;
    try {
        // 先执行firstTask，再从workerQueue中取task(getTask())

        while (task != null || (task = getTask()) != null) {
            w.lock();
            // If pool is stopping, ensure thread is interrupted;
            // if not, ensure thread is not interrupted.  This
            // requires a recheck in second case to deal with
            // shutdownNow race while clearing interrupt
            if ((runStateAtLeast(ctl.get(), STOP) ||
                    (Thread.interrupted() &&
                    runStateAtLeast(ctl.get(), STOP))) &&
                !wt.isInterrupted())
                wt.interrupt();
            try {
                beforeExecute(wt, task);
                Throwable thrown = null;
                try {
                    task.run();
                } catch (RuntimeException x) {
                    thrown = x; throw x;
                } catch (Error x) {
                    thrown = x; throw x;
                } catch (Throwable x) {
                    thrown = x; throw new Error(x);
                } finally {
                    afterExecute(task, thrown);
                }
            } finally {
                task = null;
                w.completedTasks++;
                w.unlock();
            }
        }
        completedAbruptly = false;
    } finally {
        processWorkerExit(w, completedAbruptly);
    }
}
```

#### getTask方法

下面来看一下getTask()方法，这里面涉及到keepAliveTime的使用，从这个方法我们可以看出线程池是怎么让超过corePoolSize的那部分worker销毁的。

```java
private Runnable getTask() {
    boolean timedOut = false; // Did the last poll() time out?

    for (;;) {
        int c = ctl.get();
        int rs = runStateOf(c);

        // Check if queue empty only if necessary.
        if (rs >= SHUTDOWN && (rs >= STOP || workQueue.isEmpty())) {
            decrementWorkerCount();
            return null;
        }

        int wc = workerCountOf(c);

        // Are workers subject to culling?
        boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;

        if ((wc > maximumPoolSize || (timed && timedOut))
            && (wc > 1 || workQueue.isEmpty())) {
            if (compareAndDecrementWorkerCount(c))
                return null;
            continue;
        }

        try {
            Runnable r = timed ?
                workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :
                workQueue.take();
            if (r != null)
                return r;
            timedOut = true;
        } catch (InterruptedException retry) {
            timedOut = false;
        }
    }
}
```

注意这里一段代码是keepAliveTime起作用的关键:

```java
boolean timed = allowCoreThreadTimeOut || wc > corePoolSize;
Runnable r = timed ?
                workQueue.poll(keepAliveTime, TimeUnit.NANOSECONDS) :
                workQueue.take();
```

allowCoreThreadTimeOut为false，线程即使空闲也不会被销毁；倘若为ture，在keepAliveTime内仍空闲则会被销毁。

如果线程允许空闲等待而不被销毁timed == false，workQueue.take任务: 如果阻塞队列为空，当前线程会被挂起等待；当队列中有任务加入时，线程被唤醒，take方法返回任务，并执行；

如果线程不允许无休止空闲timed == true, workQueue.poll任务: 如果在keepAliveTime时间内，阻塞队列还是没有任务，则返回null；

### 任务的提交

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/7/java-thread-x-executors-3.png)

1. submit任务，等待线程池execute
2. 执行FutureTask类的get方法时，会把主线程封装成WaitNode节点并保存在waiters链表中， 并阻塞等待运行结果；
3. FutureTask任务执行完成后，通过UNSAFE设置waiters相应的waitNode为null，并通过LockSupport类unpark方法唤醒主线程；

```java
public class Test{
    public static void main(String[] args) {

        ExecutorService es = Executors.newCachedThreadPool();
        Future<String> future = es.submit(new Callable<String>() {
            @Override
            public String call() throws Exception {
                try {
                    TimeUnit.SECONDS.sleep(2);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return "future result";
            }
        });
        try {
            String result = future.get();
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

在实际业务场景中，Future和Callable基本是成对出现的，Callable负责产生结果，Future负责获取结果。

1. Callable接口类似于Runnable，只是Runnable没有返回值。
2. Callable任务除了返回正常结果之外，如果发生异常，该异常也会被返回，即Future可以拿到异步执行任务各种结果；
3. Future.get方法会导致主线程阻塞，直到Callable任务执行完成；

#### submit方法

AbstractExecutorService.submit()实现了ExecutorService.submit() 可以获取执行完的返回值, 而ThreadPoolExecutor 是AbstractExecutorService.submit()的子类，所以submit方法也是ThreadPoolExecutor`的方法。

```java
// submit()在ExecutorService中的定义
<T> Future<T> submit(Callable<T> task);

<T> Future<T> submit(Runnable task, T result);

Future<?> submit(Runnable task);
// submit方法在AbstractExecutorService中的实现
public Future<?> submit(Runnable task) {
    if (task == null) throw new NullPointerException();
    // 通过submit方法提交的Callable任务会被封装成了一个FutureTask对象。
    RunnableFuture<Void> ftask = newTaskFor(task, null);
    execute(ftask);
    return ftask;
}
```

通过submit方法提交的Callable任务会被封装成了一个FutureTask对象。通过Executor.execute方法提交FutureTask到线程池中等待被执行，最终执行的是FutureTask的run方法；

#### FutureTask对象

`public class FutureTask<V> implements RunnableFuture<V>` 可以将FutureTask提交至线程池中等待被执行(通过FutureTask的run方法来执行)

- 内部状态

```java
/* The run state of this task, initially NEW. 
    * ...
    * Possible state transitions:
    * NEW -> COMPLETING -> NORMAL
    * NEW -> COMPLETING -> EXCEPTIONAL
    * NEW -> CANCELLED
    * NEW -> INTERRUPTING -> INTERRUPTED
    */
private volatile int state;
private static final int NEW          = 0;
private static final int COMPLETING   = 1;
private static final int NORMAL       = 2;
private static final int EXCEPTIONAL  = 3;
private static final int CANCELLED    = 4;
private static final int INTERRUPTING = 5;
private static final int INTERRUPTED  = 6;
```

内部状态的修改通过sun.misc.Unsafe修改

- get方法

```java
public V get() throws InterruptedException, ExecutionException {
    int s = state;
    if (s <= COMPLETING)
        s = awaitDone(false, 0L);
    return report(s);
} 
```

内部通过awaitDone方法对主线程进行阻塞，具体实现如下:

```java
private int awaitDone(boolean timed, long nanos)
    throws InterruptedException {
    final long deadline = timed ? System.nanoTime() + nanos : 0L;
    WaitNode q = null;
    boolean queued = false;
    for (;;) {
        if (Thread.interrupted()) {
            removeWaiter(q);
            throw new InterruptedException();
        }

        int s = state;
        if (s > COMPLETING) {
            if (q != null)
                q.thread = null;
            return s;
        }
        else if (s == COMPLETING) // cannot time out yet
            Thread.yield();
        else if (q == null)
            q = new WaitNode();
        else if (!queued)
            queued = UNSAFE.compareAndSwapObject(this, waitersOffset,q.next = waiters, q);
        else if (timed) {
            nanos = deadline - System.nanoTime();
            if (nanos <= 0L) {
                removeWaiter(q);
                return state;
            }
            LockSupport.parkNanos(this, nanos);
        }
        else
            LockSupport.park(this);
    }
}
```

1. 如果主线程被中断，则抛出中断异常；
2. 判断FutureTask当前的state，如果大于COMPLETING，说明任务已经执行完成，则直接返回；
3. 如果当前state等于COMPLETING，说明任务已经执行完，这时主线程只需通过yield方法让出cpu资源，等待state变成NORMAL；
4. 通过WaitNode类封装当前线程，并通过UNSAFE添加到waiters链表；
5. 最终通过LockSupport的park或parkNanos挂起线程；

#### run方法

```java
public void run() {
    if (state != NEW || !UNSAFE.compareAndSwapObject(this, runnerOffset, null, Thread.currentThread()))
        return;
    try {
        Callable<V> c = callable;
        if (c != null && state == NEW) {
            V result;
            boolean ran;
            try {
                result = c.call();
                ran = true;
            } catch (Throwable ex) {
                result = null;
                ran = false;
                setException(ex);
            }
            if (ran)
                set(result);
        }
    } finally {
        // runner must be non-null until state is settled to
        // prevent concurrent calls to run()
        runner = null;
        // state must be re-read after nulling runner to prevent
        // leaked interrupts
        int s = state;
        if (s >= INTERRUPTING)
            handlePossibleCancellationInterrupt(s);
    }
}
```

FutureTask.run方法是在线程池中被执行的，而非主线程

1. 通过执行Callable任务的call方法；
2. 如果call执行成功，则通过set方法保存结果；
3. 如果call执行有异常，则通过setException保存异常；

### 任务的关闭

shutdown方法会将线程池的状态设置为SHUTDOWN,线程池进入这个状态后,就拒绝再接受任务,然后会将剩余的任务全部执行完

```java
public void shutdown() {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        //检查是否可以关闭线程
        checkShutdownAccess();
        //设置线程池状态
        advanceRunState(SHUTDOWN);
        //尝试中断worker
        interruptIdleWorkers();
            //预留方法,留给子类实现
        onShutdown(); // hook for ScheduledThreadPoolExecutor
    } finally {
        mainLock.unlock();
    }
    tryTerminate();
}

private void interruptIdleWorkers() {
    interruptIdleWorkers(false);
}

private void interruptIdleWorkers(boolean onlyOne) {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        //遍历所有的worker
        for (Worker w : workers) {
            Thread t = w.thread;
            //先尝试调用w.tryLock(),如果获取到锁,就说明worker是空闲的,就可以直接中断它
            //注意的是,worker自己本身实现了AQS同步框架,然后实现的类似锁的功能
            //它实现的锁是不可重入的,所以如果worker在执行任务的时候,会先进行加锁,这里tryLock()就会返回false
            if (!t.isInterrupted() && w.tryLock()) {
                try {
                    t.interrupt();
                } catch (SecurityException ignore) {
                } finally {
                    w.unlock();
                }
            }
            if (onlyOne)
                break;
        }
    } finally {
        mainLock.unlock();
    }
}
```

shutdownNow做的比较绝，它先将线程池状态设置为STOP，然后拒绝所有提交的任务。最后中断左右正在运行中的worker,然后清空任务队列。

```java
public List<Runnable> shutdownNow() {
    List<Runnable> tasks;
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        checkShutdownAccess();
        //检测权限
        advanceRunState(STOP);
        //中断所有的worker
        interruptWorkers();
        //清空任务队列
        tasks = drainQueue();
    } finally {
        mainLock.unlock();
    }
    tryTerminate();
    return tasks;
}

private void interruptWorkers() {
    final ReentrantLock mainLock = this.mainLock;
    mainLock.lock();
    try {
        //遍历所有worker，然后调用中断方法
        for (Worker w : workers)
            w.interruptIfStarted();
    } finally {
        mainLock.unlock();
    }
}
```



### 参考

https://www.cnblogs.com/starsray/p/16220051.html

https://juejin.cn/post/6844904146856837128

https://blog.csdn.net/programmer_at/article/details/79799267

<!-- @include: @article-footer.snippet.md -->