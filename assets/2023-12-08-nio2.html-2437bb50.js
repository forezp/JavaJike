import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-4b8de602.js";const i={},t=e(`<h2 id="socketchannel介绍" tabindex="-1"><a class="header-anchor" href="#socketchannel介绍" aria-hidden="true">#</a> SocketChannel介绍</h2><p>SocketChannel 是 Java NIO 中用于 TCP 网络通信的通道之一。它提供了非阻塞的 TCP 客户端和服务器端的实现，并且可以与选择器（Selector）一起使用，实现高效的多路复用 I/O。通过 SocketChannel，可以进行连接的建立、数据的读写以及连接的关闭操作。</p><p>在使用 SocketChannel 时，通常需要遵循以下步骤：</p><ol><li>打开 SocketChannel：通过调用静态的 open() 方法来打开一个 SocketChannel 对象。</li><li>连接远程服务器：调用 SocketChannel 的 connect() 方法来连接远程服务器。</li><li>读写数据：通过 SocketChannel 对象的 read() 方法进行数据的读取，通过 write() 方法进行数据的写入。</li><li>非阻塞模式：SocketChannel 可以通过 configureBlocking(false) 方法设置为非阻塞模式，配合选择器一起使用可以实现高效的多路复用 I/O。</li><li>关闭通道：通信结束后，调用 SocketChannel 的 close() 方法关闭通道。</li></ol><p>示例代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 打开 SocketChannel</span>
<span class="token class-name">SocketChannel</span> socketChannel <span class="token operator">=</span> <span class="token class-name">SocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 连接远程服务器</span>
socketChannel<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token string">&quot;服务器IP&quot;</span><span class="token punctuation">,</span> <span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 读取数据</span>
<span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> bytesRead <span class="token operator">=</span> socketChannel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 写入数据</span>
<span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;Hello, Server!&quot;</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>buffer<span class="token punctuation">.</span><span class="token function">hasRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    socketChannel<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 非阻塞模式</span>
socketChannel<span class="token punctuation">.</span><span class="token function">configureBlocking</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 关闭通道</span>
socketChannel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SocketChannel 提供了灵活而高效的 TCP 网络通信能力，适用于需要使用非阻塞 I/O 和高并发处理的网络编程场景。</p><h2 id="serversocketchannel介绍" tabindex="-1"><a class="header-anchor" href="#serversocketchannel介绍" aria-hidden="true">#</a> ServerSocketChannel介绍</h2><p>ServerSocketChannel 是 Java NIO 中用于 TCP 服务器端的通道之一。它用于监听客户端的连接请求，并在接受到连接请求时创建对应的 SocketChannel 与客户端进行通信。ServerSocketChannel 可以与选择器（Selector）一起使用，实现高效的多路复用 I/O。通过 ServerSocketChannel，可以进行服务器的初始化、接受连接、数据的读写以及关闭操作。</p><p>在使用 ServerSocketChannel 时，通常需要遵循以下步骤：</p><ol><li>打开 ServerSocketChannel：通过调用静态的 open() 方法来打开一个 ServerSocketChannel 对象。</li><li>绑定端口：通过 ServerSocketChannel 对象的 bind() 方法绑定服务器端口，并设置为非阻塞模式。</li><li>接受连接：调用 accept() 方法来接受客户端的连接请求，返回一个对应的 SocketChannel 用于与客户端进行通信。</li><li>读写数据：通过返回的 SocketChannel 对象进行数据的读取和写入。</li><li>非阻塞模式：ServerSocketChannel 可以通过 configureBlocking(false) 方法设置为非阻塞模式，配合选择器一起使用可以实现高效的多路复用 I/O。</li><li>关闭通道：通信结束后，关闭 ServerSocketChannel。</li></ol><p>示例代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 打开 ServerSocketChannel</span>
<span class="token class-name">ServerSocketChannel</span> serverSocketChannel <span class="token operator">=</span> <span class="token class-name">ServerSocketChannel</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 绑定端口并设置非阻塞模式</span>
serverSocketChannel<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InetSocketAddress</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
serverSocketChannel<span class="token punctuation">.</span><span class="token function">configureBlocking</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 接受连接</span>
<span class="token class-name">SocketChannel</span> socketChannel <span class="token operator">=</span> serverSocketChannel<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 读取数据</span>
<span class="token class-name">ByteBuffer</span> buffer <span class="token operator">=</span> <span class="token class-name">ByteBuffer</span><span class="token punctuation">.</span><span class="token function">allocate</span><span class="token punctuation">(</span><span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> bytesRead <span class="token operator">=</span> socketChannel<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 写入数据</span>
<span class="token class-name">String</span> data <span class="token operator">=</span> <span class="token string">&quot;Hello, Client!&quot;</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
buffer<span class="token punctuation">.</span><span class="token function">flip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>buffer<span class="token punctuation">.</span><span class="token function">hasRemaining</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    socketChannel<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>buffer<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 关闭连接</span>
socketChannel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 关闭 ServerSocketChannel</span>
serverSocketChannel<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ServerSocketChannel 提供了灵活而高效的 TCP 服务器端编程能力，适用于需要使用非阻塞 I/O 和高并发处理的网络服务器编程场景。</p><h2 id="selector介绍" tabindex="-1"><a class="header-anchor" href="#selector介绍" aria-hidden="true">#</a> Selector介绍</h2><p>Selector 是 Java NIO 中非常重要的组件，用于多路复用非阻塞 I/O。使用 Selector 可以用单线程处理多个 Channel，这样就可以管理多个网络连接，并且在有数据可读或可写的通道上进行处理，提高了 I/O 操作的效率。</p><p>Selector 的主要作用包括：</p><ol><li>监控多个 Channel 的事件：比如读、写、连接、接受连接等事件。</li><li>管理注册的 Channel：可以将多个 Channel 注册到一个 Selector 上，并根据事件类型进行监听。</li><li>非阻塞 I/O 多路复用：在一个线程内处理多个 Channel 的 I/O 事件，提高了系统的并发处理能力。</li></ol><p>在使用 Selector 时，通常需要遵循以下步骤：</p><ol><li>打开 Selector：通过调用 Selector.open() 方法创建一个 Selector 对象。</li><li>将 Channel 注册到 Selector 上：通过调用 Channel 的 register() 方法将要监听的事件和对应的事件处理器注册到 Selector 上。</li><li>轮询事件：通过调用 Selector 的 select() 方法来轮询已注册的 Channel 上是否有对应的 I/O 事件发生。</li><li>处理事件：根据 select() 方法的返回值，处理具体的 I/O 事件。</li></ol><p>示例代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 打开 Selector</span>
<span class="token class-name">Selector</span> selector <span class="token operator">=</span> <span class="token class-name">Selector</span><span class="token punctuation">.</span><span class="token keyword">open</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 将 Channel 注册到 Selector 上</span>
channel1<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>selector<span class="token punctuation">,</span> <span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_READ</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
channel2<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>selector<span class="token punctuation">,</span> <span class="token class-name">SelectionKey</span><span class="token punctuation">.</span><span class="token constant">OP_WRITE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 轮询事件</span>
    <span class="token keyword">int</span> readyChannels <span class="token operator">=</span> selector<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>readyChannels <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SelectionKey</span><span class="token punctuation">&gt;</span></span> selectedKeys <span class="token operator">=</span> selector<span class="token punctuation">.</span><span class="token function">selectedKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">SelectionKey</span><span class="token punctuation">&gt;</span></span> keyIterator <span class="token operator">=</span> selectedKeys<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>keyIterator<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SelectionKey</span> key <span class="token operator">=</span> keyIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">isAcceptable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 处理接受连接事件</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">isReadable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 处理读事件</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">isWritable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 处理写事件</span>
        <span class="token punctuation">}</span>
        keyIterator<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Selector 提供了高效的事件多路复用能力，适用于需要同时处理多个 Channel 的网络编程场景，能够实现高性能的并发 I/O 操作。</p><h2 id="案列介绍" tabindex="-1"><a class="header-anchor" href="#案列介绍" aria-hidden="true">#</a> 案列介绍</h2><ul><li>服务端使用ServerSocketChannel和Selector</li><li>客户端使用SocketChannel</li><li>服务器端不关闭不停接收客户端的数据，并返回接收结果给客户端 。</li><li>ClientA不关闭不断发送数据给服务端</li></ul><h3 id="服务端代码" tabindex="-1"><a class="header-anchor" href="#服务端代码" aria-hidden="true">#</a> 服务端代码</h3><p>使用 Java NIO（New I/O）包实现的简单的基于 NIO 的服务器端程序，示例代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.javabasiclab.nio;


