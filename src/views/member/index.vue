<script name="XtxPayPage" setup lang="ts">
import { OrderPayInfo } from "@/types/checkout";
import { ApiRes } from "@/types/data";
import request, { baseURL } from "@/utils/request";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCountDown } from "@/utils/hooks";
import dayjs from "dayjs";

// 获取订单 id
const route = useRoute();
const router = useRouter();
// console.log(route.query.id)
const id = route.query.id;
// 定义订单对象
const order = ref<OrderPayInfo>({} as OrderPayInfo);
// 定义一个全局倒计时的变量
const showTime = ref(0);

async function getOrderDetail() {
  const res = await request.get<ApiRes<OrderPayInfo>>("/member/order/" + id);
  // console.log(res)
  order.value = res.data.result;
  // order.value.countdown
  const { start, time } = useCountDown(order.value.countdown);
  start();
  // showTime.value = time.value
  watch(
    time,
    () => {
      showTime.value = time.value;
      if (time.value <= 0) {
        router.replace("/cart");
      }
    },
    {
      immediate: true,
    }
  );
}

getOrderDetail();

// 定义回跳地址 (可变的, 可以随意指定)
const redirectUrl = encodeURIComponent("http://www.corho.com:8080/#/pay/callback");
// 点击跳转的支付链接
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`;
</script>
<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付订单</XtxBreadItem>
      </XtxBread>
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <!-- <p>支付还剩 <span>{{ Math.floor(showTime / 60) + '分' + showTime % 60 + '秒' }}</span>, 超时后将取消订单</p> -->
          <p>
            支付还剩 <span>{{ dayjs.unix(showTime).format("mm分ss秒") }}</span
            >, 超时后将取消订单
          </p>
        </div>
        <div class="amount">
          <span>应付总：</span>
          <span>¥{{ order.totalMoney }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="payUrl"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
</style>
