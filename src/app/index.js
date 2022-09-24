import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.js';
import { StateProvider } from './StateProvider.js';
import reducer, { initialState } from './reducer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StateProvider initialState={initialState} reducer={reducer}>
        <HashRouter>    
            <App />
        </HashRouter>                
    </StateProvider>
);