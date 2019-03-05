<?php
$hostname = 'http://allun.ga';
$connection = new mysqli("localhost", "test", "", "test");

    /**
     * Looks up a URL in the database by id.
     *
     * @param string $id URL id
     * @return array URL record
     */
    function fetch($id) {
        $statement = $this->connection->prepare(
            'SELECT * FROM urls WHERE id = ?'
        );
        $statement->execute(array($id));

        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Attempts to locate a URL in the database.
     *
     * @param string $url URL
     * @return array URL record
     */
    function find($url) {
        $statement = $this->connection->prepare(
            'SELECT * FROM urls WHERE url = ?'
        );
        $statement->execute(array($url));

        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Stores a URL in the database.
     *
     * @param string $url URL to store
     * @return int Insert id
     */
    function store($url) {
        $datetime = date('Y-m-d H:i:s');

        $statement = $this->connection->prepare(
            'INSERT INTO urls (url, created) VALUES (?,?)'
        );
        $statement->execute(array($url, $datetime));

        return $this->connection->lastInsertId();
    }

        /**
     * Sends a redirect to a URL.
     *
     * @param string $url URL
     */
    function redirect($url) {
        header("Location: $url", true, 301);
        exit();
    }

    /**
     * Sends a 404 response.
     */
    function not_found() {
        header('Status: 404 Not Found');
        exit(
            '<h1>404 Not Found</h1>'.
            str_repeat(' ', 512)
        );
    }

    /**
     * Sends an error message.
     *
     * @param string $message Error message
     */
    function error($message) {
        exit("<h1>$message</h1>");
    }

        /**
     * Starts the program.
     */
    function run() {
        $q = str_replace('/', '', $_GET['q']);

        $url = '';
        if (isset($_GET['url'])) {
          $url = urldecode($_GET['url']);
        }

        $format = '';
        if (isset($_GET['format'])) {
          $format = strtolower($_GET['format']);
        }

        // If adding a new URL
        if (!empty($url)) {
            if (!empty($this->whitelist) && !in_array($_SERVER['REMOTE_ADDR'], $this->whitelist)) {
                $this->error('Not allowed.');
            }

            if (preg_match('/^http[s]?\:\/\/[\w]+/', $url)) {
                $result = $this->find($url);

                // Not found, so save it
                if (empty($result)) {

                    $id = $this->store($url);

                    $url = $this->hostname.'/'.$this->encode($id);
                }
                else {
                    $url = $this->hostname.'/'.$this->encode($result['id']);
                }

                // Display the shortened url
                switch ($format) {
                    case 'text':
                        exit($url);

                    case 'json':
                        header('Content-Type: application/json');
                        exit(json_encode(array('url' => $url)));

                    case 'xml':
                        header('Content-Type: application/xml');
                        exit(implode("\n", array(
                            '<?xml version="1.0"?'.'>',
                            '<response>',
                            '  <url>'.htmlentities($url).'</url>',
                            '</response>'
                        )));

                    default:
                        exit('<a href="'.$url.'">'.$url.'</a>');
                }
            }
            else {
                $this->error('Bad input.');
            }
        }
        // Lookup by id
        else {
            if (empty($q)) {
              $this->not_found();
              return;
            }

            if (preg_match('/^([a-zA-Z0-9]+)$/', $q, $matches)) {
                //$id = self::decode($matches[1]);

                $result = $this->fetch($id);

                if (!empty($result)) {
                    $this->update($id);

                    $this->redirect($result['url']);
                }
                else {
                    $this->not_found();
                }
            }
        }
    }