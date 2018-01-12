/**
 * Created by Administrator on 2018/1/11 0011.
 */

//要求用户名不能为空
  //要求密码不能为空，并且长度是6-10
  //表单校验插件，在表单提交的时候做校验，如果校验失败了，会阻止表单的提交。如果校验成功了，它就会让表单继续提交。

$(function(){
  //获取表单内容，并进行校验
  var $form = $('form');
  //获取bootstrapValidator实例化对象,通过这个对象可以获取到好多方法
  //var $validator = $('form').data('bootstrapValidator'); //不能放在这，刚进来获取到的是正确的，错误的时候是在最后状态改变了的时候重置

  //使用表单插件,初始化
  $form.bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    //excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败
      validating: 'glyphicon glyphicon-refresh' //校验中   三个是一组的 少一个都不行
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          callback:{
            message:'用户名不存在'
          },
        }
      },
      password: {
        //validators 校验器
        validators: {
          notEmpty: {
            message:'密码不能为空'
          },
          callback:{
            message:'密码错误'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 10,
            message: '用户密码长度在6~10之间'
          }
        }
      }
    }

  });


  //表单提交时会出发success.form.bv事件，submit会跳转，所以此时要阻止跳转，用ajax提交表单
  //success.form.bv 指的是表单提交时触发的 bv（是bootstrapValidator的缩写） 插件中的方法
  $form.on('success.form.bv',function(e){
    e.preventDefault();
    //序列化表单中的数据
    var $data = $form.serialize();
    //使用ajax请求
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$data,
      success:function(info){
        //用户名密码验证成功
        if(info.success){
          location.href='index.html';
        }
        //用户名错误
        if(info.error == 1000){
          //使用updateStatus方法，把用户名改成失败即可
          // $form.data("bootstrapValidator") 用于获取插件实例，通过这个实例可以调用方法
          //3个参数：
          //1. 字段名，，，，，username
          //2. 状态  ： VALID   INVALID
          //3. 显示哪个校验的内容
          $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
          //console.log(info.message);
        }
        //密码错误
        if(info.error == 1001){
          $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
          //console.log(info.message);
        }
      }
    });
  })



  //重置表单样式
  //var $reset = $('reset');  //这样获取到的注册不了点击事件
  //console.log($reset);
  $("[type='reset']").on('click',function(){
    //获取bootstrapValidator实例化对象,通过这个对象可以获取到好多方法
    var $validator = $('form').data('bootstrapValidator');

    $validator.resetForm();
  })



});
