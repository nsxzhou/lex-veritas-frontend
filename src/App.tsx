import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatPage } from '@/pages/ChatPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { KnowledgeBasePage } from '@/pages/admin/KnowledgeBasePage';
import { UserManagementPage } from '@/pages/admin/UserManagementPage';
import { ShowcasePage } from '@/pages/ShowcasePage';
import { UserProfilePage } from '@/pages/UserProfilePage';
import { AdminLayout } from '@/layouts/AdminLayout';
import { UserLayout } from '@/layouts/UserLayout';
import { Toaster } from '@/components/ui/sonner';

import { ProofVisualizationPage } from '@/pages/admin/ProofVisualizationPage';
import { SecurityAuditPage } from '@/pages/admin/SecurityAuditPage';
import { SettingsPage } from '@/pages/admin/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="knowledge" element={<KnowledgeBasePage />} />
          <Route path="proof" element={<ProofVisualizationPage />} />
          <Route path="audit" element={<SecurityAuditPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/showcase" element={<ShowcasePage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
