<template>
  <div class="Stafftable">
    <el-table
      ref="multipleTableRef"
      :data="users"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
        v-if="userinfo.roleId == 3"
      />
      <el-table-column property="userGrade" label="年级"> </el-table-column>
      <el-table-column property="userAccount" label="学号"> </el-table-column>
      <el-table-column property="userName" label="姓名" />
      <el-table-column property="userSexVal" label="性别" />
      <el-table-column label="班级">
        <template #default="scope">{{ scope.row.userClass }}</template>
      </el-table-column>
      <el-table-column property="groupName" label="方向"> </el-table-column>
      <el-table-column #default="scope" label="操作">
        <el-button size="small" @click="handleEdit(scope.row)">详情</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row)"
          v-if="userinfo.roleId >= scope.row.roleId && userinfo.roleId != 1"
          >删除</el-button
        >
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="curTable"
      :small="small"
      :disabled="disabled"
      :background="background"
      :page-size="7"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useStaffStore } from "~/store/staff";
import { useHomestore } from "~/store/home";
let userData = useHomestore();
let { userinfo } = storeToRefs(userData);
import { ref } from "vue";
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const staffData = useStaffStore();
const {
  deleteModel,
  editModel,
  users,
  grade,
  group,
  input,
  total,
  signleInfo,
  signleDelete,
  isSignle,
  moreDelete,
  curTable,
} = storeToRefs(staffData);
const multipleSelection = ref<any[]>([]);
//选择项改变触发
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
  moreDelete.value = [];
  isSignle.value = false;
  for (let i = 0; i < val.length; i++) {
    moreDelete.value[i] = val[i].userId;
  }
};
const handleEdit = (row: any) => {
  let initGroup = row.groupName;
  signleInfo.value = {...row,initGroup};
  editModel.value = true;
};
const handleDelete = (row: any) => {
  signleDelete.value = row.userId;
  moreDelete.value = [];
  isSignle.value = true;
  deleteModel.value = true;
};
//改变当前页
const handleCurrentChange = (val: number) => {
  curTable.value = val;
  let groupId;
  if (group.value == "") {
    groupId = undefined;
  } else {
    groupId = Number(group.value);
  }
  staffData
    .getAllUser(val, 7, groupId, input.value, grade.value)
    .then((res) => {
      if (res.code == 20000) {
        users.value = res.data?.records;
        total.value = res.data?.total;
      } else if (res.code == 400006) {
        users.value = [];
        total.value = 0;
        ElMessage.success("暂无数据");
      } else {
        ElMessage.error("获取人员数据失败");
      }
    });
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 16px;
  .demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
  }
  .demo-pagination-block .demonstration {
    margin-bottom: 16px;
  }
}
</style>
