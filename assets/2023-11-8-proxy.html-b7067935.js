import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as l}from"./app-ababdff4.js";const a={},s=l(`<p>代理模式和装饰器模式类似，都是在不改变同一个接口功能的前提下，对原有功能的做扩展或者增强。代理模式并没有做类似于装饰器模式多层嵌套，而是采用灵活的单一结构。在Java语言中并支持动态代理，在很多RPC框架、Spring AOP、Spring事务等领域有着广泛的应用。</p><p>代理模式是一种结构性模式，它允许将对象的访问控制和代码运行位置转移到代理对象中。类似于中介，代理对象可以控制客户端对真实对象的访问。代理模式常用于对已有功能的增强，比如访问控制、远程调用。</p><h2 id="静态代理" tabindex="-1"><a class="header-anchor" href="#静态代理" aria-hidden="true">#</a> 静态代理</h2><p>代理模式分为静态代理和动态代码，一般静态代理使用的比较少，而动态代理在各种框架、中间件有着广泛的应用。</p><p>静态代理需要手动创建一个代理类，实现被代理对象的接口，并将实际对象的方法调用转发给它。静态代理的优点是简单易懂，但缺点是需要手动创建代理类，对于需要代理的类数量较多或变化频繁的情况下，代码会变得臃肿难以维护。</p><img src="https://static.javajike.com/img/2023/11/9/image-20231109225529976.png" alt="image-20231109225529976" style="zoom:50%;"><p>从上面的 UML 图中，我们可以看出代理模式有三个关键角色：</p><ul><li><p>抽象主题接口类（Subject）：它定义了一些方法。</p></li><li><p>主题实现类（RealSubject）：实现了抽象接口类（的所有方法</p></li><li><p>代理类（StaticProxy）：实现了抽象主题类的方法，并隐藏在代理后面可能其他类的实现。</p></li></ul><h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3><p>定义一个抽象主题类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface Subject {
    void operation();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主题实现类（RealSubject）的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class RealSubject implements Subject{
    @Override
    public void operation() {
        System.out.println(&quot;do somthing&quot;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代理类（StaticProxy）实现了抽象主题类，并持有主题实现类的对象，并在主题实现类的对象的operation()方法之前和之后做了功能的增强，具体代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class StaticProxy implements Subject{

    private RealSubject realSubject;

    public StaticProxy(RealSubject realSubject) {
        this.realSubject = realSubject;
    }

    @Override
    public void operation() {
        System.out.println(&quot;before operation...&quot;);
        realSubject.operation();
        System.out.println(&quot;after operation...&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个客户端实现类，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Client {
    public static void main(String[] args) {
        testStatic();
      
    }

    public static void testStatic() {
        StaticProxy staticProxy = new StaticProxy(new RealSubject());
        staticProxy.operation();
    }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行代码，输出如下：</p><blockquote><p>before operation...<br> do somthing<br> after operation...</p></blockquote><h2 id="动态代理" tabindex="-1"><a class="header-anchor" href="#动态代理" aria-hidden="true">#</a> 动态代理</h2><p>动态代理可以使用 Java 动态代理机制和CGLIB动态代理。</p><h3 id="java-动态代理" tabindex="-1"><a class="header-anchor" href="#java-动态代理" aria-hidden="true">#</a> Java 动态代理</h3><p>Java 动态代理是在运行时自动生成代理类并将方法调用转发到实际对象。 Java 动态代理的优点是避免了手动创建代理类的麻烦，但缺点是对于一些无法实现接口的类，无法使用动态代理。</p><p>Java 动态代理是使用Java的反射机制来实现动态代理。Java提供了java.lang.reflect.Proxy类和java.lang.reflect.InvocationHandler接口来实现动态代理。</p><p>具体使用Java 动态代理的步骤是先实现InvocationHandler接口。和静态代理类似：在这个接口中，需要对真实的代理对象的功能需要做一下加强，它是实现动态代理的关键，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ProxyHandler implements InvocationHandler {

    private Object object;

    public ProxyHandler(Object object){
        this.object = object;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println(&quot;Before invoke &quot;  + method.getName());
        method.invoke(object, args);
        System.out.println(&quot;After invoke &quot; + method.getName());
        return null;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现代理如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Client {

    /**
     * jdk动态代理
     */
    public static void testJdkProxy() {
        Subject realSubject = new RealSubject();
        ProxyHandler handler = new ProxyHandler(realSubject);
        Subject subject = (Subject) Proxy.newProxyInstance(handler.getClass().getClassLoader(),
                realSubject.getClass().getInterfaces(), handler);
        subject.operation();
    }
    
     public static void main(String[] args) {
        testJdkProxy();
      
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行代码输出：</p><blockquote><p>Before invoke operation<br> do somthing<br> After invoke operation</p></blockquote><p>Java动态代理是基于反射生产的一个代理类，这个代理类本身已经继承了jdk包中的Proxy对象，而Java是不允许多继承的，所以只能实现接口的方式进行代理。</p><p>它的优点如下：</p><ul><li>Java动态代理不需要任何依赖</li><li>灵活性：动态代理可以在运行时动态生成代理类，</li><li>可拓展性：可以通过动态代理实现一些横切关注点，比如日志记录、性能监控等，而无需修改原有的代码。</li></ul><p>缺点：</p><ul><li>性能开销：由于动态代理是在运行时动态生成代理类，相比直接调用实现类的方法，会带来一定的性能开销</li><li>功能限制：动态代理只能对接口进行代理，在某些情况下，无法代理实现类的方法。</li></ul><h3 id="cglib代码" tabindex="-1"><a class="header-anchor" href="#cglib代码" aria-hidden="true">#</a> CGLIB代码</h3><p>在pom文件中引入cglib包，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &lt;dependency&gt;
      &lt;groupId&gt;cglib&lt;/groupId&gt;
      &lt;artifactId&gt;cglib&lt;/artifactId&gt;
      version&gt;3.2.5&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CGlib代码模式需要实现MethodInterceptor，并在intercept方法中实现真实对象的功能增强，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class CglibProxyFactory implements MethodInterceptor {

    private Object target;//维护一个目标对象

    public CglibProxyFactory(Object target) {
        this.target = target;
    }

    //为目标对象生成代理对象
    public Object getProxyInstance() {
        //工具类
        Enhancer en = new Enhancer();
        //设置父类
        en.setSuperclass(target.getClass());
        //设置回调函数
        en.setCallback(this);
        //创建子类对象代理
        return en.create();
    }

    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        System.out.println(&quot;开始cglib拦截&quot;);
        // 执行目标对象的方法
        Object returnValue = method.invoke(target, args);
        System.out.println(&quot;结束cglib拦截&quot;);
        return returnValue;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个测试类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Client {


    public static void main(String[] args) {
        testCglibProxy();
    }

    /**
     * 测试cglib
     */
    public static void testCglibProxy() {
        Subject subject = new RealSubject();
        Subject proxy = (Subject) new CglibProxyFactory(subject).getProxyInstance();
        proxy.operation();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行结果如下：</p><blockquote><p>开始cglib拦截<br> do somthing<br> 结束cglib拦截</p></blockquote><p>CGLIB（Code Generation Library）是一个强大的高性能的代码生成库，用于在运行时扩展Java类和实现动态代理。与Java动态代理不同，CGLIB可以代理非接口类型的类。</p><p>CGLIB动态代理的优点:</p><ul><li>性能高：相比Java动态代理，CGLIB动态代理通常能够提供更好的性能，因为它是通过生成子类来代理目标类，而不是通过实现接口。</li><li>功能强大：CGLIB能够代理普通类和接口类，更灵活地满足额外需求，例如代理私有方法、拦截静态方法等。</li><li>无需依赖接口：CGLIB动态代理可以代理没有实现任何接口的类，这使得它可以代理更多类型的类，提供更大的灵活性。</li></ul><p>CGLIB动态代理的缺点:</p><ul><li>需要额外依赖：CGLIB动态代理需要引入额外的库，增加项目的依赖，相比Java动态代理而言更为复杂。</li><li>对final方法和final类的限制：CGLIB无法代理final方法和final类。</li><li>不支持自身方法调用：CGLIB无法从代理对象中调用自身的方法，这可能会引起无限循环或抛出异常。</li></ul>`,49),d=[s];function t(r,v){return i(),n("div",null,d)}const b=e(a,[["render",t],["__file","2023-11-8-proxy.html.vue"]]);export{b as default};
