import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from 'react-router-dom';
import {createRoot} from "react-dom/client";

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
        <HashRouter>
            <App/>
        </HashRouter>,
);

reportWebVitals();
