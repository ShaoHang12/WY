import service from "..";
//获取评论
export const getComment = (data) => {
  return service({
    method: "GET",
    url: `api/comment/music?id=${data.id}&limit=${data.limit}&offest=${data.offset}`,
  });
};
//发表评论
export const sentComment = (data) => {
  return service({
    method: "GET",
    url: `api/comment?t=${data.t}&type=${data.type}&id=${data.id}&content=${data.content}`,
  });
};
//评论点赞
export const likeComment = (data) => {
  return service({
    method: "GET",
    url: `api/comment/like?id=${data.id}&cid=${data.cid}&t=${data.t}&type=${data.type}`,
  });
};