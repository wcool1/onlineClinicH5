

<template>
    <h1>登录</h1>
    <div class="login-tip">(请使用后台管理平台注册的账号进行登录)</div>

   <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
            v-model="form.userName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
            v-model="form.passWord"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            />
            
        </van-cell-group>

        <div class="guest-login-tip">
                <el-icon><InfoFilled /></el-icon>
                <span>游客账号：15623511267</span>
                <span>密码：qwer12</span>
              </div>
        <div class="btn" style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
            提交
            </van-button>
        </div>
    </van-form>
       
</template>

<script setup>
import { reactive,getCurrentInstance} from 'vue';
//获取vue接口实例
const {proxy}=getCurrentInstance()
const form=reactive({
    userName:'',
    passWord:''
})
const onSubmit=async()=>{
    const {data}=await proxy.$api.login(form)
   if(data.code===10000){
    localStorage.setItem('h5_token',data.data.token)
    localStorage.setItem('h5_userInfo', JSON.stringify(data.data.userInfo))
    proxy.$router.push('/home')
   }
}
</script>

<style scoped lang="less">
h1{
    text-align: center;
}
.guest-login-tip {
  display: flex;
  align-items: center;
  gap: 8vw;
  padding: 8px 12px;
  margin-bottom: 15px;
  background-color: #f4f4f5;
  border-radius: 4px;
  font-size: 13px;
  color: #909399;

  .el-icon {
    color: #909399;
    font-size: 16px;
  }

  span {
    margin-right: 10px;
  }
}
.login-tip {
    padding: 10px;
    color: #666;
    font-size: 14px;
    text-align: center;
}

</style>