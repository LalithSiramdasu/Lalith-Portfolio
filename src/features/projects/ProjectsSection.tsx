import { useState, useEffect } from "react";
import {
    Search,
    Github,
    Cpu,
    Globe,
    ExternalLink,
    Zap,
    Brain,
    Rocket,
    Folder
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useFavicon } from "../../hooks/useFavicon";

const projects = [
    {
        title: "AI Master Gardener",
        description:
            "Architected a multi-modal agricultural assistant combining CNN-based disease detection, crop identification, local LLM inference, semantic search, and graph analytics for companion planting recommendations.",
        tech: ["Python", "TensorFlow", "Ollama", "Supabase", "pgvector", "NetworkX"],
        github: "https://github.com/LalithSiramdasu",
        live: "",
        category: "Applied AI",
        icon: <Cpu className="w-5 h-5" />,
        featured: true
    },
    {
        title: "Predictive Healthcare System for Liver Disease Classification",
        description:
            "Built a healthcare prediction pipeline using Logistic Regression, Random Forest, SVM, and KNN on 10,000+ clinical records, with preprocessing, EDA, and hyperparameter tuning for reliable diagnosis support.",
        tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "GridSearchCV"],
        github: "https://github.com/LalithSiramdasu/Prediction-and-Analysis-of-Liver-Patient-Data-Using-Machine-Learning",
        live: "https://prediction-and-analysis-of-liver-patient-o8im.onrender.com/",
        category: "Machine Learning",
        icon: <Globe className="w-5 h-5" />,
        featured: true
    },
    {
        title: "Snake Game AI using Deep Neural Networks",
        description:
            "Engineered a DQN-based reinforcement learning agent with a 4-layer neural network, experience replay, and high-speed simulation to achieve a 95% win rate and strong average scores.",
        tech: ["Python", "TensorFlow", "Deep Q-Learning", "Pygame", "Neural Networks"],
        github: "https://github.com/LalithSiramdasu/Snake-Game-Ai-Using-Deep-Neural-Networks",
        live: "",
        category: "Reinforcement Learning",
        icon: <Zap className="w-5 h-5" />,
        featured: true
    },
    {
        title: "Crop Disease Prediction using CNN",
        description:
            "Developed a 6-layer CNN model for identifying 12 plant diseases from 5,000+ leaf images, supported by OpenCV preprocessing and augmentation workflows that improved dataset coverage by 300%.",
        tech: ["Python", "TensorFlow", "Keras", "OpenCV", "CNNs"],
        github: "https://github.com/LalithSiramdasu/Crop_Disease_Detection",
        live: "https://cropdiseasedetection-lalith.streamlit.app/",
        category: "Computer Vision",
        icon: <Brain className="w-5 h-5" />,
        featured: true
    }
];

export const ProjectsSection = () => {
    useFavicon('projects');
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

    useEffect(() => {
        const query = searchQuery.toLowerCase().trim();
        const filtered = projects.filter((p) => {
            const matchesQuery = p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tech.some(t => t.toLowerCase().includes(query));
            const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
            return matchesQuery && matchesCategory;
        });
        setFilteredProjects(filtered);
    }, [searchQuery, selectedCategory]);

    return (
        <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            <Helmet>
                <title>Projects | Lalith Kumar</title>
                <meta name="description" content="Explore AI, deep learning, healthcare ML, reinforcement learning, and computer vision projects built by Siramdasu Lalith Kumar." />
            </Helmet>

            {/* Header section */}
            <header className="text-center space-y-8 mb-20 animate-fade-in px-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <Rocket className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Innovation Portfolio</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    The Project <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Forge.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    A focused collection of applied AI, deep learning, reinforcement learning, and intelligent software systems.
                </p>
            </header>

            {/* Controls: Search & Filters */}
            <div className="flex flex-col items-center gap-10 mb-20 relative z-10 px-4">
                <div className="w-full max-w-3xl space-y-8">
                    {/* Search Bar */}
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search projects by name, tech, or mission..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-16 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-700 text-lg shadow-2xl shadow-gray-200/50"
                        />
                    </div>

                    {/* Category Chips */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                                    : "bg-white border border-gray-100 text-gray-400 hover:border-blue-200 hover:text-gray-900 shadow-sm"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {filteredProjects.map((project, i) => (
                    <div
                        key={i}
                        className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:border-blue-200/50 transition-all duration-500"
                    >
                        {/* Status Label */}
                        <div className="absolute top-8 right-8">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                {project.icon}
                            </div>
                        </div>

                        <div className="space-y-3 flex-1">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-gray-500 font-medium leading-relaxed italic text-sm md:text-base line-clamp-3">
                                "{project.description}"
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, j) => (
                                    <span key={j} className="px-2.5 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-gray-50">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors active:scale-95">
                                        <Github className="w-3.5 h-3.5" />
                                        Code
                                    </a>
                                )}
                                {project.live && (
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors active:scale-95">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Live
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Background Decor */}
                        <div className="absolute -bottom-8 -right-8 text-[120px] font-black text-gray-900/[0.02] select-none group-hover:scale-110 transition-transform">
                            {project.title[0]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                    <Folder className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">No artifacts found matching your query</p>
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
    );
};

export default ProjectsSection;
