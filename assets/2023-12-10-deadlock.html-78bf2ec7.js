import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-492d8984.js";const i={},c=e(`<p>死锁是指两个或多个线程互相等待对方释放资源而无法继续执行的情况。在 Java 中，死锁通常发生在多个线程同时持有多个锁的情况下，导致彼此相互等待对方释放锁。</p><h2 id="java死锁示例" tabindex="-1"><a class="header-anchor" href="#java死锁示例" aria-hidden="true">#</a> Java死锁示例</h2><p>以下是一个简单的 Java 死锁示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">io<span class="token punctuation">.</span>github<span class="token punctuation">.</span>forezp<span class="token punctuation">.</span>concurrentlab<span class="token punctuation">.</span>deadlock</span><span class="token punctuation">;</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DeadLock1</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Account</span> a1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Account</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Account</span> a2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Account</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               
                a1<span class="token punctuation">.</span><span class="token function">fundTransfer</span><span class="token punctuation">(</span>a2<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

                a2<span class="token punctuation">.</span><span class="token function">fundTransfer</span><span class="token punctuation">(</span>a1<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t1<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t2<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Account</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">int</span> fund<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Account</span><span class="token punctuation">(</span><span class="token keyword">int</span> fund<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>fund <span class="token operator">=</span> fund<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">void</span> <span class="token function">fundTransfer</span><span class="token punctuation">(</span><span class="token class-name">Account</span> account<span class="token punctuation">,</span> <span class="token keyword">int</span> transferMoney<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>account<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>fund <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fund <span class="token operator">+</span> transferMoney<span class="token punctuation">;</span>
                    account<span class="token punctuation">.</span>fund <span class="token operator">=</span> account<span class="token punctuation">.</span>fund <span class="token operator">-</span> transferMoney<span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/10/image-20231210153937552.jpeg" alt="死锁示例图" tabindex="0" loading="lazy"><figcaption>死锁示例图</figcaption></figure><p>上面的代码展示了一个典型的死锁情况。在<code>DeadLock1</code>类中，我们有两个<code>Account</code>对象：<code>a1</code>和<code>a2</code>，每个对象都有一定数量的资金。<code>Account</code>类包含一个方法<code>fundTransfer</code>，用于从一个账户向另一个账户转移一定金额的资金。</p><p>在<code>main</code>方法中，我们创建了两个线程（<code>t1</code>和<code>t2</code>），分别执行两个账户之间的资金转移。<code>t1</code>线程调用<code>a1.fundTransfer(a2, 10)</code>，而<code>t2</code>线程调用<code>a2.fundTransfer(a1, 10)</code>。在<code>fundTransfer</code>方法中，我们可以看到以下代码块：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>account<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fund <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fund <span class="token operator">+</span> transferMoney<span class="token punctuation">;</span>
        account<span class="token punctuation">.</span>fund <span class="token operator">=</span> account<span class="token punctuation">.</span>fund <span class="token operator">-</span> transferMoney<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这段代码中，我们使用<code>synchronized</code>关键字来同步代码块。线程先获取当前对象（<code>this</code>）的锁，然后在休眠100毫秒后，试图获取<code>account</code>对象的锁。在<code>main</code>方法中，<code>t1</code>线程获取了<code>a1</code>对象的锁，而<code>t2</code>线程获取了<code>a2</code>对象的锁。但是，每个线程在进行资金转移时都试图获取对方对象（即<code>a2</code>和<code>a1</code>）的锁。</p><p>这种情况下可能会发生死锁。因为线程<code>t1</code>持有<code>a1</code>对象的锁，正在等待获取<code>a2</code>对象的锁，而线程<code>t2</code>持有<code>a2</code>对象的锁，正在等待获取<code>a1</code>对象的锁。这样就形成了循环等待的死锁情况，两个线程都无法继续执行，程序会停止响应。</p><h2 id="死锁发生的条件" tabindex="-1"><a class="header-anchor" href="#死锁发生的条件" aria-hidden="true">#</a> 死锁发生的条件</h2><p>死锁是指在并发程序中，两个或多个线程因竞争资源而陷入无限等待的状态。死锁发生一般需要满足四个条件，即下面所述的死锁发生条件：</p><ol><li><p><strong>互斥条件（Mutual Exclusion）</strong>：共享资源 X 和 Y 只能被一个线程占用；</p></li><li><p><strong>占有且等待（Hold and Wait）</strong>：线程 T1 已经取得共享资源 X，在等待共享资源 Y 的时候，不释放共享资源 X；</p></li><li><p><strong>不可抢占（No Preemption）</strong>：其他线程不能强行抢占线程 T1 占有的资源；</p></li><li><p><strong>循环等待条件（Circular Wait）</strong>：线程 T1 等待线程 T2 占有的资源，线程 T2 等待线程 T1 占有的资源，就是循环等待。</p></li></ol><p>当以上四个条件同时满足时，就有可能发生死锁。只要避免其中一个条件，就能够预防死锁的发生。在编程中，要解决或避免死锁，需要合理地设计资源分配策略、锁使用策略，并充分考虑线程之间的依赖关系和顺序。</p><h2 id="如何避免死锁" tabindex="-1"><a class="header-anchor" href="#如何避免死锁" aria-hidden="true">#</a> 如何避免死锁</h2><p>在上面死锁发生的四个条件中，</p><p>确实，我们可以通过破坏死锁发生条件中的三个条件来避免死锁的发生。下面是对这三个条件的反向分析，并提供解决方法：</p><ol><li><p><strong>破坏占有且等待（Hold and Wait）</strong>：一种方法是使用资源分配策略，即一次性申请所有所需的资源。这意味着在开始执行之前，线程必须成功地获取所有需要的资源，不允许等待。另一种方法是资源预分配，即在开始执行之前，线程一次性获取它所需的所有资源，并且不会释放这些资源直到线程完成任务。</p></li><li><p><strong>破坏不可抢占（No Preemption）</strong>：在某些情况下，资源可以被强制剥夺并重新分配给其他线程。这可以通过引入资源的优先级和超时机制来实现。当其他线程请求被当前线程持有的资源时，如果当前线程在一定时间内没有完成任务，资源可以被剥夺并分配给等待的线程。</p></li><li><p><strong>破坏循环等待条件（Circular Wait）</strong>：通过为资源定义线性顺序，可以避免循环等待。线程在申请资源时必须按照相同的顺序申请，即先申请资源序号较小的，再申请资源序号较大的。这样可以避免线程之间的循环等待。</p></li></ol><h3 id="破坏占有且等待" tabindex="-1"><a class="header-anchor" href="#破坏占有且等待" aria-hidden="true">#</a> 破坏占有且等待</h3><p>把死锁转账的例子进行改造：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.concurrentlab.deadlock;

import java.util.ArrayList;
import java.util.List;

public class DeadLockDemo2 {

    public static void main(String[] args) throws InterruptedException {
        ResManager resManager = new ResManager();
        Account a1 = new Account(resManager, 100);
        Account a2 = new Account(resManager, 100);
        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {
                a1.fundTransfer(a2, 10);
            }
        });
        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {

                a2.fundTransfer(a1, 10);
            }
        });
        t1.start();
        t2.start();
        t1.join();
        t2.join();
    }


    static class ResManager {
        private List&lt;Account&gt; list = new ArrayList&lt;&gt;();

        synchronized boolean apply(Account res1, Account res2) {
            if (list.contains(res1) || list.contains(res2)) {
                return false;
            } else {
                list.add(res1);
                list.add(res2);
            }
            return true;
        }

        synchronized void release(Account res1, Account res2) {
            list.remove(res1);
            list.remove(res2);
        }
    }

    static class Account {
        ResManager resManager;
        private int fund;

        public Account(ResManager resManager, int fund) {
            this.resManager = resManager;
            this.fund = fund;
        }

        void fundTransfer(Account account, int transferMoney) {

            while (!resManager.apply(this, account)) {

            }
            try {
                synchronized (this) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    synchronized (account) {
                        this.fund = this.fund + transferMoney;
                        account.fund = account.fund - transferMoney;
                        System.out.println(&quot;fundTransfer success&quot;);
                    }
                }
            } finally {
                resManager.release(this, account);
            }
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码展示了一个使用资源管理器（<code>ResManager</code>）来避免死锁的例子。在<code>DeadLockDemo2</code>类中，我们有两个<code>Account</code>对象（<code>a1</code>和<code>a2</code>），每个对象都有一定数量的资金。在这里，我们引入了<code>ResManager</code>类来管理资源的申请和释放。</p><p>在<code>main</code>方法中，创建了两个线程（<code>t1</code>和<code>t2</code>），分别执行两个账户之间的资金转移。在<code>ResManager</code>类中，<code>apply</code>方法用于申请资源，<code>release</code>方法用于释放资源。在<code>Account</code>类的<code>fundTransfer</code>方法中，使用<code>ResManager</code>来避免死锁。具体来说：</p><ol><li>在<code>fundTransfer</code>方法中，通过<code>resManager.apply(this, account)</code>来申请资源，如果资源申请不成功，即返回false，线程会一直循环等待直到资源可用。这里一次性申请性申请了所有的资源，破换了<strong>占有且等待条件</strong></li><li>在执行资金转移操作时，先获取<code>ResManager</code>的锁，然后再获取账户之间资金转移所需的锁。在转移完成后，释放资源。</li></ol><h3 id="破坏循环等待条件" tabindex="-1"><a class="header-anchor" href="#破坏循环等待条件" aria-hidden="true">#</a> 破坏循环等待条件</h3><p>再看一下破坏循环等待条件的例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
public class DeadLockDemo3 {


    public static void main(String[] args) throws InterruptedException {
        Account a1 = new Account(100, 1);
        Account a2 = new Account(100, 3);
        Thread t1 = new Thread(new Runnable() {
            @Override
            public void run() {

                a1.fundTransfer(a2, 10);
            }
        });
        Thread t2 = new Thread(new Runnable() {
            @Override
            public void run() {

                a2.fundTransfer(a1, 10);
            }
        });
        t1.start();
        t2.start();
        t1.join();
        t2.join();
    }

    private static class Account {
        private int fund;
        private int id;

        public Account(int fund, int id) {
            this.fund = fund;
            this.id = id;
        }

        void fundTransfer(Account account, int transferMoney) {
            Account account1;
            Account account2;
            if (this.id &lt; account.id) {
                account1 = this;
                account2 = account;
            } else {
                account1 = account;
                account2 = this;
            }
            synchronized (account1) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                synchronized (account2) {
                    this.fund = this.fund + transferMoney;
                    account.fund = account.fund - transferMoney;
                    System.out.println(&quot;fundTransfer success&quot;);
                }
            }
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码展示了另一种避免死锁的方式。在<code>DeadLockDemo3</code>类中，我们依然有两个<code>Account</code>对象（<code>a1</code>和<code>a2</code>），每个对象都有一定数量的资金。在<code>Account</code>类中，我们通过比较<code>id</code>字段的大小，决定获取锁的顺序。具体来说：</p><ol><li>在<code>main</code>方法中，创建了两个线程（<code>t1</code>和<code>t2</code>），分别执行两个账户之间的资金转移。</li><li>在<code>fundTransfer</code>方法中，通过比较当前账户和目标账户的<code>id</code>字段，决定获取锁的顺序。如果当前账户的<code>id</code>小于目标账户的<code>id</code>，先获取当前账户的锁，再获取目标账户的锁；反之，顺序相反。</li><li>在完成资源获取后，执行资金转移操作，并释放锁。</li></ol><p>通过这种方式，我们通过线性化的方式来获取锁，避免了遇到不同顺序而导致的循环等待，从而避免了死锁的发生。</p><p>需要注意的是，这种方式假设每个账户具有唯一的<code>id</code>，且<code>id</code>是确定的、不会发生变化的。否则，可能会导致获取锁的顺序不一致，无法成功避免死锁。</p>`,31),t=[c];function l(o,d){return s(),a("div",null,t)}const r=n(i,[["render",l],["__file","2023-12-10-deadlock.html.vue"]]);export{r as default};
