document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector(".p-achieve__list");
    const items = document.querySelectorAll(".p-achieve__list__item");
    const itemWidth = items[0].offsetWidth + 40; // アイテムの幅 + gap
    const totalWidth = itemWidth * items.length;

    // リストを複製してスムーズなループを作成
    list.innerHTML += list.innerHTML; // リスト内容を複製

    let position = 0;

    function animate() {
        position -= 0.3; // アニメーション速度
        if (Math.abs(position) >= totalWidth) {
            position = 0; // スムーズにリセット
        }
        list.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate); // フレーム単位で更新
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


    // 問い合わせフォームのプライバシーポリシー処理
    const privacyCheckbox = document.getElementById('privacy');
    const submitButton = document.querySelector('.c-button--form-submit');

    privacyCheckbox.addEventListener('change', () => {
        submitButton.disabled = !privacyCheckbox.checked;
    });
});
