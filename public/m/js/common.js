/**
 * Created by Administrator on 2018/1/15 0015.
 */
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006

    indicators: false, //是否显示滚动条


});



//获取地址栏信息
function getSearchObj(){

  //获取到地址栏信息
  var search = location.search;
  //转化为文字//通过截取获取数组
  var search = decodeURI(search).slice(1);
  //字符串分割
  var arr = search.split('&');
  //把数组变成对象
  var obj = {};
  arr.forEach(function (e,i) {
      var key = arr[i].split('=')[0];
      var value = arr[i].split('=')[1];
      obj[key]=value;
  })

  return obj;
};

/*获取地址栏指定的参数，返回值*/
function getSearch(key) {
  return getSearchObj()[key];
}