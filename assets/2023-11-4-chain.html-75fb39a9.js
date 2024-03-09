import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,f as l}from"./app-f31e497e.js";const a={},d=l(`<p>责任链模式在软件开发中，是会经常使用到的一个设计模式，比如对某一次请求进行不同的规则的校验，这些规则的执行有先后顺序，组成了链式的执行顺序。</p><p>责任链模式的核心思想就是通过构建一个处理流水线来对一个请求对象进行多次有顺序的处理。这些在流水线的处理类对象构成了一个单项链表结构。</p><h2 id="责任链模式的uml图" tabindex="-1"><a class="header-anchor" href="#责任链模式的uml图" aria-hidden="true">#</a> 责任链模式的UML图</h2><img src="https://static.javajike.com/img/2023/11/4/image-20231104205402666.png" alt="image-20231104205402666" style="zoom:67%;"><p>从该UML中中，责任链模式有两个角色：</p><ul><li>处理类Handler，可以是一个接口，也可以是一个抽象类。它有一个核心的处理方法，比如handle_request();</li><li>处理类的实现类HandlerA、HandlerB、HandlerC，这几个Handler构成了一个链式的处理顺序。</li></ul><h2 id="案例实战" tabindex="-1"><a class="header-anchor" href="#案例实战" aria-hidden="true">#</a> 案例实战</h2><p>在工作中，我们经常有一些审批流程，现在使用责任链模式去模拟一个向公司借款的流程。在流程中有三个角色，分别是员工、经历、CFO三个角色，根据借款金额的不同，需要不同的审批角色。</p><ul><li>当借款金额小于1000元，只需要财务审批</li><li>当借款金额大于1000元小于5000元，需要经理审批</li><li>当借款金额大于5000元小于10000元，需要CFO审批</li><li>当借款金额大于10000元，审批拒绝。</li></ul><p>首先创建一个审批抽象类Aproval，有一个核心的抽象处理方法handle(int amount)和持有一个Aproval对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class Aproval {

   private Aproval nextApproval;
   public abstract void handle(int amount);
    public Aproval getNextApproval() {
        return nextApproval;
    }

    public void setNextApproval(Aproval nextApproval) {
        this.nextApproval = nextApproval;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Staff（财务）继承了Aproval，并实现了handle(int amount)方法，里面有具体的处理逻辑，它只能审批1000元以下的借款。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Staff extends Aproval {

    @Override
    public void handle(int amount) {

        if(amount&lt;1000){
            System.out.println(&quot;审批通过&quot;);
        }else {
            System.out.println(&quot;财物权限不够，需要经理审批&quot;);
            getNextApproval().handle(amount);
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Manager继承了Aproval，并实现了handle(int amount)方法，它能审批5000元以下的借款。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.java.design.chain;

public class Manager extends Aproval {
    @Override
    public void handle(int amount) {
        if (amount &lt; 5000) {
            System.out.println(&quot;经理审批通过&quot;);
        } else {
            System.out.println(&quot;经理权限不够，需要总裁审批&quot;);
            getNextApproval().handle(amount);
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CFO继承了Aproval，并实现了handle(int amount)方法，它能审批10000元以下的借款。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.java.design.chain;

public class CFO extends Aproval {
    @Override
    public void handle(int amount) {
        if (amount &lt; 10000) {
            System.out.println(&quot;cfo审批通过&quot;);
        } else {
            System.out.println(&quot;金额太大，审批不通过&quot;);
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写一个测试类，将三个审批角色组成一个责任链模式的审批流，并向审批流的第一角色handle(9000)：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Client {

    public static void main(String[] args) {

        Staff staff = new Staff();
        Manager manager = new Manager();
        CFO cfo = new CFO();
        staff.setNextApproval(manager);
        manager.setNextApproval(cfo);
        staff.handle(9000);

    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行代码处理结果如下：</p><blockquote><p>财物权限不够，需要经理审批<br> 经理权限不够，需要总裁审批<br> cfo审批通过</p></blockquote><h2 id="为什么要使用责任链模式" tabindex="-1"><a class="header-anchor" href="#为什么要使用责任链模式" aria-hidden="true">#</a> 为什么要使用责任链模式</h2><p>从上面的使用场景，我们可以得出以下的一些结论，使用责任链的原因有：</p><ul><li>使用责任链模式可以将一个大而复杂的判断逻辑，分成多个小的逻辑单元，每个逻辑单元组成了链中的一环。每个逻辑单元的功能都是解藕的。</li><li>可以动态的扩展责任链中的逻辑单元，当需要扩展新的功能，可以写一个Handler即可</li><li>也可以根据需求快速的删除一些逻辑单元，并且可以根据需要快速的组合逻辑单元</li></ul><p>从上面的分析原因我们可以得出，使用责任链有以下的优点：</p><ul><li>降低逻辑单元之间的耦合度，不同的逻辑单元的处理逻辑不耦合，提高了系统的灵活性和可维护性。</li><li>提升代码的可扩展性，可以快速的装载和卸载逻辑单元，提供整个责任链的可扩展性。可以根据不同的需求，制定不同的处理流程，而且不需要修改现有的代码</li><li>符合开闭原则：责任链模式将处理逻辑放在链式的逻辑单元中处理，新增一个逻辑功能，并不需要改变原有的逻辑功能</li><li>可以灵活的控制责任链中逻辑单元的处理顺序</li></ul><p>总之，责任链模式可以提供一种灵活、可扩展和可维护的链式处理的机制，使系统能够更好地应对变化和复杂性。但需要防止责任链模式有过多的处理逻辑单元，如果处理链路过长，系统出错，很难去排查，也有可能影响系统的性能。所以我们在实际的使用过程中，需要权衡一下利弊，根据实际的情况做设计和优化。</p>`,27),s=[d];function v(r,t){return e(),n("div",null,s)}const m=i(a,[["render",v],["__file","2023-11-4-chain.html.vue"]]);export{m as default};
