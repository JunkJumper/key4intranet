/*
/*
  ==============================================================================================
  --------------------------|                                        |--------------------------
  --------------------------|          JS / Key4events 2020          |--------------------------
  --------------------------|                                        |--------------------------
  ==============================================================================================
*/



/* -------------------- Variables/fonctions globales -------------------- */

var leftMenu,
	carousel, checkFlickity, 
	checkScrollable, checkExpandableH,
	MenuERP, 
	infopanel, 
	StatsTiles,	
	ScrollNav, 
	StickyObserver, 
	windowRS,
	createPopover,
	popover,
	createModal,
	modal,
	istouch = !$('html').is('.no-touchevents'),
	userAgent = navigator.userAgent || navigator.vendor || window.opera, 
	isiOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream, 
	isiPhone = /iPhone/.test(userAgent) && !window.MSStream, 
	isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);


function extend(a, b) {
	for(var key in b) { 
		if(b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}



$(document).ready(function() {



	/* -------------------- Détection de Safari sur iPhone (gestion spécifique du menu bottom sticky) -------------------- */

	if (isiPhone && isSafari) {
		$('html').addClass('isiPhone');
		originalVH = window.innerHeight;
		$(window).on('resize', function () {
			let isportrait = orientation => {
				switch (orientation) {
					case 90:
					case -90:
						return false;
						break;
					default:
						return true;
						break;
				}
			};
			$('body').toggleClass('noiOSbottombar', (isportrait(window.orientation) && window.innerHeight != originalVH));
		});
	}



	/* -------------------- Ouverture/fermeture des menus gauche/droite -------------------- */

	$('header .profile a, a.close-profile').click(function(e) {
		$('body').toggleClass('show-profile');
		if ($('body').hasClass('show-profile')) $('aside.profile > div').scrollTop(0);
	});
	$('header a.menu-left-trigger, a.close-menu-left').click(function(e) {
		$('body').toggleClass('show-menu-left');
		if ($('body').hasClass('show-params-left')) $('body').removeClass('show-params-left');
		if ($('body').hasClass('show-menu-left')) {
			$('.menu-params, .menu-left > div').scrollTop(0);
		} else if ($('#erp-menu').length > 0) MenuERP.reInit();
	});
	$('a.params, a.close-params-left').click(function(e) {
		$('body').toggleClass('show-params-left');
	});
	
	$(document).keyup(function(e) {
		if (e.keyCode == 27) 
			$('body')
				.removeClass('show-profile')
				.removeClass('show-menu-left')
				.removeClass('show-params-left');
	});

	var checkLeftMenus = function (w) {
		if (w < 768) {
			if ($('body').is('.show-params-left:not(.show-menu-left)')) $('body').addClass('show-menu-left');
		} else {
			if ($('body').is('.show-params-left.show-menu-left')) $('body').removeClass('show-menu-left');
		}
	};



	/* -------------------- Caroussels Flickity -------------------- */

	Flickity.prototype._createResizeClass = function() {
		this.element.classList.add('flickity-autoheight');
	};
	Flickity.createMethods.push('_createResizeClass');

	var resize = Flickity.prototype.resize;
	Flickity.prototype.resize = function() {
		this.element.classList.remove('flickity-autoheight');
		resize.call(this);
		this.element.classList.add('flickity-autoheight');
	};

	if ($('.x-carousel').length > 0) {
		var tapArea, startX, arrows;
		tapArea = document.querySelectorAll('.isflickity');
		startX = 0;
		
		for (var item of tapArea) {
			item.ontouchstart = function(e) {
				startX = e.touches[0].clientX;
			};
			item.ontouchmove = function(e) {
				if (Math.abs(e.touches[0].clientX - startX) > 25 && e.cancelable) {
					e.preventDefault();
				}
			};
		}

		checkFlickity = function(obj) {
			var container = $(obj[0].element).closest('.x-carousel'),
				btns = $(obj[0].element).find('.flickity-prev-next-button'),
				draggabledlimit = container.attr('flickity-draggableunder'),
				flickity = container.find('.isflickity'),
				enabledlimit = container.attr('flickity-disabledover');
			container.addClass('flickity-ready');
			if (obj[0].size.width < obj[0].slideableWidth) btns.show();
			else btns.hide();
			if (draggabledlimit && draggabledlimit <= window.innerWidth) {
				obj[0].options.draggable = false;
				obj[0].updateDraggable();
			} else {
				obj[0].options.draggable = '>1';
				obj[0].updateDraggable();
			}
			if (enabledlimit && enabledlimit <= window.innerWidth) {
				container.addClass('flickity-disabled');
				if (flickity.data('flickity') && flickity.data('flickity').selectedIndex != 0) 
					flickity.flickity('select', 0);
			}
			else container.removeClass('flickity-disabled');
		}

		carousel = 
			$('.isflickity').flickity({
				cellAlign: 'left',
				contain: true,
				pageDots: false,
				groupCells: false,
				resize: false, 
				arrowShape: {
					x0: 10,
					x1: 50, y1: 80,
					x2: 60, y2: 80,
					x3: 20
				},
				on: {
					ready: function() {
						if ($(this.element).parents('.x-carousel').hasClass('flickity-freescroll')) 
							$(this)[0].options.freeScroll = true;
						checkFlickity($(this));
						if ($(this.element).parents('.flickity-array').length > 0 && isiOS) 
							$('html').addClass('noadvancedSticky');
					},
					change: function() {
						var expanded = $(this.element).find('.showall');
						if (expanded.length > 0) {
							$(this.element).find('.showall').removeClass('showall');
							$(window).scrollTop($(this.element).offset().top - 100);
						}
					},
					settle: function() {
						if ($(this.element).parents('.flickity-array').length == 0 && $(this.element).parents('.flickity-freescroll').length == 0)
							$(this.element).flickity('resize');
					},
					scroll: function() {
						if ($(this.element).parents('.flickity-array').length > 0) 
							$('[data-toggle="popover"][aria-describedby]').each(function() {
								$(this).popover('hide');
							});
					}
				}
			});

		document.fonts.ready.then(function() {
			$.each(carousel, function(id, obj) {
				$(obj).flickity('resize');
				if ($(obj).hasClass('nav') && $(obj).find('.active').length > 0) 
					$(obj).flickity('select', $(obj).find('.active').parent().index());
			});
		});
	}



	/* -------------------- Gestion de la propriété "overflow" du menu droite -------------------- */

	$('aside.profile')
		.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
			if ($('body').hasClass('show-profile')) $(this).addClass('opened');
			else $(this).removeClass('opened');
		});



	/* -------------------- Positionnement du lien "Support technique" -------------------- */

	if ($('li.link-support').length > 0) {
		var lastEntry = $('li.link-support').closest('ul').prev(),
			lastY = lastEntry.offset().top + lastEntry.height() - 30,
			maxMargin = window.innerHeight - $('.menu-left').offset().top - lastY;
		$('li.link-support').css('margin-top', Math.max(40, maxMargin));
	}



	/* -------------------- Gestion des évènements sur le layout liés au scroll -------------------- */

	var prevScrollpos, 
		scrollchange, 
		lastScrollpos = 0,
		lastScrollmargin = 100;

	document.addEventListener('scroll', function(e){
		checkScroll()
	}, this.supportsPassive ? { passive: true } : false);
	
	function checkScroll() {
		let currentScrollPos = window.pageYOffset, 
			scrollingdown = (prevScrollpos < currentScrollPos), 
			ismobile = window.innerWidth < 992,
			hideheader = ismobile && currentScrollPos > 300, 
			exceeding = (currentScrollPos + window.innerHeight) > $(document).height();
		if (exceeding) return;
		if (scrollingdown) {
			if (hideheader)
				$('body').addClass('hideheader');
		}
		else { 
			if (currentScrollPos < (lastScrollpos - lastScrollmargin)) {
				$('body').removeClass('hideheader');
			}
		}
		if (scrollingdown == !$('body').hasClass('scrolldown')) {
			lastScrollpos = currentScrollPos;
			scrollchange = document.dispatchEvent(new CustomEvent('scrollchange', { detail: { dir: (scrollingdown) ? 'down' : 'up',	pos: currentScrollPos }}));
		}
		$('body').toggleClass('scrolldown', scrollingdown);
		prevScrollpos = currentScrollPos;
	}



	/* -------------------- Instanciation de la navigation par système de scroll -------------------- */

	if ($('#scrollnav').length > 0) 
		ScrollNav = new Scrollnav({
			container: 		'body', 
			context: 		'article',
			selector: 		'#scrollnav'
		});



	/* -------------------- Instanciation du suivi des éléments "sticky" -------------------- */

	if ($('.sticky').length > 0) 
		StickyObserver = new Stickyobserver({
			container: 	'html, body', 
			selector: 	'.sticky', 
			stucked: 	'is-stuck'
		});



	/* -------------------- Menu ERP -------------------- */

	if ($('#erp-menu').length > 0) 
		MenuERP = new Slidemenu({
			id: '#erp-menu',
			lang: {
				'addfav': 	'Ajouter à mes favoris',
				'delfav': 	'Supprimer de mes favoris',
				'confirm':  'Êtes-vous sûr(e) de vouloir supprimer ce lien de vos favoris ?',
				'empty': 	'Vous n\'avez défini aucun favori',
				'cancel': 	'Annuler',
				'delete': 	'Supprimer'
			}, 
			favorites: {
				selector: '.favorites', 
				toggler:  '.toggle-favorites a', 
				onChange: function (e) {
					console.log('Les favoris ont été modifiés (' + e.action + ')');
					switch (e.action) {
						case 'reorder' :
							break;
						case 'added' :
							infopanel.add({
								bgcolor: 		'success',
								hideafter:  	2000,
								content:		'Le favori a bien été ajouté.'
							});
							break;
						case 'removed' :
							infopanel.add({
								bgcolor: 		'success',
								hideafter:  	2000,
								content:		'Le favori a bien été supprimé.'
							});
							break;
					}
				}
			}
		});



	/* -------------------- Menu ERP -------------------- */

	if ($('body').is('.erp:not(.dashboard)') && $('.subheader #options').length > 0) 
		$('.subheader #options')
			.on('show.bs.collapse', function () {
				$('.subheader h1').removeClass('text-truncate');
			})
			.on('hide.bs.collapse', function () {
				$('.subheader h1').addClass('text-truncate');
			});



	/* -------------------- Panneau d'information (top) -------------------- */

	infopanel = new Infopanel({
		position: 'top'
	});



	/* -------------------- Gestion des blocs extensibles dans Flickity -------------------- */

	checkScrollable = function (obj) {
		if (checkExpandableH(obj)) obj.find('.toggle-fullH').removeClass('d-none');
		else obj.find('.toggle-fullH').addClass('d-none');
	}
	checkExpandableH = function (obj) {
		return (obj.height() < obj[0].scrollHeight);
	}
	$('.expandable').each(function() {
		var $this = $(this);
		$(this).find('.toggle-fullH')
			.click(function(e) {
				$(this)
					.closest('.expandable')
					.toggleClass('showall')
					.closest('.isflickity').flickity('resize');
				if (!$(this).closest('.expandable').hasClass('showall') && $(this).closest('.isflickity').data('flickity').isDraggable) 
					$(window).scrollTop($(this).closest('.isflickity').offset().top - 100);
			});
		new ResizeSensor($(this), function() {
			checkScrollable($this);
		});
	});

	$('.sticky').each(function() {
		$(this).parent().addClass('has-sticky');
	});



	/* -------------------- Instanciation de bootstrap-select (champs select enrichis) -------------------- */

	if ($('.bs-select').length > 0) 
		$('.bs-select').selectpicker({
			style: '', 
			styleBase: 'form-control custom-select', 
			tickIcon: 'far fa-md fa-check text-white', 
			selectedTextFormat: 'count'
		})



	/* -------------------- Tooltips Bootstrap -------------------- */

	$('[data-toggle="tooltip"]')
		.tooltip({
			delay: {
				'show': 500, 
				'hide': 100
			}
		})
		.click(function(e) {
			$(this).tooltip('hide');
		});

	if (istouch) {
		$(document)
			.on('show.bs.tooltip', '[data-toggle="tooltip"]', function(e){
				$(this).tooltip('dispose');
				$(this).trigger('click');
			});
	}



	/* -------------------- Popovers Bootstrap -------------------- */

	if (istouch) $('[data-toggle="popover"][data-trigger="hover"]').removeAttr('data-trigger');

	$(document)
		.on('click mouseover', '[data-toggle="popover"]', function(e) {
			let $this = this, 
				popover = ($(this).data('bs.popover')) ? $(this).data('bs.popover').tip : null;
			if ($(this).attr('aria-describedby')) {
				clearTimeout(popover.hidepopoverTo);
				return;				
			}
			if ((e.type == 'mouseover' && $(this).attr('data-trigger') == 'hover') || e.type == 'click') {
				if ($('[data-toggle="popover"][aria-describedby]').length > 0) 
					$('[data-toggle="popover"][aria-describedby]').popover('hide');
				popover = createPopover($(this), {
					'title': 	'<h3 class="text">' + $(this).attr('title') + '</h3>', 
					'content': 	$($this).attr('data-content') || {url: $($this).attr('data-extcontent')}
				});
			}
		})
		.on('mouseleave', '[data-toggle="popover"]', function(e) {
			let $this = this,
				timer = ($(this).attr('data-trigger') == 'hover') ? 300 : 1000;
				popover = ($(this).data('bs.popover')) ? $(this).data('bs.popover').tip : null;
			if (popover) {
				clearTimeout(popover.hidepopoverTo);
				popover.hidepopoverTo = setTimeout(function(){
					$($this).popover('hide');
				}, timer);
			}
		});

	$(document)
		.on('mouseleave', '.popover', function (e) {
			let $this = this, 
				source = $('[aria-describedby="' + $(this).attr('id') + '"]'),
				timer = (source.attr('data-trigger') == 'hover') ? 300 : 1000;
			clearTimeout(this.hidepopoverTo);
			if ($(this).find('*:focus').is(':input')) return;
			this.hidepopoverTo = setTimeout(function(){
				$($this).popover('hide');
			}, timer);
		})
		.on('mouseenter', '.popover', function (e) {
			clearTimeout(this.hidepopoverTo);
		});

	createPopover = function (source, ctn) {
		isext = ctn.content.constructor === Object;
		return source.popover({
			trigger: 'manual',
			html: true,
			sanitize: false,
			boundary: 'viewport', 
			content: function () {
				return $(this).attr('data-content') || '<span class="loader"><div class="spin"></div></span>';
			},
			template: '<div class="popover">' +
						  '<div class="arrow"></div>' + 
						  '<div class="popover-header text-truncate"></div>' + 
						  '<div class="popover-body"></div>' +
						  '<div class="popover-footer"></div>' +
					  '</div>'
		})
		.on('shown.bs.popover', function () {
			let $this = $(this), 
				exturl = ($(this).attr('data-extcontent')) ? $(this).attr('data-extcontent') : null, 
				content = $($(this).data('bs.popover').tip).find('.popover-body');
			if (exturl)
				content.load(exturl, function() {
					let action = $(this).find('.popover-action'), 
						hasaction = action.length > 0;
					if (hasaction) 
						$('.popover-footer').html(action);
					$this.popover('update');
				});
		})
		.popover('show');
	};

	$('body *')
		.on('mousedown', function(e) {
			if ($('[data-toggle="popover"][aria-describedby]').length > 0 && !$(e.target).parents('.popover').length > 0) {
				e.stopPropagation();
				$('[data-toggle="popover"][aria-describedby]').each(function() {
					$(this).popover('hide');
				});
			}
		});



	/* -------------------- Modales Boostrap -------------------- */

	$(document)
		.on('click', '[data-toggle="modal"]', function(e) {
			var $this = this;
			if (modal) modal.modal('hide');
			modal = createModal('modal', $(this).attr('data-modal-size'), {
				'title': 	'<h3 class="text">' + $(this).attr('title') + '</h3>', 
				'content': 	$($this).attr('data-content') || {url: $($this).attr('data-extcontent')}
			});
		});

	createModal = function (id, size='md', ctn) {
		isext = ctn.content.constructor === Object;
		var header = $('<div class="modal-header"/>')
				.append(ctn.title)
				.append('<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
					+ '<span aria-hidden="true">×</span>'
					+ '</button>');
			content = $('<div class="modal-body"/>')
				.append((!isext) 
					? (/<\/?[a-z][\s\S]*>/i.test(ctn.content)) 
						? $(ctn.content)
						: ctn.content
					: '<span class="loader"><div class="spin"></div></span>'
				),
			footer = $('<div class="modal-footer"/>')
				.append(ctn.footer),
			body = $('<div class="modal-content p-2"/>')
				.append(header)
				.append(content)
				.append(footer),
			dialog = $('<div class="modal-dialog modal-dialog-centered modal-' + size + '" role="document"/>')
				.append(body),
			modal = $('<div class="modal fade" id="' + id + '" tabindex="-1" role="dialog" aria-hidden="true"/>')
				.append(dialog);
			modal.modal().on('hidden.bs.modal', function (e) {
				$(this)
					.data('bs.modal', null)
					.remove();
			});
		if (ctn.content.constructor === Object) 
			content.load(ctn.content.url, function() {
				
				if (body.find('.bs-select').length > 0) 
					body.find('.bs-select').selectpicker({
						style: '', 
						styleBase: 'form-control custom-select', 
						tickIcon: 'far fa-md fa-check text-white', 
						selectedTextFormat: 'count'
					})
			})
		return modal.appendTo('body');
	};



	/* -------------------- Actions à effectuer au resize (wrapper & article) -------------------- */
	
	var wrapperRS = new ResizeSensor($('.wrapper, article'), function(){
		let w = window.innerWidth;
		if ($('nav.menu-left').length > 0) 
			checkLeftMenus(w);
		$('.isflickity').each(function() {
			//checkFlickity($(this).flickity('resize'));
			$(this).flickity('resize');
		});
	});




	/* ======================================== Eléments de test ======================================== */
	
		
	/* -------------------- Test de saisie erronée (login) -------------------- */

	$('body.login form').submit(function() {
		$(this).parents('.card').addClass('haserror');
		$(this).find('input').addClass('is-invalid');
		return false;
	});



	/* -------------------- Test de saisie erronée (login) -------------------- */

	$('body.login form').submit(function() {
		$(this).parents('.card').addClass('haserror');
		$(this).find('input').addClass('is-invalid');
		return false;
	});

	
	
	/* -------------------- Test (coordonnées : passage en mode "édition") -------------------- */

	$('aside.profile a.modify, aside.profile a.valid, aside.profile a.cancel').click(function() {
		$(this).parents('form')
			.toggleClass('readonly')
			.find('input, select').each(function() {
				if ($(this).attr('disabled')) 
					$(this).removeAttr('disabled');
				else 
					$(this).attr('disabled', 'disabled');
				if ($(this).hasClass('bs-select')) $(this).selectpicker('refresh');
			});
	});
	
	
	
	/* -------------------- Test menu gauche (développement / réduction) -------------------- */

	if ($('body').is('.esp-cl')) {
		$('nav.menu-left a.toggler').click(function() {
			$('body').toggleClass('reduced-menu-left');
		});
	}
	if ($('body').is('.erp')) {
		var menuswapTo;
		$('nav.menu-left')
			.mouseenter(function() {
				clearTimeout(menuswapTo);
				if ($('body').hasClass('pinned-menu-left')) return false;
				if ($('body').hasClass('reduced-menu-left')) 
					menuswapTo = setTimeout(function() {
						$('body').toggleClass('reduced-menu-left')
					}, 200);
			})
			.mouseleave(function() {
				clearTimeout(menuswapTo);
				if ($('body').hasClass('pinned-menu-left')) return false;
				if (!$('body').hasClass('reduced-menu-left'))
					menuswapTo = setTimeout(function() {
						$('body').toggleClass('reduced-menu-left');
					}, 750);
			})
			.find('a.toggler')
				.click(function() {
					$('body')
						.addClass('reduced-menu-left')
						.toggleClass('pinned-menu-left');
					clearTimeout(menuswapTo);
				});
				
	}
	
	

});
	
	
