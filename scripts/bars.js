
function barGraph(){
//	if( myChart!==undefined)
//   	myChart.destroy();
	var ctx = document.getElementById("busiChart").getContext("2d");
	
 myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
            label: "Logins",
            data: b_values,
               fillColor: "rgb(166, 196, 133)",
                strokeColor: "rgb(166, 196, 133)",
                highlightFill: "rgb(166, 196, 133)",
                highlightStroke: "rgb(166, 196, 133)",
            backgroundColor:"rgb(166, 196, 133)",
        	borderWidth: 0
        },
        
        {
            label: "Issuance",
            data: b_value1,
            fillColor: "rgb(118, 185, 234)",
                strokeColor: "rgb(118, 185, 234)",
                highlightFill: "rgb(118, 185, 234)",
                highlightStroke: "rgb(118, 185, 234)",
            backgroundColor:"rgb(118, 185, 234)",
        	borderWidth: 0
        }
        ]
    },
    options: {
    	
        //String - A legend template
       
       	
      
       	
       
        scaleBeginAtZero:true,
         legend: {
			display: true,
//			onClick: function (e) {
//     		   e.stopPropagation();
//			}
		},
        scales: {
               xAxes: [{
               			display: true,
						gridLines: {
							display:false,
						},ticks: {
			                suggestedMin: 0,
			                beginAtZero: true, 
			                fixedStepSize : 0
			            }   
	            }],
	    yAxes: [{
	    //	display:true,
	                gridLines: {
	                    display:true
	                   
	                }
	              
	                
	            }]
            },
//		tooltips: {
//			display:true,
//			 showTooltips: true,
//       
//         tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
////			callbacks: {
////				title: function(tooltipItem, data) {
////					return tooltipItem[0].yLabel[0]
////				}
////			}
//		},
		onAnimationComplete: function()
	    {
	    	this.showTooltip(this.datasets[0].bars, true);
		},
		
//		 	legendTemplate :'<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    },
});
            
}
//function barGraph(){
// var barData = {
//        labels: ["January", "February", "March", "April", "May", "June", "July"],
//        datasets: [
//            {
//                label: "My First dataset",
//                fillColor: "rgba(220,220,220,0.5)",
//                strokeColor: "rgba(220,220,220,0.8)",
//                highlightFill: "rgba(220,220,220,0.75)",
//                highlightStroke: "rgba(220,220,220,1)",
//                data: [35, 59, 80, 81, 56, 55, 40]
//            },
//            {
//                label: "My Second dataset",
//                fillColor: "rgba(151,187,205,0.5)",
//                strokeColor: "rgba(151,187,205,0.8)",
//                highlightFill: "rgba(151,187,205,0.75)",
//                highlightStroke: "rgba(151,187,205,1)",
//                data: [28, 48, 40, 19, 86, 27, 90]
//            }
//        ]
//    };
//    var barOptions = {
//        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
//        scaleBeginAtZero : true,
//         showScale: true,
//        //Boolean - Whether grid lines are shown across the chart
//        scaleShowGridLines : true,
//
//           scaleShowLabels: true,
//        //String - Colour of the grid lines
//        scaleGridLineColor : "rgba(0,0,0,.05)",
//
//        //Number - Width of the grid lines
//        scaleGridLineWidth : 1,
//
//        //Boolean - Whether to show horizontal lines (except X axis)
//        scaleShowHorizontalLines: true,
//
//        //Boolean - Whether to show vertical lines (except Y axis)
//        scaleShowVerticalLines: true,
//
//        //Boolean - If there is a stroke on each bar
//        barShowStroke : true,
//
//        //Number - Pixel width of the bar stroke
//        barStrokeWidth : 2,
//
//        //Number - Spacing between each of the X value sets
//        barValueSpacing : 5,
//
//        //Number - Spacing between data sets within X values
//        barDatasetSpacing : 1,
//
//        //String - A legend template
//        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
//        
//             showTooltips: true,
//        
//         tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
//
//        // String - Template string for multiple tooltips
//        multiTooltipTemplate: "<%= value %>",
//      
//            multiTooltipTemplate: function(chartData) {return chartData.datasetLabel + " : " + chartData.value;}
//    
//    };
//
//    var barCtx = document.getElementById("busiChart").getContext("2d");
//      var myBarChart = new Chart(barCtx, {
//    type: 'bar',
//    data: barData,
//    options: barOptions
//});
//}