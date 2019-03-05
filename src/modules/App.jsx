import React from 'react';
import { Grid } from '@material-ui/core';

import withRoot from './withRoot';
import UrlCard from './UrlCard'

function App(props) {
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

export default withRoot(App);