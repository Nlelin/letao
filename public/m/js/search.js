/**
 * Created by Administrator on 2018/1/16 0016.
 */
$(function(){
  //点击搜索按钮获取到input中的文字，存储在localStorage中,渲染历史记录列表，进行增删改查


  //获取数据,返回数组
  function getHistory(){
    //获取localStorage中的数据，复杂数据类型要转化成json类型，如果没有，返回一个空数组,不然lt_search_data是空的，后边会报错
    var history = localStorage.getItem('lt_search_data') || '[]';
    var arr = JSON.parse(history);
    return arr;
  }

  //1、渲染数据
  function render(){
    //获取数据
    var arr = getHistory();
    //拼接模板渲染
    $('.lt_list').html(template('tpl',{arr:arr}));
    //console.log(arr.length);
  }

  render();


  //2、清空记录
  $('.lt_list').on('click','.btn_empty',function(){
    //清除localStory
    mui.confirm("您是否要清空所有的历史记录?", "温馨提示", ["是", "否"],function (e) {
      if(e.index == 0){
        localStorage.removeItem('lt_search_data');
        render();
      }
    })
  });


  //3、删除单个
  $('.lt_list').on('click','.btn_delete',function(){
    //获取到在数组中的id
    var index = $(this).data('index');
    //删除在数组中响应的
    var arr = getHistory();
    //console.log(arr);
    arr.splice(index,1);
    //console.log(arr);
    //重新设置localStorage值
    localStorage.setItem('lt_search_data',JSON.stringify(arr));
    render();
  });




  //4、添加数据
  //获取input框输入文字后存入我的localStorage中 ,设置最多十项，多出部分删除，相同的部分删除后边的，添加新的(先判断添加后删除，不然会因为长度删除，重复再删除，删多了)
  $('.btn-search').on('click',function(){
    //4.1获取文字
    var text = $('.search-text').val().trim();
    if (!text){
      mui.toast("请输入搜索关键字");
      return ;
    }

    //4.2获取数据
    var arr = getHistory();

    //4.3判断是否有这个值
    var index = arr.indexOf(text);
    if (index != -1){
      arr.splice(index,1);
    }
    if (arr.length >= 10 ){
      //从后边删除
      arr.pop();
    }


    //4.4在最前边插入
    arr.unshift(text);


    console.log(arr);
    //重新设置值
    localStorage.setItem('lt_search_data',JSON.stringify(arr));
    render();
    //console.log(localStorage.getItem('lt_search_data'));

    //4.5 页面跳转到 搜索列表页，注意：需要你你的搜索关键字带上
    location.href = "searchList.html?text="+text;
  });



  //点击文字进行搜索跳转
  $('.lt_list').on('click','.click-text',function(){
    //获取当前的文字
    var text = $(this).text();
    //console.log(text);
    //拼接文字跳转
    location.href = "searchList.html?text="+text;
  })

});