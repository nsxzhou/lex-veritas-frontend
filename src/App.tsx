import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatPage } from '@/pages/ChatPage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminDashboard } from '@/pages/admin/Dashboard';
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

import { useAuthStore } from '@/stores/authStore';
import { RequireAuth } from '@/components/RequireAuth';
import { useEffect } from 'react';

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/profile" element={<RequireAuth><UserProfilePage /></RequireAuth>} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
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
