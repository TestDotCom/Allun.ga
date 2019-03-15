import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
    Typography,
    Modal,
    Button
} from '@material-ui/core';

//function rand() {
  //return Math.round(Math.random() * 20) - 10;
//}

function getModalStyle() {
    const top = 50 //+ rand();
    const left = 50 //+ rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
    },
});

function ButtonModal({classes}) {
    const [open, setOpen] = useState(false);
    
    return (
        <div>
            <Button 
                color="secondary" 
                onClick={() => setOpen(!open)}
            >
                <strong>About</strong>
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={() => setOpen(!open)}
            >
                <div 
                    className={classes.paper}
                    style={getModalStyle()} 
                >
                    <Typography 
                        id="modal-title"
                        variant="h6"
                    >
                        About - click anywhere outside this window to exit
                    </Typography>
                    <hr></hr>
                    <Typography 
                        id="simple-modal-description"
                        variant="subtitle1"
                    >
                        Allun.ga is an italian open source, succint, vaporwave, material-design based URL shortner, forged with React.<br></br>
                        Allun.ga's name come from an italian verb which means 'to extend', we choose it to create the domain hack and obviously the wordplay.<br></br>
                        Allun.ga is <strong>against</strong> racism, women harassment, pineapple bacon pizza and, of course, light themes in IDEs. 
                        <hr></hr>
                        Feel free to use allun.ga to shorten your url, remember that we are in beta, so be patient if something doesn't work properly. We're working to fix it ;)
                        <hr></hr>
                        R.I.P. Harambe, Bob Ross, Stephen Hillenburg, Stan Lee, Stephen Hawkins [...]
                    </Typography>
                </div>
            </Modal>
        </div>
    );
  }

ButtonModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonModal);

