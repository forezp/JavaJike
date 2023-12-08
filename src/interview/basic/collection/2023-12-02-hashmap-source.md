---
lang: zh-CN
title: HashMap原理解析
headerDepth: 1
order: 1
icon: jiangben
collapsible: false
description: HashMap原理解析
---



## HashMap的类结构图

HashMap 是 java 集合框架中用于存储双列数据的散列表，应用非常的广泛。HashMap的类结构图如下：

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/2/image-20231202113045647.png" alt="image-20231202113045647" style="zoom:50%;" />





- HashMap继承了AbstractMap类并实现类Map接口，所以HashMap具有了AbstractMap和Map的功能。

- HashMap实现了Cloneable接口，表明HashMap支持克隆。
- HashMap实现了Serializable接口，表明HashMap支持序列，可以将HashMap以流的形式通过ObjectInputStream/ObjectOutputStream来写/读。

## HashMap的底层数据结构



 HashMap 的的底层数据结构为数组+链表（或者红黑树）结构，如下图所示：



<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/2/image-20231202112718275.png" alt="image-20231202112718275" style="zoom:50%;" />





`HashMap` 通过 `Node` 类来存储键值对（`K` 表示键的类型，`V` 表示值的类型）。每个 `Node` 对象包含了键、值以及指向下一个 `Node` 的引用。

在 JDK 8 以后的版本中，如果链表长度超过阈值（默认为8），且 HashMap 的容量达到了一个较大的值（默认为64），则部分链表节点会转换为红黑树。这些红黑树节点被实现为 `TreeNode` 类，它拓展自 `Node` 类。



## 构造函数



HashMap 有两种构造函数：无参构造函数和带初始容量和负载因子的构造函数。无参构造函数创建一个初始容量为16，负载因子为0.75的 HashMap 对象。

```java
public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
    threshold = tableSizeFor(INITIAL_CAPACITY);
}
```

带参构造函数接收初始容量 `initialCapacity` 和负载因子 `loadFactor` 作为参数，创建一个 HashMap 对象。

```java
public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " + loadFactor);

    this.loadFactor = loadFactor;
    threshold = tableSizeFor(initialCapacity);
}
```

`tableSizeFor(initialCapacity)` 方法用于计算大于等于给定容量的最小 2 的幂。



## 存储元素过程

首先我们先创建一个HashMap对象，然后使用put(key,value)方法，把元素存储在HashMap对象中，代码如下：

```
  Map<String,String> map=new HashMap<>();
        map.put("james","1");
        map.put("kobe","1");
        map.put("robin","1");
        map.put("sam","1");
```

要把键值对 (“james”,”1”)存入map中，首先，根据传入的 `key` 对象计算哈希值 `hash`，计算hash的源码如下：

```
 static final int hash(Object key) {
      int h;
      return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
 }
```

调用 `hash` 和 `key` 对象作为参数，使用 `table` 数组的长度 `table.length` 计算出键值对在 `table` 数组中的索引位置 `i`。如果该 `i` 索引位置没有键值对，则直接将键值对存储在该位置。

```
if ((p = tab[i = (n - 1) & hash]) == null){
    tab[i] = newNode(hash, key, value, null);
}
            
```

如果索引 `i` 处有键值对，且发生了哈希冲突，则遍历该位置上的链表或红黑树进行操作。

```
             Node<K,V> e; K k;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)
            //如果头节点上treeNode
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
            // 如果是链表
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        		//链表转treeNode
                            treeifyBin(tab, hash);
                  
                        break;
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
    
                        break;
                    //遍历链表，根据键的值与链表或红黑树的键进行比较，如果找到相同的键，则更新其对应的值为新的 `value` 值。
                    p = e;
                }
            }
```

遍历链表或红黑树的过程中，根据键的值与链表或红黑树的键进行比较，如果找到相同的键，则更新其对应的值为新的 `value` 值。



如果没有找到相同的键，则将新的键值对插入到链表或红黑树的头部。如果链表长度超过了阈值（默认为8），并且 `table` 数组的长度大于阈值（默认为64），则将链表转换为红黑树。

```
if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        		//链表转treeNode
                            treeifyBin(tab, hash);

```

在插入新键值对后，如果 `HashMap` 中的键值对数量超过了负载因子乘以 `table` 数组的长度，即达到了负载因子阈值，需要进行扩容操作。

