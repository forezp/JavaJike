```
lang: zh-CN
title: 一次性搞懂设计模式--装饰器模式
headerDepth: 0
description: 一次性搞懂设计模式--装饰器模式
```

装饰器模式的核心思想就是在不改变原有的类的基础之上给类添加新的功能，相当于对原有的类进行类一个包装，它又称为包装器模式。

在Java的IO源码中，使用到了包装器模式，比如在以下的代码中，BufferedReader和FileReader都是使用到包装器模式，各种Reader一层套一层，进行数据的转换或者功能的增强。

```
  fileReader = new FileReader(file);
  bufferedReader = new BufferedReader(fileReader);
```



## UML图



![image-20231102232111957](https://static.javajike.com/img/2023/11/3/image-20231102232111957.jpeg)

上图是装饰器的UML图，在图中一共有三个角色：

- 组件Component，它是目标接口，定义目标的方法
- 组件实现类ComponentImpl，它实现了目标接口
- 装饰器ComponentDecoratorB和ComponentDecoratorA
  - ComponentDecoratorB，它实现了目标接口，并持有组件实现类ComponentImpl
  - ComponentDecoratorA，它实现了目标接口，并持有装饰器ComponentDecoratorB

ComponentImpl提供基本的实现方法，在不改变了ComponentImpl的情况下，ComponentDecoratorB和ComponentDecoratorA分别对ComponentImpl进行了增强。



**什么时候使用装饰器模式**



一般来讲，装饰模式不改变原有类的结构，是不能改变原有的基础功能，只能在原有的基础功能之上做进一步增强。一般情况下，装饰器模式经常使用到以下场景：

- 一个组件可以有很多个装饰器，不同的装饰器有不同的功能，可以按照需要使用不同装饰器组合。在扩展性上，装饰器非常的灵活。
- 原有的类不支持继承，比如使用类final关键字的类。



## 使用案例

在案例模仿JavaIO的文件流的写入和读取功能，在文件流的基础之上使用装饰器模式，做下面的增强功能：

- 加密装饰器：对写入文件的字符的加密，对读取的字符进行解密
- 压缩解压装饰器：对写入字符进行压缩，对读取的字符进行解压

可以通过顺序组合包装的方式来附加扩张功能，比如可以先使用加密装饰器，后使用压缩解压装饰器；也可以把他们的顺序对调。

首先，定义一个目标接口ReaderWriter，它有读取和写入的功能：

```
public interface ReaderWriter {
    String read();
    void write(String content);
}
```

ReaderWriter的基本实现类是FileReaderWriter，它可以把字符写入到文件中，也可以读取文件的字符。

```
public class FileReaderWriter implements ReaderWriter {

    private String filePath;

    public FileReaderWriter(String filePath) {
        this.filePath = filePath;
    }

    @Override
    public String read() {
        StringBuilder sb = new StringBuilder();
        File file = new File(filePath);
        BufferedReader bufferedReader = null;
        FileReader fileReader = null;
        try {
            fileReader = new FileReader(file);
            bufferedReader = new BufferedReader(fileReader);
            String s;
            while ((s = bufferedReader.readLine()) != null) {
                sb.append(s);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileReader != null) {
                    fileReader.close();
                }
                if (bufferedReader != null) {
                    bufferedReader.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return sb.toString();
    }

    @Override
    public void write(String content) {
        File file = new File(filePath);

        FileWriter fileWriter = null;
        BufferedWriter bufferedWriter = null;
        try {
            fileWriter = new FileWriter(file);
            bufferedWriter = new BufferedWriter(fileWriter);
            bufferedWriter.write(content);
            bufferedWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fileWriter != null) {
                    fileWriter.close();
                }
                if (bufferedWriter != null) {
                    bufferedWriter.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

EncryptionFileReaderWriter是一个装饰器，它实现了ReaderWriter接口，并持有ReaderWriter的实现类FileReaderWriter，对它进行功能的增强：

- 在写入文件之前，对写入的字符进行加密
- 在读取文件的字符之后 ，对读取的字符进行解密

```
public class EncryptionFileReaderWriter implements ReaderWriter{
    private ReaderWriter readerWriter;

    public EncryptionFileReaderWriter(ReaderWriter readerWriter) {
        this.readerWriter = readerWriter;
    }

    @Override
    public String read() {
        return decode(readerWriter.read());
    }

    @Override
    public void write(String content) {
       readerWriter.write(encode(content));
    }

    private String encode(String data) {
        byte[] result = data.getBytes();
        for (int i = 0; i < result.length; i++) {
            result[i] += (byte) 1;
        }
        return Base64.getEncoder().encodeToString(result);
    }
    private String decode(String data) {
        byte[] result = Base64.getDecoder().decode(data);
        for (int i = 0; i < result.length; i++) {
            result[i] -= (byte) 1;
        }
        return new String(result);
    }
}
```

CompressionFileReaderWriter是一个装饰器，它实现了ReaderWriter接口，并持有ReaderWriter的实现类FileReaderWriter，对它进行功能的增强：

- 在写入文件之前，对写入的字符进行压缩
- 在读取文件的字符之后 ，对读取的字符进行解压

```
public class CompressionFileReaderWriter implements ReaderWriter {
    private ReaderWriter readerWriter;

    public CompressionFileReaderWriter(ReaderWriter readerWriter) {
        this.readerWriter = readerWriter;
    }

    @Override
    public String read() {
        return decompress(readerWriter.read());
    }

    @Override
    public void write(String content) {
        readerWriter.write(compress(content));
    }

    private String compress(String stringData) {
        byte[] data = stringData.getBytes();
        try {
            ByteArrayOutputStream bout = new ByteArrayOutputStream(512);
            DeflaterOutputStream dos = new DeflaterOutputStream(bout, new Deflater());
            dos.write(data);
            dos.close();
            bout.close();
            return Base64.getEncoder().encodeToString(bout.toByteArray());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String decompress(String stringData) {
        byte[] data = Base64.getDecoder().decode(stringData);
        try {
            InputStream in = new ByteArrayInputStream(data);
            InflaterInputStream iin = new InflaterInputStream(in);
            ByteArrayOutputStream bout = new ByteArrayOutputStream(512);
            int b;
            while ((b = iin.read()) != -1) {
                bout.write(b);
            }
            in.close();
            iin.close();
            bout.close();
            return new String(bout.toByteArray());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
```

写一个客户端测试类：

- 定义一个写入的字符串text
- 定义文件的写入或者读取的路径
- 然后使用装饰器模式，嵌套了两个装饰器（加减密装饰器和压缩解缩的装饰器），对写入的字符进行先加密再压缩；对读取的字符进行先解压再解密。

具体实现如下：

```
public class Client {

    public static void main(String[] args) {
        String text = "fangzhipeng.com";
        String filePath="/Users/forezp/Downloads//test.txt";
        System.out.println("原始内容："+text);
        ReaderWriter rw = new CompressionFileReaderWriter(new EncryptionFileReaderWriter(new FileReaderWriter(filePath)));
        rw.write(text);

        FileReaderWriter fileReaderWriter=new FileReaderWriter(filePath);
        //
        System.out.println("加密后、压缩后的内容为："+fileReaderWriter.read());

        System.out.println("解密后、解缩后的内容为："+rw.read());
    }
}
```

执行测试类，控制台打出的结果如下：

>原始内容：fangzhipeng.com
>加密后、压缩后的内容为：Zkt5TVQ5eU1zOXNKTUZrT1Q6ZU17dDlHQkVFSENnOT4=
>解密后、解缩后的内容为：fangzhipeng.com
>
>Process finished with exit code 0



## 为什么要使用装饰器模式？

在讲解完具体案例后，我们来思考一下，为什么要使用装饰器模式，主要原因：

- 能够快速的扩展现有类的功能，并能自由组合包装各种装饰器，达到不同的效果，也就是能够根据需求，快速的装载和卸载装饰器
- 希望继承原有类的功能，但又不方便继承。

使用装饰器模式有以下的优点：

- 代码的可扩展性和可复用性非常的强，对一些基础类无法修改，需要扩展功能的时候，采用装饰器模式能够快速的扩展功能，同时有不会影响原有的公民
- 满足单一职责的原则。基本功能实现类和不同的装饰器只实现自己的独一的功能，后面加一些功能，可以增加新的装饰器。
- 可以快速装载和卸载增强功能
- 可以快速组合，通过包装不同的装饰器组合来满足自己的业务需求



## 源码下载

