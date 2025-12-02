import { ChatInterface } from '@/components/ChatInterface';

export function ChatPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">

            <main className="flex-1">
                <ChatInterface />
            </main>
        </div>
    );
}
