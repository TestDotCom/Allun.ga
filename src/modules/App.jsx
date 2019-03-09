import React from 'react';
import {
    BrowserRouter,
    Switch, 
    Route 
} from 'react-router-dom';

import { Grid } from '@material-ui/core';

import withRoot from './withRoot';
import UrlCard from './UrlCard';
import QueryPath from './QueryPath';

import { hot } from 'react-hot-loader/root';

const Main = _ => {
    return(
        <div>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Grid item>
                    <UrlCard />
                </Grid>
            </Grid>
        </div>
    );
}

function App() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route component={QueryPath} />
            </Switch>
        </BrowserRouter>
    );
}

export default hot(withRoot(App));