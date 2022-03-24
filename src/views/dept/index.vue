<template>
  <el-card
    style="width: 18%; float: left; min-height: 550px; max-height: 550px"
  >
    <el-scrollbar max-height="550px">
      <el-tree
        node-key="id"
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :default-expanded-keys="defaultExpandedKeys"
      />
    </el-scrollbar>
  </el-card>
  <el-card
    style="
      width: 80%;
      float: left;
      min-height: 550px;
      max-height: 550px;
      margin-left: 5px;
    "
  >
    <template #header>
      <div class="card-header">
        <span>部门列表</span>
        <el-button type="primary" @click="handleDialogValue()">{{
          $t('tableDept.adddept')
        }}</el-button>
      </div>
    </template>

    <el-scrollbar max-height="460px">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          :width="item.width"
          :prop="item.prop"
          :label="$t(`tableDept.${item.label}`)"
          v-for="(item, index) in options"
          :key="index"
        >
          <template #default="{ row }" v-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleDialogValue(row)"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="delDept(row)"
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
    </el-scrollbar>
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    :dialogParentId="dialogParentId"
    v-if="dialogVisible"
    @initDeptList="initDeptList"
    @initDeptTree="initDeptTree"
    :dialogTableValue="dialogTableValue"
  />
</template>

<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { options } from './options'
import { deptTree, initDepts, deleteDept } from '@/api/dept'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import Dialog from './components/dialog.vue'
import { isNull } from '@/utils/filters'

const i18n = useI18n()
const queryForm = ref({
  clickId: 0,
  pageNum: 1,
  pageSize: 5,
  condition: [],
  sort: []
})

const total = ref(0)

const tableData = ref([])

// 参数请求格式
// {
//     pageNum: 1,
//     pageSize: 10,
//     condition: [{column: "user_name",type: "like", value: "wj"}],
//     sort: [{column: "update_time",type: "desc"}]
// }
const initDeptList = async () => {
  // query 不为空值，添加查询条件condition
  queryForm.value.condition = ref([
    { column: 'parent_id', type: 'eq', value: queryForm.value.clickId }
  ])
  const res = await initDepts(queryForm.value)
  total.value = res.total
  // console.log('users', res)
  tableData.value = res.records
}
initDeptList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pageNum = 1
  queryForm.value.pageSize = pageSize
  initDeptList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum
  initDeptList()
}

const handleNodeClick = (data) => {
  // console.log(data)
  queryForm.value.clickId = data.id
  initDeptList()
}

const treeData = ref([])
const expanedKeys = []
const defaultExpandedKeys = ref(expanedKeys)

const initDeptTree = async () => {
  const res = await deptTree()
  // console.log(res)
  treeData.value = ref([
    {
      id: 0,
      name: '总部',
      children: res
    }
  ])
  // 展开初始化前点击的节点
  expanedKeys.length = 0
  expanedKeys.push(queryForm.value.clickId)
}
initDeptTree()

const defaultProps = {
  value: 'id',
  label: 'name',
  children: 'children'
}

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogParentId = ref()
const dialogTableValue = ref({})

const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加部门'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑部门'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogParentId.value = queryForm.value.clickId
  dialogVisible.value = true
}

const delDept = (row) => {
  ElMessageBox.confirm(i18n.t('dialog.deleteTitleDept'), '删除权限', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteDept(row.id)
      ElMessage({
        type: 'success',
        message: i18n.t('message.deleteSuccess')
      })
      initDeptList()
      initDeptTree()
    })
    .catch(() => {
      //   ElMessage({
      //     type: 'info',
      //     message: i18n.t('message.deleteCanceled')
      //   })
    })
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
