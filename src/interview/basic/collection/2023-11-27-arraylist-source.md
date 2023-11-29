---
lang: zh-CN
title: ArrayList源码解析
headerDepth: 1
order: 1
icon: kuaisugaoxiao
collapsible: false
description: ArrayList源码解析
---



## ArrayList的类结构图

ArrayList 是 java 集合框架中比较常用的用于存储单列数据的容器。它继承自 AbstractList，实现了 List 接口，同时还实现了 RandomAccess、Cloneable、Serializable 接口，所以ArrayList 支持快速访问、复制、序列化。ArrayList底层基于数组实现，容量大小动态可以变化。

<img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/11/27/image-20231127211604720.png" alt="image-20231127211604720" style="zoom:50%;" />



- ArrayList继承了AbstractList类并实现类List接口，所以ArrayList具有了AbstractList和List的功能。而AbstractList内部已经实现了获取Iterator和ListIterator的方法。所

- ArrayList实现了RandomAccess接口，表明ArrayList支持随机访问。

- ArrayList实现了Cloneable接口，表明ArrayList支持克隆。
- ArrayList实现了Serializable接口，表明ArrayList支持序列，可以将ArrayList以流的形式通过ObjectInputStream/ObjectOutputStream来写/读。

## ArrayList底层是如何实现的？

ArrayList 是通过基于数组的方式实现的动态数组。

在 ArrayList 内部，有一个对象数组（elementData）用于存储元素。当创建 ArrayList 对象时，会初始化一个初始容量的数组。随着元素的不断添加，ArrayList 会根据需要自动进行扩容。

当添加元素时，ArrayList 会检查当前数组容量是否足够，如果不够，则会创建一个新的更大容量的数组，并将原有元素复制到新数组中。这个过程称为扩容。通过这种方式，ArrayList 实现了动态调整数组容量。

在进行删除操作时，ArrayList 会将删除位置后面的元素向前移动一个位置，以填补被删除元素的空缺。同时，ArrayList 会判断是否需要缩小数组容量，如果数组容量过大且元素数量远小于容量的 1/4，则会进行缩容操作，减少内存占用。

由于 ArrayList 的底层采用数组实现，所以随机访问元素的时间复杂度为 O(1)，即常数时间。但是在进行插入和删除操作时，为了保持数组的连续性，可能需要移动大量元素，时间复杂度为 O(n)，其中 n 是元素的数量。因此，ArrayList 适用于对随机访问的需求较多，而对插入和删除操作效率要求不高的场景。

ArrayList的底层使用数组实现的源码如下：

````
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
 
//存储ArrayList元素的数组缓冲区。 ArrayList的容量就是这个数组缓冲区的长度。任何 empty ArrayList with //elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA 将在添加第一个元素时扩展为DEFAULT_CAPACITY。
    transient Object[] elementData; 
    
   ....
  } 
````

**注意，本文的源码为JDK18**

## ArrayList的初始化

ArrayList会在构造函数执行的时候初始化，ArrayList有三种构造函数，分别为：

- 带初始化容量大小参数(initialCapacity)的构造函数
- **无参构造函数，默认会初始化容量大小为DEFAULTCAPACITY_EMPTY_ELEMENTDATA，DEFAULTCAPACITY_EMPTY_ELEMENTDATA的值为10，所以默认的初始化大小为10；这种最常用。**
- 带有Collection参数的构造函数，会将Collection的元素Copy到elementData成员变量中。

```
 public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException("Illegal Capacity: "+
                                               initialCapacity);
        }
    }
    
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }
    
    public ArrayList(Collection<? extends E> c) {
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
```

## 添加元素

| 方法名                                                      | 描述                                                  |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| public boolean add(E e)                                     | 添加元素                                              |
| public void add(int index, E element)                       | 在制定位置添加元素                                    |
| public boolean addAll(Collection<? extends E> c)            | 将Collection的全部元素添加到集合中                    |
| public boolean addAll(int index, Collection<? extends E> c) | 将Collection的按照index位置开始的所有元素添加到集合中 |

添加元素的源码如下：

```
 public boolean add(E e) {
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
```

## 扩容

扩容是在grow()函数中进行，它返回的是一个新的Object[] 数组，新数组已经将就数据拷贝。

- 如果elementData是DEFAULTCAPACITY_EMPTY_ELEMENTDATA（空数组），并且元素小于DEFAULT_CAPACITY（10 个），则对空数组进行初始化
- 如果不为空数组，则进行初始化，正常情况下新的数组大小是旧数组的1.5倍
  - 如果超出了Interger的软最大值则报错
  - 最多返回Interger的软最大值（ SOFT_MAX_ARRAY_LENGTH = Integer.MAX_VALUE - 8）

```
  private Object[] grow() {
        return grow(size + 1);
    }
    
private Object[] grow(int minCapacity) {
        int oldCapacity = elementData.length;
        if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            int newCapacity = ArraysSupport.newLength(oldCapacity,
                    minCapacity - oldCapacity, /* minimum growth */
                    oldCapacity >> 1           /* preferred growth */);
            return elementData = Arrays.copyOf(elementData, newCapacity);
        } else {
        		//对空数组进行初始化
            return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
        }
    }
    
     public static int newLength(int oldLength, int minGrowth, int prefGrowth) {
        // preconditions not checked because of inlining
        // assert oldLength >= 0
        // assert minGrowth > 0

        int prefLength = oldLength + Math.max(minGrowth, prefGrowth); // might overflow
        if (0 < prefLength && prefLength <= SOFT_MAX_ARRAY_LENGTH) {
            return prefLength;
        } else {
            // put code cold in a separate method
            return hugeLength(oldLength, minGrowth);
        }
    }

    private static int hugeLength(int oldLength, int minGrowth) {
        int minLength = oldLength + minGrowth;
        if (minLength < 0) { // overflow
            throw new OutOfMemoryError(
                "Required array length " + oldLength + " + " + minGrowth + " is too large");
        } else if (minLength <= SOFT_MAX_ARRAY_LENGTH) {
            return SOFT_MAX_ARRAY_LENGTH;
        } else {
            return minLength;
        }
    }
```



