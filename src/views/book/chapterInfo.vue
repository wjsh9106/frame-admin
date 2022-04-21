<template>
  <el-divider>
    <h3>
      {{ route.query.chapterName }}
      <span @click="backBookList" style="color: green; cursor: pointer"
        >(点我返回)</span
      >
    </h3>
  </el-divider>
  <el-row>
    <el-col :span="24">
      <div style="white-space: pre-wrap">
        {{ chapterInfo }}
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { ElLoading } from 'element-plus'
import { getChapterInfo } from '@/api/book'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const chapterInfo = ref('')
const initChapterInfo = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  setTimeout(() => {
    loading.close()
  }, 1000)
  const res = await getChapterInfo(route.query.chapterId)
  // console.log(chapterInfo)
  chapterInfo.value = res.chapterContent
}

initChapterInfo()

const backBookList = () => {
  router.back()
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-left: 50px;
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  margin-bottom: 5px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>
