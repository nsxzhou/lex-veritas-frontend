import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatPage } from '@/pages/ChatPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { ShowcasePage } from '@/pages/ShowcasePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/showcase" element={<ShowcasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
