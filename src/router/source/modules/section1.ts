export const section1 = [
  {
    title: "深度神经网络XXX",
    name: "section1",
    path: "/section1",
    redirect: "/section1/func1",
    meta: {
      icon: "ion:apps-sharp"
    },
    children: [
      {
        title: "深度神经网络故障检测",
        name: "section1",
        path: "/section1",
        redirect: "/section1/func1",
        // component: "/section1/func1/index.vue"，
        children: [
          {
            title: "基于对抗样本的方法",
            name: "section1-func1",
            path: "/section1/func1",
            component: "/section1/func1/index.vue"
          },
          {
            title: "XXX",
            name: "section1-func2",
            path: "/section1/func2",
            component: "/section1/func2/index.vue"
          }
        ]
      },
      {
        title: "深度神经网络覆盖测试分析",
        name: "section2",
        path: "/section2",
        redirect: "/section2/func1",
        // component: "/section2/func1/index.vue",
        children: [
          {
            title: "XXX",
            name: "section2-func1",
            path: "/section2/func1",
            component: "/section2/func1/index.vue"
          }
        ]
      },
      {
        title: "深度神经网络故障检测和定位",
        name: "section3",
        path: "/section3",
        redirect: "/section3/func1",
        // component: "/section3/func1/index.vue",
        children: [
          {
            title: "故障特征展示",
            name: "section3-func1",
            path: "/section3/func1",
            component: "/section3/func1/index.vue"
          },
          {
            title: "故障特征提取",
            name: "section3-func2",
            path: "/section3/func2",
            component: "/section3/func2/index.vue"
          },
          {
            title: "故障特征分析",
            name: "section3-func3",
            path: "/section3/func3",
            component: "/section3/func3/index.vue"
          },
          {
            title: "故障定位",
            name: "section3-func4",
            path: "/section3/func4",
            component: "/section3/func4/index.vue"
          }
        ]
      }
    ]
  }
];
