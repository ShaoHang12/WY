import service from "..";
//获取评论
export const getComment = (data) => {
  return service({
    method: "GET",
    url: `api/comment/music?id=${data.id}&limit=${data.limit}&offest=${data.offset}`,
  });
};
