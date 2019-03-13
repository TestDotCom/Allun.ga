import React, { Suspense, lazy } from 'react';
import {
    BrowserRouter,
    Switch, 
    Route 
} from 'react-router-dom';

import withRoot from './withRoot';
//import Main from './Main';
//import QueryPath from './QueryPath';
const Main = lazy(() => import('./Main'));
const QueryPath = lazy(() => import('./QueryPath'));


import { hot } from 'react-hot-loader/root';

function App() {
    return(
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/" exact render={props => <Main {...props} />} />
                    <Route render={props => <QueryPath {...props} />} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default hot(withRoot(App));