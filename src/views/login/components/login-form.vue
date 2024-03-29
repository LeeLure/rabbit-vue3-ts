<script lang="ts" setup name="LoginForm">
import { Message } from "@/components/message";
import { ref, watch } from "vue";
import useStore from "@/store";
import { useRouter, useRoute } from "vue-router";
import { useField, useForm } from "vee-validate";
import { useCountDown } from "@/utils/hooks";
import {
  accountRule,
  codeRule,
  isAgreeRule,
  mobileRule,
  passwordRule,
} from "@/utils/validate";

const active = ref<"account" | "mobile">("account");

// const isAgree = ref(false)

const { user } = useStore();

const router = useRouter();
const route = useRoute();

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
  const res = await validate();
  // console.log(res)
  // 不能判断五个校验项，在下面单独进行判断
  // if (!res.valid) return

  // 发请求
  if (active.value === "account") {
    // 如果表单校验通过
    if (res.errors.account || res.errors.password || res.errors.isAgree) return;
    await user.login({ account: account.value, password: password.value });
  } else {
    // 短信登录的校验
    if (res.errors.mobile || res.errors.code || res.errors.isAgree) return;
    await user.mobileLogin({ mobile: mobile.value, code: code.value });
  }

  // 登录成功了
  Message.success("登录成功!");

  // 跳转首页
  // router.push("/");
  // 跳转到之前的页面
  router.push((route.query.redirectUrl as string) || "/");
};

// 实时校验提醒用户
// useForm 用于定义校验规则
// validate：用于兜底校验，校验表单所有字段
// resetForm：用于重置表单
const { validate, resetForm } = useForm({
  // 用于指定要校验的表单规则
  validationSchema: {
    // 参数1: 要校验的数据项
    // account(value: string) {
    //   // 在这里可以对 account 内容做校验, 如果不符合条件, 就直接返回错误信息
    //   if (value?.trim().length === 0) return '用户名不能为空'
    //   // 我希望 6-20 个字符，需要以字母开头
    //   if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '用户名必须是 6 ~ 20个字符, 以字母开头'
    //   // 如果通过校验返回 true
    //   return true
    // },
    // password(value: string) {
    //   // 非空
    //   if (value?.trim().length === 0) return '密码不能为空'
    //   // 6 ~ 24 个字符
    //   if (!/^\w{6,24}$/.test(value)) return '密码必须是 6 ~ 24 位的字符'
    //   return true
    // },
    // isAgree(value: boolean) {
    //   // 必选
    //   if (!value) return '请勾选同意条款'
    //   return true
    // },
    // mobile: (value: string) => {
    //   if (!value) return '请输入手机号'
    //   if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
    //   return true
    // },
    // code: (value: string) => {
    //   if (!value) return '请输入验证码'
    //   if (!/^\d{6}$/.test(value)) return '验证码格式错误'
    //   return true
    // }

    account: accountRule,
    password: passwordRule,
    isAgree: isAgreeRule,
    mobile: mobileRule,
    code: codeRule,
  },
  // 解决：type check failed for prop "modelValue". Expected Boolean, got Undefined
  // 设置默认值
  initialValues: {
    mobile: "13666666666",
    code: "123456",
    account: "xiaotuxian001",
    password: "123456",
    isAgree: true,
  },
});
// 会返回一个对象, 一般直接进行解构
// 将其中的 value 和 errorMessage 提取出来
// value 属性是一个响应式的值, 用于给表单元素进行双向绑定的
const { value: account, errorMessage: accountMessage } = useField<string>("account");
const { value: password, errorMessage: passwordMessage } = useField<string>("password");
const { value: isAgree, errorMessage: isAgreeMessage } = useField<boolean>("isAgree");
// validate: 只校验此字段
const {
  value: mobile,
  errorMessage: mobileMessage,
  validate: validateMobile,
} = useField<string>("mobile");
const { value: code, errorMessage: codeMessage } = useField<string>("code");

// 切换登录模式时重置表单
// 如果监视响应式变量, 可以不用加箭头函数 也不用 .value
// resetForm : 重置表单
watch(active, () => resetForm());

// 短信登录的校验
const mobileRef = ref<HTMLInputElement | null>(null);
const codeRef = ref<HTMLInputElement | null>(null);

const { time, start } = useCountDown(59);

const send = async () => {
  // 未封装的逻辑                     -----
  // 判断：倒计时未结束不允许再次点击
  // if (time.value > 0) return
  // time.value = 5
  // // 开启定时器
  // const timeId = setInterval(() => {
  //   time.value--
  //   // 不能为负数
  //   if (time.value === 0) {
  //     // 清除定时器
  //     clearInterval(timeId)
  //   }
  // }, 1000)
  //                                -----
  const res = await validateMobile();
  // console.log(res);
  // 校验手机号：校验不通过，自动获取手机号的焦点
  if (!res.valid) return mobileRef.value?.focus();
  // Message.error(res.errors[0])

  // 校验通过后开始倒计时
  if (time.value > 0) return;
  start();

  // 发送验证码
  await user.sendMobileMsg(mobile.value);
  Message.success("获取验证码成功");
};
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
          <div class="error" v-if="accountMessage">
            <i class="iconfont icon-warning" />{{ accountMessage }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input v-model="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="password">
            <i class="iconfont icon-warning" />{{ passwordMessage }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input
              ref="mobileRef"
              v-model="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="mobile">
            <i class="iconfont icon-warning" />{{ mobileMessage }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input v-model="code" type="password" placeholder="请输入验证码" />
            <span ref="codeRef" class="code" @click="send">{{
              time === 0 ? "发送验证码" : `${time}s后重发`
            }}</span>
          </div>
          <div class="error" v-if="codeMessage">
            <i class="iconfont icon-warning" />{{ codeMessage }}
          </div>
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
        <div class="error" v-if="isAgreeMessage">
          <i class="iconfont icon-warning" />{{ isAgreeMessage }}
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
        ><img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt="QQ登录"
          border="0"
      /></a>
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

        > i {
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

      > .error {
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
