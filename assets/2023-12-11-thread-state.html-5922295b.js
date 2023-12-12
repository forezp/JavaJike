import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,f as d}from"./app-257d334a.js";const a={},s=d(`<h2 id="thread状态" tabindex="-1"><a class="header-anchor" href="#thread状态" aria-hidden="true">#</a> Thread状态</h2><p>Java的线程状态总共有六种，在Thread类的枚举类State中，总共有6种状态，代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  public enum State {
        NEW,
        RUNNABLE,
        BLOCKED,
        WAITING,    
        TIMED_WAITING,
        TERMINATED;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每种状态代表的含义如下表所示：</p><table><thead><tr><th>线程状态</th><th>解释</th></tr></thead><tbody><tr><td>NEW</td><td>尚未启动的线程状态，即线程创建，还未调用start方法</td></tr><tr><td>RUNNABLE</td><td>就绪状态（调用start，等待调度）+正在运行</td></tr><tr><td>BLOCKED</td><td>等待监视器锁时，陷入阻塞状态</td></tr><tr><td>WAITING</td><td>等待状态的线程正在等待另一线程执行特定的操作（如notify）</td></tr><tr><td>TIMED_WAITING</td><td>具有指定等待时间的等待状态</td></tr><tr><td>TERMINATED</td><td>线程完成执行，终止状态</td></tr></tbody></table><p>上面的六种状态代码了一个线程从创建、运行、阻塞、终止的各个状态，代表了线程的生命周期。每种状态都是可以扭转的，状态的扭转如下图所示：</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/11/image-20231211225833220.png" alt="image-20231211225833220" tabindex="0" loading="lazy"><figcaption>image-20231211225833220</figcaption></figure><h3 id="new-新建状态" tabindex="-1"><a class="header-anchor" href="#new-新建状态" aria-hidden="true">#</a> New（新建状态）</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>   public static void main(String[] args) {
        Thread newThread=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
        System.out.println(&quot;newThread state:&quot;+newThread.getState());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>newThread state:NEW</p></blockquote><h3 id="runnable" tabindex="-1"><a class="header-anchor" href="#runnable" aria-hidden="true">#</a> Runnable</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public static void main(String[] args) {
        Thread t=new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
        t.start();
        System.out.println(&quot;newThread started, state=&quot;+t.getState());

    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>Thread-0<br> newThread started, state=RUNNABLE</p></blockquote><h3 id="blocked" tabindex="-1"><a class="header-anchor" href="#blocked" aria-hidden="true">#</a> blocked</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ThreadStateTest2 {

    public static void main(String[] args) {

        Thread thread=new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (ThreadStateTest2.class){
                    System.out.println(Thread.currentThread().getName());
                }
            }
        });
        thread.start();
        synchronized (ThreadStateTest2.class){
            try {
                Thread.sleep(50);
                System.out.println(&quot;thread state =&quot;+thread.getState());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote></blockquote><h3 id="wait" tabindex="-1"><a class="header-anchor" href="#wait" aria-hidden="true">#</a> wait</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.concurrentlab.thread;

public class ThreadStateTest3 {

    public static void main(String[] args) {
        final Object lock = new Object();

        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                synchronized (lock) {
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName());
                }
            }
        });
        thread.start();
        try {
            Thread.sleep(50);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        synchronized (lock) {
            System.out.println(&quot;thread state =&quot; + thread.getState());
            lock.notify();
        }

        try {
            thread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),t=[s];function r(l,v){return n(),i("div",null,t)}const b=e(a,[["render",r],["__file","2023-12-11-thread-state.html.vue"]]);export{b as default};
