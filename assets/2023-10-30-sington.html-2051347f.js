import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as s,c as l,a as e,b as d,d as t,f as c}from"./app-6c0d4224.js";const r={},v=c(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>lang: zh-CN
title: 一次性搞懂设计模式--单例模式
headerDepth: 0
description: 一次性搞懂设计模式--单例模式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="什么是单例模式" tabindex="-1"><a class="header-anchor" href="#什么是单例模式" aria-hidden="true">#</a> 什么是单例模式</h2><p>单例模式在允许在全局中只存在一个实例，并提供一个方法，让其他的对象可以访问这个实例。单例模式可以解决一个全局的使用的实例，防止它频繁的被创建或者被销毁，从而提高整个系统的性能。单例模式生成的实例的生命周期一般都是和进程的生命周期是一致的。</p><p><strong>在什么样的场景会使用到单列模式呢？</strong></p><p>需要表示全局唯一的对象，比如id生成器，比如工具类，或者访问资源配置文件的reader。这些对象一般只提供具体的方法、不提供全局的共享变量。在系统中只需要初始化一个实例，就能够提供给其他对象在各个地方使用。</p><p><strong>使用单例模式有什么好处呢？</strong></p><ul><li>可以节约系统的资源，防止对象的频繁创建</li><li>提升代码的复用性</li><li>统一全局的访问点控制，方便统一管理和修改</li></ul><h2 id="单例模式的实现" tabindex="-1"><a class="header-anchor" href="#单例模式的实现" aria-hidden="true">#</a> 单例模式的实现</h2><p>如下图的UML图，单例模式声明了一个名为 instance 的静态对象和 get­Instance() 的方法，静态对象用来存储对象自身的属性和方法，静态方法用来返回其所属类的一个相同实例。这里我们以单例模式经典的懒汉式初始化方式为例，其代码实现如下：</p><figure><img src="https://static.javajike.com/img/2023/10/30/image-20231030213851667.png" alt="image-20231030213851667" tabindex="0" loading="lazy"><figcaption>image-20231030213851667</figcaption></figure><h3 id="饿汉模式-线程安全-推荐" tabindex="-1"><a class="header-anchor" href="#饿汉模式-线程安全-推荐" aria-hidden="true">#</a> 饿汉模式（线程安全，推荐）</h3><p>单例模式不需要对外提供构造方法，只允许通过getInstance()方法获取实例，在下面的案例中，会在程序的类的加载过程中，自动创建hugryInstance的静态实例，然后getInstance()去提供获取对象的服务。这种模式是在类加载的时候就完成了对象的实例化，类加载是加锁的，所以它是线程安全的。这种模式称为饿汉模式。</p><p>饿汉模式类似于Spring框架初始化Bean实例，都是在程序启动之初创建。虽然可能会造成一定资源开销和浪费，但是由于简单、安全，所以还是比较推荐的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class HugryInstance {

    private static HugryInstance hugryInstance = new HugryInstance();

    private HugryInstance() {
    }

    public static HugryInstance getInstance() {
        return hugryInstance;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="双重检查-线程安全-推荐" tabindex="-1"><a class="header-anchor" href="#双重检查-线程安全-推荐" aria-hidden="true">#</a> 双重检查（线程安全，推荐）</h3><p>这种双重检查模式经常在面试中被考察，近几年由于八股文泛滥，可能问的少一些。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class LazyInstance {

    private static volatile LazyInstance instance;

    private LazyInstance() {
    }

    public static LazyInstance getInstance() {
        if (instance == null) {
            synchronized (LazyInstance.class) {
                if (instance == null) {
                    instance = new LazyInstance();
                }
            }
        }
        return instance;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>双重检查模式，它属于懒汉模式，只有第一次调用getSingleton()方法才会初始化实例instance。</li><li>同时它是线程安全的，使用同步代码块来保证线程的安全。</li><li>使用双重检查来判断实例是否初始化，减少同步创建实例的开销。</li></ul><p>那为什么要使用volatile关键字来修饰静态的instance对象呢？</p><p>在java中创建一个对象，需要如下几步，伪代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>memory=allocate(); //1：分配内存空间
ctorInstance();   //2:初始化对象
singleton=memory; //3:设置singleton指向刚分配的内存空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当线程1在执行上面伪代码时，2和3可能会发生重排序，因为重排序并不影响运行结果，还可以提升性能，所以JVM是允许的。如果此时伪代码发生重排序，步骤变为1-&gt;3-&gt;2，线程1执行到第3步时，线程2调用<code>getsingleton</code>方法，在判断<code>singleton==null</code>时不为<code>null</code>，则返回<code>singleton</code>。但此时<code>singleton</code>并还没初始化完毕，线程2访问的将是个还没初始化完毕的对象。这时程序会出错！</p><p>当声明对象的引用为volatile后，伪代码的2、3的重排序在多线程中将被禁止!</p><h3 id="使用内部类模式-线程安全-推荐" tabindex="-1"><a class="header-anchor" href="#使用内部类模式-线程安全-推荐" aria-hidden="true">#</a> 使用内部类模式（线程安全，推荐）</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class InnerClzSingleton {
    private InnerClzSingleton(){
    }
    public static InnerClzSingleton getSingleton(){
        return Inner.instance;
    }
    private static class Inner {
        private static final InnerClzSingleton instance = new InnerClzSingleton();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用内部类的模式，有以下的优点在：</p><ul><li>延迟初始化，属于懒汉模式，需要第一次调用getSingleton()方法，才会初始化内部类。</li><li>线程安全，Jvm在执行类的初始化的时候，会进行加锁初始化，在多线程的情况下，也不会频繁创建对象。</li></ul><p>所以它属于线程安全的懒汉模式，和双重检查模式一样，但是代码比双重检查模式简洁。</p><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2><p>单例模式除了上面的写法，还有其他的写法，但是不太推荐。</p><h3 id="懒汉模式-线程不安全-不推荐" tabindex="-1"><a class="header-anchor" href="#懒汉模式-线程不安全-不推荐" aria-hidden="true">#</a> 懒汉模式（线程不安全，不推荐）</h3><p>下面是最简单的懒汉模式的单列模式，这种情况下在多线程下是不安全的，可能会同时存在多个实例的创建。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class LazyInstanceNoSafe {

    private static LazyInstanceNoSafe instance;
    private LazyInstanceNoSafe() {
    }

    public static LazyInstanceNoSafe getInstance() {
        if (instance == null) {
            instance = new LazyInstanceNoSafe();
        }
        return instance;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="懒汉模式-线程不安全-不推荐-1" tabindex="-1"><a class="header-anchor" href="#懒汉模式-线程不安全-不推荐-1" aria-hidden="true">#</a> 懒汉模式（线程不安全，不推荐）</h3><p>下面是懒汉模式的线程安全的，但是在方法上加了锁，在访问的时候需要锁占用，会导致一定的资源开销和性能下降。此种模式是不推荐的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class LazyInstanceSafe {

    private static LazyInstanceSafe instance;
    private LazyInstanceSafe() {
    }

    public static synchronized LazyInstanceSafe getInstance() {
        if (instance == null) {
            instance = new LazyInstanceSafe();
        }
        return instance;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码下载" tabindex="-1"><a class="header-anchor" href="#源码下载" aria-hidden="true">#</a> 源码下载</h2>`,37),u={href:"https://github.com/forezp/Java-Labs/tree/main/design-pattern-lab/src/main/java/io/github/forezp/java/design/sington",target:"_blank",rel:"noopener noreferrer"};function m(o,b){const n=a("ExternalLinkIcon");return s(),l("div",null,[v,e("p",null,[e("a",u,[d("https://github.com/forezp/Java-Labs/tree/main/design-pattern-lab/src/main/java/io/github/forezp/java/design/sington"),t(n)])])])}const h=i(r,[["render",m],["__file","2023-10-30-sington.html.vue"]]);export{h as default};
