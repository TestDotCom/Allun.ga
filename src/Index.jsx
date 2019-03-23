import React from "react";
import reactDOM from "react-dom";

import App from "./modules/App";

if (process.env.NODE_ENV !== "production") {
    // accessibility tests
    const axe = require("react-axe");
    axe(React, reactDOM, 1000);
}

reactDOM.render(<App />, document.getElementById("app"));