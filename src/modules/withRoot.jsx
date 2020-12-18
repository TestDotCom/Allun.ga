import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { cyan, pink } from "@material-ui/core/colors"


const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: cyan[300],
            main: cyan[500],
            dark: cyan[700],
        },
        secondary: {
            light: pink["A100"],
            main: pink["A200"],
            dark: pink[600],
        },
    },
});

function withRoot(Component) {
    function WithRoot(props) {
        // ThemeProvider makes the theme available down the React tree
        // thanks to React context.
        return ( 
            <ThemeProvider theme = {theme}> 
                {/* CssBaseline kickstart an elegant, consistent, and 
                  * simple baseline to build upon. */ } 
                <CssBaseline />
                <Component { ...props } />
            </ThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
