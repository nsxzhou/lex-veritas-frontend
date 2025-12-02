import { useState, useEffect } from 'react';
import { Bot, User, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Citation } from './EvidencePanel';

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    citations?: Citation[];
    timestamp: Date;
}

interface StreamingMessageBubbleProps {
    message: Message;
    isStreaming?: boolean;
    onCitationClick?: (citation: Citation) => void;
    onCitationEnter?: (citation: Citation) => void;
    onCitationLeave?: () => void;
    onStreamingComplete?: () => void;
}

export function StreamingMessageBubble({
    message,
    isStreaming = false,
    onCitationClick,
    onCitationEnter,
    onCitationLeave,
    onStreamingComplete
}: StreamingMessageBubbleProps) {
    const [displayedContent, setDisplayedContent] = useState("");
    const isUser = message.role === "user";

    useEffect(() => {
        if (isStreaming && !isUser) {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= message.content.length) {
                    setDisplayedContent(message.content.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    onStreamingComplete?.();
                }
            }, 30); // 30ms per character

            return () => clearInterval(interval);
        } else {
            setDisplayedContent(message.content);
        }
    }, [message.content, isStreaming, isUser, onStreamingComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "flex gap-4 group",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            {!isUser && (
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-blue-100 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-6 h-6 text-blue-600" />
                </div>
            )}

            <div
                className={cn(
                    "max-w-[85%] rounded-2xl px-6 py-4 shadow-sm transition-all duration-200 relative",
                    isUser
                        ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-none shadow-blue-500/20"
                        : "bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-gray-200/50"
                )}
            >
                <div className="prose prose-sm max-w-none">
                    <p className={cn("leading-relaxed text-[15px]", isUser ? "text-white" : "text-gray-700")}>
                        {displayedContent}
                        {isStreaming && displayedContent.length < message.content.length && (
                            <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-blue-500 animate-pulse" />
                        )}
                    </p>
                </div>

                {/* Citations - Only show when streaming is done or not streaming */}
                {message.citations && (!isStreaming || displayedContent.length === message.content.length) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-gray-100/50"
                    >
                        {message.citations.map((citation) => (
                            <button
                                key={citation.id}
                                onClick={() => onCitationClick?.(citation)}
                                onMouseEnter={() => onCitationEnter?.(citation)}
                                onMouseLeave={() => onCitationLeave?.()}
                                className="inline-flex items-center gap-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2.5 py-1.5 rounded-lg transition-colors cursor-help border border-blue-200/50 group/citation"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 text-blue-500 group-hover/citation:text-blue-600" />
                                <span className="font-medium">引用 {citation.id.split("-")[1]}</span>
                            </button>
                        ))}
                    </motion.div>
                )}

                <span className={cn(
                    "absolute bottom-2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity",
                    isUser ? "-left-12 text-gray-400" : "-right-12 text-gray-400"
                )}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            {isUser && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shrink-0 border border-white shadow-sm mt-1">
                    <User className="w-6 h-6 text-gray-600" />
                </div>
            )}
        </motion.div>
    );
}
