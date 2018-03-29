(function(){
	var network = function(serverUrl){
		this.url = serverUrl + "/images/mowbly/mowbly-logo.png";
		this.bytes = 6813;
	};
	
	network.prototype = {
		start: 0,
		timeTaken : 0,
		getSpeed: function(callBack){
			if(!callBack){
				return -1;
			}
			this.cb = callBack;
			this.img = document.createElement("img");
			var that = this;
			this.img.onload = function(){
				that.timeTaken = (new Date().getTime() - that.start)/1000; //in seconds
				var bitsLoaded = that.bytes * 8;
				var speedBps = (bitsLoaded / that.timeTaken).toFixed(2);
				var speedKbps = (speedBps / 1024).toFixed(2);
				var speedMbps = (speedKbps / 1024).toFixed(2);
				that.cb.call(that,{"timetaken":that.timeTaken,"bps":speedBps,"Kbps":speedKbps,"Mbps":speedMbps});
				document.body.removeChild(that.img);
			};
			this.img.style.display = "none";
			document.body.appendChild(this.img);
			this.img.setAttribute("src",this.url + "?a=" + Math.round(Math.random()*100));
			this.start = new Date().getTime();			
		}
	};
	
	window.NetworkUtil = network;
})(window);