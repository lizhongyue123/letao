// 动态渲染
$(function (){

  var page = 1;
  var pageSize = 5;

  // 渲染数据
  function render(){
    $.ajax({
      url:'/user/queryUser',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      }, 
      success: function(info){
        // console.log(info);
        // 绑定模板
        $('tbody').html( template('tmp', info) );

        $('#paginator').bootstrapPaginator({
          //默认是2，如果是bootstrap3版本，这个参数必填
          bootstrapMajorVersion:3,
          currentPage: page,
          totalPages: Math.ceil( info.total/info.size ),
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }
        })
      }
    })
  }
  render();

  var id,isDelete;
  // 给操作中的按钮添加点击事件,需要使用事件委托
  $('tbody').on('click','button',function (){
    $("#isDeleteModal").modal('show');
     id = $(this).parent().data('id');
     isDelete= $(this).hasClass('btn-success')?1:0;
    // console.log(id,isDelete);
  })
 
  // 给模态框中的确认按钮注册点击事件
  $(".confirm").on('click',function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:isDelete,
      },
      success: function(info){
        if (info.success) {
          // 关闭模态框
          $("#isDeleteModal").modal('hide');
          render();
        }
      }
    })
  })

 
})