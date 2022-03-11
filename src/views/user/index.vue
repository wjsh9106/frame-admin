<template>
  <el-card>
    <!-- gutter 间距 -->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initUserList">{{
        $t('table.search')
      }}</el-button>
      <el-button type="primary">{{ $t('table.adduser') }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'status'">
          <el-switch v-model="row.status" />
        </template>
        <template #default v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit"></el-button>
          <el-button type="warning" size="small" :icon="Setting"></el-button>
          <el-button type="danger" size="small" :icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.pageNum"
      v-model:page-size="queryForm.pageSize"
      :page-sizes="[10, 20, 50, 100]"
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
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUsers } from '@/api/user'
import { options } from './options'

const queryForm = ref({
  query: '',
  pageNum: 1,
  pageSize: 10,
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
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>
