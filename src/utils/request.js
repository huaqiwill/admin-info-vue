import axios from 'axios'
import { ElMessage } from 'element-plus';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// request 拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;

        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }

        if(res.code==0){
            return Promise.resolve(res);
        }else{
            ElMessage.error(res.message || '系统错误');
            return Promise.reject(res);
        }
    },
    error => {
        console.log('err' + error) // for debug
        ElMessage.error(error);
        return Promise.reject(error);
    }
)

export default request
