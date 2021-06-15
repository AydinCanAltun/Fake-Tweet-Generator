<?php 

$username = isset($_GET['username']) && !empty($_GET['username']) ? $_GET['username'] : NULL;

if($username == NULL)
{
    echo json_encode([
        'status' => "error",
        'result' => "Username can not be empty!"
    ]);
    return ;
}

$url = "https://api.twitter.com/2/users/by/username/$username?user.fields=profile_image_url,verified";
$ch = curl_init();
$token = "";
$headers = array(
    "Accept: application/json",
    "Authorization: Bearer $token"
);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLINFO_HEADER_OUT, true);



$dataJson = curl_exec($ch);

if($dataJson === false)
{
    echo json_encode([
        'status' => "error",
        'result' => curl_error($ch)
    ]);
    curl_close($ch);
    return;
}

$dataArr = json_decode($dataJson, true);

if(isset($dataArr['errors']))
{
    echo json_encode([
        'status' => "error",
        'result' => "User not found"
    ]);
}else
{
    echo json_encode([
        'status' => "success",
        'result' => $dataArr
    ]);
}

curl_close($ch);

?>