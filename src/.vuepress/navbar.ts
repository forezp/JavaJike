import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "服务观测",
    icon: "book",
    link: "/observibility/metric/",
  },
  {
    text: "我的Github",
    icon: "book",
    link: "https://github.com/forezp",
  },
]);
