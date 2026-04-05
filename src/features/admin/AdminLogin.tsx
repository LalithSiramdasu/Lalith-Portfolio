import { ShieldAlert } from 'lucide-react';

export const AdminLogin = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="w-full max-w-xl rounded-[2rem] border border-amber-200 bg-white p-8 text-center shadow-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <ShieldAlert className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-3xl font-black tracking-tight text-gray-900">Admin access disabled</h2>
                <p className="mt-4 text-base leading-8 text-gray-600">
                    This portfolio no longer ships browser-only admin credentials. Add server-side authentication before
                    restoring this flow.
                </p>
            </div>
        </div>
    );
};
