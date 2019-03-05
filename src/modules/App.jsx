import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
//import axios from 'axios';

import UrlCard from './UrlCard'


//const API_PATH = 'http://localhost:8000/contact/url_mapping.php';

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

export default App;