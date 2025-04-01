$(document).ready(function () {
    const initSlick = () => {
        // .p-jirei 内の slick は常に動作させる
        $('.p-jirei .slick').each(function () {
            if (!$(this).hasClass('slick-initialized')) {
                $(this).slick({
                    // centerMode: true, // 中央配置
                    // slidesToShow: 1, // 1枚ずつ表示
                    // variableWidth: false // 幅を統一
                });
            }
        });

        // 画面幅 1025px 未満なら .p-case__recruit の slick を適用
        if ($(window).width() < 1025) {
            $('.p-case__recruit .slick').each(function () {
                if (!$(this).hasClass('slick-initialized')) {
                    $(this).slick({
                        arrows: true,
                    });
                }
            });
        } else {
            // 1025px 以上なら .p-case__recruit の slick を解除
            $('.p-case__recruit .slick').each(function () {
                if ($(this).hasClass('slick-initialized')) {
                    $(this).slick('unslick');
                }
            });
        }
    };

    // 初期実行
    initSlick();

    // 画面サイズが変更されたときに再チェック
    $(window).on('resize', function () {
        initSlick();
    });
});
