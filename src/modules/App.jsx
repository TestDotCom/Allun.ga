import React from 'react';
import {
    BrowserRouter,
    Switch, 
    Route 
} from 'react-router-dom';

import { Grid } from '@material-ui/core';

import withRoot from './withRoot';
import UrlCard from './UrlCard';
import Firestore from './Firestore'

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
    const query = Firestore.collection("urlMap").where(
        "shrinked", "==", props.location.pathname.replace(/\//g, '')
    )
    
    query.get().then(querySnap => {
        if (!querySnap.empty) {
            querySnap.forEach(doc =>
                window.location.replace(doc.data()["expanded"])
            )
        } else {
            // TODO handle empty shrinked
        }
    })
    .catch(error => console.log(error));

    return null;
}

export default withRoot(App);