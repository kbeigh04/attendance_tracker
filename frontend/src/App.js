import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dash';
import Report from './pages/summary';
import Edit from './pages/edit-db';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/summary" element={<Report />} />
         <Route path="/edit-db" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;

