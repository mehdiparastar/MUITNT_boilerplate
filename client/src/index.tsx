import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from 'auth/context/AuthProvider';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { googleLoginService } from 'services/auth/google.login.service';
import { WithLayout } from 'WithLayout';
import { CssBaseline } from '@mui/material';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <WithLayout>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_API_GOOGLE_OAUTH2}>
        <AuthProvider>
          {/* <CookiesProvider> */}
          <App />
          {/* </CookiesProvider> */}
        </AuthProvider>
      </GoogleOAuthProvider>
    </WithLayout>
  </React.StrictMode>
  ,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
