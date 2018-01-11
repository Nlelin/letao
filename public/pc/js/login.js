/**
 * Created by Administrator on 2018/1/11 0011.
 */

//要求用户名不能为空
  //要求密码不能为空，并且长度是6-12
  //表单校验插件，在表单提交的时候做校验，如果校验失败了，会阻止表单的提交。如果校验成功了，它就会让表单继续提交。
$(function(){
  //获取表单内容，取消默认行为
  var $form = $('form');
  var data = $form.serialize();
  console.log(data);


  //e.preventDefault();

});
