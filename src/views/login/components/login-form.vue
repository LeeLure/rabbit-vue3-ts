<script lang="ts" setup name="LoginForm">
import { Message } from '@/components/message';
import { ref, watch } from 'vue';
import useStore from '@/store'
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate'

const active = ref<'account' | 'mobile'>('account')

// const isAgree = ref(false)

const { user } = useStore()

const router = useRouter()

// 表单校验库 vee-validate 给我们提供了响应式数据, 所以不需要单独定义了
// const form = ref({
//   account: '',
//   password: '',
//   isAgree: false,
// })

const login = async () => {
  // Message({ type: 'error', text: '登录失败', duration: 1000 })
  // Message.success('登陆成功')
  // if (form.value.account === '') {
  //   Message({ type: 'error', text: '用户名或手机号不能为空' })
  //   return
  // }
  // if (form.value.password === '') {
  //   Message({ type: 'error', text: '密码不能为空' })
  //   return
  // }
  // if (!form.value.isAgree) {
  //   Message({ type: 'error', text: '请同意许可' })
  //   return
  // }
  // console.log('通过校验，可以发送请求')

  // 兜底校验
  const res = await validate()
  // console.log(res)
  if (!res.valid) return

  // 发请求
  try {
    await user.login({ account: account.value, password: password.value })
    // 登录成功了
    Message.success('登录成功!')

    // 跳转首页
    router.push('/')
  } catch (e) {
    Message.error('登录失败, 请检查用户名和密码')
  }
}

// 实时校验提醒用户
// useForm 用于定义校验规则
const { validate, resetForm } = useForm({
  // 用于指定要校验的表单规则
  validationSchema: {
    // 参数1: 要校验的数据项
    account(value: string) {
      // 在这里可以对 account 内容做校验, 如果不符合条件, 就直接返回错误信息
      if (value?.trim().length === 0) return '用户名不能为空'
      // 我希望 6-20 个字符，需要以字母开头
      if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '用户名必须是 6 ~ 20个字符, 以字母开头'
      // 如果通过校验返回 true
      return true
    },
    password(value: string) {
      // 非空
      if (value?.trim().length === 0) return '密码不能为空'
      // 6 ~ 24 个字符
      if (!/^\w{6,24}$/.test(value)) return '密码必须是 6 ~ 24 位的字符'
      return true
    },
    isAgree(value: boolean) {
      // 必选
      if (!value) return '请勾选同意条款'
      return true
    },
    mobile: (value: string) => {
      if (!value) return '请输入手机号'
      if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
      return true
    },
    code: (value: string) => {
      if (!value) return '请输入验证码'
      if (!/^\d{6}$/.test(value)) return '验证码格式错误'
      return true
    }
  }
})
// 会返回一个对象, 一般直接进行解构
// 将其中的 value 和 errorMessage 提取出来
// value 属性是一个响应式的值, 用于给表单元素进行双向绑定的
const { value: account, errorMessage: accountMessage } = useField<string>('account')
const { value: password, errorMessage: passwordMessage } = useField<string>('password')
const { value: isAgree, errorMessage: isAgreeMessage } = useField<boolean>('isAgree')
const { value: mobile, errorMessage: mobileMessage } = useField<string>('mobile')
const { value: code, errorMessage: codeMessage } = useField<string>('code')

// 如果监视响应式变量, 可以不用加箭头函数 也不用 .value
// resetForm : 重置表单
watch(active, () => resetForm())
</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="active = 'account'" href="javascript:;" v-if="active === 'mobile'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="active = 'mobile'" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="active === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input v-model="account" type="text" placeholder="请输入用户名" />
          </div>
          <div class="error" v-if="accountMessage"><i class="iconfont icon-warning" />{{ accountMessage }}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input v-model="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="password"><i class="iconfont icon-warning" />{{ passwordMessage }}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input v-model="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="mobile"><i class="iconfont icon-warning" />{{ mobileMessage }}</div>

        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input v-model="code" type="password" placeholder="请输入验证码" />
            <span class="code">发送验证码</span>
          </div>
          <div class="error" v-if="codeMessage"><i class="iconfont icon-warning" />{{ codeMessage }}</div>

        </div>
      </template>
      <div class="form-item">
        <div class="agree">

          <!-- <span>我已同意</span> -->
          <!-- <XtxCheckbox label="我已同意" v-model="isAgree" /> -->
          <!-- <XtxCheckBox v-model="isAgree">我已同意</XtxCheckBox> -->
          <XtxCheckbox v-model="isAgree">我已同意</XtxCheckbox>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAgreeMessage"><i class="iconfont icon-warning" />{{ isAgreeMessage }}</div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      cursor: pointer;
    }

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
