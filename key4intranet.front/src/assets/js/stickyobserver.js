(function(window) {

	'use strict';



	/* -------------------- Sticky Observer -------------------- */

	function Stickyobserver(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this.container = $(this.options.container)[0];
		this.selector = this.options.selector;
		this.stucked = this.options.stucked;
		this.IntObsEnabled = (this.checkSticky($(this.selector)[0]) && window.IntersectionObserver);
		if (!this.IntObsEnabled) {
			this.sentinels = [];
			this.issticky = $(this.options.container).find('.sticky');
		}
		this._init();
		this._initEvents();
	}

	Stickyobserver.prototype.options = {};

	Stickyobserver.prototype._init = function() {
		this.observeBoundaries(this.container, 'top');
		this.observeBoundaries(this.container, 'bottom');
	};

	Stickyobserver.prototype._initEvents = function() {
		var $this = this;
		$(document).on('sticky-change', function(e) {
			let [header, stuck] = [e.detail.target, e.detail.stuck], 
				evt;
			header.classList.toggle($this.stucked, stuck);
			evt = new CustomEvent('updatescrollnavoffset', {
				detail: (stuck) 
					? $(header).outerHeight(true) + Math.abs(parseInt($(header).css('margin-top')))
					: 0
			});
			document.dispatchEvent(evt);
			setTimeout(function() {
				$($this.selector).find('.isflickity ')
					.flickity('resize')
					.flickity('select', 0);
			}, 300);
		});
		if (!this.IntObsEnabled) {
			try {
				var opts = Object.defineProperty({}, 'passive', {
					get: function() {
						this.supportsPassive = true;
					}
				});
				window.addEventListener('test', null, opts);
			} catch (e) {}
			document.addEventListener('scroll', function() {
				clearTimeout($this.checkTo);
				$this.checkTo = setTimeout(function() {
					$.each($this.issticky, function(index, entry) {
						$this.check(entry, $(entry).hasClass('sticky-top'));
					});
				}, 300);
			}, this.supportsPassive ? { passive: true } : false);
			$.each($this.issticky, function(index, entry) {
				$this.check(entry, $(entry).hasClass('sticky-top'));
			});
		}
	};

	Stickyobserver.prototype.checkSticky = function(obj) {
		return getComputedStyle(obj).position.match('sticky') !== null;
	};

	Stickyobserver.prototype.observeBoundaries = function(container, type) {
		var $this = this,
			observer;
		if (this.IntObsEnabled)
			observer = new IntersectionObserver((records, observer) => {
				for (let record of records) {
					let targetInfo = record.boundingClientRect, 
						stickyTarget = $(record.target).siblings('.sticky')[0], 
						rootBoundsInfo = record.rootBounds, 
						istop = $(record.target).hasClass('sticky-top');
					switch (type) {
						case 'top' : 
							if (istop) {
								if (targetInfo.bottom < rootBoundsInfo.top) 
									this.triggerEvent(true, stickyTarget);
								if (targetInfo.bottom >= rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) 
									this.triggerEvent(false, stickyTarget);
							} else {
								if (targetInfo.top > rootBoundsInfo.top) 
									this.triggerEvent(false, stickyTarget);
								if (targetInfo.top <= rootBoundsInfo.bottom && targetInfo.top > rootBoundsInfo.top) 
									this.triggerEvent(true, stickyTarget);
							}
							break;
						case 'bottom' : 
							if (istop) {
								if (targetInfo.top > rootBoundsInfo.top && targetInfo.top <= targetInfo.height * 2) 
									this.triggerEvent(true, stickyTarget);
								if (targetInfo.top < rootBoundsInfo.top) 
									this.triggerEvent(false, stickyTarget);
							} else {
								if (targetInfo.bottom > rootBoundsInfo.bottom) 
									this.triggerEvent(true, stickyTarget);
								else if (targetInfo.bottom < rootBoundsInfo.bottom) 
									this.triggerEvent(false, stickyTarget);
							}
							break;
					}
				}
			}, {
				threshold: [((type == 'top') ? 0 : 1)]
			});
		let sentinels = this.addObservers(container, 'sticky-observer--' + type);
		if (this.IntObsEnabled) 
			sentinels.forEach(el => observer.observe(el));
	};

	Stickyobserver.prototype.check = function(el, istop) {
		let top = $(el).siblings('.sticky-observer--top'), 
			bottom = $(el).siblings('.sticky-observer--bottom'), 
			offset = window.pageYOffset, 
			topExceed, 
			bottomExceed;
		switch (istop) {
			case true :
				topExceed = (top.offset().top + top.height() - offset) <= 0;
				bottomExceed = (bottom.offset().top - offset) <= 0;
				this.triggerEvent((topExceed && !bottomExceed), el);
				break;
			case false :
				topExceed = top.offset().top < (offset + window.innerHeight);
				bottomExceed = bottom.offset().top < (offset - bottom.height() + window.innerHeight);
				this.triggerEvent(topExceed && !bottomExceed, el);
				break;
		}
	};
	
	Stickyobserver.prototype.addObservers = function(container, className) {
		return Array.from(container.querySelectorAll(this.selector)).map(el => {
			let type = 'sticky-' + (($(el).attr('class').indexOf('sticky-bottom') < 0) ? 'top' : 'bottom'), 
				observer = $('<div class="sticky-observer ' + className + ' ' + type + '" />').appendTo($(el).parent());
			return observer[0];
		});
	};

	Stickyobserver.prototype.triggerEvent = function(stuck, target) {
		let evt = new CustomEvent('sticky-change', {detail: {stuck, target}});
		document.dispatchEvent(evt);
	};

	window.Stickyobserver = Stickyobserver;


})(window);