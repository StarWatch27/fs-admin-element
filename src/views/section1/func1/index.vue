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
          <el-button style="width: 50%" @click="openEditWindow(scope.$index, scope.row)">生成</el-button>
          <!--          <el-button type="danger" plain @click="handleDelete(scope.$index, scope.row)"> 删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <!--  新增窗口  -->
    <el-dialog v-model="dialogFormVisible" title="新增注意力模型" width="500">
      <el-form :model="form" label-width="auto" label-position="top">
        <el-form-item label="注意力模型名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.abs_path" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd"> 确定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--  修改窗口  -->
    <el-dialog v-model="editDialogVisible" title="修改" width="500">
      <el-form :model="editForm" label-width="auto" label-position="top">
        <el-form-item label="注意力模型名称">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="editForm.abs_path" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEdit"> 确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";

interface AttentionModel {
  id: string;
  name: string;
  abs_path: string;
  attack_method: string;
}

const search = ref("");
const dialogFormVisible = ref(false);
const editDialogVisible = ref(false);
const form = ref({});
const editForm = ref({});
const prefix = "attentionModel";
const loading = ref(true);
const tableData = ref([]);

onMounted(async () => {
  await getAllData();
});

const filterTableData = computed(() =>
  tableData.value.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()))
);
const openAddWindow = () => {
  dialogFormVisible.value = true;
  form.value = {};
};
const openEditWindow = async (index: number, row: AttentionModel) => {
  editDialogVisible.value = true;
  editForm.value = {
    id: row.id,
    name: row.name,
    abs_path: row.abs_path
  };
};
const handleAdd = async () => {
  await axios
    .post(`/${prefix}/add`, {
      ...form.value
    })
    .then(async (res) => {
      dialogFormVisible.value = false;
      await ElMessageBox.alert("新增成功");
      await getAllData();
    });
};

const handleEdit = async () => {
  console.log(form.value);
  await axios
    .post(`/${prefix}/editById`, {
      ...editForm.value
    })
    .then(async (res) => {
      editDialogVisible.value = false;
      await ElMessageBox.alert("修改成功");
      await getAllData();
    });
};

const handleDelete = async (index: number, row: AttentionModel) => {
  await axios.get(`/${prefix}/deleteById/${row.id}`).then(async (res) => {
    await ElMessageBox.alert("删除成功");
    await getAllData();
  });
};

const getAllData = async () => {
  await axios
    .get(`/${prefix}/getAll`)
    .then((res) => {
      console.log("data", res);
      tableData.value = res.data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
};
</script>
