import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,f as e}from"./app-28e7b64a.js";const t={},l=e(`<h2 id="hashmap的类结构图" tabindex="-1"><a class="header-anchor" href="#hashmap的类结构图" aria-hidden="true">#</a> HashMap的类结构图</h2><p>HashMap 是 java 集合框架中用于存储双列数据的散列表，应用非常的广泛。HashMap的类结构图如下：</p><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/2/image-20231202113045647.png" alt="image-20231202113045647" style="zoom:50%;"><ul><li><p>HashMap继承了AbstractMap类并实现类Map接口，所以HashMap具有了AbstractMap和Map的功能。</p></li><li><p>HashMap实现了Cloneable接口，表明HashMap支持克隆。</p></li><li><p>HashMap实现了Serializable接口，表明HashMap支持序列，可以将HashMap以流的形式通过ObjectInputStream/ObjectOutputStream来写/读。</p></li></ul><h2 id="hashmap的底层数据结构" tabindex="-1"><a class="header-anchor" href="#hashmap的底层数据结构" aria-hidden="true">#</a> HashMap的底层数据结构</h2><p>HashMap 的的底层数据结构为数组+链表（或者红黑树）结构，如下图所示：</p><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/2/image-20231202112718275.png" alt="image-20231202112718275" style="zoom:50%;"><p><code>HashMap</code> 通过 <code>Node</code> 类来存储键值对（<code>K</code> 表示键的类型，<code>V</code> 表示值的类型）。每个 <code>Node</code> 对象包含了键、值以及指向下一个 <code>Node</code> 的引用。</p><p>在 JDK 8 以后的版本中，如果链表长度超过阈值（默认为8），且 HashMap 的容量达到了一个较大的值（默认为64），则部分链表节点会转换为红黑树。这些红黑树节点被实现为 <code>TreeNode</code> 类，它拓展自 <code>Node</code> 类。</p><h2 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h2><p>HashMap 有两种构造函数：无参构造函数和带初始容量和负载因子的构造函数。无参构造函数创建一个初始容量为16，负载因子为0.75的 HashMap 对象。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>loadFactor <span class="token operator">=</span> <span class="token constant">DEFAULT_LOAD_FACTOR</span><span class="token punctuation">;</span>
    threshold <span class="token operator">=</span> <span class="token function">tableSizeFor</span><span class="token punctuation">(</span><span class="token constant">INITIAL_CAPACITY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>带参构造函数接收初始容量 <code>initialCapacity</code> 和负载因子 <code>loadFactor</code> 作为参数，创建一个 HashMap 对象。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialCapacity<span class="token punctuation">,</span> <span class="token keyword">float</span> loadFactor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Illegal initial capacity: &quot;</span> <span class="token operator">+</span> initialCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&gt;</span> <span class="token constant">MAXIMUM_CAPACITY</span><span class="token punctuation">)</span>
        initialCapacity <span class="token operator">=</span> <span class="token constant">MAXIMUM_CAPACITY</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>loadFactor <span class="token operator">&lt;=</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token class-name">Float</span><span class="token punctuation">.</span><span class="token function">isNaN</span><span class="token punctuation">(</span>loadFactor<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">&quot;Illegal load factor: &quot;</span> <span class="token operator">+</span> loadFactor<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>loadFactor <span class="token operator">=</span> loadFactor<span class="token punctuation">;</span>
    threshold <span class="token operator">=</span> <span class="token function">tableSizeFor</span><span class="token punctuation">(</span>initialCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>tableSizeFor(initialCapacity)</code> 方法用于计算大于等于给定容量的最小 2 的幂。</p><h2 id="存储元素过程" tabindex="-1"><a class="header-anchor" href="#存储元素过程" aria-hidden="true">#</a> 存储元素过程</h2><p>首先我们先创建一个HashMap对象，然后使用put(key,value)方法，把元素存储在HashMap对象中，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  Map&lt;String,String&gt; map=new HashMap&lt;&gt;();
        map.put(&quot;james&quot;,&quot;1&quot;);
        map.put(&quot;kobe&quot;,&quot;1&quot;);
        map.put(&quot;robin&quot;,&quot;1&quot;);
        map.put(&quot;sam&quot;,&quot;1&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要把键值对 (“james”,”1”)存入map中，首先，根据传入的 <code>key</code> 对象计算哈希值 <code>hash</code>，计算hash的源码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> static final int hash(Object key) {
      int h;
      return (key == null) ? 0 : (h = key.hashCode()) ^ (h &gt;&gt;&gt; 16);
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>调用 <code>hash</code> 和 <code>key</code> 对象作为参数，使用 <code>table</code> 数组的长度 <code>table.length</code> 计算出键值对在 <code>table</code> 数组中的索引位置 <code>i</code>。如果该 <code>i</code> 索引位置没有键值对，则直接将键值对存储在该位置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if ((p = tab[i = (n - 1) &amp; hash]) == null){
    tab[i] = newNode(hash, key, value, null);
}
            
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果索引 <code>i</code> 处有键值对，且发生了哈希冲突，则遍历该位置上的链表或红黑树进行操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>             Node&lt;K,V&gt; e; K k;
            if (p.hash == hash &amp;&amp;
                ((k = p.key) == key || (key != null &amp;&amp; key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)
            //如果头节点上treeNode
                e = ((TreeNode&lt;K,V&gt;)p).putTreeVal(this, tab, hash, key, value);
            else {
            // 如果是链表
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount &gt;= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        		//链表转treeNode
                            treeifyBin(tab, hash);
                  
                        break;
                    }
                    if (e.hash == hash &amp;&amp;
                        ((k = e.key) == key || (key != null &amp;&amp; key.equals(k))))
    
                        break;
                    //遍历链表，根据键的值与链表或红黑树的键进行比较，如果找到相同的键，则更新其对应的值为新的 \`value\` 值。
                    p = e;
                }
            }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>遍历链表或红黑树的过程中，根据键的值与链表或红黑树的键进行比较，如果找到相同的键，则更新其对应的值为新的 <code>value</code> 值。</p><p>如果没有找到相同的键，则将新的键值对插入到链表或红黑树的头部。如果链表长度超过了阈值（默认为8），并且 <code>table</code> 数组的长度大于阈值（默认为64），则将链表转换为红黑树。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (binCount &gt;= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        		//链表转treeNode
                            treeifyBin(tab, hash);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在插入新键值对后，如果 <code>HashMap</code> 中的键值对数量超过了负载因子乘以 <code>table</code> 数组的长度，即达到了负载因子阈值，需要进行扩容操作。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> final Node&lt;K,V&gt;[] resize() {
 
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="扩容" tabindex="-1"><a class="header-anchor" href="#扩容" aria-hidden="true">#</a> 扩容</h2><p>如果需要进行扩容操作，首先会检查当前的 <code>table</code> 数组是否为 <code>null</code>，若为 <code>null</code>，则表示 <code>HashMap</code> 还未进行过初始化操作，会调用 <code>resize()</code> 方法来初始化 <code>table</code> 数组。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在进行扩容之前会将当前 <code>table</code> 数组的引用赋值给一个临时变量 <code>oldTab</code>。在扩容操作中，会根据当前的 <code>table</code> 数组长度 <code>oldCap</code> 和负载因子 <code>loadFactor</code> 计算出新数组的长度 <code>newCap</code>，通常是将 <code>oldCap</code> 扩大一倍。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> int oldCap = (oldTab == null) ? 0 : oldTab.length;
        int oldThr = threshold;
        int newCap, newThr = 0;
        if (oldCap &gt; 0) {
            if (oldCap &gt;= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
            else if ((newCap = oldCap &lt;&lt; 1) &lt; MAXIMUM_CAPACITY &amp;&amp;
                     oldCap &gt;= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr &lt;&lt; 1; // double threshold
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个新的 <code>Node[]</code> 数组，长度为 <code>newCap</code>，作为新的 <code>table</code> 数组进行存储。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  Node&lt;K,V&gt;[] newTab = (Node&lt;K,V&gt;[])new Node[newCap];
        table = newTab;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code>HashMap</code> 的当前 <code>size</code> 大于 0，则需要将旧的键值对重新分布到新的 <code>table</code> 数组中。遍历 <code>oldTab</code> 数组，将每个非空的位置上的键值对重新计算哈希值，并存储到新的 <code>table</code> 数组对应的位置。</p><p>完成键值对的重新分布后，会将新的 <code>table</code> 数组赋值给 <code>HashMap</code> 的 <code>table</code> 属性。</p><p>最后，在新的 <code>table</code> 数组中重新计算 <code>key</code> 的哈希值，并将键值对插入到对应索引位置 <code>i</code> 处。如果该位置已经有键值对，则按链表或红黑树的规则进行处理。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> if (oldTab != null) {
            for (int j = 0; j &lt; oldCap; ++j) {
                Node&lt;K,V&gt; e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash &amp; (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode&lt;K,V&gt;)e).split(this, newTab, j, oldCap);
                    else { // preserve order
                        Node&lt;K,V&gt; loHead = null, loTail = null;
                        Node&lt;K,V&gt; hiHead = null, hiTail = null;
                        Node&lt;K,V&gt; next;
                        do {
                            next = e.next;
                            if ((e.hash &amp; oldCap) == 0) {
                                if (loTail == null)
                                    loHead = e;
                                else
                                    loTail.next = e;
                                loTail = e;
                            }
                            else {
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        if (loTail != null) {
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取元素" tabindex="-1"><a class="header-anchor" href="#获取元素" aria-hidden="true">#</a> 获取元素</h2><p>在对HashMap对象查找元素的时候，我们调用的是get(Object key)。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public V get(Object key) {
    Node&lt;K, V&gt; e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>首先，根据传入的 <code>key</code> 对象计算哈希值 <code>hash</code>。</p></li><li><p>根据 <code>hash</code> 的值在 <code>table</code> 数组中找到对应的索引位置 <code>i</code>。如果该索引位置上没有键值对，则返回 <code>null</code>。</p></li><li><p>如果索引 <code>i</code> 处有键值对，且发生了哈希冲突，则遍历该位置上的链表或红黑树进行查找操作。</p></li><li><p>遍历链表或红黑树的过程中，根据键的值与链表或红黑树的键进行比较，如果找到相同的键，则返回对应的值。</p></li><li><p>如果遍历完链表或红黑树仍未找到相同的键，则返回 <code>null</code>。</p></li></ul><p>下面是 HashMap <code>get(Object key)</code> 方法的简化版源码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> e<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>e <span class="token operator">=</span> <span class="token function">getNode</span><span class="token punctuation">(</span><span class="token function">hash</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> e<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">final</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> <span class="token function">getNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> hash<span class="token punctuation">,</span> <span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab<span class="token punctuation">;</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span> first<span class="token punctuation">,</span> e<span class="token punctuation">;</span>
    <span class="token keyword">int</span> n<span class="token punctuation">;</span>
    <span class="token class-name">K</span> k<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>tab <span class="token operator">=</span> table<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>n <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
        <span class="token punctuation">(</span>first <span class="token operator">=</span> tab<span class="token punctuation">[</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> hash<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>first<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>k <span class="token operator">=</span> first<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span> <span class="token punctuation">(</span>key <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> first<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>e <span class="token operator">=</span> first<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>first <span class="token keyword">instanceof</span> <span class="token class-name">TreeNode</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span>first<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTreeNode</span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">do</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>k <span class="token operator">=</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span> <span class="token punctuation">(</span>key <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> e<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>e <span class="token operator">=</span> e<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述源码中：</p><ul><li><code>getNode(int hash, Object key)</code> 方法用于根据哈希值和键在 <code>table</code> 数组中查找并返回对应的节点。</li><li>首先将 <code>table</code> 数组赋值给 <code>tab</code> 变量，然后根据哈希值计算出索引位置 <code>((n - 1) &amp; hash)</code>，并将对应位置的第一个节点赋值给 <code>first</code> 变量。</li><li>如果 <code>first</code> 节点不为空，则首先检查 <code>first</code> 节点是否与传入的键匹配，如果匹配则直接返回 <code>first</code> 节点。</li><li>如果 <code>first</code> 节点与传入的键不匹配，则判断 <code>first</code> 节点是否为红黑树节点，如果是，则调用红黑树节点的 <code>getTreeNode()</code> 方法进行查找操作，否则使用循环遍历链表中的其他节点进行查找。</li><li>如果在链表或红黑树中找到键对应的节点，则返回对应的节点，否则返回 <code>null</code>。</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>HashMap 是 Java 中常用的哈希表实现，用于存储键值对。HashMap 提供了高效的键值对存储和查找能力。它利用哈希函数将键映射到数组的索引位置，在处理哈希冲突时，通过链表和红黑树的形式来解决。同时，HashMap 也支持动态扩容和再散列，保证了存储的键值对的分布合理性和查询性能的稳定性。</p><p>需要注意的是，HashMap不是线程安全的，不能在多个线程中操作同一个HashMap，会导致一些并发问题。如果需要在多线程中操作同一个Map，建议使用ConcurrentHashMap。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/common/wxcode.png" alt="方志朋_官方公众号" tabindex="0" loading="lazy"><figcaption>方志朋_官方公众号</figcaption></figure>`,52),p=[l];function i(o,c){return a(),s("div",null,p)}const r=n(t,[["render",i],["__file","2023-12-02-hashmap-source.html.vue"]]);export{r as default};
