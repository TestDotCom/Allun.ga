import React from 'react';
import {
    BrowserRouter,
    Switch, 
    Route 
} from 'react-router-dom';

import withRoot from './withRoot';
import Main from './Main';
import QueryPath from './QueryPath';

import { hot } from 'react-hot-loader/root';

function App() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={props => <Main {...props} />} />
                <Route render={props => <QueryPath {...props} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default hot(withRoot(App));