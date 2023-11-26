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
                    icon: "rongqi",
                    prefix: "collection/",
                    collapsible: false,
                    children: [
                        "2023-11-26-collection.md"
                    ],
                },
            ],

            // children: [
            //     {
            //         text: "高频面试题",
            //         icon: "jishufuwu",
            //         prefix: "shortq/",
            //         collapsible: true,
            //         children: [
            //             "2023-11-14-java1.md",
            //             "2023-11-20-java2.md",
            //             "2023-11-26-final.md"
            //         ],
            //     },
            // ],
        }
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
