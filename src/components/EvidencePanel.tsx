import { ShieldCheck, ExternalLink, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Citation {
    id: string;
    text: string;
    source: string;
    verificationId: string;
    blockNumber: number;
    timestamp: string;
}

interface EvidencePanelProps {
    citation: Citation | null;
    className?: string;
}

export function EvidencePanel({ citation, className }: EvidencePanelProps) {
    if (!citation) return null;

    return (
        <div className={cn("w-80 bg-card border border-border rounded-lg shadow-lg p-4 text-card-foreground", className)}>
            <div className="flex items-center gap-2 mb-3 text-primary">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-semibold text-sm">可验证证据</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <FileText className="w-3 h-3" />
                        <span>来源内容</span>
                    </div>
                    <p className="text-sm italic border-l-2 border-primary/30 pl-3 py-1 bg-muted/30 rounded-r">
                        "{citation.text}"
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted/50 p-2 rounded">
                        <span className="block text-muted-foreground mb-1">来源</span>
                        <span className="font-medium">{citation.source}</span>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                        <span className="block text-muted-foreground mb-1">区块高度 #</span>
                        <span className="font-medium font-mono">{citation.blockNumber}</span>
                    </div>
                </div>

                <div className="pt-3 border-t border-border">
                    <a
                        href={`#verify/${citation.verificationId}`}
                        className="flex items-center justify-between w-full text-xs text-primary hover:underline group"
                    >
                        <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            区块链已验证
                        </span>
                        <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <div className="mt-1 text-[10px] text-muted-foreground font-mono truncate">
                        Tx: {citation.verificationId}
                    </div>
                </div>
            </div>
        </div>
    );
}
