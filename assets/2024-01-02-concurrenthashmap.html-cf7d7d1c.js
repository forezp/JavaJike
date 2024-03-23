import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as d,c as t,a as n,b as i,d as a,f as r}from"./app-6bf229cf.js";const v={},c=r(`<h2 id="concurrenthashmap介绍" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap介绍" aria-hidden="true">#</a> ConcurrentHashMap介绍</h2><p><code>ConcurrentHashMap</code> 是 Java 并发包中提供的一个线程安全的哈希表实现。它被设计用来在多线程环境下进行并发访问，并且可以在高并发情况下提供更好的性能表现。在Java7版本和Java8～21的实现非常不同</p><h3 id="java7-基于分段锁的concurrenthashmap" tabindex="-1"><a class="header-anchor" href="#java7-基于分段锁的concurrenthashmap" aria-hidden="true">#</a> Java7 基于分段锁的ConcurrentHashMap</h3><p>在Java 7中，ConcurrentHashMap实现了基于分段锁的并发访问机制。</p><p>Java 7中对ConcurrentHashMap进行了改进，引入了分段锁机制。</p><p>分段锁的基本思想是将整个数据结构分成多个段（Segment），每个段拥有自己的锁。这样一来，多个线程可以同时访问不同的段，从而提高并发性能。</p><p>具体实现上，ConcurrentHashMap中使用了一个Segment数组，每个Segment中维护一个HashEntry数组，其中每个HashEntry是一个键值对。每个Segment拥有自己的锁对象，当多个线程访问不同的段时，它们可以同时进行操作，互不影响。</p><p>通过使用分段锁，ConcurrentHashMap在Java 7中可以提供更高的并发性能，并且保持较低的锁竞争。这使得ConcurrentHashMap成为处理高并发情况下的线程安全哈希表的理想选择。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/2/3.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="java-8基于cas的concurrenthashmap" tabindex="-1"><a class="header-anchor" href="#java-8基于cas的concurrenthashmap" aria-hidden="true">#</a> Java 8基于CAS的ConcurrentHashMap</h3><p>在Java 8中，ConcurrentHashMap的实现发生了重大变化，它放弃了基于分段锁的实现，而是转而采用基于CAS（Compare and Swap）。</p><p>Java 8中的ConcurrentHashMap摒弃了分段锁，而是采用了一种全新的数据结构和算法，基于CAS操作来实现对并发更新的支持。</p><p>在Java 8中，ConcurrentHashMap使用了<code>Node</code>和<code>TreeNode</code>来表示哈希表中的节点，这些节点被组织成一个数组。在进行插入、删除和查找等操作时，ConcurrentHashMap使用CAS操作来保证线程安全。</p><p>基于CAS的算法能够在多线程并发修改共享数据时，通过硬件的原子性指令来实现线程安全的更新操作，而不需要使用传统的锁机制。这使得ConcurrentHashMap在高并发情况下拥有更好的性能表现，减少了锁竞争的影响。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/2/java-thread-x-concurrent-hashmap-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h2 id="concurrenthashmap使用示例" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap使用示例" aria-hidden="true">#</a> ConcurrentHashMap使用示例</h2><p>示例代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">ConcurrentHashMap</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConcurrentHashMapExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建 ConcurrentHashMap 实例</span>
        <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 插入元素</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 删除元素</span>
        map<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 查询元素</span>
        <span class="token keyword">int</span> valueA <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Value for key &#39;A&#39;: &quot;</span> <span class="token operator">+</span> valueA<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 遍历元素</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> key <span class="token operator">:</span> map<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> value <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Key: &quot;</span> <span class="token operator">+</span> key <span class="token operator">+</span> <span class="token string">&quot;, Value: &quot;</span> <span class="token operator">+</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Value for key &#39;A&#39;: 1
Key: A, Value: 1
Key: C, Value: 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="concurrenthashmap源码解析" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap源码解析" aria-hidden="true">#</a> ConcurrentHashMap源码解析</h2><p>基于java 1.8版本，1.8之后ConcurrentHashMap源码变化很小。</p><h3 id="类的继承关系" tabindex="-1"><a class="header-anchor" href="#类的继承关系" aria-hidden="true">#</a> 类的继承关系</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ConcurrentHashMap&lt;K,V&gt; extends AbstractMap&lt;K,V&gt;
    implements ConcurrentMap&lt;K,V&gt;, Serializable {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>ConcurrentHashMap继承了AbstractMap抽象类，该抽象类定义了一些基本操作，同时，也实现了ConcurrentMap接口，ConcurrentMap接口也定义了一系列操作，实现了Serializable接口表示ConcurrentHashMap可以被序列化。</p><h3 id="类的内部类" tabindex="-1"><a class="header-anchor" href="#类的内部类" aria-hidden="true">#</a> 类的内部类</h3><p>ConcurrentHashMap包含了很多内部类，其中主要的内部类框架图如下图所示</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/2/616953-20160503101445997-279727204.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/2/616953-20160503095818060-396367734.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>可以看到，ConcurrentHashMap的内部类非常的庞大，第二个图是在JDK1.8下增加的类，下面对其中主要的内部类进行分析和讲解。</p><h4 id="node类" tabindex="-1"><a class="header-anchor" href="#node类" aria-hidden="true">#</a> Node类</h4><p>Node类主要用于存储具体键值对，其子类有ForwardingNode、ReservationNode、TreeNode和TreeBin四个子类。四个子类具体的代码在之后的具体例子中进行分析讲解。</p><h4 id="traverser类" tabindex="-1"><a class="header-anchor" href="#traverser类" aria-hidden="true">#</a> Traverser类</h4><p>Traverser类主要用于遍历操作，其子类有BaseIterator、KeySpliterator、ValueSpliterator、EntrySpliterator四个类，BaseIterator用于遍历操作。KeySplitertor、ValueSpliterator、EntrySpliterator则用于键、值、键值对的划分。</p><h4 id="collectionview类" tabindex="-1"><a class="header-anchor" href="#collectionview类" aria-hidden="true">#</a> CollectionView类</h4><p>CollectionView抽象类主要定义了视图操作，其子类KeySetView、ValueSetView、EntrySetView分别表示键视图、值视图、键值对视图。对视图均可以进行操作。</p><h4 id="segment类" tabindex="-1"><a class="header-anchor" href="#segment类" aria-hidden="true">#</a> Segment类</h4><p>Segment类在JDK1.8中与之前的版本的JDK作用存在很大的差别，JDK1.8下，其在普通的ConcurrentHashMap操作中已经没有失效，其在序列化与反序列化的时候会发挥作用。</p><h4 id="countercell" tabindex="-1"><a class="header-anchor" href="#countercell" aria-hidden="true">#</a> CounterCell</h4><p>CounterCell类主要用于对baseCount的计数。</p><h3 id="类的属性" tabindex="-1"><a class="header-anchor" href="#类的属性" aria-hidden="true">#</a> 类的属性</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ConcurrentHashMap&lt;K,V&gt; extends AbstractMap&lt;K,V&gt;
    implements ConcurrentMap&lt;K,V&gt;, Serializable {
    private static final long serialVersionUID = 7249069246763182397L;
    // 表的最大容量
    private static final int MAXIMUM_CAPACITY = 1 &lt;&lt; 30;
    // 默认表的大小
    private static final int DEFAULT_CAPACITY = 16;
    // 最大数组大小
    static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
    // 默认并发数
    private static final int DEFAULT_CONCURRENCY_LEVEL = 16;
    // 装载因子
    private static final float LOAD_FACTOR = 0.75f;
    // 转化为红黑树的阈值
    static final int TREEIFY_THRESHOLD = 8;
    // 由红黑树转化为链表的阈值
    static final int UNTREEIFY_THRESHOLD = 6;
    // 转化为红黑树的表的最小容量
    static final int MIN_TREEIFY_CAPACITY = 64;
    // 每次进行转移的最小值
    private static final int MIN_TRANSFER_STRIDE = 16;
    // 生成sizeCtl所使用的bit位数
    private static int RESIZE_STAMP_BITS = 16;
    // 进行扩容所允许的最大线程数
    private static final int MAX_RESIZERS = (1 &lt;&lt; (32 - RESIZE_STAMP_BITS)) - 1;
    // 记录sizeCtl中的大小所需要进行的偏移位数
    private static final int RESIZE_STAMP_SHIFT = 32 - RESIZE_STAMP_BITS;    
    // 一系列的标识
    static final int MOVED     = -1; // hash for forwarding nodes
    static final int TREEBIN   = -2; // hash for roots of trees
    static final int RESERVED  = -3; // hash for transient reservations
    static final int HASH_BITS = 0x7fffffff; // usable bits of normal node hash
    // 
    /** Number of CPUS, to place bounds on some sizings */
    // 获取可用的CPU个数
    static final int NCPU = Runtime.getRuntime().availableProcessors();
    // 
    /** For serialization compatibility. */
    // 进行序列化的属性
    private static final ObjectStreamField[] serialPersistentFields = {
        new ObjectStreamField(&quot;segments&quot;, Segment[].class),
        new ObjectStreamField(&quot;segmentMask&quot;, Integer.TYPE),
        new ObjectStreamField(&quot;segmentShift&quot;, Integer.TYPE)
    };
    
    // 表
    transient volatile Node&lt;K,V&gt;[] table;
    // 下一个表
    private transient volatile Node&lt;K,V&gt;[] nextTable;
    //
    /**
     * Base counter value, used mainly when there is no contention,
     * but also as a fallback during table initialization
     * races. Updated via CAS.
     */
    // 基本计数
    private transient volatile long baseCount;
    //
    /**
     * Table initialization and resizing control.  When negative, the
     * table is being initialized or resized: -1 for initialization,
     * else -(1 + the number of active resizing threads).  Otherwise,
     * when table is null, holds the initial table size to use upon
     * creation, or 0 for default. After initialization, holds the
     * next element count value upon which to resize the table.
     */
    // 对表初始化和扩容控制
    private transient volatile int sizeCtl;
    
    /**
     * The next table index (plus one) to split while resizing.
     */
    // 扩容下另一个表的索引
    private transient volatile int transferIndex;

    /**
     * Spinlock (locked via CAS) used when resizing and/or creating CounterCells.
     */
    // 旋转锁
    private transient volatile int cellsBusy;

    /**
     * Table of counter cells. When non-null, size is a power of 2.
     */
    // counterCell表
    private transient volatile CounterCell[] counterCells;

    // views
    // 视图
    private transient KeySetView&lt;K,V&gt; keySet;
    private transient ValuesView&lt;K,V&gt; values;
    private transient EntrySetView&lt;K,V&gt; entrySet;
    
    // Unsafe mechanics
    private static final sun.misc.Unsafe U;
    private static final long SIZECTL;
    private static final long TRANSFERINDEX;
    private static final long BASECOUNT;
    private static final long CELLSBUSY;
    private static final long CELLVALUE;
    private static final long ABASE;
    private static final int ASHIFT;

    static {
        try {
            U = sun.misc.Unsafe.getUnsafe();
            Class&lt;?&gt; k = ConcurrentHashMap.class;
            SIZECTL = U.objectFieldOffset
                (k.getDeclaredField(&quot;sizeCtl&quot;));
            TRANSFERINDEX = U.objectFieldOffset
                (k.getDeclaredField(&quot;transferIndex&quot;));
            BASECOUNT = U.objectFieldOffset
                (k.getDeclaredField(&quot;baseCount&quot;));
            CELLSBUSY = U.objectFieldOffset
                (k.getDeclaredField(&quot;cellsBusy&quot;));
            Class&lt;?&gt; ck = CounterCell.class;
            CELLVALUE = U.objectFieldOffset
                (ck.getDeclaredField(&quot;value&quot;));
            Class&lt;?&gt; ak = Node[].class;
            ABASE = U.arrayBaseOffset(ak);
            int scale = U.arrayIndexScale(ak);
            if ((scale &amp; (scale - 1)) != 0)
                throw new Error(&quot;data type scale not a power of two&quot;);
            ASHIFT = 31 - Integer.numberOfLeadingZeros(scale);
        } catch (Exception e) {
            throw new Error(e);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ConcurrentHashMap的属性很多，其中不少属性在HashMap中就已经介绍过，而对于ConcurrentHashMap而言，添加了Unsafe实例，主要用于反射获取对象相应的字段。</p><h3 id="类的构造函数" tabindex="-1"><a class="header-anchor" href="#类的构造函数" aria-hidden="true">#</a> 类的构造函数</h3><p>ConcurrentHashMap()型构造函数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public ConcurrentHashMap() {
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="核心函数分析" tabindex="-1"><a class="header-anchor" href="#核心函数分析" aria-hidden="true">#</a> 核心函数分析</h3><h4 id="putval函数" tabindex="-1"><a class="header-anchor" href="#putval函数" aria-hidden="true">#</a> putVal函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> final V putVal(K key, V value, boolean onlyIfAbsent) {
        if (key == null || value == null) throw new NullPointerException(); // 键或值为空，抛出异常
        // 键的hash值经过计算获得hash值
        int hash = spread(key.hashCode());
        int binCount = 0;
        for (Node&lt;K,V&gt;[] tab = table;;) { // 无限循环
            Node&lt;K,V&gt; f; int n, i, fh;
            if (tab == null || (n = tab.length) == 0) // 表为空或者表的长度为0
                // 初始化表
                tab = initTable();
            else if ((f = tabAt(tab, i = (n - 1) &amp; hash)) == null) { // 表不为空并且表的长度大于0，并且该桶不为空
                if (casTabAt(tab, i, null,
                             new Node&lt;K,V&gt;(hash, key, value, null))) // 比较并且交换值，如tab的第i项为空则用新生成的node替换
                    break;                   // no lock when adding to empty bin
            }
            else if ((fh = f.hash) == MOVED) // 该结点的hash值为MOVED
                // 进行结点的转移（在扩容的过程中）
                tab = helpTransfer(tab, f);
            else {
                V oldVal = null;
                synchronized (f) { // 加锁同步
                    if (tabAt(tab, i) == f) { // 找到table表下标为i的节点
                        if (fh &gt;= 0) { // 该table表中该结点的hash值大于0
                            // binCount赋值为1
                            binCount = 1;
                            for (Node&lt;K,V&gt; e = f;; ++binCount) { // 无限循环
                                K ek;
                                if (e.hash == hash &amp;&amp;
                                    ((ek = e.key) == key ||
                                     (ek != null &amp;&amp; key.equals(ek)))) { // 结点的hash值相等并且key也相等
                                    // 保存该结点的val值
                                    oldVal = e.val;
                                    if (!onlyIfAbsent) // 进行判断
                                        // 将指定的value保存至结点，即进行了结点值的更新
                                        e.val = value;
                                    break;
                                }
                                // 保存当前结点
                                Node&lt;K,V&gt; pred = e;
                                if ((e = e.next) == null) { // 当前结点的下一个结点为空，即为最后一个结点
                                    // 新生一个结点并且赋值给next域
                                    pred.next = new Node&lt;K,V&gt;(hash, key,
                                                              value, null);
                                    // 退出循环
                                    break;
                                }
                            }
                        }
                        else if (f instanceof TreeBin) { // 结点为红黑树结点类型
                            Node&lt;K,V&gt; p;
                            // binCount赋值为2
                            binCount = 2;
                            if ((p = ((TreeBin&lt;K,V&gt;)f).putTreeVal(hash, key,
                                                           value)) != null) { // 将hash、key、value放入红黑树
                                // 保存结点的val
                                oldVal = p.val;
                                if (!onlyIfAbsent) // 判断
                                    // 赋值结点value值
                                    p.val = value;
                            }
                        }
                    }
                }
                if (binCount != 0) { // binCount不为0
                    if (binCount &gt;= TREEIFY_THRESHOLD) // 如果binCount大于等于转化为红黑树的阈值
                        // 进行转化
                        treeifyBin(tab, i);
                    if (oldVal != null) // 旧值不为空
                        // 返回旧值
                        return oldVal;
                    break;
                }
            }
        }
        // 增加binCount的数量
        addCount(1L, binCount);
        return null;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>put函数底层调用了putVal进行数据的插入，对于putVal函数的流程大体如下。</p><p>① 判断存储的key、value是否为空，若为空，则抛出异常，否则，进入步骤②</p><p>② 计算key的hash值，随后进入无限循环，该无限循环可以确保成功插入数据，若table表为空或者长度为0，则初始化table表，否则，进入步骤③</p><p>③ 根据key的hash值取出table表中的结点元素，若取出的结点为空（该桶为空），则使用CAS将key、value、hash值生成的结点放入桶中。否则，进入步骤④</p><p>④ 若该结点的的hash值为MOVED，则对该桶中的结点进行转移，否则，进入步骤⑤</p><p>⑤ 对桶中的第一个结点（即table表中的结点）进行加锁，对该桶进行遍历，桶中的结点的hash值与key值与给定的hash值和key值相等，则根据标识选择是否进行更新操作（用给定的value值替换该结点的value值），若遍历完桶仍没有找到hash值与key值和指定的hash值与key值相等的结点，则直接新生一个结点并赋值为之前最后一个结点的下一个结点。进入步骤⑥</p><p>⑥ 若binCount值达到红黑树转化的阈值，则将桶中的结构转化为红黑树存储，最后，增加binCount的值。</p><p>在putVal函数中会涉及到如下几个函数：initTable、tabAt、casTabAt、helpTransfer、putTreeVal、treeifyBin、addCount函数。下面对其中涉及到的函数进行分析。</p><p>其中 initTable函数源码如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private final Node&lt;K,V&gt;[] initTable() {
        Node&lt;K,V&gt;[] tab; int sc;
        while ((tab = table) == null || tab.length == 0) { // 无限循环
            if ((sc = sizeCtl) &lt; 0) // sizeCtl小于0，则进行线程让步等待
                Thread.yield(); // lost initialization race; just spin
            else if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) { // 比较sizeCtl的值与sc是否相等，相等则用-1替换
                try {
                    if ((tab = table) == null || tab.length == 0) { // table表为空或者大小为0
                        // sc的值是否大于0，若是，则n为sc，否则，n为默认初始容量
                        int n = (sc &gt; 0) ? sc : DEFAULT_CAPACITY;
                        @SuppressWarnings(&quot;unchecked&quot;)
                        // 新生结点数组
                        Node&lt;K,V&gt;[] nt = (Node&lt;K,V&gt;[])new Node&lt;?,?&gt;[n];
                        // 赋值给table
                        table = tab = nt;
                        // sc为n * 3/4
                        sc = n - (n &gt;&gt;&gt; 2);
                    }
                } finally {
                    // 设置sizeCtl的值
                    sizeCtl = sc;
                }
                break;
            }
        }
        // 返回table表
        return tab;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于table的大小，会根据sizeCtl的值进行设置，如果没有设置szieCtl的值，那么默认生成的table大小为16，否则，会根据sizeCtl的大小设置table大小。</p><p>tabAt函数源码如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static final &lt;K,V&gt; Node&lt;K,V&gt; tabAt(Node&lt;K,V&gt;[] tab, int i) {
        return (Node&lt;K,V&gt;)U.getObjectVolatile(tab, ((long)i &lt;&lt; ASHIFT) + ABASE);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数返回table数组中下标为i的结点，可以看到是通过Unsafe对象通过反射获取的，getObjectVolatile的第二项参数为下标为i的偏移地址。</p><p>casTabAt函数源码如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> static final &lt;K,V&gt; boolean casTabAt(Node&lt;K,V&gt;[] tab, int i,
                                        Node&lt;K,V&gt; c, Node&lt;K,V&gt; v) {
        return U.compareAndSwapObject(tab, ((long)i &lt;&lt; ASHIFT) + ABASE, c, v);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数用于比较table数组下标为i的结点是否为c，若为c，则用v交换操作。否则，不进行交换操作。</p><p>helpTransfer函数源码如下:</p><div class="language-final line-numbers-mode" data-ext="final"><pre class="language-final"><code>        Node&lt;K,V&gt;[] nextTab; int sc;
        if (tab != null &amp;&amp; (f instanceof ForwardingNode) &amp;&amp;
            (nextTab = ((ForwardingNode&lt;K,V&gt;)f).nextTable) != null) { // table表不为空并且结点类型使ForwardingNode类型，并且结点的nextTable不为空
            int rs = resizeStamp(tab.length);
            while (nextTab == nextTable &amp;&amp; table == tab &amp;&amp;
                   (sc = sizeCtl) &lt; 0) { // 条件判断
                if ((sc &gt;&gt;&gt; RESIZE_STAMP_SHIFT) != rs || sc == rs + 1 ||
                    sc == rs + MAX_RESIZERS || transferIndex &lt;= 0) // 
                    break;
                if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1)) { // 比较并交换
                    // 将table的结点转移到nextTab中
                    transfer(tab, nextTab);
                    break;
                }
            }
            return nextTab;
        }
        return table;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数用于在扩容时将table表中的结点转移到nextTable中。</p><p>putTreeVal函数源码如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>final TreeNode&lt;K,V&gt; putTreeVal(int h, K k, V v) {
            Class&lt;?&gt; kc = null;
            boolean searched = false;
            for (TreeNode&lt;K,V&gt; p = root;;) {
                int dir, ph; K pk;
                if (p == null) {
                    first = root = new TreeNode&lt;K,V&gt;(h, k, v, null, null);
                    break;
                }
                else if ((ph = p.hash) &gt; h)
                    dir = -1;
                else if (ph &lt; h)
                    dir = 1;
                else if ((pk = p.key) == k || (pk != null &amp;&amp; k.equals(pk)))
                    return p;
                else if ((kc == null &amp;&amp;
                          (kc = comparableClassFor(k)) == null) ||
                         (dir = compareComparables(kc, k, pk)) == 0) {
                    if (!searched) {
                        TreeNode&lt;K,V&gt; q, ch;
                        searched = true;
                        if (((ch = p.left) != null &amp;&amp;
                             (q = ch.findTreeNode(h, k, kc)) != null) ||
                            ((ch = p.right) != null &amp;&amp;
                             (q = ch.findTreeNode(h, k, kc)) != null))
                            return q;
                    }
                    dir = tieBreakOrder(k, pk);
                }

                TreeNode&lt;K,V&gt; xp = p;
                if ((p = (dir &lt;= 0) ? p.left : p.right) == null) {
                    TreeNode&lt;K,V&gt; x, f = first;
                    first = x = new TreeNode&lt;K,V&gt;(h, k, v, f, xp);
                    if (f != null)
                        f.prev = x;
                    if (dir &lt;= 0)
                        xp.left = x;
                    else
                        xp.right = x;
                    if (!xp.red)
                        x.red = true;
                    else {
                        lockRoot();
                        try {
                            root = balanceInsertion(root, x);
                        } finally {
                            unlockRoot();
                        }
                    }
                    break;
                }
            }
            assert checkInvariants(root);
            return null;
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数用于将指定的hash、key、value值添加到红黑树中，若已经添加了，则返回null，否则返回该结点。</p><p>treeifyBin函数源码如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private final void treeifyBin(Node&lt;K,V&gt;[] tab, int index) {
        Node&lt;K,V&gt; b; int n, sc;
        if (tab != null) { // 表不为空
            if ((n = tab.length) &lt; MIN_TREEIFY_CAPACITY) // table表的长度小于最小的长度
                // 进行扩容，调整某个桶中结点数量过多的问题（由于某个桶中结点数量超出了阈值，则触发treeifyBin）
                tryPresize(n &lt;&lt; 1);
            else if ((b = tabAt(tab, index)) != null &amp;&amp; b.hash &gt;= 0) { // 桶中存在结点并且结点的hash值大于等于0
                synchronized (b) { // 对桶中第一个结点进行加锁
                    if (tabAt(tab, index) == b) { // 第一个结点没有变化
                        TreeNode&lt;K,V&gt; hd = null, tl = null;
                        for (Node&lt;K,V&gt; e = b; e != null; e = e.next) { // 遍历桶中所有结点
                            // 新生一个TreeNode结点
                            TreeNode&lt;K,V&gt; p =
                                new TreeNode&lt;K,V&gt;(e.hash, e.key, e.val,
                                                  null, null);
                            if ((p.prev = tl) == null) // 该结点前驱为空
                                // 设置p为头结点
                                hd = p;
                            else
                                // 尾节点的next域赋值为p
                                tl.next = p;
                            // 尾节点赋值为p
                            tl = p;
                        }
                        // 设置table表中下标为index的值为hd
                        setTabAt(tab, index, new TreeBin&lt;K,V&gt;(hd));
                    }
                }
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数用于将桶中的数据结构转化为红黑树，其中，值得注意的是，当table的长度未达到阈值时，会进行一次扩容操作，该操作会使得触发treeifyBin操作的某个桶中的所有元素进行一次重新分配，这样可以避免某个桶中的结点数量太大。</p><p>addCount函数源码如下:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private final void addCount(long x, int check) {
        CounterCell[] as; long b, s;
        if ((as = counterCells) != null ||
            !U.compareAndSwapLong(this, BASECOUNT, b = baseCount, s = b + x)) { // counterCells不为空或者比较交换失败
            CounterCell a; long v; int m;
            // 无竞争标识
            boolean uncontended = true;
            if (as == null || (m = as.length - 1) &lt; 0 ||
                (a = as[ThreadLocalRandom.getProbe() &amp; m]) == null ||
                !(uncontended =
                  U.compareAndSwapLong(a, CELLVALUE, v = a.value, v + x))) { // 
                fullAddCount(x, uncontended);
                return;
            }
            if (check &lt;= 1)
                return;
            s = sumCount();
        }
        if (check &gt;= 0) {
            Node&lt;K,V&gt;[] tab, nt; int n, sc;
            while (s &gt;= (long)(sc = sizeCtl) &amp;&amp; (tab = table) != null &amp;&amp;
                   (n = tab.length) &lt; MAXIMUM_CAPACITY) {
                int rs = resizeStamp(n);
                if (sc &lt; 0) {
                    if ((sc &gt;&gt;&gt; RESIZE_STAMP_SHIFT) != rs || sc == rs + 1 ||
                        sc == rs + MAX_RESIZERS || (nt = nextTable) == null ||
                        transferIndex &lt;= 0)
                        break;
                    if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1))
                        transfer(tab, nt);
                }
                else if (U.compareAndSwapInt(this, SIZECTL, sc,
                                             (rs &lt;&lt; RESIZE_STAMP_SHIFT) + 2))
                    transfer(tab, null);
                s = sumCount();
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数主要完成binCount的值加1的操作。</p><h4 id="get函数" tabindex="-1"><a class="header-anchor" href="#get函数" aria-hidden="true">#</a> get函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public V get(Object key) {
        Node&lt;K,V&gt;[] tab; Node&lt;K,V&gt; e, p; int n, eh; K ek;
        // 计算key的hash值
        int h = spread(key.hashCode()); 
        if ((tab = table) != null &amp;&amp; (n = tab.length) &gt; 0 &amp;&amp;
            (e = tabAt(tab, (n - 1) &amp; h)) != null) { // 表不为空并且表的长度大于0并且key所在的桶不为空
            if ((eh = e.hash) == h) { // 表中的元素的hash值与key的hash值相等
                if ((ek = e.key) == key || (ek != null &amp;&amp; key.equals(ek))) // 键相等
                    // 返回值
                    return e.val;
            }
            else if (eh &lt; 0) // 结点hash值小于0
                // 在桶（链表/红黑树）中查找
                return (p = e.find(h, key)) != null ? p.val : null;
            while ((e = e.next) != null) { // 对于结点hash值大于0的情况
                if (e.hash == h &amp;&amp;
                    ((ek = e.key) == key || (ek != null &amp;&amp; key.equals(ek))))
                    return e.val;
            }
        }
        return null;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>get函数根据key的hash值来计算在哪个桶中，再遍历桶，查找元素，若找到则返回该结点，否则，返回null。</p><h4 id="replacenode函数" tabindex="-1"><a class="header-anchor" href="#replacenode函数" aria-hidden="true">#</a> replaceNode函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>final V replaceNode(Object key, V value, Object cv) {
        // 计算key的hash值
        int hash = spread(key.hashCode());
        for (Node&lt;K,V&gt;[] tab = table;;) { // 无限循环
            Node&lt;K,V&gt; f; int n, i, fh;
            if (tab == null || (n = tab.length) == 0 ||
                (f = tabAt(tab, i = (n - 1) &amp; hash)) == null) // table表为空或者表长度为0或者key所对应的桶为空
                // 跳出循环
                break;
            else if ((fh = f.hash) == MOVED) // 桶中第一个结点的hash值为MOVED
                // 转移
                tab = helpTransfer(tab, f);
            else {
                V oldVal = null;
                boolean validated = false;
                synchronized (f) { // 加锁同步
                    if (tabAt(tab, i) == f) { // 桶中的第一个结点没有发生变化
                        if (fh &gt;= 0) { // 结点hash值大于0
                            validated = true;
                            for (Node&lt;K,V&gt; e = f, pred = null;;) { // 无限循环
                                K ek;
                                if (e.hash == hash &amp;&amp;
                                    ((ek = e.key) == key ||
                                     (ek != null &amp;&amp; key.equals(ek)))) { // 结点的hash值与指定的hash值相等，并且key也相等
                                    V ev = e.val;
                                    if (cv == null || cv == ev ||
                                        (ev != null &amp;&amp; cv.equals(ev))) { // cv为空或者与结点value相等或者不为空并且相等
                                        // 保存该结点的val值
                                        oldVal = ev;
                                        if (value != null) // value为null
                                            // 设置结点value值
                                            e.val = value;
                                        else if (pred != null) // 前驱不为空
                                            // 前驱的后继为e的后继，即删除了e结点
                                            pred.next = e.next;
                                        else
                                            // 设置table表中下标为index的值为e.next
                                            setTabAt(tab, i, e.next);
                                    }
                                    break;
                                }
                                pred = e;
                                if ((e = e.next) == null)
                                    break;
                            }
                        }
                        else if (f instanceof TreeBin) { // 为红黑树结点类型
                            validated = true;
                            // 类型转化
                            TreeBin&lt;K,V&gt; t = (TreeBin&lt;K,V&gt;)f;
                            TreeNode&lt;K,V&gt; r, p;
                            if ((r = t.root) != null &amp;&amp;
                                (p = r.findTreeNode(hash, key, null)) != null) { // 根节点不为空并且存在与指定hash和key相等的结点
                                // 保存p结点的value
                                V pv = p.val;
                                if (cv == null || cv == pv ||
                                    (pv != null &amp;&amp; cv.equals(pv))) { // cv为空或者与结点value相等或者不为空并且相等
                                    oldVal = pv;
                                    if (value != null) 
                                        p.val = value;
                                    else if (t.removeTreeNode(p)) // 移除p结点
                                        setTabAt(tab, i, untreeify(t.first));
                                }
                            }
                        }
                    }
                }
                if (validated) {
                    if (oldVal != null) {
                        if (value == null)
                            // baseCount值减一
                            addCount(-1L, -1);
                        return oldVal;
                    }
                    break;
                }
            }
        }
        return null;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数对remove函数提供支持，remove函数底层是调用的replaceNode函数实现结点的删除。</p><h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3>`,85),u={href:"https://www.cnblogs.com/leesf456/p/5453341.html",target:"_blank",rel:"noopener noreferrer"},b={href:"http://blog.fangzhipeng.com/javainterview/2019/03/18/concurrenthashmap.html",target:"_blank",rel:"noopener noreferrer"},o=n("figure",null,[n("img",{src:"https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/common/wxcode.png",alt:"方志朋_官方公众号",tabindex:"0",loading:"lazy"}),n("figcaption",null,"方志朋_官方公众号")],-1);function m(p,h){const e=l("ExternalLinkIcon");return d(),t("div",null,[c,n("p",null,[n("a",u,[i("https://www.cnblogs.com/leesf456/p/5453341.html"),a(e)])]),n("p",null,[n("a",b,[i("http://blog.fangzhipeng.com/javainterview/2019/03/18/concurrenthashmap.html"),a(e)])]),o])}const k=s(v,[["render",m],["__file","2024-01-02-concurrenthashmap.html.vue"]]);export{k as default};
