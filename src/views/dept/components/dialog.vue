<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="form.deptName" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" />
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
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
import { saveDept } from '@/api/dept'
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
  deptName: '',
  sort: 0,
  leader: '',
  phone: '',
  email: ''
})
const rules = ref({
  deptName: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
  leader: [{ required: true, message: '请输入部门负责人', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        '^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,5-9]))\\d{8}$',
      message: '请输入正确格式的手机号',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱地址',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确格式的邮箱地址',
      trigger: ['blur', 'change']
    }
  ]
})

watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)

const emits = defineEmits(['update:modelValue', 'initDeptList', 'initDeptTree'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      form.value.parentId = props.dialogParentId
      await saveDept(form.value)
      ElMessage({
        message: i18n.global.t('message.updeteSuccess'),
        type: 'success'
      })
      handleClose()
      emits('initDeptList')
      emits('initDeptTree')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>
<style lang="scss" scoped></style>
