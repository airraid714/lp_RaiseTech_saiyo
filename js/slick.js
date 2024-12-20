$(document).ready(function () {
    const initSlick = () => {
        if ($(window).width() < 1025) {
            if (!$('.slick').hasClass('slick-initialized')) {
                $('.slick').slick({
                    // centerMode: true,          // 中央にスライドを配置
                    // centerPadding: '60px 20px',    // 両サイドのスライドの見える幅
                    // slidesToShow: 1,          // 表示するスライドの数
                    // infinite: true,           // 無限ループ
                    arrows: true, 
                }); // Slickを初期化
            }
        } else {
            if ($('.slick').hasClass('slick-initialized')) {
                $('.slick').slick('unslick'); // Slickを解除
            }
        }
    };

    // 初期実行
    initSlick();

    // 画面サイズが変更されたときに再チェック
    $(window).on('resize', function () {
        initSlick();
    });
});