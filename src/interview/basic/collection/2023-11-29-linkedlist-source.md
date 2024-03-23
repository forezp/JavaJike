---
lang: zh-CN
title: LinkedList源码解析
headerDepth: 1
order: 1
icon: shijianchuo
collapsible: false
description: LinkedList源码解析
---

## LinkedList的类结构图

LinkedList是java集合中比较常见的线性表的数据结构，是用于存储单列数据的容器。LinkedList除了继承AbstractSequentialList之外，同时还实现了Deque、Cloneable、Serializable 接口，也就是说LinkedList可以被当做队列使用，还支持快复制、序列化。

如下图，LinkedList的类结构图如下：

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/11/29/image-20231129214140591.png" alt="image-20231129214140591" style="zoom:50%;" />



LinkedList的底层数据结构是使用一个双向的链表结构实现的，链表中的每个节点（Node）都包含两个引用，prev指向当前节点前一个节点，next指向当前节点后一个节点，可以从头结点遍历到尾结点，也可以从尾结点遍历到头结点。

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/11/29/image-20231129223331968.png" alt="image-20231129223331968" style="zoom:50%;" />



LinkedList类主要由LinkedList和它的内部类Node构成，这两个类的UML图如下：

```
+------------------+
|    LinkedList    |
+------------------+
| - size : int     |
| - first : Node   |
| - last : Node    |
+------------------+
| + add(E element) |
| + remove()       |
| + get(int index) |
| + size()         |
+------------------+

+-------------------+
|       Node        |
+-------------------+
| - item : E        |
| - next : Node     |
| - prev : Node     |
+-------------------+
```

`LinkedList` 类是 LinkedList 的主要类。它包含了 `size`、`first` 和 `last` 三个实例变量，分别表示链表的大小、头结点和尾节点。

- `add(E element)` 方法用于在链表尾部添加元素。
- `remove()` 方法用于删除链表头部的元素。
- `get(int index)` 方法用于获取指定索引位置上的元素。
- `size()` 方法用于返回链表的大小。

`Node` 类是 LinkedList 内部定义的节点类。它包含了 `item`、`next` 和 `prev` 三个实例变量，分别表示节点的数据、下一个节点和上一个节点。



## 构造函数

LinkedList 类的构造函数有两个重载的构造函数，其中是一个无参的构造函数，没有任何的代码，因为它是双链表结构，不需要初始化容量长度等，源码如下：

```java
public LinkedList() {
}
```

第二个构造函数可以穿入一个Collection接口的实现类对象，将Collection中的元素都添加到LinkedList中，它的源码如下：

```
    public LinkedList(Collection<? extends E> c) {
        this();
        addAll(c);
    }
```

## add(E e)方法

LinkedList 的 add(E e) 方法用于在链表的尾部添加元素。 add(E e) 方法的源码如下：

```java
public boolean add(E e) {
    linkLast(e);
    return true;
}

private void linkLast(E e) {
    Node<E> newNode = new Node<>(last, e, null);
    if (last == null) {
        first = newNode;
    } else {
        last.next = newNode;
    }
    last = newNode;
    size++;
}
```

- `add(E e)` 方法先调用 `linkLast(e)` 方法来执行元素的插入操作。
- 在 `linkLast(e)` 方法中，首先创建一个新的节点 `newNode`，节点的数据为指定的元素 `e`，前向节点为链表的当前尾节点 `last`，后向节点为 null。
- 如果链表的尾节点 `last` 为 null，说明链表为空链表，即当前插入的节点即为头节点，将 `first` 设置为 `newNode`。
- 如果链表的尾节点 `last` 不为 nul，将当前尾节点 `last` 的后向节点指向 `newNode`，即将 `last.next` 设置为 `newNode`。
- 最后，将链表的尾节点 `last` 更新为 `newNode`，并增加链表的大小 `size`。
- 方法返回 true，表示插入操作成功。

## get(int index)方法

LinkedList 的 get(int index) 方法用于获取链表中指定索引处的元素。 get(int index) 方法的源码如下：

