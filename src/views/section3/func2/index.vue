<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="ID" prop="id" width="100" />
      <el-table-column label="模型名称" prop="name" />
      <el-table-column label="绝对路径" prop="abs_path" />
      <el-table-column align="right">
        <template #header>
          <p style="display: flex; justify-content: center; gap: 10px">
            <!--            <el-button type="primary" plain @click="openAddWindow">新增</el-button>-->
            <el-input v-model="search" size="default" placeholder="请输入模型名称..">
              <template #prefix>
                <el-icon class="el-input__icon"><Search /></el-icon>
              </template>
            </el-input>
          </p>
        </template>
        <template #default="scope">
          <el-button @click="ElMessageBox.alert('生成')">提取</el-button>
          <!--          <el-button plain @click="ElMessageBox.alert('计算集中度')">计算集中度</el-button>-->
          <!--          <el-button plain @click="ElMessageBox.alert('对抗检测')">对抗检测</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, h } from "vue";
import axios from "axios";
import { ElMessageBox, ElMessage, ElLoading, ElNotification } from "element-plus";
import { Search } from "@element-plus/icons-vue";

interface Model {
  id: string;
  name: string;
  abs_path: string;
  // attack_method: string;
  // dataset: string;
}

const search = ref("");
const form = ref({});
const loading = ref(true);
const tableData = ref([]);
const datasets = ref({});

onMounted(async () => {
  await getAllData();
  await getAllDataset();
});

const filterTableData = computed(() =>
  tableData.value.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()))
);

const getAllData = async () => {
  await axios
    .get(`/section2Api/getAllModels`)
    .then((res) => {
      console.log("data", res);
      tableData.value = res.data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};

const getAllDataset = async () => {
  await axios
    .get(`/dataset/getAll`)
    .then((res) => {
      console.log("data", res);
      datasets.value = res.data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};
</script>
