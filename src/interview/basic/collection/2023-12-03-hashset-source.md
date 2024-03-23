---
lang: zh-CN
title: HashSet原理解析
headerDepth: 1
order: 1
icon: jingquezhunque
collapsible: false
description: HashSet原理解析
---

## 类结构图

HashSet 是 java 集合框架中用于存储单列数据。不同于ArrayList可以存储重复元素，HashSet存储的元素不会重复。下面是HashSet的类结构图：

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/3/截屏2023-12-03 15.13.47.png" alt="截屏2023-12-03 15.13.47" style="zoom:50%;" />



- HashSet继承了AbstractSet类并实现类Set接口，所以HashSet具有了AbstractSet和Set的功能。

- HashSet实现了Cloneable接口，表明HashMap支持克隆。
- HashSet实现了Serializable接口，表明HashSet支持序列，可以将HashSet以流的形式通过ObjesctInputStream/ObjectOutputStream来写/读。

## 底层数据结构

HashSet 的底层数据结构是基于 HashMap 实现的。在 HashSet 中，实际上是使用 HashSet 的元素作为 HashMap 的键（key），并将一个固定的对象作为 HashMap 的值（value）。

在 HashSet 中，所有元素都会被映射到 HashMap 中的不同键上（通过 hashCode 和 equals 方法进行判断），因为 HashMap 不允许存在重复的键，所以它天然的保证了 HashSet 中元素的唯一性。



![img](https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/3/1945524-20210708224827426-1261427530.jpg)



HashSet使用HashMap作为底层存储数据的结构，既保存了数组查询和修改元素效率快的优点，也保存了链表在添加和删除元素时效率快的特点。

HashSet 的性能取决于哈希函数的质量和哈希表的大小。一般情况下，HashSet 的查找、添加和删除操作的时间复杂度为 O(1)。

但同时HashSet和HashMap一样，是线程安全的。

## 简单示例

使用代码示例如下：

```
 public static void main(String[] args) {
        Set<String> set=new HashSet<>();
        set.add("1");
        set.add("2");
        set.add("3");
        set.add("3");
        set.add("1");
        for (String s:
             set) {
            System.out.println(s);
        }
    }
```

执行上面代码输出：

>1
>2
>3



## 源码解析



### 构造函数

1. 无参构造函数

HashSet 类有多个构造函数，下面我们来分析其中一个常用的构造函数:

```java
public HashSet() {
    map = new HashMap<>();
}
```

- 这个构造函数没有参数，用于创建一个空的 HashSet 对象。
- 在构造函数中，通过 `new HashMap<>()` 创建了一个新的 HashMap 对象，并将其赋值给 HashSet 内部的 `map` 成员变量。
- HashSet 的元素将会以键的形式存储在 HashMap 中，而 HashMap 的值则被忽略，只使用键来判断元素的唯一性。

2. 传递一个集合参数的构造函数

```java
/**
 * 可以将集合中的数据全部添加到新创建的HashSet集合中，会去除掉重复的值。
 * @param  c   
 */
public HashSet(Collection<? extends E> c) {
    map = new HashMap<>(Math.max((int) (c.size()/.75f) + 1, 16));
    addAll(c);
}
```



## 添加元素

HashSet 的元素添加操作是通过调用 HashMap 的 `put` 方法实现的。下面是 HashSet 的 `add` 方法的源码：

```java
public boolean add(E e) {
    return map.put(e, PRESENT) == null;
}
```

- `add` 方法接受一个元素 `e` 作为参数，并返回一个布尔值，表示添加元素是否成功。
- 在方法内部，通过调用 HashMap 的 `put` 方法将元素 `e` 作为键、一个固定的占位符对象（比如 `PRESENT`）作为值存储在 HashMap 中。
- 当调用 `put` 方法时，如果 HashMap 中之前不存在相同的键，那么会返回 `null`，表示添加成功。
- 如果 HashMap 中已经存在相同的键，那么会将新的值替换旧的值，并返回旧的值。但在 HashSet 中，我们并不关心值的内容，只关心添加操作是否成功。所以，当返回值不为 `null` 时，表示已经存在相同的元素，添加失败。
- `add` 方法最后根据 `put` 方法的返回结果，返回一个布尔值，表示添加操作是否成功。



## 查找元素

HashSet 的 `contains(Object o)` 方法用于检查 HashSet 中是否包含指定的元素。下面是 `contains` 方法的源码分析：

```java
public boolean contains(Object o) {
    return map.containsKey(o);
}
```

- `contains` 方法接受一个对象 `o` 作为参数，并返回一个布尔值，表示 HashSet 是否包含该对象。
- 在方法内部，它调用 HashMap 的 `containsKey` 方法来判断 HashMap 中是否包含指定的键 `o`（即是否存在指定的元素）。
- `containsKey` 方法会根据指定键的哈希值和相等性判断，检查 HashMap 中是否存在该键。如果存在，则返回 `true`；否则返回 `false`。
- 因为 HashSet 的元素被存储为 HashMap 的键，而值则被忽略。所以，如果 HashMap 中存在指定的键，即表示 HashSet 中包含指定的元素。
- `contains` 方法最终返回 `containsKey` 方法的结果。



## 删除元素

HashSet 的元素删除操作是通过调用 HashMap 的 `remove` 方法实现的。下面是 HashSet 的 `remove` 方法的源码分析：

```java
public boolean remove(Object o) {
    return map.remove(o) == PRESENT;
}
```

- `remove` 方法接受一个对象 `o` 作为参数，并返回一个布尔值，表示删除操作是否成功。
- 在方法内部，它调用 HashMap 的 `remove` 方法来删除 HashMap 中指定键 `o` 对应的键值对。
- `remove` 方法会根据指定键的哈希值和相等性判断，在 HashMap 中找到对应的键值对并删除。如果删除成功，则返回被删除的值；否则返回 `null`。
- 因为 HashSet 的元素被存储为 HashMap 的键，而值则被忽略。所以，当调用 `remove` 方法成功时，返回的值应该是固定的占位符对象（比如 `PRESENT`），表示删除成功。
- `remove` 方法将 `remove` 方法的返回值与固定的占位符对象 `PRESENT` 进行比较。如果相等，则表示删除操作成功。



## 总结

HashSet 是一种无序、唯一性的集合实现。它基于哈希表的数据结构，通过使用 HashMap 来存储元素，并具有很好的性能特性。

HashSet 是非线程安全的，如果在多线程环境下使用 HashSet，需要进行同步处理或使用线程安全的替代品，如 `ConcurrentHashSet`

<!-- @include: @article-footer.snippet.md -->