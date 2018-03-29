/**
 * checkinServerScript.js
 * @author CloudPact Technologies
 * @description : This script is used for maintaining server date.
 **/

var checkintime;
var radius;
var resp = "";

checkintime = "23:50";
radius = 500;

resp = {"code":103,"msg":"Query successful","checkintime":checkintime,"radius":radius};

$response.addHeader("Content-Type","application/json");
$response.getWriter().println(JSON.stringify(resp));
