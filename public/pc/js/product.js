/**
 * Created by Administrator on 2018/1/15 0015.
 */
$(function(){
  //1、渲染
  var page = 1;
  var pageSize = 5;
  var arrimg=[];

  function render(){
    //1、发起ajax动态渲染数据
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);
        //拼接模板
        $('tbody').html(template('product_tpl',info));

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


  //2、点击添加分类，注册添加事件
  $('.btn_add').on('click',function(){
    //显示模态框
    $('#addModal').modal('show');
    //获取二级分类信息
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        //拼接数据
        $('.dropdown-menu').html(template('form_tpl',info));
      }
    })
  });



  //3、选择分类
  $('.dropdown-menu').on('click','a',function(){
    //改变列表按钮文字为当前选中的
    $('.btn-product').text($(this).text());
    //把品牌id传给隐藏表单域
    var id = $(this).data('id');
    $('#brandId').val(id);

    //表单验证
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  });


  //4、文件上传
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      //获取到图片的名称和地址
      //console.log(data.result);

      //判读图片张数
      if(arrimg.length >=3){
        return;
      }

      //1. 图片显示，添加成功，往img_box中添加一张图片即可。
      $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100" alt="">');
      //$('.img_box').append('img').attr('src',arrimg[1].picAddr);
      //$('.img_box').append('img').attr('src',arrimg[2].picAddr);

      //2、把图片添加进数组中，存储数据，并判断是否是3张
      arrimg.push(data.result);
      //console.log(arrimg.length);

      //3、校验图片
      if (arrimg.length === 3) {
        //校验通过即可
        $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
      } else {
        $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
      }
    }

  });


  //5、验证表单
  var $form = $('form');
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

      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类名称"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"商品库存不能为空"
          }
        },
        //正则：只能有数字组成，并且第一位不能是0
        regexp: {
          regexp: /^[1-9]\d*$/,
          message: "请输入合法的库存"
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "商品尺码不能为空"
          },
          //正则：只能有数字组成，并且第一位不能是0
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入合法的尺码，比如(32-44)"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "商品原价不能为空"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "商品价格不能为空"
          }
        }
      },
      productLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      },

    }
  });


  //添加成功事件
  $form.on('success.form.bv',function(e){
    e.preventDefault();
    //表单的数据
    var data = $form.serialize();
    //拼接上图片的数据
    data += "&picName1=" + arrimg[0].picName + "&picAddr1=" + arrimg[0].picAddr;
    data += "&picName2=" + arrimg[1].picName + "&picAddr1=" + arrimg[1].picAddr;
    data += "&picName3=" + arrimg[2].picName + "&picAddr1=" + arrimg[2].picAddr;
    console.log(data);

    //发起请求
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:data,
      success:function(info){
        if(info.success){
          $('#addModal').modal('hide');
          //重新渲染
          page=1;
          render();
          //重置表单
          $form.data("bootstrapValidator").resetForm(true);
          $('.btn-product').text('请选择二级分类名称');
          $('#brandId').val();
          $(".img_box img").remove();//图片自杀
          //清空数组
          arrimg=[];
        }
      }
    })
  })



  //切换上下架状态
  $('tbody').on('click','button',function(){
    var id = $(this).parent().data('id');
    var li = $()
    console.log(id);
    //判断有没有上架类
    var flag = $(this).hasClass('btn-up');
    if(flag){

    }
  })

})