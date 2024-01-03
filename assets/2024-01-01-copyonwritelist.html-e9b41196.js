import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as i,f as s}from"./app-7f6cebaf.js";const a={},l=s(`<p>CopyOnWriteArrayList 是 Java 并发包中的一个线程安全的集合类，它实现了 List 接口。与其他并发集合不同的是，CopyOnWriteArrayList 的读操作是无锁的，而写操作则是通过创建并复制底层数组的方式实现的。</p><h2 id="copyonwritearraylist介绍" tabindex="-1"><a class="header-anchor" href="#copyonwritearraylist介绍" aria-hidden="true">#</a> CopyOnWriteArrayList介绍</h2><p>CopyOnWriteArrayList 内部维护了一个数组，所有的元素都存储在这个数组中。成员变量 array 就指向这个内部数组。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/1/image-20240101105046850.png" alt="image-20240101105046850" tabindex="0" loading="lazy"><figcaption>image-20240101105046850</figcaption></figure><p>写时复制：<br> 当有写操作（如添加、修改、删除元素）发生时，CopyOnWriteArrayList 会创建一个新的数组，并将修改后的元素添加到新数组中。这样一来，原始数组不会被修改，而是保持不变。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2024/1/1/image-20240101105106318.png" alt="image-20240101105106318" tabindex="0" loading="lazy"><figcaption>image-20240101105106318</figcaption></figure><p><strong>特点：</strong></p><ul><li>线程安全：CopyOnWriteArrayList 在写入数据时会创建一个新的底层数组来保存数据，这样保证了写操作的线程安全性。</li><li>读取效率较高：由于读操作不需要加锁，所以可以并发进行，不会阻塞读取操作。</li></ul><p><strong>使用场景：</strong></p><ul><li>读多写少：CopyOnWriteArrayList 的主要优势在于读取操作的高效性，适用于多读少写的场景。</li><li>数据不经常更新：由于写操作需要复制底层数组，因此对于频繁的写操作，CopyOnWriteArrayList 的性能可能较低。</li></ul><h2 id="copyonwritearraylist使用示例" tabindex="-1"><a class="header-anchor" href="#copyonwritearraylist使用示例" aria-hidden="true">#</a> CopyOnWriteArrayList使用示例</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">CopyOnWriteArrayList</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Example</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CopyOnWriteArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CopyOnWriteArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 添加元素</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 迭代元素</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> element <span class="token operator">:</span> list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>element<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 修改元素（会创建新的底层数组）</span>
        list<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 移除元素（会创建新的底层数组）</span>
        list<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上是关于 CopyOnWriteArrayList 的简要介绍和示例用法。</p><h2 id="copyonwritearraylist源码解析" tabindex="-1"><a class="header-anchor" href="#copyonwritearraylist源码解析" aria-hidden="true">#</a> CopyOnWriteArrayList源码解析</h2><h3 id="类的继承关系" tabindex="-1"><a class="header-anchor" href="#类的继承关系" aria-hidden="true">#</a> 类的继承关系</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class CopyOnWriteArrayList&lt;E&gt;
    implements List&lt;E&gt;, RandomAccess, Cloneable, java.io.Serializable {}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>CopyOnWriteArrayList实现了List接口，List接口定义了对列表的基本操作；同时实现了RandomAccess接口，表示可以随机访</p><h3 id="类的属性" tabindex="-1"><a class="header-anchor" href="#类的属性" aria-hidden="true">#</a> 类的属性</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class CopyOnWriteArrayList&lt;E&gt;
    implements List&lt;E&gt;, RandomAccess, Cloneable, java.io.Serializable {
    // 版本序列号
    private static final long serialVersionUID = 8673264195747942595L;
    // 可重入锁
    final transient ReentrantLock lock = new ReentrantLock();
    // 对象数组，用于存放元素
    private transient volatile Object[] array;
    // 反射机制
    private static final sun.misc.Unsafe UNSAFE;
    // lock域的内存偏移量
    private static final long lockOffset;
    static {
        try {
            UNSAFE = sun.misc.Unsafe.getUnsafe();
            Class&lt;?&gt; k = CopyOnWriteArrayList.class;
            lockOffset = UNSAFE.objectFieldOffset
                (k.getDeclaredField(&quot;lock&quot;));
        } catch (Exception e) {
            throw new Error(e);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>属性中有一个可重入锁，用来保证线程安全访问，还有一个Object类型的数组，用来存放具体的元素。当然，也使用到了反射机制和CAS来保证原子性的修改lock域。</p><h3 id="类的构造函数" tabindex="-1"><a class="header-anchor" href="#类的构造函数" aria-hidden="true">#</a> 类的构造函数</h3><p><strong>CopyOnWriteArrayList()型构造函数:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public CopyOnWriteArrayList() {
        // 设置数组
        setArray(new Object[0]);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>CopyOnWriteArrayList(Collection&lt;? extends E&gt;)型构造函数:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public CopyOnWriteArrayList(Collection&lt;? extends E&gt; c) {
        Object[] elements;
        if (c.getClass() == CopyOnWriteArrayList.class) // 类型相同
            // 获取c集合的数组
            elements = ((CopyOnWriteArrayList&lt;?&gt;)c).getArray();
        else { // 类型不相同
            // 将c集合转化为数组并赋值给elements
            elements = c.toArray();
            // c.toArray might (incorrectly) not return Object[] (see 6260652)
            if (elements.getClass() != Object[].class) // elements类型不为Object[]类型
                // 将elements数组转化为Object[]类型的数组
                elements = Arrays.copyOf(elements, elements.length, Object[].class);
        }
        // 设置数组
        setArray(elements);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：该构造函数用于创建一个按 collection 的迭代器返回元素的顺序包含指定 collection 元素的列表。该构造函数的处理流程如下:</p><p>① 判断传入的集合c的类型是否为CopyOnWriteArrayList类型，若是，则获取该集合类型的底层数组（Object[]），并且设置当前CopyOnWriteArrayList的数组（Object[]数组），进入步骤③；否则，进入步骤②</p><p>② 将传入的集合转化为数组elements，判断elements的类型是否为Object[]类型（toArray方法可能不会返回Object类型的数组），若不是，则将elements转化为Object类型的数组。进入步骤③</p><p>③ 设置当前CopyOnWriteArrayList的Object[]为elements。</p><p><strong>CopyOnWriteArrayList(E[])型构造函数:</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public CopyOnWriteArrayList(E[] toCopyIn) {
        // 将toCopyIn转化为Object[]类型数组，然后设置当前数组
        setArray(Arrays.copyOf(toCopyIn, toCopyIn.length, Object[].class));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该构造函数用于创建一个保存给定数组的副本的列表。</p><h3 id="类的内部类" tabindex="-1"><a class="header-anchor" href="#类的内部类" aria-hidden="true">#</a> 类的内部类</h3><p>COWIterator类:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static final class COWIterator&lt;E&gt; implements ListIterator&lt;E&gt; {
        /** Snapshot of the array */
        // 快照
        private final Object[] snapshot;
        /** Index of element to be returned by subsequent call to next.  */
        // 游标
        private int cursor;
        // 构造函数
        private COWIterator(Object[] elements, int initialCursor) {
            cursor = initialCursor;
            snapshot = elements;
        }
        // 是否还有下一项
        public boolean hasNext() {
            return cursor &lt; snapshot.length;
        }
        // 是否有上一项
        public boolean hasPrevious() {
            return cursor &gt; 0;
        }
        // next项
        @SuppressWarnings(&quot;unchecked&quot;)
        public E next() {
            if (! hasNext()) // 不存在下一项，抛出异常
                throw new NoSuchElementException();
            // 返回下一项
            return (E) snapshot[cursor++];
        }

        @SuppressWarnings(&quot;unchecked&quot;)
        public E previous() {
            if (! hasPrevious())
                throw new NoSuchElementException();
            return (E) snapshot[--cursor];
        }
        
        // 下一项索引
        public int nextIndex() {
            return cursor;
        }
        
        // 上一项索引
        public int previousIndex() {
            return cursor-1;
        }

        /**
         * Not supported. Always throws UnsupportedOperationException.
         * @throws UnsupportedOperationException always; {@code remove}
         *         is not supported by this iterator.
         */
        // 不支持remove操作
        public void remove() {
            throw new UnsupportedOperationException();
        }

        /**
         * Not supported. Always throws UnsupportedOperationException.
         * @throws UnsupportedOperationException always; {@code set}
         *         is not supported by this iterator.
         */
        // 不支持set操作
        public void set(E e) {
            throw new UnsupportedOperationException();
        }

        /**
         * Not supported. Always throws UnsupportedOperationException.
         * @throws UnsupportedOperationException always; {@code add}
         *         is not supported by this iterator.
         */
        // 不支持add操作
        public void add(E e) {
            throw new UnsupportedOperationException();
        }

        @Override
        public void forEachRemaining(Consumer&lt;? super E&gt; action) {
            Objects.requireNonNull(action);
            Object[] elements = snapshot;
            final int size = elements.length;
            for (int i = cursor; i &lt; size; i++) {
                @SuppressWarnings(&quot;unchecked&quot;) E e = (E) elements[i];
                action.accept(e);
            }
            cursor = size;
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>COWIterator表示迭代器，其也有一个Object类型的数组作为CopyOnWriteArrayList数组的快照，这种快照风格的迭代器方法在创建迭代器时使用了对当时数组状态的引用。此数组在迭代器的生存期内不会更改，因此不可能发生冲突，并且迭代器保证不会抛出 ConcurrentModificationException。创建迭代器以后，迭代器就不会反映列表的添加、移除或者更改。在迭代器上进行的元素更改操作（remove、set 和 add）不受支持。这些方法将抛出 UnsupportedOperationException。</p><h3 id="核心函数分析" tabindex="-1"><a class="header-anchor" href="#核心函数分析" aria-hidden="true">#</a> 核心函数分析</h3><p>对于CopyOnWriteArrayList的函数分析，主要明白Arrays.copyOf方法即可理解CopyOnWriteArrayList其他函数的意义。</p><h4 id="copyof函数" tabindex="-1"><a class="header-anchor" href="#copyof函数" aria-hidden="true">#</a> copyOf函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static &lt;T,U&gt; T[] copyOf(U[] original, int newLength, Class&lt;? extends T[]&gt; newType) {
        @SuppressWarnings(&quot;unchecked&quot;)
        // 确定copy的类型（将newType转化为Object类型，将Object[].class转化为Object类型，判断两者是否相等，若相等，则生成指定长度的Object数组
        // 否则,生成指定长度的新类型的数组）
        T[] copy = ((Object)newType == (Object)Object[].class)
            ? (T[]) new Object[newLength]
            : (T[]) Array.newInstance(newType.getComponentType(), newLength);
        // 将original数组从下标0开始，复制长度为(original.length和newLength的较小者),复制到copy数组中（也从下标0开始）
        System.arraycopy(original, 0, copy, 0,
                         Math.min(original.length, newLength));
        return copy;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="add函数" tabindex="-1"><a class="header-anchor" href="#add函数" aria-hidden="true">#</a> add函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public boolean add(E e) {
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            // 元素数组
            Object[] elements = getArray();
            // 数组长度
            int len = elements.length;
            // 复制数组
            Object[] newElements = Arrays.copyOf(elements, len + 1);
            // 存放元素e
            newElements[len] = e;
            // 设置数组
            setArray(newElements);
            return true;
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数用于将指定元素添加到此列表的尾部，处理流程如下</p><p>① 获取锁（保证多线程的安全访问），获取当前的Object数组，获取Object数组的长度为length，进入步骤②。</p><p>② 根据Object数组复制一个长度为length+1的Object数组为newElements（此时，newElements[length]为null），进入步骤③。</p><p>③ 将下标为length的数组元素newElements[length]设置为元素e，再设置当前Object[]为newElements，释放锁，返回。这样就完成了元素的添加。</p><h4 id="addifabsent" tabindex="-1"><a class="header-anchor" href="#addifabsent" aria-hidden="true">#</a> addIfAbsent</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private boolean addIfAbsent(E e, Object[] snapshot) {
        // 重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            // 获取数组
            Object[] current = getArray();
            // 数组长度
            int len = current.length;
            if (snapshot != current) { // 快照不等于当前数组，对数组进行了修改
                // Optimize for lost race to another addXXX operation
                // 取较小者
                int common = Math.min(snapshot.length, len);
                for (int i = 0; i &lt; common; i++) // 遍历
                    if (current[i] != snapshot[i] &amp;&amp; eq(e, current[i])) // 当前数组的元素与快照的元素不相等并且e与当前元素相等
                        // 表示在snapshot与current之间修改了数组，并且设置了数组某一元素为e，已经存在
                        // 返回
                        return false;
                if (indexOf(e, current, common, len) &gt;= 0) // 在当前数组中找到e元素
                        // 返回
                        return false;
            }
            // 复制数组
            Object[] newElements = Arrays.copyOf(current, len + 1);
            // 对数组len索引的元素赋值为e
            newElements[len] = e;
            // 设置数组
            setArray(newElements);
            return true;
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：该函数用于添加元素（如果数组中不存在，则添加；否则，不添加，直接返回）。<strong>可以保证多线程环境下不会重复添加元素</strong>，该函数的流程如下</p><p>① 获取锁，获取当前数组为current，current长度为len，判断数组之前的快照snapshot是否等于当前数组current，若不相等，则进入步骤②；否则，进入步骤④</p><p>② 不相等，表示在snapshot与current之间，对数组进行了修改（如进行了add、set、remove等操作），获取长度（snapshot与current之间的较小者），对current进行遍历操作，若遍历过程发现snapshot与current的元素不相等并且current的元素与指定元素相等（可能进行了set操作），进入步骤⑤，否则，进入步骤③</p><p>③ 在当前数组中索引指定元素，若能够找到，进入步骤⑤，否则，进入步骤④</p><p>④ 复制当前数组current为newElements，长度为len+1，此时newElements[len]为null。再设置newElements[len]为指定元素e，再设置数组，进入步骤⑤</p><p>⑤ 释放锁，返回。</p><h4 id="set函数" tabindex="-1"><a class="header-anchor" href="#set函数" aria-hidden="true">#</a> set函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public E set(int index, E element) {
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            // 获取数组
            Object[] elements = getArray();
            // 获取index索引的元素
            E oldValue = get(elements, index);

            if (oldValue != element) { // 旧值等于element
                // 数组长度
                int len = elements.length;
                // 复制数组
                Object[] newElements = Arrays.copyOf(elements, len);
                // 重新赋值index索引的值
                newElements[index] = element;
                // 设置数组
                setArray(newElements);
            } else {
                // Not quite a no-op; ensures volatile write semantics
                // 设置数组
                setArray(elements);
            }
            // 返回旧值
            return oldValue;
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此函数用于用指定的元素替代此列表指定位置上的元素，也是基于数组的复制来实现的。</p><h4 id="remove函数" tabindex="-1"><a class="header-anchor" href="#remove函数" aria-hidden="true">#</a> remove函数</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public E remove(int index) {
        // 可重入锁
        final ReentrantLock lock = this.lock;
        // 获取锁
        lock.lock();
        try {
            // 获取数组
            Object[] elements = getArray();
            // 数组长度
            int len = elements.length;
            // 获取旧值
            E oldValue = get(elements, index);
            // 需要移动的元素个数
            int numMoved = len - index - 1;
            if (numMoved == 0) // 移动个数为0
                // 复制后设置数组
                setArray(Arrays.copyOf(elements, len - 1));
            else { // 移动个数不为0
                // 新生数组
                Object[] newElements = new Object[len - 1];
                // 复制index索引之前的元素
                System.arraycopy(elements, 0, newElements, 0, index);
                // 复制index索引之后的元素
                System.arraycopy(elements, index + 1, newElements, index,
                                 numMoved);
                // 设置索引
                setArray(newElements);
            }
            // 返回旧值
            return oldValue;
        } finally {
            // 释放锁
            lock.unlock();
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：此函数用于移除此列表指定位置上的元素。处理流程如下</p><p>① 获取锁，获取数组elements，数组长度为length，获取索引的值elements[index]，计算需要移动的元素个数（length - index - 1）,若个数为0，则表示移除的是数组的最后一个元素，复制elements数组，复制长度为length-1，然后设置数组，进入步骤③；否则，进入步骤②</p><p>② 先复制index索引前的元素，再复制index索引后的元素，然后设置数组。</p><p>③ 释放锁，返回旧值。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>CopyOnWriteArrayList 的实现使用了快照的思路，通过创建新的底层数组来实现写操作的线程安全性，同时保证在迭代过程中不会抛出 ConcurrentModificationException 异常。</p><p>具体而言，当有写操作发生时，CopyOnWriteArrayList 会创建一个底层数组的副本，然后在副本上进行写操作，这样迭代过程中使用的是原来的底层数组快照，保证了迭代的线程安全性和不会发生并发修改异常。</p>`,66),t=[l];function d(r,c){return e(),i("div",null,t)}const o=n(a,[["render",d],["__file","2024-01-01-copyonwritelist.html.vue"]]);export{o as default};
