import React from 'react';
import { render } from 'react-snapshot';

import App from './modules/App';

if (process.env.NODE_ENV !== 'production') {
    var reactDOM = require('react-dom');
    var axe = require('react-axe');
    
    axe(React, reactDOM, 1000);
}

render(<App />, document.getElementById('app'));