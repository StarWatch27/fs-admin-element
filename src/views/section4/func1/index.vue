<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="ID" prop="id" width="100" />
      <el-table-column label="数据集名称" prop="name" />
      <el-table-column label="绝对路径" prop="abs_path" />

      <el-table-column align="right">
        <template #header>
          <p style="display: flex; justify-content: center; gap: 10px">
            <el-button type="primary" plain @click="openAddWindow">新增</el-button>
            <el-input v-model="search" size="default" placeholder="请输入数据集名称.." />
          </p>
        </template>
        <template #default="scope">
          <el-button @click="openEditWindow(scope.$index, scope.row)"> 编辑</el-button>
          <el-button type="danger" plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="新增数据集" width="500">
      <el-form :model="form" label-width="auto" label-position="top">
        <el-form-item label="数据集名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.abs_path" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="editDialogVisible" title="修改" width="500">
      <el-form :model="editForm" label-width="auto" label-position="top">
        <el-form-item label="数据集名称">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="editForm.abs_path" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEdit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";

interface Dataset {
  id: string;
  name: string;
  abs_path: string;
}

const search = ref("");
const dialogFormVisible = ref(false);
const editDialogVisible = ref(false);
const form = ref({});
const editForm = ref({});

const filterTableData = computed(() =>
  tableData.value.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()))
);
const openAddWindow = () => {
  dialogFormVisible.value = true;
  form.value = {};
};
const openEditWindow = async (index: number, row: Dataset) => {
  editDialogVisible.value = true;
  editForm.value = {
    id: row.id,
    name: row.name,
    abs_path: row.abs_path
  };
};
const handleAdd = async () => {
  await axios
    .post(`/dataset/add`, {
      ...form.value
    })
    .then(async (res) => {
      await getAllDatasets();
      dialogFormVisible.value = false;
      await ElMessageBox.alert("新增成功");
    });
};

const handleEdit = async () => {
  console.log(form.value);
  await axios
    .post(`/dataset/editById`, {
      ...editForm.value
    })
    .then(async (res) => {
      await getAllDatasets();
      editDialogVisible.value = false;
      await ElMessageBox.alert("修改成功");
    });
};

const handleDelete = async (index: number, row: Dataset) => {
  await axios.get(`/dataset/deleteById/${row.id}`).then(async (res) => {
    await ElMessageBox.alert("删除成功");
    await getAllDatasets();
  });
};

const tableData = ref([]);
onMounted(async () => {
  await getAllDatasets();
});

const getAllDatasets = async () => {
  await axios
    .get("/dataset/getAll")
    .then((res) => {
      console.log("data", res);
      tableData.value = res.data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};
</script>
