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
  "/observibility/":[
    {
      text: "打造亿级流量的监控系统",
      icon: "laptop-code",
      prefix: "metric/",
      link: "metric/",
      children: "structure",
    },
  ]
});
