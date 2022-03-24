<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.description" type="textarea" />
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
import { saveRole } from '@/api/role'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const props = defineProps({
  dialogTitle: {
    type: String,
    default: '',
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
  description: ''
})
const rules = ref({
  name: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
})

watch(
  () => props.dialogTableValue,
  () => {
    // console.log(props.dialogTableValue)
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)

const emits = defineEmits(['update:modelValue', 'initRoleList'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await saveRole(form.value)
      ElMessage({
        message: i18n.global.t('message.updeteSuccess'),
        type: 'success'
      })
      handleClose()
      emits('initRoleList')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>
<style lang="scss" scoped></style>
