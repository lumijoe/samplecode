// ======================================
// スムーススクロール
// ======================================
$(function(){
	var headerHeight = $('#header').height();
	var scrollAdjust = headerHeight;

  var urlHash = location.hash;
  if(urlHash) {
    $('body,html').stop().scrollTop(0);
    setTimeout(function () {
      scrollToAnker(urlHash) ;
    }, 100);
  }

  //通常のクリック時
  $('a[href^="#"]').click(function() {
    var href= $(this).attr("href");
    var hash = href == "#" || href == "" ? 'html' : href;
    scrollToAnker(hash);
    return false;
  });

  // 指定したアンカー(#ID)へアニメーションでスクロール
  function scrollToAnker(hash) {
    var target = $(hash);
    var position = target.offset().top - scrollAdjust;
    $('body,html').stop().animate({scrollTop:position}, 1000);
  }

  // 別ページのアンカーリンク ?id=○○ で遷移
  $(window).on('load', function() {
    var url = $(location).attr('href');
    if(url.indexOf("?id=") != -1){
      var id = url.split("?id=");
      var $target = $('#' + id[id.length - 1]);
      if($target.length){
        $('body').removeClass('fixed');
        $('.start_overlay').hide();
        var pos = $target.offset().top - scrollAdjust;
        $("html, body").animate({scrollTop:pos}, 1000);
      }
    }
  });

});