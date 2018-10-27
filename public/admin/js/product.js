$(function () {

  //渲染数据
  var page = 1;
  var pageSize = 2;

  // 声明一个数组,存放图片
  var imgs = [];

  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(info);

        $('tbody').html(template('tmp', info));

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          current: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          },
          itemTexts: function (type, page, current) {
            // console.log(type);
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'page':
                return page;
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
            }

          },

          tooltipTitles: function (type, page, current) {
            // console.log(type);
            switch (type) {
              case 'first':
                return '首页';
              case 'prev':
                return '上一页';
              case 'page':
                return '第' + page + '页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
            }

          },


        })

      }
    })
  }

  render();

  // 点击按钮显示模态框
  $('.btn_add').on("click", function () {
    $("#addModal").modal('show');

    // 渲染模板引擎中的二级分类
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info);
        $(".dropdown-menu").html(template('tmp1', info));
      }
    })
  })

  // 点击模态框中的li
  $(".dropdown-menu").on('click', 'li', function () {
    var id = $(this).data('id');
    $('[name=brandId]').val(id);
    var content = $(this).children().html();
    $('.dropdown_text').html(content)
    // 手动校验
    $('form').data("bootstrapValidator").updateStatus('brandId', 'VALID');
  })

  // 表单校验
  $('form').bootstrapValidator({
    excluded: [],
    //指定校验字段
    fields: {
      // 配置校验
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品的名称'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品的描述'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品的库存'
          },
          //正则
          regexp: {
            regexp: /^[1-9]\d{0,4}$/,
            message: '请输入正确的商品库存(1-99999)'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品的尺码'
          },
          //正则
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入正确的尺码格式(xx-xx)'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品的原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品的价格'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      },
    },

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

  })

  // 上传图片
  $('#file').fileupload({

    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      if(imgs.length >= 3){
        alert('只能上传3张图片');
        return false;
      }
      imgs.push(data.result);
      $('.img_box').append( $('<img src="'+ data.result.picAddr +'"width="100" height="100">') );

      // 上传3张图片的时候,手动校验
      if(imgs.length === 3){
        $("form").data("bootstrapValidator").updateStatus('picStatus','VALID');
      }else{
        $("form").data("bootstrapValidator").updateStatus('picStatus','INVALID');
      }
      
    }
  })


  // 注册表单校验成功事件
  $("form").on('success.form.bv',function(e){
    var param = $('form').serialize();
    param += '&picName1='+imgs[0].picName+'&picAddr1='+imgs[0].picAddr;
    param += '&picName2='+imgs[1].picName+'&picAddr2='+imgs[1].picAddr;
    param += '&picName3='+imgs[2].picName+'&picAddr3='+imgs[2].picAddr;
    console.log(param);
    

    e.preventDefault();

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data: param,
      success:function(info){
        if (info.success) {
          page = 1;
          render();
          // 关闭模态框
          $("#addModal").modal("hide");
          // 重置样式
          $('form').data('bootstrapValidator').resetForm();
          // 手动重置样式
          $(".dropdown_text").html('请选择二级分类');
          $(".img_box img").remove();
          imgs = [];

          
        }
      }


    })
  })





})