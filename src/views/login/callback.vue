<script lang="ts" setup name="LoginCallback">
import LoginHeader from "./components/login-header.vue";
import LoginFooter from "./components/login-footer.vue";
import { ref } from "vue";
import CallbackBind from "./components/callback-bind.vue";
import CallbackPatch from "./components/callback-patch.vue";

const hasAccount = ref(true);

// 传入调用的 api 来实现功能: get_user_info
// QC.api(api, paras, fmt, method)
// QC.api('get_user_info')
// QC.Login.signOut	登出
// QC.Login.check 检查是否登录
// QC.Login.getMe 获取 openId
// QC.Login.signOut()
// console.log(QC.Login.check())
// QC.Login.getMe(openId => {
//   console.log(openId)
// })

// 获取登录状态
const isLogin = QC.Login.check();
// 如果已经登陆, 就获取 openId
if (isLogin) {
  QC.Login.getMe((openId) => {
    console.log(openId);
  });
}
</script>

<template>
  <LoginHeader>联合登陆</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<style scoped lang="less">
.container {
  padding: 25px 0;
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
