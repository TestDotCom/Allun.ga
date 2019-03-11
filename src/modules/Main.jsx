import React from 'react';

import { Grid } from '@material-ui/core';

import UrlCard from './UrlCard';

const Main = () => {
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

export default Main;