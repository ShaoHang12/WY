//创建适配器
function remSize() {
  //设置设备宽度
  var phoneWidth = document.documentElement.clientWidth || window.innerWidth;
  if (phoneWidth >= 750) {
    phoneWidth = 750;
  }
  if (phoneWidth < 320) {
    deviceWidth = 320;
  }
  document.documentElement.style.fontSize = phoneWidth / 7.5 + "px";
  //字体大小
  document.querySelector("body").style.fontSize = 0.3 + "rem";
}
remSize()
window.onresize = function () {
    remSize()
};
