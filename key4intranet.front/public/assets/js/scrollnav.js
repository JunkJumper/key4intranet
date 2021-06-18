(function(window) {

	'use strict';



	/* -------------------- Scrollnav -------------------- */

	function Scrollnav(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
		this._initEvents();
	}

	Scrollnav.prototype.options = {
		defaultoffset: 40
	};

	Scrollnav.prototype._init = function() {
		this.container = $(this.options.container);
		this.context = $(this.options.context);
		this.scrollnav = $(this.options.selector);
		this.scrolllinks = this.scrollnav.find('a');
		this.defaultoffset = this.options.defaultoffset;
		this.closebtn = this.scrollnav.find('.close-scrollnav');
		this.context.addClass('sticky-nav');
		this.checkMobileoffset();
		this.item = this.container.scrollspy({
			target: this.options.selector
		});
		this.scrollnavchecker = new ScrollnavChecker({
			scrollnav: this
		});
	};

	Scrollnav.prototype._initEvents = function() {
		var $this = this,
			scrollnavTo;

		$(document)
			.on('updatescrollnavoffset', function(e) {
				$this.updateScrollnavOffset(
					(e.detail) 
						? e.detail
						: $this.defaultoffset
				);
			});

		this.scrollnav
			.on('mouseenter mouseleave click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				clearTimeout(scrollnavTo);
			})
			.on('mouseenter click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				let $this = $(this);
				if (!istouch)
					scrollnavTo = setTimeout(function() {
						$this.addClass('hover');
					}, 250);
				else $this.addClass('hover');
			})
			.on('mouseleave', function(e) {
				e.preventDefault();
				e.stopPropagation();
				let $this = $(this);
				if (!istouch)
					scrollnavTo = setTimeout(function() {
						$this.removeClass('hover');
					}, 500);
				else $this.removeClass('hover');
			});

		this.closebtn.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			clearTimeout(scrollnavTo);
			$this.scrollnav.removeClass('hover');
		});

		this.scrolllinks
			.click(function(e) {
				e.preventDefault();
				if ($this.scrollnav.hasClass('hover')) {
					let href = $(this).attr('href');
					if(/^#/.test(href)) {
						$('html, body').animate({scrollTop: $(href).offset().top - $this.getScrollnavOffset($(href)) + 1}, 500);
					}
				}
			});

		this.rs = new ResizeSensor(this.context, function(){
			$this.checkMobileoffset();
		});
		
	};

	Scrollnav.prototype.checkMobileoffset = function() {
		var $this = this;
		setTimeout(function() {
			$this.mobileoffset = (window.innerWidth < 992) ? ($('.subheader').outerHeight(true) + 14) : 0;
		}, 400);
		
	};

	Scrollnav.prototype.getScrollnavOffset = function(href) {
		let offset, 
			issticky = href.hasClass('has-sticky'),
			stickyparent = href.parents('.has-sticky'), 
			topPos = href.offset().top,
			stickymargin = 
				(issticky) 
					? 0 
					: ((stickyparent.length > 0) 
						? stickyparent.find('.sticky').outerHeight(true) + Math.abs(parseInt(stickyparent.find('.sticky').css('margin-top')))
						: this.defaultoffset),
			ismobile = (window.innerWidth < 992), 
			scrollup = (topPos < window.pageYOffset || (topPos - stickymargin) < 400),
			mobilemargin = (!ismobile || (!scrollup && ismobile)) ? 0 : this.mobileoffset;
		offset = Math.max(stickymargin, mobilemargin);
		return (offset);
	};

	Scrollnav.prototype.updateScrollnavOffset = function(offset) {
		this.item.data()['bs.scrollspy']._config.offset = Math.max(offset, this.scrollnavchecker.mobileoffset);
		this.item.scrollspy('refresh');
	};

	window.Scrollnav = Scrollnav;




	/* -------------------- Scrollnavchecker -------------------- */

	function ScrollnavChecker(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
		this._initEvents();
	}

	ScrollnavChecker.prototype._init = function() {
		this.scrollnav = this.options.scrollnav;
		this.mobileoffset = (window.innerWidth < 992) ? this.scrollnav.mobileoffset : 0;
	};

	ScrollnavChecker.prototype._initEvents = function() {
		var $this = this;
		$(document)
			.on('scrollchange', function(e) {
				$this.check(e.detail.dir, e.detail.pos);
			});
	};

	ScrollnavChecker.prototype.check = function(dir, pos) {
		this.ismobile = window.innerWidth < 992;
		this.hideheader = this.ismobile && pos > 400;
		this.mobileoffset = (this.ismobile) 
			? ((dir == 'down' && this.hideheader) ? 0 : this.scrollnav.mobileoffset)
			: 0;
		this.scrollnav.updateScrollnavOffset(
			($('.is-stuck').length > 0)	
				? $('.is-stuck').outerHeight(true) + Math.abs(parseInt($('.is-stuck').css('margin-top')))
				: this.scrollnav.defaultoffset
			);
	};

	window.ScrollnavChecker = ScrollnavChecker;


})(window);