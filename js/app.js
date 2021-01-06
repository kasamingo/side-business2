(function($) {
  'use strict';

  /*
   *  PageTop View
   **/
  $(function () {
      var pagetop = $('.pagetop');

      // スクロール時
      $(window).scroll(function () {

          if ($(this).scrollTop() > 200) {
              // スクロールした場合、要素をフェードイン
              $(pagetop).fadeIn();
          } else {
              // それ以外の場合は、要素を非表示
              // iOS8でトップまでスクロールした後にフェードが繰り返されるバグ回避のため非表示指定
              $(pagetop).fadeOut();
          }
      });

      // ボタン要素押下
      $('.js-pagetop').on('click', function () {

          var href = $(this).attr('href'),
              target = $(href === '#' || href === '' ? 'html' : href),
              position = target.offset().top;

          // ページ上部へスクロールし、移動
          $('body,html').animate({scrollTop: position}, 400, 'swing');

          return false;
      });

  });

  /*
   *  モーダルウィンドウ
   **/
  $(window).on('load', function(){

    /*
     *  モーダルウィンドウ（標準）
     **/
    // モーダルウィンドウのコンテントを生成
    var modal = $('.m-modal');

    $(modal).each(function() {

      // 要素をインナー要素で包括
      $(this).wrapInner('<div class="m-modal-content-inner">')

      // 背景とコンテント、閉じるボタンを生成
      $(this).append('<div class="m-modal-bg">', '<div class="m-modal-content"><button type="button" class="m-modal-close"><span>閉じる');

      var modalContent = $(this).find('.m-modal-content');
      var modalInner = $(this).find('.m-modal-content-inner');

      // コンテント内の閉じるボタンを生成
      $(this).find(modalInner).append('<button type="button" class="m-btn-m-w m-modal-btn" data-type="close"><span>閉じる');

      // インナー要素をコンテント内に移動
      $(modalInner).appendTo(modalContent);

    });

    // モーダルウィンドウトリガー押下
    var jsModal = $('.js-modal');

    $(jsModal).on('click', function() {

      var thisHref = $(this).attr('href');
      var target = $(thisHref);
      var scrollTop = $(window).scrollTop();

      // モーダルウィンドウをフェードイン
      $(target).css('top', scrollTop+100).fadeIn(300);

      // 背景、閉じるボタン要素を押下
      var jsModalClose = $('.m-modal-bg, .m-modal-btn, .m-modal-close');
      $(jsModalClose).on('click', function() {

        // フェードアウトさせる
        $(target).fadeOut(300);

        return false;
      });

      return false;

    });

    /*
     *  モーダルウィンドウ（特定のパラメータ）
     **/
    var url = location.search;

    // パラメータに modal=show が入っている場合
    if (url.indexOf('modal=show') > -1) {

      var target = $('#modal-onload');
      var scrollTop = $(window).scrollTop();

      $(target).find('.m-modal-btn').removeClass('m-btn-m-w').addClass('m-btn-w').attr('data-type', 'link').find('span').text('WEBサイトへ進む');

      // ロード時に表示させるモーダルウィンドウをフェードイン
      $(target).css('top', scrollTop+100).fadeIn(500);

      // 背景、閉じるボタン要素を押下
      var jsModalClose = $('.m-modal-bg, .m-modal-btn, .m-modal-close');
      $(jsModalClose).on('click', function() {

        // フェードアウトさせる
        $(target).fadeOut(300);

        return false;
      });
    }

    /*
     *  モーダルウィンドウ（画像拡大表示）
     **/
    // モーダルウィンドウのトリガー要素内にボタン要素を生成
    var jsModalImg = $('.js-modal-img');

    $(jsModalImg).append('<button type="button" class="m-btn-m-w" data-type="zoom"><span>');

    // モーダルウィンドウトリガー押下
    $(jsModalImg).on('click', function() {

      // ウィンドウサイズがPCサイズの場合の処理
      var windowSize = $(window).width();
      if (windowSize >= 768) {

        // PC幅の場合はモーダルウィンドウを表示
        var thisHref = $(this).attr('href');
        var scrollTop = $(window).scrollTop();

        // body閉じ要素の閉じタグ前に要素を生成
        $('body').append('<div class="m-modal-img"><div class="m-modal-img-bg">');

        // モーダルウィンドウのコンテント要素を生成
        var modalImg = $('.m-modal-img').css('top', scrollTop+100);
        $(modalImg).append('<div class="m-modal-img-content">');

        // コンテント内に画像、閉じるボタンを生成
        $(modalImg).find('.m-modal-img-content').append('<div class="m-modal-img-wrapper"><img src="' + thisHref + '">');
        $(modalImg).find('.m-modal-img-content').append('<button type="button" class="m-btn-m-w m-modal-img-btn" data-type="close"><span>閉じる');
        $(modalImg).find('.m-modal-img-content').append('<button type="button" class="m-modal-img-close"><span>閉じる');

        // モーダルウィンドウのコンテント要素をフェードイン
        $(modalImg).fadeIn(300);

        // 背景、閉じるボタン要素を押下
        var jsModalClose = $('.m-modal-img-bg, .m-modal-img-btn, .m-modal-img-close');
        $(jsModalClose).on('click', function() {

          // モーダルウィンドウを要素毎削除する
          $(modalImg).fadeOut(300).queue(function() {
            $(this).remove();
          });
        });

        return false;
      }

    });

  });

  /*
   *  スムーススクロール
   **/
  $(function() {

    var anchor = $('a');

    $(anchor).each(function() {

      var thisHref = $(anchor).attr('href');

      if (thisHref.match('#')) {

        // アンカーリンクリストのトリガー要素押下
        $(this).on('click', function () {

          var href = $(this).attr('href'),
              target = $(href === '#' || href === '' ? 'html' : href),
              position = target.offset().top;

          // id指定している要素へスクロールで移動
          $('body, html').animate({scrollTop: position}, 400, 'swing');

          return false;
        });

      }
    });

  });

})(jQuery);
