import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Button,
    Avatar
} from "@material-ui/core";

import AboutDialog from "./AboutDialog";

const logo = new URL("../../img/logo_small.png", import.meta.url).toString();

const styles = {
    root: {
        flexGrow: 1,
        rounded: true,
    },
    avatar: {
        marginLeft: 4,
        marginRight: 8
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
                <Avatar
                    className={classes.avatar}
                    alt="FlamingoSW"
                    src={logo}
                />
            </div>
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
                    href="https://deals.allun.ga" 
                    rel="noopener"
					target="_blank" 
					color="secondary"
                >
                    <strong>offerte amazon</strong>
                </Button>
            </div>
            <div>
                <Button
                    href="https://www.youtube.com/embed/5qap5aO4i9A" 
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
