import { useState, useEffect } from 'react';
import { AdminLogin } from './AdminLogin';
import { Dashboard } from './Dashboard';
import { Loader2 } from 'lucide-react';

export const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = localStorage.getItem('admin_authenticated') === 'true';
            setIsAuthenticated(isAuth);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]" >
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 md:py-20 px-4 max-w-5xl mx-auto" >
            {!isAuthenticated ? (
                <AdminLogin onLogin={() => {
                    setIsAuthenticated(true);
                    window.scrollTo(0, 0);
                }} />
            ) : (
                <Dashboard />
            )}
        </div>
    );
};
