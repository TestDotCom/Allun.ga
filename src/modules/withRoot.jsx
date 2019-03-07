import React from 'react';

import {
    MuiThemeProvider,
    createMuiTheme
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import lightBlue from '@material-ui/core/colors/lightBlue';
import pink from '@material-ui/core/colors/pink';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: lightBlue[300],
            main: lightBlue[500],
            dark: lightBlue[700],
        },
        secondary: {
            light: pink[300],
            main: pink[500],
            dark: pink[700],
        },
    },
});

function withRoot(Component) {
    function WithRoot(props) {
        // MuiThemeProvider makes the theme available down the React tree
        // thanks to React context.
        return ( 
            <MuiThemeProvider theme = {theme}> 
                {/* CssBaseline kickstart an elegant, consistent, and 
                  * simple baseline to build upon. */ } 
                <CssBaseline />
                <Component { ...props } />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;