import { useState } from 'react';
import {
    LogOut,
    ChevronRight,
    Clock,
    Search,
    Trash2,
    BarChart3,
    Edit2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockTokenUsage, mockUserHistory } from '@/mocks/users';



export function UserProfilePage() {
    const navigate = useNavigate();
    const [history, setHistory] = useState(mockUserHistory);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredHistory = history.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setHistory(history.filter(item => item.id !== id));
    };

    const handleHistoryClick = (id: number) => {
        navigate(`/?session=${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                            <ChevronRight className="w-4 h-4 rotate-180" />
                        </div>
                        <span className="font-medium">返回对话</span>
                    </Link>
                </div>

                {/* Profile Header (Minimalist) */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-12">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600 border border-white shadow-sm">
                            U
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                            <p className="text-gray-500">user@example.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2 h-9 text-gray-600 border-gray-200 hover:bg-gray-50">
                            <Edit2 className="w-3.5 h-3.5" />
                            编辑资料
                        </Button>
                        <Button variant="ghost" className="gap-2 h-9 text-red-600 hover:bg-red-50 hover:text-red-700">
                            <LogOut className="w-3.5 h-3.5" />
                            退出
                        </Button>
                    </div>
                </div>

                {/* Content Tabs */}
                <Tabs defaultValue="overview" className="w-full space-y-8">
                    <div className="flex justify-center">
                        <TabsList className="bg-gray-100/50 p-1 rounded-full gap-1 h-auto inline-flex">
                            <TabsTrigger
                                value="overview"
                                className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500 hover:text-gray-900 transition-all"
                            >
                                概览
                            </TabsTrigger>
                            <TabsTrigger
                                value="history"
                                className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-500 hover:text-gray-900 transition-all"
                            >
                                历史记录
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="overview" className="mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="border-none shadow-sm bg-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                                        <BarChart3 className="w-4 h-4 text-gray-500" />
                                        Token 消耗趋势
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={mockTokenUsage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                                <XAxis
                                                    dataKey="name"
                                                    stroke="#9ca3af"
                                                    fontSize={12}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    dy={10}
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
                                                <Bar dataKey="tokens" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="history" className="mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="搜索历史记录..."
                                        className="pl-10 bg-white border-gray-200 focus:border-gray-300 transition-all"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-3">
                                    {filteredHistory.length === 0 ? (
                                        <div className="text-center py-12 text-gray-400">
                                            没有找到相关记录
                                        </div>
                                    ) : (
                                        filteredHistory.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => handleHistoryClick(item.id)}
                                                className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all group cursor-pointer"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-gray-100 transition-colors">
                                                        <Clock className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xs text-gray-500">{item.date}</span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                            <span className="text-xs text-gray-500">{item.tokens} Tokens</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                                                        onClick={(e) => handleDelete(e, item.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
