import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { 
    withStyles,
    Paper,
    Typography
} from '@material-ui/core';

import Firestore from './util/Firestore';

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
                if (process.env.NODE_ENV !== 'production') {
                    console.log(doc.data()["expanded"]);
                }
                window.location.replace(doc.data()["expanded"]);
            })
        } else {
            setErrorMsg('Url not found');
        }
    })
    .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(error)
        }
        setErrorMsg('Something went wrong');
    });

    return (
        errorMsg == '' ?
            null :
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
    location: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(QueryPath);