<template>
  <div style="text-align: center">
    <el-row style="display: flex; justify-content: space-around; margin: 20% auto 10%">
      <el-col :span="6">
        数据集
        <el-select v-model="input1" placeholder="sst2" size="large" style="width: 240px" @change="printLog">
          <el-option v-for="item in input1_list" :key="item.id" :value="item.name" :label="item.name"></el-option>
          <!--          <el-option :key="2" value="imdb" label="imdb"></el-option>-->
          <!--          <el-option :key="3" value="agnews" label="agnews"></el-option>-->
        </el-select>
      </el-col>
      <el-col :span="6">
        攻击方法
        <el-select v-model="input2" placeholder="deepwordbug" size="large" style="width: 240px" @change="printLog">
          <el-option :key="1" value="deepwordbug" label="deepwordbug"></el-option>
          <el-option :key="2" value="5" label="textfooler"></el-option>
          <el-option :key="3" value="pwws" label="pwws"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        待攻击模型
        <el-select v-model="input3" placeholder="bert" size="large" style="width: 240px" @change="printLog">
          <el-option :key="1" value="bert" label="bert"></el-option>
          <el-option :key="2" value="xlnet" label="xlnet"></el-option>
          <el-option :key="3" value="bart" label="bart"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18"></el-col>
      <el-col :span="6">
        <el-button type="primary" @click="init_data">确认</el-button>
      </el-col>
    </el-row>

    <!--  <fs-page class="page-layout-card">-->
    <!--    <fs-crud ref="crudRef" v-bind="crudBinding"></fs-crud>-->
    <!--  </fs-page>-->
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { ElMessageBox } from "element-plus";
export default {
  name: "BasisLayoutCard", //组件名称（对外）
  data() {
    //数据，变量
    return {
      input1_list: [],
      input1: "sst2",
      input2: "deepwordbug",
      input3: "bert"
    };
  },
  mounted() {
    this.init_data();
  },
  methods: {
    submit() {
      const _this = this;
      axios
        .get("/dataset/getDatasetById/1")
        .then((res) => {
          ElMessageBox.alert(`res: ${res.data.name}`);
          console.log(res.data);
        })
        .catch((error) => {
          console.log("ERROR:", error);
        });
      // ElMessageBox.alert(`input1:${_this.input1},input2:${_this.input2},input3:${_this.input3}`);
      console.log(`input1:${_this.input1},input2:${_this.input2},input3:${_this.input3}`);
    },

    init_data() {
      const _this = this;
      axios
        .get("/dataset/getAllDatasets")
        .then((res) => {
          console.log("data", res);
          _this.input1_list = res.data;
        })
        .catch((error) => {
          console.log("ERROR:", error);
        });
    }
  }
};
</script>

<style lang="less">
.page-layout-card {
  background-color: #eee;
}
</style>
