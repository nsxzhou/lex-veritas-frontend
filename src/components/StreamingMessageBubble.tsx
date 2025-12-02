import { useState, useEffect, useRef } from 'react';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Citation } from './EvidencePanel';
import { AlertTriangle } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    citations?: Citation[];
    timestamp: Date;
    tampered?: boolean;
}

interface StreamingMessageBubbleProps {
    message: Message;
    isStreaming?: boolean;
    onCitationClick?: (citation: Citation) => void;
    onStreamingComplete?: () => void;
}

export function StreamingMessageBubble({
    message,
    isStreaming = false,
    onCitationClick,
    onStreamingComplete
}: StreamingMessageBubbleProps) {
    const [displayedContent, setDisplayedContent] = useState("");
    const isUser = message.role === "user";
    const contentRef = useRef<HTMLDivElement>(null);

    // 配置 marked
    marked.setOptions({
        gfm: true,
        breaks: true,
    });

    // 渲染 markdown 内容
    const renderMarkdownContent = (content: string) => {
        // 先将引用标识转换为带有特殊标记的 span
        const contentWithCitations = content.replace(
            /\[(\d+)\]/g,
            '<span class="citation-badge" data-citation-id="$1"><svg class="citation-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>[$1]</span>'
        );

        // 使用 marked 解析 markdown
        const rawHtml = marked.parse(contentWithCitations) as string;

        // 使用 DOMPurify 清理 HTML，保留我们的自定义 span
        const cleanHtml = DOMPurify.sanitize(rawHtml, {
            ADD_ATTR: ['data-citation-id'],
            ADD_TAGS: ['span'],
        });

        return cleanHtml;
    };

    // 处理引用标识点击
    useEffect(() => {
        const handleCitationClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const citationBadge = target.closest('.citation-badge');

            if (citationBadge) {
                const citationId = citationBadge.getAttribute('data-citation-id');
                if (citationId) {
                    const citation = message.citations?.find(c => c.id === `cit-${citationId}`);
                    if (citation) {
                        onCitationClick?.(citation);
                    }
                }
            }
        };

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('click', handleCitationClick);
            return () => contentElement.removeEventListener('click', handleCitationClick);
        }
    }, [message.citations, onCitationClick]);

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
                <div
                    ref={contentRef}
                    className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:mb-3 prose-p:last:mb-0 prose-strong:font-bold prose-strong:text-gray-900"
                >
                    {isUser ? (
                        <p className="leading-relaxed text-[15px] text-white whitespace-pre-wrap">{displayedContent}</p>
                    ) : (
                        <div
                            className="leading-relaxed text-[15px] text-gray-700 markdown-content"
                            dangerouslySetInnerHTML={{ __html: renderMarkdownContent(displayedContent) }}
                        />
                    )}
                    {isStreaming && displayedContent.length < message.content.length && (
                        <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-blue-500 animate-pulse" />
                    )}
                </div>


                {/* Tamper Warning */}
                {message.tampered && !isStreaming && (
                    <div className="mt-3 bg-red-50 border border-red-100 rounded-lg p-3 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-red-700">
                            <p className="font-medium">数据校验失败</p>
                            <p className="opacity-90">警告：该引用源未通过完整性校验，请谨慎参考。</p>
                        </div>
                    </div>
                )}

                {/* Citations - Only show when streaming is done or not streaming */}
                {/* {message.citations && (!isStreaming || displayedContent.length === message.content.length) && (
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
                )} */}

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
