import axios from 'axios'
import qs from 'qs'
import {ElMessage} from 'element-ui'


const service = axios.create({
    baseURL: 'http://192.168.0.107:8080',
    timeout: 30000
})
//请求验证拦截器
service.interceptors.request.use((config) => {
    // const token = sessionStorage.token;
  config.headers['x-auth-token'] =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3IiwiZXhwIjoxNTkzNzcwMjQ2LCJpYXQiOjE1OTM3NjY2NDZ9.UHe8AJdCNZ9nH_64QVe0yJUlOxCUwOWw1UE1B08qwp0"

  // if (token) {
  //       // config.headers['x-auth-token'] = token
  //
  //   }
    const headers = config.headers
    if (headers['content-type'] === 'application/octet-stream;charset=utf-8') {
        return config.data
    }

    return config;
});
//返回数据拦截器
service.interceptors.response.use(
    (res) => {

        if (res.data.code === 200 || res.status === 200) {
            return Promise.resolve(res.data)
        } else {
            ElMessage.error({content: res.data.message})
        }
    }, error => {
        let message = ''
        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    location.reload()
                    return
                case 403:
                    message = error.response.data.path + ',' + error.response.data.msg
                    break
                case 502:
                    message = '连接服务器失败'
                    break
                default:
                    message = error.response.data.msg ? error.response.data.msg : '服务器错误'
                    break
            }
            ElMessage.error({content: message})
            // 请求错误处理
            return Promise.reject(error)
        } else {
            message = '连接服务器失败'
            ElMessage.error({content: message})
            return Promise.reject(error)
        }
    }
)

export default service
