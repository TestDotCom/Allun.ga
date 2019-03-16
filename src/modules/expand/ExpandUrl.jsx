import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import ErrorCard from './ErrorCard';
import Firestore from '../util/Firestore';

const styles = theme => ({
    root: {
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
});

function QueryPath(props) {
    const [errorMsg, setErrorMsg] = useState('');

    const shrinked = props.location.pathname.replace(/\//g, '');
    const docRef = Firestore.collection('urlMap').doc(shrinked);

    docRef.get()
        .then(doc => {
            if (doc.exists) {
                if (process.env.NODE_ENV !== 'production') {
                    console.log(doc.data());
                }
                window.location.replace(doc.data()['expanded']);
            } else {
                if (process.env.NODE_ENV !== 'production') {
                    console.log('no document');
                }
                setErrorMsg(404);
            }
        })
        .catch(e => {
            if (process.env.NODE_ENV !== 'production') {
                console.log(error)
            }
            setErrorMsg(503);
        });
        
    return (
        errorMsg == '' ?
            null :
            <Fragment>
                <ErrorCard errorMsg={errorMsg} />
            </Fragment>
    );
}

QueryPath.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(QueryPath);