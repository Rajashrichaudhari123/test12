var data = $request.getParameter("data");
var action = $request.getParameter("action");
//data = JSON.parse(data);
//seriesArray = new String("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
var connectionUrl = "jdbc:sqlserver://10.126.239.187:1981;" + "databaseName=eOPS_Staging;user=pdcuser;password=pdc@123";
java.lang.Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
connection = java.sql.DriverManager.getConnection(connectionUrl);
var result;
var dataArr=[];
var columnObj={};
var response="";

if(action == "RetriveData"){
	var res = JSON.parse(data);
	result = selectQuery();
	connection.close();
}

result = JSON.stringify(result);
$response.getWriter().println(result);

function selectQuery(){
	var select = "select TOP 1 * from TestVideoUpload";
	statement = connection.createStatement();
	results = statement.executeQuery(select);
		while(results.next()){
			columnObj = {
				flag : ""+results.getString("flag"),
				videopath : ""+results.getString("videopath"),
			};
			dataArr.push(columnObj);
		}
		result = {"code":103,"msg":"Query successful","entities":dataArr,"count":dataArr.length};
		//$response.getWriter().println(JSON.stringify(result));
		return result;
}