import { DatabaseZap } from 'lucide-react';

export const Dashboard = () => {
    return (
        <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-700">
                <DatabaseZap className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-gray-900">Dashboard disabled</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600">
                Contact message management is intentionally unavailable in this client-only build. Restore the dashboard
                only after protected server-side access and proper Supabase policies are in place.
            </p>
        </div>
    );
};
