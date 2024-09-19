import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App';



const PUBLISHABLE_KEY ="pk_test_ZGVmaW5pdGUtZ3J1Yi0xOS5jbGVyay5hY2NvdW50cy5kZXYk";
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
