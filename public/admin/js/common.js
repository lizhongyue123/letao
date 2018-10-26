$(function (){
    // ajax的全局事件  6个
    // ajaxStart() 任何的ajax只要开始了，就会触发ajaxStart事件
    // .ajaxSend()
    // ajaxSuccess()
    // ajaxError()
    // ajaxComplete()
    // ajaxStop()
    $(document).ajaxStart(function (){
      //  开始进度条
      NProgress.start();
    })

    $(document).ajaxStop(function (){
      //  结束进度条
      NProgress.done();
    })


    // 侧边栏中菜单栏的显示和隐藏
    $('.nav .category>a').on('click',function (){
      $(this).siblings().slideToggle('active');
    })

    // 侧边栏显示与隐藏
    $('.icon_menu').on('click',function (){
      $('.lt_aside').toggleClass('active');
      $('.lt_container').toggleClass('active');
    })


    // 退出按钮的显示与隐藏
    $('.icon_logout').on('click',function (){
      $('#logoutModal').modal('show');
    })


    // 退出按钮
    $(".logout").on('click',function(){
      $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        success:function(info){
          if (info.success) {
            location.href='login.html';
          }
          
        }
      })
    })
})