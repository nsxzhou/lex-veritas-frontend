import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';
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
        title: 'Total Sales',
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
        title: 'New Customers',
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
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Download CSV</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{prefix}{value.toLocaleString()}{suffix}</div>
                <p className={`text-xs ${positive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {positive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {delta}% from last month
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

export function DashboardDemo() {
    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your key performance metrics.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
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
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>
                            You made 265 sales this month.
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
    );
}
