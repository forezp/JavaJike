---
lang: zh-CN
title: ThreadLocal详解
headerDepth: 1
order: 10
icon: wuliu
collapsible: false
description: ThreadLocal详解
---

## 什么是ThreadLocal

ThreadLocal是线程本地变量，它提供了线程本地变量的支持。每个ThreadLocal对象都维护了一个独立的变量副本，每个线程都可以访问自己的副本，对其他线程而言是隔离的。

- 使用ThreadLocal，可以为每个线程创建独立的变量副本，每个线程可以通过ThreadLocal对象来获取和设置自己的变量副本，不存在多线程间共享的问题。
- ThreadLocal 提供了线程本地的变量副本。它与普通变量的区别在于，每个使用该变量的线程都会初始化一个完全独立的实例副本。当一个线程结束时，它所使用的所有 ThreadLocal 相对的实例副本都可被回收。

下图可以增强理解：

![image-20240106113729346](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/6/image-20240106113729346.png)



## ThreadLocal的使用示例

下面是一个简单的示例，演示了如何在多个线程中使用ThreadLocal：

```java
import java.util.concurrent.atomic.AtomicInteger;

public class ThreadLocalExample {

    private static ThreadLocal<AtomicInteger> threadLocal = ThreadLocal.withInitial(AtomicInteger::new);

    public static void main(String[] args) {
        Runnable incrementTask = () -> {
            // 获取当前线程的变量副本
            AtomicInteger value = threadLocal.get();
            // 对变量进行操作
            value.incrementAndGet();
            // 打印当前线程的变量值
            System.out.println(Thread.currentThread().getName() + ": " + value.get());
            // 清除当前线程的变量副本
            threadLocal.remove();
        };

        // 创建多个线程并执行任务
        Thread thread1 = new Thread(incrementTask);
        Thread thread2 = new Thread(incrementTask);
        Thread thread3 = new Thread(incrementTask);

        thread1.start();
        thread2.start();
        thread3.start();
    }
}
```

在上面的示例中，首先创建了一个ThreadLocal对象 `threadLocal`，初始值为一个AtomicInteger对象。每个线程通过 `threadLocal.get()` 方法获取自己的变量副本，并进行+1操作。最后，通过 `threadLocal.remove()` 方法清除变量副本。

运行示例代码，可以看到每个线程都有自己独立的变量副本，并且执行自己的操作，而不会互相干扰。



## ThreadLocal原理分析

在线程的内部有一个变量threadLocals，它是一个ThreadLocal.ThreadLocalMap对象，这个对象是一个定制化的Map，用于存储本地变量的。threadLocals的key需要是ThreadLocal对象，所以一个线程可以存储多个ThreadLocal对象：

```
/* ThreadLocal values pertaining to this thread. This map is maintained
 * by the ThreadLocal class. */
ThreadLocal.ThreadLocalMap threadLocals = null;
```

ThreadLocalMap是由ThreadLocal维护的静态内部类。在使用ThreadLocal的get()、set()方法时，其实都是调用了线程中threadLocals变量的ThreadLocalMap类对应的get()、set()方法。在调用set方法，首先获取当前线程对象：

```
public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
}
```

然后通过getMap方法来获取当前线程中的threadLocals：

```
ThreadLocalMap getMap(Thread t) {
    return t.threadLocals;
}
```

如果Thread中的threadLocals变量为null，会创建一个ThreadLocalMap并赋值给Thread：

```
void createMap(Thread t, T firstValue) {
    t.threadLocals = new ThreadLocalMap(this, firstValue);
}
```

如果已经存在，则通过ThreadLocalMap的set方法设置值，这里我们可以看到set中key为this，也就是当前ThreadLocal对象，而value值则是我们要存的值。

对应的get方法源码如下：

```
public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    return setInitialValue();
}
```

下面我们通过一个流程图来汇总一下上述流程：

![image-20240106122058598](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/6/image-20240106122058598.png)





## ThreadLocal的使用场景

ThreadLocal在多线程编程中有各种使用场景。以下是一些常见的使用场景：

