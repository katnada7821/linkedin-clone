
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './assets/context/AuthContext.jsx'
import UserContext from './assets/context/userContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContext>
      <UserContext>
      <App />
      </UserContext>
    </AuthContext>
    
  </BrowserRouter>,
)
