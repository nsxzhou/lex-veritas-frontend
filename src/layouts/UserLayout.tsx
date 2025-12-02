import { Outlet } from 'react-router-dom';

export function UserLayout() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Outlet />
        </div>
    );
}
