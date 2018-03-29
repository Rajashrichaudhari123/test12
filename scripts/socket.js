try{  
	serverSocket = new java.net.ServerSocket(6667);  
	socket = serverSocket.accept();
	dis = new java.io.DataInputStream(socket.getInputStream());  
	message = dis.readUTF();  
	java.lang.System.out.println("message= " + message);  
	$response.getWriter().println(message);
	ss.close();  
}catch(e){
	$response.getWriter().println(e);
	java.lang.System.out.println(e);
}  
