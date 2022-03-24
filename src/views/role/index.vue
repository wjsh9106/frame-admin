<template>
  <el-card>
    <!-- gutter 间距 -->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('tableRole.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initRoleList">{{
        $t('tableRole.search')
      }}</el-button>
      <el-button type="primary" @click="handleDialogValue()">{{
        $t('tableRole.addrole')
      }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="$t(`tableRole.${item.label}`)"
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
            @click="setPermission(row)"
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
    @initRoleList="initRoleList"
    :dialogTableValue="dialogTableValue"
  />
  <Tree v-model="treeVisible" :treeRoleId="treeRoleId" v-if="treeVisible" />
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting } from '@element-plus/icons-vue'
import { getRoles, changeRoleStatus } from '@/api/role'
import { options } from './options'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './components/dialog.vue'
import Tree from './components/tree.vue'
import { isNull } from '@/utils/filters'

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

const treeVisible = ref(false)
const treeRoleId = ref()

// 参数请求格式
// {
//     pageNum: 1,
//     pageSize: 10,
//     condition: [{column: "user_name",type: "like", value: "wj"}],
//     sort: [{column: "update_time",type: "desc"}]
// }
const initRoleList = async () => {
  // query 不为空值，添加查询条件condition
  if (!(queryForm.value.query === '')) {
    queryForm.value.condition = ref([
      { column: 'name', type: 'like', value: queryForm.value.query }
    ])
  }
  queryForm.value.sort = ref([{ column: 'sort', type: 'asc' }])
  const res = await getRoles(queryForm.value)
  total.value = res.total
  tableData.value = res.records
}
initRoleList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pageNum = 1
  queryForm.value.pageSize = pageSize
  initRoleList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum
  initRoleList()
}

const changeState = async (info) => {
  await changeRoleStatus(info.id, info.blStatus)
  ElMessage({
    message: i18n.t('message.updeteSuccess'),
    type: 'success'
  })
  initRoleList()
}

const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加角色'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑角色'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }

  dialogVisible.value = true
}

const setPermission = (row) => {
  treeVisible.value = true
  treeRoleId.value = row.id
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
