<?php
    class Expand {
        public static function run($mysqli, $url) {
            http_response_code(200);

            if (!($stmt = $mysqli->prepare("SELECT expand FROM url_mapping WHERE shrink=?"))) {
                echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
            }

            if (!$stmt->bind_param("s", $url)) {
                echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
            }
            
            if (!$stmt->execute()) {
                echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
            }

            $stmt->bind_result($expand);
            $stmt->fetch();

            $stmt->close();
            
            echo json_encode([
                "url" => $expand,
                "urlh" => $url,
                "db" => $mysqli->host_info
            ]);
        }
    }
?>