import React, { useState, useRef, useEffect } from "react";
import {
    Send,
    ShieldCheck,
    Menu,
    Plus,
    MessageSquare,
    Search,
    Paperclip,
    Share2,
    ChevronLeft,
    LogIn,
    Sparkles
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
    text: "The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated.",
    source: "U.S. Constitution, Amendment IV",
    verificationId: "0x7f...3a2b",
    blockNumber: 18234567,
    timestamp: "2023-10-27T10:00:00Z",
};

const MOCK_SESSIONS: ChatSession[] = [
    { id: "1", title: "宪法权利", date: "今天", preview: "我的权利是什么..." },
    { id: "2", title: "合同法基础", date: "昨天", preview: "解释要素..." },
    { id: "3", title: "知识产权", date: "过去7天", preview: "如何注册商标..." },
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
            initial={{ width: isOpen ? 280 : 0 }}
            animate={{ width: isOpen ? 280 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
                "h-full bg-white border-r border-gray-100 flex flex-col overflow-hidden shrink-0 relative z-20 shadow-xl shadow-blue-900/5",
                !isOpen && "border-none"
            )}
        >
            <div className="p-4 flex flex-col h-full w-[280px]">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6 px-2 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold tracking-tight text-gray-900">LexVeritas</span>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                </div>

                {/* New Chat Button */}
                <Button
                    onClick={onNewChat}
                    className="w-full justify-start gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/50 shadow-sm mb-6"
                    variant="ghost"
                >
                    <Plus className="w-4 h-4" />
                    新对话
                </Button>

                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="搜索历史..."
                        className="pl-9 bg-gray-50/50 border-gray-100 focus:bg-white transition-all"
                    />
                </div>

                {/* History List */}
                <ScrollArea className="flex-1 -mx-2 px-2">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                                最近
                            </h3>
                            <div className="space-y-1">
                                {sessions.map((session) => (
                                    <button
                                        key={session.id}
                                        className={cn(
                                            "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 group",
                                            activeSessionId === session.id
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        )}
                                    >
                                        <MessageSquare className={cn(
                                            "w-4 h-4",
                                            activeSessionId === session.id ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                                        )} />
                                        <div className="flex-1 truncate">
                                            <div className="truncate">{session.title}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                {/* User Profile */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link to="/login">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700">
                            <LogIn className="w-4 h-4" />
                            登录
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "你好！我是 LexVeritas，你的可验证法律助手。今天有什么可以帮你？",
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
                content: "根据第四修正案，保障人民免受不合理的搜查和扣押。任何搜查令必须基于合理的理由，并由中立的法官签发，且必须具体描述搜查的地点和扣押的物品。",
                citations: [MOCK_CITATION],
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
            setStreamingMessageId(aiMessageId);
        }, 1500);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-gray-900">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                sessions={MOCK_SESSIONS}
                activeSessionId="1"
                onNewChat={() => setMessages([])}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative min-w-0">
                {/* Header */}
                <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-gray-500 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-gray-800">宪法权利</h1>
                            <span className="text-xs text-green-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                已启用验证模式
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500">
                            <Share2 className="w-4 h-4 mr-2" />
                            分享
                        </Button>
                    </div>
                </header>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6">
                    <div className="max-w-3xl mx-auto space-y-8 pb-4">
                        <AnimatePresence initial={false}>
                            {messages.map((message) => (
                                <StreamingMessageBubble
                                    key={message.id}
                                    message={message}
                                    isStreaming={message.id === streamingMessageId}
                                    onCitationClick={setActiveCitation}
                                    onCitationEnter={setActiveCitation}
                                    onCitationLeave={() => setActiveCitation(null)}
                                    onStreamingComplete={() => setStreamingMessageId(null)}
                                />
                            ))}
                        </AnimatePresence>

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-4"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-blue-100 flex items-center justify-center mt-1">
                                    <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                                </div>
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent">
                    <div className="max-w-3xl mx-auto relative">
                        <form onSubmit={handleSubmit} className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
                            <div className="relative bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-200 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all overflow-hidden">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="输入法律问题..."
                                    className="w-full py-4 pl-4 pr-14 border-none shadow-none focus-visible:ring-0 text-base placeholder:text-gray-400 bg-transparent h-auto min-h-[60px]"
                                    disabled={isTyping}
                                />
                                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <Paperclip className="w-5 h-5" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={!input.trim() || isTyping}
                                        className="rounded-xl w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </form>
                        <p className="text-center mt-3 text-xs text-gray-400">
                            LexVeritas 提供可验证的法律信息。请务必咨询有资质的律师。
                        </p>
                    </div>
                </div>

                {/* Evidence Panel Overlay */}
                <AnimatePresence>
                    {activeCitation && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute bottom-28 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
                        >
                            <EvidencePanel citation={activeCitation} className="shadow-2xl border-blue-100 bg-white/95 backdrop-blur-xl" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

