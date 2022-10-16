import service  from "..";
//获取歌单详情页的数据
export const getMusicItemList=(data)=>{
    return service({
        method:"GET",
        url:`/api/playlist/detail?id=${data}`
    })
}
//获取歌单的所有歌曲
export const getItemList=(data)=>{
    return service({
        method:"GET",
        url:`/api/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
    })
}
//获取歌曲的歌词
export const getMusicLyric=(data)=>{
    return service({
        method:"GET",
        url:`/api/lyric?id=${data}`
    })
}