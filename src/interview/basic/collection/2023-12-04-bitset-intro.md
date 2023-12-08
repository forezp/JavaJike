---
lang: zh-CN
title: BitSet使用讲解
headerDepth: 1
order: 1
icon: jingquezhunque
collapsible: false
description: BitSet使用讲解
---

## 类结构关系

Java提供了BitSet来实现位图，BitSet是采用一个long型的数组来实现位图的，每个 long 变量都包含了 64 个位。BitSet的继承关系结构图如下：

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/3/image-20231203200521458.png" alt="image-20231203200521458" style="zoom:66%;" />

- BitSet实现了Cloneable接口，表明HashMap支持克隆。
- BitSet实现了Serializable接口，表明HashSet支持序列，可以将HashSet以流的形式通过ObjesctInputStream/ObjectOutputStream来写/读。



## BitSet介绍

BitSet的优点就是省内存，举个简单的例子来说明吧。

> 比如说有这么个场景：股票的的交易日记为1，休息日记为0，
> 那要记录一整年的数据，那就是 365 个数字，由1和0组成。
> 若数字是 int 类型，那 365 个数字，就是 1460 字节。
> 如果用 BitSet 来记录，理论上 48 个字节就可以了。

BitSet 使用 long 数组来记录数据，long 有8 个字节、64 位，每位可对应一天的数据。
比如第1天是交易日，在 long 的第 1 位，记录为 1，
第2天是休息日，在 long 的第 2 位，记录为 0，
以此类推，365 天， 6 个 long 就搞定。


`BitSet`中底层的存储结构选用了`long`数组，一个`long`整数占`64`比特，位长是一个`byte`整数的`8`倍，在需要处理的数据范围比较大的场景下可以有效减少扩容的次数。`BitSet`顶部有一些关于其设计上的注释，这里简单罗列概括成几点：

- `BitSet`是可增长比特向量的一个实现，设计上每个比特都是一个布尔值，比特的逻辑索引是非负整数
- `BitSet`的所有比特的初始化值为`false`（整数`0`）
- `BitSet`的`size`属性与其实现有关，`length`属性（比特表的逻辑长度）与实现无关
- `BitSet`在设计上是非线程安全，多线程环境下需要额外的同步处理

## BitSet的简单使用

BitSet 类的UML图如下图所示：

```
---------------------
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
```

- `BitSet` 类内部维护了一个 `long` 类型的数组 `words`，用来存储位信息。每个 `long` 值都可以容纳 64 个位。
- `wordsInUse` 表示实际用于存储位信息的 `words` 数组的大小。
- `size` 表示 `BitSet` 的位数，即总共能表示的位的数量。

以下是一些常用的 `BitSet` 方法和用法示例：

```java
import java.util.BitSet;

public class BitSetExample {
    public static void main(String[] args) {
        BitSet bitSet = new BitSet(16);

        // 设置位
        bitSet.set(1);
        bitSet.set(3);
        bitSet.set(5);
        bitSet.set(7);

        // 获取位值
        boolean value = bitSet.get(3);
        System.out.println("Bit at index 3: " + value); // 输出 true

        // 清除位
        bitSet.clear(3);
        System.out.println("Bit at index 3: " + bitSet.get(3)); // 输出 false

        // 位运算操作
        BitSet anotherBitSet = new BitSet(16);
        anotherBitSet.set(3);
        anotherBitSet.set(7);

        // OR 操作
        bitSet.or(anotherBitSet);

        // 遍历位集合
        for (int i = 0; i < bitSet.size(); i++) {
            boolean bit = bitSet.get(i);
            System.out.println("Bit at index " + i + ": " + bit);
        }
    }
}
```

以上示例代码演示了 BitSet 的基本用法，包括设置位、获取位值、清除位、位运算等操作。

## 使用场景

- 常见的应用是那些需要对海量数据进行一些统计工作的时候，比如日志分析、用户数统计等等

- 如统计40亿个数据中没有出现的数据，将40亿个不同数据进行排序等。

- 现在有1千万个随机数，随机数的范围在1到1亿之间。现在要求写出一种算法，将1到1亿之间没有在随机数中的数求出来

## 代码示例

```
package util;
 
import java.util.Arrays;
import java.util.BitSet;
 
public class BitSetDemo {
 
	/**
	 * 求一个字符串包含的char
	 * 
	 */
	public static void containChars(String str) {
		BitSet used = new BitSet();
		for (int i = 0; i < str.length(); i++)
			used.set(str.charAt(i)); // set bit for char
 
		StringBuilder sb = new StringBuilder();
		sb.append("[");
		int size = used.size();
		System.out.println(size);
		for (int i = 0; i < size; i++) {
			if (used.get(i)) {
				sb.append((char) i);
			}
		}
		sb.append("]");
		System.out.println(sb.toString());
	}
 
	/**
	 * 求素数 有无限个。一个大于1的自然数，如果除了1和它本身外，不能被其他自然数整除(除0以外）的数称之为素数(质数） 否则称为合数
	 */
	public static void computePrime() {
		BitSet sieve = new BitSet(1024);
		int size = sieve.size();
		for (int i = 2; i < size; i++)
			sieve.set(i);
		int finalBit = (int) Math.sqrt(sieve.size());
 
		for (int i = 2; i < finalBit; i++)
			if (sieve.get(i))
				for (int j = 2 * i; j < size; j += i)
					sieve.clear(j);
 
		int counter = 0;
		for (int i = 1; i < size; i++) {
			if (sieve.get(i)) {
				System.out.printf("%5d", i);
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
		BitSet bitSet = new BitSet(2 << 13);
		// 虽然可以自动扩容，但尽量在构造时指定估算大小,默认为64
		System.out.println("BitSet size: " + bitSet.size());
 
		for (int i = 0; i < array.length; i++) {
			bitSet.set(array[i]);
		}
		//剔除重复数字后的元素个数
		int bitLen=bitSet.cardinality();	
 
		//进行排序，即把bit为true的元素复制到另一个数组
		int[] orderedArray = new int[bitLen];
		int k = 0;
		for (int i = bitSet.nextSetBit(0); i >= 0; i = bitSet.nextSetBit(i + 1)) {
			orderedArray[k++] = i;
		}
 
		System.out.println("After ordering: ");
		for (int i = 0; i < bitLen; i++) {
			System.out.print(orderedArray[i] + "\t");
		}
		
		System.out.println("iterate over the true bits in a BitSet");
		//或直接迭代BitSet中bit为true的元素iterate over the true bits in a BitSet
		for (int i = bitSet.nextSetBit(0); i >= 0; i = bitSet.nextSetBit(i + 1)) {
			System.out.print(i+"\t");
		}
		System.out.println("---------------------------");
	}
	
	/**
	 * 将BitSet对象转化为ByteArray
	 * @param bitSet
	 * @return
	 */
	public static byte[] bitSet2ByteArray(BitSet bitSet) {
        byte[] bytes = new byte[bitSet.size() / 8];
        for (int i = 0; i < bitSet.size(); i++) {
            int index = i / 8;
            int offset = 7 - i % 8;
            bytes[index] |= (bitSet.get(i) ? 1 : 0) << offset;
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
        for (int i = 0; i < bytes.length; i++) {
            for (int j = 7; j >= 0; j--) {
                bitSet.set(index++, (bytes[i] & (1 << j)) >> j == 1 ? true
                        : false);
            }
        }
        return bitSet;
    }
	
}
```



## 参考

https://zhuanlan.zhihu.com/p/520277367?utm_id=0