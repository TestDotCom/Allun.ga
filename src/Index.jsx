import React from "react";
import ReactDOM from "react-dom";

import App from './modules/App';

const API_PATH = 'http://localhost:8000/url_mapping.php';

var urlSplit = window.location.href.split("/");
if (urlSplit[3] != "") {
    // Request for an URL expansion
    // TODO CALL PHP
}

  

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();
