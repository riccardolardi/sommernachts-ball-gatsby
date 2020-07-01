<?php
	header('Content-type: application/json');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST');
	header("Access-Control-Allow-Headers: X-Requested-With");

	$ch = curl_init();

	$email = $_GET['email'];
	$email = filter_var($email, FILTER_SANITIZE_EMAIL);

	$listId = "23606";

	$payload1 = json_encode(array("Email" => $email));
	$payload2 = json_encode(array("ContactAlt" => $email, "ListID" => $listId));

	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
	curl_setopt($ch, CURLOPT_USERPWD, "9bd769846e224c19c8e4e00df772acd6:9a9bcfe9920756bc12c427775bf2b461");
	
	curl_setopt($ch, CURLOPT_POSTFIELDS, $payload1);
	curl_setopt($ch, CURLOPT_URL, "https://api.mailjet.com/v3/REST/contact");
	$server_output = curl_exec($ch);
	$json = json_decode($server_output);
	$statusCode = isset($json->StatusCode) ? $json->StatusCode : null;

	if ($statusCode !== 400) {
		curl_setopt($ch, CURLOPT_POSTFIELDS, $payload2);
		curl_setopt($ch, CURLOPT_URL, "https://api.mailjet.com/v3/REST/listrecipient");
		$server_output = curl_exec($ch);
		$json = json_decode($server_output);
		$statusCode = isset($json->StatusCode) ? $json->StatusCode : null;
	}

	echo($server_output);
	
	curl_close ($ch);
?>