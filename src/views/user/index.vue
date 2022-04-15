<template>
  <el-card>
    <!-- gutter 间距 -->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('tableUser.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initUserList">{{
        $t('tableUser.search')
      }}</el-button>
      <el-button type="primary" @click="handleDialogValue()">{{
        $t('tableUser.adduser')
      }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="$t(`tableUser.${item.label}`)"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'blStatus'">
          <el-switch v-model="row.blStatus" @change="changeState(row)" />
        </template>
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button
            type="primary"
            size="small"
            :icon="Edit"
            @click="handleDialogValue(row)"
          ></el-button>
          <el-button
            type="warning"
            size="small"
            :icon="Setting"
            @click="setRole(row)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            @click="delUser(row)"
            v-if="row.status !== '2'"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :page-sizes="[5, 10, 15, 20, 25]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    v-if="dialogVisible"
    @initUserList="initUserList"
    :dialogTableValue="dialogTableValue"
  />
  <Tree v-model="treeVisible" :treeUserId="treeUserId" v-if="treeVisible" />
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUsers, changeUserStatus, deleteUser } from '@/api/user'
import { options } from './options'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './components/dialog.vue'
import { isNull } from '@/utils/filters'
import Tree from './components/tree.vue'

const i18n = useI18n()
const queryForm = ref({
  query: '',
  pageNum: 1,
  pageSize: 5,
  condition: [],
  sort: []
})

const total = ref(0)

const tableData = ref([])

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogTableValue = ref({})

// 参数请求格式
// {
//     pageNum: 1,
//     pageSize: 10,
//     condition: [{column: "user_name",type: "like", value: "wj"}],
//     sort: [{column: "update_time",type: "desc"}]
// }
const initUserList = async () => {
  // query 不为空值，添加查询条件condition
  if (!(queryForm.value.query === '')) {
    queryForm.value.condition = ref([
      { column: 'user_name', type: 'like', value: queryForm.value.query }
    ])
  }
  const res = await getUsers(queryForm.value)
  total.value = res.total
  // console.log('users', res)
  tableData.value = res.records
}
initUserList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pageNum = 1
  queryForm.value.pageSize = pageSize
  initUserList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum
  initUserList()
}

const changeState = async (info) => {
  await changeUserStatus(info.id, info.blStatus, info.status)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
  initUserList()
}

const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加用户'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }

  dialogVisible.value = true
}

const delUser = (row) => {
  ElMessageBox.confirm(i18n.t('dialog.deleteTitleUser'), '删除用户', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteUser(row.id)
      ElMessage({
        type: 'success',
        message: i18n.t('message.deleteSuccess')
      })
      initUserList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.t('message.deleteCanceled')
      })
    })
}

const treeVisible = ref(false)
const treeUserId = ref()

const setRole = (row) => {
  treeVisible.value = true
  treeUserId.value = row.id
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  justify-content: center;
}
</style>
