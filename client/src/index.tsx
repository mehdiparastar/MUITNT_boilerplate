import React from 'react';
import { AuthLoalProvider } from 'auth-local-provider';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0ProviderWithConfig } from './auth0-provider-with-config';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <Auth0ProviderWithConfig>
      <AuthLoalProvider>
        <App />
      </AuthLoalProvider>
    </Auth0ProviderWithConfig>
  </CookiesProvider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
