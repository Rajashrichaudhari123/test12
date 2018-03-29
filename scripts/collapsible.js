/**
 * collapsible.js
 * @author CloudPact Technologies
 * @description : Collapsible library.
 **/

var tabs = [];
$m.onReady(function() {
	$m.juci.find(".tab .juci_thinbar").forEach(function(el, idx){
		tabs.push(false);
	//	 el.el.addEventListener("click",getToggleHandler(idx))
		el.onClick(getToggleHandler(idx));
	});
});

function getToggleHandler(idx) {
	var toggleTab = function(event) {
		tabs[idx] = event.currentTarget.parent().toggleClass("visible");
	};
	return toggleTab;
}