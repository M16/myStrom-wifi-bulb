<?php
    $data = json_decode(file_get_contents('php://input'));

    $postFields =  'action='.$data->action;
    // if the $data->color isset (send by client) added it to postFields and the same for $data->ramp
    if (isset($data->color)) {
        $postFields .= '&color=' .$data->color;
    }
    if (isset($data->ramp)) {
        $postFields .= '&ramp=' .$data->ramp;
    }

    // https://en.wikipedia.org/wiki/CURL
    // http://php.net/manual/en/function.curl-init.php
    $cURL = curl_init();
    // set URL and other appropriate options
    curl_setopt($cURL, CURLOPT_URL, "http://192.168.4.186/api/v1/device/".$data->mac);
    curl_setopt($cURL, CURLOPT_POSTFIELDS,$postFields);
    curl_setopt($cURL, CURLOPT_HEADER, 0);
    curl_exec($cURL);
    curl_close($cURL);
?>