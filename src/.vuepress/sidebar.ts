import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "案例",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文档",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
  ],
  "/interview/": [
    {
      text: "设计模式",
      prefix: "design/",
      icon: "star",
      collapsible: true,
      //link: "design/",
      children: "structure",
    }
  ],
  "/observibility/":[
    {
      text: "打造亿级流量的监控系统",
      icon: "hot",
      collapsible: true,
      prefix: "metric/",
      // link: "metric/",
      children: "structure",
    },
  ]
});
