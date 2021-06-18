(function(window) {

	'use strict';



	/* -------------------- SideList -------------------- */

	function SideList(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
		this._initEvents();
	}

	SideList.prototype.options = {};

	SideList.prototype._init = function() {
		this.id = this.options.id;
		this.list = $(this.options.list);
		this.context = $(this.options.context);
		this.wrapper = $(this.options.list + '> div');
		this.detail = $(this.options.detail);
		this.toggler = $(this.options.toggler);
		this.togglerTooltip = this.toggler.find('i');
		this.subheader = $('.subheader'),
		this.footer = $('footer'),
		this.persistenthidden = false;
		this.opened = $('body').hasClass('show-sidelist');
		this.mobilelimit = 992;
		this.persistentOver = this.options.persistentOver;
		this.ispersistent = false;
		this.transitioning = false;
		this.ready = false;
	};

	SideList.prototype._initEvents = function() {
		var $this = this;
		this.toggler
			.click(function(e) {
				$this.transitioning = true;
				$this.toggle(!$this.opened);
			});
		this.list
			.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
				$this.transitioning = false;
			});
	};

	SideList.prototype.toggle = function(status) {
		this.check('toggle');
		if (this.ispersistent) {
			this.list.toggleClass('persistent-hidden', !this.persistenthidden);
			this.persistenthidden = !this.persistenthidden;
		} else {
			$('body').toggleClass('show-sidelist', !this.opened)
			this.opened = status;
		}
		this.set();
	};

	SideList.prototype.set = function() {
		var $this = this;
		$('body')
			.toggleClass('noscroll', this.opened && !this.ispersistent)
			.css('top', 
				(this.opened && !this.ispersistent)
					? -Math.abs(
						Math.min(
							((this.memState) 
								? this.memState.scroll
								: 0
							), 
							this.params.bodyH - this.params.winH
						)
					)
					: 0
				);
		if (this.memState)
			$('html, body').animate({scrollTop: this.memState.scroll}, 0, function() {
				$('body').toggleClass('hideheader', !$this.memState.header);
			});
		if (!this.ready) {
			this.ready = true;
			this.list.addClass('ready');
			if (this.list.find('li.active').length > 0) 
				this.list.find('> div').animate({scrollTop: this.list.find('li.active')[0].offsetTop - 90}, 500);
		}
		if (this.ispersistent && !this.persistenthidden) 
			$('body').removeClass('show-sidelist');
		else if (this.opened)
			$('body').addClass('show-sidelist');
	};

	SideList.prototype.getParams = function(source) {
		var $this = this;
		this.params = {
			'scrolltop': 	$(window).scrollTop(),
			'winW': 		window.innerWidth,
			'winH': 		window.innerHeight,
			'bodyH': 		$('body').height(),
			'maxH': 		Math.round(Math.max((window.innerHeight - $this.detail.offset().top), $this.detail.innerHeight())),
			'contextW': 	$this.context.width(),
			'wrapperW': 	Math.round($this.wrapper.outerWidth(true)),
			'posY': 		$this.detail.offset().top - $(window).scrollTop(),
			'header': 		!$('body').hasClass('hideheader'),
			'subheaderH': 	$this.subheader.outerHeight(true),
			'footerOffT': 	$this.footer.offset().top
		}
		this.scrollbarM = ($(document).height() > $(window).height()) ? 20 : 0;
		this.ispersistent = (this.params.contextW - this.wrapper.find('> div').outerWidth(true) + this.scrollbarM) >= this.persistentOver;
		if (((!this.opened || this.ispersistent) && source == 'toggle') || (this.ispersistent && this.params.winW >= this.mobilelimit)) 
			this.memState = {
				scroll: this.params.scrolltop,
				header: this.params.header
			};
	};

	SideList.prototype.check = function(source) {
		var $this = this,
			timer = (source == 'toggle') ? 0 : 100;
		$this.getParams(source);
		if (this.checkTo) clearTimeout(this.checkTo);
		this.checkTo = setTimeout(function() {
			$this.list.toggleClass('persistent', $this.ispersistent);
			$this.setStyles($this.getPaddingTop(), $this.getPaddingBottom(), $this.params.wrapperW, $this.params.maxH);
			$this.set();
			if ($this.list.find('li.active').length > 0 && ((!$this.ispersistent && $this.opened) || ($this.ispersistent && !$this.persistenthidden))) 
				$this.list.find('> div').animate({scrollTop: $this.list.find('li.active')[0].offsetTop - 90}, 500);
		}, timer);
	};

	SideList.prototype.getPaddingTop = function() {
		let pT = 
			Math.max(
				this.params.posY - 30, 
				((!this.params.header || this.params.winW >= this.mobilelimit) 
					? 0 
					: this.params.subheaderH
				)
			);
		return pT;
	};

	SideList.prototype.getPaddingBottom = function() {
		let pB = 
			Math.abs(
				Math.round(
					Math.min(
						(this.params.footerOffT - this.params.scrolltop - this.params.winH), 
						0
					)
				)
			) + ((isiPhone)
				? 80
				: 0
			);
		return pB;
	};

	SideList.prototype.setStyles = function(pT, pB, W, mH) {
		$(':root')
			.css('--sidelist-padding-top', pT + 'px')
			.css('--sidelist-padding-bottom', pB + 'px')
			.css('--sidelist-width', W + 'px')
			.css('--sidelist-max-height', mH + 'px')
	};

	window.SideList = SideList;


})(window);