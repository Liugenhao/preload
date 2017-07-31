//图片预加载 默认无序加载
(function ($) {

  function PreLoad (imgs ,options) {

    this.imgs = (typeof imgs === 'strimg') ? [imgs] : imgs; //判断图片路径是否为字符串或变量名
    this.opts = $.extend({}, PreLoad.DEFAULTS, options);

    if(this.opts.ordered === 'ordered'){
      this._ordered(); //执行有序预加载
    }else{
      this._unredered(); //执行无序预加载
    }
  };

  PreLoad.DEFAULTS  = {
    ordered: 'unordered',//无序预加载
    each: null, //每一张图片加载完毕后执行
    all: null  //所有图片加载完毕后执行
  };

  PreLoad.prototype._ordered  =function () { //有序预加载
    var opts = this.opts,
        imgs = this.imgs,
        len = imgs.length,
        count = 0;

    load();

    function load() {

      var imgObj = new Image();

      $(imgObj) .on('load error', function() {
        opts.each && opts.each(count);
        if(count>=len){
          //所有图片加载完
          opts.all && opts.all();
        }else{
          load();
        }
        count ++;

      });

      imgObj.src = imgs[count];
    }
  },

  PreLoad.prototype._unredered = function () { //无序加载

    var imgs = this.imgs,
        opts = this.opts,
        count = 0,
        len  = imgs.length;

    $.each(imgs,function(i, src) {

      if(typeof src != 'string') return ;

      var imgObj  = new Image();

      $(imgObj).on('load error' , function (){

        opts.each && opts.each(count);

        if(count >= len-1){

          opts.all && opts.all();

        }
        
        count++;

      });

      imgObj.src=src;

    });
  };

  $.extend({
    preload: function (imgs,opts) {
      new PreLoad(imgs,opts);
    }
  });

})(jQuery);