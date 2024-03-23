---
lang: zh-CN
title: FutureTask详解
headerDepth: 1
order: 12
icon: shujujianguan
collapsible: false
description: FutureTask详解
---

## 什么是FutureTask

`FutureTask` 是 Java 中用于表示异步计算结果的类。它实现了 `Future` 接口，可以用于提交给线程池执行，并在将来的某个时间获取计算结果。

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/8/java-thread-x-juc-futuretask-1.png)

FutureTask实现了RunnableFuture接口，则RunnableFuture接口继承了Runnable接口和Future接口，所以FutureTask既能当做一个Runnable直接被Thread执行，也能作为Future用来得到Callable的计算结果。

`FutureTask` 是 Java 中用于表示异步计算结果的类。它实现了 `Future` 接口，可以用于提交给线程池执行，也可以直接提交给Thread类执行，并在将来的某个时间获取计算结果。

`FutureTask` 的主要特点包括：

1. 异步执行：`FutureTask` 可以在后台执行一个任务，不会阻塞当前线程，并且可以获取计算结果。
2. 取消任务：可以通过 `cancel()` 方法取消任务的执行。如果任务已经开始执行或已经完成，则无法取消。
3. 等待结果：可以通过 `get()` 方法获取任务的结果。如果任务还未完成，`get()` 方法会阻塞当前线程直到任务完成并返回结果。
4. 超时等待：可以通过重载的 `get()` 方法设置等待任务结果的时间限制。如果任务在指定时间内未完成，则会抛出 `TimeoutException` 异常。
5. 判断任务是否完成：可以通过 `isDone()` 方法判断任务是否已经完成。



## FutureTask使用示例

**常用使用方式：**

- 第1种方式: Future + ExecutorService
- 第2种方式: FutureTask + Thread
- 第3种方式: FutureTask + ExecutorService（推荐）

**Future + ExecutorService**

当使用 `Future` 结合 `ExecutorService` 时，可以实现异步提交任务，并通过 `Future` 获取任务的执行结果，以下是一个简单的示例：

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class FutureWithExecutorServiceExample {
    public static void main(String[] args) {
        // 创建一个 ExecutorService，这里使用固定大小为 1 的线程池
        ExecutorService executor = Executors.newFixedThreadPool(1);

        // 创建一个 Callable 对象，用于执行具体的任务
        Callable<Integer> task = () -> {
            int sum = 0;
            for (int i = 1; i <= 10; i++) {
                sum += i;
                Thread.sleep(500); // 模拟耗时操作
            }
            return sum;
        };

        // 提交任务并获得 Future 对象
        Future<Integer> future = executor.submit(task);

        System.out.println("任务已提交，等待计算结果...");

        try {
            // 等待任务执行完成，并获取计算结果
            Integer result = future.get();
            System.out.println("计算结果为：" + result);
        } catch (Exception e) {
            System.out.println("任务执行出错：" + e.getMessage());
        }

        // 关闭线程池
        executor.shutdown();
    }
}
```

在上述示例中，我们首先创建一个固定大小为 1 的线程池 `ExecutorService`，然后创建一个 `Callable` 对象 `task`，表示具体的任务。接着，通过 `executor.submit(task)` 方法提交任务并获得一个 `Future` 对象。我们通过 `future.get()` 等待任务执行完成，并获取执行结果。最后，我们关闭线程池。

这样就可以利用 `Future` 结合 `ExecutorService` 实现异步任务的提交和获取执行结果。

**FutureTask + Thread**

当使用`FutureTask`结合`Thread`时，可以手动创建一个线程来执行`FutureTask`，以下是一个简单的示例：

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class FutureTaskWithThreadExample {
    public static void main(String[] args) {
        // 创建一个 Callable 对象，用于执行具体的任务
        Callable<Integer> task = () -> {
            int sum = 0;
            for (int i = 1; i <= 10; i++) {
                sum += i;
                Thread.sleep(500); // 模拟耗时操作
            }
            return sum;
        };

        // 创建一个 FutureTask 对象，将 Callable 对象作为参数传入
        FutureTask<Integer> futureTask = new FutureTask<>(task);

        // 创建一个线程，并将 FutureTask 对象传入
        Thread thread = new Thread(futureTask);

        System.out.println("任务已提交，等待计算结果...");

        // 启动线程执行任务
        thread.start();

        try {
            // 等待任务执行完成，并获取计算结果
            Integer result = futureTask.get();
            System.out.println("计算结果为：" + result);
        } catch (InterruptedException | ExecutionException e) {
            System.out.println("任务执行出错：" + e.getMessage());
        }
    }
}
```

