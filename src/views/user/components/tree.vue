<template>
  <el-dialog
    :model-value="treeVisible"
    title="角色列表"
    width="40%"
    @close="handleClose"
  >
    <el-tree
      ref="treeRef"
      node-key="id"
      :data="treeData"
      :height="208"
      :props="props"
      show-checkbox
      :default-checked-keys="defaultCheckedKeys"
      :default-expanded-keys="defaultExpandedKeys"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { roleInfo, bindRoles } from '@/api/user'

const dProps = defineProps({
  treeUserId: {
    type: Number,
    default: 0,
    required: true
  }
})

const form = ref({
  userId: dProps.treeUserId,
  roleIds: []
})

const emits = defineEmits(['update:modelValue'])

const handleClose = () => {
  emits('update:modelValue', false)
}

const treeRef = ref({})
const treeData = ref([])

const props = {
  value: 'id',
  label: 'name',
  children: 'children'
}

const checkedKeys = []
const expanedKeys = []

const defaultCheckedKeys = ref(checkedKeys)
const defaultExpandedKeys = ref(expanedKeys)

const initCheckedNode = async () => {
  const res = await roleInfo(dProps.treeUserId)
  treeData.value = res.roles
  const ids = res.roleIds
  for (const i of ids) {
    expanedKeys.push(i)
    checkedKeys.push(i)
  }
}
initCheckedNode()

const handleConfirm = async () => {
  // 返回当前选中节点的数组，接收两个布尔类型参数:
  // 1. 默认值为 false. 若参数为 true, 它将返回当前选中节点的子节点
  // 2. 默认值为 false. 如果参数为 true, 返回值包含半选中节点数据
  const checkedNodes = treeRef.value.getCheckedNodes(false, true)
  console.log(checkedNodes)
  // const checkedIds = []
  for (const node of checkedNodes) {
    form.value.roleIds.push(node.id)
  }
  // console.log(checkedIds)
  console.log(form.value)
  await bindRoles(form.value)
  handleClose()
}
</script>
