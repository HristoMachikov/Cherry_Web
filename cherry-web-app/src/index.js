import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './shared/styles/site.scss';

import AppContext from './components/App/AppContext';

ReactDOM.render(<BrowserRouter>
    <AppContext />
</BrowserRouter>, document.getElementById('root'));