在上述示例中，我们创建了一个`Callable`对象`task`，表示具体的任务。接着，我们将`task`作为参数传入`FutureTask`构造器创建一个`FutureTask`对象`futureTask`。然后，我们创建了一个线程，并将`futureTask`传入。启动线程后，我们可以通过`futureTask.get()`方法等待任务执行完成，并获取执行结果。

这样就可以手动创建线程来执行`FutureTask`，并获取任务的执行结果。

**FutureTask + ExecutorService**

以下是一个使用 `FutureTask` 的简单示例：

```java
import java.util.concurrent.*;

public class FutureTaskExample {
    public static void main(String[] args) {
        // 创建一个 Callable 对象，用于执行具体的任务
        Callable<Integer> task = () -> {
            int sum = 0;
            for (int i = 1; i <= 10; i++) {
                sum += i;
                Thread.sleep(500); // 模拟耗时操作
            }
            return sum;
        };

        // 创建一个 FutureTask 对象，将 Callable 对象作为参数传入
        FutureTask<Integer> futureTask = new FutureTask<>(task);

        // 创建一个线程池，并将 FutureTask 提交给线程池执行
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.submit(futureTask);

        System.out.println("任务已提交，等待计算结果...");

        try {
            // 等待任务执行完成，并获取计算结果，可以设置超时时间
            Integer result = futureTask.get(5, TimeUnit.SECONDS);
            System.out.println("计算结果为：" + result);
        } catch (InterruptedException | ExecutionException | TimeoutException e) {
            System.out.println("任务执行出错：" + e.getMessage());
        }

        // 关闭线程池
        executor.shutdown();
    }
}
```

在上述示例中，我们创建了一个 `Callable` 对象，表示需要执行的具体任务。然后将该 `Callable` 对象传入 `FutureTask` 构造器创建一个 `FutureTask` 对象。接着，将 `FutureTask` 对象提交给线程池执行。我们通过 `get()` 方法等待任务执行完成，并获取执行结果。在等待任务完成时，可以设置超时时间。最后，我们关闭线程池。



## FutureTask源码解析



### Callable接口

对于需要执行的任务需要实现Callable接口，Callable接口定义如下:

```
public interface Callable<V> {

    V call() throws Exception;
}
```

可以看到Callable是个泛型接口，泛型V就是要call()方法返回的类型。Callable接口和Runnable接口很像，都可以被另外一个线程执行，但是正如前面所说的，Runnable不会返回数据也不能抛出异常。



### Future接口

Future接口代表异步计算的结果，通过Future接口提供的方法可以查看异步计算是否执行完成，或者等待执行结果并获取执行结果，同时还可以取消执行。Future接口的定义如下:

```
public interface Future<V> {
    boolean cancel(boolean mayInterruptIfRunning);
    boolean isCancelled();
    boolean isDone();
    V get() throws InterruptedException, ExecutionException;
    V get(long timeout, TimeUnit unit)
        throws InterruptedException, ExecutionException, TimeoutException;
}
```

- cancel():cancel()方法用来取消异步任务的执行。如果异步任务已经完成或者已经被取消，或者由于某些原因不能取消，则会返回false。如果任务还没有被执行，则会返回true并且异步任务不会被执行。如果任务已经开始执行了但是还没有执行完成，若mayInterruptIfRunning为true，则会立即中断执行任务的线程并返回true，若mayInterruptIfRunning为false，则会返回true且不会中断任务执行线程。
- isCanceled():判断任务是否被取消，如果任务在结束(正常执行结束或者执行异常结束)前被取消则返回true，否则返回false。
- isDone():判断任务是否已经完成，如果完成则返回true，否则返回false。需要注意的是：任务执行过程中发生异常、任务被取消也属于任务已完成，也会返回true。
- get():获取任务执行结果，如果任务还没完成则会阻塞等待直到任务执行完成。如果任务被取消则会抛出CancellationException异常，如果任务执行过程发生异常则会抛出ExecutionException异常，如果阻塞等待过程中被中断则会抛出InterruptedException异常。
- get(long timeout,Timeunit unit):带超时时间的get()版本，如果阻塞等待过程中超时则会抛出TimeoutException异常。

### FutureTask

