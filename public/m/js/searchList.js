/**
 * Created by Administrator on 2018/1/16 0016.
 */
$(function(){
    //获取地址栏信息
    var search = location.search;
    //转化类型,截取掉第一个
    search = decodeURI(search);
    search = search.slice(1);
    var arr = search.split('=');
    var proName = arr[1];
    //console.log(proName);
    //用一个对象来存储数据
    var data = {
      page : 1,
      pageSize : 100,
      proName:proName,
    }

  //渲染
  function render(){
    //ajax请求商品数据
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:data,
      success:function(info){
        //console.log(info);
        $('.product').html(template('info-tpl',info));
      }
    })
  }
  render();



  //给导航注册点击事件
  //价格
  $('.price').on('click',function(){
    //console.log(12);
    //给当前元素添加类，
    var flag = $(this).hasClass('now');
    if (flag){
      //切换上下箭头
      $('.price-down').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      //根据箭头设置排序
      $('.price-down').hasClass('fa-angle-down')?data.price=2:data.price=1;
      //重新渲染
      render();
      console.log(data);
    }else {
      $(this).addClass('now').siblings().removeClass('now');
      data.num='';
      console.log(data);
    }
  })

  //库存
  $('.num').on('click',function(){
    //console.log(12);
    //给当前元素添加类，
    var flag = $(this).hasClass('now');
    if (flag){
      $('.num-down').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      //根据箭头设置排序
      $('.num-down').hasClass('fa-angle-down')?data.num=2:data.num=1;
      //重新渲染
      render();
      console.log(data);

    }else {
      $(this).addClass('now').siblings().removeClass('now');
      data.price='';
      console.log(data);
    }
  })



})