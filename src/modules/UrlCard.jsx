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
    //Grid,
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
                        <TextField
                            id="outlined-name"
                            label="Name"
                            className={classes.textField}
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
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
                            label="Custom url"
                            id="simple-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
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
