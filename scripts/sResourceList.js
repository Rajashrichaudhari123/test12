var resourceList = ["Sales stories See how lives are changing","Training Videos","Tools and Calculators"];
var resourceSubList = "See how lives are changing";

resp = {"code":103,"msg":"Query successful","resourceList":resourceList};

$response.addHeader("Content-Type","application/json");
$response.getWriter().println(JSON.stringify(resp));