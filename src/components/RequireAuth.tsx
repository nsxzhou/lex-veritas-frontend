import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import React from 'react';

interface RequireAuthProps {
    children: React.ReactElement; // Using React.ReactElement as explicit type
}

export function RequireAuth({ children }: RequireAuthProps) {
    const { isAuthenticated, accessToken, isInitialized } = useAuthStore();
    const location = useLocation();

    // 等待初始化完成
    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-500">加载中...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !accessToken) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
