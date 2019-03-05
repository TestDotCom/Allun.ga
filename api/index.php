<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$mysqli = new mysqli("localhost", "test", "test", "test");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if ($_POST){
    http_response_code(200);

    $urlh = hash("crc32", $_POST["url"]);

    if (!($stmt = $mysqli->prepare("INSERT INTO url_mapping(shrink) VALUES (?)"))) {
        echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
    }
    
    echo json_encode([
        "url" => $_POST["url"],
        "urlh" => $urlh,
        "db" => $mysqli->host_info
    ]);
}
?>