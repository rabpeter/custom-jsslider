<?php
	$email_from = 'Violin - Contact form';
	$email_to = 'your_email@domain.com';
	$email_subject = 'Violin - Contact form';

	if($_POST){
		extract($_POST);
		if(strlen($ca) > 1 && strlen($cb) > 1 && strlen($cc) > 1){
			$wd = '<h2>Violin - Contact form</h2>';
			$wd .='
			<div>
				<p><b>Name:</b> '.$ca.'</p>
				<p><b>E-mail address:</b> '.$cb.'</p>
				<p><b>Message:</b> '.$cc.'</p>';
			$wd .= '</div>';
			$h = 'From: '.$email_from."\r\n".'MIME-Version: 1.0'."\r\n".'Content-Type: text/html; charset=UTF-8'."\r\n";
			if(@mail($email_to, $email_subject, $wd, $h)) echo json_encode(array('status'=>'ok'));
		}
	}
?>