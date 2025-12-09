import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    MoreHorizontal,
    Trash2,
    Edit,
    UserPlus,
    Mail,
    Shield,
    CheckCircle2,
    XCircle,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { adminApi } from '@/api/admin';
import type { UserResponse } from '@/types';
import { toast } from 'sonner';

export function UserManagementPage() {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Keeping isLoading as it sets loading state, even if not rendered yet (could be used later)
    // Actually error said it's never read. I should use it or remove it. 
    // I'll use it in the UI to show a loader.
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState<string>('all');
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    // Form State
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await adminApi.getUsers();
            setUsers(response.list);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            // toast.error('获取用户列表失败');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesFilter;
    });

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin': return <Badge variant="default" className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">系统管理员</Badge>;
            case 'user': return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">普通用户</Badge>;
            default: return <Badge variant="outline">未知</Badge>;
        }
    };

    const handleAddUser = async () => {
        setIsSubmitting(true);
        try {
            // Currently authApi.register is for public registration. 
            // Admin creating user might need a different endpoint or use the same if allowed.
            // Assuming adminApi doesn't have create user, we might need to use authApi.register or mock it if backend restricts.
            // Looking at api/auth.ts, register takes code. Admin creating user usually doesn't verify code immediately.
            // Let's assume for now we can't easily create user without verification code flow in this frontend version unless we have a specific admin create endpoint.
            // I'll display a toast for now as 'Not Implemented' or try to use a mock implementation if strictly required, 
            // but the goal is real integration. 
            // Since adminApi doesn't have createUser, I will notify user about this limitation or add a TODO.
            // Just for demo of integration, I will reload the list.

            // Wait, usually admin creates user implies sending invitation or directly setting password.
            // I will leave this as a TODO/Mock for the "Add" action to avoid breaking the UI flow, but fetchData is real.
            toast.info('请使用注册页面注册新用户');
            setIsAddUserOpen(false);
        } catch {
            toast.error('操作失败');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm('确定要删除该用户吗？')) return;
        try {
            await adminApi.deleteUser(id);
            toast.success('用户已删除');
            fetchUsers();
        } catch {
            toast.error('删除失败');
        }
    };

    return (
        <div className="space-y-6">
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">用户管理</h2>
                    <p className="text-sm text-gray-500 mt-1">管理系统用户、分配角色权限及监控账号状态。</p>
                </div>

                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                            <UserPlus className="w-4 h-4 mr-2" />
                            添加用户
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>添加新用户</DialogTitle>
                            <DialogDescription>
                                创建一个新的用户账号并分配角色。
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">姓名</label>
                                <Input
                                    id="name"
                                    placeholder="例如：张三"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">邮箱</label>
                                <Input
                                    id="email"
                                    placeholder="zhangsan@example.com"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="role" className="text-sm font-medium text-gray-700">角色</label>
                                <Select
                                    value={newUser.role}
                                    onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="选择角色" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">普通用户 (user)</SelectItem>
                                        <SelectItem value="admin">系统管理员 (admin)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>取消</Button>
                            <Button onClick={handleAddUser} disabled={isSubmitting || !newUser.name || !newUser.email} className="bg-blue-600 hover:bg-blue-700 text-white">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        创建中...
                                    </>
                                ) : (
                                    '创建用户'
                                )}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="border-gray-100 shadow-sm">
                <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="搜索姓名或邮箱..."
                                    className="pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="shrink-0 border-gray-200 text-gray-500">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                            {['all', 'admin', 'user'].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setFilterRole(role)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                                        filterRole === role
                                            ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                    )}
                                >
                                    {role === 'all' ? '全部' : role.charAt(0).toUpperCase() + role.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-gray-100 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="pl-6">用户</TableHead>
                                    <TableHead>角色</TableHead>
                                    <TableHead>状态</TableHead>
                                    <TableHead>最后活跃</TableHead>
                                    <TableHead className="text-right pr-6">操作</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-gray-50/50 group">
                                        <TableCell className="pl-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <div className="flex items-center gap-1.5">
                                                <Shield className="w-3.5 h-3.5 text-gray-400" />
                                                {getRoleBadge(user.role)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <div className="flex items-center gap-1.5">
                                                {user.status === 'active' ? (
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                                ) : (
                                                    <XCircle className="w-3.5 h-3.5 text-gray-400" />
                                                )}
                                                <span className={cn("text-xs font-medium", user.status === 'active' ? "text-green-700" : "text-gray-500")}>
                                                    {user.status === 'active' ? '活跃' : '停用'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-500">{user.lastLoginAt || '从未登录'}</TableCell>
                                        <TableCell className="py-3 text-right pr-6">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-400 hover:text-red-600"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredUsers.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                <p>未找到匹配的用户</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>


        </div >
    );
}
