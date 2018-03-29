var randomScalingFactor = function() {
	return Math.round(Math.random() * 100);
	
};
var pieconfig = {
    type: 'pie',
    data: {
        datasets: [{
            data:[] ,
            backgroundColor: [
                window.chartColors.red,
                window.chartColors.orange,
                window.chartColors.green,
                window.chartColors.blue,
            ],
            label: 'Dataset 1'
        }],
        labels: []
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          render: 'value'
        }
  }
};

function getProductMix(){
	var service = new ServiceLibrary();
	var requestData = {"ARDMSapCode":"","BMSapCode":"","DT":"1516579200000","DateCode":"QTD","ENDDATE":"","QRTR":"Quarter4","RMSapCode":"70052392","STARTDATE":"","Type":"BM","ZMSapCode":""}
 	var getProductMixDataCallback = function(res){
 		if(res.lstProductMixDataResponse_List.length > 0){
 			var resdata = res.lstProductMixDataResponse_List[0].lstProductMixDataResponse;
 			var lables = [];
 			var datapoint = [];
 			for(var i=0;i<resdata.length;i++){
 				lables.push(resdata[i].Data);
 				datapoint.push(resdata[i].DataValues);
 			}
 			pieconfig.data.datasets[0].data = datapoint;
 			pieconfig.data.labels = lables;
 			var ctx = document.getElementById("canvas").getContext("2d");
			window.myPie = new Chart(ctx, pieconfig);	
 		}
 		console.log(JSON.stringify(res));
 	}
	service.getProductMixData(getProductMixDataCallback,requestData);
}

$m.onReady(function(){
/*	
	Chart.pluginService.register({
		afterDraw: function (chart) {
	        if (chart.data.datasets[0].data.length === 0) {
	            // No data is present
	            var ctx = chart.chart.ctx;
	            var width = chart.chart.width;
	            var height = chart.chart.height
	            chart.clear();
	
	            ctx.save();
	            ctx.textAlign = 'center';
	            ctx.textBaseline = 'middle';
	            ctx.font = "20px normal 'Helvetica Nueue'";
	            ctx.fillText('No data to display', width / 2, height / 2);
	            ctx.restore();
	        }
        }
	}); */
	getProductMix();
});
