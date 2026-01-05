import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThirdwebProvider } from 'thirdweb/react'

createRoot(document.getElementById('root')).render(
  
  <ThirdwebProvider>
    <App />
    </ThirdwebProvider>
  
)
