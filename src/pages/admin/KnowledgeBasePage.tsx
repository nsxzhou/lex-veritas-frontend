import { useState } from 'react';
import {
    Search,
    FileText,
    Filter,
    MoreHorizontal,
    Trash2,
    Eye,
    Plus,
    FileJson,
    Globe,
    CheckSquare,
    Square,
    Cpu,
    ShieldCheck,
    Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MultiSourceUploader } from '@/components/MultiSourceUploader';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import { type Document, initialDocuments } from '@/__mocks__/knowledgeBase';

export function KnowledgeBasePage() {
    const [documents, setDocuments] = useState<Document[]>(initialDocuments);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [filterType, setFilterType] = useState<string>('all');
    const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
    const [isMinting, setIsMinting] = useState(false);

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterType === 'all' || doc.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
            case 'docx': return <FileText className="w-5 h-5 text-blue-500" />;
            case 'txt': return <FileText className="w-5 h-5 text-gray-500" />;
            case 'url': return <Globe className="w-5 h-5 text-indigo-500" />;
            default: return <FileText className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'indexed': return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">已索引</Badge>;
            case 'processing': return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">处理中</Badge>;
            case 'error': return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">失败</Badge>;
            case 'minted': return <Badge variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200 flex items-center gap-1"><ShieldCheck className="w-3 h-3" />已上链</Badge>;
            default: return <Badge variant="outline">未知</Badge>;
        }
    };

    const toggleSelectAll = () => {
        if (selectedDocs.length === filteredDocs.length) {
            setSelectedDocs([]);
        } else {
            setSelectedDocs(filteredDocs.map(d => d.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedDocs.includes(id)) {
            setSelectedDocs(selectedDocs.filter(d => d !== id));
        } else {
            setSelectedDocs([...selectedDocs, id]);
        }
    };

    const handleMint = () => {
        setIsMinting(true);
        toast.info('正在计算 Merkle Root...', { description: '请稍候，正在对选中的文档进行哈希计算' });

        setTimeout(() => {
            toast.success('Merkle Root 计算完成', { description: 'Root Hash: 0x8f3...2a9' });
            setTimeout(() => {
                setIsMinting(false);
                setDocuments(docs => docs.map(d => selectedDocs.includes(d.id) ? { ...d, status: 'minted' } : d));
                setSelectedDocs([]);
                toast.success('上链成功', { description: '交易哈希: 0x7e2...1b8' });
            }, 1500);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">知识库管理</h2>
                    <p className="text-sm text-gray-500 mt-1">管理系统内的法律文档、法规数据库及索引状态。</p>
                </div>
                <Button onClick={() => setIsUploadModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    添加文档
                </Button>
            </div>

            <Card className="border-gray-100 shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="搜索文档名称..."
                                    className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="shrink-0 border-gray-200 text-gray-500">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                            {['all', 'pdf', 'docx', 'url'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                        filterType === type
                                            ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                    )}
                                >
                                    {type === 'all' ? '全部' : type.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Minting Action Bar */}
                    <AnimatePresence>
                        {selectedDocs.length > 0 && (
                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md text-xs font-medium">
                                        已选择 {selectedDocs.length} 项
                                    </div>
                                    <span className="text-sm text-blue-600">准备进行区块链存证</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50" onClick={() => setSelectedDocs([])}>
                                        取消
                                    </Button>
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm" onClick={handleMint} disabled={isMinting}>
                                        {isMinting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                处理中...
                                            </>
                                        ) : (
                                            <>
                                                <Cpu className="w-4 h-4 mr-2" />
                                                一键上链
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-gray-100 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="w-[50px] pl-6">
                                        <button onClick={toggleSelectAll} className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                            {selectedDocs.length === filteredDocs.length && filteredDocs.length > 0 ? (
                                                <CheckSquare className="w-5 h-5 text-blue-600" />
                                            ) : (
                                                <Square className="w-5 h-5" />
                                            )}
                                        </button>
                                    </TableHead>
                                    <TableHead>文档名称</TableHead>
                                    <TableHead>类型</TableHead>
                                    <TableHead>大小</TableHead>
                                    <TableHead>上传时间</TableHead>
                                    <TableHead>上传者</TableHead>
                                    <TableHead>状态</TableHead>
                                    <TableHead className="text-right pr-6">操作</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDocs.map((doc) => (
                                    <TableRow key={doc.id} className={cn("hover:bg-gray-50/50 group transition-colors", selectedDocs.includes(doc.id) ? "bg-blue-50/30" : "")}>
                                        <TableCell className="pl-6 py-3">
                                            <button onClick={() => toggleSelect(doc.id)} className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                                {selectedDocs.includes(doc.id) ? (
                                                    <CheckSquare className="w-5 h-5 text-blue-600" />
                                                ) : (
                                                    <Square className="w-5 h-5" />
                                                )}
                                            </button>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50 transition-colors">
                                                    {getIcon(doc.type)}
                                                </div>
                                                <span className="font-medium text-gray-900">{doc.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-500 uppercase">{doc.type}</TableCell>
                                        <TableCell className="py-3 text-gray-500">{doc.size}</TableCell>
                                        <TableCell className="py-3 text-gray-500">{doc.uploadDate}</TableCell>
                                        <TableCell className="py-3 text-gray-500">{doc.uploadedBy}</TableCell>
                                        <TableCell className="py-3">
                                            {getStatusBadge(doc.status)}
                                        </TableCell>
                                        <TableCell className="py-3 text-right pr-6">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredDocs.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                <FileJson className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                <p>未找到匹配的文档</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <AnimatePresence>
                {isUploadModalOpen && (
                    <MultiSourceUploader
                        isOpen={isUploadModalOpen}
                        onClose={() => setIsUploadModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
