<?php
    $bulb = json_decode(file_get_contents('php://input'));
   
    $postFields =  'action='.$bulb->action;
    // if the $bulb->color isset (send by client) added it to postFields and the same for $bulb->ramp
    if (isset($bulb->color)) {
        $postFields .= '&color=' .$bulb->color;
    }
    if (isset($bulb->ramp)) {
        $postFields .= '&ramp=' .$bulb->ramp;
    }

    // https://en.wikipedia.org/wiki/CURL
    // http://php.net/manual/en/function.curl-init.php
    $cURL = curl_init();
    // set URL and other appropriate options
    curl_setopt($cURL, CURLOPT_URL, "http://".$bulb->ip."/api/v1/device/".$bulb->mac);
    curl_setopt($cURL, CURLOPT_POSTFIELDS,$postFields);
    curl_setopt($cURL, CURLOPT_HEADER, 0);
    curl_exec($cURL);
    curl_close($cURL);
?>