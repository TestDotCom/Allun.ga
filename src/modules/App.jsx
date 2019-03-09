import React from 'react';
import {
    BrowserRouter,
    Switch, 
    Route 
} from 'react-router-dom';

import { Grid } from '@material-ui/core';

import withRoot from './withRoot';
import UrlCard from './UrlCard';
import Firestore from './Firestore';

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

const QueryPath = props => {
    const query = Firestore.collection("urlMap").where(
        "shrinked", "==", props.location.pathname.replace(/\//g, '')
    )
    
    query.get().then(querySnap => {
        if (!querySnap.empty) {
            querySnap.forEach(doc => {
                //console.log(doc.data()["expanded"]);
                window.location.replace(doc.data()["expanded"]);
            })
        } else {
            // TODO better display error
            return <div>Url not valid</div>
        }
    })
    .catch(error => console.log(error));

    return null;
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