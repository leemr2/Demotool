import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Add polyfills for browser environment
import 'stream-browserify';
import 'browserify-zlib';
import 'https-browserify';
import 'stream-http';

// Comment out MSW initialization for now
// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');
//   return worker.start({
//     onUnhandledRequest: 'bypass',
//   });
// }

// Start the app directly without MSW
// enableMocking().then(() => {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// });

reportWebVitals(); 