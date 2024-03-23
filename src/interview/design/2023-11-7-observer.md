---
lang: zh-CN
title: 观察者模式
headerDepth: 0
order: 8
icon: a-008_naichanaigai
description: 一次性搞懂设计模式--观察者模式
---

观察者模式（Observer Pattern）是一种行为型设计模式，用于对象之间的一对多的依赖关系，当对象发生改变时，所有依赖于它的对象都会收到通知。



## 观察者模式UML图

UML图如下：

![image-20231107230028268](https://static.javajike.com/img/2023/11/7/image-20231107230028268.png)

从UML图上可以得出，在观察者模式中，有以下的角色：

- 发布者Publisher：或者被称为被观察者，它维护了一个观察者的列表，并可以动态添加观察者或者删除观察者。
- 观察者Observer：定义了一个接收发布者消息的方法，当发布者发布消息，观察者会执行该方法。
- 具体主题（Concrete Subject）：具体主题是主题的具体实现，它维护了一个状态，并在状态改变时通知观察者。
- 具体观察者（Concrete Observer）：具体观察者是观察者的具体实现，它实现了观察者的更新接口，并定义了观察者接收到通知后的具体行为。

观察者模式在软件开发中有非常多的应用，在GUI中应用的比较多，在消息队列的场景有广泛的应用。



## 案例实战

写一个观察者接口Observer，它有一个接收通知对象的方法  notify (Object obj);

```
package io.github.forezp.java.design.obeserver2;

public interface Observer {
    void notify (Object obj);
}

```

Observer接口的实现类ObserverImpl的代码如下：

```
package io.github.forezp.java.design.obeserver2;

public class ObserverImpl implements Observer {
    private String name;

    public ObserverImpl(String name) {
        this.name = name;
    }

    @Override
    public void notify(Object obj) {
        System.out.println(name+":"+obj.toString());
    }
}

```

消息发布者Publisher接口，可以向它注册观察者对象，也可以用它来向观察者发送消息：

```
package io.github.forezp.java.design.obeserver2;

public interface Publisher {
    void register(Observer observer);
    void notify(Object o);
}

```

Publisher接口的实现类PublisherImpl，代码如下：

```
package io.github.forezp.java.design.obeserver2;

import java.util.ArrayList;
import java.util.List;

public class PublisherImpl implements Publisher {
    private List<Observer> list = new ArrayList<>();

    @Override
    public void register(Observer observer) {
        list.add(observer);

    }

    @Override
    public void notify(Object o) {
        for (int i = 0; i < list.size(); i++) {
            list.get(i).notify(o);
        }
    }
}

```

写一个客户端测试类：

```
package io.github.forezp.java.design.obeserver2;

public class Client {
    public static void main(String[] args) {
        Publisher publisher=new PublisherImpl();
        publisher.register(new ObserverImpl("observer1"));
        publisher.register(new ObserverImpl("observer2"));
        publisher.notify("fangzhipeng.com");
    }
}

```

运行结果如下：

>observer1:fangzhipeng.com
>observer2:fangzhipeng.com



## 为什么要使用观察者模式

观察者模式的核心思想是将观察者对象注册到发布者对象中，发布者对象可以对所有的观察者发送消息，观察者收到消息后可以做出响应。

使用观察者模式有以下的收益：

- 主题和观察者之间松耦合，使得发布者和观察者互不影响。对象之间关系也比较清晰。可以利用发布者向所有的观察者发送消息。
- 可扩展性很强，可以动态地添加和删除观察者，灵活性非常高。如果不使用观察者模式来捕获一个被观察对象的属性变化，那么就需要在被观察对象执行代码逻辑中加入调用通知某个对象进行变更的逻辑，这样不仅增加了代码的耦合性，也让代码扩展变得非常困难。
- 观察者模式符合开闭原则，增加新的观察者，不需要修改已有的代码。

同时，观察者模式也有一些缺点，比如发布者维护的观察者对象是无顺序的，并且发布者发布消息也是无顺序的，如果需要把证消息发送的顺序，需要做更多的工作。此外，过多的观察者会影响性能，需要做性能测试。



综上所述，观察者模式是一种实用并且简单的设计模式，它能够提高系统的可扩展性和灵活性。但是在使用它的时候需要注意它带来的一些缺点，要做一些优化工作。

<!-- @include: @article-footer.snippet.md -->
