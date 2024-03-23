---
lang: zh-CN
title: Java Collection概述
headerDepth: 1
order: 1
icon: banquan
collapsible: false
description: Java Collection概述
---

# Java Collection概述

Java Collection 集合是 Java 编程语言中用于存储和操作对象的框架。它提供了一组接口和类，用于处理不同类型的集合，如List、Set、Queue、Map等。

下面是Java Collection 框架的一些关键概念：

1. 集合接口（Collection Interface）：是 Java Collection 框架的根接口，它定义了集合的基本操作，如添加、删除、遍历等。常见的集合接口包括 List、Set 和 Queue。

2. 列表（List）：以有序的方式存储对象的集合，允许重复元素。常见的列表实现类有 ArrayList 和 LinkedList。

3. 集（Set）：以无序的方式存储对象的集合，不允许重复元素。常见的集实现类有 HashSet 和 TreeSet。

4. 队列（Queue）：一种先进先出（FIFO）的数据结构，用于保存元素并控制元素的插入、删除操作。常见的队列实现类有 LinkedList 和 PriorityQueue。

5. 散列（Map）：以键值对（Key-Value）的形式存储数据，每个键都是唯一的。常见的映射实现类有 HashMap 和 TreeMap。它是Collection框架的一部分，虽然它不是Collection Interface的继承接口。

Java Collection 框架的类的思维导图如下：

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/11/26/image-20231126200748131.png" alt="image-20231126200748131" style="zoom:50%;" />

## List 接口

Java 的 List 接口是 Collection 接口的继承接口之一，用于表示有序的元素集合，允许元素的重复。List 接口中的元素按照插入的顺序存储，并且可以通过索引进行访问和操作。

List 接口的主要特点包括：

1. 有序性：List 中的元素按照插入的顺序进行存储，元素的顺序可以根据插入和删除操作的顺序动态改变。

2. 可重复性：List 允许包含重复的元素，相同的元素可以出现在列表的不同位置。

3. 可变大小：List 的大小可以根据需要进行动态调整，可以添加或删除元素。

List 接口定义了很多常用的方法，用于添加、删除、获取和操作列表中的元素。例如：

- 添加元素：使用 add、addAll 方法将元素或集合添加到列表中。
- 删除元素：使用 remove、removeAll 方法删除指定元素或集合中的元素。
- 获取元素：使用 get、indexOf、lastIndexOf 方法获取元素或元素的索引。
- 修改元素：使用 set 方法修改列表中指定位置的元素。
- 列表操作：使用 subList、sort、reverse 方法实现对列表的操作，如截取子列表、排序、反转等。
- 遍历列表：使用迭代器、增强的 for 循环或 forEach 方法遍历列表中的元素。

举个例子演示如何使用 List 接口：

```java
import java.util.ArrayList;
import java.util.List;

public class ListExample {
    public static void main(String[] args) {
        // 创建一个 List 对象
        List<String> fruits = new ArrayList<>();

        // 添加元素到列表中
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Mango");

        // 获取列表的大小
        int size = fruits.size();
        System.out.println("List size: " + size);

        // 访问列表中的元素
        String firstFruit = fruits.get(0);
        System.out.println("First fruit: " + firstFruit);

        // 遍历列表中的元素
        System.out.println("Fruits:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // 检查列表中是否包含某个元素
        boolean containsApple = fruits.contains("Apple");
        System.out.println("Contains Apple? " + containsApple);

        // 修改列表中的元素
        fruits.set(1, "Grapes");
        System.out.println("Updated list:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // 删除列表中的元素
        fruits.remove(2);
        System.out.println("Updated list after removing element:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // 清空列表
        fruits.clear();
        System.out.println("List is empty? " + fruits.isEmpty());
    }
}
```

运行以上代码，将会输出以下结果：

```
List size: 4
First fruit: Apple
Fruits:
Apple
Banana
Orange
Mango
Contains Apple? true
Updated list:
Apple
Grapes
Orange
Mango
Updated list after removing element:
Apple
Grapes
Mango
List is empty? true
```



## Set接口

Set 接口是 Collection 接口的子接口之一，用于存储不重复的元素。Set 中的元素没有固定的顺序，且不允许包含重复的元素。

Set 接口的主要特点包括：

1. 不重复性：Set 中的元素是唯一的，不会包含重复的元素。添加重复元素时，添加操作会失败并返回 false。

2. 无序性：Set 中的元素没有固定的顺序。具体的排列顺序可能因实现类或元素的添加顺序而不同。

3. 快速查找：Set 提供了高效的查找操作，可以快速判断一个元素是否存在于集合中。

