import { useState } from 'react';
import {
    User,
    CreditCard,
    History,
    Settings,
    LogOut,
    ShieldCheck,
    ChevronRight,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

// --- Mock Data ---
const tokenUsageData = [
    { name: 'Mon', tokens: 2400 },
    { name: 'Tue', tokens: 1398 },
    { name: 'Wed', tokens: 9800 },
    { name: 'Thu', tokens: 3908 },
    { name: 'Fri', tokens: 4800 },
    { name: 'Sat', tokens: 3800 },
    { name: 'Sun', tokens: 4300 },
];

const historyData = [
    { id: 1, title: '劳动合同纠纷咨询', date: '2024-03-20 14:30', tokens: 450, status: 'verified' },
    { id: 2, title: '知识产权侵权判定', date: '2024-03-19 09:15', tokens: 1200, status: 'verified' },
    { id: 3, title: '公司注册流程', date: '2024-03-18 16:45', tokens: 320, status: 'verified' },
    { id: 4, title: '房屋租赁合同审查', date: '2024-03-15 11:20', tokens: 890, status: 'verified' },
];

export function UserProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white text-2xl font-bold">
                            U
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                            <p className="text-gray-500">user@example.com</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/">
                            <Button variant="outline">返回对话</Button>
                        </Link>
                        <Button variant="destructive" className="gap-2">
                            <LogOut className="w-4 h-4" />
                            退出登录
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Stats Cards */}
                    <Card className="md:col-span-2 border-gray-100 shadow-sm">
                        <CardHeader>
                            <CardTitle>Token 消耗统计</CardTitle>
                            <CardDescription>过去 7 天的使用情况</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={tokenUsageData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <YAxis
                                            stroke="#9ca3af"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#f9fafb' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Bar dataKey="tokens" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">当前套餐</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">套餐类型</span>
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">专业版</Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">剩余额度</span>
                                        <span className="font-medium text-gray-900">45,200 / 100,000</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-[45%]" />
                                    </div>
                                </div>
                                <Button className="w-full mt-2" variant="outline">
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    升级套餐
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base">账户设置</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start text-gray-600">
                                    <User className="w-4 h-4 mr-2" />
                                    个人信息
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-gray-600">
                                    <ShieldCheck className="w-4 h-4 mr-2" />
                                    安全设置
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-gray-600">
                                    <Settings className="w-4 h-4 mr-2" />
                                    偏好设置
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* History List */}
                <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle>问答历史归档</CardTitle>
                        <CardDescription>查看过往的咨询记录与区块链存证</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {historyData.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-blue-50/50 transition-colors group cursor-pointer border border-transparent hover:border-blue-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100 text-blue-600 shadow-sm">
                                            <History className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {item.date}
                                                </span>
                                                <span className="text-xs text-gray-400">|</span>
                                                <span className="text-xs text-gray-500">{item.tokens} Tokens</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3" />
                                            已上链
                                        </Badge>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
