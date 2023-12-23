import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as d}from"./app-492d8984.js";const l={},s=d(`<h2 id="thread状态" tabindex="-1"><a class="header-anchor" href="#thread状态" aria-hidden="true">#</a> Thread状态</h2><p>Java的线程状态总共有六种，在Thread类的枚举类State中，总共有6种状态，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  public enum State {
        NEW,
        RUNNABLE,
        BLOCKED,
        WAITING,    
        TIMED_WAITING,
        TERMINATED;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每种状态代表的含义如下表所示：</p><table><thead><tr><th>线程状态</th><th>解释</th></tr></thead><tbody><tr><td>NEW</td><td>尚未启动的线程状态，即线程创建，还未调用start方法</td></tr><tr><td>RUNNABLE</td><td>就绪状态（调用start，等待调度）+正在运行</td></tr><tr><td>BLOCKED</td><td>等待监视器锁时，陷入阻塞状态</td></tr><tr><td>WAITING</td><td>等待状态的线程正在等待另一线程执行特定的操作（如notify）</td></tr><tr><td>TIMED_WAITING</td><td>具有指定等待时间的等待状态</td></tr><tr><td>TERMINATED</td><td>线程完成执行，终止状态</td></tr></tbody></table><p>上面的六种状态代码了一个线程从创建、运行、阻塞、终止的各个状态，代表了线程的生命周期。每种状态都是可以扭转的，状态的扭转如下图所示：</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/11/image-20231211225833220.png" alt="image-20231211225833220" tabindex="0" loading="lazy"><figcaption>image-20231211225833220</figcaption></figure><h3 id="new-新建状态" tabindex="-1"><a class="header-anchor" href="#new-新建状态" aria-hidden="true">#</a> New（新建状态）</h3><p>用<strong>new关键字</strong>新建一个线程，这个线程就处于<strong>新建状态</strong>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   public static void main(String[] args) {
        Thread newThread=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
        System.out.println(&quot;newThread state:&quot;+newThread.getState());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上面代码，代码输出的线程状态为NEW，代码如下：</p><blockquote><p>newThread state:NEW</p></blockquote><h3 id="runnable" tabindex="-1"><a class="header-anchor" href="#runnable" aria-hidden="true">#</a> Runnable</h3><p>在操作系统中，线程的就绪和运行是两种不同的状态。在Java中，这两种状态都被统称为RUNNABLE。</p><ol><li>当线程调用<code>start()</code>方法时，新建状态的线程会转换为就绪状态。</li><li>当线程调用<code>sleep(long)</code>方法并等待指定的时间到期后，等待状态的线程会转换为就绪状态。</li><li>当阻塞式IO操作的结果返回时，阻塞状态的线程会转换为就绪状态。这</li><li>当其他线程调用某个线程的<code>join()</code>方法，并且该线程执行完毕后，被等待的线程会转换为就绪状态。</li><li>当线程拥有对象的锁时，等待获取该锁的其他线程会转换为就绪状态。</li></ol><p>在Java中，线程状态会受到操作系统的调度和资源限制。一旦线程处于就绪状态，它可以被操作系统调度为运行状态。然而，并非所有就绪状态的线程都会立即获得CPU时间片。</p><p>运行状态的线程则表示正在CPU上执行计算任务。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public static void main(String[] args) {
        Thread t=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
        t.start();
        System.out.println(&quot;newThread started, state=&quot;+t.getState());

    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上面的代码，运行的结果如下：</p><blockquote><p>Thread-0<br> newThread started, state=RUNNABLE</p></blockquote><h3 id="blocked" tabindex="-1"><a class="header-anchor" href="#blocked" aria-hidden="true">#</a> blocked</h3><p>阻塞状态（Blocked）：用于处理资源竞争情况下的线程等待，等待获取对象的锁以继续执行。</p><p>线程执行synchronized同步方法或者synchronized同步代码块时，如果没有获取到锁，将会被阻塞。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ThreadStateTest2 {

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
                System.out.println(&quot;thread state =&quot;+thread.getState());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，主线程启动子线程之后，立刻执行了同步代码块代码 ，获取了锁；而子线程的由于没有获取锁，处于阻塞状态。这时获取子线程的状态为BLOCKED状态，输出如下：</p><blockquote><p>thread state =BLOCKED<br> Thread-0</p></blockquote><h3 id="wait" tabindex="-1"><a class="header-anchor" href="#wait" aria-hidden="true">#</a> wait</h3><p>程在等待某个特定条件的发生，需要其他线程通过唤醒操作才能继续执行，用于线程间的异步通信和协作，等待某个条件的发生。</p><ul><li><p>线程执行了特定的等待操作（如<code>wait()</code>、<code>join()</code>等），使线程处于等待状态。</p></li><li><p>需要其他线程显式地调用相应的唤醒操作（如<code>notify()</code>、<code>notifyAll()</code>）才能将等待状态的线程转换为就绪状态。</p></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.concurrentlab.thread;

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
            System.out.println(&quot;thread state =&quot; + thread.getState());
            lock.notify();
        }

        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上面代码，输出如下：</p><blockquote><p>thread state =WAITING<br> Thread-0</p></blockquote><h2 id="两个线程交替打印奇数和偶数" tabindex="-1"><a class="header-anchor" href="#两个线程交替打印奇数和偶数" aria-hidden="true">#</a> 两个线程交替打印奇数和偶数</h2><p>&quot;两个线程交替打印奇数和偶数&quot;，这时一个非常常见的面试题：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.concurrentlab.thread;

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
                                System.out.println(Thread.currentThread().getName() + &quot; i=&quot; + i);
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
                                System.out.println(Thread.currentThread().getName() + &quot; i=&quot; + i);
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建了两个线程<code>t1</code>和<code>t2</code>，它们通过共享的锁对象<code>lock</code>来实现交替打印奇数和偶数。</p><p>具体来说，每个线程执行如下操作：</p><ol><li>进入一个无限循环，在循环内部使用<code>synchronized (lock)</code>来获取对共享锁对象<code>lock</code>的独占锁定。</li><li>判断当前的计数<code>i</code>是偶数还是奇数，根据结果决定是否等待或执行打印操作，并将<code>i</code>的值递增。</li><li>在打印完成后，调用<code>lock.notifyAll()</code>来唤醒其他因等待相同锁而处于暂停状态的线程，并释放锁。</li><li>然后线程继续循环执行以上步骤。</li></ol><p>这是考察线程同步的例子，通过共享锁对象的<code>wait()</code>与<code>notifyAll()</code>方法来协调两个线程的执行顺序。从而达到交替打印奇偶输的目的。</p>`,39),a=[s];function r(t,c){return i(),n("div",null,a)}const b=e(l,[["render",r],["__file","2023-12-11-thread-state.html.vue"]]);export{b as default};
