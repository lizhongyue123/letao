$(function () {

  var page = 1;
  var pageSize = 2;
  // 渲染数据
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);
        $('tbody').html(template('tmp', info));

        // 分页功能
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        })

      }
    })
  }

  render();


  // 给添加分类按钮注册点击事件,显示模态框
  $('.btn_add').on("click", function () {
    $("#addModal").modal("show");
  })

  // 表单校验功能
  $('form').bootstrapValidator({
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类的名称'
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


  $(".add").on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data: $('form').serialize(),
      success:function(info){
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal('hide');
          // 重置样式
          $('form').data('bootstrapValidator').resetForm(true);
          // 重新渲染第一页
          page = 1;
          render();
          
        }
        
      }
    })
  })


})