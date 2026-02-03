import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx';
import { SearchProvider } from './Context/SearchContext.jsx';
import { HospitalProvider } from './Context/HospitalContext.jsx';
import { ServicesProvider } from "./Context/ServicesContext";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ServicesProvider>
    <HospitalProvider>
    <AuthProvider>
      <SearchProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
      </SearchProvider>
    </AuthProvider>
    </HospitalProvider>
    </ServicesProvider>
  </StrictMode>,
)
