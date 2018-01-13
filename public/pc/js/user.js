/**
 * Created by Administrator on 2018/1/13 0013.
 */
$(function(){

  //1、获取数据开始渲染表格,后台需要数据
  var page=1;
  var pageSize = 5;
  function render(){
    //ajax请求
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page : page,
        pageSize : pageSize
      },
      success:function(info){
        //console.log(info);
        //获取到数据开始生成模板，拼接数据，拼接模板
        //模板第三部,拼接生成
        $('tbody').html(template('user_tpl',info));
        //console.log({data:info});


        //分页插件,必须在数据动态生成后才能进行分页，不然没有数据
        $('#pagintor').bootstrapPaginator({
          //配置版本3
          bootstrapMajorVersion:3,
          //当前页
          currentPage:page,
          //总页数
          totalPages:Math.ceil(info.total/info.size),
          //点击页码是内容切换
          onPageClicked:function(a,b,c,p){
            //console.log(p); //p是当前也页码
            page = p;
            render();
          }
        });
      }
    })
  }
  //调用渲染
  render();


  //2、修改状态操作,因为数据是动态生成的，所以要用事件委托
  $('tbody').on('click','button',function(){
      //获取id 根据id 修改状态，改变按钮
      var id = $(this).parent().data('id');
      //判断按钮是否有通过的类,改变状态值
      var isDelete = $(this).hasClass('btn_tong')?1:0;
    //console.log(isDelete);

    //点击后弹出模态框
    $('#stateModal').modal('show');

    //注册确定点击事件
    $('.btn_confirm').off().on('click',function(){
      //发起ajax请求
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function(info){
          //console.log(info);
          if(info.success){
            //关闭模态框
            $('#stateModal').modal('hide');
            //修改状态，改变按钮
            $('.td_status').val(isDelete);
            //重新渲染
            render();
            //console.log(isDelete);

          }
        }
      })



    })


  })


});