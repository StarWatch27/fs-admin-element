<template>
  <fs-page class="1">
    <fs-crud ref="crudRef" v-bind="crudBinding" />
  </fs-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useFsAsync, useFsRef } from "@fast-crud/fast-crud";
import createCrudOptions from "./crud"; // 导出crud.ts中的默认内容，即文件中的default方法

const { crudRef, crudBinding, context } = useFsRef();
// context.xxx = xxx //可以传递自定义变量到crud.tsx
// 页面打开后获取列表数据
onMounted(async () => {
  const { crudExpose } = await useFsAsync({ crudRef, crudBinding, context, createCrudOptions });
  crudExpose.doRefresh();
});
</script>
