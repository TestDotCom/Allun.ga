import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Button
} from "@material-ui/core";

import AboutDialog from "./AboutDialog";

const styles = {
  root: {
    flexGrow: 1,
    rounded: true,
    //minWidth: 210,
  },

};

function TopBar({classes}) {
  return (
    <div className={classes.root}>
      <AppBar 
        position="static" 
        color="default"
    >
        <Toolbar>
            <div>
                <AboutDialog />
            </div>
            <div>
                <Button
                    href="https://github.com/TestDotCom/Allun.ga" 
                    target="_blank" 
                    rel="noopener"
                    color="primary" 
                >
                    <strong>github</strong>
                </Button>
            </div>
            <div>
                <Button
                    href="https://www.youtube.com/embed/qK9OLRbAW30" 
                    rel="noopener"
                    target="_blank" 
                >
                    <strong>good vibes</strong>
                </Button>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);