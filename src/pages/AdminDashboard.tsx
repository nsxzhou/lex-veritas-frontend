import {
    Users,
    ArrowDown,
    ArrowUp,
    Activity,
    FileText,
    Search,
    Server,
    Database,
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

// --- Mock Data ---
const stats = [
    {
        title: '总提问数',
        value: "128,930",
        delta: 12.5,
        positive: true,
        icon: Search,
        chartData: [
            { name: 'Mon', uv: 4000 },
            { name: 'Tue', uv: 3000 },
            { name: 'Wed', uv: 2000 },
            { name: 'Thu', uv: 2780 },
            { name: 'Fri', uv: 1890 },
            { name: 'Sat', uv: 2390 },
            { name: 'Sun', uv: 3490 },
        ],
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        strokeColor: "#2563eb"
    },
    {
        title: '活跃用户 (MAU)',
        value: "8,200",
        delta: 5.2,
        positive: true,
        icon: Users,
        chartData: [
            { name: 'Mon', uv: 2000 },
            { name: 'Tue', uv: 1500 },
            { name: 'Wed', uv: 3000 },
            { name: 'Thu', uv: 2500 },
            { name: 'Fri', uv: 3200 },
            { name: 'Sat', uv: 3800 },
            { name: 'Sun', uv: 4200 },
        ],
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
        strokeColor: "#4f46e5"
    },
    {
        title: '知识库条目',
        value: "1.2M",
        delta: 0.8,
        positive: true,
        icon: Database,
        chartData: [
            { name: 'Mon', uv: 1000 },
            { name: 'Tue', uv: 1200 },
            { name: 'Wed', uv: 1100 },
            { name: 'Thu', uv: 1300 },
            { name: 'Fri', uv: 1400 },
            { name: 'Sat', uv: 1350 },
            { name: 'Sun', uv: 1500 },
        ],
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        strokeColor: "#059669"
    },
    {
        title: '系统健康度',
        value: "99.9%",
        delta: -0.01,
        positive: false,
        icon: Server,
        chartData: [
            { name: 'Mon', uv: 99 },
            { name: 'Tue', uv: 99 },
            { name: 'Wed', uv: 98 },
            { name: 'Thu', uv: 99 },
            { name: 'Fri', uv: 100 },
            { name: 'Sat', uv: 100 },
            { name: 'Sun', uv: 99 },
        ],
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        strokeColor: "#d97706"
    }
];

const queryVolumeData = [
    { name: '00:00', value: 120 },
    { name: '04:00', value: 50 },
    { name: '08:00', value: 800 },
    { name: '12:00', value: 1500 },
    { name: '16:00', value: 1200 },
    { name: '20:00', value: 900 },
    { name: '23:59', value: 300 },
];

const recentActivity = [
    { user: "Alice Guo", action: "上传了新合同模板", target: "劳动合同_v2.pdf", time: "10分钟前", icon: FileText },
    { user: "Bob Chen", action: "更新了知识库", target: "民法典_修正案.docx", time: "32分钟前", icon: Database },
    { user: "System", action: "自动索引完成", target: "2,300 条新记录", time: "1小时前", icon: Server },
    { user: "David Li", action: "标记了异常回答", target: "ID: #8823", time: "2小时前", icon: Activity },
    { user: "Eva Zhang", action: "新增用户组", target: "法务部_实习生", time: "3小时前", icon: Users },
];

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
