import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
// Find the element where you want your app to be mounted
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

root.render(
  <React.Fragment>
    <GoogleOAuthProvider clientId='833022001659-vfll4tf2dkghr6ekou6s3tbsh1idlk59.apps.googleusercontent.com'>
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
  </React.Fragment>,
  document.getElementById('root')
);