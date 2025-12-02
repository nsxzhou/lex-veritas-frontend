import { useState } from 'react';
import {
    Scale,
    LayoutDashboard,
    Database,
    Users,
    Settings,
    LogOut,
    Activity,
    Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MultiSourceUploader } from '@/components/MultiSourceUploader';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AdminLayout() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col shadow-sm z-20">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Scale className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold tracking-tight text-gray-900">LexVeritas</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/admin">
                        <Button variant={location.pathname === '/admin' ? "secondary" : "ghost"} className={cn("w-full justify-start gap-2 font-medium", location.pathname === '/admin' ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")}>
                            <LayoutDashboard className="w-4 h-4" />
                            仪表盘
                        </Button>
                    </Link>
                    <Link to="/admin/knowledge">
                        <Button variant={location.pathname === '/admin/knowledge' ? "secondary" : "ghost"} className={cn("w-full justify-start gap-2 font-medium", location.pathname === '/admin/knowledge' ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")}>
                            <Database className="w-4 h-4" />
                            知识库管理
                        </Button>
                    </Link>
                    <Link to="/admin/users">
                        <Button variant={location.pathname === '/admin/users' ? "secondary" : "ghost"} className={cn("w-full justify-start gap-2 font-medium", location.pathname === '/admin/users' ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900")}>
                            <Users className="w-4 h-4" />
                            用户管理
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <Activity className="w-4 h-4" />
                        系统监控
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <Settings className="w-4 h-4" />
                        系统设置
                    </Button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link to="/">
                        <Button variant="outline" className="w-full justify-start gap-2 text-gray-500 hover:text-gray-900 border-gray-200 hover:bg-gray-50">
                            <LogOut className="w-4 h-4" />
                            退出登录
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="font-semibold text-xl text-gray-900">仪表盘概览</h1>
                        <p className="text-xs text-gray-500 mt-0.5">实时监控系统运行状态与业务数据</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            上传数据
                        </Button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">Admin User</p>
                                <p className="text-xs text-gray-500">超级管理员</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-white shadow-sm flex items-center justify-center text-blue-600 font-bold">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <Outlet />
                </div>

                <AnimatePresence>
                    {isUploadModalOpen && (
                        <MultiSourceUploader
                            isOpen={isUploadModalOpen}
                            onClose={() => setIsUploadModalOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