import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

public class ServerConnect {
    private static final int BUF_SIZE = 1024;
    private static final int PORT = 8080;
    private static final int TIMEOUT = 3000;

    public static void main(String[] args) {
        selector();
    }

    public static void handleAccept(SelectionKey key) throws IOException {
        ServerSocketChannel ssChannel = (ServerSocketChannel) key.channel();
        SocketChannel sc = ssChannel.accept();
        sc.configureBlocking(false);
        sc.register(key.selector(), SelectionKey.OP_READ, ByteBuffer.allocateDirect(BUF_SIZE));
    }

    public static void handleRead(SelectionKey key) throws IOException {
        SocketChannel sc = (SocketChannel) key.channel();
        ByteBuffer buf = (ByteBuffer) key.attachment();
        long bytesRead = sc.read(buf);
        while (bytesRead &gt; 0) {
            buf.flip();
            while (buf.hasRemaining()) {
                System.out.print((char) buf.get());
            }
            System.out.println();
            buf.clear();
            bytesRead = sc.read(buf);
        }
        buf.put((&quot;服务器端成功接收信息.&quot;).getBytes());
        buf.flip();
        sc.write(buf);
        buf.clear();
        if (bytesRead == -1) {
            sc.close();
        }
    }

    public static void handleWrite(SelectionKey key) throws IOException {
        System.out.println(&quot;write to client&quot;);
        ByteBuffer buf = (ByteBuffer) key.attachment();
        buf.flip();
        String data = &quot;Hello, Client!&quot;;
        buf.put(data.getBytes(StandardCharsets.UTF_8));
        SocketChannel sc = (SocketChannel) key.channel();
        while (buf.hasRemaining()) {
            sc.write(buf);
        }
        buf.compact();
    }

