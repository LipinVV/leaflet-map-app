import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import App from './App';
import './index.scss';
import {theme} from "./theme";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
