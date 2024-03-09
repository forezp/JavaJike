import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-f31e497e.js";const i={},l=e(`<h2 id="final关键字的基本用法" tabindex="-1"><a class="header-anchor" href="#final关键字的基本用法" aria-hidden="true">#</a> final关键字的基本用法</h2><p>final关键字，用于表示不可变，表示变量或者方法定义后不能被修改或者重写。final关键字可以用于修饰类、方法和变量。</p><ol><li>修饰类：当类被声明为final时，表明该类不能被继承。它是一个最终类，不能有子类继承它。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public final class FinalTest {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>修饰方法: 当方法被声明为<code>final</code>时，该方法不能被子类重写。子类只能继承父类中的<code>final</code>方法，但不能修改其实现。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class FinalMethodDemo {

    public final void test(){
        System.out.println(&quot;test&quot;);
    }

    static class FinalMethodeDemo2 extends FinalMethodDemo{
    //编译不通过
        @Override
        public  void test(){
            System.out.println(&quot;test&quot;);
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>FinalMethodeDemo2是不能重新它的父类FinalMethodDemo的final方法的，编译的时候会报错。idea会提示错误，如下图所示：</p><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/11/25/image-20231125201006272.png" alt="image-20231125201006272" style="zoom:50%;"><ol start="3"><li>修饰变量: 当变量被声明为<code>final</code>时，该变量的值不能被修改，即它成为一个常量。一旦被赋值，就不能再更改。</li></ol><ul><li>对于实例变量（成员变量），可以在代码块中赋值，也可以在构造函数中赋值，一旦赋值就不能被改变：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    private final String s1=&quot;s1&quot;;

//    {
//        s1=&quot;s1&quot;;  //在代码快中赋值
//    }

    private static final String s2;

    static {
        s2=&quot;s2&quot;;  //在静态代码快中赋值
    }

    private final String s3;

    //在构造函数中赋值
    public FinalTest(String s3) {
        this.s3 = s3;
    }

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>对于被final修饰的局部变量，在使用前必须赋值。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public void test2(){
        final String s;
        s=&quot;ss&quot;;
        System.out.println(s);//在使用final变量前必须赋值
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>如果被final修饰的变量时引用类型，则在变量初始化后，就不能再指向另一个对象了，但是变量的值是可以被修改的。示例代码如下：</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class FinalObject {


    public static void main(String[] args) {
        final int[] arrays=new int[]{1,2,3};
       // arrays=null; 非法

        final Person person=new Person(&quot;sam&quot;,1);
        person.setAge(2);
       // person=null; 非法

    }


    static class Person {

        private String Name;
        private int age;

        public Person(String name, int age) {
            Name = name;
            this.age = age;
        }

        public String getName() {
            return Name;
        }

        public void setName(String name) {
            Name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            this.age = age;
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>final</code>关键字的使用可以增加代码的可读性，提高代码的安全性，以及优化性能。它可以在合适的场景中使用，例如常量、线程安全等需要不可变性的情况。</p><h2 id="为什么内部类引用的外部变量必须用final修饰" tabindex="-1"><a class="header-anchor" href="#为什么内部类引用的外部变量必须用final修饰" aria-hidden="true">#</a> 为什么内部类引用的外部变量必须用final修饰</h2><p>JDK1.8之后，如果将局部变量（或表达式）传递给匿名内部类或Lambda表达式作为捕捉的变量，它们会被隐式地视为<code>final</code>，是不可以被更改的。</p><p><strong>为什么会这样呢？</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class Task {
    public abstract void run();
}

public class FinalDemo {

    public void run1(final String taskname) {
        Task task = new Task() {
            @Override
            public void run() {
                System.out.println(&quot;taskname=&quot; + taskname +&quot; run&quot;);
            }
        };
        task.run();
    }

    public void run2(final String taskname) {
        new Task() {
            @Override
            public void run() {
                System.out.println(&quot;taskname=&quot; + taskname+&quot; run&quot;);
            }
        }.run();
    }

    public static void main(String[] args) {
        FinalDemo demo = new FinalDemo();
        demo.run1(&quot;task1&quot;);
        demo.run2(&quot;task2&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，内部类和外部类其实是处于同一个级别，反编译中可以看到都是对象级别的类文件，内部类不会因为定义在方法中就会随着方法的执行完毕而跟随外部类被销毁。</p><p>如果外部类的方法中的变量不定义final，那么当外部类方法执行完毕的时候，这个局部变量肯定也就被GC了，然而内部类的某个方法还没有执行完，这个时候他所引用的外部变量已经找不到了。</p><p>如果定义为final，java会将这个变量复制一份作为成员变量内置于内部类中(反编译class文件中可以看到)，这样的话，由于final所修饰的值始终无法改变，所以这个变量所指向的内存区域就不会变。</p><h2 id="谈谈final、finally、finalize的区别" tabindex="-1"><a class="header-anchor" href="#谈谈final、finally、finalize的区别" aria-hidden="true">#</a> 谈谈final、finally、finalize的区别</h2><ol><li><code>final</code>是Java中的修饰符，可以用来修饰类、方法和变量，表示不可改变的</li></ol><ul><li><p>修饰类：当类被声明为<code>final</code>时，该类不能被继承，成为最终类。</p></li><li><p>修饰方法：当方法被声明为<code>final</code>时，该方法不能被子类重写，成为最终方法。</p></li><li><p>修饰变量：当变量被声明为<code>final</code>时，该变量的值一旦被赋值，不能被修改，成为常量。</p></li></ul><ol start="2"><li><code>finally</code>：<code>finally</code>是Java中的关键字，用于异常处理的最后一个代码块，在<code>try-catch</code>语句中使用。无论是否发生异常，<code>finally</code>块中的代码都会被执行。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// 可能会发生异常的代码</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 异常处理逻辑</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token comment">// 最终会执行的代码块</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>finally</code>块通常用于释放资源、关闭连接等必须执行的操作，以确保代码的可靠性。即使在<code>try</code>块或<code>catch</code>块中出现<code>return</code>语句，<code>finally</code>块中的代码也会在方法返回之前执行。</p><ol start="3"><li><p><code>finalize</code>：<code>finalize</code>是一个方法，它是在对象被垃圾回收器回收之前调用的。每个类都可以重写<code>finalize</code>方法来执行对象的清理操作。</p><p>需要注意的是，<code>finalize</code>方法已经过时，不推荐使用了。因为垃圾回收器的工作是由Java虚拟机自动处理的，无法保证<code>finalize</code>方法的及时执行。更好的做法是使用<code>try-finally</code>或其他资源管理机制来确保资源的释放。</p></li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
    <span class="token comment">// 进行资源释放或清理操作</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">finalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="finally语句到底是在return之前还是之后执行" tabindex="-1"><a class="header-anchor" href="#finally语句到底是在return之前还是之后执行" aria-hidden="true">#</a> finally语句到底是在return之前还是之后执行？</h2><p>在回答这个问题前，先来说一下finally语句是不会被执行的情况：</p><ul><li>try语句没有被执行到，如在try语句之前就返回了，这样finally语句就不会执行，这也说明了finally语句被执行的必要条件是：相应的try语句一定被执行到。</li><li>在try块中有System.exit(0);这样的语句，System.exit(0);是终止Java虚拟机JVM的，finally语句也不会被执行到。</li></ul><p><strong>finally语句到底是在return之前还是之后执行？</strong></p><ol><li>当没有发生异常时：如果在<code>try</code>块中没有发生异常，<code>finally</code>语句将在<code>try</code>块执行完毕后立即执行。然后，程序将继续执行后续的代码。<code>finally</code>块中的代码将在<code>return</code>语句执行之后、方法返回之前执行。</li></ol><p>请看下面的示例代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FinalReturn1</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> a<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>  <span class="token comment">//idea提示：The value 2 assigned to &#39;a&#39; is never used </span>
       
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Finally block executed.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，无论<code>try</code>块中是否发生异常，<code>finally</code>块中的代码都会被执行。控制台会输出以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Finally block executed.
1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>当发生异常时：如果在<code>try</code>块中发生了异常，会根据异常类型在<code>catch</code>块中进行匹配，然后执行相应的<code>catch</code>块。之后，无论是否有匹配的<code>catch</code>块，<code>finally</code>语句块都将执行。如果在catch中再次使用了return操作，则会覆盖try里面的return操作。</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">io<span class="token punctuation">.</span>github<span class="token punctuation">.</span>forezp<span class="token punctuation">.</span>javabasiclab<span class="token punctuation">.</span>finaltest</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FinalReturn2</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">myMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 抛出异常</span>
            <span class="token keyword">return</span> a<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">ArithmeticException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;ArithmeticException caught.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            a<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> a<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Finally block executed.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制台会输出以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ArithmeticException caught.
Finally block executed.
2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>当发生异常时：如果在<code>try</code>块中发生了异常，会根据异常类型在<code>catch</code>块中进行匹配，然后执行相应的<code>catch</code>块。之后，无论是否有匹配的<code>catch</code>块，<code>finally</code>语句块都将执行。如果在finally中再次使用了return操作，则会覆盖之前try或者catch里面的return操作。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class FinalReturn3 {
    public static void main(String[] args) {
        System.out.println(myMethod());
    }

    public static int myMethod() {
        int a=1;
        try {
            int result = 10 / 0; // 抛出异常
            return a;
        } catch (ArithmeticException e) {
            System.out.println(&quot;ArithmeticException caught.&quot;);
            a=2;
            return a;
        } finally {
            System.out.println(&quot;Finally block executed.&quot;);
            a=3;
            return 4;
        }
    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制台会输出以下内容：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ArithmeticException caught.
Finally block executed.
4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结来说，<code>finally</code>语句在Java中用于定义一段无论是否发生异常都会执行的代码块。它在<code>try</code>块或<code>catch</code>块中的代码执行完毕后立即执行，并且在方法返回之前被执行。</p><ul><li>在<code>try</code>或<code>catch</code>块中使用<code>return</code>语句时，<code>finally</code>块中的代码也会在<code>return</code>语句执行后执行。(finally语句中没有使用return操作)</li><li>如果在finally中再次使用了return操作，则会覆盖之前try或者catch里面的return操作。</li></ul>`,50),t=[l];function c(d,o){return s(),a("div",null,t)}const r=n(i,[["render",c],["__file","2023-11-26-final.html.vue"]]);export{r as default};