    public static void selector() {
        Selector selector = null;
        ServerSocketChannel ssc = null;
        try {
            selector = Selector.open();
            ssc = ServerSocketChannel.open();
            ssc.socket().bind(new InetSocketAddress(PORT));
            ssc.configureBlocking(false);
            ssc.register(selector, SelectionKey.OP_ACCEPT);

            while (true) {
                if (selector.select(TIMEOUT) == 0) {
                    System.out.println(&quot;==&quot;);
                    continue;
                }
                Iterator&lt;SelectionKey&gt; iter = selector.selectedKeys().iterator();
                while (iter.hasNext()) {
                    SelectionKey key = iter.next();
                    if (key.isAcceptable()) {
                        handleAccept(key);
                    }
                    if (key.isReadable()) {
                        handleRead(key);
                    }
                    if (key.isWritable() &amp;&amp; key.isValid()) {
                        handleWrite(key);
                    }
                    if (key.isConnectable()) {
                        System.out.println(&quot;isConnectable = true&quot;);
                    }
                    iter.remove();
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (selector != null) {
                    selector.close();
                }
                if (ssc != null) {
                    ssc.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个程序使用 Selector 来监听多个 Channel，并根据不同的事件类型进行处理。</p><p>主要功能包括：</p><ul><li><p>在 <code>selector()</code> 方法中，首先打开一个 Selector，并创建一个 ServerSocketChannel，并将其注册到 Selector 上，并且设置为非阻塞模式。然后进入一个无限循环，不断轮询 Selector 上注册的事件。</p></li><li><p>在 <code>handleAccept(SelectionKey key)</code> 方法中，当有新连接到来时，调用 <code>ServerSocketChannel.accept()</code> 方法接收连接，并将其设置为非阻塞模式，并注册到 Selector 上以监听读事件。</p></li><li><p>在 <code>handleRead(SelectionKey key)</code> 方法中，处理读事件。它先创建一个 ByteBuffer 对象，用来读取数据。然后通过 SocketChannel 的 read 方法从 Channel 中读取数据，将其打印到控制台，并向客户端发送&quot;服务器端成功接收信息&quot;。</p></li><li><p>在 <code>handleWrite(SelectionKey key)</code> 方法中，处理写事件。它首先创建一个 ByteBuffer 对象，并向其中放入要发送给客户端的数据&quot;Hello, Client!&quot;，然后通过 SocketChannel 的 write 方法向客户端写入数据。</p></li><li><p>在 <code>selector()</code> 方法中，通过无限循环不断调用 <code>Selector.select()</code> 等待事件就绪，一旦有就绪的事件，就遍历处理相应的事件类型。</p></li></ul><p>这段代码实现了一个基于 Java NIO 的简单的非阻塞服务器端程序，能够同时处理多个客户端连接，并实现了事件的注册、轮询和处理。</p><h3 id="客户端代码" tabindex="-1"><a class="header-anchor" href="#客户端代码" aria-hidden="true">#</a> 客户端代码</h3><p>使用 Java NIO（New I/O）包实现了基于 NIO 的客户端程序，示例代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package io.github.forezp.javabasiclab.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.util.concurrent.TimeUnit;

public class ClientConnect {

    public static void main(String[] args) {
        try {
            client();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void client() throws IOException {
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        SocketChannel socketChannel = null;
        try {
            socketChannel = SocketChannel.open();
            socketChannel.configureBlocking(false);
            socketChannel.connect(new InetSocketAddress(&quot;127.0.0.1&quot;, 8080));

            if (socketChannel.finishConnect()) {
                int i = 0;
                while (true) {

                    TimeUnit.SECONDS.sleep(1);
                    String info = &quot;I&#39;m &quot; + i++ + &quot;-th information from client&quot;;
                    buffer.clear();
                    buffer.put(info.getBytes());
                    buffer.flip();
                    while (buffer.hasRemaining()) {
                        //System.out.println(new String(buffer.array()));
                        socketChannel.write(buffer);
                    }
                    //
                    buffer.clear();
                    int len = socketChannel.read(buffer);
                    buffer.flip();
                    byte[] bytes = new byte[buffer.remaining()];
                    buffer.get(bytes);
                    System.out.println(new String(bytes, 0 , len));
                    buffer.clear();
                }
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        } finally {
            try {
                if (socketChannel != null) {
                    socketChannel.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码的主要功能包括：</p><ul><li>在 <code>client()</code> 方法中，首先创建一个 ByteBuffer 对象用于读写数据，然后创建一个 SocketChannel，并将其设置为非阻塞模式。接着通过 <code>socketChannel.connect(new InetSocketAddress(&quot;127.0.0.1&quot;, 8080))</code> 进行连接服务器端。</li><li>使用 <code>socketChannel.finishConnect()</code> 来确保连接已经建立，然后进入一个无限循环，向服务器端发送消息，并接收服务器端的响应。</li><li>在while循环中，每隔一秒向服务器端发送一条消息，并且接收服务器端发送的反馈消息。</li><li>在 <code>finally</code> 块中关闭 SocketChannel。</li></ul><p>这段代码实现了一个基于 Java NIO 的简单的非阻塞客户端程序，能够与服务器端建立连接，进行数据的发送和接收。</p><p><strong>依次启动服务端程序和客户端程序</strong>，服务端打印如下：</p><blockquote><p>==<br> I&#39;m 0-th information from client<br> I&#39;m 1-th information from client<br> I&#39;m 2-th information from client<br> I&#39;m 3-th information from client</p></blockquote><p>客户端打印如下：</p><blockquote><p>服务器端成功接收信息.<br> 服务器端成功接收信息.<br> 服务器端成功接收信息.</p></blockquote><h2 id="nio底层原理" tabindex="-1"><a class="header-anchor" href="#nio底层原理" aria-hidden="true">#</a> NIO底层原理</h2><p>NIO的特点是由底层原理决定的，如图：</p><figure><img src="https://static-1254191423.cos.ap-shanghai.myqcloud.com/img/2023/12/8/nio-jieshao.png" alt="nio-jieshao" tabindex="0" loading="lazy"><figcaption>nio-jieshao</figcaption></figure><p>总结来说，和阻塞 I/O（BIO）相比，使用多路复用器（比如 Selector）和非阻塞 I/O（NIO）的方式能够更高效地处理多个连接的读写事件。</p><p>在使用 NIO 的情况下，当调用 <code>select()</code> 启动多路复用器时，连接事件会被交由多路复用器管理，这会触发内核中的 epoll() 函数，将网卡中所有连接的读写事件数据以链表的形式一次性拷贝到内存中的特定区域。这样一来，当 Selector 轮询到连接事件时便会触发内核中的 recvFrom(NOBlocking…) 函数，将数据从特定区域零拷贝到用户空间，实现了零拷贝的优化功能。</p><p>与阻塞 I/O 不同的是，使用 NIO 和 Selector 能够保证即使某个连接阻塞，也不会影响其他连接的数据已就绪的读写事件。这是因为在 Selector 的轮询机制下，各个客户端的数据已经提前拷贝到内存中，所以不会因为某个连接的阻塞而影响其他连接的读写事件的处理。</p><p>因此，使用 NIO 和 Selector 能够更高效地处理多个连接的读写事件，并且能够避免阻塞影响其他连接的特点成为了非常重要的优势。</p>`,49),l=[t];function c(o,p){return s(),a("div",null,l)}const d=n(i,[["render",c],["__file","2023-12-08-nio2.html.vue"]]);export{d as default};
