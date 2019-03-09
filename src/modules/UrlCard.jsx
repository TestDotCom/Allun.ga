import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import crc32 from 'crc/crc32';

import { 
    withStyles,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography,
    TextField,
    Grid,
    Button,
    InputAdornment
} from '@material-ui/core';

//import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Firestore from './Firestore';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    card: {
        width: 800,
        maxWidth: 1000,
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(3),
    },
});

function UrlCard({classes}) {
    const [expanded, setExpanded] = useState(false);
    const [url, setUrl] = useState('');
    const [keyword, setKeyword] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState(false);

    const queryKeyword = _ => {
        if (keyword != "") {
            const query = Firestore.collection("urlMap").where(
                "shrinked", "==", keyword
            )

            query.get().then(querySnap => {
                if (querySnap.empty) {
                    setResult(keyword);
                } else {
                    // TODO handle keyword in use
                    setError(true);
                }
            })
            .catch(error => console.log(error));
        } else {
            setResult(crc32(url).toString(16));
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
        
        if (urlRegex.test(url)) {
            queryKeyword();
        
            Firestore.collection("urlMap").doc().set({
                shrinked: result,
                expanded: url
            })
            .then(() => console.log("Document successfully written!"))
            .catch(error => console.error("Error writing document: ", error));
        }
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader title="allun.ga" />
                <CardContent>
                    <form 
                        noValidate 
                        autoComplete="off"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <TextField
                                    id="outlined-name"
                                    label="Enter your long URL"
                                    className={classes.textField}
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs>
                                { !error ? 
                                    <TextField
                                        id="readonlyOut"
                                        className={classes.textField}
                                        value={'allun.ga/' + result}
                                        margin="normal"
                                        variant="outlined"
                                        /> : 
                                    <TextField
                                        error
                                        id="outlined-error"
                                        label="Error"
                                        defaultValue="Something went wrong"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                }
                            </Grid>
                            <Grid item xs>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large"
                                    className={classes.button}
                                    onClick={e => handleSubmit(e)}
                                >
                                    <Typography variant="button">
                                        <strong>go!</strong>
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
                <CardActions 
                    className={classes.actions} 
                    disableActionSpacing
                >
                    {/*<IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>*/}
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={() => setExpanded(!expanded)}
                        aria-expanded={expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse 
                    in={expanded} 
                    timeout="auto" 
                    unmountOnExit
                >
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Customize your URL!
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <TextField
                            id="outlined-simple-start-adornment"
                            className={classes.textField}
                            variant="outlined"
                            onChange={e => setKeyword(e.target.value)}
                            value={keyword}
                            label="Customize your url!"
                            InputProps={{
                                startAdornment: 
                                    <InputAdornment position="start">allun.ga/</InputAdornment>,
                            }}
                        />
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

UrlCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UrlCard);
