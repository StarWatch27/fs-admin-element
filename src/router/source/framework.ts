import LayoutFramework from "/src/layout/layout-framework.vue";
import { crudResources } from "/@/router/source/modules/crud";
import { sysResources } from "/@/router/source/modules/sys";
import { section1 } from "/@/router/source/modules/section1";
import { section2 } from "/@/router/source/modules/section2";

export const frameworkResource = [
  {
    title: "框架",
    name: "framework",
    path: "/",
    redirect: "/index",
    component: LayoutFramework,
    meta: {
      icon: "ion:accessibility"
    },
    children: [
      {
        title: "首页",
        name: "index",
        path: "/index",
        component: "/framework/home/index.vue",
        meta: {
          fixedAside: true,
          showOnHeader: false,
          icon: "ion:home-outline"
        }
      },
      ...section1,
      ...section2,
      ...crudResources,
      ...sysResources // 用户信息管理
    ]
  }
];
console.assert(frameworkResource.length === 1, "frameworkResource数组长度只能为1，你只能配置framework路由的子路由");
