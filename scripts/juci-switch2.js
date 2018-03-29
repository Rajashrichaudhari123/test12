(function(){
	var switcher2 = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	switcher2.prototype = {
		type: "switch2",
		_getOptionContainerString: function(e){
			var label = this.j.attr("data-label");
			var onValue = this.j.getAttr("data-ontext", "ON");
			var offValue = this.j.getAttr("data-offtext", "OFF");
			var onClass = this.j.getAttr("data-onclass", "juci_positive");
			var offClass = this.j.getAttr("data-offclass", "juci_negative");
			return '<div class="juci_ctrl_box juci_switch2_box">'+
					'<div class="juci_switch2_label">' +
							'<label>'+juci.getTranslatedLabel(label)+'</label>' +
						'</div>'+
						'<div class="juci_switch2_bar selected">' +
								'<div class="juci_switch2_val juci_switch2_on '+onClass+'">' + onValue + '</div>' +
								'<div class="juci_switch2_thumb"></div>' +
								'<div class="juci_switch2_val juci_switch2_off '+offClass+'">' + offValue + '</div>' +
						'</div>' +
					'</div>';
		},
		DefaultCheckedValue: true,
		DefaultUncheckedValue: false,
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol"]);
			juci.utils.arrayPushAll(r.map, ["ref"]);
			juci.utils.arrayPushAll(r.defaults, ["''"]);
			return r;
		},
		DefaultValue: false,
		getDefaultValue: function(){
			return new Function("return " + this.j.getAttr("data-value", this.DefaultValue))();
		},
		init: function(){
			this.j.addClass("juci_parent");
			this._checkedValue = new Function("return " + this.j.getAttr("data-onvalue", this.DefaultCheckedValue))();
			this._uncheckedValue = new Function("return " + this.j.getAttr("data-offvalue", this.DefaultUncheckedValue))();
			this.j.attr("data-bind", this._ds ? this.getDatabindString() : this.getDefaultDatabindString());
			var container = new juci.elem(this._getOptionContainerString()).appendTo(this.j);
			this.switch2Bar = container.find(".juci_switch2_bar")[0];
			this.switch2Thumb = container.find(".juci_switch2_thumb")[0];
			this.switch2Thumb.css("right",0);
			this.switch2Thumb.css("left","");
			this.switch2Bar.onClick(juci.utils.getDelayedCallback(this._toggle, this, 200));
			/*
			this.scroller = new juci.scrollable(this.switch2Bar.el, {
				snap: true,
				momentum: false,
				hScrollbar: false,
				bounce: false,
				width: 100,
				onTouchEnd: juci.utils.getCallback(this._onScrollEnd, this)
			});
			*/
			var cPanel = juci.panelForElem(this.j);
			if(cPanel.initializing){
				cPanel.listenOnce("init", juci.utils.getDelayedCallback(this.refresh, this, 200), this);
			}else{
				juci.utils.getDelayedCallback(this.refresh, this, 0)();
			}
		},
		_toggle: function(e){
			this.__fireBeforeChange(this._val, this._val === this._checkedValue ? this._uncheckedValue : this._checkedValue);
		},
		enable: function(){
			this.switch2Bar.enable();
			this.scroller.enable();
			this._super();
		},
		disable: function(){
			this.switch2Bar.disable();
			this.scroller.disable();
			this._super();
		},
		value: function(val, bDontScroll){
			if(typeof val == "undefined"){
				return this._val;
			}else{
				if(this._val !== val){
					var pg;
					if(val === this._checkedValue){
						this._val =  this._checkedValue;
						this.switch2Bar.addClass("selected");
						pg = 0;
						this.switch2Thumb.css("left","");
						this.switch2Thumb.css("right",0);
					}else{
						this._val =  this._uncheckedValue;
						this.switch2Bar.removeClass("selected");
						pg = 1;
						this.switch2Thumb.css("left",0);
						this.switch2Thumb.css("right","");
					}
					/*
					if(!bDontScroll || pg != this.scroller.currPageX){
						if(this.scroller.pagesX.length == 0){
							// juci.utils.getDelayedCallback(this.refresh, this, 200)();
						}else{
							this.scroller.scrollToPage(pg, 0, 200);
						}
					}
					*/
				}
				/*
				if(this.scroller.pagesX.length == 0){
					this.scroller.refresh();
				}
				*/
			}
		},
		refresh: function(){
			/*
			if(this.scroller.pagesX.length == 0){
				this.scroller.refresh();
			}
			if(this.scroller.pagesX.length > 0){
				var pg = this._val === this._checkedValue ? 0 : 1;
				this.scroller.scrollToPage(pg, 0, 200);
			}else{
				juci.utils.getDelayedCallback(this.refresh, this, 200)();
			}
			*/
		},
		showDelete: juci.utils.EmptyMethod,
		hideDelete: juci.utils.EmptyMethod,
		setFlag: juci.utils.EmptyMethod,
		resetFlag: juci.utils.EmptyMethod
	};
	juci.extend(switcher2, juci.controls.basecontrol);
	juci.controls["switch2"] = switcher2;
})();
