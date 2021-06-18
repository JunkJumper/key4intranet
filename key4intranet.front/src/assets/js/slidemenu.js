(function(window) {

	'use strict';



	/* -------------------- Slidemenu -------------------- */

	function Slidemenu(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
		this._initEvents();
	}

	Slidemenu.prototype.options = {};

	Slidemenu.prototype._init = function() {
		this.id = this.options.id;
		this.container = $(this.id);
		this.lists = $(this.id + ' ul');
		this.setMaxHeight();
		this.toplinks = $(this.id + ' > ul> li > a');
		this.sublinks = $(this.id + ' > ul > li > ul a');
		this.currentlevel = 0;
		this.maxlevel = 0;
		this.faviconTo;
		this.lang = this.options.lang;
		this.istouch = !$('html').is('.no-touchevents');
		this.currentmenu = $(this.id).find('> ul');
		this.currentcolor = 'primary';
		this.menuhead = $('<a href="javascript:;" class="menuhead no-ul"/>').prependTo(this.container);
		this.title = $('<h4 class="title align-middle line" />').prependTo(this.menuhead);
		this.iconback = $('<i class="far fa-2x fa-chevron-left align-middle"></i>').prependTo(this.menuhead);
		this.setLevels(this.lists);
		this.setLinks(this.toplinks, this.sublinks);
		this.feedbackFunction = this.options.favorites.onChange;
		this.favorites = new Favorites({
			container: 			$(this.options.favorites.selector), 
			favtoggler: 		$(this.options.favorites.toggler),
			slidemenu: 			this, 
			istouch: 			this.istouch
		});
	};

	Slidemenu.prototype._initEvents = function() {
		var $this = this;
		this.openers
			.click(function(e) {
				$this.prepareSlide($(this).closest('a').next().attr('data-sm-level'), $(this).closest('a'));
			});
		this.menuhead
			.click(function(e) {
				if ($this.currentlevel > 0) $this.prepareSlide($this.currentlevel - 1, $this.currentmenu.parentsUntil($this.container, 'ul'));
			});
		this.toplinks
			.mouseenter(function(e) {
				if (!$this.istouch)	$($this.container).find('> ul > li > a.active').toggleClass('active wasactive');
			})
			.mouseleave(function(e) {
				if (!$this.istouch) $($this.container).find('> ul > li > a.wasactive').toggleClass('wasactive active');
			});
		this.sublinks.each(function(){
			var li = $(this).parent(),
				a = $(this),
				favicon = li.find('.favicon');
			li
				.mouseenter(function(e) {
					e.stopImmediatePropagation();
					a
						.css('color', '#fff')
						.css('background-color', 'var(--' + $this.currentcolor + ')');
					if (!$this.istouch) {
						clearTimeout($this.faviconTo);
						$this.faviconTo = setTimeout($this.toggleSublink, 750, a, 'left', $this);
					}
				})
				.mouseleave(function(e) {
					e.stopImmediatePropagation();
					if (!$('body').is('.modal-open')) {
						if (!$(this).parent().is('.active'))
							a
								.css('color', 'inherit')
								.css('background-color', 'inherit');
						if (!$this.istouch) {
							clearTimeout($this.faviconTo);
							$this.toggleSublink($(this), 'right', $this);
						}
					}
				});
			favicon
				.mousedown(function(e) {
					e.stopImmediatePropagation();
					if ($(this).prev().hasClass('isfavorite')) {
						var id = $(this).parent().attr('data-favorite-id');
						$this.favorites.removeFavorite($this.favorites.container.find('[data-favorite-id="' + id + '"]'));
					}
					else {
						$this.favorites.addFavorite($(this).parent());
					}
				});
		});
		if (this.istouch) {
			this.subopeners
				.swipe({
					tap: function(e, t) {
						$this.prepareSlide($(this).closest('a').next().attr('data-sm-level'), $(this).closest('a'));
					},
					swipeLeft: function(e, dir, dist, dur, fingCtn, fingData) {
						$this.toggleSublink($(this), dir, $this, e);
					}, 
					swipeRight: function(e, dir, dist, dur, fingCtn, fingData) {
						$this.toggleSublink($(this), dir, $this, e);
					}, 
					threshold: 30
				});
			this.sublinks
				.click(function(e) {
					e.preventDefault();
				})
				.swipe({
					tap: function(e, t) {
						$this.resetSublinks();
						$(this).parent().trigger('mouseenter');
						var link = $(this).attr('href');
						if (link && link != 'javascript:;') window.location.href = link;
					},
					swipe: function(e, dir, dist, dur, fingCtn, fingData) {
						$this.toggleSublink($(this), dir, $this, e);
					}, 
					allowPageScroll: 'vertical',
					threshold: 30
				});
		}
		$(document).on('onChangeFavorites', this.feedbackFunction);
	};

	Slidemenu.prototype.prepareSlide = function(level, obj) {
		this.resetSublinks();
		if (this.currentlevel < level) {
			if (level == 1) {
				this.currentcolor = $(obj).find('svg').attr('class');
				this.menuhead
					.removeClass(function (index, className) {
						return (className.match (/(^|\s)text-\S+/g) || []).join(' ');
					})
					.addClass('text-' + this.currentcolor)
					.find('.icon').remove();
				this.title
					.removeClass(function (index, className) {
						return (className.match (/(^|\s)line-\S+/g) || []).join(' ');
					})
					.addClass('line-' + this.currentcolor)
					.html(obj.text())
					.before($(obj).find('i').clone());
				obj.parent()
					.find('.fa-angle-right')
					.removeClass(function (index, className) {
						return (className.match (/(^|\s)text-\S+/g) || []).join(' ');
					})
					.addClass('text-' + this.currentcolor);
			}
			this.slideTo(level);
			this.container.find('[data-sm-level=' + level + ']').css('display', 'none');
			obj.next().css('display', 'block');
			this.currentmenu = obj.next();
		} else {
			this.slideTo(level);
			this.currentmenu = obj;
		}
	};

	Slidemenu.prototype.slideTo = function(level) {
		var decal = '-' + level * 100 + '%';
		this.container.find('> ul')
			.css('-moz-transform', 	'translateX(' + decal + ')')
			.css('-ms-transform', 	'translateX(' + decal + ')')
			.css('-o-transform', 	'translateX(' + decal + ')')
			.css('transform', 		'translateX(' + decal + ')');
		this.currentlevel = level;
		if (level == 0) this.menuhead.removeClass('show');
		else this.menuhead.addClass('show');
	};

	Slidemenu.prototype.setLinks = function(toplinks, sublinks) {
		var $this = this;
		toplinks.each(function(){
			var over = $('<div class="over"/>').appendTo($(this)),
				color = $this.hexToRgb(window.getComputedStyle(document.body).getPropertyValue('--' + $(this).find('svg').attr('class')))
			over.css('background', 'radial-gradient(ellipse at center, rgba(' + color + ', 1) 10%, rgba(' + color + ', 0) 100%) center center no-repeat');
		});
		sublinks.each(function() {
			var tooltiptxt = $(this).hasClass('isfavorite') ? $this.options.lang.delfav : $this.options.lang.addfav,
				tooltip = (!this.istouch) ? ' data-toggle="tooltip" data-placement="top" title="' + tooltiptxt + '"' : '';
				
			$(this).wrapInner('<span class="align-middle" />');
			
			if (!$(this).next().is('ul'))
				$(this).closest('li').append(
					'<a href="javascript:;" class="favicon text-white"' + tooltip + '>'
						+ '<i class="fas fa-md fa-star align-middle"></i>'
					+ '</a>');

			if ($(this).next().is('ul')) $(this).append('<i class="far fa-md fa-angle-right align-middle"/>')
			if ($(this).hasClass('active')) {
				var topparent = $(this).parents('[data-sm-level="1"]').parent(),
					color = topparent.find('a svg').attr('class');
				$(this).parents('li').each(function() {
					if (!$(this).is(topparent)) 
						$(this)
							.addClass('active')
							.find('> a').addClass('text-white bg-' + color);
					else $(this).find('> a').addClass('active')
				});
			}
		});
	};

	Slidemenu.prototype.resetSublinks = function() {
		this.container.find('a').removeClass('hover');
		if (this.istouch) {
			this.container.find('a')
				.parent()
				.trigger('mouseleave');
			$('body').removeClass('sorting');
		}
	};

	Slidemenu.prototype.toggleSublink = function(link, dir, scope, e) {
		if (e) e.preventDefault();
		if (link.next().is('ul')) return;
		scope.resetSublinks();
		switch (dir) {
			case 'left' :
				link.addClass('hover')
				if (e) link.parent().trigger('mouseenter');
				break;
		}
	};

	Slidemenu.prototype.setMaxHeight = function() {
		var $this = this,
			favorites = this.container.parent().find('.favorites');
		this.maxHeight = favorites.outerHeight(true) || 0;
		this.lists.each(function(){
			$this.maxHeight = Math.max($this.maxHeight, $(this).outerHeight(true));
		})
		this.container.css('height', this.maxHeight + 'px');
	};

	Slidemenu.prototype.hexToRgb = function(hex) {
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
			hex = hex.trim();
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result 
			? parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16)
			: null;
	};

	Slidemenu.prototype.setLevels = function(obj) {
		var $this = this;
		obj.each(function(){
			var level = $(this).parentsUntil(this.container, 'ul').length;
			$(this).attr('data-sm-level', level);
			$this.maxlevel = Math.max($this.maxlevel, level);
		});
		this.openers = $(this.container).find('[data-sm-level]').prev('a:not(.menuhead)');
		this.subopeners = this.openers.filter(function(id) {
			return ($(this).parents('[data-sm-level]').length > 1);
		});
	}

	Slidemenu.prototype.setTitle = function(string) {
		return string.replace(/\<.*?\>/g, '').replace(/\(.*?\)/g, '')
	};

	Slidemenu.prototype.reInit = function() {
		this.prepareSlide(0, this.container.find('> ul'));
		this.favorites.hideFavorites(0);
	};

	window.Slidemenu = Slidemenu;




	/* -------------------- Favorites -------------------- */

	function Favorites(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
		this._initEvents();
		this._initModals();
	}

	Favorites.prototype._init = function() {
		this.container = this.options.container;
		this.parent = this.container.parents('nav.menu-left');
		this.slidemenu = this.options.slidemenu;
		this.opener = this.options.favtoggler;
		this.istouch = this.options.istouch;
		this.links = $(this.container).find(' li > a');
		this.opened = false;
		this.transitioning = false;
		this.sorting = false;
		this.container.attr('text-empty-list', this.slidemenu.lang.empty);
		this.favoritesTo;
		this.faviconTo;
		this.setLinks(this.links);
	};

	Favorites.prototype._initEvents = function() {
		var $this = this;
		this.opener
			.mouseenter(function(e) {
				$this.transitioning = false;
				if (!$this.istouch) {
					$this.showFavorites(200);
				}
			})
			.mouseleave(function(e) {
				if (!$this.istouch) $this.hideFavorites(350);
			})
			.mousedown(function(e) {
				if (!$this.transitioning) {
					if ($this.opened) $this.hideFavorites(0);
					else $this.showFavorites(0);
				}
			});
		this.container
			.mouseenter(function(e) {
				clearInterval($this.favoritesTo);
			})
			.mouseleave(function(e) {
				if (!$this.istouch) $this.hideFavorites(350);
			})
			.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
				$this.transitioning = false;
			});

		this.container
			.on('mouseenter', 'li', function(e) {
				clearInterval($this.favoritesTo);
				if (!$this.istouch && !$this.sorting) {
					clearTimeout($this.faviconTo);
					$this.faviconTo = setTimeout($this.toggleLink, 750, $(this).find('> a'), 'left', $this);
				}
			})
			.on('mouseleave', 'li', function(e) {
				if (!$this.istouch && !$('body').is('.modal-open')) {
					clearTimeout($this.faviconTo);
					$this.toggleLink($(this).find('> a'), 'right', $this);
				}
			})
			.on('mousedown', 'li', function(e) {
				clearTimeout($this.faviconTo);
			})
			.on('mousedown', 'li > a.favicon', function(e) {
				$this.removeFavorite($(this).parent());
			});
		if (this.istouch) {
			this.links
				.click(function(e) {
					e.preventDefault();
				})
				.each(function(){
					$this._initFavSwipe($(this));
				});
				window.touchPunchDelay = 250;
		}
		$(this.container)
			.sortable({
				containment: 'parent', 
				items: '> li', 
				axis: 'y', 
				tolerance: 'pointer', 
				delay: ($this.istouch) ? 300 : 0, 
				start: function(e, ui) {
					$this.sorting = true;
					$this.container.find('a.hover').removeClass('hover');
					clearTimeout($this.faviconTo);
				},
				stop: function(e, ui) {
					$this.sorting = false;
					if ($this.istouch) $('body').removeClass('sorting');
					$(ui.item).removeClass('sorting');
				},
				update: function(e, ui) {
					$.event.trigger({
						type: 		'onChangeFavorites',
						action: 	'reordered'
					});
				}
			});
	};

	Favorites.prototype._initFavSwipe = function(obj) {
		var $this = this;
		obj
			.swipe({
				tap: function(e, t) {
					$this.resetLinks();
					$(this).parent().trigger('mouseenter');
					var link = $(this).attr('href');
					if (link && link != 'javascript:;') window.location.href = link;
				},
				hold: function(e, t) {
					$(this).closest('li').addClass('sorting');
					$('body').addClass('sorting');
				},
				longTap: function(e, t) {
					e.preventDefault();
					$(this).closest('li').removeClass('sorting');
					$('body').removeClass('sorting');
				},
				swipe: function(e, dir, dist, dur, fingCtn, fingData) {
					$this.toggleLink($(this), dir, $this, e);
				}, 
				allowPageScroll: 'vertical',
				threshold: 30
			});
	};

	Favorites.prototype._initModals = function() {
		var $this = this;
		this.modals = {
			'removeFavorite': {
				'content': 	'',
				'footer': $('<p class="w-100 text-center"><button class="btn btn-sm btn-light text-white m-1" type="button" data-dismiss="modal">' + this.slidemenu.lang.cancel + '</button><button id="favremove" class="btn btn-sm btn-danger m-1" type="button">' + this.slidemenu.lang.delete + '</button></p>')
			}
		}
		$(document)
			.on('click', '#favremove', function(e) {
				var id = $this.favtoremove.attr('data-favorite-id'), 
					sourceli = $this.slidemenu.container.find('[data-favorite-id="' + id + '"]');
				sourceli
					.removeAttr('data-favorite-id')
					.find('> a:not(.favicon)').removeClass('isfavorite');
				sourceli
					.find('> a.favicon')
					.attr('data-original-title', $this.slidemenu.lang.addfav);
				$this.modal.modal('hide')
				$this.favtoremove.remove();
				$this.slidemenu.setMaxHeight();
				$.event.trigger({
					type: 		'onChangeFavorites',
					action: 	'removed'
				});
			})
	};

	Favorites.prototype.showFavorites = function(delay) {
		var $this = this;
		this.slidemenu.resetSublinks();
		clearInterval(this.favoritesTo);
		$this.transitioning = true;
		this.favoritesTo = setInterval(function() {
			$this.parent.addClass('show-favorites');
			$this.opened = true;
		}, delay);
	};
	
	Favorites.prototype.hideFavorites = function(delay) {
		if (!this.sorting && !$('body').is('.modal-open')) {
			var $this = this;
			clearInterval(this.favoritesTo);
			this.transitioning = true;
			this.resetLinks();
			this.favoritesTo = setInterval(function() {
				$this.parent.removeClass('show-favorites');
				$this.opened = false;
			}, delay);
		}
	};

	Favorites.prototype.setLinks = function(links) {
		var $this = this;
		links.each(function() {
			var icon = 'fa-times',
				tooltip = (!this.istouch) ? ' data-toggle="tooltip" data-placement="top" title="' + $this.slidemenu.lang.delfav + '"' : '';
			$(this)
				.wrapInner('<span class="align-middle" />')
				.closest('li').append(
					'<a href="javascript:;" class="favicon text-dark text-center"' + tooltip + '>'
						+ '<i class="fal fa-md fa-times text-white align-middle"></i>'
					+ '</a>');
		});
	};

	Favorites.prototype.addFavorite = function(obj) {
		var $this = this,
			id = this.getUniqueID(),
			link = obj.find('> a:first-child').attr('href'),
			tooltip = (!this.istouch) ? ' data-toggle="tooltip" data-placement="top" title="' + $this.slidemenu.lang.delfav + '"' : '',
			icon = this.slidemenu.menuhead.find('.icon')
				.clone()
				.toggleClass('icon-lg icon-sm'),
			label = obj.find('> a:not(.favicon) > span').text(),
			favorite = $('<li data-favorite-id="' + id + '" />')
				.append('<a href="' + link + '" class="no-ul text-' + this.slidemenu.currentcolor + '"><span class="align-middle">' + label + '</span></a>')
				.append('<a href="javascript:;" class="favicon text-dark text-center"' + tooltip + '><i class="fas fa-md fa-times text-white align-middle"></i></a></li>');
			if (!this.istouch) 
				favorite.find('> a.favicon')
					.tooltip({
						delay: {
							'show': 500, 
							'hide': 100
						}
					});
			favorite.find('> a:not(.favicon) > span').prepend(icon);
		obj
			.attr('data-favorite-id', id)
			.find('> a:first-child').addClass('isfavorite');
		obj
			.find('> a.favicon')
			.removeAttr('title')
			.attr('data-original-title', this.slidemenu.lang.delfav);
		this.container.prepend(favorite);
		if (this.istouch) {
			this._initFavSwipe(favorite.find('> a:not(.favicon)'));
			this.slidemenu
				.container.find('a.hover')
				.removeClass('hover')
				.parent()
				.trigger('mouseleave');
		}
		this.slidemenu.setMaxHeight();
		$.event.trigger({
			type: 		'onChangeFavorites',
			action: 	'added'
		});
		this.container.removeClass('empty');
	};

	Favorites.prototype.removeFavorite = function(obj) {
		var $this = this;
		this.favtoremove = obj;
		this.modals.removeFavorite.content = $('<p class="text-center">' + this.slidemenu.lang.confirm + '</p>');
		this.modal = createModal('modal-removefav', 'md', this.modals.removeFavorite);
		this.modal
			.modal('show')
			.on('hidden.bs.modal', function (e) {
				$this.container.find('a.hover').removeClass('hover');
				$this.slidemenu.container.find('a.hover')
					.removeClass('hover')
					.parent()
					.trigger('mouseleave');
				if ($this.container.find('li').length == 0) $this.container.addClass('empty');
			});
	};

	Favorites.prototype.resetLinks = function() {
		this.container.find('a')
			.removeClass('hover');
		if (this.istouch) 
			this.container.find('a')
				.parent()
				.trigger('mouseleave');
	};

	Favorites.prototype.toggleLink = function(link, dir, scope, e) {
		if (e) e.preventDefault();
		switch (dir) {
			case 'left' :
				scope.resetLinks();
				link.addClass('hover');
				if (e) 
					link
						.parent().trigger('mouseenter');
				break;
			case 'right' :
				scope.resetLinks();
				break;
		}
	};

	Favorites.prototype.getUniqueID = function() {
		return new Date().valueOf() + '_' + Math.floor((Math.random() + 1) * 1000).toString();
	};
		
	window.Favorites = Favorites;


})(window);