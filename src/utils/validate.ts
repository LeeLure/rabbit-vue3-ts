export function accountRule(value: string) {
  // 在这里可以对 account 内容做校验, 如果不符合条件, 就直接返回错误信息
  if (value?.trim().length === 0) return '用户名不能为空'
  // 我希望 6-20 个字符，需要以字母开头
  if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '用户名必须是 6 ~ 20个字符, 以字母开头'
  // 如果通过校验返回 true
  return true
}

export function passwordRule(value: string) {
  // 非空
  if (value?.trim().length === 0) return '密码不能为空'
  // 6 ~ 24 个字符
  if (!/^\w{6,24}$/.test(value)) return '密码必须是 6 ~ 24 位的字符'
  return true
}

export function isAgreeRule(value: boolean) {
  // 必选
  if (!value) return '请勾选同意条款'
  return true
}

export function mobileRule(value: string) {
  if (!value) return '请输入手机号'
  if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
  return true
}

export function codeRule(value: string) {
  if (!value) return '请输入验证码'
  if (!/^\d{6}$/.test(value)) return '验证码格式错误'
  return true
}

export function rePasswordRule(value: string, { form }: any) {
  if (!value) return '请输入确认密码'
  if (!/^\w{6,24}$/.test(value)) return '密码是6-24个字符'
  // 校验密码是否一致  form表单数据对象
  if (value !== form.password) return '两次输入的密码不一致'
  return true
}