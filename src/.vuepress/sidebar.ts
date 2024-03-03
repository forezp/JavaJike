import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    // "/": [
    //   "",
    //   {
    //     text: "案例",
    //     icon: "laptop-code",
    //     prefix: "demo/",
    //     link: "demo/",
    //     children: "structure",
    //   },
    //   {
    //     text: "文档",
    //     icon: "book",
    //     prefix: "guide/",
    //     children: "structure",
    //   },
    // ],
    "/interview/": [
        {
            text: "设计模式",
            prefix: "design/",
            icon: "star",
            collapsible: true,
            //link: "design/",
            children: "structure",
        },
        {
            text: "java基础",
            prefix: "basic/",
            icon: "java",
            collapsible: true,
            //link: "design/",
            children: [
                {
                    text: "高频面试题",
                    icon: "jishufuwu",
                    prefix: "shortq/",
                    collapsible: false,
                    children: [
                        "2023-11-14-java1.md",
                        "2023-11-20-java2.md",
                        "2023-11-26-final.md"
                    ],
                },
                {
                    text: "集合类",
                    icon: "haxi",
                    prefix: "collection/",
                    collapsible: false,
                    children: [
                        "2023-11-26-collection.md",
                        "2023-11-27-arraylist-source.md",
                        "2023-11-29-linkedlist-source.md",
                        "2023-12-02-hashmap-source.md",
                        "2023-12-03-hashset-source.md",
                        "2023-12-04-bitset-intro.md"
                    ],
                },
                {
                    text: "Java IO",
                    icon: "jishufuwu",
                    prefix: "io/",
                    collapsible: false,
                    children: [
                        "2023-12-04-io.md",
                        "2023-12-05-nio.md",
                        "2023-12-08-nio2.md"
                    ],
                },
            ],

        },
        {
            text: "并发编程",
            prefix: "concurrent/",
            icon: "kuaisugaoxiao",
            collapsible: true,
            //link: "design/",
            children: [
                {
                    text: "并发理论",
                    icon: "yuanchengchuantou",
                    prefix: "basic/",
                    collapsible: false,
                    children: "structure",
                },
                {
                    text: "并发工具类",
                    icon: "shijianchuo",
                    prefix: "tools/",
                    collapsible: false,
                    children: "structure",
                },
            ],
        }, {
            text: "Mysql",
            prefix: "mysql/",
            icon: "cangchucangku",
            collapsible: true,
            //link: "design/",
            children: "structure",
        },
    ],
    "/observibility/": [
        {
            text: "Prometheus简明教程",
            icon: "hot",
            collapsible: true,
            prefix: "metric/",
            // link: "metric/",
            children: "structure",
        },
    ]
});
