(function(){
	var rangeslider = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	rangeslider.prototype = {
		type: "rangeslider",
		rangeControl: null,
		rangeMin: null,
		rangeMax: null,
		rangeStep: null,
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol"]);
			juci.utils.arrayPushAll(r.map, ["ref"]);
			juci.utils.arrayPushAll(r.defaults, ['""']);
			return r;
		},
		init: function(){
			if(this._ds){
				this.j.attr("data-bind", this.getDatabindString());
			}
			if(this.j.attr("data-label")){
				this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			}
			var controlBox = new juci.elem(this._getControlBoxTemplate()).appendTo(this.j);
			var sliderBox = new juci.elem(this._getSliderBox()).appendTo(controlBox);
			this.rangeControl = new juci.elem(this._getRangeControlTemplate()).appendTo(sliderBox);
			var dataBind = this._ds.ref;
			var controlValue = this.rangeControl.attr("data-bind", "attr: {value: "+dataBind+"}");
			var that = this;
			var onChangeListenerFn = function(context, el){
				return function(event){
					context._onRangeChange(el);
				}
			}
			this.rangeControl.el.addEventListener("change", onChangeListenerFn(that, this.rangeControl), false);
			this.rangeControl.el.addEventListener("input", onChangeListenerFn(that, this.rangeControl), false);
			return controlBox;
        },
		_onRangeChange: function(elem){
			this.value(elem.val());
		},
		_getControlBoxTemplate: function(){
			return "<div class='juci_ctrl_box juci_range_slider'></div>";
		},
		_getSliderBox: function(){
			var listItems = "";
			minValue = parseInt(this.j.attr("data-range-min"), 10);
			maxValue = parseInt(this.j.attr("data-range-max"), 10);
			stepValue = parseInt(this.j.attr("data-range-step"), 10);
			return "<div class='juci_slider'><span class='juci_slider_minval'>"+minValue+"</span><span class='juci_slider_maxval'>"+maxValue+"</span><span class='juci_slider_currentval'></span></div>";
		},
		/*_getSliderBox2: function(){
			var listItems = "";
			minValue = parseInt(this.j.attr("data-range-min"), 10);
			maxValue = parseInt(this.j.attr("data-range-max"), 10);
			stepValue = parseInt(this.j.attr("data-range-step"), 10);
			var css = ".juci_slider_timeline li:before{\n"+
				"counter-increment: step "+""+stepValue+" !important;\n"+
			"}\n"+
			".juci_slider_timeline{\n"+
				"counter-reset: step -"+ stepValue +" !important;\n"+
			"}";
			var style = new juci.elem("<style type='text/css'>\n"+css+"\n</style>").appendTo(juci.findByTag("head")[0]);
			noOfListItms = Math.ceil(maxValue/stepValue);
			liWidth = 100/noOfListItms;
			if(minValue == 0){
				liWidth = 100/(noOfListItms);
			}
			for(var i=0; i <= noOfListItms; i++){
				if(i == noOfListItms)
					liWidth = 0;
				listItems +="<li style='width:"+(liWidth)+"%;'></li>";
			}
			return "<div class='juci_slider'><ul class='juci_slider_timeline'>"+listItems+"</ul></div>";
		},*/
		_getRangeControlTemplate: function(){
			if(this.j.attr("data-range-min")){
				this.rangeMin = this.j.attr("data-range-min");
			}
			if(this.j.attr("data-range-max")){
				this.rangeMax = this.j.attr("data-range-max");
			}
			if(this.j.attr("data-range-step")){
				this.rangeStep = this.j.attr("data-range-step");
			}
			return "<input class='juci_range_input' type='range' min='"+this.rangeMin+"' max='"+this.rangeMax+"' step='"+this.rangeStep+"' />";
		},
		_setScrollValue: function(val){
			this.j.findByClass("juci_slider_currentval")[0].html(val);
			//$('input').hover(function(){});
		},
		value: function(val){
			if(typeof val == "undefined"){
				return this._returner(this._val);
			}else{
				if(val%this.rangeStep != 0){
					val = parseInt(val, 10) + 1;
				}
				this._val = val;
				//debugger;
				//juci.dataset(this._ds.ref, ""+val);
				this.__koValue(""+val);
				this._setScrollValue(val);
				this.rangeControl.val(val);
			}
		}
	};
	rangeslider.prototype.type = "rangeslider";
	juci.extend(rangeslider, juci.controls.basecontrol);
	juci.controls.rangeslider = rangeslider;
})();