FutureTask实现了RunnableFuture接口，则RunnableFuture接口继承了Runnable接口和Future接口，所以FutureTask既能当做一个Runnable直接被Thread执行，也能作为Future用来得到Callable的计算结果。

### 核心属性

```
//内部持有的callable任务，运行完毕后置空
private Callable<V> callable;

//从get()中返回的结果或抛出的异常
private Object outcome; // non-volatile, protected by state reads/writes

//运行callable的线程
private volatile Thread runner;

//使用Treiber栈保存等待线程
private volatile WaitNode waiters;

//任务状态
private volatile int state;
private static final int NEW          = 0;
private static final int COMPLETING   = 1;
private static final int NORMAL       = 2;
private static final int EXCEPTIONAL  = 3;
private static final int CANCELLED    = 4;
private static final int INTERRUPTING = 5;
private static final int INTERRUPTED  = 6;

```

- NEW:表示是个新的任务或者还没被执行完的任务。这是初始状态。
- COMPLETING:任务已经执行完成或者执行任务的时候发生异常，但是任务执行结果或者异常原因还没有保存到outcome字段(outcome字段用来保存任务执行结果，如果发生异常，则用来保存异常原因)的时候，状态会从NEW变更到COMPLETING。但是这个状态会时间会比较短，属于中间状态。
- NORMAL:任务已经执行完成并且任务执行结果已经保存到outcome字段，状态会从COMPLETING转换到NORMAL。这是一个最终态。
- EXCEPTIONAL:任务执行发生异常并且异常原因已经保存到outcome字段中后，状态会从COMPLETING转换到EXCEPTIONAL。这是一个最终态。
- CANCELLED:任务还没开始执行或者已经开始执行但是还没有执行完成的时候，用户调用了cancel(false)方法取消任务且不中断任务执行线程，这个时候状态会从NEW转化为CANCELLED状态。这是一个最终态。
- INTERRUPTING: 任务还没开始执行或者已经执行但是还没有执行完成的时候，用户调用了cancel(true)方法取消任务并且要中断任务执行线程但是还没有中断任务执行线程之前，状态会从NEW转化为INTERRUPTING。这是一个中间状态。
- INTERRUPTED:调用interrupt()中断任务执行线程之后状态会从INTERRUPTING转换到INTERRUPTED。这是一个最终态。

有一点需要注意的是，所有值大于COMPLETING的状态都表示任务已经执行完成(任务正常执行完成，任务执行异常或者任务被取消)。

各个状态之间的可能转换关系如下图所示:

![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/8/java-thread-x-juc-futuretask-2.png)



### run方法

run()方法实现如下:

```
public void run() {
    // 1. 状态如果不是NEW，说明任务或者已经执行过，或者已经被取消，直接返回
    // 2. 状态如果是NEW，则尝试把当前执行线程保存在runner字段中
    // 如果赋值失败则直接返回
    if (state != NEW ||
        !UNSAFE.compareAndSwapObject(this, runnerOffset,
                                     null, Thread.currentThread()))
        return;
    try {
        Callable<V> c = callable;
        if (c != null && state == NEW) {
            V result;
            boolean ran;
            try {
                // 3. 执行任务
                result = c.call();
                ran = true;
            } catch (Throwable ex) {
                result = null;
                ran = false;
                // 4. 任务异常
                setException(ex);
            }
            if (ran)
                // 4. 任务正常执行完毕
                set(result);
        }
    } finally {
        // runner must be non-null until state is settled to
        // prevent concurrent calls to run()
        runner = null;
        // state must be re-read after nulling runner to prevent
        // leaked interrupts
        int s = state;
        // 5. 如果任务被中断，执行中断处理
        if (s >= INTERRUPTING)
            handlePossibleCancellationInterrupt(s);
    }
}
```

run()方法首先会

- 判断当前任务的state是否等于NEW,如果不为NEW则说明任务或者已经执行过，或者已经被取消，直接返回。

- 如果状态为NEW则接着会通过unsafe类把任务执行线程引用CAS的保存在runner字段中，如果保存失败，则直接返回。

- 执行任务。

- 如果任务执行发生异常，则调用setException()方法保存异常信息。setException()方法如下：

```
protected void setException(Throwable t) {
    if (UNSAFE.compareAndSwapInt(this, stateOffset, NEW, COMPLETING)) {
        outcome = t;
        UNSAFE.putOrderedInt(this, stateOffset, EXCEPTIONAL); // final state
        finishCompletion();
    }
}
```

在setException()方法中 

