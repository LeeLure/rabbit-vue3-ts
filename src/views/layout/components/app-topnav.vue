<script lang="ts" setup name="AppTopnav">
import { Confirm } from "@/components/confirm";
import { Message } from "@/components/message";
import useStore from "@/store";
import { useRouter } from "vue-router";

const { user } = useStore();
const router = useRouter();

const logout = async () => {
  // 提醒用户是否真的要退出
  await Confirm({
    title: "提示",
    text: "真的要退出吗?亲!",
  });
  // 清除数据
  user.logout();
  // 跳转至登录页
  router.push("/login");
  // 提醒用户退出登录成功
  Message.success("退出成功!");
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="user.profile.token">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i
              >{{ user.profile.nickname || user.profile.account }}</a
            >
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: @xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
