import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Axios from 'axios';

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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
});

function UrlCard({classes}) {
    const [expanded, setExpanded] = useState(false);
    const [url, setUrl] = useState('');
    const [keyword, setKeyword] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = _ => {
        Axios({
            method: 'post',
            url: process.env.API_URL,
            headers: { 'content-type': 'application/json' },
            data: { 
                url: url,
                keyword: keyword,
                action: 'shrink'
            }
        }).then(result => {
            console.log(result);
            setResult(result);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader title="allun.ga" />
                <CardContent>
                    <form 
                        noValidate 
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        
                    <Grid container spacing={'auto'}>
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
                        <TextField
                            id="readonlyOut"
                            //label="Enter your long URL"
                            className={classes.textField}
                            value={result}
                            //onChange={e => setUrl(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            disabled
                        />
                        </Grid>
                        <Grid item xs={"auto"}></Grid>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button}
                            label="Submit" 
                            type="submit"
                        >
                            <Typography variant="button">
                                <strong>go!</strong>
                            </Typography>
                        </Button>
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
                            label="Customize your url!"
                            InputProps={{
                            startAdornment: <InputAdornment position="start">allun.ga/</InputAdornment>,
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
