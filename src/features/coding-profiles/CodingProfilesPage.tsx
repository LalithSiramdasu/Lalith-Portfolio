import {
    Code,
    ExternalLink,
    Target,
    Globe
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useFavicon } from "../../hooks/useFavicon";

export const CodingProfilesPage = () => {
    useFavicon('coding');
    const colorStyles = {
        blue: {
            border: "border-blue-100",
            hoverBorder: "group-hover:border-blue-500",
            iconBg: "bg-blue-50",
            iconText: "text-blue-600",
            text: "text-blue-600",
            gradient: "from-blue-500/10",
            badge: "bg-blue-100 text-blue-700"
        },
        orange: {
            border: "border-orange-100",
            hoverBorder: "group-hover:border-orange-500",
            iconBg: "bg-orange-50",
            iconText: "text-orange-600",
            text: "text-orange-600",
            gradient: "from-orange-500/10",
            badge: "bg-orange-100 text-orange-700"
        },
        yellow: {
            border: "border-yellow-100",
            hoverBorder: "group-hover:border-yellow-500",
            iconBg: "bg-yellow-50",
            iconText: "text-yellow-600",
            text: "text-yellow-600",
            gradient: "from-yellow-500/10",
            badge: "bg-yellow-100 text-yellow-700"
        },
        cyan: {
            border: "border-cyan-100",
            hoverBorder: "group-hover:border-cyan-500",
            iconBg: "bg-cyan-50",
            iconText: "text-cyan-600",
            text: "text-cyan-600",
            gradient: "from-cyan-500/10",
            badge: "bg-cyan-100 text-cyan-700"
        },
        indigo: {
            border: "border-indigo-100",
            hoverBorder: "group-hover:border-indigo-500",
            iconBg: "bg-indigo-50",
            iconText: "text-indigo-600",
            text: "text-indigo-600",
            gradient: "from-indigo-500/10",
            badge: "bg-indigo-100 text-indigo-700"
        },
        emerald: {
            border: "border-emerald-100",
            hoverBorder: "group-hover:border-emerald-500",
            iconBg: "bg-emerald-50",
            iconText: "text-emerald-600",
            text: "text-emerald-600",
            gradient: "from-emerald-500/10",
            badge: "bg-emerald-100 text-emerald-700"
        },
        rose: {
            border: "border-rose-100",
            hoverBorder: "group-hover:border-rose-500",
            iconBg: "bg-rose-50",
            iconText: "text-rose-600",
            text: "text-rose-600",
            gradient: "from-rose-500/10",
            badge: "bg-rose-100 text-rose-700"
        },
        slate: {
            border: "border-slate-100",
            hoverBorder: "group-hover:border-slate-500",
            iconBg: "bg-slate-50",
            iconText: "text-slate-600",
            text: "text-slate-600",
            gradient: "from-slate-500/10",
            badge: "bg-slate-100 text-slate-700"
        }
    };

    const codingProfiles = [
        {
            label: "GitHub",
            href: "https://github.com/LalithSiramdasu",
            stats: "Projects • Code",
            desc: "Primary profile for repositories, implementation work, and project source code.",
            color: "orange",
            icon: <Code className="w-5 h-5" />,
            featured: true
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/lalith-siramdasu",
            stats: "Professional • Network",
            desc: "Professional profile covering education, projects, achievements, and career presence.",
            color: "yellow",
            icon: <Target className="w-5 h-5" />,
            featured: true
        },
        {
            label: "LeetCode",
            href: "https://leetcode.com/u/Lalith555/",
            stats: "DSA • Practice",
            desc: "Problem-solving profile for algorithms, interview preparation, and coding consistency.",
            color: "orange",
            icon: <Globe className="w-5 h-5" />
        },
        {
            label: "Resume",
            href: "/SiramdasuLalithkumar.pdf",
            stats: "PDF",
            desc: "Downloadable resume with AI/ML projects, certifications, and publication details.",
            color: "indigo",
            icon: <Target className="w-5 h-5" />
        },
        {
            label: "Publication",
            href: "/resume",
            stats: "IJERT 2025",
            desc: "Published research on Arduino-based ultrasonic distance measurement and analysis systems.",
            color: "rose",
            icon: <Globe className="w-5 h-5" />
        },
        {
            label: "Certifications",
            href: "/certifications",
            stats: "AWS + Oracle",
            desc: "Industry-recognized cloud and AI credentials aligned with applied engineering work.",
            color: "slate",
            icon: <Code className="w-5 h-5" />
        },
    ];

    return (
        <>
            <Helmet>
                <title>Profiles | Lalith Kumar</title>
                <meta name="description" content="Professional links and public profiles of Siramdasu Lalith Kumar, including GitHub, LinkedIn, resume, and certifications." />
            </Helmet>
            <div className="home-container relative py-12 px-4 max-w-6xl mx-auto min-h-full overflow-hidden">
                <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />

                <header className="text-center space-y-6 mb-20 animate-fade-in">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                        <Code className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Public Presence</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-tight">
                        Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Profiles</span>
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        A quick access layer for code, credentials, publication, and professional identity.
                    </p>
                    <div className="flex justify-center gap-6 pt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                            Public Links
                        </span>
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping delay-300" />
                            Verified Work
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-4 gap-6 auto-rows-[140px]">
                    {codingProfiles.map((profile, i) => {
                        const isFeatured = profile.featured;
                        const colSpan = isFeatured ? 'md:col-span-3' : 'md:col-span-2';
                        const rowSpan = isFeatured ? 'md:row-span-2' : 'md:row-span-1';
                        // @ts-ignore
                        const styles = colorStyles[profile.color] || colorStyles.blue;

                        return (
                            <a
                                key={i}
                                href={profile.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative flex flex-col justify-between p-8 rounded-[2.5rem] bg-white border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${colSpan} ${rowSpan} ${styles.border} ${styles.hoverBorder}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10 flex items-start justify-between">
                                    {(profile.label === "LeetCode" || profile.label === "CodeChef") ? (
                                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-white p-1 group-hover:scale-110 transition-transform duration-500">
                                            {profile.icon}
                                        </div>
                                    ) : (
                                        <div className={`p-4 rounded-3xl shadow-inner group-hover:scale-110 transition-transform duration-500 ${styles.iconBg} ${styles.iconText}`}>
                                            {profile.icon}
                                        </div>
                                    )}
                                    <div className="p-2 rounded-full border border-gray-100 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>

                                <div className="relative z-10 space-y-2">
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                                            {profile.label}
                                        </h3>
                                        {isFeatured && <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${styles.badge}`}>Top Performer</span>}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <p className={`text-lg font-bold ${styles.text}`}>
                                            {profile.stats}
                                        </p>
                                    </div>

                                    {isFeatured && (
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs mt-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            {profile.desc}
                                        </p>
                                    )}
                                </div>

                                <div className="absolute -bottom-6 -right-4 text-[120px] font-black text-gray-900/5 select-none transition-all group-hover:text-gray-900/[0.08] group-hover:scale-110">
                                    {profile.label[0]}
                                </div>
                            </a>
                        );
                    })}
                </div>

                <div className="mt-20 text-center animate-fade-in">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-4">
                        <span className="w-12 h-px bg-gray-200" />
                        Built around projects, learning, and applied AI work
                        <span className="w-12 h-px bg-gray-200" />
                    </p>
                </div>
            </div>
        </>
    );
};

export default CodingProfilesPage;
