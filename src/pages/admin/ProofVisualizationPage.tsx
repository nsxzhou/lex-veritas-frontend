import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Database, ShieldCheck, GitCommit, ArrowRight, CheckCircle2, Clock, FileText, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// --- Mock Data ---
const merkleTreeData = {
    root: "0x8f3...2a9",
    levels: [
        [
            { hash: "0x8f3...2a9", type: "root", status: "verified" }
        ],
        [
            { hash: "0x4a1...b2c", type: "node", status: "verified" },
            { hash: "0x9d2...e4f", type: "node", status: "verified" }
        ],
        [
            { hash: "0x1b2...3c4", type: "leaf", status: "verified", data: "Doc A" },
            { hash: "0x5e6...7f8", type: "leaf", status: "verified", data: "Doc B" },
            { hash: "0x9a0...1b2", type: "leaf", status: "verified", data: "Doc C" },
            { hash: "0x3c4...5d6", type: "leaf", status: "tampered", data: "Doc D" }
        ]
    ]
};

const recentProofs = [
    { id: 1, root: "0x8f3...2a9", timestamp: "2024-03-20 14:30:00", block: 18234567, status: "verified", txHash: "0x7f...3a2b" },
    { id: 2, root: "0x7e2...1b8", timestamp: "2024-03-20 14:00:00", block: 18234500, status: "verified", txHash: "0x2c...9d1e" },
    { id: 3, root: "0x6d1...0a7", timestamp: "2024-03-20 13:30:00", block: 18234450, status: "pending", txHash: "0x5a...8b4c" },
];

