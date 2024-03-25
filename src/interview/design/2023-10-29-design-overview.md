---
lang: zh-CN
title: 设计模式面试概述
headerDepth: 0
order: 1
icon: a-008_huoguo
description: 设计模式面试概述
---


设计模式是软件开发的一种指导思想，它是为了解决具体的编码问题或者是解决某一类问题而产生的。这些年无论是生产环境遇到的事故，还是自己自己做的一些开源项目中，越来越体会到系统是运营出来的，代码质量是设计出来的。无论是在前期的需求分析、方案设计、代码编写，都需要良好的程序设计，这些都离不开设计模式的思想。所以设计模式是程序员的一项基本功。

那么如何学习好设计模式呢，我觉得需要刻意练习，说的简单一点就是多写、多练、多应用。

这些年技术层出不穷，新的框架、新的工具、新的软件开发模式，都会让程序员在技术的海洋里迷失。无论面对什么的环境，我们需要有一些专注力，刻意的去练习、要深挖技术背后的原因，要做到知其然并知其所以然。不能东一榔头西一棒槌，这样只会原地踏步走。

那本系列教程将会讲述23种经典的设计模式，有两个目标：

- 优先讲解面试过程中常见遇到的几种设计模式；剩下的设计模式会在写完Java面试系列文章之后做为补充。
- 尽量以通俗易懂的语言和代码案例去讲述。



## 设计模式有哪些类型？

设计模式可以分为三种类型，分别是创建性型设计模式、结构型设计模式和行为型设计模式。每种类型的设计模式又包含了多种设计模式，总共有23种设计模式，如图所示：

![image-20231112200737983](https://static.javajike.com/img/2023/11/12/image-20231112200737983.png)



### 创建型模式

创建型设计模式，用于解耦对象的实例化过程，用于对象的实例化，包含了5种设计模式，在实际的开发过程中是应用非常多的：

- 单列模式：某个类在全局只有一个实例对象，提供一个全局的访问点。
- 创建者模式：封装对象的创建过程，可以按照方法去构造对象。
- 工厂方法模式：它定义了一个创建对象的接口，但由子类来决定要实例化哪个类，就是将实例化工作交给子类完成
- 抽象工厂模式：它提供了一个创建一系列相关对象的接口，而无需指定具体实现类。
- 原型模式：通过复制原有的实例来创建新的实例。

### 结构型模式

结构型设计模式是多个对象实例的结合或者组装，形成一个更大的对象。

- 装饰器模式：装饰器模式的核心思想就是在不改变原有的类的基础之上给类添加新的功能。

- 代理模式：将对象的访问控制和代码运行位置转移到代理对象中。

- 享元模式：通过共享对象池技术，共享对象。

- 适配器模式：将类的接口转换为客户期望的另一个接口

- 外观模式：提供统一的方法来访问内部子系统。

- 桥接模式：将抽象部分和实现部分分离，使它们都可以独立

- 组合模式：将对象组合成树形结构以表示整个部分的层次结构。

### 行为型模式

类和对象如何交互，及划分责任和算法。

- 策略模式：定义一系列算法，封装每个算法，并使它们可以互换。策略让算法独立于使用它的客户端而变化。

- 模板模式：在操作中定义算法的框架，将一些步骤推迟到子类中。模板方法让子类在不改变算法结构的情况下重新定义算法的某些步骤。

- 命令模式：将命令请求封装为一个对象，使得可以用不同的请求来进行参数化。

- 迭代器模式：一种遍历访问聚合对象中各个元素的方法，不暴露该对象的内部结构。

- 观察者模式：定义对象之间的一对多依赖关系，这样当一个对象改变状态时，它的所有依赖项都会自动得到通知和更新。

- 中介者模式：中介者对象封装了一组对象之间的交互，这组对象会将它们的交互委托给中介者对象，而不是直接交互。

- 备忘录模式：捕获并外部化对象的内部状态，以便以后可以恢复，所有这些都不会违反封装。

- 解释器模式：给用于定义语言的语法规则表示，并提供解释器来处理句子中的语法。

- 状态模式：状态模式设计的初衷是应对同一个对象里不同状态变化时的不同行为的变化

- 责任链模式：将请求的发送者和接收者解耦，使的多个对象都有处理这个请求的机会。

- 访问者模式：访问者模式是以行为（某一个操作）作为扩展对象功能的出发点，在不改变已有类的功能的前提下进行批量扩展。

### 面试过程中常问的设计模式

设计模式有23种，每种设计模式有非常多的应用，能够熟练使用设计模式，可以极大程度的提高我们写代码的质量。熟练使用23种设计模式是高阶程序员必须掌握的技能。

在面试过程中，面试官不会考察每一种设计模式，笔者作为多年面试官，一般常见的考察的面试模式如下：

- 单例模式
- 工厂方法模式
- 抽象工厂模式
- 装饰器模式
- 适配器模式
- 责任链模式
- 代理模式
- 观察者模式

掌握好以上的几种设计模式，应对面试应该是足够的，在接下来的文章中会逐步讲解这几种设计模式。



## 设计模式的几种原则

面向对象有个SOLID原则，而设计模式是基于对象实例的，基本上也遵循SOLID 原则。这个原则在面试过程中会经常被问到。

- S（Single Responsibility Principle，简称 SRP）：单一职责原则，该类的职责是唯一的，这个职责是唯一引起该类变化的原因。

- O（Open–Closed Principle，简称 OCP）：开闭原则，对于扩展是开放的，对于修改是封闭的。

- L（Liskov Substitution Principle，简称 LSP）：里氏替换原则，程序中的对象应该是可以在不改变程序正确性的前提下被它的子类所替换的。里氏代换原则是继承复用的基石，只有当子类可以替换基类，软件功能在不受影响时，基类功能可以被复用，而子类也能够在基类的基础上增加新的行为。

- I（Interface Segregation Principle，简称 ISP）：接口隔离原则，接口互相隔离，一个类对另一个类的依赖应该建立在最小的接口范围内。

- D（Dependency Inversion Principle，简称 DIP）：依赖反转原则，程序要依赖于抽象接口，不要依赖于具体实现。简单的说就是要求对抽象接口进行编程，不要对实现进行编程，这样就降低了客户与实现模块间的耦合。

除了以上的SOLID 原则，面向对象还有以下的基本原则：

- 迪米特法则：又被叫做最小知识原则，就是一个对象应该尽量对外少暴露，对象之间尽量少了解。

- 组合优先原则：在复用代码时，要尽量先使用组合关系来实现，其次才考虑使用继承关系来实现。它和里氏替换原则相辅相成的，两者都是开闭原则的具体实现规范。

  



<!-- @include: @article-footer.snippet.md -->