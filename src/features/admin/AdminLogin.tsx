import { useState } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
    onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simple hardcoded check for demonstration
        if (email.toLowerCase() === 'admin' && password === 'admin123') {
            // Simulate network delay for effect
            setTimeout(() => {
                localStorage.setItem('admin_authenticated', 'true');
                onLogin();
                setIsLoading(false);
            }, 800);
        } else {
            // Mock authentication error
            setTimeout(() => {
                setError('Invalid credentials');
                setIsLoading(false);
            }, 500);
        }
    };

    if (!isSupabaseConfigured) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <div className="text-center space-y-4 max-w-md mx-auto p-8 rounded-3xl bg-amber-50 border border-amber-100">
                    <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                    <h2 className="text-xl font-bold text-gray-900">Configuration Required</h2>
                    <p className="text-gray-600 font-medium">
                        Please set <code className="bg-white px-2 py-1 rounded border border-amber-200 text-amber-700">VITE_SUPABASE_URL</code> and <code className="bg-white px-2 py-1 rounded border border-amber-200 text-amber-700">VITE_SUPABASE_ANON_KEY</code> in your .env file to enable Admin access.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600 mb-6">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Access</h2>
                    <p className="text-gray-500 font-medium">Verify your credentials to proceed.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-4 rounded-xl bg-red-50 text-red-600 flex items-start gap-3 text-sm font-medium">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            'Authenticate'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
