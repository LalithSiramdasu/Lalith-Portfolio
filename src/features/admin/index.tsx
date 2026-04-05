import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ShieldAlert } from 'lucide-react';

export const AdminPage = () => {
    return (
        <div className="min-h-screen px-4 py-12 md:py-20">
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-200 bg-white p-8 shadow-xl md:p-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <ShieldAlert className="h-8 w-8" />
                </div>

                <div className="mt-6 space-y-4">
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-700">Admin Disabled</p>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
                        This admin route is unavailable until server-side auth is added.
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
                        The previous browser-only login was removed so the portfolio does not ship client-side credentials
                        or localStorage-based admin access. Re-enable this page only after a secure server-side
                        authentication flow is implemented.
                    </p>
                </div>

                <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50/70 p-5 text-sm leading-7 text-amber-900">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                        <p>
                            The contact data view and message deletion tools are intentionally disabled in this build.
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to home
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900"
                    >
                        Contact page
                    </Link>
                </div>
            </div>
        </div>
    );
};
