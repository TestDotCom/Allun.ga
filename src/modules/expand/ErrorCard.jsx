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

import error404 from '../../img/error_404.png';
import error503 from '../../img/error_503.png';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        //marginTop: 20,
        padding: 20,
        //paddingBottom: "100%"
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

function ErrorCard({classes, errorMsg}) {
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
                            { errorMsg == 404 ?
                                <CardMedia
                                    className={classes.media}
                                    image={error404}
                                    title="Bob Ross"
                                /> :
                                <CardMedia
                                    className={classes.media}
                                    image={error503}
                                    title="Bob Ross"
                                /> 
                            }
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

ErrorCard.propTypes = {
    classes: PropTypes.object.isRequired,
    errorMsg: PropTypes.number.isRequired,
};

export default withStyles(styles)(ErrorCard);