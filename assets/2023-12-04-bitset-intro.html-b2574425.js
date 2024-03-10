import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as i,c as a,a as n,b as l,d as c,f as d}from"./app-706af41e.js";const o={},p=d(`<h2 id="类结构关系" tabindex="-1"><a class="header-anchor" href="#类结构关系" aria-hidden="true">#</a> 类结构关系</h2><p>Java提供了BitSet来实现位图，BitSet是采用一个long型的数组来实现位图的，每个 long 变量都包含了 64 个位。BitSet的继承关系结构图如下：</p><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/3/image-20231203200521458.png" alt="image-20231203200521458" style="zoom:66%;"><ul><li>BitSet实现了Cloneable接口，表明HashMap支持克隆。</li><li>BitSet实现了Serializable接口，表明HashSet支持序列，可以将HashSet以流的形式通过ObjesctInputStream/ObjectOutputStream来写/读。</li></ul><h2 id="bitset介绍" tabindex="-1"><a class="header-anchor" href="#bitset介绍" aria-hidden="true">#</a> BitSet介绍</h2><p>BitSet的优点就是省内存，举个简单的例子来说明吧。</p><blockquote><p>比如说有这么个场景：股票的的交易日记为1，休息日记为0，<br> 那要记录一整年的数据，那就是 365 个数字，由1和0组成。<br> 若数字是 int 类型，那 365 个数字，就是 1460 字节。<br> 如果用 BitSet 来记录，理论上 48 个字节就可以了。</p></blockquote><p>BitSet 使用 long 数组来记录数据，long 有8 个字节、64 位，每位可对应一天的数据。<br> 比如第1天是交易日，在 long 的第 1 位，记录为 1，<br> 第2天是休息日，在 long 的第 2 位，记录为 0，<br> 以此类推，365 天， 6 个 long 就搞定。</p><p><code>BitSet</code>中底层的存储结构选用了<code>long</code>数组，一个<code>long</code>整数占<code>64</code>比特，位长是一个<code>byte</code>整数的<code>8</code>倍，在需要处理的数据范围比较大的场景下可以有效减少扩容的次数。<code>BitSet</code>顶部有一些关于其设计上的注释，这里简单罗列概括成几点：</p><ul><li><code>BitSet</code>是可增长比特向量的一个实现，设计上每个比特都是一个布尔值，比特的逻辑索引是非负整数</li><li><code>BitSet</code>的所有比特的初始化值为<code>false</code>（整数<code>0</code>）</li><li><code>BitSet</code>的<code>size</code>属性与其实现有关，<code>length</code>属性（比特表的逻辑长度）与实现无关</li><li><code>BitSet</code>在设计上是非线程安全，多线程环境下需要额外的同步处理</li></ul><h2 id="bitset的简单使用" tabindex="-1"><a class="header-anchor" href="#bitset的简单使用" aria-hidden="true">#</a> BitSet的简单使用</h2><p>BitSet 类的UML图如下图所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---------------------
|     BitSet       |
---------------------
| - long[] words   |
| - int wordsInUse |
| - int size       |
---------------------
| + and(BitSet set)|
| + or(BitSet set) |
| + xor(BitSet set)|
| + set(int bitIndex)|
| + set(int bitIndex, boolean value)|
| + get(int bitIndex)|
| + clear(int bitIndex)|
| + cardinality()  |
| + isEmpty()      |
| + size()         |
| + length()       |
| + toByteArray()  |
| + toString()     |
| + stream()       |
---------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>BitSet</code> 类内部维护了一个 <code>long</code> 类型的数组 <code>words</code>，用来存储位信息。每个 <code>long</code> 值都可以容纳 64 个位。</li><li><code>wordsInUse</code> 表示实际用于存储位信息的 <code>words</code> 数组的大小。</li><li><code>size</code> 表示 <code>BitSet</code> 的位数，即总共能表示的位的数量。</li></ul><p>以下是一些常用的 <code>BitSet</code> 方法和用法示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">BitSet</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BitSetExample</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">BitSet</span> bitSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BitSet</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置位</span>
        bitSet<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bitSet<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bitSet<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        bitSet<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获取位值</span>
        <span class="token keyword">boolean</span> value <span class="token operator">=</span> bitSet<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Bit at index 3: &quot;</span> <span class="token operator">+</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 true</span>

        <span class="token comment">// 清除位</span>
        bitSet<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Bit at index 3: &quot;</span> <span class="token operator">+</span> bitSet<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出 false</span>

        <span class="token comment">// 位运算操作</span>
        <span class="token class-name">BitSet</span> anotherBitSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BitSet</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        anotherBitSet<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        anotherBitSet<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// OR 操作</span>
        bitSet<span class="token punctuation">.</span><span class="token function">or</span><span class="token punctuation">(</span>anotherBitSet<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 遍历位集合</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> bitSet<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">boolean</span> bit <span class="token operator">=</span> bitSet<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Bit at index &quot;</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">&quot;: &quot;</span> <span class="token operator">+</span> bit<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上示例代码演示了 BitSet 的基本用法，包括设置位、获取位值、清除位、位运算等操作。</p><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><ul><li><p>常见的应用是那些需要对海量数据进行一些统计工作的时候，比如日志分析、用户数统计等等</p></li><li><p>如统计40亿个数据中没有出现的数据，将40亿个不同数据进行排序等。</p></li><li><p>现在有1千万个随机数，随机数的范围在1到1亿之间。现在要求写出一种算法，将1到1亿之间没有在随机数中的数求出来</p></li></ul><h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package util;
 
import java.util.Arrays;
import java.util.BitSet;
 
public class BitSetDemo {
 
	/**
	 * 求一个字符串包含的char
	 * 
	 */
	public static void containChars(String str) {
		BitSet used = new BitSet();
		for (int i = 0; i &lt; str.length(); i++)
			used.set(str.charAt(i)); // set bit for char
 
		StringBuilder sb = new StringBuilder();
		sb.append(&quot;[&quot;);
		int size = used.size();
		System.out.println(size);
		for (int i = 0; i &lt; size; i++) {
			if (used.get(i)) {
				sb.append((char) i);
			}
		}
		sb.append(&quot;]&quot;);
		System.out.println(sb.toString());
	}
 
	/**
	 * 求素数 有无限个。一个大于1的自然数，如果除了1和它本身外，不能被其他自然数整除(除0以外）的数称之为素数(质数） 否则称为合数
	 */
	public static void computePrime() {
		BitSet sieve = new BitSet(1024);
		int size = sieve.size();
		for (int i = 2; i &lt; size; i++)
			sieve.set(i);
		int finalBit = (int) Math.sqrt(sieve.size());
 
		for (int i = 2; i &lt; finalBit; i++)
			if (sieve.get(i))
				for (int j = 2 * i; j &lt; size; j += i)
					sieve.clear(j);
 
		int counter = 0;
		for (int i = 1; i &lt; size; i++) {
			if (sieve.get(i)) {
				System.out.printf(&quot;%5d&quot;, i);
				if (++counter % 15 == 0)
					System.out.println();
			}
		}
		System.out.println();
	}
	
	/**
	 * 进行数字排序
	 */
	public static void sortArray() {
		int[] array = new int[] { 423, 700, 9999, 2323, 356, 6400, 1,2,3,2,2,2,2 };
		BitSet bitSet = new BitSet(2 &lt;&lt; 13);
		// 虽然可以自动扩容，但尽量在构造时指定估算大小,默认为64
		System.out.println(&quot;BitSet size: &quot; + bitSet.size());
 
		for (int i = 0; i &lt; array.length; i++) {
			bitSet.set(array[i]);
		}
		//剔除重复数字后的元素个数
		int bitLen=bitSet.cardinality();	
 
		//进行排序，即把bit为true的元素复制到另一个数组
		int[] orderedArray = new int[bitLen];
		int k = 0;
		for (int i = bitSet.nextSetBit(0); i &gt;= 0; i = bitSet.nextSetBit(i + 1)) {
			orderedArray[k++] = i;
		}
 
		System.out.println(&quot;After ordering: &quot;);
		for (int i = 0; i &lt; bitLen; i++) {
			System.out.print(orderedArray[i] + &quot;\\t&quot;);
		}
		
		System.out.println(&quot;iterate over the true bits in a BitSet&quot;);
		//或直接迭代BitSet中bit为true的元素iterate over the true bits in a BitSet
		for (int i = bitSet.nextSetBit(0); i &gt;= 0; i = bitSet.nextSetBit(i + 1)) {
			System.out.print(i+&quot;\\t&quot;);
		}
		System.out.println(&quot;---------------------------&quot;);
	}
	
	/**
	 * 将BitSet对象转化为ByteArray
	 * @param bitSet
	 * @return
	 */
	public static byte[] bitSet2ByteArray(BitSet bitSet) {
        byte[] bytes = new byte[bitSet.size() / 8];
        for (int i = 0; i &lt; bitSet.size(); i++) {
            int index = i / 8;
            int offset = 7 - i % 8;
            bytes[index] |= (bitSet.get(i) ? 1 : 0) &lt;&lt; offset;
        }
        return bytes;
    }
 
	/**
	 * 将ByteArray对象转化为BitSet
	 * @param bytes
	 * @return
	 */
    public static BitSet byteArray2BitSet(byte[] bytes) {
        BitSet bitSet = new BitSet(bytes.length * 8);
        int index = 0;
        for (int i = 0; i &lt; bytes.length; i++) {
            for (int j = 7; j &gt;= 0; j--) {
                bitSet.set(index++, (bytes[i] &amp; (1 &lt;&lt; j)) &gt;&gt; j == 1 ? true
                        : false);
            }
        }
        return bitSet;
    }
	
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,22),u={href:"https://zhuanlan.zhihu.com/p/520277367?utm_id=0",target:"_blank",rel:"noopener noreferrer"};function r(v,b){const s=e("ExternalLinkIcon");return i(),a("div",null,[p,n("p",null,[n("a",u,[l("https://zhuanlan.zhihu.com/p/520277367?utm_id=0"),c(s)])])])}const S=t(o,[["render",r],["__file","2023-12-04-bitset-intro.html.vue"]]);export{S as default};
