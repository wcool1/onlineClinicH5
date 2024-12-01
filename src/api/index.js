import request from '@/src/utils/request'

export default{
    login(data){
        return request.post('/login',data)
    },
    index(){
        return request.get('/Index/index')
    },
    h5Companion(){
        return request.get('/h5/companion')
    },
    createOrder(data){
        return request.post('/createOrder',data)
    },
    orderList(params){
        return request.get('/order/list',{params})
    },
    orderDetail(){
        return request.get('/order/detail',{params})
    }
}