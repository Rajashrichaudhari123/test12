//var sapcode = 20000226;
//var action =$m.request.getParameter("action");
/*if(action == "getEncyptedCode"){
	getEncrptedCode(sapcode);	
}*/

//try{
//	getEncryptedCode(sapcode);
//}

try {
     id = new java.lang.String("20000226");
     //tokenText = new java.lang.String(randomString(16, '#A'));
     getEncryptedCode(id);
     key = new java.lang.String("MAKV2SPBNI99212"); // 128 bit key
     //keyForToken = new java.lang.String("TokenSecretkey12");
     // Create key and cipher
     aesKey = new javax.crypto.spec.SecretKeySpec(key.getBytes(), "AES");
     //aesKeyForToken = new javax.crypto.spec.SecretKeySpec(keyForToken.getBytes(), "AES");
     cipher = javax.crypto.Cipher.getInstance("AES");
    // cipherForToken = javax.crypto.Cipher.getInstance("AES");
     // encrypt the text
     cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, aesKey);
     //cipherForToken.init(javax.crypto.Cipher.ENCRYPT_MODE, aesKeyForToken);
     encrypted = cipher.doFinal(id.getBytes());
     //encryptedToken = cipherForToken.doFinal(tokenText.getBytes());
     //idEncoded = org.apache.commons.codec.binary.Base64.encodeBase64String(encrypted);
     //tokenEncoded = org.apache.commons.codec.binary.Base64.encodeBase64String(encryptedToken);
     $response.getWriter().println(encrypted);
}catch(e) {
	e.printStackTrace();
}


