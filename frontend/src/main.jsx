import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App';



const PUBLISHABLE_KEY ="xyz"; // enter your key for clerk
// const PUBLISHABLE_KEY = process.env.KEYCLERK;


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  // <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
       <App></App>
    </ClerkProvider>
  // </StrictMode>,
)