- 首先会CAS的把当前的状态从NEW变更为COMPLETING状态。
- 把异常原因保存在outcome字段中，outcome字段用来保存任务执行结果或者异常原因。
- CAS的把当前任务状态从COMPLETING变更为EXCEPTIONAL。这个状态转换对应着上图中的二。
- 调用finishCompletion()。关于这个方法后面在分析。

如果任务成功执行则调用set()方法设置执行结果，该方法实现如下:

```
protected void set(V v) {
    if (UNSAFE.compareAndSwapInt(this, stateOffset, NEW, COMPLETING)) {
        outcome = v;
        UNSAFE.putOrderedInt(this, stateOffset, NORMAL); // final state
        finishCompletion();
    }
}
```

这个方法跟上面分析的setException()差不多，

- 首先会CAS的把当前的状态从NEW变更为COMPLETING状态。
- 把任务执行结果保存在outcome字段中。
- CAS的把当前任务状态从COMPLETING变更为NORMAL。这个状态转换对应着上图中的一。
- 调用finishCompletion()。

发起任务线程跟执行任务线程通常情况下都不会是同一个线程，在任务执行线程执行任务的时候，任务发起线程可以查看任务执行状态、获取任务执行结果、取消任务等等操作，接下来分析下这些操作。

### get方法

任务发起线程可以调用get()方法来获取任务执行结果，如果此时任务已经执行完毕则会直接返回任务结果，如果任务还没执行完毕，则调用方会阻塞直到任务执行结束返回结果为止。get()方法实现如下:

```
public V get() throws InterruptedException, ExecutionException {
    int s = state;
    if (s <= COMPLETING)
        s = awaitDone(false, 0L);
    return report(s);
}
```

get()方法实现比较简单，会

- 判断任务当前的state <= COMPLETING是否成立。前面分析过，COMPLETING状态是任务是否执行完成的临界状态。

- 如果成立，表明任务还没有结束(这里的结束包括任务正常执行完毕，任务执行异常，任务被取消)，则会调用awaitDone()进行阻塞等待。

- 如果不成立表明任务已经结束，调用report()返回结果。

### awaitDone方法

当调用get()获取任务结果但是任务还没执行完成的时候，调用线程会调用awaitDone()方法进行阻塞等待，该方法定义如下:

```
private int awaitDone(boolean timed, long nanos)
        throws InterruptedException {
    // 计算等待截止时间
    final long deadline = timed ? System.nanoTime() + nanos : 0L;
    WaitNode q = null;
    boolean queued = false;
    for (;;) {
        // 1. 判断阻塞线程是否被中断,如果被中断则在等待队
        // 列中删除该节点并抛出InterruptedException异常
        if (Thread.interrupted()) {
            removeWaiter(q);
            throw new InterruptedException();
        }

        // 2. 获取当前状态，如果状态大于COMPLETING
        // 说明任务已经结束(要么正常结束，要么异常结束，要么被取消)
        // 则把thread显示置空，并返回结果
        int s = state;
        if (s > COMPLETING) {
            if (q != null)
                q.thread = null;
            return s;
        }
        // 3. 如果状态处于中间状态COMPLETING
        // 表示任务已经结束但是任务执行线程还没来得及给outcome赋值
        // 这个时候让出执行权让其他线程优先执行
        else if (s == COMPLETING) // cannot time out yet
            Thread.yield();
        // 4. 如果等待节点为空，则构造一个等待节点
        else if (q == null)
            q = new WaitNode();
        // 5. 如果还没有入队列，则把当前节点加入waiters首节点并替换原来waiters
        else if (!queued)
            queued = UNSAFE.compareAndSwapObject(this, waitersOffset,
                    q.next = waiters, q);
        else if (timed) {
            // 如果需要等待特定时间，则先计算要等待的时间
            // 如果已经超时，则删除对应节点并返回对应的状态
            nanos = deadline - System.nanoTime();
            if (nanos <= 0L) {
                removeWaiter(q);
                return state;
            }
            // 6. 阻塞等待特定时间
            LockSupport.parkNanos(this, nanos);
        }
        else
            // 6. 阻塞等待直到被其他线程唤醒
            LockSupport.park(this);
    }
}
```

awaitDone()中有个死循环，每一次循环都会

