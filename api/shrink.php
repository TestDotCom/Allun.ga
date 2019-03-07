<?php
    class Shrink {
        public static function run($mysqli, $url, $keyword) {
            http_response_code(200);

            if ($keyword != "") {
                $stmt = $mysqli->prepare(
                    "SELECT expand FROM url_mapping WHERE shrink=?"
                );
                $stmt->bind_param("s", $keyword);
                $stmt->execute();

                $stmt->bind_result($query);
                $stmt->fetch();
    
                $stmt->close();

                if ($query == null) {
                    $shrink = $keyword;
                } else {
                    // TODO return ERROR
                }
            } else {
                $shrink = hash("crc32", $url);
            }

            $stmt = $mysqli->prepare(
                "INSERT INTO url_mapping(shrink, expand) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=id"
            );
            $stmt->bind_param("ss", $shrink, $url);
            $stmt->execute();

            $stmt->close();
            
            echo json_encode([
                "url" => $shrink,
                //"shrink" => $shrink,
                //"db" => $mysqli->host_info
            ]);
        }
    }
?>