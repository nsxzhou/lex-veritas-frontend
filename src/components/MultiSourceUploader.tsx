import React, { useState, useRef } from 'react';
import {
    Upload,
    Link as LinkIcon,
    FileText,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    File
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type UploadSource = 'file' | 'url' | 'text';

interface MultiSourceUploaderProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MultiSourceUploader({ isOpen, onClose }: MultiSourceUploaderProps) {
    const [activeTab, setActiveTab] = useState<UploadSource>('file');
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [progress, setProgress] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        setUploadStatus('uploading');
        setProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setUploadStatus('success');
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const resetForm = () => {
        setFile(null);
        setUrl('');
        setText('');
        setUploadStatus('idle');
        setProgress(0);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">上传知识库数据</h2>
                        <p className="text-xs text-gray-500">支持多种格式的数据源导入</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex p-1 mx-6 mt-6 bg-gray-100 rounded-lg">
                    <button
                        onClick={() => setActiveTab('file')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all",
                            activeTab === 'file' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <Upload className="w-4 h-4" />
                        本地文件
                    </button>
                    <button
                        onClick={() => setActiveTab('url')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all",
                            activeTab === 'url' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <LinkIcon className="w-4 h-4" />
                        网页链接
                    </button>
                    <button
                        onClick={() => setActiveTab('text')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all",
                            activeTab === 'text' ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <FileText className="w-4 h-4" />
                        纯文本
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 overflow-y-auto">
                    {uploadStatus === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">上传成功</h3>
                            <p className="text-sm text-gray-500 mb-6">数据已成功导入并开始索引处理。</p>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={resetForm}>继续上传</Button>
                                <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">完成</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activeTab === 'file' && (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={cn(
                                        "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
                                        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-400 hover:bg-gray-50",
                                        file ? "bg-blue-50/30 border-blue-200" : ""
                                    )}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileSelect}
                                        accept=".pdf,.docx,.txt,.md"
                                    />
                                    {file ? (
                                        <>
                                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                                                <File className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                            <Button variant="ghost" size="sm" className="mt-2 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                                                移除
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                                                <Upload className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">点击或拖拽文件到此处</p>
                                            <p className="text-xs text-gray-500 mt-1">支持 PDF, Word, TXT, Markdown (Max 50MB)</p>
                                        </>
                                    )}
                                </div>
                            )}

                            {activeTab === 'url' && (
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">网页链接</label>
                                        <Input
                                            placeholder="https://example.com/article"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                                        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <div className="text-sm text-blue-700">
                                            <p className="font-medium mb-1">提示</p>
                                            <p className="opacity-90">我们将自动抓取该网页的主要内容。请确保链接公开可访问。</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'text' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">文本内容</label>
                                    <textarea
                                        className="w-full min-h-[200px] p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none text-sm leading-relaxed"
                                        placeholder="在此粘贴法律文本、合同条款或备忘录内容..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </div>
                            )}

                            {uploadStatus === 'uploading' && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>正在上传...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 transition-all duration-300 ease-out"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {uploadStatus !== 'success' && (
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                        <Button variant="ghost" onClick={onClose} disabled={uploadStatus === 'uploading'}>取消</Button>
                        <Button
                            onClick={handleUpload}
                            disabled={
                                uploadStatus === 'uploading' ||
                                (activeTab === 'file' && !file) ||
                                (activeTab === 'url' && !url) ||
                                (activeTab === 'text' && !text)
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
                        >
                            {uploadStatus === 'uploading' ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    处理中
                                </>
                            ) : (
                                '开始上传'
                            )}
                        </Button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
