import React from 'react';

import { 
    MuiThemeProvider, 
    createMuiTheme, 
    CssBaseline 
} from '@material-ui/core';

import { lightBlue, pink } from '@material-ui/core/colors';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: lightBlue,
        secondary: pink,
    },
});

// currying
function withRoot(Component) {
    function WithRoot(props) {
        // MuiThemeProvider makes the theme available down the React tree
        // thanks to React context.
        return (
            <MuiThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
