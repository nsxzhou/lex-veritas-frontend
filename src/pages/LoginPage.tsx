import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, MessageSquare, Smartphone, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loginMethod, setLoginMethod] = useState<'password' | 'wechat' | 'phone'>('password');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock auth logic
        if (email === 'admin@lexveritas.com' || phone === '13800138000') {
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
                        {loginMethod === 'password' && (
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
                        )}

                        {loginMethod === 'phone' && (
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                        手机号
                                    </label>
                                    <Input
                                        type="tel"
                                        placeholder="138 0000 0000"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                        验证码
                                    </label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="text"
                                            placeholder="123456"
                                            value={verifyCode}
                                            onChange={(e) => setVerifyCode(e.target.value)}
                                            className="h-11 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                                            required
                                        />
                                        <Button type="button" variant="outline" className="h-11 px-4 whitespace-nowrap">
                                            获取验证码
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {loginMethod === 'wechat' && (
                            <div className="flex flex-col items-center justify-center py-4 space-y-4">
                                <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group">
                                    <QrCode className="w-24 h-24 text-gray-400 group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow-sm">点击模拟扫码</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="absolute inset-0 w-full h-full cursor-pointer"
                                    />
                                </div>
                                <p className="text-sm text-gray-500">请使用微信扫一扫登录</p>
                            </div>
                        )}

                        {loginMethod !== 'wechat' && (
                            <Button
                                type="submit"
                                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isLogin ? '登录' : '创建账号'}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        )}
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
                        <Button
                            variant="outline"
                            onClick={() => setLoginMethod('wechat')}
                            className={cn(
                                "h-11 rounded-xl border-gray-200 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all",
                                loginMethod === 'wechat' ? "bg-green-50 border-green-200 text-green-700 ring-2 ring-green-100" : ""
                            )}
                        >
                            <MessageSquare className="w-5 h-5 mr-2" />
                            微信登录
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setLoginMethod('phone')}
                            className={cn(
                                "h-11 rounded-xl border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all",
                                loginMethod === 'phone' ? "bg-blue-50 border-blue-200 text-blue-700 ring-2 ring-blue-100" : ""
                            )}
                        >
                            <Smartphone className="w-5 h-5 mr-2" />
                            手机登录
                        </Button>
                        {loginMethod !== 'password' && (
                            <Button
                                variant="outline"
                                onClick={() => setLoginMethod('password')}
                                className="h-11 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all col-span-2"
                            >
                                <ShieldCheck className="w-5 h-5 mr-2" />
                                账号密码登录
                            </Button>
                        )}
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

