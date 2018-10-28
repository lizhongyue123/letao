$(function (){

//左边
  render();

  // 发送ajax请求,获取数据
  function render(){

    $.ajax({
      type:'get',
      url:'/category/queryTopCategory',
      success:function (info){
        // console.log(info);
        $(".lt_left ul").html( template('tmp',info) );
        // 渲染一级分类中第一个分类对应的二级分类
        renderSecond(info.rows[0].id);
      }
    })
  }

  // 给左边的li注册点击事件
  $(".lt_left ul").on("click",'li',function(){
    // 切换active
    $(this).addClass('active').siblings().removeClass();
    // 获取一级分类的id
    var id = $(this).data('id');
    renderSecond(id);
  })


  // 右边
  function renderSecond(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        // console.log(info);
        $(".lt_right ul").html( template('tmp1',info) );
        
      }
    })
  }






})