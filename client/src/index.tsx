import 'aos/dist/aos.css';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { WithLayout } from 'WithLayout';
import App from './App';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <WithLayout>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </WithLayout>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
