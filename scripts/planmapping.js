var planMap = {};
$m.onData(function(eventObject){
	getPlanmaster();
});

function getPlanmaster(){
	var protect = $m.juci.dataset("protect");
	var plans = [];
	plans = plans.concat(protect);
	var saving	= $m.juci.dataset("saving");
	plans = plans.concat(saving);
	var invest = $m.juci.dataset("invest");
	plans = plans.concat(invest);
	var health = $m.juci.dataset("health");
	plans = plans.concat(health);
	var retirement = $m.juci.dataset("retirement");
	plans = plans.concat(retirement);
	var child = $m.juci.dataset("child");
	plans = plans.concat(child);
	var solutions = $m.juci.dataset("solutions");
	plans = plans.concat(solutions);
	for(var i=0;i<plans.length;i++){
		if(plans[i].productCode){
			planMap[plans[i].productCode] = plans[i].title;
		}	
	}
	return planMap;
}

function getPlanname(plancode){
	if(plancode){
		return planMap[plancode];
	}
	return "Not Found";
}