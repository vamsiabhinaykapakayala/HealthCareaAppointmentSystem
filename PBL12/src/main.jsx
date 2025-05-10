import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Dashboard from './Dashboard';
import JobPosting from './JobPosting'; // Import the JobPosting component
import DoctorAppointment from './DoctorAppointment.jsx';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* New route for the JobPosting component */}
        <Route path="/book-appointment" element={<JobPosting />} />
        <Route path="/DoctorAppointment" element={<DoctorAppointment/>} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<Main />);