<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.realName" />
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        v-if="dialogTitle === '添加用户'"
      >
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="手机" prop="phoneNum">
        <el-input v-model="form.phoneNum" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="描述">
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
import { saveUser } from '@/api/user'
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
  realName: '',
  userName: '',
  password: '',
  phoneNum: '',
  email: '',
  description: ''
})
const rules = ref({
  realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度为3到5位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '密码长度为6到8位', trigger: 'blur' }
  ],
  phoneNum: [
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
    // console.log(props.dialogTableValue)
    form.value = props.dialogTableValue
  },
  { deep: true, immediate: true }
)

const emits = defineEmits(['update:modelValue', 'initUserList'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await saveUser(form.value)
      ElMessage({
        message: i18n.global.t('message.updeteSuccess'),
        type: 'success'
      })
      handleClose()
      emits('initUserList')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>
<style lang="scss" scoped></style>
