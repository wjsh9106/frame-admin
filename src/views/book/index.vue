<template>
  <el-card>
    <!-- gutter 间距 -->
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('tableBook.placeholder')"
          clearable
          v-model="queryForm.query"
        ></el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="initBookList">{{
        $t('tableBook.search')
      }}</el-button>
      <el-button type="primary" @click="handleDialogValue()">{{
        $t('tableBook.adduser')
      }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="$t(`tableBook.${item.label}`)"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'bookCover'">
          <el-popover placement="right" trigger="hover">
            <template #reference>
              <img :src="row.bookCover" style="width: 100px" />
            </template>
            <img :src="row.bookCover" style="width: 300px" />
          </el-popover>
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'bookIntro'">
          <!-- {{ row.bookIntro.substr(0, 100) }}
          <span v-if="row.bookIntro.length > 100">......</span> -->
          <el-popover placement="right" trigger="hover">
            <template #reference>
              {{ row.bookIntro.substr(0, 100) }}......
            </template>
            {{ row.bookIntro }}
          </el-popover>
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
    @initBookList="initBookList"
    :dialogTableValue="dialogTableValue"
  />
</template>

<script setup>
import { ref } from 'vue'
import { getBooks } from '@/api/book'
import { options } from './options'
import Dialog from './components/dialog.vue'
import { isNull } from '@/utils/filters'

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

const initBookList = async () => {
  // query 不为空值，添加查询条件condition
  if (!(queryForm.value.query === '')) {
    queryForm.value.condition = ref([
      { column: 'book_name', type: 'like', value: queryForm.value.query }
    ])
  }
  const res = await getBooks(queryForm.value)
  total.value = res.total
  // console.log('users', res)
  tableData.value = res.records
}
initBookList()

const handleSizeChange = (pageSize) => {
  queryForm.value.pageNum = 1
  queryForm.value.pageSize = pageSize
  initBookList()
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum
  initBookList()
}

const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = '添加小说'
    dialogTableValue.value = {}
  } else {
    dialogTitle.value = '编辑小说'
    dialogTableValue.value = JSON.parse(JSON.stringify(row))
  }

  dialogVisible.value = true
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

.avatar {
  width: 100px;
  display: block;
}
</style>
