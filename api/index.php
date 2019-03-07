<?php
require_once __DIR__ . '/vendor/autoload.php';

require_once 'shrink.php';
require_once 'expand.php';

$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// POST from axios
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$mysqli = new mysqli($_ENV["HOST"], $_ENV["USERNAME"], $_ENV["PASSWORD"], $_ENV["DATABASE"]);
$mysqli->set_charset('utf8');

if ($_POST["action"] == "shrink") {
    Shrink::run($mysqli, $_POST["url"], $_POST["keyword"]);
} elseif ($_POST["action"] == "expand") {
    Expand::run($mysqli, $_POST["url"]);
}

$mysqli->close();
?>