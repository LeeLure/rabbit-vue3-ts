<script name="CallbackBind" lang="ts" setup>
import { QQUserInfo, QQUserInfoRes } from "@/types/user";
import { codeRule, mobileRule } from "@/utils/validate";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";

const qqInfo = ref<QQUserInfo>();
// 获取登录状态
const isLogin = QC.Login.check();
if (isLogin) {
  // 获取用户的 QQ 头像和 QQ 昵称
  QC.api("get_user_info").success((res: QQUserInfoRes) => {
    // 该 any 就 any
    // console.log(res.data)
    qqInfo.value = res.data;
  });
}

// 定义校验规则
const { validate } = useForm({
  validationSchema: {
    mobile: mobileRule,
    code: codeRule,
  },
});

const {
  value: mobile,
  errorMessage: mobileMessage,
  validate: validateMobile,
} = useField<string>("mobile");

const { value: code, errorMessage: codeMessage } = useField<string>("code");

const send = async () => {
  // 兜底校验 => 手机号
  const res = await validateMobile();
  if (!res.valid) return;
  // console.log('发送短信验证码')
};

const bind = async () => {
  // 兜底校验
  const res = await validate();
  if (!res.valid) return;
  // console.log('发请求绑定账号')
};
</script>
<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="qqInfo?.figureurl_2" alt="" />
      <p>Hi，{{ qqInfo?.nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input v-model="mobile" class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error">{{ mobileMessage }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input v-model="code" class="input" type="text" placeholder="短信验证码" />
        <span class="code" @click="send">发送验证码</span>
      </div>
      <div class="error">{{ codeMessage }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
  </div>
</template>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;

  &:hover {
    cursor: pointer;
  }
}
</style>
