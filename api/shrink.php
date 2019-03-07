<?php
    class Shrink {
        public static function run($mysqli, $url) {
            http_response_code(200);

            $urlh = hash("crc32", $url);

            if (!($stmt = $mysqli->prepare(
                "INSERT INTO url_mapping(shrink, expand) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id"
            ))) {
                echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
            }

            if (!$stmt->bind_param("ss", $urlh, $url)) {
                echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
            }
            
            if (!$stmt->execute()) {
                echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
            }

            $stmt->close();
            
            echo json_encode([
                "url" => $url,
                "urlh" => $urlh,
                "db" => $mysqli->host_info
            ]);
        }
    }
?>