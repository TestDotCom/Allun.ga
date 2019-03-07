<?php
    class Shrink {
        public static function run($mysqli, $url) {
            http_response_code(200);

            $urlh = hash("crc32", $url);

            $stmt = $mysqli->prepare(
                "INSERT INTO url_mapping(shrink, expand) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id"
            );
            $stmt->bind_param("ss", $urlh, $url);
            $stmt->execute();

            $stmt->close();
            
            echo json_encode([
                "url" => $url,
                "urlh" => $urlh,
                "db" => $mysqli->host_info
            ]);
        }
    }
?>