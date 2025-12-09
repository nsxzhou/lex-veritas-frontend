import React, { useState, useRef, useEffect } from "react";
import {
    Send,
    Menu,
    Paperclip,
    Share2,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EvidencePanel, type Citation } from "./EvidencePanel";
import { StreamingMessageBubble, type Message } from "./StreamingMessageBubble";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/chat/Sidebar";
import { MOCK_CITATION, MOCK_SESSIONS } from "@/__mocks__/chat";

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

