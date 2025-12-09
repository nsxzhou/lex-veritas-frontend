/**
 * 聊天侧边栏组件
 * 从 ChatInterface 拆分出来的子组件
 */

import { motion } from 'framer-motion';
import {
    Plus,
    MessageSquare,
    Search,
    ChevronLeft,
    Scale,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export interface ChatSession {
    id: string;
    title: string;
    date: string;
    preview: string;
}

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    sessions: ChatSession[];
    activeSessionId: string;
    onNewChat: () => void;
}

export function Sidebar({
    isOpen,
    setIsOpen,
    sessions,
    activeSessionId,
    onNewChat,
}: SidebarProps) {
    return (
        <motion.div
            initial={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
            animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={cn(
                'h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col overflow-hidden shrink-0 relative z-20 shadow-2xl shadow-blue-900/5',
                !isOpen && 'border-none w-0 opacity-0'
            )}
        >
            <div className="p-4 flex flex-col h-full w-[280px]">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 px-2 justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                            <Scale className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="font-bold tracking-tight text-gray-900 text-lg leading-none block">
                                LexVeritas
                            </span>
                            <span className="text-[10px] font-medium text-blue-600 tracking-wider uppercase">
                                Legal AI Assistant
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(false)}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                </div>

                {/* New Chat Button */}
                <Button
                    onClick={onNewChat}
                    className="w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-700 text-white shadow-md shadow-blue-500/20 mb-6 h-11 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">开启新对话</span>
                </Button>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="搜索历史记录..."
                        className="pl-9 bg-gray-50/50 border-gray-200/60 focus:bg-white focus:border-blue-300 transition-all h-10 rounded-lg text-sm"
                    />
                </div>

                {/* History List */}
                <ScrollArea className="flex-1 -mx-2 px-2">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-3">
                                最近对话
                            </h3>
                            <div className="space-y-1">
                                {sessions.map((session) => (
                                    <button
                                        key={session.id}
                                        className={cn(
                                            'w-full text-left px-3 py-3 rounded-xl text-sm transition-all flex items-center gap-3 group relative overflow-hidden',
                                            activeSessionId === session.id
                                                ? 'bg-blue-50/80 text-blue-700 font-medium shadow-sm ring-1 ring-blue-100'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        )}
                                    >
                                        <MessageSquare
                                            className={cn(
                                                'w-4 h-4 shrink-0 transition-colors',
                                                activeSessionId === session.id
                                                    ? 'text-blue-600'
                                                    : 'text-gray-400 group-hover:text-gray-500'
                                            )}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="truncate font-medium">{session.title}</div>
                                            <div className="truncate text-xs text-gray-400 mt-0.5 opacity-80">
                                                {session.preview}
                                            </div>
                                        </div>
                                        {activeSessionId === session.id && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* User Profile */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link to="/profile">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 h-12 rounded-xl"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                                <span className="text-blue-600 font-bold text-xs">U</span>
                            </div>
                            <div className="flex flex-col items-start text-xs">
                                <span className="font-medium text-sm">个人中心</span>
                                <span className="text-gray-400">查看消耗与设置</span>
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
