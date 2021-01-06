(function ($) {
  'use strict';

  // PC/SP判定
  // スクロールイベント
  // リサイズイベント
  // スムーズスクロール


  var deviceFlag = 0; // 0 : PC ,  1 : SP
  deviceFlag = $('body').css('position') === 'relative' ? 1 : 0;
  var befDeviceFlag = deviceFlag;


  // pagetop
  var $pageTop = $('#pagetop');
  $pageTop.hide();

  // スクロールイベント
  $(window).on('scroll touchmove', function() {

    // スクロール中か判定
    if (timer !== false) {
      clearTimeout(timer);
    }

    // 200ms後にフェードイン
    timer = setTimeout(function() {
      if ($(this).scrollTop() > 100) {
        $('#pagetop').fadeIn('normal');
      } else {
        $pageTop.fadeOut();
      }
    }, 200);
    
    
    $pageTop.css({
      'position':'fixed',
      'bottom': '20px'
    });

    var scrollHeight = $(document).height(); 
    var scrollPosition = $(window).height() + $(window).scrollTop(); 
    var footHeight = parseInt($('#footer').innerHeight() + $('#copyright').innerHeight() - 60);

    if ( deviceFlag === 0 ) { // → PC
      if ( scrollHeight - scrollPosition  <= footHeight ) {
      // 現在の下から位置が、フッターの高さの位置にはいったら
        $pageTop.css({
          'position':'absolute',
          'bottom': footHeight
        });
      }
    } else { // → SP
      $pageTop.css({
        'position':'fixed',
        'bottom': '55px'
      });
    }
    var scrollHeight = $(document).height(); 
    var scrollPosition = $(window).height() + $(window).scrollTop(); 
    var footHeight = parseInt($('#footer').innerHeight() + $('#copyright').innerHeight() - 35);

    if ( scrollHeight - scrollPosition  <= footHeight ) {
      // 現在の下から位置が、フッターの高さの位置にはいったら
      $pageTop.css({
        'position':'absolute',
        'bottom': footHeight
      });
    }

  });


  // リサイズイベント
  var timer = false;
  $(window).resize( function() {
    deviceFlag = $('body').css('position') === 'relative' ? 1 : 0;

    // → PC
    if ( befDeviceFlag !== 0 && deviceFlag === 0 ) {
    }
    // → SP
    if ( befDeviceFlag !== 1 && deviceFlag === 1 ) {
    }
    
    befDeviceFlag = deviceFlag;
  });


  // スムーズスクロール
  // #で始まるアンカーをクリックした場合にスムーススクロール
  $('a[href^=#]').click(function() {
    if($(this).parents('.nav-menu')[0]){
      if(deviceFlag) return;
    }
    var speed = 500;
    // アンカーの値取得
    var href= $(this).attr('href');
    // 移動先を取得
    var target = $(href == '#' || href == '' ? 'html' : href);
    // 移動先を数値で取得
    var position = target.offset().top;
    
    // スムーススクロール
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });


  //matchHeight
  (function() {
    $(window).on('load', function() {
      $('.js-matchB').matchHeight();
      $('.js-match').matchHeight();
    });
  }());



  // ヘッダーメニュー
  $(function () {
    var scrollpos;
    $('.menu-btn').on('click', function () {
      $(this).toggleClass('active');
      $('.nav').toggleClass('active');
      if(!deviceFlag){
        $('.nav-bg').fadeIn(200);
        $('body').off('click.close').on('click.close',function(e){
          var target = $(e.target).parents('#header').length;
          if(!target){
            $('.nav-bg').fadeOut(200);
            $('.menu-btn').removeClass('active');
            $('.nav').removeClass('active');
            return;
          }
        });
      } else {
        if ($(this).hasClass('active')) {
          scrollpos = $(window).scrollTop();
          $('body').addClass('fixed').css({
            'top': -scrollpos
          });
          $('.nav-bg').fadeIn(200);
        } else {
          $('body').removeClass('fixed').css({
            'top': 0
          });
          window.scrollTo(0, scrollpos);
          $('.nav-bg').fadeOut(200);
        }
      }

    });
    $('.nav-menu li a').on('click', function(e){
      if(!deviceFlag){
        $('.nav-bg').fadeOut(200);
        $('.menu-btn').removeClass('active');
        $('.nav').removeClass('active');
        return;
      } else {
        e.preventDefault();
        var $target = $($(this).attr('href'));
        var position;
        $.when(
          $('.nav-bg').trigger('click')
        ).done(function() {
          position = $target.offset().top; $('body,html').animate({scrollTop:position}, 300, 'swing');
        });
      }
    });
    $('.nav-bg').on('click', function () {
      if(!deviceFlag)return;
      $(this).fadeOut();
      $('body').removeClass('fixed').css({
        'top': 0
      });
      window.scrollTo(0, scrollpos);
      $('.menu-btn').removeClass('active');
      $('.nav').removeClass('active');
    });
  });
  
  //フローティング
  (function() {
    var $elm = $('#floating-box'),
        targetIn = $('#merit').offset().top,
        targetOut = $('#flow').offset().top,
        winW, scrollPos;
    $(window).on('scroll load', function() {
      winW = window.innerWidth;
      scrollPos = $(window).scrollTop() + window.innerHeight;
      if(targetIn < scrollPos) {
        $elm.addClass('is-active');
      } else {
        $elm.removeClass('is-active');
      }
    });
    $(window).on('resize', function() {
      targetIn = $('#merit').offset().top;
      targetOut = $('#flow').offset().top;
    });
  })();

})(jQuery);