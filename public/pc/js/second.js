/**
 * Created by Administrator on 2018/1/13 0013.
 */
$(function(){
  var page = 1;
  var pageSize = 5;

  //1、渲染数据
  function render(){
    //ajax请求
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        //准备模板拼接
        $('tbody').html(template('second_tpl',info));

        //分页，总在获取后进行分页
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
  }
  render();

  //2、点击添加分类
  $('.btn_add').on('click',function(){
    $('#addModal').modal('show');
    //获取下拉列表框内容
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        //拼接下拉列表模板
        $('.dropdown-menu').html(template('form_tpl',info));
      }
    })
  });


  //3、下拉列表项注册点击事件
  $('.dropdown-menu').on('click','a',function(){
    //列表文字
    $('form .cateName').text($(this).text());
    //获取到分类id，传给隐藏表单域
    var id = $(this).data('id');
    $('#categoryId').val(id);

    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");

  });

  //4、图片按钮事件
  $('#fileupload').fileupload({
    dataType:'json',
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function(e,data){
      //console.log(data);
      $('.img_box img').attr('src',data.result.picAddr);
      //设置隐藏域的val值
      $('.brandLogo').val(data.result.picAddr);
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  })



  //5、表单验证
  var $form = $("form");
  $form.bootstrapValidator({
    //配置不做校验的内容，给空数组，目的是让隐藏的和禁用的都做校验
    excluded:[],
    //配置校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则
    fields:{

      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入品牌的名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传品牌的图片"
          }
        }
      }
    }
  });

  //5、表单提交
  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    //ajax请求
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('form').serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          //隐藏模态框
          $('#addModal').modal('hide');
          page = 1;
          render();

          //重置表单样式
          $form.data("bootstrapValidator").resetForm(true);
          //重置按钮的值，图片的值
          //dropdown-text是一个span，不能用val，用text方法
          $(".cateName").text('请选择一级分类');
          $(".img_box img").attr("src", 'images/none.png');
        }
      }
    })
  })





})