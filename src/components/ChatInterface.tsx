import React, { useState, useRef, useEffect } from "react";
import {
    Send,
    Menu,
    Plus,
    MessageSquare,
    Search,
    Paperclip,
    Share2,
    ChevronLeft,
    LogIn,
    Sparkles,
    Scale
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EvidencePanel, type Citation } from "./EvidencePanel";
import { StreamingMessageBubble, type Message } from "./StreamingMessageBubble";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Types ---
interface ChatSession {
    id: string;
    title: string;
    date: string;
    preview: string;
}

// --- Mock Data ---
const MOCK_CITATION: Citation = {
    id: "cit-1",
    text: "第一百二十三条 民事主体依法享有物权。物权是权利人依法对特定的物享有直接支配和排他的权利，包括所有权、用益物权和担保物权。",
    source: "中华人民共和国民法典",
    verificationId: "0x7f...3a2b",
    blockNumber: 18234567,
    timestamp: "2023-10-27T10:00:00Z",
    metadata: {
        law_name: "中华人民共和国民法典",
        part: "第一编 总则",
        chapter: "第五章 民事权利",
        section: "第一节 物权",
        article_number: "第123条"
    }
};

const MOCK_SESSIONS: ChatSession[] = [
    { id: "1", title: "民法典物权编", date: "今天", preview: "关于物权的定义..." },
    { id: "2", title: "合同纠纷咨询", date: "昨天", preview: "违约金的计算..." },
    { id: "3", title: "知识产权保护", date: "过去7天", preview: "商标注册流程..." },
];

// --- Components ---

const Sidebar = ({
    isOpen,
    setIsOpen,
    sessions,
    activeSessionId,
    onNewChat
}: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    sessions: ChatSession[];
    activeSessionId: string;
    onNewChat: () => void;
}) => {
    return (
        <motion.div
            initial={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
            animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
                "h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col overflow-hidden shrink-0 relative z-20 shadow-2xl shadow-blue-900/5",
                !isOpen && "border-none w-0 opacity-0"
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
                            <span className="font-bold tracking-tight text-gray-900 text-lg leading-none block">LexVeritas</span>
                            <span className="text-[10px] font-medium text-blue-600 tracking-wider uppercase">Legal AI Assistant</span>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                </div>

                {/* New Chat Button */}
                <Button
                    onClick={onNewChat}
                    className="w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-blue-500   hover:from-blue-700 hover:to-blue-700 text-white shadow-md shadow-blue-500/20 mb-6 h-11 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                                            "w-full text-left px-3 py-3 rounded-xl text-sm transition-all flex items-center gap-3 group relative overflow-hidden",
                                            activeSessionId === session.id
                                                ? "bg-blue-50/80 text-blue-700 font-medium shadow-sm ring-1 ring-blue-100"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                    >
                                        <MessageSquare className={cn(
                                            "w-4 h-4 shrink-0 transition-colors",
                                            activeSessionId === session.id ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                                        )} />
                                        <div className="flex-1 min-w-0">
                                            <div className="truncate font-medium">{session.title}</div>
                                            <div className="truncate text-xs text-gray-400 mt-0.5 opacity-80">{session.preview}</div>
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
                    <Link to="/login">
                        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 h-12 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                <LogIn className="w-4 h-4 text-gray-500" />
                            </div>
                            <div className="flex flex-col items-start text-xs">
                                <span className="font-medium text-sm">登录账户</span>
                                <span className="text-gray-400">同步您的对话记录</span>
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div >
    );
};

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "你好！我是 LexVeritas，你的专业法律 AI 助手。\n\n我可以为你提供基于**权威法律法规**的咨询服务，所有的回答都会经过**区块链存证验证**，确保真实可信。\n\n你可以问我：\n- 民法典关于物权的规定是什么？\n- 如何起草一份有效的劳动合同？\n- 遇到消费欺诈应该如何维权？",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
    const [activeCitation, setActiveCitation] = useState<Citation | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, streamingMessageId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessageId = (Date.now() + 1).toString();
            const aiMessage: Message = {
                id: aiMessageId,
                role: "assistant",
                content: "根据《中华人民共和国民法典》第一百二十三条规定，民事主体依法享有物权[1]。\n\n物权是指权利人依法对特定的物享有直接支配和排他的权利，主要包括：\n1. **所有权**：对物享有的占有、使用、收益和处分的权利。\n2. **用益物权**：对他人所有的物享有的占有、使用和收益的权利。\n3. **担保物权**：为了担保债务的履行，在债务人或者第三人的物上设定的权利。",
                citations: [MOCK_CITATION],
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
            setStreamingMessageId(aiMessageId);
        }, 1500);
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                sessions={MOCK_SESSIONS}
                activeSessionId="1"
                onNewChat={() => setMessages([])}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative min-w-0 bg-white/50">
                {/* Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200/60 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 transition-all">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-500 hover:bg-gray-100 rounded-lg -ml-2 transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <h1 className="font-semibold text-gray-900 text-lg tracking-tight">民法典物权编</h1>
                            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wide">已启用验证模式</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                            <Share2 className="w-4 h-4 mr-2" />
                            分享
                        </Button>
                    </div>
                </header>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto min-h-0 p-4 md:p-8 pb-4">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <AnimatePresence initial={false}>
                            {messages.map((message) => (
                                <StreamingMessageBubble
                                    key={message.id}
                                    message={message}
                                    isStreaming={message.id === streamingMessageId}
                                    onCitationClick={setActiveCitation}
                                    onStreamingComplete={() => setStreamingMessageId(null)}
                                />
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-md shadow-blue-500/20">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} className="h-64 shrink-0" />
                    </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/95 to-transparent pt-24 z-20 pointer-events-none">
                    <div className="max-w-3xl mx-auto pointer-events-auto">
                        <form onSubmit={handleSubmit} className="relative group">
                            <div className="relative bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-200/80 focus-within:border-blue-400/50 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300 overflow-hidden">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="输入法律问题，例如：如何起草一份有效的劳动合同？"
                                    className="w-full py-4 pl-5 pr-28 border-none shadow-none focus-visible:ring-0 text-base placeholder:text-gray-400 bg-transparent min-h-[60px] resize-none"
                                    disabled={isTyping}
                                    autoComplete="off"
                                />
                                <div className="absolute right-2 bottom-2.5 flex items-center gap-1.5">
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl w-9 h-9 transition-colors"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                    </Button>
                                    <div className="w-px h-5 bg-gray-200 mx-1" />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={!input.trim() || isTyping}
                                        className={cn(
                                            "rounded-xl w-9 h-9 transition-all duration-200",
                                            input.trim()
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        )}
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </form>
                        <p className="text-center mt-3 text-[11px] text-gray-400 font-medium tracking-wide">
                            LexVeritas 提供可验证的法律信息，内容仅供参考。
                        </p>
                    </div>
                </div>

                {/* Evidence Panel Overlay */}
                {/* Evidence Panel Overlay */}
                <AnimatePresence>
                    {activeCitation && (
                        <>
                            {/* Backdrop for click-outside */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/5 z-40"
                                onClick={() => setActiveCitation(null)}
                            />
                            {/* Panel */}
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="absolute right-6 top-20 z-50 max-w-[400px] pointer-events-none"
                            >
                                <div className="pointer-events-auto">
                                    <EvidencePanel
                                        citation={activeCitation}
                                        className="shadow-2xl border-blue-100/50 bg-white/95 backdrop-blur-xl"
                                        onClose={() => setActiveCitation(null)}
                                    />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

