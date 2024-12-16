<template>
  <!-- 顶部 -->
  <div class="header">
    <div class="header-left">
      <span>中部地区</span>
      <van-icon name="arrow" />
    </div>
    <van-search v-model="serchValue" shape="round" placeholder="请输入搜索关键词" class="search-input"></van-search>
  </div>
  <van-swipe class="my-swiper" height="170" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="item in slides" >
      <van-image radius="5" :src="item"></van-image>
    </van-swipe-item>
  </van-swipe>
  <!-- nav -->
  <van-row justify="space-around" >
    <van-col span="11" 
     v-for="(item,index) in banners"
      class="center-img"
      @click="goOrderTwo(index)"
    >
      <van-image :src="item"></van-image>
    </van-col>
  </van-row>
  <!-- 医院信息 -->
   <van-row class="yy-list" justify="space-around"  
   v-for="(item, index) in homeData.hospitals" 
   @click="getOrder(item)">
   
    <van-col span="6" >
        <van-image 
        :src="hospitals[index]"
        width="100"
        height="90"
        ></van-image>
      </van-col>
      <van-col class="yy"  span="15"  >
          <div class="yy-name">{{item.name}}</div>
          <div class="yy-type">
            <span>{{item.rank}}</span>
            &nbsp
            <span class="yy-tel">{{item.label}}</span>
          </div>
        <div class="yy-text">{{ item.intro }}</div>
      </van-col>
  </van-row>

</template>

<script setup>
import { reactive, getCurrentInstance, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
//图床资源
const banners=[
'https://www.helloimg.com/i/2024/12/16/675fc243c8021.png',
'https://www.helloimg.com/i/2024/12/16/675fc243dd16a.png'
]
const hospitals=[
  'https://www.helloimg.com/i/2024/12/16/675fc725c8822.png',
  'https://www.helloimg.com/i/2024/12/16/675fc7263c462.png',
  'https://www.helloimg.com/i/2024/12/16/675fc726a04e0.png',
  'https://www.helloimg.com/i/2024/12/16/675fc726d26a3.png',
  'https://www.helloimg.com/i/2024/12/16/675fc72715f9e.png'
]
const slides=[
  'https://www.helloimg.com/i/2024/12/16/675fc91da0f7d.png',
  'https://www.helloimg.com/i/2024/12/16/675fc91d5b47a.png'
]
const router = useRouter()
//获取vue接口实例
const { proxy } = getCurrentInstance()
const homeData = reactive({
  hospitals: [],
  nav2s: [],
  navs: [],
  now:"",
  slides: []

})
const serchValue = ref('')
const goOrderTwo=(index)=>{
  router.push(`/createOrder?id=${homeData.hospitals[index].id}`)
}
const getOrder=(data)=>{
  console.log(data)
  router.push(`/createOrder?id=${data.id}`)
}
onMounted(() => {
  proxy.$api.index().then(({data}) => {
    Object.assign(homeData, data.data)//使用合并而不是直接赋值，是为了保留原有的响应式
    console.log(homeData)
  })
})  
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  padding: 1vw 3vw;
  background: #fff;

  .header-left {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-right: 12px;
    font-size: 14px;
    background-size: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #666666;
  }
}
.search-input {
  flex: 1;
  min-width: 0;
}
@media screen and (max-width: 375px) {
  .header {
    padding: 8px 10px;
  }
  
  .header-left {
    font-size: 13px;
    margin-right: 8px;
  }
}
.my-swiper {
  margin: 5px;
}

.yy-list {
  padding-bottom: 10px;
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);

  .yy {
    .yy-name {
      font-size: 20px;
      line-height: 30px;
      font-weight: bold;
    }

    .yy-type {
      font-weight: bold;
      line-height: 25px;
      font-size: 15px;
      color: #0ca7ae;
    }

    .yy-text {
      font-size: 14px;
      color: #999999;
    }
  }
}

.bottom-text {
  line-height: 50px;
  text-align: center;
  color: #999999;
}
</style>