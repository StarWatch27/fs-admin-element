import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios"; //引入axios

// 基础组件
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import "dayjs/locale/zh-cn";
import "./style/common.less";
import i18n from "./i18n";
import store from "./store";
import components from "./components";
import plugin from "./plugin";
// @ts-ignore
const app = createApp(App);

app.config.globalProperties.Axios = Axios; //全局配置axios
app.use(ElementPlus, { size: "default", zIndex: 3000, locale: zhCn });
app.use(router);
app.use(i18n);
app.use(store);
app.use(plugin, { i18n });
app.use(components);
app.mount("#app");
