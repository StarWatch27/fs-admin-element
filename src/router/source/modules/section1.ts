export const section1 = [
  {
    title: "第一章",
    name: "section1",
    path: "/section1",
    redirect: "/section1/func1",
    meta: {
      icon: "ion:apps-sharp"
    },
    children: [
      {
        title: "功能1",
        name: "section1-func1",
        path: "/section1/func1",
        component: "/section1/func1/index.vue"
      },
      {
        title: "功能2",
        name: "section1-func2",
        path: "/section1/func2",
        component: "/section1/func2/index.vue"
      }
    ]
  }
];
