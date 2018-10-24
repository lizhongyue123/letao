$(function (){

  $("form").bootstrapValidator({
    //指定校验字段
    fields:{
      // 配置用户名的校验
      username: {
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min: 2,
            max: 6,
            message: '用户名长度必须是2-6位'
          },
          callback:{
            message: '用户名不存在'
          }
        }
      },

      // 配置密码的校验
      password:{
        validators:{
          notEmpty:{
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码的长度必须是6-12位'
          },
          callback: {
            message:'密码错误'
          }
        }
      }
    },

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
})

// 给表单注册一个表单校验成功的事件,
// 只有表单校验成功的时候才会出触发
$('form').on("success.form.bv",function(e){
  // 阻止浏览器的默认行为
  e.preventDefault();
  $.ajax({
    type: 'post',
    data: $('form').serialize(),
    url:'/employee/employeeLogin',
    success: function (info){
      console.log(info);
      if (info.error === 1000) {
        //用户名不存在
        $('form').data('bootstrapValidator')
        .updateStatus('username','INVALID','callback');
      }

      if (info.error === 1001) {
        //密码错误
        $('form').data("bootstrapValidator")
        .updateStatus('password','INVALID','callback');
      }

      if (info.success) {
        location.href = 'index.html';
      }
      
    }
  })
})


//重置表单功能,并且会隐藏所有的错误提示和图标
$(".reset").on('click',function () {
  $('form').data("bootstrapValidator").resetForm();
})


})