```
 final Node<K,V>[] resize() {
 
 }
```



## 扩容

如果需要进行扩容操作，首先会检查当前的 `table` 数组是否为 `null`，若为 `null`，则表示 `HashMap` 还未进行过初始化操作，会调用 `resize()` 方法来初始化 `table` 数组。

```
if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
```

在进行扩容之前会将当前 `table` 数组的引用赋值给一个临时变量 `oldTab`。在扩容操作中，会根据当前的 `table` 数组长度 `oldCap` 和负载因子 `loadFactor` 计算出新数组的长度 `newCap`，通常是将 `oldCap` 扩大一倍。

```
 int oldCap = (oldTab == null) ? 0 : oldTab.length;
        int oldThr = threshold;
        int newCap, newThr = 0;
        if (oldCap > 0) {
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                     oldCap >= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr << 1; // double threshold
        }
```

创建一个新的 `Node[]` 数组，长度为 `newCap`，作为新的 `table` 数组进行存储。

```
  Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
        table = newTab;
```



如果 `HashMap` 的当前 `size` 大于 0，则需要将旧的键值对重新分布到新的 `table` 数组中。遍历 `oldTab` 数组，将每个非空的位置上的键值对重新计算哈希值，并存储到新的 `table` 数组对应的位置。

完成键值对的重新分布后，会将新的 `table` 数组赋值给 `HashMap` 的 `table` 属性。

最后，在新的 `table` 数组中重新计算 `key` 的哈希值，并将键值对插入到对应索引位置 `i` 处。如果该位置已经有键值对，则按链表或红黑树的规则进行处理。

```
 if (oldTab != null) {
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash & (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { // preserve order
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;
                            if ((e.hash & oldCap) == 0) {
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
```



## 获取元素

在对HashMap对象查找元素的时候，我们调用的是get(Object key)。

```
public V get(Object key) {
    Node<K, V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

```

- 首先，根据传入的 `key` 对象计算哈希值 `hash`。

- 根据 `hash` 的值在 `table` 数组中找到对应的索引位置 `i`。如果该索引位置上没有键值对，则返回 `null`。
- 如果索引 `i` 处有键值对，且发生了哈希冲突，则遍历该位置上的链表或红黑树进行查找操作。
- 遍历链表或红黑树的过程中，根据键的值与链表或红黑树的键进行比较，如果找到相同的键，则返回对应的值。
- 如果遍历完链表或红黑树仍未找到相同的键，则返回 `null`。

下面是 HashMap `get(Object key)` 方法的简化版源码：

```java
public V get(Object key) {
    Node<K, V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K, V> getNode(int hash, Object key) {
    Node<K, V>[] tab;
    Node<K, V> first, e;
    int n;
    K k;

    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        if (first.hash == hash && ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            if (first instanceof TreeNode)
                return ((TreeNode<K, V>)first).getTreeNode(hash, key);
            do {
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

在上述源码中：

- `getNode(int hash, Object key)` 方法用于根据哈希值和键在 `table` 数组中查找并返回对应的节点。
- 首先将 `table` 数组赋值给 `tab` 变量，然后根据哈希值计算出索引位置 `((n - 1) & hash)`，并将对应位置的第一个节点赋值给 `first` 变量。
- 如果 `first` 节点不为空，则首先检查 `first` 节点是否与传入的键匹配，如果匹配则直接返回 `first` 节点。
- 如果 `first` 节点与传入的键不匹配，则判断 `first` 节点是否为红黑树节点，如果是，则调用红黑树节点的 `getTreeNode()` 方法进行查找操作，否则使用循环遍历链表中的其他节点进行查找。
- 如果在链表或红黑树中找到键对应的节点，则返回对应的节点，否则返回 `null`。



## 总结

HashMap 是 Java 中常用的哈希表实现，用于存储键值对。HashMap 提供了高效的键值对存储和查找能力。它利用哈希函数将键映射到数组的索引位置，在处理哈希冲突时，通过链表和红黑树的形式来解决。同时，HashMap 也支持动态扩容和再散列，保证了存储的键值对的分布合理性和查询性能的稳定性。

需要注意的是，HashMap不是线程安全的，不能在多个线程中操作同一个HashMap，会导致一些并发问题。如果需要在多线程中操作同一个Map，建议使用ConcurrentHashMap。

