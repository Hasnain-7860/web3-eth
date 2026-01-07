import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThirdwebProvider } from 'thirdweb/react'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <>
   <Toaster position="top-right" reverseOrder={false} />
  <ThirdwebProvider>
    <App />
    </ThirdwebProvider> 
    </>
)
