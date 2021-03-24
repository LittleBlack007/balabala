/*
    能发送ajax请求的函数模块
    包装axios
    函数的返回值是promise对象
    axios.get()/post()返回的是promise对象
    返回自己创建的promise对象：
        统一处理请求异常
        异步返回结果数据，我不是包含结果数据的respose    
*/

import axios from 'axios';
import { message } from 'antd';

const proxyAPI = "http://localhost:8080";

export default function ajax(url, data={}, method = "GET") {
    return new Promise(function(resolve, reject){
        let promise;
        //执行异步ajax请求
        if(method === "GET"){
            promise = axios.get(proxyAPI+url, {params:data});
        }else{
            promise = axios.post(proxyAPI+url, data);
        }
        promise.then(response => {//这里定义axios封装的promise对象的resolve(response)
            //成功了执行最外层的resolve(response)
            resolve(response);
        }).catch(error => {
            message.error('请求错误：' + error.message);
        })
    })
}