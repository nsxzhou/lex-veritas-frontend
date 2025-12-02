import { Scale, LayoutDashboard, Database, Users, Settings, LogOut, ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from 'recharts';

const stats = [
    {
        title: '总销售额',
        value: 892200,
        delta: 0.2,
        lastMonth: 889100,
        positive: true,
        prefix: '$',
        suffix: '',
        chartData: [
            { name: 'Jan', uv: 4000 },
            { name: 'Feb', uv: 3000 },
            { name: 'Mar', uv: 2000 },
            { name: 'Apr', uv: 2780 },
            { name: 'May', uv: 1890 },
            { name: 'Jun', uv: 2390 },
            { name: 'Jul', uv: 3490 },
        ],
    },
    {
        title: '新客户',
        value: 12800,
        delta: 3.1,
        lastMonth: 12400,
        positive: true,
        prefix: '',
        suffix: '',
        chartData: [
            { name: 'Jan', uv: 2000 },
            { name: 'Feb', uv: 1500 },
            { name: 'Mar', uv: 3000 },
            { name: 'Apr', uv: 2500 },
            { name: 'May', uv: 3200 },
            { name: 'Jun', uv: 3800 },
            { name: 'Jul', uv: 4200 },
        ],
    },
];

function StatCard({ title, value, delta, positive, prefix, suffix, chartData }: any) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                        <DropdownMenuItem>下载 CSV</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{prefix}{value.toLocaleString()}{suffix}</div>
                <p className={`text-xs ${positive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {positive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {delta}% 较上月
                </p>
                <div className="h-[80px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id={`colorUv-${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill={`url(#colorUv-${title})`} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

export function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col shadow-sm z-10">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Scale className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold tracking-tight text-gray-900">LexVeritas</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Button variant="secondary" className="w-full justify-start gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100">
                        <LayoutDashboard className="w-4 h-4" />
                        仪表盘
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <Database className="w-4 h-4" />
                        知识库
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <Users className="w-4 h-4" />
                        用户
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <Settings className="w-4 h-4" />
                        设置
                    </Button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <Link to="/">
                        <Button variant="outline" className="w-full justify-start gap-2 text-gray-500 hover:text-gray-900 border-gray-200">
                            <LogOut className="w-4 h-4" />
                            退出登录
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
                    <div>
                        <h1 className="font-semibold text-xl text-gray-900">仪表盘概览</h1>
                        <p className="text-xs text-gray-500">欢迎回来，管理员</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-white shadow-sm" />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, i) => (
                            <StatCard key={i} {...stat} />
                        ))}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4 border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle>概览</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={stats[0].chartData}>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3 border-gray-100 shadow-sm">
                            <CardHeader>
                                <CardTitle>最近销售</CardTitle>
                                <CardDescription>
                                    本月您完成了 265 笔销售。
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center">
                                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                                <div className="h-4 w-4 bg-primary rounded-full" />
                                            </div>
                                            <div className="ml-4 space-y-1">
                                                <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                                <p className="text-sm text-muted-foreground">
                                                    olivia.martin@email.com
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium">+$1,999.00</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
