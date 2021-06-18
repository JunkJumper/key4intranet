(function(window) {

	'use strict';



	/* -------------------- Statstiles -------------------- */

	function Statstiles(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
		this._initEvents();
		this._initModals();
	}

	Statstiles.prototype.options = {};

	Statstiles.prototype._init = function() {
		this.container = $(this.options.id);
		this.configtmpl = $(this.options.configurator);
		this.slider = this.container.find('.isflickity');
		this.btnadd = $(this.options.btnadd);
		this.selreq = this.options.selectids['req'];
		this.selorder = this.options.selectids['order'];
		this.selcolor = this.options.selectids['color'];
		this.selicon = this.options.selectids['icon'];
		this.lang = this.options.lang;
		this.tiles = this.slider.find('li');
		this.numchildren = this.tiles.length;
		this.istouch = !$('html').is('.no-touchevents');
		this.feedbackFunction = this.options.onChange;
		this.tooltipconfig = {
			delay: {
				'show': 500, 
				'hide': 100
		}};
	};

	Statstiles.prototype._initEvents = function() {
		var $this = this;

		this.btnadd
			.click(function(e) {
				$this.openConfigurator('add');
				$(this).toggleClass('d-none');
			});

		this.slider
			.on('click', 'a.edit', function(e) {
				var tile = $(this).closest('li');
				if (!tile.is('.editing')) 
					$this.openConfigurator('edit', tile);
			})
			.on('click', 'a.remove', function(e) {
				$this.tiletoremove = $(this).closest('li');
				$this.modals.removeTile.content = $('<p class="text-center">' + $this.lang.confirm + '</p>');
				$this.modal = createModal('modal-removetile', 'md', $this.modals.removeTile);
				$this.modal.modal('show');
			})
			.on('click', '.validate .cancel', function(e) {
				var tile = $(this).closest('li');
				$(this).tooltip('dispose');
				$this.cancelUpdate(
					(!tile.is('.editing')) 
						? 'add'
						: 'edit',
					tile
				);
				$this.slider.flickity('resize');
			})
			.on('click', '.validate .valid', function(e) {
				var tile = $(this).closest('li');
				$(this).tooltip('dispose');
				$this.validUpdate(
					(!tile.is('.editing')) 
						? 'add'
						: 'edit',
					tile
				);
				$this.slider.flickity('resize');
			});

		$(document)
			.on('change', this.selcolor, function(e) {
				$this.changeBgcolor($(e.target).closest('li'), this.value);
			})
			.on('change', this.selicon, function(e) {
				$this.changeBgicon($(e.target).closest('li'), this.value);
			});
		$(document).on('onChangeStatsTiles', this.feedbackFunction);
	};

	Statstiles.prototype._initModals = function() {
		var $this = this;
		this.modals = {
			'removeTile': {
				'content': 	'',
				'footer': $('<p class="w-100 text-center"><button class="btn btn-sm btn-light text-white m-1" type="button" data-dismiss="modal">' + this.lang.cancel + '</button><button id="tileremove" class="btn btn-sm btn-danger m-1" type="button">' + this.lang.delete + '</button></p>')
			}
		}
		$(document)
			.on('click', '#tileremove', function(e) {
				$this.slider.flickity('remove', $this.tiletoremove);
				$this.refreshOrderSelect();
				$this.modal.modal('hide');
				$this.numchildren--;
			})
	};

	Statstiles.prototype.openConfigurator = function(type, obj) {
		switch (type) {
			case 'add':
				var config = this.configtmpl.clone(),
					configform = config.find('form');
				configform.addClass('add-tile');
				this.slider.flickity('insert', config, this.numchildren);
				this.setSelects(
					config, 
					{
						'color': 	config.attr('data-color')
					}
				);
				break;
			case 'edit':
				var	config = this.configtmpl.find('form').clone().prependTo(obj),
					content = obj.find('.content');
				obj.addClass('editing');
				content.toggleClass('d-none');
				this.setSelects(
					config, 
					{
						'order': 	obj.attr('data-order'),
						'color': 	obj.attr('data-color'),
						'icon': 	obj.attr('data-icon')
					}
				);
				break;
		}
		this.slider.flickity('resize');
		if (!this.istouch) 
			config.find('[data-toggle="tooltip"]').tooltip(this.tooltipconfig);
	};

	Statstiles.prototype.setSelects = function(config, data) {
		this.tiles.find('[data-order]').each(function() {
			var id = $(this).attr('data-order');
			config.find(this.selorder)
				.append('<option value="' + id + '">' + id + '</option>');
		});
		if (data['order']) {
			this.initOrderSelect(config.find(this.selorder));
			config.find(this.selorder + ' [value="' + data['order'] + '"]').attr('selected', true);
		}
		if (data['color']) config.find(this.selcolor + ' [value="' + data['color'] + '"]').attr('selected', true);
		if (data['icon'])  config.find(this.selicon  + ' [value="' + data['icon']  + '"]').attr('selected', true);
	};

	Statstiles.prototype.initOrderSelect = function(selorder) {
		selorder.empty();
		this.slider.find('[data-order]').each(function() {
			var id = $(this).attr('data-order');
			selorder
				.append('<option value="' + id + '">' + id + '</option>');
		});
	};

	Statstiles.prototype.refreshOrderSelect = function() {
		var $this = this,
			i = 1;
		this.slider.find('li:not(' + $this.options.configurator + ')')
			.each(function() {
				$(this).attr('data-order', i);
				i++;
			})
			.each(function() {
				if ($(this).find('.configurator')) {
					var form = $(this).find('.configurator'),
						select = form.find($this.selorder);
					$this.setSelects(
						form, 
						{
							'order': 	$(this).attr('data-order')
						}
					);
				}
			});
	};

	Statstiles.prototype.cancelUpdate = function(type, obj) {
		switch (type) {
			case 'add':
				this.slider.flickity('remove', obj)
				this.btnadd.toggleClass('d-none');
				break;
			case 'edit':
				obj.removeClass('editing');
				obj.find('form').remove();
				obj.find('.content').toggleClass('d-none');
				this.resetBgcolor(obj, obj.attr('data-color'));
				this.resetBgicon(obj, obj.attr('data-icon'));
				break;
		}
	};

	Statstiles.prototype.validUpdate = function(type, obj) {
		var $this = this;
		switch (type) {
			case 'add':
				var form = obj.find('form'),
					id = form.find($this.selreq).val();
				this.numchildren++;
				obj
					.attr('id', 'statstile-' + id)
					.attr('data-order', this.numchildren);
				form.remove();
				this.btnadd.toggleClass('d-none');
				$.event.trigger({
					type: 	'onChangeStatsTiles',
					action: 'added',
					id: id
				});
				break;
			case 'edit':
				var currentorder = obj.attr('data-order'),
					neworder = obj.find(this.selorder).val();
				obj.removeClass('editing');
				obj.find('form').remove();
				obj.find('.content').toggleClass('d-none');
				if (currentorder != neworder) {
					var tile = obj.clone();
					this.slider.flickity('remove', obj);
					this.slider.flickity('insert', obj, neworder-1);
					this.refreshOrderSelect();
				}
				$.event.trigger({
					type: 	'onChangeStatsTiles',
					action: 'modified'
				});
				break;
		}
		obj
			.attr('data-color', obj.attr('was-data-color'))
			.attr('data-icon', obj.attr('was-data-icon'))
			.removeAttr('was-data-color was-data-icon');
	};

	Statstiles.prototype.resetBgcolor = function(obj, val) {
		obj
			.removeClass(function (index, className) {
				return (className.match (/(^|\s)bg-\S+/g) || []).join(' ');
			})
			.addClass('bg-' + val);
		obj.removeAttr('was-data-color');
	};

	Statstiles.prototype.resetBgicon = function(obj, val) {
		obj
			.find('> i')
			.removeClass(function (index, className) {
				return (className.match (/(^|\s)fa-\S+/g) || []).join(' ');
			})
			.addClass('fa-' + val);
		obj.removeAttr('was-data-icon');
	};

	Statstiles.prototype.changeBgcolor = function(obj, val) {
		obj
			.removeClass(function (index, className) {
				return (className.match (/(^|\s)bg-\S+/g) || []).join(' ');
			})
			.addClass('bg-' + val)
			.attr('was-data-color', val);
	};

	Statstiles.prototype.changeBgicon = function(obj, val) {
		obj.find('> i')
			.removeClass(function (index, className) {
				return (className.match (/(^|\s)fa-\S+/g) || []).join(' ');
			})
			.addClass('fa-' + val);
		obj.attr('was-data-icon', val);
	};

	Statstiles.prototype.setContent = function(id, content) {
		var tile = this.slider.find('#statstile-' + id),
			val = tile.find('.content big'),
			label = tile.find('.content span');
		val.html(content['value']);
		label.html(content['label']);		
	};

	window.Statstiles = Statstiles;


})(window);