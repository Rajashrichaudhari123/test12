$m.juci.addDataset("testimonialsList",["ARDM","Customer"]);
$m.onReady(function(){
	$m.juci.dataset('headerName',"Testimonials");
});

function clickTestimonial(event){
	var testimonial_value = event.target.textContent;
	if(testimonial_value == "Voice of ARDMYour friends tell their stories" || testimonial_value == "Your friends tell their stories"){
		$m.openChildBrowser("ARDM","http://lifelineuat.reliancelife.com/Resources/Resoures.aspx?Input=Sales",{"navigation": true,"address": [],	"patterns": [{}]});
	}else{
		$m.openChildBrowser("ARDM","http://lifelineuat.reliancelife.com/Resources/Resoures.aspx?Input=Customer",{"navigation": true,"address": [],	"patterns": [{}]});
	}
}