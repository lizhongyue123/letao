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