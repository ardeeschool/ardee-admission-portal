import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './dashboard.jsx' 
import './index.css'   // ✅ this line is required

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
