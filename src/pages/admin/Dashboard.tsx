import {
    ArrowDown,
    ArrowUp,
    Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { MultiSourceUploader } from '@/components/MultiSourceUploader';
import { AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid
} from 'recharts';
import { cn } from '@/lib/utils';

import { stats, queryVolumeData, recentActivity } from '@/__mocks__/dashboard';

// --- Components ---

interface StatCardProps {
    title: string;
    value: string;
    delta: number;
    positive: boolean;
    icon: React.ElementType;
    chartData: { name: string; uv: number }[];
    color: string;
    bgColor: string;
    strokeColor: string;
}

function StatCard({ title, value, delta, positive, icon: Icon, chartData, color, bgColor, strokeColor }: StatCardProps) {
    return (
        <Card className="overflow-hidden border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
                <div className={cn("p-2 rounded-lg", bgColor)}>
                    <Icon className={cn("w-4 h-4", color)} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="flex items-center mt-1 mb-4">
                    <span className={cn(
                        "text-xs font-medium flex items-center px-1.5 py-0.5 rounded-full",
                        positive ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
                    )}>
                        {positive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {Math.abs(delta)}%
                    </span>
                    <span className="text-xs text-gray-400 ml-2">较上周</span>
                </div>
                <div className="h-[60px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id={`colorUv-${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={strokeColor} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="uv"
                                stroke={strokeColor}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill={`url(#colorUv-${title})`}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export function AdminDashboard() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-semibold text-2xl text-gray-900">仪表盘概览</h1>
                    <p className="text-sm text-gray-500 mt-1">实时监控系统运行状态与业务数据</p>
                </div>
                <Button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    上传数据
                </Button>
            </div>
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Chart */}
                <Card className="col-span-4 border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">提问量趋势 (24h)</CardTitle>
                        <CardDescription>
                            今日系统处理的法律咨询请求总量分布。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={queryVolumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorQuery" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
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
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#1f2937' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorQuery)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-3 border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">近期活动</CardTitle>
                        <CardDescription>
                            系统内的最新操作记录与审计日志。
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentActivity.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                        <item.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <p className="text-sm font-medium text-gray-900 leading-none">
                                            {item.user} <span className="font-normal text-gray-500">{item.action}</span>
                                        </p>
                                        <p className="text-xs text-blue-600 font-medium bg-blue-50 inline-block px-2 py-0.5 rounded-full">
                                            {item.target}
                                        </p>
                                    </div>
                                    <div className="text-xs text-gray-400 whitespace-nowrap">
                                        {item.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>


            <AnimatePresence>
                {isUploadModalOpen && (
                    <MultiSourceUploader
                        isOpen={isUploadModalOpen}
                        onClose={() => setIsUploadModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div >
    );
}
