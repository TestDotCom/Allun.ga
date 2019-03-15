import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { 
    withStyles,
    Card,
    CardContent,
    CardMedia,
    Grid,
    //Typography,
    Link
} from '@material-ui/core';

import notFoundImg from '../../img/notFound.png';

const styles = theme => ({
    root: {
        flexGrow: 1,
        //backgroundColor: theme.palette.primary.main,
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
        //minWidth: 320,
      },
      link: {
        color: theme.palette.primary.text,
      },
      itemContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }
      },
      baseline: {
        alignSelf: 'baseline',
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          marginLeft: 0
        }
      },
      inline: {
        display: 'inline-block',
        marginLeft: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
          marginLeft: 0
        }
      },
      inlineRight: {
        width: '30%',
        textAlign: 'right',
        marginLeft: 50,
        alignSelf: 'flex-end',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          margin: 0,
          textAlign: 'center'
        }
      },
});

function NotFound(props) {
    const classes = props.classes;
    const msg = props.msg;

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
                            {/*<div className={classes.itemContainer}>
                                <div className={classes.baseline}>
                                    <div className={classes.inline}>
                                        <Link
                                            component="button"
                                            variant="body1"
                                            //color="secondary"
                                            onClick={() => 
                                                window.location.replace("https://allun.ga")
                                            }
                                        >
                                            Just a little brush here... and you're back
                                        </Link>
                                    </div>
                                </div>
                            </div>*/}
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

NotFound.propTypes = {
    msg: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);