## 删除元素

`remove(Object o)` 方法：该方法用于删除指定的元素。

```
 public boolean remove(Object o) {
        final Object[] es = elementData;
        final int size = this.size;
        int i = 0;
        found: {
            if (o == null) {
                for (; i < size; i++)
                    if (es[i] == null)
                        break found;
            } else {
                for (; i < size; i++)
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
        if ((newSize = size - 1) > i)
            System.arraycopy(es, i + 1, es, i, newSize - i);
        es[size = newSize] = null;
    }

```

- 首先，`remove(Object o)` 方法会判断是否删除的是 `null` 值，然后遍历 ArrayList 查找匹配的元素。
- 如果找到匹配的元素，会调用 `fastRemove(int index)` 方法进行快速删除，该方法将需要删除元素的位置（index）后面的元素向前移动，覆盖需要删除的元素。
- 最后，将 `size` 赋值为newSize，newSize实际上是减一了，表示 ArrayList 的元素总数减少一个。
- 并将最后一个位置上的元素清空。



## 查找元素

 get(int index)用于获取指定位置的元素，如果index超出长度，则报IndexOutOfBoundsException异常。查找指定位置元素的时间复杂度为O(1)。

```
    public E get(int index) {
        Objects.checkIndex(index, size);
        return elementData(index);
    }
```

`contains(Object o)` 方法：该方法用于判断 ArrayList 是否包含指定的元素。

```java
public boolean contains(Object o) {
    return indexOf(o) >= 0;
}
```

`contains(Object o)` 方法内部调用了 `indexOf(Object o)` 方法

```java
public int indexOf(Object o) {
    if (o == null) {
        for (int i = 0; i < size; i++)
            if (elementData[i] == null)
                return i;
    } else {
        for (int i = 0; i < size; i++)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
```

- `indexOf(Object o)` 方法首先判断要查找的元素是否为 `null`，如果是，则遍历 ArrayList 的元素，找到第一个值为 `null` 的元素，返回其索引值。
- 如果要查找的元素不为 `null`，则遍历 ArrayList 的元素，调用元素的 `equals` 方法进行比较，找到第一个相等的元素，返回其索引值。
- 如果未找到指定元素，则返回 -1。



## 迭代器源码解析

ArrayList 的迭代器（Iterator）是通过内部类 `Itr` 来实现的，以下是对其源码的解析：

```java
private class Itr implements Iterator<E> {
    int cursor;       // 下一个元素的索引
    int lastRet = -1; // 上一个元素的索引
    int expectedModCount = modCount;

    public boolean hasNext() {
        return cursor != size;
    }

    @SuppressWarnings("unchecked")
    public E next() {
        checkForComodification(); // 检查 ArrayList 是否被修改过
        int i = cursor;
        if (i >= size)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length)
            throw new ConcurrentModificationException();
        cursor = i + 1;
        return (E) elementData[lastRet = i];
    }

    public void remove() {
        if (lastRet < 0)
            throw new IllegalStateException();
        checkForComodification(); // 检查 ArrayList 是否被修改过

        try {
            ArrayList.this.remove(lastRet);
            cursor = lastRet;
            lastRet = -1;
            expectedModCount = modCount;
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }

    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }
}
```

- `Itr` 类实现了 `Iterator<E>` 接口，通过实现 `hasNext()`、`next()`、`remove()` 和 `checkForComodification()` 方法来支持迭代。
- `cursor` 属性表示下一个元素的索引，`lastRet` 属性表示上一个元素的索引，`expectedModCount` 属性表示预期的修改次数。
- `hasNext()` 方法用于判断是否还有下一个元素，即判断 `cursor` 是否等于 `size`。
- `next()` 方法用于获取下一个元素，首先调用 `checkForComodification()` 方法检查 ArrayList 是否被修改过，然后根据 `cursor` 获取下一个元素并返回，同时更新 `lastRet` 和 `cursor` 的值。
- `remove()` 方法用于移除上一个元素，首先检查 `lastRet` 是否小于 0，如果是则抛出异常，然后再次调用 `checkForComodification()` 方法检查 ArrayList 是否被修改过，在通过 `ArrayList.this.remove(lastRet)` 方法移除元素后，更新 `cursor` 和 `lastRet` 的值，并将 `expectedModCount` 修改为当前的 `modCount`。
- `checkForComodification()` 方法用于检查 ArrayList 是否被修改过，即判断 `modCount` 是否等于 `expectedModCount`，如果不相等则抛出异常。


ArrayList 的迭代器通过内部类 `Itr` 实现，支持对集合进行顺序迭代，并支持在迭代过程中通过迭代器的 `remove()` 方法删除元素。迭代器在每次访问元素之前会检查 ArrayList 是否被修改过，利用 `modCount` 和 `expectedModCount` 来实现快速失败机制，保证在迭代过程中对集合的修改不会产生错误的结果。

**需要注意的是，在使用迭代器遍历 ArrayList 的过程中，不建议直接使用 `ArrayList` 对象的 `remove()` 方法进行元素的删除操作，而应该使用迭代器的 `remove()` 方法进行删除，以避免产生并发修改异常。**

