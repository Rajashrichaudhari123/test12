(function(){
    var datelist = function(elem){
        this._super = juci.controls.xlist;
		this._super(elem);
    }
    datelist.prototype = {
        type: "datelist",
        init: function(){
            this._super();
        },
        getListItemTemplate: function(){
            var listitem = this._super();
            var dateRef = this.j.attr("data-date");
            var lctr = new juci.elem(this._getListContainer()).appendTo(this.j);
            var tctr = new juci.elem(this._getTitlesContainer()).appendTo(lctr);
            listitem.children().forEach(function(c){
				tctr.append(c);
			});
            lctr.appendTo(listitem);
            lctr.prepend(new juci.elem(this._getDateContainer()));
            var dated = listitem.find(".juci_"+this.type+"_date .date")[0];
            dated.attr("data-bind","display: (function(){ var d = new Date("+dateRef+"()); if(d.getDate() < 10) return '0'+d.getDate(); else return d.getDate(); })()");
            var mon = listitem.find(".juci_"+this.type+"_date .month")[0];
            mon.attr("data-bind", "display: (function(){ var m = new Date("+dateRef+"()); var str = m.getDayName(); return str.substring(0,3).toUpperCase(); })()");
            var year = listitem.find(".juci_"+this.type+"_date .year")[0];
            //year.attr("data-bind", "display: (function(){ var y = new Date("+dateRef+"());  var str = y.getFullYear(); return str; })()");
            return listitem;
        },
        _getListContainer: function(){
			return "<div class='juci_datelist_container juci_float_left'></div>";
		},
		_getTitlesContainer: function(){
			return "<div class='juci_datelist_titlesContainer'></div>";
		},
        _getDateContainer: function(){
            return "<div class='juci_"+this.type+"_dateContainer'>" +
				"<div class='juci_"+this.type+"_date juci_date_container'><div class='juci_date_overlay'></div><div class='juci_date_middler'><div class='date_container'><div class='month'></div><div class='date'></div><div class='year'></div></div></div></div></div>";
        },
        postInitializeList: function(){
			this._super();
			this.addListItemClick(this.fireActionClick, this, ".juci_"+this.type+"_date");
		},
//        fireActionClick: function(e){
//			var evt = new EventObject(e, e);
//			this.fireEvent("dateclick", evt);
//		},
        onDateClick: function(fp, ctx){
			this.addListener("dateclick", fp, ctx);
		}
    };
    juci.extend(datelist, juci.controls.xlist);
	juci.controls.datelist = datelist;
})();
