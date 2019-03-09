import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
    withStyles,
    Paper,
    Typography
} from '@material-ui/core';

import Firestore from './Firestore';

const styles = theme => ({
    root: {
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
});

function QueryPath(props) {
    const [errorMsg, setErrorMsg] = useState('');

    Firestore.collection("urlMap").where(
        "shrinked", "==", props.location.pathname.replace(/\//g, '')
    )
    .get().then(querySnap => {
        if (!querySnap.empty) {
            querySnap.forEach(doc => {
                //console.log(doc.data()["expanded"]);
                window.location.replace(doc.data()["expanded"]);
            })
        } else {
            setErrorMsg('Url not found');
        }
    })
    .catch(error => {
        //console.log(error)
        setErrorMsg('Something went wrong');
    });

    return (
        <div>
            <Paper 
                className={props.classes.root} 
                elevation={1}
            >
                <Typography 
                    variant="h5" 
                    component="h3"
                >
                    Error!
                </Typography>
                <Typography component="p">
                    {errorMsg}
                </Typography>
            </Paper>
        </div>
    );
}

QueryPath.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(QueryPath);