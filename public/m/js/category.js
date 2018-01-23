/**
 * Created by Administrator on 2018/1/15 0015.
 */
$(function(){
  //导航渲染

    $.ajax({
      type:'get',
      url:'/category/queryTopCategory',
      success:function(info){
        console.log(info);
        $('.nav').html(template('nav-tpl',info));
        //渲染第一个一级分类
        renderSecond(info.rows[0].id)
      },

    });

  //根据id渲染二级分类
  function renderSecond(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id : id
      },
      success:function(info){
        console.log(info);
        $('.brand').html(template('brand-tpl',info));
      }
    });
  }



  //注册点击事件
  $('.nav').on('click','li',function(){
    console.log(1);
    //切换当前类
    $(this).addClass('active').siblings().removeClass('active');
    var id = $(this).data('id');
    console.log(id);
    ////内容渲染
    renderSecond(id);

    //让category_right .mui-scroll 滚回到0,0的位置
    //mui(".mui-scroll-wrapper").scroll() 获取页面中所有的scroll对象，如果有多个，返回数组
    mui(".mui-scroll-wrapper").scroll()[1].scrollTo(0,0,500);
  });






});