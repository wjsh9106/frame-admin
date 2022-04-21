<template>
  <el-row>
    <img :src="route.query.bookCover" style="width: 100px" />
    <el-row>
      <el-col :span="12">书名：{{ route.query.bookName }}</el-col>
      <el-col :span="12">分类：{{ route.query.bookTag }}</el-col>
      <el-col :span="12">作者：{{ route.query.bookAuthor }}</el-col>
      <el-col :span="12">状态：{{ route.query.bookStatus }}</el-col>
      <el-col :span="12">动作：{{ route.query.bookStatus }}</el-col>
      <el-col :span="12">更新：{{ route.query.bookLastUpdateTime }}</el-col>
    </el-row>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div style="white-space: pre-wrap">
        {{ route.query.bookIntro }}
      </div>
    </el-col>
  </el-row>
  <el-divider>
    <h3>
      正文
      <span @click="backBookList" style="color: green; cursor: pointer"
        >(点我返回)</span
      >
    </h3>
  </el-divider>
  <el-row>
    <el-col v-for="chapter in chapterTitles" :key="chapter" :span="6">
      <el-link :underline="false" @click="showChapterInfo(chapter)">{{
        chapter.chapterName
      }}</el-link>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { ElLoading } from 'element-plus'
import { getChapterTitles } from '@/api/book'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const chapterTitles = ref()
const initChapterTitles = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
  const res = await getChapterTitles(route.query.id)
  // console.log(res)
  chapterTitles.value = res
}

initChapterTitles()

const backBookList = () => {
  router.back()
}

const showChapterInfo = (chapter) => {
  // router.push，query方法传值，name指定要传到的页面
  router.push({
    name: 'chapterInfo',
    query: { chapterId: chapter.id, chapterName: chapter.chapterName }
  })
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-left: 100px;
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
