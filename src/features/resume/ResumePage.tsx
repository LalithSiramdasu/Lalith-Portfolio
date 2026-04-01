import {
    Download,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    Award,
    Cloud,
    Brain,
    Eye
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useFavicon } from "../../hooks/useFavicon";

export const ResumePage = () => {
    useFavicon('resume');

    return (
        <>
            <Helmet>
                <title>Resume | Lalith Kumar</title>
                <meta name="description" content="View and download Siramdasu Lalith Kumar's resume. AI and machine learning engineer with experience in deep learning, NLP, computer vision, and full-stack systems." />
            </Helmet>
            <div className="min-h-screen py-12 px-4 md:px-8 print:p-0 print:bg-white flex flex-col">
                {/* Actions Bar - Hidden on Print */}
                <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center w-full print:hidden animate-fade-in">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Digital Resume</h1>
                    <div className="flex gap-4">
                        <a
                            href="/SiramdasuLalithkumar.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-xs uppercase tracking-widest shadow-sm"
                        >
                            <Eye className="w-4 h-4" />
                            View Original
                        </a>
                        <a
                            href="/SiramdasuLalithkumar.pdf"
                            download
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </a>
                    </div>
                </div>

                {/* Resume Sheet */}
                <div className="max-w-[210mm] mx-auto bg-white shadow-2xl shadow-gray-200/50 print:shadow-none print:w-full print:max-w-none rounded-none md:rounded-[2px] overflow-hidden relative flex-1">
                    {/* Top Accent Line */}
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 print:h-1" />

                    <div className="p-8 md:p-12 print:p-8 space-y-8">
                        {/* Header */}
                        <header className="border-b border-gray-100 pb-8 flex flex-col md:flex-row justify-between gap-6 md:items-start">
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                                    Siramdasu <span className="text-blue-600">Lalith Kumar</span>
                                </h1>
                                <p className="text-lg font-medium text-gray-500 tracking-wide uppercase">AI & Machine Learning Engineer</p>
                            </div>

                            <div className="flex flex-col gap-2 text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <a href="mailto:lalithkumarsiramdasu@gmail.com" className="hover:text-blue-600">lalithkumarsiramdasu@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span>+91 9392737578</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span>Andhra Pradesh, India</span>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    <a href="https://github.com/LalithSiramdasu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-gray-900"><Github className="w-5 h-5" /></a>
                                    <a href="https://www.linkedin.com/in/lalith-siramdasu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"><Linkedin className="w-5 h-5" /></a>
                                </div>
                            </div>
                        </header>

                        {/* Summary */}
                        <section>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                                <span className="w-8 h-px bg-blue-600" />
                                Professional Summary
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                                 AI and machine learning student with hands-on experience in deep learning, computer vision, NLP, and intelligent full-stack systems. I enjoy building practical AI products that combine strong model performance with usable software and clear engineering decisions.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
                            {/* Main Column */}
                            <div className="md:col-span-2 space-y-8">

                                {/* Projects */}
                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                        <span className="w-8 h-px bg-blue-600" />
                                        Selected Projects
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="group">
                                            <div className="flex justify-between items-start gap-2 mb-2">
                                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">AI Master Gardener</h4>
                                                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded whitespace-nowrap">TensorFlow, Ollama, Supabase</span>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                                Built a multi-modal agricultural assistant with CNN-based disease detection, crop identification, semantic search, and local LLM integration for context-aware farming support.
                                            </p>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between items-start gap-2 mb-2">
                                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Predictive Healthcare System</h4>
                                                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded whitespace-nowrap">Scikit-learn, Python</span>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                                Developed a liver disease classification system using Logistic Regression, Random Forest, SVM, and KNN on 10,000+ clinical records, achieving 85% diagnostic accuracy.
                                            </p>
                                        </div>

                                        <div className="group">
                                            <div className="flex justify-between items-start gap-2 mb-2">
                                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Snake Game AI</h4>
                                                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded whitespace-nowrap">TensorFlow, DQN, Pygame</span>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                                Built a reinforcement learning agent with a 4-layer neural network and experience replay, achieving a 95% win rate and strong average in-game performance.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                {/* Research */}
                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                        <span className="w-8 h-px bg-blue-600" />
                                        Research Publications
                                    </h3>
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">Arduino-Based Ultrasonic Distance Measurement and Analysis System</h4>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Published in the International Journal of Engineering Research and Technology (IJERT), Volume 14, Issue 08, August 2025, contributing to embedded systems and sensor measurement analysis.
                                        </p>
                                    </div>
                                </section>

                                {/* Education */}
                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                        <span className="w-8 h-px bg-blue-600" />
                                        Education
                                    </h3>
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-base font-bold text-gray-900">Vellore Institute of Technology</h4>
                                            <span className="text-sm font-bold text-gray-500">2022 - 2026</span>
                                        </div>
                                        <p className="text-sm text-gray-600 font-medium">B.Tech in Artificial Intelligence and Machine Learning</p>
                                        <p className="text-sm text-blue-600 font-bold mt-1">CGPA: 8.87/10</p>
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                        <span className="w-8 h-px bg-blue-600" />
                                        Technical Skills
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">Programming Languages</h5>
                                            <div className="flex flex-wrap gap-1.5">
                                                {["Java", "Python", "SQL", "JavaScript", "HTML/CSS"].map(s => (
                                                    <span key={s} className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase">{s}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">Frameworks & Databases</h5>
                                            <div className="flex flex-wrap gap-1.5">
                                                {["React", "Node.js", "Express.js", "Flask", "MySQL", "PostgreSQL", "Supabase"].map(s => (
                                                    <span key={s} className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase">{s}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">Data Science & AI/ML</h5>
                                            <div className="flex flex-wrap gap-1.5">
                                                {["TensorFlow", "Keras", "Scikit-learn", "OpenCV", "CNNs", "Reinforcement Learning"].map(s => (
                                                    <span key={s} className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase">{s}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">Cloud & DevOps</h5>
                                            <div className="flex flex-wrap gap-1.5">
                                                {["AWS", "Git", "GitHub", "pgvector"].map(s => (
                                                    <span key={s} className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase">{s}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">Development Tools</h5>
                                            <div className="flex flex-wrap gap-1.5">
                                                {["VS Code", "IntelliJ", "PyCharm", "Jupyter Notebook", "Google Colab", "Postman"].map(s => (
                                                    <span key={s} className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                        <span className="w-8 h-px bg-blue-600" />
                                        Certifications
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                            <Cloud className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                            <span>AWS Certified Cloud Practitioner</span>
                                        </li>
                                        <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                            <Brain className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                            <span>Oracle Certified: OCI 2025 Generative AI Professional</span>
                                        </li>
                                        <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                            <Cloud className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                            <span>Infosys Springboard: Java 11 Essentials</span>
                                        </li>
                                        <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                            <Cloud className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                            <span>Google: TensorFlow Developer Certificate - AI and ML Specialization</span>
                                        </li>
                                    </ul>
                                </section>
                                <section>
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                        <span className="w-8 h-px bg-blue-600" />
                                        Achievements
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                            <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                            <span>Published peer-reviewed paper in IJERT, Volume 14, Issue 08</span>
                                        </li>
                                        <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                            <Award className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                            <span>Built production-style AI, healthcare ML, RL, and computer vision projects</span>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </div>
                    </div>

                    {/* Footer on Print */}
                    <div className="hidden print:block text-center mt-12 pt-4 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                            Generated from lalithkumar portfolio
                        </p>
                    </div>
                </div>

                {/* Global Footer (Screen Only) */}
                <footer className="mt-auto pt-16 text-center pb-8 animate-fade-in print:hidden">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                        <span className="w-16 h-px bg-gray-300" />
                        B.Tech AI & ML • VIT-AP • 2022-2026
                        <span className="w-16 h-px bg-gray-300" />
                    </p>
                </footer>
            </div>
        </>
    );
};

export default ResumePage;
