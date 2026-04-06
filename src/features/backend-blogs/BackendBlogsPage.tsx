import { useDeferredValue, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, BookOpen, Search, Sparkles } from 'lucide-react';
import { useFavicon } from '../../hooks/useFavicon';
import {
    BACKEND_BLOGS,
    BACKEND_BLOGS_COUNT,
    BACKEND_BLOG_CATEGORIES,
    type BackendBlogCategory
} from './backendBlogData';

const matchesSearch = (query: string, value: string[]) => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
        return true;
    }

    return value.some((field) => field.toLowerCase().includes(normalized));
};

const categoryLabel: Record<BackendBlogCategory, string> = {
    Foundations: 'first principles, backend role, and learning roadmap',
    'Application Design': 'request flow, contracts, and application boundaries',
    'Data Systems': 'storage, caching, and search infrastructure',
    'Reliability & Security': 'operational confidence, observability, and defense',
    'Scale & Performance': 'throughput, concurrency, and system growth'
};

const BackendBlogsPage = () => {
    useFavicon('blogs');

    const [searchQuery, setSearchQuery] = useState('');
    const deferredSearchQuery = useDeferredValue(searchQuery);
    const [activeCategory, setActiveCategory] = useState<'All' | BackendBlogCategory>('All');

    const filteredBlogs = BACKEND_BLOGS.filter((post) => {
        if (activeCategory !== 'All' && post.category !== activeCategory) {
            return false;
        }

        return matchesSearch(deferredSearchQuery, [
            post.title,
            post.summary,
            post.category,
            post.topicNumber,
            post.tags.join(' ')
        ]);
    });

    return (
        <div className="min-h-full overflow-x-clip rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,_rgba(199,219,255,0.45),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(222,198,153,0.34),_transparent_28%),linear-gradient(180deg,_#f8f6f1_0%,_#f4efe6_100%)] p-2.5 sm:rounded-[2rem] sm:p-5 xl:p-8">
            <Helmet>
                <title>Backend Notes | Lalith Kumar</title>
                <meta
                    name="description"
                    content="A dedicated backend engineering library inside the portfolio, featuring static long-form articles on HTTP, routing, databases, caching, observability, security, scaling, and concurrency."
                />
            </Helmet>

            <div className="overflow-hidden rounded-[1.75rem] bg-white/88 p-4 shadow-[0_24px_80px_rgba(102,88,67,0.14)] backdrop-blur-sm sm:rounded-[2rem] sm:p-6 xl:p-8">
                <div className="grid gap-6 border-b border-[#e8dfd2] pb-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.8fr)] xl:items-end">
                    <div className="space-y-5">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 rounded-full border border-[#d9d1c4] bg-[#fbf8f2] px-4 py-2 text-sm font-medium text-[#55493d] transition-colors hover:border-[#b6aa98] hover:text-[#221d18]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to portfolio blogs
                        </Link>

                        <div className="space-y-3">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8d806f]">Backend collection</p>
                            <h1 className="max-w-4xl font-serif text-[2.6rem] font-semibold leading-[0.95] tracking-tight text-[#1c2228] sm:text-5xl xl:text-6xl">
                                Static backend essays, now discoverable from the portfolio.
                            </h1>
                            <p className="max-w-3xl text-[1rem] leading-[1.8] text-[#616973] sm:text-[1.08rem] xl:text-[1.12rem]">
                                These articles keep the same editorial design, but they are now regenerated through an Astro static pipeline so the portfolio can serve the long-form reading experience with lighter runtime code and smoother performance.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[1.6rem] border border-[#221f1d] bg-[#23211f] p-5 text-white shadow-[0_18px_55px_rgba(35,33,31,0.28)]">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Published library</p>
                                <p className="text-[1.95rem] font-semibold leading-none">{BACKEND_BLOGS_COUNT} chapters</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-white/75">
                            Foundations, API design, data systems, operational reliability, and scaling topics gathered into one readable backend shelf.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/70">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Astro static delivery</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Same Vercel domain</span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Same article design</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {BACKEND_BLOG_CATEGORIES.filter((category) => category !== 'All').map((category) => (
                        <div
                            key={category}
                            className="rounded-[1.35rem] border border-[#ece4d6] bg-[#fcfaf6] px-5 py-4 shadow-[0_14px_36px_rgba(102,88,67,0.06)]"
                        >
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a08e77]">Track</p>
                            <h2 className="mt-2 text-[1.1rem] font-semibold text-[#1f262d]">{category}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-[#66707b]">{categoryLabel[category]}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col gap-4 border-b border-[#ece4d6] pb-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex min-w-0 w-full max-w-2xl items-center gap-3 rounded-full border border-[#e6dfd4] bg-[#faf7f2] px-4 py-3 shadow-inner sm:px-5 sm:py-4">
                        <Search className="h-5 w-5 shrink-0 text-[#918473]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search backend chapters, ideas, or tags..."
                            className="min-w-0 w-full border-none bg-transparent text-sm text-[#2f3337] outline-none placeholder:text-[#a59b8f] sm:text-base"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {BACKEND_BLOG_CATEGORIES.map((category) => {
                            const isActive = category === activeCategory;

                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${isActive
                                        ? 'bg-[#23211f] text-white shadow-[0_10px_30px_rgba(35,33,31,0.18)]'
                                        : 'border border-[#ddd4c6] bg-white text-[#5d5448] hover:border-[#b8ab99] hover:text-[#201b16]'
                                        }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a8d79]">Visible articles</p>
                        <p className="mt-2 text-lg text-[#404a54]">
                            {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} in this view
                        </p>
                    </div>
                    <div className="hidden items-center gap-2 rounded-full bg-[#f4eee4] px-4 py-2 text-sm text-[#6f6356] sm:flex">
                        <Sparkles className="h-4 w-4" />
                        Astro-rendered article pages open on the same domain
                    </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredBlogs.map((post) => (
                        <a
                            key={post.id}
                            href={post.href}
                            className="group rounded-[1.5rem] border border-[#e7dfd2] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98)_0%,_rgba(250,247,241,0.96)_100%)] p-5 shadow-[0_18px_42px_rgba(102,88,67,0.08)] transition-all hover:-translate-y-1 hover:border-[#cbbca8] hover:shadow-[0_26px_58px_rgba(102,88,67,0.14)] sm:p-6"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="rounded-full bg-[#f1e9dc] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#8b7760]">
                                    Topic {post.topicNumber}
                                </span>
                                <span className="text-sm font-medium text-[#8a7b67]">{post.category}</span>
                            </div>

                            <h2 className="mt-5 font-serif text-[1.8rem] font-semibold leading-tight tracking-tight text-[#1a2026]">
                                {post.title}
                            </h2>
                            <p className="mt-4 text-[0.98rem] leading-[1.75] text-[#5f6872]">
                                {post.summary}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-[#e5dbcc] bg-white px-3 py-1.5 text-xs font-medium text-[#5c6470]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1f262d] transition-transform group-hover:translate-x-1">
                                Open article
                                <ArrowUpRight className="h-4 w-4" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BackendBlogsPage;
