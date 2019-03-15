import React, { Suspense, lazy } from 'react';
import {
    BrowserRouter,
    Switch, 
    Route 
} from 'react-router-dom';

import withRoot from './withRoot';

const Main = lazy(() => import('./shrink/Main'));
const QueryPath = lazy(() => import('./expand/QueryPath'));


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