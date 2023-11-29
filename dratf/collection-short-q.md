---
lang: zh-CN
title: ArrayList源码解析
headerDepth: 1
order: 1
icon: kuaisugaoxiao
collapsible: false
description: ArrayList源码解析
---



常见问题
问：ArrayList 如何进行扩容？
答： ArrayList 在添加元素时，首先检查容量大小判断是否需要扩容，如果需要扩容，会重新定义一个容量为原来的1.5倍的数组，然后将原来的数组复制到新数组，再把指向原数组的地址指向新数组。

问：ArrayList 与LinkList 的区别？
答：①ArrayList 和 LinkList 都是线程不安全的。

②ArrayList 其底层用数组实现所以查找元素速度快，但新增和删除由于要在数组中移动元素，所以效率低。而 LinkedList 的查找元素速度慢，但新增和删除速度快。

③ArrayList需要一份连续的内存空间，LinkedList不需要连续的内存空间。

问：ArrayList的遍历和LinkedList遍历性能比较如何？
答：ArrayList 的遍历效率要比 LinkedList 的遍历效率高得多，因为 ArrayList 的内存是连续的，LinkedList  的内存是分散的。而CPU的内部缓存结构会缓存连续的内存片段，降低读取内存的性能开销，所以 ArrayList 遍历效率会比 LinkedList 效率高。

问：ArrayList（int initialCapacity）会不会初始化数组大小？
答：会初始化 elementData 数组的大小，但是对于这个 ArrayList 而言，其 size 并没有改变，依旧为0（详情请看上文有参构造源码分析）。我们看看下面这段代码。

ArrayList<Integer> list = new ArrayList<>(10);
System.out.println("list的大小：" + list.size());
list.add(5, 10);// 添加数据到下标为5的位置
其运行结果如下，诶？我们不是已经设置了容量为 10 了吗？为什么获取 list.size() 为 0 呢？而且也添加不了数据。这是因为通过这个构造方法创建 ArrayList，只是初始化了数组的大小，并没有对 size 进行修改。 而我们要在下标为 5 的位置加入数据，此时 size = 0，当然会爆越界异常。 



问：ArrayList 是线程安全的吗？
答：不是，线程安全的数组容器是Vector，Vector是在所有方法上都加上了 synchronized 进行修饰。

问：既然线程不安全，为啥使用频率这么高？
答： ArrayList 一般用于查询数据，实际情况下并不会对 ArrayList 进行频繁的增删。频繁增删用 LinkedList，线程安全用 Vector。

问：ArrayList 频繁扩容导致性能下降，如何处理？
答：扩容的原因就是容量不够用了，那我们可以直接通过 ArrayList（int initialCapacity）来指定一个较大的容量，减少扩容次数。当然，数据量大了扩容是不可避免的，我们只能减少扩容次数。

嗯，回去等通知吧………
————————————————
版权声明：本文为CSDN博主「算不出来没办法」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_41746479/article/details/127161575