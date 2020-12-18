import PropTypes from "prop-types";

import { 
    withStyles,
    Card,
    CardContent,
    CardMedia,
    Link
} from "@material-ui/core";

const error404 = new URL("../../img/error_404.png", import.meta.url).toString();
const error503 = new URL("../../img/error_503.png", import.meta.url).toString();

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    card: {
        padding: theme.spacing(2),
    },
    media: {
        height: 320,
    },
    link: {
        color: theme.palette.primary.light,
    },
});

function ErrorCard({classes, errorMsg}) {
    return(
        <div className={classes.root}>
            <Card className={classes.paper}>
                { errorMsg == 404 ?
                    <CardMedia
                        className={classes.media}
                        image={error404}
                        title="Bob Ross"
                    /> :
                    <CardMedia
                        className={classes.media}
                        image={error503}
                        title="Bob Ross"
                    /> 
                }
                <CardContent align="center">
                    <Link
                        className={classes.link}
                        variant="body1"
                        href={"https://allun.ga"}
                    >
                        <strong>
                            Just a little brush here... and you're back
                        </strong>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}

ErrorCard.propTypes = {
    classes: PropTypes.object.isRequired,
    errorMsg: PropTypes.number.isRequired,
};

export default withStyles(styles)(ErrorCard);
