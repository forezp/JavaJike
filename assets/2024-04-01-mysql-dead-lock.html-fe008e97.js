const e=JSON.parse('{"key":"v-375c71cc","path":"/interview/mysql/2024-04-01-mysql-dead-lock.html","title":"","lang":"zh-CN","frontmatter":{"description":"之前在Java并发中讲解了产生死锁的条件： 1. 互斥条件（Mutual Exclusion）：共享资源 X 和 Y 只能被一个线程占用； 2. 占有且等待（Hold and Wait）：线程 T1 已经取得共享资源 X，在等待共享资源 Y 的时候，不释放共享资源 X； 3. 不可抢占（No Preemption）：其他线程不能强行抢占线程 T1 占有...","head":[["meta",{"property":"og:url","content":"https://www.fangzhipeng.com/interview/mysql/2024-04-01-mysql-dead-lock.html"}],["meta",{"property":"og:site_name","content":"编程笔记"}],["meta",{"property":"og:description","content":"之前在Java并发中讲解了产生死锁的条件： 1. 互斥条件（Mutual Exclusion）：共享资源 X 和 Y 只能被一个线程占用； 2. 占有且等待（Hold and Wait）：线程 T1 已经取得共享资源 X，在等待共享资源 Y 的时候，不释放共享资源 X； 3. 不可抢占（No Preemption）：其他线程不能强行抢占线程 T1 占有..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-28T15:01:15.000Z"}],["meta",{"property":"article:author","content":"fangzhipeng"}],["meta",{"property":"article:modified_time","content":"2024-03-28T15:01:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-28T15:01:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"fangzhipeng\\",\\"url\\":\\"https://www.fangzhipeng.com\\"}]}"]]},"headers":[{"level":2,"title":"在什么情况下会导致mysql死锁产生","slug":"在什么情况下会导致mysql死锁产生","link":"#在什么情况下会导致mysql死锁产生","children":[]},{"level":2,"title":"如何排除Mysql死锁","slug":"如何排除mysql死锁","link":"#如何排除mysql死锁","children":[]}],"git":{"createdTime":1711638075000,"updatedTime":1711638075000,"contributors":[{"name":"forezp","email":"124746406@qq.com","commits":1}]},"readingTime":{"minutes":3.68,"words":1105},"filePathRelative":"interview/mysql/2024-04-01-mysql-dead-lock.md","localizedDate":"2024年3月28日","autoDesc":true,"excerpt":""}');export{e as data};
