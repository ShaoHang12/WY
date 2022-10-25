import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
let service = axios.create({
  baseUrl: "http://localhost:3000/",
  timeout: 3000,
});
// //请求拦截器
service.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});
// //响应拦截器
service.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res;
  },
  (error) => {
    //响应失败
    return Promise.reject(new Error("faile"));
  }
);
export default service;
