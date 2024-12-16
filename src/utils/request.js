
//导入axios
import axios from 'axios'
//创建axios实例http
const http=axios.create({
    baseURL:"https://v3pz.itndedu.com/v3pz",
    timeout:10000,
    headers:{terminal:'h5'}
})
//添加请求拦截器（处理请求前的数据）config应该代表的是请求的配置信息，包含请求头header，请求体data、url、method等信息
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //获取token
    const token =localStorage.getItem('h5_token')
    const whiteUrl=['/login']//白名单;不需要携带token请求的路径
    //判断是否需要携带token,如果token存在且请求路径不在白名单中，则传递token给请求头的相应参数
    if(token&&!whiteUrl.includes(config.url)){
        config.headers['h-token']=token
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器，respons是响应数据类似于上面的config,包含了响应头、响应体等信息
http.interceptors.response.use(function (response) {
   
    if (response.status !== 200) {
      return Promise.reject(new Error('HTTP状态码错误'))
    }
     // 对异常响应进行处理，response.status代表的是HTTP状态码（200,404等等），reresponse.data代表的是响应体，response.data.code代表的是响应体中的一个属性叫状态码（看API文档）
    // console.log('响应状态码:', response.data.code) // 打印查看实际code值
    //普通错误提示
 
    //token过期，删除浏览器本地信息，跳转到登录页面
    if(response.data.code ===-2){
      localStorage.removeItem('h5_token')
      localStorage.removeItem('h5_user')
      window.location.href = window.location.origin    
    }
    
    // 递归转换所有 HTTP 链接为相对路径
    const convertHttpUrls = (data) => {
      if (typeof data === 'string' && data.startsWith('http:')) {
        return data.replace(/^http:\/\/[^/]+/, '') // 转换为相对路径
      }
      if (typeof data === 'object') {
        for (let key in data) {
          data[key] = convertHttpUrls(data[key])
        }
      }
      return data
    }
    
    response.data = convertHttpUrls(response.data)
    return response;//返回响应输数据
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  //导出http
  export default http


  