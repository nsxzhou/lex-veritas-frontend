import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatPage } from '@/pages/ChatPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { KnowledgeBasePage } from '@/pages/admin/KnowledgeBasePage';
import { UserManagementPage } from '@/pages/admin/UserManagementPage';
import { ShowcasePage } from '@/pages/ShowcasePage';
import { AdminLayout } from '@/layouts/AdminLayout';
import { UserLayout } from '@/layouts/UserLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="knowledge" element={<KnowledgeBasePage />} />
          <Route path="users" element={<UserManagementPage />} />
        </Route>
        <Route path="/showcase" element={<ShowcasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
