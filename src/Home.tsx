import {
    BrainCircuit,
    GraduationCap,
    FlaskConical,
    ShieldCheck,
    Search,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTypewriter } from './hooks/useTypewriter';
import { useFavicon } from './hooks/useFavicon';


const Home = () => {
    useFavicon('home');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const placeholder = useTypewriter({
        texts: [
            "Ask me anything...",
            "What are my skills?",
            "Tell me about my projects...",
            "What am I building in AI/ML?",
            "Show my certifications...",
            "Ask about my education...",
            "This is beta version 🚀"
        ],
        speed: 100,
        deleteSpeed: 50,
        delayBetweenTexts: 2000,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/projects?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="home-container relative min-h-full flex flex-col items-center py-12 px-4">
            <Helmet>
                <title>Siramdasu Lalith Kumar | AI & ML Engineer</title>
                <meta name="description" content="Portfolio of Siramdasu Lalith Kumar - AI and machine learning engineer focused on intelligent systems, applied deep learning, and full-stack engineering." />
            </Helmet>

            {/* Profile Mark */}
            <div className="mb-10 relative group">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 text-3xl font-black text-white shadow-2xl md:h-48 md:w-48 md:text-5xl">
                    SLK
                </div>
            </div>

            {/* Main Headline */}
            <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    System Online
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                    Building <br />
                    <span className="text-blue-600">
                        Intelligent Systems.
                    </span>
                </h1>

                <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    AI and machine learning engineer creating practical deep learning, NLP, and full-stack solutions.
                </p>
            </div>

            {/* Command Center Input - Clean Pill */}
            <div className="w-full max-w-2xl mx-auto mb-20 relative z-10">
                <form onSubmit={handleSearch} className="relative transition-all hover:scale-[1.01]">
                    <div className="relative flex items-center bg-white border border-gray-200 rounded-full p-2 pr-2 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/80 transition-shadow h-16">
                        <div className="pl-6 pr-4 text-gray-400">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-medium text-lg h-full transition-all duration-300"
                        />
                    </div>
                </form>
            </div>

            {/* Stats - Clean Minimalist (No Boxes) */}
            <div className="w-full max-w-5xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    <a
                        href="/education"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-full mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">CGPA</span>
                            <span className="block text-base font-bold text-gray-900">8.87 / 10</span>
                        </div>
                    </a>

                    <a
                        href="/projects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="p-4 bg-yellow-50 text-yellow-600 rounded-full mb-3 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                            <BrainCircuit className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Featured Projects</span>
                            <span className="block text-base font-bold text-gray-900">4 AI Systems</span>
                        </div>
                    </a>

                    <a
                        href="/resume"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <FlaskConical className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Research</span>
                            <span className="block text-base font-bold text-gray-900">1 Publication</span>
                        </div>
                    </a>

                    <a
                        href="/certifications"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Certifications</span>
                            <span className="block text-base font-bold text-gray-900">AWS + Oracle</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
