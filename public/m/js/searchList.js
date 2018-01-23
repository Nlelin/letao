/**
 * Created by Administrator on 2018/1/16 0016.
 */
$(function(){
  //渲染
  function render(){
    //获取地址栏信息
    var search = location.search;
    //转化类型,截取掉第一个
    search = decodeURI(search);
    search = search.slice(1);
    var arr = search.split('=');
    var proName = arr[1];
    console.log(proName);
    //用一个对象来存储数据
    var data = {
      page : 1,
      pageSize : 100,
      proName:proName
    }

    //ajax请求
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:data,
      success:function(info){
        console.log(info);
      }
    })
  }
  render();
})