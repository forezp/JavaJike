import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as d,c as s,a as e,b as i,d as r,f as t}from"./app-cde7bdd1.js";const v={},c=t(`<p>在并发编程中，可见性、原子性和有序性的问题常常让我们感到困惑，因为这些问题容易成为 Bug 的源头。早在诞生之初，Java就在多线程方面处于领先地位，并提供了针对这些问题的技术方案。</p><p>今天先聊聊Java如何解决多线程下解决可见性和有序性问题。在此之前，先聊聊Java内存模型。</p><h2 id="java内存模型" tabindex="-1"><a class="header-anchor" href="#java内存模型" aria-hidden="true">#</a> Java内存模型</h2><p>随着计算机CPU运算能力的迅速增长，CPU已经远远超越了主内存读取数据的速度。为了解决这个问题，CPU厂商引入了高速缓存，使得CPU能够直接从高速缓存中读取数据，从而达到更高的性能。然而，在多核CPU中，每个处理器都有自己的缓存，这引发了数据一致性的问题。为了确保多核处理器的数据一致性，需要引入多处理器数据一致性协议，例如MOSI、Synapse、Firely、DragonProtocol等。这些协议帮助确保处理器之间的数据一致性，以避免出现意外的错误和不一致的状态。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/9/2279594-98d10d5cb7acf7a1.png" alt="JMM内存模型.png" tabindex="0" loading="lazy"><figcaption>JMM内存模型.png</figcaption></figure><p>在JVM执行多线程任务时，共享数据存储在主内存中，而每个线程（在不同的处理器上执行）都拥有自己的高速缓存。当线程对共享数据进行修改时，首先会将数据从主内存复制到线程的高速缓存中，进行修改操作后再将结果从高速缓存复制回主内存。然而，当多个线程同时进行这样的操作时，可能会导致共享数据出现意外的错误。</p><p>举个例子，比如执行i++操作，线程首先从主内存读取i的值，比如i=0，然后复制到自己的高速缓存区，进行i++操作，最后将结果再次从高速缓存区复制回主内存。如果有两个线程同时对i进行i++操作，预期的结果应该是2。然而实际上可能并非如此。线程1读取主内存的i=0后，线程2也读取i=0进行i++操作，最终导致结果为1而不是2。</p><p>为了解决缓存不一致的问题，有两种解决方案：</p><ol><li>在总线上加锁，即只允许一个线程执行对共享数据的操作（包括读取和修改）。</li><li>使用缓存一致性协议，如Intel的MESI协议。该协议的核心思想是，当某个处理器写入变量数据时，如果其他处理器也包含该变量，会发出信号通知其他处理器将高速缓存中的该数据设置为无效状态。这样其他处理器在需要读取该变量时，会重新从主内存中读取，然后再次复制到高速缓存区。</li></ol><p>这样就可以确保多线程在共享数据时不会出现意外的错误。</p><h2 id="编发编程的概念" tabindex="-1"><a class="header-anchor" href="#编发编程的概念" aria-hidden="true">#</a> 编发编程的概念</h2><p>再简单回顾一些上一篇文章讲解的并发编程的有三个概念，包括原子性、可见性、有序性。</p><h3 id="原子性" tabindex="-1"><a class="header-anchor" href="#原子性" aria-hidden="true">#</a> 原子性</h3><p>原子性是指，操作为原子性的，要么成功，要么失败，不存在第三种情况。比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String s=&quot;abc&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个复杂操作是原子性的。再比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int i=0;
i++;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>i=0这是一个赋值操作，这一步是原子性操作；那么i++是原子性操作吗？当然不是，首先它需要读取i=0，然后需要执行运算，写入i的新值1，它包含了读取和写入两个步骤，所以不是原子性操作。</p><h3 id="可见性" tabindex="-1"><a class="header-anchor" href="#可见性" aria-hidden="true">#</a> 可见性</h3><p>可见性是指共享数据的时候，一个线程修改了数据，其他线程知道数据被修改，会重新读取最新的主存的数据。 举个例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>i=0;//主内存

i++;//线程1

j=i;//线程2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>线程1修改了i值，但是没有将i值复制到主内存中，线程2读取i的值，并将i的值赋值给j,我们期望j=1,但是由于线程1修改了，没有来得及复制到主内存中，线程2读取了i,并赋值给j，这时j的值为0。 也就是线程i值被修改，其他线程并不知道。</p><h3 id="有序性" tabindex="-1"><a class="header-anchor" href="#有序性" aria-hidden="true">#</a> 有序性</h3><p>是指代码执行的有序性，因为代码有可能发生指令重排序（Instruction Reorder）。</p><p>Java 语言提供了 volatile 和 synchronized 两个关键字来线程代码操作的有序性，volatile 是因为其本身包含“禁止指令重排序”的语义，synchronized 在单线程中执行代码，无论指令是否重排，最终的执行结果是一致的。</p><h2 id="volatile详解" tabindex="-1"><a class="header-anchor" href="#volatile详解" aria-hidden="true">#</a> volatile详解</h2><h3 id="volatile关键字作用" tabindex="-1"><a class="header-anchor" href="#volatile关键字作用" aria-hidden="true">#</a> volatile关键字作用</h3><p>被volatile关键字修饰变量，起到了2个作用：</p><blockquote><p>1.某个线程修改了被volatile关键字修饰变量是，根据数据一致性的协议，通过信号量，更改其他线程的高速缓存中volatile关键字修饰变量状态为无效状态，其他线程如果需要重写读取该变量会再次从主内存中读取，而不是读取自己的高速缓存中的。</p><p>2.被volatile关键字修饰变量不会指令重排序。</p></blockquote><h3 id="volatile能够保证可见性和防止指令重排" tabindex="-1"><a class="header-anchor" href="#volatile能够保证可见性和防止指令重排" aria-hidden="true">#</a> volatile能够保证可见性和防止指令重排</h3><p>在Java并发编程实战一书中有这样</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class NoVisibility {
    private static boolean ready;
    private static int a;

    public static void main(String[] args) throws InterruptedException {
        new ReadThread().start();
        Thread.sleep(100);
        a = 32;
        ready = true;
      

    }

    private static class ReadThread extends Thread {
        @Override
        public void run() {
            while (!ready) {
                Thread.yield();
            }
            System.out.println(a);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述代码中，有可能（概率非常小，但是有这种可能性）永远不会打印a的值，因为线程ReadThread读取了主内存的ready为false,主线程虽然更新了ready，但是ReadThread的高速缓存中并没有更新。 另外：</p><blockquote><p>a = 32;</p><p>ready = true;</p></blockquote><p>这两行代码有可能发生指令重排。也就是可以打印出a的值为0。</p><p>如果在变量加上volatile关键字，可以防止上述两种不正常的情况的发生。</p><h3 id="volatile不能保证原子性" tabindex="-1"><a class="header-anchor" href="#volatile不能保证原子性" aria-hidden="true">#</a> volatile不能保证原子性</h3><p>首先用一段代码测试下，开起了10个线程，这10个线程共享一个变量inc（被volatile修饰），并在每个线程循环1000次对inc进行inc++操作。我们预期的结果是10000.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class VolatileTest {


    public volatile int inc = 0;

    public void increase() {
        inc++;
    }

    public static void main(String[] args) throws InterruptedException {
        final VolatileTest test = new VolatileTest();
        for (int i = 0; i &lt; 10; i++) {
            new Thread(() -&gt; {
                for (int j = 0; j &lt; 1000; j++)
                    test.increase();
            }).start();
        }
        //保证前面的线程都执行完
        Thread.sleep(3000);
        System.out.println(test.inc);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多次运行main函数，你会发现结果永远都不会为10000，都是小于10000。可能有这样的疑问，volatile保证了共享数据的可见性，线程1修改了inc变量线程2会重新从主内存中重新读，这样就能保证inc++的正确性了啊，可为什么没有得到我们预期的结果呢？</p><p>在之前已经讲述过inc++这样的操作不是一个原子性操作，它分为读、加加、写。一种情况，当线程1读取了inc的值，还没有修改，线程2也读取了，线程1修改完了，通知线程2将线程的缓存的 inc的值无效需要重读，可这时它不需要读取inc ，它仍执行写操作，然后赋值给主线程，这时数据就会出现问题。</p><p>所以volatile不能保证原子性 。这时需要用锁来保证,在increase方法加上synchronized，重新运行打印的结果为10000 。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public synchronized void increase() {
        inc++;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="volatile的使用场景" tabindex="-1"><a class="header-anchor" href="#volatile的使用场景" aria-hidden="true">#</a> volatile的使用场景</h3><h4 id="状态标记" tabindex="-1"><a class="header-anchor" href="#状态标记" aria-hidden="true">#</a> 状态标记</h4><p>volatile最常见的使用场景是状态标记，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private volatile boolean asheep ;

//线程1
 
while(!asleep){
    countSheep();
}

//线程2
asheep=true;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="防止指令重排" tabindex="-1"><a class="header-anchor" href="#防止指令重排" aria-hidden="true">#</a> 防止指令重排</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>volatile boolean inited = false;
//线程1:
context = loadContext();  
inited = true;  
//上面两行代码如果不用volatile修饰，可能会发生指令重排，导致报错
 
//线程2:
while(!inited ){
sleep()
}
doSomethingwithconfig(context);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="happens-before-规则" tabindex="-1"><a class="header-anchor" href="#happens-before-规则" aria-hidden="true">#</a> Happens-Before 规则</h2><p>“Happens-Before” 是 Java 内存模型中定义的一个重要概念，用于描述多线程环境中内存操作的顺序和可见性。在多线程编程中，Happens-Before 规则的关键在于确保并发操作的顺序性和可见性。同时，Happens-Before 约束了编译器的优化行为，虽允许编译器优化，但是要求编译器优化后一定遵守 Happens-Before 规则。</p><p>具体来说，Happens-Before 规则规定了以下几种情况，需要程序员重点掌握：</p><ol><li><p>程序次序规则：一个线程内的每一个操作，Happens-Before 于该线程内的后续操作。</p></li><li><p>监视器锁规则：对一个锁的解锁操作，Happens-Before 于随后对这个锁的加锁操作。</p></li><li><p>volatile 变量规则：对一个 volatile 变量的写操作，Happens-Before 于随后对这个变量的读操作。</p></li><li><p>传递性：如果 A Happens-Before B，且 B Happens-Before C，则 A Happens-Before C。</p></li></ol><p>除了之前提到的基本规则之外，Happens-Before 还涉及到一些具体的应用场景和含义：</p><ol><li><p>线程启动规则：一个线程 A 启动另一个线程 B，A 线程启动操作的 Happens-Before 关系于 B 线程的任意操作。</p></li><li><p>线程中断规则：对线程 interrupt() 方法的调用 Happens-Before 于被中断线程中的任意操作。</p></li><li><p>终结器规则：对象的构造函数执行 Happens-Before 于该对象的 finalize() 方法。</p></li><li><p>线程终结规则：所有的线程中的操作 Happens-Before 于该线程的终结。</p></li></ol><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2><p>《Java 并发编程实战》</p><p>《深入理解JVM》</p>`,58),o={href:"http://www.cnblogs.com/dolphin0520/p/3920373.html",target:"_blank",rel:"noopener noreferrer"};function p(u,b){const n=l("ExternalLinkIcon");return d(),s("div",null,[c,e("p",null,[i("海子的博客："),e("a",o,[i("http://www.cnblogs.com/dolphin0520/p/3920373.html"),r(n)])])])}const x=a(v,[["render",p],["__file","2023-12-09-volatile.html.vue"]]);export{x as default};
