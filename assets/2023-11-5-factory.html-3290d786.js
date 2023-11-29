import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as a,f as n}from"./app-5ab7765b.js";const l={},s=n(`<h2 id="简单工厂" tabindex="-1"><a class="header-anchor" href="#简单工厂" aria-hidden="true">#</a> 简单工厂</h2><p>简单工厂模式（Simple Factory Pattern）也称为静态工厂方法模式，属于创建型设计模式的一种。简单工厂模式提供一个简单的工厂类，根据传入参数的不同，返回不同类的实例对象。</p><h3 id="uml图" tabindex="-1"><a class="header-anchor" href="#uml图" aria-hidden="true">#</a> UML图</h3><img src="https://static.javajike.com/img/2023/11/5/image-20231105202816381.png" alt="image-20231105202816381" style="zoom:50%;"><p>简单工厂包含如下角色：</p><ul><li>工厂类（SimpleSofaFactory）:负责创建实例对象的类，提供一个静态工厂方法用于创建不同的产品对象。工厂类根据客户端传入的参数来创建相应的产品对象。</li><li>抽象产品类（Sofa）：由工厂类创建的对象的抽象类或接口，定义了产品类的属性和方法。</li><li>具体产品类（Chinese Sofa）：实现了抽象产品类的属性和方法。</li></ul><h3 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h3><p>定义一个抽象产品类（Sofa），它有一个抽象方法getName()和一个具体方法showName()</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class Sofa {

     abstract String getName();
     public void showName(){
         System.out.println(getName()+&quot; sofa&quot;);
     }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ChineseSofa类实现了抽象产品类（Sofa）的抽象方法getName()。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ChineseSofa extends Sofa {
    @Override
    String getName() {
        return &quot;china&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AmericaSofa类实现了抽象产品类（Sofa）的抽象方法getName()。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class AmericaSofa extends Sofa{
    @Override
    String getName() {
        return &quot;america&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工厂类（SimpleSofaFactory）根据客户端传入的参数来创建相应的产品对象Sofa。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class SimpleFactory {
    public Sofa createCoffee(String type) {
        Sofa sofa = null;
        if(&quot;us&quot;.equals(type)) {
            sofa = new AmericaSofa();
        } else if(&quot;cn&quot;.equals(type)) {
            sofa = new ChineseSofa();
        }
        return sofa;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个客户端，测试类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Client {

    public static void main(String[] args) {
        SimpleFactory factory = new SimpleFactory();
        Sofa sofa = factory.createSofa(&quot;cn&quot;);
        sofa.showName();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果如下：</p><blockquote><p>china sofa</p></blockquote><p>简单工厂模式是一种常见的设计模式，它具有如下的优点：</p><ul><li>工厂类包含了必要的逻辑判断，可以根据客户端的需求，动态地实例化具体的产品类。</li><li>系统扩展性好，如果需要增加新的产品类，只需要修改工厂类的逻辑判断即可。</li></ul><p>那它的缺点是：</p><ul><li>工厂类包含了所有产品对象的创建逻辑，导致工厂类的代码会随着产品类型的增多而变得越来越复杂。</li><li>违反了单一职责原则（SRP），工厂类负责了两个职责：创建和业务逻辑判断。</li></ul><h2 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式" aria-hidden="true">#</a> 工厂方法模式</h2><p>工厂方法模式（Factory Method Pattern）是一种创建型设计模式，它定义了一个创建对象的接口，但由子类来决定要实例化哪个类，就是将实例化工作交给子类完成。工厂方法模式可以有效地避免简单工厂模式中工厂类过于臃肿的问题。</p><h3 id="uml图-1" tabindex="-1"><a class="header-anchor" href="#uml图-1" aria-hidden="true">#</a> UML图</h3><figure><img src="https://static.javajike.com/img/2023/11/5/image-20231105210628018.png" alt="image-20231105210628018" tabindex="0" loading="lazy"><figcaption>image-20231105210628018</figcaption></figure><p>工厂方法模式包含以下角色：</p><ul><li>抽象工厂（IFactory）：定义了一个工厂方法makeSofa()，用于创建产品对象的接口。</li><li>具体工厂（ChineseSofaFactory）：实现抽象工厂类中定义的工厂方法makeSofa，返回一个具体的产品对象Sofa。</li><li>抽象产品类（Sofa）：由工厂类创建的对象的抽象类或接口，定义了产品类的属性和方法。</li><li>具体产品类（Chinese Sofa）：实现了抽象产品类的属性和方法。</li></ul><h3 id="代码实现-1" tabindex="-1"><a class="header-anchor" href="#代码实现-1" aria-hidden="true">#</a> 代码实现</h3><p>定义一个接口IFactory，它有一个createSofa()的方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public  interface IFactory {
    Sofa createSofa();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IFactory的具体实现类ChineseSofaFactory：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ChineseSofaFactory implements IFactory {
    @Override
    public Sofa createSofa() {
        return new ChineseSofa();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IFactory的具体实现类AmericaSofaFactory：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class AmericaSofaFactory implements IFactory{
    @Override
    public Sofa createSofa() {
        return new AmericaSofa();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个客户端用于测试：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Client {
    public static void main(String[] args) {
        IFactory factory=new ChineseSofaFactory();
        Sofa sofa  =factory.createSofa();
        sofa.showName();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的测试输出结果：</p><blockquote><p>china sofa</p></blockquote><p>使用工厂方法模式的好处是：</p><ul><li>客户端通过抽象工厂来创建产品对象，可以方便地创建出不同的产品对象，而不需要了解具体的实现类。</li><li>不同的产品由不同的工厂创建，符合单一职责原则，相对于简单工厂，具体工厂类的代码更加简洁。</li><li>具备良好的扩展性，增加新的产品和新的工厂非常容易，无需修改已有代码。</li></ul><p>使用工厂方法模式的缺点是：</p><ul><li>大量的类：每个具体产品都需要一个具体工厂类来创建，会导致类的数量增加，增加了系统的复杂度。</li></ul><h2 id="抽象工厂" tabindex="-1"><a class="header-anchor" href="#抽象工厂" aria-hidden="true">#</a> 抽象工厂</h2><p>工厂方法模式中考虑的是一类产品的生产，比如sofa的生产，但现实生活中，有很多同类型的产品生产，比如家具厂除了生产沙发，还生产桌子、椅子。</p><p>抽象工厂模式（Abstract Factory Pattern）是一种创建型设计模式，它提供了一个创建一系列相关对象的接口，而无需指定具体实现类。</p><h3 id="uml图-2" tabindex="-1"><a class="header-anchor" href="#uml图-2" aria-hidden="true">#</a> UML图</h3><p>抽象工厂的UML图如下：</p><img src="https://static.javajike.com/img/2023/11/5/image-20231105213245110.png" alt="image-20231105213245110" style="zoom:50%;"><p>抽象工厂模式包含以下角色：</p><ul><li>抽象工厂（IFurnitureFactory）：定义了一系列可以创建不同产品对象的方法，每个方法对应一个具体产品类的创建方法。</li><li>具体工厂（FurnitureFactory ）：实现了抽象工厂接口，负责创建一族相关的具体产品对象。</li><li>抽象产品类（Table）：由工厂类创建的对象的抽象类或接口，定义了产品类的属性和方法。</li><li>具体产品类（ChineseTable）：实现了抽象产品类的属性和方法。</li></ul><h3 id="代码实现-2" tabindex="-1"><a class="header-anchor" href="#代码实现-2" aria-hidden="true">#</a> 代码实现</h3><p>抽象产品类（Table），代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class Table {

    abstract String getName();
    public void showName(){
        System.out.println(getName()+&quot; table&quot;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体产品类（ChineseTable），代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ChineseTable extends Table{
    @Override
    String getName() {
        return &quot;china&quot;;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>抽象工厂（IFurnitureFactory），定义了makeSofa()和makeTable()方法，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface IFurnitureFactory {
    Sofa makeSofa();
    Table makeTable();
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体工厂（FurnitureFactory ）实现了抽象工厂（IFurnitureFactory）中的创建对象的方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class FurnitureFactory implements IFurnitureFactory {

    @Override
    public Sofa makeSofa() {
        return new ChineseSofa();
    }

    @Override
    public Table makeTable() {
        return new ChineseTable();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个测试类，该类使用抽象工厂模式创建不同的产品对象，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Client {

    public static void main(String[] args) {
        IFurnitureFactory factory = new FurnitureFactory();
       Sofa sofa= factory.makeSofa();
       Table table= factory.makeTable();
       sofa.showName();
       table.showName();
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行上面的代码，输出如下：</p><blockquote><p>china sofa<br> china table</p></blockquote><p>抽象工厂模式提供了一种创建一族相关对象的方法，能够实现不同产品族的兼容性和高度可扩展性，它具有以下的优点：</p><ul><li>可以创建一系列相关的产品对象，保证了这些对象之间的兼容性。</li><li>客户端代码与具体产品的创建实现了解耦</li><li>符合开闭原则，新增一族产品时，只需要增加相应的具体产品类和工厂类即可。</li></ul><p>同时它具有以下的缺点：</p><ul><li>新增产品族、比较困难，需要修改抽象工厂的接口和具体工厂类。</li><li>增加系统的复杂性</li></ul>`,69),d=[s];function r(c,t){return i(),a("div",null,d)}const m=e(l,[["render",r],["__file","2023-11-5-factory.html.vue"]]);export{m as default};
