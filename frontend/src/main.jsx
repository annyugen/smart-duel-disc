import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  // Disabling strict mode so TextField autofocus can work. A MUI bug https://stackoverflow.com/a/78192677/15047675
  // <StrictMode>
    <App />
  // </StrictMode>,
)