const stats = [
    { label: "已存证区块", value: "1,234", icon: Box, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "验证通过", value: "99.9%", icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50" },
    { label: "今日新增", value: "+56", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
];

export function ProofVisualizationPage() {
    const [selectedNode, setSelectedNode] = useState<any>(null);

    return (
        <div className="space-y-8 p-6 max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">存证与指纹可视化</h1>
                    <p className="text-gray-500 mt-2 text-lg">实时监控 Merkle Tree 状态与区块链存证记录，确保数据不可篡改。</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input
                            type="search"
                            placeholder="搜索 Hash / 区块高度..."
                            className="pl-10 w-[300px] bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all shadow-sm"
                        />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
                        <Database className="w-4 h-4 mr-2" />
                        验证数据完整性
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative group">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50/50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <CardContent className="p-6 flex items-center gap-4 relative z-10">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:rotate-6", stat.bg, stat.color)}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Merkle Tree Visualization */}
                <Card className="lg:col-span-2 border-gray-200 shadow-lg overflow-hidden">
                    <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <GitCommit className="w-5 h-5 text-blue-600" />
                                    Merkle Tree 结构视图
                                </CardTitle>
                                <CardDescription className="mt-1">可视化展示数据指纹的聚合过程</CardDescription>
                            </div>
                            <Badge variant="outline" className="bg-white">Live Update</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 min-h-[500px] bg-gradient-to-b from-white to-gray-50/30 relative">
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <svg width="100%" height="100%" viewBox="0 0 800 400" className="max-w-full drop-shadow-xl">
                                <defs>
                                    <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#e2e8f0" />
                                        <stop offset="100%" stopColor="#cbd5e1" />
                                    </linearGradient>
                                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* Connections with curves */}
                                <g stroke="url(#linkGradient)" strokeWidth="2" fill="none">
                                    {/* Level 0 to 1 */}
                                    <path d="M400,60 C400,120 200,120 200,180" className="transition-all duration-500 hover:stroke-blue-400 hover:stroke-[3px]" />
                                    <path d="M400,60 C400,120 600,120 600,180" className="transition-all duration-500 hover:stroke-blue-400 hover:stroke-[3px]" />
                                    {/* Level 1 to 2 */}
                                    <path d="M200,180 C200,240 100,240 100,300" className="transition-all duration-500 hover:stroke-blue-400 hover:stroke-[3px]" />
                                    <path d="M200,180 C200,240 300,240 300,300" className="transition-all duration-500 hover:stroke-blue-400 hover:stroke-[3px]" />
                                    <path d="M600,180 C600,240 500,240 500,300" className="transition-all duration-500 hover:stroke-blue-400 hover:stroke-[3px]" />
                                    <path d="M600,180 C600,240 700,240 700,300" className="transition-all duration-500 hover:stroke-blue-400 hover:stroke-[3px]" />
                                </g>

                                {/* Nodes */}
                                {/* Root */}
                                <g
                                    onClick={() => setSelectedNode(merkleTreeData.levels[0][0])}
                                    className="cursor-pointer group"
                                    transform="translate(400, 60)"
                                >
                                    <circle r="24" fill="white" stroke="#3b82f6" strokeWidth="3" className="transition-all duration-300 group-hover:fill-blue-50 group-hover:scale-110 shadow-lg" />
                                    <ShieldCheck className="w-6 h-6 text-blue-600 -translate-x-3 -translate-y-3 pointer-events-none" />
                                    <text y="-35" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity">Root Hash</text>
                                </g>

                                {/* Level 1 */}
                                <g
                                    onClick={() => setSelectedNode(merkleTreeData.levels[1][0])}
                                    className="cursor-pointer group"
                                    transform="translate(200, 180)"
                                >
                                    <circle r="18" fill="white" stroke="#60a5fa" strokeWidth="2" className="transition-all duration-300 group-hover:fill-blue-50 group-hover:scale-110 shadow-md" />
                                </g>
                                <g
                                    onClick={() => setSelectedNode(merkleTreeData.levels[1][1])}
                                    className="cursor-pointer group"
                                    transform="translate(600, 180)"
                                >
                                    <circle r="18" fill="white" stroke="#60a5fa" strokeWidth="2" className="transition-all duration-300 group-hover:fill-blue-50 group-hover:scale-110 shadow-md" />
                                </g>

                                {/* Level 2 (Leaves) */}
                                {[
                                    { x: 100, y: 300, data: "Doc A", status: "verified" },
                                    { x: 300, y: 300, data: "Doc B", status: "verified" },
                                    { x: 500, y: 300, data: "Doc C", status: "verified" },
                                    { x: 700, y: 300, data: "Doc D", status: "tampered" }
                                ].map((node, i) => (
                                    <g
                                        key={i}
                                        onClick={() => setSelectedNode(merkleTreeData.levels[2][i])}
                                        className="cursor-pointer group"
                                        transform={`translate(${node.x}, ${node.y})`}
                                    >
                                        <circle
                                            r="16"
                                            fill="white"
                                            stroke={node.status === 'verified' ? '#4ade80' : '#ef4444'}
                                            strokeWidth="2"
                                            className="transition-all duration-300 group-hover:scale-110 shadow-sm"
                                        />
                                        <text y="35" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="medium">{node.data}</text>
                                        {node.status === 'tampered' && (
                                            <circle r="4" fill="#ef4444" cx="12" cy="-12" className="animate-pulse" />
                                        )}
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Panel */}
                <div className="space-y-6">
                    <Card className="border-gray-200 shadow-lg h-full bg-white/80 backdrop-blur-sm">
                        <CardHeader className="border-b border-gray-100">
                            <CardTitle className="text-lg">节点详情</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <AnimatePresence mode="wait">
                                {selectedNode ? (
                                    <motion.div
                                        key={selectedNode.hash}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hash Value</span>
                                            <div className="p-4 bg-gray-50 rounded-xl font-mono text-xs break-all text-gray-700 border border-gray-200 shadow-inner">
                                                {selectedNode.hash}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Type</span>
                                                <div className="font-semibold text-gray-900 capitalize flex items-center gap-2">
                                                    <Box className="w-4 h-4 text-blue-500" />
                                                    {selectedNode.type}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
                                                <Badge
                                                    variant="outline"
                                                    className={cn(
                                                        "px-2.5 py-0.5",
                                                        selectedNode.status === 'verified'
                                                            ? 'bg-green-50 text-green-700 border-green-200'
                                                            : 'bg-red-50 text-red-700 border-red-200'
                                                    )}
                                                >
                                                    {selectedNode.status === 'verified' ? (
                                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                                    ) : (
                                                        <ShieldCheck className="w-3 h-3 mr-1" />
                                                    )}
                                                    {selectedNode.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        {selectedNode.data && (
                                            <div className="space-y-2">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Original Data</span>
                                                <div className="p-3 bg-blue-50/50 text-blue-900 rounded-lg text-sm border border-blue-100 flex items-start gap-2">
                                                    <FileText className="w-4 h-4 mt-0.5 text-blue-500" />
                                                    {selectedNode.data}
                                                </div>
                                            </div>
                                        )}
                                        <Button className="w-full" variant="outline">
                                            查看完整溯源路径
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <div className="h-[300px] flex flex-col items-center justify-center text-gray-400">
                                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                            <GitCommit className="w-8 h-8 opacity-20" />
                                        </div>
                                        <p className="text-sm font-medium">点击左侧节点查看详情</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Proofs List */}
            <Card className="border-gray-200 shadow-lg overflow-hidden">
                <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between">
                        <CardTitle>最近上链记录</CardTitle>
                        <Button variant="ghost" size="sm" className="text-blue-600">查看全部</Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                        {recentProofs.map((proof) => (
                            <div key={proof.id} className="flex items-center justify-between p-5 hover:bg-gray-50/80 transition-colors group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono text-sm font-bold text-gray-900">Root: {proof.root}</span>
                                            <Badge variant="secondary" className="font-mono text-[10px] bg-gray-100 text-gray-600 border-gray-200">
                                                Block #{proof.block}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1.5">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Clock className="w-3.5 h-3.5 mr-1" />
                                                {proof.timestamp}
                                            </div>
                                            <div className="flex items-center text-xs text-gray-400 font-mono">
                                                Tx: {proof.txHash}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all">
                                    查看详情
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