- 判断调用get()的线程是否被其他线程中断，如果是的话则在等待队列中删除对应节点然后抛出InterruptedException异常。
- 获取任务当前状态，如果当前任务状态大于COMPLETING则表示任务执行完成，则把thread字段置null并返回结果。
- 如果任务处于COMPLETING状态，则表示任务已经处理完成(正常执行完成或者执行出现异常)，但是执行结果或者异常原因还没有保存到outcome字段中。这个时候调用线程让出执行权让其他线程优先执行。
- 如果等待节点为空，则构造一个等待节点WaitNode。
- 如果第四步中新建的节点还没如队列，则CAS的把该节点加入waiters队列的首节点。
- 阻塞等待。

假设当前state=NEW且waiters为NULL,也就是说还没有任何一个线程调用get()获取执行结果，这个时候有两个线程threadA和threadB先后调用get()来获取执行结果。再假设这两个线程在加入阻塞队列进行阻塞等待之前任务都没有执行完成且threadA和threadB都没有被中断的情况下(因为如果threadA和threadB在进行阻塞等待结果之前任务就执行完成或线程本身被中断的话，awaitDone()就执行结束返回了)，执行过程是这样的，以threadA为例:

- 第一轮for循环，执行的逻辑是q == null,所以这时候会新建一个节点q。第一轮循环结束。

- 第二轮for循环，执行的逻辑是!queue，这个时候会把第一轮循环中生成的节点的netx指针指向waiters，然后CAS的把节点q替换waiters。也就是把新生成的节点添加到waiters链表的首节点。如果替换成功，queued=true。第二轮循环结束。

- 第三轮for循环，进行阻塞等待。要么阻塞特定时间，要么一直阻塞知道被其他线程唤醒。



### cancel方法

用户可以调用cancel(boolean)方法取消任务的执行，cancel()实现如下:

```
public boolean cancel(boolean mayInterruptIfRunning) {
    // 1. 如果任务已经结束，则直接返回false
    if (state != NEW)
        return false;
    // 2. 如果需要中断任务执行线程
    if (mayInterruptIfRunning) {
        // 2.1. 把任务状态从NEW转化到INTERRUPTING
        if (!UNSAFE.compareAndSwapInt(this, stateOffset, NEW, INTERRUPTING))
            return false;
        Thread t = runner;
        // 2.2. 中断任务执行线程
        if (t != null)
            t.interrupt();
        // 2.3. 修改状态为INTERRUPTED
        UNSAFE.putOrderedInt(this, stateOffset, INTERRUPTED); // final state
    }
    // 3. 如果不需要中断任务执行线程，则直接把状态从NEW转化为CANCELLED
    else if (!UNSAFE.compareAndSwapInt(this, stateOffset, NEW, CANCELLED))
        return false;
    // 4.
    finishCompletion();
    return true;
}
```

cancel()方法会做下面几件事:

- 判断任务当前执行状态，如果任务状态不为NEW，则说明任务或者已经执行完成，或者执行异常，不能被取消，直接返回false表示执行失败。

- 判断需要中断任务执行线程，则

  - 把任务状态从NEW转化到INTERRUPTING。这是个中间状态。

  - 中断任务执行线程。

  - 修改任务状态为INTERRUPTED。这个转换过程对应上图中的四。

- 如果不需要中断任务执行线程，直接把任务状态从NEW转化为CANCELLED。如果转化失败则返回false表示取消失败。这个转换过程对应上图中的四。

- 调用finishCompletion()。



### finishCompletion方法

根据前面的分析，不管是任务执行异常还是任务正常执行完毕，或者取消任务，最后都会调用finishCompletion()方法，该方法实现如下:

```
private void finishCompletion() {
    // assert state > COMPLETING;
    for (WaitNode q; (q = waiters) != null;) {
        if (UNSAFE.compareAndSwapObject(this, waitersOffset, q, null)) {
            for (;;) {
                Thread t = q.thread;
                if (t != null) {
                    q.thread = null;
                    LockSupport.unpark(t);
                }
                WaitNode next = q.next;
                if (next == null)
                    break;
                q.next = null; // unlink to help gc
                q = next;
            }
            break;
        }
    }

    done();

    callable = null;        // to reduce footprint
}
```

这个方法的实现比较简单，依次遍历waiters链表，唤醒节点中的线程，然后把callable置空。

被唤醒的线程会各自从awaitDone()方法中的LockSupport.park*()阻塞中返回，然后会进行新一轮的循环。在新一轮的循环中会返回执行结果(或者更确切的说是返回任务的状态)。



### 参考

https://www.cnblogs.com/linghu-java/p/8991824.html

<!-- @include: @article-footer.snippet.md -->