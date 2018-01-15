/**
 * Created by Administrator on 2018/1/13 0013.
 */
$(function(){
  //后台所需数据
  var page = 1;
  var pageSize = 5;

  //1、获取数据动态渲染
  function render(){
    //发送ajax
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success:function(info){
        console.log(info);
        //根据数据拼接组合模板
        $('tbody').html(template('first_tpl',info));

        //分页
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }
        })
      }
    })
  };
  render();

  //2、添加分类
  $('.btn_add').on('click',function() {
    //显示模态框
    $('#addModal').modal("show");
  });


  //3、表单验证
  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败
      validating: 'glyphicon glyphicon-refresh' //校验中
    },
    // 指定校验字段
    fields: {
      //校验名，对应name表单的name属性
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名称不能为空'
          },
        }
      },
    }
  });


    //注册添加事件
    $('form').on('success.form.bv', function (e){
      //阻止跳转
      console.log(1);
      e.preventDefault();
      //发起ajax请求
      $.ajax({
        type:'post',
        url:'/category/addTopCategory',
        data:$('form').serialize(),
        success:function(info){
          if(info.success){
            //console.log(info);
            //关闭模态框
            $('#addModal').modal('hide');
            //重新渲染数据
            page=1;
            render();
            //重置表单 ,有参数true，表示不仅清除样式，还清除内容
            $('form').data('bootstrapValidator').resetForm(true);
          }
        }
      })
    })
})