Set 接口继承自 Collection 接口，因此包含了一些常用的方法，例如添加元素、删除元素、判断元素是否存在、获取集合大小等。

举个简单的示例，演示如何使用 Set 接口：

```java
import java.util.HashSet;
import java.util.Set;

public class SetExample {
    public static void main(String[] args) {
        // 创建一个 Set 对象
        Set<String> names = new HashSet<>();

        // 添加元素到集合中
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        names.add("Bob"); // 重复元素，将不会被添加进去

        // 获取集合的大小
        int size = names.size();
        System.out.println("Set size: " + size);

        // 遍历集合中的元素
        System.out.println("Names:");
        for (String name : names) {
            System.out.println(name);
        }

        // 检查集合中是否包含某个元素
        boolean containsBob = names.contains("Bob");
        System.out.println("Contains Bob? " + containsBob);

        // 从集合中删除元素
        names.remove("Charlie");
        System.out.println("Updated set:");
        for (String name : names) {
            System.out.println(name);
        }

        // 清空集合
        names.clear();
        System.out.println("Set is empty? " + names.isEmpty());
    }
}
```

运行以上代码，将会输出以下结果：

```
Set size: 3
Names:
Bob
Charlie
Alice
Contains Bob? true
Updated set:
Bob
Alice
Set is empty? true
```

上面的例子演示了如何创建 Set 对象，添加、获取、遍历和删除集合中的元素，以及判断集合是否为空。



## Map接口

Map 接口是集合框架中用于存储键值对（Key-Value）的映射关系。每个键值对都是一个条目（Entry），键是唯一的，值可以重复。它和Collection接口属于并列的关系。

Map 接口的主要特点如下：

1. 键的唯一性：Map 中的键是唯一的，不允许重复。如果使用相同的键插入多个值，后面的值会覆盖前面的值。

2. 快速查找：Map 提供了根据键快速查找对应值的方法。

3. 无固定顺序：Map 中的键值对没有固定的顺序。具体的迭代顺序可能因实现类或元素的插入顺序而不同。

Map 接口定义了常用的操作方法，例如添加键值对、删除键值对、获取键值对数量、按键查找值等。常用的 Map 接口的实现类有 HashMap、LinkedHashMap 和 TreeMap。

举个例子演示如何使用 HashMap：

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        // 创建一个 HashMap 对象
        Map<String, Integer> scores = new HashMap<>();

        // 添加键值对到 HashMap 中
        scores.put("Alice", 95);
        scores.put("Bob", 80);
        scores.put("Charlie", 90);

        // 获取键对应的值
        int aliceScore = scores.get("Alice");
        System.out.println("Alice's score: " + aliceScore);

        // 检查 HashMap 中是否包含某个键
        boolean containsKey = scores.containsKey("Bob");
        System.out.println("Contains key 'Bob'? " + containsKey);

        // 获取 HashMap 的大小（键值对数量）
        int size = scores.size();
        System.out.println("HashMap size: " + size);

        // 遍历 HashMap 中的键值对
        System.out.println("Scores:");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            String name = entry.getKey();
            int score = entry.getValue();
            System.out.println(name + ": " + score);
        }

        // 修改某个键对应的值
        scores.put("Bob", 85);
        System.out.println("Updated score for Bob: " + scores.get("Bob"));

        // 删除某个键值对
        scores.remove("Charlie");
        System.out.println("After removing Charlie:");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            String name = entry.getKey();
            int score = entry.getValue();
            System.out.println(name + ": " + score);
        }

        // 清空 HashMap
        scores.clear();
        System.out.println("HashMap is empty? " + scores.isEmpty());
    }
}
```

运行以上代码，将会输出以下结果：

```
Alice's score: 95
Contains key 'Bob'? true
HashMap size: 3
Scores:
Alice: 95
Bob: 80
Charlie: 90
Updated score for Bob: 85
After removing Charlie:
Alice: 95
Bob: 85
HashMap is empty? true
```

上面的例子演示了如何创建 HashMap ，以及添加、获取、遍历和删元素对象，以及判断 HashMap 的大小和是否为空。

## 总结

本文介绍了Java中的Collection框架，包括了最常见的List、Set和Map接口，以及常见的实现类。然后用案例讲解了这些类的使用。

在如今Java面试八股文满天飞的时代，上面的内容可能不会被面试官问到，因为太基础了，但是Java集合的源码或者手写Java Collection的实现还是经常被问到。所以在接下来的文章会从源码和Java Collection的手写实现两个维度来讲解常见的集合类的具体实现。




<!-- @include: @article-footer.snippet.md -->