<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="ID" prop="id" width="100" />
      <el-table-column label="注意力模型名称" prop="name" />
      <el-table-column label="绝对路径" prop="abs_path" />
      <el-table-column label="攻击方法" prop="attack_method">
        <template #default="scope">
          <el-select v-model="scope.row.attack_method" style="width: 80%" placeholder="请选择" size="large">
            <el-option :key="1" value="deepwordbug" label="deepwordbug"></el-option>
            <el-option :key="2" value="textfooler" label="textfooler"></el-option>
            <el-option :key="3" value="pwws" label="pwws"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="数据集" prop="dataset">
        <template #default="scope">
          <el-select v-model="scope.row.dataset" style="width: 80%" placeholder="请选择" size="large">
            <!--            <el-option :key="1" value="deepwordbug" label="deepwordbug"></el-option>-->
            <el-option v-for="item in datasets" :key="item.id" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <p style="display: flex; justify-content: center; gap: 10px">
            <!--            <el-button type="primary" plain @click="openAddWindow">新增</el-button>-->
            <el-input v-model="search" size="default" placeholder="请输入注意力模型名称..">
              <template #prefix>
                <el-icon class="el-input__icon"><Search /></el-icon>
              </template>
            </el-input>
          </p>
        </template>
        <template #default="scope">
          <el-button @click="genAdvDataset(scope.$index, scope.row)">生成</el-button>
          <el-button plain @click="genFocus(scope.$index, scope.row)">计算集中度</el-button>
          <el-button plain @click="ElMessageBox.alert('对抗检测')">对抗检测</el-button>
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

interface AttackRecipe {
  id: string;
  name: string;
  abs_path: string;
  attack_method: string;
  dataset: string;
}

const search = ref("");
const form = ref({});
const prefix = "attentionModel";
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

const genAdvDataset = async (index: number, row: AttackRecipe) => {
  console.log("row", row);
  // 检查是否选择
  if (row.dataset == "" || row.dataset == null || row.attack_method == "" || row.attack_method == null) {
    await ElMessage.error("请选择 攻击方法 和 数据集！");
    return;
  }

  // 屏幕变灰
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
    .post(`/section1Api/genAdvDataset`, {
      body: {
        model: row.name.toLowerCase(),
        dataset: row.dataset.toLowerCase(),
        atk_method: row.attack_method.toLowerCase()
      }
    })
    .then(async (res) => {
      loading.close();
      let msg = res.data.result;
      console.log("msg:", msg);
      if (msg.includes("start")) {
        await ElMessageBox.alert("开始生成！", "通知", {
          config: undefined,
          confirmButtonText: "确认",
          type: "success"
        });
      } else if (msg.includes("exists")) {
        await ElMessageBox.alert("已存在攻击样本！", "警告", {
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
        await ElMessageBox.alert("执行失败！", "警告", {
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
      // await ElMessageBox.alert("生成成功");
      await getAllData();
    });
};

const genFocus = async (index: number, row: AttackRecipe) => {
  console.log("row", row);
  // 检查是否选择
  if (row.dataset == "" || row.dataset == null || row.attack_method == "" || row.attack_method == null) {
    await ElMessage.error("请选择 攻击方法 和 数据集！");
    return;
  }

  // 屏幕变灰
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
    .post(`/section1Api/genFocus`, {
      body: {
        model: row.name.toLowerCase(),
        dataset: row.dataset.toLowerCase(),
        atk_method: row.attack_method.toLowerCase()
      }
    })
    .then(async (res) => {
      loading.close();
      let msg = res.data.result;
      console.log("msg:", msg);
      if (msg.includes("start")) {
        await ElMessageBox.alert("开始生成！", "通知", {
          config: undefined,
          confirmButtonText: "确认",
          type: "success"
        });
      } else if (msg.includes("exists")) {
        await ElMessageBox.alert("已存在集中度序列！", "警告", {
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
        await ElMessageBox.alert("执行失败！", "警告", {
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
      // await ElMessageBox.alert("生成成功");
      await getAllData();
    });
};

const getAllData = async () => {
  await axios
    .get(`/attentionModel/getAll`)
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
