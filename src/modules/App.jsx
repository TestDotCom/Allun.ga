import React, {Suspense, lazy} from "react";
import {
    BrowserRouter,
    Switch, 
    Route 
} from "react-router-dom";
import {hot} from "react-hot-loader/root";

import withRoot from "./withRoot";

const Main = lazy(() => import("./shrink/Main"));
const ExpandUrl = lazy(() => import("./expand/ExpandUrl"));

function App() {
    return(
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/" exact render={props => <Main {...props} />} />
                    {/* redirect other paths here */}
                    <Route render={props => <ExpandUrl {...props} />} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default hot(withRoot(App));
