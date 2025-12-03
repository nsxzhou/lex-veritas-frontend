import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Search, ShieldAlert, CheckCircle, Clock, Filter } from 'lucide-react';

import { auditLogs } from '@/mocks/audit';

export function SecurityAuditPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">安全审计日志</h1>
                    <p className="text-gray-500">监控系统安全事件与数据完整性告警</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="搜索日志..."
                            className="pl-9 w-[250px] bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        筛选
                    </Button>
                    <Button variant="destructive">
                        <ShieldAlert className="w-4 h-4 mr-2" />
                        导出报告
                    </Button>
                </div>
            </div>

            {/* Alert Summary */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-red-100 bg-red-50/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-600">
                            高风险告警
                        </CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-700">3</div>
                        <p className="text-xs text-red-600/80 mt-1">
                            过去 24 小时新增 1 条
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-yellow-100 bg-yellow-50/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-600">
                            待处理事件
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-700">5</div>
                        <p className="text-xs text-yellow-600/80 mt-1">
                            需尽快响应
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-green-100 bg-green-50/50 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-600">
                            系统安全评分
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-700">92</div>
                        <p className="text-xs text-green-600/80 mt-1">
                            系统运行状态良好
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Logs Table */}
            <Card className="border-gray-100 shadow-sm">
                <CardHeader>
                    <CardTitle>审计日志列表</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>事件类型</TableHead>
                                <TableHead>严重程度</TableHead>
                                <TableHead>消息内容</TableHead>
                                <TableHead>来源</TableHead>
                                <TableHead>时间</TableHead>
                                <TableHead>状态</TableHead>
                                <TableHead className="text-right">操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium">#{log.id}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {log.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                log.severity === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                                                    log.severity === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                        'bg-blue-50 text-blue-700 border-blue-200'
                                            }
                                        >
                                            {log.severity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{log.message}</TableCell>
                                    <TableCell className="font-mono text-xs text-gray-500">{log.source}</TableCell>
                                    <TableCell className="text-gray-500 text-sm">{log.timestamp}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${log.status === 'unresolved' ? 'bg-red-500' :
                                                log.status === 'investigating' ? 'bg-yellow-500' :
                                                    'bg-green-500'
                                                }`} />
                                            <span className="capitalize text-sm text-gray-700">{log.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                            查看
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
