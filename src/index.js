import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/style.scss'
import {StyledEngineProvider} from "@mui/material";
import App from './app'
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

const devMode = process.env.NODE_ENV === 'development';
if (devMode && module && module.hot) {
    module.hot.accept();
}
