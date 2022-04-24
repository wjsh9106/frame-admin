import request from './request'
import axios from 'axios'
import { ElMessage } from 'element-plus'

let accessid = ''
let host = ''
let policyBase64 = ''
let signature = ''
let filename = ''
let key = ''
let expire = 0

export const getPolicy = (op) => {
  const file = op.file
  const fileType = file.name.substr(file.name.lastIndexOf('.') + 1)
  return request({
    url: `/interface-config/oss/policy/${fileType}`,
    method: 'GET'
  }).then((res) => {
    console.log(res)
    accessid = res.accessid
    host = res.host
    policyBase64 = res.policy
    signature = res.signature
    filename = file.name
    key = res.dir
    expire = res.expire
    console.log(expire)

    const fd = new FormData()
    fd.append('OSSAccessKeyId', accessid) // Bucket 拥有者的Access Key Id。
    fd.append('policy', policyBase64) // policy规定了请求的表单域的合法性
    fd.append('signature', signature) // 根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
    // ---以上都是阿里的认证策略
    fd.append('key', key) // key表示上传到Bucket内的Object的完整路径，例如exampledir/exampleobject.txtObject，完整路径中不能包含Bucket名称。
    fd.append('success_action_status', '200') // 让服务端返回200,不然，默认会返回204
    fd.append('file', file) // 需要上传的文件 file

    // 数据组装完成后，发送上传请求到阿里云oss
    axios({
      url: host,
      method: 'POST',
      data: fd,
      processData: false, // 默认true，设置为 false，不需要进行序列化处理
      cache: false, // 设置为false将不会从浏览器缓存中加载请求信息
      contentType: false, // 避免服务器不能正常解析文件---------具体的可以查下这些参数的含义
      // 这里，我们可以做上传进度
      // 重点一：complete就是处理后的上传进度数值1-100
      onUploadProgress: (progressEvent) => {
        const complete = parseInt(
          ((progressEvent.loaded / progressEvent.total) * 100) | 0,
          10
        )
        // 重点二：onProgress()方法需要以上方接收的形参来调用
        // 这个方法有一个参数"percent"，给他进度值 complete 即可
        op.onProgress({ percent: complete })
      }
    }).then(() => {
      // 拿到结果后，做其他操作
      const size =
        file.size > 1000000
          ? parseFloat(file.size / 1000000).toFixed(2) + 'M'
          : parseFloat(file.size / 1000).toFixed(2) + 'KB'
      console.log(filename, '文件大小:', size)

      ElMessage({
        message: `${filename}上传成功`,
        type: 'success'
      })
    })
  })
}
