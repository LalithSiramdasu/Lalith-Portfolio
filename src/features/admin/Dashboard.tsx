import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { LogOut, Trash2, RefreshCcw, MessageSquare, Clock, Globe } from 'lucide-react';

interface Message {
    id: number;
    created_at: string;
    message: string;
    user_agent: string;
}

export const Dashboard = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMessages = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setMessages(data);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: number) => {
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id);

        if (!error) {
            setMessages(prev => prev.filter(m => m.id !== id));
        }
    };

    const handleLogout = async () => {
        localStorage.removeItem('admin_authenticated');
        window.location.reload();
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* RLS Warning Banner */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                <div className="text-sm text-blue-800">
                    <strong>Note:</strong> Since we are using simplified login, ensure your Supabase <code>messages</code> table allows <strong>public</strong> read/delete access (or anon-key access) for this dashboard to work.
                </div>
            </div>

            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Transmission Logs</h1>
                    <p className="text-gray-500 font-medium mt-1">Incoming encrypted signals from the network.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={fetchMessages}
                        className="p-3 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Refresh"
                    >
                        <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 rounded-xl bg-white border border-gray-100 hover:bg-red-50 text-gray-900 hover:text-red-600 font-bold text-sm tracking-wide transition-colors flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </header>

            <div className="grid gap-6">
                {messages.length === 0 && !isLoading ? (
                    <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No signals detected yet.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                            <Clock className="w-3 h-3" />
                                            {formatDate(msg.created_at)}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="p-2 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                    title="Delete Message"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="text-gray-800 font-medium leading-relaxed whitespace-pre-wrap pl-[3.25rem]">
                                {msg.message}
                            </p>

                            <div className="mt-6 pt-4 border-t border-gray-50 pl-[3.25rem] flex items-center gap-2 text-xs text-gray-400 font-mono">
                                <Globe className="w-3 h-3" />
                                {msg.user_agent}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
