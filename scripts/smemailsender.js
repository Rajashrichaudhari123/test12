var receiver = $request.getParameter("mailreceiver");
var subject = $request.getParameter("mailsubject");
var body = $request.getParameter("mailbody");

//$response.getWriter().println(receiver);
try {

	props=new java.util.Properties();
	props.setProperty("mail.smtp.host","10.126.249.115");
	props.setProperty("mail.smtp.port",25);
	props.setProperty("mail.smtp.auth",false);
	props.setProperty("mail.smtp.starttls.enable",true);
  
	session = javax.mail.Session.getDefaultInstance(props, null);
	message = new javax.mail.internet.MimeMessage(session);
	message.setFrom(new javax.mail.internet.InternetAddress("online_request@reliancelife.co.in"));
	message.setRecipients(javax.mail.Message.RecipientType.TO,
	javax.mail.internet.InternetAddress.parse(receiver));
	message.setSubject(subject);
	message.setContent(unescape(body), "text/html; charset=utf-8");
	
	javax.mail.Transport.send(message);
	
	$response.getWriter().println(true);

}catch (e) {
	e.printStackTrace();
}