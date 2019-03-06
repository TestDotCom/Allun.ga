import React from "react";
import ReactDOM from "react-dom";
import Axios from 'axios';

import App from './modules/App';

//var urlSplit = window.location.href.split("/");
//if (urlSplit[3] != "") {
//}

/*Axios({
    method: 'post',
    url: process.env.API_URL,
    headers: { 'content-type': 'application/json' },
    data: { 
        url: "446cadcb",
        keyword: "",
        action: "expand"
    }
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});*/

ReactDOM.render( < App / > , document.getElementById("app"));

module.hot.accept();