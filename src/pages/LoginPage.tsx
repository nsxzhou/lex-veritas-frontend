import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock auth logic
        if (email === 'admin@lexveritas.com') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-gray-900 p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-60" />
            </div>

            <div className="w-full max-w-[400px] z-10">
                {/* Header / Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/20 mb-6">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-medium tracking-tight text-gray-900 mb-2">
                        LexVeritas
                    </h1>
                    <p className="text-blue-600/80 text-sm font-medium tracking-wide uppercase">
                        Trusted Legal Intelligence
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-900/5 border border-white/50 p-8 transition-all duration-300">
                    <div className="flex items-center justify-center gap-1 bg-blue-50/50 p-1 rounded-lg mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={cn(
                                "flex-1 text-sm font-medium py-2 rounded-md transition-all duration-200",
                                isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-blue-600"
                            )}
                        >
                            登录
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={cn(
                                "flex-1 text-sm font-medium py-2 rounded-md transition-all duration-200",
                                !isLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-blue-600"
                            )}
                        >
                            注册
                        </button>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-5">
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    邮箱
                                </label>
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    密码
                                </label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isLogin ? '继续' : '创建账号'}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-wider">
                            <span className="px-2 bg-white text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="h-11 rounded-xl border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-11 rounded-xl border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all">
                            <Github className="w-5 h-5 mr-2" />
                            GitHub
                        </Button>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center mt-8 text-sm text-gray-400">
                    {isLogin ? "还没有账号？" : "已有账号？"}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 font-medium text-blue-600 hover:text-blue-700 hover:underline transition-all"
                    >
                        {isLogin ? "立即注册" : "立即登录"}
                    </button>
                </p>
            </div>
        </div>
    );
}

