<template>
  <el-upload
    class="upload-demo"
    drag
    action
    multiple
    :http-request="handleUpload"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { getPolicy } from '@/api/fileUpload'

const handleUpload = (op) => {
  getPolicy(op)
}
</script>
<style lang="scss" scoped></style>
