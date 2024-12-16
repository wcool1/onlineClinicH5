<template>
    <div class="container">
        <div class="user">
            <van-image class="img" width="100" height="100 " :src="userImg"></van-image>
            <div class="text">{{userInfo.name}}</div>
        </div>
    
        <div class="order">
            <div class="top">
                <div class="text1" >我的订单</div>
                <div class="text2" @click="goOrder(0)  ">全部</div>
            </div>
            <div class="bottom">
                <div class="item">
                    <van-image
                    @click="goOrder(1)"
                    width="40"
                    height="40"
                    src="/images/od_10.png"
                    />
                    <div>待支付</div>
                </div>
                <div class="item">
                    <van-image
                    @click="goOrder(2)"
                    width="40"
                    height="40"
                    src="/images/od_10.png"
                    />
                    <div>待服务</div>
                </div>
                <div class="item">
                    <van-image
                    @click="goOrder(3)"
                    width="40"
                    height="40"
                    src="/images/od_10.png"
                    />
                    <div>已完成</div>
                </div>
                <div class="item">
                    <van-image
                    @click="goOrder(4)"
                    width="40"
                    height="40"
                    src="/images/od_10.png"
                    />
                    <div>已取消</div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="foot1">
                <div class="text1">
                    <van-image width="20" height="20" src="/images/ic_clients.png"></van-image>
                    服务对象管理
                </div>
                <div class="text2"><van-icon name="arrow" /></div>
            </div>
            <div class="foot2">
                <div class="text1">
                    <van-image width="20" height="20" src="/images/ic_share.png"></van-image>
                    分享转发
                </div>
                <div class="text2"><van-icon name="arrow" /></div>
            </div>
        </div>
        <van-button @click="show=true" class="quit" type="danger">退出登录</van-button>
        <van-dialog
        v-model:show="show"
        title="提示"
        @cancel="show=false"
        @confirm="logout"
        show-cancel-button
        >
        <div class="quit_text">确认是否退出登录</div>
        </van-dialog>
    </div>
</template>

<script setup>
//导入相关组件、方法
import { reactive, getCurrentInstance, ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import userImg from '/user.jpg'  // 新增图片导入

//定义自带的变量
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
//自定义属性变量
const userInfo=computed(()=>{
    return JSON.parse(localStorage.getItem('h5_userInfo')) || {}
})
const show=ref(false)


//自定义方法
const goOrder = (state) => {
  // 路由跳转到订单页面,传入状态参数
  router.push(`/order?state=${state}`)
}
const logout=()=>{
    localStorage.removeItem('h5_userInfo')
    localStorage.removeItem('h5_token')
    router.push('/login')
}
</script>
<style scoped lang="less">
.container {
    background-color: #f0f0f0;
    height: 100vh;
    overflow: hidden;

    .user {
        width: 95%;
        height: 200px;
        background-color: #fff;
        text-align: center;
        border-radius: 10px;
        margin: 10px;

        .img {
            margin-top: 30px;
        }

        .text {
            line-height: 30px;
            font-weight: bold;
        }
    }

    .order {
        width: 90%;
        margin: 10px;
        border-radius: 5px;
        background-color: #fff;
        padding: 10px;

        .top {
            margin: 10px;
            line-height: 50px;
            display: flex;
            justify-content: space-between;

            .text1 {
                color: #333;
            }

            .text2 {
                color: #999;
            }

            border-bottom: 0.5px solid #f5f5f5;
        }

        .bottom {
            padding: 10px;
            display: flex;
            justify-content: space-around;

            .item {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .foot {
        margin: 0 10px;
        padding: 10px;
        line-height: 50px;
        background-color: #fff;

        .foot1,
        .foot2 {
            display: flex;
            justify-content: space-between;
            color: #555;
        }

        .foot1 {
            border-bottom: 0.5px solid #f5f5f5;
        }
    }

    .quit {
        width: 90%;
        margin: 20px;
    }

    .quit_text {
        margin: 20px 0;
        text-align: center;
    }
}
</style>