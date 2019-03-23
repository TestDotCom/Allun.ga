import React from "react";

import { 
    Grid,
    withStyles
} from "@material-ui/core";

import TopBar from "./TopBar";
import UrlCard from "./UrlCard";

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        marginTop: 20,
        marginBottom: 20,
    },
});

const Main = props => {
    return(
        <div className={props.classes.root}>
            <Grid
                container
                spacing={2} 
                alignItems="center" 
                justify="center" 
            >
                <Grid item xs={8}>
                    <TopBar />
                </Grid>
                <Grid item xs={8}> 
                    <UrlCard />
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(Main);