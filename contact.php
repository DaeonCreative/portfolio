<?php
$companyemail = "Ingresa tu mail";
$subject = "Recibiste un mensaje";
$idvar  = isset($_REQUEST['idvar']) ? $_REQUEST['idvar'] : "";
if($idvar == "email") {
	$nametxt = isset($_REQUEST['nametxt']) ? $_REQUEST['nametxt'] : "";
	if($nametxt == ""){
		$nametxt = "Olvidaste ingresar Nombre.";
	}
	$emailtxt = isset($_REQUEST['emailtxt']) ? $_REQUEST['emailtxt'] : "";
	$messagetxt = isset($_REQUEST['messagetxt']) ? $_REQUEST['messagetxt'] : "";
	if($emailtxt != "" && $messagetxt != ""){
		$date = date("m.d.Y H:i:s");
		$mailtext .= "Informacion del contacto:\n\n";
		$mailtext .= "Nombre:  " . $nametxt . "\n";
		$mailtext .= "email:  " . $emailtxt . "\n";
		$mailtext .= "Dia y tiempo de envio:  " . $date . "\n\n";
		$mailtext .= "message:\n";	
		$mailtext .= "" . $messagetxt . "\n\n";
		$head = "De: clientes@arquitectronik.com \n";
		$head .= "Content-Type: text/plain; Charset=utf-8\n\n";
		$head .= "Responder a: " . $emailtxt . "\n\n";
		if(mail($companyemail, $subject, $mailtext, $head)) {
			print "&success=true";
		}
	}
}
?>