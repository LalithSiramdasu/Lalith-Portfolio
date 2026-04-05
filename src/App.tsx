import { useEffect, Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Home';

// Lazy load feature pages
const AboutPage = lazy(() => import('./features/about').then(module => ({ default: module.AboutPage })));
const EducationPage = lazy(() => import('./features/education').then(module => ({ default: module.EducationPage })));
const ContactPage = lazy(() => import('./features/contact').then(module => ({ default: module.ContactPage })));
const CertificationsPage = lazy(() => import('./features/certifications').then(module => ({ default: module.CertificationsPage })));
const SkillsPage = lazy(() => import('./features/skills').then(module => ({ default: module.SkillsPage })));
const ProjectsPage = lazy(() => import('./features/projects').then(module => ({ default: module.ProjectsPage })));
const BlogsPage = lazy(() => import('./features/blogs').then(module => ({ default: module.BlogsPage })));
const BackendBlogsPage = lazy(() => import('./features/backend-blogs').then(module => ({ default: module.BackendBlogsPage })));
const ResumePage = lazy(() => import('./features/resume').then(module => ({ default: module.ResumePage })));
const PrivacyPage = lazy(() => import('./features/legal').then(module => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./features/legal').then(module => ({ default: module.TermsPage })));
const CodingProfilesPage = lazy(() => import('./features/coding-profiles').then(module => ({ default: module.CodingProfilesPage })));
const AdminPage = lazy(() => import('./features/admin').then(module => ({ default: module.AdminPage })));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

import {
    Home as HomeIcon,
    User,
    Folder,
    Mail,
    Award,
    FileText,
    BookOpen,
    Menu,
    Shield,
    CreditCard,
    Users,
    Loader2,
    X,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-react';

const NAV_ITEMS = [
    { path: '/', label: 'Home', icon: HomeIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { path: '/about', label: 'About', icon: User, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { path: '/resume', label: 'Resume', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    { path: '/coding-profiles', label: 'Profiles', icon: Users, color: 'text-pink-500', bg: 'bg-pink-100' },
    { path: '/projects', label: 'Projects', icon: Folder, color: 'text-blue-500', bg: 'bg-blue-100' },
    { path: '/blogs', label: 'Blogs', icon: BookOpen, color: 'text-stone-700', bg: 'bg-stone-100' },
    { path: '/skills', label: 'Skills', icon: Shield, color: 'text-orange-500', bg: 'bg-orange-100' },
    { path: '/education', label: 'Education', icon: CreditCard, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { path: '/certifications', label: 'Certifications', icon: Award, color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { path: '/contact', label: 'Contact', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-100' },
];

const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            mainContent.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        }
    }, [pathname, search]);

    return null;
};

const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    </div>
);

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white text-gray-900 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-gray-100 mb-4 z-10">
                <span className="text-xl font-bold tracking-tight text-gray-900">Menu</span>
                <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                    <X className="w-6 h-6 text-gray-500" />
                </button>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 pb-32">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className="flex flex-col items-center justify-center p-6 bg-gray-50/50 border border-gray-100 rounded-2xl active:scale-95 transition-all hover:bg-white hover:shadow-md hover:border-transparent"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${item.bg}`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <span className="font-semibold text-sm text-gray-700">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

function App() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <HelmetProvider>
            <Router>
                <ScrollToTop />
                <div className="flex h-screen bg-white font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
                    <Sidebar
                        isCollapsed={isSidebarCollapsed}
                        onToggle={() => setIsSidebarCollapsed((value) => !value)}
                    />

                    {/* Main Content Wrapper - Scrolls independently */}
                    <div id="main-content" className="relative flex h-full min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto transition-all duration-300">
                        <MobileHeader />

                        <main className="flex-1 w-full max-w-[1600px] mx-auto px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8 xl:px-10 xl:py-10 pb-24 md:pb-10">
                            <Suspense fallback={<LoadingFallback />}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/coding-profiles" element={<CodingProfilesPage />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/education" element={<EducationPage />} />
                                    <Route path="/skills" element={<SkillsPage />} />
                                    <Route path="/resume" element={<ResumePage />} />
                                    <Route path="/projects" element={<ProjectsPage />} />
                                    <Route path="/blogs" element={<BlogsPage />} />
                                    <Route path="/blogs/backend" element={<BackendBlogsPage />} />
                                    <Route path="/certifications" element={<CertificationsPage />} />
                                    <Route path="/contact" element={<ContactPage />} />
                                    <Route path="/privacy" element={<PrivacyPage />} />
                                    <Route path="/terms" element={<TermsPage />} />
                                    <Route path="/admin" element={<AdminPage />} />
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </Suspense>
                            {/* Footer moved to Sidebar */}
                        </main>

                        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
                        <MobileNav onMenuClick={() => setIsMobileMenuOpen(true)} />
                    </div>
                </div>
            </Router>
        </HelmetProvider>
    );
}

const Sidebar = ({
    isCollapsed,
    onToggle
}: {
    isCollapsed: boolean;
    onToggle: () => void;
}) => {
    const location = useLocation();

    return (
        <nav className={`hidden lg:flex flex-col h-full py-6 bg-white shrink-0 overflow-y-auto no-scrollbar border-r border-gray-50/50 transition-[width,padding] duration-300 ${isCollapsed ? 'w-24 px-3' : 'w-72 pl-4 pr-6'}`}>
            <div className={`mb-8 flex items-start ${isCollapsed ? 'justify-center' : 'justify-between pl-4 gap-3'}`}>
                {!isCollapsed && (
                    <Link to="/" className="block min-w-0">
                        <h1 className="text-2xl font-normal text-gray-700">
                            Siramdasu Lalith Kumar
                        </h1>
                        <p className="text-sm text-gray-500">lalithkumarsiramdasu@gmail.com</p>
                    </Link>
                )}
                <button
                    type="button"
                    onClick={onToggle}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:border-gray-300 hover:text-gray-800 ${isCollapsed ? 'mx-auto' : ''}`}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                </button>
            </div>

            <div className="flex-1 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`group flex items-center py-3.5 transition-all duration-300 font-medium text-[15px] ${isCollapsed ? 'justify-center rounded-2xl px-2' : 'rounded-r-full px-4'} ${isActive
                                ? 'bg-blue-50 text-blue-800'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isCollapsed ? '' : 'mr-4'} ${item.bg}`}>
                                <item.icon className={`w-[18px] h-[18px] ${item.color}`} />
                            </div>
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </div>

            {/* Footer Links at Bottom of Sidebar */}
            {!isCollapsed && (
                <div className="mt-auto px-8 pb-4 pt-4">
                    <div className="flex gap-4 flex-wrap">
                        <Link to="/privacy" className="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline">Privacy</Link>
                        <Link to="/terms" className="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline">Terms</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

const MobileHeader = () => {
    return (
        <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
            <Link to="/">
                <span className="text-lg font-medium text-gray-900">Siramdasu Lalith Kumar</span>
            </Link>
            <Link to="/resume" className="p-2 bg-gray-50 rounded-full text-gray-600">
                <FileText className="w-5 h-5" />
            </Link>
        </div>
    );
}

const MobileNav = ({ onMenuClick }: { onMenuClick: () => void }) => {
    const location = useLocation();

    // Main items for mobile bottom bar
    const BOTTOM_BAR_ITEMS = [
        { path: '/', icon: HomeIcon, label: 'Home' },
        { path: '/projects', icon: Folder, label: 'Work' },
        { path: '/blogs', icon: BookOpen, label: 'Blogs' },
        { path: '/contact', icon: Mail, label: 'Contact' },
    ];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
            <div className="flex justify-around items-center p-2">
                {BOTTOM_BAR_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-blue-700' : 'text-gray-500'
                                }`}
                        >
                            <item.icon className={`w-6 h-6 ${isActive ? 'fill-blue-100' : ''}`} strokeWidth={2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
                <button
                    onClick={onMenuClick}
                    className="flex flex-col items-center gap-1 p-2 text-gray-500"
                >
                    <Menu className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Menu</span>
                </button>
            </div>
        </div>
    );
};

export default App;
