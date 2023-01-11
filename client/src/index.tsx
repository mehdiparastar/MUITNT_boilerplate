import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from 'auth/context/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { WithLayout } from 'WithLayout';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SnackbarProvider } from 'notistack';
import { LoadingProvider } from 'loading/context/LoadingProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <WithLayout>
          <SnackbarProvider maxSnack={3}>
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_API_GOOGLE_OAUTH2}
            >
              <LoadingProvider>
                <App />
              </LoadingProvider>
            </GoogleOAuthProvider>
          </SnackbarProvider>
        </WithLayout>
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
