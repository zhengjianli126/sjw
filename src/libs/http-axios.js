import axios from 'axios'
import {router} from '../router/index'
import Cookies from 'js-cookie';
let axiosAjax =  axios.create({
    //baseURL:ajaxUrl,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: 30000
});
axiosAjax.interceptors.request.use(
    config => {
        console.log(config)
        
        return config;
    },
    err => {
        console.log(err)
        return Promise.reject(err);
    }); 
axiosAjax.interceptors.response.use(
        res => {
            console.log(res)
            
            if(res.data.code==40003||res.data.code===40013){
                //登录超时  跳转
            Cookies.remove('user');
            Cookies.remove('userId');
            Cookies.remove('organizeId');
            Cookies.remove('bindId');
                router.push({
                    name: 'login'
                }); 
            }
            return res;
        },
        error => {
            console.log(error)
            
            return Promise.reject(error.response.data) 
        });
    export default axiosAjax