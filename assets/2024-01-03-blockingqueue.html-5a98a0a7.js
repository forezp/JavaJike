import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as i,c as l,a as n,b as t,d as c,f as d}from"./app-d113c270.js";const u={},o=d(`<p>google-site-verification=5Sx1Ko4M39zIL01OlNc4To63Vx0yoNQ5AnFtinbe278</p><h2 id="什么是blockingqueue" tabindex="-1"><a class="header-anchor" href="#什么是blockingqueue" aria-hidden="true">#</a> 什么是BlockingQueue</h2><p><code>BlockingQueue</code> 是 Java 并发包中的一个接口，它是一种特殊的队列。该队列支持在队列已满或为空时的阻塞操作。<code>BlockingQueue</code>允许线程安全地进行队列操作，并提供了一种有效的方式来进行线程间的数据交换。</p><p>以下是 <code>BlockingQueue</code> 的一些关键特点：</p><ol><li><p><strong>阻塞操作：</strong> <code>BlockingQueue</code> 提供了一系列的阻塞队列操作，如 <code>put</code>（插入元素）、<code>take</code>（获取并移除队首元素）、<code>offer</code>（插入元素但不阻塞）、<code>poll</code>（获取并移除队首元素但不阻塞）等。这些操作能够在队列满或为空时进行阻塞，直到条件满足。</p></li><li><p><strong>线程安全：</strong> <code>BlockingQueue</code> 的实现通常是线程安全的，这意味着你可以在多个线程中安全地操作队列而无需额外的同步控制。</p></li><li><p><strong>数据交换：</strong> <code>BlockingQueue</code> 可以用来进行线程间的数据交换。例如，一个线程可以向队列提交任务，而另一个线程则可以从队列中获取任务并执行。</p></li></ol><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/3/java-thread-x-blocking-queue-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="blockingqueue接口定义" tabindex="-1"><a class="header-anchor" href="#blockingqueue接口定义" aria-hidden="true">#</a> BlockingQueue接口定义</h2><p><code>BlockingQueue</code>接口继承了<code>Queue</code>接口，在Queue接口基础上，又提供了其他方法，其源码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface BlockingQueue&lt;E&gt; extends Queue&lt;E&gt; {
    /**
     * 入队一个元素，如果有空间则直接插入，并返回true；
     * 如果没有空间则抛出IllegalStateException
     */
    boolean add(E e);

    /**
     * 入队一个元素，如果有空间则直接插入，并返回true；
     * 如果没有空间返回false
     */
    boolean offer(E e);

    /**
     * 入队一个元素，如果有空间则直接插入，如果没有空间则一直阻塞等待
     */
    void put(E e) throws InterruptedException;

    /**
     * 入队一个元素，如果有空间则直接插入，并返回true；
     * 如果没有空间则等待timeout时间，插入失败则返回false
     */
    boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException;

    /**
     * 出队一个元素，如果存在则直接出队，如果没有空间则一直阻塞等待
     */
    E take() throws InterruptedException;

    /**
     * 出队一个元素，如果存在则直接出队，如果没有空间则等待timeout时间，无元素则返回null
     */
    E poll(long timeout, TimeUnit unit) throws InterruptedException;

    /**
     * 返回该队列剩余的容量（如果没有限制则返回Integer.MAX_VALUE）
     */
    int remainingCapacity();

    /**
     * 如果元素o在队列中存在，则从队列中删除
     */
    boolean remove(Object o);

    /**
     * 判断队列中是否存在元素o
     */
    public boolean contains(Object o);

    /**
     * 将队列中的所有元素出队，并添加到给定的集合c中，返回出队的元素数量
     */
    int drainTo(Collection&lt;? super E&gt; c);

    /**
     * 将队列中的元素出队，限制数量maxElements个，并添加到给定的集合c中，返回出队的元素数量
     */
    int drainTo(Collection&lt;? super E&gt; c, int maxElements);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>BlockingQueue</code> 接口提供了一系列方法来支持队列的操作，包括入队、出队以及获取队首元素，这些方法可以通过不同的方式来处理队列已满或为空的情况，以满足不同的需求。</p><table><thead><tr><th>方法</th><th>抛出异常</th><th>返回特定值</th><th>阻塞</th><th>阻塞特定时间</th></tr></thead><tbody><tr><td>入队</td><td><code>add(e)</code></td><td><code>offer(e)</code></td><td><code>put(e)</code></td><td><code>offer(e, time, unit)</code></td></tr><tr><td>出队</td><td><code>remove()</code></td><td><code>poll()</code></td><td><code>take()</code></td><td><code>poll(time, unit)</code></td></tr><tr><td>获取队首元素</td><td><code>element()</code></td><td><code>peek()</code></td><td>不支持</td><td>不支持</td></tr></tbody></table><ul><li><p><strong>抛出异常：</strong> 通过 <code>add()</code>、<code>remove()</code>、<code>element()</code> 方法在队列已满或为空时会抛出异常。</p></li><li><p><strong>返回特定值：</strong> 通过 <code>offer()</code>、<code>poll()</code>、<code>peek()</code> 方法在队列已满或为空时会返回特定值。</p></li><li><p><strong>阻塞：</strong> 通过 <code>put()</code>、<code>take()</code> 方法在队列已满或为空时会阻塞当前线程，直到条件满足。</p></li><li><p><strong>阻塞特定时间：</strong> 通过 <code>offer(e, time, unit)</code>、<code>poll(time, unit)</code> 方法在队列已满或为空时会阻塞当前线程一段特定的时间，在给定的时间内等待条件的成立。</p></li></ul><h2 id="blockingqueue实现" tabindex="-1"><a class="header-anchor" href="#blockingqueue实现" aria-hidden="true">#</a> BlockingQueue实现</h2><p><code>BlockingQueue</code> 接口有多个实现类，下表列出了 <code>BlockingQueue</code> 的主要实现类及其功能：</p><table><thead><tr><th>实现类</th><th>功能</th></tr></thead><tbody><tr><td><code>ArrayBlockingQueue</code></td><td>基于数组的阻塞队列，需要指定长度，有界队列</td></tr><tr><td><code>LinkedBlockingQueue</code></td><td>基于链表的阻塞队列，默认为无界队列，也可以设置容量</td></tr><tr><td><code>SynchronousQueue</code></td><td>没有缓冲的队列，生产者产生的数据会立即被消费者获取</td></tr><tr><td><code>PriorityBlockingQueue</code></td><td>基于优先级的阻塞队列，元素按优先级顺序出队</td></tr><tr><td><code>DelayQueue</code></td><td>延迟队列，元素需要等待指定延迟时间后才能出队</td></tr></tbody></table><p>在日常开发中，最常用的是 <code>ArrayBlockingQueue</code> 和 <code>LinkedBlockingQueue</code>。下面简要介绍这两个实现类的原理：</p><p><strong><code>ArrayBlockingQueue</code>：</strong> 它基于数组实现，需要指定队列的长度，在队列已满时将会阻塞入队操作，直到队列有空间可用。在队列为空时，出队操作也会被阻塞，直到队列有元素可用。它是一个有界队列，适用于需要限制队列长度的场景。</p><p><strong><code>LinkedBlockingQueue</code>：</strong> 它基于链表实现，默认情况下是一个无界队列，也可以通过指定容量来创建有界队列。它的入队和出队操作都是阻塞的，当队列已满时进行入队操作将会阻塞，直到队列有空间可用。当队列为空时进行出队操作也会被阻塞，直到队列有元素可用。它适用于需要灵活增减队列长度的场景。</p><h2 id="arrayblockingqueue使用介绍" tabindex="-1"><a class="header-anchor" href="#arrayblockingqueue使用介绍" aria-hidden="true">#</a> ArrayBlockingQueue使用介绍</h2><p>下面是一个使用 <code>ArrayBlockingQueue</code> 的示例代码，展示了如何在生产者-消费者模式中使用 <code>ArrayBlockingQueue</code> 实现线程安全的数据传递。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">ArrayBlockingQueue</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProducerConsumerExample</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建一个最多存储3个元素的 ArrayBlockingQueue</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ArrayBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建一个生产者线程和一个消费者线程</span>
        <span class="token class-name">Thread</span> producerThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Producer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> consumerThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Consumer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 启动两个线程</span>
        producerThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        consumerThread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 将数据放入队列中</span>
                    queue<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;生产者生产数据：&quot;</span> <span class="token operator">+</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    count<span class="token operator">++</span><span class="token punctuation">;</span>
                    <span class="token comment">// 等待一段时间后继续生产数据</span>
                    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 从队列中取出数据</span>
                    <span class="token keyword">int</span> data <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;消费者消费数据：&quot;</span> <span class="token operator">+</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 等待一段时间后继续消费数据</span>
                    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述示例中，我们创建了一个 <code>ArrayBlockingQueue</code> 对象 <code>queue</code>，它的容量为3，即最多可以存储3个元素。</p><p>然后，我们创建了一个生产者线程和一个消费者线程，并启动这两个线程。</p><p>生产者线程持续生产数据，每次生产一个数并将其放入队列中，然后等待1秒钟后继续生产。消费者线程从队列中取出数据并进行消费，每次消费一个数，然后等待2秒钟后继续消费。</p><p>通过 <code>ArrayBlockingQueue</code> 的阻塞特性，当队列已满时，生产者线程将会被阻塞，直到队列有空间可用。当队列为空时，消费者线程将会被阻塞，直到队列有元素可用。</p><p>这样，通过 <code>ArrayBlockingQueue</code> 的线程安全和阻塞机制，生产者和消费者可以在多线程环境下安全地进行数据传递，实现了生产者-消费者模式的功能。</p><h2 id="arrayblockingqueue源码实现" tabindex="-1"><a class="header-anchor" href="#arrayblockingqueue源码实现" aria-hidden="true">#</a> ArrayBlockingQueue源码实现</h2><h3 id="类的继承关系" tabindex="-1"><a class="header-anchor" href="#类的继承关系" aria-hidden="true">#</a> 类的继承关系</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ArrayBlockingQueue&lt;E&gt; extends AbstractQueue&lt;E&gt;
        implements BlockingQueue&lt;E&gt;, java.io.Serializable {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到ArrayBlockingQueue继承了AbstractQueue抽象类，AbstractQueue定义了对队列的基本操作；同时实现了BlockingQueue接口，BlockingQueue表示阻塞型的队列，其对队列的操作可能会抛出异常；同时也实现了Searializable接口，表示可以被序列化。</p><h3 id="类的属性" tabindex="-1"><a class="header-anchor" href="#类的属性" aria-hidden="true">#</a> 类的属性</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ArrayBlockingQueue&lt;E&gt; extends AbstractQueue&lt;E&gt;
        implements BlockingQueue&lt;E&gt;, java.io.Serializable {
    // 版本序列号
    private static final long serialVersionUID = -817911632652898426L;
    // 存放实际元素的数组
    final Object[] items;
    // 取元素索引
    int takeIndex;
    // 获取元素索引
    int putIndex;
    // 队列中的项
    int count;
    // 可重入锁
    final ReentrantLock lock;
    // 等待获取条件
    private final Condition notEmpty;
    // 等待存放条件
    private final Condition notFull;
    // 迭代器
    transient Itrs itrs = null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从类的属性中可以清楚的看到其底层的结构是Object类型的数组，取元素和存元素有不同的索引，有一个可重入锁ReentrantLock，两个条件Condition。</p><h3 id="类的构造函数" tabindex="-1"><a class="header-anchor" href="#类的构造函数" aria-hidden="true">#</a> 类的构造函数</h3><p><strong>ArrayBlockingQueue(int)型构造函数</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public ArrayBlockingQueue(int capacity) {
        // 调用两个参数的构造函数
        this(capacity, false);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该构造函数用于创建一个带有给定的（固定）容量和默认访问策略的 ArrayBlockingQueue。</p><p><strong>ArrayBlockingQueue(int, boolean)型构造函数</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public ArrayBlockingQueue(int capacity, boolean fair) {
        // 初始容量必须大于0
        if (capacity &lt;= 0)
            throw new IllegalArgumentException();
        // 初始化数组
        this.items = new Object[capacity];
        // 初始化可重入锁
        lock = new ReentrantLock(fair);
        // 初始化等待条件
        notEmpty = lock.newCondition();
        notFull =  lock.newCondition();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该构造函数用于创建一个具有给定的（固定）容量和指定访问策略的 ArrayBlockingQueue。</p><p><strong>ArrayBlockingQueue(int, boolean, Collection&lt;? extends E&gt;)型构造函数</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public ArrayBlockingQueue(int capacity, boolean fair,
                              Collection&lt;? extends E&gt; c) {
        // 调用两个参数的构造函数
        this(capacity, fair);
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 上锁
        lock.lock(); // Lock only for visibility, not mutual exclusion
        try {
            int i = 0;
            try {
                for (E e : c) { // 遍历集合
                    // 检查元素是否为空
                    checkNotNull(e);
                    // 存入ArrayBlockingQueue中
                    items[i++] = e;
                }
            } catch (ArrayIndexOutOfBoundsException ex) { // 当初始化容量小于传入集合的大小时，会抛出异常
                throw new IllegalArgumentException();
            }
            // 元素数量
            count = i;
            // 初始化存元素的索引
            putIndex = (i == capacity) ? 0 : i;
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该构造函数用于创建一个具有给定的（固定）容量和指定访问策略的 ArrayBlockingQueue，它最初包含给定 collection 的元素，并以 collection 迭代器的遍历顺序添加元素。</p><h3 id="核心函数分析" tabindex="-1"><a class="header-anchor" href="#核心函数分析" aria-hidden="true">#</a> 核心函数分析</h3><h4 id="put函数" tabindex="-1"><a class="header-anchor" href="#put函数" aria-hidden="true">#</a> put函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public void put(E e) throws InterruptedException {
        checkNotNull(e);
        // 获取可重入锁
        final ReentrantLock lock = this.lock;
        // 如果当前线程未被中断，则获取锁
        lock.lockInterruptibly();
        try {
            while (count == items.length) // 判断元素是否已满
                // 若满，则等待
                notFull.await();
            // 入队列
            enqueue(e);
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>put函数用于存放元素，在当前线程被中断时会抛出异常，并且当队列已经满时，会阻塞一直等待。其中，put会调用enqueue函数，enqueue函数源码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private void enqueue(E x) {
        // assert lock.getHoldCount() == 1;
        // assert items[putIndex] == null;
        // 获取数组
        final Object[] items = this.items;
        // 将元素放入
        items[putIndex] = x;
        if (++putIndex == items.length) // 放入后存元素的索引等于数组长度（表示已满）
            // 重置存索引为0
            putIndex = 0;
        // 元素数量加1
        count++;
        // 唤醒在notEmpty条件上等待的线程
        notEmpty.signal();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>enqueue函数用于将元素存入底层Object数组中，并且会唤醒等待notEmpty条件的线程。</p><h4 id="offer函数" tabindex="-1"><a class="header-anchor" href="#offer函数" aria-hidden="true">#</a> offer函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public boolean offer(E e) {
        // 检查元素不能为空
        checkNotNull(e);
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            if (count == items.length) // 元素个数等于数组长度，则返回
                return false; 
            else { // 添加进数组
                enqueue(e);
                return true;
            }
        } finally {
            // 释放数组
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>offer函数也用于存放元素，在调用ArrayBlockingQueue的add方法时，会间接的调用到offer函数，offer函数添加元素不会抛出异常，当底层Object数组已满时，则返回false，否则，会调用enqueue函数，将元素存入底层Object数组。并唤醒等待notEmpty条件的线程。</p><h4 id="take函数" tabindex="-1"><a class="header-anchor" href="#take函数" aria-hidden="true">#</a> take函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public E take() throws InterruptedException {
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 如果当前线程未被中断，则获取锁，中断会抛出异常
        lock.lockInterruptibly();
        try {
            while (count == 0) // 元素数量为0，即Object数组为空
                // 则等待notEmpty条件
                notEmpty.await();
            // 出队列
            return dequeue();
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>take函数用于从ArrayBlockingQueue中获取一个元素，其与put函数相对应，在当前线程被中断时会抛出异常，并且当队列为空时，会阻塞一直等待。其中，take会调用dequeue函数，dequeue函数源码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> private E dequeue() {
        // assert lock.getHoldCount() == 1;
        // assert items[takeIndex] != null;
        final Object[] items = this.items;
        @SuppressWarnings(&quot;unchecked&quot;)
        // 取元素
        E x = (E) items[takeIndex];
        // 该索引的值赋值为null
        items[takeIndex] = null;
        // 取值索引等于数组长度
        if (++takeIndex == items.length)
            // 重新赋值取值索引
            takeIndex = 0;
        // 元素个数减1
        count--;
        if (itrs != null) 
            itrs.elementDequeued();
        // 唤醒在notFull条件上等待的线程
        notFull.signal();
        return x;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dequeue函数用于将取元素，并且会唤醒等待notFull条件的线程。</p><h4 id="poll函数" tabindex="-1"><a class="header-anchor" href="#poll函数" aria-hidden="true">#</a> poll函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public E poll() {
        // 重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            // 若元素个数为0则返回null，否则，调用dequeue，出队列
            return (count == 0) ? null : dequeue();
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>poll函数用于获取元素，其与offer函数相对应，不会抛出异常，当元素个数为0是，返回null，否则，调用dequeue函数，并唤醒等待notFull条件的线程。并返回。</p><h4 id="clear函数" tabindex="-1"><a class="header-anchor" href="#clear函数" aria-hidden="true">#</a> clear函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void clear() {
        // 数组
        final Object[] items = this.items;
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            // 保存元素个数
            int k = count;
            if (k &gt; 0) { // 元素个数大于0
                // 存数元素索引
                final int putIndex = this.putIndex;
                // 取元素索引
                int i = takeIndex;
                do {
                    // 赋值为null
                    items[i] = null;
                    if (++i == items.length) // 重新赋值i
                        i = 0;
                } while (i != putIndex);
                // 重新赋值取元素索引
                takeIndex = putIndex;
                // 元素个数为0
                count = 0;
                if (itrs != null)
                    itrs.queueIsEmpty();
                for (; k &gt; 0 &amp;&amp; lock.hasWaiters(notFull); k--) // 若有等待notFull条件的线程，则逐一唤醒
                    notFull.signal();
            }
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>clear函数用于清空ArrayBlockingQueue，并且会释放所有等待notFull条件的线程（存放元素的线程）。</p><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3>`,64),r={href:"https://www.cnblogs.com/leesf456/p/5533770.html",target:"_blank",rel:"noopener noreferrer"};function p(v,m){const e=a("ExternalLinkIcon");return i(),l("div",null,[o,n("p",null,[n("a",r,[t("https://www.cnblogs.com/leesf456/p/5533770.html"),c(e)])])])}const g=s(u,[["render",p],["__file","2024-01-03-blockingqueue.html.vue"]]);export{g as default};
