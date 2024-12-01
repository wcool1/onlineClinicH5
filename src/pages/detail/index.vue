<template>
    <div class="container">
        <div class="header">
          <van-icon @click="goBack" name="arrow-left" class="header-left"size="30"/>
              订单详情
        </div>
         <status-bar :item="stateMap[detailData.trade_state]"></status-bar>
         <div class="tips">
            <div class="dzf" v-if="detailData.trade_state==='待支付' ">
                <div class="text1">订单待支付</div>
                <div class="text2">
                    请在
                    <counter :second="second" />
                    内完成支付，超时订单将自动取消
                </div>
                <div class="text3">
                    <van-button type="success" @click="showCode=true">立即支付0.5元</van-button>
                </div>
                
                
            </div> 
            <div class="dzf" v-if="detailData.trade_state==='待服务' ">
                    <div class="text1">正在为您安排服务专员</div>
                    <div class="text2">请保持手机畅通，稍后将有服务专员与您联系</div>
            </div>
            <div class="dzf" v-if="detailData.trade_state==='已完成' ">
                    <div class="text1">服务已完成</div>
                    <div class="text2">感谢您的使用，如有售后问题请联系客服</div>
            </div> 
            <div class="dzf" v-if="detailData.trade_state==='已取消' ">
                    <div class="text1">订单已取消</div>
                    <div class="text2">期待下次为您服务</div>
            </div>
         </div>
         <van-cell-group class="card">
            <div class="header-text">预约信息</div>
            <van-cell
                v-for="(item,key) in makeInfo"
                :key="key"
                :title="item"
                :value="formatData(key)"
            >

            </van-cell>

         </van-cell-group>
         <van-cell-group class="card">
            <div class="header-text">订单信息</div>
            <van-cell
                v-for="(item,key) in orderInfo"
                :key="key"
                :title="item"
                :value="formatData(key)"
            >

            </van-cell>
         </van-cell-group>
         <van-dialog
          :show-confirm-button="false"
          v-model:show="showCode"          
          >
            <van-icon name="cross" @click="closeCode" class="close"/>
            <div>微信支付</div>
            <van-image width="150" height="150":src="codeImg"></van-image>
          </van-dialog>
    </div>       
</template>

<script setup>
import { reactive, getCurrentInstance, ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qrImg from '@/public/qr.png';//二维码
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
 
const detailData=reactive({})
const second=computed( ()=>{
    return detailData.order_start_time?detailData.order_start_time+7200000-Date.now():0
})
const stateMap={
    '待支付':10,
    '待服务':20,
    '已完成':30,
    '已取消':40
}
const showCode=ref(false)
const  codeImg=ref(qrImg)
const makeInfo = {
    service_name: '预约服务',
    hospital_name: '就诊医院',
    starttime: '期望就诊时间',
    'client.name': '就诊人',
    'client.mobile': '就诊人电话',
    receiveAddress: '接送地址',
    demand: '其他需求'
}

const orderInfo = {
    tel: '就诊人电话',
    order_start_time: '下单时间',
    price: '应付金额',
    out_trade_no: '订单编号'
}

const goBack=()=>{
    router.go(-1)
}

const closeCode=()=>{
  showCode.value=false
}
//订单信息
const formatData = (key) => {
  if (key.indexOf(".") === -1) {
    if (key === "order_start_time") {
      return formatTimestamp(detailData[key]);
    }
    return detailData[key];
  }
  //如果key中有.则使用 迭代函数reduce 逐级深入对象，获取对应的嵌套属性值detailData[o][p]（o为上一级对象值初始为detailData，p为当前属性(spilt得到的数组中的每个元素迭代成为p)）
  let arr = key.split(".").reduce((o, p) => {
    return (o || {})[p];
  }, detailData);
  return arr;
}
//将时间戳转换为日期格式YYYY-MM-DD
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以需要+1,padStart()方法用于字符串补全
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
onMounted(async () => {
    const { data } = await proxy.$api.orderDetail({ oid:route.query.oid })
    Object.assign(detailData,data.data)
})
</script>

<style scoped lang="less">
.container {
    background-color: #f0f0f0;
    height: 100vh;
}

.header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;

    .header-left {
        float: left;
    }
}

.card {
    margin: 15px 0;
    padding: 10px;

    .header-text {
        padding-left: 5px;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
        border-left: 4px solid red;
    }
}

::v-deep(.van-dialog__content) {
    text-align: center;
    padding: 20px;

    .close {
        position: absolute;
        left: 20px;
    }
}
.dzf {
    padding: 20px;
    background-color: white;
    .text1 {
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
        color: #666;
    }

    .text2 {
        font-size: 14px;
        color: #666;
    }

    .text3 {
        text-align: center;

        .van-button {
            margin-top: 10px;
            margin-left: 10px;
            width: 80%;
            font-weight: bold;
        }
    }
}
</style>