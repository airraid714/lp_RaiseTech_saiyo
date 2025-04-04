document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector(".p-achieve__list");
    const items = document.querySelectorAll(".p-achieve__list__item");

    if (!list || items.length === 0) return;

    const itemWidth = items[0].offsetWidth + 40; // アイテム幅 + gap
    const itemCount = items.length;

    // リストを複製して無限ループ用に2倍に
    list.innerHTML += list.innerHTML;

    let position = 0;

    function animate() {
      position -= 0.3;

      // 1セット分の幅を超えたら巻き戻す（シームレスに）
      if (Math.abs(position) >= itemWidth * itemCount) {
        position = 0;
      }

      list.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    }

    animate();
    

    // FAQセクションの挙動
    function toggleAnswer(event) {
        // クリックされた質問の親要素を取得
        const questionElement = event.currentTarget;
        const faqItem = questionElement.closest('.p-faq__item');
        
        // 対応する回答部分を取得
        const answerElement = faqItem.querySelector('.p-faq__answer');

        // 回答部分の表示/非表示を切り替え
        answerElement.classList.toggle('is-open');

        // ARIA属性を更新
        const isVisible = answerElement.classList.contains('is-open');
        questionElement.setAttribute('aria-expanded', isVisible);
    }

    // FAQセクションの質問にイベントリスナーを追加
    const faqQuestions = document.querySelectorAll('.p-faq__question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', toggleAnswer);
    });

    const hamburger = document.querySelector(".js-hamburger");
    const navElement = document.querySelector(".js-nav");
    const closeBtn = document.querySelector(".js-close");
    const menuLinks = document.querySelectorAll(".p-nav--global a");
    
    // ハンバーガーボタンのクリックでメニューを開閉
    hamburger.addEventListener("click", () => {
        navElement.classList.toggle("is-open");
    });
    
    // 閉じるボタンのクリックでメニューを閉じる
    closeBtn.addEventListener("click", () => {
        navElement.classList.remove("is-open");
    });
    
    // メニュー内リンクをクリックするとスクロール後にメニューを閉じる
    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
    
            // href="#" ならページトップへ戻る
            if (href === "#") {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
    
                // スクロール完了後にメニューを閉じる
                window.addEventListener("scrollend", () => {
                    navElement.classList.remove("is-open");
                }, { once: true });
    
                // フォールバック (非対応ブラウザ向け)
                setTimeout(() => {
                    navElement.classList.remove("is-open");
                }, 1000);
    
                return;
            }
    
            // ページ内リンク (セクションスクロール)
            const targetId = href.slice(1); // "#service" -> "service"
            const targetElement = document.getElementById(targetId);
    
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
    
                // スクロール完了後にメニューを閉じる
                window.addEventListener("scrollend", () => {
                    navElement.classList.remove("is-open");
                }, { once: true });
    
                // フォールバック (非対応ブラウザ向け)
                setTimeout(() => {
                    navElement.classList.remove("is-open");
                }, 1000);
            }
        });
    });
    


    
});

// フォームの制御
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("myForm");
    const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='tel']");
    const checkbox = document.getElementById("privacy");
    const submitButton = document.querySelector(".c-button--form-submit");

    // 入力チェック関数
    const validateForm = () => {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== "");
        const isCheckboxChecked = checkbox.checked;

        if (allFilled && isCheckboxChecked) {
            submitButton.disabled = false;
            submitButton.classList.add("enabled");
        } else {
            submitButton.disabled = true;
            submitButton.classList.remove("enabled");
        }
    };

    // 各入力要素にイベントリスナーを登録
    inputs.forEach(input => {
        input.addEventListener("input", validateForm);
    });

    // チェックボックスにイベントリスナーを登録
    checkbox.addEventListener("change", validateForm);

    // ページ読み込み時の初期状態をチェック
    validateForm();

    // フォーム送信時のreCAPTCHA処理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!submitButton.disabled) {
            grecaptcha.ready(function() {
                grecaptcha.execute('6LeeUJoqAAAAALpN6gNPnGKSEgyYSS38V8NqedLh', {action: 'submit'}).then(function(token) {
                    document.getElementById('recaptchaResponse').value = token;
                    form.submit();
                });
            });
        }
    });
    
});


// カスタムスクロールバーの挙動    
document.addEventListener("DOMContentLoaded", () => {
    // スクロール可能な要素とthumb, trackを取得
    const scrollableElement = document.querySelector(".js-scrollbar");
    const thumb = document.querySelector(".p-scrollbar__track__thumb");
    const track = document.querySelector(".p-scrollbar__track");

    if (scrollableElement && thumb && track) {
        // 初期設定: thumbの幅を設定
        const updateThumb = () => {
            const visibleRatio = scrollableElement.clientWidth / scrollableElement.scrollWidth;
            thumb.style.width = `${visibleRatio * track.clientWidth}px`; // trackの幅に基づいて計算
        };

        // スクロール時の位置更新
        scrollableElement.addEventListener("scroll", () => {
            const maxScrollLeft = scrollableElement.scrollWidth - scrollableElement.clientWidth; // スクロール可能な最大幅
            const scrollRatio = scrollableElement.scrollLeft / maxScrollLeft; // スクロール位置の割合
            const maxThumbLeft = track.clientWidth - thumb.offsetWidth; // thumbが動ける最大範囲
            thumb.style.left = `${scrollRatio * maxThumbLeft}px`; // スクロール位置に基づいてthumbの位置を計算
        });

        // リサイズ時にthumbの幅を更新
        window.addEventListener("resize", updateThumb);

        // 初期設定を適用
        updateThumb();
    } else {
        console.error("スクロールバーまたはthumb要素が見つかりません。");
    }
});


//キャンペーンバナーの挙動
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.c-obje--banner');
    const campaign = document.querySelector('.p-campaign');
    const closeBtn = document.querySelector('.c-button--pop');
  
    let isBannerClosed = false;
    let hasBannerShown = false; // ✅ 一度表示したかどうか
    let isInCampaign = false;
  
    function handleScroll() {
      if (!isBannerClosed && !hasBannerShown && !isInCampaign && window.scrollY >= window.innerHeight) {
        banner.classList.add('is-active');
        hasBannerShown = true; // ✅ 一度だけ表示
      }
    }
  
    window.addEventListener('scroll', handleScroll);
  
    const campaignObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isInCampaign = true;
          banner.classList.remove('is-active');
        } else {
          isInCampaign = false;
        }
      });
    }, {
      root: null,
      threshold: 0.1
    });
  
    if (campaign) campaignObserver.observe(campaign);
  
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        banner.classList.remove('is-active');
        isBannerClosed = true;
      });
    }
});