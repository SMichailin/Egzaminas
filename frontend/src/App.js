import React from 'react';
import LoginForm from './Pages/Auth/Login';
import { AuthProvider, RequireAuth, RequireAdmin, AuthorizedRedirect } from './context/Auth';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import RegistrationForm from "./Pages/Auth/Register"
import "./App.css"
import Main from './Pages/Main/Main';

function App() {
  return (
    <div className="App">
      
      <AuthProvider>
        <Router>
            <Routes>
            <Route path="*" element={<Navigate to="/" />} />
              <Route path="/" element={<RequireAuth><Main /></RequireAuth>} />
              <Route path="/Login" element={<AuthorizedRedirect><LoginForm /></AuthorizedRedirect>} />
              <Route path="/Register" element={<AuthorizedRedirect><RegistrationForm /></AuthorizedRedirect>} />
            
            </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
