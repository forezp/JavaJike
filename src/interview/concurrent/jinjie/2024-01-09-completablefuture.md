---
lang: zh-CN
title: CompletableFuture使用详解
headerDepth: 1
order: 13
icon: shangyehuaquanqiu
collapsible: false
description: CompletableFuture使用详解
---



## 前言

我们一般使用多线程来提交系统的吞吐量，通常使用线程池+Runnable来实现，也可以使用Thread+Runnable来实现，但是这种方式没有返回值。如果需要使用返回值，我们会使用Future+Thread的方式来实现。在上一篇文章

[FutureTask详解](https://www.fangzhipeng.com/interview/concurrent/tools/2024-01-08-futuretask.html)中已经讲解了这种实现：

```
package io.github.forezp.concurrentlab.threadpool;

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
            //模拟主线程执行耗时任务
            Thread.sleep(1000);
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

运行上面代码可以知道当调用代码` Integer result = futureTask.get(5, TimeUnit.SECONDS);` 的时候，当前主线程是阻塞状态。因此Future+Thread这种模式有一定的局限性：**在获取返回值的时候会阻塞主线程**。

Java8引入的**`CompletableFuture`**可以解决上面的问题。



## CompletableFuture介绍



![image-20240108205738858](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/8/image-20240108205738858.png)

`CompletableFuture` 是 Java 8 引入的一个用于异步编程的工具类，`CompletableFuture` 类实现了`Future`接口，并提供了额外的方法来管理异步计算的完成和组合。它提供了强大的功能来简化异步操作、串行/并行组合以及处理异步计算结果的方法。

以下是 `CompletableFuture` 类的一些主要特性和用法：

1. **异步操作**：`CompletableFuture` 可以通过 `supplyAsync()` 或 `runAsync()` 等静态方法，以及 `CompletableFuture` 对象的 `thenApplyAsync()`，`thenComposeAsync()` 等方法来执行异步操作。

2. **回调函数**：`CompletableFuture` 通过 `thenApply()`，`thenCompose()`，`thenAccept()`，`thenCombine()`等方法支持链式调用和操作组合，可方便地对异步计算结果进行后续处理。

3. **异常处理**：`CompletableFuture` 提供了异常处理的方法，如`exceptionally()`，`handle()` 等，方便处理异步操作中的异常情况。

4. **组合操作**：`CompletableFuture` 可以通过 `thenCombine()`，`thenCompose()`，`thenAcceptBoth()` 等方法进行多个异步操作的组合。

5. **等待结果**：通过 `get()` 方法，可以等待异步操作的完成并获取计算结果，也可以指定超时时间。

6. **组合多个 CompletableFuture**：可以利用 `allOf()`，`anyOf()` 等方法来组合多个`CompletableFuture`对象。

7. **异步任务线程配置**：可以通过 `CompletableFuture` 的一些静态方法设置线程池、执行器等执行异步任务的线程配置。

使用 `CompletableFuture` 可以简化异步编程的复杂性，提供了丰富的方法和组合操作，使得异步操作和结果处理变得更加灵活和高效。



## CompletableFuture使用示例



### CompletableFuture具有Future的功能

以下是一个简单的使用示例，演示如何使用 `CompletableFuture` 执行异步操作并处理异步计算的结果：

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {
    public static void main(String[] args) {
        // 异步执行任务，并返回计算结果
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
            // 模拟耗时操作
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 10;
        });

      
        try {
            Integer result = future.get();
            System.out.println("计算结果为：" + result);
        } catch (InterruptedException | ExecutionException e) {
            System.out.println("等待任务执行出错：" + e.getMessage());
        }
    }
}
```

在上面的示例中，我们首先通过 `CompletableFuture.supplyAsync()` 方法提交一个异步任务，该任务返回一个固定的整数值。然后，通过 `future.get()` 方法等待异步任务执行完成，并获取计算结果。



### task异步完成后使用回调函数

```
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {
    public static void main(String[] args) {
        // 1.异步执行任务，并返回计算结果
        CompletableFuture<Integer> future = CompletableFuture.supplyAsync(() -> {
            // 模拟耗时操作
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 10;
        });

        // 2.处理异步计算的结果,task完成后回调使用回调函数thenApply()
        future.thenApply(result -> result * 2)
                .thenAcceptAsync(finalResult -> System.out.println("最终结果为：" + finalResult))
                .exceptionally(throwable -> {
                    System.out.println("任务执行出错：" + throwable.getMessage());
                    return null;
                });

        // 3.等待异步任务执行完成
        try {
            Integer result = future.get();
            System.out.println("计算结果为：" + result);
        } catch (InterruptedException | ExecutionException e) {
            System.out.println("等待任务执行出错：" + e.getMessage());
        }
    }
}
  

```

在上面的示例中，我们首先通过 `CompletableFuture.supplyAsync()` 方法提交一个异步任务，该任务返回一个固定的整数值。**然后，使用 `thenApply()` 方法对任务的结果进行二倍处理，并通过 `thenAcceptAsync()` 方法异步处理最终的结果。同时，我们使用 `exceptionally()` 方法来处理可能发生的异常情况。**

最后，通过 `future.get()` 方法等待异步任务执行完成，并获取计算结果。

这个示例展示了如何使用 `CompletableFuture` 执行异步操作、处理结果以及异常情况，以及如何进行链式操作和组合操作。



### 完成任意一个Task就开始执行回调函数

当你想要在任意一个 `CompletableFuture` 完成后执行回调函数时，你可以使用 `anyOf` 方法并配合回调函数实现这个需求。示例代码如下：

```java
package io.github.forezp.concurrentlab.threadpool;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureAnyOfExample {
    public static void main(String[] args) {
        // 创建两个CompletableFuture
        CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
            // 模拟耗时操作
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 10;
        });

        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
            // 模拟耗时操作
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "Hello";
        });

        // 任意一个CompletableFuture完成后执行回调函数
        CompletableFuture<Object> resultFuture = CompletableFuture.anyOf(future1, future2);
        resultFuture.thenAcceptAsync(result -> {
            System.out.println("第一个完成的任务结果为：" + result);
            // 在此处编写你想要执行的回调函数逻辑
        });

        // 使用get()等待异步任务执行完成
        try {
            System.out.println(future1.get());
            Thread.sleep(3000); // 等待异步任务完成
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}

```

在这个示例中，我们创建了两个 `CompletableFuture` 对象 `future1` 和 `future2`。然后，我们使用 `CompletableFuture.anyOf` 方法来创建一个新的 `CompletableFuture` 对象 `resultFuture`，它会在任意一个 `future1` 或 `future2` 完成后执行回调函数。在回调函数中，我们可以处理首先完成的任务的结果，以及定义接下来的逻辑操作。



### 完成全部Task就开始执行回调函数

当你想要在所有的 `CompletableFuture` 都完成后执行回调函数时，你可以使用 `allOf` 方法并配合回调函数实现这个需求。示例代码如下：

```java
package io.github.forezp.concurrentlab.threadpool;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureAllOfExample {
    public static void main(String[] args) {
        // 创建多个CompletableFuture
        CompletableFuture<Integer> future1 = CompletableFuture.supplyAsync(() -> {
            // 模拟耗时操作
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return 10;
        });

        CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> {
            // 模拟耗时操作
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "Hello";
        });

        // 在所有CompletableFuture完成后执行回调函数
        CompletableFuture<Void> allFutures = CompletableFuture.allOf(future1, future2);
        allFutures.thenRun(() -> {
            System.out.println("所有任务完成，开始执行回调函数");
            try {
                System.out.println("future1:"+future1.get());
                System.out.println("future2:"+future2.get());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            // 在此处编写你想要执行的回调函数逻辑
        });

        // 使用get()等待异步任务执行完成
        try {
            System.out.println(allFutures.get());
           // Thread.sleep(3000); // 等待异步任务完成
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

在这个示例中，我们创建了两个 `CompletableFuture` 对象 `future1` 和 `future2`。然后，我们使用 `CompletableFuture.allOf` 方法来创建一个新的 `CompletableFuture` 对象 `allFutures`，它会在所有的 `future1` 和 `future2` 都完成后执行回调函数。在回调函数中，我们可以处理所有任务完成后的逻辑操作。



## 总结

`CompletableFuture` 是Java中用于异步编程的工具类。它能执行异步任务，并处理任务的结果。以下是 `CompletableFuture` 的关键特点：

1. 异步操作：使用 `supplyAsync()` 方法执行异步任务。

2. 回调函数：使用 `thenApply()` 或 `thenAccept()` 添加回调函数。

3. 异常处理：使用 `exceptionally()` 捕获和处理异常。

4. 组合操作：使用 `thenCombine()`、`thenCompose()` 等方法组合多个 `CompletableFuture`。

5. 等待任务完成：使用 `get()` 方法等待任务执行完成并获取结果。

6. 并发控制：使用 `allOf()` 和 `anyOf()` 控制多个任务的并发执行。

7. 超时处理：使用 `completeOnTimeout()` 设置任务的超时时间。

`CompletableFuture` 可以提高代码的性能和可读性，实现并发和并行操作，并轻松处理异常情况和组合多个异步任务的结果。再实际的开发中，选择什么样的工具可以根据实际的场景来决定。