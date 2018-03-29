var proposalList = [
	{
	"CusName":"Aditi Parekh",
	"CusDate":"04/12/2015",
	"refNum":"BJ8631",
	"planName":"Reliance Endowment Plan"
	},
	{
	"CusName":"Neha Joshi",
	"CusDate":"05/12/2015",
	"refNum":"KJ8631",
	"planName":"Reliance Endowment Plan"
	},
	{
	"CusName":"Sumit Nagpal",
	"CusDate":"06/12/2015",
	"refNum":"BJ8631",
	"planName":"Reliance Endowment Plan"
	}
];

$m.juci.addDataset("proposallist",[]);

$m.juci.addDataset("lsearch",proposalList);

function openProposal(event){
	var data={"applicationNumber": event.data.Application_Number};
	$m.open("Proposal", "/Proposals/proposal.html",data);
}

$m.onResume(function(eventObject){
	eventObject.hideProgress = false;
	$m.showProgress("Loading Data...");
	new window.DB(CONSTANTS.DBName, function(dbHelper) {
		window.dbHelper = dbHelper;		
		PDC_Customer_Details.Select(function(success_response){
			//$m.juci.dataset(DATASETS.Proposals, success_response.rows);
			var loopCounter = 0;
			var responseLength = success_response.rows.length;
			if(responseLength){
				success_response.rows.forEach(function(obj){
					var counter = 0;
					var isCompleted = obj.iscompleted, isSync = obj.issync, isDocUploaded = obj.DOCS_UPLOADED, applicationNumber = obj.Application_Number;
					var filter = new window.DB.CompositeFilter(DB.CompositeFilter.AND, [
						new window.DB.Filter.equal("Application_Number", "'"+applicationNumber+"'"),
						new window.DB.Filter.equal("issync", "'0'"),
						new window.DB.Filter.equal("iscompleted", "'1'")
					]);
					PDC_Customer_Details.SelectWithFilterCondition(filter,function(success){
						if(success.rows[0]['count(*)'])
							counter++;
						PDC_EXISITINGPOLICIES_Details.SelectWithFilterCondition(filter,function(success){
							if(success.rows[0]['count(*)'])
								counter++;
							PDC_FAMILYHISTORY_Details.SelectWithFilterCondition(filter,function(success){
								if(success.rows[0]['count(*)'])
									counter++;
								PDC_LifeStyle_Details.SelectWithFilterCondition(filter,function(success){
									if(success.rows[0]['count(*)'])
										counter++;
									PDC_Payment_Details.SelectWithFilterCondition(filter,function(success){
										if(success.rows[0]['count(*)'])
											counter++;
										PDC_Plan_Details.SelectWithFilterCondition(filter,function(success){
											if(success.rows[0]['count(*)'])
												counter++;
											PDC_Image_Details.SelectWithFilterCondition(filter,function(success){
												if(success.rows[0]['count(*)'])
													counter++;
												if(isCompleted == '1' && isDocUploaded == '' || isCompleted == '1' && isDocUploaded == '')
													obj['dataflag'] =  'P';
												else if(isCompleted == '0')
													obj['dataflag'] =  'D';
												else if(counter)
													obj['dataflag'] =  'C';
												else 
													obj['dataflag'] =  'S';
												loopCounter++;
												if(loopCounter == responseLength){
													$m.juci.dataset("proposallist", success_response.rows);
													$m.hideProgress();
												}
											},function(error){
												$m.hideProgress();
												$m.logError("Data read failed. Reason - " + JSON.stringify(error));	
												$m.alert("Error while fetching from database");
											},['count(*)']);
										},function(error){
											$m.hideProgress();
											$m.logError("Data read failed. Reason - " + JSON.stringify(error));	
											$m.alert("Error while fetching from database");
										},['count(*)']);
									},function(error){
										$m.hideProgress();
										$m.logError("Data read failed. Reason - " + JSON.stringify(error));	
										$m.alert("Error while fetching from database");
									},['count(*)']);
								},function(error){
									$m.hideProgress();
									$m.logError("Data read failed. Reason - " + JSON.stringify(error));	
									$m.alert("Error while fetching from database");
								},['count(*)']);
							},function(error){
								$m.hideProgress();
								$m.logError("Data read failed. Reason - " + JSON.stringify(error));	
								$m.alert("Error while fetching from database");
							},['count(*)']);
						},function(error){
							$m.hideProgress();
							$m.logError("Data read failed. Reason - " + JSON.stringify(error));	
							$m.alert("Error while fetching from database");
						},['count(*)']);
					},function(error){
						$m.hideProgress();
						$m.logError("Data read failed. Reason - " + JSON.stringify(error));	
						$m.alert("Error while fetching from database");
					},['count(*)']);
				});
			}else{
				$m.hideProgress();
				$m.juci.dataset(proposallist, success_response.rows);
			}
		},function(error_response){
			$m.hideProgress();
			$m.logError("Select query failed -- " + JSON.stringify(error_response));
			$m.alert("Error while fetching from database");
		});
	}, function(error) {
		$m.hideProgress();
		$m.logError("Unable to open database due to -- " + JSON.stringify(error));
		$m.alert("Error while opening database");
	});

});

function searcher(list,searchString){
	return list.CusName.toLowerCase().search(searchString.toLowerCase()) > -1;
}

$m.onReady(function(){
	// Code to execute when the page is ready
$m.pageTitle('<div class="page_title"><div style="text-align:center" class="title_image"><img src="images/relaince-logo.png"></img></div></div>')
	$m.pageTitleLeftButton('<div class="left_heading"><div class="header_left"><img src="images/arrow-left2.png"></div><div class="seperator"></div><div style="text-align:left" class="page_name">&nbsp Proposal List</div></div>')
 $m.pageTitleRightButton('<div class="icons"><div class="icon icon1"><div class="notif1"><div class="pAlert"><div class="alert" data-bind="display:alertcount"></div><img src="images/Notifications.png" onclick="onNotificationsClick()"/></div></div></div><div class="icon icon2"><img src="images/more.png" onclick="openMenu(event)"/></div></div>');
	
	var head = document.getElementsByClassName("juci_panel_title");
	juci.viewModel.applyBinding(head[0]);
	$m.juci.dataset("alertcount","3");
	juci.getControl("propList").addListItemClick(openProposal, null, ".resume");
});

