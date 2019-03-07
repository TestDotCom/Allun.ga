import React from 'react';
import {
    BrowserRouter,
    Switch, 
    Route 
} from 'react-router-dom';
import Axios from 'axios';

import { Grid } from '@material-ui/core';

import withRoot from './withRoot';
import UrlCard from './UrlCard';

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

const QueryPath = props => {
    Axios({
        method: 'post',
        url: process.env.API_URL,
        headers: { 'content-type': 'application/json' },
        data: { 
            url: props.location.pathname.replace(/\//g, ''),
            keyword: '',
            action: 'expand'
        }
    }).then(result => {
        console.log(result);
        window.location.replace(result.data.url);
    }).catch(error => {
        console.log(error);
    });

    return (<div />);
}

export default withRoot(App);