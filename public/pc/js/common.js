/**
 * Created by Administrator on 2018/1/12 0012.
 */
$(function(){
  //开启进度条插件 ，
  //注册一个全局的ajax，全局ajax开始时，进度条显示，全局ajax结束时，进度条关闭
  $(document).ajaxStart(function(){
      //关闭进度环
      NProgress.configure({showSpinner:false});
      NProgress.start();
  //
  }),


    $(document).ajaxStop(function(){
    //  //关闭
      NProgress.done();
    })

  //在非登陆页面，发送ajax请求，询问用户是否登录，如果没登录，跳转到登录页面。
  if(location.href.indexOf("login.html") == -1){
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      success:function (info) {
        if(info.error == 400){
          //说明没有登录，
          location.href = "login.html";
        }
      }
    });
  }


  //二级菜单显示隐藏的功能
  $(".second").prev().on("click", function () {
    //让a后面的second
    $(this).next().slideToggle();
  })


  //侧边栏显示隐藏
  $(".icon_menu").on("click", function () {

    //让侧边栏隐藏
    //主体部分padding-left:0
    $(".lt_aside").toggleClass("now");
    $(".lt_main").toggleClass("now");

  })


  //退出功能
  $(".icon_logout").on("click", function () {
    //让模态框显示
    $("#logoutModal").modal("show");

    //里面会重复的注册这个点击事件，不会覆盖，导致注册很多次，
    //1. 在外面注册
    //2. 把之前的事件清除掉。

  });

  //1. 给btn_logout注册点击事件， 避免在事件里面注册事件
  //off清除所有的事件
  $(".btn_logout").off().on("click", function () {
    //console.log("呵呵");
    //需要发送ajax,请求退出
    $.ajax({
      type:"get",
      url:"/employee/employeeLogout",
      success:function (info) {
        if(info.success){
          //跳转到登录页面
          location.href = "login.html";
        }
      }
    });


  })


});

