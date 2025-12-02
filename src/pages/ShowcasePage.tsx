import { useState } from 'react';
import { LoginDemo } from '@/components/showcase/LoginDemo';
import { DashboardDemo } from '@/components/showcase/DashboardDemo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function ShowcasePage() {
    const [activeTab, setActiveTab] = useState<'login' | 'dashboard'>('login');

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b border-border bg-card px-6 h-16 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link to="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <h1 className="font-semibold text-lg">Component Showcase</h1>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={activeTab === 'login' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('login')}
                    >
                        Login Demo
                    </Button>
                    <Button
                        variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard Demo
                    </Button>
                </div>
            </header>

            <main className="flex-1 bg-muted/10">
                {activeTab === 'login' && <LoginDemo />}
                {activeTab === 'dashboard' && <DashboardDemo />}
            </main>
        </div>
    );
}