1. 线程安全的对象：使用ThreadLocal可以实现每个线程拥有自己的对象实例，从而避免多线程并发访问时的线程安全问题。比如，在Web开发中，可以使用ThreadLocal来保存每个请求的用户身份信息，以便在处理请求的过程中使用，而不需要在每个方法中传递这些信息。

2. 数据库连接管理：在多线程环境下，使用ThreadLocal可以确保每个线程都有自己的数据库连接。这样可以避免多个线程共享同一个数据库连接时的并发问题，同时还可以减少连接的创建和销毁开销。

3. 事务管理：在某些情况下，需要在多个方法之间共享事务状态。使用ThreadLocal可以在每个线程中保存事务状态，以便在需要时进行回滚或提交。

4. 用户级别的上下文信息：在某些应用场景中，需要将某些用户级别的上下文信息在同一个线程中共享，而不需要在每个方法中显式传递这些信息。ThreadLocal可以用于保存用户的上下文信息。比如Log4j的MDC。

5. 缓存管理：ThreadLocal可以用于保存每个线程的缓存实例，以避免多个线程共享同一个缓存实例时的并发问题。

需要注意的是，尽管ThreadLocal可以用于保存线程本地的对象实例，但并不是说所有的情况都适合使用ThreadLocal。在使用ThreadLocal时，需要注意线程安全性、内存泄漏以及资源的释放等问题。

## ThreadLocal内存泄露

ThreadLocal使用不当可能会出现内存泄露，进而可能导致内存溢出。下面我们就来分析一下内存泄露的原因及相关设计思想。

### 内存引用链路



在使用ThreadLocal时，每个线程都会在自己的ThreadLocalMap对象中为该ThreadLocal对象创建一个Entry对象，并将ThreadLocal对象作为key，value为业务需要存储的Object。

假设ThreadLocal对象被定义为静态变量，那么它的生命周期会与ClassLoader相同，并一直存在于内存中，不会被回收。而每个线程的ThreadLocalMap对象则是随着线程的销毁而销毁，而且ThreadLocalMap的Entry对象是使用ThreadLocal的弱引用作为Key创建的，因此当ThreadLocal对象没有其他强引用指向时，它会被垃圾回收，对应的Entry也会被从ThreadLocalMap中删除。这样，在业务中无需担心内存泄漏的问题。



![image-20240106124807435](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/6/image-20240106124807435.png)

下面我们先来了解一下Java中引用的分类。

### Java中的引用

Java中通常会存在以下类型的引用：强引用、弱引用、软引用、虚引用。

- 强引用：通常new出来的对象就是强引用类型，只要引用存在，垃圾回收器将永远不会回收被引用的对象，哪怕内存不足的时候；
- 软引用：使用SoftReference修饰的对象被称为软引用，软引用指向的对象在内存要溢出的时候被回收。如果回收之后，还没有足够的内存，才会抛出内存溢出异常；
- 弱引用：使用WeakReference修饰的对象被称为弱引用，只要发生垃圾回收，无论当前内存是否足够，都会回收掉只被弱引用关联的对象实例。
- 虚引用：虚引用是最弱的引用，在Java中使用PhantomReference进行定义。虚引用中唯一的作用就是用队列接收对象即将死亡的通知。

### 泄露原因分析

正常来说，当Thread执行完会被销毁，Thread.threadLocals指向的ThreadLocalMap实例也随之变为垃圾，它里面存放的Entity也会被回收。这种情况是不会发生内存泄漏的。

**发生内存泄露的场景一般存在于线程池的情况下。此时，Thread生命周期比较长（存在循环使用），threadLocals引用一直存在，当其存放的ThreadLocal被回收（弱引用生命周期比较短）后，对应的Entity就成了key为null的实例，但value值不会被回收。如果此Entity一直不被get()、set()、remove()，就一直不会被回收，也就发生了内存泄漏。**

所以，通常在使用完ThreadLocal后需要调用remove()方法进行内存的清除。

比如在web请求当中，我们可以通过过滤器等进行回收方法的调用：

