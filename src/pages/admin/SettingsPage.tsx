import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Save, RefreshCw, Key, Globe, Shield } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        // Mock save
        setTimeout(() => {
            setIsLoading(false);
            toast.success('设置已保存', {
                description: '系统配置已更新并生效'
            });
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">系统设置</h1>
                <p className="text-gray-500">管理区块链连接、API 密钥与系统参数</p>
            </div>

            <div className="grid gap-6">
                {/* Blockchain Settings */}
                <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-600" />
                            <CardTitle>区块链网络配置</CardTitle>
                        </div>
                        <CardDescription>配置 Polygon 网络连接与智能合约地址</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="rpc-url">Polygon RPC URL</Label>
                            <div className="flex gap-2">
                                <Input id="rpc-url" placeholder="https://polygon-rpc.com" defaultValue="https://polygon-mainnet.infura.io/v3/..." />
                                <Button variant="outline" size="icon">
                                    <RefreshCw className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">当前状态: <span className="text-green-600 font-medium">已连接 (12ms)</span></p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="contract-address">存证合约地址</Label>
                            <Input id="contract-address" placeholder="0x..." defaultValue="0x8f3...2a9" className="font-mono" />
                        </div>
                    </CardContent>
                </Card>

                {/* AI Model Settings */}
                <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Key className="w-5 h-5 text-purple-600" />
                            <CardTitle>AI 模型配置</CardTitle>
                        </div>
                        <CardDescription>配置 LLM API 密钥与模型参数</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="openai-key">OpenAI API Key</Label>
                            <Input id="openai-key" type="password" placeholder="sk-..." defaultValue="sk-........................" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="model-select">默认模型</Label>
                            <select
                                id="model-select"
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="gpt-4">GPT-4 Turbo</option>
                                <option value="gpt-3.5">GPT-3.5 Turbo</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* General Settings */}
                <Card className="border-gray-100 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-gray-600" />
                            <CardTitle>通用设置</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">自动上链</Label>
                                <p className="text-sm text-gray-500">新上传文档自动计算哈希并上链存证</p>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">严格模式</Label>
                                <p className="text-sm text-gray-500">仅允许引用已通过区块链验证的数据源</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline">重置更改</Button>
                    <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                        {isLoading ? (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                保存中...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                保存配置
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
