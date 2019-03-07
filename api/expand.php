<?php
    class Expand {
        public static function run($mysqli, $url) {
            http_response_code(200);

            $stmt = $mysqli->prepare("SELECT expand FROM url_mapping WHERE shrink=?");
            $stmt->bind_param("s", $url);
            $stmt->execute();

            $stmt->bind_result($expand);
            $stmt->fetch();

            $stmt->close();
            
            echo json_encode([
                "url" => $expand,
                //"shrinkh" => $shrink,
                //"db" => $mysqli->host_info
            ]);
        }
    }
?>