```
public void doFilter(ServeletRequest request, ServletResponse){
    try{
        //设置ThreadLocal变量
        localName.set("程序新视界");
        chain.doFilter(request, response)
    }finally{
        //调用remove方法溢出threadLocal中的变量
        localName.remove();
    }
}
```



## InheritableThreadLocal 父子线程间的数据共享

InheritableThreadLocal是ThreadLocal的一个变种，它允许子线程继承父线程的ThreadLocal变量值。

ThreadLocal变量通常在一个线程内部使用，并且对其他线程是不可见的。但是有时候，我们希望父线程设置的ThreadLocal变量的值可以被其创建的子线程继承和使用。这就是使用InheritableThreadLocal的场景。

InheritableThreadLocal和ThreadLocal的使用方式非常相似，可以通过set方法设置变量的值，通过get方法获取变量的值。不同之处在于，InheritableThreadLocal可以在父线程和子线程之间实现变量值的传递。当一个线程创建了一个子线程时，子线程会继承父线程中的InheritableThreadLocal的值。

InheritableThreadLocal的原理和内部实现与ThreadLocal类似，每个线程都维护一个InheritableThreadLocalMap对象，用于保存线程本地变量的值。当一个线程创建子线程时，子线程会复制父线程的InheritableThreadLocalMap，并继承父线程中的InheritableThreadLocal的值。

需要注意的是，InheritableThreadLocal并不能解决所有线程间的共享数据问题。它只是提供了一种在父子线程之间传递ThreadLocal变量值的机制，并且对其他线程仍然是不可见的。对于多个线程之间需要共享数据的情况，仍然需要使用其他的线程同步机制，如锁、信号量等。

使用示例：

```csharp
public class InheritableThreadLocalTest {

   public static void main(String[] args) {
       ThreadLocal<String> threadLocal = new ThreadLocal<>();
       InheritableThreadLocal<String> inheritableThreadLocal = new InheritableThreadLocal<>();

       threadLocal.set("123");
       inheritableThreadLocal.set("123");

       Thread thread = new Thread(()->{
           System.out.println("ThreadLocal value " + threadLocal.get());
           System.out.println("InheritableThreadLocal value " + inheritableThreadLocal.get());
       });
       thread.start();
       
   }
}
//运行结果
ThreadLocal value null
InheritableThreadLocal value 123
```

可以发现，在子线程中，是可以获取到父线程的 `InheritableThreadLocal `类型变量的值，但是不能获取到 `ThreadLocal `类型变量的值。

获取不到`ThreadLocal `类型的值，我们可以好理解，因为它是线程隔离的嘛。`InheritableThreadLocal `是如何做到的呢？原理是什么呢？

在`Thread`类中，除了成员变量`threadLocals`之外，还有另一个成员变量：`inheritableThreadLocals`。它们两类型是一样的：

```java
public class Thread implements Runnable {
   ThreadLocalMap threadLocals = null;
   ThreadLocalMap inheritableThreadLocals = null;
 }
```

`Thread`类的`init`方法中，有一段初始化设置：

```typescript
private void init(ThreadGroup g, Runnable target, String name,
                      long stackSize, AccessControlContext acc,
                      boolean inheritThreadLocals) {
      
        ......
        if (inheritThreadLocals && parent.inheritableThreadLocals != null)
            this.inheritableThreadLocals =
                ThreadLocal.createInheritedMap(parent.inheritableThreadLocals);
        /* Stash the specified stack size in case the VM cares */
        this.stackSize = stackSize;

        /* Set thread ID */
        tid = nextThreadID();
    }
 static ThreadLocalMap createInheritedMap(ThreadLocalMap parentMap) {
        return new ThreadLocalMap(parentMap);
    }
```

可以发现，当`parent的inheritableThreadLocals`不为`null`时，就会将`parent`的`inheritableThreadLocals`，赋值给前线程的`inheritableThreadLocals`。说白了，就是如果当前线程的`inheritableThreadLocals`不为`null`，就从父线程哪里拷贝过来一个过来，类似于另外一个`ThreadLocal`，但是数据从父线程那里来的。

### 参考

https://heapdump.cn/article/2591416

https://juejin.cn/post/7126708538440679460