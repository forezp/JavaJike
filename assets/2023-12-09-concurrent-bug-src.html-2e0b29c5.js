import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as e,f as a}from"./app-0ddf373f.js";const l={},s=a(`<h2 id="为什么会有可见性、原子性、有序性的问题" tabindex="-1"><a class="header-anchor" href="#为什么会有可见性、原子性、有序性的问题" aria-hidden="true">#</a> 为什么会有可见性、原子性、有序性的问题</h2><p>再回答这个问题之前，我们先看看计算机系统的基本组成部分：CPU、内存和I/O 设备。</p><p>CPU（中央处理器）是计算机中的核心部件，负责执行指令、进行数学运算和控制数据流。CPU是整个计算机系统的&quot;大脑&quot;，决定了系统的性能和处理能力。</p><p>内存（RAM）是计算机用来临时存储数据和程序的地方，它与CPU之间通过总线进行通信。内存的大小直接影响系统的运行速度和能够同时执行的任务数量。</p><p>I/O 设备（输入/输出设备）包括磁盘、显示器、硬盘驱动器、网络适配器等。这些设备负责将数据从计算机系统的内存传输到外部世界，或者将外部数据传输到系统内存中。</p><p>CPU、内存、I/O 设备三者相互协作，但是它们之间有一个核心矛盾，就是这三者的处理速度差异非常大。</p><ul><li>CPU 可以在纳秒级别完成一条指令的处理，具有非常高的计算能力和响应速度。</li><li>内存的访问时间通常在纳秒数量级，比起 CPU 的处理速度，仍然是一个瓶颈。</li><li>许多 I/O 设备的响应时间（例如硬盘读取时间）可以达到毫秒甚至更长的时间，这与 CPU 和内存的速度相比慢了很多。</li></ul><p>为了充分利用CPU的高性能，最大程度地提高计算机系统的整体性能，会采取一些优化策略：</p><ol><li><p>CPU增加了缓存，以减轻与内存的速度差异。缓存能够存储经常使用的数据与指令，从而减少对内存的频繁访问，提高了CPU的工作效率。</p></li><li><p>操作系统增加了进程与线程，以分时复用CPU，从而平衡CPU与I/O设备的速度差异。操作系统能够合理地分配CPU资源，同时处理I/O设备的输入输出请求，充分利用CPU的处理能力。</p></li><li><p>编译程序优化指令执行次序，以更好地利用缓存。通过合理安排指令执行的顺序，可以减少缓存未命中的次数，提高程序的运行效率。</p></li></ol><p>虽然这些改进使得大多数程序能够在现代计算机系统上获得较好的性能，但并发程序仍会面临一些挑战，需要特别注意并发编程中的可见性、原子性和有序性问题，以确保程序的正确性和稳定性。</p><h2 id="缓存导致的可见性问题" tabindex="-1"><a class="header-anchor" href="#缓存导致的可见性问题" aria-hidden="true">#</a> 缓存导致的可见性问题</h2><p>可见性（Visibility）：指的是当一个线程修改了共享变量的值时，其他线程能否立即看到这个修改。如果不同线程对同一变量的操作不是可见的，就可能导致数据不一致，从而引发Bug。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/9/image-20231209115348572.png" alt="image-20231209115348572" tabindex="0" loading="lazy"><figcaption>image-20231209115348572</figcaption></figure><p>举个可见性导致程序bug的例子。定义了一个静态整型变量a。在main方法中，创建了两个线程t1和t2，它们分别对变量a进行5000次自增操作。随后分别启动这两个线程，然后使用join()方法等待它们执行结束。最后输出变量a的值。代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.concurrentlab.basic;

public class IPlusDemo {

    static int a;

    public static void main(String[] args) throws InterruptedException {

        Thread t1=new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i &lt; 5000; i++) {
                    a++;
                }
            }
        });
        Thread t2=new Thread(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i &lt; 5000; i++) {
                    a++;
                }
            }
        });
        t1.start();
        t2.start();
        t1.join();  //主线程阻塞，直到t1执行完
        t2.join(); //主线程阻塞，直到t2执行完
        System.out.println(&quot;a=&quot;+a);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们没有搞清楚并发编程的原理，直觉会告诉我们程序的执行结果是10000。运行程序，程序输出：</p><blockquote><p>a=7128</p></blockquote><p>为什么我们的预期和程序时机的输出会有差异呢，这是因为t1和t2线程共同对变量a进行自增操作，存在并发访问的情况。这样做可能导致竞态条件（Race Condition）的发生，即多个线程并发访问共享的资源（此处是变量a），从而导致程序的输出不确定。</p><p>在这个特定的例子中，由于a++操作实际上包含了读取a的当前值、增加1和写回a的新值这三个步骤，两个线程同时执行这个操作可能会产生不确定的结果，因为线程之间的执行顺序不确定，线程对共享变量的操作是不可见的。这就是缓存可见性的问题。</p><h2 id="线程切换带来的原子问题" tabindex="-1"><a class="header-anchor" href="#线程切换带来的原子问题" aria-hidden="true">#</a> 线程切换带来的原子问题</h2><p>线程切换是指操作系统在多任务环境下，将当前正在执行的线程暂停下来，然后将另一个处于就绪状态的线程恢复执行的过程。在多核处理器系统中，线程切换还可能涉及将线程从一个处理器核心迁移到另一个核心。线程切换的目的是实现多任务并发执行，让多个任务看上去同时在运行，从而充分利用系统资源并提高系统的整体吞吐量。</p><p>线程切换的过程可能包括保存当前线程的上下文信息（如寄存器状态、程序计数器等）、恢复另一个线程的上下文信息、更新调度相关的数据结构等操作。这些操作需要消耗一定的系统资源，因此过多的线程切换可能导致系统性能下降。因此，在编写并发程序时，需要注意尽量减少不必要的线程切换，从而提高系统的效率。</p><p><strong>线程切换也可能带来原子性问题。</strong></p><p>原子性（Atomicity）：指的是对共享变量的操作是不可分割的，要么全部执行成功，要么全部不执行。如果一个操作不是原子的，那么在多线程环境下就可能发生竞态条件，导致数据错误。</p><p>在高级语言中，一条简单的语句可能会被编译成多条底层的CPU指令来执行。例如，对于语句a += 1，在底层执行时至少会包括三个步骤：</p><ul><li>首先，需要将变量count从内存加载到CPU的寄存器；</li><li>然后，在寄存器中执行加1的操作；</li><li>最后，将结果写回到内存（可能通过CPU缓存而不是直接写入内存）。</li></ul><p>如下图所示，当我们在多线程环境下对共享变量a进行a+=1操作时，有可能发生线程切换：</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/9/image-20231209160829989.png" alt="image-20231209160829989" tabindex="0" loading="lazy"><figcaption>image-20231209160829989</figcaption></figure><p>两个线程分别对共享变量进行a+=1操作，我们期望的最终a的结果是2，但发生上图线程切换的时候，最终的结果是1。这就是线程切换带来的原子性的问题。</p><p>在并发编程中，**CPU能够保证的原子操作是CPU指令级别的，而不是高级语言中的操作符。**这意味着在多核CPU上，即使某个操作在高级语言层面看起来是单个操作，底层实际上可能会被拆分成多条指令，在多线程并发执行时可能会发生竞态条件等问题。</p><h2 id="编译优化带来的有序性问题" tabindex="-1"><a class="header-anchor" href="#编译优化带来的有序性问题" aria-hidden="true">#</a> 编译优化带来的有序性问题</h2><p>有序性指的是程序按照代码的先后顺序执行。然而，编译器为了优化性能，有时会重新排列代码中语句的执行顺序。例如，程序中的&quot;a=1; b=2;&quot;在编译优化后可能会变成&quot;b=2; a=1;&quot;，尽管语句的顺序发生变化，但最终结果并不受影响。然而，编译器和解释器的优化有时可能会导致意想不到的错误。</p><p>例如，在之前的设计模式的单例模式中，双重检查的单例模式，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class LazyInstance {

    private static volatile LazyInstance instance;

    private LazyInstance() {
    }

    public static LazyInstance getInstance() {
        if (instance == null) {
            synchronized (LazyInstance.class) {
                if (instance == null) {
                    instance = new LazyInstance();
                }
            }
        }
        return instance;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中，为什么要使用volatile关键字来修饰静态的instance对象呢？</p><p>这是因为防止编译器进行编译优化，从而导致程序的有序性问题。</p><p>在java中创建一个对象，需要如下几步，伪代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>memory=allocate(); //1：分配内存空间
ctorInstance();   //2:初始化对象
singleton=memory; //3:设置singleton指向刚分配的内存空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当线程1在执行上面伪代码时，2和3可能会发生重排序，因为重排序并不影响运行结果，还可以提升性能，所以JVM是允许的。如果此时伪代码发生重排序，步骤变为1-&gt;3-&gt;2，线程1执行到第3步时，线程2调用<code>getsingleton</code>方法，在判断<code>singleton==null</code>时不为<code>null</code>，则返回<code>singleton</code>。但此时<code>singleton</code>并还没初始化完毕，线程2访问的将是个还没初始化完毕的对象。这时程序会出错！</p><p>当声明对象的引用为volatile后，伪代码的2、3的重排序在多线程中将被禁止!</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>要写出高质量的并发程序，首先需要深刻理解并发程序可能出现的问题，并有针对性地解决这些问题。只有明确了问题的本质，才能够找到解决方案。</p><p>并发编程中经常出现的令人难以理解的问题，实际上都源于对<strong>可见性、原子性和有序性</strong>的理解出现偏差。只有理解这些原则在并发场景下的应用，才能够理解并诊断许多并发 Bug。</p>`,43),d=[s];function t(c,r){return n(),e("div",null,d)}const o=i(l,[["render",t],["__file","2023-12-09-concurrent-bug-src.html.vue"]]);export{o as default};
