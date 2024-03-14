import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-6cf116b3.js";const i={},t=e(`<h2 id="arraylist的类结构图" tabindex="-1"><a class="header-anchor" href="#arraylist的类结构图" aria-hidden="true">#</a> ArrayList的类结构图</h2><p>ArrayList 是 java 集合框架中比较常用的用于存储单列数据的容器。它继承自 AbstractList，实现了 List 接口，同时还实现了 RandomAccess、Cloneable、Serializable 接口，所以ArrayList 支持快速访问、复制、序列化。ArrayList底层基于数组实现，容量大小动态可以变化。</p><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/11/27/image-20231127211604720.png" alt="image-20231127211604720" style="zoom:50%;"><ul><li><p>ArrayList继承了AbstractList类并实现类List接口，所以ArrayList具有了AbstractList和List的功能。而AbstractList内部已经实现了获取Iterator和ListIterator的方法。所</p></li><li><p>ArrayList实现了RandomAccess接口，表明ArrayList支持随机访问。</p></li><li><p>ArrayList实现了Cloneable接口，表明ArrayList支持克隆。</p></li><li><p>ArrayList实现了Serializable接口，表明ArrayList支持序列，可以将ArrayList以流的形式通过ObjectInputStream/ObjectOutputStream来写/读。</p></li></ul><h2 id="arraylist底层是如何实现的" tabindex="-1"><a class="header-anchor" href="#arraylist底层是如何实现的" aria-hidden="true">#</a> ArrayList底层是如何实现的？</h2><p>ArrayList 是通过基于数组的方式实现的动态数组。</p><p>在 ArrayList 内部，有一个对象数组（elementData）用于存储元素。当创建 ArrayList 对象时，会初始化一个初始容量的数组。随着元素的不断添加，ArrayList 会根据需要自动进行扩容。</p><p>当添加元素时，ArrayList 会检查当前数组容量是否足够，如果不够，则会创建一个新的更大容量的数组，并将原有元素复制到新数组中。这个过程称为扩容。通过这种方式，ArrayList 实现了动态调整数组容量。</p><p>在进行删除操作时，ArrayList 会将删除位置后面的元素向前移动一个位置，以填补被删除元素的空缺。同时，ArrayList 会判断是否需要缩小数组容量，如果数组容量过大且元素数量远小于容量的 1/4，则会进行缩容操作，减少内存占用。</p><p>由于 ArrayList 的底层采用数组实现，所以随机访问元素的时间复杂度为 O(1)，即常数时间。但是在进行插入和删除操作时，为了保持数组的连续性，可能需要移动大量元素，时间复杂度为 O(n)，其中 n 是元素的数量。因此，ArrayList 适用于对随机访问的需求较多，而对插入和删除操作效率要求不高的场景。</p><p>ArrayList的底层使用数组实现的源码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ArrayList&lt;E&gt; extends AbstractList&lt;E&gt;
        implements List&lt;E&gt;, RandomAccess, Cloneable, java.io.Serializable
{
 
//存储ArrayList元素的数组缓冲区。 ArrayList的容量就是这个数组缓冲区的长度。任何 empty ArrayList with //elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA 将在添加第一个元素时扩展为DEFAULT_CAPACITY。
    transient Object[] elementData; 
    
   ....
  } 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意，本文的源码为JDK18</strong></p><h2 id="arraylist的初始化" tabindex="-1"><a class="header-anchor" href="#arraylist的初始化" aria-hidden="true">#</a> ArrayList的初始化</h2><p>ArrayList会在构造函数执行的时候初始化，ArrayList有三种构造函数，分别为：</p><ul><li>带初始化容量大小参数(initialCapacity)的构造函数</li><li><strong>无参构造函数，默认会初始化容量大小为DEFAULTCAPACITY_EMPTY_ELEMENTDATA，DEFAULTCAPACITY_EMPTY_ELEMENTDATA的值为10，所以默认的初始化大小为10；这种最常用。</strong></li><li>带有Collection参数的构造函数，会将Collection的元素Copy到elementData成员变量中。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public ArrayList(int initialCapacity) {
        if (initialCapacity &gt; 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException(&quot;Illegal Capacity: &quot;+
                                               initialCapacity);
        }
    }
    
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
    
    public ArrayList(Collection&lt;? extends E&gt; c) {
        Object[] a = c.toArray();
        if ((size = a.length) != 0) {
            if (c.getClass() == ArrayList.class) {
                elementData = a;
            } else {
                elementData = Arrays.copyOf(a, size, Object[].class);
            }
        } else {
            // replace with empty array.
            elementData = EMPTY_ELEMENTDATA;
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="添加元素" tabindex="-1"><a class="header-anchor" href="#添加元素" aria-hidden="true">#</a> 添加元素</h2><table><thead><tr><th>方法名</th><th>描述</th></tr></thead><tbody><tr><td>public boolean add(E e)</td><td>添加元素</td></tr><tr><td>public void add(int index, E element)</td><td>在制定位置添加元素</td></tr><tr><td>public boolean addAll(Collection&lt;? extends E&gt; c)</td><td>将Collection的全部元素添加到集合中</td></tr><tr><td>public boolean addAll(int index, Collection&lt;? extends E&gt; c)</td><td>将Collection的按照index位置开始的所有元素添加到集合中</td></tr></tbody></table><p>添加元素的源码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public boolean add(E e) {
        modCount++;
        add(e, elementData, size);//将元素添加到size的位置
        return true;
    }
    
     public void add(int index, E element) {
        rangeCheckForAdd(index);
        modCount++;
        final int s;
        Object[] elementData;
        //index的值和elementData的长度相等，则扩容
        if ((s = size) == (elementData = this.elementData).length)
            elementData = grow();
        System.arraycopy(elementData, index,
                         elementData, index + 1,
                         s - index);
         //将元素的放到索引位置              
        elementData[index] = element;
        //容器的size+1
        size = s + 1;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="扩容" tabindex="-1"><a class="header-anchor" href="#扩容" aria-hidden="true">#</a> 扩容</h2><p>扩容是在grow()函数中进行，它返回的是一个新的Object[] 数组，新数组已经将就数据拷贝。</p><ul><li>如果elementData是DEFAULTCAPACITY_EMPTY_ELEMENTDATA（空数组），并且元素小于DEFAULT_CAPACITY（10 个），则对空数组进行初始化</li><li>如果不为空数组，则进行初始化，正常情况下新的数组大小是旧数组的1.5倍 <ul><li>如果超出了Interger的软最大值则报错</li><li>最多返回Interger的软最大值（ SOFT_MAX_ARRAY_LENGTH = Integer.MAX_VALUE - 8）</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  private Object[] grow() {
        return grow(size + 1);
    }
    
private Object[] grow(int minCapacity) {
        int oldCapacity = elementData.length;
        if (oldCapacity &gt; 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            int newCapacity = ArraysSupport.newLength(oldCapacity,
                    minCapacity - oldCapacity, /* minimum growth */
                    oldCapacity &gt;&gt; 1           /* preferred growth */);
            return elementData = Arrays.copyOf(elementData, newCapacity);
        } else {
        		//对空数组进行初始化
            return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
        }
    }
    
     public static int newLength(int oldLength, int minGrowth, int prefGrowth) {
        // preconditions not checked because of inlining
        // assert oldLength &gt;= 0
        // assert minGrowth &gt; 0

        int prefLength = oldLength + Math.max(minGrowth, prefGrowth); // might overflow
        if (0 &lt; prefLength &amp;&amp; prefLength &lt;= SOFT_MAX_ARRAY_LENGTH) {
            return prefLength;
        } else {
            // put code cold in a separate method
            return hugeLength(oldLength, minGrowth);
        }
    }

    private static int hugeLength(int oldLength, int minGrowth) {
        int minLength = oldLength + minGrowth;
        if (minLength &lt; 0) { // overflow
            throw new OutOfMemoryError(
                &quot;Required array length &quot; + oldLength + &quot; + &quot; + minGrowth + &quot; is too large&quot;);
        } else if (minLength &lt;= SOFT_MAX_ARRAY_LENGTH) {
            return SOFT_MAX_ARRAY_LENGTH;
        } else {
            return minLength;
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除元素" tabindex="-1"><a class="header-anchor" href="#删除元素" aria-hidden="true">#</a> 删除元素</h2><p><code>remove(Object o)</code> 方法：该方法用于删除指定的元素。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public boolean remove(Object o) {
        final Object[] es = elementData;
        final int size = this.size;
        int i = 0;
        found: {
            if (o == null) {
                for (; i &lt; size; i++)
                    if (es[i] == null)
                        break found;
            } else {
                for (; i &lt; size; i++)
                    if (o.equals(es[i]))
                        break found;
            }
            return false;
        }
        fastRemove(es, i);
        return true;
    }
     private void fastRemove(Object[] es, int i) {
        modCount++;
        final int newSize;
        if ((newSize = size - 1) &gt; i)
            System.arraycopy(es, i + 1, es, i, newSize - i);
        es[size = newSize] = null;
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>首先，<code>remove(Object o)</code> 方法会判断是否删除的是 <code>null</code> 值，然后遍历 ArrayList 查找匹配的元素。</li><li>如果找到匹配的元素，会调用 <code>fastRemove(int index)</code> 方法进行快速删除，该方法将需要删除元素的位置（index）后面的元素向前移动，覆盖需要删除的元素。</li><li>最后，将 <code>size</code> 赋值为newSize，newSize实际上是减一了，表示 ArrayList 的元素总数减少一个。</li><li>并将最后一个位置上的元素清空。</li></ul><h2 id="查找元素" tabindex="-1"><a class="header-anchor" href="#查找元素" aria-hidden="true">#</a> 查找元素</h2><p>get(int index)用于获取指定位置的元素，如果index超出长度，则报IndexOutOfBoundsException异常。查找指定位置元素的时间复杂度为O(1)。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public E get(int index) {
        Objects.checkIndex(index, size);
        return elementData(index);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>contains(Object o)</code> 方法：该方法用于判断 ArrayList 是否包含指定的元素。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">contains</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">indexOf</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>contains(Object o)</code> 方法内部调用了 <code>indexOf(Object o)</code> 方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>elementData<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>elementData<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>indexOf(Object o)</code> 方法首先判断要查找的元素是否为 <code>null</code>，如果是，则遍历 ArrayList 的元素，找到第一个值为 <code>null</code> 的元素，返回其索引值。</li><li>如果要查找的元素不为 <code>null</code>，则遍历 ArrayList 的元素，调用元素的 <code>equals</code> 方法进行比较，找到第一个相等的元素，返回其索引值。</li><li>如果未找到指定元素，则返回 -1。</li></ul><h2 id="迭代器源码解析" tabindex="-1"><a class="header-anchor" href="#迭代器源码解析" aria-hidden="true">#</a> 迭代器源码解析</h2><p>ArrayList 的迭代器（Iterator）是通过内部类 <code>Itr</code> 来实现的，以下是对其源码的解析：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">Itr</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> cursor<span class="token punctuation">;</span>       <span class="token comment">// 下一个元素的索引</span>
    <span class="token keyword">int</span> lastRet <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 上一个元素的索引</span>
    <span class="token keyword">int</span> expectedModCount <span class="token operator">=</span> modCount<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> cursor <span class="token operator">!=</span> size<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">checkForComodification</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 检查 ArrayList 是否被修改过</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> cursor<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;=</span> size<span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NoSuchElementException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> elementData <span class="token operator">=</span> <span class="token class-name">ArrayList</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">.</span>elementData<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&gt;=</span> elementData<span class="token punctuation">.</span>length<span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentModificationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cursor <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">E</span><span class="token punctuation">)</span> elementData<span class="token punctuation">[</span>lastRet <span class="token operator">=</span> i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lastRet <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">checkForComodification</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 检查 ArrayList 是否被修改过</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">ArrayList</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>lastRet<span class="token punctuation">)</span><span class="token punctuation">;</span>
            cursor <span class="token operator">=</span> lastRet<span class="token punctuation">;</span>
            lastRet <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            expectedModCount <span class="token operator">=</span> modCount<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IndexOutOfBoundsException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentModificationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">checkForComodification</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>modCount <span class="token operator">!=</span> expectedModCount<span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentModificationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>Itr</code> 类实现了 <code>Iterator&lt;E&gt;</code> 接口，通过实现 <code>hasNext()</code>、<code>next()</code>、<code>remove()</code> 和 <code>checkForComodification()</code> 方法来支持迭代。</li><li><code>cursor</code> 属性表示下一个元素的索引，<code>lastRet</code> 属性表示上一个元素的索引，<code>expectedModCount</code> 属性表示预期的修改次数。</li><li><code>hasNext()</code> 方法用于判断是否还有下一个元素，即判断 <code>cursor</code> 是否等于 <code>size</code>。</li><li><code>next()</code> 方法用于获取下一个元素，首先调用 <code>checkForComodification()</code> 方法检查 ArrayList 是否被修改过，然后根据 <code>cursor</code> 获取下一个元素并返回，同时更新 <code>lastRet</code> 和 <code>cursor</code> 的值。</li><li><code>remove()</code> 方法用于移除上一个元素，首先检查 <code>lastRet</code> 是否小于 0，如果是则抛出异常，然后再次调用 <code>checkForComodification()</code> 方法检查 ArrayList 是否被修改过，在通过 <code>ArrayList.this.remove(lastRet)</code> 方法移除元素后，更新 <code>cursor</code> 和 <code>lastRet</code> 的值，并将 <code>expectedModCount</code> 修改为当前的 <code>modCount</code>。</li><li><code>checkForComodification()</code> 方法用于检查 ArrayList 是否被修改过，即判断 <code>modCount</code> 是否等于 <code>expectedModCount</code>，如果不相等则抛出异常。</li></ul><p>ArrayList 的迭代器通过内部类 <code>Itr</code> 实现，支持对集合进行顺序迭代，并支持在迭代过程中通过迭代器的 <code>remove()</code> 方法删除元素。迭代器在每次访问元素之前会检查 ArrayList 是否被修改过，利用 <code>modCount</code> 和 <code>expectedModCount</code> 来实现快速失败机制，保证在迭代过程中对集合的修改不会产生错误的结果。</p><p><strong>需要注意的是，在使用迭代器遍历 ArrayList 的过程中，不建议直接使用 <code>ArrayList</code> 对象的 <code>remove()</code> 方法进行元素的删除操作，而应该使用迭代器的 <code>remove()</code> 方法进行删除，以避免产生并发修改异常。</strong></p>`,43),l=[t];function c(o,d){return s(),a("div",null,l)}const u=n(i,[["render",c],["__file","2023-11-27-arraylist-source.html.vue"]]);export{u as default};
