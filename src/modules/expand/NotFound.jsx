import React from 'react';
import PropTypes from 'prop-types';

import { 
    withStyles,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Link
} from '@material-ui/core';

import notFoundImg from '../../img/notFound.png';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        //marginTop: 20,
        padding: 20,
        paddingBottom: "100%"
    },
    card: {
        padding: theme.spacing(2),
    },
    media: {
        height: 320,
    },
    link: {
        color: theme.palette.primary.text,
    },
});

function NotFound(props) {
    const classes = props.classes;
    //const msg = props.msg;

    return(
        <div className={classes.root}>
            <Grid container justify="center"> 
                <Grid 
                    container
                    spacing={10} 
                    alignItems="center" 
                    justify="center"
                >
                    <Grid item xs={12}>
                        <Card className={classes.paper}>
                            <CardMedia
                                className={classes.media}
                                image={notFoundImg}
                                title="Bob Ross"
                            />
                            <CardContent align="center">
                                <Link
                                    className={classes.link}
                                    component="button"
                                    variant="body1"
                                    //color="secondary"
                                    onClick={() => 
                                        window.location.replace("https://allun.ga")
                                    }
                                >
                                    Just a little brush here... and you're back
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

NotFound.propTypes = {
    //msg: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);