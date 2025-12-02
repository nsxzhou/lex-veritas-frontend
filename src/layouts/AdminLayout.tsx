import {
    Scale,
    LayoutDashboard,
    Database,
    Users,
    Settings,
    Activity,
    Network,
    ShieldAlert,
    LogIn,
    ChevronLeft
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function AdminLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
            {/* Sidebar */}
            <aside className={cn(
                "bg-white border-r border-gray-100 hidden md:flex flex-col shadow-sm z-20 transition-all duration-300 relative",
                isCollapsed ? "w-20" : "w-64"
            )}>
                {/* Toggle Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 z-50 hidden md:flex"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <ChevronLeft className={cn("w-3 h-3 transition-transform duration-300", isCollapsed && "rotate-180")} />
                </Button>

                <div className="h-16 flex items-center px-6 border-b border-gray-100 overflow-hidden">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                            <Scale className="w-5 h-5 text-white" />
                        </div>
                        <span className={cn(
                            "font-bold tracking-tight text-gray-900 transition-all duration-300 whitespace-nowrap",
                            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                        )}>
                            LexVeritas
                        </span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-hidden">
                    {[
                        { path: '/admin', icon: LayoutDashboard, label: '仪表盘' },
                        { path: '/admin/users', icon: Users, label: '用户管理' },
                        { path: '/admin/knowledge', icon: Database, label: '知识库管理' },
                        { path: '/admin/proof', icon: Network, label: '存证可视化' },
                        { path: '/admin/audit', icon: ShieldAlert, label: '安全审计' },
                        { path: '/admin/settings', icon: Settings, label: '系统设置' },
                    ].map((item) => (
                        <Link key={item.path} to={item.path}>
                            <Button
                                variant={location.pathname === item.path ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-2 font-medium transition-all duration-300",
                                    location.pathname === item.path ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    isCollapsed && "justify-center px-2"
                                )}
                            >
                                <item.icon className="w-4 h-4 shrink-0" />
                                <span className={cn(
                                    "transition-all duration-300 whitespace-nowrap overflow-hidden",
                                    isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                                )}>
                                    {item.label}
                                </span>
                            </Button>
                        </Link>
                    ))}
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-start gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300",
                            isCollapsed && "justify-center px-2"
                        )}
                    >
                    </Button>
                </nav>

                <div className="mt-auto p-4 border-t border-gray-100 overflow-hidden">
                    <Link to="/login">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 h-12 rounded-xl transition-all duration-300",
                                isCollapsed && "justify-center px-2"
                            )}
                        >
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0">
                                <LogIn className="w-4 h-4 text-gray-500" />
                            </div>
                            <div className={cn(
                                "flex flex-col items-start text-xs transition-all duration-300 whitespace-nowrap overflow-hidden",
                                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                            )}>
                                <span className="font-medium text-sm">Admin User</span>
                                <span className="text-gray-400">超级管理员</span>
                            </div>
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
