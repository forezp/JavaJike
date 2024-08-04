import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,f as l}from"./app-28e7b64a.js";const a={},d=l(`<h2 id="并发包的锁" tabindex="-1"><a class="header-anchor" href="#并发包的锁" aria-hidden="true">#</a> 并发包的锁</h2><p>并发包有三种常见的锁，分别是ReentrantLock、ReadWriteLock、StampedLock等。</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/23/image-20231223200719658.png" alt="image-20231223200719658" tabindex="0" loading="lazy"><figcaption>image-20231223200719658</figcaption></figure><p>它们的主要区别和特点：</p><ol><li><p>ReentrantLock（可重入锁）：</p><ul><li>特点：ReentrantLock 是一种独占锁（排他锁），允许同一个线程多次获取同一把锁（可重入性）。</li><li>适用场景：适用于需要更灵活的锁操作、对锁的粒度要求较高、需要条件等待的场景。</li><li>特点：它提供了独占的锁，不支持读写锁的共享特性。</li></ul></li><li><p>ReadWriteLock（读写锁）：</p><ul><li>特点：ReadWriteLock 使用读锁和写锁分离，允许多个线程同时获取读锁，但只允许一个线程获取写锁。</li><li>适用场景：适用于读多写少的场景，能够提高读操作的并发性能，<strong>对写操作加了排他性的限制。</strong></li><li>特点：支持读锁的共享特性，不适合处理写操作频繁的场景。</li></ul></li><li><p>StampedLock（标记锁）：</p><ul><li>特点：StampedLock 是 Java 8 新引入的锁机制，是读写锁的扩展，<strong>支持乐观读锁（不阻塞其他读写操作）</strong>、悲观读锁和写锁。</li><li>适用场景：适用于读操作远远多于写操作的场景，并且乐观读操作较为频繁的情况。</li><li>特点：支持乐观读和悲观读、写操作，适合读多写少的场景，能够提供更好的并发性能。</li></ul></li></ol><h2 id="reentrantlock" tabindex="-1"><a class="header-anchor" href="#reentrantlock" aria-hidden="true">#</a> ReentrantLock</h2><p>ReentrantLock是Java并发包中提供的一种可重入互斥锁（Reentrant Mutual Exclusion Lock）。它是一种独占锁，也称为独占模式的锁。</p><p>使用ReentrantLock实现一个并发安全的缓存，示例代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.concurrentlab.lock;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantLock;

public class ReentrantLockDemo3 {

    private Map&lt;String, Object&gt; cache = new HashMap&lt;&gt;();

    private final ReentrantLock lock = new ReentrantLock();//默认非公平锁

    
    public void put(String key, Object value) {
        try {
            lock.lock();
            cache.put(key, value);
        } finally {
            lock.unlock();
        }
    }

    public Object get(String key) {
        try {
            lock.lock();
            return cache.get(key);
        } finally {
            lock.unlock();
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="readwritelock" tabindex="-1"><a class="header-anchor" href="#readwritelock" aria-hidden="true">#</a> ReadWriteLock</h2><p>ReadWriteLock是Java并发包中提供的一种读写锁机制，它以更细粒度的方式控制对共享资源的并发访问。</p><p>ReadWriteLock的特点包括：</p><ol><li><p>读锁共享，写锁独占：多个线程可以同时获取读锁，实现读并发性能的提升。<strong>当一个线程获取写锁时，它会独占资源，阻塞其他线程的读和写操作。</strong></p></li><li><p>公平性选择：根据创建ReadWriteLock时的参数，可以选择是否使用公平策略。</p></li><li><p>可重入性：和ReentrantLock一样，读锁和写锁都是可重入的</p></li><li><p>读写分离：ReadWriteLock将读锁和写锁分离，这样可以允许多个读线程同时获取读锁，但只允许一个写线程获取写锁。</p></li></ol><p>使用ReadWriteLock实现一个并发安全的缓存，示例代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ReadWriteLockDemo {

    private Map&lt;String, Object&gt; cache = new HashMap&lt;&gt;();

    private final ReadWriteLock readWriteLock = new ReentrantReadWriteLock();//默认非公平锁
    Lock readLock = readWriteLock.readLock();//读锁和写锁是互斥的
    Lock writeLock = readWriteLock.writeLock();


    public void put(String key, Object value) {
        try {
            writeLock.lock();
            cache.put(key, value);
        } finally {
            writeLock.unlock();
        }
    }

    public Object get(String key) {
        try {
            readLock.lock();
            return cache.get(key);
        } finally {
            readLock.unlock();
        }
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stampedlock" tabindex="-1"><a class="header-anchor" href="#stampedlock" aria-hidden="true">#</a> StampedLock</h2><p>StampedLock是Java 8中引入的一种新的并发锁机制，<strong>属于读写锁的一种扩展</strong>。它比ReentrantLock和ReadWriteLock更加灵活和高效，适用于读多写少的场景。</p><p>StampedLock支持三种模式的访问：</p><ol><li><p>写模式（Write Lock）：<strong>与传统的独占写锁类似，一个线程获取了写锁后，其他线程无法同时获取读锁或写锁</strong>。写模式是排它的，保证了数据的一致性。</p></li><li><p>读模式（Read Lock）：多个线程可以同时获取读锁，在没有线程持有写锁或等待的写锁时，读模式是共享的。<strong>读锁不会阻塞读线程，只有在有线程持有写锁时，读线程会被阻塞。</strong></p></li><li><p>乐观读模式（Optimistic Read）：**乐观读是一种特殊的读模式，与读锁类似，它允许多个线程同时进入，但不会引起冲突。**乐观读并不会阻塞其他线程获取写锁，因此是一种快速的读操作。<strong>在使用乐观读结果进行后续操作前，需要使用validate方法验证数据是否被其他线程修改。</strong></p></li></ol><p>使用StampedLock可以在读多写少的情况下提供更好的性能，但使用时需要注意乐观读操作可能会发生写冲突，需要使用validate方法进行数据验证。此外，<strong>StampedLock并不支持可重入的读模式。</strong></p><p>使用StampedLock实现一个并发安全的缓存，示例代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.concurrentlab.lock;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.StampedLock;

/**
 * StampedLock 的性能之所以比 ReadWriteLock 还要好，
 * 其关键是 StampedLock 支持乐观读的方式。ReadWriteLock
 * 支持多个线程同时读，但是当多个线程同时读的时候，所有的写操作会被阻塞；
 * 而 StampedLock 提供的乐观读，是允许一个线程获取写锁的，
 * 也就是说不是所有的写操作都被阻塞。
 */
public class StampedLockDemo {

    private Map&lt;String, Object&gt; cache = new HashMap&lt;&gt;();

    final StampedLock sl = new StampedLock();//不可重入锁


    public Object get(String key) {
        long stamp = sl.tryOptimisticRead();
        Object result = cache.get(key);
        if (!sl.validate(stamp)) {
            try {
                stamp = sl.tryReadLock();
                result = cache.get(key);
            } finally {
                sl.unlock(stamp);
            }
        }
        return result;

    }

    public void write(String key, Object value) {
        long stamp = 0;
        try {
            stamp = sl.writeLock();
            cache.put(key, value);
        } finally {
            sl.unlock(stamp);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/common/wxcode.png" alt="方志朋_官方公众号" tabindex="0" loading="lazy"><figcaption>方志朋_官方公众号</figcaption></figure>`,23),s=[d];function c(r,t){return e(),n("div",null,s)}const o=i(a,[["render",c],["__file","2023-12-23-juc-locks.html.vue"]]);export{o as default};
