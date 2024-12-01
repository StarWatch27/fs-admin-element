<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="ID" prop="id" width="100" />
      <el-table-column label="故障模型名称" prop="name" />
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
          <el-button plain @click="genMutantPredsByModelName(scope.$index, scope.row)">分析结果生成</el-button>
          <el-button @click="getMutantPredsByModelName(scope.$index, scope.row)">分析结果展示</el-button>
          <!--          <el-button plain @click="ElMessageBox.alert('对抗检测')">对抗检测</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogTableVisible" title="预测展示" style="width: 70%">
      <el-table :data="gridData" height="400">
        <el-table-column property="mutant_name" label="变异名称" width="auto" show-overflow-tooltip />
        <el-table-column property="label" label="真实标签" width="auto" show-overflow-tooltip />
        <el-table-column property="pred" label="预测标签" width="auto" show-overflow-tooltip />
        <el-table-column property="result" label="预测结果" width="auto" show-overflow-tooltip />
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, h } from "vue";
import axios from "axios";
import { ElMessageBox, ElMessage, ElLoading, ElNotification } from "element-plus";
import { Search } from "@element-plus/icons-vue";

interface DLModel {
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
const dialogTableVisible = ref(false);
const gridData = ref([]);

onMounted(async () => {
  await getAllData();
});

const filterTableData = computed(() =>
  tableData.value.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()))
);

const genMutantPredsByModelName = async (index: number, row: DLModel) => {
  console.log("row", row.name, typeof row.name);

  const loading = ElLoading.service({
    lock: true,
    text: "处理中...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  setTimeout(() => {
    loading.close();
  }, 20000);

  // 发送请求
  await axios
    .post(`/section3Api/genMutantPredsByModelName`, {
      body: {
        name: row.name
      }
    })
    .then(async (res) => {
      loading.close();
      let msg = res.data.result;
      if (msg.includes("start")) {
        await ElMessageBox.alert("开始生成！", "通知", {
          config: undefined,
          confirmButtonText: "确认",
          type: "success"
        });
      } else if (msg.includes("exists")) {
        await ElMessageBox.alert(`已存在故障预测结果文件！\n${res.data.data}`, "警告", {
          config: undefined,
          confirmButtonText: "确认",
          type: "warning"
        });
      } else if (msg.includes("running")) {
        await ElMessageBox.alert("正在生成中！", "警告", {
          config: undefined,
          confirmButtonText: "确认",
          type: "warning"
        });
      } else if (msg.includes("fail")) {
        await ElMessageBox.alert("未检测到故障特征文件，请先生成！", "警告", {
          config: undefined,
          confirmButtonText: "确认",
          type: "warning"
        });
      } else {
        await ElMessageBox.alert("未知错误！", "警告", {
          config: undefined,
          confirmButtonText: "确认",
          type: "warning"
        });
      }
      await getAllData();
    });
};

const getMutantPredsByModelName = async (index: number, row: DLModel) => {
  console.log("row", row.name, typeof row.name);

  const loading = ElLoading.service({
    lock: true,
    text: "处理中...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  setTimeout(() => {
    loading.close();
  }, 20000);

  // 发送请求
  await axios
    .post(`/section3Api/getMutantPredsByModelName`, {
      body: {
        name: row.name
      }
    })
    .then(async (res) => {
      loading.close();
      if (res.data.flag == "fail") {
        ElMessageBox.alert("未检测到预测结果文件，请先生成！", "警告", {
          config: undefined,
          confirmButtonText: "确认",
          type: "error"
        });
        return;
      }
      gridData.value = res.data.result;
      dialogTableVisible.value = true;
      await getAllData();
    });
};

const getAllData = async () => {
  await axios
    .get(`/section3Api/getAllModels`)
    .then((res) => {
      console.log("data", res);
      tableData.value = res.data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};
</script>
