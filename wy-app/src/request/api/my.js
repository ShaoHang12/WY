import service from "@/request";
//获取用户详情
export const getLoginUser = (data) => {
    return service({
      method: "GET",
      url: `/api/user/detail?uid=${data}`,
    });
  };
  //登录
  export const getPhoneLogin = (data) => {
    return service({
      method: "GET",
      url: `/api/login/cellphone?phone=${data.phone}&password=${data.password}`,
    });
  };
  //获取用户歌单
  export const getPlayList = (data) => {
    return service({
      method: "GET",
      url: `/api/user/playlist?uid=${data}`,
    });
  };