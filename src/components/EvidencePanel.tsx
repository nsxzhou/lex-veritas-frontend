import { ShieldCheck, ExternalLink, FileText, X, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

export interface Citation {
    id: string;
    text: string;
    source: string;
    verificationId: string;
    blockNumber: number;
    timestamp: string;
    metadata?: {
        law_name: string;
        part?: string;
        chapter?: string;
        section?: string;
        article_number: string;
    };
}

interface EvidencePanelProps {
    citation: Citation | null;
    className?: string;
    onClose?: () => void;
}

export function EvidencePanel({ citation, className, onClose }: EvidencePanelProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!citation) return null;

    const Content = (
        <div className="space-y-5">
            {/* Legal Hierarchy Breadcrumbs */}
            {citation.metadata && (
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground bg-muted/30 p-2 rounded-md border border-border/50">
                    <BookOpen className="w-3 h-3 text-primary/70 mr-1" />
                    <span className="font-medium text-primary/90">{citation.metadata.law_name}</span>
                    {citation.metadata.part && (
                        <>
                            <ChevronRight className="w-3 h-3 opacity-50" />
                            <span>{citation.metadata.part}</span>
                        </>
                    )}
                    {citation.metadata.chapter && (
                        <>
                            <ChevronRight className="w-3 h-3 opacity-50" />
                            <span>{citation.metadata.chapter}</span>
                        </>
                    )}
                    {citation.metadata.section && (
                        <>
                            <ChevronRight className="w-3 h-3 opacity-50" />
                            <span>{citation.metadata.section}</span>
                        </>
                    )}
                    <ChevronRight className="w-3 h-3 opacity-50" />
                    <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                        {citation.metadata.article_number}
                    </Badge>
                </div>
            )}

            <div>
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    <FileText className="w-3 h-3" />
                    <span>法条原文</span>
                </div>
                <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pr-2 group">
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-primary/10 rounded-full" />
                        <p className="text-sm text-foreground/90 pl-4 py-1 leading-relaxed font-serif">
                            "{citation.text}"
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-muted/40 p-2.5 rounded-lg border border-border/50">
                    <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">来源</span>
                    <span className="font-medium text-foreground">{citation.source}</span>
                </div>
                <div className="bg-muted/40 p-2.5 rounded-lg border border-border/50">
                    <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">区块高度</span>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-medium font-mono text-foreground">#{citation.blockNumber}</span>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-border/60">
                <a
                    href={`#verify/${citation.verificationId}`}
                    className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50 transition-colors group"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">区块链已验证</span>
                            <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[180px]">
                                Tx: {citation.verificationId}
                            </span>
                        </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center sm:hidden" onClick={onClose}>
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="bg-background w-full rounded-t-2xl p-6 shadow-2xl border-t border-border/50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">可验证证据</h3>
                                <p className="text-[10px] text-muted-foreground">LexVeritas Blockchain Proof</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                            <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>
                    {Content}
                </motion.div>
            </div>
        );
    }

    return (
        <div className={cn("w-[380px] bg-background/95 backdrop-blur-md border border-border/60 rounded-xl shadow-2xl p-5 text-card-foreground ring-1 ring-black/5", className)}>
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-border/60">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm text-foreground">可验证证据</h3>
                    <p className="text-[10px] text-muted-foreground">LexVeritas Blockchain Proof</p>
                </div>
            </div>
            {Content}
        </div>
    );
}
