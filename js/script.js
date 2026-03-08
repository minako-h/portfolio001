$(function () {
	/**
	 * タブの切り替え処理
	 * @param {Object} $target クリックされた要素.
	 * @returns {void} 何も返さない.
	*/
	function switchTab ($target) {
		'use strict';

		const targetGalleryName = $target.data('gallery');
		const galleryItems = $('.gallery');

		galleryItems.each(function(){
			const $this = $(this);
			const galleryListName = $this.attr('id');

			if(targetGalleryName !== galleryListName) {
				$target.addClass('is-active');
				$('#' + targetGalleryName).addClass('is-active');
				const $currentTarget = $target.parent().siblings();
				$currentTarget.find('.tab__btn').removeClass('is-active');
				$this.removeClass('is-active');
			}
		});
	};

	/**
	 * モーダル開く
	 * @param {Object} options 対象の要素.
	 * @returns {Void} 何も返さない.
	*/
	function openModal (options) {
		'use strict';

		const $target = options.$target;
		const $body = options.$body;
		const $modal = options.$modal;
		const bannerType = $target.data('type');

		const $targetImg = $target.find('.gallery__img');
		const scrollPosition = $(window).scrollTop() * -1;
		const imgSrc = $targetImg.attr('src');
		const imgText = $targetImg.data('imgtext');
		const $modalImage = $modal.find('.modal__window-image');
		const $modalText = $modal.find('.modal__window-text');
		$modalImage.attr('src', imgSrc);
		$modalText.text(imgText);

		// バナーによりサイズを調整
		if(bannerType === 'short') {
			$modalImage.css('max-width', '500px');
		} else if(bannerType === 'logo') {
			$modalImage.css('max-width', '450px');
		}

		$modal.addClass('is-active');

		if(scrollPosition < 0) {

			$body.addClass('is-fix');
			$body.css('top', scrollPosition);
		}

		$body.css('overflow', 'hidden');
	};

	/**
	 * モーダル閉じる
	 * @param {Object} options 対象の要素.
	 * @returns {Void} 何も返さない.
	*/
	function closeModal (options) {
		'use strict';

		options.$target.removeClass('is-active');
		options.$body.css('overflow', 'initial');

		$('.modal__window-image').css('max-width', '');

		if($('body').hasClass('is-fix')) {
			$body.removeClass('is-fix');
			$body.css('top', 'auto');
		}
	};

	/**
	 * ページ上部へスムーススクロール
	 * @returns {Void} 何も返さない.
	*/
	function smoothScroll () {
		'use strict';

		var scrollBar = 'body, html';
		var scrollTopVal = $('body').offset().top;

		window.setTimeout(function() {
			$(scrollBar).animate({
				scrollTop: scrollTopVal
			}, 500);
		});
	};

	/**
	 * メール送信
	 * @param {Object} options 対象の要素.
	 * @returns {Void} 何も返さない.
	*/
	function sendMail (options) {
		'use strict';

		const $form = options.$form;
		const nameVal = $form.find(options.name).val();
		const emailVal = $form.find(options.email).val();
		const commentVal = $form.find(options.comment).val();

		const emailAddress = 't72.hirao.minako@gmail.com';
		// const href = `mailto:${emailAddress}?subject=ポートフォリオ%20お問い合わせ&body=お名前：${nameVal}%0D%0Ae-mail：${emailVal}%0D%0Aお問い合わせ詳細：${commentVal}`;
		const href = `mailto:${emailAddress}?subject=ポートフォリオ%20お問い合わせ&body=%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E5%86%85%E5%AE%B9%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E4%BB%A5%E4%B8%8B%E3%81%94%E7%A2%BA%E8%AA%8D%E3%81%AE%E4%B8%8A%E3%80%81%0D%0A%E3%83%A1%E3%83%BC%E3%83%AB%E9%80%81%E4%BF%A1%E3%81%AE%E3%81%BB%E3%81%A9%E5%AE%9C%E3%81%97%E3%81%8F%E3%81%8A%E9%A1%98%E3%81%84%E3%81%84%E3%81%9F%E3%81%97%E3%81%BE%E3%81%99%E3%80%82%0D%0A%0D%0A%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%3D%0D%0A%E3%81%8A%E5%90%8D%E5%89%8D%EF%BC%9A${nameVal}%0D%0A%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%EF%BC%9A${emailVal}%0D%0A%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E5%86%85%E5%AE%B9%EF%BC%9A${commentVal}`;
		window.location.href = href;
	};


	// trigger
	const $body = $('body');
	const $modal = $('#js-modal');
	const $form = $('#js-form');
	// タブ切り替え
	$('.tab__btn').on('click', function(e) {
		e.preventDefault();
		switchTab($(this));
	});
	// モーダル開閉
	$('.js-gallery').on('click', function(e) {
		const galleryListName = $(this).parents().eq(1).attr('id');
		if(galleryListName === 'gallery-lp') {
			return;
		}
		e.preventDefault();
		openModal({
			$modal: $modal,
			$target: $(this),
			$body: $body
		});
	});
	$('.js-modal-close').on('click', function(e) {
		e.preventDefault();
		closeModal({
			$target: $modal,
			$body: $body
		});
	});
	// お問い合わせ
	// ↓コンタクトのメール送信自体が非推奨っぽいから後から消す
	$('.js-contact-btn').on('click', function(e) {
		e.preventDefault();
		const name = '.js-name';
		const email = '.js-email';
		const comment = '.js-comment';

		sendMail({
			$form: $form,
			name: name,
			email: email,
			comment: comment
		});
	});
	// ページトップへスクロール
	$('#js-pagetop').on('click', function(e) {
		e.preventDefault();
		smoothScroll();
	});
});
