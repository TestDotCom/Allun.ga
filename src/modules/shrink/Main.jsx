import React from 'react';

import { 
    Grid,
    withStyles
} from '@material-ui/core';

import UrlCard from './UrlCard';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        //backgroundColor: theme.palette.grey['A500'],
        //background: `url(${backgroundShape}) no-repeat`,
        //backgroundSize: 'cover',
        //backgroundPosition: '0 400px',
        marginTop: 20,
        //padding: 20,
        //paddingBottom: 200
    },
    grid: {
        //width: 1000
    }
})

const Main = props => {
    return(
        <div className={props.classes.root}>
            <Grid
                container
                className={props.classes.grid}
                spacing={10} 
                alignItems="center" 
                justify="center" 
            >
                <Grid item xs={8}> 
                    <UrlCard />
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Main);