/**
 * AsyncIterator File.js
 * @author CloudPact Technologies
 * @description : This Library is for iterating the function calls.
 **/

(function(){
	function EmptyFunction(){}
	function AsyncIterator(array, step, start, end){
		this.array = array;
		this.currentIndex = -1;
		this.stepFn = step || EmptyFunction;
		this.startFn = start || EmptyFunction;
		this.endFn = end || EmptyFunction;
	}
	AsyncIterator.prototype.isStarting = function(){
		return this.currentIndex === 0;
	};
	AsyncIterator.prototype.isEnding = function(){
		return this.currentIndex === this.array.length;
	};
	AsyncIterator.prototype.current = function(){
		return this.array[this.currentIndex];
	};
	AsyncIterator.prototype.size = function(){
		return this.array.length;
	};
	AsyncIterator.prototype.step = function(){
		this.currentIndex++;
		if(this.isStarting()){
			this.startFn(this);
		} else if(this.isEnding()){
			this.endFn(this);
			return;
		}
		this.stepFn(this);
	};
	juci.AsyncIterator = $m.AsyncIterator = AsyncIterator;
})();