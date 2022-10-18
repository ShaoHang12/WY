import service from "@/request";
// 获取首页轮播图的数据
export const getBanner = () => {
  return service({
    method: "GET",
    url: "/api/banner?type=2",
  });
};
//获取发现好歌单
export const getMusicList = () => {
  return service({
    method: "GET",
    url: "/api/personalized?limit=10",
  });
};
//搜索
export const getSearchMusic = (data) => {
  return service({
    method: "GET",
    url: `/api/search?keywords=${data}`,
  });
};
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
