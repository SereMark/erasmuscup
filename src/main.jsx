import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "../global.css";

/**
 * Application entry point
 *
 * Sets up:
 * - BrowserRouter for routing
 * - HelmetProvider for managing document head
 * - React StrictMode for development-time error detection
 */

// Register service worker **only in production**
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .catch(err => console.error('Service worker registration failed:', err));
  });
}

// Create root element and render app
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);