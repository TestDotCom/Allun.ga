<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'shrink.php';
require_once 'expand.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// POST from axios
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli("localhost", "test", "test", "test");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

$mysqli->set_charset('utf8');

if ($_POST["action"] == "shrink") {
    Shrink::run($mysqli, $_POST["url"], $_POST["keyword"]);
} elseif ($_POST["action"] == "expand") {
    Expand::run($mysqli, $_POST["url"]);
}

$mysqli->close();
?>