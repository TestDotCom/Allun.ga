import { useState, Fragment } from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@material-ui/core";

function AboutDialog() {
    const [open, setOpen] = useState(false);
    
    const handleClick = () => setOpen(!open);
    
    return (
        <Fragment>
            <Button 
                color='secondary'
                onClick={handleClick}>
                <strong>about</strong>
            </Button>
            <Dialog
                aria-labelledby="scroll-dialog-title"
                scroll="paper"
                open={open}
                onClose={handleClick}
            >
                <DialogTitle id="scroll-dialog-title">
                    About us
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Allun.ga is an italian [open source, succint, vaporwave, material-design] based URL shortner, written in ReactJS.
                    </DialogContentText>
                    <DialogContentText>
                        Allun.ga's name come from an italian verb which means 'to extend', we choose it to create the domain hack and obviously the wordplay.
                    </DialogContentText>
                    <DialogContentText gutterBottom>
                        Allun.ga is <strong>against</strong> racism, women harassment, pineapple bacon pizza and, of course, light themes in IDEs.
                    </DialogContentText>
                    <DialogContentText gutterBottom>
                        Feel free to use Allun.ga to shorten your url, but remember that we are in beta, so be patient if something doesn't work properly: open an issue on our Github repo, we'll work on it ;)
                    </DialogContentText>
                    <DialogContentText gutterBottom>
                        R.I.P. Harambe, Bob Ross, Stephen Hillenburg, Stan Lee, Stephen Hawkins [...]
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="primary"
                        onClick={() => setOpen(false)}
                    >
                        <strong>Got it!</strong>
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default AboutDialog;
