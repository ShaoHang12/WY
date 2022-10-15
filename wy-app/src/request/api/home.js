import service from "..";
// 获取首页轮播图的数据
export const reqGetBanner = () => {
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
