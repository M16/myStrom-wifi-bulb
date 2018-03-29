<?php
    //Convert the request into an object
    //The file_get_contents() reads a file into a string.
    //read raw data from the request body
    $data = json_decode(file_get_contents('php://input'));
  
    //The isset () function is used to check whether a variable is set or not. If a variable is already unset with unset() function, it will no longer be set. 
    $postFields =  'action='.$data->action;
    // if the $data->color isset (send by client) added it to postFields and the same for $data->ramp
    if (isset($data->color)) {
        $postFields .= '&color=' .$data->color;
    }
    if (isset($data->ramp)) {
        $postFields .= '&ramp=' .$data->ramp;
    }

    foreach ($data->bulbs as $bulb) {
        // https://en.wikipedia.org/wiki/CURL
        // http://php.net/manual/en/function.curl-init.php
        $cURL = curl_init();
        // set URL and other appropriate options
        //curl_setopt($cURL, CURLOPT_URL, "http://".$bulb->ip."/api/v1/device/".$bulb->mac);
        curl_setopt($cURL, CURLOPT_URL, "http://".$bulb->ip."/api/v1/device/".$bulb->mac);
        curl_setopt($cURL, CURLOPT_POSTFIELDS,$postFields);
        curl_setopt($cURL, CURLOPT_HEADER, 0);
        curl_exec($cURL);
        // var_dump($bulb);
        curl_close($cURL);
    }
  
?>