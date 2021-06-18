(function(window) {

	'use strict';



	/* -------------------- Infopanel -------------------- */

	function Infopanel(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}

	Infopanel.prototype.options = {
		position: 'top'
	};

	Infopanel.prototype._init = function() {
		this.position = this.options.position;
		this.wrapper = $('<div id="infopanel" class="' + this.position + '" />').prependTo('body');
		this.panels = {};
	};

	Infopanel.prototype.add = function(options) {
		var id = this.getUniqueID();
		var params = options;
		params['infopanel'] = this;
		params['id'] = 'info-' + id;
		this.panels[id] = new InfoItem(params);
	};

	Infopanel.prototype.getUniqueID = function() {
		return new Date().valueOf() + '_' + Math.floor((Math.random() + 1) * 2000).toString();
	};

	window.Infopanel = Infopanel;




	/* -------------------- InfoItem -------------------- */

	function InfoItem(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
		this._initEvents();
	}

	InfoItem.prototype.options = {
		bgcolor: 'primary',
		title: '',
		content: '',
		contentsize: 'md',
		hideafter: 0
	};

	InfoItem.prototype._init = function() {
		var $this = this;
		this.infopanel = this.options.infopanel;
		this.id = this.options.id;
		this.bgcolor = this.options.bgcolor;
		this.title = this.options.title;
		this.content = this.options.content;
		this.buttons = this.options.buttons;
		this.contentsize = this.options.contentsize;
		this.hideafter = this.options.hideafter;
		this.wrapper = $('<div id="' + this.id + '" class="infoitem bg-' + this.bgcolor + '" />');
		this.container = $('<div class="content size-' + this.contentsize + '">').appendTo(this.wrapper);
		this.text = $('<span class="text">' + this.content + '</span>').appendTo(this.container);
		if (this.title != '') $('<h5>' + this.title + '</h5>').prependTo(this.text);
		this.btns = $('<span class="buttons" />').appendTo(this.container);
		this.itembuttons = {};
		if (typeof this.buttons != 'undefined')
			for (var i=0; i<this.buttons.length; i++) 
				this.itembuttons[i] = new InfoItemButton({
					item: this,
					label: this.buttons[i].label,
					color: (this.buttons[i].color) ? this.buttons[i].color : null,
					size: (this.contentsize) ? this.contentsize : null,
					action: this.buttons[i].action
				});
		this.wrapper.prependTo(this.infopanel.wrapper);
		this.closebtn = $('<a href="javascript:;" class="close-panel pt-1 text-center"><i class="fas fa-lg fa-times text-white align-middle"></i></a>').prependTo(this.wrapper);
		this.text.css('max-width', 'calc(100% - ' + Math.round(this.btns.width() + this.closebtn.width()) + 'px)');
		this.show();
		if (this.hideafter > 0) this.hideTo = setTimeout(function() { $this.hide(); }, this.hideafter);
	};

	InfoItem.prototype._initEvents = function() {
		var $this = this;
		this.closebtn.click(function(e){
			e.stopPropagation();
			$this.hide();
		})
	};

	InfoItem.prototype.show = function() {
		this.wrapper.addClass('show');
	};

	InfoItem.prototype.hide = function() {
		this.wrapper.removeClass('show');
	};

	window.InfoItem = InfoItem;




	/* -------------------- InfoItemButton -------------------- */

	function InfoItemButton(options) {
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
		this._initEvents();
	}

	InfoItemButton.prototype._init = function() {
		this.item = this.options.item;
		this.label = (this.options.label != null) ? this.options.label : '[label]';
		this.color = (this.options.color != null) ? this.options.color : 'white';
		this.size = (this.options.size != null) ? this.options.size : 'md';
		this.action = (this.options.action != null) ? this.options.action : function() {console.log('Aucune action n\'a été définie pour ce bouton.');};
		this.link = (typeof this.options.action == 'string') ? this.options.action : 'javascript:;';
		this.button = $('<a href="' + this.link + '" class="btn btn-' + this.color + ' btn-' + this.size + ' m-1"><strong>' + this.label + '</strong></a>')
			.appendTo(this.item.btns);
	};

	InfoItemButton.prototype._initEvents = function() {
		var $this = this;
		this.button.click(function(e){
			e.stopPropagation();
			if (typeof $this.action == 'function') $this.action();
		})
	};

	window.InfoItemButton = InfoItemButton;


})(window);