var a = new Date();
b = a.toString("yyyy-MM-dd");
resp = {"code":103,"msg":"Query successful","entities":b};

$response.addHeader("Content-Type","application/json");
$response.getWriter().println(JSON.stringify(resp));
