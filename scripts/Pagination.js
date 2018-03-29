(function(){
	$m.juci.dataset("currentPage", 0);
	$m.juci.dataset("navigatePage", null);
	$m.juci.dataset("pageSize", PAGESIZE);
	$m.juci.dataset("totalPages", 0);
	$m.juci.dataset("totalCount", 0);
	var bSetup = false;
	
	function doNext(){
		var page = $m.juci.dataset("currentPage");
		var pageSize = $m.juci.dataset("pageSize");
		var totalPages = $m.juci.dataset("totalPages");
		if(isNextAllowed(page, pageSize, totalPages)){
			var from = (page)*pageSize;
			page += 1;
			var to = (page)*pageSize;
			juci.dataset("currentPage", page);
			juci.dataset("navigatePage", page);
			return {from: from+1, to: to};
		}else{
			return null;
		}
	}
	function isNextAllowed(page, totalPages){
		return page < totalPages;
	}
	function next(obj){
		var n = doNext();
		if(n){
			obj.refreshItems(false,n.from, n.to);
		}
	}
	function isPrevAllowed(page, totalPages){
		return page > 1;
	}
	
	function doPrev(){
		var page = $m.juci.dataset("currentPage");
		var pageSize = $m.juci.dataset("pageSize");
		var totalPages = $m.juci.dataset("totalPages");
		if(isPrevAllowed(page, totalPages)){
			page -= 1;
			var to = (page)*pageSize;
			var from = (page-1)*pageSize;
			juci.dataset("currentPage", page);
			juci.dataset("navigatePage", page);
			return {from: from+1, to: to};
		}else{
			return null;
		}
	}
	
	function prev(obj){
		var n = doPrev();
		if(n){
			obj.refreshItems(false,n.from, n.to);
		}
	}
	function goFirst(){
		// TODO
	}
	function goLast(){
		// TODO
	}
	function reset(){
		bSetup = false;
		$m.juci.dataset("currentPage", 0);
		juci.dataset("navigatePage", 0);
		$m.juci.dataset("totalPages", 0);
		$m.juci.dataset("totalCount", 0);
	}
	function setup(count){
		// calculate number of pages
		if(!bSetup){
			var totalItems = count;
			var pageSize = $m.juci.dataset("pageSize");
			$m.juci.dataset("totalCount", totalItems);
			$m.juci.dataset("currentPage", 1);
			juci.dataset("navigatePage", 1);
			$m.juci.dataset("totalPages", Math.ceil(totalItems/pageSize));
			bSetup = true;
		}
	}
	function isSetup(){
		return bSetup;
	}
	function getCurrent(){
		var page = $m.juci.dataset("currentPage");
		var pageSize = $m.juci.dataset("pageSize");
		var to = (page)*pageSize;
		var from = (page-1)*pageSize;
		return {from: from+1, to: to};
	}
	function navigateTo(p,obj){
		var page = $m.juci.dataset("currentPage");
		var pageSize = $m.juci.dataset("pageSize");
		var totalPages = $m.juci.dataset("totalPages");
		if(page == p || p < 1 || p > totalPages){
			juci.dataset("navigatePage", page);
		}else{
			page = p;
			var to = (page)*pageSize;
			var from = (page-1)*pageSize;
			$m.juci.dataset("currentPage", page);
			juci.dataset("navigatePage", page);
			obj.refreshItems(false,from+1, to);
		}
	}
	window.Pagination = {
		next: next,
		prev: prev,
		setup: setup,
		reset: reset,
		current: getCurrent,
		isSetup: isSetup,
		navigateTo: navigateTo
	};
})();