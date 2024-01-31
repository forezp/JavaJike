import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as a,c as r,a as e,b as n,d,f as v}from"./app-6a5063d0.js";const t={},c=v(`<h2 id="aqs简介" tabindex="-1"><a class="header-anchor" href="#aqs简介" aria-hidden="true">#</a> AQS简介</h2><p>AQS（AbstractQueuedSynchronizer）是一个用于构建锁和同步器的框架，它提供了一种基于FIFO等待队列的机制。AQS的设计使得开发者能够相对轻松地实现自定义的同步器，同时也为Java标准库中的诸如<code>ReentrantLock</code>、<code>Semaphore</code>、<code>ReentrantReadWriteLock</code>、<code>SynchronousQueue</code>、<code>FutureTask</code>等同步器提供了基础支持。</p><h2 id="aqs核心思想" tabindex="-1"><a class="header-anchor" href="#aqs核心思想" aria-hidden="true">#</a> AQS核心思想</h2><p>AQS（AbstractQueuedSynchronizer）的核心思想是基于一个先进先出（FIFO）的等待队列来管理线程的争用，并通过内置的状态变量和原子操作来实现对共享资源的安全访问和控制。</p><p>等待队列：AQS 使用一个先进先出的等待队列来管理等待获取同步器的线程。当某个线程无法获取到同步器时（如锁已被其他线程持有），它会被放入等待队列中，直到它能够获得同步器或者被中断。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/17/image-20231217171236598.png" alt="image-20231217171236598" tabindex="0" loading="lazy"><figcaption>image-20231217171236598</figcaption></figure><p>内置状态变量：AQS 内部维护了一个状态变量，用于表示同步器的状态。这个状态可以是自定义的，根据具体需求来决定如何利用这个状态来控制并发访问。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private volatile int state;//共享变量，使用volatile修饰保证线程可见性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>状态信息通过procted类型的getState，setState，compareAndSetState进行操作:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//返回同步状态的当前值
protected final int getState() {  
        return state;
}
 // 设置同步状态的值
protected final void setState(int newState) { 
        state = newState;
}
//原子地(CAS操作)将同步状态值设置为给定值update如果当前同步状态的值等于expect(期望值)
protected final boolean compareAndSetState(int expect, int update) {
        return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/17/image-20231217172210727.jpeg" alt="image-20231217172210727" tabindex="0" loading="lazy"><figcaption>image-20231217172210727</figcaption></figure><p>状态变迁与线程调度：AQS 负责管理线程的状态变迁，从而实现线程的调度和协作。当一个线程释放同步器时，AQS 会从等待队列中选取一个线程唤醒，使其进入就绪状态，然后与其他就绪状态的线程竞争执行权。</p><h2 id="aqs-对资源的共享方式" tabindex="-1"><a class="header-anchor" href="#aqs-对资源的共享方式" aria-hidden="true">#</a> AQS 对资源的共享方式</h2><p>AQS定义两种资源共享方式</p><ul><li>Exclusive(独占)：只有一个线程能执行，如ReentrantLock。又可分为公平锁和非公平锁： <ul><li>公平锁：按照线程在队列中的排队顺序，先到者先拿到锁</li><li>非公平锁：当线程要获取锁时，无视队列顺序直接去抢锁，谁抢到就是谁的</li></ul></li><li>Share(共享)：多个线程可同时执行，如Semaphore/CountDownLatch。Semaphore、CountDownLatCh、 CyclicBarrier、ReadWriteLock 我们都会在后面讲到。</li></ul><p>ReentrantReadWriteLock 可以看成是组合式，因为ReentrantReadWriteLock也就是读写锁允许多个线程同时对某一资源进行读。</p><p>不同的自定义同步器争用共享资源的方式也不同。自定义同步器在实现时只需要实现共享资源 state 的获取与释放方式即可，至于具体线程等待队列的维护(如获取资源失败入队/唤醒出队等)，AQS已经在上层已经帮我们实现好了。</p><h2 id="aqs源码解析" tabindex="-1"><a class="header-anchor" href="#aqs源码解析" aria-hidden="true">#</a> AQS源码解析</h2><h3 id="类的继承关系" tabindex="-1"><a class="header-anchor" href="#类的继承关系" aria-hidden="true">#</a> 类的继承关系</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class AbstractQueuedSynchronizer
    extends AbstractOwnableSynchronizer
    implements java.io.Serializable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：从类继承关系可知，AbstractQueuedSynchronizer继承自AbstractOwnableSynchronizer抽象类，并且实现了Serializable接口，可以进行序列化。而AbstractOwnableSynchronizer抽象类的源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class AbstractOwnableSynchronizer
    implements java.io.Serializable {
    
    // 版本序列号
    private static final long serialVersionUID = 3737899427754241961L;
    // 构造函数
    protected AbstractOwnableSynchronizer() { }
    // 独占模式下的线程
    private transient Thread exclusiveOwnerThread;
    
    // 设置独占线程 
    protected final void setExclusiveOwnerThread(Thread thread) {
        exclusiveOwnerThread = thread;
    }
    
    // 获取独占线程 
    protected final Thread getExclusiveOwnerThread() {
        return exclusiveOwnerThread;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AbstractOwnableSynchronizer抽象类中，可以设置独占资源线程和获取独占资源线程。分别为setExclusiveOwnerThread与getExclusiveOwnerThread方法，这两个方法会被子类调用。</p><h3 id="类的内部类" tabindex="-1"><a class="header-anchor" href="#类的内部类" aria-hidden="true">#</a> 类的内部类</h3><p>AbstractQueuedSynchronizer类有两个内部类，分别为Node类与ConditionObject类。下面分别做介绍。</p><h4 id="node类" tabindex="-1"><a class="header-anchor" href="#node类" aria-hidden="true">#</a> Node类</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static final class Node {
        // 模式，分为共享与独占
        // 共享模式
        static final Node SHARED = new Node();
        // 独占模式
        static final Node EXCLUSIVE = null;        
        // 结点状态
        // CANCELLED，值为1，表示当前的线程被取消
        // SIGNAL，值为-1，表示当前节点的后继节点包含的线程需要运行，也就是unpark
        // CONDITION，值为-2，表示当前节点在等待condition，也就是在condition队列中
        // PROPAGATE，值为-3，表示当前场景下后续的acquireShared能够得以执行
        // 值为0，表示当前节点在sync队列中，等待着获取锁
        static final int CANCELLED =  1;
        static final int SIGNAL    = -1;
        static final int CONDITION = -2;
        static final int PROPAGATE = -3;        

        // 结点状态
        volatile int waitStatus;        
        // 前驱结点
        volatile Node prev;    
        // 后继结点
        volatile Node next;        
        // 结点所对应的线程
        volatile Thread thread;        
        // 下一个等待者
        Node nextWaiter;
        
        // 结点是否在共享模式下等待
        final boolean isShared() {
            return nextWaiter == SHARED;
        }
        
        // 获取前驱结点，若前驱结点为空，抛出异常
        final Node predecessor() throws NullPointerException {
            // 保存前驱结点
            Node p = prev; 
            if (p == null) // 前驱结点为空，抛出异常
                throw new NullPointerException();
            else // 前驱结点不为空，返回
                return p;
        }
        
        // 无参构造函数
        Node() {    // Used to establish initial head or SHARED marker
        }
        
        // 构造函数
         Node(Thread thread, Node mode) {    // Used by addWaiter
            this.nextWaiter = mode;
            this.thread = thread;
        }
        
        // 构造函数
        Node(Thread thread, int waitStatus) { // Used by Condition
            this.waitStatus = waitStatus;
            this.thread = thread;
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个线程被阻塞的线程都会被封装成一个Node结点，放入队列。每个节点包含了一个Thread类型的引用，并且每个节点都存在一个状态，具体状态如下。</p><ul><li>CANCELLED，值为1，表示当前的线程被取消。</li><li>SIGNAL，值为-1，表示当前节点的后继节点包含的线程需要运行，需要进行unpark操作。</li><li>CONDITION，值为-2，表示当前节点在等待condition，也就是在condition queue中。</li><li>PROPAGATE，值为-3，表示当前场景下后续的acquireShared能够得以执行。</li><li>值为0，表示当前节点在sync queue中，等待着获取锁。</li></ul><h4 id="conditionobject类" tabindex="-1"><a class="header-anchor" href="#conditionobject类" aria-hidden="true">#</a> ConditionObject类</h4><p>此类实现了Condition接口，Condition接口定义了条件操作规范，具体如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface Condition {

    // 等待，当前线程在接到信号或被中断之前一直处于等待状态
    void await() throws InterruptedException;
    
    // 等待，当前线程在接到信号之前一直处于等待状态，不响应中断
    void awaitUninterruptibly();
    
    //等待，当前线程在接到信号、被中断或到达指定等待时间之前一直处于等待状态 
    long awaitNanos(long nanosTimeout) throws InterruptedException;
    
    // 等待，当前线程在接到信号、被中断或到达指定等待时间之前一直处于等待状态。此方法在行为上等效于：awaitNanos(unit.toNanos(time)) &gt; 0
    boolean await(long time, TimeUnit unit) throws InterruptedException;
    
    // 等待，当前线程在接到信号、被中断或到达指定最后期限之前一直处于等待状态
    boolean awaitUntil(Date deadline) throws InterruptedException;
    
    // 唤醒一个等待线程。如果所有的线程都在等待此条件，则选择其中的一个唤醒。在从 await 返回之前，该线程必须重新获取锁。
    void signal();
    
    // 唤醒所有等待线程。如果所有的线程都在等待此条件，则唤醒所有线程。在从 await 返回之前，每个线程都必须重新获取锁。
    void signalAll();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Condition接口中定义了await、signal函数，用来等待条件、释放条件。之后会详细分析CondtionObject的源码。</p><h3 id="类的属性" tabindex="-1"><a class="header-anchor" href="#类的属性" aria-hidden="true">#</a> 类的属性</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class AbstractQueuedSynchronizer
    extends AbstractOwnableSynchronizer
    implements java.io.Serializable {    
    // 版本号
    private static final long serialVersionUID = 7373984972572414691L;    
    // 头结点
    private transient volatile Node head;    
    // 尾结点
    private transient volatile Node tail;    
    // 状态
    private volatile int state;    
    // 自旋时间
    static final long spinForTimeoutThreshold = 1000L;
    
    // Unsafe类实例
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    // state内存偏移地址
    private static final long stateOffset;
    // head内存偏移地址
    private static final long headOffset;
    // state内存偏移地址
    private static final long tailOffset;
    // tail内存偏移地址
    private static final long waitStatusOffset;
    // next内存偏移地址
    private static final long nextOffset;
    // 静态初始化块
    static {
        try {
            stateOffset = unsafe.objectFieldOffset
                (AbstractQueuedSynchronizer.class.getDeclaredField(&quot;state&quot;));
            headOffset = unsafe.objectFieldOffset
                (AbstractQueuedSynchronizer.class.getDeclaredField(&quot;head&quot;));
            tailOffset = unsafe.objectFieldOffset
                (AbstractQueuedSynchronizer.class.getDeclaredField(&quot;tail&quot;));
            waitStatusOffset = unsafe.objectFieldOffset
                (Node.class.getDeclaredField(&quot;waitStatus&quot;));
            nextOffset = unsafe.objectFieldOffset
                (Node.class.getDeclaredField(&quot;next&quot;));

        } catch (Exception ex) { throw new Error(ex); }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性中包含了头结点head，尾结点tail，状态state、自旋时间spinForTimeoutThreshold，还有AbstractQueuedSynchronizer抽象的属性在内存中的偏移地址，通过该偏移地址，可以获取和设置该属性的值，同时还包括一个静态初始化块，用于加载内存偏移地址。</p><h3 id="类的构造函数" tabindex="-1"><a class="header-anchor" href="#类的构造函数" aria-hidden="true">#</a> 类的构造函数</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>protected AbstractQueuedSynchronizer() { }    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此类构造函数为从抽象构造函数，供子类调用。</p><h3 id="类的核心函数" tabindex="-1"><a class="header-anchor" href="#类的核心函数" aria-hidden="true">#</a> 类的核心函数</h3><h4 id="acquire函数" tabindex="-1"><a class="header-anchor" href="#acquire函数" aria-hidden="true">#</a> acquire函数</h4><p>该函数以独占模式获取(资源)，忽略中断，即线程在aquire过程中，中断此线程是无效的。源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public final void acquire(int arg) {
    if (!tryAcquire(arg) &amp;&amp;
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
         　　selfInterrupt();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由上述源码可以知道，当一个线程调用acquire时，调用方法流程如下。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/17/616953-20160404112240734-653491814.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><ul><li>首先调用tryAcquire函数，调用此方法的线程会试图在独占模式下获取对象状态。此方法应该查询是否允许它在独占模式下获取对象状态，如果允许，则获取它。在AbstractQueuedSynchronizer源码中默认会抛出一个异常，即需要子类去重写此函数完成自己的逻辑。之后会进行分析。</li><li>若tryAcquire失败，则调用addWaiter函数，addWaiter函数完成的功能是将调用此方法的线程封装成为一个结点并放入Sync queue。</li><li>调用acquireQueued函数，此函数完成的功能是Sync queue中的结点不断尝试获取资源，若成功，则返回true，否则，返回false。</li><li>由于tryAcquire默认实现是抛出异常，所以此时，不进行分析，之后会结合一个例子进行分析。</li></ul><p>首先分析addWaiter函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 添加等待者
    private Node addWaiter(Node mode) {
        // 新生成一个结点，默认为独占模式
        Node node = new Node(Thread.currentThread(), mode);
        // Try the fast path of enq; backup to full enq on failure
        // 保存尾结点
        Node pred = tail;
        if (pred != null) { // 尾结点不为空，即已经被初始化
            // 将node结点的prev域连接到尾结点
            node.prev = pred; 
            if (compareAndSetTail(pred, node)) { // 比较pred是否为尾结点，是则将尾结点设置为node 
                // 设置尾结点的next域为node
                pred.next = node;
                return node; // 返回新生成的结点
            }
        }
        enq(node); // 尾结点为空(即还没有被初始化过)，或者是compareAndSetTail操作失败，则入队列
        return node;
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>addWaiter函数使用快速添加的方式往sync queue尾部添加结点，如果sync queue队列还没有初始化，则会使用enq插入队列中，enq方法源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 入队列
    private Node enq(final Node node) {
        for (;;) { // 无限循环，确保结点能够成功入队列
            // 保存尾结点
            Node t = tail;
            if (t == null) { // 尾结点为空，即还没被初始化
                if (compareAndSetHead(new Node())) // 头结点为空，并设置头结点为新生成的结点
                    tail = head; // 头结点与尾结点都指向同一个新生结点
            } else { // 尾结点不为空，即已经被初始化过
                // 将node结点的prev域连接到尾结点
                node.prev = t; 
                if (compareAndSetTail(t, node)) { // 比较结点t是否为尾结点，若是则将尾结点设置为node
                    // 设置尾结点的next域为node
                    t.next = node; 
                    return t; // 返回尾结点
                }
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>enq函数会使用无限循环来确保节点的成功插入。</p><p>现在，分析acquireQueue函数。其源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
// sync队列中的结点在独占且忽略中断的模式下获取(资源)
    final boolean acquireQueued(final Node node, int arg) {
        // 标志
        boolean failed = true;
        try {
            // 中断标志
            boolean interrupted = false;
            for (;;) { // 无限循环
                // 获取node节点的前驱结点
                final Node p = node.predecessor(); 
                if (p == head &amp;&amp; tryAcquire(arg)) { // 前驱为头结点并且成功获得锁
                    setHead(node); // 设置头结点
                    p.next = null; // help GC
                    failed = false; // 设置标志
                    return interrupted; 
                }
                if (shouldParkAfterFailedAcquire(p, node) &amp;&amp;
                    parkAndCheckInterrupt())
                    interrupted = true;
            }
        } finally {
            if (failed)
                cancelAcquire(node);
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先获取当前节点的前驱节点，如果前驱节点是头结点并且能够获取(资源)，代表该当前节点能够占有锁，设置头结点为当前节点，返回。否则，调用shouldParkAfterFailedAcquire和parkAndCheckInterrupt函数，首先，我们看shouldParkAfterFailedAcquire函数，代码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 当获取(资源)失败后，检查并且更新结点状态
    private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {
        // 获取前驱结点的状态
        int ws = pred.waitStatus;
        if (ws == Node.SIGNAL) // 状态为SIGNAL，为-1
            /*
             * This node has already set status asking a release
             * to signal it, so it can safely park.
             */
            // 可以进行park操作
            return true; 
        if (ws &gt; 0) { // 表示状态为CANCELLED，为1
            /*
             * Predecessor was cancelled. Skip over predecessors and
             * indicate retry.
             */
            do {
                node.prev = pred = pred.prev;
            } while (pred.waitStatus &gt; 0); // 找到pred结点前面最近的一个状态不为CANCELLED的结点
            // 赋值pred结点的next域
            pred.next = node; 
        } else { // 为PROPAGATE -3 或者是0 表示无状态,(为CONDITION -2时，表示此节点在condition queue中) 
            /*
             * waitStatus must be 0 or PROPAGATE.  Indicate that we
             * need a signal, but don&#39;t park yet.  Caller will need to
             * retry to make sure it cannot acquire before parking.
             */
            // 比较并设置前驱结点的状态为SIGNAL
            compareAndSetWaitStatus(pred, ws, Node.SIGNAL); 
        }
        // 不能进行park操作
        return false;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只有当该节点的前驱结点的状态为SIGNAL时，才可以对该结点所封装的线程进行park操作。否则，将不能进行park操作。再看parkAndCheckInterrupt函数，源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 进行park操作并且返回该线程是否被中断
    private final boolean parkAndCheckInterrupt() {
        // 在许可可用之前禁用当前线程，并且设置了blocker
        LockSupport.park(this);
        return Thread.interrupted(); // 当前线程是否已被中断，并清除中断标记位
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>parkAndCheckInterrupt函数里的逻辑是首先执行park操作，即禁用当前线程，然后返回该线程是否已经被中断。再看final块中的cancelAcquire函数，其源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 取消继续获取(资源)
    private void cancelAcquire(Node node) {
        // Ignore if node doesn&#39;t exist
        // node为空，返回
        if (node == null)
            return;
        // 设置node结点的thread为空
        node.thread = null;

        // Skip cancelled predecessors
        // 保存node的前驱结点
        Node pred = node.prev;
        while (pred.waitStatus &gt; 0) // 找到node前驱结点中第一个状态小于0的结点，即不为CANCELLED状态的结点
            node.prev = pred = pred.prev;

        // predNext is the apparent node to unsplice. CASes below will
        // fail if not, in which case, we lost race vs another cancel
        // or signal, so no further action is necessary.
        // 获取pred结点的下一个结点
        Node predNext = pred.next;

        // Can use unconditional write instead of CAS here.
        // After this atomic step, other Nodes can skip past us.
        // Before, we are free of interference from other threads.
        // 设置node结点的状态为CANCELLED
        node.waitStatus = Node.CANCELLED;

        // If we are the tail, remove ourselves.
        if (node == tail &amp;&amp; compareAndSetTail(node, pred)) { // node结点为尾结点，则设置尾结点为pred结点
            // 比较并设置pred结点的next节点为null
            compareAndSetNext(pred, predNext, null); 
        } else { // node结点不为尾结点，或者比较设置不成功
            // If successor needs signal, try to set pred&#39;s next-link
            // so it will get one. Otherwise wake it up to propagate.
            int ws;
            if (pred != head &amp;&amp;
                ((ws = pred.waitStatus) == Node.SIGNAL ||
                 (ws &lt;= 0 &amp;&amp; compareAndSetWaitStatus(pred, ws, Node.SIGNAL))) &amp;&amp;
                pred.thread != null) { // （pred结点不为头结点，并且pred结点的状态为SIGNAL）或者 
                                    // pred结点状态小于等于0，并且比较并设置等待状态为SIGNAL成功，并且pred结点所封装的线程不为空
                // 保存结点的后继
                Node next = node.next;
                if (next != null &amp;&amp; next.waitStatus &lt;= 0) // 后继不为空并且后继的状态小于等于0
                    compareAndSetNext(pred, predNext, next); // 比较并设置pred.next = next;
            } else {
                unparkSuccessor(node); // 释放node的前一个结点
            }

            node.next = node; // help GC
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数完成的功能就是取消当前线程对资源的获取，即设置该结点的状态为CANCELLED，接着我们再看unparkSuccessor函数，源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 释放后继结点
    private void unparkSuccessor(Node node) {
        /*
         * If status is negative (i.e., possibly needing signal) try
         * to clear in anticipation of signalling.  It is OK if this
         * fails or if status is changed by waiting thread.
         */
        // 获取node结点的等待状态
        int ws = node.waitStatus;
        if (ws &lt; 0) // 状态值小于0，为SIGNAL -1 或 CONDITION -2 或 PROPAGATE -3
            // 比较并且设置结点等待状态，设置为0
            compareAndSetWaitStatus(node, ws, 0);

        /*
         * Thread to unpark is held in successor, which is normally
         * just the next node.  But if cancelled or apparently null,
         * traverse backwards from tail to find the actual
         * non-cancelled successor.
         */
        // 获取node节点的下一个结点
        Node s = node.next;
        if (s == null || s.waitStatus &gt; 0) { // 下一个结点为空或者下一个节点的等待状态大于0，即为CANCELLED
            // s赋值为空
            s = null; 
            // 从尾结点开始从后往前开始遍历
            for (Node t = tail; t != null &amp;&amp; t != node; t = t.prev)
                if (t.waitStatus &lt;= 0) // 找到等待状态小于等于0的结点，找到最前的状态小于等于0的结点
                    // 保存结点
                    s = t;
        }
        if (s != null) // 该结点不为为空，释放许可
            LockSupport.unpark(s.thread);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数的作用就是为了释放node节点的后继结点。</p><p>对于cancelAcquire与unparkSuccessor函数，如下示意图可以清晰的表示。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/17/616953-20160406221022500-1247417874.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>其中node为参数，在执行完cancelAcquire函数后的效果就是unpark了s结点所包含的t4线程。</p><p>现在，再来看acquireQueued函数的整个的逻辑。逻辑如下</p><p>① 判断结点的前驱是否为head并且是否成功获取(资源)。</p><p>② 若步骤①均满足，则设置结点为head，之后会判断是否finally模块，然后返回。</p><p>③ 若步骤①不满足，则判断是否需要park当前线程，是否需要park当前线程的逻辑是判断结点的前驱结点的状态是否为SIGNAL，若是，则park当前结点，否则，不进行park操作。</p><p>④ 若park了当前线程，之后某个线程对本线程unpark后，并且本线程也获得机会运行。那么，将会继续进行步骤①的判断。</p><h4 id="release" tabindex="-1"><a class="header-anchor" href="#release" aria-hidden="true">#</a> release</h4><p>以独占模式释放对象，其源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public final boolean release(int arg) {
        if (tryRelease(arg)) { // 释放成功
            // 保存头结点
            Node h = head; 
            if (h != null &amp;&amp; h.waitStatus != 0) // 头结点不为空并且头结点状态不为0
                unparkSuccessor(h); //释放头结点的后继结点
            return true;
        }
        return false;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：其中，tryRelease的默认实现是抛出异常，需要具体的子类实现，如果tryRelease成功，那么如果头结点不为空并且头结点的状态不为0，则释放头结点的后继结点，unparkSuccessor函数已经分析过，不再累赘。</p><p>对于其他函数我们也可以分析，与前面分析的函数大同小异，所以，不再累赘。</p><h2 id="手写一个aqs" tabindex="-1"><a class="header-anchor" href="#手写一个aqs" aria-hidden="true">#</a> 手写一个AQS</h2><p>根据AQS的源码，我们手写一个简单的AQS，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.concurrentlab.aqs;

import sun.misc.Unsafe;

import java.lang.reflect.Field;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.locks.LockSupport;

public class AQS {

    //用来记录当前加锁状态，记录加锁次数，
    //值为0/1，为1时表示已经有一个线程持有了锁
    private volatile int state = 0;

    //表示当前只有锁的对象
    private Thread localHolder;

    //定义一个线程安全(底层是使用CAS算法保证线程安全的)的队列，用于保存此时没有获取到锁的线程
    private ConcurrentLinkedQueue&lt;Thread&gt; waiters = new ConcurrentLinkedQueue&lt;&gt;();


    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public Thread getLocalHolder() {
        return localHolder;
    }

    public void setLocalHolder(Thread localHolder) {
        this.localHolder = localHolder;
    }

    //尝试进行加锁的算法
    public boolean acquire() {
        //CAS比较与交换算法，保证任意时刻只有一个线程可以拿到
        //当前线程
        Thread current = Thread.currentThread();
        //获取到当前state初始值
        int c = getState();
        if (c == 0) { //目前锁还没有被持有
            //如果等待队列中没有进程（实现公平锁）或者当前线程是等待队列中第一个线程，并且此线程修改成功了(加锁成功)，则设置持有锁的线程为本线程;
            if ((waiters.size() == 0 || current == waiters.peek()) &amp;&amp; compareAndSwapState(0, 1)) {
                setLocalHolder(current);
                return true;
            }
        }
        return false;
    }

    //加锁
    public void lock(){
        //如果加锁成功
        if(acquire()){
            return;
        }
        //当前线程
        Thread current = Thread.currentThread();
        //没有获取成功，将线程放入等待队列中
        waiters.add(current);

        //如果没有加锁成功，则使此线程一直自旋在本方法
        for (;;){
            //让步出线程
            //1：Thread.yield();但是循环之后还是在占用cpu，不推荐
            //2：Thread.sleep(1000);不推荐，原因如下
            //（1）：设置时常大之后，其他线程已经释放锁，本线程还在睡眠，浪费时间
            //（2）：设置时常小之后，导致不停的睡眠启动线程，系统开销大
            //3：Thread.wait();不推荐，因为在唤醒线程的时候，无法准确指定唤醒那一个线程；
            //4：使用Unsafe类中的park()和unpark()方法，进行手动的释放和开启线程（此两种方法已经重写在了jdk的LockSupport类中）
            /*
                //jdk中的方法体
                public static void park(Object blocker) {
                    Thread t = Thread.currentThread();
                    setBlocker(t, blocker);
                    U.park(false, 0L);
                    setBlocker(t, (Object)null);
                }
             */

            //判断当前线程是否是第一个等待的线程（保证公平），如果是则继续循环获取锁，获取成功跳出循环
            if((current==waiters.peek()) &amp;&amp; acquire()){
                //第一个线程获取到锁之后，将它从等待队列中移除
                waiters.poll();
                return;
            }
            //阻塞当前线程（将此线程的所有数据放入内存中的运行时数据区）
            LockSupport.park(current);
        }

    }


    //解锁方法
    public void unLock(){
        //判断当前对象是不是之前拿到锁的对象
        if(Thread.currentThread()!=localHolder){
            throw new RuntimeException(&quot;LocalHolder is not current thread&quot;);
        }
        //将state和LocalHolder都置为空，表示当前锁空闲
        int state = getState();
        if(compareAndSwapState(state,0)){
            setLocalHolder(null);
            //当前锁空闲后，如果等待队列中有线程，则唤醒此线程
            Thread first = waiters.peek();
            if(first!=null){
                LockSupport.unpark(first);
            }
        }
    }
    /*
     * 原子操作。
     * @param except:目前值
     * @param update:要更新后的值
     */
    public final boolean compareAndSwapState(int except,int update){
        return unsafe.compareAndSwapInt(this,stateOffset,except,update);
    }

    //通过反射机制获取到Unsafe对象
    private static final Unsafe unsafe = UnsafeInstance.reflectGetUnsafe();

    //在内存的偏移量值，因为CAS种需要此参数
    private static long stateOffset;

    static {
        try {
            //找到state对象在内存中的偏移量
            stateOffset = unsafe.objectFieldOffset(AQS.class.getDeclaredField(&quot;state&quot;));
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
    }




    static class UnsafeInstance{
        //获取Unsafe对象
        public static Unsafe reflectGetUnsafe() {

            //通过反射机制获取到Unsafe类
            Field field = null;
            try {
                field = Unsafe.class.getDeclaredField(&quot;theUnsafe&quot;);
                field.setAccessible(true);
                return (Unsafe) field.get(null);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,79),u={href:"https://www.cnblogs.com/leesf456/p/5350186.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://pdai.tech/md/java/thread/java-thread-x-lock-AbstractQueuedSynchronizer.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://zhuanlan.zhihu.com/p/642177775",target:"_blank",rel:"noopener noreferrer"};function o(p,h){const i=l("ExternalLinkIcon");return a(),r("div",null,[c,e("ul",null,[e("li",null,[e("a",u,[n("https://www.cnblogs.com/leesf456/p/5350186.html"),d(i)])]),e("li",null,[e("a",m,[n("https://pdai.tech/md/java/thread/java-thread-x-lock-AbstractQueuedSynchronizer.html"),d(i)])]),e("li",null,[e("a",b,[n("https://zhuanlan.zhihu.com/p/642177775"),d(i)])])])])}const x=s(t,[["render",o],["__file","2023-12-17-aqs.html.vue"]]);export{x as default};
