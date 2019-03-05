import React from "react";
import ReactDOM from "react-dom";
import Axios from 'axios';

import App from './modules/App';

const API_PATH = 'http://localhost:8000/index.php';

//var urlSplit = window.location.href.split("/");
//if (urlSplit[3] != "") {
//}

const url = "https://www.google.com";

Axios({
    method: 'post',
    url: API_PATH,
    headers: { 'content-type': 'application/json' },
        data: { url: url }
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

ReactDOM.render( < App / > , document.getElementById("app"));

module.hot.accept();