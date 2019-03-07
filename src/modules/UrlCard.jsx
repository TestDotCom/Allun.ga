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
    Button
} from '@material-ui/core';

import ShareIcon from '@material-ui/icons/Share';
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
    const [expanded, setExpanded] = useState(false)
    const [url, setUrl] = useState('')
    const [keyword, setKeyword] = useState('')

    const handleClick = _ => {
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
                        className={classes.container}
                        noValidate
                        autoComplete="off"
                    >   
                        <TextField
                            id="outlined-full-width-dense"
                            label="insert link"
                            className={clsx(classes.textField, classes.dense)}
                            style={{ margin: 8 }}
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            onChange={e => setUrl(e.target.value)}
                        />
                        <Button 
                            variant="outlined" 
                            className={classes.button}
                            onClick={() => handleClick()}
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
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
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
                        <Grid container spacing={3}>
                            <Grid item xs={2}>
                                <TextField
                                    id="outlined-dense"
                                    className={clsx(classes.textField, classes.dense)}
                                    margin="dense"
                                    variant="outlined"
                                    defaultValue="allun.ga/"
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    id="outlined-dense"
                                    label="Custom endpoint"
                                    className={clsx(classes.textField, classes.dense)}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={e => setKeyword(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button}
                                    onClick={() => handleClick()}
                                >
                                    <Typography variant="button">
                                        <strong>go!</strong>
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
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
