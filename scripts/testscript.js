/*function test(){
	var dbcallback = function(dbhelper) {
		dbHelper = dbhelper;
		var aadharCallback = function(res){
		var data = res.rows;
		$m.alert(JSON.stringify(res));
       };
		Customer_Aadhar_Details.SelectWithFilter("123456",aadharCallback,function(){
			$m.alert("error");
		});
	};
	utils.GetDbhelper(dbcallback);
}*/

function testpdf(){
	
var data = {
	"template":'<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format"><xsl:output encoding="iso-8859-1" /><xsl:template match ="Reimbursements"><fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format"><fo:layout-master-set><fo:simple-page-master page-height="279mm" page-width="216mm" margin-top="10mm" margin-left="20mm" margin-right="20mm" margin-bottom="10mm" master-name="Reimbursements"><fo:region-body /></fo:simple-page-master></fo:layout-master-set><fo:page-sequence master-reference="Reimbursements"><fo:flow flow-name="xsl-region-body"><fo:table border-top-style="solid" border-top-width="thin"><fo:table-body font-size="12pt" font-family="times new roman"><fo:table-row text-align="center"><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold">Date of Visit</fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold">Type of channel</fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold">Claim Amount</fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000" border-right-style="solid" border-right-color="#000"><fo:block font-weight="bold">Status</fo:block></fo:table-cell></fo:table-row><xsl:for-each select="Reimbursement"><xsl:sort select="dateofvisit"/><xsl:sort select="dsaname"/><xsl:sort select="amount"/><xsl:sort select="status"/><fo:table-row border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" text-align="center"><fo:table-cell padding-top="3mm" padding-bottom="3mm" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold"><xsl:value-of select="dateofvisit"/></fo:block></fo:table-cell><fo:table-cell padding-top="3mm" padding-bottom="3mm" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold"><xsl:value-of select="dsaname"/></fo:block></fo:table-cell><fo:table-cell  padding-top="3mm" padding-bottom="3mm" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold"><xsl:value-of select="amount"/></fo:block></fo:table-cell><fo:table-cell  padding-top="3mm" padding-bottom="3mm" border-left-style="solid" border-left-color="#000" border-right-style="solid" border-right-color="#000"><fo:block font-weight="bold"><xsl:value-of select="status"/></fo:block></fo:table-cell></fo:table-row></xsl:for-each><fo:table-row text-align="center"><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold"></fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold">Total</fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold"><xsl:value-of select="total"/></fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000" border-right-style="solid" border-right-color="#000"><fo:block font-weight="bold"></fo:block></fo:table-cell></fo:table-row><fo:table-row text-align="center"><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold"></fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold">Approved</fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000"><fo:block font-weight="bold"><xsl:value-of select="approved"/></fo:block></fo:table-cell><fo:table-cell padding-top="1mm" padding-bottom="1mm" border-bottom-style="solid" border-bottom-color="#000" border-bottom-width="thin" border-left-style="solid" border-left-color="#000" border-right-style="solid" border-right-color="#000"><fo:block font-weight="bold"></fo:block></fo:table-cell></fo:table-row></fo:table-body></fo:table></fo:flow></fo:page-sequence></fo:root></xsl:template></xsl:stylesheet>',
	"hsource":'',
	"action":"generatePDF",
	"databasename":"smpuat",
	"filename":"samplePdf"
}

var callback = function(res){
	console.log(res);
};
fireRequestPDF(data,callback);
}

function fireRequestPDF(data, callback){
		var url = "http://124.124.218.136/rlife2/mowblyserver/generatePdf/rellife/prod/RlifeAssist";
         if ($m.networkConnected()) {
        	data = JSON.stringify(data);
            $m.post(url, {"data":data}, function(callback) {
                return function(response) {
                    if (response.code == 200) {
                        var result = response.result;
                        result = JSON.parse(result.data);
                        callback.call(this, result);
                    } else {
                        $m.alert(messages.ServerError);
                        var errMsg = response;
                        $m.logError(JSON.stringify(response));
                    }
                };
            }(callback));
        } else {
            $m.alert(messages.NoNetworkConnectivity);
        }
	}