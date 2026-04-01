import {
    Code2,
    Brain,
    Cloud,
    Terminal,
    Zap,
    Search,
    Target
} from "lucide-react";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useFavicon } from "../../hooks/useFavicon";

export const SkillsSection = () => {
    useFavicon('skills');
    const [searchQuery, setSearchQuery] = useState("");

    const skillCategories = [
        {
            category: "Programming Languages",
            icon: <Code2 className="w-6 h-6" />,
            description: "Core languages for systems and application development.",
            color: "blue",
            skills: [
                { name: "Python", level: "Advanced" },
                { name: "SQL", level: "Advanced" },
                { name: "JavaScript", level: "Intermediate" },
                { name: "Java", level: "Intermediate" },
                { name: "C", level: "Intermediate" },
            ]
        },
        {
            category: "Data Science & Vision",
            icon: <Brain className="w-6 h-6" />,
            description: "Libraries and tooling for ML workflows, analysis, and computer vision.",
            color: "rose",
            skills: [
                { name: "Pandas", level: "Advanced" },
                { name: "NumPy", level: "Advanced" },
                { name: "Scikit-learn", level: "Advanced" },
                { name: "OpenCV", level: "Advanced" },
                { name: "Feature Engineering", level: "Intermediate" },
            ]
        },
        {
            category: "Machine Learning",
            icon: <Zap className="w-6 h-6" />,
            description: "ML algorithms and model development techniques.",
            color: "indigo",
            skills: [
                { name: "Deep Learning", level: "Advanced" },
                { name: "Transfer Learning", level: "Advanced" },
                { name: "CNNs", level: "Advanced" },
                { name: "Reinforcement Learning", level: "Intermediate" },
                { name: "Model Evaluation", level: "Advanced" },
            ]
        },
        {
            category: "Frameworks & Development",
            icon: <Search className="w-6 h-6" />,
            description: "Frameworks for building modern web apps and AI-backed software products.",
            color: "emerald",
            skills: [
                { name: "React", level: "Advanced" },
                { name: "Node.js", level: "Intermediate" },
                { name: "Express.js", level: "Intermediate" },
                { name: "Flask", level: "Intermediate" },
            ]
        },
        {
            category: "NLP & LLMs",
            icon: <Target className="w-6 h-6" />,
            description: "Tools and methods for conversational AI, retrieval, and prompt-driven workflows.",
            color: "amber",
            skills: [
                { name: "Ollama", level: "Intermediate" },
                { name: "Prompt Engineering", level: "Advanced" },
                { name: "Semantic Search", level: "Intermediate" },
                { name: "Intent Classification", level: "Intermediate" },
            ]
        },
        {
            category: "Tools & Databases",
            icon: <Terminal className="w-6 h-6" />,
            description: "Development tools and database management.",
            color: "sky",
            skills: [
                { name: "Jupyter Notebook", level: "Advanced" },
                { name: "Git", level: "Advanced" },
                { name: "MySQL", level: "Intermediate" },
                { name: "PostgreSQL", level: "Intermediate" },
                { name: "Supabase", level: "Intermediate" },
            ]
        },
        {
            category: "Cloud Platforms",
            icon: <Cloud className="w-6 h-6" />,
            description: "Cloud infrastructure and services.",
            color: "blue",
            skills: [
                { name: "AWS", level: "Intermediate" },
                { name: "GitHub", level: "Advanced" },
            ]
        }
    ];

    const filteredCategories = useMemo(() => {
        if (!searchQuery) return skillCategories;
        const query = searchQuery.toLowerCase().trim();
        return skillCategories.map(cat => ({
            ...cat,
            skills: cat.skills.filter(s => s.name.toLowerCase().includes(query))
        })).filter(cat => cat.skills.length > 0);
    }, [searchQuery]);

    const getColorClasses = (color: string) => {
        const maps: { [key: string]: string } = {
            blue: "text-blue-600 bg-blue-50/50 border-blue-100",
            indigo: "text-indigo-600 bg-indigo-50/50 border-indigo-100",
            amber: "text-amber-600 bg-amber-50/50 border-amber-100",
            emerald: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
            sky: "text-sky-600 bg-sky-50/50 border-sky-100",
            rose: "text-rose-600 bg-rose-50/50 border-rose-100",
        };
        return maps[color] || maps.blue;
    };

    return (
        <>
            <Helmet>
                <title>Skills | Lalith Kumar</title>
                <meta name="description" content="Explore Siramdasu Lalith Kumar's technical skills in Python, Java, ML, deep learning, NLP, React, Flask, and cloud technologies." />
            </Helmet>
            <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
                {/* Ambient Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

                {/* Header section */}
                <header className="text-center space-y-8 mb-20 animate-fade-in px-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Technical Arsenal</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                        The Skill <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            Matrix.
                        </span>
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        A practical skill stack across machine learning, deep learning, NLP, full-stack development, and cloud tooling.
                    </p>
                </header>

                {/* Search Control */}
                <div className="max-w-2xl mx-auto mb-16 relative z-10 px-4">
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter skills by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-700 text-lg shadow-xl shadow-gray-200/40"
                        />
                    </div>
                </div>

                {/* Skills Bento Grid - Lists Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {filteredCategories.map((cat, i) => (
                        <div
                            key={i}
                            className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-300 h-full"
                        >
                            {/* Category Header */}
                            <div className="flex items-start gap-4 mb-8">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ${getColorClasses(cat.color)}`}>
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight mb-1">
                                        {cat.category}
                                    </h3>
                                    <p className="text-xs font-medium text-gray-400 leading-relaxed">
                                        {cat.description}
                                    </p>
                                </div>
                            </div>

                            {/* Skills List */}
                            <div className="flex flex-col gap-3 flex-1">
                                {cat.skills.map((s, j) => (
                                    <div
                                        key={j}
                                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-colors group/skill"
                                    >
                                        <span className="font-bold text-gray-700 text-sm tracking-tight">{s.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${s.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                                                s.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-orange-100 text-orange-700'
                                                }`}>
                                                {s.level}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredCategories.length === 0 && (
                    <div className="text-center py-20 animate-fade-in">
                        <Code2 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">No skill matching your query</p>
                    </div>
                )}
                {/* Journey Footer */}
                <footer className="mt-24 text-center pb-20 animate-fade-in">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                        <span className="w-16 h-px bg-gray-200" />
                        B.Tech AI & ML • VIT-AP • 2022-2026
                        <span className="w-16 h-px bg-gray-200" />
                    </p>
                </footer>
            </div>
        </>
    );
};

export default SkillsSection;
