const e=JSON.parse('{"key":"v-620122cd","path":"/interview/concurrent/tools/2023-12-18-retranlock.html","title":"ReentrantLock源码解析","lang":"zh-CN","frontmatter":{"lang":"zh-CN","title":"ReentrantLock源码解析","headerDepth":1,"order":2,"icon":"wuliu","collapsible":false,"description":"ReentrantLock源码解析","head":[["meta",{"property":"og:url","content":"https://www.fangzhipeng.com/interview/concurrent/tools/2023-12-18-retranlock.html"}],["meta",{"property":"og:site_name","content":"编程笔记"}],["meta",{"property":"og:title","content":"ReentrantLock源码解析"}],["meta",{"property":"og:description","content":"ReentrantLock源码解析"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-18T15:01:17.000Z"}],["meta",{"property":"article:author","content":"fangzhipeng"}],["meta",{"property":"article:modified_time","content":"2023-12-18T15:01:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ReentrantLock源码解析\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-12-18T15:01:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fangzhipeng\\",\\"url\\":\\"https://www.fangzhipeng.com\\"}]}"]]},"headers":[{"level":2,"title":"ReentrantLock数据结构","slug":"reentrantlock数据结构","link":"#reentrantlock数据结构","children":[]},{"level":2,"title":"ReentrantLock类继承关系","slug":"reentrantlock类继承关系","link":"#reentrantlock类继承关系","children":[]},{"level":2,"title":"类的属性","slug":"类的属性","link":"#类的属性","children":[]},{"level":2,"title":"类的构造函数","slug":"类的构造函数","link":"#类的构造函数","children":[]},{"level":2,"title":"类的内部类","slug":"类的内部类","link":"#类的内部类","children":[{"level":3,"title":"Sync类","slug":"sync类","link":"#sync类","children":[]},{"level":3,"title":"NonfairSync类","slug":"nonfairsync类","link":"#nonfairsync类","children":[]},{"level":3,"title":"FairSyn类","slug":"fairsyn类","link":"#fairsyn类","children":[]}]},{"level":2,"title":"ReentrantLock在Dubbo中的使用","slug":"reentrantlock在dubbo中的使用","link":"#reentrantlock在dubbo中的使用","children":[]},{"level":2,"title":"ReentrantLock使用示例","slug":"reentrantlock使用示例","link":"#reentrantlock使用示例","children":[]},{"level":2,"title":"ReentrantLock的特点总结","slug":"reentrantlock的特点总结","link":"#reentrantlock的特点总结","children":[]}],"git":{"createdTime":1702911677000,"updatedTime":1702911677000,"contributors":[{"name":"forezp","email":"124746406@qq.com","commits":1}]},"readingTime":{"minutes":7.28,"words":2184},"filePathRelative":"interview/concurrent/tools/2023-12-18-retranlock.md","localizedDate":"2023年12月18日","excerpt":""}');export{e as data};
