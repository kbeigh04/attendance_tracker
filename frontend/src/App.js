import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dash';
import Attendance from './pages/attendance';
import Report from './pages/summary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/summary" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;

