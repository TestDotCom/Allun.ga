import React from 'react';

import { ThemeProvider } from '@material-ui/styles';

import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: cyan[300],
            main: cyan[500],
            dark: cyan[700],
        },
        secondary: {
            light: pink[400],
            main: pink[600],
            dark: pink[800],
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