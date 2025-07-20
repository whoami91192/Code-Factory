import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import App from './App.tsx'
import './index.css'

const recaptchaSiteKey = '6LcLUIkrAAAAAAEhbhqGdyii6YPy93ghOu1B0N0E'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
) 