<template>
  <div style="text-align: center">
    <el-row style="display: flex;justify-content: space-around;margin:20% auto 10%;">
      <el-col :span="6">
        input1:{{input1}}
        <el-select
            v-model="input1"
            placeholder="s1"
            size="large"
            style="width: 240px"
            @change="printLog"
        >
          <el-option :key="1" value="1" label="55"></el-option>
          <el-option :key="2" value="2" label="66"></el-option>
          <el-option :key="3" value="3" label="77"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
            v-model="input2"
            placeholder="s2"
            size="large"
            style="width: 240px"
            @change="printLog">
          <el-option :key="1" value="4" label="4"></el-option>
          <el-option :key="2" value="5" label="5"></el-option>
          <el-option :key="3" value="6" label="6"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select
            v-model="input3"
            placeholder="s3"
            size="large"
            style="width: 240px"
            @change="printLog">
          <el-option :key="1" value="7" label="7"></el-option>
          <el-option :key="2" value="8" label="8"></el-option>
          <el-option :key="3" value="9" label="9"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18"></el-col>
      <el-col :span="6">
        <el-button type="primary" @click="submit">确认</el-button>
      </el-col>
    </el-row>

    <!--  <fs-page class="page-layout-card">-->
    <!--    <fs-crud ref="crudRef" v-bind="crudBinding"></fs-crud>-->
    <!--  </fs-page>-->
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from "vue";
import {useCrud} from "@fast-crud/fast-crud";
import createCrudOptions from "./crud";
import {useExpose} from "@fast-crud/fast-crud";
import axios from "axios";
export default {
  name:"BasisLayoutCard",//组件名称（对外）
  data() {//数据，变量
    return {
      input1: "",
      input2: "",
      input3: "",
    };
  },
  methods:{
    printLog(){
      console.log("123")
    },
    submit(){
      const _this=this;
      axios.get('/func/get/55').then(res => {
        console.log("res",res) // 打印一下响应数据
      }).catch(error=>{
        console.log("ERROR:",error)
      })

      console.log(`input1:${_this.input1},input2:${_this.input2},input3:${_this.input3}`)
    }

  }
};
// export default defineComponent({
//   name: "BasisLayoutCard",
//   setup() {
//     // crud组件的ref
//     const crudRef = ref();
//     // crud 配置的ref
//     const crudBinding = ref();
//     //第一个select
//     const input1 = ref("");
//     // 暴露的方法
//     const { crudExpose } = useExpose({ crudRef, crudBinding });
//     // 你的crud配置
//     const { crudOptions } = createCrudOptions({ crudExpose });
//     // 初始化crud配置
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
//     const { resetCrudOptions } = useCrud({ crudExpose, crudOptions });
//     // 你可以调用此方法，重新初始化crud配置
//     // resetCrudOptions(options)
//
//     // 页面打开后获取列表数据
//     onMounted(() => {
//       crudExpose.doRefresh();
//     });
//
//     return {
//       crudBinding,
//       crudRef,
//       input1
//     };
//   }
// });
</script>

<style lang="less">
.page-layout-card {
  background-color: #eee;
}
</style>
