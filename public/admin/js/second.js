$(function () {

  //渲染数据
  var page = 1;
  var pageSize = 5;

  function render() {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page: page,
        pageSize: pageSize
      },
      success:function(info){
        // console.log(info);

        $('tbody').html( template('tmp',info) );

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          current:page,
          totalPages: Math.ceil( info.total/info.size ),
          onPageClicked: function(a,b,c,p){
            page = p;
            render();
          }
        })
        
      }
    })
  }

  render();



  // 给添加分类按钮注册点击事件,显示模态框
  $('.btn_add').on('click',function(){
    $("#addModal").modal('show');

    //  模态框中的一级分类
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        // console.log(info);
        
        $('.dropdown-menu').html( template('tmp1',info) );
      }
    })

  })

  // 上传图片
  $("#file").fileupload({
    done: function(e,data){
      var picAddr = data.result.picAddr;
      // console.log(picAddr);
      // 显示图片
      $(".img_box img").attr('src',picAddr);
      $("[name=brandLogo]").val(picAddr);
      // 通过updateStatus方法，把校验改成成功
      $('form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  })

  // 给模态框里的dropdown-menu中的li注册点击事件
  $(".dropdown-menu").on('click','li',function(){
    var id = $(this).data('id');
    // console.log(id);
    $("[name=categoryId]").val(id);

    var text = $(this).children().html();
    // console.log(text);
    $(".dropdown_text").html(text);
     // 通过updateStatus方法，把校验改成成功
    $('form').data('bootstrapValidator').updateStatus('categoryId','VALID')
  })

  // 模态框中表单的校验
  $('form').bootstrapValidator({
    // 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    // 全部校验
    excluded: [],
    fields:{
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入二级分类的名称'
          }
        }
      },

      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          }
        }
      },

      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传品牌图片'
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


  // 给添加按钮注册点击事件
  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data: $('form').serialize(),
      success: function(info){
        // console.log(info);
        if (info.success) {
          $('#addModal').modal("hide");
          $('form').data('bootstrapValidator').resetForm(true);
          page = 1;
          render();
        }
      }
    })
  })

  





})