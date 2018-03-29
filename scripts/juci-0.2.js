// juci-0.2
// Copyrights CloudPact Software Technology Pvt. Ltd.
// Author: Aravind
// Previous version: juci-0.1 - Vignesh
// Includes - knockout.js, zepto.js, date.js, iscroll.js
// License for the above included in licences.txt
// Wiki - https://github.com/vswamina/CloudPact/wiki/juci-0.2-dev



//<-------------------------------------------------------HELPER FUNCTIONS------------------------------------------------------------->



/**#nocode+*/

/*function attachWeinre(){
	var e = document.createElement("script");
	e.setAttribute("src","http://10.0.0.24:8080/target/target-script-min.js#anonymous");document.getElementsByTagName("body")[0].appendChild(e);
}*/

// Shims (Helper Functions)
// Adds startsWith check to String object
if(typeof String.prototype.startsWith != "function") {
	String.prototype.startsWith = function (str){
		return this.indexOf(str, 0) == 0;
	};
}

// Adds the possibility to list properties/keys of an Object, natively available in latest browser versions
if(!Object.keys) {
	Object.keys = function(o) {
	if (o !== Object(o))
		throw new TypeError('Object.keys called on a non-object');
	var k=[],p;
		for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
	return k;
	}
}
// Adds ability to scroll a HTML Element into view, uses the code gist from link below
// https://gist.github.com/hsablonniere/2581101
// TODO Test cross platform perf
if(!Element.prototype.scrollIntoViewIfNeeded) {
	Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
		centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
		var parent = this.parentNode,
			parentComputedStyle = window.getComputedStyle(parent, null),
			parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
			parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
			overTop = this.offsetTop - parent.offsetTop < parent.scrollTop,
			overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
			overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft,
			overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
			alignWithTop = overTop && !overBottom;

		if ((overTop || overBottom) && centerIfNeeded) {
			parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
		}

		if ((overLeft || overRight) && centerIfNeeded) {
			parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
		}

		if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
			this.scrollIntoView(alignWithTop);
		}
	};
}




//<-------------------------------------------------------LIBRARY FUNCTIONS------------------------------------------------------------->




// Observable library common between mowbly.js & juci.js
// Adds pub/sub event features to any object/prototype
// written by Sathish Kumar (sathish@cloudpact.com)
if(!window.Observable){
	(function(){function b(d,f){if(!d){d={}}for(var c in d){if(d.hasOwnProperty(c)){this[c]=d[c]}}this.srcEvent=f;this.returnValue=true;this.cancelDefaultAction=false}b.prototype.stopPropagation=function(){};b.prototype.preventDefault=function(){this.returnValue=false;this.cancelDefaultAction=true};b.prototype.isCancelled=function(){return !!this.cancelDefaultAction};function a(){this.listeners={}}a.prototype.listenOnce=function(d,c,e){this.addListener(d,c,e,true)};a.prototype.addListener=a.prototype.bind=function(d,c,e,g){if(!this.listeners){this.listeners={}}if(!c){return}if(typeof(e)=="undefined"){e=null}if(typeof(g)=="undefined"){g=false}var f=this.listeners[d]||(this.listeners[d]=[]);f[f.length]={handler:c,context:e,listenOnce:g}};a.prototype.removeListener=a.prototype.unbind=function(e,c,g){if(window.event&&window.event.type===e){var j=this;setTimeout(function(){j.removeListener(e,c,g)},0);return}if(!this.listeners){this.listeners={};return}if(!c){return}var h=this.listeners[e];if(h){var d=h.length;for(var f=0;f<d;f++){if(h[f].handler==c){h[f]=null;h.splice(f,1);break}}}};a.prototype.purgeListeners=function(){this.listeners={}};a.prototype.hasListener=function(c){if(!this.listeners){this.listeners={};return false}var d=this.listeners[c];return(d&&d.length>0)};a.prototype.setEventName=function(c,d){c.type=d};a.prototype.fireEvent=function(e,c){if(!(c instanceof b)){if(typeof c=="undefined"||c._super!=b){c=new b(c)}}this.setEventName(c,e);if(!this.listeners){this.listeners={};return true}c.context=this;var g=this.listeners[e];window.event=c;if(g){var d=g.length;for(var f=0;f<d;f++){var h=g[f];if(h.handler){h.handler.call(h.context,c);if(h.listenOnce){h=null;g.splice(f,1);f--;d--}}}}window.event=null;return c};a.prototype.fireEventToLastObserver=function(d,c){if(!this.listeners){this.listeners={};return}var e=this.listeners[d];if(e){var f=e[e.length-1];if(f.handler){f.handler.call(f.context,c);if(f.listenOnce){f=null;e.splice(e.length-1,1)}}}return c};window.EventObject=b;window.Observable=a})(window);
}

// Request Animation Frame
// Provides vendor neutral API for RAF
// robust polyfill for raf -> http://paulirish.com/2011/requestanimationframe-for-smart-animating/
(function(){var b=0;var c=["ms","moz","webkit","o"];for(var a=0;a<c.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[c[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[c[a]+"CancelAnimationFrame"]||window[c[a]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(h,e){var d=new Date().getTime();var f=Math.max(0,16-(d-b));var g=window.setTimeout(function(){h(d+f)},f);b=d+f;return g}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(d){clearTimeout(d)}}}());


// Zepto Library
// Provides a lighter version of JQuery like features
// Two custom modifications by CloudPact
// 1. closest: added level property to return value
// 2. replaced $ with z$
// 3. default zepto does not support IE, we have added support for IE 9+
{
// Why Zepto when useful http://www.codefessions.com/2012/08/performance-of-jquery-compatible-mobile.html
// Zepto - With addition to .closest() API with level of closeness And replaced $ to z$ where available
// Has fix for IE compatibility
(function(a){if(String.prototype.trim===a){String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}}if(Array.prototype.reduce===a){Array.prototype.reduce=function(c){if(this===void 0||this===null){throw new TypeError()}var f=Object(this),b=f.length>>>0,e=0,d;if(typeof c!="function"){throw new TypeError()}if(b==0&&arguments.length==1){throw new TypeError()}if(arguments.length>=2){d=arguments[1]}else{do{if(e in f){d=f[e++];break}if(++e>=b){throw new TypeError()}}while(true)}while(e<b){if(e in f){d=c.call(a,d,f[e],e,f)}e++}return d}}})();var Zepto=(function(){var i,o,z,a,F=[],k=F.slice,f=window.document,E={},G={},m=f.defaultView.getComputedStyle,N={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},s=/^\s*<(\w+|!)[^>]*>/,y=[1,3,8,9,11],t=["after","prepend","before","append"],p=f.createElement("table"),H=f.createElement("tr"),g={tr:f.createElement("tbody"),tbody:p,thead:p,tfoot:p,td:H,th:H,"*":f.createElement("div")},q=/complete|loaded|interactive/,B=/^\.([\w-]+)$/,r=/^#([\w-]+)$/,D=/^[\w-]+$/,e=({}).toString,c={},L,I,A=f.createElement("div");c.matches=function(T,P){if(!T||T.nodeType!==1){return false}var R=T.webkitMatchesSelector||T.mozMatchesSelector||T.oMatchesSelector||T.matchesSelector;if(R){return R.call(T,P)}var S,U=T.parentNode,Q=!U;if(Q){(U=A).appendChild(T)}S=~c.qsa(U,P).indexOf(T);Q&&A.removeChild(T);return S};function l(P){return e.call(P)=="[object Function]"}function C(P){return P instanceof Object}function O(R){var P,Q;if(e.call(R)!=="[object Object]"){return false}Q=(l(R.constructor)&&R.constructor.prototype);if(!Q||!hasOwnProperty.call(Q,"isPrototypeOf")){return false}for(P in R){}return P===i||hasOwnProperty.call(R,P)}function v(P){return P instanceof Array}function w(P){return typeof P.length=="number"}function M(P){return P.filter(function(Q){return Q!==i&&Q!==null})}function x(P){return P.length>0?[].concat.apply([],P):P}L=function(P){return P.replace(/-+(.)?/g,function(Q,R){return R?R.toUpperCase():""})};function j(P){return P.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}I=function(P){return P.filter(function(R,Q){return P.indexOf(R)==Q})};function J(P){return P in G?G[P]:(G[P]=new RegExp("(^|\\s)"+P+"(\\s|$)"))}function d(P,Q){return(typeof Q=="number"&&!N[j(P)])?Q+"px":Q}function K(R){var P,Q;if(!E[R]){P=f.createElement(R);f.body.appendChild(P);Q=m(P,"").getPropertyValue("display");P.parentNode.removeChild(P);Q=="none"&&(Q="block");E[R]=Q}return E[R]}c.fragment=function(R,Q){if(Q===i){Q=s.test(R)&&RegExp.$1}if(!(Q in g)){Q="*"}var P=g[Q];P.innerHTML=""+R;return z.each(k.call(P.childNodes),function(){P.removeChild(this)})};c.Z="__proto__" in {}?function(Q,P){Q=Q||[];Q.__proto__=arguments.callee.prototype;Q.selector=P||"";return Q}:function(S,P){S=S||[];var R=arguments.callee.prototype;for(var Q in R){S[Q]=R[Q]}S.selector=P||"";return S};c.isZ=function(P){return P instanceof c.Z};c.init=function(P,Q){if(!P){return c.Z()}else{if(l(P)){return z(f).ready(P)}else{if(c.isZ(P)){return P}else{var R;if(v(P)){R=M(P)}else{if(O(P)){R=[z.extend({},P)],P=null}else{if(y.indexOf(P.nodeType)>=0||P===window){R=[P],P=null}else{if(s.test(P)){R=c.fragment(P.trim(),RegExp.$1),P=null}else{if(Q!==i){return z(Q).find(P)}else{R=c.qsa(f,P)}}}}}return c.Z(R,P)}}}};z=function(P,Q){return c.init(P,Q)};z.extend=function(P){k.call(arguments,1).forEach(function(Q){for(o in Q){if(Q[o]!==i){P[o]=Q[o]}}});return P};c.qsa=function(Q,P){var R;return(Q===f&&r.test(P))?((R=Q.getElementById(RegExp.$1))?[R]:F):(Q.nodeType!==1&&Q.nodeType!==9)?F:k.call(B.test(P)?Q.getElementsByClassName(RegExp.$1):D.test(P)?Q.getElementsByTagName(P):Q.querySelectorAll(P))};function u(Q,P){return P===i?z(Q):z(Q).filter(P)}function n(R,Q,P,S){return l(Q)?Q.call(R,P,S):Q}z.isFunction=l;z.isObject=C;z.isArray=v;z.isPlainObject=O;z.inArray=function(Q,R,P){return F.indexOf.call(R,Q,P)};z.trim=function(P){return P.trim()};z.uuid=0;z.map=function(T,U){var S,P=[],R,Q;if(w(T)){for(R=0;R<T.length;R++){S=U(T[R],R);if(S!=null){P.push(S)}}}else{for(Q in T){S=U(T[Q],Q);if(S!=null){P.push(S)}}}return x(P)};z.each=function(R,S){var Q,P;if(w(R)){for(Q=0;Q<R.length;Q++){if(S.call(R[Q],Q,R[Q])===false){return R}}}else{for(P in R){if(S.call(R[P],P,R[P])===false){return R}}}return R};z.fn={forEach:F.forEach,reduce:F.reduce,push:F.push,indexOf:F.indexOf,concat:F.concat,map:function(P){return z.map(this,function(R,Q){return P.call(R,Q,R)})},slice:function(){return z(k.apply(this,arguments))},ready:function(P){if(q.test(f.readyState)){P(z)}else{f.addEventListener("DOMContentLoaded",function(){P(z)},false)}return this},get:function(P){return P===i?k.call(this):this[P]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){if(this.parentNode!=null){this.parentNode.removeChild(this)}})},each:function(P){this.forEach(function(R,Q){P.call(R,Q,R)});return this},filter:function(P){return z([].filter.call(this,function(Q){return c.matches(Q,P)}))},add:function(P,Q){return z(I(this.concat(z(P,Q))))},is:function(P){return this.length>0&&c.matches(this[0],P)},not:function(P){var Q=[];if(l(P)&&P.call!==i){this.each(function(S){if(!P.call(this,S)){Q.push(this)}})}else{var R=typeof P=="string"?this.filter(P):(w(P)&&l(P.item))?k.call(P):z(P);this.forEach(function(S){if(R.indexOf(S)<0){Q.push(S)}})}return z(Q)},eq:function(P){return P===-1?this.slice(P):this.slice(P,+P+1)},first:function(){var P=this[0];return P&&!C(P)?P:z(P)},last:function(){var P=this[this.length-1];return P&&!C(P)?P:z(P)},find:function(Q){var P;if(this.length==1){P=c.qsa(this[0],Q)}else{P=this.map(function(){return c.qsa(this,Q)})}return z(P)},closest:function(P,S){var T=this[0],R=0;while(T&&!c.matches(T,P)){T=T!==S&&T!==f&&T.parentNode;R++}var Q=z(T);Q.level=R;return Q},parents:function(P){var R=[],Q=this;while(Q.length>0){Q=z.map(Q,function(S){if((S=S.parentNode)&&S!==f&&R.indexOf(S)<0){R.push(S);return S}})}return u(R,P)},parent:function(P){return u(I(this.pluck("parentNode")),P)},children:function(P){return u(this.map(function(){return k.call(this.children)}),P)},has:function(P){return u(this.map(function(){return k.call(this.children)}),P)},siblings:function(P){return u(this.map(function(Q,R){return k.call(R.parentNode.children).filter(function(S){return S!==R})}),P)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(P){return this.map(function(){return this[P]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null);if(m(this,"").getPropertyValue("display")=="none"){this.style.display=K(this.nodeName)}})},replaceWith:function(P){return this.before(P).remove()},wrap:function(P){return this.each(function(){z(this).wrapAll(z(P)[0].cloneNode(false))})},wrapAll:function(P){if(this[0]){z(this[0]).before(P=z(P));P.append(this)}return this},unwrap:function(){this.parent().each(function(){z(this).replaceWith(z(this).children())});return this},clone:function(){return z(this.map(function(){return this.cloneNode(true)}))},hide:function(){return this.css("display","none")},toggle:function(P){return(P===i?this.css("display")=="none":P)?this.show():this.hide()},prev:function(){return z(this.pluck("previousElementSibling"))},next:function(){return z(this.pluck("nextElementSibling"))},html:function(P){return P===i?(this.length>0?this[0].innerHTML:null):this.each(function(Q){var R=this.innerHTML;z(this).empty().append(n(this,P,Q,R))})},text:function(P){return P===i?(this.length>0?this[0].textContent:null):this.each(function(){this.textContent=P})},attr:function(Q,R){var P;return(typeof Q=="string"&&R===i)?(this.length==0||this[0].nodeType!==1?i:(Q=="value"&&this[0].nodeName=="INPUT")?this.val():(!(P=this[0].getAttribute(Q))&&Q in this[0])?this[0][Q]:P):this.each(function(S){if(this.nodeType!==1){return}if(C(Q)){for(o in Q){this.setAttribute(o,Q[o])}}else{this.setAttribute(Q,n(this,R,S,this.getAttribute(Q)))}})},removeAttr:function(P){return this.each(function(){if(this.nodeType===1){this.removeAttribute(P)}})},prop:function(P,Q){return(Q===i)?(this[0]?this[0][P]:i):this.each(function(R){this[P]=n(this,Q,R,this[P])})},data:function(P,R){var Q=this.attr("data-"+j(P),R);return Q!==null?Q:i},val:function(P){return(P===i)?(this.length>0?this[0].value:i):this.each(function(Q){this.value=n(this,P,Q,this.value)})},offset:function(){if(this.length==0){return null}var P=this[0].getBoundingClientRect();return{left:P.left+window.pageXOffset,top:P.top+window.pageYOffset,width:P.width,height:P.height}},css:function(R,Q){if(Q===i&&typeof R=="string"){return(this.length==0?i:this[0].style[L(R)]||m(this[0],"").getPropertyValue(R))}var P="";for(o in R){if(typeof R[o]=="string"&&R[o]==""){this.each(function(){this.style.removeProperty(j(o))})}else{P+=j(o)+":"+d(o,R[o])+";"}}if(typeof R=="string"){if(Q==""){this.each(function(){this.style.removeProperty(j(R))})}else{P=j(R)+":"+d(R,Q)}}return this.each(function(){this.style.cssText+=";"+P})},index:function(P){return P?this.indexOf(z(P)[0]):this.parent().children().indexOf(this[0])},hasClass:function(P){if(this.length<1){return false}else{return J(P).test(this[0].className)}},addClass:function(P){return this.each(function(Q){a=[];var S=this.className,R=n(this,P,Q,S);R.split(/\s+/g).forEach(function(T){if(!z(this).hasClass(T)){a.push(T)}},this);a.length&&(this.className+=(S?" ":"")+a.join(" "))})},removeClass:function(P){return this.each(function(Q){if(P===i){return this.className=""}a=this.className;n(this,P,Q,a).split(/\s+/g).forEach(function(R){a=a.replace(J(R)," ")});this.className=a.trim()})},toggleClass:function(Q,P){return this.each(function(R){var S=n(this,Q,R,this.className);(P===i?!z(this).hasClass(S):P)?z(this).addClass(S):z(this).removeClass(S)})}};["width","height"].forEach(function(P){z.fn[P]=function(Q){var S,R=P.replace(/./,function(T){return T[0].toUpperCase()});if(Q===i){return this[0]==window?window["inner"+R]:this[0]==f?f.documentElement["offset"+R]:(S=this.offset())&&S[P]}else{return this.each(function(T){var U=z(this);U.css(P,n(this,Q,T,U[P]()))})}}});function h(P,S,R){var Q=(P%2)?S:S.parentNode;Q?Q.insertBefore(R,!P?S.nextSibling:P==1?Q.firstChild:P==2?S:null):z(R).remove()}function b(R,P){P(R);for(var Q in R.childNodes){b(R.childNodes[Q],P)}}t.forEach(function(Q,P){z.fn[Q]=function(){var R=z.map(arguments,function(V){return C(V)?V:c.fragment(V)});if(R.length<1){return this}var S=this.length,T=S>1,U=P<2;return this.each(function(V,Y){for(var W=0;W<R.length;W++){var X=R[U?R.length-W-1:W];b(X,function(Z){if(Z.nodeName!=null&&Z.nodeName.toUpperCase()==="SCRIPT"&&(!Z.type||Z.type==="text/javascript")){window["eval"].call(window,Z.innerHTML)}});if(T&&V<S-1){X=X.cloneNode(true)}h(P,Y,X)}})};z.fn[(P%2)?Q+"To":"insert"+(P?"Before":"After")]=function(R){z(R)[Q](this);return this}});c.Z.prototype=z.fn;c.camelize=L;c.uniq=I;z.zepto=c;return z})();window.Zepto=Zepto;"$" in window||(window.$=Zepto);(function(h){var o=h.zepto.qsa,b={},n=1,q={};q.click=q.mousedown=q.mouseup=q.mousemove="MouseEvents";function l(r){return r._zid||(r._zid=n++)}function c(s,u,t,r){u=e(u);if(u.ns){var v=k(u.ns)}return(b[l(s)]||[]).filter(function(w){return w&&(!u.e||w.e==u.e)&&(!u.ns||v.test(w.ns))&&(!t||l(w.fn)===l(t))&&(!r||w.sel==r)})}function e(r){var s=(""+r).split(".");return{e:s[0],ns:s.slice(1).sort().join(" ")}}function k(r){return new RegExp("(?:^| )"+r.replace(" "," .* ?")+"(?: |$)")}function m(r,t,s){if(h.isObject(r)){h.each(r,s)}else{r.split(/\s/).forEach(function(u){s(u,t)})}}function p(v,u,w,s,r,t){t=!!t;var y=l(v),x=(b[y]||(b[y]=[]));m(u,w,function(C,B){var A=r&&r(B,C),E=A||B;var D=function(G){var F=E.apply(v,[G].concat(G.data));if(F===false){G.preventDefault()}return F};var z=h.extend(e(C),{fn:B,proxy:D,sel:s,del:A,i:x.length});x.push(z);v.addEventListener(z.e,D,t)})}function g(t,s,u,r){var v=l(t);m(s||"",u,function(x,w){c(t,x,w,r).forEach(function(y){delete b[v][y.i];t.removeEventListener(y.e,y.proxy,false)})})}h.event={add:p,remove:g};h.proxy=function(t,s){if(h.isFunction(t)){var r=function(){return t.apply(s,arguments)};r._zid=l(t);return r}else{if(typeof s=="string"){return h.proxy(t[s],t)}else{throw new TypeError("expected function")}}};h.fn.bind=function(r,s){return this.each(function(){p(this,r,s)})};h.fn.unbind=function(r,s){return this.each(function(){g(this,r,s)})};h.fn.one=function(r,s){return this.each(function(u,t){p(this,r,s,null,function(w,v){return function(){var x=w.apply(t,arguments);g(t,v,w);return x}})})};var d=function(){return true},a=function(){return false},j={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function i(s){var r=h.extend({originalEvent:s},s);h.each(j,function(u,t){r[u]=function(){this[t]=d;return s[u].apply(s,arguments)};r[t]=a});return r}function f(s){if(!("defaultPrevented" in s)){s.defaultPrevented=false;var r=s.preventDefault;s.preventDefault=function(){this.defaultPrevented=true;r.call(this)}}}h.fn.delegate=function(r,t,u){var s=false;if(t=="blur"||t=="focus"){if(h.iswebkit){t=t=="blur"?"focusout":t=="focus"?"focusin":t}else{s=true}}return this.each(function(w,v){p(v,t,u,r,function(x){return function(A){var y,z=h(A.target).closest(r,v).get(0);if(z){y=h.extend(i(A),{currentTarget:z,liveFired:v});return x.apply(z,[y].concat([].slice.call(arguments,1)))}}},s)})};h.fn.undelegate=function(r,s,t){return this.each(function(){g(this,s,t,r)})};h.fn.live=function(r,s){h(document.body).delegate(this.selector,r,s);return this};h.fn.die=function(r,s){h(document.body).undelegate(this.selector,r,s);return this};h.fn.on=function(s,r,t){return r==undefined||h.isFunction(r)?this.bind(s,r):this.delegate(r,s,t)};h.fn.off=function(s,r,t){return r==undefined||h.isFunction(r)?this.unbind(s,r):this.undelegate(r,s,t)};h.fn.trigger=function(r,s){if(typeof r=="string"){r=h.Event(r)}f(r);r.data=s;return this.each(function(){if("dispatchEvent" in this){this.dispatchEvent(r)}})};h.fn.triggerHandler=function(s,t){var u,r;this.each(function(w,v){u=i(typeof s=="string"?h.Event(s):s);u.data=t;u.target=v;h.each(c(v,s.type||s),function(x,y){r=y.proxy(u);if(u.isImmediatePropagationStopped()){return false}})});return r};("focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error").split(" ").forEach(function(r){h.fn[r]=function(s){return this.bind(r,s)}});["focus","blur"].forEach(function(r){h.fn[r]=function(t){if(t){this.bind(r,t)}else{if(this.length){try{this.get(0)[r]()}catch(s){}}}return this}});h.Event=function(u,t){var v=document.createEvent(q[u]||"Events"),r=true;if(t){for(var s in t){(s=="bubbles")?(r=!!t[s]):(v[s]=t[s])}}v.initEvent(u,r,true,null,null,null,null,null,null,null,null,null,null,null,null);return v};window.z$=window.$z=Zepto})(Zepto);(function(b){function a(c){var f=this.os={},g=this.browser={},l=c.match(/WebKit\/([\d.]+)/),e=c.match(/(Android)\s+([\d.]+)/),m=c.match(/(iPad).*OS\s([\d_]+)/),k=!m&&c.match(/(iPhone\sOS)\s([\d_]+)/),n=c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),j=n&&c.match(/TouchPad/),i=c.match(/Kindle\/([\d.]+)/),h=c.match(/Silk\/([\d._]+)/),d=c.match(/(BlackBerry).*Version\/([\d.]+)/);if(g.webkit=!!l){g.version=l[1]}if(e){f.android=true,f.version=e[2]}if(k){f.ios=f.iphone=true,f.version=k[2].replace(/_/g,".")}if(m){f.ios=f.ipad=true,f.version=m[2].replace(/_/g,".")}if(n){f.webos=true,f.version=n[2]}if(j){f.touchpad=true}if(d){f.blackberry=true,f.version=d[2]}if(i){f.kindle=true,f.version=i[1]}if(h){g.silk=true,g.version=h[1]}if(!h&&f.android&&c.match(/Kindle Fire/)){g.silk=true}}a.call(b,navigator.userAgent);b.__detect=a})(Zepto);(function(e,c){var g="",k,b,i,m={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},j=window.document,d=j.createElement("div"),l=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,h={};function a(n){return n.toLowerCase()}function f(n){return k?k+n:a(n)}e.each(m,function(o,n){if(d.style[o+"TransitionProperty"]!==c){g="-"+a(o)+"-";k=n;return false}});h[g+"transition-property"]=h[g+"transition-duration"]=h[g+"transition-timing-function"]=h[g+"animation-name"]=h[g+"animation-duration"]="";e.fx={off:(k===c&&d.style.transitionProperty===c),cssPrefix:g,transitionEnd:f("TransitionEnd"),animationEnd:f("AnimationEnd")};e.fn.animate=function(n,o,p,q){if(e.isObject(o)){p=o.easing,q=o.complete,o=o.duration}if(o){o=o/1000}return this.anim(n,o,p,q)};e.fn.anim=function(s,p,o,u){var r,w={},t,q=this,n,v=e.fx.transitionEnd;if(p===c){p=0.4}if(e.fx.off){p=0}if(typeof s=="string"){w[g+"animation-name"]=s;w[g+"animation-duration"]=p+"s";v=e.fx.animationEnd}else{for(t in s){if(l.test(t)){r||(r=[]);r.push(t+"("+s[t]+")")}else{w[t]=s[t]}}if(r){w[g+"transform"]=r.join(" ")}if(!e.fx.off&&typeof s==="object"){w[g+"transition-property"]=Object.keys(s).join(", ");w[g+"transition-duration"]=p+"s";w[g+"transition-timing-function"]=(o||"linear")}}n=function(x){if(typeof x!=="undefined"){if(x.target!==x.currentTarget){return}e(x.target).unbind(v,arguments.callee)}e(this).css(h);u&&u.call(this)};if(p>0){this.bind(v,n)}setTimeout(function(){q.css(w);if(p<=0){setTimeout(function(){q.each(function(){n.call(this)})},0)}},0);return this};d=null})(Zepto);(function($){var jsonpID=0,isObject=$.isObject,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;function triggerAndReturn(context,eventName,data){var event=$.Event(eventName);$(context).trigger(event,data);return !event.defaultPrevented}function triggerGlobal(settings,context,eventName,data){if(settings.global){return triggerAndReturn(context||document,eventName,data)}}$.active=0;function ajaxStart(settings){if(settings.global&&$.active++===0){triggerGlobal(settings,null,"ajaxStart")}}function ajaxStop(settings){if(settings.global&&!(--$.active)){triggerGlobal(settings,null,"ajaxStop")}}function ajaxBeforeSend(xhr,settings){var context=settings.context;if(settings.beforeSend.call(context,xhr,settings)===false||triggerGlobal(settings,context,"ajaxBeforeSend",[xhr,settings])===false){return false}triggerGlobal(settings,context,"ajaxSend",[xhr,settings])}function ajaxSuccess(data,xhr,settings){var context=settings.context,status="success";settings.success.call(context,data,status,xhr);triggerGlobal(settings,context,"ajaxSuccess",[xhr,settings,data]);ajaxComplete(status,xhr,settings)}function ajaxError(error,type,xhr,settings){var context=settings.context;settings.error.call(context,xhr,type,error);triggerGlobal(settings,context,"ajaxError",[xhr,settings,error]);ajaxComplete(type,xhr,settings)}function ajaxComplete(status,xhr,settings){var context=settings.context;settings.complete.call(context,xhr,status);triggerGlobal(settings,context,"ajaxComplete",[xhr,settings]);ajaxStop(settings)}function empty(){}$.ajaxJSONP=function(options){var callbackName="jsonp"+(++jsonpID),script=document.createElement("script"),abort=function(){$(script).remove();if(callbackName in window){window[callbackName]=empty}ajaxComplete("abort",xhr,options)},xhr={abort:abort},abortTimeout;if(options.error){script.onerror=function(){xhr.abort();options.error()}}window[callbackName]=function(data){clearTimeout(abortTimeout);$(script).remove();delete window[callbackName];ajaxSuccess(data,xhr,options)};serializeData(options);script.src=options.url.replace(/=\?/,"="+callbackName);$("head").append(script);if(options.timeout>0){abortTimeout=setTimeout(function(){xhr.abort();ajaxComplete("timeout",xhr,options)},options.timeout)}return xhr};$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:true,xhr:function(){return new window.XMLHttpRequest()},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:false,timeout:0};function mimeToDataType(mime){return mime&&(mime==htmlType?"html":mime==jsonType?"json":scriptTypeRE.test(mime)?"script":xmlTypeRE.test(mime)&&"xml")||"text"}function appendQuery(url,query){return(url+"&"+query).replace(/[&?]{1,2}/,"?")}function serializeData(options){if(isObject(options.data)){options.data=$.param(options.data)}if(options.data&&(!options.type||options.type.toUpperCase()=="GET")){options.url=appendQuery(options.url,options.data)}}$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings){if(settings[key]===undefined){settings[key]=$.ajaxSettings[key]}}ajaxStart(settings);if(!settings.crossDomain){settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host}var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder){if(!hasPlaceholder){settings.url=appendQuery(settings.url,"callback=?")}return $.ajaxJSONP(settings)}if(!settings.url){settings.url=window.location.toString()}serializeData(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=$.ajaxSettings.xhr(),abortTimeout;if(!settings.crossDomain){baseHeaders["X-Requested-With"]="XMLHttpRequest"}if(mime){baseHeaders.Accept=mime;if(mime.indexOf(",")>-1){mime=mime.split(",",2)[0]}xhr.overrideMimeType&&xhr.overrideMimeType(mime)}if(settings.contentType||(settings.data&&settings.type.toUpperCase()!="GET")){baseHeaders["Content-Type"]=(settings.contentType||"application/x-www-form-urlencoded")}settings.headers=$.extend(baseHeaders,settings.headers||{});xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(abortTimeout);var result,error=false;if((xhr.status>=200&&xhr.status<300)||xhr.status==304||(xhr.status==0&&protocol=="file:")){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type"));result=xhr.responseText;try{if(dataType=="script"){(1,eval)(result)}else{if(dataType=="xml"){result=xhr.responseXML}else{if(dataType=="json"){result=blankRE.test(result)?null:JSON.parse(result)}}}}catch(e){error=e}if(error){ajaxError(error,"parsererror",xhr,settings)}else{ajaxSuccess(result,xhr,settings)}}else{ajaxError(null,"error",xhr,settings)}}};var async="async" in settings?settings.async:true;xhr.open(settings.type,settings.url,async);for(name in settings.headers){xhr.setRequestHeader(name,settings.headers[name])}if(ajaxBeforeSend(xhr,settings)===false){xhr.abort();return false}if(settings.timeout>0){abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty;xhr.abort();ajaxError(null,"timeout",xhr,settings)},settings.timeout)}xhr.send(settings.data?settings.data:null);return xhr};$.get=function(url,success){return $.ajax({url:url,success:success})};$.post=function(url,data,success,dataType){if($.isFunction(data)){dataType=dataType||success,success=data,data=null}return $.ajax({type:"POST",url:url,data:data,success:success,dataType:dataType})};$.getJSON=function(url,success){return $.ajax({url:url,success:success,dataType:"json"})};$.fn.load=function(url,success){if(!this.length){return this}var self=this,parts=url.split(/\s/),selector;if(parts.length>1){url=parts[0],selector=parts[1]}$.get(url,function(response){self.html(selector?$(document.createElement("div")).html(response.replace(rscript,"")).find(selector).html():response);success&&success.call(self)});return this};var escape=encodeURIComponent;function serialize(params,obj,traditional,scope){var array=$.isArray(obj);$.each(obj,function(key,value){if(scope){key=traditional?scope:scope+"["+(array?"":key)+"]"}if(!scope&&array){params.add(value.name,value.value)}else{if(traditional?$.isArray(value):isObject(value)){serialize(params,value,traditional,key)}else{params.add(key,value)}}})}$.param=function(obj,traditional){var params=[];params.add=function(k,v){this.push(escape(k)+"="+escape(v))};serialize(params,obj,traditional);return params.join("&").replace("%20","+")}})(Zepto);(function(a){a.fn.serializeArray=function(){var b=[],c;a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");if(this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&((d!="radio"&&d!="checkbox")||this.checked)){b.push({name:c.attr("name"),value:c.val()})}});return b};a.fn.serialize=function(){var b=[];this.serializeArray().forEach(function(c){b.push(encodeURIComponent(c.name)+"="+encodeURIComponent(c.value))});return b.join("&")};a.fn.submit=function(c){if(c){this.bind("submit",c)}else{if(this.length){var b=a.Event("submit");this.eq(0).trigger(b);if(!b.defaultPrevented){this.get(0).submit()}}}return this}})(Zepto);(function(){var g="IE9 Zepto shim: ";var e=window.Zepto;if(!e){throw g+"Error: can't find window.Zepto"}if(document.documentMode<9){throw g+"Error: browser is not IE9+ or is running in compatibility mode"}var d=[];e.Z=function(k,j){k=k||[];var i=new b(k);i.selector=j||"";return i};var b=function f(i){d.push.apply(this,i);return this};e.Z.prototype=b.prototype=e.fn;e.inArray=function(k,l,j){return d.indexOf.call(l,k,j)};e.fn.concat=function(){var i=[];i.push.apply(i,this);e.each(arguments,function(j,k){if(typeof k.length=="number"){i.push.apply(i,k)}else{i.push(k)}});return i};e.fn.empty=function(){return this.each(function(j,k){while(k.firstChild){k.removeChild(k.firstChild)}})};var c=/^\s*<(\w+)[^>]*>/,h=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,a={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],"*":[0,"",""]};a.optgroup=a.option;a.tbody=a.tfoot=a.colgroup=a.caption=a.thead;a.th=a.td;e.fragment=function(j,i){if(i===undefined){i=c.test(j)&&RegExp.$1}j=j.toString().replace(h,"<$1></$2>");var k=a[i]||a["*"],l=k[0],m=document.createElement("div");m.innerHTML=k[1]+j+k[2];while(l--){m=m.lastChild}return d.slice.call(m.childNodes)}})();(function(g){var f={},b;function c(j){return"tagName" in j?j:j.parentNode}function h(k,j,m,l){var o=Math.abs(k-j),n=Math.abs(m-l);return o>=n?(k-j>0?"Left":"Right"):(m-l>0?"Up":"Down")}var e=750,a;function i(){a=null;if(f.last){f.el.trigger("longTap");f={}}}function d(){if(a){clearTimeout(a)}a=null}})(Zepto);
}

// Knockout Library used in Juci
// Provides data binding features for Juci
// Custom Modifications by CloudPact - Listed in wiki link at the top
{
/*
	KO - minified code
	Customizations
	1. Added index to afterRender call below in ko.js
	options['afterRender'](addedNodesArray, bindingContext['$data'], index);
	2. Extension - onChange - subscribe to change of every observable on the panel
	3. Binding Handler - jselectvalue - For Select box value field
	4. Binding Handler - Catalog - For catalog list binding
	5. Allow Text bindings to have functions passed as accessor.
	6. Added removeAll method on ko.observableDictionary()
	7. Checking latestvalue of observable before firing all bindings for dependency - 09Jan2013
	8. Updating with ko 2.2.4 and mapping - 10July2013
	9. Added expression support for mapping configuration - 10July2013
	10. Resetting of values clearFromJS sets _initialValue of observable - 10July2013
	11. Firefox browser bug fixed
*/
(function(){var a=true;(function(d,b,c,e,f){!function(g){if(typeof require==="function"&&typeof exports==="object"&&typeof module==="object"){var h=module.exports||exports;g(h)}else{if(typeof define==="function"&&define.amd){define(["exports"],g)}else{g(d.ko={})}}}(function(j){var t=typeof j!=="undefined"?j:{};t.exportSymbol=function(x,v){var z=x.split(".");var y=t;for(var w=0;w<z.length-1;w++){y=y[z[w]]}y[z[z.length-1]]=v};t.exportProperty=function(w,v,x){w[v]=x};t.version="2.2.1";t.exportSymbol("version",t.version);t.utils=new (function(){var G=/^(\s|\u00A0)+|(\s|\u00A0)+$/g;var F={},z={};var y=/Firefox\/2/i.test(c.userAgent)?"KeyboardEvent":"UIEvents";F[y]=["keyup","keydown","keypress"];F.MouseEvents=["click","dblclick","mousedown","mouseup","mousemove","mouseover","mouseout","mouseenter","mouseleave"];for(var v in F){var A=F[v];if(A.length){for(var D=0,B=A.length;D<B;D++){z[A[D]]=v}}}var H={propertychange:true};var C=(function(){var I=3,K=b.createElement("div"),J=K.getElementsByTagName("i");while(K.innerHTML="<!--[if gt IE "+(++I)+"]><i></i><![endif]-->",J[0]){}return I>4?I:f}());var x=C===6,w=C===7;function E(J,I){if((t.utils.tagNameLower(J)!=="input")||!J.type){return false}if(I.toLowerCase()!="click"){return false}var K=J.type;return(K=="checkbox")||(K=="radio")}return{fieldsIncludedWithJsonPost:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],arrayForEach:function(L,K){for(var J=0,I=L.length;J<I;J++){K(L[J])}},arrayIndexOf:function(L,K){if(typeof Array.prototype.indexOf=="function"){return Array.prototype.indexOf.call(L,K)}for(var J=0,I=L.length;J<I;J++){if(L[J]===K){return J}}return -1},arrayFirst:function(M,I,L){for(var K=0,J=M.length;K<J;K++){if(I.call(L,M[K])){return M[K]}}return null},arrayRemoveItem:function(K,J){var I=t.utils.arrayIndexOf(K,J);if(I>=0){K.splice(I,1)}},arrayGetDistinctValues:function(L){L=L||[];var I=[];for(var K=0,J=L.length;K<J;K++){if(t.utils.arrayIndexOf(I,L[K])<0){I.push(L[K])}}return I},arrayMap:function(M,K){M=M||[];var I=[];for(var L=0,J=M.length;L<J;L++){I.push(K(M[L]))}return I},arrayFilter:function(M,J){M=M||[];var I=[];for(var L=0,K=M.length;L<K;L++){if(J(M[L])){I.push(M[L])}}return I},arrayPushAll:function(L,K){if(K instanceof Array){L.push.apply(L,K)}else{for(var J=0,I=K.length;J<I;J++){L.push(K[J])}}return L},extend:function(J,I){if(I){for(var K in I){if(I.hasOwnProperty(K)){J[K]=I[K]}}}return J},emptyDomNode:function(I){while(I.firstChild){t.removeNode(I.firstChild)}},moveCleanedNodesToContainerElement:function(J){var M=t.utils.makeArray(J);var I=b.createElement("div");for(var L=0,K=M.length;L<K;L++){I.appendChild(t.cleanNode(M[L]))}return I},cloneNodes:function(N,K){for(var J=0,I=N.length,L=[];J<I;J++){var M=N[J].cloneNode(true);L.push(K?t.cleanNode(M):M)}return L},setDomNodeChildren:function(K,L){t.utils.emptyDomNode(K);if(L){for(var J=0,I=L.length;J<I;J++){K.appendChild(L[J])}}},replaceDomNodes:function(M,O){var N=M.nodeType?[M]:M;if(N.length>0){var K=N[0];var L=K.parentNode;for(var J=0,I=O.length;J<I;J++){L.insertBefore(O[J],K)}for(var J=0,I=N.length;J<I;J++){t.removeNode(N[J])}}},setOptionNodeSelectionState:function(J,I){if(C<7){J.setAttribute("selected",I)}else{J.selected=I}},stringTrim:function(I){return(I||"").replace(G,"")},stringTokenize:function(L,J){var I=[];var O=(L||"").split(J);for(var M=0,K=O.length;M<K;M++){var N=t.utils.stringTrim(O[M]);if(N!==""){I.push(N)}}return I},stringStartsWith:function(I,J){I=I||"";if(J.length>I.length){return false}return I.substring(0,J.length)===J},domNodeIsContainedBy:function(J,I){if(I.compareDocumentPosition){return(I.compareDocumentPosition(J)&16)==16}while(J!=null){if(J==I){return true}J=J.parentNode}return false},domNodeIsAttachedToDocument:function(I){return t.utils.domNodeIsContainedBy(I,I.ownerDocument)},tagNameLower:function(I){return I&&I.tagName&&I.tagName.toLowerCase()},registerEventHandler:function(L,K,M){var J=C&&H[K];if(!J&&typeof e!="undefined"){if(E(L,K)){var I=M;M=function(P,O){var N=this.checked;if(O){this.checked=O.checkedStateBeforeEvent!==true}I.call(this,P);this.checked=N}}e(L)["bind"](K,M)}else{if(!J&&typeof L.addEventListener=="function"){L.addEventListener(K,M,false)}else{if(typeof L.attachEvent!="undefined"){L.attachEvent("on"+K,function(N){M.call(L,N)})}else{throw new Error("Browser doesn't support addEventListener or attachEvent")}}}},triggerEvent:function(K,J){if(!(K&&K.nodeType)){throw new Error("element must be a DOM node when calling triggerEvent")}if(typeof e!="undefined"){var M=[];if(E(K,J)){M.push({checkedStateBeforeEvent:K.checked})}e(K)["trigger"](J,M)}else{if(typeof b.createEvent=="function"){if(typeof K.dispatchEvent=="function"){var I=z[J]||"HTMLEvents";var L=b.createEvent(I);L.initEvent(J,true,true,d,0,0,0,0,0,false,false,false,false,0,K);K.dispatchEvent(L)}else{throw new Error("The supplied element doesn't support dispatchEvent")}}else{if(typeof K.fireEvent!="undefined"){if(E(K,J)){K.checked=K.checked!==true}K.fireEvent("on"+J)}else{throw new Error("Browser doesn't support triggering events")}}}},unwrapObservable:function(I){return t.isObservable(I)?I():I},peekObservable:function(I){return t.isObservable(I)?I.peek():I},toggleDomNodeCssClass:function(L,M,K){if(M){var I=/[\w-]+/g,J=L.className.match(I)||[];t.utils.arrayForEach(M.match(I),function(O){var N=t.utils.arrayIndexOf(J,O);if(N>=0){if(!K){J.splice(N,1)}}else{if(K){J.push(O)}}});L.className=J.join(" ")}},setTextContent:function(J,K){var L=t.utils.unwrapObservable(K);if((L===null)||(L===f)){L=""}if(J.nodeType===3){J.data=L}else{var I=t.virtualElements.firstChild(J);if(!I||I.nodeType!=3||t.virtualElements.nextSibling(I)){t.virtualElements.setDomNodeChildren(J,[b.createTextNode(L)])}else{I.data=L}t.utils.forceRefresh(J)}},setElementName:function(J,I){J.name=I;if(C<=7){try{J.mergeAttributes(b.createElement("<input name='"+J.name+"'/>"),false)}catch(K){}}},forceRefresh:function(J){if(C>=9){var I=J.nodeType==1?J:J.parentNode;if(I.style){I.style.zoom=I.style.zoom}}},ensureSelectElementIsRenderedCorrectly:function(I){if(C>=9){var J=I.style.width;I.style.width=0;I.style.width=J}},range:function(L,J){L=t.utils.unwrapObservable(L);J=t.utils.unwrapObservable(J);var I=[];for(var K=L;K<=J;K++){I.push(K)}return I},makeArray:function(L){var I=[];for(var K=0,J=L.length;K<J;K++){I.push(L[K])}return I},isIe6:x,isIe7:w,ieVersion:C,getFormFields:function(K,N){var I=t.utils.makeArray(K.getElementsByTagName("input")).concat(t.utils.makeArray(K.getElementsByTagName("textarea")));var M=(typeof N=="string")?function(O){return O.name===N}:function(O){return N.test(O.name)};var L=[];for(var J=I.length-1;J>=0;J--){if(M(I[J])){L.push(I[J])}}return L},parseJson:function(I){if(typeof I=="string"){I=t.utils.stringTrim(I);if(I){if(d.JSON&&d.JSON.parse){return d.JSON.parse(I)}return(new Function("return "+I))()}}return null},stringifyJson:function(K,I,J){if((typeof JSON=="undefined")||(typeof JSON.stringify=="undefined")){throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")}return JSON.stringify(t.utils.unwrapObservable(K),I,J)},postJson:function(N,O,U){U=U||{};var L=U.params||{};var K=U.includeFields||this.fieldsIncludedWithJsonPost;var I=N;if((typeof N=="object")&&(t.utils.tagNameLower(N)==="form")){var R=N;I=R.action;for(var P=K.length-1;P>=0;P--){var Q=t.utils.getFormFields(R,K[P]);for(var M=Q.length-1;M>=0;M--){L[Q[M].name]=Q[M].value}}}O=t.utils.unwrapObservable(O);var J=b.createElement("form");J.style.display="none";J.action=I;J.method="post";for(var T in O){var S=b.createElement("input");S.name=T;S.value=t.utils.stringifyJson(t.utils.unwrapObservable(O[T]));J.appendChild(S)}for(var T in L){var S=b.createElement("input");S.name=T;S.value=L[T];J.appendChild(S)}b.body.appendChild(J);U.submitter?U.submitter(J):J.submit();setTimeout(function(){J.parentNode.removeChild(J)},0)}}})();t.exportSymbol("utils",t.utils);t.exportSymbol("utils.arrayForEach",t.utils.arrayForEach);t.exportSymbol("utils.arrayFirst",t.utils.arrayFirst);t.exportSymbol("utils.arrayFilter",t.utils.arrayFilter);t.exportSymbol("utils.arrayGetDistinctValues",t.utils.arrayGetDistinctValues);t.exportSymbol("utils.arrayIndexOf",t.utils.arrayIndexOf);t.exportSymbol("utils.arrayMap",t.utils.arrayMap);t.exportSymbol("utils.arrayPushAll",t.utils.arrayPushAll);t.exportSymbol("utils.arrayRemoveItem",t.utils.arrayRemoveItem);t.exportSymbol("utils.extend",t.utils.extend);t.exportSymbol("utils.fieldsIncludedWithJsonPost",t.utils.fieldsIncludedWithJsonPost);t.exportSymbol("utils.getFormFields",t.utils.getFormFields);t.exportSymbol("utils.peekObservable",t.utils.peekObservable);t.exportSymbol("utils.postJson",t.utils.postJson);t.exportSymbol("utils.parseJson",t.utils.parseJson);t.exportSymbol("utils.registerEventHandler",t.utils.registerEventHandler);t.exportSymbol("utils.stringifyJson",t.utils.stringifyJson);t.exportSymbol("utils.range",t.utils.range);t.exportSymbol("utils.toggleDomNodeCssClass",t.utils.toggleDomNodeCssClass);t.exportSymbol("utils.triggerEvent",t.utils.triggerEvent);t.exportSymbol("utils.unwrapObservable",t.utils.unwrapObservable);if(!Function.prototype.bind){Function.prototype.bind=function(w){var x=this,v=Array.prototype.slice.call(arguments),w=v.shift();return function(){return x.apply(w,v.concat(Array.prototype.slice.call(arguments)))}}}t.utils.domData=new (function(){var x=0;var v="__ko__"+(new Date).getTime();var w={};return{get:function(A,z){var y=t.utils.domData.getAll(A,false);return y===f?f:y[z]},set:function(A,z,B){if(B===f){if(t.utils.domData.getAll(A,false)===f){return}}var y=t.utils.domData.getAll(A,true);y[z]=B},getAll:function(B,A){var z=B[v];var y=z&&(z!=="null")&&w[z];if(!y){if(!A){return f}z=B[v]="ko"+x++;w[z]={}}return w[z]},clear:function(z){var y=z[v];if(y){delete w[y];z[v]=null;return true}return false}}})();t.exportSymbol("utils.domData",t.utils.domData);t.exportSymbol("utils.domData.clear",t.utils.domData.clear);t.utils.domNodeDisposal=new (function(){var y="__ko_domNodeDisposal__"+(new Date).getTime();var A={1:true,8:true,9:true};var v={1:true,9:true};function B(D,C){var E=t.utils.domData.get(D,y);if((E===f)&&C){E=[];t.utils.domData.set(D,y,E)}return E}function z(C){t.utils.domData.set(C,y,f)}function x(E){var D=B(E,false);if(D){D=D.slice(0);for(var C=0;C<D.length;C++){D[C](E)}}t.utils.domData.clear(E);if((typeof e=="function")&&(typeof e.cleanData=="function")){e.cleanData([E])}if(v[E.nodeType]){w(E)}}function w(C){var E,D=C.firstChild;while(E=D){D=E.nextSibling;if(E.nodeType===8){x(E)}}}return{addDisposeCallback:function(C,D){if(typeof D!="function"){throw new Error("Callback must be a function")}B(C,true).push(D)},removeDisposeCallback:function(D,E){var C=B(D,false);if(C){t.utils.arrayRemoveItem(C,E);if(C.length==0){z(D)}}},cleanNode:function(E){if(A[E.nodeType]){x(E);if(v[E.nodeType]){var F=[];t.utils.arrayPushAll(F,E.getElementsByTagName("*"));for(var D=0,C=F.length;D<C;D++){x(F[D])}}}return E},removeNode:function(C){t.cleanNode(C);if(C.parentNode){C.parentNode.removeChild(C)}}}})();t.cleanNode=t.utils.domNodeDisposal.cleanNode;t.removeNode=t.utils.domNodeDisposal.removeNode;t.exportSymbol("cleanNode",t.cleanNode);t.exportSymbol("removeNode",t.removeNode);t.exportSymbol("utils.domNodeDisposal",t.utils.domNodeDisposal);t.exportSymbol("utils.domNodeDisposal.addDisposeCallback",t.utils.domNodeDisposal.addDisposeCallback);t.exportSymbol("utils.domNodeDisposal.removeDisposeCallback",t.utils.domNodeDisposal.removeDisposeCallback);(function(){var y=/^(\s*)<!--(.*?)-->/;function x(A){var C=b.createElement("div");C.innerHTML=A;var z=b.createDocumentFragment();for(var B=0;B<C.childNodes.length;B++){z.appendChild(C.childNodes[B])}C=null;return t.utils.makeArray(z.childNodes)}function v(B){var A=t.utils.stringTrim(B).toLowerCase(),D=b.createElement("div");var C=A.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!A.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!A.indexOf("<td")||!A.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];var z="ignored<div>"+C[1]+B+C[2]+"</div>";if(typeof d.innerShiv=="function"){D.appendChild(d.innerShiv(z))}else{D.innerHTML=z}while(C[0]--){D=D.lastChild}return t.utils.makeArray(D.lastChild.childNodes)}function w(A){if(e.parseHTML){return e.parseHTML(A)}else{var z=e.clean([A]);if(z&&z[0]){var B=z[0];while(B.parentNode&&B.parentNode.nodeType!==11){B=B.parentNode}if(B.parentNode){B.parentNode.removeChild(B)}}return z}}t.utils.parseHtmlFragment=function(z){return x(z);return typeof e!="undefined"?w(z):v(z)};t.utils.setHtml=function(B,A){t.utils.emptyDomNode(B);A=t.utils.unwrapObservable(A);if((A!==null)&&(A!==f)){if(typeof A!="string"){A=A.toString()}if(typeof e!="undefined"){e(B)["html"](A)}else{var C=t.utils.parseHtmlFragment(A);for(var z=0;z<C.length;z++){B.appendChild(C[z])}}}}})();t.exportSymbol("utils.parseHtmlFragment",t.utils.parseHtmlFragment);t.exportSymbol("utils.setHtml",t.utils.setHtml);t.memoization=(function(){var y={};function w(){return(((1+Math.random())*4294967296)|0).toString(16).substring(1)}function v(){return w()+w()}function x(z,D){if(!z){return}if(z.nodeType==8){var C=t.memoization.parseMemoText(z.nodeValue);if(C!=null){D.push({domNode:z,memoId:C})}}else{if(z.nodeType==1){for(var B=0,E=z.childNodes,A=E.length;B<A;B++){x(E[B],D)}}}}return{memoize:function(A){if(typeof A!="function"){throw new Error("You can only pass a function to ko.memoization.memoize()")}var z=v();y[z]=A;return"<!--[ko_memo:"+z+"]-->"},unmemoize:function(A,z){var B=y[A];if(B===f){throw new Error("Couldn't find any memo with ID "+A+". Perhaps it's already been unmemoized.")}try{B.apply(null,z||[]);return true}finally{delete y[A]}},unmemoizeDomNodeAndDescendants:function(C,F){var E=[];x(C,E);for(var B=0,A=E.length;B<A;B++){var D=E[B].domNode;var z=[D];if(F){t.utils.arrayPushAll(z,F)}t.memoization.unmemoize(E[B].memoId,z);D.nodeValue="";if(D.parentNode){D.parentNode.removeChild(D)}}},parseMemoText:function(A){var z=A.match(/^\[ko_memo\:(.*?)\]$/);return z?z[1]:null}}})();t.exportSymbol("memoization",t.memoization);t.exportSymbol("memoization.memoize",t.memoization.memoize);t.exportSymbol("memoization.unmemoize",t.memoization.unmemoize);t.exportSymbol("memoization.parseMemoText",t.memoization.parseMemoText);t.exportSymbol("memoization.unmemoizeDomNodeAndDescendants",t.memoization.unmemoizeDomNodeAndDescendants);t.extenders={throttle:function(w,v){w.throttleEvaluation=v;var x=null;return t.dependentObservable({read:w,write:function(y){clearTimeout(x);x=setTimeout(function(){w(y)},v)}})},notify:function(v,w){v.equalityComparer=w=="always"?function(){return false}:t.observable.fn["equalityComparer"];return v}};function s(y){var x=this;if(y){for(var w in y){var v=t.extenders[w];if(typeof v=="function"){x=v(x,y[w])}}}return x}t.exportSymbol("extenders",t.extenders);t.subscription=function(w,x,v){this.target=w;this.callback=x;this.disposeCallback=v;t.exportProperty(this,"dispose",this.dispose)};t.subscription.prototype.dispose=function(){this.isDisposed=true;this.disposeCallback()};t.subscribable=function(){this._subscriptions={};t.utils.extend(this,t.subscribable.fn);t.exportProperty(this,"subscribe",this.subscribe);t.exportProperty(this,"extend",this.extend);t.exportProperty(this,"getSubscriptionsCount",this.getSubscriptionsCount)};var u="change";t.subscribable.fn={subscribe:function(z,w,y){y=y||u;var v=w?z.bind(w):z;var x=new t.subscription(this,v,function(){t.utils.arrayRemoveItem(this._subscriptions[y],x)}.bind(this));if(!this._subscriptions[y]){this._subscriptions[y]=[]}this._subscriptions[y].push(x);return x},notifySubscribers:function(v,w){w=w||u;if(this._subscriptions[w]){t.dependencyDetection.ignore(function(){t.utils.arrayForEach(this._subscriptions[w].slice(0),function(x){if(x&&(x.isDisposed!==true)){x.callback(v)}})},this)}},getSubscriptionsCount:function(){var w=0;for(var v in this._subscriptions){if(this._subscriptions.hasOwnProperty(v)){w+=this._subscriptions[v].length}}return w},extend:s};t.isSubscribable=function(v){return typeof v.subscribe=="function"&&typeof v.notifySubscribers=="function"};t.exportSymbol("subscribable",t.subscribable);t.exportSymbol("isSubscribable",t.isSubscribable);t.dependencyDetection=(function(){var v=[];return{begin:function(w){v.push({callback:w,distinctDependencies:[]})},end:function(){v.pop()},registerDependency:function(x){if(!t.isSubscribable(x)){throw new Error("Only subscribable things can act as dependencies")}if(v.length>0){var w=v[v.length-1];if(!w||t.utils.arrayIndexOf(w.distinctDependencies,x)>=0){return}w.distinctDependencies.push(x);w.callback(x)}},ignore:function(y,w,x){try{v.push(null);return y.apply(w,x||[])}finally{v.pop()}}}})();var l={"undefined":true,"boolean":true,number:true,string:true};t.observable=function(v){var w=v;function x(){if(arguments.length>0){if((!x.equalityComparer)||!x.equalityComparer(w,arguments[0])){x.valueWillMutate();x._lastValue=w;w=arguments[0];if(a){x._latestValue=w}x.valueHasMutated();x._lastValue=w}return this}else{t.dependencyDetection.registerDependency(x);return w}}if(a){x._latestValue=w}if(typeof x._initialValue=="undefined"){x._initialValue=arguments[0]}t.subscribable.call(x);x.peek=function(){return w};x.valueHasMutated=function(){x.notifySubscribers(w)};x.valueWillMutate=function(){x.notifySubscribers(w,"beforeChange")};t.utils.extend(x,t.observable.fn);t.exportProperty(x,"peek",x.peek);t.exportProperty(x,"valueHasMutated",x.valueHasMutated);t.exportProperty(x,"valueWillMutate",x.valueWillMutate);return x};t.observable.fn={equalityComparer:function r(x,v){var w=(x===null)||(typeof(x) in l);return w?(x===v):false}};var o=t.observable.protoProperty="__ko_proto__";t.observable.fn[o]=t.observable;t.hasPrototype=function(v,w){if((v===null)||(v===f)||(v[o]===f)){return false}if(v[o]===w){return true}return t.hasPrototype(v[o],w)};t.isObservable=function(v){return t.hasPrototype(v,t.observable)};t.isWriteableObservable=function(v){if((typeof v=="function")&&v[o]===t.observable){return true}if((typeof v=="function")&&(v[o]===t.dependentObservable)&&(v.hasWriteFunction)){return true}return false};t.exportSymbol("observable",t.observable);t.exportSymbol("isObservable",t.isObservable);t.exportSymbol("isWriteableObservable",t.isWriteableObservable);t.observableArray=function(w){if(arguments.length==0){w=[]}if((w!==null)&&(w!==f)&&!("length" in w)){throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.")}var v=t.observable(w);t.utils.extend(v,t.observableArray.fn);return v};t.observableArray.fn={remove:function(x){var A=this.peek();var z=[];var v=typeof x=="function"?x:function(B){return B===x};for(var w=0;w<A.length;w++){var y=A[w];if(v(y)){if(z.length===0){this.valueWillMutate()}z.push(y);A.splice(w,1);w--}}if(z.length){this.valueHasMutated()}return z},removeAll:function(w){if(w===f){var x=this.peek();var v=x.slice(0);this.valueWillMutate();x.splice(0,x.length);this.valueHasMutated();return v}if(!w){return[]}return this["remove"](function(y){return t.utils.arrayIndexOf(w,y)>=0})},destroy:function(x){var z=this.peek();var v=typeof x=="function"?x:function(A){return A===x};this.valueWillMutate();for(var w=z.length-1;w>=0;w--){var y=z[w];if(v(y)){z[w]["_destroy"]=true}}this.valueHasMutated()},destroyAll:function(v){if(v===f){return this["destroy"](function(){return true})}if(!v){return[]}return this["destroy"](function(w){return t.utils.arrayIndexOf(v,w)>=0})},indexOf:function(v){var w=this();return t.utils.arrayIndexOf(w,v)},replace:function(x,w){var v=this["indexOf"](x);if(v>=0){this.valueWillMutate();this.peek()[v]=w;this.valueHasMutated()}}};t.utils.arrayForEach(["pop","push","reverse","shift","sort","splice","unshift"],function(v){t.observableArray.fn[v]=function(){var x=this.peek();this.valueWillMutate();var w=x[v].apply(x,arguments);this.valueHasMutated();return w}});t.utils.arrayForEach(["slice"],function(v){t.observableArray.fn[v]=function(){var w=this();return w[v].apply(w,arguments)}});t.exportSymbol("observableArray",t.observableArray);t.dependentObservable=function(y,E,w){var L,M=false,A=false,F=y;if(F&&typeof F=="object"){w=F;F=w.read}else{w=w||{};if(!F){F=w.read}}if(typeof F!="function"){throw new Error("Pass a function that returns the value of the ko.computed")}function B(Q){D.push(Q.subscribe(O))}function I(){t.utils.arrayForEach(D,function(Q){Q.dispose()});D=[]}function O(){var Q=v.throttleEvaluation;if(Q&&Q>=0){clearTimeout(C);C=setTimeout(N,Q)}else{N()}}function N(){if(A){return}if(M&&z()){P();return}A=true;try{var S=t.utils.arrayMap(D,function(T){return T.target});t.dependencyDetection.begin(function(U){var T;if((T=t.utils.arrayIndexOf(S,U))>=0){S[T]=f}else{B(U)}});var R=F.call(E);for(var Q=S.length-1;Q>=0;Q--){if(S[Q]){D.splice(Q,1)[0].dispose()}}M=true;v.notifySubscribers(L,"beforeChange");L=R;if(a){v._latestValue=L}}finally{t.dependencyDetection.end()}v.notifySubscribers(L);A=false;if(!D.length){P()}}function v(){if(arguments.length>0){if(typeof x==="function"){x.apply(E,arguments)}else{throw new Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")}return this}else{if(!M){N()}t.dependencyDetection.registerDependency(v);return L}}function G(){if(!M){N()}return L}function K(){return !M||D.length>0}var x=w.write,H=w.disposeWhenNodeIsRemoved||w.disposeWhenNodeIsRemoved||null,z=w.disposeWhen||w.disposeWhen||function(){return false},P=I,D=[],C=null;if(!E){E=w.owner}v.peek=G;v.getDependenciesCount=function(){return D.length};v.hasWriteFunction=typeof w.write==="function";v.dispose=function(){P()};v.isActive=K;t.subscribable.call(v);t.utils.extend(v,t.dependentObservable.fn);t.exportProperty(v,"peek",v.peek);t.exportProperty(v,"dispose",v.dispose);t.exportProperty(v,"isActive",v.isActive);t.exportProperty(v,"getDependenciesCount",v.getDependenciesCount);if(w.deferEvaluation!==true){N()}if(H&&K()){P=function(){t.utils.domNodeDisposal.removeDisposeCallback(H,arguments.callee);I()};t.utils.domNodeDisposal.addDisposeCallback(H,P);var J=z;z=function(){return !t.utils.domNodeIsAttachedToDocument(H)||J()}}return v};t.isComputed=function(v){return t.hasPrototype(v,t.dependentObservable)};var m=t.observable.protoProperty;t.dependentObservable[m]=t.observable;t.dependentObservable.fn={};t.dependentObservable.fn[m]=t.dependentObservable;t.exportSymbol("dependentObservable",t.dependentObservable);t.exportSymbol("computed",t.dependentObservable);t.exportSymbol("isComputed",t.isComputed);(function(){var w=10;t.toJS=function(z){if(arguments.length==0){throw new Error("When calling ko.toJS, pass the object you want to convert.")}return x(z,function(B){for(var A=0;t.isObservable(B)&&(A<w);A++){B=B()}return B})};t.toJSON=function(C,z,B){var A=t.toJS(C);return t.utils.stringifyJson(A,z,B)};function x(D,z,B){B=B||new y();D=z(D);var C=(typeof D=="object")&&(D!==null)&&(D!==f)&&(!(D instanceof Date));if(!C){return D}var A=D instanceof Array?[]:{};B.save(D,A);v(D,function(F){var E=z(D[F]);switch(typeof E){case"boolean":case"number":case"string":case"function":A[F]=E;break;case"object":case"undefined":var G=B.get(E);A[F]=(G!==f)?G:x(E,z,B);break}});return A}function v(B,C){if(B instanceof Array){for(var A=0;A<B.length;A++){C(A)}if(typeof B.toJSON=="function"){C("toJSON")}}else{for(var z in B){C(z)}}}function y(){var A=[];var z=[];this.save=function(C,D){var B=t.utils.arrayIndexOf(A,C);if(B>=0){z[B]=D}else{A.push(C);z.push(D)}};this.get=function(C){var B=t.utils.arrayIndexOf(A,C);return(B>=0)?z[B]:f}}})();t.exportSymbol("toJS",t.toJS);t.exportSymbol("toJSON",t.toJSON);(function(){var v="__ko__hasDomDataOptionValue__";t.selectExtensions={readValue:function(w){switch(t.utils.tagNameLower(w)){case"option":if(w[v]===true){return t.utils.domData.get(w,t.bindingHandlers.options.optionValueDomDataKey)}return t.utils.ieVersion<=7?(w.getAttributeNode("value").specified?w.value:w.text):w.value;case"select":return w.selectedIndex>=0?t.selectExtensions.readValue(w.options[w.selectedIndex]):f;default:return w.value}},writeValue:function(x,y){switch(t.utils.tagNameLower(x)){case"option":switch(typeof y){case"string":t.utils.domData.set(x,t.bindingHandlers.options.optionValueDomDataKey,f);if(v in x){delete x[v]}x.value=y;break;default:t.utils.domData.set(x,t.bindingHandlers.options.optionValueDomDataKey,y);x[v]=true;x.value=typeof y==="number"?y:"";break}break;case"select":for(var w=x.options.length-1;w>=0;w--){if(t.selectExtensions.readValue(x.options[w])==y){x.selectedIndex=w;break}}break;default:if((y===null)||(y===f)){y=""}x.value=y;break}}}})();t.exportSymbol("selectExtensions",t.selectExtensions);t.exportSymbol("selectExtensions.readValue",t.selectExtensions.readValue);t.exportSymbol("selectExtensions.writeValue",t.selectExtensions.writeValue);t.expressionRewriting=(function(){var A=/\@ko_token_(\d+)\@/g;var w=["true","false","null","undefined"];var z=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;function v(B,D){var C=null;while(B!=C){C=B;B=B.replace(A,function(F,E){return D[E]})}return B}function y(C){if(t.utils.arrayIndexOf(w,t.utils.stringTrim(C).toLowerCase())>=0){return false}var B=C.match(z);return B===null?false:B[1]?("Object("+B[1]+")"+B[2]):C}function x(C){var B=t.utils.stringTrim(C);switch(B.length&&B.charAt(0)){case"'":case'"':return C;default:return"'"+B+"'"}}return{bindingRewriteValidators:[],parseObjectLiteral:function(O){var L=t.utils.stringTrim(O);if(L.length<3){return[]}if(L.charAt(0)==="{"){L=L.substring(1,L.length-1)}var I=[];var B=null,D;for(var S=0;S<L.length;S++){var Q=L.charAt(S);if(B===null){switch(Q){case'"':case"'":case"/":B=S;D=Q;break}}else{if((Q==D)&&(L.charAt(S-1)!=="\\")){var E=L.substring(B,S+1);I.push(E);var M="@ko_token_"+(I.length-1)+"@";L=L.substring(0,B)+M+L.substring(S+1);S-=(E.length-M.length);B=null}}}B=null;D=null;var R=0,H=null;for(var S=0;S<L.length;S++){var Q=L.charAt(S);if(B===null){switch(Q){case"{":B=S;H=Q;D="}";break;case"(":B=S;H=Q;D=")";break;case"[":B=S;H=Q;D="]";break}}if(Q===H){R++}else{if(Q===D){R--;if(R===0){var E=L.substring(B,S+1);I.push(E);var M="@ko_token_"+(I.length-1)+"@";L=L.substring(0,B)+M+L.substring(S+1);S-=(E.length-M.length);B=null}}}}var F=[];var C=L.split(",");for(var P=0,N=C.length;P<N;P++){var J=C[P];var G=J.indexOf(":");if((G>0)&&(G<J.length-1)){var T=J.substring(0,G);var K=J.substring(G+1);F.push({key:v(T,I),value:v(K,I)})}else{F.push({unknown:v(J,I)})}}return F},preProcessBindings:function(E){var K=typeof E==="string"?t.expressionRewriting.parseObjectLiteral(E):E;var B=[],J=[];var C;for(var G=0;C=K[G];G++){if(B.length>0){B.push(",")}if(C.key){var I=x(C.key),D=C.value;B.push(I);B.push(":");B.push(D);if(D=y(t.utils.stringTrim(D))){if(J.length>0){J.push(", ")}J.push(I+" : function(__ko_value) { "+D+" = __ko_value; }")}}else{if(C.unknown){B.push(C.unknown)}}}var F=B.join("");if(J.length>0){var H=J.join("");F=F+", '_ko_property_writers' : { "+H+" } "}return F},keyValueArrayContainsKey:function(B,D){for(var C=0;C<B.length;C++){if(t.utils.stringTrim(B[C]["key"])==D){return true}}return false},writeValueToProperty:function(E,F,B,D,C){if(!E||!t.isWriteableObservable(E)){var G=F()["_ko_property_writers"];if(G&&G[B]){G[B](D)}}else{if(!C||E.peek()!==D){E(D)}}}}})();t.exportSymbol("expressionRewriting",t.expressionRewriting);t.exportSymbol("expressionRewriting.bindingRewriteValidators",t.expressionRewriting.bindingRewriteValidators);t.exportSymbol("expressionRewriting.parseObjectLiteral",t.expressionRewriting.parseObjectLiteral);t.exportSymbol("expressionRewriting.preProcessBindings",t.expressionRewriting.preProcessBindings);t.exportSymbol("jsonExpressionRewriting",t.expressionRewriting);t.exportSymbol("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",t.expressionRewriting.preProcessBindings);(function(){var x=b.createComment("test").text==="<!--test-->";var A=x?/^<!--\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*-->$/:/^\s*ko(?:\s+(.+\s*\:[\s\S]*))?\s*$/;var w=x?/^<!--\s*\/ko\s*-->$/:/^\s*\/ko\s*$/;var z={ul:true,ol:true};function v(E){return(E.nodeType==8)&&(x?E.text:E.nodeValue).match(A)}function B(E){return(E.nodeType==8)&&(x?E.text:E.nodeValue).match(w)}function y(E,H){var G=E;var I=1;var F=[];while(G=G.nextSibling){if(B(G)){I--;if(I===0){return F}}F.push(G);if(v(G)){I++}}if(!H){throw new Error("Cannot find closing comment tag to match: "+E.nodeValue)}return null}function C(E,F){var G=y(E,F);if(G){if(G.length>0){return G[G.length-1].nextSibling}return E.nextSibling}else{return null}}function D(H){var F=H.firstChild,G=null;if(F){do{if(G){G.push(F)}else{if(v(F)){var E=C(F,true);if(E){F=E}else{G=[F]}}else{if(B(F)){G=[F]}}}}while(F=F.nextSibling)}return G}t.virtualElements={allowedBindings:{},childNodes:function(E){return v(E)?y(E):E.childNodes},emptyNode:function(H){if(!v(H)){t.utils.emptyDomNode(H)}else{var G=t.virtualElements.childNodes(H);for(var F=0,E=G.length;F<E;F++){t.removeNode(G[F])}}},setDomNodeChildren:function(H,I){if(!v(H)){t.utils.setDomNodeChildren(H,I)}else{t.virtualElements.emptyNode(H);var E=H.nextSibling;for(var G=0,F=I.length;G<F;G++){E.parentNode.insertBefore(I[G],E)}}},prepend:function(E,F){if(!v(E)){if(E.firstChild){E.insertBefore(F,E.firstChild)}else{E.appendChild(F)}}else{E.parentNode.insertBefore(F,E.nextSibling)}},insertAfter:function(F,E,G){if(!G){t.virtualElements.prepend(F,E)}else{if(!v(F)){if(G.nextSibling){F.insertBefore(E,G.nextSibling)}else{F.appendChild(E)}}else{F.parentNode.insertBefore(E,G.nextSibling)}}},firstChild:function(E){if(!v(E)){return E.firstChild}if(!E.nextSibling||B(E.nextSibling)){return null}return E.nextSibling},nextSibling:function(E){if(v(E)){E=C(E)}if(E.nextSibling&&B(E.nextSibling)){return null}return E.nextSibling},virtualNodeBindingValue:function(E){var F=v(E);return F?F[1]:null},normaliseVirtualElementDomStructure:function(I){if(!z[t.utils.tagNameLower(I)]){return}var G=I.firstChild;if(G){do{if(G.nodeType===1){var H=D(G);if(H){var E=G.nextSibling;for(var F=0;F<H.length;F++){if(E){I.insertBefore(H[F],E)}else{I.appendChild(H[F])}}}}}while(G=G.nextSibling)}}}})();t.exportSymbol("virtualElements",t.virtualElements);t.exportSymbol("virtualElements.allowedBindings",t.virtualElements.allowedBindings);t.exportSymbol("virtualElements.emptyNode",t.virtualElements.emptyNode);t.exportSymbol("virtualElements.insertAfter",t.virtualElements.insertAfter);t.exportSymbol("virtualElements.prepend",t.virtualElements.prepend);t.exportSymbol("virtualElements.setDomNodeChildren",t.virtualElements.setDomNodeChildren);(function(){var w="data-bind";t.bindingProvider=function(){this.bindingCache={}};t.utils.extend(t.bindingProvider.prototype,{nodeHasBindings:function(y){switch(y.nodeType){case 1:return y.getAttribute(w)!=null;case 8:return t.virtualElements.virtualNodeBindingValue(y)!=null;default:return false}},getBindings:function(A,y){var z=this["getBindingsString"](A,y);return z?this["parseBindingsString"](z,y,A):null},getBindingsString:function(z,y){switch(z.nodeType){case 1:return z.getAttribute(w);case 8:return t.virtualElements.virtualNodeBindingValue(z);default:return null}},parseBindingsString:function(B,y,A){try{var C=v(B,this.bindingCache);return C(y,A)}catch(z){throw new Error("Unable to parse bindings.\nMessage: "+z+";\nBindings value: "+B)}}});t.bindingProvider.instance=new t.bindingProvider();function v(z,y){var A=z;return y[A]||(y[A]=x(z))}function x(A){var y=t.expressionRewriting.preProcessBindings(A),z="with($context){with($data||{}){return{"+y+"}}}";return new Function("$context","$element",z)}})();t.exportSymbol("bindingProvider",t.bindingProvider);(function(){t.bindingHandlers={};t.bindingContext=function(B,A,C){if(A){t.utils.extend(this,A);this["$parentContext"]=A;this["$parent"]=A["$data"];this["$parents"]=(A["$parents"]||[]).slice(0);this["$parents"].unshift(this["$parent"])}else{this["$parents"]=[];this["$root"]=B;this["ko"]=t}this["$data"]=B;if(C){this[C]=B}};t.bindingContext.prototype.createChildContext=function(A,B){return new t.bindingContext(A,this,B)};t.bindingContext.prototype.extend=function(A){var B=t.utils.extend(new t.bindingContext(),this);return t.utils.extend(B,A)};function z(B){var A=t.virtualElements.allowedBindings[B];if(!A){throw new Error("The binding '"+B+"' cannot be used with virtual elements")}}function x(B,E,A){var C,D=t.virtualElements.firstChild(E);while(C=D){D=t.virtualElements.nextSibling(C);w(B,C,A)}}function w(B,A,E){var F=true;var D=(A.nodeType===1);if(D){t.virtualElements.normaliseVirtualElementDomStructure(A)}var C=(D&&E)||t.bindingProvider.instance["nodeHasBindings"](A);if(C){F=v(A,null,B,E).shouldBindDescendants}if(F){x(B,A,!D)}}function v(D,B,F,A){var H=0;var E;function C(J){return function(){return E[J]}}function I(){return E}var G;t.dependentObservable(function(){var S=F&&(F instanceof t.bindingContext)?F:new t.bindingContext(t.utils.unwrapObservable(F));var P=S["$data"];if(A){t.storedBindingContextForNode(D,S)}var Q=(typeof B=="function")?B(S,D):B;E=Q||t.bindingProvider.instance["getBindings"](D,S);if(E){if(H===0){H=1;var O=true;for(var R in E){var M=t.bindingHandlers[R];if(M&&D.nodeType===8){z(R)}if(M&&typeof M.init=="function"){var K=M.init;var J=K(D,C(R),I,P,S);if(J&&J.controlsDescendantBindings){if(G!==f){throw new Error("Multiple bindings ("+G+" and "+R+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")}G=R}}}H=2}if(H===2){if(O){for(var R in E){var N=E[R];var M=t.bindingHandlers[R];if(M&&typeof M.update=="function"){var L=M.update;L(D,C(R),I,P,S)}}}else{for(var R in E){var N=E[R];if((N&&N.equalityComparer&&N.equalityComparer(t.utils.unwrapObservable(N),N._lastValue))||true){var M=t.bindingHandlers[R];if(M&&typeof M.update=="function"){var L=M.update;L(D,C(R),I,P,S)}}}}}}},null,{disposeWhenNodeIsRemoved:D});return{shouldBindDescendants:G===f}}var y="__ko_bindingContext__";t.storedBindingContextForNode=function(B,A){if(arguments.length==2){t.utils.domData.set(B,y,A)}else{return t.utils.domData.get(B,y)}};t.applyBindingsToNode=function(B,C,A){if(B.nodeType===1){t.virtualElements.normaliseVirtualElementDomStructure(B)}return v(B,C,A,true)};t.applyBindingsToDescendants=function(B,A){if(A.nodeType===1||A.nodeType===8){x(B,A,true)}};t.applyBindings=function(B,A){if(A&&(A.nodeType!==1)&&(A.nodeType!==8)){throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node")}A=A||d.document.body;w(B,A,true)};t.contextFor=function(B){switch(B.nodeType){case 1:case 8:var A=t.storedBindingContextForNode(B);if(A){return A}if(B.parentNode){return t.contextFor(B.parentNode)}break}return f};t.dataFor=function(B){var A=t.contextFor(B);return A?A["$data"]:f};t.exportSymbol("bindingHandlers",t.bindingHandlers);t.exportSymbol("applyBindings",t.applyBindings);t.exportSymbol("applyBindingsToDescendants",t.applyBindingsToDescendants);t.exportSymbol("applyBindingsToNode",t.applyBindingsToNode);t.exportSymbol("contextFor",t.contextFor);t.exportSymbol("dataFor",t.dataFor)})();var i={"class":"className","for":"htmlFor"};t.bindingHandlers.attr={update:function(w,y,B){var z=t.utils.unwrapObservable(y())||{};for(var v in z){if(typeof v=="string"){var A=t.utils.unwrapObservable(z[v]);var x=(A===false)||(A===null)||(A===f);if(x){w.removeAttribute(v)}if(t.utils.ieVersion<=8&&v in i){v=i[v];if(x){w.removeAttribute(v)}else{w[v]=A}}else{if(!x){w.setAttribute(v,A.toString())}}if(v==="name"){t.utils.setElementName(w,x?"":A.toString())}}}}};t.bindingHandlers.checked={init:function(v,x,y){var w=function(){var C;if(v.type=="checkbox"){C=v.checked}else{if((v.type=="radio")&&(v.checked)){C=v.value}else{return}}var A=x(),z=t.utils.unwrapObservable(A);if((v.type=="checkbox")&&(z instanceof Array)){var B=t.utils.arrayIndexOf(z,v.value);if(v.checked&&(B<0)){A.push(v.value)}else{if((!v.checked)&&(B>=0)){A.splice(B,1)}}}else{t.expressionRewriting.writeValueToProperty(A,y,"checked",C,true)}};t.utils.registerEventHandler(v,"click",w);if((v.type=="radio")&&!v.name){t.bindingHandlers.uniqueName["init"](v,function(){return true})}},update:function(v,w){var x=t.utils.unwrapObservable(w());if(v.type=="checkbox"){if(x instanceof Array){v.checked=t.utils.arrayIndexOf(x,v.value)>=0}else{v.checked=x}}else{if(v.type=="radio"){v.checked=(v.value==x)}}}};var k="__ko__cssValue";t.bindingHandlers.css={update:function(w,y){var z=t.utils.unwrapObservable(y());if(typeof z=="object"){for(var x in z){var v=t.utils.unwrapObservable(z[x]);t.utils.toggleDomNodeCssClass(w,x,v)}}else{z=String(z||"");t.utils.toggleDomNodeCssClass(w,w[k],false);w[k]=z;t.utils.toggleDomNodeCssClass(w,z,true)}}};t.bindingHandlers.enable={update:function(v,w){var x=t.utils.unwrapObservable(w());if(x&&v.disabled){v.removeAttribute("disabled")}else{if((!x)&&(!v.disabled)){v.disabled=true}}}};t.bindingHandlers.disable={update:function(v,w){t.bindingHandlers.enable["update"](v,function(){return !t.utils.unwrapObservable(w())})}};function q(v){t.bindingHandlers[v]={init:function(y,z,A,x){var w=function(){var B={};B[v]=z();return B};return t.bindingHandlers.event["init"].call(this,y,w,A,x)}}}t.bindingHandlers.event={init:function(w,z,A,v){var x=z()||{};for(var y in x){(function(){var B=y;if(typeof B=="string"){t.utils.registerEventHandler(w,B,function(E){var H;var G=z()[B];if(!G){return}var F=A();try{var D=t.utils.makeArray(arguments);D.unshift(v);H=G.apply(v,D)}finally{if(H!==true){if(E.preventDefault){E.preventDefault()}else{E.returnValue=false}}}var C=F[B+"Bubble"]!==false;if(!C){E.cancelBubble=true;if(E.stopPropagation){E.stopPropagation()}}})}})()}}};t.bindingHandlers.foreach={makeTemplateValueAccessor:function(v){return function(){var x=v(),w=t.utils.peekObservable(x);if((!w)||typeof w.length=="number"){return{foreach:x,templateEngine:t.nativeTemplateEngine.instance}}t.utils.unwrapObservable(x);return{foreach:w.data,as:w.as,includeDestroyed:w.includeDestroyed,afterAdd:w.afterAdd,beforeRemove:w.beforeRemove,afterRender:w.afterRender,beforeMove:w.beforeMove,afterMove:w.afterMove,templateEngine:t.nativeTemplateEngine.instance}}},init:function(x,y,z,w,v){return t.bindingHandlers.template["init"](x,t.bindingHandlers.foreach.makeTemplateValueAccessor(y))},update:function(x,y,z,w,v){return t.bindingHandlers.template["update"](x,t.bindingHandlers.foreach.makeTemplateValueAccessor(y),z,w,v)}};t.expressionRewriting.bindingRewriteValidators.foreach=false;t.virtualElements.allowedBindings.foreach=true;var n="__ko_hasfocusUpdating";t.bindingHandlers.hasfocus={init:function(x,y,z){var w=function(B){x[n]=true;var D=x.ownerDocument;if("activeElement" in D){B=(D.activeElement===x)}var C=y();t.expressionRewriting.writeValueToProperty(C,z,"hasfocus",B,true);x[n]=false};var A=w.bind(null,true);var v=w.bind(null,false);t.utils.registerEventHandler(x,"focus",A);t.utils.registerEventHandler(x,"focusin",A);t.utils.registerEventHandler(x,"blur",v);t.utils.registerEventHandler(x,"focusout",v)},update:function(v,w){var x=t.utils.unwrapObservable(w());if(!v[n]){x?v.focus():v.blur();t.dependencyDetection.ignore(t.utils.triggerEvent,null,[v,x?"focusin":"focusout"])}}};t.bindingHandlers.html={init:function(){return{controlsDescendantBindings:true}},update:function(w,x,z,v,B){var y=t.utils.unwrapObservable(x()),A;if(typeof y=="function"){A=y(t.mapping.toJS(B.$data))}else{A=y}t.utils.setHtml(w,A)}};var p="__ko_withIfBindingData";function h(x,v,w,y){t.bindingHandlers[x]={init:function(B,C,D,A,z){t.utils.domData.set(B,p,{});return{controlsDescendantBindings:true}},update:function(E,G,D,H,F){var B=t.utils.domData.get(E,p),A=t.utils.unwrapObservable(G()),z=!w!==!A,I=!B.savedNodes,C=I||v||(z!==B.didDisplayOnLastUpdate);if(C){if(I){B.savedNodes=t.utils.cloneNodes(t.virtualElements.childNodes(E),true)}if(z){if(!I){t.virtualElements.setDomNodeChildren(E,t.utils.cloneNodes(B.savedNodes))}t.applyBindingsToDescendants(y?y(F,A):F,E)}else{t.virtualElements.emptyNode(E)}B.didDisplayOnLastUpdate=z}}};t.expressionRewriting.bindingRewriteValidators[x]=false;t.virtualElements.allowedBindings[x]=true}h("if");h("ifnot",false,true);h("with",true,false,function(v,w){return v.createChildContext(w)});function g(x,w,v){if(v){if(w!==t.selectExtensions.readValue(x)){t.selectExtensions.writeValue(x,w)}}if(w!==t.selectExtensions.readValue(x)){t.dependencyDetection.ignore(t.utils.triggerEvent,null,[x,"change"])}}t.bindingHandlers.options={update:function(x,C,A){if(t.utils.tagNameLower(x)!=="select"){throw new Error("options binding applies only to SELECT elements")}var K=x.length==0;var w=t.utils.arrayMap(t.utils.arrayFilter(x.childNodes,function(O){return O.tagName&&(t.utils.tagNameLower(O)==="option")&&O.selected}),function(O){return t.selectExtensions.readValue(O)||O.innerText||O.textContent});var E=x.scrollTop;var I=t.utils.unwrapObservable(C());var F=x.value;while(x.length>0){t.cleanNode(x.options[0]);x.remove(0)}if(I){var B=A(),v=B.optionsIncludeDestroyed;if(typeof I.length!="number"){I=[I]}if(B.optionsCaption){var G=b.createElement("option");t.utils.setHtml(G,B.optionsCaption);t.selectExtensions.writeValue(G,f);x.appendChild(G)}for(var M=0,L=I.length;M<L;M++){var D=I[M];if(D&&D._destroy&&!v){continue}var G=b.createElement("option");function N(R,O,Q){var P=typeof O;if(P=="function"){return O(R)}else{if(P=="string"){return R[O]}else{return Q}}}var H=N(D,B.optionsValue,D);t.selectExtensions.writeValue(G,t.utils.unwrapObservable(H));var y=N(D,B.optionsText,H);t.utils.setTextContent(G,y);x.appendChild(G)}var z=x.getElementsByTagName("option");var J=0;for(var M=0,L=z.length;M<L;M++){if(t.utils.arrayIndexOf(w,t.selectExtensions.readValue(z[M]))>=0){t.utils.setOptionNodeSelectionState(z[M],true);J++}}x.scrollTop=E;if(K&&("value" in B)){g(x,t.utils.peekObservable(B.value),true)}t.utils.ensureSelectElementIsRenderedCorrectly(x)}}};t.bindingHandlers.options.optionValueDomDataKey="__ko.optionValueDomData__";t.bindingHandlers.selectedOptions={init:function(v,w,x){t.utils.registerEventHandler(v,"change",function(){var z=w(),y=[];t.utils.arrayForEach(v.getElementsByTagName("option"),function(A){if(A.selected){y.push(t.selectExtensions.readValue(A))}});t.expressionRewriting.writeValueToProperty(z,x,"value",y)})},update:function(v,w){if(t.utils.tagNameLower(v)!="select"){throw new Error("values binding applies only to SELECT elements")}var x=t.utils.unwrapObservable(w());if(x&&typeof x.length=="number"){t.utils.arrayForEach(v.getElementsByTagName("option"),function(z){var y=t.utils.arrayIndexOf(x,t.selectExtensions.readValue(z))>=0;t.utils.setOptionNodeSelectionState(z,y)})}}};t.bindingHandlers.style={update:function(x,y){var z=t.utils.unwrapObservable(y()||{});for(var w in z){if(typeof w=="string"){var v=t.utils.unwrapObservable(z[w]);x.style[w]=v||""}}}};t.bindingHandlers.submit={init:function(w,x,y,v){if(typeof x()!="function"){throw new Error("The value for a submit binding must be a function")}t.utils.registerEventHandler(w,"submit",function(z){var B;var A=x();try{B=A.call(v,w)}finally{if(B!==true){if(z.preventDefault){z.preventDefault()}else{z.returnValue=false}}}})}};t.bindingHandlers.text={update:function(w,x,z,v,B){var y=t.utils.unwrapObservable(x()),A;if(typeof y=="function"){A=y(t.mapping.toJS(B.$data))}else{A=y}t.utils.setTextContent(w,A)}};t.virtualElements.allowedBindings.text=true;t.bindingHandlers.uniqueName={init:function(w,x){if(x()){var v="ko_unique_"+(++t.bindingHandlers.uniqueName.currentIndex);t.utils.setElementName(w,v)}}};t.bindingHandlers.uniqueName.currentIndex=0;t.bindingHandlers.value={init:function(x,z,B){var y=["change"];var w=B()["valueUpdate"];var A=false;if(w){if(typeof w=="string"){w=[w]}t.utils.arrayPushAll(y,w);y=t.utils.arrayGetDistinctValues(y)}var v=function(){A=false;var D=z();var E=t.selectExtensions.readValue(x);t.expressionRewriting.writeValueToProperty(D,B,"value",E)};var C=t.utils.ieVersion&&x.tagName.toLowerCase()=="input"&&x.type=="text"&&x.autocomplete!="off"&&(!x.form||x.form.autocomplete!="off");if(C&&t.utils.arrayIndexOf(y,"propertychange")==-1){t.utils.registerEventHandler(x,"propertychange",function(){A=true});t.utils.registerEventHandler(x,"blur",function(){if(A){v()}})}t.utils.arrayForEach(y,function(D){var E=v;if(t.utils.stringStartsWith(D,"after")){E=function(){setTimeout(v,0)};D=D.substring("after".length)}t.utils.registerEventHandler(x,D,E)})},update:function(x,z){var w=t.utils.tagNameLower(x)==="select";var A=t.utils.unwrapObservable(z());var C=t.selectExtensions.readValue(x);var y=(A!=C);if((A===0)&&(C!==0)&&(C!=="0")){y=true}if(y){var B=function(){t.selectExtensions.writeValue(x,A)};B();var v=w;if(v){setTimeout(B,0)}}if(w&&(x.length>0)){g(x,A,false)}}};t.bindingHandlers.visible={update:function(w,x){var y=t.utils.unwrapObservable(x());var v=!(w.style.display=="none");if(y&&!v){w.style.display=""}else{if((!y)&&v){w.style.display="none"}}}};q("click");t.templateEngine=function(){};t.templateEngine.prototype.renderTemplateSource=function(v,w,x){throw new Error("Override renderTemplateSource")};t.templateEngine.prototype.createJavaScriptEvaluatorBlock=function(v){throw new Error("Override createJavaScriptEvaluatorBlock")};t.templateEngine.prototype.makeTemplateSource=function(w,v){if(typeof w=="string"){v=v||b;var x=v.getElementById(w);if(!x){throw new Error("Cannot find template with ID "+w)}return new t.templateSources.domElement(x)}else{if((w.nodeType==1)||(w.nodeType==8)){return new t.templateSources.anonymousTemplate(w)}else{throw new Error("Unknown template type: "+w)}}};t.templateEngine.prototype.renderTemplate=function(z,w,x,y){var v=this["makeTemplateSource"](z,y);return this["renderTemplateSource"](v,w,x)};t.templateEngine.prototype.isTemplateRewritten=function(w,v){if(this["allowTemplateRewriting"]===false){return true}return this["makeTemplateSource"](w,v)["data"]("isRewritten")};t.templateEngine.prototype.rewriteTemplate=function(y,w,x){var v=this["makeTemplateSource"](y,x);var z=w(v.text());v.text(z);v.data("isRewritten",true)};t.exportSymbol("templateEngine",t.templateEngine);t.templateRewriting=(function(){var v=/(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi;var y=/<!--\s*ko\b\s*([\s\S]*?)\s*-->/g;function x(z){var A=t.expressionRewriting.bindingRewriteValidators;for(var D=0;D<z.length;D++){var C=z[D]["key"];if(A.hasOwnProperty(C)){var B=A[C];if(typeof B==="function"){var E=B(z[D]["value"]);if(E){throw new Error(E)}}else{if(!B){throw new Error("This template engine does not support the '"+C+"' binding within its templates")}}}}}function w(B,A,C){var z=t.expressionRewriting.parseObjectLiteral(B);x(z);var E=t.expressionRewriting.preProcessBindings(z);var D="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+E+" } })()})";return C.createJavaScriptEvaluatorBlock(D)+A}return{ensureTemplateIsRewritten:function(A,B,z){if(!B.isTemplateRewritten(A,z)){B.rewriteTemplate(A,function(C){return t.templateRewriting.memoizeBindingAttributeSyntax(C,B)},z)}},memoizeBindingAttributeSyntax:function(z,A){return z.replace(v,function(){return w(arguments[6],arguments[1],A)}).replace(y,function(){return w(arguments[1],"<!-- ko -->",A)})},applyMemoizedBindingsToNextSibling:function(z){return t.memoization.memoize(function(B,A){if(B.nextSibling){t.applyBindingsToNode(B.nextSibling,z,A)}})}}})();t.exportSymbol("__tr_ambtns",t.templateRewriting.applyMemoizedBindingsToNextSibling);(function(){t.templateSources={};t.templateSources.domElement=function(w){this.domElement=w};t.templateSources.domElement.prototype.text=function(){var w=t.utils.tagNameLower(this.domElement),y=w==="script"?"text":w==="textarea"?"value":"innerHTML";if(arguments.length==0){return this.domElement[y]}else{var x=arguments[0];if(y==="innerHTML"){t.utils.setHtml(this.domElement,x)}else{this.domElement[y]=x}}};t.templateSources.domElement.prototype.data=function(w){if(arguments.length===1){return t.utils.domData.get(this.domElement,"templateSourceData_"+w)}else{t.utils.domData.set(this.domElement,"templateSourceData_"+w,arguments[1])}};var v="__ko_anon_template__";t.templateSources.anonymousTemplate=function(w){this.domElement=w};t.templateSources.anonymousTemplate.prototype=new t.templateSources.domElement();t.templateSources.anonymousTemplate.prototype.text=function(){if(arguments.length==0){var x=t.utils.domData.get(this.domElement,v)||{};if(x.textData===f&&x.containerData){x.textData=x.containerData.innerHTML}return x.textData}else{var w=arguments[0];t.utils.domData.set(this.domElement,v,{textData:w})}};t.templateSources.domElement.prototype.nodes=function(){if(arguments.length==0){var x=t.utils.domData.get(this.domElement,v)||{};return x.containerData}else{var w=arguments[0];t.utils.domData.set(this.domElement,v,{containerData:w})}};t.exportSymbol("templateSources",t.templateSources);t.exportSymbol("templateSources.domElement",t.templateSources.domElement);t.exportSymbol("templateSources.anonymousTemplate",t.templateSources.anonymousTemplate)})();(function(){var y;t.setTemplateEngine=function(C){if((C!=f)&&!(C instanceof t.templateEngine)){throw new Error("templateEngine must inherit from ko.templateEngine")}y=C};function w(F,D,E){var C,G=F,H=t.virtualElements.nextSibling(D);while(G&&((C=G)!==H)){G=t.virtualElements.nextSibling(C);if(C.nodeType===1||C.nodeType===8){E(C)}}}function x(D,C){if(D.length){var F=D[0],E=D[D.length-1];w(F,E,function(G){t.applyBindings(C,G)});w(F,E,function(G){t.memoization.unmemoizeDomNodeAndDescendants(G,[C])})}}function v(C){return C.nodeType?C:C.length>0?C[0]:null}function B(C,K,J,F,L){L=L||{};var H=C&&v(C);var D=H&&H.ownerDocument;var G=(L.templateEngine||y);t.templateRewriting.ensureTemplateIsRewritten(J,G,D);var I=G.renderTemplate(J,F,L,D);if((typeof I.length!="number")||(I.length>0&&typeof I[0].nodeType!="number")){throw new Error("Template engine must return an array of DOM nodes")}var E=false;switch(K){case"replaceChildren":t.virtualElements.setDomNodeChildren(C,I);E=true;break;case"replaceNode":t.utils.replaceDomNodes(C,I);E=true;break;case"ignoreTargetNode":break;default:throw new Error("Unknown renderMode: "+K)}if(E){x(I,F);if(L.afterRender){t.dependencyDetection.ignore(L.afterRender,null,[I,F["$data"]])}}return I}t.renderTemplate=function(G,I,E,H,J){E=E||{};if((E.templateEngine||y)==f){throw new Error("Set a template engine before calling renderTemplate")}J=J||"replaceChildren";if(H){var F=v(H);var D=function(){return(!F)||!t.utils.domNodeIsAttachedToDocument(F)};var C=(F&&J=="replaceNode")?F.parentNode:F;return t.dependentObservable(function(){var L=(I&&(I instanceof t.bindingContext))?I:new t.bindingContext(t.utils.unwrapObservable(I));var K=typeof(G)=="function"?G(L["$data"],L):G;var M=B(H,J,K,L,E);if(J=="replaceNode"){H=M;F=v(H)}},null,{disposeWhen:D,disposeWhenNodeIsRemoved:C})}else{return t.memoization.memoize(function(K){t.renderTemplate(G,I,E,K,"replaceNode")})}};t.renderTemplateForEach=function(H,I,F,J,D){var G;var E=function(M,L){G=D.createChildContext(t.utils.unwrapObservable(M),F.as);G["$index"]=L;var K=typeof(H)=="function"?H(M,G):H;return B(null,"ignoreTargetNode",K,G,F)};var C=function(L,M,K){x(M,G);if(F.afterRender){F.afterRender(M,L,K)}};return t.dependentObservable(function(){var K=t.utils.unwrapObservable(I)||[];if(typeof K.length=="undefined"){K=[K]}var L=t.utils.arrayFilter(K,function(M){return F.includeDestroyed||M===f||M===null||!t.utils.unwrapObservable(M._destroy)});t.dependencyDetection.ignore(t.utils.setDomNodeChildrenFromArrayMapping,null,[J,L,E,F,C])},null,{disposeWhenNodeIsRemoved:J})};var z="__ko__templateComputedDomDataKey__";function A(E,D){var C=t.utils.domData.get(E,z);if(C&&(typeof(C.dispose)=="function")){C.dispose()}t.utils.domData.set(E,z,(D&&D.isActive())?D:f)}t.bindingHandlers.template={init:function(E,G){var C=t.utils.unwrapObservable(G());if((typeof C!="string")&&(!C.name)&&(E.nodeType==1||E.nodeType==8)){var F=E.nodeType==1?E.childNodes:t.virtualElements.childNodes(E),D=t.utils.moveCleanedNodesToContainerElement(F);new t.templateSources.anonymousTemplate(E)["nodes"](D)}return{controlsDescendantBindings:true}},update:function(F,H,E,L,G){var M=t.utils.unwrapObservable(H()),N={},D=true,C,J=null;if(typeof M!="string"){N=M;M=N.name;if("if" in N){D=t.utils.unwrapObservable(N["if"])}if(D&&"ifnot" in N){D=!t.utils.unwrapObservable(N.ifnot)}C=t.utils.unwrapObservable(N.data)}if("foreach" in N){var K=(D&&N.foreach)||[];J=t.renderTemplateForEach(M||F,K,N,F,G)}else{if(!D){t.virtualElements.emptyNode(F)}else{var I=("data" in N)?G.createChildContext(C,N.as):G;J=t.renderTemplate(M||F,I,N,F)}}A(F,J)}};t.expressionRewriting.bindingRewriteValidators.template=function(C){var D=t.expressionRewriting.parseObjectLiteral(C);if((D.length==1)&&D[0]["unknown"]){return null}if(t.expressionRewriting.keyValueArrayContainsKey(D,"name")){return null}return"This template engine does not support anonymous templates nested within its templates"};t.virtualElements.allowedBindings.template=true})();t.exportSymbol("setTemplateEngine",t.setTemplateEngine);t.exportSymbol("renderTemplate",t.renderTemplate);t.utils.compareArrays=(function(){var w="added",x="deleted";function y(B,z,A){B=B||[];z=z||[];if(B.length<=z.length){return v(B,z,w,x,A)}else{return v(z,B,x,w,A)}}function v(R,W,J,Y,S){var E=Math.min,F=Math.max,A=[],O,aa=R.length,V,D=W.length,ac=(D-aa)||1,I=aa+D+1,T,Q,M,P;for(O=0;O<=aa;O++){Q=T;A.push(T=[]);M=E(D,O+ac);P=F(0,O-1);for(V=P;V<=M;V++){if(!V){T[V]=O+1}else{if(!O){T[V]=V+1}else{if(R[O-1]===W[V-1]){T[V]=Q[V-1]}else{var L=Q[V]||I;var Z=T[V-1]||I;T[V]=E(L,Z)+1}}}}}var C=[],B,N=[],z=[];for(O=aa,V=D;O||V;){B=A[O][V]-1;if(V&&B===A[O][V-1]){N.push(C[C.length]={status:J,value:W[--V],index:V})}else{if(O&&B===A[O-1][V]){z.push(C[C.length]={status:Y,value:R[--O],index:O})}else{C.push({status:"retained",value:W[--V]});--O}}}if(N.length&&z.length){var K=aa*10,U,ab,X,H,G;for(U=ab=0;(S||U<K)&&(H=N[ab]);ab++){for(X=0;G=z[X];X++){if(H.value===G.value){H.moved=G.index;G.moved=H.index;z.splice(X,1);U=X=0;break}}U+=X}}return C.reverse()}return y})();t.exportSymbol("utils.compareArrays",t.utils.compareArrays);(function(){function x(A){while(A.length&&!t.utils.domNodeIsAttachedToDocument(A[0])){A.splice(0,1)}if(A.length>1){var B=A[0],y=A[A.length-1],z=[B];while(B!==y){B=B.nextSibling;if(!B){return}z.push(B)}Array.prototype.splice.apply(A,[0,A.length].concat(z))}return A}function w(y,B,E,D,A){var z=[];var C=t.dependentObservable(function(){var F=B(E,A)||[];if(z.length>0){t.utils.replaceDomNodes(x(z),F);if(D){t.dependencyDetection.ignore(D,null,[E,F,A])}}z.splice(0,z.length);t.utils.arrayPushAll(z,F)},null,{disposeWhenNodeIsRemoved:y,disposeWhen:function(){return(z.length==0)||!t.utils.domNodeIsAttachedToDocument(z[0])}});return{mappedNodes:z,dependentObservable:(C.isActive()?C:f)}}var v="setDomNodeChildrenFromArrayMapping_lastMappingResult";t.utils.setDomNodeChildrenFromArrayMapping=function(X,G,H,B,K){G=G||[];B=B||{};var V=t.utils.domData.get(X,v)===f;var J=t.utils.domData.get(X,v)||[];var W=t.utils.arrayMap(J,function(Z){return Z.arrayEntry});var D=t.utils.compareArrays(W,G);var P=[];var Y=0;var I=0;var L=[];var O=[];var C=[];var Q=[];var A=[];var N;function M(Z,aa){N=J[aa];if(I!==aa){Q[Z]=N}N.indexObservable(I++);x(N.mappedNodes);P.push(N);O.push(N)}function z(ac,Z){if(ac){for(var aa=0,ab=Z.length;aa<ab;aa++){if(Z[aa]){t.utils.arrayForEach(Z[aa].mappedNodes,function(ad){ac(ad,aa,Z[aa].arrayEntry)})}}}}for(var U=0,F,S;F=D[U];U++){S=F.moved;switch(F.status){case"deleted":if(S===f){N=J[Y];if(N.dependentObservable){N.dependentObservable.dispose()}L.push.apply(L,x(N.mappedNodes));if(B.beforeRemove){C[U]=N;O.push(N)}}Y++;break;case"retained":M(U,Y++);break;case"added":if(S!==f){M(U,S)}else{N={arrayEntry:F.value,indexObservable:t.observable(I++)};P.push(N);O.push(N);if(!V){A[U]=N}}break}}z(B.beforeMove,Q);t.utils.arrayForEach(L,B.beforeRemove?t.cleanNode:t.removeNode);for(var U=0,y=t.virtualElements.firstChild(X),E,R;N=O[U];U++){if(!N.mappedNodes){t.utils.extend(N,w(X,H,N.arrayEntry,K,N.indexObservable))}for(var T=0;R=N.mappedNodes[T];y=R.nextSibling,E=R,T++){if(R!==y){t.virtualElements.insertAfter(X,R,E)}}if(!N.initialized&&K){K(N.arrayEntry,N.mappedNodes,N.indexObservable);N.initialized=true}}z(B.beforeRemove,C);z(B.afterMove,Q);z(B.afterAdd,A);t.utils.domData.set(X,v,P)}})();t.exportSymbol("utils.setDomNodeChildrenFromArrayMapping",t.utils.setDomNodeChildrenFromArrayMapping);t.nativeTemplateEngine=function(){this["allowTemplateRewriting"]=false};t.nativeTemplateEngine.prototype=new t.templateEngine();t.nativeTemplateEngine.prototype.renderTemplateSource=function(v,w,x){var A=!(t.utils.ieVersion<9),B=A?v.nodes:null,y=B?v.nodes():null;if(y){return t.utils.makeArray(y.cloneNode(true).childNodes)}else{var z=v.text();return t.utils.parseHtmlFragment(z)}};t.nativeTemplateEngine.instance=new t.nativeTemplateEngine();t.setTemplateEngine(t.nativeTemplateEngine.instance);t.exportSymbol("nativeTemplateEngine",t.nativeTemplateEngine);(function(){t.jqueryTmplTemplateEngine=function(){var x=this.jQueryTmplVersion=(function(){if((typeof(e)=="undefined")||!(e.tmpl)){return 0}try{if(e.tmpl["tag"]["tmpl"]["open"].toString().indexOf("__")>=0){return 2}}catch(z){}return 1})();function w(){if(x<2){throw new Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.")}}function y(A,B,z){return e.tmpl(A,B,z)}this["renderTemplateSource"]=function(A,B,C){C=C||{};w();var F=A.data("precompiled");if(!F){var E=A.text()||"";E="{{ko_with $item.koBindingContext}}"+E+"{{/ko_with}}";F=e.template(null,E);A.data("precompiled",F)}var D=[B["$data"]];var z=e.extend({koBindingContext:B},C.templateOptions);var G=y(F,D,z);G.appendTo(b.createElement("div"));e.fragments={};return G};this["createJavaScriptEvaluatorBlock"]=function(z){return"{{ko_code ((function() { return "+z+" })()) }}"};this["addTemplate"]=function(z,A){b.write("<script type='text/html' id='"+z+"'>"+A+"<\/script>")};if(x>0){e.tmpl["tag"]["ko_code"]={open:"__.push($1 || '');"};e.tmpl["tag"]["ko_with"]={open:"with($1) {",close:"} "}}};t.jqueryTmplTemplateEngine.prototype=new t.templateEngine();var v=new t.jqueryTmplTemplateEngine();if(v.jQueryTmplVersion>0){t.setTemplateEngine(v)}t.exportSymbol("jqueryTmplTemplateEngine",t.jqueryTmplTemplateEngine)})()})})(window,document,navigator,window.jQuery)})();(function(a){if(typeof require==="function"&&typeof exports==="object"&&typeof module==="object"){a(require("knockout"),exports)}else{if(typeof define==="function"&&define.amd){define(["knockout","exports"],a)}else{a(ko,ko.mapping={})}}}(function(b,H){var e=true;var r="__ko_mapping__";var l=b.dependentObservable;var v=0;var q;var A;var a=["create","update","key","arrayChanged"];var w={};var k={include:["_destroy"],ignore:[],copy:[],observe:[]};var B=k;function t(I,N){var M={};for(var L=I.length-1;L>=0;--L){M[I[L]]=I[L]}for(var L=N.length-1;L>=0;--L){M[N[L]]=N[L]}var K=[];for(var J in M){K.push(M[J])}return K}function u(I,L){var M;for(var J in L){if(L.hasOwnProperty(J)&&L[J]){M=H.getType(I[J]);if(J&&I[J]&&M!=="array"&&M!=="string"){u(I[J],L[J])}else{var K=H.getType(I[J])==="array"&&H.getType(L[J])==="array";if(K){I[J]=t(I[J],L[J])}else{I[J]=L[J]}}}}}function j(K,J){var I={};u(I,K);u(I,J);return I}H.isMapped=function(J){var I=b.utils.unwrapObservable(J);return I&&I[r]};H.fromJS=function(J){if(arguments.length==0){throw new Error("When calling ko.fromJS, pass the object you want to convert.")}try{if(!v++){q=[];A=new d()}var L;var N;if(arguments.length==2){if(arguments[1][r]){N=arguments[1]}else{L=arguments[1]}}if(arguments.length==3){L=arguments[1];N=arguments[2]}if(N){L=j(L,N[r])}L=x(L,null,J);var I=C(N,J,L);if(N){I=N}if(!--v){while(q.length){var K=q.pop();if(K){K();K.__DO.throttleEvaluation=K.throttleEvaluation}}}I[r]=j(I[r],L);return I}catch(M){v=0;throw M}};H.fromJSON=function(J){var I=b.utils.parseJson(J);arguments[0]=I;return H.fromJS.apply(this,arguments)};H.updateFromJS=function(I){throw new Error("ko.mapping.updateFromJS, use ko.mapping.fromJS instead. Please note that the order of parameters is different!")};H.updateFromJSON=function(I){throw new Error("ko.mapping.updateFromJSON, use ko.mapping.fromJSON instead. Please note that the order of parameters is different!")};H.toJS=function(J,I){if(!B){H.resetDefaultOptions()}if(arguments.length==0){throw new Error("When calling ko.mapping.toJS, pass the object you want to convert.")}if(H.getType(B.ignore)!=="array"){throw new Error("ko.mapping.defaultOptions().ignore should be an array.")}if(H.getType(B.include)!=="array"){throw new Error("ko.mapping.defaultOptions().include should be an array.")}if(H.getType(B.copy)!=="array"){throw new Error("ko.mapping.defaultOptions().copy should be an array.")}I=x(I,J[r]);return H.visitModel(J,function(K){return b.utils.unwrapObservable(K)},I)};H.toJSON=function(K,I){var J=H.toJS(K,I);return b.utils.stringifyJson(J)};H.defaultOptions=function(){if(arguments.length>0){B=arguments[0]}else{return B}};H.resetDefaultOptions=function(){B={include:k.include.slice(0),ignore:k.ignore.slice(0),copy:k.copy.slice(0)}};H.getType=function(I){if((I)&&(typeof(I)==="object")){if(I.constructor===Date){return"date"}if(I.constructor===Array){return"array"}}return typeof I};function x(N,K,I){var L=j({},N);for(var M=a.length-1;M>=0;M--){var O=a[M];if(!L[O]){continue}if(!(L[""] instanceof Object)){L[""]={}}L[""][O]=L[O];delete L[O]}if(K){L.ignore=n(K.ignore,L.ignore);L.include=n(K.include,L.include);L.copy=n(K.copy,L.copy);L.observe=n(K.observe,L.observe);L.ignoreExp=n(K.ignoreExp,L.ignoreExp);L.includeExp=n(K.includeExp,L.includeExp);L.copyExp=n(K.copyExp,L.copyExp);L.observeExp=n(K.observeExp,L.observeExp)}L.ignore=n(L.ignore,B.ignore);L.include=n(L.include,B.include);L.copy=n(L.copy,B.copy);L.observe=n(L.observe,B.observe);if(typeof I!="undefined"){for(var J in B){L[J]=c(L,J,I)}}L.mappedProperties=L.mappedProperties||{};L.copiedProperties=L.copiedProperties||{};return L}var s=/\[["']/g,E=/['"]\]/g,o=/^\./;function c(J,K,M){var L=J[K+"Exp"];var I=J[K];if(!L){return I}var N=[];L.forEach(function(Q){var P=M;var O=g.parse(Q);h(0,P,O,Q.replace(s,".").replace(E,"").replace(o,""),O.length,N)});I=n(I,N);L=null;delete J[K+"Exp"];return I}function h(N,M,L,O,I,K){for(;N<I;N++){var J=L[N];if(J===g.ctr){K.splice(K.indexOf(O),1);M.forEach(function(R,Q){var P=O.replace("[$i]","["+Q+"]");K.push(P);h(N+1,R,L,P,I,K)});return}else{M=M[J]}}K.push(O)}var g=(function(){var I=/[['"]*[\.]*['"]]/;var J=/[\['"]/;var N=/^\./;var O=/\.$/;var M="__$CTR$__",L=/\[\$i\]/g;var K={};return{ctr:M,parse:function(Q){if(typeof K[Q]!=="undefined"){return K[Q]}var P=[];Q.replace(L,M).split(I).forEach(function(R){var S=R.split(J);if(S.length===1){S[0].replace(N,"").replace(O,"").split(".").forEach(function(T){if(T&&T!==M){T.split(M).forEach(function(U){P.push(U?U:M)})}else{if(T){P.push(T)}}})}else{if(S.length===3){if(S[0]){S[0].replace(N,"").replace(O,"").split(".").forEach(function(T){if(T&&T!==M){T.split(M).forEach(function(U){P.push(U?U:M)})}else{if(T){P.push(T)}}})}P.push(S[2])}else{throw new Error("wasted!")}}});K[Q]=P;return P}}})();function n(J,I){if(H.getType(J)!=="array"){if(H.getType(J)==="undefined"){J=[]}else{J=[J]}}if(H.getType(I)!=="array"){if(H.getType(I)==="undefined"){I=[]}else{I=[I]}}return b.utils.arrayGetDistinctValues(J.concat(I))}function i(J,L){var K=b.dependentObservable;b.dependentObservable=function(S,M,P){P=P||{};if(S&&typeof S=="object"){P=S}var O=P.deferEvaluation;var N=false;var R=function(T){var V=b.dependentObservable;b.dependentObservable=l;var W=b.isWriteableObservable(T);b.dependentObservable=V;var U=l({read:function(){if(!N){b.utils.arrayRemoveItem(J,T);N=true}return T.apply(T,arguments)},write:W&&function(X){return T(X)},deferEvaluation:true});if(e){U._wrapper=true}U.__DO=T;return U};P.deferEvaluation=true;var Q=new l(S,M,P);if(!O){Q=R(Q);J.push(Q)}return Q};b.dependentObservable.fn=l.fn;b.computed=b.dependentObservable;var I=L();b.dependentObservable=K;b.computed=b.dependentObservable;return I}function C(ao,K,Z,ap,N,I,ar){var Y=H.getType(b.utils.unwrapObservable(K))==="array";I=I||"";if(H.isMapped(ao)){var M=b.utils.unwrapObservable(ao)[r];Z=j(M,Z)}var ak={data:K,parent:ar||N};var X=function(){return Z[ap]&&Z[ap].create instanceof Function};var P=function(au){return i(q,function(){if(b.utils.unwrapObservable(N) instanceof Array){return Z[ap].create({data:au||ak.data,parent:ak.parent,skip:w})}else{return Z[ap].create({data:au||ak.data,parent:ak.parent})}})};var ag=function(){return Z[ap]&&Z[ap].update instanceof Function};var V=function(av,au){var aw={data:au||ak.data,parent:ak.parent,target:b.utils.unwrapObservable(av)};if(b.isWriteableObservable(av)){aw.observable=av}return Z[ap].update(aw)};var ae=A.get(K);if(ae){return ae}ap=ap||"";if(!Y){if(!y(K)){switch(H.getType(K)){case"function":if(ag()){if(b.isWriteableObservable(K)){K(V(K));ao=K}else{ao=V(K)}}else{ao=K}break;default:if(b.isWriteableObservable(ao)){if(ag()){var ab=V(ao);ao(ab);return ab}else{var ab=b.utils.unwrapObservable(K);ao(ab);return ab}}else{var ah=X()||ag();if(X()){ao=P()}else{ao=b.observable(b.utils.unwrapObservable(K))}if(ag()){ao(V(ao))}if(ah){return ao}}}}else{ao=b.utils.unwrapObservable(ao);if(!ao){if(X()){var T=P();if(ag()){T=V(T)}return T}else{if(ag()){return V(T)}ao={}}}if(ag()){ao=V(ao)}A.save(K,ao);if(ag()){return ao}F(K,function(av){var ay=I.length?I+"."+av:av;if(b.utils.arrayIndexOf(Z.ignore,ay)!=-1){return}if(b.utils.arrayIndexOf(Z.copy,ay)!=-1){ao[av]=K[av];return}if(typeof K[av]!="object"&&typeof K[av]!="array"&&Z.observe.length>0&&b.utils.arrayIndexOf(Z.observe,ay)==-1){ao[av]=K[av];Z.copiedProperties[ay]=true;return}var ax=A.get(K[av]);var au=C(ao[av],K[av],Z,av,ao,ay,ao);var aw=ax||au;if(Z.observe.length>0&&b.utils.arrayIndexOf(Z.observe,ay)==-1){aw=ao[av]===undefined?aw:b.utils.unwrapObservable(aw);ao[av]=aw;Z.copiedProperties[ay]=true;return}if(b.isWriteableObservable(ao[av])){aw=b.utils.unwrapObservable(aw);if(ao[av]()!==aw){ao[av](aw)}}else{aw=ao[av]===undefined?aw:b.utils.unwrapObservable(aw);if(Z.observe.length>0&&b.utils.arrayIndexOf(Z.observe,ay)==-1){ao[av]=aw}else{ao[av]=typeof aw=="object"?b.observable(aw):aw}}Z.mappedProperties[ay]=true})}}else{var U=[];var R=false;var aa=function(au){return au};if(Z[ap]&&Z[ap].key){aa=Z[ap].key;R=true}if(!b.isObservable(ao)){ao=b.observableArray([]);ao.mappedRemove=function(av){var au=typeof av=="function"?av:function(aw){return aw===aa(av)};return ao.remove(function(aw){return au(aa(aw))})};ao.mappedRemoveAll=function(av){var au=z(av,aa);return ao.remove(function(aw){return b.utils.arrayIndexOf(au,aa(aw))!=-1})};ao.mappedDestroy=function(av){var au=typeof av=="function"?av:function(aw){return aw===aa(av)};return ao.destroy(function(aw){return au(aa(aw))})};ao.mappedDestroyAll=function(av){var au=z(av,aa);return ao.destroy(function(aw){return b.utils.arrayIndexOf(au,aa(aw))!=-1})};ao.mappedIndexOf=function(aw){var av=z(ao(),aa);var au=aa(aw);return b.utils.arrayIndexOf(av,au)};ao.mappedGet=function(au){return ao()[ao.mappedIndexOf(au)]};ao.mappedCreate=function(av){if(ao.mappedIndexOf(av)!==-1){throw new Error("There already is an object with the key that you specified.")}var au=X()?P(av):av;if(ag()){var aw=V(au,av);if(b.isWriteableObservable(au)){au(aw)}else{au=aw}}ao.push(au);return au}}var ac=z(b.utils.unwrapObservable(ao),aa).sort();var Q=z(K,aa);if(R){Q.sort()}var ai=b.utils.compareArrays(ac,Q);var at={};var an,am;var L=b.utils.unwrapObservable(K);var W={};var aj=true;for(an=0,am=L.length;an<am;an++){var S=aa(L[an]);if(S===undefined||S instanceof Object){aj=false;break}W[S]=L[an]}var aq=[];var O=0;for(an=0,am=ai.length;an<am;an++){var S=ai[an];var J;var al=I+"["+an+"]";switch(S.status){case"added":var ad=aj?W[S.value]:p(b.utils.unwrapObservable(K),S.value,aa);J=C(undefined,ad,Z,ap,ao,al,N);if(!X()){J=b.utils.unwrapObservable(J)}var af=D(b.utils.unwrapObservable(K),ad,at);if(J===w){O++}else{aq[af-O]=J}at[af]=true;break;case"retained":var ad=aj?W[S.value]:p(b.utils.unwrapObservable(K),S.value,aa);J=p(ao,S.value,aa);C(J,ad,Z,ap,ao,al,N);var af=D(b.utils.unwrapObservable(K),ad,at);aq[af]=J;at[af]=true;break;case"deleted":J=p(ao,S.value,aa);break}U.push({event:S.status,item:J})}ao(aq);if(Z[ap]&&Z[ap].arrayChanged){b.utils.arrayForEach(U,function(au){Z[ap].arrayChanged(au.event,au.item)})}}return ao}function D(M,L,K){for(var J=0,I=M.length;J<I;J++){if(K[J]===true){continue}if(M[J]===L){return J}}return null}function f(I,K){var J;if(K){J=K(I)}if(H.getType(J)==="undefined"){J=I}return b.utils.unwrapObservable(J)}function p(N,K,M){N=b.utils.unwrapObservable(N);for(var J=0,I=N.length;J<I;J++){var L=N[J];if(f(L,M)===K){return L}}throw new Error("When calling ko.update*, the key '"+K+"' was not found!")}function z(J,I){return b.utils.arrayMap(b.utils.unwrapObservable(J),function(K){if(I){return f(K,I)}else{return K}})}function F(K,L){if(H.getType(K)==="array"){for(var J=0;J<K.length;J++){L(J)}}else{for(var I in K){L(I)}}}function y(I){var J=H.getType(I);return((J==="object")||(J==="array"))&&(I!==null)}function m(L,K,J){var I=L||"";if(H.getType(K)==="array"){if(L){I+="["+J+"]"}}else{if(L){I+="."}I+=J}return I}H.visitModel=function(L,N,J){J=J||{};J.visitedObjects=J.visitedObjects||new d();var M;var I=b.utils.unwrapObservable(L);if(!y(I)){return N(L,J.parentName)}else{J=x(J,I[r]);N(L,J.parentName);M=H.getType(I)==="array"?[]:{}}J.visitedObjects.save(L,M);var K=J.parentName;F(I,function(Q){if(J.ignore&&b.utils.arrayIndexOf(J.ignore,Q)!=-1){return}var O=I[Q];J.parentName=m(K,I,Q);if(b.utils.arrayIndexOf(J.copy,Q)===-1){if(b.utils.arrayIndexOf(J.include,Q)===-1){if(I[r]&&I[r].mappedProperties&&!I[r].mappedProperties[Q]&&I[r].copiedProperties&&!I[r].copiedProperties[Q]&&!(H.getType(I)==="array")){return}}}var P;switch(H.getType(b.utils.unwrapObservable(O))){case"object":case"array":case"undefined":var R=J.visitedObjects.get(O);M[Q]=(H.getType(R)!=="undefined")?R:H.visitModel(O,N,J);break;default:M[Q]=N(O,J.parentName)}});return M};function G(){var J=[];var I=[];this.save=function(L,M){var K=b.utils.arrayIndexOf(J,L);if(K>=0){I[K]=M}else{J.push(L);I.push(M)}};this.get=function(L){var K=b.utils.arrayIndexOf(J,L);var M=(K>=0)?I[K]:undefined;return M}}function d(){var I={};var J=function(L){var K;try{K=L}catch(M){K="$$$"}var N=I[K];if(N===undefined){N=new G();I[K]=N}return N};this.save=function(K,L){J(K).save(K,L)};this.get=function(K){return J(K).get(K)}}H.clearFromJS=function(K){if(arguments.length==0){throw new Error("When calling ko.mapping.clearFromJS, pass the object you want to reset.")}var I={};window.setTimeout(function(){v=0},0);if(!v++){q=[];A=new d()}var J;var K;if(arguments.length==1){if(arguments[0][r]){K=arguments[0]}else{J=arguments[0]}}if(arguments.length==2){J=arguments[0];K=arguments[1]}if(K){J=j(J,K[r])}J=x(J);H.visitModel(K,function(L,N){if(!b.isObservable(L)){return}else{var M=H.getType(b.utils.unwrapObservable(L))==="array";if(M){L([])}else{L(L._initialValue)}}},J);return K}}));(function(){function b(d,e,f){var c=new ko.observable(d);this.value=new ko.observable(e);this.key=new ko.computed({read:c,write:function(h){var g=c();if(g==h){return}f.remove(h);c(h)}})}ko.observableDictionary=function(f,d,e){var c={};c.items=new ko.observableArray();c._wrappers={};c._keySelector=d||function(h,g){return g};c._valueSelector=e||function(g){return g};if(typeof d=="string"){c._keySelector=function(g){return g[d]}}if(typeof e=="string"){c._valueSelector=function(g){return g[e]}}ko.utils.extend(c,ko.observableDictionary.fn);c.pushAll(f);return c};ko.observableDictionary.fn={remove:function(d){var c=d;if(d instanceof b){c=function(e){return e.key()===d.key()}}else{if(typeof d!="function"){c=function(e){return e.key()===d}}}ko.observableArray.fn.remove.call(this.items,c)},removeAll:function(){ko.observableArray.fn.removeAll.call(this.items)},push:function(c,e){var d=null;if(c instanceof b){d=c;e=c.value();c=c.key()}if(e===undefined){e=this._valueSelector(c);c=this._keySelector(e)}else{e=this._valueSelector(e)}var f=this.get(c,false);if(f){f(e);return f}if(!d){d=new b(c,e,this)}ko.observableArray.fn.push.call(this.items,d);return e},pushAll:function(i){var d=this;var c=d.items();if(i instanceof Array){$.each(i,function(j,l){var k=d._keySelector(l,j);var m=d._valueSelector(l);c.push(new b(k,m,d))})}else{for(var h in i){if(i.hasOwnProperty(h)){var f=i[h];var e=d._keySelector(f,h);var g=d._valueSelector(f);c.push(new b(e,g,d))}}}d.items.valueHasMutated()},sort:function(c){if(c===undefined){c=function(e,d){return defaultComparison(e.key(),d.key())}}return ko.observableArray.fn.sort.call(this.items,c)},indexOf:function(d){if(d instanceof b){return ko.observableArray.fn.indexOf.call(this.items,d)}var e=this.items();for(var c=0;c<e.length;c++){if(e[c].key()==d){return c}}return -1},get:function(c,d){if(d==false){return a(c,this.items())}var e=this._wrappers[c];if(e==null){e=this._wrappers[c]=new ko.computed({read:function(){var f=a(c,this.items());return f?f():null},write:function(g){var f=a(c,this.items());if(f){f(g)}else{this.push(c,g)}}},this)}return e},set:function(c,d){return this.push(c,d)},keys:function(){return ko.utils.arrayMap(this.items(),function(c){return c.key()})},values:function(){return ko.utils.arrayMap(this.items(),function(c){return c.value()})},toJSON:function(){var c={};var d=ko.utils.unwrapObservable(this.items);ko.utils.arrayForEach(d,function(f){var e=ko.utils.unwrapObservable(f.key);var g=ko.utils.unwrapObservable(f.value);c[e]=g});return c}};function a(d,c){var e=ko.utils.arrayFirst(c,function(f){return f.key()==d});return e?e.value:null}})();function isNumeric(a){return !isNaN(parseFloat(a))&&isFinite(a)}function defaultComparison(d,c){if(isNumeric(d)&&isNumeric(c)){return d-c}d=d.toString();c=c.toString();return d==c?0:(d<c?-1:1)};
}
// Date JS Library used	in Juci
// Provides date object enhancements for Juci
// Specific Juci controls such as Calendar, DatePicker, TimePicker etc. depend on this library
/*
	Date.js - minified code
	Customizations
	1. Date.parse functionality is available in parseForMillis
	2. Date.getStartOfMonth - Returns first date of month and year
*/
 Date.getDateFrom=function(b,a,c){return new Date(b+" "+(typeof a=="string"?a:this.CultureInfo.monthNames[a])+" "+c).clearTime()};Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|after|from)/i,subtract:/^(\-|before|ago)/i,yesterday:/^yesterday/i,today:/^t(oday)?/i,tomorrow:/^tomorrow/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^min(ute)?s?/i,hour:/^h(ou)?rs?/i,week:/^w(ee)?k/i,month:/^m(o(nth)?s?)?/i,day:/^d(ays?)?/i,year:/^y((ea)?rs?)?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard:{GMT:"-000",EST:"-0400",CST:"-0500",MST:"-0600",PST:"-0700"},abbreviatedTimeZoneDST:{GMT:"-000",EDT:"-0500",CDT:"-0600",MDT:"-0700",PDT:"-0800"}};Date.getMonthNumberFromName=function(f){var h=Date.CultureInfo.monthNames,g=Date.CultureInfo.abbreviatedMonthNames,i=f.toLowerCase();for(var j=0;j<h.length;j++){if(h[j].toLowerCase()==i||g[j].toLowerCase()==i){return j}}return -1};Date.getDayNumberFromName=function(g){var i=Date.CultureInfo.dayNames,h=Date.CultureInfo.abbreviatedDayNames,j=Date.CultureInfo.shortestDayNames,k=g.toLowerCase();for(var l=0;l<i.length;l++){if(i[l].toLowerCase()==k||h[l].toLowerCase()==k){return l}}return -1};Date.isLeapYear=function(b){return(((b%4===0)&&(b%100!==0))||(b%400===0))};Date.getDaysInMonth=function(d,c){return[31,(Date.isLeapYear(d)?29:28),31,30,31,30,31,31,30,31,30,31][c]};Date.getTimezoneOffset=function(d,c){return(c||false)?Date.CultureInfo.abbreviatedTimeZoneDST[d.toUpperCase()]:Date.CultureInfo.abbreviatedTimeZoneStandard[d.toUpperCase()]};Date.getTimezoneAbbreviation=function(e,g){var h=(g||false)?Date.CultureInfo.abbreviatedTimeZoneDST:Date.CultureInfo.abbreviatedTimeZoneStandard,f;for(f in h){if(h[f]===e){return f}}return null};Date.prototype.clone=function(){return new Date(this.getTime())};Date.prototype.compareTo=function(b){if(isNaN(this)){throw new Error(this)}if(b instanceof Date&&!isNaN(b)){return(this>b)?1:(this<b)?-1:0}else{throw new TypeError(b)}};Date.prototype.equals=function(b){return(this.compareTo(b)===0)};Date.prototype.between=function(f,e){var d=this.getTime();return d>=f.getTime()&&d<=e.getTime()};Date.prototype.addMilliseconds=function(b){this.setMilliseconds(this.getMilliseconds()+b);return this};Date.prototype.addSeconds=function(b){return this.addMilliseconds(b*1000)};Date.prototype.addMinutes=function(b){return this.addMilliseconds(b*60000)};Date.prototype.addHours=function(b){return this.addMilliseconds(b*3600000)};Date.prototype.addDays=function(b){return this.addMilliseconds(b*86400000)};Date.prototype.addWeeks=function(b){return this.addMilliseconds(b*604800000)};Date.prototype.addMonths=function(d){var c=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+d);this.setDate(Math.min(c,this.getDaysInMonth()));return this};Date.prototype.addYears=function(b){return this.addMonths(b*12)};Date.prototype.add=function(c){if(typeof c=="number"){this._orient=c;return this}var d=c;if(d.millisecond||d.milliseconds){this.addMilliseconds(d.millisecond||d.milliseconds)}if(d.second||d.seconds){this.addSeconds(d.second||d.seconds)}if(d.minute||d.minutes){this.addMinutes(d.minute||d.minutes)}if(d.hour||d.hours){this.addHours(d.hour||d.hours)}if(d.month||d.months){this.addMonths(d.month||d.months)}if(d.year||d.years){this.addYears(d.year||d.years)}if(d.day||d.days){this.addDays(d.day||d.days)}return this};Date._validate=function(g,h,f,e){if(typeof g!="number"){throw new TypeError(g+" is not a Number.")}else{if(g<h||g>f){throw new RangeError(g+" is not a valid value for "+e+".")}}return true};Date.validateMillisecond=function(b){return Date._validate(b,0,999,"milliseconds")};Date.validateSecond=function(b){return Date._validate(b,0,59,"seconds")};Date.validateMinute=function(b){return Date._validate(b,0,59,"minutes")};Date.validateHour=function(b){return Date._validate(b,0,23,"hours")};Date.validateDay=function(f,e,d){return Date._validate(f,1,Date.getDaysInMonth(e,d),"days")};Date.validateMonth=function(b){return Date._validate(b,0,11,"months")};Date.validateYear=function(b){return Date._validate(b,1,9999,"seconds")};Date.prototype.set=function(c){var d=c;if(!d.millisecond&&d.millisecond!==0){d.millisecond=-1}if(!d.second&&d.second!==0){d.second=-1}if(!d.minute&&d.minute!==0){d.minute=-1}if(!d.hour&&d.hour!==0){d.hour=-1}if(!d.day&&d.day!==0){d.day=-1}if(!d.month&&d.month!==0){d.month=-1}if(!d.year&&d.year!==0){d.year=-1}if(d.millisecond!=-1&&Date.validateMillisecond(d.millisecond)){this.addMilliseconds(d.millisecond-this.getMilliseconds())}if(d.second!=-1&&Date.validateSecond(d.second)){this.addSeconds(d.second-this.getSeconds())}if(d.minute!=-1&&Date.validateMinute(d.minute)){this.addMinutes(d.minute-this.getMinutes())}if(d.hour!=-1&&Date.validateHour(d.hour)){this.addHours(d.hour-this.getHours())}if(d.month!==-1&&Date.validateMonth(d.month)){this.addMonths(d.month-this.getMonth())}if(d.year!=-1&&Date.validateYear(d.year)){this.addYears(d.year-this.getFullYear())}if(d.day!=-1&&Date.validateDay(d.day,this.getFullYear(),this.getMonth())){this.addDays(d.day-this.getDate())}if(d.timezone){this.setTimezone(d.timezone)}if(d.timezoneOffset){this.setTimezoneOffset(d.timezoneOffset)}return this};Date.prototype.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this};Date.prototype.isLeapYear=function(){var b=this.getFullYear();return(((b%4===0)&&(b%100!==0))||(b%400===0))};Date.prototype.isWeekday=function(){return !(this.is().sat()||this.is().sun())};Date.prototype.getDaysInMonth=function(){return Date.getDaysInMonth(this.getFullYear(),this.getMonth())};Date.prototype.moveToFirstDayOfMonth=function(){return this.set({day:1})};Date.prototype.moveToLastDayOfMonth=function(){return this.set({day:this.getDaysInMonth()})};Date.prototype.moveToDayOfWeek=function(e,d){var f=(e-this.getDay()+7*(d||+1))%7;return this.addDays((f===0)?f+=7*(d||+1):f)};Date.prototype.moveToMonth=function(f,e){var d=(f-this.getMonth()+12*(e||+1))%12;return this.addMonths((d===0)?d+=12*(e||+1):d)};Date.prototype.getDayOfYear=function(){return Math.floor((this-new Date(this.getFullYear(),0,1))/86400000)};Date.prototype.getWeekOfYear=function(s){var l=this.getFullYear(),p=this.getMonth(),n=this.getDate();var d=s||Date.CultureInfo.firstDayOfWeek;var o=7+1-new Date(l,0,1).getDay();if(o==8){o=1}var q=((Date.UTC(l,p,n,0,0,0)-Date.UTC(l,0,1,0,0,0))/86400000)+1;var k=Math.floor((q-o+7)/7);if(k===d){l--;var m=7+1-new Date(l,0,1).getDay();if(m==2||m==8){k=53}else{k=52}}return k};Date.prototype.isDST=function(){console.log("isDST");return this.toString().match(/(E|C|M|P)(S|D)T/)[2]=="D"};Date.prototype.getTimezone=function(){return Date.getTimezoneAbbreviation(this.getUTCOffset,this.isDST())};Date.prototype.setTimezoneOffset=function(d){var e=this.getTimezoneOffset(),f=Number(d)*-6/10;this.addMinutes(f-e);return this};Date.prototype.setTimezone=function(b){return this.setTimezoneOffset(Date.getTimezoneOffset(b))};Date.prototype.getUTCOffset=function(){var c=this.getTimezoneOffset()*-10/6,d;if(c<0){d=(c-10000).toString();return d[0]+d.substr(2)}else{d=(c+10000).toString();return"+"+d.substr(1)}};Date.prototype.getDayName=function(b){return b?Date.CultureInfo.abbreviatedDayNames[this.getDay()]:Date.CultureInfo.dayNames[this.getDay()]};Date.prototype.getMonthName=function(b){return b?Date.CultureInfo.abbreviatedMonthNames[this.getMonth()]:Date.CultureInfo.monthNames[this.getMonth()]};Date.prototype._toString=Date.prototype.toString;Date.prototype.toString=function(f){var e=this;var d=function d(a){return(a.toString().length==1)?"0"+a:a};return f?f.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,function(a){switch(a){case"hh":return d(e.getHours()<13?e.getHours():(e.getHours()-12));case"h":return e.getHours()<13?e.getHours():(e.getHours()-12);case"HH":return d(e.getHours());case"H":return e.getHours();case"mm":return d(e.getMinutes());case"m":return e.getMinutes();case"ss":return d(e.getSeconds());case"s":return e.getSeconds();case"yyyy":return e.getFullYear();case"yy":return e.getFullYear().toString().substring(2,4);case"dddd":return e.getDayName();case"ddd":return e.getDayName(true);case"dd":return d(e.getDate());case"d":return e.getDate().toString();case"MMMM":return e.getMonthName();case"MMM":return e.getMonthName(true);case"MM":return d((e.getMonth()+1));case"M":return e.getMonth()+1;case"t":return e.getHours()<12?Date.CultureInfo.amDesignator.substring(0,1):Date.CultureInfo.pmDesignator.substring(0,1);case"tt":return e.getHours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;case"zzz":case"zz":case"z":return""}}):this._toString()};Date.nowDate=function(){return new Date()};Date.today=function(){return Date.nowDate().clearTime()};Date.prototype._orient=+1;Date.prototype.next=function(){this._orient=+1;return this};Date.prototype.last=Date.prototype.prev=Date.prototype.previous=function(){this._orient=-1;return this};Date.prototype._is=false;Date.prototype.is=function(){this._is=true;return this};Number.prototype._dateElement="day";Number.prototype.fromNow=function(){var b={};b[this._dateElement]=this;return Date.nowDate().add(b)};Number.prototype.ago=function(){var b={};b[this._dateElement]=this*-1;return Date.nowDate().add(b)};(function(){var u=Date.prototype,A=Number.prototype;var i=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),j=("january february march april may june july august september october november december").split(/\s/),k=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),q;var s=function(a){return function(){if(this._is){this._is=false;return this.getDay()==a}return this.moveToDayOfWeek(a,this._orient)}};for(var v=0;v<i.length;v++){u[i[v]]=u[i[v].substring(0,3)]=s(v)}var t=function(a){return function(){if(this._is){this._is=false;return this.getMonth()===a}return this.moveToMonth(a,this._orient)}};for(var x=0;x<j.length;x++){u[j[x]]=u[j[x].substring(0,3)]=t(x)}var w=function(a){return function(){if(a.substring(a.length-1)!="s"){a+="s"}return this["add"+a](this._orient)}};var z=function(a){return function(){this._dateElement=a;return this}};for(var y=0;y<k.length;y++){q=k[y].toLowerCase();u[q]=u[q+"s"]=w(k[y]);A[q]=A[q+"s"]=z(q)}}());Date.prototype.toJSONString=function(){return this.toString("yyyy-MM-ddThh:mm:ssZ")};Date.prototype.toShortDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern)};Date.prototype.toLongDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.longDatePattern)};Date.prototype.toShortTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern)};Date.prototype.toLongTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.longTimePattern)};Date.prototype.getOrdinal=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}};(function(){Date.Parsing={Exception:function(a){this.message="Parse error at '"+a.substring(0,10)+" ...'"}};var j=Date.Parsing;var p=j.Operators={rtoken:function(a){return function(c){var b=c.match(a);if(b){return([b[0],c.substring(b[0].length)])}else{throw new j.Exception(c)}}},token:function(a){return function(b){return p.rtoken(new RegExp("^s*"+b+"s*"))(b)}},stoken:function(a){return p.rtoken(new RegExp("^"+a))},until:function(a){return function(e){var d=[],b=null;while(e.length){try{b=a.call(this,e)}catch(c){d.push(b[0]);e=b[1];continue}break}return[d,e]}},many:function(a){return function(e){var b=[],d=null;while(e.length){try{d=a.call(this,e)}catch(c){return[b,e]}b.push(d[0]);e=d[1]}return[b,e]}},optional:function(a){return function(d){var c=null;try{c=a.call(this,d)}catch(b){return[null,d]}return[c[0],c[1]]}},not:function(a){return function(c){try{a.call(this,c)}catch(b){return[null,c]}throw new j.Exception(c)}},ignore:function(a){return a?function(c){var b=null;b=a.call(this,c);return[null,b[1]]}:null},product:function(){var c=arguments[0],b=Array.prototype.slice.call(arguments,1),a=[];for(var d=0;d<c.length;d++){a.push(p.each(c[d],b))}return a},cache:function(a){var c={},b=null;return function(e){try{b=c[e]=(c[e]||a.call(this,e))}catch(d){b=c[e]=d}if(b instanceof j.Exception){throw b}else{return b}}},any:function(){var a=arguments;return function(d){var c=null;for(var e=0;e<a.length;e++){if(a[e]==null){continue}try{c=(a[e].call(this,d))}catch(b){c=null}if(c){return c}}throw new j.Exception(d)}},each:function(){var a=arguments;return function(d){var f=[],c=null;for(var e=0;e<a.length;e++){if(a[e]==null){continue}try{c=(a[e].call(this,d))}catch(b){throw new j.Exception(d)}f.push(c[0]);d=c[1]}return[f,d]}},all:function(){var a=arguments,b=b;return b.each(b.optional(a))},sequence:function(c,b,a){b=b||p.rtoken(/^\s*/);a=a||null;if(c.length==1){return c[0]}return function(s){var q=null,h=null;var f=[];for(var w=0;w<c.length;w++){try{q=c[w].call(this,s)}catch(g){break}f.push(q[0]);try{h=b.call(this,q[1])}catch(d){h=null;break}s=h[1]}if(!q){throw new j.Exception(s)}if(h){throw new j.Exception(h[1])}if(a){try{q=a.call(this,q[1])}catch(e){throw new j.Exception(q[1])}}return[f,(q?q[1]:s)]}},between:function(c,b,d){d=d||c;var a=p.each(p.ignore(c),b,p.ignore(d));return function(e){var f=a.call(this,e);return[[f[0][0],r[0][2]],f[1]]}},list:function(c,b,a){b=b||p.rtoken(/^\s*/);a=a||null;return(c instanceof Array?p.each(p.product(c.slice(0,-1),p.ignore(b)),c.slice(-1),p.ignore(a)):p.each(p.many(p.each(c,p.ignore(b))),px,p.ignore(a)))},set:function(c,b,a){b=b||p.rtoken(/^\s*/);a=a||null;return function(d){var q=null,g=null,h=null,e=null,H=[[],d],f=false;for(var F=0;F<c.length;F++){h=null;g=null;q=null;f=(c.length==1);try{q=c[F].call(this,d)}catch(C){continue}e=[[q[0]],q[1]];if(q[1].length>0&&!f){try{h=b.call(this,q[1])}catch(s){f=true}}else{f=true}if(!f&&h[1].length===0){f=true}if(!f){var E=[];for(var G=0;G<c.length;G++){if(F!=G){E.push(c[G])}}g=p.set(E,b).call(this,h[1]);if(g[0].length>0){e[0]=e[0].concat(g[0]);e[1]=g[1]}}if(e[1].length<H[1].length){H=e}if(H[1].length===0){break}}if(H[0].length===0){return H}if(a){try{h=a.call(this,H[1])}catch(D){throw new j.Exception(H[1])}H[1]=h[1]}return H}},forward:function(b,a){return function(c){return b[a].call(this,c)}},replace:function(a,b){return function(d){var c=a.call(this,d);return[b,c[1]]}},process:function(a,b){return function(d){var c=a.call(this,d);return[b.call(this,c[0]),c[1]]}},min:function(b,a){return function(d){var c=a.call(this,d);if(c[0].length<b){throw new j.Exception(d)}return c}}};var k=function(a){return function(){var e=null,b=[];if(arguments.length>1){e=Array.prototype.slice.call(arguments)}else{if(arguments[0] instanceof Array){e=arguments[0]}}if(e){for(var c=0,d=e.shift();c<d.length;c++){e.unshift(d[c]);b.push(a.apply(null,e));e.shift();return b}}else{return a.apply(null,arguments)}}};var l="optional not ignore cache".split(/\s/);for(var o=0;o<l.length;o++){p[l[o]]=k(p[l[o]])}var m=function(a){return function(){if(arguments[0] instanceof Array){return a.apply(null,arguments[0])}else{return a.apply(null,arguments)}}};var n="each any all".split(/\s/);for(var i=0;i<n.length;i++){p[n[i]]=m(p[n[i]])}}());(function(){var m=function(b){var a=[];for(var c=0;c<b.length;c++){if(b[c] instanceof Array){a=a.concat(m(b[c]))}else{if(b[c]){a.push(b[c])}}}return a};Date.Grammar={};Date.Translator={hour:function(a){return function(){this.hour=Number(a)}},minute:function(a){return function(){this.minute=Number(a)}},second:function(a){return function(){this.second=Number(a)}},meridian:function(a){return function(){this.meridian=a.slice(0,1).toLowerCase()}},timezone:function(a){return function(){var b=a.replace(/[^\d\+\-]/g,"");if(b.length){this.timezoneOffset=Number(b)}else{this.timezone=a.toLowerCase()}}},day:function(b){var a=b[0];return function(){this.day=Number(a.match(/\d+/)[0])}},month:function(a){return function(){this.month=((a.length==3)?Date.getMonthNumberFromName(a):(Number(a)-1))}},year:function(a){return function(){var b=Number(a);this.year=((a.length>2)?b:(b+(((b+2000)<Date.CultureInfo.twoDigitYearMax)?2000:1900)))}},rday:function(a){return function(){switch(a){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break}}},finishExact:function(d){d=(d instanceof Array)?d:[d];var c=new Date();this.year=c.getFullYear();this.month=c.getMonth();this.day=1;this.hour=0;this.minute=0;this.second=0;for(var b=0;b<d.length;b++){if(d[b]){d[b].call(this)}}this.hour=(this.meridian=="p"&&this.hour<13)?this.hour+12:this.hour;if(this.day>Date.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.")}var a=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){a.set({timezone:this.timezone})}else{if(this.timezoneOffset){a.set({timezoneOffset:this.timezoneOffset})}}return a},finish:function(e){e=(e instanceof Array)?m(e):[e];if(e.length===0){return null}for(var a=0;a<e.length;a++){if(typeof e[a]=="function"){e[a].call(this)}}if(this.now){return new Date()}var d=Date.today();var f=null;var i=!!(this.days!=null||this.orient||this.operator);if(i){var h,b,c;c=((this.orient=="past"||this.operator=="subtract")?-1:1);if(this.weekday){this.unit="day";h=(Date.getDayNumberFromName(this.weekday)-d.getDay());b=7;this.days=h?((h+(c*b))%b):(c*b)}if(this.month){this.unit="month";h=(this.month-d.getMonth());b=12;this.months=h?((h+(c*b))%b):(c*b);this.month=null}if(!this.unit){this.unit="day"}if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1}if(this.unit=="week"){this.unit="day";this.value=this.value*7}this[this.unit+"s"]=this.value*c}return d.add(this)}else{if(this.meridian&&this.hour){this.hour=(this.hour<13&&this.meridian=="p")?this.hour+12:this.hour}if(this.weekday&&!this.day){this.day=(d.addDays((Date.getDayNumberFromName(this.weekday)-d.getDay()))).getDate()}if(this.month&&!this.day){this.day=1}return d.set(this)}}};var g=Date.Parsing.Operators,n=Date.Grammar,o=Date.Translator,k;n.datePartDelimiter=g.rtoken(/^([\s\-\.\,\/\x27]+)/);n.timePartDelimiter=g.stoken(":");n.whiteSpace=g.rtoken(/^\s*/);n.generalDelimiter=g.rtoken(/^(([\s\,]|at|on)+)/);var j={};n.ctoken=function(a){var b=j[a];if(!b){var f=Date.CultureInfo.regexPatterns;var c=a.split(/\s+/),d=[];for(var e=0;e<c.length;e++){d.push(g.replace(g.rtoken(f[c[e]]),c[e]))}b=j[a]=g.any.apply(null,d)}return b};n.ctoken2=function(a){return g.rtoken(Date.CultureInfo.regexPatterns[a])};n.h=g.cache(g.process(g.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),o.hour));n.hh=g.cache(g.process(g.rtoken(/^(0[0-9]|1[0-2])/),o.hour));n.H=g.cache(g.process(g.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),o.hour));n.HH=g.cache(g.process(g.rtoken(/^([0-1][0-9]|2[0-3])/),o.hour));n.m=g.cache(g.process(g.rtoken(/^([0-5][0-9]|[0-9])/),o.minute));n.mm=g.cache(g.process(g.rtoken(/^[0-5][0-9]/),o.minute));n.s=g.cache(g.process(g.rtoken(/^([0-5][0-9]|[0-9])/),o.second));n.ss=g.cache(g.process(g.rtoken(/^[0-5][0-9]/),o.second));n.hms=g.cache(g.sequence([n.H,n.mm,n.ss],n.timePartDelimiter));n.t=g.cache(g.process(n.ctoken2("shortMeridian"),o.meridian));n.tt=g.cache(g.process(n.ctoken2("longMeridian"),o.meridian));n.z=g.cache(g.process(g.rtoken(/^(\+|\-)?\s*\d\d\d\d?/),o.timezone));n.zz=g.cache(g.process(g.rtoken(/^(\+|\-)\s*\d\d\d\d/),o.timezone));n.zzz=g.cache(g.process(n.ctoken2("timezone"),o.timezone));n.timeSuffix=g.each(g.ignore(n.whiteSpace),g.set([n.tt,n.zzz]));n.time=g.each(g.optional(g.ignore(g.stoken("T"))),n.hms,n.timeSuffix);n.d=g.cache(g.process(g.each(g.rtoken(/^([0-2]\d|3[0-1]|\d)/),g.optional(n.ctoken2("ordinalSuffix"))),o.day));n.dd=g.cache(g.process(g.each(g.rtoken(/^([0-2]\d|3[0-1])/),g.optional(n.ctoken2("ordinalSuffix"))),o.day));n.ddd=n.dddd=g.cache(g.process(n.ctoken("sun mon tue wed thu fri sat"),function(a){return function(){this.weekday=a}}));n.M=g.cache(g.process(g.rtoken(/^(1[0-2]|0\d|\d)/),o.month));n.MM=g.cache(g.process(g.rtoken(/^(1[0-2]|0\d)/),o.month));n.MMM=n.MMMM=g.cache(g.process(n.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),o.month));n.y=g.cache(g.process(g.rtoken(/^(\d\d?)/),o.year));n.yy=g.cache(g.process(g.rtoken(/^(\d\d)/),o.year));n.yyy=g.cache(g.process(g.rtoken(/^(\d\d?\d?\d?)/),o.year));n.yyyy=g.cache(g.process(g.rtoken(/^(\d\d\d\d)/),o.year));k=function(){return g.each(g.any.apply(null,arguments),g.not(n.ctoken2("timeContext")))};n.day=k(n.d,n.dd);n.month=k(n.M,n.MMM);n.year=k(n.yyyy,n.yy);n.orientation=g.process(n.ctoken("past future"),function(a){return function(){this.orient=a}});n.operator=g.process(n.ctoken("add subtract"),function(a){return function(){this.operator=a}});n.rday=g.process(n.ctoken("yesterday tomorrow today now"),o.rday);n.unit=g.process(n.ctoken("minute hour day week month year"),function(a){return function(){this.unit=a}});n.value=g.process(g.rtoken(/^\d\d?(st|nd|rd|th)?/),function(a){return function(){this.value=a.replace(/\D/g,"")}});n.expression=g.set([n.rday,n.operator,n.value,n.unit,n.orientation,n.ddd,n.MMM]);k=function(){return g.set(arguments,n.datePartDelimiter)};n.mdy=k(n.ddd,n.month,n.day,n.year);n.ymd=k(n.ddd,n.year,n.month,n.day);n.dmy=k(n.ddd,n.day,n.month,n.year);n.date=function(a){return((n[Date.CultureInfo.dateElementOrder]||n.mdy).call(this,a))};n.format=g.process(g.many(g.any(g.process(g.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(a){if(n[a]){return n[a]}else{throw Date.Parsing.Exception(a)}}),g.process(g.rtoken(/^[^dMyhHmstz]+/),function(a){return g.ignore(g.stoken(a))}))),function(a){return g.process(g.each.apply(null,a),o.finishExact)});var l={};var p=function(a){return l[a]=(l[a]||n.format(a)[0])};n.formats=function(b){if(b instanceof Array){var a=[];for(var c=0;c<b.length;c++){a.push(p(b[c]))}return g.any.apply(null,a)}else{return p(b)}};n._formats=n.formats(["yyyy-MM-ddTHH:mm:ss","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","d"]);n._start=g.process(g.set([n.date,n.time,n.expression],n.generalDelimiter,n.whiteSpace),o.finish);n.start=function(c){try{var b=n._formats.call({},c);if(b[1].length===0){return b}}catch(a){}return n._start.call({},c)}}());Date.parseAnyFormat=function(e){var d=null;if(!e){return null}try{d=Date.Grammar.start.call({},e)}catch(f){return null}return((d[1].length===0)?d[0]:null)};Date.getParseFunction=function(c){var d=Date.Grammar.formats(c);return function(e){var b=null;try{b=d.call({},e)}catch(a){return null}return((b[1].length===0)?b[0]:null)}};Date.parseExact=function(d,c){return Date.getParseFunction(c)(d)};


// Base64 Helper
// Provides Base64 functionality, atob & btoa window level functions if it does not exist
{
/*
	* Base 64 encode decode polyfill *
	Source: http://code.google.com/p/gflot/source/browse/trunk/flot/base64.js?r=153
	Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 	Version: 1.0
 	LastModified: Dec 25 1999
*/
(function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var d=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function b(l){var g,j,e;var k,h,f;e=l.length;j=0;g="";while(j<e){k=l.charCodeAt(j++)&255;if(j==e){g+=a.charAt(k>>2);g+=a.charAt((k&3)<<4);g+="==";break}h=l.charCodeAt(j++);if(j==e){g+=a.charAt(k>>2);g+=a.charAt(((k&3)<<4)|((h&240)>>4));g+=a.charAt((h&15)<<2);g+="=";break}f=l.charCodeAt(j++);g+=a.charAt(k>>2);g+=a.charAt(((k&3)<<4)|((h&240)>>4));g+=a.charAt(((h&15)<<2)|((f&192)>>6));g+=a.charAt(f&63)}return g}function c(m){var l,k,h,f;var j,e,g;e=m.length;j=0;g="";while(j<e){do{l=d[m.charCodeAt(j++)&255]}while(j<e&&l==-1);if(l==-1){break}do{k=d[m.charCodeAt(j++)&255]}while(j<e&&k==-1);if(k==-1){break}g+=String.fromCharCode((l<<2)|((k&48)>>4));do{h=m.charCodeAt(j++)&255;if(h==61){return g}h=d[h]}while(j<e&&h==-1);if(h==-1){break}g+=String.fromCharCode(((k&15)<<4)|((h&60)>>2));do{f=m.charCodeAt(j++)&255;if(f==61){return g}f=d[f]}while(j<e&&f==-1);if(f==-1){break}g+=String.fromCharCode(((h&3)<<6)|f)}return g}if(!window.btoa){window.btoa=b}if(!window.atob){window.atob=c}})();
}

// iScroll Library used in Juci
// Provides inner scroll functionality to Juci

/*
	iScroll
	Modifications - pageX pageY API and touchmove cancel for document
*/
(function(i,E){var u=Math,n=E.createElement("div").style,z=(function(){var H="t,webkitT,MozT,msT,OT".split(","),G,F=0,m=H.length;for(;F<m;F++){G=H[F]+"ransform";if(G in n){return H[F].substr(0,H[F].length-1)}}return false})(),D=z?"-"+z.toLowerCase()+"-":"",l=s("transform"),x=s("transitionProperty"),k=s("transitionDuration"),o=s("transformOrigin"),B=s("transitionTimingFunction"),e=s("transitionDelay"),A=(/android/gi).test(navigator.appVersion),h=(/iphone|ipad/gi).test(navigator.appVersion),r=(/hp-tablet/gi).test(navigator.appVersion),j=s("perspective") in n,y="ontouchstart" in i&&!r,d=z!==false,f=s("transition") in n,g="onorientationchange" in i?"orientationchange":"resize",b=y?"touchstart":"mousedown",t=y?"touchmove":"mousemove",c=y?"touchend":"mouseup",w=y?"touchcancel":"mouseup",a=(function(){if(z===false){return false}var m={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"otransitionend",ms:"MSTransitionEnd"};return m[z]})(),q=(function(){return i.requestAnimationFrame||i.webkitRequestAnimationFrame||i.mozRequestAnimationFrame||i.oRequestAnimationFrame||i.msRequestAnimationFrame||function(m){return setTimeout(m,1)}})(),p=(function(){return i.cancelRequestAnimationFrame||i.webkitCancelAnimationFrame||i.webkitCancelRequestAnimationFrame||i.mozCancelRequestAnimationFrame||i.oCancelRequestAnimationFrame||i.msCancelRequestAnimationFrame||clearTimeout})(),C=j?" translateZ(0)":"",v=function(G,m){var H=this,F;H.wrapper=typeof G=="object"?G:E.getElementById(G);H.wrapper.style.overflow="hidden";H.scroller=H.wrapper.children[0];H.options={hScroll:true,vScroll:true,x:0,y:0,bounce:true,bounceLock:false,momentum:true,lockDirection:true,useTransform:true,useTransition:false,topOffset:0,checkDOMChanges:false,handleClick:true,hScrollbar:false,vScrollbar:false,fixedScrollbar:A,hideScrollbar:true,fadeScrollbar:h&&j,scrollbarClass:"",zoom:false,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:false,snapThreshold:1,onRefresh:null,onBeforeScrollStart:null,onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(F in m){H.options[F]=m[F]}H.x=H.options.x;H.y=H.options.y;H.options.useTransform=d&&H.options.useTransform;H.options.hScrollbar=H.options.hScroll&&H.options.hScrollbar;H.options.vScrollbar=H.options.vScroll&&H.options.vScrollbar;H.options.zoom=H.options.useTransform&&H.options.zoom;H.options.useTransition=f&&H.options.useTransition;if(H.options.zoom&&A){C=""}H.scroller.style[x]=H.options.useTransform?D+"transform":"top left";H.scroller.style[k]="0";H.scroller.style[o]="0 0";if(H.options.useTransition){H.scroller.style[B]="cubic-bezier(0.33,0.66,0.66,1)"}if(H.options.useTransform){H.scroller.style[l]="translate("+H.x+"px,"+H.y+"px)"+C}else{H.scroller.style.cssText+=";position:absolute;top:"+H.y+"px;left:"+H.x+"px"}if(H.options.useTransition){H.options.fixedScrollbar=true}H.refresh();H._bind(g,i);H._bind(b);if(!y){if(H.options.wheelAction!="none"){H._bind("DOMMouseScroll");H._bind("mousewheel")}}if(H.options.checkDOMChanges){H.checkDOMTime=setInterval(function(){H._checkDOMChanges()},500)}};v.prototype={enabled:true,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(F){var m=this;switch(F.type){case b:if(i.$m&&i.$m.isIOS()){document.body.addEventListener(juci.events.TOUCHMOVE,juci.utils.preventDefault,false)}if(!y&&F.button!==0&&!F.__m_synth){return}m._start(F);break;case t:m._move(F);break;case c:case w:m._end(F);document.body.removeEventListener(juci.events.TOUCHMOVE,juci.utils.preventDefault,false);break;case g:m._resize();break;case"DOMMouseScroll":case"mousewheel":m._wheel(F);break;case a:m._transitionEnd(F);break}},_checkDOMChanges:function(){if(this.moved||this.zoomed||this.animating||(this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale)){return}this.refresh()},_scrollbar:function(m){var G=this,F;if(!G[m+"Scrollbar"]){if(G[m+"ScrollbarWrapper"]){if(d){G[m+"ScrollbarIndicator"].style[l]=""}G[m+"ScrollbarWrapper"].parentNode.removeChild(G[m+"ScrollbarWrapper"]);G[m+"ScrollbarWrapper"]=null;G[m+"ScrollbarIndicator"]=null}return}if(!G[m+"ScrollbarWrapper"]){F=E.createElement("div");if(G.options.scrollbarClass){F.className=G.options.scrollbarClass+m.toUpperCase()}else{F.style.cssText="position:absolute;z-index:100;"+(m=="h"?"height:7px;bottom:1px;left:2px;right:"+(G.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(G.hScrollbar?"7":"2")+"px;top:2px;right:1px")}F.style.cssText+=";pointer-events:none;"+D+"transition-property:opacity;"+D+"transition-duration:"+(G.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(G.options.hideScrollbar?"0":"1");G.wrapper.appendChild(F);G[m+"ScrollbarWrapper"]=F;F=E.createElement("div");if(!G.options.scrollbarClass){F.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);"+D+"background-clip:padding-box;"+D+"box-sizing:border-box;"+(m=="h"?"height:100%":"width:100%")+";"+D+"border-radius:3px;border-radius:3px"}F.style.cssText+=";pointer-events:none;"+D+"transition-property:"+D+"transform;"+D+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);"+D+"transition-duration:0;"+D+"transform: translate(0,0)"+C;if(G.options.useTransition){F.style.cssText+=";"+D+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"}G[m+"ScrollbarWrapper"].appendChild(F);G[m+"ScrollbarIndicator"]=F}if(m=="h"){G.hScrollbarSize=G.hScrollbarWrapper.clientWidth;G.hScrollbarIndicatorSize=u.max(u.round(G.hScrollbarSize*G.hScrollbarSize/G.scrollerW),8);G.hScrollbarIndicator.style.width=G.hScrollbarIndicatorSize+"px";G.hScrollbarMaxScroll=G.hScrollbarSize-G.hScrollbarIndicatorSize;G.hScrollbarProp=G.hScrollbarMaxScroll/G.maxScrollX}else{G.vScrollbarSize=G.vScrollbarWrapper.clientHeight;G.vScrollbarIndicatorSize=u.max(u.round(G.vScrollbarSize*G.vScrollbarSize/G.scrollerH),8);G.vScrollbarIndicator.style.height=G.vScrollbarIndicatorSize+"px";G.vScrollbarMaxScroll=G.vScrollbarSize-G.vScrollbarIndicatorSize;G.vScrollbarProp=G.vScrollbarMaxScroll/G.maxScrollY}G._scrollbarPos(m,true)},_resize:function(){var m=this;setTimeout(function(){m.refresh()},A?200:0)},_pos:function(m,F){if(this.zoomed){return}m=this.hScroll?m:0;F=this.vScroll?F:0;if(this.options.useTransform){this.scroller.style[l]="translate("+m+"px,"+F+"px) scale("+this.scale+")"+C}else{m=u.round(m);F=u.round(F);this.scroller.style.left=m+"px";this.scroller.style.top=F+"px"}this.x=m;this.y=F;this._scrollbarPos("h");this._scrollbarPos("v")},_scrollbarPos:function(m,H){var G=this,I=m=="h"?G.x:G.y,F;if(!G[m+"Scrollbar"]){return}I=G[m+"ScrollbarProp"]*I;if(I<0){if(!G.options.fixedScrollbar){F=G[m+"ScrollbarIndicatorSize"]+u.round(I*3);if(F<8){F=8}G[m+"ScrollbarIndicator"].style[m=="h"?"width":"height"]=F+"px"}I=0}else{if(I>G[m+"ScrollbarMaxScroll"]){if(!G.options.fixedScrollbar){F=G[m+"ScrollbarIndicatorSize"]-u.round((I-G[m+"ScrollbarMaxScroll"])*3);if(F<8){F=8}G[m+"ScrollbarIndicator"].style[m=="h"?"width":"height"]=F+"px";I=G[m+"ScrollbarMaxScroll"]+(G[m+"ScrollbarIndicatorSize"]-F)}else{I=G[m+"ScrollbarMaxScroll"]}}}G[m+"ScrollbarWrapper"].style[e]="0";G[m+"ScrollbarWrapper"].style.opacity=H&&G.options.hideScrollbar?"0":"1";G[m+"ScrollbarIndicator"].style[l]="translate("+(m=="h"?I+"px,0)":"0,"+I+"px)")+C},_start:function(K){var J=this,F=y?K.touches[0]:K,G,m,L,I,H;if(!J.enabled){return}if(J.options.onBeforeScrollStart){J.options.onBeforeScrollStart.call(J,K)}if(J.options.useTransition||J.options.zoom){J._transitionTime(0)}J.moved=false;J.animating=false;J.zoomed=false;J.distX=0;J.distY=0;J.absDistX=0;J.absDistY=0;J.dirX=0;J.dirY=0;if(J.options.zoom&&y&&K.touches.length>1){I=u.abs(K.touches[0].pageX-K.touches[1].pageX);H=u.abs(K.touches[0].pageY-K.touches[1].pageY);J.touchesDistStart=u.sqrt(I*I+H*H);J.originX=u.abs(K.touches[0].pageX+K.touches[1].pageX-J.wrapperOffsetLeft*2)/2-J.x;J.originY=u.abs(K.touches[0].pageY+K.touches[1].pageY-J.wrapperOffsetTop*2)/2-J.y;if(J.options.onZoomStart){J.options.onZoomStart.call(J,K)}}if(J.options.momentum){if(J.options.useTransform){G=getComputedStyle(J.scroller,null)[l].replace(/[^0-9\-.,]/g,"").split(",");m=+(G[12]||G[4]);L=+(G[13]||G[5])}else{m=+getComputedStyle(J.scroller,null).left.replace(/[^0-9-]/g,"");L=+getComputedStyle(J.scroller,null).top.replace(/[^0-9-]/g,"")}if(m!=J.x||L!=J.y){if(J.options.useTransition){J._unbind(a)}else{p(J.aniTime)}J.steps=[];J._pos(m,L);if(J.options.onScrollEnd){J.options.onScrollEnd.call(J)}}}J.absStartX=J.x;J.absStartY=J.y;J.startX=J.x;J.startY=J.y;J.pointX=juci.utils.getPageX(F);J.pointY=juci.utils.getPageY(F);J.startTime=K.timeStamp||Date.now();if(J.options.onScrollStart){J.options.onScrollStart.call(J,K)}J._bind(t,i);J._bind(c,i);J._bind(w,i)},_move:function(N){var L=this,O=y?N.touches[0]:N,J=juci.utils.getPageX(O)-L.pointX,H=juci.utils.getPageY(O)-L.pointY,m=L.x+J,Q=L.y+H,K,I,G,M=N.timeStamp||Date.now();if(L.options.onBeforeScrollMove){L.options.onBeforeScrollMove.call(L,N)}var P=document.createEvent("MouseEvents");var F=this.scroller.children[0];P.initMouseEvent(juci.events.MOUSEOUT,true,true,i,0,0,0,0,0,false,false,false,false,0,F);F.dispatchEvent(P);if(L.options.zoom&&y&&N.touches.length>1){K=u.abs(N.touches[0].pageX-N.touches[1].pageX);I=u.abs(N.touches[0].pageY-N.touches[1].pageY);L.touchesDist=u.sqrt(K*K+I*I);L.zoomed=true;G=1/L.touchesDistStart*L.touchesDist*this.scale;if(G<L.options.zoomMin){G=0.5*L.options.zoomMin*Math.pow(2,G/L.options.zoomMin)}else{if(G>L.options.zoomMax){G=2*L.options.zoomMax*Math.pow(0.5,L.options.zoomMax/G)}}L.lastScale=G/this.scale;m=this.originX-this.originX*L.lastScale+this.x,Q=this.originY-this.originY*L.lastScale+this.y;this.scroller.style[l]="translate("+m+"px,"+Q+"px) scale("+G+")"+C;if(L.options.onZoom){L.options.onZoom.call(L,N)}return}L.pointX=juci.utils.getPageX(O);L.pointY=juci.utils.getPageY(O);if(m>0||m<L.maxScrollX){m=L.options.bounce?L.x+(J/2):m>=0||L.maxScrollX>=0?0:L.maxScrollX}if(Q>L.minScrollY||Q<L.maxScrollY){Q=L.options.bounce?L.y+(H/2):Q>=L.minScrollY||L.maxScrollY>=0?L.minScrollY:L.maxScrollY}L.distX+=J;L.distY+=H;L.absDistX=u.abs(L.distX);L.absDistY=u.abs(L.distY);if(L.absDistX<6&&L.absDistY<6){return}if(L.options.lockDirection){if(L.absDistX>L.absDistY+5){Q=L.y;H=0}else{if(L.absDistY>L.absDistX+5){m=L.x;J=0}}}L.moved=true;L._pos(m,Q);L.dirX=J>0?-1:J<0?1:0;L.dirY=H>0?-1:H<0?1:0;if(M-L.startTime>300){L.startTime=M;L.startX=L.x;L.startY=L.y}if(L.options.onScrollMove){L.options.onScrollMove.call(L,N)}},_end:function(M){if(y&&M.touches.length!==0){return}var K=this,S=y?M.changedTouches[0]:M,N,R,G={dist:0,time:0},m={dist:0,time:0},J=(M.timeStamp||Date.now())-K.startTime,O=K.x,L=K.y,Q,P,F,I,H;K._unbind(t,i);K._unbind(c,i);K._unbind(w,i);if(K.options.onBeforeScrollEnd){K.options.onBeforeScrollEnd.call(K,M)}if(K.zoomed){H=K.scale*K.lastScale;H=Math.max(K.options.zoomMin,H);H=Math.min(K.options.zoomMax,H);K.lastScale=H/K.scale;K.scale=H;K.x=K.originX-K.originX*K.lastScale+K.x;K.y=K.originY-K.originY*K.lastScale+K.y;K.scroller.style[k]="200ms";K.scroller.style[l]="translate("+K.x+"px,"+K.y+"px) scale("+K.scale+")"+C;K.zoomed=false;K.refresh();if(K.options.onZoomEnd){K.options.onZoomEnd.call(K,M)}return}if(!K.moved){if(y){if(K.doubleTapTimer&&K.options.zoom){clearTimeout(K.doubleTapTimer);K.doubleTapTimer=null;if(K.options.onZoomStart){K.options.onZoomStart.call(K,M)}K.zoom(K.pointX,K.pointY,K.scale==1?K.options.doubleTapZoom:1);if(K.options.onZoomEnd){setTimeout(function(){K.options.onZoomEnd.call(K,M)},200)}}else{if(this.options.handleClick){K.doubleTapTimer=setTimeout(function(){K.doubleTapTimer=null;N=S.target;while(N.nodeType!=1){N=N.parentNode}if(N.tagName!="SELECT"&&N.tagName!="INPUT"&&N.tagName!="TEXTAREA"){R=E.createEvent("MouseEvents");R.initMouseEvent("click",true,true,M.view,1,S.screenX,S.screenY,S.clientX,S.clientY,M.ctrlKey,M.altKey,M.shiftKey,M.metaKey,0,null);R._fake=true;N.dispatchEvent(R)}},K.options.zoom?250:0)}}}K._resetPos(400);if(K.options.onTouchEnd){K.options.onTouchEnd.call(K,M)}return}if(J<300&&K.options.momentum){G=O?K._momentum(O-K.startX,J,-K.x,K.scrollerW-K.wrapperW+K.x,K.options.bounce?K.wrapperW:0):G;m=L?K._momentum(L-K.startY,J,-K.y,(K.maxScrollY<0?K.scrollerH-K.wrapperH+K.y-K.minScrollY:0),K.options.bounce?K.wrapperH:0):m;O=K.x+G.dist;L=K.y+m.dist;if((K.x>0&&O>0)||(K.x<K.maxScrollX&&O<K.maxScrollX)){G={dist:0,time:0}}if((K.y>K.minScrollY&&L>K.minScrollY)||(K.y<K.maxScrollY&&L<K.maxScrollY)){m={dist:0,time:0}}}if(G.dist||m.dist){F=u.max(u.max(G.time,m.time),10);if(K.options.snap){Q=O-K.absStartX;P=L-K.absStartY;if(u.abs(Q)<K.options.snapThreshold&&u.abs(P)<K.options.snapThreshold){K.scrollTo(K.absStartX,K.absStartY,200)}else{I=K._snap(O,L);O=I.x;L=I.y;F=u.max(I.time,F)}}K.scrollTo(u.round(O),u.round(L),F);if(K.options.onTouchEnd){K.options.onTouchEnd.call(K,M)}return}if(K.options.snap){Q=O-K.absStartX;P=L-K.absStartY;if(u.abs(Q)<K.options.snapThreshold&&u.abs(P)<K.options.snapThreshold){K.scrollTo(K.absStartX,K.absStartY,200)}else{I=K._snap(K.x,K.y);if(I.x!=K.x||I.y!=K.y){K.scrollTo(I.x,I.y,I.time)}}if(K.options.onTouchEnd){K.options.onTouchEnd.call(K,M)}return}K._resetPos(200);if(K.options.onTouchEnd){K.options.onTouchEnd.call(K,M)}},_resetPos:function(G){var m=this,H=m.x>=0?0:m.x<m.maxScrollX?m.maxScrollX:m.x,F=m.y>=m.minScrollY||m.maxScrollY>0?m.minScrollY:m.y<m.maxScrollY?m.maxScrollY:m.y;if(H==m.x&&F==m.y){if(m.moved){m.moved=false;if(m.options.onScrollEnd){m.options.onScrollEnd.call(m)}}if(m.hScrollbar&&m.options.hideScrollbar){if(z=="webkit"){m.hScrollbarWrapper.style[e]="300ms"}m.hScrollbarWrapper.style.opacity="0"}if(m.vScrollbar&&m.options.hideScrollbar){if(z=="webkit"){m.vScrollbarWrapper.style[e]="300ms"}m.vScrollbarWrapper.style.opacity="0"}return}m.scrollTo(H,F,G||0)},_wheel:function(J){var H=this,I,G,F,m,K;if("wheelDeltaX" in J){I=J.wheelDeltaX/12;G=J.wheelDeltaY/12}else{if("wheelDelta" in J){I=G=J.wheelDelta/12}else{if("detail" in J){I=G=-J.detail*3}else{return}}}if(H.options.wheelAction=="zoom"){K=H.scale*Math.pow(2,1/3*(G?G/Math.abs(G):0));if(K<H.options.zoomMin){K=H.options.zoomMin}if(K>H.options.zoomMax){K=H.options.zoomMax}if(K!=H.scale){if(!H.wheelZoomCount&&H.options.onZoomStart){H.options.onZoomStart.call(H,J)}H.wheelZoomCount++;H.zoom(juci.utils.getPageX(J),juci.utils.getPageY(J),K,400);setTimeout(function(){H.wheelZoomCount--;if(!H.wheelZoomCount&&H.options.onZoomEnd){H.options.onZoomEnd.call(H,J)}},400)}return}F=H.x+I;m=H.y+G;if(F>0){F=0}else{if(F<H.maxScrollX){F=H.maxScrollX}}if(m>H.minScrollY){m=H.minScrollY}else{if(m<H.maxScrollY){m=H.maxScrollY}}if(H.maxScrollY<0){H.scrollTo(F,m,0)}},_transitionEnd:function(F){var m=this;if(F.target!=m.scroller){return}m._unbind(a);m._startAni()},_startAni:function(){var K=this,F=K.x,m=K.y,I=Date.now(),J,H,G;if(K.animating){return}if(!K.steps.length){K._resetPos(400);return}J=K.steps.shift();if(J.x==F&&J.y==m){J.time=0}K.animating=true;K.moved=true;if(K.options.useTransition){K._transitionTime(J.time);K._pos(J.x,J.y);K.animating=false;if(J.time){K._bind(a)}else{K._resetPos(0)}return}G=function(){var L=Date.now(),N,M;if(L>=I+J.time){K._pos(J.x,J.y);K.animating=false;if(K.options.onAnimationEnd){K.options.onAnimationEnd.call(K)}K._startAni();return}L=(L-I)/J.time-1;H=u.sqrt(1-L*L);N=(J.x-F)*H+F;M=(J.y-m)*H+m;K._pos(N,M);if(K.animating){K.aniTime=q(G)}};G()},_transitionTime:function(m){m+="ms";this.scroller.style[k]=m;if(this.hScrollbar){this.hScrollbarIndicator.style[k]=m}if(this.vScrollbar){this.vScrollbarIndicator.style[k]=m}},_momentum:function(L,F,J,m,N){var K=0.0006,G=u.abs(L)/F,H=(G*G)/(2*K),M=0,I=0;if(L>0&&H>J){I=N/(6/(H/G*K));J=J+I;G=G*J/H;H=J}else{if(L<0&&H>m){I=N/(6/(H/G*K));m=m+I;G=G*m/H;H=m}}H=H*(L<0?-1:1);M=G/K;return{dist:H,time:u.round(M)}},_offset:function(m){var G=-m.offsetLeft,F=-m.offsetTop;while(m=m.offsetParent){G-=m.offsetLeft;F-=m.offsetTop}if(m!=this.wrapper){G*=this.scale;F*=this.scale}return{left:G,top:F}},_snap:function(M,L){var J=this,I,H,K,G,F,m;K=J.pagesX.length-1;for(I=0,H=J.pagesX.length;I<H;I++){if(M>=J.pagesX[I]){K=I;break}}if(K==J.currPageX&&K>0&&J.dirX<0){K--}M=J.pagesX[K];F=u.abs(M-J.pagesX[J.currPageX]);F=F?u.abs(J.x-M)/F*500:0;J.currPageX=K;K=J.pagesY.length-1;for(I=0;I<K;I++){if(L>=J.pagesY[I]){K=I;break}}if(K==J.currPageY&&K>0&&J.dirY<0){K--}L=J.pagesY[K];m=u.abs(L-J.pagesY[J.currPageY]);m=m?u.abs(J.y-L)/m*500:0;J.currPageY=K;G=u.round(u.max(F,m))||200;return{x:M,y:L,time:G}},_bind:function(G,F,m){(F||this.scroller).addEventListener(G,this,!!m)},_unbind:function(G,F,m){(F||this.scroller).removeEventListener(G,this,!!m)},destroy:function(){var m=this;m.scroller.style[l]="";m.hScrollbar=false;m.vScrollbar=false;m._scrollbar("h");m._scrollbar("v");m._unbind(g,i);m._unbind(b);m._unbind(t,i);m._unbind(c,i);m._unbind(w,i);if(!m.options.hasTouch){m._unbind("DOMMouseScroll");m._unbind("mousewheel")}if(m.options.useTransition){m._unbind(a)}if(m.options.checkDOMChanges){clearInterval(m.checkDOMTime)}if(m.options.onDestroy){m.options.onDestroy.call(m)}},refresh:function(){var H=this,J,G,m,F,K=0,I=0;if(H.scale<H.options.zoomMin){H.scale=H.options.zoomMin}H.wrapperW=H.wrapper.clientWidth||1;H.wrapperH=H.wrapper.clientHeight||1;H.minScrollY=-H.options.topOffset||0;H.scrollerW=u.round(H.scroller.offsetWidth*H.scale);H.scrollerH=u.round((H.scroller.offsetHeight+H.minScrollY)*H.scale);H.maxScrollX=H.wrapperW-H.scrollerW;H.maxScrollY=H.wrapperH-H.scrollerH+H.minScrollY;H.dirX=0;H.dirY=0;if(H.options.onRefresh){H.options.onRefresh.call(H)}H.hScroll=H.options.hScroll&&H.maxScrollX<0;H.vScroll=H.options.vScroll&&(!H.options.bounceLock&&!H.hScroll||H.scrollerH>H.wrapperH);H.hScrollbar=H.hScroll&&H.options.hScrollbar;H.vScrollbar=H.vScroll&&H.options.vScrollbar&&H.scrollerH>H.wrapperH;J=H._offset(H.wrapper);H.wrapperOffsetLeft=-J.left;H.wrapperOffsetTop=-J.top;if(typeof H.options.snap=="string"){H.pagesX=[];H.pagesY=[];F=H.scroller.querySelectorAll(H.options.snap);for(G=0,m=F.length;G<m;G++){K=H._offset(F[G]);K.left+=H.wrapperOffsetLeft;K.top+=H.wrapperOffsetTop;H.pagesX[G]=K.left<H.maxScrollX?H.maxScrollX:K.left*H.scale;H.pagesY[G]=K.top<H.maxScrollY?H.maxScrollY:K.top*H.scale}}else{if(H.options.snap){H.pagesX=[];while(K>=H.maxScrollX){H.pagesX[I]=K;K=K-H.wrapperW;I++}if(H.maxScrollX%H.wrapperW){H.pagesX[H.pagesX.length]=H.maxScrollX-H.pagesX[H.pagesX.length-1]+H.pagesX[H.pagesX.length-1]}K=0;I=0;H.pagesY=[];while(K>=H.maxScrollY){H.pagesY[I]=K;K=K-H.wrapperH;I++}if(H.maxScrollY%H.wrapperH){H.pagesY[H.pagesY.length]=H.maxScrollY-H.pagesY[H.pagesY.length-1]+H.pagesY[H.pagesY.length-1]}}}H._scrollbar("h");H._scrollbar("v");if(!H.zoomed){H.scroller.style[k]="0";H._resetPos(400)}},scrollTo:function(m,L,K,J){var I=this,H=m,G,F;I.stop();if(!H.length){H=[{x:m,y:L,time:K,relative:J}]}for(G=0,F=H.length;G<F;G++){if(H[G].relative){H[G].x=I.x-H[G].x;H[G].y=I.y-H[G].y}I.steps.push({x:H[G].x,y:H[G].y,time:H[G].time||0})}I._startAni()},scrollToElement:function(m,G){var F=this,H;m=m.nodeType?m:F.scroller.querySelector(m);if(!m){return}H=F._offset(m);H.left+=F.wrapperOffsetLeft;H.top+=F.wrapperOffsetTop;H.left=H.left>0?0:H.left<F.maxScrollX?F.maxScrollX:H.left;H.top=H.top>F.minScrollY?F.minScrollY:H.top<F.maxScrollY?F.maxScrollY:H.top;G=G===undefined?u.max(u.abs(H.left)*2,u.abs(H.top)*2):G;F.scrollTo(H.left,H.top,G)},scrollToPage:function(G,F,I){var H=this,m,J;I=I===undefined?400:I;if(H.options.onScrollStart){H.options.onScrollStart.call(H)}if(H.options.snap){G=G=="next"?H.currPageX+1:G=="prev"?H.currPageX-1:G;F=F=="next"?H.currPageY+1:F=="prev"?H.currPageY-1:F;G=G<0?0:G>H.pagesX.length-1?H.pagesX.length-1:G;F=F<0?0:F>H.pagesY.length-1?H.pagesY.length-1:F;H.currPageX=G;H.currPageY=F;m=H.pagesX[G];J=H.pagesY[F]}else{m=-H.wrapperW*G;J=-H.wrapperH*F;if(m<H.maxScrollX){m=H.maxScrollX}if(J<H.maxScrollY){J=H.maxScrollY}}H.scrollTo(m,J,I)},disable:function(){this.stop();this._resetPos(0);this.enabled=false;this._unbind(t,i);this._unbind(c,i);this._unbind(w,i)},enable:function(){this.enabled=true},stop:function(){if(this.options.useTransition){this._unbind(a)}else{p(this.aniTime)}this.steps=[];this.moved=false;this.animating=false},zoom:function(m,J,I,H){var F=this,G=I/F.scale;if(!F.options.useTransform){return}F.zoomed=true;H=H===undefined?200:H;m=m-F.wrapperOffsetLeft-F.x;J=J-F.wrapperOffsetTop-F.y;F.x=m-m*G+F.x;F.y=J-J*G+F.y;F.scale=I;F.refresh();F.x=F.x>0?0:F.x<F.maxScrollX?F.maxScrollX:F.x;F.y=F.y>F.minScrollY?F.minScrollY:F.y<F.maxScrollY?F.maxScrollY:F.y;F.scroller.style[k]=H+"ms";F.scroller.style[l]="translate("+F.x+"px,"+F.y+"px) scale("+I+")"+C;F.zoomed=false},isReady:function(){return !this.moved&&!this.zoomed&&!this.animating}};function s(m){if(z===""){return m}m=m.charAt(0).toUpperCase()+m.substr(1);return z+m}n=null;if(typeof exports!=="undefined"){exports.iScroll=v}else{i.iScroll=v}})(window,document);




//<-------------------------------------------------------KO CUSTOM BINDING FUNCTIONS------------------------------------------------------------->





// Knockout custom bindings used in Juci
// Uses knockout custom binding features as documented in link below
// http://knockoutjs.com/documentation/custom-bindings.html

// KO custom bindings

// Adds a custom binding to juci basecontrol
ko.bindingHandlers.basecontrol = {
	'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var allBindings = allBindingsAccessor();
		
		var ctrl = juci.getControl(element);
		ctrl._setKOParams(allBindings);
		ctrl._onBindingsInitialize();
		ctrl.__koValue = valueAccessor();
		if(!ctrl._bindingListened){
			ctrl._bindingListened = true;
		}
	},
	'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var ctrl = juci.getControl(element);
		if(!ctrl._isSourceOfChange){
			var value = valueAccessor();
			if(typeof value != "undefined" && value !== ""){
				//value = ko.utils.unwrapObservable(value);
				var v = ko.mapping.toJS(value);
				var evt = new EventObject({oldValue: ctrl.value(), newValue: ctrl._returner(v)});
				ctrl.fireEvent("bind", evt);
				if(!evt.isCancelled()){
					ctrl.value(evt.newValue, true);
				}
			}
		}else{
			delete ctrl._isSourceOfChange;
		}
	}
}

ko.bindingHandlers.masked = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        var mask = allBindingsAccessor().mask || {};
        $(element.children[2]).mask(mask);
        ko.utils.registerEventHandler(element, 'focusout', function() {
            var observable = valueAccessor();
            observable($(element.children[2]).val());
        });
    } ,
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
       $(element.children[2]).val(value);
    }

    
    
};
// Adds a custom binding similar to with to juci
// Difference is DOM is not re-initialized
ko.bindingHandlers.withProperties = {
	'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// Make a modified binding context, with a extra properties, and apply it to descendant elements
		var newProperties = valueAccessor()(),
			childBindingContext = bindingContext.createChildContext(newProperties, viewModel);
		ko.utils.extend(childBindingContext, newProperties);
		element.childBindingContext = childBindingContext;
		ko.applyBindingsToDescendants(childBindingContext, element);

		// Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
		return { controlsDescendantBindings: true };
	},
	'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var newProperties = valueAccessor()(),
			childBindingContext = bindingContext.createChildContext(newProperties, viewModel);
		ko.utils.extend(childBindingContext, newProperties);
		//ko.applyBindingsToDescendants(childBindingContext, element);
		// Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
		return { controlsDescendantBindings: true };
	}
};

ko.bindingHandlers.ref = {
	'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var value = valueAccessor();
		if(typeof value == "function"){
			value();
		}
		return;
	}
};

// Adds a custom binding similar to foreach to juci
// Used in juci list controls
ko.bindingHandlers.jucilist = {
	'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var ctrl = juci.getControl(element.parentNode);
		ctrl._setKOParams(allBindingsAccessor());
		ctrl._onBindingsInitialize();
		return ko.bindingHandlers['template']['init'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor));
	},
	'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var ctrl = juci.getControl(element.parentNode);
		ctrl.setValueAccessor(valueAccessor);
		return ko.bindingHandlers['template']['update'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor), allBindingsAccessor, viewModel, bindingContext);
	}
};

// Adds a custom binding similar to foreach to options in juci
// Used in juci controls which work with options like radiogroup, checkboxgroup, multiselectbox
ko.bindingHandlers.optionsList = {
	'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var value = valueAccessor();
		var elem = new juci.elem(element);
		var ctrl = juci.getControl(element.parentNode);
		ctrl._onListInitialize(allBindingsAccessor());
		return ko.bindingHandlers['template']['init'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor, allBindingsAccessor));
	},
	'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var elem = new juci.elem(element);
		var parentControl = juci.getControl(element.parentNode);
		var returnObj = ko.bindingHandlers['template']['update'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor, allBindingsAccessor), allBindingsAccessor, viewModel, bindingContext);
		if(parentControl){
			parentControl.refresh();
		}
		return returnObj;
	}
};

// Panel custom binding is not used
ko.bindingHandlers.panel = {
	'init': function(element, valueAccessor) {
		return {'controlsDescendantBindings': true};
	},
	'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		ko.applyBindingsToDescendants(valueAccessor(), element);
		return {'controlsDescendantBindings': true};
	}
}

// Adds a custom binding to handle charts in Juci
// One way binding from dataset to chart control
ko.bindingHandlers.chart = {
	'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
		return ko.bindingHandlers.basecontrol.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
	},
	'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
		var value = ko.mapping.toJS(valueAccessor());
		juci.getControl(element).refresh(value);
	}
};

// Adds a custom binding to search box in juci
// Provides the dataset to search on for a searchbox
ko.bindingHandlers.searchbox = {
	'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
		var ctrl = juci.getControl(element);
		ctrl._setKOParams(allBindingsAccessor());
		ctrl._onBindingsInitialize();
		var value = valueAccessor();
		if(typeof ko.utils.unwrapObservable(value) == "function"){
			ctrl.setValueAccessor(value());
		}else{
			ctrl.setValueAccessor(value);
		}
		return {'controlsDescendantBindings': true};
	}
};


//<-------------------------------------------------------UTILITY BINDING FUNCTIONS------------------------------------------------------------->

// Adds a custom binding utilities to juci


ko.bindingHandlers.display = {
	'_tmpl': "<div class='juci_display_container'></div><div class='juci_display_padder_right'></div>",
	'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var elem = new juci.elem(element);
			if(elem.hasClass("juci_title") || elem.attr("data-juci")){
				elem.addClass("juci_fixed_table");
				element.innerHTML = ko.bindingHandlers.display._tmpl;
				element.setHTML = function(t, allBindingsAcc){
					if(allBindingsAcc()["isText"]){
						element.firstChild.textContent = element.firstChild.innerText = t;
					}else{
						element.firstChild.innerHTML = t;
					}
				}
			}else{
				element.setHTML = function(t, allBindingsAcc){
					if(allBindingsAcc()["isText"]){
						element.textContent = element.innerText = t;
					}else{
						element.innerHTML = t;
					}
				}
			}
			return { 'controlsDescendantBindings': true };
		},
		'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			var elem = new juci.elem(element);
			if(typeof value != "function"){
				value = ((value === null) ?  "" : (allBindingsAccessor().formattedValue ? allBindingsAccessor().formattedValue(value): value));
			}else{
				if(value.hasOwnProperty("notifySubscribers")){
					var t = ((value === null) ?  "" : (allBindingsAccessor().formattedValue ? allBindingsAccessor().formattedValue(value): value));
					element.setHTML(t, allBindingsAccessor);
					return;
				}else{
					var r = shouldEvaluate(allBindingsAccessor);
					if(r[0]){
						var evaluator = value;
						value = evaluator.call(elem, r[1], viewModel, bindingContext);
					}
				}
			}
			element.setHTML(value, allBindingsAccessor);
		}
};


ko.bindingHandlers.show = {
		'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
			var value = valueAccessor();
			var elem = new juci.elem(element);
			var bShow = true;
			var showType = allBindingsAccessor()["showType"];
			var hideType =  allBindingsAccessor()["hideType"];
			if(typeof value != "function"){
				bShow = !!value;
			}else{
				if(value.hasOwnProperty("notifySubscribers")){
					bShow = !!value();
				}else{
					var r = shouldEvaluate(allBindingsAccessor);
					if(r[0]){
						var evaluator = value;
						bShow = evaluator.call(elem, r[1], viewModel, bindingContext);
					}
				}
			}
			if(bShow){
				elem.css("display", showType ? showType : "");
			}else{
				elem.css("display", hideType ? hideType : "none");
			}
		}
};

ko.bindingHandlers.img = {
		'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
			// Listen to img load error and set initial default image
			// Img error can also be set on the img tag itself
			var allBindings = allBindingsAccessor();
			var elem = new juci.elem(element);
			if(allBindings["default"]){
				var defaultImg = ko.utils.unwrapObservable(allBindings["default"]);
				var loadingImg = allBindings["loading_img"];
				elem.attr("src", defaultImg);
				elem.onLoad(function(){
					var currImg = elem.attr("src");
					if(currImg != loadingImg){
						elem.removeClass("juci_img_loading");
					}
					if(currImg == defaultImg){
						elem.addClass("juci_img_error");
					}else if(currImg != loadingImg){
						elem.addClass("juci_img_loaded");
					}
				});
				elem.onError(function(){
					var bindings = ko.dataFor(event.e.currentTarget);
					var defaultImg = ko.utils.unwrapObservable(allBindings["default"]);
					var currImg = elem.attr("src");
					if(currImg != defaultImg){
						elem.attr("src", defaultImg);
					}
				});
			}
			return {'controlsDescendantBindings': true};
		},
		'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
			var value = valueAccessor(), val;
			var allBindings = allBindingsAccessor();
			var elem = new juci.elem(element);
			if(typeof value != "function"){
				val = value;
			}else{
				if(value.hasOwnProperty("notifySubscribers")){
					val = value();
				}else{
					var r = shouldEvaluate(allBindingsAccessor);
					if(r[0]){
						var evaluator = value;
						val = evaluator.call(elem, r[1], viewModel, bindingContext);
					}
				}
			}
			elem.addClass("juci_img_loading");
			if(allBindings["loading_img"]){
				elem.attr("src", allBindings["loading_img"]);
			}
			var loadImage = new Image();
			elem.removeClass("juci_img_loaded");
			elem.removeClass("juci_img_error");
			loadImage.onload = function(){
				elem.attr("src", val);
			};
			loadImage.onerror = function(){
				var defaultImg = ko.utils.unwrapObservable(allBindings["default"]);
				elem.attr("src", defaultImg);
			};
			loadImage.src = val;
		}
};

ko.bindingHandlers.enabled = {
		'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
			var value = valueAccessor();
			var elem = new juci.elem(element);
			var bEnable = true;
			if(typeof value != "function"){
				bEnable = !!value;
			}else{
				if(value.hasOwnProperty("notifySubscribers")){
					bEnable = !!value();
				}else{
					var r = shouldEvaluate(allBindingsAccessor);
					if(r[0]){
						var evaluator = value;
						bEnable = evaluator.call(elem, r[1], viewModel, bindingContext);
					}
				}
			}
			if(bEnable){
				elem.enable();
				var ctrl = juci.getControl(elem)
				if(ctrl){
					ctrl.enable();
				}
			}else{
				elem.disable();
				var ctrl = juci.getControl(elem)
				if(ctrl){
					ctrl.disable();
				}
			}
		}
};

ko.bindingHandlers.disabled = {
		'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
			var value = valueAccessor();
			var elem = new juci.elem(element);
			var bDisable = true;
			if(typeof value != "function"){
				bDisable = !!value;
			}else{
				if(value.hasOwnProperty("notifySubscribers")){
					bDisable = !!value();
				}else{
					var r = shouldEvaluate(allBindingsAccessor);
					if(r[0]){
						var evaluator = value;
						bDisable = evaluator.call(elem, r[1], viewModel, bindingContext);
					}
				}
			}
			if(bDisable){
				elem.disable();
				var ctrl = juci.getControl(elem)
				if(ctrl){
					ctrl.disable();
				}
			}else{
				elem.enable();
				var ctrl = juci.getControl(elem)
				if(ctrl){
					ctrl.enable();
				}
			}
		}
};



function shouldEvaluate(allBindingsAccessor){
		var allBindings = allBindingsAccessor();
		var itemValue;
		var evaluate = false;
		if("basecontrol" in allBindings){
			itemValue = ko.utils.unwrapObservable(allBindings["basecontrol"]);
			evaluate = true;
		}else if("ref" in allBindings){
			itemValue = ko.utils.unwrapObservable(allBindings["ref"]);
			evaluate = true;
		}else{
			itemValue = null;
		}
		return [evaluate, itemValue];
};
	
// Adds custom binding similar to with/if/ifnot for Juci
// Difference is DOM is not re-initialized
withIfDomDataKey = "__juci_withIfdata";

function makeWithIfBinding(bindingKey, isWith, isNot, makeContextCallback) {
		ko.bindingHandlers[bindingKey] = {
			'init': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				ko.utils.domData.set(element, withIfDomDataKey, {});
				return { 'controlsDescendantBindings': true };
			},
			'update': function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
				var withIfData = ko.utils.domData.get(element, withIfDomDataKey),
					dataValue = ko.utils.unwrapObservable(valueAccessor()),
					shouldDisplay = !isNot !== !dataValue, // equivalent to isNot ? !dataValue : !!dataValue
					isFirstRender = !withIfData.savedNodes,
					needsRefresh = isFirstRender || isWith || (shouldDisplay !== withIfData.didDisplayOnLastUpdate);

				if (needsRefresh) {
					if (isFirstRender) {
						withIfData.savedNodes = [];
						ko.utils.arrayForEach(ko.virtualElements.childNodes(element), function(n){
							withIfData.savedNodes.push(n);
						});
					}

					if (shouldDisplay) {
						if (!isFirstRender && !withIfData.didDisplayOnLastUpdate) {
							withIfData.savedNodes.forEach(function(n){
								element.appendChild(n);
							});
						}
						ko.applyBindingsToDescendants(makeContextCallback ? makeContextCallback(bindingContext, dataValue) : bindingContext, element);
					} else {
						withIfData.savedNodes.forEach(function(n){
							element.removeChild(n);
						});
					}

					withIfData.didDisplayOnLastUpdate = shouldDisplay;
				}
				return {'controlsDescendantBindings': true};
			}
		}
		ko.expressionRewriting.bindingRewriteValidators[bindingKey] = true;
		ko.virtualElements.allowedBindings[bindingKey] = true;
};

makeWithIfBinding('juciif');

makeWithIfBinding('juciifnot', false /* isWith */, true /* isNot */);

makeWithIfBinding('juciwith', true /* isWith */, false /* isNot */,
									function(bindingContext, dataValue) {
											return bindingContext['createChildContext'](dataValue);
												}
					);


ko.extenders.onChange = function(target, keys) {
	//define the model key based on parentKey.key -
	var modelKey = keys.parentKey ? keys.parentKey : keys.key;
	//define a function to raise on Change Dataset value
	function raiseOnChange(newValue) {
		juci.viewModel.raiseOnChange(modelKey, newValue, this.target);
	}
	//raiseOnChange whenever the value changes
	target.subscribe(raiseOnChange);
	//return the original observable
	return target;
};





//<-------------------------------------------------------JUCI OBJECT------------------------------------------------------------->







(function(){
var idRegex = /id=[a-zA-Z -_0-9]*/g;
/**
	@namespace
	@name juci
	@description
juci is the user interface library for Mowbly mobility framework. The library offers APIs that help build rich user interface screens with responsive design for your app. Following are the broad categories of APIs provided by juci.
<br/><br/>
Query selection APIs to find HTML elements based on name, attributes etc. in the user interface
<br/><br/>
Set of rich user interface controls designed for responsive user interfaces covering most basic user interface patterns especially for enterprise apps
<br/><br/>
Data binding APIs to bind data from different sources like web services to HTML elements or juci controls in the user interface
<br/><br/>
Utility APIs like methods to know the screen dimensions, display message dialogs etc.
<br/><br/>
juci library abstracts the nuances of the various browsers like touch or pointer event handling, form-factor based rendering etc. that helps you develop applications catering to a wider range of devices be it phone or desktop.
<br/><br/>
juci is available as a global object in the page and can be accessed as <i>$m.juci</i>.
<br/><br/>
*/
var juci = {
	__ready: false,
	BLOCK: "block",
	INLINEBLOCK: "inline-block",
	INLINE: "inline",
	TABLE: "table",
	TABLEROW: "table-row",
	TABLECELL: "table-cell",

	onReady: function(fn, context){
		this.addListener("ready", fn, context);
	},
	onBeforeReady: function(fn, context){
		this.addListener("beforeready",fn, context);
	},
	extend: function(child, parent) {
		// Inspired from J.Resig's blog http://ejohn.org/blog/simple-javascript-inheritance/
		var _super = parent.prototype;
		child._super = _super;
		var prop = child.prototype;
		for(var m in _super) {
			// Check if child is overwriting parent function
			if(typeof prop[m] == "undefined") {
				prop[m] = _super[m];
			}else if(typeof prop[m] === "function"){
				prop[m] = (function(name, fn){
					return function() {
						var tmp = this._super;
						// Add a new ._super() method that is the same method
						// but on the super-class
						if (_super[name] != undefined){
							this._super = _super[name];
						}
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						if( tmp === undefined){
							delete this._super;
						}else{
							this._super = tmp;
						}
						return ret;
					};
				})(m, prop[m])
			}
		}
	},
	exportSymbol: function(obj, ns){
		var nsArray = ns.split(".");
		var oo =  juci[nsArray[0]];
		if(!oo){
			oo = juci[nsArray[0]] = {};
			if(nsArray.length == 1){
				juci[nsArray[0]] = obj;
				return;
			}
		}
		for(var i = 1; i < nsArray.length-1; i++){
			var ns = nsArray[i];
			if(!oo[ns]){
				oo[ns] = {};
				oo = oo[ns];
			}
		}
		oo[nsArray[i]] = obj;
	},
	exportMethod: function(ctx, fn, nameOfMethod){
		juci[nameOfMethod] = fns[nameOfMethod] = function(){
			return fn.apply(ctx, arguments);
		}
	},
	init: function(){
		if(this.__ready === false){
			this.initializeGeneric();
			this.fireEvent("beforeready");
			this.panel.init();
			this.initComplete();
		}
	},
	initializeGeneric: function(){
		// Initializes document and body juci element, sets i18n information and touch/mouse events
		this.events.init();
		juci.currentDocument = new juci.elem(document);
		// Document does not have attributes, so adding the mouse down handler without checking
		juci.currentDocument._subscribeTouch = function(e){
			this._addListener(juci.events.CLICK, this._doDocClick);
		}
		juci.currentDocument._doDocClick = function(e){
			if(juci._currTouch != null){
				this.removeTouch(juci._currTouch);
				juci._currTouch = null;
				juci._currTouchElem.dispose();
				juci._currTouchElem = null;
			}
			this.fireEvent("tap", new MDOMEventObject(e));
		}
		juci.currentDocument.removeClick = function(){
			this.purgeListeners("tap");
			this._removeListener(juci.events.CLICK);
		}
		juci.documentBody = new juci.elem(document.body);
		// i18n text direction
		if(juci.translation){
			juci.documentBody.addClass((juci.translation.direction == "rtl") ? "juci_direction_right" : "juci_direction_left");
		}
		var ua = navigator.userAgent;
		juci.isBuggyWebkitAndroid = ua.match(/android 2./gi);
		if(window.$m){
			if($m.isBlackBerry()){
				juci.isBuggyBlackBerry = ua.match(/9300/gi);
			}
		}
	},
	initComplete: function(){
		this.__ready = true;
		this.fireEvent("ready");
	},
	isReady: function(){
		return this.__ready;
	},
	getTranslatedLabel: function(label){
		return juci.translation ? (juci.translation.labels[label] ? juci.translation.labels[label] : label) : label;
	},
	button: function(params){
		var controlElem = new juci.elem("<button data-juci='button' value='"+params.value+"'" + (params.type ? ("type='" + params.type + "'") : "") + "></button>").appendTo(params.parent);
		return new juci.controls.button(controlElem);
	},
	searchbox: function(params){
		var controlElem = new juci.elem('<div data-juci="search" data-bind="ref: '+params.datasetName+'" data-searcher="'+params.handler+'"' +
			(params.placeholder ? (' placeholder="' + params.placeholder + '"'):'') +
			'></div>').appendTo(params.parent);
		var r = new juci.controls.searchbox(controlElem);
		r.setDelay(params.delay);
		return r;
	},
	text: function(params){
		var controlElem = new juci.elem('<div data-juci="text"' +
			(params.placeholder ? (' placeholder="' + params.placeholder + '"'):'') +
			(params.label ? (' data-label="' + params.placeholder + '"'):'') +
		'></div>').appendTo(params.parent);
		controlElem.attr("data-bind", "ref: "+params.ref +
			(params.valueUpdate ? (", valueUpdate: '" + params.valueUpdate + "'") : "")
		);
		return new juci.controls.text(controlElem);
	},
	selectbox: function(params){
		var controlElem = new juci.elem("<div data-juci='selectbox' data-label='"+params.label+"'></div>").appendTo(params.parent);
		controlElem._formatter = params.formatter;
		controlElem.attr("data-bind",
			"ref: '"+params.ref+"'"+
			", optionsList: " + (params.optionsList ? params.optionsList : '')+
			", optionsText: " + (params.optionsText ? params.optionsText : '')+
			", optionsValue: '" + (params.optionsValue ? params.optionsValue : '')+
			", multiple: '"+ (params.multiple ? params.multiple : '')
		);
		return new juci.controls.selectbox(controlElem);
	},
	events: {
		addEvent: function(evt, el, fn){
			if(el.addEventListener)
				el.addEventListener( evt, fn, false );
			else
				el.attachEvent( "on" + evt, fn);
		},
		init: function(){
			juci.hasTouch = "ontouchstart" in document.body;
			// Detects if touch enabled device, if touch enabled, listen only to touch
			if(juci.hasTouch){
				this.TOUCHSTART = 'touchstart';
				this.TOUCHMOVE = 'touchmove';
				this.TOUCHEND = 'touchend';
				this.TOUCHCANCEL = 'touchcancel';
			}else{
				this.TOUCHSTART = 'mousedown';
				this.TOUCHMOVE = 'mousemove';
				this.TOUCHEND = 'mouseup';
				this.TOUCHCANCEL = 'mouseout';
			}
			this.MOUSEDOWN = 'mousedown';
			this.MOUSEMOVE = 'mousemove';
			this.MOUSEUP = 'mouseup';
			this.MOUSEOUT = 'mouseout';
			this.CLICK = 'click';
		},
		removeEvent: function(evt, el, fn){
			if(el.removeEventListener)
				el.removeEventListener( evt, fn, false );
			else
				el.detachEvent( "on" + evt, fn);
		}
	}
};
// Utility function to add parents properties to child
function extendProtoToObject(child, parent) {
	for(var m in parent.prototype) {
		if(! child[m]) {
			child[m] = parent.prototype[m];
		}
	}
}
juci.inheritPrototypeToObject = extendProtoToObject;
juci.inherit = juci.extend;




//<-------------------------------------------------------JUCI UTILS------------------------------------------------------------->



// Utility methods
juci.utils = {
		base64: {
			encode: function(){
				return btoa.apply(window,arguments);
			},
			decode: function(){
				return atob.apply(window,arguments);
			},
		},
		getPaddedValue: function(val){
			return (val < 10 ? "0" : "") + val;
		},
		defaultComparator: function(item1, item2){
			return item1 == item2;
		},
		getTranslateTransform: function(x, y, z){
			return this.getTransformString(x+"px", y+"px", z+"px", "translate");
		},
		getZoomTransform: function(x, y, z){
			return this.getTransformString(x+"px", y+"px", z+"px", "scale");
		},
		getRotateTransform: function(x, y, z){
			return this.getTransformString(x+"px", y+"px", z+"px", "rotate");
		},
		isEmpty: function(item){
			if(item instanceof Array){
				return item.length == 0;
			}else{
				if(typeof item == "string"){
					item = item.trim();
				}
				return !!!item;
			}
		},
		isNotEmpty: function(item){
			if(item instanceof Array){
				return item.length > 0;
			}else{
				if(typeof item == "string"){
					item = item.trim();
				}
				return !!item;
			}
		},
		testPattern: function(value, pattern){
			return pattern.test(value);
		},
		tests: {
			_StartWithAlphabet: /^[a-z]/,
			_OnlyAlphabets: /^[a-zA-Z]+$/,
			_Email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
			_Number: /^[\d\.\-]+$/,
			_SimpleTel: /^([0-9\(\)\/\+ \-]*)$/,
			_AlphaNumeric: /^[a-zA-Z]+[\d\.\-]+$/,
			startsWithAlphabet: function(v){
				return juci.utils.testPattern(v, juci.utils.tests._StartWithAlphabet);
			},
			alphabets: function(v){
				return juci.utils.testPattern(v, juci.utils.tests._OnlyAlphabets);
			},
			alphaNumeric: function(v){
				return juci.utils.testPattern(v, juci.utils.tests._AlphaNumeric);
			},
			email: function(v){
				return juci.utils.testPattern(v, juci.utils.tests._Email);
			},
			number: function(v){
				return juci.utils.testPattern(v, juci.utils.tests._Number);
			},
			simpleTel: function(v){
				return juci.utils.testPattern(v, juci.utils.tests._SimpleTel);
			},
			isMinSatisfied: function(v, min){
				return parseFloat(v) >= parseFloat(min);
			},
			isMaxSatisfied: function(v, max){
				return parseFloat(v) <= parseFloat(max);
			},
			isMinLengthSatisfied: function(v, l){
				return v.length >= l
			},
			isMaxLengthSatisfied: function(v, l){
				return v.length <= l
			},
			isExactLengthSatisfied: function(v, l){
				return v.length == l;
			},
			isInt: function(n) {
				return !isNaN(n) && parseFloat(n) == parseInt(n, 10);
			},
			isFloat: function(n){
				return !isNaN(n) && parseFloat(n) != parseInt(n, 10);
			},
			isMinDateSatisfied: function(v, d){
				var vDate = juci.utils.getDate(v).valueOf();
				var dDate = juci.utils.getDate(d).valueOf();
				return vDate > dDate;
			},
			isMaxDateSatisfied: function(v, d){
				var vDate = juci.utils.getDate(v).valueOf();
				var dDate = juci.utils.getDate(d).valueOf();
				return vDate < dDate;
			},
			isMinAgeSatisfied: function(v, age){
				var vDate = juci.utils.calculateAge(this.getDate(v));
				var dDate = juci.utils.getDate(d).valueOf();
				return vDate > age;
			},
			isMaxAgeSatisfied: function(v, age){
				var vDate = juci.utils.calculateAge(this.getDate(v));
				var dDate = juci.utils.getDate(d).valueOf();
				return vDate < age;
			},
			isValueIn: function(v, vals, comparator){
				var r = false;
				if(comparator){
					var numVals = vals.length;
					for(var i = 0; i < numVals; i++){
						if(comparator(v, vals[i])){
							r = true;
							break;
						}
					}
				}else{
					r = vals.indexOf(v) > -1;
				}
				return r;
			},
			areValuesIn: function(v, vals, comparator){
				var r = false;
				if(comparator){
					var numVals = vals.length;
					var numV = v.length
					for(var j = 0; j < numV; j++){
						r = false;
						for(var i = 0; i < numVals; i++){
							if(comparator(v, vals[i])){
								r = true;
								break;
							}
						}
						if(r == false){
							break;
						}
					}
				}else{
					r = vals.indexOf(v) > -1;
				}
				return r;
			}
		},
		// http://jsperf.com/birthday-calculation
		calculateAge: function(d){
		  var birthday = + (d instanceof Date ? d : new Date(d));
		  return ~~((Date.now() - birthday) / (31557600000));
		},
		getControlsWithinElem: function(elem){
			var ctrls = [];
			new juci.elem(elem).findByAttr("juci-ctrl-id").forEach(function(el){
				var ctrl = juci.getControl(el);
				if(ctrl && ctrls.indexOf(ctrl) == -1){
					ctrls.push(ctrl);
				}
			});
			return ctrls;
		},
		// memoize.js - by @addyosmani, @philogb, @mathias - memoize2 in http://jsperf.com/comparison-of-memoization-implementations/9
		memoize: function(fn){
			return function () {
				var args = Array.prototype.slice.call(arguments),
				hash = "",
				i  = args.length;
				currentArg = null;
				while(i--){
					currentArg = args[i];
					hash += (currentArg === Object(currentArg)) ?
					JSON.stringify(currentArg) : currentArg;
					fn.memoize || (fn.memoize = {});
				}
				return (hash in fn.memoize) ? fn.memoize[hash] :
					fn.memoize[hash] = fn.apply( this , args );
			};
		} ,
		setInterval: function(fp, ctx, args, delay){
			var cb;
			if(arguments.length == 3){
				cb = this.getCallback(fp, ctx, null);
				delay = args;
			}else if(arguments.length == 4){
				cb = this.getCallback(fp, ctx, args);
			}else{
				throw new TypeError("Illegal Arguments");
			}
			return window.setInterval(cb, delay);
		},
		setTimeout: function(fp, ctx, args, delay){
			var cb;
			if(arguments.length == 3){
				cb = this.getCallback(fp, ctx, null);
				delay = args;
			}else if(arguments.length == 4){
				cb = this.getCallback(fp, ctx, args);
			}else{
				throw new TypeError("Illegal Arguments");
			}
			return window.setTimeout(cb, delay);
		},
		getCallback: function(fp, ctx, args){
			return function(){
				fp.apply(ctx, args ? args : arguments);
			};
		},
		getDelayedCallback: function(fp, ctx, args, delay){
			var cb;
			if(arguments.length == 2){
				delay = ctx;
				cb = fp;
			}else if(arguments.length == 3){
				delay = args;
				cb = this.getCallback(fp, ctx);
			}else if(arguments.length == 4){
				cb = this.getCallback(fp, ctx, args);
			}else{
				throw new TypeError("Illegal Arguments");
			}
			return function(){
				window.setTimeout(cb, delay);
			}
		},
		stopPropagation: function(evt){
			evt.stopPropagation();
		},
		preventDefault: function(evt){
			evt.preventDefault();
		},
		getPageX: function(e){
			return e.pageX;
		},
		getPageY: function(e){
			return e.pageY;
		},
		extendOptions: function(x, w){
			for(var y in w){
				if(w.hasOwnProperty(y) && !x.hasOwnProperty(y)){
					x[y]=w[y];
				}
			}
			return x;
		},
		// check if an element exists in array using a comparer function
		// comparator : function(currentElement)
		inArray: function(array, element, comparator) {
			if(comparator){
				for(var i = 0; i < this.length; i++) {
					if(comparator(element, array[i])) return true;
				}
			}else{
				return array.indexOf(element) > -1;
			}
			return false;
		},
		// adds an element to the array if it does not already exist using a comparer
		// function
		arrayPushIfNotExist: function(array, element, comparator) {
			if(!this.inArray(array, element, comparator)) {
				this.push(element);
			}
		},
		arrayPushAll: function(array, arr) {
			if(arr instanceof Array){
				arr.forEach(function(it){
					array.push(it)
				}, array);
			}else if(arguments){
				for(var i=1;i<arguments.length;i++){
					array.push(arguments[i]);
				}
			}
		},
		arrayPushAllIfNotExist: function(array, arr) {
			if(arr instanceof Array){
				arr.forEach(function(it){
					this.arrayPushIfNotExist(array, it)
				}, this);
			}else if(arguments){
				for(var i=1;i<arguments.length;i++){
					this.arrayPushIfNotExist(array, arguments[i]);
				}
			}
		},

		EmptyMethod: function(){}
};
	
juci.utils.getDate = juci.utils.memoize(function(d){
		return new Date(d);
})




//<-------------------------------------------------------JUCI BROWSER------------------------------------------------------------->



/**#nocode+*/
juci.browser = {
		_isIEFlg: null,
		has3d: function(){
			// https://gist.github.com/3794226
			if(typeof this.is3d == "undefined"){
				var el = document.createElement('p'),
				has3d,
				transforms = {
					'WebkitTransform':'-webkit-transform',
					'OTransform':'-o-transform',
					'MSTransform':'-ms-transform',
					'MozTransform':'-moz-transform',
					'Transform':'transform'
				};

				// Add it to the body to get the computed style
				document.body.insertBefore(el, null);

				for(var t in transforms){
					if( el.style[t] !== undefined ){
						el.style[t] = 'translate3d(1px,1px,1px)';
						has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
					}
				}

				document.body.removeChild(el);

				this.is3d = (has3d !== undefined && has3d.length > 0 && has3d !== "none");
			}
			return this.is3d;
		},
		/**
			@name browserHeight
			@methodOf juci
			@category utilities
			@description Gets the height of the browser viewport.
			@return {Number} The height of the browser viewport
		*/
		height: function(){
			return this.isIE() ? document.documentElement.clientHeight : window.innerHeight;
		},
		isIE: function(){
			if(this.isIEFlg != null)
				return this._isIEFlg;
			if(navigator.appName.toLowerCase().indexOf("explorer") != -1)
				this._isIEFlg = true;
			else
				this._isIEFlg = false;
			return this._isIEFlg;
		},
		/**
			@name requestAnimationFrame
			@methodOf juci
			@category utilities
			@description <i>requestAnimationFrame</i> tells the browser that you wish to perform an animation and requests that the browser schedule a repaint of the window for the next animation frame. This API is a cross browser polyfill. More information on requestAnimationFrame can be found <a target="_blank" href="https://developer.mozilla.org/en-US/docs/DOM/window.requestAnimationFrame">here</a>.
			@param {Function} callback A function to invoke before the browser repaint.
			@param {HTMLElement} [element=document.body] Element which is involved in the animation. For e.g. when doing an animation on canvas, this can be the &lt;canvas&gt; element. This parameter can provide slighter optimized repainting and can be ignored for most cases. Supported only in webkit browsers.
			@param {Object}	[context] A HTMLElement or Object to be used as context in which the <i>callback</i> function should call.
			@param {Array} [args] A list of arguments to be passed to the <i>callback</i> method.
			@return {Number} <i>requestId</i> is a long integer non-zero value that uniquely identifies the <i>callback</i> in the callback list. This value can be passed to the {@link juci#cancelRequestAnimation} method to cancel the refresh callback request.
			@see <a target="_blank" href="https://developer.mozilla.org/en-US/docs/DOM/window.requestAnimationFrame">rAF</a>
			@see <a target="_blank" href="http://creativejs.com/resources/requestanimationframe/">more</a>
		*/
		requestAnimationFrame: function(fp, elem, ctx, args){
			var cb = juci.utils.getCallback(fp, ctx, args);
			return window.requestAnimationFrame(cb, new juci.elem(elem).el);
		},
		/**
			@name cancelAnimationFrame
			@methodOf juci
			@category utilities
			@description Cancels an animation frame request previously scheduled through a call to {@link juci#requestAnimationFrame}
			@param {Number} requestId request id value returned by the call to  {@link juci#requestAnimationFrame} that requested the callback.
		*/
		cancelAnimationFrame: function(id){
			window.cancelAnimationFrame(id);
		},
		/**
			@name browserWidth
			@methodOf juci
			@category utilities
			@description Gets the width of the browser viewport.
			@return {Number} The width of the browser viewport
		*/
		width: function(){
			return this.isIE() ? document.documentElement.clientWidth : window.innerWidth;
		},
		// Specific to IE9 and IE9Mobile
		setUnselectable: juci.utils.EmptyMethod
};





//<-------------------------------------------------------JUCI VIEWMODEL------------------------------------------------------------->




/**#nocode-*/
// Viewmodel
var _viewModelStore = ko.mapping.fromJS({});
juci.viewModel = {

		applyBinding: function(node, data){
			ko.applyBindings(data ? data : _viewModelStore, node);
		},

		_extendBinding: function(ds, keys, key, parentKey){
			if(typeof ds == "function"){
				ds.extend({onChange: {key: key, parentKey: parentKey}});
			}else{
				for(var k in keys){
					this._extendBinding(ds[k], ds[k], k, key);
				}
			}
		},
		
		// Modified
		/**
			@name addDataset
			@methodOf juci
			@category databind
			@description Adds a dataset to the view model referred with the defined key.
			@note <i>addDataset</i> should be done before referencing in the controls. Should be done only once. Every key in the dataset defined becomes observable.
			@param {String} id Identifier/Key reference for the dataset on the view model.
			@param {Object|Boolean|Number|String} value Value of the dataset.
			@param {Boolean} [noDeepMap] If true, only first level of properties are mapped
			@param {Object} mappedData All properties of the object are mapped to the view model.
			@param {Object} [mapping] Mapping configuration
			@signature juci.addDataset(id, value);
			@signature juci.addDataset(mappedData [, mapping]);
			@signature juci.addDataset(id, value [, noDeepCopy]);
			@example #js juci.addDataset("pkey", {"key1": "value1", "key2" : [], "key3" : { "key4": "value4"}});
			#html data-bind="ref: pkey().key1"
			@example #js juci.addDataset("pkey", {"key1": "value1", "key2" : [], "key3" : { "key4": "value4"}}, true);
			#html data-bind="ref: pkey().key3.key4"
			@example #js juci.addDataset("key", "value");
			// All keys are observable, i.e. to access key4, key3().key4 should be used
			juci.addDataset({"key1": "value1", "key2" : [], "key3" : { "key4": "value4"}});
			// key5 will not be observable
			juci.addDataset("key3", {"key5":{"key4": ko.observable("value4")}}, true);
			// Refer key4 as key3.key4
			juci.addDataset({"key1": ko.observable("value1"), key2 : ko.observable([]), key3 : { key4: ko.observable("value4")}}, {copy: ["key3"]});
						@see Knockout <a href="http://knockoutjs.com/documentation/observables.html" target="_blank">observable</a>
					*/
		addDataset: function(id, data, bdontdeepcopy){
			if(typeof id == "object"){
				// id ->  mappedData,data -> mappingProps
				var mappedData = id;
				if(typeof data == "boolean" && data){
					for(var k in mappedData){
						_viewModelStore[k] = mappedData[k];
					}
				}else{
					var mappingProps = data;
					ko.mapping.fromJS(mappedData, mappingProps, _viewModelStore);
				}
				this._extendBinding(_viewModelStore, Object.keys(mappedData));
			}else if(typeof id == "string"){
				if(!bdontdeepcopy || typeof bdontdeepcopy == "object"){
					var ds = {};
					ds[id] = data;
					var mappingProps = !bdontdeepcopy ? null : bdontdeepcopy;
					ko.mapping.fromJS(ds, mappingProps, _viewModelStore);
					this._extendBinding(_viewModelStore[id], [], id);
					return _viewModelStore[id];
				}else{
					if(data instanceof Array){
						_viewModelStore[id] = ko.observableArray(data);
					}else{
						_viewModelStore[id] = ko.observable(data);
					}
				}
				if(_viewModelStore[id].extend){
					_viewModelStore[id].extend({onChange: {parentKey: id}});
				}
				return _viewModelStore[id];
			}
		},
		addFormDataset: function(id, data, mapping){
			if(typeof mapping == "object"){
				var obj = ko.mapping.fromJS(data ? data: {},  mapping);
			}else{
				var obj = ko.mapping.fromJS(data ? data: {});
			}
			_viewModelStore[id] = ko.observable(obj);
			if(_viewModelStore[id].extend){
				_viewModelStore[id].extend({onChange: {parentKey: id}});
			}
			return _viewModelStore[id];
		},
		// TODO Document complex examples for computed dataset using mapping
		/**
			@name addComputedDataset
			@methodOf juci
			@category databind
			@description Adds a dataset that is dependent on one or more other dataset, and will automatically update whenever any of these dependencies change.
			@param {String} id Identifier/Key reference for the dataset on the view model.
			@param {Function} computableFunction A handler to the function which returns the computed value of the dataset based on other values.
					@example #js juci.addComputedDataset("cities", function(){
			var selCountry = this.country();
			this.city(null);
			return selCountry ? selCountry.cities() : [];
		});
					@see juci.addDataset
					@see knockout <a href="http://knockoutjs.com/documentation/computedObservables.html" target="_blank">computedObservable</a>
				*/
		addComputedDataset: function(id, computable){
			// computable is a function with knockout context available
			_viewModelStore[id] = ko.computed(computable, _viewModelStore);
			_viewModelStore[id].extend({onChange: {parentKey: id}});
			return _viewModelStore[id];
		},
		/**
			@name dataset
			@methodOf juci
			@category databind
			@description Gets/Sets the value for the passed key in the view model. Transactional in nature, i.e. any change done to the value returned from the dataset API does not get reflected in the view model. In order to update the view model, the dataset API has to be called in the set mode.
			@note Every key defined becomes observable.
			@param {String} id Identifier/Key reference for the dataset on the view model.
			@param {Object|Boolean|Number|String} [value] Value of the dataset
			@param {Boolean} [noDeepMap] If true, only first level of properties are mapped {Object} Mapping configuration {Object} Mapping configuration
			@param {Object} [mapping] Mapping configuration.
			@signature juci.dataset(id, value);
			@signature juci.dataset(mappedData [, mapping]);
			@signature juci.dataset(id, value [, noDeepCopy]);
		*/
		dataset: function(id, data, bdontdeepcopy){
			if(typeof id == "string"){
				var ds = _viewModelStore[id];
				if(ds != null){
					if(typeof data == "undefined"){
						return ko.mapping.toJS(ds);
					}else{
						if(!bdontdeepcopy || typeof bdontdeepcopy == "object"){
							var ds = {};
							ds[id] = data;
							var mappingProps = !bdontdeepcopy ? null : bdontdeepcopy;
							ko.mapping.fromJS(ds, mappingProps, _viewModelStore);
						}else{
							if(typeof ds == "function"){
								ds(data);
							}else{
								ds = {};
								ds[id] = data;
								ko.mapping.fromJS(ds, _viewModelStore);
							}
						}
					}
				}else{
					this.addDataset(id, data, bdontdeepcopy);
				}
			}else if(typeof id == "object"){
				var ds = id;
				ko.mapping.fromJS(ds, _viewModelStore);
			}
		},
		/**
			@name updateDataset
			@methodOf juci
			@category databind
			@description Update the <a href="http://knockoutjs.com/documentation/observables.html">observable</a> for the passed key and index in the view model.
			@param {String} id Identifier/Key reference for the dataset on the view model.
			@param {Object|Boolean|Number|String} value Value of the dataset
			@param {Number} [index] If the dataset is an array, the index at which the update should happen
		*/
		update: function(key, value, index){
			var ds = _viewModelStore[key];
			if(typeof index == "number"){
				var item = ds()[index];
				ko.mapping.fromJS(value, null, item);
			}else{
				ds(value);
			}
		},
		/**
			@name getDataset
			@methodOf juci
			@category databind
			@description Returns the <a href="http://knockoutjs.com/documentation/observables.html">ko.observable</a> for the passed key. All operations as described in knockout docs can be applied.
			@param {String} id Identifier/Key reference for the dataset on the view model.
			@return {ko.observable} A <a href="http://knockoutjs.com/documentation/observables.html">ko.observable</a>
		*/
		get: function(key){
			return _viewModelStore[key];
		},
		/**
			@name setDataset
			@methodOf juci
			@category databind
			@description Set the <a href="http://knockoutjs.com/documentation/observables.html">observable</a> for the passed key in the view model.
			@param {String} id Identifier/Key reference for the dataset on the view model.
			@param {ko.observable} observable
		*/
		set: function(key, observable){
			_viewModelStore[key] = observable;
		},
		handleAfterRender: function(elements, item, index, ctrlId){
			elements.forEach(function(element){
				element = new juci.elem(element);
			});
			juci.getControl(ctrlId)._afterRender(elements, item, index());
		},
		raiseOnChange: function(modelId, newData, wrapped){
			this.fireEvent(modelId, {newData: newData, wrappedData: wrapped});
		}
};


/**
	@name bindDatasetListener
	@methodOf juci
	@category databind
	@description Adds a listener to a dataset based on the key to the dataset. The listener is called whenever the dataset is modified.
	@note The <i>id</i> referenced is the type of the event.
	@param {String} id Identifier/Key reference for the dataset on the view model.
	@param {Function} handler A handler function to execute when the dataset is changed
	@param {Object} [context] Context in which the <i>handler</i> function should execute.
*/

juci.bindDatasetListener = function(){
	return juci.viewModel.bind.apply(juci.viewModel, arguments);
};
/**
	@name unbindDatasetListener
	@methodOf juci
	@category databind
	@description Removes a listener to a dataset based on the key.
	@param {String} id Identifier/Key reference for the dataset on the view model.
	@param {Function} handler A handler function to execute when the dataset is changed
	@param {Object} [context] Context in which the <i>handler</i> function should execute.
*/
juci.unbindDatasetListener = function(){
	return juci.viewModel.unbind.apply(juci.viewModel, arguments);
};



//<-------------------------------------------------------JUCI CONTROLS------------------------------------------------------------->




// Controls
var _ctrlStore = {},
	_labelString = '<div class="juci_ctrl_label"><label $db class="juci_label_text">$label</label><div class="juci_label_flagctr"></div></div>',
		_label = '$label', _labeldb = "$db";

juci.controls = {
		// Pair a juci elem and a ctrl object in the controls._store for later retrieval
		add: function(elem, ctrl){
			var id = elem.attr("id");
			if(!id){
				id = elem.getId();
			}
			_ctrlStore[id] = ctrl;
			elem.attr("juci-ctrl-id", id);
			return id;
		},
		/**
			@name getControl
			@methodOf juci
			@category query
			@param {String|HTMLElement|juci.elem} id ID of the control, or the element for the control
			@return {basecontrol} A control implementing the basecontrol interface
			@example #js juci.getControl("my-control").value("I set a new value");
		*/
		get: function(elem){
			return _ctrlStore[typeof elem == "string" ? elem : new juci.elem(elem).attr("juci-ctrl-id")];
		},
		remove: function(elem){
			var id = typeof elem == "string" ? elem : new juci.elem(elem).attr("juci-ctrl-id");
			_ctrlStore[id].j.remove();
			delete _ctrlStore[id];
		},
		addLabel: function(elem, binding){
			var lbl = elem.attr("data-label");
			label = _labelString.replace(_label, lbl ? juci.getTranslatedLabel(lbl): "");
			label = label.replace(_labeldb, binding ? "data-bind=\"" + binding + "\"" : "");
			var labelElem = new juci.elem(label);
			elem.append(labelElem);
			return labelElem;
		},
		prependLabel: function(elem){
			var label = elem.attr("data-label");
			label = _labelString.replace(_label, label ? juci.getTranslatedLabel(label): "");
			elem.prepend(label);
		},
		init: function(sElem, qString){
			var controls = juci.findByAttr("data-juci", sElem, false);
			var numControls = controls.length;
			for(var i = 0; i < numControls; i++){
				var controlElem = controls[i];
				var typeAttr = controlElem.getAttr("data-juci", "").toLowerCase();
				if(juci.controls[typeAttr] && controlElem.isChildOf(sElem) && controlElem.parent() != null){
					new juci.controls[typeAttr](controlElem);
				}
			}
			if(numControls > 0){
				juci.browser.setUnselectable(new juci.elem(sElem).el);
			}
		}
};



//<----------------------------------------------------------------------------------------------------------------------------------->

juci.inheritPrototypeToObject(juci, Observable);
juci.inheritPrototypeToObject(juci.viewModel, Observable);



//<-----------------------------------------------------JUCI FNS----------------------------------------------------------------------->


{
var fns = {};
juci.inheritPrototypeToObject(fns, Observable);
fns.exportMethod = juci.exportMethod;
fns.browser = juci.browser;
fns.onReady = juci.onReady;
fns.onBeforeReady = juci.onBeforeReady;
fns.utils = juci.utils;
fns.exportMethod(juci.browser, juci.browser.height, "browserHeight");
fns.exportMethod(juci.browser, juci.browser.width, "browserWidth");
fns.exportMethod(juci.browser, juci.browser.requestAnimationFrame, "requestAnimationFrame");
fns.exportMethod(juci.browser, juci.browser.cancelAnimationFrame, "cancelAnimationFrame");
fns.exportMethod(juci.controls, juci.controls.get, "getControl");
fns.exportMethod(juci.viewModel, juci.viewModel.addDataset, "addDataset");
fns.exportMethod(juci.viewModel, juci.viewModel.addFormDataset, "addFormDataset");
fns.exportMethod(juci.viewModel, juci.viewModel.dataset, "dataset");
fns.exportMethod(juci.viewModel, juci.viewModel.get, "getDataset");
fns.exportMethod(juci.viewModel, juci.viewModel.set, "setDataset");
fns.exportMethod(juci.viewModel, juci.viewModel.update, "updateDataset");
fns.exportMethod(juci.viewModel, juci.viewModel.handleAfterRender, "handleAfterRender");
fns.exportMethod(juci.viewModel, juci.viewModel.addComputedDataset, "addComputedDataset");
fns.exportMethod(juci.events, juci.events.addEvent, "bindDOMEvent");
fns.exportMethod(juci.events, juci.events.removeEvent, "unbindDOMEvent");
fns.extend = function(fp){
	var r = fp.call(juci, juci);
	for(var k in r){
		fns[k] = r[k];
	}
};
juci.fns = fns;
}



//<--------------------------------------------------------------------------------------------------------------------------------------->



window.juci = juci;

/**#nocode+*/
// On Page load juci_init is called.
function juci_init(e){
	juci.translation = window.translations;
	juci.init.call(juci);
}
var transitionEnd = {
	''			: 'transitionend',
	'webkit'	: 'webkitTransitionEnd',
	'Moz'		: 'transitionend',
	'O'			: 'otransitionend',
	'ms'		: 'MSTransitionEnd'
};
function clearForAndroid(){
	juci.onBeforeReady(function(){
		juci.events.MOUSEDOWN = juci.events.TOUCHSTART;
		juci.events.MOUSEMOVE = juci.events.TOUCHMOVE;
		juci.events.MOUSEUP = juci.events.TOUCHEND;
		juci.events.MOUSEOUT = juci.events.TOUCHCANCEL;
		//console.log("ARR CLEARING EVENTS");
	});
}
juci.onBeforeReady(function(){
	var mouseclickori = juci.touchable.prototype._onCaptureMouseClick;
	juci.elem.prototype._onCaptureMouseClick = juci.touchable.prototype._onCaptureMouseClick = function(e){
		if(this._delResult){
			var currRelResult = this._getDelegatee(e);
			if(currRelResult[1] === this._delResult[1]){
				mouseclickori.call(this, e);
			}else{
				this.removeClickListener(e);
				this.removeTouch(juci._currTouch);
				juci._currTouchElem = juci._currTouch = null;
			}
		}else{
			mouseclickori.call(this, e);
		}
	}
});





//<--------------------------------------------------------------OS DETECTION--------------------------------------------------------------------->



// TODO Independent OS Detection and add classes and overrides based on that
if(window.mowbly) {
	$m.juci = juci;
	__mowbly__.Page.addListener("load", juci_init);
	juci.onReady(function(){
		__mowbly__.Page.Header = juci.panel.Header;
		__mowbly__.onUiReady(this);
	}, juci);
	function setOSClass(e){
		document.body.className += " __m_" + e.type;
	}
	mowbly.onAndroid(setOSClass);
	mowbly.onAndroid(clearForAndroid);
	mowbly.onAndroid(function(){
		var useragent = navigator.userAgent;
		useragent = useragent.slice(useragent.indexOf("Android")+8);
		var version = parseFloat(useragent.substring(0,useragent.search(";")));
		if( version >= 5 || version == 4.2){
			juci.elem.prototype.postTouchStart = juci.touchable.prototype.postTouchStart = function(delResult, touchedElement, evtObj, e){
				this.addClickListener(evtObj);
			}
		}
	});
	mowbly.onIOS(function(){
		var useragent = navigator.userAgent;
		useragent = useragent.slice(useragent.indexOf(" OS")+3);
		var version = parseInt(useragent.substring(0,useragent.search("_")));
		if( version >= 8 ){
			juci.elem.prototype.postTouchStart = juci.touchable.prototype.postTouchStart = function(delResult, touchedElement, evtObj, e){
				this.addClickListener(evtObj);
			}
		}
	});
	mowbly.onIOS(function(){
		var mousedownori = juci.touchable.prototype._onCaptureMouseDown;
		juci.elem.prototype._onCaptureMouseDown = juci.touchable.prototype._onCaptureMouseDown = function(e){
			if(e.type === juci.events.TOUCHSTART){
				mousedownori.call(this, e);
			}
		};
	});
	mowbly.onBlackBerry(setOSClass);
	mowbly.onBlackBerry(function(){
		var ori = juci.touchable.prototype.dispose;
		juci.elem.prototype.dispose = juci.touchable.prototype.dispose = function(e){
			ori.call(this, e);
			this._addListener(juci.events.MOUSEDOWN, this._onCaptureMouseDown);
		};
	});
	mowbly.onIPhone(setOSClass);
	mowbly.onIPad(setOSClass);
	mowbly.onWeb(setOSClass);
	mowbly.onWindowsPhone(setOSClass);
	mowbly.onWindowsPhone(function(){
		ko.bindingHandlers.display['_tmpl'] = "<div class='juci_display_container' unselectable='on'></div><div class='juci_display_padder_right'></div>";
		juci.browser.setUnselectable = function(elem){
			z$(elem.el).find("*:not(input):not(select):not(textarea)").attr('unselectable', 'on');
		};
		if(!window.navigator.msPointerEnabled){
			// Override default behavior
			juci.elem.prototype.checkForTouchEvent = juci.touchable.prototype.checkForTouchEvent = function(e){}
			// Do touch only for synthesized mouse events
			var mousedownori = juci.touchable.prototype._onCaptureMouseDown;
			juci.elem.prototype._onCaptureMouseDown = juci.touchable.prototype._onCaptureMouseDown = function(e){
				if(e.__m_synth){
					mousedownori.call(this, e);
				}
			}
			var mouseclickori = juci.touchable.prototype._onCaptureMouseClick;
			juci.elem.prototype._onCaptureMouseClick = juci.touchable.prototype._onCaptureMouseClick = function(e){
				if(this._delResult){
					var currRelResult = this._getDelegatee(e);
					if(currRelResult[1] === this._delResult[1]){
						mouseclickori.call(this, e);
					}else{
						this.removeClickListener(e);
						this.removeTouch(juci._currTouch);
						juci._currTouchElem = juci._currTouch = null;
					}
				}else{
					mouseclickori.call(this, e);
				}
			}
		}else{
			setOSClass({type: "windows8"});
		}
		var evHandler = juci.scrollable.prototype.handleEvent;
		juci.utils.getPageX= function(e){
			return e.clientX;
		};
		juci.utils.getPageY= function(e){
			return e.clientY;
		}
	});
	mowbly.onWeb(function(){
		var vendor = juci.browser.Vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
			(/firefox/i).test(navigator.userAgent) ? 'Moz' :
			(/Trident/i).test(navigator.userAgent) ? 'ms' :
			'opera' in window ? 'O' : "";
		juci.events.TRANSITIONEND = transitionEnd[vendor.toLowerCase()];
		if(vendor === 'ms'){
			if((/MSIE 9.0/i).test(navigator.appVersion)){
				juci.events.TRANSITIONEND =  "";
				juci.browser.setUnselectable = function(elem){
					z$(elem.el).find("*:not(input):not(select):not(textarea)").attr('unselectable', 'on');
				};
				ko.bindingHandlers.display['_tmpl'] = "<div class='juci_display_container' unselectable='on'></div><div class='juci_display_padder_right'></div>";
			}
		}
		if(vendor == ""){
			juci.browser.VendorPrefix = "";
			juci.browser.TransitionProperty = juci.browser.TransitionCSS = "transition";
			juci.browser.TransformProperty = juci.browser.TransformCSS = "transform";
		}else{
			juci.browser.VendorPrefix = "-"+vendor.toLowerCase()+"-";
			juci.browser.TransitionProperty = vendor + "Transition";
			juci.browser.TransformProperty = vendor + "Transform";
			juci.browser.TransitionCSS = juci.browser.VendorPrefix + "transition";
			juci.browser.TransformCSS = juci.browser.VendorPrefix + "transform";
		}
		var postTouchStartOri = juci.elem.prototype.postTouchStart;
		// Remove cancel touch listener for mousemove
		juci.elem.prototype.postTouchStart = juci.touchable.prototype.postTouchStart = function(delResult, touchedElement, evtObj, e){
			var that = this;
			postTouchStartOri.apply(this, arguments);
			// https://code.google.com/p/chromium/issues/detail?id=161464
			if(arguments[0][2] !== this.MAXLEVEL){
				this._removeListener(juci.events.TOUCHMOVE);
			}
		};
	});
	var setVendor = function(vendor){
		juci.browser.Vendor = vendor;
		juci.events.TRANSITIONEND = transitionEnd[vendor];
		juci.browser.VendorPrefix = "-"+vendor.toLowerCase()+"-";
		juci.browser.TransitionProperty = vendor + "Transition";
		juci.browser.TransformProperty = vendor + "Transform";
		juci.browser.TransitionCSS = juci.browser.VendorPrefix + "transition";
		juci.browser.TransformCSS = juci.browser.VendorPrefix + "transform";
	};
	var webkitFn = function(){
		setVendor("webkit");
	};
	var wp7Fn = function(){
		setVendor("ms");
		juci.events.TRANSITIONEND = "";
	};
	mowbly.onIOS(webkitFn);
	mowbly.onAndroid(webkitFn);
	mowbly.onBlackBerry(webkitFn);
	mowbly.onWindowsPhone(wp7Fn);
}else{
	if(window.addEventListener)
		window.addEventListener("load", juci_init, false);
	else
		window.attachEvent("onload", juci_init);
	var vendor = juci.browser.Vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
		(/firefox/i).test(navigator.userAgent) ? 'Moz' :
		(/Trident/i).test(navigator.userAgent) ? 'ms' :
		'opera' in window ? 'O' : "";
	juci.events.TRANSITIONEND = transitionEnd[vendor.toLowerCase()];
	if(vendor === 'ms'){
		if((/MSIE 9.0/i).test(navigator.appVersion)){
			juci.events.TRANSITIONEND =  "";
			juci.browser.setUnselectable = function(elem){
				z$(elem.el).find("*:not(input):not(select):not(textarea)").attr('unselectable', 'on');
			};
			ko.bindingHandlers.display['_tmpl'] = "<div class='juci_display_container' unselectable='on'></div><div class='juci_display_padder_right'></div>";
		}
	}
	if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Apple-i/i)){
		clearForAndroid();
	}
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	if(iOS){
		juci.onBeforeReady(function(){
			juci.documentBody.addClass("__j_ios");
		});
	}
	if(vendor == ""){
		juci.browser.VendorPrefix = "";
		juci.browser.TransitionProperty = juci.browser.TransitionCSS = "transition";
		juci.browser.TransformProperty = juci.browser.TransformCSS = "transform";
	}else{
		juci.browser.VendorPrefix = "-"+vendor.toLowerCase()+"-";
		juci.browser.TransitionProperty = vendor + "Transition";
		juci.browser.TransformProperty = vendor + "Transform";
		juci.browser.TransitionCSS = juci.browser.VendorPrefix + "transition";
		juci.browser.TransformCSS = juci.browser.VendorPrefix + "transform";
	}
}
})(window);



//<---------------------------------------------------------FIRST EXTENSION OF FNS INTERACTABLE,OBSERVABLE,TOUCHABLE--------------------------------------->

juci.fns.extend(function(juci){


	function Interactable(){}
	Interactable.prototype = {
		fireEvent: function(eventName, eventObject, e){
			var superEventName = eventName + eventObject.delegateeSelector;
			eventObject.type = eventName;
			eventObject.currCoords = this.currCoords;
			eventObject.startCoords = this.startCoords;
			eventObject.cancelDefaultAction = false;
			this._super(superEventName, eventObject);
		},
		setEventName: juci.utils.EmptyMethod,
		_addListener: function(evt, fn){
			var that = this;
			this.el["on" + evt] = function(e){fn.call(that, e);};
		},
		_removeListener: function(evt, fn){
			this.el["on" + evt] = null;
		},
		addListener: function(eventName, fp_listener, context, bListenOnce, delegateeSelector){
			var superEventName = eventName + (delegateeSelector ? delegateeSelector : "");
			this._super(superEventName, fp_listener, context, bListenOnce);
		},
		removeListener: function(eventName, fp_listener, context, delegateeSelector){
			var superEventName = eventName + (delegateeSelector ? delegateeSelector : "");
			this._super(superEventName, fp_listener, context);
		},
		calculateInteractionPoint: function(e){
			if(e.targetTouches){
				// TODO: Check for multiple touch support
				return [e.targetTouches[0].pageX, e.targetTouches[0].pageY];
			}else{
				return isNaN(e.clientY) ? [e.pageX, e.pageY] : [e.clientX, e.clientY];
			}
		}
	}
	this.extend(Interactable, Observable);


	this._currTouch = null;
	this._currTouchElem = null;
	var _isAndroid = navigator.userAgent.match(/Android/i);
	// TODO Differentiate between a tap start and scroll start
	function Touchable(el, bSwipe, bMultiple){
		this.el = el;
		this._addListener(juci.events.TOUCHSTART, this._onCaptureMouseDown);
		this._addListener(juci.events.MOUSEDOWN, this._onCaptureMouseDown);
		this.timeStamp;
		this.startCoords;
		this.currCoords;
		this.longTapTimer = null;
		this.bEnableLongTap = false;
		this.bTouched = false
		this.bSwipe = bSwipe;
	};
	/*
		1. Mark element for touch if not marked as disabled
		2. Set timeout, if for 200 ms no touchmove/window scroll happens, then add touch class and touch end, click listeners
		3. Else, clear timeout
		4. There can be only timer at any point of time.
		5. Add event object check for whether touch class can be applied or removed
	*/
	Touchable.prototype = {
		MAXLEVEL: 30000,
		_timeout: _isAndroid ? 0 : 0,
		_addListener: function(evt, fn, delegateeSelector){
			if(delegateeSelector){
				this.addDelegateeSelector(delegateeSelector);
			}
			this._super(evt, fn);
		},
		_onCaptureMouseDown: function(e){
			var delResult = this._getDelegatee(e);
			var touchedElement = delResult[1];
			if(touchedElement != null && e.currentTarget.getAttribute("disabled") == null && touchedElement.getAttribute("disabled") == null){
				if(juci._currTouch != null){
					this.removeTouch(juci._currTouch);
					juci._currTouchElem.dispose();
					juci._currTouchElem = juci._currTouch = null;
				}
				var that = this;
				if(this.bEnableLongTap){
					this.longTapTimer = window.setTimeout(function(){that.fireLongTap(e);}, 500);
				}
				var evtObj = new MDOMEventObject(e, delResult);
				this.fireEvent("beforetouchstart", evtObj);
				if(!evtObj.isCancelled()){
					this._delResult = delResult;
					juci._currTouch = touchedElement;
					juci._currTouchElem = this;
					this.postTouchStart(delResult, touchedElement, evtObj, e);
				}
			}
			this.checkForTouchEvent(e);
		},
		postTouchStart: function(delResult, touchedElement, evtObj, e){
			var that = this;
			if(delResult[2] == this.MAXLEVEL){
				// No delegates
				this.addClickListener(evtObj);
			}else{
				this.touchTimer = window.setTimeout(function(){that.touchTimer = null; that.addClickListener(evtObj);}, this._timeout);

				// Add listener for mouse move if swipe should be captured.
				this._addListener(juci.events.TOUCHMOVE, this._cancelTouch);
				this._addListener(juci.events.TOUCHEND, this._cancelTouch);
				this._addListener(juci.events.TOUCHCANCEL, this._cancelTouch);
				this._addListener(juci.events.MOUSEUP, this._cancelTouch);
				this._addListener(juci.events.MOUSEOUT, this._cancelTouch);
				this._addListener("scroll", this._cancelTouch);

				// The above code is commented because in android version 5.1 touch on elements is not working
				//this.touchTimer = null;
				//this.addClickListener(evtObj);
			}
		},
		checkForTouchEvent: function(e){
			// TODO Check again on all OS. Possible fix for WP7's ugly grey shade here
			if(e.type == "touchstart" && !_isAndroid){
				this._removeListener(juci.events.MOUSEDOWN);
			}
		},
		_cancelTouch: function(evtObj){
			if(juci._currTouchElem){
				juci._currTouchElem.fireEvent("touchcancel", evtObj);
				juci._currTouchElem.dispose();
				juci._currTouchElem = juci._currTouch = null;
			}
		},
		dispose: function(){
			window.clearTimeout(this.touchTimer);
			window.clearTimeout(this.longTapTimer);
			window.removeEventListener("scroll", this._cancelTouch, false);
			this.longTapTimer = this.touchTimer = null;
			this.removeClickListener({"type": "dispose"});
			this.removeTouch(this._delResult[1]);
			this._touchedElement = null;
			this._addListener(juci.events.TOUCHSTART, this._onCaptureMouseDown);
		},
		addClickListener: function(evtObj){
			var e = evtObj.e;
			this.currCoords = this.startCoords = this.calculateInteractionPoint(e);
			this.fireEvent("touchstart", evtObj);
			if(!evtObj.isCancelled()){
				if(_isAndroid){
					//e.preventDefault();
				}
				this.addTouch(this._delResult[1]);
				this._addListener(juci.events.TOUCHMOVE, this._onCaptureMouseMove);
				this._addListener(juci.events.TOUCHEND, this._onCaptureMouseUpOut);
				this._addListener(juci.events.CLICK, this._onCaptureMouseClick);
				this._addListener(juci.events.MOUSEUP, this._onCaptureMouseUpOut);
				this._addListener(juci.events.MOUSEOUT, this._onCaptureMouseUpOut);
				this._addListener(juci.events.TOUCHCANCEL, this._onCaptureMouseUpOut);
				this.startTouch(evtObj);
			}
		},
		startTouch: juci.utils.EmptyMethod,
		removeClickListener: function(e){
			window.clearTimeout(this.touchTimer);
			this.currCoords = this.startCoords = [];
			this._removeListener(juci.events.TOUCHEND);
			this._removeListener(juci.events.TOUCHCANCEL);
			this._removeListener(juci.events.TOUCHMOVE);
			this._removeListener(juci.events.MOUSEUP);
			this._removeListener(juci.events.MOUSEOUT);
			this._removeListener(juci.events.CLICK);
		},
		_onCaptureMouseMove: function(e){
			// TODO Update Co-ordinates - See if touch has moved out of the bounding rect, then raise touchcancel
			var delResult = this._getDelegatee(e);
			var touchedElement = delResult[1];
			//window.clearTimeout(this.longTapTimer);
			if(touchedElement != null){
				//Check if it has gone out of the div
				var rects = touchedElement.getBoundingClientRect();
				var coords = this.currCoords = this.calculateInteractionPoint(e);
				var evtObj = new MDOMEventObject(e, delResult, this.currCoords, this.startCoords);
				// If it is scroller, do not cancel the touch
				if(coords[0] >= rects.left && coords[0] <= rects.right && coords[1] >= rects.top && coords[1] <= rects.bottom){
					// Within bounds
					this.touchMoveWithinBounds(evtObj);
					if(_isAndroid){
						//e.preventDefault();
					}
				}else{
					// Exceeds bounds
					this.touchMoveOutsideBounds(evtObj);
				}
			}else{
				window.clearTimeout(this.longTapTimer);
				this.longTaptimer = null;
				this.removeTouch(juci._currTouch);
				this.removeClickListener(e);
				juci._currTouchElem = juci._currTouch = null;
			}
		},
		touchMoveWithinBounds: function(evtObj){
			this.fireEvent("touchmove", evtObj);
		},
		touchMoveOutsideBounds: function(evtObj){
			window.clearTimeout(this.longTapTimer);
			this.longTaptimer = null;
			this.removeTouch(juci._currTouch);
			this.removeClickListener(evtObj.e);
			juci._currTouchElem = juci._currTouch = null;
			this.fireEvent("touchcancel", evtObj);
		},
		_onCaptureMouseClick: function(e){
			this.removeClickListener(e);
			if(!(this.bEnableLongTap && this.longTapTimer == null)){
				this.fireEvent("tap", new MDOMEventObject(e, this._delResult, this.currCoords, this.startCoords));
			}
			this.removeTouch(juci._currTouch);
			juci._currTouchElem = juci._currTouch = null;
		},
		_onCaptureMouseUpOut: function(e){
			//Multi touch
			window.clearTimeout(this.longTapTimer);
			this.longTapTimer = null;
			if(this.bMultiple){
				// Do previous steps for all touch objects,
				// Timeout to Fire onPinch with grow/shrink parameter
			}else{
				// Single touch
				// Remove listeners for mouse up and mouse move.
				var delResult = this._getDelegatee(e);
				var touchedElement = delResult[1];
				this._removeListener(juci.events.TOUCHEND);
				this._removeListener(juci.events.TOUCHCANCEL);
				this._removeListener(juci.events.TOUCHMOVE);
				this._removeListener(juci.events.MOUSEUP);
				this._removeListener(juci.events.MOUSEOUT);
				if(touchedElement != null){
					// TODO Calculate angle and distance- old Coords and new coords,
					var angle, distance, speed;
					// TODO Calculate speed of the action - old timeStamp and new timeStamp ,from mouse move to mouse up
					var that = this;
					//If speed is above predet val, Timeout to Fire onSwipe event if Swipe capture is turned on.
					if(speed > 100 && this.bSwipe){
						this.fireEvent("swipe");
					}else{
						//Fire tap, touchend event.
						if(e.type == "mouseup" || e.type == "touchend"){
							this.fireEvent("touchend", new MDOMEventObject(e, delResult, this.currCoords, this.startCoords));
							// Synthesized tap for fast click
							if(e.type == "touchend"){
								// TODO - Problem - It is not same as a native click, so blur is not fired, keyboard cannot be opened
								if(document.activeElement){
									document.activeElement.blur();
								}
								// Fire Tap
								this._onCaptureMouseClick(e);
								// TODO Preventing default since click is already fired, mouse events need not be fired
								this.afterMouseClick(e);
							}
							//window.setTimeout(function(){that._cancelTouch(e)}, 300);
						}else{
							this._removeListener(juci.events.CLICK);
							this.removeTouch(juci._currTouch);
							this.fireEvent("touchcancel", new MDOMEventObject(e, delResult, this.currCoords, this.startCoords));
						}
					}
				}else{
					this._removeListener(juci.events.CLICK);
					this.removeTouch(juci._currTouch);
					juci._currTouch = null;
				}
			}
		},
		afterMouseClick: juci.utils.EmptyMethod,
		_getDelegatee: function(e){
			var closestLevel = this.MAXLEVEL, chosenDelegateeSel = "", chosenDelegatee = null;
			var numDelegatees = this._delegateeSelector ? this._delegateeSelector.length : 0;
			if( numDelegatees > 0){
				for(var i = 0; i < numDelegatees; i++){
					var delegateeSel = this._delegateeSelector[i];
					if(delegateeSel){
						var x = z$(e.target);
						var clResult = x.closest(delegateeSel);
						if(clResult.is(delegateeSel) && clResult.level < closestLevel){
							chosenDelegatee = clResult[0];//(elem == this.el) ? null : elem;
							closestLevel = clResult.level;
							chosenDelegateeSel = delegateeSel;
						}
					}
				}
			}else{
				chosenDelegatee = this.el;
			}
			return [chosenDelegateeSel, chosenDelegatee, closestLevel];
		},
		addTouch: function(touchedElement){
			//Add touch class
			if(touchedElement != null){
				this.bTouched = true;
				this.touchTimer = null;
				touchedElement.className += (touchedElement.className.search(" touch") == -1) ? " touch" : "";
			}
		},
		removeTouch: function(touchedElement){
			//Remove touch class.
			if(touchedElement != null){
				this.bTouched = false;
				var that = this;
				//window.setTimeout(function(){that.el.className = that.el.className.replace(" touch", "");}, 180);
				touchedElement.className = touchedElement.className.replace(" touch", "");
			}
		},
		fireLongTap: function(e){
			this.longTapTimer = null;
			var that = this;
			//Remove touch class.
			var delResult = this._getDelegatee(e);
			var touchedElement = delResult[1];
			//this.removeTouch(touchedElement);
			this.removeTouch(juci._currTouch);
			//Remove listeners for mouse up and mouse move.
			this.removeClickListener(e);
			var evtObj = new MDOMEventObject(e, delResult, this.currCoords, this.startCoords);
			evtObj.currentTarget = this.el;
			juci._currTouch = null;
			this.fireEvent("longtap", evtObj);
		},
		addDelegateeSelector: function(delegateeSelector){
			if(!this._delegateeSelector){
				this._delegateeSelector = [delegateeSelector];
			}else if(this._delegateeSelector.indexOf(delegateeSelector) == -1){
				this._delegateeSelector.push(delegateeSelector);
			}
		},
		removeDelegateeSelector: function(delegateeSelector){
			if(!this._delegateeSelector){
				this._delegateeSelector = [];
			}else{
				var iOf = this._delegateeSelector.indexOf(delegateeSelector);
				if(iOf > -1){
					this._delegateeSelector.splice(iOf, 1);
				}
			}
		}
	};
	if(window.$m){
		if($m.isBlackBerry() || $m.isWindowsPhone()){
			Touchable.prototype._timeout = 0;
		}
	}
	// Galaxy tab touch events don't fire properly - https://code.google.com/p/android/issues/detail?id=5491
	// http://uihacker.blogspot.in/2010/10/android-bug-miss-drag-as-we-are-waiting.html
	var GTRegex = /GT-P3100/gi;
	juci.isBuggyAndroidGalaxyTab = GTRegex.test(window.navigator.userAgent);
	if(juci.isBuggyAndroidGalaxyTab){
		Touchable.prototype.postTouchStart = function(delResult, touchedElement, evtObj, e){
			var that = this;
			this.addTouch(this._delResult[1]);
			this._addListener("scroll", function(){
				this.removeTouch(this._delResult[1]);
				window.clearTimeout(x);
			});
			// For GT-P & Android
			var currTarget = e.currentTarget;
			var x = window.setTimeout(function(){
				if(!juci._currTouch){
					return;
				}
				e._currentTarget = currTarget;
				if(document.activeElement){
					document.activeElement.blur();
				}
				that._onCaptureMouseClick(e);
			}, 200);
		}
	}
	this.extend(Touchable, Interactable);
	juci.touchable = Touchable;



	juci.scrollable = iScroll;
	window.addEventListener("scroll", function(e){
		Touchable.prototype._cancelTouch(e);
	}, false);




	return {touchable: Touchable, scrollable: iScroll, interactable: Interactable};

});







/**#nocode-*/
juci.fns.extend(function(juci){



juci.validation = {
		rules: {},
		defineRule: function(ruleDef){
			this.rules[ruleDef.id] = new juci.validation.rule(ruleDef);
		},
		getRuleDefinition: function(ruleName){
			return this.rules[ruleName]();
		},
		getRegexForPattern: juci.utils.memoize(function(pattern, modifier){
			return new RegExp(pattern, modifier);
		})
	};
	
	function verifyWithPattern(v, ptrn, m){
		var reg = juci.validation.getRegexForPattern(ptrn, m);
		return reg.test(v);
	}
	
	function returnTrue(){
		return true;
	}
	
	var preDefinedRules = juci.validation.rules = {
		"required": function(){
			return {
				id: "required",
				message: "Required",
				evaluator: juci.utils.isNotEmpty
			};
		},
		"pattern": function(){
			return {
				id: "pattern",
				message: "Invalid",
				evaluator: verifyWithPattern
			};
		},
		"email": function(){
			return {
				id: "email",
				message: "Email",
				evaluator: juci.utils.tests.email
			};
		},
		"tel": function(){
			return {
				id: "tel",
				message: "Telephone",
				evaluator: juci.utils.tests.simpleTel
			};
		},
		"number": function(){
			return {
				id: "number",
				message: "Number",
				evaluator: juci.utils.tests.number
			};
		},
		"alphabets": function(){
			return {
				id: "alphabets",
				message: "Alphabets",
				evaluator: juci.utils.tests.alphabets
			};
		},
		"alphanumeric": function(){
			return {
				id: "alphanumeric",
				message: "Alphanumeric",
				evaluator: juci.utils.tests.alphaNumeric
			};
		},
		"min": function(){
			return {
				id: "min",
				message: "Minimum",
				pre: ["number"],
				evaluator: juci.utils.tests.isMinSatisfied
			};
		},
		"max": function(){
			return {
				id: "max",
				message: "Maximum",
				pre: ["number"],
				evaluator: juci.utils.tests.isMaxSatisfied
			};
		},
		"minlength": function(){
			return {
				id: "minlength",
				message: "Minimum length",
				pre: ["required"],
				evaluator: juci.utils.tests.isMinLengthSatisfied
			};
		},
		"maxlength": function(){
			return {
				id: "maxlength",
				message: "Maximum length",
				pre: ["required"],
				evaluator: juci.utils.tests.isMaxLengthSatisfied
			};
		},
		"exactlength": function(){
			return {
				id: "exactlength",
				message: "Exact length",
				pre: ["required"],
				evaluator: juci.utils.tests.isExactLengthSatisfied
			};
		},
		"integer": function(){
			return {
				id: "integer",
				message: "Integer",
				pre: ["number"],
				evaluator: juci.utils.tests.isInt
			};
		},
		"float": function(){
			return {
				id: "float",
				message: "Float",
				pre: ["number"],
				evaluator: juci.utils.tests.isFloat
			};
		},
		/*"range": function(){
			return {
				id: "range",
				message: "Range",
				pre: ["min", "max"],
				evaluator: returnTrue
			};
		},*/
		// "Luhn" - for credit card
		"in": function(){
			return {
				id: "in",
				message: "In",
				pre: ["required"],
				evaluator: juci.utils.tests.isValueIn
			};
		},
		//"url"
		//"agreement"
		//"mintime"
		//"maxtime"
		"mindate": function(){
			return {
				id: "mindate",
				message: "Minimum date",
				pre: ["required"],
				evaluator: juci.utils.test.isMinDateSatisfied
			};
		},
		"maxdate": function(){
			return {
				id: "maxdate",
				message: "Maximum date",
				pre: ["required"],
				evaluator: juci.utils.test.isMaxDateSatisfied
			};
		},
		/*"daterange"
		"timerange"
		"mindaterange"
		"maxdaterange"
		"mintimerange"
		"maxtimerange"*/
		"minage": function(){
			return {
				id: "minage",
				messge: "Minimum age",
				pre: ["required"],
				evaluator: juci.utils.test.isMinAgeSatisfied
			};
		},
		"maxage": function(){
			return {
				id: "maxage",
				messge: "Maximum age",
				pre: ["required"],
				evaluator: juci.utils.test.isMaxAgeSatisfied
			};
		}
	};
	/*
		Unique Rule identifier
		Parameters to rule
		Rule execution
		Message
		Pre rules to execute
	*/
	juci.validation.rule = function(opts){
		this.id = opts.id;
		this.params = opts.params || [];
		this.message = opts.message ? opts.message : "";
		opts.pre = opts.pre ? opts.pre : [];
		this.pre = [];
		for(var i = 0; i < opts.pre.length; i++){
			this.pre.push(new juci.validation.rule(juci.validation.getRuleDefinition(opts.pre[i])));
		}
		this.evaluator = opts.evaluator;
	};


	juci.validation.rule.prototype.evaluate = function(v){
		var params = JSON.parse(JSON.stringify(this.params));
		params.unshift(v);
		var numPre = this.pre.length;
		var passed = false;
		var _stack = [], message;
		for(var i = 0; i < numPre; i++){
			var pre = this.pre[i];
			var preResult = pre.evaluate(v);
			if(!preResult.passed){
				_stack = preResult.stack;
				message = preResult.message;
				break;
			}
			for(var j = 0; j < preResult.stack.length; j++){
				_stack.push(preResult.stack[j]);
			}
		}
		if(i === numPre){
			passed = this.evaluator.apply(this, params);
			message = this.message;
			_stack.push({id: this.id, rule: this, result: passed, message: this.message});
		}
		return new juci.validation.result(passed, message, _stack);
	}


	juci.validation.result = function(passed, message, stack){
		this.passed = passed;
		this.message = message;
		this.stack = stack;
	};
	return {};


});








juci.fns.extend(function(juci){
	{
	// Juci Elems
	var _cssVal = {
		_units: /(cm|px|em|pt|%)/,
		_attrs: /(top|right|bottom|left|width|height|min-width|min-height|max-width|max-height)/,
		value: function(attr, val){
			if(typeof val == "undefined" || val === null || val === "")
				return;
			attr = attr.toLowerCase();
			if(this._attrs.test(attr)){
				if((attr == "width" || attr == "height") && parseInt(val) < 0)
					val = 0;
				if(typeof val == "number")
					val = val + "px";
				if(typeof val == "string" && !this._units.test(val))
					val += "px";
			}

			return val;
		}
	};
	var _idCnt = 0,
		_basequery = '[k=v]',
		_cache = {},
		_displaycache = {};
	/**
		@namespace
		@name element
		@augments Observable
		@description juci wrapper on HTMLElement. juci.elem provides helper APIs for DOM manipulation such as <br/>
		Add and remove CSS classes and styles<br/>
		Modify attributes<br/>
		Append, prepend, insert elements<br/>
		Modify innerHTML, innerText, value of the element<br/>
		Query selector APIs to search within the element<br/>
		Get children, firstChild, lastChild<br/>
		Helpers to attach listeners for events such as tap, change, load, etc.<br/>
		@exports element as juci.elem
		@constructor
		@param {HTMLElement} element HTMLElement
	*/
	var element = function(el, useCache){
		if(typeof el === "undefined" || el === null || el == window)
			return el;
		if(typeof el == "string"){
			el = juci.elem.makeElem(el);
			var div = document.createElement("div");
			div.appendChild(el);
			this.el = div.firstChild;
		}else if(el instanceof juci.elem){
			return el;
		}else{
			this.el = el;
		}
		// Text node - no juci
		if(this.el.nodeType == 3){
			return null;
		}
		// caching
		// If's optimized.
		if(!(this.el instanceof Document)){
			if(!(this.el instanceof DocumentFragment)){
				if(this.el.__j_id == null){
					this.el.__j_id = this.el.id ? this.el.id : "__j_" + _idCnt++;
				}
				if(useCache == null || useCache == true){
					if(_cache[this.el.__j_id]){
						return _cache[this.el.__j_id];
					}
					_cache[this.el.__j_id] = this;
				}
			}
		}
		this.el.__j_change = false;
		this.el.__j_keyup = false;
		this.el.__j_keypress = false;
		this.el.__j_touch = false;
		this.el.__j_error = false;
	}
	element.defaultDisplay = function(nodeName) {
		if(!_displaycache[nodeName] ) {
			var elem = document.createElement(nodeName);
			document.body.appendChild(elem);
			if(elem != window.document){
				if(elem.currentStyle != null)
					computedStyle = elem.currentStyle;
				else
					computedStyle = window.getComputedStyle(elem, null);
				display = computedStyle.display;
			}
			document.body.removeChild(elem);
			if ( display === "none" || display === "" ) {
				display = "inline-block";
			}
			_displaycache[nodeName] = display;
		}
		return _displaycache[nodeName];
	},
	/**
		Create a HTMLElement from a string
		@param {String} html HTML String
		@return {HTMLElement} The created element.
		Note: The returned element is not available on the DOM until it is appended to another HTMLElement in DOM
		@hidden
	*/
	element.makeElem = function(html){
		var div = document.createElement("div");
		div.innerHTML = html;
		var fragment = document.createDocumentFragment();
		for(var c=0;c<div.childNodes.length;c++)
			fragment.appendChild(div.childNodes[c]);
		div = null;
		return fragment;
	},
	/**
		Create a CSS class from a selector and style rules
		@param {String} selector Selector for the CSS class
		@param {String} style The sequence of style rules
		@example #js juci.elem.makeClass(".something", "width: 100%; height: 100%");
		@hidden
	*/
	// Add a css class to the stylesheet dynamically
	element.makeClass = function(selector, style) {
		// http://www.happycode.info/
		if (!document.styleSheets) {
			return;
		}
		if (document.getElementsByTagName("head").length == 0) {
			return;
		}
		var stylesheet;
		var mediaType;
		if (document.styleSheets.length > 0) {
			for (i = 0; i < document.styleSheets.length; i++) {
				if (document.styleSheets[i].disabled) {
					continue;
				}
				var media = document.styleSheets[i].media;
				mediaType = typeof media;
				if (mediaType == "string") {
					if (media == "" || (media.indexOf("screen") != -1)) {
						styleSheet = document.styleSheets[i];
					}
				} else if (mediaType == "object") {
					if (media.mediaText == "" || (media.mediaText.indexOf("screen") != -1)) {
						styleSheet = document.styleSheets[i];
					}
				}
				if (typeof styleSheet != "undefined") {
					break;
				}
			}
		}
		if (typeof styleSheet == "undefined") {
			var styleSheetElement = document.createElement("style");
			styleSheetElement.type = "text/css";
			document.getElementsByTagName("head")[0].appendChild(styleSheetElement);
			for (i = 0; i < document.styleSheets.length; i++) {
				if (document.styleSheets[i].disabled) {
					continue;
				}
				styleSheet = document.styleSheets[i];
			}
			var media = styleSheet.media;
			mediaType = typeof media;
		}
		if (mediaType == "string") {
			styleSheet.addRule(selector, style);
		} else if (mediaType == "object") {
			styleSheet.insertRule(selector + "{" + style + "}", styleSheet.cssRules.length);
		}
	};
	/**
		@methodOf juci
		@name findById
		@category query
		@description Finds an element that has the specified value in its 'id' attribute.
		@param {String} id A string containing the id of element.
		@return {juci.elem} A {@link juci.elem} that has the specified id value; <i>null</i>, otherwise.
		@example #js juci.findById("something");
	*/
	element.findById = function(id){
		var ret = document.getElementById(id);
		if(ret != null)
			return new juci.elem(ret);
		else
			return ret;
	};
	// Using zepto, query selectors are executed and returns an array of juci.elem
	/**
		@methodOf juci
		@name find
		@category query
		@description Find elements that match the specified CSS selector. You can optionally specify a HTML element which children are matched against the selector.
		@param {String} selector A string containing a selector expression.
		@param {HTMLElement} [element=document.body] A HTML element to be used as context for the search.
		@return {Array} An array of {@link juci.elem}s that match the selector.
		@example #js juci.find(".something[attribute]");
		@note To use array based functions, use juci.find(queryString).all.<i>methodName</i> to access helpers provided by <a target="_blank" href="http://www.zeptojs.com">zeptojs</a> interfaces.
	*/
	element.find = function(query, sElem, bUseCache){
		var resNodes = z$(query, sElem);
		var numRes = resNodes.length;
		var result = [];
		resNodes.each(function(resNode){
			result.push(new juci.elem(this, bUseCache));
		});
		result.all = resNodes;
		return result;
	};
	/**
		@methodOf juci
		@name findByAttr
		@category query
		@description Find elements that have the specified attribute. You can optionally specify a HTML element which children are searched for the specified attribute.
		@param attribute {String} A string containing the name of the attribute.
		@param [element=document.body] {HTMLElement} A HTML element to be used as context for the search.
		@return {Array} Array of {@link juci.elem} objects
		@example #js juci.findByAttr("something");
		@note To use array based functions, use juci.findByAttr(attr).all.<i>methodName</i> to access helpers provided by <a target="_blank" href="http://www.zeptojs.com">zeptojs</a> interfaces.
	*/
	element.findByAttr = function(attr, sElem, bUseCache){
		var query = '['+attr+']';
		return juci.elem.find(query, sElem, bUseCache);
	};
	/**
		@methodOf juci
		@name findByAttrVal
		@category query
		@description Find elements that have the specified attribute and value. You can optionally specify a HTML element which children are searched for the attribute value.
		@param {String} attribute A string containing the name of the attribute.
		@param {String} value A string containing the value of the attribute.
		@param {HTMLElement} [element=document.body] {HTMLElement} A HTML element to be used as context for the search.
		@return {Array} An array of {@link juci.elem}s that match the selector.
		@example #js juci.findByAttrVal("something", "value");
		@note To use array based functions, use juci.findByAttrVal(attr, val).all.<i>methodName</i> to access helpers provided by <a target="_blank" href="http://www.zeptojs.com">zeptojs</a> interfaces.
	*/
	element.findByAttrVal = function(attr, val, sElem, bUseCache){
		var query = "["+attr+"='"+val+"']";
		return this.find(query, sElem, bUseCache);
	};
	/**
		@methodOf juci
		@name findByAttrParam
		@category query
		@description Find elements that have the specified attributes and values. You can optionally specify a HTML element which children are searched for the attribute value.
		@param {Object} param An object containing attribute names as keys and attribute values as values.
		@param {HTMLElement} [element=document.body] {HTMLElement} A HTML element to be used as context for the search.
		@return {Array} An array of {@link juci.elem}s that match the selector.
		@example #js juci.findByAttrParam({"something": "value", "somethingElse", "anothervalue"});
		@note To use array based functions, use juci.findByAttrParam(queryObject).all.<i>methodName</i> to access helpers provided by <a target="_blank" href="http://www.zeptojs.com">zeptojs</a> interfaces.
	*/
	element.findByAttrParam = function(params, sElem, bUseCache){
		var query = "";
		params.forEach(function(param){
			query += _basequery.replace("k", param.attr).replace("v", param.val);
		});
		return this.find(query, sElem, bUseCache);
	};
	/**
		@methodOf juci
		@name findByClass
		@category query
		@description Find elements that have the specified class. You can optionally specify a HTML element which children are searched for the specified class.
		@param {String} className A string containing the name of the class.
		@param {HTMLElement} [element=document.body] {HTMLElement} A HTML element to be used as context for the search.
		@return {Array} An array of {@link juci.elem}s that match the selector.
		@example #js juci.findByClass("something");
		@note To use array based functions, use juci.findByClass(className).all.<i>methodName</i> to access helpers provided by <a target="_blank" href="http://www.zeptojs.com">zeptojs</a> interfaces.
	*/
	element.findByClass = function(className, sElem, bUseCache){
		return this.find("."+className, sElem, bUseCache);
	};
	/**
		@methodOf juci
		@name findByTag
		@category query
		@description Find elements that have the specified tag. You can optionally specify a HTML element which children are searched for the specified tag.
		@param {String} tag A string containing the name of the tag.
		@param {HTMLElement} [element=document.body] {HTMLElement} A HTML element to be used as context for the search.
		@return {Array} An array of {@link juci.elem}s that match the selector.
		@example #js juci.findByTag("input");
		@note To use array based functions, use juci.findByTag(tagName).all.<i>methodName</i> to access helpers provided by <a target="_blank" href="http://www.zeptojs.com">zeptojs</a> interfaces.
	*/
	element.findByTag = function(tag, sElem, bUseCache){
		return this.find(tag, sElem, bUseCache);
	};
	/**
		@name closest
		@methodOf juci
		@category query
		@description Find the closest matching parent for the CSS selector from the specified HTML element.
		@param {String} selector A string containing a selector expression.	element
		@param {HTMLElement} element A HTML element to be used as context for the search.
		@return {juci.elem} A {@link juci.elem} that matches the selector; <i>null</i>, otherwise.
		@example #js juci.closest(".something", juci.findById("selement"));
	*/
	element.closest = function(query, sElem, bUseCache){
		var resNodes = z$(sElem).closest(query);
		return resNodes[0] ? (new juci.elem(resNodes[0], bUseCache)) : null;
	};
	{
	juci.exportMethod(element, element.findByClass, "findByClass");
	juci.exportMethod(element, element.findByTag, "findByTag");
	juci.exportMethod(element, element.findByAttr, "findByAttr");
	juci.exportMethod(element, element.findByAttrVal, "findByAttrVal");
	juci.exportMethod(element, element.findByAttrParam, "findByAttrParam");
	juci.exportMethod(element, element.findByTag, "findByTag");
	juci.exportMethod(element, element.findById, "findById");
	juci.exportMethod(element, element.find, "find");
	juci.exportMethod(element, element.closest, "closest");
	}
	// Clear element from cache
	element.prototype = {
		_clearFromCache: function(){
			delete _cache[this.el.__j_id];
			delete this.el.__j_id;
		},
		_onGeneric: function(elem, evtName){
			return function(e){
				var evt = new MDOMEventObject(e);
				evt.value = e.target.value;
				elem.fireEvent(evtName, evt);
			}
		},
		_onKeyUp: function(elem){
			return function(e){

				if([9, 37, 38, 39, 40].indexOf(e.keyCode) > -1 || (e.keyIdentifier && (!e.keyIdentifier.startsWith("U+")))){
					return;
				}
				window.clearTimeout(elem.__j_timer);
				elem.__j_timer = juci.utils.setTimeout(function(){
					//(e.keyIdentifier && e.keyIdentifier.startsWith("U+")) ||
					if(e.keyCode){
						var evt = new MDOMEventObject(e);
						evt.value = e.target.value;
						elem.fireEvent("keyup", evt);
					}
				}, elem, 50);
			}
		},
		// Helper to set the default display style of the element. Called on creating the element
		_setDefaultDisplay: function(bSet){
			this._computedDisplay = window.getComputedStyle(this.el).display;
			var retArr = ["", false];
			if(this._computedDisplay != "none"){
				retArr[0] = this._computedDisplay;
			}
			if(this._computedDisplay != null && this._computedDisplay != 'none')
				retArr[1] = true;
			if(bSet){
				this.el.__j_display = retArr[0];
				this.el.__j_visible = retArr[1];
			}
			return retArr;
		},
		// Subscribe to touch events - Done for touchstart, touchmove, touchend and click.
		_subscribeTouch: function(delegateeSelector){
			if(!this.el.__j_touch){
				this._addListener("scroll", function(e){
						this._cancelTouch(e);
				});
				this._addListener(juci.events.TOUCHSTART, this._onCaptureMouseDown, delegateeSelector);
				this._addListener(juci.events.MOUSEDOWN, this._onCaptureMouseDown, delegateeSelector);
				this.el.__j_touch = true;
			}else if(delegateeSelector){
				this.addDelegateeSelector(delegateeSelector);
			}
		},
		subscribeTouch: function(){
			this._subscribeTouch();
		},
		unsubscribeTouch: function(){
			this.removeClick();
		},
		/**
			@memberOf juci.elem.prototype
			@description Adds a class(es) to element if it does not already have it.
			@param {String} className Name of the css class(es) to be added to the element. If multiple classes are to be added, <i>className</i> should be a String of class names separated with space.
			@example #js juci.findById("elem").addClass("awesome_class");
			@example #js juci.findById("elem").addClass("awesome_class another_awesome_class");
		*/
		addClass: function(className){
			if(!this.hasClass(className)){
				var elClass = this.el.className;
				if(elClass != ""){
					this.el.className = elClass + " " + className;
				}else{
					this.el.className = className;
				}
			}
			return this;
		},
		addEvent: function(eventName, fn, context, mCallback, preBindCallback){
			var propName = "__j_"+eventName;
			if(!this.el[propName]){
				if(preBindCallback){
					preBindCallback.call(this);
				}
				this.el[propName] = mCallback.call(this);
				juci.bindDOMEvent(eventName, this.el, this.el[propName]);
			}
			this.addListener(eventName, fn, context);
		},
		/**
			@memberOf juci.elem.prototype
			@description Appends html (String/{@link juci.elem}) to the element
			@param {juci.elem|String} element
			@see juci.elem.appendTo
			@see juci.elem.prepend
			@see juci.elem.prependTo
		*/
		append: function(html){
			if(html instanceof juci.elem){
				html.appendTo(this);
			}else if(typeof html == "string"){
				html = juci.elem.makeElem(html);
				this.el.appendChild(html);
			}
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Appends the current element to the passed element
			@param {juci.elem} elem
			@see juci.elem.append
			@see juci.elem.prepend
			@see juci.elem.prependTo
		*/
		appendTo: function(el){
			if(el instanceof juci.elem)
				el = el.el;
			el.appendChild(this.el);
			this.el = el.lastChild;
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets an attribute of the element. If <i>value</i> is passed, the method sets the value of the attribute.
			@param {String} name
			@param {String} [value]
			@return {String} Value of the attribute if <i>value</i> is not passed.
			@example #js var indexAttr = juci.findById("item").attr("data-index");
			@example #js juci.findById("another-item").attr("data-index", 20);
		*/
		attr: function(aName, aValue){
			if(typeof aValue == "undefined"){
				return this.el.getAttribute(aName);
			}else{
				if(typeof aName == "string"){
					this.el.setAttribute(aName,aValue);
				}else if(typeof aName == "object"){
					for(var key in aName){
						this.el.setAttribute(key, aName[key]);
					}
				}
			}
		},
		getAttr: function(aName, defaultVal){
			var a = this.el.getAttribute(aName);
			return a ? a : defaultVal;
		},
		/**
			@memberOf juci.elem.prototype
			@description Checks if an attribute is present on the element.
			@param {String} name
			@return {Boolean} True if attribute is found, else False.
			@example #js juci.findById("another-item").hasAttr("data-index");
		*/
		hasAttr: function(aName){
			return this.el.hasAttribute(aName)
		},
		/**
			@memberOf juci.elem.prototype
			@description Calls DOM Blur on the element.
			@see MDN <a href="https://developer.mozilla.org/en-US/docs/DOM/element.blur" target="_blank">link</a>
		*/
		blur: function(){
			this.el.blur();
		},
		/**
			@memberOf juci.elem.prototype
			@description Returns the child nodes of the element.
			@param {String} [selector] CSS selector to select matching children.
			@return {Array} Array of juci.elem children of the element matching the selector if passed.
		*/
		children: function(selector){
			var retArr = [];
			var resNodes = z$(this.el).children(selector);
			var numRes = resNodes.length;
			var result = [];
			resNodes.each(function(resNode){
				result.push(new juci.elem(this));
			});
			result.all = resNodes;
			return result;
		},
		onBeforeTouchStart: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.addListener("beforetouchstart", fn, context, false, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Clones the current element.
			@return {juci.elem} cloned copy of the current element.
		*/
		clone: function(){
			var clone = this.el.cloneNode(true);
			return new juci.elem(clone, false);
		},
		/**
			@memberOf juci.elem.prototype
			@description Find the closest matching parent for the CSS selector from the specified HTML element.
			@param {String} selector A string containing a selector expression.	element
			@return {juci.elem} A {@link juci.elem} that matches the selector; <i>null</i>, otherwise.
			@example #js juci.findById("").closest(".something", juci.findById("selement"));
		*/
		closest: function(query){
			return juci.elem.closest(query, this.el);
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets/Sets CSS property values to the element
			@param {String|Object} css Name of the CSS property. If <i>Object</i>, it should be a JSON object of property names and values.<a href="http://www.comptechdoc.org/independent/web/cgi/javamanual/javastyle.html" target="_blank">For a list of javascript equivalents for CSS property names</a>
			@param {String} [value] Value of the CSS property to be set.
			@return {String} Returns the value of the CSS property if <i>css</i> is a String and <i>value</i> is <i>undefined</i>.
			@example #js juci.findById("item").css("zIndex");
			@example #js juci.findById("item").css("visibility", "hidden");
			@example #js juci.findById("item").css({"zIndex": 1, "visibility": "visible"});
		*/
		css: function(css, val){
			var elStyle = this.el.style;
			// If object iterate through keys and set the value
			if(typeof css == "object"){
				for(var key in css){
					// If css[key] = null or empty string, remove the element.style, by setting empty string. Shouldn't happen if css[key] = 0
					if( !("" + css[key])){
							elStyle[key] = '';
					}else
						elStyle[key] = _cssVal.value(key, css[key]);
				}
			}else if(css != null && typeof val != "undefined"){
				// If val = null or empty string, remove the element.style, by setting empty string. Shouldn't happen if val = 0
				if(!("" + val)){
						elStyle[css] = '';
				}else
					elStyle[css] = _cssVal.value(css, val);
			}else{
				if(this.el != window.document){
					if(this.el.currentStyle){//IE
						return this.el.currentStyle[css];
					}else{
						return window.getComputedStyle(this.el)[css];
					}
				}else
					return null;
			}
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Disables the element by setting the disabled attribute of the element
		*/
		disable: function(){
			this.el.setAttribute("disabled", "true");
		},
		/**
			@memberOf juci.elem.prototype
			@description Empties the content inside the html
		*/
		empty: function(){
			this.el.innerHTML = "";
		},
		/**
			@memberOf juci.elem.prototype
			@description Enables the element by resetting the disabled attribute of the element.
		*/
		enable: function(){
			this.el.removeAttribute("disabled");
		},
		/**
			@memberOf juci.elem.prototype
			@description Find elements that match the specified CSS selector with the current element as the context.
			@param {String} selector A string containing a CSS selector expression.
			@return {Array} An array of {@link juci.elem}s that match the selector.
			@example #js juci.findById("item").find("#something[attribute]");
		*/
		find: function(query, bUseCache){
			return juci.find(query, this.el, bUseCache);
		},
		/**
			@memberOf juci.elem.prototype
			@description  Find elements that have the specified attribute with the current element as the context.
			@param {String} attribute A string containing the name of the attribute.
			@return {Array} An array of {@link juci.elem}s.
		*/
		findByAttr: function(attr, bUseCache){
			return juci.findByAttr(attr, this.el, bUseCache);
		},
		/**
			@memberOf juci.elem.prototype
			@description  Find elements that have the specified attribute and value with the current element as the context.
			@param {String} attribute A string containing the name of the attribute.
			@param {String} value A string containing the value of the attribute.
			@return {Array} An array of {@link juci.elem}s that match the selector.
		*/
		findByAttrVal: function(attr, val, bUseCache){
			return juci.findByAttrVal(attr, val, this.el, bUseCache);
		},
		/**
			@memberOf juci.elem.prototype
			@description Find elements that have the specified attributes and values with the current element as the context.
			@param {Object} param An object containing attribute names as keys and attribute values as values.
			@return {Array} An array of {@link juci.elem}s.
		*/
		findByAttrParam: function(param, bUseCache){
			return juci.findByAttrParam(param, this.el, bUseCache);
		},
		/**
			@memberOf juci.elem.prototype
			@description Find elements that have the specified class with the current element as the context.
			@param {String} className A string containing the name of the class.
			@return {Array} An array of {@link juci.elem}s.
		*/
		findByClass: function(className, bUseCache){
			return juci.findByClass(className, this.el, bUseCache);
		},
		/**
			@memberOf juci.elem.prototype
			@description Finds an element that has the specified value in its 'id' attribute.
			@param {String} id A string containing the id of element.
			@return {juci.elem} A {@link juci.elem} that has the specified id value; <i>null</i>, otherwise.
			@see juci.findById
		*/
		findById: function(id){
			return juci.findById(id);
		},
		/**
			@memberOf juci.elem.prototype
			@description Find elements that have the specified tag with the current element as the context.
			@param {String} tag A string containing the name of the tag.
			@return {Array} An array of {@link juci.elem}s.
		*/
		findByTag: function(tag, bUseCache){
			return juci.findByTag(tag, this.el, bUseCache);
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets the first child of the element
			@return {juci.elem}
		*/
		firstChild: function(){
			return this.el.firstElementChild ? new juci.elem(this.el.firstElementChild) : null;
		},
		/**
			@memberOf juci.elem.prototype
			@description Calls DOM Focus on element
			@see MDN <a href="https://developer.mozilla.org/en-US/docs/DOM/element.focus" target="_blank">link</a>
			@note To open the keyboard on an input, <i>focus</i> should be called in a touch event or click callback.
		*/
		focus: function(){
			if(document.activeElement !== this.el){
				this.el.focus();
			}
		},
		getId: function(){
			return this.el.__j_id;
		},
		/**
			@memberOf juci.elem.prototype
			@description Returns true if the element has the className specified else false
			@param {String} className Name of the CSS class
			@return {Boolean}
		*/
		hasClass: function(className){
			var elClass = this.el.className;
			var clazzes = this.el.className.split(" ");
			for(var i = 0; i<clazzes.length; i++){
				if(clazzes[i] === className){
					return true;
				}
			}
			return false;
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets/Sets the height of the element.
			@param {Number} [val] Height to be set for the element.
			@return {Number} Height of the element, if <i>val</i> is <i>undefined</i>
			@note <i>elem.height()</i> will always return the content height, regardless of the value of the CSS box-sizing property.
		*/
		height: function(val){
			var bt=0, bb=0, pt=0, pb=0;
			if(this.css("borderTop") != null && this.css("borderTop") != "")
				bt = parseInt(this.css("borderTop"));

			if(this.css("borderBottom") != null && this.css("borderBottom") != "")
				bb = parseInt(this.css("borderBottom"));

			if(this.css("paddingTop") != null && this.css("paddingTop") != "")
				pt = parseInt(this.css("paddingTop"));

			if(this.css("paddingBottom") != null && this.css("paddingBottom") != "")
				pb = parseInt(this.css("paddingBottom"));

			if(val != null)
				this.css("height",(val-(bt+bb+pt+pb)) + "px");
			else
				return this.el.offsetHeight - (bt+bb+pt+pb);
		},
		/**
			@memberOf juci.elem.prototype
			@description Hides the element.
		*/
		hide: function(delay){
			if(delay){
				juci.utils.setTimeout(this.hide, this, delay);
			}else{
				var r = this._setDefaultDisplay();
				if(r[1]){
					this.el.__j_display = this._computedDisplay;
					this.el.style.display = 'none';
					this.el.__j_visible = false;
				}
			}
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets/Sets inner HTML of the element.
			@param {String} [htmlString] Inner html content to be set.
			@return {String} The inner HTML content of the element if <i>htmlString</i> is <i>undefined</i>.
		*/
		html: function(html){
			if(typeof html === "undefined")
				return this.el.innerHTML;
			else
				this.el.innerHTML = html;
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Inserts the element after the specified element.
			@param {HTMLElement|juci.elem} elem
			@see juci.elem.insertBefore
		*/
		insertAfter: function(el){
			if(el instanceof juci.elem)
				el = el.el;
			var parent = el.parentNode;
			if(parent.lastChild == el)
				parent.appendChild(this.el);
			else
				parent.insertBefore(this.el, el.nextSibling);
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Inserts the element before the specified element.
			@param {HTMLElement|juci.elem} elem
			@see juci.elem.insertAfter
		*/
		insertBefore: function(el){
			if(el instanceof juci.elem)
				el = el.el;
			el.parentNode.insertBefore(this.el, el);
			this.el = el.previousSibling;
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Checks if the element has no inner HTML content.
			@return {Boolean} True if empty, else false.
		*/
		isEmpty: function(){
			return !!!this.el.innerHTML;
		},
		isVisible: function(){
			this._setDefaultDisplay(true);
			return this.el.__j_visible;
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets the last child of the element
			@return {juci.elem}
		*/
		lastChild: function(){
			return this.el.lastElementChild ? new juci.elem(this.el.lastElementChild) : null;
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets the offset of the element.
			@return {Object} offset Offset configuration as given below
			@return {String} offset.top The top offset of the element from the beginning of the page
			@return {String} offset.left The left offset of the element from the beginning of the page
			@return {String} offset.height The height of the element
			@return {String} offset.width The width of the element
			@example #js juci.findById("item").offset({"left" : leftVal, "top": topVal, "width": widthVal, "height": heightVal});
		*/
		offset: function(){
			var currLeft = this.el.offsetLeft, currTop = this.el.offsetTop;
			var parent = this.el.parentNode;
			while(parent != null && parent.nodeType == 1){
				var pStyle;
				if(parent != window.document){
					if(window.getComputedStyle != null)
						pStyle = window.getComputedStyle(parent);
					else
						pStyle = parent.currentStyle;
				}
				if(pStyle.position.toLowerCase() != "static"){
					if(parent.offsetLeft != null)
						currLeft += parent.offsetLeft;
					if(parent.offsetTop != null)
						currTop += parent.offsetTop;
				}
				parent = parent.parentNode;
			}
			return {'left':currLeft,'top':currTop,'width':this.el.offsetWidth,'height':this.el.offsetHeight};
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:blur} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:blur} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onBlur: function(fn, context){
			this.addEvent("blur", fn, context, function(){
				return this._onGeneric(this, "blur");
			});
		},
		/*
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:change} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:change} event fires.
			@param {object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onChange: function(fn, context){
			this.addEvent("change", fn, context, function(){
				return this._onGeneric(this, "change");
			});
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:tap} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:tap} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see juci.elem.onTap
			@note When the element is being tapped or clicked, a CSS class <i>touch</i> is added to the element to add visual changes on the element.
		*/
		onClick: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.addListener("tap", fn, context, false, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to be called <b>once</b> when the {@link juci.elem#event:tap} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:tap} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see juci.elem.onClick
			@note This listener is automatically removed after the first instance of the <i>tap</i> fired.
		*/
		onClickOnce: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.addListener("tap", fn, context, true, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:error} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:error} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onError: function(fn, context){
			this.addEvent("error", fn, context, function(){
				return this._onGeneric(this, "error");
			});
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:focus} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:focus} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onFocus: function(fn, context){
			this.addEvent("focus", fn, context, function(){
				return this._onGeneric(this, "focus");
			});
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:input} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:input} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onInput: function(fn, context){
			this.addEvent("input", fn, context, function(){
				return this._onGeneric(this, "input");
			});
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:keyup} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:keyup} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onKeyUp: function(fn, context){
			this.addEvent("keyup", fn, context, function(){
				return this._onKeyUp(this);
			}, function(){
				this.attr("autocapitalize", "none");
				this.attr("autocomplete", "off");
			});
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:keydown} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:keydown} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onKeyDown: function(fn, context){
			this.addEvent("keydown", fn, context, function(){
				return this._onGeneric(this, "keydown");
			});
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:keypress} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:keypress} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onKeyPress: function(fn, context){
			this.addEvent("keypress", fn, context, function(){
				return this._onGeneric(this, "keypress");
			});
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:longtap} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:longtap} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@note When the element is being tapped or clicked, a CSS class <i>touch</i> is added to the element to add visual changes on the element.
		*/
		onLongTap: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.bEnableLongTap = true;
			this.addListener("longtap", fn, context, false, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:load} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:load} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onLoad: function(fn, context){
			this.addEvent("load", fn, context, function(){
				return this._onGeneric(this, "load");
			});
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:tap} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:tap} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see juci.elem.onClick
			@note When the element is being tapped or clicked, a CSS class <i>touch</i> is added to the element to add visual changes on the element.
		*/
		onTap: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.addListener("tap", fn, context, false, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:touchcancel} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:touchcancel} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onTouchCancel: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.addListener("touchcancel", fn, context, false, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:touchend} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:touchend} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onTouchEnd: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.addListener("touchend", fn, context, false, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:touchmove} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:touchmove} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onTouchMove: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.addListener("touchmove", fn, context, false, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Registers a handler function to call when the {@link juci.elem#event:touchstart} event fires.
			@param {Function} handler A handler function to execute when the {@link juci.elem#event:touchstart} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onTouchStart: function(fn, context, delegateeSelector){
			this._subscribeTouch(delegateeSelector);
			this.addListener("touchstart", fn, context, false, delegateeSelector);
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets the outer height of the element.
			@return {Number}
		*/
		outerHeight: function(bUseMargin){
			if(bUseMargin){
				if(this.css("marginTop") != null && this.css("marginTop") != "")
					mt = parseInt(this.css("marginTop"));
				if(this.css("marginBottom") != null && this.css("marginBottom") != "")
					mb = parseInt(this.css("marginBottom"));
			}
			if(!bUseMargin)
				return this.el.offsetHeight;
			else
				return this.el.offsetHeight + mt + mb;
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets the outer width of the element.
			@return {Number}
		*/
		outerWidth: function(bUseMargin){
			if(bUseMargin){
				if(this.css("marginLeft") != null && this.css("marginLeft") != "")
					ml = parseInt(this.css("marginLeft"));
				if(this.css("marginRight") != null && this.css("marginRight") != "")
					mr = parseInt(this.css("marginRight"));
			}
			if(!bUseMargin)
				return this.el.offsetWidth;
			else
				return this.el.offsetWidth + ml + mr;
		},
		/**
			@memberOf juci.elem.prototype
			@description Returns parent of the current node.
			@return {juci.elem}
		*/
		parent: function(){
			return this.el.parentNode ? new juci.elem(this.el.parentNode) : null;
		},
		/**
			@memberOf juci.elem.prototype
			@description Prepends html content(String/juci.elem) to the element
			@see juci.elem.append
			@see juci.elem.appendTo
			@see juci.elem.prependTo
		*/
		prepend: function(html){
			if(html instanceof juci.elem){
				html.prependTo(this);
			}else if(typeof html == "string"){
				html = juci.elem.makeElem(html);
				if(this.el.firstChild)
					this.el.insertBefore(html, this.el.firstChild);
				else
					this.el.appendChild(html);
			}
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Prepends the element to the passed element
			@param {juci.elem} elem
			@see juci.elem.append
			@see juci.elem.appendTo
			@see juci.elem.prepend
		*/
		prependTo: function(el){
			if(el instanceof juci.elem)
				el = el.el;
			if(el.firstChild)
				el.insertBefore(this.el, el.firstChild);
			else
				el.appendChild(this.el);
			this.el = el.firstChild;
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Removes the element from the DOM.
			@param {Boolean} [bClear] If true, empties the node after removal.
		*/
		remove: function(bClear){
			if(this.el && this.el.parentNode){
				this.el.parentNode.removeChild(this.el);
				if(bClear){
					this.el.innerHTML = '';
					this._clearFromCache();
				}
			}
			return null;
		},
		/**
			@memberOf juci.elem.prototype
			@description Remove attribute for the given name on the element.
			@param {String} attr Name of the attribute.
		*/
		removeAttr: function(attr){
			this.el.removeAttribute(attr);
		},
		/**
			@memberOf juci.elem.prototype
			@description Remove class from element, if it is presented.
			@note To remove all classes, call removeClass with no parameters.
			@example #js juci.findById("item").removeClass("awesome_class");
			@example #js juci.findById("another-item").removeClass(); // Removes all classes
		*/
		removeClass: function(className){
			var returnValue;
			if(typeof className == "undefined"){
				returnValue = this._removeClasses();
			}else{
				if(this.hasClass(className)){
					var elClass = this.el.className;
					if(typeof(elClass) == "string"){
						elClass = elClass.search(className) === 0 ? elClass.replace(className, "") : elClass.replace(" "+className, "");
					}
					this.el.className = elClass;
					returnValue = className;
				}
			}
			return returnValue;
		},
		removeClick: function(delegateeSelector){
			if(delegateeSelector){
				this.removeDelegateeSelector(delegateeSelector);
				if(this.listeners){
					["tap","touchstart","touchend","touchmove","longtap","touchcancel"].forEach(function(e){
						this.listeners[e+delegateeSelector] = [];
					}, this);
				}
			}else{
				this._removeListener("scroll", function(e){
					this._cancelTouch(e);
				});
				this._removeListener(juci.events.TOUCHSTART);
				this._removeListener(juci.events.MOUSEDOWN);
				this.purgeListeners("tap");
				this.el.__j_touch = false;
			}
		},
		removeEvent: function(eventName){
			var propName = "__j_"+eventName;
			if(this.el[propName]){
				juci.unbindDOMEvent(eventName, this.el, this.el[propName]);
				delete this.el[propName];
				this.purgeListeners(eventName);
			}
		},
		_removeClasses: function(){
			var classes = this.el.className;
			this.el.className = "";
			return classes;
		},
		scrollIntoView: function(){
			// TODO Check cross browser compatibility in phone
			this.el.scrollIntoView();
		},
		isInView: function(){
			var offset = this.offset();
			var topOffset = offset.top + offset.height - window.pageYOffset;
			if(topOffset > juci.browser.height() || topOffet < 0){
				// Not in view
				return false;
			}
			return true;
		},
		scrollIntoViewIfNeeded: function(bCenter){
			return this.el.scrollIntoViewIfNeeded(bCenter);
		},
		/**
			@memberOf juci.elem.prototype
			@description Shows the element. If hidden using {@link juci.elem#hide}, reverts to the previous display state of the element.
		*/
		show: function(delayed){
			var display;
			var r = this._setDefaultDisplay();
			if(!r[1]){
				if(this.el.__j_display && this.el.__j_display != 'none' ){
					display = this.el.__j_display;
				}else{
					this.el.__j_display = juci.elem.defaultDisplay(this.el.nodeName);
					display = this.el.__j_display;
				}
				this.el.style.display = display;
				this.el.__j_visible = true;
			}
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets/Sets inner text content of the element.
			@param {String} text Text content to be set on the element.
			@return {String} Returns the inner text content if <i>text</i> is <i>undefined</i>.
		*/
		text: function(text){
			if(typeof text === "undefined")
				return this.el.innerText || this.el.textContent;
			else
				this.el.textContent = this.el.innerText = text;
			return this;
		},
		/**
			@memberOf juci.elem.prototype
			@description Toggles the element from hidden to shown and viceversa.
			@return {Boolean} True if shown, else false.
		*/
		toggle: function(){
			if(this.el.__j_visible == true)
				this.hide();
			else
				this.show();
			return this.el.__j_visible;
		},
		/**
			@memberOf juci.elem.prototype
			@description Toggles class on element by adding or removing the className specified.
			@param {String} className Name of the CSS class to be toggled.
			@return {Boolean} True if added, else false.
		*/
		toggleClass: function(className){
			var retVal;
			if(this.hasClass(className)){
				this.removeClass(className);
				retVal = false;
			}
			else{
				this.addClass(className);
				retVal = true;
			}
			return retVal;
		},
		// do Transition with callback
		transition: function(css, fn, context, transitionEvent, timeout){
			var that = this;
			var tEvent = typeof transitionEvent == "undefined" ? juci.events.TRANSITIONEND : transitionEvent;
			var handler = function(){
				that.el.removeEventListener(tEvent, handler, false );
				if(fn){
					fn.call(context);
				}
			}
			if(tEvent){
				this.el.addEventListener(tEvent, handler, false);
			}else{
				window.setTimeout(handler, timeout ? timeout : 20);
			}
			this.css(css);
			//window.setTimeout(handler, 150);
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets/Sets value on the element.
			@param {String|Number|Boolean} [val] Value to be set on the element
			@note <i>val</i> becomes src attribute for image elements, <i>val</i> becomes innerHTML property for other elements.
			@return {String|Number|Boolean} Returns value of the element if <i>val</i> is <i>undefined</i>.
		*/
		val: function(val){
			var tagName = this.el.nodeName.toLowerCase();
			if(typeof val != "undefined"){
				if(tagName == "input" || tagName == "select" || tagName == "textarea"){
					this.el.value = val;
				}else if(tagName == "img"){
					this.attr("src", val);
				}else if(tagName == "div" || tagName == "button"){
					this.html(val);
				}
			}else{
				if(tagName == "input" || tagName == "select" || tagName == "textarea"){
					return this.el.value;
				}else if(tagName == "img"){
					return this.attr("src");
				}else if(tagName == "div" || tagName == "button"){
					return this.html();
				}
			}
			return null;
		},
		/**
			@memberOf juci.elem.prototype
			@description Gets/Sets the width of the element.
			@param {Number} [val] Width to be set for the element.
			@return {Number} Width of the element, if <i>val</i> is <i>undefined</i>
			@note <i>elem.width()</i> will always return the content width, regardless of the value of the CSS box-sizing property.
		*/
		width: function(val){
			var bl=0, br=0, pl=0, pr=0;
			if(this.css("borderLeft") != null && this.css("borderLeft") != "")
				bl = parseInt(this.css("borderLeft"));

			if(this.css("borderRight") != null && this.css("borderRight") != "")
				br = parseInt(this.css("borderRight"));

			if(this.css("paddingLeft") != null && this.css("paddingLeft") != "")
				pl = parseInt(this.css("paddingLeft"));

			if(this.css("paddingRight") != null && this.css("paddingRight") != "")
				pr = parseInt(this.css("paddingRight"));
			if(val != null)
				this.css("width",(val-(bl+br+pl+pr)) + "px");
			else{
				return this.el.offsetWidth - (bl+br+pl+pr);
			}
		},
		/**
			@memberOf juci.elem.prototype
			@description Check if the {@link juci.elem} is a child of the parent.
			@param {juci.elem|HTMLElement} parent {juci.elem|HTMLElement}
			@return {Boolean} True if {@link juci.elem} is a child.
		*/
		isChildOf: function(parent){
			return isDescendant(parent.el ? parent.el : parent, this.el);
		},
		/**
			@memberOf juci.elem.prototype
			@description Check if the {@link juci.elem} is the parent of the child.
			@param {juci.elem|HTMLElement} child {juci.elem|HTMLElement}
			@return {Boolean} True if {@link juci.elem} is the parent.
		*/
		isParentOf: function(child){
			return isDescendant(this.el, child.el ? child.el : child);
		},
		getBindingContext: function(){
			return ko.contextFor(this.el);
		},
		getBindingData: function(){
			return ko.dataFor(this.el);
		},
		getPanelForElem: function(){
			return juci.getPanel(this);
		}
	};
	{
	/**
		@name juci.elem#change
		@event
		@description Fires when the value of the control is changed through user input.
		@param {MDOMEventObject} eventObj
		@param {String} eventObj.value Value of the element.
		@note Applicable for INPUT, TEXTAREA and SELECT.
		@see MDN <a href="https://developer.mozilla.org/en-US/docs/DOM/element.onchange" target="_blank">link</a>
	*/
	/**
		@name juci.elem#keyup
		@event
		@description Fires while the user is entering a value. This event is delayed to capture all key events within a time period and fires one event at the end of the period.
		@param {MDOMEventObject} eventObj
		@param {String} eventObj.value Value of the element.
		@note Applicable for INPUT and TEXTAREA.
		@flag Cancellable
	*/
	/**
		@name juci.elem#touchstart
		@event
		@description Fires when the element has been touched.
		@para {MDOMEventObject}m eventObj
		@flag Cancellable
	*/
	/**
		@name juci.elem#touchmove
		@event
		@description Fires when the touched element is moved around within the element's bounds.
		@param {MDOMEventObject} eventObj
	*/
	/**
		@name juci.elem#touchend
		@event
		@description Fires after the element has been touched, but before being tapped.
		@param {MDOMEventObject} eventObj
	*/
	/**
		@name juci.elem#tap
		@event
		@description Fires after the element has been touched, and after juci.elem#event:touchend.
		@param {MDOMEventObject} eventObj
	*/
	/**
		@name juci.elem#longtap
		@event
		@description Fires when the element is held for a longer duration and released.
		@param {MDOMEventObject} eventObj
	*/
	/**
		@name juci.elem#load
		@event
		@description Fires when the content for the element has finished loading successfully.
		@param {MDOMEventObject} eventObj
		@note Applicable for IMG
	*/
	/**
		@name juci.elem#error
		@event
		@description Fires when the content for the element has finished loading with errors.
		@param {MDOMEventObject} eventObj
		@note Applicable for IMG
	*/
	/**
		@name juci.elem#focus
		@event
		@description Fires when the element has acquired focus.
		@param {MDOMEventObject} eventObj
	*/
	/**
		@name juci.elem#blur
		@event
		@description Fires when the element has loses focus.
		@param {MDOMEventObject} eventObj
	*/
	/**
		@name juci.elem#keypress
		@event
		@description Fires when user has
		@param {MDOMEventObject} eventObj
		@param {String} eventObj.value Value of the element.
	*/
	}
	function isDescendant(parent, child) {
		var node = child.parentNode;
		while (node != null) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}
	this.extend(element, this.touchable);
	juci.elem = element;
	}
/*
	Controls:
	All controls must implement juci.controls.basecontrol interface. The data-bind interfaces are defined based on the need in the control. The ko binding handlers defined for are marked in the list.
		S.No	Control					 ko 				Status
					Individual controls:
		 1. 	text					text				Done
		 2. 	number					text				Done
		 3. 	password				text				Done
		 4. 	textarea				text				Done
		 5. 	selectbox				basecontrol			Done
		 6. 	checkbox				basecontrol			Done
		 7. 	radio					basecontrol			Done 		 Removed. Doesn't fit any use case
		 8. 	checkboxGroup			basecontrol			Done
		 9. 	radioGroup				basecontrol			Done
		 10.	image					basecontrol			Done
		 11.	display					 NA 				Done
		 12.	button					 NA 				Done
		 13.	calendar				 NA 				Done
		 14.	switch					Not done			Not done
		 15.	datepicker				basecontrol			Done
		 16.	timepicker				basecontrol			Not done
	Data bound controls:
		 1. 	catalog					jucilist			Not done
		 2. 	list					jucilist			Done
	Miscellaneous controls:

	Widgets are composition of one or more control.
	Widgets:
		 1. 	Photo					basecontrol			Done
		 2. 	Contacts				basecontrol			Not done
		 3. 	Attachments				basecontrol			Done
		 4. 	Graphs & Charts			basecontrol			Done		 Add default configurations for bunch of charts first
		 5. 	Color Picker			Not done			Not done
		 6. 	Juci form				panel				Done
		 7. 	Searchbox				 NA 				Done
*/
// Base control Interface - skeleton for juci control.
// Sets basic references and calls _doInit.
// Changed to http://jsperf.com/object-referencing-prototpe
	var isSystemPage = function(){
		return !window.__mowbly__ ? false : (window.location.href.search("/system/") > -1 ? true : false);
	};

	var getSystemPath = function(){
		return isSystemPage() ? "libs/mowbly/themes/default/img/" : "../../../system/libs/mowbly/themes/default/img/";
	};
	var _regex = /}[ ]*[,]*/g;
	var parseObjectLiteral=(function(b){var g='(?:"(?:[^"\\\\]|\\\\.)*")';var j="(?:'(?:[^'\\\\]|\\\\.)*')";var h="(?:/(?:[^/\\\\]|\\\\.)*/)";var f=",\"'{}()/:[\\]";var i="(?:[^\\s:,][^"+f+"]*[^\\s"+f+"])";var e="[^\\s]";var c=RegExp("(?:"+g+"|"+j+"|"+h+"|"+i+"|"+e+")","g");var d=String.prototype.trim;function a(k){return k==null?"":d?d.call(k):k.toString().replace(/^\s+/,"").replace(/\s+$/,"")}return function(o){var r=a(o);if(r.charCodeAt(0)===123){r=r.slice(1,-1)}var v=[],p=r.match(c),s,t,l=0;if(p){p.push(",");for(var m=0,k=p.length;m<k;++m){var u=p[m],q=u.charCodeAt(0);if(q===44){if(l<=0){if(s){v.push([s,t?t.join(""):b])}s=t=l=0;continue}}else{if(q===58){if(!t){continue}}else{if(q===40||q===123||q===91){++l}else{if(q===41||q===125||q===93){--l}else{if(!s&&!t){s=(q===34||q===39)?u.slice(1,-1):u;continue}}}}}if(t){t.push(u)}else{t=[u]}}}return v}})();
	var _getDataBindObject = function(input, returnObject, indexOfComma){
		var arr = parseObjectLiteral(input);
		for(var i in arr){
			returnObject[arr[i][0]] = arr[i][1];
		}
	}
	function _extendWithEventHelpers(obj, events){
		events.forEach(function(e){
			this["on" + e] = function(fp, ctx){
				this.addListener(e, fp, ctx);
			};
			this["un" + e] = function(fp, ctx){
				this.removeListener(e, fp, ctx);
			};
		}, obj.prototype);
	}
	/**
		@namespace
		@name basecontrol
		@exports basecontrol as basecontrol
		@description Abstract definition for all controls defined in juci. Each control inherits and extends/overrides methods and properties from the basecontrol.
		@augments Observable
		@note Listeners to events can be attached by using {@link Observable#bind}, or listeners can be bound in the HTML declaration of the control using <i>on+'name of event'</i>, for e.g: onafterchange=handleChange(event). Listeners can be removed through {@link Observable#unbind}
		@note All events fired from controls have a property <i>eventObj.control</i> which refers to the control object.
		@property {juci.elem} j The element which contains the control.
		@attribute {Boolean} disabled A boolean value that indicates if the control must be disabled. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#enabling-and-disabling-form-controls:-the-disabled-attribute">disabled</a> for more information.
		@dataattribute {String} placeholder A string containing a short hint to help the user with data entry when the control has no value. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#the-placeholder-attribute">placeholder</a> for more information.
		#example #html placeholder="Enter your username" #example
		@dataattribute {String} data-juci A string with value as name of the control
		@dataattribute {String} data-label A string containing the label of the control.
		#example #html data-label="Username" #example
		@dataattribute {String} data-label-binding A string containing comma separated key-value pairs from the list of below keys to bind label value. Similar to data-bind for the control
		@dataattribute {Object|Boolean|Number|String} data-value Default value for the control
		@dataattribute {String} data-formatter Name of a function defined on the <i>window</i> scope. The function is passed the value of the control whenever it is set, and should return a string for displaying on the control.
		#example #html data-formatter="formatValue"
		#js function formatValue(valueFromControl){
	return valueFromControl + " - Added From Control";
}#example
		@dataattribute {String} data-returner Name of a function defined on the <i>window</i> scope. The function is passed the value of the control whenever it is get, and should return the return value for the control. Used to map the control value to another format.
		#example #html data-returner="returnValue"
		#js function returnValue(valueFromControl){
	return valueFromControl.replace(" - Added From Control", "");
}#example
		@dataattribute {Object} data-bind A string containing comma separated key-value pairs from the list of below keys. Also augmented by other controls.
		#example #html data-bind="ref: someKey, optionsList: list" #example
		@dataattribute {Expression|Function|String} data-bind.ref A string containing the reference path from a dataset defined using the {@link juci#addDataset} method. The value of the key referred by this path bounds as value of the control.
		#example #html data-bind="ref: someKey" #example
		#example #html data-bind="ref: anotherKey() ? 'True' : 'False' " #example
		#example #html data-bind="ref: returnValue(anotherKey())"
		#js function returnValue(val){ return val.replace(/ /g, ""); }
		#example
		@dataattribute {Expression|Function|String} data-bind.enabled A string containing the reference path from a dataset defined using the {@link juci#addDataset} method. The value of the key should be true or false to enable or disable the control. Optionally if <i>data-bind.ref</i> is defined, the string can be a pointer to a function.
		#example #html data-bind="enabled: someKey" #example
		#example #html data-bind="enabled: anotherKey() > 5 " #example
		#example #html data-bind="enabled: returnValue(anotherKey())"
		#js function returnValue(val){ return val * 100 / 2000 > 5; }
		#example
		@dataattribute {Expression|Function|String} data-bind.disabled {} A string containing the reference path from a dataset defined using the {@link juci#addDataset} method. The value of the key should be true or false to disable or enable the control. Optionally if <i>data-bind.ref</i> is defined, the string can be a pointer to a function.
		#example #html data-bind="disabled: someKey" #example
		#example #html data-bind="disabled: anotherKey() > 5 " #example
		#example #html data-bind="disabled: returnValue(anotherKey())"
		#js function returnValue(val){ return val * 100 / 2000 > 5; }
		#example
		@dataattribute {Expression|Function|String} data-bind.show {} A string containing the reference path from a dataset defined using the {@link juci#addDataset} method. The value of the key should be true or false to show or hide the control. Optionally if <i>data-bind.ref</i> is defined, the string can be a pointer to a function.
		#example #html data-bind="show: someKey" #example
		#example #html data-bind="show: anotherKey() > 5 " #example
		#example #html data-bind="show: returnValue(anotherKey())"
		#js function returnValue(val){ return val * 100 / 2000 > 5; }
		#example
		@css .juci_no_ellipsis Add this class to the control declaration display entire content without wrapping. By default all controls are wrapped with ellipses if content exceeds the container.
		#example
		#html
		<div data-juci="display" class="juci_no_ellipsis"></div>
		@css
	*/
	// TODO ADD EXAMPLES FOR ALL data attributes and NOTE for what is meant by expression and references
	var basecontrol = function(elem){
		this.j = new juci.elem(elem);
		// Why not elem.dataset here? Find it here http://jsperf.com/getattribute-vs-ds
		var dataBind = this.j.attr("data-bind");
		this._dataBind = "";
		if(dataBind != null){
			this._dataBind = dataBind;
			this._ds = {};
			_getDataBindObject(dataBind, this._ds, -1);
		}
		this.label = null;
		this._id = juci.controls.add(this.j, this);
		//Create  control content. Add default class
		var existingClasses = this.j.removeClass();
		this.j.addClass("juci_basecontrol juci_" + this.type + (existingClasses ? (" " + existingClasses) : ""));
		var _disabled = this.j.attr("disabled");
		var possibleOptions = ["form", "required", "novalidation"];
		var options;
		this.getEventsConfig().forEach(function(eName){
			var lnr = this.j.attr("on"+eName);
			if(lnr){
				this.addListener(eName, new Function("event", lnr), this);
			}
			this.j.el.removeEventListener(eName, this.j.el["on"+eName]);
			this.j.el["on"+eName] = null;
			this.j.removeAttr("on"+eName);
		}, this);
		this._val = this.getDefaultValue();
		this._formatter = this.getDefaultFormatter();
		this._returner = this.getDefaultReturner();
		this.init();
		this._validations = {};
		this._validationStack = [];
		this._errorInValidation = false;
		this.initializeValidation()
		if(_disabled != null){
			this.disable();
		}
	}
	basecontrol.prototype = {
		DefaultValue: "",
		DefaultFormatter: function(value){ return value;},
		DefaultReturner: function(value){ return value;},
		getDefaultFormatter: function(){
			var f = this.j.attr("data-formatter");
			return window[f] ? function(val){
				return window[f](val ? ko.mapping.toJS(val) : val, val);
			} : this.DefaultFormatter;
		},
		getDefaultReturner: function(){
			var f = this.j.attr("data-returner");
			return window[f] ? function(val){
				return window[f](val ? ko.mapping.toJS(val): val, val);
			} : this.DefaultReturner;
		},
		getDefaultValue: function(){
			return new Function("return '" + this.j.getAttr("data-value", this.DefaultValue) +"'")();
		},
		// Sets KO params on the control with the evaluated functions ready for execution
		_setKOParams: function(params){
			this.__params = params;
		},
		// KO change listener with _koValue set on binding initialize
		_koOnChangeListener: function(e){
			var modelValue = this.__koValue;
			var elementValue = e.value;
			if(typeof modelValue == "function" && elementValue != modelValue()){
				e.control._isSourceOfChange = true;
				if (ko.isWriteableObservable(modelValue))
					modelValue(elementValue);
				else {
					var allBindings = allBindingsAccessor();
					if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers']['value'])
						allBindings['_ko_property_writers']['value'](elementValue);
				}
			}else if(typeof modelValue == "object"){
				e.control._isSourceOfChange = true;
				ko.mapping.fromJS(elementValue, null, modelValue);
			}
		},
		// On bindings initialize, for post initialization stuff, since function pointers will be available only now
		_onBindingsInitialize: juci.utils.EmptyMethod,
		// Raises event on change of the control value i.e select, text, textarea. Not the dataset change.
		/**
			@memberOf basecontrol.prototype
			@description Registers a handler function to call when the {@link basecontrol#event:beforechange} event fires.
			@param {Function} handler A handler function to execute when the {@link basecontrol#event:afterchange} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onBeforeChange: function(fn, context){
			this.addListener("beforechange", fn, context);
		},
		__fireBeforeChange: function(oldVal, newVal, changedItem/*Only for multiple data binding*/){
			var evt = new EventObject({"oldValue": this._returner(oldVal), "newValue": this._returner(newVal), "control": this}), retValue = false;
			if(changedItem){
				evt.changedItem = changedItem;
			}
			this.fireEvent("beforechange", evt);
			if(!evt.isCancelled()){
				this.value(evt.newValue, true);
				this.fireAfterChange(evt.newValue);
				retValue = true;
			}
			return retValue;
		},
		fireAfterChange: function(val){
			// Fire post change for bindings
			this.fireEvent("afterchange", this.triggerAfterChange(val));
			this.validate(val);
		},
		onDeleteClick: function(fn, context){
			this.addListener("deleteclick", fn, context);
		},
		onFlagClick: function(fn, context){
			this.addListener("flagclick", fn, context);
		},
		onValidate: function(fn, context){
			this.addListener("validate", fn, context);
		},
		onValidationClear: function(fn, context){
			this.addListener("validationclear", fn, context);
		},
		onValidationPass: function(fn, context){
			this.addListener("validationpass", fn, context);
		},
		onValidationFail: function(fn, context){
			this.addListener("validationfail", fn, context);
		},
		getBindingContext: function(){
			return this.j.getBindingContext();
		},
		getBindingData: function(){
			return this.j.getBindingData();
		},
		getLabel: function(){
			if(this.label !== null){
				return this.label.firstChild();
			}
		},
		setLabel: function(lbl){
			if(this.label !== null){
				return this.label.firstChild().html(lbl);
			}
		},
		getPanelForControl: function(){
			return juci.getPanel(this.j);
		},
		// After validations are done, this event is raised
		/**
			@memberOf basecontrol.prototype
			@description Registers a handler function to call when the {@link basecontrol#event:afterchange} event fires.
			@param {Function} handler A handler function to execute when the {@link basecontrol#event:afterchange} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onAfterChange: function(fn, context){
			this.addListener("afterchange", fn, context);
		},
		// To be overriden in the control implementations
		init: juci.utils.EmptyMethod,
		destroy: juci.utils.EmptyMethod,
		// Gets/sets the value of the control. To be implemented in the control
		// TODO Minimize code of if(typeof val) checks and keep it in one place. And controls should implement setValue and getValue.
		/**
			@memberOf basecontrol.prototype
			@description Sets or gets the value of the control.
			@param {Object|Boolean|Number|String} value Value to be set on the control. You must ignore this parameter, if you intend to get the current value of the control.
			@return {Object|Boolean|Number|String} The value of the control, if the <i>value</i> parameter is <i>undefined</i>.
		*/
		value: function(val/*, dontCheck*/){
			return null;
		},
		/**
			@memberOf basecontrol.prototype
			@description Triggers the dataset to be modified after control.value() has been called to set value on the control.
			@note This has to be called mandatorily to update any dataset that is bound with the control.
		*/
		triggerAfterChange: function(val){
			var evt = {"value": typeof val !== "undefined" ? val : this.value(), "control": this};
			if(this._bindingListened){
				this._koOnChangeListener(evt);
			}
			return evt;
		},
		/**
			@memberOf basecontrol.prototype
			@description Gets the focus to the control. Page is scrolled if required to get the control to view port.
		*/
		focus: function(){
			this.j.scrollIntoView();
			this.j.focus();
		},
		/**
			@memberOf basecontrol.prototype
			@description Enables the control that was disabled by a call to {@link basecontrol#disable} method or by the {@link basecontrol#disabled} attribute.
		*/
		enable: function(){
			if(this.i){
				this.i.enable();
			}
			this.j.enable();
		},
		/**
			@memberOf basecontrol.prototype
			@description Disables the control. User will not be able to edit the value of the control and click or touch events are not fired on the control.
		*/
		disable: function(){
			if(this.i){
				this.i.disable();
			}
			this.j.disable();
		},
		/**
			@memberOf basecontrol.prototype
			@description Hides the control from the user interface.
		*/
		hide: function(){
			this.j.hide();
			this.clearValidation();
		},
		/**
			@memberOf basecontrol.prototype
			@description Shows the control which was hidden using a call to {@link basecontrol#hide} method.
		*/
		show: function(){
			this.j.show();
		},
		getDatabindConfig: function(){
			return {"keys": [], "map": [], "defaults": [], "ignore": []};
		},
		Events: ["beforechange", "afterchange", "validate", "flagclick", "deleteclick", "bind", "validationpass", "validationfail", "validationclear"],
		getEventsConfig: function(){
			return this.Events;
		},
		getDefaultDatabindString: function(){
			var retStr = "";
			var cfg = this.getDatabindConfig();
			cfg.keys.forEach(function(item, idx){
				retStr += item + ": " + cfg.defaults[idx] + ", ";
			});
			return retStr.substring(0, retStr.length - 2);
		},
		_getFlagDrawer: function(){
			if(!this._flagDrawer){
				this._flagDrawer = new juci.elem("<div class='juci_flag_drawer'></div>").prependTo(this.j);
			}
			return this._flagDrawer;
		},
		setFlag: function(msg, clazz){
			if(!this._flag){
				this._flag = new juci.elem("<div class='juci_flag'><div>"+(typeof msg == "object" ? msg.flag : msg)+"</div></div>").prependTo(this._getFlagDrawer());
				if(clazz){
					this._flag.addClass("juci_" + clazz);
				}
				this.j.onClick(this._onFlagClick, this, ".juci_flag");
			}else{
				this._flag.removeClass();
				this._flag.addClass("juci_flag" + (clazz ? (" juci_"+clazz) : ""));
				this._flag.children()[0].html(typeof msg == "object" ? msg.flag : msg);
			}
			this._flag.msg = msg;
			this._flag.clazz = clazz;
			this.j.addClass("juci_flag_visible");
			return this._flag;
		},
		resetFlag: function(){
			if(this._flag){
				this._flag.remove();
				this.j.removeClass("juci_flag_visible");
				delete this._flag;
			}
		},
		showDelete: function(){
			if(!this._delete){
				this._delete = new juci.elem('<div class="juci_delete"><div class="juci_delete_icon"></div></div>')
				if(!this._flag){
					this._delete.prependTo(this._getFlagDrawer());
				}else{
					this._delete.insertAfter(this._flag);
				}
				this.j.addClass("juci_delete_visible");
				this.j.onClick(this._onDeleteClick, this, ".juci_delete_icon");
			}else{
				this._delete.show();
			}
			this.j.addClass("juci_delete_visible");
		},
		clear: function(){
			this.__fireBeforeChange(this._val, this.DefaultValue);
		},
		_onDeleteClick: function(e){
			var evt = new EventObject(e, e);
			this.fireEvent("deleteclick", evt);
			if(!evt.isCancelled()){
				this.clear();
			}
			e.preventDefault();
			e.stopPropagation();
		},
		_onFlagClick: function(e){
			var evt = new EventObject(e, e);
			evt.flag = this._flag.msg;
			this.fireEvent("flagclick", evt);
			e.preventDefault();
			e.stopPropagation();
		},
		hideDelete: function(){
			if(this._delete){
				this._delete.hide();
				this.j.removeClass("juci_delete_visible");
			}
		},
		addLinker: function(){
			if(!this.linker){
				this.flag = new juci.elem("<div class='juci_linker'></div>").prependTo(this._getFlagDrawer());
			}
			return this.linker;
		},
		removeLinker: function(){
			if(this.linker){
				this.linker.remove();
				delete this.linker;
			}
		},
		setEventName: function(eventObject, eventName){
			eventObject.control = this;
			this._super.apply(this, arguments);
		},
		initializeValidation: function(){
			var isRequired = this.j.hasAttr("required");
			this._doValidate = false;
			var requiresValidationClear = false;
			if(isRequired){
				var def = juci.validation.getRuleDefinition("required");
				this._validations[def.id] = new juci.validation.rule(def);
				requiresValidationClear = true;
			}
			var pattern = this.j.attr("pattern");
			if(pattern){
				var def = juci.validation.getRuleDefinition("pattern");
				def.params = [pattern]
				this._validations[def.id] = new juci.validation.rule(def);
				requiresValidationClear = true;
			}
			var minVal = this.j.attr("min");
			if(minVal != null){
				var def = juci.validation.getRuleDefinition("min");
				def.params = [minVal]
				this._validations[def.id] = new juci.validation.rule(def);
				requiresValidationClear = true;
			}
			var maxVal = this.j.attr("max");
			if(maxVal != null){
				var def = juci.validation.getRuleDefinition("max");
				def.params = [maxVal]
				this._validations[def.id] = new juci.validation.rule(def);
				requiresValidationClear = true;
			}
			var minLengthVal = this.j.attr("minlength");
			if(minLengthVal != null){
				var def = juci.validation.getRuleDefinition("minlength");
				def.params = [minLengthVal]
				this._validations[def.id] = new juci.validation.rule(def);
				requiresValidationClear = true;
			}
			var maxLengthVal = this.j.attr("maxlength");
			if(maxLengthVal != null){
				var def = juci.validation.getRuleDefinition("maxlength");
				def.params = [maxLengthVal]
				this._validations[def.id] = new juci.validation.rule(def);
				requiresValidationClear = true;
			}
			var exactLengthVal = this.j.attr("exactlength");
			if(exactLengthVal != null){
				var def = juci.validation.getRuleDefinition("exactlength");
				def.params = [exactLengthVal]
				this._validations[def.id] = new juci.validation.rule(def);
				requiresValidationClear = true;
			}
			if(requiresValidationClear){
				this._doValidate = true;
				// this.j.onFocus(this.clearValidation, this);
				// this.j.attr("tabindex", "-1");
				this._validationElems = {
					fail: new juci.elem("<div class='juci_validation juci_fail'></div>"),
					pass: new juci.elem("<div class='juci_validation juci_pass'></div>"),
				};
				this.onValidationPass(this.defaultValidationPassHandler, this);
				this.onValidationFail(this.defaultValidationFailHandler, this);
				this.onValidationClear(this.defaultValidationClearHandler, this);
			}
		},
		clearValidation: function(){
			if(this._doValidate){
				this._errorInValidation = false;
				this._validationStack = [];
				this.fireEvent("validationclear");
				this.j.removeClass("juci_validated");
				this.j.removeClass("juci_validation_fail");
			}
		},
		defaultValidationFailHandler: function(e){
			if(!e.isCancelled() && !this._validatedFail){
				if(this.j.hasClass("juci_validated_pass") == true){
					this.j.removeClass("juci_validated");
					this.j.removeClass("juci_validated_pass");
				}
				//this._validationElems.fail.appendTo(this.j);
				this._validationElems.fail.insertAfter(this.j);
				this.j.addClass("juci_validated juci_validation_fail");
				this._validationElems.fail.html(e.message);
			}
			if(this._validatedPass){
				this._validationElems.pass.remove();
				this._validatedPass = false;
			}
			this._validatedFail = true;
		},
		defaultValidationPassHandler: function(e){
			if(!e.isCancelled() && !this._validatedPass){
				/* 	TODO Enable after getting feedback
					this._validationElems.pass.insertAfter(this.j);
					this.j.addClass("juci_validated juci_validated_pass");
					this._validationElems.pass.html(e.message);
				*/
				if(this.j.hasClass("juci_validation_fail") == true){
					this.j.removeClass("juci_validated");
					this.j.removeClass("juci_validation_fail");
				}
				this.j.addClass("juci_validated juci_validated_pass");
			}
			if(this._validatedFail){
				this._validationElems.fail.remove();
				this._validatedFail = false;
			}
			this._validatedPass = true;
		},
		defaultValidationClearHandler: function(e){
			if(!e.isCancelled() && (this._validatedFail || this._validatedPass)){
				this._validationElems.fail.remove();
				this._validationElems.pass.remove();
				this.j.removeClass("juci_validated juci_validation_pass juci_validation_fail");
				this._validatedFail = false;
				this._validatedPass = false;
			}
		},
		validate: function(v){
			if((v == null || v === "" || typeof v =="undefined") && !this._validations["required"]){
				this.clearValidation();
				return true;
			}
			var evtObj = new EventObject({value: v, validations: this._validations, currentState: this._errorInValidation, currentValidations: this._validationStack});
			this.fireEvent("validate", evtObj);
			if(!evtObj.isCancelled()){
				this._errorInValidation = false;
				this._validationStack = [];
				for(var k in this._validations){
					var result = this._validations[k].evaluate(v);
					this._validationStack.push(result);
					if(!result.passed){
						this.fireEvent("validationfail", result);
						this._errorInValidation = true;
						break;
					}else{
						this.fireEvent("validationpass", result);
					}
				}

			}
			return !this._errorInValidation;
		}
	};
	{
		/**
			@name beforechange
			@memberOf basecontrol.prototype
			@event
			@description Fires when the user changes the value of the control and the new value yet to update on the control. This event is the perfect place to do any validations on the new value and take appropriate action.
			@flag Cancellable
			@param {EventObject} eventObj An event object that is passed to the registered event handler functions. It has the following properties,
			@param {Object|Boolean|Number|String} eventObj.oldValue The current value of the control.
			@param {Object|Boolean|Number|String} eventObj.newValue {Object|Boolean|Number|String} The new value of the control changed by the user.
			@param {basecontrol} eventObj.control The control object on which the event is fired.
		*/
		/**
			@name afterchange
			@memberOf basecontrol.prototype
			@event
			@description Fires when the user changes the value of the control and the new value if updated on the control.
			@param {EventObject} eventObj {EventObject} An event object that is passed to the registered event handler functions. It has the following properties,
			@param {Object|Boolean|Number|String} eventObj.value {Object|Boolean|Number|String} The updated value of the control.
			@param {basecontrol} eventObj.control The control object on which the event is fired.
		*/
	}
	function databindFilter(item){
		return !juci.utils.inArray(this, item);
	}
	basecontrol.prototype.getDatabindString = function(){
		var retStr = "";
		if(this._ds){
			var cfg = this.getDatabindConfig();
			function getMandatoryDataBindItem(item, idx){
				retStr += item + ": " + (this.ds[this.map[idx]] ? this.ds[this.map[idx]] : this.defaults[idx]) + ", ";
			}
			function getDataBindItem(item){
				retStr += this[item] ? (item + ": " + this[item] + ", ") : "";
			}
			cfg.keys.forEach(getMandatoryDataBindItem, {ds: this._ds, defaults: cfg.defaults, map: cfg.map});
			Object.keys(this._ds).filter(databindFilter, cfg.keys.concat(cfg.ignore)).forEach(getDataBindItem, this._ds);
			retStr = retStr.substring(0, retStr.length - 2);
		}
		return retStr;
	};
	this.extend(basecontrol, Observable);
	juci.controls.basecontrol = basecontrol;

	/**
		@namespace
		@name display
		@augments basecontrol
		@description The display control provides the user a non-editable view of a plain string content or a formatted HTML content.
		@dataattribute {String} data-juci A string with value <i>display</i>.
		@dataattribute {Boolean} data-istext A string containing either <i>text</i> or <i>html</i> as value. If the value is <i>html</i>, the content of the display control is rendered as formatted HTML.
		@html <div data-juci="display" data-bind="ref: 'Not bound with data'"></div>
		@html <div data-juci="display" data-label="With default value" data-value="Init data!"></div>
		@html <div data-juci="display" data-bind="ref: text" data-label="With a label and bound with data"></div>
		@csshtml <div data-juci="display" data-bind="ref: text" data-label="Label" class="juci_basecontrol juci_display">
	<div class="juci_ctrl_label">
		<label class="juci_label_text">With a label and bound with data</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_ctrl_box">Display Text</div>
</div>
	*/
	var display = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	display.prototype = {
		type: "display",
		init: function(){
			this._isText = this.j.getAttr("data-istext", false);
			this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			this.i = new juci.elem("<div class='juci_ctrl_box'></div>").appendTo(this.j);
			if(this._ds){
				var f = this.j.getAttr("data-formatter", null);
				this.i.attr("data-bind",
					(this.type + ':' + (this._ds.ref ? this._ds.ref : '""')) +
					", formattedValue: " + f +
					", isText: " + this._isText
				);
			}
			this.value(this._val);
		},
		value: function(val){
			if(typeof val !== "undefined"){
				this._val = val;
				this.i[this._isText ? "text" : "html"](this._formatter(val));
			}else{
				return this._returner(this._val);
			}
		},
		showDelete: juci.utils.EmptyMethod,
		hideDelete: juci.utils.EmptyMethod,
		setFlag: juci.utils.EmptyMethod,
		resetFlag: juci.utils.EmptyMethod
	}
	this.extend(display, juci.controls.basecontrol);
	juci.controls.display = display;

	//No data binding here
	/**
		@namespace
		@name button
		@augments basecontrol
		@description The button control allows the user to initiate a predefined action like submitting a form, resetting form etc. on tap of it.<br/><br/>Buttons can be grouped using default classes in juci such as <i>juci_horizontal_bbar</i>, <i>juci_vertical_bbar</i>, etc.
		@note Listeners to events can be attached by using {@link Observable#bind}, or listeners can be bound in the HTML declaration of the control using <i>on+'name of event'</i>, for e.g: onclick=handleClick(event). Listeners can be removed through {@link Observable#unbind}
		@dataattribute {String} type A string containing the type that controls the behaior of the button. Possible types are listed <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#attr-button-type">here</a>.
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_blue juci_T1">Click me</button>
	<button data-juci="button" disabled class="juci_positive juci_T23">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_T12">Click me</button>
	<button data-juci="button" disabled class="juci_T3">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_H1">Click me</button>
	<button data-juci="button" disabled class="juci_H2">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_positive juci_Q1">Click me</button>
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_Q2">Click me</button>
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_positive juci_Q3">Click me</button>
	<button data-juci="button" disabled class="juci_error juci_Q4">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_positive juci_Q12">Click me</button>
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_Q3">Click me</button>
	<button data-juci="button" disabled class="juci_error juci_Q4">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_positive juci_Q1">Click me</button>
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_Q23">Click me</button>
	<button data-juci="button" disabled class="juci_error juci_Q4">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_positive juci_Q1">Click me</button>
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_Q2">Click me</button>
	<button data-juci="button" disabled class="juci_error juci_Q34">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_Q123">Click me</button>
	<button data-juci="button" disabled class="juci_error juci_Q4">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_positive juci_Q1">Click me</button>
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_Q234">Click me</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_positive juci_T1">Click me</button>
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_T2">Click me</button>
	<button data-juci="button" disabled class="juci_error juci_T3">Disabled</button>
</div>
		@html <div class="juci_group">
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_positive juci_T1">Click me</button>
	<button data-juci="button" onclick="$m.toast('u clicked me!')" class="juci_orange juci_T2">Click me</button>
	<button data-juci="button" disabled class="juci_error juci_T3">Disabled</button>
</div>
		@html <div class="juci_vertical_bbar">
	<button data-juci="button">Button</button>
	<div class="juci_horizontal_bbar">
		<div class="juci_horizontal_bbar">
			<button data-juci="button" class="juci_positive">Positive</button>
			<button data-juci="button" class="juci_error">Negative</button>
		</div>
		<button data-juci="button" class="juci_error">Negative</button>
	</div>
	<button data-juci="button" class="juci_orange">Warning</button>
	<button data-juci="button" class="juci_blue">Info</button>
</div>
		@css .juci_positive
		.juci_green
		.juci_error
		.juci_red
		.juci_blue
		.juci_warning
		.juci_orange

	*/
	var button = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	button.prototype = {
		type: "button",
		// Private On click listener which fires the button click
		Events: juci.controls.basecontrol.prototype.Events.concat("click", "tap"),
		_onClick: function(e){
			var evt = new EventObject(e, e);
			this.fireEvent("tap", evt);
			this.fireEvent("click", evt);
		},
		// Helper to listen to the butt
		onClick: function(fn, ctx){
			this.addListener("tap", fn, ctx);
		},
		enable: function(){
			this.j.enable();
		},
		disable: function(){
			this.j.disable();
		},
		// Implemented init() function from basecontrol
		init: function(){
			this.j.removeClass("juci_basecontrol");
			var bType = this.j.attr("type");
			this.j.onClick(this._onClick, this);
			if(bType == null || bType.toLowerCase() == "button"){
				var clk = this.j.el.onclick;
				this.onClick(clk);
				this.j.el.onclick = null;
				this.j.removeAttr("onclick");
				this.j.el.removeEventListener("click", clk);
			}else{
				//"submit" or "reset" possible values
				var formElem = this.j.closest("[data-juci=form]");
				if(formElem){
					var form = juci.getControl(formElem);
					if(form){
						this.onClick(form[bType.toLowerCase()], form);
					}
				}
			}
			if(this.j.isEmpty()){
				this.value(juci.getTranslatedLabel(this.j.attr("value")), true);
			}
			this.j.onFocus(this._onFocus, this);
			this.j.onBlur(this._onBlur, this);
			this.j.onKeyDown(this._onKeyDown, this);
		},
		_onFocus: function(){
			this.j.addClass("touch");
		},
		_onBlur: function(){
			this.j.removeClass("touch");
		},
		_onKeyDown: function(e){
			if(e.srcEvent.keyCode == 13){
				this._onClick(e);
				this.j.blur();
			}
		},
		// Public method to get/set value on the control
		value: function(val){
			if(typeof val === "undefined")
				return this.j.val();
			else{
				this.j.val(val);
			}
		},
		showDelete: juci.utils.EmptyMethod,
		hideDelete: juci.utils.EmptyMethod,
		setFlag: juci.utils.EmptyMethod,
		resetFlag: juci.utils.EmptyMethod
	};
	/**
		@memberOf button.prototype
		@name click
		@event
		@description Fires when user taps on the button.
		@param {EventObject} eventObj
	*/
	this.extend(button, juci.controls.basecontrol);
	juci.controls.button = button;

	/**
		@namespace
		@name togglebar
		@augments Observable
		@description A {@link button} group in which one button can be toggled at any time.
		@note Listeners to events can be attached by using {@link Observable#bind}, or listeners can be bound in the HTML declaration of the control using <i>on+'name of event'</i>, for e.g: onclick=handleClick(event). Listeners can be removed through {@link Observable#unbind}
		@dataattribute {String} data-juci A string containing the value <i>togglebar</i>.
		@dataattribute {Number} data-toggled The index of the button that has to be toggled by default.
		@html <div data-juci="togglebar" data-toggled="2">
	<button data-juci="button">1st</button>
	<button data-juci="button">2nd</button>
	<button data-juci="button">3rd</button>
</div>
	*/
	var togglebar = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
		this.j.removeClass("juci_basecontrol");
	}
	togglebar.prototype = {
		type: "togglebar",
		Events: ["toggle"],
		init: function(){
			var elem = this.j;
			var btns = elem.findByAttrVal("data-juci", "button");
			var toggled = parseInt(elem.getAttr("data-toggled", 0));
			if(toggled > btns.length){
				throw new Error("Toggling undefined button");
			}
			btns[toggled].toggleClass("toggled");
			btns.forEach(function(btn, i){
				btn.attr("data-toggle", i);
				btn.onClick(this._onToggleClick, this);
			}, this);
			this.btns = btns;
			this._toggled = toggled;
		},
		_onToggleClick: function(e){
			var newT = parseInt(e.currentTarget.attr("data-toggle"), 10);
			this._toggle(newT);
		},
		/**
			@methodOf togglebar.prototype
			@description Toggles the button at the specified index.
			@param {String} idx The index of the button that is to be toggled on.
			@see
		*/
		toggle: function(idx){
			if(typeof idx == "undefined"){
				return this._toggled;
			}
			if(idx+1 > this.btns.length){
				throw new Error("Toggling undefined button");
			}
			this._toggle(idx);
		},
		_toggle: function(idx){
			if(idx != this._toggled){
				var evt = new EventObject({oldToggled: this._toggled, newToggled: idx});
				this.fireEvent("toggle", evt);
				if(!evt.isCancelled()){
					this.btns[this._toggled].toggleClass("toggled");
					this.btns[idx].toggleClass("toggled");
					this._toggled = idx;
				}
			}
		}
	};
	{
		/**
			@memberOf togglebar.prototype
			@name toggle
			@event
			@flag Cancellable
			@description Fires when user taps on a button in the togglebar which is not toggled.
			@param {EventObject} eventObj
			@param {Number} eventObj.oldToggled The index of the button that is toggled on.
			@param {Number} eventObj.newToggled The index of the button that is currently tapped.
		*/
	}

	this.extend(togglebar, juci.controls.basecontrol);
	juci.controls.togglebar = togglebar;
	/**
		@namespace
		@name text
		@augments basecontrol
		@description The text control allows the user to input alphanumeric data using the soft keyboard or the physical keyboard if available.
		@note Listeners to events can be attached by using {@link Observable#bind}, or listeners can be bound in the HTML declaration of the control using <i>on+'name of event'</i>, for e.g: onafterchange=handleChange(event). Listeners can be removed through {@link Observable#unbind}
		@attribute {String} pattern A string containing a regular expression against which the value of the control is checked. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#the-pattern-attribute">pattern</a> for more information.
		@attribute {Boolean} readonly A boolean value that controls whether or not the user can edit the value in the control. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#the-readonly-attribute">readonly</a> for more information.
		@attribute {Boolean} autofocus A boolean value that indicates if the control should be focussed as soon as the page is loaded. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#attr-fe-autofocus">autofocus</a> for more information.
		@attribute {String} autocomplete A string containing a single token with values either <i>on</i> or <i>off</i> or a set of space separated tokens directing the browser user-agent to auto suggest values for the control based on earlier inputs of the user. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#attr-fe-autocomplete">autocomplete</a> for more information.
		@attribute {String} min A string containing the minimum allowed value for the control. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#the-min-and-max-attributes">min</a> for more information.
		@attribute {String} max A string containing the maximum allowed value for the control. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#the-min-and-max-attributes">min</a> for more information.	placeholder {String} A string containing a short hint to help the user with data entry when the control has no value. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#the-placeholder-attribute">placeholder</a> for more information.
		@attribute {Boolean} required A boolean value that indicates if the control must be input with a value. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#the-required-attribute">required</a> for more information.	maxLength {Number} A number that indicates the limit on the number of characters user can input. Read <a href="http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#limiting-user-input-length:-the-maxlength-attribute">maxLength</a> for more information.
		@dataattribute {String} data-juci A string with value <i>text</i>.
		@dataattribute {String} data-trigger A string containing the name of the trigger event. Default event is <i>change</i>
		@see {@link juci.textwithdelete}
		@html <div data-juci="text"></div>
		@html <div data-juci="text" data-trigger="keyup" id="first-name"></div>
		@html <div data-juci="text" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="text" data-label="Name" class="juci_basecontrol juci_text" placeholder="Enter your name">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Name</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<input type="text" placeholder="Enter your name" class="juci_ctrl_box">
</div>
	*/
	var text = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	// Private, for extension to textarea
	text.prototype = {
		type: "text",
		DefaultValue: "",
		_getTextElementString: function(placeholderText, optionsString){
			return '<input type="'+this.type+
					'" placeholder="'+ juci.getTranslatedLabel(placeholderText) +
					'" '+ (this._readOnly ? ' readonly = "true"' : '') +
					optionsString +
					' class="juci_ctrl_box"></input>'
		},
		getDatabindConfig: function(){
			var r = this._super();
			r.keys.push("basecontrol");
			r.map.push("ref");
			r.defaults.push('""');
			return r;
		},
		addLinker: function(){
			if(!this.linker){
				this.flag = new juci.elem("<div class='juci_linker juci_pencil'></div>").prependTo(this._getFlagDrawer());
			}
			return this.linker;
		},
		init: function(){
			this.addLinker();
			if(this._ds){
				this.j.attr("data-bind", this.getDatabindString());
			}
			this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			var placeholderText = this.j.getAttr("placeholder", "");
			this._readOnly = !!this.j.attr("readonly");
			// pattern, list with datalist, autofocus, autocomplete, placeholder, maxlength, required, novalidation, min, max, form
			var possibleOptions = ["pattern", "readonly", "autocapitalize", "autofocus", "autocomplete", "min", "max", "step", "maxlength", "height"], optionsString = "";
			for(var k in possibleOptions){
				var key = possibleOptions[k];
				var v = this.j.attr(key);
				if(v !== null){
					optionsString += key + (!!v ? ("="+v) : "" ) + " ";
				}
			}
			this.i = new juci.elem(this._getTextElementString(placeholderText, optionsString)).appendTo(this.j);
			this._clickToOpenKBD = juci.utils.getCallback(this.i.focus, this.i);
			this._addFocusHandler(this.j);
			var that = this;
			var _focusHandle = function(e){
				that.j.addClass("focussed");
				e.target.onblur = _blurHandle;
				e.target.onfocus = null;
			}
			var _blurHandle = function(e){
				that.j.removeClass("focussed");
				e.target.onblur = null;
				e.target.onfocus = _focusHandle;
			}
			this.i.el.onfocus = _focusHandle;
			this.changeTrigger(this.j.attr("data-trigger"));
			 this.i.val(this._val);
		},
		/**
			@memberOf text.prototype
			@description Change the trigger event for the value to be modified on. By default it is <i>change</i>
			@param {String} triggerEvent Possible values - <i>change</i> and <i>keyup</i>
			@see juci.elem#event:change
			@see juci.elem#event:keyup
		*/
		changeTrigger: function(trigg){
			// trigg - keyup, change
			if(["change","keyup"].indexOf(trigg) < 0){
				trigg = "change";
			}
			if(this._trigger !== trigg){
				this.i.removeEvent(this._trigger);
				this._trigger = trigg;
				if(trigg === "keyup"){
					this.i.onKeyUp(this._onTextChange, this);
				}else{
					this.i.onChange(this._onTextChange, this);
				}
			}
		},
		_addFocusHandler: window.$m && $m.isWindowsPhone() ? function(elem){
			elem.onClick(function(e){
				if(e.target.el != this.i.el){
					e.preventDefault();
					this.i.focus();
				}
			}, this, ".juci_"+this.type);
			elem.el.addEventListener("click", this._clickToOpenKBD, false);
		} : juci.isBuggyAndroidGalaxyTab ? function(elem){
			// For Galaxy tab
			elem.el.addEventListener("touchend", juci.utils.getCallback(function(e){
				if(e.target == this.i.el){
					e.preventDefault();
				}
			}, this), ".juci_"+this.type);
			elem.el.addEventListener("click", this._clickToOpenKBD, false);
		} : function(elem){
			elem.onClick(function(e){
				if(e.target.el == this.i.el){
					e.stopPropagation();
				}
			}, this, ".juci_"+this.type);
			elem.el.addEventListener("click", this._clickToOpenKBD, false);
		},
		_onTextChange: function(evt){
			var oldVal = this._val;
			var retVal = this.__fireBeforeChange(oldVal, evt.value);
			if(!retVal){
				this.i.val(oldVal);
			}
		},
		focus: function(){
			this.j.scrollIntoView();
			this.i.focus();
		},
		blur: function(){
			this.i.blur();
		},
		value: function(val){
			if(typeof val == "undefined"){
				var _val = this.i.val();
				if(this._val !== _val){
					// TODO check in bb with auto complete on
					this._val = _val;
				}
				return this._returner(this._val);
			}else{
				this._val = val;
				if(this.i.val() !== this._formatter(val)){
					this.i.val(this._formatter(val));
				}
			}
		}
	};
	this.extend(text, juci.controls.basecontrol);
	juci.controls.text = text;

	/**
		@namespace
		@name password
		@augments text
		@description The password control allows the user to input a password using the soft keyboard or the physical keyboard if available.
		@dataattribute {String} data-juci A string with value <i>password</i>.
		@see passwordwithdelete
		@html <div data-juci="password"></div>
		@html <div data-juci="password" data-trigger="keyup" id="pwd"></div>
		@html <div data-juci="password" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="password" data-label="Pwd" class="juci_basecontrol juci_password" placeholder="Enter your password">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Pwd</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<input type="password" placeholder="Enter your password" class="juci_ctrl_box">
</div>
	*/
	var password = function(elem){
		this._super = juci.controls.text;
		elem.addClass("juci_text");
		this._super(elem);
	};
	password.prototype.type = "password";
	this.extend(password, juci.controls.text);
	juci.controls.password = password;

	/**
		@namespace
		@name number
		@augments text
		@description The number control allows the user to input numerical data using the soft keyboard or the physical keyboard if available.
		@dataattribute {String} data-juci A string with value <i>number</i>.
		@see numberwithdelete
		@html <div data-juci="number"></div>
		@html <div data-juci="number" data-trigger="keyup" id="first-name"></div>
		@html <div data-juci="number" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="number" data-label="Number" class="juci_basecontrol juci_text" placeholder="Number">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Number</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<input type="number" placeholder="Number" class="juci_ctrl_box">
</div>
	*/
	var number = function(elem){
		this._super = juci.controls.text;
		elem.addClass("juci_text");
		this._super(elem);
	}
	number.prototype.type = "number";
	number.prototype._onTextChange = function(evt){
		evt.value = parseFloat(evt.value, 10);
		var oldVal = this._val;
		this.__fireBeforeChange(oldVal, evt.value);
	}
	this.extend(number, juci.controls.text);
	juci.controls.number = number;

	/**
		@namespace
		@name tel
		@augments text
		@description The tel control allows the user to input telephone number data using the soft keyboard or the physical keyboard if available.
		@dataattribute {String} data-juci A string with value <i>tel</i>.
		@see telwithdelete
		@html <div data-juci="tel"></div>
		@html <div data-juci="tel" data-trigger="keyup" id="home-num"></div>
		@html <div data-juci="tel" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="tel" data-label="tel" class="juci_basecontrol juci_text" placeholder="tel">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">tel</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<input type="tel" placeholder="tel" class="juci_ctrl_box">
</div>
	*/
	var tel = function(elem){
		this._super = juci.controls.text;
		elem.addClass("juci_text");
		this._super(elem);
	}
	tel.prototype.type = "tel";
	this.extend(tel, juci.controls.text);
	juci.controls.tel = tel;

	/**
		@namespace
		@name email
		@augments text
		@description The email control allows the user to input email data using the soft keyboard or the physical keyboard if available.
		@dataattribute {String} data-juci A string with value <i>email</i>.
		@see emailwithdelete
		@html <div data-juci="email"></div>
		@html <div data-juci="email" data-trigger="keyup" id="email"></div>
		@html <div data-juci="email" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="email" data-label="tel" class="juci_basecontrol juci_text" placeholder="email">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">email</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<input type="email" placeholder="email" class="juci_ctrl_box">
</div>
	*/
	var email = function(elem){
		this._super = juci.controls.text;
		elem.addClass("juci_text");
		this._super(elem);
	}
	email.prototype.type = "email";
	this.extend(email, juci.controls.text);
	juci.controls.email = email;

	/**
		@namespace
		@name textarea
		@augments text
		@description The textarea control allows the user to input multiline alphanumeric data using the soft keyboard or the physical keyboard if available.
		@dataattribute {String} data-juci A string with value <i>textarea</i>.
		@see text
		@see textareawithdelete
		@html <div data-juci="textarea"></div>
		@html <div data-juci="textarea" data-trigger="keyup" id="address"></div>
		@html <div data-juci="textarea" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="textarea" data-label="Address" class="juci_basecontrol juci_textarea juci_text" placeholder="Address">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Address</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<textarea placeholder="Address" class="juci_ctrl_box"></textarea>
</div>
	*/
	var textarea = function(elem){
		this._super = juci.controls.text;
		elem.addClass("juci_text");
		this._super(elem);
	}
	textarea.prototype.type = "textarea";
	textarea.prototype._getTextElementString = function(placeholderText, optionsString){
		return '<textarea' +
				' placeholder="'+ juci.getTranslatedLabel(placeholderText) +
				'" '+ (this._readOnly ? ' readonly = "true"' : '') +
				optionsString +
				' class="juci_ctrl_box"></textarea>'
	};
	this.extend(textarea, juci.controls.text);
	juci.controls.textarea = textarea;

	/**
		@namespace
		@name textWithDelete
		@exports textWithDelete as textwithdelete
		@augments text
		@description The textwithdelete control allows the user to input alphanumeric data using the soft keyboard or the physical keyboard if available. The control also displays a delete icon that helps user to clear the value of the control when tapped on.
		@dataattribute {String} data-juci A string with value <i>textwithdelete</i>.
		@see text
		@see textareawithdelete
		@html <div data-juci="textwithdelete"></div>
		@html <div data-juci="textwithdelete" data-trigger="keyup" id="username"></div>
		@html <div data-juci="textwithdelete" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="textwithdelete" data-label="Name" placeholder="Enter your name" class="juci_basecontrol juci_textwithdelete juci_text">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Name</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_float_right">
		<div>
			<input type="text" placeholder="Enter your name" class="juci_ctrl_box"/>
		</div>
		<div>
			<div class="juci_text_delete"></div>
		</div>
	</div>
</div>
	*/
	var textWithDelete = function(elem){
		this._super = juci.controls.text;
		elem.addClass("juci_text");
		this._super(elem);
	};
	textWithDelete.prototype = {
		type: "textwithdelete",
		_getTextElementString: function(placeholderText, optionsString){
			return '<input type="'+this.type.replace("withdelete", "")+
					'" placeholder="'+ juci.getTranslatedLabel(placeholderText) +
					'" '+ (this._readOnly ? ' readonly = "true"' : '') +
					optionsString +
					' class="juci_ctrl_box"></input>'
		},
		init: function(){
			this._super();
			var container = new juci.elem("<div class='juci_float_right'></div>").appendTo(this.j);
			var c1 = new juci.elem("<div></div>").appendTo(container);
			this.i.appendTo(c1);
			var c2 = new juci.elem("<div></div>").appendTo(container);
			var delBtn = new juci.elem("<div class='juci_text_delete'></div>").appendTo(c2);
			this.j.onClick(juci.utils.stopPropagation, null, ".juci_text_delete");
			this.j.onClick(this.clear, this, ".juci_text_delete");
		},
		showDelete: juci.utils.EmptyMethod,
		hideDelete: juci.utils.EmptyMethod
	};
	/**
		@methodOf textwithdelete.prototype
		@name onDeleteClick
		@description Registers a handler function to call when the {@link textwithdelete#event:deleteclick} event fires.
		@param {Function} handler A handler function to execute when the {@link textwithdelete#event:deleteclick} event fires.
		@param {Object} [context] Context in which the <i>handler</i> function should execute.
		@see textwithdelete#event:deleteclick
	*/
	{
		/**
			@memberOf textwithdelete.prototype
			@name deleteclick
			@event
			@description Fires when user taps on the delete icon in the control.
			@flag Cancellable
			@param {EventObject} eventObj
		*/
	}
	this.extend(textWithDelete, juci.controls.text);
	juci.controls.textwithdelete = textWithDelete;

	/**
		@namespace
		@name textareaWithDelete
		@exports textareaWithDelete as textareawithdelete
		@augments textwithdelete
		@description The textareawithdelete control allows the user to input alphanumeric multiline data using the soft keyboard or the physical keyboard if available. The control also displays a delete icon that helps user to clear the value of the control when tapped on.
		@dataattribute {String} data-juci A string with value <i>textareawithdelete</i>.
		@html <div data-juci="textareawithdelete"></div>
<div data-juci="textareawithdelete" data-trigger="keyup" id="address"></div>
<div data-juci="textareawithdelete" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="textareawithdelete" data-label="Address" placeholder="Enter your address" class="juci_basecontrol juci_textareawithdelete juci_text">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Address</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_float_right">
		<div>
			<textarea placeholder="Enter your Address" class="juci_ctrl_box"></textarea>
		</div>
		<div>
			<div class="juci_text_delete"></div>
		</div>
	</div>
</div>
	*/
	var textareaWithDelete = function(elem){
		this._super = juci.controls.textwithdelete;
		elem.addClass("juci_text");
		this._super(elem);
	}
	textareaWithDelete.prototype.type = "textareawithdelete";
	textareaWithDelete.prototype._getTextElementString = function(placeholderText, optionsString){
		return '<textarea' +
				' placeholder="'+ juci.getTranslatedLabel(placeholderText) +
				'" '+ (this._readOnly ? ' readonly = "true"' : '') +
				optionsString +
				' class="juci_ctrl_box"></textarea>'
	};
	this.extend(textareaWithDelete, juci.controls.textwithdelete);
	juci.controls.textareawithdelete = textareaWithDelete;

	/**
		@namespace
		@name passwordWithDelete
		@exports passwordWithDelete as passwordwithdelete
		@augments textwithdelete
		@description The passwordwithdelete control allows the user to input password using the soft keyboard or the physical keyboard if available. The control also displays a delete icon that helps user to clear the value of the control when tapped on.
		@dataattribute {String} data-juci A string with value <i>passwordwithdelete</i>.
		@html <div data-juci="passwordwithdelete"></div>
		@html <div data-juci="passwordwithdelete" data-trigger="keyup" id="pwd"></div>
		@html <div data-juci="passwordwithdelete" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="passwordwithdelete" data-label="Password" placeholder="Enter your password" class="juci_basecontrol juci_passwordwithdelete juci_text">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Password</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_float_right">
		<div>
			<input type="password" placeholder="Enter your password" class="juci_ctrl_box"/>
		</div>
		<div>
			<div class="juci_text_delete"></div>
		</div>
	</div>
</div>
	*/
	var passwordWithDelete = function(elem){
		this._super = juci.controls.textwithdelete;
		elem.addClass("juci_text");
		this._super(elem);
	};
	passwordWithDelete.prototype.type = "passwordwithdelete";
	this.extend(passwordWithDelete, juci.controls.textwithdelete);
	juci.controls.passwordwithdelete = passwordWithDelete;

	/**
		@namespace
		@name numberWithDelete
		@exports numberWithDelete as numberwithdelete
		@augments textwithdelete
		@description The numberwithdelete control allows the user to input numeric data using the soft keyboard or the physical keyboard if available. The control also displays a delete icon that helps user to clear the value of the control when tapped on.
		@dataattribute {String} data-juci A string with value <i>numberwithdelete</i>.
		@html <div data-juci="numberwithdelete"></div>
		@html <div data-juci="numberwithdelete" data-trigger="keyup" id="num"></div>
		@html <div data-juci="numberwithdelete" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="numberwithdelete" data-label="Name" placeholder="Enter your number" class="juci_basecontrol juci_numberwithdelete juci_text">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Number</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_float_right">
		<div>
			<input type="number" placeholder="Enter your number" class="juci_ctrl_box"/>
		</div>
		<div>
			<div class="juci_text_delete"></div>
		</div>
	</div>
</div>
	*/
	var numberWithDelete = function(elem){
		this._super = juci.controls.textwithdelete;
		elem.addClass("juci_text");
		this._super(elem);
	}
	numberWithDelete.prototype.type = "numberwithdelete";
	numberWithDelete.prototype._onTextChange = function(evt){
		evt.value = parseInt(evt.value, 10);
		var oldVal = this._val;
		this.__fireBeforeChange(oldVal, evt.value);
	}
	this.extend(numberWithDelete, juci.controls.textwithdelete);
	juci.controls.numberwithdelete = numberWithDelete;

	/**
		@namespace
		@name telWithDelete
		@exports telWithDelete as telwithdelete
		@augments textwithdelete
		@description The telwithdelete control allows the user to input telelphone number using the soft keyboard or the physical keyboard if available. The control also displays a delete icon that helps user to clear the value of the control when tapped on.
		@dataattribute {String} data-juci A string with value <i>telwithdelete</i>.
		@html <div data-juci="telwithdelete"></div>
		@html <div data-juci="telwithdelete" data-trigger="keyup" id="home-num"></div>
		@html <div data-juci="telwithdelete" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="telwithdelete" data-label="Name" placeholder="Enter your tel" class="juci_basecontrol juci_telwithdelete juci_text">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Tel</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_float_right">
		<div>
			<input type="tel" placeholder="Enter your tel" class="juci_ctrl_box"/>
		</div>
		<div>
			<div class="juci_text_delete"></div>
		</div>
	</div>
</div>
	*/
	var telWithDelete = function(elem){
		this._super = juci.controls.textwithdelete;
		elem.addClass("juci_text");
		this._super(elem);
	}
	telWithDelete.prototype.type = "telwithdelete";
	this.extend(telWithDelete, juci.controls.textwithdelete);
	juci.controls.telwithdelete = telWithDelete;

	/**
		@namespace
		@name emailWithDelete
		@exports emailWithDelete as emailwithdelete
		@augments textwithdelete
		@description The telwithdelete control allows the user to input telelphone number using the soft keyboard or the physical keyboard if available. The control also displays a delete icon that helps user to clear the value of the control when tapped on.
		@dataattribute {String} data-juci A string with value <i>telwithdelete</i>.
		@html <div data-juci="telwithdelete"></div>
		@html <div data-juci="telwithdelete" data-trigger="keyup" id="home-num"></div>
		@html <div data-juci="telwithdelete" data-bind="ref: someKey"></div>
		@csshtml <div data-juci="emailwithdelete" data-label="Email" placeholder="Enter your email" class="juci_basecontrol juci_emailwithdelete juci_text">
	<div class="juci_flag_drawer">
		<div class="juci_linker juci_pencil"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Email</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_float_right">
		<div>
			<input type="email" placeholder="Enter your email" class="juci_ctrl_box"/>
		</div>
		<div>
			<div class="juci_text_delete"></div>
		</div>
	</div>
</div>
	*/
	var emailWithDelete = function(elem){
		this._super = juci.controls.textwithdelete;
		elem.addClass("juci_text");
		this._super(elem);
	}
	emailWithDelete.prototype.type = "emailwithdelete";
	this.extend(emailWithDelete, juci.controls.textwithdelete);
	juci.controls.emailwithdelete = emailWithDelete;

	/**#nocode+*/
	var forgotPassword = function(elem){
		this._super = juci.controls.text;
		this._super(elem);
	};
	forgotPassword.prototype = {
		type: "forgotpassword",
		_getTextElementString: function(placeholderText, optionsString){
			return '<input type="password"' +
					'" placeholder="'+ juci.getTranslatedLabel(placeholderText) +
					'" '+ (this._readOnly ? ' readonly = "true"' : '') +
					optionsString +
					' class="juci_ctrl_box"></input>'
		},
		init: function(){
			var container = new juci.elem("<div class='juci_float_right'></div>").appendTo(this.j);
			var c1 = this.pwdContainer = new juci.elem("<div class='juci_basecontrol juci_text juci_not_rounded juci_left_rounded juci_forgotpassword_password'></div>").appendTo(container);
			this._super();
			var lbl = this.j.find(".juci_ctrl_label")[0];
			if(lbl){
				lbl.appendTo(c1);
			}
			this.i.appendTo(c1);
			var c2 = new juci.elem("<div class='juci_basecontrol juci_forgot_password_container juci_not_rounded juci_right_rounded'></div>").appendTo(container);
			var fPwd = new juci.elem("<div class='juci_forgot_password'>?</div>").appendTo(c2);
			this.j.removeClick();
			this.j.el.removeEventListener("click", this._clickToOpenKBD, false);
			c2.onClick(this._onForgotPassword, this);
			this._addFocusHandler(c1);
			this.i.el.onfocus = function(){
				c1.addClass("focussed");
			}
			this.i.el.onblur = function(){
				c1.removeClass("focussed");
			}
		},
		_addFocusHandler: window.$m && $m.isWindowsPhone() ? function(elem){
			elem.onClick(function(e){
				if(e.target.el != this.i.el){
					e.preventDefault();
					this.i.focus();
				}
			}, this, ".juci_forgotpassword_password");
			elem.el.addEventListener("click", this._clickToOpenKBD, false);
		} : juci.isBuggyAndroidGalaxyTab ? function(elem){
			// For Galaxy tab
			elem.el.addEventListener("touchend", juci.utils.getCallback(function(e){
				if(e.target == this.i.el){
					e.preventDefault();
				}
			}, this), ".juci_forgotpassword_password");
			elem.el.addEventListener("click", this._clickToOpenKBD, false);
		} : function(elem){
			elem.onClick(function(e){
				if(e.target.el == this.i.el){
					e.stopPropagation();
				}
			}, this, ".juci_forgotpassword_password");
			elem.el.addEventListener("click", this._clickToOpenKBD, false);
		},
		onForgotPassword: function(fp, ctx){
			this.addListener("forgotpassword", fp, ctx);
		},
		_onForgotPassword: function(e){
			this.i.blur();
			e.preventDefault();
			this.fireEvent("forgotpassword", e);
		},
		_getFlagDrawer: function(){
			if(!this._flagDrawer){
				this._flagDrawer = new juci.elem("<div class='juci_flag_drawer'></div>").prependTo(this.pwdContainer);
			}
			return this._flagDrawer;
		},
		setFlag: function(msg, clazz){
			if(!this._flag){
				this._flag = new juci.elem("<div class='juci_flag'><div>"+msg+"</div></div>").prependTo(this._getFlagDrawer());
				if(clazz){
					this._flag.addClass("juci_" + clazz);
				}
				this.pwdContainer.onClick(this._onFlagClick, this, ".juci_flag");
			}else{
				this._flag.removeClass();
				this._flag.addClass("juci_flag" + (clazz ? (" juci_"+clazz) : ""));
				this._flag.children()[0].html(msg);
			}
			this.pwdContainer.addClass("juci_flag_visible");
			return this._flag;
		},
		showDelete: function(){
			if(this._delete){
				this._delete = new juci.elem('<div class="juci_delete"><div class="juci_delete_icon"></div></div>').appendTo(this._getFlagDrawer());
				this.pwdContainer.onClick(this._onDeleteClick, this, ".juci_delete_icon");
			}else{
				this._delete.show();
			}
			this.pwdContainer.addClass("juci_delete_visible");
		},
		resetFlag: function(){
			if(this._flag){
				this._flag.remove();
				this.pwdContainer.removeClass("juci_flag_visible");
				delete this._flag;
			}
		},
		hideDelete: function(){
			if(this._delete){
				this._delete.hide();
				this.pwdContainer.removeClass("juci_delete_visible");
			}
		}

	};
	this.extend(forgotPassword, juci.controls.text);
	juci.controls.forgotpassword = forgotPassword;
	/**#nocode-*/
	/**
		@namespace
		@name checkbox
		@augments basecontrol
		@description The checkbox control allows the user to switch between two states. Refer {@link juci#checkboxgroup} to display a set of options to user and allow the user to select one or more from them.
		@remark The default state of the control is <i>checked</i>. Provide <i>data-bind="ref: false"</i> to set the default state of the control to <i>unchecked</i>. data-value="false"
		@see checkboxgroup
		@see radiogroup
		@see switch
		@dataattribute {String|Number|Boolean} data-checked A string or numerical value of the control when it is <i>on</i> state.
		@dataattribute {String|Number|Boolean} data-unchecked A string or numerical value of the control when it is <i>off</i> state.
		@dataattribute {String} data-juci A string with value <i>checkbox</i>.
		@html <div data-juci="checkbox" data-label="Check me"></div>
		@html <div data-juci="checkbox" data-label="Checked initially" data-value="true"></div>
		@html <div data-juci="checkbox" data-label="Checked initially" data-bind="ref: true"></div>
		@html <div data-juci="checkbox" data-label="Data bound" data-bind="ref: checkbox"></div>
		@css .juci_checkbox.selected
		@csshtml <div data-juci="checkbox" data-label="Checked initially" class="juci_basecontrol juci_checkbox juci_check">
	<div class="juci_ctrl_box juci_switch_box">
		<div class="juci_switch_label">
			<label>Checked initially</label>
		</div>
		<div class="juci_check_box"></div>
	</div>
</div>
	*/
	var checkbox = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	checkbox.prototype = {
		type: "checkbox",
		_getOptionContainerString: function(e){
			var label = this.j.attr("data-label");
			return '<div class="juci_ctrl_box juci_switch_box">'+
						'<div class="juci_switch_label">' +
							'<label>'+juci.getTranslatedLabel(label)+'</label>' +
						'</div>'+
						'<div class="juci_check_box"></div>'+
					'</div>';
		},
		_onClick: function(e){
			var oldVal = this._val;
			var newVal = e.currentTarget.toggleClass("selected") ? this._checkedValue : this._uncheckedValue;
			this.__fireBeforeChange(oldVal, newVal);
		},
		DefaultValue: false,
		DefaultCheckedValue: true,
		DefaultUncheckedValue: false,
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol", "checkedValue", "uncheckedValue"]);
			juci.utils.arrayPushAll(r.map, ["ref", "checkedValue", "uncheckedValue"]);
			juci.utils.arrayPushAll(r.defaults, ['""', this.DefaultCheckedValue, this.DefaultUncheckedValue]);
			return r;
		},
		getDefaultValue: function(){
			return new Function("return " + this.j.getAttr("data-value", this.DefaultValue))();
		},
		init: function(){
			this._checkedValue = new Function("return " + this.j.getAttr("data-checked", this.DefaultCheckedValue))();
			this._uncheckedValue = new Function("return " + this.j.getAttr("data-unchecked", this.DefaultUncheckedValue))();
			this.j.addClass("juci_check");
			this.j.attr("data-bind", this._ds ? this.getDatabindString() : this.getDefaultDatabindString());
			var container = new juci.elem(this._getOptionContainerString(), false).appendTo(this.j);
			this._option = container.children()[0];
			this.j.onClick(this._onClick, this, ".juci_check");
			this.refresh();
		},
		refresh: function(){
			if(this._val === this._checkedValue){
				this.j.addClass("selected");
			}else{
				this.j.removeClass("selected");
			}
		},
		value: function(val){
			if(typeof val == "undefined"){
				return this._returner(this._val);
			}else{
				if(this._val !== val){
					if(val === this._checkedValue){
						this._val = this._checkedValue;
					}else{
						this._val = this._uncheckedValue;
					}
					this.refresh();
				}
			}
		},
		showDelete: juci.utils.EmptyMethod,
		hideDelete: juci.utils.EmptyMethod,
		setFlag: juci.utils.EmptyMethod,
		resetFlag: juci.utils.EmptyMethod
	};
	this.extend(checkbox, juci.controls.basecontrol);
	juci.controls.checkbox = checkbox;

	/**
		@namespace
		@name switcher
		@augments basecontrol
		@exports switcher as switch
		@description The switch control allows the user to switch an option between two states. Typical usage of this control is seen in user preferences/settings in mobile OS, where a particular setting can be turned on/off by the user by flipping the switch.
		@remark The default state of the control is <i>on</i>. Provide <i>data-bind="ref: false"</i> to set the default state of the control to <i>off</i>. or data-value="false"
		@see checkboxgroup
		@see radiogroup
		@dataattribute {String|Number|Boolean} data-onvalue A string or numerical value of the control when it is <i>on</i> state.
		@dataattribute {String|Number|Boolean} data-offvalue A string or numerical value of the control when it is <i>off</i> state.
		@dataattribute {String} data-juci A string with value <i>switch</i>.
		@dataattribute {String} data-ontext A string containing text to display as <i>on</i> label of the switch control.
		@dataattribute {String} data-offtext A string containing text to display as <i>Off</i> label of the switch control.
		@dataattribute {String} data-onclass A string containing style class to apply during <i>on</i> state of the switch control.
		@dataattribute {String} data-offclass A string containing style class to apply during <i>off</i> state of the switch control.
		@html <div data-juci="switch" data-label="Try Switching me"></div>
		@html <div data-juci="switch" data-label="Switched off initially" data-value="false"></div>
		@html <div data-juci="switch" data-label="Switched off initially" data-bind="ref: false"></div>
		@html <div data-juci="switch" data-label="Data bound" data-bind="ref: switcher"></div>
		@html <div data-juci="switch" data-label="Customized labels and style" data-ontext="YES" data-offtext="NO"
	data-onclass="juci_error"
	data-offclass="juci_blue">
</div>
		@csshtml <div data-juci="switch" data-label="Switched off initially" data-value="false" class="juci_basecontrol juci_switch juci_parent">
	<div class="juci_ctrl_box juci_switch_box">
		<div class="juci_switch_label">
			<label>Switched off initially</label>
		</div>
		<div class="juci_switch_bar selected">
			<div class="juci_switch_scroller">
				<span class="juci_switch_on juci_positive">ON</span>
				<span class="juci_switch_thumb"></span>
				<span class="juci_switch_off juci_negative">OFF</span>
			</div>
		</div>
	</div>
</div>
	*/
	var switcher = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	switcher.prototype = {
		type: "switch",
		_getOptionContainerString: function(e){
			var label = this.j.attr("data-label");
			var onValue = this.j.getAttr("data-ontext", "ON");
			var offValue = this.j.getAttr("data-offtext", "OFF");
			var onClass = this.j.getAttr("data-onclass", "juci_positive");
			var offClass = this.j.getAttr("data-offclass", "juci_negative");
			return '<div class="juci_ctrl_box juci_switch_box">'+
					'<div class="juci_switch_label">' +
							'<label>'+juci.getTranslatedLabel(label)+'</label>' +
						'</div>'+
						'<div class="juci_switch_bar selected">' +
							'<div class="juci_switch_scroller">' +
								'<span class="juci_switch_on '+onClass+'">' + onValue + '</span>' +
								'<span class="juci_switch_thumb"></span>' +
								'<span class="juci_switch_off '+offClass+'">' + offValue + '</span>' +
							'</div>' +
						'</div>' +
					'</div>';
		},
		_onScrollEnd: function(){
			var oldVal = this._val;
			var newVal = this.scroller.currPageX == 0 ? this._checkedValue : this._uncheckedValue;
			if(oldVal !== newVal){
				this.__fireBeforeChange(oldVal, newVal);
			}
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
			this.switchBar = container.find(".juci_switch_bar")[0];
			this.switchBar.onClick(juci.utils.getDelayedCallback(this._toggle, this, 200));
			this.scroller = new juci.scrollable(this.switchBar.el, {
				snap: true,
				momentum: false,
				hScrollbar: false,
				bounce: false,
				width: 100,
				onTouchEnd: juci.utils.getCallback(this._onScrollEnd, this)
			});
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
			this.switchBar.enable();
			this.scroller.enable();
			this._super();
		},
		disable: function(){
			this.switchBar.disable();
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
						this.switchBar.addClass("selected");
						pg = 0;
					}else{
						this._val =  this._uncheckedValue;
						this.switchBar.removeClass("selected");
						pg = 1;
					}
					if(!bDontScroll || pg != this.scroller.currPageX){
						if(this.scroller.pagesX.length == 0){
							// juci.utils.getDelayedCallback(this.refresh, this, 200)();
						}else{
							this.scroller.scrollToPage(pg, 0, 200);
						}
					}
				}
				if(this.scroller.pagesX.length == 0){
					this.scroller.refresh();
				}
			}
		},
		refresh: function(){
			if(this.scroller.pagesX.length == 0){
				this.scroller.refresh();
			}
			if(this.scroller.pagesX.length > 0){
				var pg = this._val === this._checkedValue ? 0 : 1;
				this.scroller.scrollToPage(pg, 0, 200);
			}else{
				juci.utils.getDelayedCallback(this.refresh, this, 200)();
			}
		},
		showDelete: juci.utils.EmptyMethod,
		hideDelete: juci.utils.EmptyMethod,
		setFlag: juci.utils.EmptyMethod,
		resetFlag: juci.utils.EmptyMethod
	};
	this.extend(switcher, juci.controls.basecontrol);
	juci.controls["switch"] = switcher;

	/**
		@namespace
		@name image
		@augments basecontrol
		@description
		@dataattribute {String} data-juci A string with value <i>image</i>.
		@dataattribute {Boolean} data-uri True for <a href="https://developer.mozilla.org/en-US/docs/data_URIs?redirectlocale=en-US&redirectslug=The_data_URL_scheme" _target="blank">data uri</a> string, else URL reference by default.
		@html <div data-juci="image" data-value="/img/image.png"></div>
		@html <div data-juci="image" data-bind="ref: img" data-uri="true"></div>
		@csshtml <div data-juci="image" data-value="../../system/img/about.png" data-label="Image" class="juci_basecontrol juci_image">
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Image</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<img class="juci_ctrl_box" src="../../system/img/about.png"/>
</div>
	*/
	var image = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	image.prototype = {
		type: "image",
		DefaultValue: "",
		DefaultFormatter: function(item){ return item == null ? '' : item;},
		Events: juci.controls.basecontrol.prototype.Events.concat(["load","error"]),
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol"]);
			juci.utils.arrayPushAll(r.map, ["ref"]);
			juci.utils.arrayPushAll(r.defaults, ['""']);
			return r;
		},
		// image allows both base64 and urls. how?
		init: function(){
			if(this._ds){
				this.j.attr("data-bind", this.getDatabindString());
			}else{
				this.j.attr("data-bind", this.getDefaultDatabindString());
			}
			this._bIsUri = this.j.getAttr("data-uri",false);
			this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			this.i = new juci.elem('<img class="juci_ctrl_box"/>').appendTo(this.j);
			juci.bindDOMEvent("error", this.i.el, this._onEvent(this, "error"));
			juci.bindDOMEvent("load", this.i.el, this._onEvent(this, "load"));
			this.value(this._val);
		},
		/**
			@methodOf image.prototype
			@description Registers a handler function to call when the {@link image#error} event fires.
			@param {Function} handler A handler function to execute when the {@link image#error} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onError: function(fn, context){
			this.addListener("error", fn, context);
		},
		/**
			@methodOf image.prototype
			@description Registers a handler function to call when the {@link image#event:load} event fires.
			@param {Function} handler A handler function to execute when the {@link image#event:load} event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onLoad: function(fn, context){
			this.addListener("load", fn, context);
		},
		_onEvent: function(ctrl, evtName){
			return function(e){
				var evt = new MDOMEventObject(e);
				evt.img = this.i;
				ctrl.fireEvent(evtName, evt);
			}
		},
		value: function(val){
			if(this._bIsUri){
				if(typeof val == "undefined"){
					var value = this.i.val();
					return this._returner(value ? value.replace("data:;base64,", "") : value);
				}else{
					this.i.val((val != null) ? ("data:;base64," + val) :"");
				}
			}else{
				if(typeof val == "undefined")
					return this.i.val();
				else{
					this.i.val(this._formatter(val));
				}
			}
			if(val === null){
				this.i.hide();
			}else{
				this.i.show();
			}
		}
	};
	{
		/**
			@name load
			@memberOf image.prototype
			@event
			@description Fires when the image has loaded in the control
			@param {EventObject} eventObj
			@param {juci.elem} eventObj.img Image element
		*/
		/**
			@name error
			@memberOf image.prototype
			@event
			@description Fires when the image loading has failed
			@param {EventObject} eventObj
			@param {juci.elem} eventObj.img Image element
		*/
	}
	this.extend(image, juci.controls.basecontrol);
	juci.controls.image = image;

	/**
		@namespace
		@name checkboxgroup
		@augments basecontrol
		@description The checkboxgroup control allows the user to select one or more options from a list of alternatives.
		@description <i>data-juci="optiontemplate"</i> can be used to create a custom option template. The <i>value</i> of the control is an <i>Array</i> of selected options
		@see switch
		@see checkbox
		@see radiogroup
		@dataattribute {String} data-juci A string with value <i>checkboxgroup</i>.
		@dataattribute {Object} data-bind A string containing comma separated key-value pairs from the list of below keys. Also augmented by other controls. #example #html data-bind="ref: someKey, optionsList: list" #example
		@dataattribute {String} data-bind.ref A string containing the reference path from a dataset defined using the {@link juci#addDataset} method. The value of the key referred by this path bounds as value of the control.
		@dataattribute {Array} data-bind.optionsList A string reference pointing to an array of numbers or strings or objects to display as options in the checkboxgroup control. The reference path string should be part of any dataset defined using the {@link juci#addDataset} method.
		@dataattribute {Function} data-bind.optionsText A function that is invoked for each item in the array referred by <i>optionsList</i>. This function is the perfect place to edit the text in case if the item is a string/number or choose the property which contains the text in case of the item is an object. The function must return the text that should display as an item in the checkboxgroup control. The function receives the following parameter as input,
		@dataattribute {Object} data-bind.optionsText.item Parameter for optionsText method. A string or number or object that displays as an item in the checkboxgroup control.
		@dataattribute {String} data-comparator Name of function defined on the window scope. Called when a value is compared with each option available in the options list. The function receives the values compared as parameters.
		@html <div data-juci="checkboxgroup" data-label="Check out the options" data-bind="optionsList: options"></div>
		@html <div data-juci="checkboxgroup" data-bind="optionsList: options"></div>
		@html <div data-juci="checkboxgroup" data-label="Data bound" data-bind="optionsList: options, ref: simpleValue"></div>
		@html <div data-juci="checkboxgroup" data-label="Data bound and disabled" data-bind="optionsList: options, ref: simpleValue" disabled></div>
		@html <div
	data-juci="checkboxgroup"
	data-label="Complex Data bound"
	data-bind="optionsList: complexOptions, optionsText: function(item){return item.name}, ref: complexValue"
	data-comparator="complexComparator"></div>
		@html <div
	data-juci="checkboxgroup"
	data-label="Complex Data bound with option templating"
	data-bind="optionsList: complexOptions, ref: complexValue"
	data-comparator="complexComparator">
		<div data-juci="optiontemplate">
			<label data-bind="display: 'Name is ' + name()"></label>
		</div>
</div>
		@example #js juci.addDataset("complexValue", [{value: "1", name: "red"}]);
juci.addDataset("simpleValue", ["red"]);
juci.addDataset("options", ["red", "blue", "green"]);
juci.addDataset("complexOptions", [{name:"red", value: "1"}, {name: "blue", value: "2"}, {name: "green", value: "3"}]);
		@example #js function complexComparator(i1, i2){
	return i1.value == i2.value;
}
		@css .juci_option
		@css .juci_option.touch
		@css .juci_options
		@csshtml <div data-juci="checkboxgroup" class="juci_basecontrol juci_checkboxgroup">
	<ul class="juci_ctrl_box juci_options" data-juci="checkbox" data-bind="ref: options,optionsList: options">
		<li class="juci_check juci_option">
			<div class="juci_option_label"><label data-bind="text: function(item){return item}">red</label>
			</div>
		</li>
	</ul>
	<div class="juci_options_placeholder" style="display: none;">No options</div>
</div>
	*/
	var checkboxgroup = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	checkboxgroup.prototype = {
		type: "checkboxgroup",
		DefaultValue: null,
		getDefaultValue: function(){
			return new Function("return " + this.j.getAttr("data-value", this.DefaultValue))();
		},
		_onOptionClick: function(e){
			var delegatee = e.delegatee;
			if(delegatee != null){
				this._onOptionSelected(delegatee);
			}
		},
		_onOptionSelected: function(elem){
			var changedItem;
			var selected = elem.toggleClass("selected");
			var dataForElem =  ko.dataFor(elem.el);
			this._val = this._val == null ? [] : this._val;
			if(selected){
				this._selectedOptions.push(dataForElem);
				changedItem = this._valueHandler(dataForElem);
				this._val.push(changedItem);
			}else{
				var index = this._selectedOptions.indexOf(dataForElem);
				this._selectedOptions.splice(index, 1);
				var indexOnVal = this._val.indexOf(dataForElem);
				changedItem = this._val.splice(indexOnVal, 1)[0];
			}
			if(this.__koValue){
				this._isSourceOfChange = true;
				this.__koValue(this._val);
			}
			this.fireAfterChange(this._val);
		},
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol"]);
			juci.utils.arrayPushAll(r.map, ["ref"]);
			juci.utils.arrayPushAll(r.defaults, ['""']);
			juci.utils.arrayPushAll(r.ignore, ["optionsList", "optionsText", "optionsValue"]);
			return r;
		},
		init: function(){
			if(this._ds){
				this.j.attr("data-bind", this.getDatabindString());
			}
			if(this.j.attr("data-label")){
				this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			}
			// IMPORTANT - ROOT level binding for the options always
			//var dataBindString = 'ref: ' + (this._ds.ref ? this._ds.ref : '""')  + ',optionsList: $root.' +
			var dataBindString = 'ref: ' + (this._ds.ref ? this._ds.ref : this._ds.optionsList)  + ',optionsList: ' +
						this._ds.optionsList + (this._ds.optionsText ? ', optionsText: ' + this._ds.optionsText : '') +
						(this._ds.optionsValue ? ", optionsValue: " + this._ds.optionsValue : '');
			/*
				<div class="juci_checkbox"> - Only value required at this level. Not options.
					<div class="juci_control_label>
						<label></label>
					</div>
					<ul class="juci_ctrl_box juci_options"> table - Options alone required here.
						<li class="juci_check juci_option"> table row repeat
							<div class="juci_option_label"> cell
								<label>Red</label>
							</div>
						</li>
					</ul>
				</div>
			*/
			if(!juci.hasTouch){
				this._focusser = new juci.elem('<a class="juci_ctrl_focusser" href="#"></a>');
				this.j.prepend(this._focusser);
				this._focusser.onFocus(this._onFocus, this);
				this._focusser.onBlur(this._onBlur, this);
				this._focusser.onKeyDown(function(e){
					this._onKeyPress(e);
				}, this);
			}
			this._container = new juci.elem("<ul class='juci_ctrl_box juci_options' data-juci='checkbox' data-bind='"+dataBindString+"'></ul>").appendTo(this.j);
			this.optionTemplate = new juci.elem('<li class="juci_check juci_option">' + //table row repeat
							this.getInnerOptionTemplate() +
							'</li>', false).appendTo(this._container);
			this._container.onClick(this._onOptionClick, this, ".juci_option");
			var optsPlaceholder = "No options";
			//this.j.append("<div class='juci_options_placeholder' data-bind='show: $root."+this._ds.optionsList+"().length == 0'>"+optsPlaceholder+"</div>");
			this.j.append("<div class='juci_options_placeholder' data-bind='ref: "+this._ds.optionsList+", show: juci.utils.isEmpty'>"+optsPlaceholder+"</div>");
			this._valueHandler = null;
			this._selectedOptions = [];
			this._valObjs = [];
			var comparator = this.j.attr("data-comparator");
			this._comparatorFn = window[comparator] ? function(val1, val2){ return window[comparator](val1 ? ko.mapping.toJS(val1) : val1, val2 ? ko.mapping.toJS(val2) : val2)} : juci.utils.defaultComparator;
			var that = this;
			this.searchHandler = this._ds.optionsValue ? function(item, searchValue){
				return that.__listparams.optionsValue(item).toLowerCase().search(searchValue.toLowerCase()) > -1;
			}: this._ds.optionsText ? function(item, searchValue){
				return that.__listparams.optionsText(item).toLowerCase().search(searchValue.toLowerCase()) > -1;
			} : function(item, searchValue){
				return (""+item).toLowerCase().search(searchValue.toLowerCase()) > -1;
			};
		},
		_onFocus: function(){
			this._options = this._container.find(".juci_check.juci_option");
			if(this._options.length == 0){
				this._currIndex = -1;
				return;
			}
			this._currIndex = 0;
			this._options[this._currIndex].addClass("touch");
			this._options[this._currIndex].scrollIntoViewIfNeeded();
		},
		_onBlur: function(){
			if(this._currIndex != -1){
				this._options[this._currIndex].removeClass("touch");
				this._currIndex = -1;
			}
		},
		_onKeyPress: function(e){
			var kC = e.srcEvent.keyCode;
			if(kC == 13 || kC == 32){
				// Select
				this._onOptionSelected(this._options[this._currIndex]);
				e.preventDefault();
			}else if(kC == 38 && this._currIndex > 0){
				// Up
				this._options[this._currIndex--].removeClass("touch");
				this._options[this._currIndex].addClass("touch");
				this._options[this._currIndex].scrollIntoViewIfNeeded();
				e.preventDefault();
			}else if(kC == 40 && this._currIndex+1 < this._options.length){
				// Down
				this._options[this._currIndex++].removeClass("touch");
				this._options[this._currIndex].addClass("touch");
				this._options[this._currIndex].scrollIntoViewIfNeeded();
				e.preventDefault();
			}
		},
		getInnerOptionTemplate: function(){
			var optTmpl = this.j.find("[data-juci=optiontemplate]")[0], inners;
			if(optTmpl){
				inners = '<div class="juci_option_label">' + optTmpl.html() + '<div>';
				optTmpl.remove();
			}else{
				inners = '<div class="juci_option_label">' + // cell
				'<label data-bind="html: '+
						(this._ds.optionsText ? this._ds.optionsText : 'function(item){return item}')+
				'"></label>' +
				'</div>';
			}
			return inners;
		},
		_onBeforeSearch: function(evt){
			this.fireEvent("beforesearch", new EventObject(evt, evt));
		},
		_onAfterSearch: function(evt){
			this.fireEvent("aftersearch", new EventObject(evt, evt));
		},
		_onSearch: function(evt){
			this.fireEvent("search", new EventObject(evt, evt));
		},
		_onClearSearch: function(evt){
			this.fireEvent("searchclear", new EventObject(evt, evt));
		},
		enable: function(){
			this._container.enable();
		},
		disable: function(){
			this._container.disable();
		},
		_onListInitialize: function(params){
			this.__listparams = params;
			var v = this._val;
			this._val = null;
			this.value(v);
		},
		_onBindingsInitialize: function(){
			var params = this.__params;
			this._valueHandler = (typeof params.optionsValue == "undefined") ? function(value){return value;} : function(value){ return params.optionsValue(ko.mapping.toJS(value));};
		},
		refresh: function(){
			var opts = this.j.findByClass("juci_option", false);
			var valArr = this._val !== null ? this._val : null;
			var selectedOptions = [];
			var iteratorFn;
			var comparatorFn = this._comparatorFn;
			var handler = this._valueHandler;
			if(valArr === null || valArr.length == 0){
				iteratorFn = function(opt,optIndex){
					opt.removeClass("selected");
				}
			}else if(valArr.length > 0){
				var numSelectionsLeft = this._val.length;
				/**@ignore*/
				iteratorFn = function(opt, optIndex){
						opt.removeClass("selected");
						var option = ko.dataFor(opt.el);
						var valueInOpt = handler(option);
						if(selectedOptions.length < numSelectionsLeft){
							valArr.forEach(function(valueInVal){
								if(comparatorFn(valueInOpt, valueInVal, optIndex)){
									opt.addClass("selected");
									selectedOptions.push(option);
									// TODO Fire on option select
								}
							});
						}
					}
			}
			opts.forEach(iteratorFn);
			this._selectedOptions = selectedOptions;
		},
		getComparator: function(){
			return this._comparatorFn;
		},
		setComparator: function(fn){
			this._comparatorFn = fn === juci.utils.defaultComparator ? fn : function(val1, val2){ return fn(val1 ? ko.mapping.toJS(val1) : val1, val2 ? ko.mapping.toJS(val2) : val2)};
		},
		value: function(valArr, dontCheck){
			if(typeof valArr == "undefined"){
				return this._returner(this._val);
			}else{
				if(this._val !== valArr){
					this._valueInList = this.getValuesFromList(valArr ? valArr : []);
					this._val = this._valueInList;
					if(this.__koValue){
						this._isSourceOfChange = true;
						this.__koValue(this._val);
					}
					this.refresh();
				}
			}
		},
		getValuesFromList: function(valArr){
			if(!this.__listparams){
				return valArr;
			}
			var v = [], ds = ko.utils.unwrapObservable(this.__listparams.optionsList), noOpts = ds ? ds.length : 0;
			for(var i = 0; i < noOpts; i++){
				var item = ds[i];
				valArr.forEach(function(val){
					if(this.getComparator()(item, val, i)){
						v.push(item);
					}
				}, this);
			}
			return v;
		}
	};
	{
		/**
			@name beforechange
			@memberOf checkboxgroup.prototype
			@event
			@hidden
		*/
		/**
			@name onBeforeChange
			@methodOf checkboxgroup.prototype
			@hidden
		*/
	}
	this.extend(checkboxgroup, juci.controls.basecontrol);
	juci.controls.checkboxgroup = checkboxgroup;

	/**
		@namespace
		@name radiogroup
		@augments basecontrol
		@description The radiogroup control allows the user to select one option from a list of alternatives.
		@remarks <i>data-juci="optiontemplate"</i> can be used to create a custom option template. The <i>value</i> of the control is the selected option
		@see switch
		@see checkbox
		@see checkboxgroup
		@dataattribute {String} data-juci A string with value <i>radiogroup</i>.
		@dataattribute {Object} data-bind A string containing comma separated key-value pairs from the list of below keys. Also augmented by other controls. #example #html data-bind="ref: someKey, optionsList: list" #example
		@dataattribute {String} data-bind.ref A string containing the reference path from a dataset defined using the {@link juci#addDataset} method. The value of the key referred by this path bounds as value of the control.
		@dataattribute {Array} data-bind.optionsList A string reference pointing to an array of numbers or strings or objects to display as options in the radiogroup control. The reference path string should be part of any dataset defined using the {@link juci#addDataset} method.
		@dataattribute {Function} data-bind.optionsText A function that is invoked for each item in the array referred by <i>optionsList</i>. This function is the perfect place to edit the text in case if the item is a string/number or choose the property which contains the text in case of the item is an object. The function must return the text that should display as an item in the radiogroup control. The function receives the following parameter as input,
		@dataattribute {Object} data-bind.optionsText.item Parameter for optionsText method. A string or number or object that displays as an item in the checkboxgroup control.
		@dataattribute {String} data-comparator Name of function defined on the window scope. Called when a value is compared with each option available in the options list. The function receives the values compared as parameters.
		@html <div data-juci="radiogroup" data-label="Check out the options" data-bind="optionsList: options"></div>
		@html <div data-juci="radiogroup" data-bind="optionsList: options"></div>
		@html <div data-juci="radiogroup" data-label="Data bound" data-bind="optionsList: options, ref: simpleValue"></div>
		@html <div data-juci="radiogroup" data-label="Data bound and disabled" data-bind="optionsList: options, ref: simpleValue" disabled></div>
		@html <div
	data-juci="radiogroup"
	data-label="Complex Data bound"
	data-bind="optionsList: complexOptions, optionsText: function(item){return item.name}, ref: complexValue"
	data-comparator="complexComparator"></div>
		@html <div
	data-juci="radiogroup"
	data-label="Complex Data bound with option templating"
	data-bind="optionsList: complexOptions, ref: complexValue"
	data-comparator="complexComparator">
		<div data-juci="optiontemplate">
			<label data-bind="display: 'Name is ' + name()"></label>
		</div>
</div>
		@example #js juci.addDataset("complexValue", {value: "1", name: "red"});
juci.addDataset("simpleValue", "red");
juci.addDataset("options", ["red", "blue", "green"]);
juci.addDataset("complexOptions", [{name:"red", value: "1"}, {name: "blue", value: "2"}, {name: "green", value: "3"}]);
		@example #js function complexComparator(i1, i2){
	return i1.value == i2.value;
}
		@css .juci_option
		@css .juci_option.touch
		@css .juci_options
		@csshtml <div data-juci="radiogroup" data-label="Check out the options" class="juci_basecontrol juci_radiogroup">
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Check out the options</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<ul class="juci_ctrl_box juci_options" data-juci="radio">
		<li class="juci_check juci_option">
			<div class="juci_option_label">
				<label>red</label>
			</div>
		</li>
	</ul>
	<div class="juci_options_placeholder" style="display: none;">No options</div>
</div>
	*/
	var radiogroup = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	radiogroup.prototype = {
		type: "radiogroup",
		DefaultValue: null,
		getDefaultValue: function(){
			return new Function("return " + this.j.getAttr("data-value", this.DefaultValue))();
		},
		_onOptionClick: function(e){
			var delegatee = e.delegatee;
			if(delegatee != null){
				this._onOptionSelected(delegatee);
			}
		},
		_onOptionSelected: function(elem){
			var oldSelected = this.j.findByClass("selected")[0];
			if(oldSelected && elem != oldSelected){
				oldSelected.removeClass("selected");
			}
			elem.addClass("selected");
			var oldVal = this._val;
			this._val = this._valueHandler(ko.dataFor(elem.el));
			this.__fireBeforeChange(oldVal, this._val);
		},
		getInnerOptionTemplate: function(){
			var optTmpl = this.j.find("[data-juci=optiontemplate]")[0], inners;
			if(optTmpl){
				inners = '<div class="juci_option_label">' + optTmpl.html() + '<div>';
				optTmpl.remove();
			}else{
				inners = '<div class="juci_option_label">' + // cell
				'<label data-bind="html: '+
						(this._ds.optionsText ? this._ds.optionsText : 'function(item){return item}')+
				'"></label>' +
				'</div>';
			}
			return inners;
		},
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol"]);
			juci.utils.arrayPushAll(r.map, ["ref"]);
			juci.utils.arrayPushAll(r.defaults, ['""']);
			juci.utils.arrayPushAll(r.ignore, ["optionsList", "optionsText", "optionsValue"]);
			return r;
		},
		init: function(){
			if(this._ds){
				this.j.attr("data-bind", this.getDatabindString());
			}
			if(this.j.attr("data-label")){
				this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			}
			//var dataBindString = 'ref: ' + (this._ds.ref ? this._ds.ref : '""')  + ',optionsList: $root.' +
			var dataBindString = 'ref: ' + (this._ds.ref ? this._ds.ref : this._ds.optionsList)  + ',optionsList: ' +
						this._ds.optionsList + (this._ds.optionsText ? ', optionsText: ' + this._ds.optionsText : '') +
						(this._ds.optionsValue ? ", optionsValue: " + this._ds.optionsValue : "");
			/*
				<div class="juci_radiogroup">
					<div class="juci_control_label>
						<label></label>
					</div>
					<ul class="juci_ctrl_box juci_options"> table
						<li class="juci_check juci_option"> table row repeat
							<div class="juci_option_label"> cell
								<label>Red</label>
							</div>
						</li>
					</ul>
				</div>
			*/
			this._container = new juci.elem("<ul class='juci_ctrl_box juci_options' data-juci='radio' data-bind='"+dataBindString+"'></ul>").appendTo(this.j);
			if(!juci.hasTouch){
				this._focusser = new juci.elem('<a class="juci_ctrl_focusser" href="#"></a>');
				this.j.prepend(this._focusser);
				this._focusser.onFocus(this._onFocus, this);
				this._focusser.onBlur(this._onBlur, this);
				this._focusser.onKeyDown(function(e){
					this._onKeyPress(e);
				}, this);
				this._focusser.onKeyPress(this._onKeyPress, this);
			}
			this.optionTemplate = new juci.elem('<li class="juci_check juci_option">' + //table row repeat
							this.getInnerOptionTemplate() +
							'</li>', false).appendTo(this._container);
			this._container.onClick(this._onOptionClick, this, ".juci_option");
			// TODO Add options placeholder data-options-placeholder
			var optsPlaceholder = "No options";
			//this.j.append("<div class='juci_options_placeholder' data-bind='show: $root."+this._ds.optionsList+"().length == 0'>"+optsPlaceholder+"</div>");
			this.j.append("<div class='juci_options_placeholder' data-bind='ref: "+this._ds.optionsList+", show: juci.utils.isEmpty'>"+optsPlaceholder+"</div>");
			this._valueHandler = null;
			//this._val = null;
			this._selectedOption = null;
			var comparator = this.j.attr("data-comparator");
			this._comparatorFn = window[comparator] ? function(val1, val2){ return window[comparator](val1 ? ko.mapping.toJS(val1) : val1, val2 ? ko.mapping.toJS(val2) : val2)} : juci.utils.defaultComparator;
			var that = this;
			this.searchHandler = this._ds.optionsValue ? function(item, searchValue){
				return that.__listparams.optionsValue(item).toLowerCase().search(searchValue.toLowerCase()) > -1;
			}: this._ds.optionsText ? function(item, searchValue){
				return that.__listparams.optionsText(item).toLowerCase().search(searchValue.toLowerCase()) > -1;
			} : function(item, searchValue){
				return (""+item).toLowerCase().search(searchValue.toLowerCase()) > -1;
			};
		},
		_onFocus: function(){
			this._options = this._container.find(".juci_check.juci_option");
			if(this._options.length == 0){
				this._currIndex = -1;
				return;
			}
			this._currIndex = 0;
			this._options[this._currIndex].addClass("touch");
			this._options[this._currIndex].scrollIntoViewIfNeeded();
		},
		_onBlur: function(){
			if(this._currIndex != -1){
				this._options[this._currIndex].removeClass("touch");
				this._currIndex = -1;
			}
		},
		_onKeyPress: function(e){
			var kC = e.srcEvent.keyCode;
			if(kC == 13 || kC == 32){
				// Select
				this._onOptionSelected(this._options[this._currIndex]);
				e.preventDefault();
			}else if(kC == 38 && this._currIndex > 0){
				// Up
				this._options[this._currIndex--].removeClass("touch");
				this._options[this._currIndex].addClass("touch");
				this._options[this._currIndex].scrollIntoViewIfNeeded();
				e.preventDefault();
			}else if(kC == 40 && this._currIndex+1 < this._options.length){
				// Down
				this._options[this._currIndex++].removeClass("touch");
				this._options[this._currIndex].addClass("touch");
				this._options[this._currIndex].scrollIntoViewIfNeeded();
				e.preventDefault();
			}
		},
		_onAfterSearch: function(evt){
			this.fireEvent("aftersearch", new EventObject(evt, evt));
		},
		_onBeforeSearch: function(evt){
			this.fireEvent("beforesearch", new EventObject(evt, evt));
		},
		_onSearch: function(evt){
			this.fireEvent("search", new EventObject(evt, evt));
		},
		_onClearSearch: function(evt){
			this.fireEvent("searchclear", new EventObject(evt, evt));
		},
		enable: function(){
			this._container.enable();
		},
		disable: function(){
			this._container.disable();
		},
		_onListInitialize: function(params){
			this.__listparams = params;
			var v = this._val;
			this._val = null;
			this.value(v);
		},
		_onBindingsInitialize: function(){
			var params = this.__params;
			this._valueHandler = (typeof params.optionsValue == "undefined") ? function(value){return value;} : function(value){ return params.optionsValue(ko.mapping.toJS(value));};
		},
		refresh: function(){
			var handler = this._valueHandler;
			var opts = this.j.findByClass("juci_option", false);
			var optionSelected = false;
			var comparatorFn = this._comparatorFn;
			var valueInVal = this._val;
			this._selectedOption = null;
			var iteratorFn = valueInVal ?(
				function(opt, optIndex){
					opt.removeClass("selected");
					if(!optionSelected){
						var valueInOpt = handler(ko.dataFor(opt.el));
						if(comparatorFn(valueInOpt, valueInVal, optIndex)){
							opt.addClass("selected");
							optionSelected = true;
							this._selectedOption = opt;
							// TODO Fire on option select
						}
					}
				}
			) : (
				function(opt){
					opt.removeClass("selected");
				}
			);
			opts.forEach(iteratorFn, this);
		},
		getComparator: function(){
			return this._comparatorFn;
		},
		setComparator: function(fn){
			this._comparatorFn = fn === juci.utils.defaultComparator ? fn : function(val1, val2){ return fn(val1 ? ko.mapping.toJS(val1) : val1, val2 ? ko.mapping.toJS(val2) : val2)};
		},
		value: function(val, dontCheck){
			if(typeof val == "undefined"){
				return this._returner(this._val);
			}else{
				if(this._val !== val){
					this._valueInList = this.getValueFromList(val);
					this._val = this._valueInList;
					this.refresh();
				}
			}
		},
		getValueFromList: function(val){
			if(!this.__listparams){
				return val;
			}
			var v = null, ds = ko.utils.unwrapObservable(this.__listparams.optionsList), noOpts = ds ? ds.length : 0;
			for(var i = 0; i < noOpts; i++){
				var item = ds[i];
				if(this.getComparator()(item, val, i)){
					v = item;
					break;
				}
			}
			return v;
		}
	};
	this.extend(radiogroup, juci.controls.basecontrol);
	juci.controls.radiogroup = radiogroup;

	/**#nocode+*/
	// TODO Make selected options shown in the main panel like in attachments widget. or like tags
	var pickerCtrl = function(elem){
		this._val = null;
		this.i = null;
		this._super = juci.controls.basecontrol;
		this._super(elem);
	};
	var probableEntries = [32, 13];
	// 37,38,39,40
	pickerCtrl.prototype = {
		DefaultPlaceholder: "Pick",
		getDefaultValue: function(){
			return new Function("return " + this.j.getAttr("data-value", this.DefaultValue))();
		},
		init: function(){
			this.j.attr("data-bind", this._ds ? this.getDatabindString() : this.getDefaultDatabindString());
			this.addLinker();
			this.j.addClass("juci_parent");
			this.placeholder = this.j.getAttr("placeholder", this.DefaultPlaceholder);
			this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			this.createText();
			this.j.onClick(this.openPicker, this, ".juci_"+this.type);
			this.setText();
			if(!juci.hasTouch){
				this._focusser = new juci.elem("<a class='juci_ctrl_focusser' href='#'></a>");
				this._focusser.prependTo(this.j);
				this._focusser.onFocus(this._onFocus, this);
				this._focusser.onBlur(this._onBlur, this);
				this._focusser.onKeyDown(function(e){
					if(e.srcEvent.keyCode === 13){
						e.preventDefault();
						this._onKeyPress(e);
					}
				}, this);
				this._focusser.onKeyPress(this._onKeyPress, this);
			}
			this._pickerOpened = false;
		},
		_onFocus: function(e){
			this.j.scrollIntoViewIfNeeded();
			this.j.addClass("touch");
		},
		_onBlur: function(e){
			this.j.removeClass("touch");
		},
		_onKeyPress: function(e){
			if(probableEntries.indexOf(e.srcEvent.keyCode) > -1){
				this.openPicker();
			}
		},
		createText: function(){
			this.i = new juci.elem('<div class="juci_ctrl_box juci_'+this.type+'_box"></div>').appendTo(this.j);
		},
		Events: ["openpicker", "closepicker"],
		openPicker: function(evt){
			if(!this._pickerOpened){
				var e = new EventObject(evt);
				this.fireEvent("openpicker", e);
				if(!e.isCancelled()){
					this._pickerOpened = true;
					this.doOpenPicker();
				}
			}
		},
		doOpenPicker: juci.utils.EmptyMethod,
		setText: function(val){
			this.i.html(this._formatter(val));
		},
		onClosePicker: function(){
			var e = new EventObject();
			this.fireEvent("closepicker", e);
			this._pickerOpened = false;
			if(!juci.hasTouch){
				juci.utils.setTimeout(function(){
					this._focusser.el.focus();
				}, this, 200);
			}
		},
		focus: function(){
			this._super();
			if(!juci.hasTouch){
				this._focusser.focus();
			}
		}
	};
	this.extend(pickerCtrl, juci.controls.basecontrol);
	juci.controls.basepicker = pickerCtrl;
	/**#nocode-*/

	/**
		@namespace
		@name selectbox
		@augments basecontrol
		@description The selectbox control allows the user to select one option from a list of alternatives. Only the selected value is displayed, tapping on the selectbox displays the list of options.
		@remarks <i>data-juci="optiontemplate"</i> can be used to create a custom option template. The <i>value</i> of the control is the selected option
		@see multiselectbox
		@dataattribute {String} data-juci A string with value <i>selectbox</i>.
		@dataattribute {Object} data-bind A string containing comma separated key-value pairs from the list of below keys. Also augmented by other controls. #example #html data-bind="ref: someKey, optionsList: list" #example
		@dataattribute {String} data-bind.ref A string containing the reference path from a dataset defined using the {@link juci#addDataset} method. The value of the key referred by this path bounds as value of the control.
		@dataattribute {Array} data-bind.optionsList A string reference pointing to an array of numbers or strings or objects to display as options in the selectbox control. The reference path string should be part of any dataset defined using the {@link juci#addDataset} method.
		@dataattribute {Function} data-bind.optionsText A function that is invoked for each item in the array referred by <i>optionsList</i>. This function is the perfect place to edit the text in case if the item is a string/number or choose the property which contains the text in case of the item is an object. The function must return the text that should display as an item in the selectbox control. The function receives the following parameter as input,
		@dataattribute {Object} data-bind.optionsText.item Parameter for optionsText method. A string or number or object that displays as an item in the selectbox control.
		@dataattribute {String} data-comparator Name of function defined on the window scope. Called when a value is compared with each option available in the options list. The function receives the values compared as parameters.
		@dataattribute {String} data-searcher Name of function defined on the window scope. Called when a search string is entered in the options list. The function receives the following params,
		@dataattribute {Object} data-searcher.item An item in the options list.
		@dataattribute {String} data-searcher.searchString The searched string.
		@dataattribute {Number} data-search-delay Number of milliseconds after which search can start processing.
		@dataattribute {String} data-search-placeholder Placeholder text for the searchbox.
		@html <div data-juci="selectbox" data-label="Check out the options" data-bind="optionsList: options"></div>
		@html <div data-juci="selectbox" data-bind="optionsList: options"></div>
		@html <div data-juci="selectbox" data-label="Data bound" data-bind="optionsList: options, ref: simpleValue"></div>
		@html <div data-juci="selectbox" data-label="Data bound and disabled" data-bind="optionsList: options, ref: simpleValue" disabled></div>
		@html <div
	data-juci="selectbox"
	data-label="Complex Data bound"
	data-bind="optionsList: complexOptions, optionsText: function(item){return item.name}, ref: complexValue"
	data-comparator="complexComparator"></div>
		@html <div
	data-juci="selectbox"
	data-label="Complex Data bound with option templating"
	data-bind="optionsList: complexOptions, ref: complexValue"
	data-comparator="complexComparator">
		<div data-juci="optiontemplate">
			<label data-bind="display: 'Name is ' + name()"></label>
		</div>
</div>
		@example #js juci.addDataset("complexValue", {value: "1", name: "red"});
juci.addDataset("simpleValue", "red");
juci.addDataset("options", ["red", "blue", "green"]);
juci.addDataset("complexOptions", [{name:"red", value: "1"}, {name: "blue", value: "2"}, {name: "green", value: "3"}]);
		@example #js function complexComparator(i1, i2){
	return i1.value == i2.value;
}
		@css .juci_option
		@css .juci_option.touch
		@css .juci_options
		@css .juci_selectbox_box
		@css .juci_selectbox_box.touch
		@csshtml <div data-juci="selectbox" data-label="Check out the options" class="juci_basecontrol juci_selectbox juci_parent">
	<div class="juci_flag_drawer">
		<div class="juci_linker"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Check out the options</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_ctrl_box juci_selectbox_box">Choose...</div>
</div>
	*/
	var selectbox = function(elem){
		this._super = pickerCtrl;
		this._super(elem);
	}
	selectbox.prototype = {
		type: "selectbox",
		DefaultValue: null,
		DefaultOptionsTitle: '"Options"',
		DefaultPlaceholder: "Choose...",
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol", "optionsTitle", "list"]);
			juci.utils.arrayPushAll(r.map, ["ref", "optionsTitle", "optionsList"]);
			juci.utils.arrayPushAll(r.defaults, ['""', this.DefaultOptionsTitle]);
			r.ignore.push("optionsList");
			return r;
		},
		_onBindingsInitialize: function(params){
			this._super(params);
			if(this._val !== null){
				this.value(this._val);
			}
		},
		init: function(){
			if(typeof this._isMultiple == "undefined"){
				 this._isMultiple = (this._ds.multiple == "true");
			}
			this._mode = this.j.getAttr("data-mode", "select"); //default mobile select, set to popup for dropdown select
			if(!this._mode)
				this._mode = "select"; //default to normable mobile select behaviour
			this.showClear = this.j.getAttr("data-clear", false);
			this.opened = 0;
			this._super();
			this._tempVal = null;
			var comparator = this.j.attr("data-comparator");
			this._comparatorFn = window[comparator] ? function(val1, val2){ return window[comparator](val1 ? ko.mapping.toJS(val1) : val1, val2 ? ko.mapping.toJS(val2) : val2)} : juci.utils.defaultComparator;
			var optionValue = this.j.attr("data-option-value");
			this._optionValueFn = window[optionValue] ? function(val1, val2){ return window[optionValue](val1 ? ko.mapping.toJS(val1) : val1, val2 ? ko.mapping.toJS(val2) : val2)} : function(item){return item};
			if(this._isMultiple){
				this.j.addClass("multiple");
			}
			var optTmpl = this.j.find("[data-juci=optiontemplate]")[0];
			if(optTmpl){
				this.optionTemplate = "<div data-juci='optiontemplate'>"+optTmpl.html()+'</div>';
				optTmpl.remove();
			}else{
				this.optionTemplate = "";
			}
			this.selectPop = new juci.elem('<div tabindex=0 class="juci_selectbox_popup"></div>');
			this.selectPop.onBlur(function(){
			this._onCloseOptions(); //not stable in mobile
			},this);
			this.selectPop.insertAfter(this.j);
			this.selectPop.hide();
		},
		
		openPicker: function(evt){
			
			if (this.opened == 0){
		
				var e = new EventObject(evt);
				this.fireEvent("openpicker", e);
				if(!e.isCancelled()){
					this._pickerOpened = true;
					this.doOpenPicker();
				}
		
			
			}else{
				
				this.selectPop.hide();
				this.opened = 0;
			}
			
			
		},
		doOpenPicker: function(){
			if(!this.optionsPanel){
				this.initOptions();
				this.initPOptions();
			}
			var evt = new EventObject();
			this.fireEvent("beforeoptionsopen", evt);
			if(!evt.isCancelled()){
				if(this._mode == "select")
					this.optionsPanel.open(this.__params.optionsTitle);
				else{
					this._pcontrol.value(this._val);
					this.opened = 1;
					this.selectPop.show();
					//this.selectPop.el.focus(); //not stable in mobile
				}
			}
		},
		getComparator: function(){
			return this._comparatorFn;
		},
		setComparator: function(fn){
			this._comparatorFn = fn === juci.utils.defaultComparator ? fn : function(val1, val2){ return fn(val1 ? ko.mapping.toJS(val1) : val1, val2 ? ko.mapping.toJS(val2) : val2)};
		},
		setText: function(val){
			var inners = (val) ? this._formatter(val) : this.placeholder;
			//if(!inners){
			if(inners == this.placeholder){
				//To apply css for placeholder in selectbox
				inners = this.placeholder;
				this.j.addClass("juci_placeholder");
			}else{
				this.j.removeClass("juci_placeholder");
			}
			this.i.html(inners);
		},
		_onCloseOptions: function(evt){
			this.onClosePicker();
			this.selectPop.hide();
			this.opened = 0;
			if(this._search)
				this._search.clearSearch(true);
			if(!this._isMultiple){
				this._control.removeListener("beforechange", this._closeOptions, this); //Removed - since panel is closed without choosing an option
			}
			var oldVal = this._val;
			this._valueInList = this._control.value();
			var newVal = this._getNewValueFromControl(this._valueInList);
			if(oldVal !== newVal){
				this.__fireBeforeChange(oldVal, newVal);
			}
		},
		_getNewValueFromControl: function(){
			return this._optionValueFn(this._control.value());
		},
		_onOpenOptions: function(evt){
			if(typeof this._valueInList === "undefined"){
				this._valueInList = this.getValueFromList(this._val);
			}
			this._control.value(this._valueInList, true);
			this._control.refresh();
			if(!this._isMultiple){
				this._control.listenOnce("beforechange", this._closeOptions, this); // Pass true with the closePanel, this data can be read in onClose
			}
		},
		_closeOptions: function(){
			juci.closePanel(true);
		},
		// IMPORTANT options can be at any reference level - data, parent, root. By default select, options start from root always and ref starts from data
		// Document how to set data for options
		initOptions: function(){
			var optionsBg = new juci.elem("<div class='juci_selectbox_options_panel' data-panel-id='"+this._id+"_options'></div>");
			var optionsContainer = new juci.elem("<div></div>");
			var dataBindString = 'optionsList: $data' +
				(this._ds.optionsText ? ',optionsText: ' + this._ds.optionsText : '') +
				(this._ds.optionsValue ? ',optionsValue :' + this._ds.optionsValue : '');
			var controlElem = new juci.elem("<div data-juci='"+
					(this._isMultiple ? 'checkboxgroup' : 'radiogroup' )+
					"' data-bind='"+ dataBindString +"'>"+this.optionTemplate+"</div>"
				).appendTo(optionsContainer);
			// Adding search by default
			var searchString = this.j.attr("data-searcher");
			var searchDelayString = this.j.attr("data-search-delay");
			var searchBoxString = "";
			var placeholder = this.j.attr("data-search-placeholder");
			searchBoxString = "<div data-juci='searchbox' data-bind='ref: $data" +
				(searchDelayString ? (",delay:" + searchDelayString + "") : "") + "'" +
				" placeholder='"+ (placeholder ?  placeholder : "Search") +"'" +
				" " + (searchString ? ("data-searcher='" + searchString + "'") : ("data-aui='" + controlElem.getId() + "'")) +
			"></div>";
			var searchBoxElem = new juci.elem(searchBoxString).appendTo(optionsContainer);
			this.optionsPanel = new juci.panel(optionsBg);
			optionsBg.attr("data-bind","juciwith: $data");
			if(this.showClear){
				var bbar = new juci.elem("<div class='juci_vertical_bbar juci_selectbox_clearbbar'>"+
				"<button data-juci='button'>Clear</button>"+
			"</div>").appendTo(optionsBg);
				var bbar2 = bbar.clone();
				bbar.addClass("juci_selectbox_top");
				bbar2.addClass("juci_selectbox_bottom");
				bbar2.prependTo(optionsBg);
				bbar2.attr("data-bind", "ref: " + this._ds.optionsList + ", show: function(i){return i.length > 6}");
			}
			this.fireEvent("beforeinitoptions", {optionsPanel: this.optionsPanel});
			this.optionsPanel.listenOnce("init", function(){
				optionsContainer.appendTo(optionsBg);
				juci.controls.init(optionsContainer.el);
				juci.viewModel.applyBinding(optionsContainer.el, this.__params.list);
				this._search = juci.getControl(searchBoxElem);
				this._control = juci.getControl(controlElem);
				searchBoxElem.prependTo(optionsBg);
				this._search.setValueAccessor(this.__params.list);
				this._search.addListener("beforesearch", this._control._onBeforeSearch, this._control);
				this._search.addListener("beforesearch", this._onBeforeSearch, this);
				this._search.addListener("search", this._control._onSearch, this._control);
				this._search.addListener("search", this._onSearch, this);
				this._search.addListener("clear", this._control._onClearSearch, this._control);
				this._search.addListener("clear", this._onClearSearch, this);
				this._search.addListener("aftersearch", this._control._onAfterSearch, this._control);
				this._search.addListener("aftersearch", this._onAfterSearch, this);
				this._control.onBeforeChange(this._fireValidation, this);
				this.fireEvent("initoptions");
			}, this);
			if(this.showClear){
				this.optionsPanel.listenOnce("init", function(){
					var bs1 = bbar.children();
					var bs2 = bbar2.children();
					bbar2.appendTo(optionsBg);
					juci.getControl(bs1[0]).onClick(this._control.clear, this._control);
					juci.getControl(bs2[0]).onClick(this._control.clear, this._control);
				}, this);
			}
			this.postInitOptions(optionsBg);
		},

		initPOptions: function(){
			var poptionsBg = new juci.elem("<div class='juci_selectbox_popup_panel' data-panel-id='"+this._id+"_poptions'></div>");
			var poptionsContainer = new juci.elem("<div></div>");
			var dataBindString = 'optionsList: $data' +
				(this._ds.optionsText ? ',optionsText: ' + this._ds.optionsText : '') +
				(this._ds.optionsValue ? ',optionsValue :' + this._ds.optionsValue : '');
			var controlElem = new juci.elem("<div data-juci='"+
					(this._isMultiple ? 'checkboxgroup' : 'radiogroup' )+
					"' data-bind='"+ dataBindString +"'>"+this.optionTemplate+"</div>"
				).appendTo(poptionsContainer);
			this.selectPop.append(poptionsBg);
			poptionsBg.attr("data-bind","juciwith: $data");

			poptionsContainer.appendTo(poptionsBg);
			juci.controls.init(poptionsContainer.el);
			juci.viewModel.applyBinding(poptionsContainer.el, this.__params.list);
			this._control = juci.getControl(controlElem);
			this._pcontrol = juci.getControl(controlElem);
			this._pcontrol.onBeforeChange(this._fireValidation, this);
			this._pcontrol.onAfterChange(this._onCloseOptions, this);
		},

		hideClearBar: function(){
			if(this.optionsPanel){
				var clearBars = this.optionsPanel.j.findByClass(".juci_selectbox_clearbbar");
				for(var i = 0; i < clearBars.length; i++){
					clearBars[i].hide();
				}
			}else{
				this.showClear = false;
			}
		},
		showClearBar: function(){
			if(this.optionsPanel){
				var clearBars = this.optionsPanel.j.findByClass(".juci_selectbox_clearbbar");
				for(var i = 0; i < clearBars.length; i++){
					clearBars[i].show();
				}
			}else{
				this.showClear = true;
			}
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(pickerCtrl.prototype.Events.concat(["beforeinitoptions", "initoptions", "afterinitoptions","beforesearch", "search", "searchclear", "aftersearch", "beforeoptionsopen"])),
		postInitOptions: function(optionsBg){
			this.optionsPanel.addListener("open", this._onOpenOptions, this);
			this.optionsPanel.addListener("close", this._onCloseOptions, this);
			this.fireEvent("afterinitoptions", {optionsPanel: this.optionsPanel});
		},
		_onBeforeSearch: function(evt){
			this.fireEvent("beforesearch", new EventObject(evt, evt));
		},
		_onAfterSearch: function(evt){
			this.fireEvent("aftersearch", new EventObject(evt, evt));
		},
		_onSearch: function(evt){
			this.fireEvent("search", new EventObject(evt, evt));
		},
		_onClearSearch: function(evt){
			this.fireEvent("searchclear", new EventObject(evt, evt));
		},
		_fireValidation: function(evt){
			this.fireEvent("checkconstraints", new EventObject(evt, evt));
			if(!evt.isCancelled()){
				this._control.value(evt.newValue, true);
			}
		},
		value: function(val, dontCheck){
			if(typeof val == "undefined"){
				return this._returner(this._val);
			}else{
				// Check from list of values with comparator and then set the value
				if(this._val !== val){
					this._valueInList = this.getValueFromList(val);
					this._val = this._valueInList;
				}

				this.setText(this._val);
			}
		},
		getValueFromList: function(val){
			var v = null, ds = ko.utils.unwrapObservable(this.__params.list), noOpts = ds ? ds.length : 0;
			for(var i = 0; i < noOpts; i++){
				var item = ds[i];
				if(this.getComparator()(item, val, i)){
					v = item;
					break;
				}
			}
			return v;
		}
	};
	// Events
	{
	}
	this.extend(selectbox, pickerCtrl);
	juci.controls.selectbox = selectbox;

	/**
		@namespace
		@name multiselectbox
		@augments selectbox
		@description The multiselectbox control allows the user to select one or more options from a list of alternatives. Only the selected value is displayed, tapping on the multiselectbox displays the list of options.
		@remarks <i>data-juci="optiontemplate"</i> can be used to create a custom option template.
		@see selectbox
		@dataattribute {String} data-juci {String} A string with value <i>multiselectbox</i>.
		@html <div data-juci="multiselectbox" data-label="Check out the options" data-bind="optionsList: options"></div>
		@html <div data-juci="multiselectbox" data-bind="optionsList: options"></div>
		@html <div data-juci="multiselectbox" data-label="Data bound" data-bind="optionsList: options, ref: simpleValue"></div>
		@html <div data-juci="multiselectbox" data-label="Data bound and disabled" data-bind="optionsList: options, ref: simpleValue" disabled></div>
		@html <div
	data-juci="multiselectbox"
	data-label="Complex Data bound"
	data-bind="optionsList: complexOptions, optionsText: function(item){return item.name}, ref: complexValue"
	data-comparator="complexComparator"></div>
		@html <div
	data-juci="multiselectbox"
	data-label="Complex Data bound with option templating"
	data-bind="optionsList: complexOptions, ref: complexValue"
	data-comparator="complexComparator">
		<div data-juci="optiontemplate">
			<label data-bind="display: 'Name is ' + name()"></label>
		</div>
</div>
		@example #js juci.addDataset("complexValue", {value: "1", name: "red"});
juci.addDataset("simpleValue", "red");
juci.addDataset("options", ["red", "blue", "green"]);
juci.addDataset("complexOptions", [{name:"red", value: "1"}, {name: "blue", value: "2"}, {name: "green", value: "3"}]);
		@example #js function complexComparator(i1, i2){
	return i1.value == i2.value;
}
		@css .juci_option
		@css .juci_option.touch
		@css .juci_options
		@css .juci_selectbox_box
		@css .juci_selectbox_box.touch
		@csshtml <div data-juci="multiselectbox" data-label="Check out the options" class="juci_basecontrol juci_selectbox juci_parent multiple">
	<div class="juci_flag_drawer">
		<div class="juci_linker"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Check out the options</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_ctrl_box juci_selectbox_box">Choose...</div>
</div>
	*/
	var multiselectbox = function(elem){
		this._isMultiple = true;
		this._super = juci.controls.selectbox;
		this._super(elem);
		this._valueInList = [];
	}
	multiselectbox.prototype = {
		DefaultValue: null,
		getValueFromList: function(valArr){
			var v = [], ds = ko.utils.unwrapObservable(this.__params.list), noOpts = ds ? ds.length : 0;
			for(var i = 0; i < noOpts; i++){
				var item = ds[i];
				valArr.forEach(function(val){
					if(this.getComparator()(item, val, i)){
						v.push(item);
					}
				}, this);
			}
			return v;
		},
		value: function(valArr, dontCheck){
			if(typeof valArr == "undefined"){
				return this._returner(this._val);
			}else{
				if(this._val !== valArr){
					this._valueInList = this.getValueFromList(valArr ? valArr : []);
					this._val = this._valueInList;
					if(this.__koValue){
						this._isSourceOfChange = true;
						this.__koValue(this._val);
					}
				}
			}
			this.setText(this._val.length == 0 ? null : this._val);
		},
		postInitOptions: function(optionsBg){
			var bbar = new juci.elem("<div class='juci_horizontal_bbar juci_multiselectbox_bbar'>"+
				"<button data-juci='button'>Done</button>"+
				"<button data-juci='button'>Cancel</button>"+
			"</div>").appendTo(optionsBg);
			var bbar2 = bbar.clone();
			bbar2.prependTo(optionsBg);
			bbar2.attr("data-bind", "ref: " + this._ds.optionsList + ", show: function(i){return i.length > 6}");
			this.optionsPanel.listenOnce("init", function(){
				var bs1 = bbar.children();
				var bs2 = bbar2.children();
				bbar2.appendTo(optionsBg);
				juci.getControl(bs1[0]).onClick(juci.closePanel, juci);
				juci.getControl(bs2[0]).onClick(juci.closePanel, juci);
				juci.getControl(bs1[0]).onClick(this.onCloseOptions, this);
				juci.getControl(bs2[0]).onClick(this.onCloseOptions, this);
				juci.getControl(bs1[1]).onClick(juci.closePanel, juci);
				juci.getControl(bs2[1]).onClick(juci.closePanel, juci);
			}, this);
			this._super(optionsBg);
		},
		postInitPOptions : function(poptionsBg){
			var bbar = new juci.elem("<div class='juci_horizontal_bbar juci_multiselectbox_bbar'>"+
				"<button data-juci='button'>Done</button>"+
				"<button data-juci='button'>Cancel</button>"+
			"</div>").prependTo(poptionsBg);
			var bbar2 = bbar.clone();
			bbar2.appendTo(poptionsBg);
			bbar2.attr("data-bind", "ref: " + this._ds.optionsList + ", show: function(i){return i.length > 6}");
			juci.controls.init(poptionsBg.el.children[0]);
			juci.viewModel.applyBinding(poptionsBg.el.children[2]);	
			juci.controls.init(poptionsBg.el.children[2]);	
		},
		_getNewValueFromControl: function(){
			var retArr = [];
			this._control.value().forEach(function(item){
				retArr.push(this._optionValueFn(item));
			}, this);
			return retArr;
		}
	};
	{
		/**
			@name beforechange
			@memberOf multiselectbox.prototype
			@event
			@hidden
		*/
		/**
			@name onBeforeChange
			@methodOf multiselectbox.prototype
			@hidden
		*/
	}
	this.extend(multiselectbox, juci.controls.selectbox);
	juci.controls.multiselectbox = multiselectbox;

	/**
		@namespace
		@name xlist
		@augments basecontrol
		@description The xlist control creates a list of items based on the dataset supplied. Each item in the list can be further expanded to a child view using <i>data-juci="listcontent"</i>. The default behavior on clicking a list item is opening it in the content view, if defined.
		@remarks <i>data-juci="listitem"</i> can be used to create a custom list item template in addition to the data attributes. <i>data-juci="listcontent"</i> can be used to create a custom list content. Further reading link about generic data binding attributes, CSS classes and layouts.
		@note xlist content is treated as a {@link form}, hence <i>submit</i> and <i>cancel</i> button actions close the content page with or without saving.
		@dataattribute {String} data-juci A string with value <i>xlist</i>.
		@dataattribute {String} data-title Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Appears as a title in each list item.
		#example #js data-title="someKey" // Name of reference #example
		#example #js data-title="'Mr.' + firstName() + ' ' + lastName() " // Expression #example
		@dataattribute {String} data-titles Comma separated values described in <i>data-title</i>. To add multiple subheaders to the list.
		@dataattribute {String} data-subtitle Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Appears as a subtitle in each list item.
		@dataattribute {String} data-subtitles Comma separated values described in <i>data-subtitle</i>. To add multiple subheaders to the list.
		@dataattribute {String} data-flag Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Creates a flag for each item based on with the return value of the expression as the content, if empty hides the flag.
		@dataattribute {String} data-flag-css CSS class for the flag. See <a href="http://knockoutjs.com/documentation/css-binding.html" target="_blank">css expression binding</a>
		@dataattribute {String} data-delete Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Shows the delete icon for each item if the return value of the expression is true, else hides.
		@dataattribute {String} data-searcher Name of function defined on the window scope. Called when a search string is entered in the options list. The function receives the following params,
		@dataattribute {Object} data-searcher.item An item in the options list.
		@dataattribute {String} data-searcher.searchString The searched string.
		@dataattribute {String} data-search-delay Number of milliseconds after which search can start processing.
		@dataattribute {String} data-new-item Name of function defined on the window scope. Called when {@link xlist#createItem} is invoked. Should return a new item with default values filled for the content.
		@dataattribute {String} data-empty-item Name of function defined on the window scope. Called when {@link xlist#openItem} is invoked for the first time. Should return an object with empty values for mapping optional fields in each item.
		@css .juci_title
		@css .juci_subtitle
		@example #html <div data-juci="xlist" id="shippings" data-bind="ref: deliveries"data-flag="'Due'" data-flag-css="'juci_red'">
	<div data-juci="listitem">
		<div class="juci_title" data-bind="display: shipmentName"></div>
		<div class="juci_subtitle" data-bind="display: 'Shipment Number ' + shipmentNumber()"></div>
	</div>
	<div data-juci="listcontent">
		<div data-juci="display" data-bind="ref:$data.shipmentName" data-label="Shipment Name"></div>
		<div data-juci="text" data-bind="ref:$data.shipmentNumber" data-label="Shipment Number"></div>
		<div class="juci_vertical_bbar">
			<button data-juci="button" type="submit">Save</button>
			<button data-juci="button" type="reset">Cancel</button>
		</div>
	</div>
</div>
#js juci.addDataset("deliveries", [
	{
		"shipmentName": "Future Logistics",
		"shipmentNumber": "533726",
	},
	{
		"shipmentName": "MKM Transports",
		"shipmentNumber": "498723"
	}]
);
	*/
	var xlist = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	// TODO List content needs more context such as isNew, index, and information regarding what panel is opening and when closing.
 	// TODO On form expose the necessary things such as parent control, if opened item. But always tell user that he is working on a copy not the item itself.
	xlist.prototype = {
		type: "xlist",
		ListItemTemplate: "<li data-juci='listitem'></li>",
		getListItemTemplate: function(){
			var itemTmpl = this.j.children("[data-juci=listitem]")[0];
			if(!itemTmpl){
				itemTmpl = new juci.elem(this.ListItemTemplate).appendTo(this.j);
			}
			this.addTitlesToListItemTemplate(itemTmpl);
			return itemTmpl;
		},
		addTitlesToListItemTemplate: function(itemTmpl){
			var hs = this.j.getAttr("data-titles");
			if(hs){
				hs = hs.split(",");
				hs.forEach(function(hr){
					this.addItemTitle(itemTmpl, hr);
				}, this);
			}
			hs = this.j.attr("data-title");
			if(hs){
				this.addItemTitle(itemTmpl, hs);
			}
			var shs = this.j.getAttr("data-subtitles");
			if(shs){
				shs = shs.split(",");
				shs.forEach(function(shr){
					this.addItemSubTitle(itemTmpl, shr);
				}, this);
			}
			shs = this.j.attr("data-subtitle");
			if(shs){
				this.addItemSubTitle(itemTmpl, shs);
			}
		},
		addItemTitle: function(itemTmpl, ref){
			this._addItemTitle(itemTmpl, ref, "juci_title");
		},
		addItemSubTitle: function(itemTmpl, ref){
			this._addItemTitle(itemTmpl, ref, "juci_subtitle");
		},
		_addItemTitle: function(itemTmpl, ref, clazz){
			var it = new juci.elem("<div class='"+clazz+"'></div>").appendTo(itemTmpl);
			it.attr("data-bind", "display: "+ ref);
		},
		getListContentTemplate: function(){
			var ctmpl = this.j.children("[data-juci=listcontent]" + ",[data-juci="+this.type+"content]")[0];
			return ctmpl;
		},
		initSearch: function(){
			var search = this.j.attr("data-searcher");
			if(search != null){
				var placeholder = this.j.attr("data-search-placeholder");
				this.searchBox = new juci.searchbox({
					parent: this.j,
					datasetName: this._ds.ref,
					handler: search,
					placeholder: placeholder,
					delay: this.j.attr("data-search-delay")
				});
				this.searchBox.j.prependTo(this.j);
				this.searchBox.j.addClass("juci_xlist_search juci_"+this.type+"_search");
				this.searchBox.addListener("beforesearch", this._onBeforeSearch, this);
				this.searchBox.addListener("search", this._onSearch, this);
				this.searchBox.addListener("clear", this._onClearSearch, this);
				this.searchBox.addListener("aftersearch", this._onAfterSearch, this);
			}
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(["listitemclick","submit", "additem", "additems", "removeitem", "removeitems", "removeall", "beforesearch", "aftersearch", "search", "searchclear", "afterrender", "openitem", "closeitem", "initcontent"]),
		getListPaneTemplate: function(){
			return new juci.elem('<ul class="juci_xlist_pane juci_'+this.type+'_listPane"></ul>');
		},
		initContentPanel: function(){
			this._content = this.getListContentTemplate();
			if(this._content){
				var contentPanelId = this._id+"_content";
				var contentBg = new juci.elem("<div class='juci_xlist_content_panel juci_"+this.type+"_content_panel' data-panel-id='"+contentPanelId+"'></div>");
				this._content.appendTo(contentBg);
				this._contentForm = null;
				var contentBg = this._content.parent();
				this.contentPanel = new juci.panel(contentBg);
				this._content.remove();
			}
		},
		initListItemTemplate: function(){
			var itemTmpl = this.getListItemTemplate();
			itemTmpl._clearFromCache();
			var flg = this.j.attr("data-flag");
			if(itemTmpl.find(".juci_flag_drawer").length == 0){
				itemTmpl.prepend(this._getFlagDrawer());
			}
			if(flg){
				var flgClass = this.j.attr("data-flag-css");
				var drwer = this._getFlagDrawer();
				var flgTmpl = new juci.elem("<div class='juci_flag'><div></div></div>").appendTo(drwer);
				flgTmpl.attr("data-bind", "css: "+flgClass);
				flgTmpl.children()[0].attr("data-bind", "display: " + flg + ", show: "+ flg);
				itemTmpl.addClass("juci_flag_visible");
				this._getFlagz();
			}
			var del = this.j.attr("data-delete");
			if(del || itemTmpl.hasClass("juci_delete_visible")){
				this.showDelete(itemTmpl);
				if(del){
					itemTmpl.find(".juci_delete")[0].attr("data-bind", "show: " + del);
				}
				this.addListItemClick(this._onDeleteClick, this, ".juci_delete_icon");
				if(flg){
					flgTmpl.prependTo(this._getFlagDrawer());
				}
			}
			var linkMe = this.j.attr("data-linker");
			if(linkMe != null){
				if(linkMe){
					this.addLinker(itemTmpl);
					itemTmpl.find(".juci_linker")[0].attr("data-bind", "show: " + linkMe);
				}
			}else if(!itemTmpl.hasClass("juci_no_linker")){
				this.addLinker(itemTmpl);
			}
			if(!itemTmpl.hasClass("juci_no_bg")){
				itemTmpl.addClass("juci_parent");
			}
			var existingClasses = itemTmpl.removeClass();
			itemTmpl.addClass("juci_xlist_item juci_"+this.type+"_item" + (existingClasses ? (" " + existingClasses) : ""));
			itemTmpl.show();
			itemTmpl.appendTo(this.listPane);
			if(itemTmpl.attr("onclick")){
				this.onListItemclick(itemTmpl.el.onclick);
				itemTmpl.el.onclick = null;
				itemTmpl.removeAttr("onclick");
			}
			if(this._ds.grid){
				if(!this._ds.gridDisabled){
					this.j.addClass("juci_grid_list");
				}
				var html = this.listPane.html();
				html = "<!-- ko if: $index()%"+this._ds.grid+" == 0 --><div class='juci_grid'><!-- /ko --><div class='juci_grid_cell'>" + html +
					"</div><!-- ko if: $index()%"+this._ds.grid+" == 0 --></div><!-- /ko -->";
				this.listPane.html(html);
				if(juci.isBuggyWebkitAndroid){
					var self = this;
					var fn = function(){
						self.listPane.css("display", "none");
						setTimeout(function(){
							self.listPane.css("display", "");
						}, 2000);
					}
					// HACK for buggy 2.2 Android
					if(!juci.isReady()){
						juci.onReady(fn);
					}else{
						setTimeout(fn, 2000);
					}
				}
			}
		},
		disableGrid: function(){
			this.j.removeClass("juci_grid_list");
		},
		enableGrid: function(){
			this.j.addClass("juci_grid_list");
		},
		beforeInit: function(){
			this.j.removeClass("juci_basecontrol");
			juci.controls.prependLabel(this.j);
			if(this.j.attr("data-label") == null){
				this.j.find(".juci_ctrl_label")[0].hide();
			}
		},
		init: function(){
			/*
				1. Get itemTmpl click if onclick is available. And remove it.
				2. Create selected data
				3. Add on click delegatee on the itemTmpl container
				4. Create content panel if content template is defined. Attach a itemTmpl click listener
				5. On open content panel, set selected data('with' binding)
				6. On close, make null on content panel
			*/
			this.beforeInit();
			this.j.addClass("juci_vertical_list");
			//this.j.removeAttr("data-bind");
			this.listPane = this.getListPaneTemplate().appendTo(this.j);
			this.initListItemTemplate();
			this.initSearch();
			var afterRendered = this._ds.afterRender;
			this.listPane.attr("data-bind",
				"jucilist: {data: "+this._ds.ref+", afterRender: function(elements, item, index){juci.handleAfterRender(elements, item, index, '"+ this._id +"')}}"+
				", contentTitle: " + (this._ds.contentTitle ? this._ds.contentTitle : "function(item){return 'Content';}") +
				(afterRendered ? ", afterRendered: " + afterRendered : ""));
			this.initContentPanel();
			this._valueAccessor = null;
			var dataNew = this.j.attr("data-new-item");
			if(dataNew != null){
				this._newDataFunc = window[dataNew];
			}else{
				this._newDataFunc = function(newObj){return newObj ? newObj : {} };
			}
			this.initPlaceholder();
			this.postInitializeList();
		},
		initPlaceholder: function(){
			var placeholder = this.j.attr("placeholder");
			if(placeholder){
				this.j.append("<div class='juci_xlist_placeholder juci_"+this.type+"_placeholder' data-bind='show: "+this._ds.ref+" && "+this._ds.ref+"() && "+this._ds.ref+"().length == 0'>"+placeholder+"</div>");
			}
		},
		postInitializeList: function(){
			this._checkActionbar();
			this.addListItemClick(this.fireListItemClick, this, ".juci_"+this.type+"_item");
		},
		_checkActionbar: function(){
			// Check for actionbar presence and add scroll on the container
			var cPanel = juci.panelForElem(this.j);
			var bar = cPanel.j.find("[data-juci=actionbar]")[0];
			if(bar){
				this.makeScroller(cPanel);
			}
		},
		makeScroller: function(cPanel){
			var tempContainer = new juci.elem("<div></div>").appendTo(this.j);
			tempContainer.attr("juci-ctrl-id", this.j.attr("juci-ctrl-id"));
			this.listPane.appendTo(tempContainer);
			this.scroller = new juci.scrollable(tempContainer.el);
			this.scroller.juciElem = tempContainer;
			this._cb = juci.utils.getDelayedCallback(this._resizeScroller, this, 500);
			cPanel.addListener("resume", this.resizeScroller, this);
			if(window.__mowbly__){
				__mowbly__.Device.bind("orientationchange", this.resizeScroller, this);
			}
			this._resizeCallback = juci.utils.getCallback(function(){
				this.resizeScroller();
			}, this);
			window.addEventListener("resize",  this._resizeCallback);
		},
		resizeScroller: function(arg){
			window.clearTimeout(this._tmr);
			this._tmr = window.setTimeout(this._cb, 100);
		},
		DefaultScrollerDiff: 50,
		_resizeScroller: function(arg){
			var tOffset = this.scroller.juciElem.offset().top;
			// TODO Check if it is overflowing the page, if so, then set the height else don't
			this.scroller.juciElem.height(juci.browserHeight() - (typeof arg === "undefined" ? this.DefaultScrollerDiff: arg) - tOffset);
			this.scroller.refresh();
		},
		_onBeforeSearch: function(evt){
			this.fireEvent("beforesearch", new EventObject(evt, evt));
		},
		_onAfterSearch: function(evt){
			this.fireEvent("aftersearch", new EventObject(evt, evt));
		},
		_onSearch: function(evt){
			if(this.scroller){
				this.resizeScroller();
			}
			this.fireEvent("search", new EventObject(evt, evt));
		},
		_onClearSearch: function(evt){
			this.fireEvent("searchclear", new EventObject(evt, evt));
		},
		enable: function(){
			this.listPane.enable();
		},
		disable: function(){
			this.listPane.disable();
		},
		_afterRender: function(elements, item, index){
			var itElem = new juci.elem(elements[0]);
			var evt = new EventObject({"listItem": itElem, "getItem": function(){
				return ko.mapping.toJS(item);
			}, "index": index, control: this});
			evt.data = evt.item
			this.fireEvent("afterrender", new EventObject(evt, evt));
			if(this.scroller){
				this.resizeScroller();
			}
		},
		// Event will contain if data is to be saved or not. Always clearing data on content while closing
		_onCloseContent: function(){
			this._contentForm.removeListener("reset", this._onReset, this);
			this.contentPanel.removeListener("close", this._onCloseContent, this);
			this._contentForm.reset();
			var wrappedData = this._idx === -1 ? null : this._valueAccessor()[this._idx];
			var evt = this.fireEvent("reset", {formData: this._contentForm._data(), wrappedData: wrappedData, data: this._idx === -1 ? null : ko.mapping.toJS(wrappedData), index: this._idx, isNew: this._idx === -1, panel: this.contentPanel});
			this.fireEvent("closeitem", new EventObject(evt, evt));
		},
		_onBindingsInitialize: function(){
			if(this.__params.afterRendered){
				this.addListener("afterrender", this.__params.afterRendered);
			}
		},
		/**
			@methodOf xlist.prototype
			@description Registers a handler function to call when the {@link xlist#event:listitemclick} event fires.
			@param {Function} handler A handler function to execute when the event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see xlist#event:listitemclick
		*/
		onListItemclick: function(fn, context){
			this.addListener("listitemclick", fn, context);
		},
		_preListItemClickListener: function(ev){
			var wrappedData = ev.wrappedData;
			var unwrappedData = ko.mapping.toJS(wrappedData);
			ev.data = unwrappedData;
			ev.e.preventDefault();
			ev.control = this;
			ev.listItem = ev.delegatee.closest(".juci_xlist_item");
			ev.index = this._valueAccessor().indexOf(wrappedData);
		},
		/**
			@methodOf xlist.prototype
			@description Adds a custom click/tap receiver on a list item for a particular element in each list item selected using the <i>delegateeSelector</i>, and registers a handler function to call when the custom event fires.
			@param {Function} handler A handler function to execute when the event fires.
			@param {Object} context=window Context in which the <i>handler</i> function should execute.
			@param {String} delegateeSelector A CSS selector string that matches for the element.
			@example #js juci.getControl("feedList").addListItemClick(handler, null, ".comment");
		*/
		addListItemClick: function(fn, context, delegateeSelector){
			this.listPane.removeClick(delegateeSelector);
			this.listPane.onClick(this._preListItemClickListener, this, delegateeSelector);
			this.listPane.onClick(fn, context, delegateeSelector);
		},
		/**
			@methodOf xlist.prototype
			@description Removes the custom click/tap receiver on a list item for a particular element in each list item selected using the <i>delegateeSelector</i>.
			@param {Function} handler The handler function to be removed.
			@param {Object} context=window Context in which the <i>handler</i> function should execute.
			@param {String} delegateeSelector {String} A CSS selector string that matches for the element.
			@example #js juci.getControl("feedList").removeListItemClick(handler, null, ".comment");
		*/
		removeListItemClick: function(fn, context, delegateeSelector){
			this.listPane.removeClick(delegateeSelector);
		},
		fireListItemClick: function(ev){
			var evt = new EventObject(ev, ev);
			this.fireEvent("listitemclick", evt);
			if(!evt.isCancelled() && this._content){
				this.openItem(evt.index, evt.data);
			}
		},
		openItem: function(index){
			if(typeof index == "number"){
				this._idx = index;
			}
			if(this._content){
				var unwrappedData;
				var wrappedData = ko.mapping.toJS(this._valueAccessor())[this._idx];
				if(arguments.length == 2){
					unwrappedData = arguments[1];
				}else{
					unwrappedData = ko.mapping.toJS(wrappedData);
				}
				if(this._contentForm == null){
					this._content.appendTo(this.contentPanel.j);
					this._content.attr("data-juci", "form");
					this.contentPanel.listenOnce("init", function(){
						this._contentForm = juci.getControl(this._content);
						this._contentForm.onSubmit(this._onSubmitItem, this);
						var emptyItem = this.j.getAttr("data-empty-item", null), emptyItemFunc;
						if(emptyItem != null){
							emptyItemFunc = window[emptyItem];
						}
						if(!emptyItemFunc){
							emptyItemFunc = function(){return {} };
						}
						var mapping = this.j.getAttr("data-binder-config", null), mappingFunc;
						if(mapping != null){
							mappingFunc = window[mapping];
						}
						if(!mappingFunc){
							mappingFunc = function(){return {} };
						}
						this._contentForm.setMapping(mappingFunc());
						this._contentForm.setData(emptyItemFunc(), true);
						this._contentForm.setData(unwrappedData, true);
						this._contentForm.bind("init", function(){
							this.fireEvent("initcontent", {data: unwrappedData, form: this._contentForm, wrappedData: wrappedData, mappedData: this._contentForm._data(), index: this._idx, isNew: this._idx === -1, panel: this.contentPanel});
						}, this);
					}, this);
					this.contentPanel.addListener("open", function(){
						this._contentForm.addListener("reset", this._onReset, this);
					}, this);
				}else{
					this._contentForm.setData(unwrappedData);
				}
				this.contentPanel.addListener("close", this._onCloseContent, this);
				this.contentPanel.listenOnce("open", function(){
					this.fireEvent("openitem", {data: unwrappedData, wrappedData: wrappedData, mappedData: this._contentForm._data(), index: this._idx, isNew: this._idx === -1, panel: this.contentPanel});
				}, this);
				this.contentPanel.open(this.__params.contentTitle(unwrappedData),unwrappedData);
			}
		},
		_onReset: function(){
			this.contentPanel.removeListener("close", this._onCloseContent, this);
			this._contentForm.removeListener("reset", this._onReset, this);
			var wrappedData = this._idx === -1 ? null : this._valueAccessor()[this._idx];
			var evt = this.fireEvent("reset", {mappedData: this._contentForm._data(), wrappedData: wrappedData,data: this._idx === -1 ? null : ko.mapping.toJS(wrappedData), index: this._idx, isNew: this._idx === -1, panel: this.contentPanel});
			this.contentPanel.listenOnce("close", function(){
				this.fireEvent("closeitem", new EventObject(evt, evt));
			}, this);
			juci.closePanel();
		},
		_onSubmitItem: function(evt){
			var oldData, bIsNewData;
			var newData = evt.data;
			var index;
			if(this._idx < 0){
				oldData = newData;
				bIsNewData = true;
				index = this._addIndex;
			}else{
				index = this._idx;
				oldData = this._valueAccessor()[index];
				bIsNewData = false;
			}
			var evt = new EventObject({oldData: ko.mapping.toJS(oldData), newData: newData, isNew: bIsNewData, index: index, doMapping: true, control: this});
			this.fireEvent("submit", evt);
			if(!evt.isCancelled()){
				this._idx = index;
				if(bIsNewData && this._new){
					evt.index === -1 ? this._valueAccessor.push(evt.doMapping ? ko.mapping.fromJS(newData, this._new) : newData) : this._valueAccessor.splice(evt.index, 0, evt.doMapping ? ko.mapping.fromJS(oldData, this._new) : oldData);
					delete this._new;
				}else{
					ko.mapping.fromJS(newData, null, oldData);
				}
				this.contentPanel.close();
				this.__fireAfterChange(evt);
			}
		},
		/**
			@methodOf xlist.prototype
			@description Returns the item at index in the list.
			@param {Number} index Index of the item
			@param {Boolean} [bMapped] If true, returns the item as present in the list without unmapping to a plain Javascript object.
			@returns {Object}
		**/
		getItem: function(i, bMapped){
			var item = this._valueAccessor()[i];
			if(bMapped){
				return item;
			}else{
				return typeof item === "undefined" || item === null ? item : ko.mapping.toJS(this._valueAccessor()[i]);
			}
		},
		/**
			@methodOf xlist.prototype
			@description Returns the current item opened in the list.
			@param {Boolean} [bMapped] If true, returns the item as present in the list without unmapping to a plain Javascript object.
			@returns {Object}
		**/
		getCurrentItem: function(bMapped){
			if(typeof this._idx != "undefined"){
				if(this._idx === -1){
					return bMapped ? this._new : ko.mapping.toJS(this._new);
				}else{
					return this.getItem(this._idx, bMapped);
				}
			}else{
				return null;
			}
		},
		/**
			@methodOf xlist.prototype
			@description Returns the index of the current item opened in the list.
			@returns {Number}
		**/
		getCurrentIndex: function(){
			if(typeof this._idx != "undefined"){
				return this._idx;
			}else{
				return null;
			}
		},
		/**
			@methodOf xlist.prototype
			@description Adds an item to the list at passed index.
			@param {Object} item The item to be added to the dataset.
			@param {Number} [index=0] Index at which the item has to be added.
			@param {Boolean} [doMapping] If true, maps the passed item on to the view model {@link juci#dataset}, else uses the item as passed.
			@param {Object} [mapping] Mapping configuration on each item for <a href="http://knockoutjs.com/documentation/plugins-mapping.html" target="_blank">custom mapping</a>.
			@fires xlist#event:additem
			@fires xlist#event:afterchange
		*/
		addItem: function(item, index, bMap, mapping){
			var evt = new EventObject({item: item, index: index ? index : 0, doMapping: !!bMap, mapping: mapping ? mapping: {}, control: this});
			this.fireEvent("additem", evt);
			if(!evt.isCancelled()){
				if(evt.index == -1){
					this._valueAccessor.push(evt.doMapping ? ko.mapping.fromJS(item, evt.mapping) : item);
				}else{
					this._valueAccessor.splice(index, 0, evt.doMapping ? ko.mapping.fromJS(item, evt.mapping) : item );
				}
				this.__fireAfterChange(evt);
			}
		},
		/**
			@methodOf xlist.prototype
			@description Updates an item to the list at passed index.
			@param {Object} item The item to be updated to the dataset.
			@param {Number} [index=0] Index at which the item has to be updated.
			@param {Boolean} [doMapping] If true, maps the passed item on to the view model {@link juci#dataset}, else uses the item as passed.
			@param {Object} [mapping] Mapping configuration on each item for <a href="http://knockoutjs.com/documentation/plugins-mapping.html" target="_blank">custom mapping</a>.
			@fires xlist#event:updateitem
			@fires xlist#event:afterchange
		*/
		updateItem: function(item, index, bMap, mapping){
			var evt = new EventObject({item: item, index: index ? index : 0, doMapping: !!bMap, mapping: mapping ? mapping: {}, control: this});
			this.fireEvent("updateitem", evt);
			if(!evt.isCancelled()){
				this._valueAccessor.splice(index, 1, evt.doMapping ? ko.mapping.fromJS(item, evt.mapping) : item );
				this.__fireAfterChange(evt);
			}
		},
		__fireAfterChange: function(evt){
			var eventObj = new EventObject(evt, evt);
			eventObj.action = evt.type;
			eventObj.value = ko.mapping.toJS(this._valueAccessor());
			this.fireEvent("afterchange", eventObj);
			this.validate(eventObj.value);
		},
		/**
			@methodOf xlist.prototype
			@description Creates an item, but does not add it to the list unless, the user performs a <i>submit</i> action in the content form. Similar to a constructor for the item.
			@param {Object} [item] A constructor copy of an item, i.e. plain JS object.
			@note The new object is either passed with the method call or <i>data-new-item</i> should be defined for the xlist.
			@throws Error when no <i>data-juci="listcontent"</i> for the list.
		*/
		createItem: function(newItem, bDontMap, index){
			if(this._content){
				var item = this._newDataFunc(newItem);
				this._addIndex = typeof bDontMap == "number" ? bDontMap : index ? index : 0;
				this._new = bDontMap === true ? item : ko.mapping.fromJS(item);
				this.openItem(-1, item);
			}else{
				// Error - Create not supported without content panel
				throw new Error("No data-juci=\"listcontent\" defined.")
			}
		},
		/**
			@methodOf xlist.prototype
			@description Adds an array of items to the list at passed index.
			@param {Array} item The array of items to be added to the dataset.
			@param {Number} [index=0] Index at which the items have to be added.
			@param {Boolean} [doMapping] If true, maps the passed items on to the view model {@link juci#dataset}, else uses the items as passed.
			@param {Object} [mapping] Mapping configuration for <a href="http://knockoutjs.com/documentation/plugins-mapping.html" target="_blank">custom mapping</a>.
			@fires xlist#event:additems
			@fires xlist#event:afterchange
		*/
		addItems: function(items, index, bMap, mapping){
			var evt = new EventObject({items: items, index: index ? index : 0, doMapping: !!bMap, mapping: mapping ? mapping : {}, control: this});
			this.fireEvent("additems", evt);
			if(!evt.isCancelled()){
				if(evt.index == -1){
					items.forEach(function(item, i){
						this._valueAccessor.push(evt.doMapping ? ko.mapping.fromJS(item, evt.mapping) : item);
					}, this);
				}else{
					items.forEach(function(item, i){
						this._valueAccessor.splice(index+i, 0, evt.doMapping ? ko.mapping.fromJS(item, evt.mapping) : item);
					}, this);
				}
				this.__fireAfterChange(evt);
			}
		},
		/**
			@methodOf xlist.prototype
			@description Updates an array of items to the list at passed index.
			@param {Array} item The array of items to be updated to the dataset.
			@param {Number} [index=0] Index at which the items have to be updated.
			@param {Boolean} [doMapping] If true, maps the passed items on to the view model {@link juci#dataset}, else uses the items as passed.
			@param {Object} [mapping] Mapping configuration for <a href="http://knockoutjs.com/documentation/plugins-mapping.html" target="_blank">custom mapping</a>.
			@fires xlist#event:updateitems
			@fires xlist#event:afterchange
		*/
		updateItems: function(items, index, bMap, mapping){
			var evt = new EventObject({items: items, index: index ? index : 0, doMapping: !!bMap, mapping: mapping ? mapping : {}, control: this});
			this.fireEvent("updateitems", evt);
			if(!evt.isCancelled()){
				items.forEach(function(item, i){
					this._valueAccessor.splice(index+i, 1, evt.doMapping ? ko.mapping.fromJS(item, evt.mapping) : item);
				}, this);
				this.__fireAfterChange(evt);
			}
		},
		// TODO Implement
		moveItems: function(fromIndex, toIndex, howMany){

		},
		/**
			@methodOf xlist.prototype
			@description Removes an item from the list at passed index.
			@param {Number} index Index at which the item has to be removed.
			@fires xlist#event:removeitem
			@fires xlist#event:afterchange
			@return {Object} The removed item.
		*/
		removeItemAt: function(index){
			if(typeof index == "undefined"){
				// Throw error
				throw new Error("Index cannot be undefined");
			}
			var evt = new EventObject({item: ko.mapping.toJS(this._valueAccessor()[index]), index: index ? index : 0, control: this});
			this.fireEvent("removeitem", evt);
			if(!evt.isCancelled()){
				var retVal = ko.mapping.toJS(this._valueAccessor.splice(index, 1));
				if(this.scroller){
					this.scroller.refresh();
				}
				this.__fireAfterChange(evt);
				return retVal[0];
			}
		},
		/**
			@methodOf xlist.prototype
			@description Removes a number of item from the list starting from the passed index.
			@param {Number} index Index at which the items have to be removed.
			@param {Number} numberOfItems Number of items to be removed.
			@fires xlist#event:removeitems
			@fires xlist#event:afterchange
			@return {Array} The array of removed items.
		*/
		removeItemsAt: function(index, numberOfItems){
			if(typeof index == "undefined"){
				// Throw error
				throw new Error("Index cannot be undefined");
			}
			if(typeof numberOfItems == "undefined"){
				throw new Error("numberOfItems cannot be undefined");
			}
			var evt = new EventObject({items: ko.mapping.toJS(this._valueAccessor.slice(index, index+numberOfItems)), index: index ? index : 0, control: this});
			this.fireEvent("removeitems", evt);
			if(!evt.isCancelled()){
				var retVal = ko.mapping.toJS(this._valueAccessor.splice(index, numberOfItems));
				if(this.scroller){
					this.scroller.refresh();
				}
				this.__fireAfterChange(evt);
				return retVal;
			}
		},
		/**
			@methodOf xlist.prototype
			@description Removes all items in the list.
			@fires xlist#event:removeall
			@fires xlist#event:afterchange
			@return {Array} The array of removed items.
		*/
		removeAll: function(){
			var d = ko.mapping.toJS(this._valueAccessor)
			var evt = new EventObject({items: d, control: this});
			this.fireEvent("removeall", evt);
			if(!evt.isCancelled()){
				this._valueAccessor.splice(0, this._valueAccessor().length);
				this.__fireAfterChange(evt);
				return d;
			}
		},
		_getFlagz: function(){
			if(!this._flagz){
				this._flagz = true;
				this.addListItemClick(this._onFlagClickItem, this, ".juci_flag");
			}
			return this._flagz;
		},
		_onFlagClickItem: function(e){
			var evt = new EventObject(e, e);
			evt.flag = e.delegatee.msg;
			this.fireEvent("flagclick", evt);
			e.preventDefault();
			e.stopPropagation();
		},
		_getDeletez: function(){
			if(!this._deletez){
				this._deletez = true;
				this.addListItemClick(this._onDeleteClick, this, ".juci_delete_icon");
			}
			return this._deletez;
		},
		setFlagForIndex: function(index, msg, clazz){
			this._getFlagz();
			var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+") .juci_flag_drawer";
			var p = this.listPane.find(q)[0];
			var _flag = p.find(".juci_flag")[0];
			if(!_flag){
				p.parent().addClass("juci_flag_visible");
				_flag = new juci.elem("<div class='juci_flag'><div>"+(typeof msg == "object" ? msg.flag : msg)+"</div></div>").prependTo(p);
				if(clazz){
					_flag.addClass("juci_" + clazz);
				}
			}else{
				p.addClass("juci_flag_visible");
				_flag.removeClass();
				_flag.addClass("juci_flag" + (clazz ? (" juci_"+clazz) : ""));
				_flag.children()[0].html(typeof msg == "object" ? msg.flag : msg);
			}
			_flag.msg = msg;
			_flag.clazz = clazz;
		},
		setFlagForIndices: function(indices, msg, clazz){
			this._getFlagz();
			for(var i = 0; i < indices.length; i++){
				var index = indices[i];
				var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+") .juci_flag_drawer";
				var p = this.listPane.find(q)[0];
				var _flag = p.find(".juci_flag")[0];
				if(!_flag){
					p.parent().addClass("juci_flag_visible");
					_flag = new juci.elem("<div class='juci_flag'><div>"+(typeof msg == "object" ? msg.flag : msg)+"</div></div>").prependTo(p);
					_flag.msg = msg;
					if(clazz){
						_flag.addClass("juci_" + clazz);
					}
				}else{
					p.addClass("juci_flag_visible");
					_flag.removeClass();
					_flag.addClass("juci_flag" + (clazz ? (" juci_"+clazz) : ""));
					_flag.children()[0].html(typeof msg == "object" ? msg.flag : msg);
				}
				_flag.msg = msg;
				_flag.clazz = clazz;
			}
		},
		resetFlagForIndex: function(index){
			var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+") .juci_flag_drawer";
			var p = this.listPane.find(q)[0];
			var _flag = p.find(".juci_flag")[0];
			if(_flag){
				p.removeClass("juci_flag_visible");
				_flag.remove();
			}
		},
		resetFlagForIndices: function(indices){
			for(var i = 0; i < indices.length; i++){
				this.resetFlagForIndex(indices[i]);
			}
		},
		showDeleteForIndex: function(index){
			this._getDeletez();
			var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+") .juci_flag_drawer";
			var p = this.listPane.find(q)[0];
			var d = p.find(".juci_delete_icon")[0];
			if(!d){
				var parent = p.parent();
				parent.addClass("juci_delete_visible");
				var _delete = new juci.elem('<div class="juci_delete"><div class="juci_delete_icon"></div></div>');
				var fl = parent.find(".juci_flag")[0];
				if(!fl){
					_delete.prependTo(p);
				}else{
					_delete.insertAfter(fl);
				}
			}
		},
		_onDeleteClick: function(e){
			var evt = new EventObject(e, e);
			this.fireEvent("deleteclick", evt);
			if(!evt.isCancelled()){
				this.removeItemAt(e.index);
			}
			e.preventDefault();
			e.stopPropagation();
		},
		showDeleteForIndices: function(indices){
			this._getDeletez();
			for(var i = 0; i < indices.length; i++){
				var index = indices[i];
				var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+") .juci_flag_drawer";
				var p = this.listPane.find(q)[0];
				var d = p.find(".juci_delete_icon")[0];
				if(!d){
					var parent = p.parent();
					parent.addClass("juci_delete_visible");
					_delete = new juci.elem('<div class="juci_delete"><div class="juci_delete_icon"></div></div>');
					var fl = parent.find(".juci_flag")[0];
					if(!fl){
						_delete.prependTo(p);
					}else{
						_delete.insertAfter(fl);
					}
				}
			}
		},
		hideDeleteForIndex: function(index){
			var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+") .juci_flag_drawer";
			var p = this.listPane.find(q)[0];
			var d = p.find(".juci_delete_icon")[0];
			if(d){
				p.removeClass("juci_delete_visible");
				d.remove();
			}
		},
		hideDeleteForIndices: function(indices){
			for(var i = 0; i < indices.length; i++){
				this.hideDeleteForIndex(indices[i]);
			}
		},
		addLinker: function(elem){
			if(typeof elem === "number"){
				var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+") .juci_flag_drawer";
				new juci.elem('<div class="juci_linker"></div>').appendTo(this.listPane.find(q)[0]);
			}else{
				new juci.elem("<div class='juci_linker'></div>").appendTo(elem.find(".juci_flag_drawer")[0]);
			}
		},
		/**
			@hidden
		*/
		showDelete: function(elem){
			if(elem instanceof juci.elem){
				new juci.elem('<div class="juci_delete"><div class="juci_delete_icon"></div></div>').appendTo(elem.find(".juci_flag_drawer")[0]);
			}else{
				this._super();
			}
		},
		value: function(val){
			if(this._valueAccessor){
				if(typeof val != "undefined"){
					this._valueAccessor(val);
				}else{
					return ko.mapping.toJS(this._valueAccessor());
				}
			}
		},
		setValueAccessor: function(valAccessor){
			var v = valAccessor().data;
			this._valueAccessor = typeof v == "function" ? v : function(){
				return v;
			}
		},
		enableForIndex: function(index){
			var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+")";
			var h = this.listPane.find(q)[0];
			if(h){
				h.enable();
				[h.find(".juci_flag")[0], h.find(".juci_delete_icon")[0]].forEach(function(el){
					el.enable();
				});
			}
		},
		enableForIndices: function(indices){
			for(var i = 0; i < indices.length; i++){
				this.enableForIndex(indices[i]);
			}
		},
		disableForIndex: function(index){
			var q = ".juci_"+this.type+"_item:nth-child("+(index+1)+")";
			var h = this.listPane.find(q)[0];
			if(h){
				h.disable();
				[h.find(".juci_flag")[0], h.find(".juci_delete_icon")[0]].forEach(function(el){
					el.disable();
				});

			}
		},
		disableForIndices: function(indices){
			for(var i = 0; i < indices.length; i++){
				this.disableForIndex(indices[i]);
			}
		},
		/**
			@methodOf xlist.prototype
			@hidden
		*/
		hideDelete: juci.utils.EmptyMethod,
		/**
			@methodOf xlist.prototype
			@hidden
		*/
		setFlag: juci.utils.EmptyMethod,
		/**
			@methodOf xlist.prototype
			@hidden
		*/
		resetFlag: juci.utils.EmptyMethod,
		_getImageEventHelper: function(){
			return "juci.getControl('"+this._id+"')._onImageEvent(event, 'image'+event.type)";
		},
		_onImageEvent: function(e, type){
			var ev = new MDOMEventObject(e);
			var wrappedData = ev.wrappedData;
			var unwrappedData = wrappedData ? ko.mapping.toJS(wrappedData) : null;
			ev.data = unwrappedData;
			ev.index = this._valueAccessor().indexOf(wrappedData);
			ev.listItem = ev.target.closest(".juci_xlist_item");
			ev.control = this;
			this.fireEvent(type, ev);
		}
		/**
			@methodOf xlist.prototype
			@name onDeleteClick
			@description Registers a handler function to call when the {@link xlist#event:deleteclick} event fires.
			@param {Function} handler A handler function to execute when the event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see xlist#event:deleteclick
		*/
		/**
			@methodOf xlist.prototype
			@name onFlagClick
			@description Registers a handler function to call when the {@link xlist#event:flagclick} event fires.
			@param {Function} handler A handler function to execute when the event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see xlist#event:flagclick
		*/
		/**
			@name onBeforeChange
			@methodOf xlist.prototype
			@hidden
		*/

	};
	// Events
	{
		/**
			@name beforechange
			@memberOf xlist.prototype
			@event
			@hidden
		*/
		/**
			@memberOf xlist.prototype
			@name listitemclick
			@event
			@description Fires when user taps on a list item. Default action opens the list item in the content form if defined.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data Data for the item.
			@param {Object} eventObj.wrappedData {Object} The mapped data for the item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
		/**
			@memberOf xlist.prototype
			@name flagclick
			@event
			@description Fires when user taps on the flag in a list item.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data Data for the item.
			@param {Object} eventObj.wrappedData The mapped data for the item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
		/**
			@memberOf xlist.prototype
			@name deleteclick
			@event
			@description Fires when user taps on the delete icon in a list item. Default action deletes the item.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data Data for the item.
			@param {Object} eventObj.wrappedData The mapped data for the item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
		/**
			@memberOf xlist.prototype
			@name additem
			@event
			@description Fires when {@link xlist.addItem} is invoked.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.item Data for the item.
			@param {Boolean} eventObj.doMapping True if the item will be mapped.
			@param {Object} eventObj.mapping The mapping configuration.
		*/
		/**
			@memberOf xlist.prototype
			@name additems
			@event
			@description Fires when {@link xlist.addItems} is invoked.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index.
			@param {Array} eventObj.items Array of items to be added.
			@param {Boolean} eventObj.doMapping True if the item will be mapped.
			@param {Object} eventObj.mapping The mapping configuration.
		*/
		/**
			@memberOf xlist.prototype
			@name removeitem
			@event
			@description Fires when {@link xlist.removeItem} is invoked.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.item Data for the item.
		*/
		/**
			@memberOf xlist.prototype
			@name removeitems
			@event
			@description Fires when {@link xlist.removeItems} is invoked.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Array} eventObj.items Array of items to be removed.
		*/
		/**
			@memberOf xlist.prototype
			@name removeall
			@event
			@description Fires when {@link xlist.removeAll} is invoked.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Array} eventObj.items Array of items to be removed.
		*/
		/**
			@memberOf xlist.prototype
			@name afterrender
			@event
			@description Fires after a list item is rendered.
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.item The item that has been rendered.
			@param {juci.elem} eventObj.listItem The element that has been rendered.
		*/
		/**
			@memberOf xlist.prototype
			@name submit
			@event
			@description Fires when the list content form is submitted.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.oldData Old value of the item.
			@param {Object} eventObj.newData New value of the item.
			@param {Boolean} eventObj.isNew True if the item is new and not present in the list.
		*/
		/**
			@memberOf xlist.prototype
			@name reset
			@event
			@description Fires when the list content form is reset.
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data The item.
			@param {Object} eventObj.panel The list content panel.
			@param {Boolean} eventObj.isNew True if the item is new and not present in the list.
		*/
		/**
			@memberOf xlist.prototype
			@name openitem
			@event
			@description Fires when the item is opened using list content.
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data The item.
			@param {Object} eventObj.panel The list content panel.
			@param {Boolean} eventObj.isNew True if the item is new and not present in the list.
		*/
		/**
			@memberOf xlist.prototype
			@name closeitem
			@event
			@description Fires when the item is closed using list content.
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data The item.
			@param {Object} eventObj.panel The list content panel.
			@param {Boolean} eventObj.isNew True if the item is new and not present in the list.
		*/

	}
	this.extend(xlist, juci.controls.basecontrol);
	juci.controls.xlist = xlist;
	/**
		@namespace
		@name list
		@augments xlist
		@description A simple list with a title and an optional content defined using <i>data-juci="listcontent"</i>.
		@dataattribute {String} data-juci A string with value <i>list</i>.
		@dataattribute {String} data-titles Add #hidden
		@dataattribute {String} data-subtitle Add #hidden
		@dataattribute {String} data-subtitles Add #hidden
		@css .juci_list_item
		@css .juci_list_item.touch
		@example #html <div data-juci="list" data-title="shipmentName" data-bind="ref: deliveries"></div>
		#js juci.addDataset("deliveries", [
	{
		"shipmentName": "Future Logistics",
		"shipmentNumber": "533726",
	},
	{
		"shipmentName": "MKM Transports",
		"shipmentNumber": "498723"
	}]
);
	*/
	var list = function(elem){
		elem.removeAttr("data-titles");
		elem.removeAttr("data-subtitle");
		elem.removeAttr("data-subtitles");
		this._super = juci.controls.xlist;
		this._super(elem);
	}
	list.prototype.type = "list";
	this.extend(list, juci.controls.xlist);
	juci.controls.list = list;

	/**
		@namespace
		@name listwithsubtitle
		@augments xlist
		@description A simple list with a title, a subtitle and an optional content defined using <i>data-juci="listcontent"</i>.
		@dataattribute {String} data-juci A string with value <i>listwithsubtitle</i>.
		@dataattribute {String} data-titles
		@dataattribute {String} data-subtitles
		@css .juci_listwithsubtitle_item
		@css .juci_listwithsubtitle_item.touch
		@example #html <div data-juci="listwithsubtitle" data-title="shipmentName" data-subtitle="'Shipment number ' + shipmentNumber()" data-bind="ref: deliveries"></div>
		#js juci.addDataset("deliveries", [
	{
		"shipmentName": "Future Logistics",
		"shipmentNumber": "533726",
	},
	{
		"shipmentName": "MKM Transports",
		"shipmentNumber": "498723"
	}]
);
	*/
	var listwithsubtitle = function(elem){
		elem.removeAttr("data-titles");
		elem.removeAttr("data-subtitles");
		this._super = juci.controls.xlist;
		this._super(elem);
	}
	listwithsubtitle.prototype.type = "listwithsubtitle";
	this.extend(listwithsubtitle, juci.controls.xlist);
	juci.controls.listwithsubtitle = listwithsubtitle;

	/**
		@namespace
		@name catalog
		@augments xlist
		@description A catalog of items with an image and a title description with a flowing layout of items.
		@dataattribute {String} data-juci A string with value <i>juci</i>.
		@dataattribute {String} data-titles Add #hidden
		@dataattribute {String} data-subtitle Add #hidden
		@dataattribute {String} data-subtitles Add #hidden
		@dataattribute {String} data-img Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Appears as an image in each catalog item.
		@dataattribute {String} data-img-css CSS class for the image. See <a href="http://knockoutjs.com/documentation/css-binding.html" target="_blank">css expression binding</a>
		@dataattribute {String} data-img-onload Name of function defined on the window scope. Added as a listener for {@link catalog#event:imageload}.
		@dataattribute {String} data-img-onerror Name of function defined on the window scope. Added as a listener for {@link catalog#event:imageerror}.
		@css .juci_catalog_item
		@css .juci_catalog_item.touch
		@example #html <div data-juci="catalog" data-bind="ref: imgs" data-img="img" data-title="title" onlistitemclick="$m.toast('U clicked - '+ event.data.title);"></div>
		#js juci.addDataset("imgs", [
	{img: "image1.png", "title":"First item"},
	{img: "image2.png", "title":"Second item"}
]);
	*/
	var catalog = function(elem){
		this._super = juci.controls.xlist;
		this._super(elem);
		this.j.addClass("juci_no_border_background");
		this.j.removeClass("juci_vertical_list");
		this.j.removeClass("juci_horizontal_list");
	}
	catalog.prototype = {
		type: "catalog",
		getListItemTemplate: function(){
			// Get image data option and title data option
			// TODO Customize image showing
			var imgRef = this.j.attr("data-img");
			var titleRef = this.j.attr("data-title");
			var imgClass = this.j.attr("data-img-css");
			var imgError = window[this.j.attr("data-img-onerror")];
			var imgLoad = window[this.j.attr("data-img-onload")];
			if(imgError){
				this.addListener("imageerror", imgError);
			}
			if(imgLoad){
				this.addListener("imageload", imgLoad);
			}
			var itemTmpl = new juci.elem("<div class='juci_no_linker juci_no_bg'>" +
					"<div class='juci_"+this.type+"_image'><img/></div>" +
					"<div class='juci_"+this.type+"_title'><div data-bind='display:"+titleRef+"'></div></div>" +
				"</div>").appendTo(this.j);
			var img = itemTmpl.find("img")[0];
			var ll = this._getImageEventHelper();
			img.attr("data-bind", "img: "+imgRef+", css: "+imgClass);
			img.attr("onload", ll);
			img.attr("onerror", ll);
			return itemTmpl;
		}
	};
	{
		/**
			@memberOf catalog.prototype
			@name imageload
			@event
			@description Fires when an image in a list item has finished loading.
			@note This event cannot be listened to in html through <i>onimageload</i>. Use <i>data-img-on-load</i>.
			@param {EventObject} eventObj
			@param {Object} eventObj.data The item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
		/**
			@memberOf catalog.prototype
			@name imageerror
			@event
			@description Fires when an image in a list item has finished loading with errors.
			@note This event cannot be listened to in html through <i>onimageerror</i>. Use <i>data-img-on-error</i>.
			@param {EventObject} eventObj
			@param {Object} eventObj.data The item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
	}
	this.extend(catalog, juci.controls.list);
	juci.controls.catalog = catalog;

	/**
		@namespace
		@name actionableList
		@exports actionableList as actionablelist
		@augments xlist
		@description A list of items with an action button in addition to titles and subtitles.
		@dataattribute {String} data-juci A string with value <i>actionablelist</i>.
		@dataattribute {String} data-action Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Appears as an action button in each item.
		@dataattribute {String} data-action-css CSS class for the action. See <a href="http://knockoutjs.com/documentation/css-binding.html" target="_blank">css expression binding</a>
		@css .juci_actionablelist_item
		@css .juci_actionablelist_item.touch
		@css .juci_actionable_container
		@css .juci_actionable_button
		@css .juci_actionable_button.touch
		@example #html <div data-juci="actionablelist" data-title="shipmentName" data-action="shipmentNumber" data-bind="ref: deliveries" onlistitemclick="$m.toast('U clicked - '+ event.index);"></div>
		#js juci.addDataset("deliveries", [
	{
		"shipmentName": "Future Logistics",
		"shipmentNumber": "533726",
	},
	{
		"shipmentName": "MKM Transports",
		"shipmentNumber": "498723"
	}]
);
	*/
	var actionableList = function(elem){
		this._super = juci.controls.xlist;
		this._super(elem);
	}
	actionableList.prototype = {
		type: "actionablelist",
		Events: juci.controls.list.prototype.Events.concat("actionclick"),
		ListItemTemplate: "<li data-juci='listitem'></li>",
		getListItemTemplate: function(){
			var itemTmpl = this._super();
			// Get action
			var action = this.j.getAttr("data-action", "\"Action\"");
			var actionClass = this.j.attr("data-action-css");
			itemTmpl.append(new juci.elem("<div class='juci_actionable_container'>" +
				"<div class='juci_actionable_button juci_button'></div></div>"));
			itemTmpl.find(".juci_actionable_button")[0].attr("data-bind","display: "+action + ", css:" + actionClass);
			return itemTmpl;
		},
		postInitializeList: function(){
			this._super();
			this.addListItemClick(this.fireActionClick, this, ".juci_actionable_button");
		},
		fireActionClick: function(e){
			var evt = new EventObject(e, e);
			this.fireEvent("actionclick", evt);
		},
		/**
			@memberOf actionablelist.prototype
			@description Registers a handler function to call when the {@link actionablelist#event:actionclick} event fires.
			@param {Function} handler A handler function to execute when the event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see actionablelist#event:actionclick
		*/
		onActionClick: function(fp, ctx){
			this.addListener("actionclick", fp, ctx);
		}
	};
	{
		/**
			@memberOf actionablelist.prototype
			@name actionclick
			@event
			@description Fires when user taps on the action in an actionablelist item.
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data Data for the item.
			@param {Object} eventObj.wrappedData The mapped data for the item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
	}
	this.extend(actionableList, juci.controls.list);
	juci.controls.actionablelist = actionableList;

	/**
		@namespace
		@name tasklist
		@exports tasklist as tasklist
		@augments xlist
		@description A list of items with an done action(Delete) in addition to titles and subtitles, like a to-do list.
		@dataattribute {String} data-juci A string with value <i>tasklist</i>.
		@css .juci_tasklist_item
		@css .juci_tasklist_item.touch
		@example #html <div data-juci="tasklist" data-title="shipmentName" data-bind="ref: deliveries" data-flag="'Due!'"></div>
		#js juci.addDataset("deliveries", [
	{
		"shipmentName": "Future Logistics",
		"shipmentNumber": "533726",
	},
	{
		"shipmentName": "MKM Transports",
		"shipmentNumber": "498723"
	}]
);
	*/
	var tasklist = function(elem){
		this._super = juci.controls.xlist;
		this._super(elem);
	}
	tasklist.prototype = {
		type: "tasklist",
		ListItemTemplate: "<li data-juci='listitem' class='juci_delete_visible'></li>",
		getListItemTemplate: function(){
			var itemTmpl = this._super();
			if(itemTmpl){
				itemTmpl.addClass("juci_delete_visible");
			}
			return itemTmpl;
		},
	};
	this.extend(tasklist, juci.controls.list);
	juci.controls.tasklist = tasklist;

	/**
		@namespace
		@name statList
		@exports statList as statlist
		@augments xlist
		@description A list of items with a statistic(Number) shown in a contrasting format with a title.
		@dataattribute {String} data-juci {String} A string with value <i>statlist</i>.
		@dataattribute {String} data-titles Add #hidden
		@dataattribute {String} data-subtitle Add #hidden
		@dataattribute {String} data-subtitles Add #hidden
		@dataattribute {String} data-stat Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Creates a stat for each item based on with the return value of the expression as the content.
		@dataattribute {String} data-flag-css CSS class for the stat. See <a href="http://knockoutjs.com/documentation/css-binding.html" target="_blank">css expression binding</a>
		@css .juci_statlist_item
		@css .juci_statlist_item.touch
		@css .juci_statlist_stat
		@css .juci_statlist_stat.touch
		@example #html <div data-juci="statlist" data-bind="ref: contents" data-stat="count" data-title="name"
			data-stat-css="{juci_green: count() >= 10 && count() < 50,
				juci_red: count() > 250,
				juci_orange: count() <= 100 && count() > 50}"
		></div>
		#js juci.addDataset("contents", [
		{"name": "IKEA Gold Cartons", "count": 70},
		{"name": "PepsiCo(7Up) Cartons", "count": 10},
		{"name": "Amulya Rice Bags", "count": 5},
		{"name": "Vilasya Toolkit Boxes", "count": 100},
		{"name": "Indigo Nation Boxes", "count": 450}
	]
);
	*/
	var statList = function(elem){
		this._super = juci.controls.xlist;
		this._super(elem);
	}
	statList.prototype = {
		type: "statlist",
		Events: juci.controls.list.prototype.Events.concat("statclick"),
		ListItemTemplate: "<li data-juci='listitem' class='juci_no_linker juci_parent'></li>",
		getListItemTemplate: function(){
			// Get action
			var stat = this.j.getAttr("data-stat");
			var statClass = this.j.getAttr("data-stat-css");
			var title = this.j.attr("data-title");
			var itemTmpl = this.j.children("[data-juci=listitem]")[0];
			if(!itemTmpl){
				itemTmpl = new juci.elem(this.ListItemTemplate).appendTo(this.j);
			}
			if(title){
				this.addItemTitle(itemTmpl, title);
			}
			var ctr = new juci.elem("<div class='juci_statlist_container juci_float_right'></div>").appendTo(this.j);
			var hCtr = new juci.elem("<div class='juci_statlist_titlesContainer'></div>").appendTo(ctr);
			itemTmpl.children().forEach(function(c){
				hCtr.append(c);
			});
			ctr.appendTo(itemTmpl);
			ctr.append(new juci.elem("<div class='juci_statlist_statContainer'>" +
				"<div><div class='juci_statlist_stat juci_flag'></div></div></div>"));
			itemTmpl.find(".juci_statlist_stat")[0].attr("data-bind","display: "+stat + ", css:" + statClass);
			return itemTmpl;
		},
		postInitializeList: function(){
			this._super();
			this.addListItemClick(this.fireStatActionClick, this, ".juci_statlist_stat");
		},
		fireStatActionClick: function(e){
			var evt = new EventObject(e, e);
			this.fireEvent("statclick", evt);
		},
		/**
			@memberOf statlist.prototype
			@description Registers a handler function to call when the {@link statlist#event:statclick} event fires.
			@param {Function} handler A handler function to execute when the event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see statlist#event:statclick
		*/
		onStatClick: function(fp, ctx){
			this.addListener("statclick", fp, ctx);
		},
		showDeleteForIndex: juci.utils.EmptyMethod,
		showDeleteForIndices: juci.utils.EmptyMethod,
		hideDeleteForIndex: juci.utils.EmptyMethod,
		hideDeleteForIndices: juci.utils.EmptyMethod,
		setFlagForIndex: juci.utils.EmptyMethod,
		setFlagForIndices: juci.utils.EmptyMethod,
		resetFlagForIndex: juci.utils.EmptyMethod,
		resetFlagForIndices: juci.utils.EmptyMethod
	};
	{
		/**
			@memberOf actionablelist.prototype
			@name statclick
			@event
			@description Fires when user taps on the action in an statlist item.
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data Data for the item.
			@param {Object} eventObj.wrappedData The mapped data for the item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
	}
	this.extend(statList, juci.controls.list);
	juci.controls.statlist = statList;

	/**
		@namespace
		@name imageList
		@exports imageList as imagelist
		@augments xlist
		@description A list of items with an image in addition to titles and subtitles.
		@dataattribute {String} data-juci A string with value <i>imagelist</i>.
		@dataattribute {String} data-img Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Appears as an image in each item.
		@dataattribute {String} data-img-css CSS class for the image. See <a href="http://knockoutjs.com/documentation/css-binding.html" target="_blank">css expression binding</a>
		@dataattribute {String} data-img-onload Name of function defined on the window scope. Added as a listener for {@link catalog#event:imageload}.
		@dataattribute {String} data-img-onerror Name of function defined on the window scope. Added as a listener for {@link catalog#event:imageerror}.
		@css .juci_imagelist_item
		@css .juci_imagelist_item.touch
		@example #html <div data-juci="imagelist" data-bind="ref: imgs" data-img="img" data-title="title" onlistitemclick="$m.toast('U clicked - '+ event.data.title);"></div>
		#js juci.addDataset("imgs", [
	{img: "image1.png", "title":"First item"},
	{img: "image2.png", "title":"Second item"}
]);
	*/
	var imageList = function(elem){
		this._super = juci.controls.xlist;
		this._super(elem);
	}
	imageList.prototype = {
		type: "imagelist",
		Events: juci.controls.list.prototype.Events.concat("imageclick"),
		getListItemTemplate: function(){
			var itemTmpl = this._super();
			// Get image
			// TODO Customize image showing
			var imgRef = this.j.attr("data-img");
			var imgClass = this.j.attr("data-img-css");
			var imgError = window[this.j.attr("data-img-onerror")];
			var imgLoad = window[this.j.attr("data-img-onload")];
			if(imgError){
				this.addListener("imageerror", imgError);
			}
			if(imgLoad){
				this.addListener("imageload", imgLoad);
			}
			var ctr = new juci.elem(this.getListContainer()).appendTo(this.j);
			var hCtr = new juci.elem(this.getTitlesContainer()).appendTo(ctr);
			itemTmpl.children().forEach(function(c){
				hCtr.append(c);
			});
			ctr.appendTo(itemTmpl);
			ctr.prepend(new juci.elem(this.getImageContainer(imgLoad, imgError)));
			var img = itemTmpl.find(".juci_"+this.type+"_image img")[0];
			var ll = this._getImageEventHelper();
			img.attr("data-bind","img: "+imgRef + ", css:" + imgClass);
			img.attr("onload", ll);
			img.attr("onerror", ll);
			return itemTmpl;
		},
		getListContainer: function(){
			return "<div class='juci_imagelist_container juci_float_left'></div>";
		},
		getTitlesContainer: function(){
			return "<div class='juci_imagelist_titlesContainer'></div>";
		},
		getImageContainer: function(imgLoad, imgError){
			return "<div class='juci_"+this.type+"_imageContainer'>" +
				"<div class='juci_"+this.type+"_image juci_image_container'><div class='juci_image_overlay'></div><div class='juci_img_middler'><img onload='"+imgLoad+"' onerror='"+imgError+"'></img></div></div></div>";
		},
		postInitializeList: function(){
			this._super();
			this.addListItemClick(this.fireActionClick, this, ".juci_"+this.type+"_image");
		},
		fireActionClick: function(e){
			var evt = new EventObject(e, e);
			this.fireEvent("imageclick", evt);
		},
		/**
			@memberOf imagelist.prototype
			@description Registers a handler function to call when the {@link imagelist#event:imageclick} event fires.
			@param {Function} handler A handler function to execute when the event fires.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
			@see imagelist#event:imageclick
		*/
		onImageClick: function(fp, ctx){
			this.addListener("imageclick", fp, ctx);
		}
	};
	{
		/**
			@memberOf imagelist.prototype
			@name imageload
			@event
			@description Fires when an image in a list item has finished loading.
			@note This event cannot be listened to in html through <i>onimageload</i>. Use <i>data-img-on-load</i>.
			@param {EventObject} eventObj
			@param {Object} eventObj.data The item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
		/**
			@memberOf imagelist.prototype
			@name imageerror
			@event
			@description Fires when an image in a list item has finished loading with errors.
			@note This event cannot be listened to in html through <i>onimageerror</i>. Use <i>data-img-on-error</i>.
			@param {EventObject} eventObj
			@param {Object} eventObj.data The item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
		/**
			@memberOf imagelist.prototype
			@name imageclick
			@event
			@description Fires when user taps on the image in an imagelist item.
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.data Data for the item.
			@param {Object} eventObj.wrappedData The mapped data for the item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
	}
	this.extend(imageList, juci.controls.list);
	juci.controls.imagelist = imageList;

	/**
		@namespace
		@name imageBoard
		@exports imageBoard as imageboard
		@augments imagelist
		@description A list of items with an image in addition to titles and subtitles displayed as columned list which resizes based on form-factor of the device.
		@dataattribute {String} data-juci A string with value <i>imageboard</i>.
		@css .juci_imageboard_image
		@css .juci_imageboard_image.touch
		@css juci_imageboard_listPane
		@example #html <div data-juci="imageboard" data-bind="ref: imgs" data-img="img" data-title="title" onlistitemclick="$m.toast('U clicked - '+ event.data.title);"></div>
		#js juci.addDataset("imgs", [
	{img: "image1.png", "title":"First item"},
	{img: "image2.png", "title":"Second item"}
]);
	*/
	var imageBoard = function(elem){
		this._super = juci.controls.imagelist;
		this._super(elem);
	}
	imageBoard.prototype = {
		type: "imageboard",
		ListItemTemplate: "<li data-juci='listitem' class='juci_no_linker juci_no_bg'></li>",
		getListContainer: function(){
			return "<div class='juci_imageboard_container juci_image_container'></div>";
		},
		getListItemTemplate: function(){
			var itemTmpl = this._super();
			if(itemTmpl){
				itemTmpl.addClass("juci_no_linker juci_no_bg");
			}
			return itemTmpl;
		},
		getTitlesContainer: function(){
			return "<div class='juci_imageboard_titlesContainer'></div>";
		},
		postInitializeList: function(){
			this._super();
			this.removeListItemClick(this.fireActionClick, this, ".juci_"+this.type+"_image");
			this.addListItemClick(this.fireListItemClick, this, ".juci_"+this.type+"_image");
		},
		showDeleteForIndex: juci.utils.EmptyMethod,
		showDeleteForIndices: juci.utils.EmptyMethod,
		hideDeleteForIndex: juci.utils.EmptyMethod,
		hideDeleteForIndices: juci.utils.EmptyMethod,
		setFlagForIndex: juci.utils.EmptyMethod,
		setFlagForIndices: juci.utils.EmptyMethod,
		resetFlagForIndex: juci.utils.EmptyMethod,
		resetFlagForIndices: juci.utils.EmptyMethod
	};
	this.extend(imageBoard, juci.controls.imagelist);
	juci.controls.imageboard = imageBoard;
	{
		/**
			@methodOf imageboard.prototype
			@name onImageClick
			@hidden
		*/
		/**
			@memberOf imageboard.prototype
			@name imageclick
			@event
			@hidden
		*/
	}

	/**
		@namespace
		@name photo
		@augments basecontrol
		@description photo is a juci widget built for taking or choosing photos from the device using <i>$m</i> APIs in a user friendly and easy manner. Tapping on the container pops up a confirm dialog to choose or take picture from the device.
		@dataattribute {String} data-juci A string with value <i>photo</i>.
		@dataattribute {Boolean} data-uri True for <a href="https://developer.mozilla.org/en-US/docs/data_URIs?redirectlocale=en-US&redirectslug=The_data_URL_scheme" _target="blank">data uri</a> string, else URL reference by default.
		@dataattribute {Object} data-photo-options {Object} Configuration for the photo #see $m.choosePic #see $m.takePic #example #html data-photo-options="width: 300, height: 400" #example
		@note Requires <i>mowbly</i> to be loaded.
		@html <div data-juci="photo" data-label="Photo"></div>
		@html <div data-juci="photo" data-label="Databound" data-bind="ref: photo" data-uri="true"></div>
		@csshtml <div data-juci="photo" data-label="Photo" class="juci_basecontrol juci_photo">
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Photo</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_ctrl_box">
		<div class="juci_photo_container">
			<div class="juci_photo_overlay touch">
				<div class="juci_photo_overlay_container" style="display: none;">
					<div class="juci_photo_placeholder_text">TAP TO CHOOSE</div>
				</div>
			</div>
			<div class="juci_photo_clear">
				<img src="../system/libs/mowbly/img/delete-L.png"/>
			</div>
			<img class="juci_photo_box" src="" style="display: none;">
			<img src="../system/libs/mowbly/img/default-cam.png" class="juci_photo_box juci_photo_placeholder">
		</div>
	</div>
</div>
		@see attachment
	*/
	var photo = function(elem){
		if(!window.mowbly){
			return null;
		}
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	// Static methods
	photo.bIsCameraAvailable = undefined;
	photo.getConfirmOptions = function(callback, context){
		var that = this;
		if(typeof this.bIsCameraAvailable == "undefined"){
			mowbly.getCamConfig(function(r){
				var message, buttons;
				if(r.result.length == 0){
					buttons = [{"label":"Choose"}, {"label":"Cancel"}]
					message = "Tap 'Choose' to select a picture from gallery."
					that.bIsCameraAvailable = false;
				}
				else{
					buttons = [{"label":"Capture"}, {"label":"Choose"}, {"label":"Cancel"}];
					message = "Tap 'Capture' to capture a picture or 'Choose' to select a picture from gallery.";
					that.bIsCameraAvailable = true;
				}
				that._oConfirm = {"title":"Select Picture",
					"message": message,
					"buttons": buttons,
				};
				//that.options = {'allowEdit':false, 'multiple':false, 'filePath':'','type':__mowbly__.Camera.TYPE_JPG, 'quality':__mowbly__.Camera.QUALITY_HIGH, 'width':320, 'height':480};
				callback.call(context, that._oConfirm, that.bIsCameraAvailable);
			});
		}else{
			callback.call(context, that._oConfirm, that.bIsCameraAvailable);
		}
	}
	photo.showPrompt = function(onPictureAvailableListener, control){
		// if first click set confirm options based on device camera availability
		this.getConfirmOptions(function(confirmObj, bIsCameraAvailable){
			// TODO pass the confirm options in event before using it to open camera
			// TODO provide a way to directly open camera or gallery
			var cb = juci.utils.getCallback(onPictureAvailableListener, control);
			mowbly.confirm(confirmObj, function(option){
				var options = control.extendOptions();
				if(bIsCameraAvailable){
					if(option == 0){
						mowbly.capturePic(options, cb);
					}else if(option == 1){
						mowbly.choosePic(options, cb);
					}else{
						control.fireEvent("cancel");
					}
				}else{
					if(option == 0){
						mowbly.choosePic(options, cb);
					}else{
						control.fireEvent("cancel");
					}
				}
			});
		});
	}
	photo.prototype = {
		type: "photo",
		DefaultValue: null,
		getDefaultValue: function(){
			return new Function("return " + this.j.getAttr("data-value", this.DefaultValue))();
		},
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol"]);
			juci.utils.arrayPushAll(r.map, ["ref"]);
			juci.utils.arrayPushAll(r.defaults, ['""']);
			return r;
		},
		DefaultOptions: {'allowEdit':false, 'multiple':false, 'filePath':'','type': window.mowbly ? __mowbly__.Camera.TYPE_JPG : '', 'quality':window.mowbly ? __mowbly__.Camera.QUALITY_HIGH : "", 'width':320, 'height':480},
		// Prototype
		init: function(){
			// Create elem with label. ctrl box is an div with image inside. Clicking on div opens mowbly prompt to capture/choose pic
			// If no value is set, set image to default camera
			// Create confirm options on first click
			// value bindings same as image
			if(this._ds){
				this.j.attr("data-bind", this.getDatabindString());
			}
			this._bIsUri = this.j.getAttr("data-uri",false);
			this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			var container = new juci.elem('<div class="juci_ctrl_box"></div>').appendTo(this.j);
			this._clearImageButton = new juci.elem('<div class="juci_photo_clear"><img src="'+(getSystemPath())+'delete-L.png"/></div>').appendTo(container);
			this._imageContainer = new juci.elem('<div class="juci_photo_container"></div>').appendTo(container);
			this._imageContainer.onClick(this._onContainerClick, this, ".juci_photo_container");
			this._overlay = new juci.elem('<div class="juci_photo_overlay"><div class="juci_photo_overlay_container"><div class="juci_photo_placeholder_text">TAP TO CHOOSE</div></div></div>').appendTo(this._imageContainer);
			this._overlay.paddingBox = this._overlay.firstChild();
			var imgC = this._clearImageButton.firstChild();
			this._imageContainer.onTouchStart(function(){imgC.attr("src", (getSystemPath())+'delete-L-touch.png');}, this, ".juci_photo_clear");
			this._imageContainer.onTouchCancel(function(){imgC.attr("src", (getSystemPath())+'delete-L.png');}, this, ".juci_photo_clear")
			this._imageContainer.onClick(this._onClearClick, this, ".juci_photo_clear");
			this._imageContainer.onClick(function(){imgC.attr("src", (getSystemPath())+'delete-L.png');}, this, ".juci_photo_clear")
			this._clearImageButton.hide();
			this._clearImageButton.appendTo(this._imageContainer);
			this.i = new juci.elem('<img class="juci_photo_box"/>').appendTo(this._imageContainer);
			var placeholder = this.j.getAttr("placeholder", getSystemPath() + "default-cam.png");
			this._placeholder = new juci.elem('<img src="' +  placeholder + '" class="juci_photo_box juci_photo_placeholder"/>').appendTo(this._imageContainer);
			this.i.onLoad(this._onImageLoad, this);
			this.i.onError(this._onImageError, this);
			var optsStr = this.j.attr("data-photo-options");
			if(optsStr){
				this.defaultOptions = new Function("return {" + optsStr + "}")();
			}else{
				this.defaultOptions = {};
			}
			if(this._bIsUri){
				this.defaultOptions.readData = true;
			}
			this.value(this._val);
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(["start", "cancel", "finish", "photoload", "photoerror", "photooptions"]),
		// TODO Customize image showing
		_onImageLoad: function(e){
			// Fire load event
			var evt = new EventObject(e, e);
			evt.img = this.i;
			this.fireEvent("photoload", evt);
			this.i.show();
			this._placeholder.hide();
		},
		_onImageError: function(e){
			var evt = new EventObject(e, e);
			evt.control = this;
			if(this.i.val()){
				this.fireEvent("photoerror", evt);
				this.i.show();
				this._placeholder.hide();
			}
		},
		enable: function(){
			this._imageContainer.enable();
			this._super();
		},
		disable: function(){
			this._imageContainer.disable();
			this._super();
		},
		_onContainerClick: function(){
			this.fireEvent("start", {img: this.i});
			juci.controls.photo.showPrompt(this._onPictureAvailable, this);
		},
		_onPictureAvailable: function(r){
			if(r.result){
				var val = this._bIsUri ? r.result.data : r.result.path;
				var oldVal = this.i.val();
				this.__fireBeforeChange(oldVal, val);
				this.fireEvent("finish", {img: this.i});
			}else{
				r.img = this.i;
				this.fireEvent("cancel", r);
			}
		},
		_onClearClick: function(){
			this.__fireBeforeChange(this.i.val(), null);
		},
		value: function(val, bRefresh){
			var currVal = this.i.val();
			if(this._bIsUri){
				if(typeof val == "undefined"){
					var value = this.i.val();
					return this._returner(value ? value.replace("data:;base64,", "") : value);
				}else{
					this.i.val((val != null) ? ("data:;base64," + val) :"");
				}
			}else{
				if(typeof val == "undefined"){
					return this.i.val();
				}else{
					if(val != null){
						this.i.val(this._formatter(val));
					}
				}
			}
			this.i.hide();
			this._placeholder.show();
			if(val === null){
				this._overlay.paddingBox.show();
				this.j.addClass("juci_photo_empty");
				this._clearImageButton.hide();
			}else{
				this._overlay.paddingBox.hide();
				this.j.removeClass("juci_photo_empty");
				this._clearImageButton.show();
				if(currVal == this.i.val()){
					this.i.show();
		 			this._placeholder.hide();
				}
			}
		},
		extendOptions: function(){
			var evt = new EventObject();
			// TODO take default options as data-photo-options
			evt.options = juci.utils.extendOptions(this.defaultOptions, this.DefaultOptions);
			this.fireEvent("photooptions", evt);
			return evt.options;
		},
		showDelete: juci.utils.EmptyMethod,
		hideDelete: juci.utils.EmptyMethod,
		setFlag: juci.utils.EmptyMethod,
		resetFlag: juci.utils.EmptyMethod
	}
	{
		/**
			@memberOf photo.prototype
			@name photoload
			@event
			@description Fires when the chosen picture is loaded successfully in the photo control.
			@param {EventObject} eventObj
			@param {juci.elem} eventObj.img The image element on which the picture is loaded.
		*/
		/**
			@memberOf photo.prototype
			@name photoerror
			@event
			@description Fires when the chosen picture is loaded with errors in the photo control.
			@param {EventObject} eventObj
			@param {juci.elem} eventObj.img The image element on which the picture is loaded.
		*/
		/**
			@memberOf photo.prototype
			@name photooptions
			@event
			@description Fires before the user is directed to the camera or a gallery.
			@param {EventObject} eventObj
			@param {Object} eventObj.options The configuration for <i>$m.choosePic()</i> and <i>$m.capturePic()</i>.
		*/
		/**
			@memberOf photo.prototype
			@name start
			@event
			@description Fires when the user taps on the control to start choosing or taking a picture. Can be used to update user interface.
			@param {EventObject} eventObj
			@param {juci.elem} eventObj.img The image element on which the picture is loaded.
		*/
		/**
			@memberOf photo.prototype
			@name finish
			@event
			@description Fires after the user has chosen or taken a picture successfully. Can be used to update user interface.
			@param {EventObject} eventObj
			@param {juci.elem} eventObj.img The image element on which the picture is loaded.
		*/
		/**
			@memberOf photo.prototype
			@name cancel
			@event
			@description Fires when the user has cancelled choosing or taking a picture. Can be used to update user interface.
			@param {EventObject} eventObj
			@param {juci.elem} eventObj.img The image element on which the picture is loaded.
		*/
	}
	this.extend(photo, juci.controls.basecontrol);
	juci.controls.photo = photo;

	/**
		@namespace
		@augments xlist
		@name attachment
		@description attachment is a juci widget built for adding multiple photos from the device using <i>$m</i> APIs in a user friendly and easy manner. This can be used to collect and attach multiple items to a form.
		@dataattribute {String} data-juci A string with value <i>attachment</i>.
		@dataattribute {Boolean} data-uri True for <a href="https://developer.mozilla.org/en-US/docs/data_URIs?redirectlocale=en-US&redirectslug=The_data_URL_scheme" _target="blank">data uri</a> string, else URL reference by default.
		@dataattribute {Object} data-photo-options Configuration for the photo #see $m.choosePic #see $m.takePic #example #html data-photo-options="width: 200, height: 100" #example
		@dataattribute {String} data-img Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Appears as an image in each attached item.
		@dataattribute {String} data-img-css CSS class for the image. See <a href="http://knockoutjs.com/documentation/css-binding.html" target="_blank">css expression binding</a>
		@dataattribute {String} data-img-onload Name of function defined on the window scope. Added as a listener for {@link attachment#event:imageload}.
		@dataattribute {String} data-img-onerror Name of function defined on the window scope. Added as a listener for {@link attachment#event:imageerror}.
		@dataattribute {String} data-title Name of reference or an expression with the reference, defined using {@link juci#addDataset}. Appears as a title in each attached item.
		@note Requires <i>mowbly</i> to be loaded.
		@html <div data-juci="attachment" data-label="Attach!"></div>
		@html <div data-juci="attachment" data-label="Attachment" data-bind="ref: atc"></div>
		@html <div data-juci="attachment" data-bind="ref: atcuris" data-uri="true" data-label="Attachments with URI!"></div>
		@see photo
	*/
	// TODO Use File manager widget to open and choose file
	var attachment = function(elem){
		if(!window.mowbly){
			return null;
		}
		this._super = juci.controls.xlist;
		this._super(elem);
	}
	attachment.prototype = {
		type: "attachment",
		DefaultValue: null,
		getDefaultValue: function(){
			return new Function("return " + this.j.getAttr("data-value", this.DefaultValue))();
		},
		DefaultAttachmentName: "function(item){return item.name;}",
		DefaultAttachmentValue: "function(item){return item.val}",
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol"]);
			juci.utils.arrayPushAll(r.map, ["ref"]);
			juci.utils.arrayPushAll(r.defaults, [this._dsId, this.DefaultAttachmentName, this.DefaultAttachmentValue]);
			return r;
		},
		Events: juci.controls.list.prototype.Events.concat(["start", "cancel", "finish", "addclick", "itemselect", "photooptions"]),
		beforeInit: function(){
			juci.controls.prependLabel(this.j);
		},
		init: function(){
			this._dsId = "__j_" + this.type + this.j.getId();
			if(this._ds){
				this.j.attr("data-bind", this.getDatabindString());
				if(!this._ds.ref){
					juci.viewModel.addDataset(this._dsId, []);
					this._ds.ref = "$root."+this._dsId;
				}
			}else{
				juci.viewModel.addDataset(this._dsId, []);
				this.j.attr("data-bind", this.getDefaultDatabindString());
				this._ds = {"ref": "$root."+this._dsId};
			}
			this._bIsUri = this.j.getAttr("data-uri",false);
			/*
				<li data-juci="listitem">
					<div class="juci_attachment_thumb"><img src="../img/Contact.png"/></div>
					<div class="juci_attachment_name"></div>
					<div class="juci_attachment_delete"><img src="../img/delete.png"/></div>
				</li>
			*/
			var container = new juci.elem("<div class='juci_ctrl_box'></div>").appendTo(this.j);
			var buttonBar = new juci.elem("<div class='juci_horizontal_bbar'></div>").appendTo(container);
			var addButton = new juci.button({value: "Add", parent: buttonBar});
			var clearAllButton = new juci.button({value: "Clear", parent: buttonBar});
			var placeholder = this.j.getAttr("placeholder", "No attachments");
			this.j.append("<div class='juci_ctrl_separator'></div>");
			this.j.append("<div class='juci_xlist_placeholder juci_attachment_placeholder' data-bind='show: "+this._ds.ref+" && "+this._ds.ref+"() && "+this._ds.ref+"().length == 0'>"+placeholder+"</div>");
			addButton.onClick(this._onAddClick, this);
			clearAllButton.onClick(this.removeAll, this);
			var optsStr = this.j.attr("data-photo-options");
			if(optsStr){
				this.defaultOptions = new Function("return {" + optsStr + "}")();
			}else{
				this.defaultOptions = {};
			}
			this._super();
		},
		initPlaceholder: juci.utils.EmptyMethod,
		getListItemTemplate: function(){
			// Get image data option and title data option
			// TODO Customize image showing
			var imgRef = this.j.attr("data-img");
			var titleRef = this.j.attr("data-title");
			var imgClass = this.j.attr("data-img-css");
			var imgError = window[this.j.attr("data-img-onerror")];
			var imgLoad = window[this.j.attr("data-img-onload")];
			if(imgError){
				this.addListener("imageerror", imgError);
			}
			if(imgLoad){
				this.addListener("imageload", imgLoad);
			}
			var itemTmpl = new juci.elem('<li class="juci_attachment_item juci_no_linker juci_no_bg">' +
					'<div class="juci_attachment_thumb"><img/></div>' +
					'<div class="juci_attachment_name" data-bind="html:'+(titleRef ? titleRef : 'name')+'"></div>' +
					'<div class="juci_attachment_delete juci_delete_icon"></div>' +
				"</li>").appendTo(this.j);
			var img = itemTmpl.find("img")[0];
			var ll = this._getImageEventHelper();
			img.attr("data-bind", "img: " + (this._bIsUri ? ("'data:;base64,'+" + (imgRef ? imgRef : 'val')) : (imgRef ? imgRef : 'val')) + ", css: "+imgClass);
			img.attr("onload", ll);
			img.attr("onerror", ll);
			return itemTmpl;
		},
		postInitializeList: function(){
			var dataNew = this.j.attr("data-new-item");
			if(dataNew != null){
				this._newDataFunc = window[dataNew];// new Function("val, name", dataNew);
			}else{
				this._newDataFunc = function(val, name){return {val: val, name: name} };
			}
			this.addListItemClick(this._onItemClick, this, ".juci_attachment_item");
			this.addListItemClick(this._onDeleteClick, this, ".juci_attachment_delete");
		},
		afterRender: function(elements, item, index){
			var itElem = new juci.elem(elements[0]);
			var evt = new EventObject({"item": itElem, "data": ko.mapping.toJS(item), "index": index})
			this.fireEvent("afterrender", evt);
		},
		_onAddClick: function(){
			var evt = new EventObject();
			this.fireEvent("addclick", evt);
			if(!evt.isCancelled()){
				this.doAdd();
			}
		},
		doAdd: function(){
			this.fireEvent("start");
			juci.controls.photo.showPrompt(this._onPictureAvailable, this);
		},
		_onItemClick: function(e){
			var evt = new EventObject(e, e);
			this.fireEvent("itemselect", evt);
		},
		_onPictureAvailable: function(r){
			if(r.result){
				var val = this._bIsUri ? r.result.data : r.result.path;
				var path = r.result.path;
				var name = path.slice(path.lastIndexOf("/")+1, path.length);
				var changedItem = this._newDataFunc(val, name);
				this.addItem(changedItem, this._valueAccessor().length, false);
				this.fireEvent("finish");
			}else
				this.fireEvent("cancel", r);
		},
		DefaultOptions: {'allowEdit':false, 'multiple':false, 'filePath':'','type': window.mowbly ? __mowbly__.Camera.TYPE_JPG : '', 'quality':window.mowbly ? __mowbly__.Camera.QUALITY_HIGH : "", 'width':320, 'height':480},
		extendOptions: function(){
			var evt = new EventObject();
			evt.options = juci.utils.extendOptions(this.defaultOptions, this.DefaultOptions);
			this.fireEvent("photooptions", evt);
			return evt.options;
		},
		showDeleteForIndex: juci.utils.EmptyMethod,
		showDeleteForIndices: juci.utils.EmptyMethod,
		hideDeleteForIndex: juci.utils.EmptyMethod,
		hideDeleteForIndices: juci.utils.EmptyMethod,
		setFlagForIndex: juci.utils.EmptyMethod,
		setFlagForIndices: juci.utils.EmptyMethod,
		resetFlagForIndex: juci.utils.EmptyMethod,
		resetFlagForIndices: juci.utils.EmptyMethod
	}
	{
		/**
			@memberOf attachment.prototype
			@name photooptions
			@event
			@description Fires before the user is directed to the camera or a gallery.
			@param {EventObject} eventObj
			@param {Object} eventObj.options The configuration for <i>$m.choosePic()</i> and <i>$m.capturePic()</i>.
		*/
		/**
			@memberOf attachment.prototype
			@name start
			@event
			@description Fires when the user taps on the add to start choosing or taking a picture. Can be used to update user interface.
			@param {EventObject} eventObj
		*/
		/**
			@memberOf attachment.prototype
			@name finish
			@event
			@description Fires after the user has chosen or taken a picture successfully. Can be used to update user interface.
			@param {EventObject} eventObj
		*/
		/**
			@memberOf attachment.prototype
			@name cancel
			@event
			@description Fires when the user has cancelled choosing or taking a picture. Can be used to update user interface.
			@param {EventObject} eventObj
		*/
		/**
			@memberOf attachment.prototype
			@name addclick
			@event
			@flag Cancellable
			@description Fires when the user has clicked on "Add".
			@param {EventObject} eventObj
		*/
		/**
			@memberOf attachment.prototype
			@name itemselect
			@event
			@description Fires when the user has clicked on an item in the attachment list.
			@param {EventObject} eventObj
			@param {Number} eventObj.index Index of the item.
			@param {Object} eventObj.item The item that has been selected.
			@param {juci.listItem} eventObj.listItem The element that has been selected.
		*/
		/**
			@memberOf attachment.prototype
			@name imageload
			@event
			@description Fires when an image in a list item has finished loading.
			@note This event cannot be listened to in html through <i>onimageload</i>. Use <i>data-img-on-load</i>.
			@param {EventObject} eventObj
			@param {Object} eventObj.data The item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
		/**
			@memberOf attachment.prototype
			@name imageerror
			@event
			@description Fires when an image in a list item has finished loading with errors.
			@note This event cannot be listened to in html through <i>onimageerror</i>. Use <i>data-img-on-error</i>.
			@param {EventObject} eventObj
			@param {Object} eventObj.data The item.
			@param {juci.elem} eventObj.listItem The element for the item.
		*/
	}
	this.extend(attachment, juci.controls.list);
	juci.controls.attachment = attachment;

	/**
		@namespace
		@name calendar
		@augments basecontrol
		@description calendar widget displays a calendar in a user friendly interface which adjusts for different form factors. The control includes APIs to set date, month, year and start of week<br/> set styles for different dates <br/> and pick a date.
		@dataattribute {String} data-juci A string with value <i>calendar</i>.
		@html <div data-juci="calendar"></div>
		@note Use only one calendar so that the user does not get overwhelmed with other controls in that page.
		@css .juci_date
		@css .juci_date.selected
		@css .juci_date.today
	*/
	var calendar = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	// Static
	calendar.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	// TODO Document calendar panel
	/**#nocode+*/
	juci.getCalendarPanel = calendar.getCalendarPanel = function(){
		var calendarPanel = juci.getPanel("juci_calendar_panel");
		if(!calendarPanel){
			var btn;
			calendarPanel = new juci.panel(new juci.elem("<div class='juci_calendar_panel' id='juci_calendar_panel'><div data-juci='juci_calendar' id='juci_calendar'></div><div class='juci_vertical_bbar juci_calendar_bbar'><button class='juci_button'>Clear</button></div></div>"));
			calendarPanel.openCalendar = function(title, value, callback, context, options, closeCallback, showClear){
				this.calendar.defaultDate(options.defaultDate);
				this.calendar.setDate(value, true);
				this.listenOnce("close",this._removeSelectListener, this);
				this.listenOnce("close", closeCallback, context);
				this._callback = [callback, context, closeCallback];
				this.listenOnce("dateselect", callback, context);
				if(btn){
					if(showClear){
						btn.show();
					}else{
						btn.hide();
					}
				}else{
					calendarPanel.addListener("init", function(){
						if(showClear){
							btn.show();
						}else{
							btn.hide();
						}
					});
				}
				this.open(title);
			};
			calendarPanel._onDateSelect = function(e, clear){
				this.removeListener("close",this._removeSelectListener, this);
				this.close();
				this.fireEvent("dateselect", {date: clear ? null : e.date, panel: this, calendar: this.calendar});
			};
			calendarPanel._removeSelectListener = function(){
				this.removeListener("dateselect",this._callback[0], this._callback[1]);
				this.removeListener("close",this._callback[2], this._callback[1]);
				delete this._callback;
			}
			calendarPanel.calendar = new juci.controls.calendar(calendarPanel.j.children()[0]);
			calendarPanel.calendar.addListener("dateselect", calendarPanel._onDateSelect, calendarPanel);
			calendarPanel.addListener("init", function(){
				var btnBar = calendarPanel.j.findByClass("juci_calendar_bbar")[0];
				//btnBar.appendTo(calendarPanel.j);
				btn = btnBar.children()[0];
				btn.onClick(function(e){
					calendarPanel._onDateSelect(e, true);
				}, calendarPanel);
			}, calendarPanel);
		}
		return calendarPanel;
	}
	/**#nocode-*/
	// Prototype
	calendar.prototype = {
		type: "calendar",
		init: function(){
			this.j.removeClass("juci_basecontrol");
			// no ref binding
			// Initial date, Start of week,
			var initDate = null, startOfWeek = "Mon";
			if(this._ds){
				initDate = this._ds.initialDate ? new Date(this._ds.initialDate) : null;
				startOfWeek = this._ds.startOfWeek ? this._ds.startOfWeek : "Mon";
			}
			/*
				<div class="juci_ctrl_box">
					<div class="juci_year_month">
						<div class="juci_year">
							<div class="juci_calendar_nav left"></div>
							<div class="juci_calendar_middle"></div>
							<div class="juci_calendar_nav right"></div>
						</div>
						<div class="juci_month">
							<div class="juci_calendar_nav left"></div>
							<div class="juci_calendar_middle"></div>
							<div class="juci_calendar_nav right"></div>
						</div>
					</div>
					<div class="juci_calendar_box">
						<div class="juci_days">
							<div class="juci_day"></div>
							<div class="juci_day"></div>
							<div class="juci_day"></div>
							<div class="juci_day"></div>
							<div class="juci_day"></div>
							<div class="juci_day"></div>
							<div class="juci_day"></div>
						</div>
						<div class="juci_week">
							<div class="juci_date"></div>
							<div class="juci_date"></div>
							<div class="juci_date"></div>
							<div class="juci_date"></div>
							<div class="juci_date"></div>
							<div class="juci_date"></div>
							<div class="juci_date"></div>
						</div>
					</div>
				</div>
			*/
			var container = new juci.elem("<div class=''></div>").appendTo(this.j);
			var yearMonthBox = new juci.elem("<div class='juci_year_month'></div>").appendTo(container);
			this._yearBar = new juci.elem("<div class='juci_year'></div>").appendTo(yearMonthBox);
			this._yearBar.leftNav = new juci.elem("<div class='juci_calendar_nav left'></div>").appendTo(this._yearBar);
			this._yearBar.middle = new juci.elem("<div class='juci_calendar_middle'></div>").appendTo(this._yearBar);
			this._yearBar.rightNav = new juci.elem("<div class='juci_calendar_nav right'></div>").appendTo(this._yearBar);
			this._monthBar = new juci.elem("<div class='juci_month'></div>").appendTo(yearMonthBox);
			this._monthBar.leftNav = new juci.elem("<div class='juci_calendar_nav left'></div>").appendTo(this._monthBar);
			this._monthBar.middle = new juci.elem("<div class='juci_calendar_middle'></div>").appendTo(this._monthBar);
			this._monthBar.rightNav = new juci.elem("<div class='juci_calendar_nav right'></div>").appendTo(this._monthBar);
			this._calBox = new juci.elem("<div class='juci_calendar_box'></div>").appendTo(container);
			this._daysBar = new juci.elem("<div class='juci_days'><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div><div class='juci_day'></div></div>").appendTo(this._calBox);
			this._dayLbls = this._daysBar.findByClass("juci_day");
			this._yearBar.leftNav.onClick(this._onPrevYear, this);
			this._yearBar.rightNav.onClick(this._onNextYear, this);
			this._monthBar.leftNav.onClick(this._onPrevMonth, this);
			this._monthBar.rightNav.onClick(this._onNextMonth, this);
			this._daysBar.addListener("beforetouchstart", juci.utils.stopPropagation);
			this._daysBar.onLongTap(this._openStartOfWeekChooser, this);
			this._yearBar.middle.onLongTap(this._openYearChooser, this);
			this._monthBar.middle.onLongTap(this._openMonthChooser, this);
			this._styles = {};
			this.setStartOfWeek(startOfWeek, true);
			this.initDates();
			this._defaultDate = new Date().toString();
			this._today = Date.nowDate();
			this._currentYear, this._currentMonth, this._val;
			if(initDate == null){
				this.navigateTo(this._today.getFullYear(), this._today.getMonth());
			}else{
				this.setDate(initDate, true);
			}
			this._calBox.onClick(this._onDateClick, this, ".juci_date");
		},
		defaultDate: function(f){
			this._defaultDate = f ? f : this._defaultDate;
			return this._defaultDate;
		},
		enable: function(){
			this._calBox.enable();
		},
		disable: function(){
			this._calBox.disable();
		},
		// TODO remove this kind of code and use selectbox dynamic here
		_openStartOfWeekChooser: function(){
			if(!this._startOfWeekChooserPanel){
				this._startOfWeekChooserPanel = new juci.panel(new juci.elem("<div class='' data-panel-id='"+this._id+"_juci_sOW'>" +
						"<div data-juci='radiogroup' data-label='Choose the starting day of the week.' id='"+this._id+"_juci_soW_radio' data-bind='optionsList: juci_days'></div>" +
					"</div>")
				);
				juci.dataset("juci_days", Date.CultureInfo.dayNames);
				this._startOfWeekChooserPanel.addListener("open", this._onOpenStartOfWeekChooser, this);
				this._startOfWeekChooserPanel.addListener("close", this._onCloseStartOfWeekChooser, this);
				this._startOfWeekChooserPanel.listenOnce("init", function(){
					juci.getControl(this._id+"_juci_soW_radio").onAfterChange(juci.closePanel, juci);
				}, this);
			}
			this._startOfWeekChooserPanel.open("Start of week");
		},
		_onOpenStartOfWeekChooser: function(){
			juci.getControl(this._id+"_juci_soW_radio").value(Date.CultureInfo.dayNames[Date.CultureInfo.abbreviatedDayNames.indexOf(this._startOfWeek)]);
		},
		_onCloseStartOfWeekChooser: function(){
			//juci.currentDocument.removeClick();
			var val = Date.CultureInfo.abbreviatedDayNames[Date.CultureInfo.dayNames.indexOf(juci.getControl(this._id+"_juci_soW_radio").value())];
			this.setStartOfWeek(val);
		},
		_openYearChooser: function(){
			if(!this._yearChooserPanel){
				this._yearChooserPanel = new juci.panel(new juci.elem("<div class='' data-panel-id='"+this._id+"_juci_yC'>" +
						"<div data-juci='radiogroup' data-label='Choose the year to seek to.' id='"+this._id+"_juci_yC_number' data-bind='optionsList: juci_years'></div>" +
					"</div>")
				);
				var years = []; // Check perf at http://jsperf.com/adding-to-array. For listeners firing, value checking should be tried with while instead of forEach and stuff
				var i = 1900;
				var diff = 2100 - i;
				do{
					years.push(i++);
				}while(years.length < diff);
				juci.dataset("juci_years", years);
				this._yearChooserPanel.addListener("open", this._onOpenYearChooser, this);
				this._yearChooserPanel.addListener("close", this._onCloseYearChooser, this);
				this._yearChooserPanel.listenOnce("init", function(){
					juci.getControl(this._id+"_juci_yC_number").onAfterChange(juci.closePanel, juci);
				}, this);

			}
			this._yearChooserPanel.open("Year");
		},
		_onOpenYearChooser: function(){
			juci.getControl(this._id+"_juci_yC_number").value(this._currentYear);
			var selOpt = juci.getControl(this._id+"_juci_yC_number")._selectedOption;
			juci.utils.setTimeout(selOpt.scrollIntoView, selOpt, 50);
		},
		_onCloseYearChooser: function(){
			//juci.currentDocument.removeClick();
			var val = juci.getControl(this._id+"_juci_yC_number").value();
			if(val > 0){
				this.setYear(val);
			}
		},
		_openMonthChooser: function(){
			if(!this._monthChooserPanel){
				this._monthChooserPanel = new juci.panel(new juci.elem("<div class='' data-panel-id='"+this._id+"_juci_mC'>" +
						"<div data-juci='radiogroup' data-label='Choose month of the year to seek to.' id='"+this._id+"_juci_mC_radio' data-bind='optionsList: juci_months'></div>" +
					"</div>")
				);
				juci.dataset("juci_months", Date.CultureInfo.monthNames);
				this._monthChooserPanel.addListener("open", this._onOpenMonthChooser, this);
				this._monthChooserPanel.addListener("close", this._onCloseMonthChooser, this);
				this._monthChooserPanel.listenOnce("init", function(){
					juci.getControl(this._id+"_juci_mC_radio").onAfterChange(juci.closePanel, juci);
				}, this);
			}
			this._monthChooserPanel.open("Month");
		},
		_onOpenMonthChooser: function(){
			juci.getControl(this._id+"_juci_mC_radio").value(Date.CultureInfo.monthNames[this._currentMonth]);
		},
		_onCloseMonthChooser: function(){
			var val = juci.getControl(this._id+"_juci_mC_radio").value();
			this.setMonth(val);
		},
		_onPrevYear: function(){
			this.navigateTo(this._currentYear - 1, this._currentMonth);
		},
		_onNextYear: function(){
			this.navigateTo(this._currentYear + 1, this._currentMonth);
		},
		_onPrevMonth: function(){
			var month = this._currentMonth - 1;
			var year = this._currentYear - (month < 0 ? 1 : 0);
			this.navigateTo(year, (month + 12)%12 );
		},
		_onNextMonth: function(){
			var month = this._currentMonth + 1;
			var year = this._currentYear + (month > 11 ? 1 : 0);
			this.navigateTo(year, month%12);
		},
		/**
			@memberOf calendar.prototype
			@description Sets the month of the calendar.
			@param {Number} month [0-11] Month number to navigate to.
			@fires calendar#event:calendarnavigate
		*/
		setMonth: function(val){
			var month = Date.getMonthNumberFromName(val);
			if(month != this._currentMonth){
				this.navigateTo(this._currentYear, month);
			}
		},
		/**
			@memberOf calendar.prototype
			@description Sets the year of the calendar.
			@param {Number} year [1900-3000] Year to navigate to.
			@fires calendar#event:calendarnavigate
		*/
		setYear: function(year){
			if(year != this._currentYear){
				this.navigateTo(year, this._currentMonth);
			}
		},
		/**
			@memberOf calendar.prototype
			@description Navigates the calendar to the specified year and month.
			@param {Number} year [1900-3000] Year to navigate to.
			@param {Number} month [0-11] Month number to navigate to.
			@fires calendar#event:calendarnavigate
		*/
		navigateTo: function(newYear, newMonth){
			var evt = new EventObject({year: newYear, month: newMonth});
			this.fireEvent("calendarnavigate", evt);
			if(!evt.isCancelled()){
				this._currentYear = parseInt(newYear, 10);
				this._currentMonth = parseInt(newMonth, 10);
				this.refresh();
			}
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(["calendarnavigate", "dateselect"]),
		initDates: function(){
			this._weeks = [];
			this._dates = [];
			for(var i=0;i<6;i++) {
				var week = new juci.elem('<div class="juci_week"></div>').appendTo(this._calBox);
				this._weeks.push(week);
				for(var j=0;j<7;j++){
					var date = new juci.elem('<div class="juci_date"></div>').appendTo(week);
					this._dates.push(date);
				}
			}
		},
		/**
			@memberOf calendar.prototype
			@description Sets the specified day as the start of week.
			@param {String} startOfWeek [Sun, Mon, Tue, Wed, Thu, Fri, Sat] Day to be set as start of the week.
		*/
		setStartOfWeek: function(startOfWeek, bDontRefresh){
			if(startOfWeek != this._startOfWeek){
				var day, days = [];
				var calDays = juci.controls.calendar.days; // TODO Check with unshifting instead of concat later https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/unshift
				do{
					day = calDays.shift();
					days.push(day);
				}while(day && calDays[0] != startOfWeek)
				calDays = calDays.concat(days);
				this._dayLbls.forEach(function(dayLabel, index){
					dayLabel.html(calDays[index]);
				});
				juci.controls.calendar.days = calDays; // Need reassigning since the array ref is cutoff when concat happens
				this._startOfWeek = startOfWeek;
				if(!bDontRefresh){
					this.refresh();
				}
			}
		},
		/**
			@memberOf calendar.prototype
			@description Refreshes and updates the calendar interface with updates styles and selection.
		*/
		refresh: function(){
			var daysInMonth = Date.getDaysInMonth(this._currentYear, this._currentMonth);
			var firstOfMonth = Date.getDateFrom(1, this._currentMonth, this._currentYear);
			var lastOfMonth = Date.getDateFrom(daysInMonth, this._currentMonth, this._currentYear);
			this._yearBar.middle.html(this._currentYear);
			this._monthBar.middle.html(firstOfMonth.getMonthName());
			var day = firstOfMonth.getDayName(true);
			var dayIndex = juci.controls.calendar.days.indexOf(day);
			// If month starts with current start of weeek, then day index should be 1 not 0.
			var dayIndexForLoop = dayIndex = dayIndex ? (1 - dayIndex) : 1;
			var styles = this._styles[this._currentYear] ? this._styles[this._currentYear][this._currentMonth] : null;
			styles = styles ? styles : {};
			this._dates.forEach( function(date){
				if(dayIndexForLoop < 1 || dayIndexForLoop > daysInMonth){
					date.html("");
					date.attr("class", "juci_date");
					date.removeAttr("style");
				}else{
					date.html(dayIndexForLoop);
					date.addClass("juci_date");
					if(typeof styles[dayIndexForLoop] == "string"){
						date.addClass(styles[dayIndexForLoop]);
					}else if(typeof styles[dayIndexForLoop] == "object"){
						date.css(styles[dayIndexForLoop]);
					}else{
						date.attr("class", "juci_date");
						date.removeAttr("style");
					}
				}
				dayIndexForLoop++;
			});
			if(this._selectedLabel) {
				this._selectedLabel.removeClass("selected") ;
			}
			if(this._val && new Date(this._val.toDateString()).between(firstOfMonth, lastOfMonth)){
				this._selectedLabel = this._dates[this._val.getDate() - dayIndex];
				this._selectedLabel.addClass("selected");
			}else{
				delete this._selectedLabel;
			}
			if(this._todayLabel) {
				this._todayLabel.removeClass("today") ;
			}
			if(this._today.between(firstOfMonth, lastOfMonth)){
				this._todayLabel = this._dates[this._today.getDate() - dayIndex];
				this._todayLabel.addClass("today");
			}else{
				delete this._todayLabel;
			}
		},
		/**
			@memberOf calendar.prototype
			@description Sets custom styling on specified dates in the calendar
			@param {Object} styleObj Style configuration. Check the example for more details
			@note To apply the styles, call <i>calendar.refresh()</i>.
			@example #js juci.getControl("my-calendar").setDateStyles({
	"2013" : {
		"0" : {
			"1": { "color" : "blue", "background" : "grey"}
		},
		"11": {
			"20" : "juci_red"
		}
	}
});
			@see calendar#refresh
		*/
		setDateStyles: function(styleObj){
			this._styles = styleObj;
		},
		/**
			@memberOf calendar.prototype
			@description Resets the previously applied date styles.
			@note To reset the styles, call <i>calendar.refresh()</i>.
			@see calendar#refresh
		*/
		resetDateStyles: function(){
			this._styles = {};
		},
		/**
			@memberOf calendar.prototype
			@description Sets selected date in the calendar.
			@param {Date} date Date to be set
			@param {Boolean} bGoToDate True to navigate the calendar to the set date.
		*/
		setDate: function(oDate, bGoToDate){
			this._val = oDate;
			if(oDate){
				this._currentMonth = oDate.getMonth();
				this._currentYear = oDate.getFullYear();
			}else{
				var defaultDate = new Date(this._defaultDate);
				this.navigateTo(defaultDate.getFullYear(), defaultDate.getMonth());
			}
			if(this._selectedLabel) {
				this._selectedLabel.removeClass("selected") ;
			}
			delete this._selectedLabel;
			if(bGoToDate && oDate){
				this.refresh();
			}
		},
		/**
			@memberOf calendar.prototype
			@description Gets the selected date in the calendar
			@return {Date}
		*/
		getDate: function(){
			return this._val;
		},
		_onDateClick: function(e){
			var day = e.delegatee.html();
			if(day > 0){
				var date = Date.getDateFrom(day, this._currentMonth, this._currentYear);
				var obj = new EventObject({date : date.clone()});
				if(this._selectedLabel){
					this._selectedLabel.removeClass("selected");
				}
				this.fireEvent("dateselect", obj);
				if(!obj.isCancelled()){
					e.delegatee.addClass("selected");
					this._selectedLabel = e.delegatee;
					this._val = date;
				}else{
					if(this._selectedLabel){
						this._selectedLabel.addClass("selected");
					}
				}
			}
		}
		/**
			@methodOf calendar.prototype
			@name value
			@hidden
		*/
	}
	{
		/**
			@memberOf calendar.prototype
			@name calendarnavigate
			@event
			@description Fires when navigation occurs due to user action or through API calls.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Number} eventObj.year
			@param {Number} eventObj.month
		*/
		/**
			@memberOf calendar.prototype
			@name dateselect
			@event
			@description Fires when user selects a date in the calendar.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {Date} eventObj.date The selected date.
		*/
	}
	this.extend(calendar, juci.controls.basecontrol);
	juci.controls.calendar = calendar;

	/**
		@namespace
		@name datepicker
		@augments basecontrol
		@description datepicker controls enables user to pick a date by opening a calendar. The calendar is opened after user taps on the control.
		@dataattribute {String} data-juci A string with value <i>datepicker</i>.
		@dataattribute {String} data-picker A string - Default - "cal", other - "dob"
		@html <div data-juci="datepicker" data-label="Datepicker" placeholder="Choose a date"></div>
		@html <div data-juci="datepicker" data-label="Datepicker with binding" data-bind="ref: dated"></div>
		@css .juci_datepicker_box
		@css .juci_datepicker_box.touch
		@csshtml <div data-juci="datepicker" data-label="Datepicker" class="juci_basecontrol juci_datepicker juci_parent">
	<div class="juci_flag_drawer">
		<div class="juci_linker"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Datepicker</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_ctrl_box juci_datepicker_box">Thu Jan 17 2013</div></div>
		@note The default return value for datepicker control is a <i>Date</i> object
		@see calendar
	*/
	var datepicker = function(elem){
		this._super = pickerCtrl;
		this._super(elem);
	}
	datepicker.prototype = {
		type: "datepicker",
		DefaultFormatter: function(date){return date.toString(this._format);},
		DefaultCalendarTitle: '"Pick a date"',
		DefaultPlaceholder: "Pick a date...",
		DefaultValue: null,
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol", "calendarTitle"]);
			juci.utils.arrayPushAll(r.map, ["ref", "calendarTitle"]);
			juci.utils.arrayPushAll(r.defaults, ['""', this.DefaultCalendarTitle]);
			return r;
		},
		init: function(){
			this._super();
			this.showClear = this.j.getAttr("data-clear", false);
			this._picker = this.j.getAttr("data-picker", "cal");
			this._format = this.j.getAttr("data-format", "dd MMM yyyy");
			this._defaultDate = this.j.getAttr("data-default", new Date().toString());
			this.value(this._val);
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(pickerCtrl.prototype.Events),
		doOpenPicker: function(){
			var options = {format: this._format, defaultDate: this._defaultDate};
			if(this._picker === "cal"){
				var calPanel = juci.controls.calendar.getCalendarPanel();
				calPanel.openCalendar(this.__params.calendarTitle, this._val, this._onDateSelectInCalendar, this, options, this.onClosePicker, this.showClear);
			}else{
				var dobpickPanel = juci.controls.dobpick.getDobpickPanel();
				dobpickPanel.openDobpick(this.__params.calendarTitle, this._val, this._onDateSelectInCalendar, this, options, this.onClosePicker, this.showClear);
			}
		},
		_onDateSelectInCalendar: function(e){
			this.onClosePicker();
			this.__fireBeforeChange(this._val, e.date);
		},
		format: function(f){
			this._format = f ? f : this._format;
			return this._format;
		},
		setText: function(val){
			// TODO Whenever placeholder is set, add a special class
			var inners = (val) ? this._formatter(val) : this.placeholder;
			if(!inners){
				inners = this.placeholder;
				this.j.addClass("juci_placeholder");
			}else{
				this.j.removeClass("juci_placeholder");
			}
			this.i.html(inners);
		},
		value: function(val){
			if(typeof val == "undefined"){
				return this._val ? this._returner(this._val) : '';
			}else{
				this._val = val ? ((val instanceof Date) ? val : new Date(val)) : val;
				this.setText(this._val);
			}
		}
	};
	this.extend(datepicker, pickerCtrl);
	juci.controls.datepicker = datepicker;

	/**#nocode+*/
	var rangeCtrl = function(elem){
		this._super = juci.controls.basecontrol;
		this._val = [null, null]
		this.from = this.to = null;
		this._super(elem);
	}
	rangeCtrl.prototype = {
		DefaultValue: [null, null],
		getDefaultValue: function(){
			return new Function("return " + this.j.getAttr("data-value", JSON.stringify(this.DefaultValue)))();
		},
		init: function(){
			// ref, _formatter
			this.j.attr("data-bind", this._ds ? this.getDatabindString() : this.getDefaultDatabindString());
			this.placeholder = this.j.getAttr("placeholder", this.DefaultPlaceholder);
			this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			this.j.addClass("juci_parent");
			var sType = this.type.replace("range", "picker");
			var container = new juci.elem('<div class="juci_ctrl_box juci_range_ctrl juci_'+this.type+'_box"></div>').appendTo(this.j);
			var c1 = new juci.elem('<div data-juci="'+sType+'" class="juci_not_rounded"></div>').appendTo(container);
			var c2 = new juci.elem('<div data-juci="'+sType+'" class="juci_not_rounded juci_bottom_rounded"></div>').appendTo(container);
			c1.attr("placeholder", this.j.getAttr("data-from-placeholder", this.placeholder));
			c2.attr("placeholder", this.j.getAttr("data-to-placeholder", this.placeholder));
			c1.attr("data-label", this.j.getAttr("data-from-label", "From"));
			c2.attr("data-label", this.j.getAttr("data-to-label", "To"));
			this.showClear = this.j.getAttr("data-clear", false);
			c1.attr("data-clear",this.showClear);
			c2.attr("data-clear",this.showClear);
			juci.controls.init(container.el);
			this.from = juci.getControl(c1);
			this.to = juci.getControl(c2);
			this.from._formatter = this.to._formatter = this._formatter;
			this.from.onAfterChange(this._onFromChange, this);
			this.to.onAfterChange(this._onToChange, this);
			this.value(this._val);
		},
		_setKOParams: function(p){
			this.from._setKOParams(p);
			this.to._setKOParams(p);
		},
		setVals: function(val){
			this.from.value(val[0]);
			this.to.value(val[1]);
		},
		_onFromChange: function(e){
			var newVal = [e.value, this._val[1]];
			this.__fireBeforeChange(this._val, newVal);
		},
		_onToChange: function(e){
			var newVal = [this._val[0], e.value];
			this.__fireBeforeChange(this._val, newVal);
		},
		enable: function(){
			this.j.enable();
			this.from.enable();
			this.to.enable();
		},
		disable: function(){
			this.j.disable();
			this.from.disable();
			this.to.disable();
		},
		value: function(val, bDontUpdate){
			if(typeof val == "undefined"){
				var retVal = [this._val[0], this._val[1]];
				return this._returner(retVal);
			}else{
				this._val = val ? [val[0] ? val[0] : null, val[1] ? val[1] : null] : [null, null];
				this.setVals(this._val);
			}
		}
	};
	this.extend(rangeCtrl, juci.controls.basecontrol);
	juci.controls.baserange = rangeCtrl;
	/**#nocode-*/

	/**
		@namespace
		@name dateRange
		@exports dateRange as daterange
		@augments basecontrol
		@description daterange controls enables user to pick a range of dates, i.e. from date to date. The calendar is opened after user taps on the control.
		@dataattribute {String} data-juci A string with value <i>daterange</i>.
		@dataattribute {String} data-from-label A string with the label for from date.
		@dataattribute {String} data-to-label A string with the label for to date.
		@dataattribute {String} data-from-placeholder A string with the placeholder for from date.
		@dataattribute {String} data-to-placeholder A string with the placeholder for to date.
		@html <div data-juci="daterange"
	data-label="Vacation duration" placeholder="Choose a date"
	data-from-label="Starting from" data-from-placeholder="Pick a starting date"
	data-from-placeholder="Pick a ending date" data-to-label="Till">
</div>
		@css .juci_datepicker_box
		@css .juci_datepicker_box.touch
		@csshtml <div data-juci="daterange" placeholder="Choose a date" data-from-label="Starting from" data-to-label="Till" class="juci_basecontrol juci_daterange juci_parent">
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Vacation duration</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_ctrl_box juci_range_ctrl juci_daterange_box">
		<div data-juci="datepicker" class="juci_basecontrol juci_datepicker juci_not_rounded juci_parent" placeholder="Pick a starting time" data-label="Starting from">
			<div class="juci_flag_drawer">
				<div class="juci_linker"></div>
			</div>
			<div class="juci_ctrl_label">
				<label class="juci_label_text">Starting from</label>
				<div class="juci_label_flagctr"></div>
			</div>
			<div class="juci_ctrl_box juci_datepicker_box">Pick a starting date</div>
		</div>
		<div data-juci="datepicker" class="juci_basecontrol juci_datepicker juci_not_rounded juci_bottom_rounded juci_parent" placeholder="Pick an ending date" data-label="Till">
			<div class="juci_flag_drawer">
				<div class="juci_linker"></div>
			</div>
			<div class="juci_ctrl_label">
				<label class="juci_label_text">Till</label>
				<div class="juci_label_flagctr"></div>
			</div>
			<div class="juci_ctrl_box juci_datepicker_box">Pick an ending date</div>
		</div>
	</div>
</div>
		@note The default return value for daterange control is an <i>Array</i> of <i>Date</i> objects of containing two elements. The first date is the from date, the second is the to date.
		@see datepicker
	*/
	var dateRange = function(elem){
		this._super = rangeCtrl;
		this._super(elem);
	}
	dateRange.prototype = {
		type: "daterange",
		DefaultFormatter: function(date){return date.toDateString();},
		DefaultCalendarTitle: '"Pick a date"',
		DefaultPlaceholder: "Pick a date...",
		init: function(){
			this._super();
			this._picker = this.j.getAttr("data-picker", "cal");
			this.from._picker = this._picker;
			this.to._picker = this._picker;
		},
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol", "calendarTitle"]);
			juci.utils.arrayPushAll(r.map, ["ref", "calendarTitle"]);
			juci.utils.arrayPushAll(r.defaults, ['""', this.DefaultCalendarTitle]);
			return r;
		},
		_onFromChange: function(e){
			var newVal = [e.value, this._val[1]];
			this.__fireBeforeChange(this._val, newVal);
		},
		_onToChange: function(e){
			var newVal = [this._val[0], e.value];
			this.__fireBeforeChange(this._val, newVal);
		},
		value: function(val){
			if(typeof val == "undefined"){
				var retVal = [];
				this._val.forEach(function(v){
					retVal.push(v ? this.from._returner(v) : '');
				}, this);
				return this._returner(retVal);
			}else{
				this._val = val ? [val[0] ? new Date(val[0]) : null, val[1] ? new Date(val[1]) : null] : [null, null];
				this.setVals(this._val);
			}
		}
	};
	this.extend(dateRange, rangeCtrl);
	juci.controls.daterange = dateRange;

	/**#nocode+*/
	var timer = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	timer.getFormattedValue = function(time){
		return time.hour + ' : ' + juci.utils.getPaddedValue(time.minute) + ' ' + time.meridian;
	};
	// TODO Document timer panel
	juci.getTimerPanel = timer.getTimerPanel = function(){
		var timerPanel = juci.getPanel("juci_time_picker_panel");
		if(!timerPanel){
			timerPanel = new juci.panel(new juci.elem("<div class='juci_time_picker_panel' id='juci_time_picker_panel'><div data-juci='juci_timer' id='juci_timer'></div></div>"));
			timerPanel.openTimer = function(title, value, callback, context, hourStep, minuteStep, closeCallback, showClear){
				this.timer.value(value);
				this.timer.hourStep(hourStep);
				this.timer.minuteStep(minuteStep);
				this._callback = [callback, context, closeCallback];
				this.listenOnce("close", this._removeSelectListener, this);
				this.listenOnce("close", closeCallback, context);
				this.listenOnce("timeselect", callback, context);
				if(showClear){
					btns[1].show();
				}else{
					btns[1].hide();
				}
				this.open(title);
			}
			timerPanel._onTimeSelect = function(e, clear){
				this.removeListener("close", this._removeSelectListener, this);
				this.timer._onTouchCancel();
				this.close();
				this.fireEvent("timeselect", {time: clear ? null : this.timer.value(), panel: this, timer: this.timer});
			}
			timerPanel._removeSelectListener = function(e){
				this.timer._onTouchCancel();
				this.removeListener("timeselect", this._callback[0], this._callback[1]);
				this.removeListener("close", this._callback[2], this._callback[1]);
				delete this._callback;
			}
			timerPanel.timer = new juci.timer(timerPanel.j.children()[0]);
			var btns = timerPanel.j.find(".juci_timer_bbar")[0].children();
			btns[0].onClick(timerPanel._onTimeSelect, timerPanel);
			btns[1].onClick(function(e){
				timerPanel._onTimeSelect(e, true);
			}, timerPanel);
			btns[2].onClick(juci.closePanel, juci);
		}
		return timerPanel;
	}
	timer.prototype = {
		type: "timer",
		init: function(){
			// ref, _formatter
			/*
				<div class="juci_ctrl_box time_block">
					<div class="juci_time_button_bar">
						<div>
							<div class="juci_time_button juci_unselectable">+</div>
						</div>
						<div>
							<div class="juci_time_button juci_unselectable">+</div>
						</div>
						<div></div>
					</div>
					<div class="juci_time_value_bar">
						<div class="juci_time_value">
							<input class="juci_time_hour" maxlength="2"/>
						</div>
						<div class="juci_time_value">
							<input class="juci_time_minute" maxlength="2"/>
						</div>
						<div class="juci_time_value juci_unselectable">
							<div class="juci_time_button juci_time_meridian">am</div>
						</div>
					</div>
					<div class="juci_time_button_bar">
						<div>
							<div class="juci_time_button juci_unselectable">-</div>
						</div>
						<div>
							<div class="juci_time_button juci_unselectable">-</div>
						</div>
						<div></div>
					</div>
				</div>
				<div class="juci_horizontal_bbar juci_picker">
					<button class="juci_picker">Set</button>
					<button class="juci_picker">Cancel</button>
				</div>
			*/
			this._ctrlBox = new juci.elem('<div class="juci_ctrl_box juci_timer_box"><div class="juci_computed_time"><span class="juci_computed_hour"></span>: <span class="juci_computed_minute"></span> <span class="juci_computed_meridian"></span></div>'+
				'<div class=" juci_time_block"><div class="juci_time_button_bar"><div><div class="juci_time_button juci_unselectable">+</div></div>' +
				'<div><div class="juci_time_button juci_unselectable">+</div></div><div></div></div><div class="juci_time_value_bar"><div class="juci_time_value">' +
				'<input class="juci_time_hour" maxlength="2" type="tel"/></div><div class="juci_time_value"><input class="juci_time_minute" maxlength="2" type="tel"/></div>' +
				'<div class="juci_time_value"><div class="juci_time_button juci_time_meridian">AM</div></div></div><div class="juci_time_button_bar">' +
				'<div><div class="juci_time_button juci_unselectable">-</div></div><div><div class="juci_time_button juci_unselectable">-</div></div><div></div></div></div>' +
				'<div class="juci_triple_bbar juci_timer_bbar"><button class="juci_button">Set</button><button class="juci_button">Clear</button><button class="juci_button">Cancel</button></div>' +
				'</div>').appendTo(this.j);
			var addHourBtn, addMinBtn, subHourBtn, subMinBtn, hourInput, minInput, meridianBtn;
			var bbars = this._ctrlBox.findByClass("juci_time_button_bar");
			this.computedTimeBar = this._ctrlBox.children()[0];
			var c = this.computedTimeBar.children();
			this.computedTimeBar.hour = c[0];
			this.computedTimeBar.minute = c[1];
			this.computedTimeBar.meridian = c[2];
			var addBtns = bbars[0].findByClass("juci_time_button");
			this._addHourBtn = addBtns[0];
			this._addMinBtn = addBtns[1];
			var subBtns = bbars[1].findByClass("juci_time_button");
			this._subHourBtn = subBtns[0];
			this._subMinBtn = subBtns[1];
			var valueBoxes = this._ctrlBox.findByClass("juci_time_value_bar")[0].findByClass("juci_time_value");
			this._hourInput = valueBoxes[0].children()[0];
			this._minInput = valueBoxes[1].children()[0];
			this._meridianBtn = valueBoxes[2].children()[0];
			var currTime = new Date();
			var hrs = currTime.getHours();
			this.setTime({"hour": hrs%13, "minute": currTime.getMinutes(), "meridian": hrs > 11 ? "PM" : "AM"});

			this._addHourBtn.onClick(this._onAddHourClick, this);
			this._addMinBtn.onClick(this._onAddMinClick, this);
			this._subHourBtn.onClick(this._onSubHourClick, this);
			this._subMinBtn.onClick(this._onSubMinClick, this);

			this._meridianBtn.onClick(this._onMeridianClick, this);

			this._addHourBtn.onTouchStart(this._onAddHourTouchStart, this);
			this._addMinBtn.onTouchStart(this._onAddMinTouchStart, this);
			this._subHourBtn.onTouchStart(this._onSubHourTouchStart, this);
			this._subMinBtn.onTouchStart(this._onSubMinTouchStart, this);

			this._addHourBtn.onTouchCancel(this._onTouchCancel, this);
			this._addMinBtn.onTouchCancel(this._onTouchCancel, this);
			this._subHourBtn.onTouchCancel(this._onTouchCancel, this);
			this._subMinBtn.onTouchCancel(this._onTouchCancel, this);

			this._addHourBtn.onTouchEnd(this._onTouchCancel, this);
			this._addMinBtn.onTouchEnd(this._onTouchCancel, this);
			this._subHourBtn.onTouchEnd(this._onTouchCancel, this);
			this._subMinBtn.onTouchEnd(this._onTouchCancel, this);

			var ctrl = this;
			this._minInput.el.onkeydown = this._hourInput.el.onkeydown = function(e){ ctrl._keydownHandler(e) };
			this._hourInput.el.onkeyup = function(e){ ctrl._hourKeyupHandler(e) };
			this._minInput.el.onkeyup = function(e){ ctrl._minKeyupHandler(e) };
			this._minInput.el.onchange = this._hourInput.el.onchange = function(e){
				ctrl.setTime(ctrl._val);
				ctrl._onTouchCancel();
			};
			this._hourStep = 1;
			this._minuteStep = 1;
		},
		hourStep: function(hr){
			this._hourStep = hr ? hr : 1;
			return this._hourStep;
		},
		minuteStep: function(mn){
			this._minuteStep = mn ? mn : 1;
			return this._minuteStep;
		},
		_onMeridianClick: function(e){
			var html = this._meridianBtn.html();
			if(html == "AM"){
				this._meridianBtn.html("PM");
				this.computedTimeBar.meridian.html("PM");
				this._val.meridian = "PM";
			}else{
				this._meridianBtn.html("AM");
				this.computedTimeBar.meridian.html("AM");
				this._val.meridian = "AM";
			}
		},
		_onAddHourTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["hour", this._hourStep], 150);
		},
		_onAddMinTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["minute", this._minuteStep], 150);
		},
		_onSubHourTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["hour", -this._hourStep], 150);
		},
		_onSubMinTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["minute", -this._minuteStep], 150);
		},
		_onTouchCancel: function(){
			clearInterval(this.timer);
		},
		_onAddHourClick: function(){
			this.incOrDec("hour", this._hourStep);
		},
		_onAddMinClick: function(){
			this.incOrDec("minute", this._minuteStep);
		},
		_onSubHourClick: function(){
			this.incOrDec("hour", -this._hourStep);
		},
		_onSubMinClick: function(){
			this.incOrDec("minute", -this._minuteStep);
		},
		_keydownHandler: function(e){
			if([8, 9, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
			}else if(//!(e.keyIdentifier && e.keyIdentifier.startsWith("U+")) ||
				([37, 38, 39, 40].indexOf(e.keyCode) > -1) ||
				!(e.shiftKey == false &&
					(e.keyCode > 47 && e.keyCode < 58))){
				e.stopPropagation();
				e.preventDefault();
			}
		},
		_hourKeyupHandler: function(e){
			if([8, 9, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
				return;
			}
			//if(e.keyIdentifier.startsWith("U+")){
				if(!this._check("hour", e.currentTarget.value)){
					e.currentTarget.value = juci.utils.getPaddedValue(this._val.hour);
					e.preventDefault();
					e.stopPropagation();
				}else if(e.currentTarget.value.length > 0){
					this._val.hour = parseInt(this._hourInput.val(), 10);
				}
			//}
		},
		_minKeyupHandler: function(e){
			if([8, 9, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
				return;
			}
			//if(e.keyIdentifier.startsWith("U+")){
				if(!this._check("minute", e.currentTarget.value)){
					e.currentTarget.value = juci.utils.getPaddedValue(this._val.minute);
					e.preventDefault();
					e.stopPropagation();
				}else if(e.currentTarget.value.length > 0){
					this._val.minute = parseInt(this._minInput.val(), 10);
				}
			//}
		},
		incOrDec: function(type, incrementor){
			var input, min = 0, max;
			if(type == "hour"){
				//hour
				input = this._hourInput;
				min = 1;
				max = 12;
			}else{
				input = this._minInput;
				max = 59;
			}
			var v;
			if(this._check(type, this._val[type]+incrementor)){
				this._val[type] = this._val[type]+incrementor;
				v = juci.utils.getPaddedValue(this._val[type]);
			}else{
				if(incrementor == -1){
					this._val[type] = v = max;
				}else{
					this._val[type] = min;
					v = juci.utils.getPaddedValue(min);
				}
			}
			var o = {};
			o[type] = v;
			input.val(v);
			this.displayComputedTime(o);
		},
		_check: function(type, val){
			var retValue = true;
			if(type == "hour"){
				if(val < 1 || val > 12){
					retValue = false;
				}
			}else{
				if(val < 0 || val > 59){
					retValue = false;
				}
			}
			return retValue;
		},
		setTime: function(val){
			if(this._check("hour", val.hour) && this._check("minute", val.minute)){
				var hr = val.hour;
				var min = juci.utils.getPaddedValue(val.minute);
				var mer = val.meridian.toUpperCase();
				this._hourInput.val(hr);
				this._minInput.val(min);
				this._meridianBtn.html(val.meridian.toUpperCase());
				this.displayComputedTime({hour: hr, minute: min, meridian: mer});
				this._val = val;
			}
		},
		displayComputedTime: function(time){
			this.computedTimeBar.hour.html(time.hour);
			this.computedTimeBar.minute.html(time.minute);
			this.computedTimeBar.meridian.html(time.meridian);
		},
		enable: function(val){
			this.j.removeAttr("disabled");
			this._hourInput.enable();
			this._minInput.enable();
			this._meridianBtn.enable();
			this._addHourBtn.enable();
			this._subHourBtn.enable();
			this._addMinBtn.enable();
			this._subMinBtn.enable();
		},
		disable: function(val){
			this.j.attr("disabled", true);
			this._hourInput.disable();
			this._minInput.disable();
			this._meridianBtn.disable();
			this._addHourBtn.disable();
			this._subHourBtn.disable();
			this._addMinBtn.disable();
			this._subMinBtn.disable();
		},
		value: function(val){
			if(typeof val == "undefined"){
				return JSON.parse(JSON.stringify(this._val));
			}else if(val != null){
				this.setTime(JSON.parse(JSON.stringify(val)));
			}else{
				var currTime = new Date();
				var hrs = currTime.getHours();
				this.setTime({"hour": hrs%13, "minute": currTime.getMinutes(), "meridian": hrs > 11 ? "PM" : "AM"});
			}
		},
		getValueAsDate: function(oDate){
			// return date object by setting time values on the passed date object or take now date
		},
		setValueAsDate: function(oDate){
			// set time available on passed date or current time
		}
	};
	this.extend(timer, juci.controls.basecontrol);
	juci.timer = timer;
	/**#nocode-*/

	/**
		@namespace
		@name timepicker
		@augments basecontrol
		@description timepicker controls enables user to pick a time by opening a timer interface. The timer interface is opened after user taps on the control.
		@dataattribute {String} data-juci A string with value <i>timepicker</i>.
		@html <div data-juci="timepicker" data-label="Timepicker" placeholder="Choose a time"></div>
		@html <div data-juci="timepicker" data-label="Timepicker with binding" placeholder="Choose a time" data-bind="ref: timed"></div>
		@css .juci_timepicker_box
		@css .juci_timepicker_box.touch
		@csshtml <div data-juci="timepicker" data-label="Timepicker" class="juci_basecontrol juci_timepicker juci_parent">
	<div class="juci_flag_drawer">
		<div class="juci_linker"></div>
	</div>
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Timepicker</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_ctrl_box juci_timepicker_box">10 : 45 PM</div></div>
		@note The default return value for timepicker control is a <i>{hour : hourValue, minute: minuteValue, meridian: meridianValue}</i> object
	*/
	var timepicker = function(elem){
		this._super = pickerCtrl;
		this._super(elem);
	}
	timepicker.prototype = {
		type: "timepicker",
		DefaultFormatter: juci.timer.getFormattedValue,
		DefaultTimerTitle: '"Pick a time"',
		DefaultPlaceholder: "Pick a time...",
		DefaultValue: null,
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol", "timerTitle"]);
			juci.utils.arrayPushAll(r.map, ["ref", "timerTitle"]);
			juci.utils.arrayPushAll(r.defaults, ['""', this.DefaultTimerTitle]);
			return r;
		},
		init: function(){
			this._super();
			this.showClear = this.j.getAttr("data-clear", false);
			this.hourStep(this.j.attr("data-hour-step"));
			this.minuteStep(this.j.attr("data-minute-step"));
			this.value(this._val);
		},
		hourStep: function(hr){
			var h = parseInt(hr, 10);
			this._hourStep = h ? h : 1;
			return this._hourStep;
		},
		minuteStep: function(mn){
			var m = parseInt(mn);
			this._minuteStep = m ? m : 1;
			return this._minuteStep;
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(pickerCtrl.prototype.Events),
		doOpenPicker: function(){
			var timerPanel = juci.timer.getTimerPanel();
			timerPanel.openTimer(this.__params.timerTitle, this._val, this._onTimeSelectInTimer, this, this._hourStep, this._minuteStep, this.onClosePicker, this.showClear);
		},
		_onTimeSelectInTimer: function(e){
			this.onClosePicker();
			this.__fireBeforeChange(this._val, e.time);
		},
		setText: function(val){
			var inners = (val) ? this._formatter(val) : this.placeholder;
			if(!inners){
				inners = this.placeholder;
				this.j.addClass("juci_placeholder");
			}else{
				this.j.removeClass("juci_placeholder");
			}
			this.i.html(inners);
		},
		value: function(val){
			if(typeof val == "undefined"){
				return this._val ? this._returner(this._val) : null;
			}else{
				this._val = val;
				this.setText(this._val);
			}
		}
	};
	this.extend(timepicker, pickerCtrl);
	juci.controls.timepicker = timepicker;

	/**
		@namespace
		@name timeRange
		@exports timeRange as timerange
		@augments basecontrol
		@description timerange controls enables user to pick a range of times, i.e. from time to time. The timer interface is opened after user taps on the control.
		@dataattribute {String} data-juci A string with value <i>timerange</i>.
		@dataattribute {String} data-from-label A string with the label for from time.
		@dataattribute {String} data-to-label A string with the label for to time.
		@dataattribute {String} data-from-placeholder A string with the placeholder for from time.
		@dataattribute {String} data-to-placeholder A string with the placeholder for to time.
		@html <div data-juci="timerange"
	data-label="Meeting duration"
	data-from-label="Starting from" data-from-placeholder="Pick a starting time"
	data-from-placeholder="Pick an ending time" data-to-label="Till">
</div>
		@css .juci_timepicker_box
		@css .juci_timepicker_box.touch
		@csshtml <div data-juci="timerange" placeholder="Choose a date" data-from-label="Starting from" data-to-label="Till" class="juci_basecontrol juci_timerange juci_parent">
	<div class="juci_ctrl_label">
		<label class="juci_label_text">Meeting duration</label>
		<div class="juci_label_flagctr"></div>
	</div>
	<div class="juci_ctrl_box juci_range_ctrl juci_daterange_box">
		<div data-juci="timepicker" class="juci_basecontrol juci_timepicker juci_not_rounded juci_parent" placeholder="Pick a starting time" data-label="Starting from">
			<div class="juci_flag_drawer">
				<div class="juci_linker"></div>
			</div>
			<div class="juci_ctrl_label">
				<label class="juci_label_text">Starting from</label>
				<div class="juci_label_flagctr"></div>
			</div>
			<div class="juci_ctrl_box juci_timepicker_box">Pick a starting time</div>
		</div>
		<div data-juci="timepicker" class="juci_basecontrol juci_timepicker juci_not_rounded juci_bottom_rounded juci_parent" placeholder="Pick an ending time" data-label="Till">
			<div class="juci_flag_drawer">
				<div class="juci_linker"></div>
			</div>
			<div class="juci_ctrl_label">
				<label class="juci_label_text">Till</label>
				<div class="juci_label_flagctr"></div>
			</div>
			<div class="juci_ctrl_box juci_timepicker_box">Pick an ending time</div>
		</div>
	</div>
</div>
		@note The default return value for timepicker control is an <i>Array</i> of <i>{hour : hourValue, minute: minuteValue, meridian: meridianValue}</i> objects of containing two elements. The first object is the from time, the second is the to time.
		@see timepicker
	*/
	var timeRange = function(elem){
		this._super = juci.controls.daterange;
		this._super(elem);
	}
	timeRange.prototype = {
		type: "timerange",
		DefaultFormatter: juci.timer.getFormattedValue,
		DefaultTimerTitle: '"Pick a time"',
		DefaultPlaceholder: "Pick a time...",
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["basecontrol", "timerTitle"]);
			juci.utils.arrayPushAll(r.map, ["ref", "timerTitle"]);
			juci.utils.arrayPushAll(r.defaults, ['""', this.DefaultTimerTitle]);
			return r;
		}
	};
	this.extend(timeRange, rangeCtrl);
	juci.controls.timerange = timeRange;

	/**#nocode+*/

	/*
		datepicker data-picker="cal" default or use dob
		Day as number, can be entered, plussed, minused (1-31,30,28,29)
		Month as number, can be entered, plussed, minused 1-12
		Year as number, can be entered, plussed, minused
		Step for day, month, year, default 1
		Format to show on the right side
	*/
	var dobpick = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	};
	// TODO Document dobpick panel
	juci.getDobpickPanel = dobpick.getDobpickPanel = function(){
		var dobpickPanel = juci.getPanel("juci_dobpick_panel");
		if(!dobpickPanel){
			dobpickPanel = new juci.panel(new juci.elem("<div class='juci_dobpick_panel' id='juci_dobpick_panel'><div data-juci='juci_dobpick' id='juci_dobpick'></div></div>"));
			dobpickPanel.openDobpick = function(title, value, callback, context, options, closeCallback, showClear){
				this.dobpick.dateStep(options.dateStep);
				this.dobpick.monthStep(options.monthStep);
				this.dobpick.yearStep(options.yearStep);
				this.dobpick.format(options.format);
				this.dobpick.defaultDate(options.defaultDate);
				this.dobpick.value(value);
				// TODO Month view type - number, MM, MMM
				// TODO custom formatting of selected date
				this._callback = [callback, context, closeCallback];
				this.listenOnce("close", this._removeSelectListener, this);
				this.listenOnce("close", closeCallback, context);
				this.listenOnce("dateselect", callback, context);
				if(showClear){
					btns[1].show();
				}else{
					btns[1].hide();
				}
				this.open(title);
			}
			dobpickPanel._onDateSelect = function(e, clear){
				this.removeListener("close", this._removeSelectListener, this);
				this.dobpick._onTouchCancel();
				this.close();
				this.fireEvent("dateselect", {date: clear ? null : this.dobpick.value(), panel: this, ctrl: this.dobpickPanel});
			}
			dobpickPanel._removeSelectListener = function(e){
				this.dobpick._onTouchCancel();
				this.removeListener("dateselect", this._callback[0], this._callback[1]);
				this.removeListener("close", this._callback[2], this._callback[1]);
				delete this._callback;
			}
			dobpickPanel.setDefaultValue = function(v){
				dobpickPanel.dobpick.setDefaultValue(v instanceof Date ? v : new Date(v));
			}
			dobpickPanel.dobpick = new juci.dobpick(dobpickPanel.j.children()[0]);
			var btns = dobpickPanel.j.find(".juci_dobpick_bbar")[0].children();
			btns[0].onClick(dobpickPanel._onDateSelect, dobpickPanel);
			btns[1].onClick(function(e){
				dobpickPanel._onDateSelect(e, true)
			}, dobpickPanel);
			btns[2].onClick(juci.closePanel, juci);
		}
		return dobpickPanel;
	}
	dobpick.prototype = {
		type: "dobpick",
		DefaultValue: new Date(),
		setDefaultValue: function(v){
			this.DefaultValue = v;
		},
		init: function(){
			/*
				<div class="juci_ctrl_box juci_timer_box juci_dobpick_box">
					<div class="juci_computed_time juci_computed_date"></div>
					<div class="juci_time_block juci_dobpick_block">
						<div class="juci_time_button_bar juci_dobpick_button_bar">
							<div>
								<div class="juci_time_button juci_dobpick_button juci_unselectable">+</div>
							</div>
							<div>
								<div class="juci_time_button juci_dobpick_button juci_unselectable">+</div>
							</div>
							<div>
								<div class="juci_time_button juci_dobpick_button juci_unselectable">+</div>
							</div>
							<div></div>
						</div>
						<div class="juci_time_value_bar juci_dobpick_value_bar">
							<div class="juci_time_value juci_dobpick_value">
								<input class="juci_time_hour juci_dobpick_date" maxlength="2"/>
							</div>
							<div class="juci_time_value juci_dobpick_value">
								<input class="juci_time_hour juci_dobpick_month" maxlength="2"/>
							</div>
							<div class="juci_time_value juci_dobpick_value">
								<input class="juci_time_hour juci_dobpick_year" maxlength="4" minlength="4"/>
							</div>
						</div>
						<div class="juci_time_button_bar juci_dobpick_button_bar">
							<div>
								<div class="juci_time_button juci_dobpick_button juci_unselectable">-</div>
							</div>
							<div>
								<div class="juci_time_button juci_dobpick_button juci_unselectable">-</div>
							</div>
							<div>
								<div class="juci_time_button juci_dobpick_button juci_unselectable">-</div>
							</div>
							<div></div>
						</div>
					</div>
				</div>
				<div class="juci_horizontal_bbar juci_timer_bbar juci_dobpick_bbar">
					<button class="juci_button">Set</button>
					<button class="juci_button">Cancel</button>
				</div>
			*/
			this._ctrlBox = new juci.elem('<div class="juci_ctrl_box juci_timer_box juci_dobpick_box">'+
				'<div class="juci_computed_time juci_computed_date"></div>'+
				'<div class="juci_time_block juci_dobpick_block">'+
				'<div class="juci_time_button_bar juci_dobpick_button_bar">'+
				'<div><div class="juci_time_button juci_dobpick_button juci_unselectable">+</div></div>'+
				'<div><div class="juci_time_button juci_dobpick_button juci_unselectable">+</div></div>'+
				'<div><div class="juci_time_button juci_dobpick_button juci_unselectable">+</div></div>'+
				'</div>'+
				'<div class="juci_time_value_bar juci_dobpick_value_bar">'+
				'<div class="juci_time_value juci_dobpick_value"><input class="juci_time_hour juci_dobpick_date" maxlength="2"/></div>'+
				'<div class="juci_time_value juci_dobpick_value"><input class="juci_time_hour juci_dobpick_month" maxlength="2"/></div>'+
				'<div class="juci_time_value juci_dobpick_value"><input class="juci_time_hour juci_dobpick_year" maxlength="4" minlength="4"/></div>'+
				'</div>'+
				'<div class="juci_time_button_bar juci_dobpick_button_bar">'+
				'<div><div class="juci_time_button juci_dobpick_button juci_unselectable">-</div></div>'+
				'<div><div class="juci_time_button juci_dobpick_button juci_unselectable">-</div></div>'+
				'<div><div class="juci_time_button juci_dobpick_button juci_unselectable">-</div></div>'+
				'</div>'+
				'</div>'+
				'<div class="juci_triple_bbar juci_timer_bbar juci_dobpick_bbar">'+
				'<button class="juci_button">Set</button>'+
				'<button class="juci_button">Clear</button>'+
				'<button class="juci_button">Cancel</button>'+
				'</div>'+
				'</div>').appendTo(this.j);
			var bbars = this._ctrlBox.findByClass("juci_dobpick_button_bar");
			this.computedDateBar = this._ctrlBox.children()[0];
			var addBtns = bbars[0].findByClass("juci_dobpick_button");
			this._addDateBtn = addBtns[0];
			this._addMonBtn = addBtns[1];
			this._addYearBtn = addBtns[2];

			var subBtns = bbars[1].findByClass("juci_dobpick_button");
			this._subDateBtn = subBtns[0];
			this._subMonBtn = subBtns[1];
			this._subYearBtn = subBtns[2];

			var valueBoxes = this._ctrlBox.findByClass("juci_dobpick_value_bar")[0].findByClass("juci_dobpick_value");
			this._dateInput = valueBoxes[0].children()[0];
			this._monInput = valueBoxes[1].children()[0];
			this._yearInput = valueBoxes[2].children()[0];

			this._dateStep = 1;
			this._monthStep = 1;
			this._yearStep = 1;
			this._format = "ddd dd MMMM yyyy";
			this._defaultDate = new Date().toString();

			var currTime = new Date();
			this.setDate(currTime);

			this._addDateBtn.onClick(this._onAddDateClick, this);
			this._addMonBtn.onClick(this._onAddMonClick, this);
			this._addYearBtn.onClick(this._onAddYearClick, this);
			this._subDateBtn.onClick(this._onSubDateClick, this);
			this._subMonBtn.onClick(this._onSubMonClick, this);
			this._subYearBtn.onClick(this._onSubYearClick, this);

			this._addDateBtn.onTouchStart(this._onAddDateTouchStart, this);
			this._addMonBtn.onTouchStart(this._onAddMonTouchStart, this);
			this._addYearBtn.onTouchStart(this._onAddYearTouchStart, this);
			this._subDateBtn.onTouchStart(this._onSubDateTouchStart, this);
			this._subMonBtn.onTouchStart(this._onSubMonTouchStart, this);
			this._subYearBtn.onTouchStart(this._onSubYearTouchStart, this);

			this._addDateBtn.onTouchCancel(this._onTouchCancel, this);
			this._addMonBtn.onTouchCancel(this._onTouchCancel, this);
			this._addYearBtn.onTouchCancel(this._onTouchCancel, this);
			this._subDateBtn.onTouchCancel(this._onTouchCancel, this);
			this._subMonBtn.onTouchCancel(this._onTouchCancel, this);
			this._subYearBtn.onTouchCancel(this._onTouchCancel, this);

			this._addDateBtn.onTouchEnd(this._onTouchCancel, this);
			this._addMonBtn.onTouchEnd(this._onTouchCancel, this);
			this._addYearBtn.onTouchEnd(this._onTouchCancel, this);
			this._subDateBtn.onTouchEnd(this._onTouchCancel, this);
			this._subMonBtn.onTouchEnd(this._onTouchCancel, this);
			this._subYearBtn.onTouchEnd(this._onTouchCancel, this);

			var ctrl = this;
			this._dateInput.el.onkeydown = this._monInput.el.onkeydown = this._yearInput.el.onkeydown = function(e){ ctrl._keydownHandler(e) };
			this._dateInput.el.onkeyup = function(e){ ctrl._dateKeyupHandler(e) };
			this._monInput.el.onkeyup = function(e){ ctrl._monKeyupHandler(e) };
			this._yearInput.el.onkeyup = function(e){ ctrl._yearKeyupHandler(e) };
			this._monInput.el.onchange = this._dateInput.el.onchange = this._yearInput.el.onchange = function(e){
				ctrl.setDate(ctrl._val);
				ctrl._onTouchCancel();
			};
		},
		format: function(f){
			this._format = f ? f : this._format;
			return this._format;
		},
		defaultDate: function(f){
			this._defaultDate = f ? f : this._defaultDate;
			return this._defaultDate;
		},
		dateStep: function(d){
			this._dateStep = d ? d : this._dateStep;
			return this._dateStep;
		},
		monthStep: function(mn){
			this._monthStep = mn ? mn : this._dateStep;
			return this._monthStep;
		},
		yearStep: function(y){
			this._yearStep = y ? y : this._yearStep;
			return this._yearStep;
		},
		_onAddDateTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["date", this._dateStep], 150);
		},
		_onAddMonTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["month", this._monthStep], 150);
		},
		_onAddYearTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["year", this._yearStep], 150);
		},
		_onSubDateTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["date", -this._dateStep], 150);
		},
		_onSubMonTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["month", -this._monthStep], 150);
		},
		_onSubYearTouchStart: function(){
			clearInterval(this.timer);
			this.timer = juci.utils.setInterval(this.incOrDec, this, ["year", -this._yearStep], 150);
		},
		_onTouchCancel: function(){
			clearInterval(this.timer);
		},
		_onAddDateClick: function(){
			this.incOrDec("date", this._dateStep);
		},
		_onAddMonClick: function(){
			this.incOrDec("month", this._monthStep);
		},
		_onAddYearClick: function(){
			this.incOrDec("year", this._yearStep);
		},
		_onSubDateClick: function(){
			this.incOrDec("date", -this._dateStep);
		},
		_onSubMonClick: function(){
			this.incOrDec("month", -this._monthStep);
		},
		_onSubYearClick: function(){
			this.incOrDec("year", -this._yearStep);
		},
		_keydownHandler: function(e){
			if([8, 9, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
			}else if(//!(e.keyIdentifier && e.keyIdentifier.startsWith("U+")) ||
				([37, 38, 39, 40].indexOf(e.keyCode) > -1) ||
				!(e.shiftKey == false &&
					(e.keyCode > 47 && e.keyCode < 58))){
				e.stopPropagation();
				e.preventDefault();
			}
		},
		_dateKeyupHandler: function(e){
			if([8, 9, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
				return;
			}
			var v = e.currentTarget.value;
			//if(e.keyIdentifier.startsWith("U+")){
				if(!this._check("date", v)){
					e.currentTarget.value = juci.utils.getPaddedValue(this._val.getDate());
					e.preventDefault();
					e.stopPropagation();
				}else if(v.length > 0){
					this._val.setDate(v);
					this.setDate(this._val, "date");
				}
			//}
		},
		_monKeyupHandler: function(e){
			if([8, 9, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
				return;
			}
			var v = e.currentTarget.value;
			//if(e.keyIdentifier.startsWith("U+")){
				if(!this._check("month", v)){
					e.currentTarget.value = juci.utils.getPaddedValue(this._val.getMonth() + 1);
					e.preventDefault();
					e.stopPropagation();
				}else if(v.length > 0){
					this._val.setMonth(v - 1);
					this.setDate(this._val, "month");
				}
			//}
		},
		_yearKeyupHandler: function(e){
			if([8, 9, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
				return;
			}
			var v = e.currentTarget.value;
			if(v.length < 4){
				return;
			}
			//if(e.keyIdentifier.startsWith("U+")){
				if(!this._check("year", v)){
					e.currentTarget.value = juci.utils.getPaddedValue(this._val.getFullYear());
					e.preventDefault();
					e.stopPropagation();
				}else if(v.length == 4){
					this._val.setYear(v);
					this.setDate(this._val, "year");
				}
			//}
		},
		incOrDec: function(type, incrementor){
			var input, currentVal;
			var newDate = new Date(this._val);
			if(type == "date"){
				// date - addDays()
				newDate.addDays(incrementor);
			}else if(type == "month"){
				// month - addMonths()
				newDate.addMonths(incrementor);
			}else{
				// year - addYears()
				newDate.addYears(incrementor);
			}
			// Set date
			this.setDate(newDate);
		},
		_check: function(type, val){
			var retValue = true;
			if(type == "date"){
				if(val < 1 || val > 31){
					retValue = false;
				}

			}else if(type == "month"){
				if(val < 1 || val > 12){
					retValue = false;
				}
			}else{
				if(val < 1900 || val > 3000){
					retValue = false;
				}
			}
			return retValue;
		},
		setDate: function(val, type){
			val = new Date(val);
			this._val = val;
			this.displayComputedDate(val, type);
		},
		displayComputedDate: function(val, type){
			if(type != "date"){
				this._dateInput.val(juci.utils.getPaddedValue(val.getDate()));
			}
			if(type != "month"){
				this._monInput.val(juci.utils.getPaddedValue(val.getMonth()+1));
			}
			if(type != "year"){
				this._yearInput.val(val.getFullYear());
			}
			this.computedDateBar.html(val.toString(this._format));
		},
		enable: function(val){
			this.j.removeAttr("disabled");
			this._dateInput.enable();
			this._monInput.enable();
			this._yearInput.enable();
			this._addDateBtn.enable();
			this._subDateBtn.enable();
			this._addMonBtn.enable();
			this._subMonBtn.enable();
			this._addYearBtn.enable();
			this._subYearBtn.enable();
		},
		disable: function(val){
			this.j.attr("disabled", true);
			this._dateInput.disable();
			this._monInput.disable();
			this._yearInput.disable();
			this._addDateBtn.disable();
			this._subDateBtn.disable();
			this._addMonBtn.disable();
			this._subMonBtn.disable();
			this._addYearBtn.disable();
			this._subYearBtn.disable();
		},
		value: function(val){
			if(typeof val == "undefined"){
				return this._val;
			}else if(val != "" && val != null){
				this.setDate(val);
			}else{
			this.setDate(this._defaultDate);
			}
		}
	};
	juci.extend(dobpick, juci.controls.basecontrol);
	juci.dobpick = juci.controls.dobpick = dobpick;

	// TODO - Point to flotr for this
	var chart = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	chart.prototype = {
		type: "chart",
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["chart", "onConfigure"]);
			juci.utils.arrayPushAll(r.map, ["ref", "onConfigure"]);
			juci.utils.arrayPushAll(r.defaults, ['""', ""]);
			return r;
		},
		init: function(){
			// Dataset based only
			// TODO Adding clicks and delegating to drill down
			this.j.attr("data-bind", this.getDatabindString());
			this.chartType = this._ds.type;
			this.label = juci.controls.addLabel(this.j, this.j.attr("data-label-bind"));
			this._canvas = new juci.elem('<canvas id="'+this._id+'_rc" width="215" height="215">[Please wait...]</canvas>').appendTo(this.j);
			this.__r = new RGraph[this.chartType](this._id+"_rc", []);
		},
		// Fire configuration event on function - how to add this function?
		onBindingInitialize: function(){
			var evt = { properties : this.__r.properties, canvas: this.__r.canvas, context: this.__r.context};
			this.__params._onConfigure(evt);
		},
		// Redraw the RGraph with new data
		refresh: function(data){
			this.__r.data = data;
			RGraph.Clear(this._canvas.el);
			this.__r.Draw();
		}
	};
	this.extend(chart, juci.controls.basecontrol);
	juci.controls.chart = chart;
	/**#nocode-*/

	/**
		@namespace
		@name searchbox
		@augments basecontrol
		@description searchbox widget filters for search query in referenced dataset and updates all controls referencing the dataset. It can be easily linked to other controls by referencing the the same dataset.
		@note <i>data-bind.ref</i> and <i>data-searcher</i> are mandatory for searchbox.
		@dataattribute {String} data-juci A string with value <i>searchbox</i>.
		@dataattribute {String} data-searcher Name of function defined on the window scope. Called when a search string is entered in the options list. The function receives the following params,
		@dataattribute {Object} data-searcher.item An item in the options list.
		@dataattribute {String} data-searcher.searchString The searched string.
		@dataattribute {Number} data-search-delay Number of milliseconds after which search can start processing.
		@html <div data-juci="searchbox" data-bind="ref: deliveries" data-searcher="searcher"></div>
		@css .juci_searchbox_glass
		@css .juci_searchbox.focussed .juci_searchbox_glass
		@css .juci_searchbox_close
		@csshtml <div data-juci="searchbox" data-searcher="searcher" class="juci_basecontrol juci_searchbox">
	<div class="juci_ctrl_box juci_float_left_right">
		<div class="juci_searchbox_glass"></div>
		<div class="juci_searcher">
			<input autocomplete="off" autocapitalize="none" placeholder="Search"/>
		</div>
		<div class="juci_searchbox_close"></div>
	</div>
</div>
	*/
	var searchbox = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	searchbox.prototype = {
		type: "searchbox",
		getDatabindConfig: function(){
			var r = this._super();
			juci.utils.arrayPushAll(r.keys, ["searchbox"]);
			juci.utils.arrayPushAll(r.map, ["ref"]);
			juci.utils.arrayPushAll(r.defaults, ['""']);
			return r;
		},
		focus: function(){
			this._super();
			this.i.focus();
		},
		init: function(){
			/*
				<div class="juci_searchbox" data-juci="search">
					<div class="juci_ctrl_box juci_float_right juci_float_left">
						<div class="juci_searchbox_glass">
							<img src="../system/img/search.png"/>
						</div>
						<div>
							<input placeholder="Search"/>
						</div>
						<div class="juci_searchbox_close">
							<img src="../system/img/delete.png"/>
						</div>
					</div>
				</div>
			*/
			this.j.attr("data-bind", this.getDatabindString());
			var ctrlBox = new juci.elem('<div class="juci_ctrl_box juci_float_left_right"></div>').appendTo(this.j);
			var search = this.j.attr("data-searcher");
			this._associatedUi = this.j.attr("data-aui");
			this._searchHandler = search ? window[search] : this._associatedUi ? juci.getControl(this._associatedUi).searchHandler : null;
			var placeholder = this.j.getAttr("placeholder", "Search");
			var sGlass = new juci.elem('<div class="juci_searchbox_glass"></div>').appendTo(ctrlBox);
			var t = new juci.elem('<div class="juci_searcher"></div>').appendTo(ctrlBox);
			this.i = new juci.elem('<input autocomplete="off" autocapitalize="none" placeholder="'+placeholder+'"/>').appendTo(t);
			this._addFocusHandler(sGlass);
			this.i.el.onfocus = juci.utils.getCallback(function(){
				this.j.addClass("focussed");
			}, this);
			this.i.el.onblur = juci.utils.getCallback(function(){
				this.j.removeClass("focussed");
			}, this);
			new juci.elem('<div class="juci_searchbox_close"></div>').appendTo(ctrlBox).onClick(this._clearSearch, this);
			// TODO - Check if default delay is better or no delay
			this.setDelay(this._ds.delay ? this._ds.delay : 50, true);
		},
		_addFocusHandler: window.$m && $m.isWindowsPhone() ? function(elem){
			elem.onClick(function(e){
				if(e.target.el != this.i.el){
					e.preventDefault();
					this.i.focus();
				}
			}, this, ".juci_"+this.type);
			elem.el.addEventListener("click", juci.utils.getCallback(this.i.focus, this.i), false);
		} : juci.isBuggyAndroidGalaxyTab ? function(elem){
			// For Galaxy tab
			elem.el.addEventListener("touchend", juci.utils.getCallback(function(e){
				if(e.target == this.i.el){
					e.preventDefault();
				}
			}, this), ".juci_"+this.type);
			elem.el.addEventListener("click", juci.utils.getCallback(this.i.focus, this.i), false);
		} : function(elem){
			elem.onClick(function(e){
				if(e.target.el == this.i.el){
					e.stopPropagation();
				}
			}, this, ".juci_"+this.type);
			elem.el.addEventListener("click", juci.utils.getCallback(this.i.focus, this.i), false);
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(["search", "beforesearch", "aftersearch", "clear"]),
		_clearSearch: function(e){
			e.preventDefault();
			this.clearSearch();
		},
		/**
			@memberOf searchbox.prototype
			@description Clears the searchbox results.
			@fires searchbox#event:clear
		*/
		clearSearch: function(bDontFireEvent){
			if(!bDontFireEvent){
				this.fireEvent("clear");
			}
			this.i.val("");
			if(this._dataBackup != null){
				this.getValueAccessor()(this._dataBackup);
				this._dataBackup = null;
			}
		},
		/**
			@memberOf searchbox.prototype
			@description Sets a delay before the searchbox can start processing the search string.
			@param {Number} delay Delay before search is started, in milliseconds.
		*/
		setDelay: function(delay, bInit){
			if(this._delay !== delay || bInit){
				this._dataBackup = null;
				this.i.removeListener("keyup",this._onChange, this);
				this.i.removeListener("input",this._onChange, this);
				this._delayed = typeof delay != "undefined";
				if(this._delayed){
					this._delayTimer = null;
					this._delay = parseInt(delay, 10);
					this._onChange = function(e){
						if(e.value){
							window.clearTimeout(this._delayTimer);
							this._delayTimer = juci.utils.setTimeout(this.search, this, [e.value], this._delay);
						}else{
							this.clearSearch();
						}
					}
				}else{
					this._onChange = function(e){
						if(e.value){
							this.search(e.value);
						}else{
							this.clearSearch();
						}
					}
				}
				this.i.onKeyUp(this._onChange, this);
				this.i.onInput(this._onChange, this);
			}
		},
		/**
			@memberOf searchbox.prototype
			@description Gets the current delay before the searchbox can start processing the search string.
			@return {Number}
		*/
		getDelay: function(){
			return this._delay;
		},
		/**
			@memberOf searchbox.prototype
			@description Searches for the query. This method calls <i>data-searcher</i> to filter the matching results.
			@fires searchbox#event:beforesearch
			@fires searchbox#event:search
			@fires searchbox#event:aftersearch
		*/
		search: function(val){
			var that = this;
			if(this._dataBackup == null){
				this._dataBackup = this.getValueAccessor()();
			}
			var eventObj = new EventObject({searchedValue: val, data: ko.mapping.toJS(this._dataBackup)});
			this.fireEvent("beforesearch", eventObj);
			if(!eventObj.isCancelled()){
				var foundData, foundDs = [];
				foundData = eventObj.data.filter(function(item, index){
					var ret = that._searchHandler(item, val);
					if(ret){
						foundDs.push(that._dataBackup[index]);
					}
					return ret;
				});
				eventObj.matchingData = foundData;
				this.fireEvent("search", eventObj);
				if(!eventObj.isCancelled()){
					this.getValueAccessor()(foundDs);
					this.fireEvent("aftersearch", eventObj);
				}
			}
		},
		setValueAccessor: function(valueAccessor){
			this._valueAccessor = typeof valueAccessor == "function" ? valueAccessor : function(){
				return valueAccessor;
			};
		},
		getValueAccessor: function(){
			return this._valueAccessor;
		}
	};
	{
		/**
			@memberOf searchbox.prototype
			@name clear
			@event
			@description Fires when the searchbox is cleared.
			@flag Cancellable
			@param {EventObject} eventObj
		*/
		/**
			@memberOf searchbox.prototype
			@name beforesearch
			@event
			@description Fires before the search processing is started.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {String} eventObj.searchedValue The search string.
			@param {Array} eventObj.data Array of items to be searched.
		*/
		/**
			@memberOf searchbox.prototype
			@name search
			@event
			@description Fires when the search results are ready, but not updated to the dataset.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {String} eventObj.searchedValue The search string.
			@param {Array} eventObj.data Array of items to be searched.
			@param {Array} eventObj.matchingData Array of items matching with the search string.
		*/
		/**
			@memberOf searchbox.prototype
			@name aftersearch
			@event
			@description Fires when the search results are ready, but not updated to the dataset.
			@param {EventObject} eventObj
			@param {String} eventObj.searchedValue The search string.
			@param {Array} eventObj.data Array of items to be searched.
			@param {Array} eventObj.matchingData Array of items matching with the search string.
		*/

	}
	this.extend(searchbox, juci.controls.basecontrol);
	juci.controls.searchbox = searchbox;

	/**
		@namespace
		@name loginWidget
		@exports loginWidget as login
		@augments Observable
		@description login widget provides a user-friendly login interface for entering username, password and remember me. The login widget has social login links apart from traditional login interface.
		@dataattribute {String} data-juci A string with value <i>login</i>.
		@dataattribute {Object} data-options A string containing comma separated key-value pairs from the list of below keys as options to the login widget, with the following optional configuration parameters, #example #html data-options="social: ['Facebook', 'Twitter']" #example
		@dataattribute {String} data-options.isEmail If the username control is email or not. Default it is true.
		@dataattribute {String} data-options.usernameLabel Label for the username control.
		@dataattribute {String} data-options.usernamePlaceholder Placeholder for the username control.
		@dataattribute {String} data-options.passwordLabel Label for the password control.
		@dataattribute {String} data-options.passwordPlaceholder Placeholder for the password control.
		@dataattribute {Boolean} data-options.showUsername false to hide the username control.
		@dataattribute {Boolean} data-options.showPassword false to hide the password control.
		@dataattribute {Boolean} data-options.forgotPassword true to enable forgot password button for the password control.
		@dataattribute {Boolean} data-options.showRememberMe false to hide the remember me checkbox.
		@dataattribute {String} data-options.rememberMeLabel Label for the remember me checkbox
		@dataattribute {String} data-options.loginLabel Label for the login widget.
		@dataattribute {Array} data-options.social Array of strings of social links.
		@html <div data-juci="login" data-options="social: ['Facebook', 'Twitter']"></div>
		@csshtml <div data-juci="login" id="lgnWdgt" data-options="social: ['Facebook', 'Twitter']" juci-ctrl-id="lgnWdgt" class=" juci_login">
	<form>
		<div data-juci="textwithdelete" data-trigger="keyup" data-label="Username" placeholder="Enter username" id="lgnWdgt__uname" class="juci_basecontrol juci_textwithdelete juci_text" juci-ctrl-id="lgnWdgt__uname">
			<div class="juci_flag_drawer">
				<div class="juci_linker juci_pencil"></div>
			</div>
			<div class="juci_ctrl_label">
				<label class="juci_label_text">Username</label>
				<div class="juci_label_flagctr"></div>
			</div>
			<div class="juci_float_right">
				<div><input type="text" placeholder="Enter username" class="juci_ctrl_box" autocapitalize="none" autocomplete="off" /></div>
				<div>
					<div class="juci_text_delete"></div>
				</div>
			</div>
		</div>
		<div data-juci="forgotpassword" data-trigger="keyup" data-label="Password" placeholder="Enter password" id="lgnWdgt__pwd" juci-ctrl-id="lgnWdgt__pwd" class="juci_basecontrol juci_forgotpassword">
			<div class="juci_float_right">
				<div class="juci_basecontrol juci_text juci_not_rounded juci_left_rounded juci_forgotpassword_password">
					<div class="juci_flag_drawer">
						<div class="juci_linker juci_pencil"></div>
					</div>
					<div class="juci_ctrl_label">
						<label class="juci_label_text">Password</label>
						<div class="juci_label_flagctr"></div>
					</div>
					<input type="password" "="" placeholder="Enter password" class="juci_ctrl_box" autocapitalize="none" autocomplete="off" />
				</div>
				<div class="juci_basecontrol juci_forgot_password_container juci_not_rounded juci_right_rounded">
					<div class="juci_forgot_password">?</div>
				</div>
			</div>
		</div>
		<div data-juci="checkbox" data-label="Remember me" id="lgnWdgt__remMe" juci-ctrl-id="lgnWdgt__remMe" class="juci_basecontrol juci_checkbox juci_check" data-bind="basecontrol: &quot;&quot;, checkedValue: true, uncheckedValue: false">
			<div class="juci_ctrl_box juci_switch_box">
				<div class="juci_switch_label"><label>Remember me</label></div>
				<div class="juci_check_box"></div>
			</div>
		</div>
		<div class="juci_vertical_bbar"><button type="submit" data-juci="button" value="Login" id="lgnWdgt__login" juci-ctrl-id="lgnWdgt__login" class=" juci_button">Login</button></div>
	</form>
	<div class="juci_ctrl_separator"></div>
	<div class="juci_vertical_bbar"><button data-juci="button" value="Facebook" id="lgnWdgt__Facebook" juci-ctrl-id="lgnWdgt__Facebook" class=" juci_button">Facebook</button><button data-juci="button" value="Twitter" id="lgnWdgt__Twitter" juci-ctrl-id="lgnWdgt__Twitter" class=" juci_button">Twitter</button></div>
</div>
	*/
	var loginWidget = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	};
	loginWidget.prototype = {
		type: "login",
		DefaultOpts: {
			"usernameLabel": "Username",
			"usernamePlaceholder" : "Enter username",
			"passwordLabel": "Password",
			"passwordPlaceholder" : "Enter password",
			"showUsername": true,
			"showPassword": true,
			"forgotPassword": true,
			"showRememberMe": true,
			"rememberMeLabel": "Remember me",
			"loginLabel": "Login",
			"social": [],
			"isEmail": true
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(["forgotpassword", "remembermechange", "login", "usernamechange", "passwordchange", "socialclick", "usernameempty", "passwordempty"]),
		init: function(){
			this.j.removeClass("juci_basecontrol");
			var optsStr = this.j.attr("data-options");
			var opts = new Function("return {" + ( optsStr ? optsStr : "") + "}")();
			juci.utils.extendOptions(opts, this.DefaultOpts);
			this.Events.forEach(function(evt){
				this.addListener(evt, opts["on"+evt]);
			}, this);
			var ctrlId = this.j.getId();
			var frm = new juci.elem("<form></form>").appendTo(this.j);
			frm.append(new juci.elem('<div data-juci="'+(opts.isEmail ? 'email' : 'text') + 'withdelete" data-trigger="keyup" data-label="'+opts.usernameLabel+'" placeholder="'+opts.usernamePlaceholder+'" id="'+ctrlId+'__uname"></div>'));
			frm.append(new juci.elem('<div data-juci="'+(opts.forgotPassword ? 'forgotpassword' : 'passwordwithdelete')+'" data-trigger="keyup" data-label="'+opts.passwordLabel+'" placeholder="'+opts.passwordPlaceholder+'" id="'+ctrlId+'__pwd"></div>'));
			frm.append(new juci.elem('<div data-juci="checkbox" data-label="'+opts.rememberMeLabel+'" id="'+ctrlId+'__remMe"></div>'));
			frm.append(new juci.elem('<div class="juci_vertical_bbar"><button type="submit" data-juci="button" value="'+opts.loginLabel+'" id="'+ctrlId+'__login"></button></div>'));
			if(opts.social.length > 0){
				this.j.append(new juci.elem('<div class="juci_ctrl_separator"></div>'));
				var socialbar = new juci.elem('<div class="juci_vertical_bbar"></div>').appendTo(this.j);
				opts.social.forEach(function(s){
					socialbar.append('<button data-juci="button" type="submit" value="'+s+'" id="'+ctrlId+'__'+s+'"></button>');
				}, this);
			}
			juci.controls.init(this.j.el);
			this.usernameCtrl = juci.getControl(ctrlId + "__uname");
			this.usernameCtrl.onAfterChange(this._onUsernameChange, this);
			this.passwordCtrl = juci.getControl(ctrlId + "__pwd");
			this.passwordCtrl.onAfterChange(this._onPasswordChange, this);
			this.rememberMeCtrl = juci.getControl(ctrlId + "__remMe");
			if(!opts.showRememberMe){
				this.rememberMeCtrl.hide();
			}
			this.rememberMeCtrl.onAfterChange(this._onRememberMeChange, this);
			this.loginBtn = juci.getControl(ctrlId + "__login");
			this.loginBtn.onClick(function(){
				this._buttonTrigger = true;
				this._onLoginClick();
			}, this);
			var that = this;
			frm.el.onsubmit = function(e){
				e.preventDefault();
				if(document.activeElement){
					document.activeElement.blur();
				}
				if(!that._buttonTrigger){
					that._onLoginClick();
				}else{
					delete that._buttonTrigger;
				}
			};
			this.opts = opts;
			opts.social.forEach(function(s){
				var btn = this[s + "Btn"]  = juci.getControl(ctrlId + '__' + s);
				btn.onClick(this._onSocialClick, this);
			}, this);
			if(!opts.showUsername){
				this.usernameCtrl.hide();
			}
			if(!opts.showPassword){
				this.passwordCtrl.hide();
			}
			if(!opts.showRememberMe){
				this.rememberMeCtrl.hide();
			}
			if(opts.forgotPassword){
				this.passwordCtrl.onForgotPassword(this._onForgotPassword, this);
			}
		},
		_onForgotPassword: function(evt){
			var e = new EventObject(evt, evt);
			this.fireEvent("forgotpassword", e);
			if(!e.isCancelled()){}
		},
		_onUsernameChange: function(evt){
			var e = new EventObject(evt, evt);
			if(evt.value){
				this.usernameCtrl.resetFlag();
			}
			this.fireEvent("usernamechange", e);
		},
		_onPasswordChange: function(evt){
			var e = new EventObject(evt, evt);
			if(evt.value){
				this.passwordCtrl.resetFlag();
			}
			this.fireEvent("passwordchange", e);
		},
		_onRememberMeChange: function(evt){
			var e = new EventObject(evt, evt);
			this.fireEvent("remembermechange", e);
		},
		_onLoginClick: function(evt){
			var e = new EventObject(evt, evt);
			e.username = this.usernameCtrl.value();
			e.password = this.passwordCtrl.value();
			e.rememberMe = this.rememberMeCtrl.value();
			if(this.opts.showUsername && !e.username){
				e.errorMsg = "Empty";
				this.fireEvent("usernameempty", e);
				if(!e.isCancelled()){
					this.usernameCtrl.setFlag(e.errorMsg, "error");
					juci.utils.setTimeout(this.usernameCtrl.focus, this.usernameCtrl, 200);
				}
			}else if(this.opts.showPassword && !e.password){
				e.errorMsg = "Empty";
				this.fireEvent("passwordempty", e);
				if(!e.isCancelled()){
					this.passwordCtrl.setFlag(e.errorMsg, "error");
					juci.utils.setTimeout(this.passwordCtrl.focus, this.passwordCtrl, 200);
				}
			}else{
				this.fireEvent("login", e);
			}
		},
		/**
			@methodOf login.prototype
			@description Resets the login widget to its original state.
		*/
		reset: function(){
			this.usernameCtrl.value("");
			this.passwordCtrl.value("");
			this.rememberMeCtrl.value(false);
		},
		_onSocialClick: function(evt){
			var e = new EventObject(evt, evt);
			e.social = e.target.html();
			this.fireEvent("socialclick", e);
		},
		disable: function(){
			this.usernameCtrl.disable();
			this.passwordCtrl.disable();
			this.rememberMeCtrl.disable();
			this.loginBtn.disable();
			this.opts.social.forEach(function(s){
				this[s + "Btn"].disable();
			}, this);
		},
		enable: function(){
			this.usernameCtrl.enable();
			this.passwordCtrl.enable();
			this.rememberMeCtrl.enable();
			this.loginBtn.enable();
			this.opts.social.forEach(function(s){
				this[s + "Btn"].enable();
			}, this);
		},
		showDelete: juci.utils.EmptyMethod,
		hideDelete: juci.utils.EmptyMethod,
		setFlag: juci.utils.EmptyMethod,
		resetFlag: juci.utils.EmptyMethod
	};
	_extendWithEventHelpers(loginWidget, []);
	{
		["forgotpassword", "remembermechange", "login", "usernamechange", "passwordchange", "socialclick", "usernameempty", "passwordempty"]
		/**
			@memberOf login.prototype
			@name forgotpassword
			@event
			@description Fires when user taps on the forgot password button.
		*/
		/**
			@memberOf login.prototype
			@name remembermechange
			@event
			@description Fires when the remember me checkbox is changed.
			@param {EventObject} eventObj
			@param eventObj.value {Boolean} Value of the remember me checkbox.
		*/
		/**
			@memberOf login.prototype
			@name usernamechange
			@event
			@description Fires when the username control is changed.
			@param {EventObject} eventObj
			@param eventObj.value {String} Value of the username control.
		*/
		/**
			@memberOf login.prototype
			@name passwordchange
			@event
			@description Fires when the password control is changed.
			@param {EventObject} eventObj
			@param eventObj.value {String} Value of the password control.
		*/
		/**
			@memberOf login.prototype
			@name socialclick
			@event
			@description Fires when a social link is clicked.
			@param {EventObject} eventObj
			@param eventObj.social {String} The social link clicked.
		*/
		/**
			@memberOf login.prototype
			@name usernameempty
			@event
			@description Fires when login is clicked with empty username. Default action sets a flag on the username control.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {String} eventObj.username Value of the username control.
			@param {String} eventObj.password Value of the password control.
			@param {Boolean} eventObj.rememberMe Value of the remember me checkbox.
		*/
		/**
			@memberOf login.prototype
			@name passwordempty
			@event
			@description Fires when login is clicked with empty password. Default action sets a flag on the password control.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {String} eventObj.username Value of the username control.
			@param {String} eventObj.password Value of the password control.
			@param {Boolean} eventObj.rememberMe Value of the remember me checkbox.
		*/
		/**
			@memberOf login.prototype
			@name login
			@event
			@description Fires when login is clicked with non-empty values for username and password.
			@flag Cancellable
			@param {EventObject} eventObj
			@param {String} eventObj.username Value of the username control.
			@param {String} eventObj.password Value of the password control.
			@param {Boolean} eventObj.rememberMe Value of the remember me checkbox.
		*/

	}
	this.extend(loginWidget, juci.controls.basecontrol);
	juci.controls.login = loginWidget;

	/**
		@namespace
		@name groupbox
		@augments Observable
		@description groupbox widget enables other controls to be grouped together with a label.
		@dataattribute {String} data-juci A string with value <i>groupbox</i>.
		@dataattribute {String} data-label A string containing the label of the groupbox.
		@html <div data-juci="groupbox" data-label="Grouped">
		<div data-juci="checkbox" data-label="Check me" data-checked="false"></div>
		<div data-juci="datepicker" data-label="Datepicker"></div>
		<div data-juci="telwithdelete" data-trigger="keyup" data-label="Tel number please"></div>
	</div>
		@css .juci_group
		@css .juci_H1
		@css .juci_H2
		@css .juci_T1
		@css .juci_T2
		@css .juci_T3
		@css .juci_T12
		@css .juci_T23
		@css .juci_Q1
		@css .juci_Q2
		@css .juci_Q3
		@css .juci_Q4
		@css .juci_Q12
		@css .juci_Q23
		@css .juci_Q34
		@css .juci_Q123
		@css .juci_Q234
	*/
	var groupbox = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	};
	groupbox.prototype = {
		type: "groupbox",
		init: function(){
			juci.controls.prependLabel(this.j);
		}
	};
	this.extend(groupbox, juci.controls.basecontrol);
	juci.controls.groupbox = groupbox;

	/**
		@namespace
		@name infoPanel
		@exports infoPanel as infopanel
		@augments Observable
		@description infopanel widget creates a information panel with a title, content and footer button.
		@dataattribute {String} data-juci A string with value <i>infopanel</i>.
		@dataattribute {String} data-title A string containing the title of the infopanel.
		@html <div data-juci="infopanel" data-title="Info" onbuttonclick="$m.toast('Info panel OK!')">
	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
</div>
	*/
	var infoPanel = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	};
	infoPanel.prototype = {
		type: "infopanel",
		Events: juci.controls.basecontrol.prototype.Events.concat(["buttonclick"]),
		DefaultOptions: {
			"buttonTxt": "OK"
		},
		init: function(){
			new juci.elem('<div class="juci_ctrl_separator"></div>)').prependTo(this.j);
			this.heading = new juci.elem('<div class="juci_panel_name"></div>').prependTo(this.j);
			this.j.append(new juci.elem('<div class="juci_vertical_bbar"><button data-juci="button" id="'+this.j.getId()+'__ok">OK</button></div>'));
			juci.controls.init(this.j.el);
			this.button = juci.getControl(this.j.getId() + "__ok");
			this.button.onClick(function(e){
					var evt = new EventObject(e, e);
					this.fireEvent("buttonclick", evt);
				}, this);
			this.heading.html(this.j.attr("data-title"));
		},
		setTitle: function(h){
			this.heading.html(h);
		}
	};
	_extendWithEventHelpers(infoPanel.prototype, infoPanel.prototype.Events);
	{
		/**
			@memberOf infopanel.prototype
			@name buttonclick
			@event
			@description Fires when the button in the infopanel is clicked.
		*/
	}
	this.extend(infoPanel, juci.controls.basecontrol);
	juci.controls.infopanel = infoPanel;

	/**
		@namespace
		@name circlePanel
		@exports circlePanel as circlepanel
		@augments infopanel
		@description circlepanel widget creates a information panel with a title, content and footer button in a circular interface.
		@dataattribute {String} data-juci A string with value <i>circlepanel</i>.
		@html <div data-juci="circlepanel" data-title="Info" onbuttonclick="$m.toast('Info panel OK!')">
	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
</div>
	*/
	var circlePanel = function(elem){
		this._super = juci.controls.infopanel;
		this._super(elem);
		this.j.addClass("juci_infopanel");
	};
	circlePanel.prototype.type = "circlepanel";
	this.extend(circlePanel, juci.controls.infopanel);
	juci.controls.circlepanel = circlePanel;


	/**
		@namespace
		@name form
		@augments basecontrol
		@description form widget enables one binding for all controls and data inside the form.
		@html
<div data-juci="form" data-bind="ref: formContent">
	<div data-juci="display" data-bind="ref: key1"></div>
	<div data-juci="text" data-bind="ref: key2"></div>
</div>
		@note Beta feature. APIs and functionalities are subject to change.
		@note Button type <i>submit</i> and <i>reset</i> within a form, fire the form#event:submit and form#event:reset respectively when clicked.
	*/
	var form = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	}
	// ,* is required when there is only binding property defined such as data-bind="ref: asd" - 0 or more occurrences
	var regExp1 = /ref[ ]*:[ A-Za-z_0-9~!@#$%^&*.]*,*/, regExp2 = /[ ]*[,]*/g;
	form.prototype = {
		type: "form",
		init: function(){
			this.j.removeClass("juci_basecontrol");
			this.ctrls = [];
			this.j.children().forEach(function(el){
				this.ctrls.push(el);
				el.remove();
			}, this);
			this.j.html("");
			this._map = {};
			this._init = false;
			if(this._ds && this._ds.ref){
				this._data = juci.getDataset(this._ds.ref);
				if(this._data == null){
					var obj = ko.mapping.fromJS({});
					this._data = ko.observable(obj);
					this._dsId = this.j.getId()+"_form";
					juci.viewModel.set(this._dsId, this._data);
				}else{
					this._dsId = this._ds.ref;
				}
				this.j.attr("data-bind", this._dataBind.replace("ref", "withProperties"));
			}else{
				var obj = ko.mapping.fromJS({});
				this._data = ko.observable(obj);
				this._dsId = this.j.getId()+"_form";
				juci.viewModel.set(this._dsId, this._data);
				this.j.attr("data-bind", this._dataBind + ", withProperties: $root." + this._dsId);
			}
			var cPanel = juci.panelForElem(this.j);
			cPanel.listenOnce("init", function(){
				if(!this._init){
					this.ctrls.forEach(function(el){
						this.j.append(el);
					},this)
					delete this.ctrls;
					juci.controls.init(this.j.el);
					if(Object.keys(this._data()).length > 0){
						this._init = true;
						juci.viewModel.applyBinding(this.j.el);
					}
					this.fireEvent("init");
				}
			}, this);
		},
		Events: juci.controls.basecontrol.prototype.Events.concat(["init", "setdata", "submit", "reset"]),
		/**
			@memberOf form.prototype
			@description Set data to the form.
			@param unwrappedData {Object} Data to be set
			@fires form#event:setdata
		*/
		setData: function(unwrappedData, bDontApply){
			var evt = this.fireEvent("setdata", {"data": unwrappedData, "mappedData": this._data, "mapping": this._map});
			// applyBinding called to set context for the children within.
			this._data = evt.mappedData;
			if(!this._init){
				ko.mapping.fromJS(evt.data, evt.mapping, this._data());
				if(!bDontApply){
					this._init = true;
					juci.viewModel.applyBinding(this.j.el);
				}
			}else{
				ko.mapping.fromJS(evt.data, evt.mapping, this._data());
				this.clearValidation();
			}
		},
		setMapping: function(map){
			this._map = map;
		},
		getMapping: function(){
			return this._map;
		},
		getControls: function(){
			if(this._init){
				if(!this._controls){
					this._controls = juci.utils.getControlsWithinElem(this.j);
				}
				return this._controls;
			}
			throw new Error("Control is not initialized yet");
		},
		clearValidation: function(){
			this.getControls().forEach(function(ctrl){
				ctrl.clearValidation();
			});
			this._super();
		},
		/**
			@methodOf form.prototype
			@description Adds a listener for submit event
			@param handler {Function} A handler function to execute when the action is chosen.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onSubmit: function(fn, context){
			this.addListener("submit", fn, context);
		},
		/**
			@methodOf form.prototype
			@description Adds a listener for reset event
			@param handler {Function} A handler function to execute when the action is chosen.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		onReset: function(fn, context){
			this.addListener("reset", fn, context);
		},
		value: function(val){
			if(typeof val !== "undefined"){
				this.setData(val);
			}else{
				return ko.mapping.toJS(this._data);
			}
		},
		/**
			@memberOf form.prototype
			@description Submits the form.
			@fires form#event:submit
		*/
		submit: function(){
			var unwrappedData = ko.mapping.toJS(this._data);
			if(this.validate(unwrappedData)){
				this.fireEvent("submit", {data: unwrappedData, form: this});
			}
		},
		validate: function(v){
			var ctrls = this.getControls();
			var retVal = true;
			var numCtrls = ctrls.length;
			if(this.j.attr("data-validation") == "all") {
				for(var k = 0; k < numCtrls; k++){
					var ctrl = ctrls[k];
					if(ctrl.j.attr("data-novalidate") == "false" || ctrl.j.attr("data-novalidate") == null) {
						//To skip element from validation if data-novalidate says no to validation
						if(!ctrl.validate(ctrl.value())){
							retVal = false;
							//break;
						}
					}
				}

				//The below is commented to validate all the elements in a form at once.
				/*if(k === numCtrls){
					retVal = this._super(v);
				}*/
				if(retVal == "true"){
					retVal = this._super(v);
				}
				else{
					this.fireEvent("validationfail", {control: ctrl});
				}
			}
			else {
				//To check for form elements validations one after the other.
				for(var k = 0; k < numCtrls; k++){
					var ctrl = ctrls[k];
					if(ctrl.j.attr("data-novalidate") == "false" || ctrl.j.attr("data-novalidate") == null) {
						//To skip element from validation if data-novalidate says no to validation
						if(!ctrl.validate(ctrl.value())){
							retVal = false;
							break;
						}
					}
				}

				if(k === numCtrls){
					retVal = this._super(v);
				}
				else{
					this.fireEvent("validationfail", {control: ctrl});
				}
			}
			return retVal;
		},
		/**
			@memberOf form.prototype
			@description Resets the form.
			@fires form#event:reset
		*/
		reset: function(){
			ko.mapping.clearFromJS(this._data());
			this.fireEvent("reset");
		}
	};
	/**
		@memberOf form.prototype
		@name setdata
		@event
		@param {EventObject} eventObj
		@param {Object} eventObj.data
		@param {Object} eventObj.mappedData
		@param {Object} eventObj.mapping
		@description Fires when the form data is set.
	*/
	/**
		@memberOf form.prototype
		@name submit
		@event
		@param {EventObject} eventObj
		@param {Object} eventObj.data
		@description Fires when the form data is submitted.
	*/
	/**
		@memberOf form.prototype
		@name reset
		@event
		@param {EventObject} eventObj
		@description Fires when the form data is reset.
	*/
	this.extend(form, juci.controls.basecontrol);
	juci.controls.form = form;
	return {};
});
juci.fns.extend(function(juci){
	/**#nocode+*/
	function PanelTransition(inn, outt){
		this.incoming = inn;
		this.outgoing = outt;
	}
	PanelTransition.prototype.cleanse = function(){
		this.incoming[juci.browser.TransformProperty] = this.incoming.transform;
		this.outgoing[juci.browser.TransformProperty] = this.outgoing.transform;
		delete this.incoming.transform;
		delete this.outgoing.transform;
		return this;
	};
	function OpeningPanelTransition(inn, outt){
		this.incoming = inn;
		this.outgoing = outt;
	}
	function ClosingPanelTransition(inn, outt){
		this.incoming = inn;
		this.outgoing = outt;
	}
	function inheritProto(clazz, klass){
		clazz.prototype = new klass;
		clazz.prototype.constructor = clazz;
		clazz.prototype.parent = klass.prototype;
	}
	inheritProto(OpeningPanelTransition, PanelTransition);
	inheritProto(ClosingPanelTransition, PanelTransition);
	// Panel
	var _panels = {},
		_bodyCon, _dir, _dialogWrapper,
		_data = null, _first, _current, _prev,
		_stack = [];

	/**
		@namespace
		@name panel
		@description Container for holding views within a single page. The <i>data-first-panel</i> attribute specifies the first panel that is opened when the page is loaded
		@note Beta feature. APIs and functionalities are subject to change.
		@html <div data-juci="panel"></div>
		@example #html
<div data-juci="panel" data-first-panel>
	<button data-juci="button" onclick="$m.juci.openPanel('second-panel')">Open Second Panel</button>
</div>
<div data-juci="panel" data-panel-id="second-panel">
	<button data-juci="button" onclick="$m.juci.closePanel()">Close Panel</button>
</div>
	*/
	var panel = function(j, transition){
		// Contains the complete template of the panel.
		this.j = new juci.elem("<div data-juci='panel'></div>");
		this.content = j;
		this.j.append(j);
		j.removeAttr("data-juci");
		this.panelId = j.attr("id");
		if(!this.panelId){
			var panelId = j.attr("data-panel-id");
			this.panelId = panelId ? panelId : j.getId();
		}
		this.j.addClass("juci_" + this.type);
		this.j.attr("data-panel-id", this.panelId);
		juci.panel.add(this, this.panelId);
		this.x = 0;
		this.y = 0;
		this.hide();
		this._firstTime = true;
		this.init(transition);
	};
	panel.FORWARD = "opening";
	panel.BACKWARD = "closing";
	//panel.opening = new PanelTransition({transform: "translate(0px, 0px)", opacity: "initial"},{transform: "translate(-100%, 0px)"});
	//panel.closing = new PanelTransition({transform: "translate(0px, 0px)", opacity: "initial"},{transform: "translate(100%, 0px)"});
	panel.opening = new PanelTransition({transform: "none", opacity: "initial"},{transform: "none"});
	panel.closing = new PanelTransition({transform: "none", opacity: "initial"},{transform: "none"});
	panel.panelForElem = function(elem){
		var el = new juci.elem(elem);
		var cl = el.closest(".juci_panel,.juci_dialog");
		return juci.panel.get(cl);
	};
	/*
		1. Get "Section" emp_con // In version 2 - minimize usage of "div" and go for HTML5 tags. Section for panels because, independent content with separate header and footer.
		2. Create juci_panel_title Header for emp_con
		3. For every panel created, add title, can be set dynamically. // TODO
		4. Listen to backpress(__mowbly__.Page.close)

		Opening a panel
		1. Set parent panel id on the section tag. Set in from right animation
		2. Change hash
		3. On hash change listener fired.
		4. Based on animations in from right/ fade in center/ fade in to elem - Set left something on parent, set left 0 on child
		5. Show child/Hide parent based on animation
		6. Fire events

		Closing a panel i.e. going back
		1. Get and remove parent panel id on the section tag
		2. If no parent found, don't do anything.
		3. else, change hash, set in from left animation
		4. On hash change listener fired
		5. Based on animations in from right/ fade in center/ fade in to elem - Set left something on parent, set left 0 on child
		6. Show child/Hide parent based on animation
		7. Fire events
	*/
	panel.init = function(){
		this.setDefaultTransition({"opening": this.opening.cleanse(), "closing": this.closing.cleanse()});
		this.setDefaultTransitionEvent(juci.events.TRANSITIONEND);
		_dir = this.FORWARD;
		//Initialize variables
		_bodyCon = new juci.elem("<div class='juci_body_container'><div class='juci_body_viewport'></div></div>").appendTo(juci.documentBody);
		_bodyCon.scroller = _bodyCon.children()[0];
		// Creating a panel will keep it hidden, until open is called. The first panel is an excecption and is opened by default.
		// Get all data-juci=panel and create panel objects. First panel is panel with (first found)data-first-panel or the first panel found
		var panelElems = juci.findByAttrVal("data-juci","panel"), panels = [], firstPanel;
		var numPanels = panelElems.length;
		for(var i = 0; i < numPanels; i++){
			panels[i] = new juci.panel(panelElems[i]);
			if(!firstPanel && panelElems[i].attr("data-first-panel") !== null){
				firstPanel = panels[i];
			}
		}
		this.initDialogWrapper(panels, numPanels);
		if(!firstPanel){
			firstPanel = panels[0];
			firstPanel.j.attr("data-first-panel", true);
		}
		firstPanel.isFirstTime();
		firstPanel.incomingTransit(true);
		firstPanel._onOpen();
		juci.documentBody.addClass(firstPanel.panelId);
		_current = _first = firstPanel.panelId;
		this._bOnFirst = true;
		_addTitleBar(firstPanel);
	};
	panel.initDialogWrapper = function(panels, numPanels){
		_dialogWrapper = new juci.elem("<div class='juci_dialog_container'></div>").appendTo(juci.documentBody);
		_dialogWrapper.hide();
		_dialogWrapper.viewport = new juci.elem("<div class='juci_dialog_viewport'></div>").appendTo(_dialogWrapper);
		_dialogWrapper.shadowString = "inset 0px 0px "+juci.browserHeight()+"px 0px";
		var dialogElems = juci.findByAttrVal("data-juci", "dialog");
		for(i = 0; i < dialogElems.length; i++){
			panels[i + numPanels] = new juci.dialog(dialogElems[i]);
		}
	};
	panel.add = function(panelElem, panelId){
		if(panelElem instanceof juci.elem){
			return new juci.panel(panelElem);
		}else{
			_panels[panelId] = panelElem;
		}
	};
	panel.open = function(panelId, name, data){
		// Open panel in main view if smart phone
		// else if bShowDialog, show as dialog
		// else open as a side view.
		_panels[panelId].title(name);
		_data = data;
		if(window.mowbly){
			__mowbly__._canMovePageToBack = false;
		}
		_dir = this.FORWARD;
		//Setting hash on window.location
		_stack.push(_current);
		this.hashChangedHandler(panelId);
	};
	/**
		@name closePanel
		@category panel
		@methodOf juci
		@description Closes the current sub view opened, for e.g: options list of a {@link selectbox}. Else calls <i>$m.close()</i>.
	*/
	panel.close = function(data){
		if(!this._bOnFirst){
			_data = data;
			_dir = this.BACKWARD;
			this.hashChangedHandler(_stack.pop());
		}else{
			// If on first, close the Page
			if(window.mowbly){
				__mowbly__._canMovePageToBack = true;
				__mowbly__.Page.close();
			}
		}
	};
	panel.closeAll = function(){
		if(_first != _current){
			_stack = [];
			this.hashChangedHandler(_first);
			window.setTimeout(this._onBackPress, 17);
		}else{
			this.close();
		}
	};
	panel._onBackPress = function(){
		juci.closePanel();
	};
	window.ghostBuster = function(evt) {
		if (["INPUT", "SELECT", "A", "TEXTAREA", "BUTTON"].indexOf(evt.target.tagName) > -1) {
			evt.preventDefault();
			evt.stopPropagation()
		};
	};
	juci.setGhostBusters = window.setGhostBusters = function(evts, cb, timeout) {
		if (document.activeElement) {
			document.activeElement.blur()
		}
		if(!evts || evts.length == 0){
			evts = ["mousedown", "click"];
		}else{
			evts.push("mousedown");
			evts.push("click");
		}
		if(!cb){
			cb = ghostBuster;
		}
		if(!timeout){
			timeout = 400;
		}
		evts.forEach(function(evtName){
			document.addEventListener(evtName, cb, true);
		});
		setTimeout(function() {
			evts.forEach(function(evtName){
				document.removeEventListener(evtName, cb, true);
			});
		}, timeout);
	};
	panel.hashChangedHandler = function(panelId){
		juci.setGhostBusters();
		var panels = juci.panel;
		var closingPanel = _panels[_current];
		_prev = _current;
		var openingPanelId = panelId;
		var openingPanel;
		if(!openingPanelId || openingPanelId == _first){
			panels._bOnFirst = true;
			openingPanel = _panels[_first];
			_current = _first;
			if(window.$m && !__mowbly__.Page.getParent()){
				panels.Header.hideLeftButton();
			}
		}else{
			panels._bOnFirst = false;
			openingPanel = _panels[openingPanelId];
			_current = openingPanelId;
			panels.Header.showLeftButton();
		}
		if(window.$m){
			__mowbly__._canMovePageToBack = !panels._bOnFirst;
		}
		closingPanel.outgoingTransit(panels.animationDone(openingPanel, closingPanel), panels, openingPanel);
		if(_dir == panels.FORWARD){
			closingPanel.x = window.scrollX ? window.scrollX : window.panelXOffset;
			closingPanel.y = window.scrollY ? window.scrollY : window.panelYOffset;
			closingPanel._onPause(_data, openingPanel);
		}else{
			closingPanel.x = 0;
			closingPanel.y = 0;
			closingPanel._onClose(_data, openingPanel);
			panels.fireEvent("close", new EventObject({panel: closingPanel}));
		}
		openingPanel.isFirstTime();
		closingPanel._onOutgoing(openingPanel);
	};
	panel.animationDone = function(openingPanel, closingPanel){
		return function(){
			openingPanel._onIncoming(closingPanel);
			if(_dir == this.FORWARD){
				openingPanel._onOpen(_data, closingPanel);
				this.fireEvent("open", new EventObject({panel: openingPanel}));
			}else{
				openingPanel._onResume(_data, closingPanel);
			}
			openingPanel.incomingTransit();
			_data = null;
		}
	};
	panel.get = function(elem){
		return _panels[(typeof elem == "string" ? elem : new juci.elem(elem).attr("data-panel-id"))];
	};
	panel.setDefaultTransition = function(transitionObject){
		this.defaultTransition = transitionObject;
	};
	panel.getDefaultTransition = function(){
		return this.defaultTransition;
	};
	panel.setDefaultTransitionEvent = function(eventName){
		this.defaultTransitionEvent = eventName;
	};
	panel.getDefaultTransitionEvent = function(){
		return this.defaultTransitionEvent;
	};
	panel.isOnFirstPanel = function(){
		return this._bOnFirst;
	};
	panel.currentDirection = function(){
		return _dir;
	};
	panel.currentPanel = function(){
		return _panels[_current];
	};

	function _addTitleBar(){
		// TODO - Remove this check with suitable check for presence of custom title bar
		var titleBar = new juci.elem('<header class="juci_panel_title"><div class="abtnholder"><div class="actionbutton juci_button" id="__leftBtn"></div></div><div id="__title" class="title"><img id="__titleImage" class="titleImage"/><label id="__titleLabel" class="titleLabel"></label></div><div class="abtnholder"><div class="actionbutton juci_button" id="__rightBtn"></div></div></header>').prependTo(document.body);
		var rightButton = juci.findById("__rightBtn");
		rightButton.hide();
		var leftButton = juci.findById("__leftBtn");
		leftButton.html(juci.getTranslatedLabel("Back"));
		var titleLabel = juci.findById("__titleLabel");
		titleBar.leftButton = leftButton;
		titleBar.rightButton = rightButton;
		titleBar.title = juci.findById("__title");
		titleBar.title.label = titleLabel;
		var titleImage = juci.findById("__titleImage");
		titleBar.title.image = titleImage;
		titleBar.setTitle = function(title){
			juci.panel.currentPanel().title(title);
			titleLabel.html(title);
		}
		titleBar.getTitle = function(title){
			return titleLabel.html();
		}
		titleBar.setTitleIcon = function(titleIcon){
			this.title.image.show();
			this.removeClass("imageShown");
			this.addClass("iconShown");
			this.title.image.attr("src", titleIcon);
		}
		titleBar.getTitleIcon = titleBar.getTitleImage = function(){
			return this.title.image.attr("src");
		}
		titleBar.setTitleImage = function(titleImage){
			this.title.image.show();
			this.removeClass("iconShown");
			this.addClass("imageShown");
			this.title.image.attr("src", titleImage);
		}
		titleBar.showTitleIcon = function(){
			this.title.image.show();
			this.addClass("iconShown");
		}
		titleBar.showTitleImage = function(){
			this.title.image.show();
			this.addClass("imageShown");
		}
		titleBar.hideTitleIcon = function(){
			this.title.image.hide();
			this.removeClass("iconShown");
			this.removeClass("imageShown");
		}
		titleBar.hideTitleImage = function(){
			this.title.image.hide();
			this.removeClass("imageShown");
			this.removeClass("iconShown");
		}
		titleBar.setLeftButtonLabel = function(buttonText){
			this.showLeftButton();
			this.leftButton.html(buttonText);
		}
		titleBar.getLeftButtonLabel = function(){
			return this.leftButton.html();
		}
		titleBar.showLeftButton = function(){
			this.leftButton.show();
		}
		titleBar.hideLeftButton = function(){
			this.leftButton.hide();
		}
		titleBar.setRightButtonLabel = function(label){
			this.showRightButton();
			this.rightButton.html(label);
		}
		titleBar.getRightButtonLabel = function(){
			return this.rightButton.html();
		}
		titleBar.showRightButton = function(){
			this.rightButton.show();
		}
		titleBar.hideRightButton = function(){
			this.rightButton.hide();
		}
		juci.panel.Header = titleBar;
		titleBar.buttonBars = titleBar.findByClass("abtnholder");
		juci.browser.setUnselectable(titleBar);
		if(window.__mowbly__){
			if(!__mowbly__.Page.getParent()){
				titleBar.hideLeftButton();
			}
			$m.onReady(function(){
				if(__mowbly__.Page.getParent()){
					titleBar.showLeftButton();
				}
			});
			__mowbly__.Page.addListener("backpress", function(evt){
				juci.closePanel();
				evt.preventDefault();
			});
			titleBar.setTitle(juci.getTranslatedLabel(__mowbly__.Page.getName()))
			function leftButtonClick(){
				__mowbly__._onDeviceBackPressed();
			}
		}else{
			titleBar.hideLeftButton();
			var l = location.href.split("/")
			titleBar.setTitle(juci.getTranslatedLabel(l[l.length-1]));
			function leftButtonClick(){
				juci.closePanel();
			}
		}
		leftButton.onClick(leftButtonClick);
		if(!juci.isBuggyWebkitAndroid){
			//new juci.elem("<div class='juci_body_bg'></div>").prependTo(document.body);
		}else{
			juci.documentBody.addClass("buggy_android_2");
		}
	}

	panel.prototype = {
		Events: ["open", "close", "resume", "pause", "visible", "beforeinit", "init"],
		type: "panel",
		open: function(name, data){
			juci.panel.open(this.panelId, name, data);
		},
		isFirstTime: function(){
			this.show();
			if(this._firstTime){
				this._firstTime = false;
				this.initializing = true;
				this.fireEvent("beforeinit");
				juci.panel.fireEvent("beforeinit", new EventObject({"name": this.panelId, "panel": this}));
				juci.controls.init(this.j.el);
				juci.viewModel.applyBinding(this.j.el);
				this.initializing = false;
				this.fireEvent("init");
				juci.panel.fireEvent("init", new EventObject({"name": this.panelId, "panel": this}));
				var elements = ["text","textwithdelete","textarea","textareawithdelete","password","selectbox","passwordwithdelete","checkbox","datepicker"];
var  a = [];

for (var elem in elements){
var a = (this.j.el.querySelectorAll('[data-juci='+elements[elem]+']'));
for(l=0; l<a.length ; l++){  
	if(	juci.getControl(a[l])){
	juci.getControl(a[l]).j.el.addEventListener("click", 
	function (a) { 
		juci.getControl(this).clearValidation();		
	}, this);
	
	};
};	
}		
			}
		},
		close: function(data){
			juci.closePanel(data);
		},
		init: function(transition){
			this.j.appendTo(_bodyCon.scroller);
			this._transition = transition ? transition : juci.panel.getDefaultTransition();
			this.setTransitionEvent(juci.panel.getDefaultTransitionEvent());
		},
		_onOpen: function(data, closingPanel){
			this.fireEvent("open", new EventObject({data: data, panel: this}));
			// autofocus control
			var autofocuscontrols = this.j.find("[autofocus]");
			if(autofocuscontrols.length > 0){
				juci.getControl(autofocuscontrols[0]).focus();
			}
			this._onResume(data, closingPanel);
		},
		_onPause: function(data, closingPanel){
			this.fireEvent("pause", new EventObject({data: data, panel: this}));
		},
		_onResume: function(data, closingPanel){
			this.fireEvent("resume", new EventObject({data: data, panel: this}));
		},
		_onIncoming: function(closingPanel){
			juci.documentBody.addClass(this.panelId);
		},
		_onOutgoing: function(openingPanel){
			juci.documentBody.removeClass(this.panelId);
			if(openingPanel.type === this.type){
				this.hide();
			}
		},
		_onClose: function(data, openingPanel){
			this._onPause(data, openingPanel);
			this.fireEvent("close", new EventObject({data: data, panel: this}));
		},
		title: function(title){
			if(typeof title == "undefined"){
				return this._title;
			}else{
				this._title = title;
			}
		},
		isOpen: function(){
			return this.panelId === _current;
		},
		show: function(){
			this.j.show();
			//this.j.appendTo(_bodyCon.scroller);
		},
		hide: function(){
			this.j.hide();
			//this.j.remove();
		},
		setTransition: function(transition){
			if("opening" in transition && "closing" in transition &&
				"incoming" in transition.opening && "outgoing" in transition.opening &&
				"incoming" in transition.closing && "outgoing" in transition.closing){
				this._transition = transition
			}else{
				throw new Error("Invalid transition object - " + JSON.stringify(transition));
			}
		},
		getTransition: function(){
			return this._transition;
		},
		setTransitionEvent: function(eventName){
			this.transitionEvent = eventName;
		},
		getTransitionEvent: function(){
			return this.transitionEvent;
		},
		incomingTransit: function(bFirstPanel){
			this.j.addClass("panel_shown");
			this.show();
			juci.requestAnimationFrame(this._onVisible, null, this);
		},
		_onVisible: function(){
			this.j.transition(this.getTransition()[juci.panel.currentDirection()].incoming, this.scrollIntoView, this, null);
		},
		scrollIntoView: function(){
			window.scrollTo(this.x, this.y);
			//this.j.css({"transform" : "none", "webkitTransform": "none", "msTransform" : "none", "mozTransform": "none", "oTransform" : "none"});
			juci.panel.fireEvent("visible", {panel:this, panelId: this.panelId});
		},
		outgoingTransit: function(fn, ctx, openingPanel){
			this.j.removeClass("panel_shown");
			//this.j.transition(openingPanel.getTransition()[juci.panel.currentDirection()].outgoing, fn, ctx, this.getTransitionEvent());
			this.j.transition(openingPanel.getTransition()[juci.panel.currentDirection()].outgoing, fn, ctx, null);
		},
		makeScroller: function(){
			var tempContainer = new juci.elem("<div></div>").appendTo(this.j);
			tempContainer.attr("juci-panel-id", this.panelId);
			this.content.appendTo(tempContainer);
			this.scroller = new juci.scrollable(tempContainer.el);
			this.scroller.juciElem = tempContainer;
			this._cb = juci.utils.getDelayedCallback(this._resizeScroller, this, 500);
			this.addListener("resume", this.resizeScroller, this);
			if(window.__mowbly__){
				__mowbly__.Device.bind("orientationchange", this.resizeScroller, this);
			}
			this._resizeCallback = juci.utils.getCallback(function(){
				this.resizeScroller();
			}, this);
			window.addEventListener("resize",  this._resizeCallback);
		},
		resizeScroller: function(arg){
			window.clearTimeout(this._tmr);
			this._tmr = window.setTimeout(this._cb, 100);
		},
		DefaultScrollerDiff: 50,
		_resizeScroller: function(arg){
			var tOffset = this.scroller.juciElem.offset().top;
			// TODO Check if it is overflowing the page, if so, then set the height else don't
			this.scroller.juciElem.height(juci.browserHeight() - (typeof arg === "undefined" ? this.DefaultScrollerDiff: arg) - tOffset);
			this.scroller.refresh();
		},
	};
	juci.inheritPrototypeToObject(panel, Observable);
	juci.exportMethod(panel, panel.open, "openPanel");
	juci.exportMethod(panel, panel.get, "getPanel");
	juci.exportMethod(panel, panel.close, "closePanel");
	juci.exportMethod(panel, panel.closeAll, "closeAll");
	juci.exportMethod(panel, panel.currentPanel, "currentPanel");
	juci.exportMethod(panel, panel.panelForElem, "panelForElem");
	this.extend(panel, Observable);
	juci.panel = panel;

	var dialog = function(j, transition){
		this._super = juci.panel;
		this._super(j, transition);
		// TODO Use on incoming event to take the element and put it in the dialog wrapper.
		// TODO The dialog wrapper should listen to all touch events, and close based on type of dialog, within except for elements contained in the dialog container
	}
	dialog.prototype = {
		type: "dialog",
		init: function(transition){
		 	this.cancellable = true;
		 	this.j.appendTo(_dialogWrapper.viewport);
			this._transition = transition ? transition : juci.dialog.DialogTransition;
			this.setTransitionEvent(juci.panel.getDefaultTransitionEvent());
		},
		_onIncoming: function(closingPanel, bAfterShown){
		 	if(bAfterShown){
		 		//this.j.onClick(juci.utils.stopPropagation);
		 		//_dialogWrapper.onTouchStart(this.checkAndClose, this);
		 		this._super();
		 	}else{
		 		_dialogWrapper.show();
		 		_dialogWrapper.transition({"visibility":"visible"});
		 		juci.requestAnimationFrame(this._onDialogShown, this, closingPanel, null, this);
		 	}
		},
		checkAndClose: function(evt){
			if(!evt.target.isChildOf(this.j)){
				juci.utils.stopPropagation(evt);
				juci.utils.preventDefault(evt);
				juci.closePanel();
			}
		},
		_onDialogShown: function(panel){
			_dialogWrapper.transition({"boxShadow": _dialogWrapper.shadowString, "webkitBoxShadow": _dialogWrapper.shadowString});
			this._onIncoming(panel, true);
		},
		_onVisible: function(){
			this.j.transition(this.getTransition()[juci.panel.currentDirection()].incoming);
		},
		_onOutgoing: function(openingPanel){
		 	//this.j.removeListener("tap", juci.utils.stopPropagation);
		 	//_dialogWrapper.removeListener("touchstart", this.checkAndClose, this);
		 	this._super(openingPanel);
		 	this.hide();
		 },
		outgoingTransit: function(fn, ctx, openingPanel){
		 	var callback = function(){
		 		_dialogWrapper.css("visibility", "hidden");
		 		_dialogWrapper.hide();
		 		fn.call(this);
		 	}
			this.j.transition(this.getTransition()[juci.panel.currentDirection()].outgoing, callback, ctx, null);
		}
	}
	// TODO Define constructor for the transition object and combine transition event as well
	dialog.DialogTransition = {
		"opening": {
			"incoming": {
				"webkitTransform": "scale(1, 1)",
				"webkitTransform": "translateZ(0px) scale3d(1, 1, 1)",
				MozTransform: "translateZ(0px) scale(1, 1)",
				msTransform: "scale(1, 1)",
				oTransform: "translateZ(0px) scale(1, 1)",
				transform: "translateZ(0px) scale(1, 1)",
				MozTransform: "translateZ(0px) scale3d(1, 1, 1)",
				oTransform: "translateZ(0px) scale3d(1, 1, 1)",
				transform: "translateZ(0px) scale3d(1, 1, 1)",
				"opacity": "1"
			},
			"outgoing": {
				"opacity": "0.9"
			}
		},
		"closing": {
			"incoming": {
				"opacity": "1"
			},
			"outgoing": {
				"webkitTransform": "scale(0.5, 0.5)",
				"webkitTransform": "translatez(0px) scale3d(0.5, 0.5, 1)",
				MozTransform: "translateZ(0px) scale(0.5, 0.5)",
				msTransform: "scale(0.5, 0.5)",
				oTransform: "translateZ(0px) scale(0.5, 0.5)",
				transform: "translateZ(0px) scale(0.5, 0.5)",
				MozTransform: "translateZ(0px) scale3d(0.5, 0.5, 1)",
				oTransform: "translateZ(0px) scale3d(0.5, 0.5, 1)",
				transform: "translateZ(0px) scale3d(0.5, 0.5, 1)",
				"opacity": "0"
			}
		}
	};
	this.extend(dialog, panel);
	juci.dialog = dialog;

	juci.showDialog = function(id){
		juci.openPanel(id);
	};
	juci.hideDialog = function(){
		juci.closePanel();
	};
	var alertDlg, confirmDlg;
	function getAlertDialog(){
		if(!alertDlg){
			alertDlg = new juci.dialog(new juci.elem("<div data-juci='dialog' class='juci_alert_dialog'><div></div></div>"));
			alertDlg.header = new juci.elem('<div class="juci_panel_name juci_float_left"><div class="juci_dialog_indicator"></div><div></div></div>').appendTo(alertDlg.j).children()[1];
			new juci.elem('<div class="juci_ctrl_separator"></div>)').appendTo(alertDlg.j);
			var ctt = new juci.elem('<div class="juci_dialog_content"></div>)').appendTo(alertDlg.j);
			alertDlg.content = new juci.elem('<div class="juci_dialog_text"></div>').appendTo(ctt);
			alertDlg.j.append(new juci.elem('<div class="juci_vertical_bbar"><button class="juci_dialog_button" data-juci="button" id="'+alertDlg.j.getId()+'__ok">OK</button></div>'));
			alertDlg.isFirstTime();
			alertDlg.clazz = "juci_alert_dialog";
			alertDlg.button = juci.getControl(alertDlg.j.getId() + "__ok");
			function hideAlert(){
				juci.hideDialog();
				// Callback
			}
			alertDlg.setClass = function(clazz){
				this.j.removeClass(this.clazz);
				this.clazz = clazz;
				this.j.addClass(this.clazz);
			}
			alertDlg.button.onClick(hideAlert);
			alertDlg.hide();
		}
		return alertDlg;
	}
	/**#nocode-*/
	/**
		@name showAlertDialog
		@methodOf juci
		@category panel
		@description Displays an alert dialog with the specified title and message. The dialog dismisses when user taps on the button in the dialog.
		@param {String} message A string containing the message text to display in the alert dialog. The string can also be a formatted HTML content.
		@param {String} [title = Alert] A string containing the title text to display in the alert dialog.
		@param {String} [buttonText = OK] A string containing the text to display in the button in the dialog.
		@param {Function} [callback] A function to invoke when user taps on the button in the alert dialog.
		@signature juci.showAlertDialog(message);
		@signature juci.showAlertDialog(message, callback);
		@signature juci.showAlertDialog(title, message);
		@signature juci.showAlertDialog(title, message, callback);
		@signature juci.showAlertDialog(message, callback, btnText);
		@signature juci.showAlertDialog(title, message, btnText);
		@signature juci.showAlertDialog(title, message, btnText, callback);
	*/
	juci.showAlertDialog = function(){
		_showAlert(arguments, "Alert");
	};
	function _showAlert(args, defaultTitle, clazz){
		var dlg = getAlertDialog();
		var noOfArgs = args.length, title, message, btnText, callback;
		if(noOfArgs == 1){
			message = args[0];
		}else if(noOfArgs == 2){
			if(args[1] instanceof Function){
				message = args[0];
				callback = args[1];
			}else{
				title = args[0];
				message = args[1];
			}
		}else if(noOfArgs == 3){
			if(args[2] instanceof Function){
				title = args[0];
				message = args[1];
				callback = args[2];
			}else if(args[1] instanceof Function){
				message = args[0];
				callback = args[1];
				btnText = args[2];
			}else{
				title = args[0];
				message = args[1];
				btnText = args[2];
			}
		}else if(noOfArgs == 4){
			title = args[0];
			message = args[1];
			buttons = args[2];
			callback = args[3];
		}else{
			throw new TypeError("Insufficient arguments");
		}
		dlg.header.html(title ? title : defaultTitle);
		dlg.content.html(message ? message : "");
		dlg.button.value(btnText ? btnText : "OK");
		dlg.setClass(clazz ? clazz : "juci_alert_dialog");
		if(!dlg.isOpen()){
			dlg.button.j.onClickOnce(callback);
			dlg.open();
		}
	}
	/**
		@name showInfoDialog
		@methodOf juci
		@category panel
		@description Displays an info dialog with the specified title and message. The dialog dismisses when user taps on the button in the dialog.
		@param {String} message A string containing the message text to display in the info dialog. The string can also be a formatted HTML content.
		@param {String} [title = Info] A string containing the title text to display in the info dialog.
		@param {String} [buttonText = OK] A string containing the text to display in the button in the dialog.
		@param {Function} [callback] A function to invoke when user taps on the button in the info dialog.
		@signature juci.showInfoDialog(message);
		@signature juci.showInfoDialog(message, callback);
		@signature juci.showInfoDialog(title, message);
		@signature juci.showInfoDialog(title, message, callback);
		@signature juci.showInfoDialog(message, callback, btnText);
		@signature juci.showInfoDialog(title, message, btnText);
		@signature juci.showInfoDialog(title, message, btnText, callback);
	*/
	juci.showInfoDialog = function(){
		_showAlert(arguments, "Info", "juci_info_dialog");
	};
	/**
		@name showWarningDialog
		@methodOf juci
		@category panel
		@description Displays an warning dialog with the specified title and message. The dialog dismisses when user taps on the button in the dialog.
		@param {String} message A string containing the message text to display in the warning dialog. The string can also be a formatted HTML content.
		@param {String} [title = Warning] A string containing the title text to display in the warning dialog.
		@param {String} [buttonText = OK] A string containing the text to display in the button in the dialog.
		@param {Function} callback A function to invoke when user taps on the button in the warning dialog.
		@signature juci.showWarningDialog(message);
		@signature juci.showWarningDialog(message, callback);
		@signature juci.showWarningDialog(title, message);
		@signature juci.showWarningDialog(title, message, callback);
		@signature juci.showWarningDialog(message, callback, btnText);
		@signature juci.showWarningDialog(title, message, btnText);
		@signature juci.showWarningDialog(title, message, btnText, callback);
	*/
	juci.showWarningDialog = function(title, message, btnText, callback){
		_showAlert(arguments, "Warning", "juci_warning_dialog");
	};
	/**
		@name showErrorDialog
		@methodOf juci
		@category panel
		@description Displays an error dialog with the specified title and message. The dialog dismisses when user taps on the button in the dialog.
		@param {String} message A string containing the message text to display in the error dialog. The string can also be a formatted HTML content.
		@param {String} [title = Error] A string containing the title text to display in the error dialog.
		@param {String} [buttonText = OK] A string containing the text to display in the button in the dialog.
		@param callback {Function} A function to invoke when user taps on the button in the error dialog.
		@signature juci.showErrorDialog(message);
		@signature juci.showErrorDialog(message, callback);
		@signature juci.showErrorDialog(title, message);
		@signature juci.showErrorDialog(title, message, callback);
		@signature juci.showErrorDialog(message, callback, btnText);
		@signature juci.showErrorDialog(title, message, btnText);
		@signature juci.showErrorDialog(title, message, btnText, callback);
	*/
	juci.showErrorDialog = function(title, message, btnText, callback){
		_showAlert(arguments, "Error", "juci_error_dialog");
	};
	function getConfirmDialog(){
		if(!confirmDlg){
			confirmDlg = new juci.dialog(new juci.elem("<div data-juci='dialog' class='juci_alert_dialog'><div></div></div>"));
			confirmDlg.header = new juci.elem('<div class="juci_panel_name"></div>').appendTo(confirmDlg.j);
			new juci.elem('<div class="juci_ctrl_separator"></div>)').appendTo(confirmDlg.j);
			var ctt = new juci.elem('<div class="juci_dialog_content"></div>)').appendTo(confirmDlg.j);
			confirmDlg.content = new juci.elem('<div class="juci_dialog_text"></div>').appendTo(ctt);
			confirmDlg.j.append(new juci.elem('<div class="juci_group"><button class="juci_dialog_button juci_T1" data-juci="button" data-option="0">0</button>'+
				'<button class="juci_dialog_button juci_T2" data-juci="button" data-option="1">1</button>' +
				'<button class="juci_dialog_button juci_T3" data-juci="button" data-option="2">2</button>' +
			'</div>'));
			confirmDlg.isFirstTime();
			confirmDlg.buttons = confirmDlg.j.findByClass("juci_group")[0];
			function hideAlert(e){
				juci.hideDialog();
				e.option = parseInt(e.delegatee.attr("data-option"), 10);
			}
			confirmDlg.buttons.onClick(hideAlert, null, ".juci_button");
			confirmDlg.hide();
		}
		return confirmDlg;
	}
	/**
		@name showConfirmDialog
		@methodOf juci
		@category panel
		@description Displays a confirm dialog with the specified title and message. By default, the dialog displays Yes, No and Cancel buttons which can be customized by specifying labels. The dialog dismisses when user taps on either of the buttons in the dialog.
		@param {String} message A string containing the message text to display in the alert dialog. The string can also be a formatted HTML content.
		@param {String} [title = Alert] A string containing the title text to display in the alert dialog.
		@param {Array} [buttons = ['Yes', 'No', 'Cancel']] An array of strings containing the text to display in the buttons in the confirm dialog. The minimum length of the array is 2 and maximum is 3.
		@param {Function} [callback] A function to invoke when user taps on the button in the confirm dialog. The function receives the following object as parameter.
		@param {Object} callback.e
		@param {Number} callback.e.option A number containing the index of the button tapped by the user. The index starts from 0 starting from the first button displayed in the dialog.
		@signature juci.showConfirmDialog(message, callback);
		@signature juci.showConfirmDialog(message, buttons, callback);
		@signature juci.showConfirmDialog(title, message, callback);
		@signature juci.showConfirmDialog(title, message, buttons, callback);
	*/
	juci.showConfirmDialog = function(){
		var p = getConfirmDialog(), noOfArgs = arguments.length, title, message, buttons, callback;
		if(noOfArgs == 2){
			message = arguments[0];
			callback = arguments[1];
		}else if(noOfArgs == 3){
			if(arguments[1] instanceof Array){
				message = arguments[0];
				buttons = arguments[1];
			}else{
				title = arguments[0];
				message = arguments[1];
			}
			callback = arguments[2];
		}else if(noOfArgs == 4){
			title = arguments[0];
			message = arguments[1];
			buttons = arguments[2];
			callback = arguments[3];
		}else{
			throw new TypeError("Insufficient arguments");
		}
		p.header.html(title ? title : "Confirm");
		p.content.html(message ? message : "");
		var btns = p.buttons.children();
		if(buttons.length == 2){
			btns[2].hide();
			btns[0].val(buttons[0]);
			btns[0].removeClass("juci_T1");
			btns[0].addClass("juci_H1");
			btns[1].val(buttons[1]);
			btns[1].removeClass("juci_T2");
			btns[1].addClass("juci_H2");
		}else if(buttons.length == 3){
			btns[0].val(buttons[0]);
			btns[1].val(buttons[1]);
			btns[2].val(buttons[2]);
			btns[2].show();
			btns[0].removeClass("juci_H1");
			btns[0].addClass("juci_T1");
			btns[1].removeClass("juci_H2");
			btns[1].addClass("juci_T2");
		}else{
			btns[0].val("Yes");
			btns[1].val("No");
			btns[2].val("Cancel");
			btns[2].show();
			btns[0].removeClass("juci_H1");
			btns[0].addClass("juci_T1");
			btns[1].removeClass("juci_H2");
			btns[1].addClass("juci_T2");
		}
		if(!p.isOpen()){
			p.buttons.onClickOnce(callback, null, ".juci_button");
			p.open();
		}
	};

	/**
		@namespace
		@name actionBar
		@exports actionBar as actionbar
		@augments basecontrol
		@description actionbar creates a footer based control with buttons,i.e. actions to listen to. Triggers polyfill to enable internal scrolling for the panel which the actionbar is attached to.
		@note Beta feature. APIs and functionalities are subject to change.
		@dataattribute {String} data-juci A string with value <i>actionbar</i>.
		@js function actionBarHandler(e){
	$m.toast("U chose - " + e.action);
}
		@html <div data-juci="actionbar"
	data-buttons="back: 'images/undo.png', add: 'images/plus.png', refresh: 'images/spin.png', info: 'images/info.png'"
	data-handler="actionBarHandler">
</div>
<div data-juci="actionbar" data-handler="actionBarHandler">
	<button class="juci_actionbar_button" data-action="back"><img src="images/undo.png"></button>
	<button class="juci_actionbar_button" data-action="add"><img src="images/plus.png"></button>
	<button class="juci_actionbar_button" data-action="refresh"><img src="images/spin.png"></button>
	<button class="juci_actionbar_button" data-action="info"><img src="images/info.png"></button>
	<button class="juci_actionbar_button" data-action="info"><img src="images/info.png"></button>
</div>
	*/
	// Beta
	var actionBar = function(elem){
		this._super = juci.controls.basecontrol;
		this._super(elem);
	};
	actionBar.getActionBarViewPort = function(){
		if(!this._actionBarViewPort){
			this._actionBarViewPort = new juci.elem("<div class='juci_actionbar_viewport'></div>").appendTo(_bodyCon);
		}
		return this._actionBarViewPort;
	};
	actionBar.prototype = {
		type: "actionbar",
		init: function(){
			this.j.removeClass("juci_basecontrol");
			var cPanel = juci.panelForElem(this.j);
			var frm = cPanel.j.find("[data-juci=form]")[0];
			(frm ? juci.getControl(frm) : cPanel).listenOnce("init", juci.utils.getDelayedCallback(this.refreshScroller, this, 300));
			// data-associated="controlid"
			var listPanes = cPanel.j.find(".juci_xlist_pane");
			if(listPanes.length > 1 || listPanes.length == 0 || frm){ //[data-bind^=jucilist]
				listPanes.forEach(function(j){
					var listCtrl = juci.getControl(j.closest("[data-juci]"));
					listCtrl.scroller.juciElem.css("height", "auto");
					listCtrl.scroller.destroy();
					__mowbly__.Device.unbind("orientationchange", listCtrl.resizeScroller, listCtrl);
					delete listCtrl.scroller;
					window.removeEventListener("resize",  listCtrl._resizeCallback);
					cPanel.removeListener("resume", listCtrl.resizeScroller, listCtrl);
				});
				cPanel.makeScroller();
			}
			cPanel.addListener("resume", this.show, this);
			cPanel.addListener("pause", this.hide, this);
			actionBar.getActionBarViewPort().append(this.j);
			this.j.hide();
			var btnType = ".juci_"+this.type+"_button";
			var scrollContainer = new juci.elem('<div class="juci_'+this.type+'_wrapper"></div>').appendTo(this.j)
			this.bar = new juci.elem('<div class="juci_'+this.type+'_bar"></div>').appendTo(scrollContainer);
			this.btnConfig = {};
			var btns = this.j.find(btnType);
			btns.forEach(function(btn){
				btn.appendTo(this.bar);
				this.btnConfig[btn.attr("data-action")] = btn.children()[0].val().replace(".png", "");
			}, this);
			var btnsAttr = this.j.attr("data-buttons");
			var btnarr = new Function("return {" + ( btnsAttr ? btnsAttr : "") + "}")();
			var tmpl = this.getButtonTemplate();
			var n = 0;
			for(var k in btnarr){
				this.btnConfig[k] = btnarr[k];
				new juci.elem(tmpl.replace("$action", k).replace("$img", btnarr[k])).appendTo(this.bar);
				n++;
			}
			this.scroller = new juci.scrollable(scrollContainer.el, {
				snap: true,
				momentum: false,
				hScrollbar: false,
				vScroll: false
			});
			var hn = this.j.attr("data-handler");
			this.handler = hn ? window[hn] : juci.utils.EmptyMethod;
			this.bar.onClick(this.fireClick, this, btnType);
		},
		refreshScroller: function(){
			var bs = this.j.findByClass("juci_actionbar_button");
			if(bs.length > 0){
				var width = 0;
				bs.forEach(function(b){
					width += b.outerWidth() + 20;
				});
				this.bar.width(width + 10);
				this.scroller.refresh();
				this.hide();
				juci.utils.setTimeout(this.scroller.refresh, this.scroller, 200);
				this.show();
			}
		},
		show: function(){
			juci.documentBody.css("overflow", "hidden");
			document["on"+juci.events.TOUCHSTART] = function(e){
				if(["INPUT","TEXTAREA","SELECT","BUTTON"].indexOf(e.target.tagName.toUpperCase()) === -1){
					e.preventDefault();
					if(document.activeElement){
						document.activeElement.blur();
					}
				}
			};
			this._super();
		},
		hide: function(){
			juci.documentBody.css("overflow", "");
			document["on"+juci.events.TOUCHSTART] = null;
			this._super();
		},
		getButtonTemplate: function(){
			return "<button class='juci_actionbar_button' data-action='$action'><img src='$img'/></button>";
		},
		getButton: function(action, index){
			return this.bar.findByAttrVal("data-action", action)[0];
		},
		/**
			@methodOf actionbar.prototype
			@description Adds an action button to the actionbar at the specified index.
			@param action {String} Name of the action
			@param img {String} Image url to the action
			@param index {Number} Index at which the button needs to be added
		*/
		addButton: function(action, img, index){
			// TODO Check for button element passed as well since actionbar buttons may or may not have image instead could have text or some other structure
			//Add width, refresh scroller
			var btn = new juci.elem(this.getButtonTemplate().replace("$action", action).replace("$img", img)).appendTo(this.bar);
			if(typeof index == "number"){
				btn.insertBefore(this.bar.children()[index]);
			}
			this.btnConfig[action] = img;
			juci.utils.getDelayedCallback(this.refreshScroller, this, 0)();
		},
		/**
			@methodOf actionbar.prototype
			@description Removes the action button related to the action
			@param action {String} Name of the action
		*/
		removeButton: function(action /*, index*/){
			//Remove width, refresh scroller
			var btn = this.bar.findByAttrVal("data-action", action)[0];
			delete this.btnConfig[action];
			if(btn){
				btn.remove();
				juci.utils.getDelayedCallback(this.refreshScroller, this, 0)();
			}
		},
		fireClick: function(e){
			var action = e.delegatee.attr("data-action");
			var evt = new EventObject(e, e);
			evt.action = action;
			this.handler(evt);
			this.fireEvent("_action_"+action, evt);
		},
		/**
			@methodOf actionbar.prototype
			@description Adds a listener for an action
			@param action {String} Name of the action
			@param handler {Function} A handler function to execute when the action is chosen.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		addClickListener: function(action, fp, ctx){
			this.addListener("_action_"+action, fp, ctx);
		},
		/**
			@methodOf actionbar.prototype
			@description Removes a listener for an action
			@param action {String} Name of the action
			@param handler {Function} A handler function to execute when the action is chosen.
			@param {Object} [context] Context in which the <i>handler</i> function should execute.
		*/
		removeClickListener: function(action, fp, ctx){
			this.removeListener("_action_"+action, fp, ctx);
		}
	};
	this.extend(actionBar, juci.controls.basecontrol);
	juci.controls.actionbar = actionBar;
	/**
		@namespace
		@name MDOMEventObject
		@augments EventObject
		@description Extends {@link EventObject} to work with HTML events. MDOMEventObject provides APIs to get the binding data and binding context for the target element of the event.
		@property {juci.elem} target The target element.
		@property {juci.elem} currentTarget The currentTarget element.
	*/
	function MDOMEventObject(e, delegateeResult, currCoords, startCoords){
		this.setDOMEvent(e, delegateeResult);
		if(currCoords){
			this.currCoords = currCoords;
		}
		if(startCoords){
			this.startCoords = startCoords;
		}
		this._super = EventObject;
		this._super(null, e);
	}
	/**@hidden*/
	MDOMEventObject.prototype.setDOMEvent = juci.isBuggyAndroidGalaxyTab ? function(e, delegateeResult){
		if(e.target)
			this.target = new juci.elem(e.target);
		else
			this.target = new juci.elem(e.srcElement);
		this.currentTarget = new juci.elem(e.currentTarget ? e.currentTarget : e._currentTarget);
		this.e = e;
		if(delegateeResult){
			this.delegatee =  new juci.elem(delegateeResult[1]);
			this.delegateeSelector = delegateeResult[0]
		}else{
			this.delegatee = null;
			this.delegateeSelector = "";
		}
		this.wrappedData = ko.dataFor(e.target);
		this.bindingContext = ko.contextFor(e.target);
	} : function(e, delegateeResult){
		if(e.target)
			this.target = new juci.elem(e.target);
		else
			this.target = new juci.elem(e.srcElement);
		this.currentTarget = new juci.elem(e.currentTarget);
		this.e = e;
		if(delegateeResult){
			this.delegatee =  new juci.elem(delegateeResult[1]);
			this.delegateeSelector = delegateeResult[0]
		}else{
			this.delegatee = null;
			this.delegateeSelector = "";
		}
		this.wrappedData = ko.dataFor(e.target);
		this.bindingContext = ko.contextFor(e.target);
	};
	/**
		@description Returns the mapped data from the view model for the currentTarget element
		@return {Object}
	*/
	MDOMEventObject.prototype.getWrappedData = function(){
		return ko.dataFor(this.e.target);
	}
	/**
		@description Returns the unmapped data from the view model for the currentTarget element
		@return {Object}
	*/
	MDOMEventObject.prototype.getUnwrappedData = function(){
		return ko.mapping.toJS(this.getWrappedData());
	}
	/**@hidden*/
	MDOMEventObject.prototype.getBindingContext = function(){
		return ko.contextFor(this.e.target);
	}
	MDOMEventObject.prototype.preventDefault = function(){
		this._super();
		this.e.preventDefault();
	}
	MDOMEventObject.prototype.stopPropagation = function(){
		this.e.cancelBubble = true;
		this.e.stopPropagation();
	}
	this.extend(MDOMEventObject, EventObject);
	window.MDOMEventObject = MDOMEventObject;
	return {};
});
/**
	@namespace
	@name databinding
@description
juci provides interfaces and properties to bind UI controls and elements to JSON data. juci uses <a target="_blank" href="http://www.knockoutjs.com">knockout.js</a> framework to observe and trigger dependencies based on the MVVM architecture for maintaining view and data consistency. All controls and elements refer to the default view model available in juci, for dependency detection and updation. Each item on the view model is referred to as a <i>dataset</i> in juci. A dataset can be added to the view model by referencing it with a user defined key. Refer example 1.
<br/><br/>
@example #name Example 1 #js // Example 1
juci.addDataset("key", "value");
#description Any control or element can be bound to a dataset with that key. For example,
#html <!--Example 1-->
<div data-juci="text" data-bind="ref: key"></div>
@description juci provides APIs to add, update, get, set dataset. Advanced APIs to add computed dataset, (i.e. a dataset that is generated based on the value of another dataset), adding dataset reference for a form are available. A generic collection can be added to the viewmodel in which each key of the object becomes references for controls. Refer example 2.
@example #name Example 2 #description In the above to access key4, the data-bind reference should be key3().key4, since key3 is also an observable.
#js // Example 2
juci.addDataset({"key1": "value1", "key2" : [], "key3" : { "key4": "value4"}});
@example #name Example 3 #description If there is more control needed on what part of the dataset needs to be observed for changes, as shown below<br/><br/>
#js // Example 3
juci.setDataset("key3", {"key4": ko.observable("value4")});
juci.addDataset("key3", {"key5":{"key4": ko.observable("value4")}}, true); // key5 will not be observable
@example #name Example 4 #js // Example 4
juci.addDataset({'key1': ko.observable('value1'), key2 : ko.observable([]), key3 : { key4: ko.observable('value4')}}, {copy: ["key3"]});
#description Another pattern is using the knockout mapping plugin config to determine properties for ignoring, addition, copying, etc. (Example 4)<br/><br/>Further details regarding the usage of mapping plugins can be found <a target="_blank" href="http://knockoutjs.com/documentation/plugins-mapping.html">in Knockoutjs.</a><br/><br/>
@example #name Example 5
#description An example for computed datasets - Setting options for city based on chosen country in example 5.
#js // Example 5
var obj ={
	"countries": [
		{
			"name": "India",
			"cities": ["Hyderabad", "Chennai", "Bangalore"]
		},
		{
			"name": "USA",
			"cities": ["New York", "Los Angeles", "Miami"]
		},
		{
			"name": "Spain",
			"cities": ["Madrid","Barcelona", "Valencia"]
		}
	],
	"country": "",
	"city": null
};
juci.addDataset(obj);
juci.addComputedDataset("cities", function(){
	var selCountry = this.country();
	this.city(null);
	return selCountry ? selCountry.cities() : [];
});
function formatter(item){ return item.name; }

#html <!--Example 5-->
<div data-juci="selectbox" data-label="Country" data-formatter="formatter" data-bind="optionsText: formatter, optionsList: countries, ref: country"></div>
<div data-juci="selectbox" data-label="City" data-bind="optionsList: cities, ref: city"></div>
@example #name Example 6 #js // Example 6
juci.addDataset("t", [{"a.tt": {"c": "asd"}}], {
	"copyExp": ["t[$i]['a.tt']"] //$i is mapped as the iterator
});
#description A complex mapping to map iteratively only specific keys of an object using <i>copyRegex</i> and <i>observeRegex</i>
#html <!--Example 6-->
<div data-juci="list" data-bind="ref: t" data-title="$index"></div>
@example #name Example 7 #js // Example 7
function getBindingConfig(){
	return {
		"copyExp": ["['a.tt']"]
	};
}
#description Based on Example 6 and extending for the list content view to map only specific fields
#html
<div data-juci="list" data-bind="ref: t" data-title="$index" data-binder-config="getBindingConfig">
	<div data-juci="listcontent">
		<div data-juci="text" data-bind="ref: $data['a.tt'].c"></div>
		<div class="juci_vertical_bbar">
			<button type="submit" data-juci="button">Save</button>
		</div>
	</div>
</div>
@description A user interface built with juci can be control-driven or data-driven. Control-driven interfaces are primarily targeted at simple uses which does not involve too many interconnected data that undergoes constant updation and additions. Control-driven interfaces use control.value() to get and set values on the control. In this case, to get the control, the control can be assigned an ID and referenced through juci.getControl(id) API. For example, simple interfaces such as login, or user information form, etc. can be control-driven.
<br/><br/>
Data-driven interfaces are targeted at complex usage which involve data that undergo updation and additions. Using the data-bind attribute available on juci controls, the control can be bound to the data, such that any updates in the data is reflected on the control and any changes made by the user on the control is reflected in the data. For example, interfaces such as a task list, form for each task in the list for updation, etc. can be data-driven.
<br/><br/>
Any change on the dataset defined can be observed by binding listeners to the key defined for the dataset through {@link juci#bindDatasetListener}.
<br/><br/>
Custom data-binding verbs included with juci, which can be used in a similar way as other verbs described in knockout.js
<ol>
	<li>show</li>
	<li>enabled</li>
	<li>disabled</li>
	<li>img</li>
	<li>display</li>
</ol>
*/
/**
	@namespace
	@name query
	@description juci offers set of rich APIs to query on the DOM. Based on <a href="" target="_blank">zepto.js</a>, juci exposes the below APIs
*/
/**
	@namespace
	@name utilities
	@description
*/