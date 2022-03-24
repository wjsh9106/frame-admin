<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="权限名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" />
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="form.path" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择权限类型">
          <el-option label="目录" value="M" />
          <el-option label="菜单" value="C" />
          <el-option label="按钮" value="F" />
        </el-select>
      </el-form-item>
      <el-form-item label="标识" prop="perms">
        <el-input v-model="form.perms" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from 'vue'
import { saveMenu } from '@/api/menu'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogParentId: {
    type: Number,
    required: true
  },
  dialogTableValue: {
    type: Object,
    default: () => {}
  }
})

const formRef = ref(null)

const form = ref({
  name: '',
  sort: 0,
  path: '#',
  type: '',
  perms: '',
  icon: ''
})
const rules = ref({
  name: [{ required: true, message: '请输入权限名', trigger: 'blur' }],
  type: [{ required: true, message: '请选择权限类型', trigger: 'blur' }],
  perms: [{ required: true, message: '请输入权限标识', trigger: 'blur' }]
})

watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)

const emits = defineEmits(['update:modelValue', 'initMenuList', 'initMenuTree'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      form.value.parentId = props.dialogParentId
      await saveMenu(form.value)
      ElMessage({
        message: i18n.global.t('message.updeteSuccess'),
        type: 'success'
      })
      handleClose()
      emits('initMenuList')
      emits('initMenuTree')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>
<style lang="scss" scoped></style>
