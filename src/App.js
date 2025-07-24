import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import AppointmentPage from './pages/AppointmentPage';
import BarberLoginPage from './pages/BarberLoginPage';
import BarberAppointmentsPage from './pages/BarberAppointmentsPage';
import Homepage from './pages/HomePage';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isBarberAuthenticated, setIsBarberAuthenticated] = useState(false);

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        isBarberAuthenticated={isBarberAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setIsBarberAuthenticated={setIsBarberAuthenticated}
      />

      <nav>
        <ul>
          {isAuthenticated && <li><Link to="/appointments">Randevular</Link></li>}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={
          <Homepage
            isAuthenticated={isAuthenticated}
            isBarberAuthenticated={isBarberAuthenticated}
          />
        } />
        <Route path="/login" element={<UserLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/appointments" element={
          isAuthenticated ? <AppointmentPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />
        } />
        <Route path="/barber-login" element={<BarberLoginPage setIsBarberAuthenticated={setIsBarberAuthenticated} />} />
        <Route path="/barber-appointments" element={<BarberAppointmentsPage setIsBarberAuthenticated={setIsBarberAuthenticated}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
