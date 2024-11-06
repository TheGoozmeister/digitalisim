// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import AppRouter from './components/AppRouter';
import store from './store/store';
import theme from "./style/theme";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
