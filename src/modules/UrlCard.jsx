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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Firestore from './util/Firestore';
import urlRegex from './util/UrlRegex';

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
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        
        var shrinked = '';

        if (urlRegex.test(url)) {
            if (keyword != '') {
                const query = Firestore.collection("urlMap").where(
                    'shrinked', '==', keyword
                )
    
                query.get().then(querySnap => {
                    if (querySnap.empty) {
                        setResult(keyword);
                        shrinked = keyword;
                    } else {
                        setError('Keyword already in use');
                    }
                })
                .catch(error => {
                    if (process.env.NODE_ENV !== 'production') {
                        console.log(error)
                    }
                    setError('Something went wrong');
                });
            } else {
                shrinked = crc32(url).toString(16);
                setResult(shrinked);
            }
        
            Firestore.collection("urlMap").doc().set({
                shrinked: shrinked,
                expanded: url
            })
            .then(() => {
                if (process.env.NODE_ENV !== 'production') {
                    console.log("doc written")
                }
            })
            .catch(error => {
                if (process.env.NODE_ENV !== 'production') {
                    console.log(error)
                }
                setError('Something went wrong');
            });
        } else {
            setError('Insert a valid URL');
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
                                    className={classes.textField}
                                    id="outlined-name"
                                    label="Enter your long URL"
                                    aria-label="Enter your long URL"
                                    margin="normal"
                                    variant="outlined"
                                    value={url}
                                    onChange={e => setUrl(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs>
                                { error == '' ? 
                                    <TextField
                                        className={classes.textField}
                                        id="outlined-read-only-input"
                                        label="Shortned URL"
                                        aria-label="Shortned URL"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={'allun.ga/' + result}
                                        /> : 
                                    <TextField
                                        error
                                        className={classes.textField}
                                        id="outlined-error"
                                        aria-label="There was an error"
                                        margin="normal"
                                        variant="outlined"
                                        value={error}
                                    />
                                }
                            </Grid>
                            <Grid item xs>
                                <Button 
                                    className={classes.button}
                                    variant="contained" 
                                    color="secondary" 
                                    size="large"
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
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        aria-label="Show more"
                        aria-expanded={expanded}
                        onClick={() => setExpanded(!expanded)}
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
                            className={classes.textField}
                            id="outlined-simple-start-adornment"
                            label="Customize your URL!"
                            aria-label="Customize your URL"
                            variant="outlined"
                            InputProps={{
                                startAdornment: 
                                    <InputAdornment position="start">
                                        allun.ga/
                                    </InputAdornment>,
                            }}
                            value={keyword}
                            onChange={e => setKeyword(e.target.value)}  
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