```java
public E get(int index) {
    checkElementIndex(index);
    return node(index).item;
}

private Node<E> node(int index) {
    // 如果索引位于链表的前半段，从头节点开始向后遍历
    if (index < (size >> 1)) {
        Node<E> x = first;
        for (int i = 0; i < index; i++) {
            x = x.next;
        }
        return x;
    }
    // 如果索引位于链表的后半段，从尾节点开始向前遍历
    else {
        Node<E> x = last;
        for (int i = size - 1; i > index; i--) {
            x = x.prev;
        }
        return x;
    }
}

private void checkElementIndex(int index) {
    if (!isElementIndex(index)) {
        throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
    }
}

private boolean isElementIndex(int index) {
    return index >= 0 && index < size;
}
```

- `get(int index)` 方法先调用 `checkElementIndex(index)` 方法检查索引是否有效，如果索引无效，则抛出 `IndexOutOfBoundsException` 异常。
- 然后调用 `node(index)` 方法，根据索引获取对应的节点。
- 在 `node(int index)` 方法中，如果索引 index 小于链表大小的一半，说明索引位于链表的前半段，从头节点开始向后遍历，找到对应的节点并返回。
- 如果索引 index 大于等于链表大小的一半，说明索引位于链表的后半段，从尾节点开始向前遍历，找到对应的节点并返回。
- 最后，在获取到对应节点后，返回节点的数据域 `item`。

## remove(int index)方法

LinkedList 的 remove(int index) 方法用于删除链表中指定索引处的元素。下面是 remove(int index) 方法的源码：

```java
public E remove(int index) {
    checkElementIndex(index);
    return unlink(node(index));
}

private E unlink(Node<E> x) {
    final E element = x.item;
    final Node<E> prev = x.prev;
    final Node<E> next = x.next;

    if (prev == null) {
        first = next;
    } else {
        prev.next = next;
        x.prev = null;
    }

    if (next == null) {
        last = prev;
    } else {
        next.prev = prev;
        x.next = null;
    }

    x.item = null;
    size--;
    return element;
}

private void checkElementIndex(int index) {
    if (!isElementIndex(index)) {
        throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
    }
}

private boolean isElementIndex(int index) {
    return index >= 0 && index < size;
}
```

解析：
- `remove(int index)` 方法先调用 `checkElementIndex(index)` 方法检查索引是否有效，如果索引无效，则抛出 `IndexOutOfBoundsException` 异常。
- 然后调用 `unlink(node(index))` 方法，根据索引获取对应的节点，并进行删除操作。
  - 在 `unlink(Node<E> x)` 方法中，首先保存节点 `x` 的数据到 `element` 中。
  - 然后获取节点 `x` 的前向节点 `prev` 和后向节点 `next`。
  - 如果节点 `x` 的前向节点 `prev` 为 null，即 `x` 为头节点，则将头节点指向 `x` 的后向节点 `next`。
  - 否则，将节点 `x` 的前向节点 `prev` 的后向节点指向 `x` 的后向节点 `next`，即 `prev.next = next`。并将节点 `x` 的前向节点 `prev` 的前向引用置为 null，即 `x.prev = null`。
  - 同样的方式，如果节点 `x` 的后向节点 `next` 为 null，即 `x` 为尾节点，则将尾节点指向 `x` 的前向节点 `prev`。
  - 否则，将节点 `x` 的后向节点 `next` 的前向节点指向 `x` 的前向节点 `prev`，即 `next.prev = prev`。并将节点 `x` 的后向节点 `next` 的后向引用置为 null，即 `x.next = null`。
  - 接着将节点 `x` 的数据域 `item` 置为 null，减小链表的大小 `size`。
  - 最后返回删除节点的数据域。


## 总结

LinkedList 是通过双向链表实现的数据结构，每个节点有前向和后向两个指针，用来连接上一个节点和下一个节点。这种结构使得在插入和删除元素时具有较高的效率，因为只需要修改节点的指针，而无需移动其他元素。

LinkedList 提供了多种方法来操作链表，包括在链表的头部或尾部插入元素、在指定位置插入元素、获取指定位置的元素、删除指定位置的元素等等。这使得 LinkedList 在需要频繁插入和删除元素的场景下很有优势。

然而，LinkedList 在访问元素时相对较慢，因为需要从头部或尾部开始遍历链表。与数组相比，LinkedList 的内存占用较高，因为每个节点需要额外的存储空间来保存前向和后向指针。

综上所述，LinkedList 是一个适用于插入和删除操作频繁的数据结构，但对于随机访问和占用内存方面可能存在劣势。

<!-- @include: @article-footer.snippet.md -->