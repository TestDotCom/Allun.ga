import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

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
    Grid
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  

});

function RecipeReviewCard({classes}) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader title="allun.ga" />
                <CardContent>
                    <TextField
                        id="outlined-full-width-dense"
                        label="insert link"
                        className={clsx(classes.textField, classes.dense)}
                        style={{ margin: 8 }}
                        fullWidth
                        margin="dense"
                        variant="outlined"
                    />
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
                        <Typography paragraph>
                            Customize your URL!
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <TextField
                                    id="outlined-read-only-input"
                                    defaultValue="allun.ga/"
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    id="outlined-dense"
                                    label="Custom endpoint"
                                    className={clsx(classes.textField, classes.dense)}
                                    margin="dense"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
