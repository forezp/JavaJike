import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as a}from"./app-0ddf373f.js";const d={},s=a(`<p>今天这一讲，我们主要讲解最常用到的适配器模式。</p><p>在程序中，经常需要新的项目中需要对老代码进行适配才能用。适配器模式就是将旧代码和新程序的中间的转换角色。举个现实例子，比如我们的MAC电脑需要连接USB接口的键盘，但是MAC电脑只有typec接口，这时我们需要一个拓展坞，需要把typec接口转换成USB接口，给键盘使用，如图所示：</p><img src="https://static.javajike.com/img/2023/11/1/image-20231101224648036.png" alt="image-20231101224648036" style="zoom:50%;"><h1 id="适配器模式类图" tabindex="-1"><a class="header-anchor" href="#适配器模式类图" aria-hidden="true">#</a> 适配器模式类图</h1><p>适配器模式的定义是：将类的接口转换为客户期望的另一个接口，适配器可以让不兼容的两个类一起协同工作。</p><p>我们以拓展坞作为适配器将typec接口转换成usb接口为例进行讲解，它的UML图如下所示：</p><img src="https://static.javajike.com/img/2023/11/1/image-20231101223247880.png" alt="image-20231101223247880" style="zoom:67%;"><p>从 UML 图中，我们可以看出适配器模式中包含三个关键角色：</p><ul><li><p>目标类Target， 适配器类即将要进行适配的抽象类或接口，比如TypeC接口；</p></li><li><p>适配器类Adapter，是作为适配的中间类，它必须持有或者实现目标类和适配类的接口，比如拓展坞类实现了目标接口TypeC接口，持有适配者的类Keyboard；</p></li><li><p>需要被适配器转换的对象 Adaptee, 比如图中的键盘（实现了USB接口）。</p></li></ul><h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2><p>需要被适配的接口USB接口：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface IUsb {

    void connect(int x, int y);
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要被适配的接口的实现类，比如案例中Keyboard：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Keyboard  implements IUsb{
    @Override
    public void connect(int x, int y) {
        System.out.println(&quot;keyborad 连上了usb接口&quot;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>目标接口ITypeC：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface ITypeC {

    void connect(int x, int y,int z);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ExpansionDockAdapter（拓展坞适配器）实现了ITypeC的目标接口接口，ExpansionDockAdapter并持有需要被适配的IUsb接口，适配器只有同时实现或者持有目标接口和被适配的对象，才能进行适配工作：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ExpansionDockAdapter implements ITypeC{
    private IUsb iUsb;

    public ExpansionDockAdapter(IUsb iUsb) {
        this.iUsb = iUsb;
    }

    @Override
    public void connect(int x, int y, int z) {
        System.out.println(&quot;拓展坞将Typec接口转换成USB接口&quot;);
        iUsb.connect(x,y);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，可以调用客户端对它们调用：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class McClient {

    public static void main(String[] args) {
        Keyboard keyboard = new Keyboard();
        ExpansionDockAdapter adapter = new ExpansionDockAdapter(keyboard);
        System.out.println(&quot;mac连接typec&quot;);
        adapter.connect(1, 2, 3);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用适配器模式有什么收益" tabindex="-1"><a class="header-anchor" href="#使用适配器模式有什么收益" aria-hidden="true">#</a> 使用适配器模式有什么收益</h2><p>可能有很多人比较疑惑，如果在目标类中，新写一个方法就可以将需要适配的类进行转换。那么为什么还需要使用适配器模式呢？</p><ul><li>首先 ，是为了保持简单性，正如mac电脑一样，它只提供TypeC接口。由拓展坞去做USB或者是HDMI接口的转换。保证了MAC电脑对外接口的简单性。</li><li>单一职责，不同的角色做不同的事，没有必要将多个事情给一个角色做完，这样代码会非常的臃肿，难以维护。</li><li>可复用，将适配器这个角色进行高度抽象化，可以做到移植可复用</li></ul><p>使用适配器模式有以下的优点：</p><ul><li><p>将目标类和适配的类解耦，引入一个适配器类兼容现有目标类，拓展新的适配者类功能，很好的避免了现有类和适配者类的耦合。</p></li><li><p>单一职责，目标类和适配者类各司其职，互不干扰。</p></li><li><p>满足里氏替换原则。 目标类和适配者类是通过适配器进行交互的，适配器类只要不影响目标类的接口功能，适配者类无论出现什么新功能，都很方便替换。</p></li></ul><h2 id="源码下载" tabindex="-1"><a class="header-anchor" href="#源码下载" aria-hidden="true">#</a> 源码下载</h2>`,26),l=[s];function t(r,c){return i(),n("div",null,l)}const u=e(d,[["render",t],["__file","2023-10-31-adaptor.html.vue"]]);export{u as default};
