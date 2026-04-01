import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import {
    ArrowRight,
    BookOpen,
    CalendarDays,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Search
} from 'lucide-react';
import { useFavicon } from '../../hooks/useFavicon';
import { BLOG_COLLECTIONS, BLOG_POSTS, type BlogCollection, type BlogPost } from './blogData';

type BlogView = 'overview' | 'collection' | 'article';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

const matchSearch = (post: BlogPost, query: string) => {
    const value = query.trim().toLowerCase();

    if (!value) {
        return true;
    }

    return [
        post.title,
        post.excerpt,
        post.topic,
        post.category,
        post.tags.join(' ')
    ].some((field) => field.toLowerCase().includes(value));
};

const getCollectionPosts = (collectionId: string) => {
    switch (collectionId) {
        case 'ai-builder-notes':
            return BLOG_POSTS.filter((post) => post.category === 'AI Builder');
        case 'ml-systems-journal':
            return BLOG_POSTS.filter((post) => post.category === 'ML Systems');
        case 'applied-intelligence':
            return BLOG_POSTS.filter((post) =>
                ['Product Engineering', 'Local LLMs', 'Semantic Search', 'Computer Vision'].includes(post.topic)
            );
        case 'research-systems':
            return BLOG_POSTS.filter((post) =>
                ['Healthcare ML', 'Reinforcement Learning', 'Student Research', 'Computer Vision'].includes(post.topic)
            );
        default:
            return BLOG_POSTS;
    }
};

const getCollectionById = (collectionId: string) =>
    BLOG_COLLECTIONS.find((collection) => collection.id === collectionId) ?? BLOG_COLLECTIONS[0];

const getCollectionIdForPost = (post: BlogPost) =>
    post.category === 'AI Builder' ? 'ai-builder-notes' : 'ml-systems-journal';

const getPostByRouteValue = (value: string | null) =>
    BLOG_POSTS.find((post) => post.slug === value || post.id === value);

const sortByDateDesc = (posts: BlogPost[]) =>
    [...posts].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

const sortByPopularity = (posts: BlogPost[]) =>
    [...posts].sort((left, right) => right.popularity - left.popularity);

const buildTopics = (posts: BlogPost[]) => {
    const grouped = posts.reduce<Record<string, BlogPost[]>>((accumulator, post) => {
        accumulator[post.topic] = [...(accumulator[post.topic] ?? []), post];
        return accumulator;
    }, {});

    return Object.entries(grouped)
        .map(([topic, topicPosts]) => ({
            topic,
            posts: sortByDateDesc(topicPosts)
        }))
        .sort((left, right) => right.posts.length - left.posts.length);
};

const linesClampClass = 'overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical]';

const CoverPattern = ({ collection }: { collection: BlogCollection }) => {
    switch (collection.variant) {
        case 'sunrise':
            return (
                <>
                    <div
                        className="absolute -left-8 bottom-[-3.5rem] h-72 w-72 rounded-full blur-[1px]"
                        style={{ background: `radial-gradient(circle at top, ${collection.accent} 0%, rgba(255,255,255,0) 72%)` }}
                    />
                    <div className="absolute right-[-1rem] top-14 h-52 w-52 rounded-full bg-white/55" />
                    <div className="absolute bottom-[-4rem] left-8 h-[72%] w-[72%] rounded-[45%] bg-[radial-gradient(circle_at_top,_rgba(70,44,28,0.45),_rgba(70,44,28,0.04)_72%)]" />
                    <div
                        className="absolute bottom-[-2rem] right-[-1rem] h-52 w-44 rounded-[2.7rem]"
                        style={{ background: `linear-gradient(180deg, ${collection.secondaryAccent} 0%, rgba(255,255,255,0.08) 100%)` }}
                    />
                </>
            );
        case 'dune':
            return (
                <>
                    <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
                    <div
                        className="absolute -left-10 bottom-[-3rem] h-56 w-[130%] rounded-[50%]"
                        style={{ background: `linear-gradient(180deg, ${collection.accent} 0%, rgba(255,255,255,0.04) 100%)` }}
                    />
                    <div className="absolute bottom-[-4.5rem] left-10 h-40 w-40 rounded-full bg-black/12 blur-[2px]" />
                    <div className="absolute bottom-[-2rem] right-[-1rem] h-28 w-28 rounded-full bg-white/35" />
                </>
            );
        case 'frame':
            return (
                <>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.22)_0%,_transparent_35%,_rgba(255,255,255,0.12)_100%)]" />
                    <div
                        className="absolute -left-6 top-20 h-[74%] w-[68%] rounded-[2rem]"
                        style={{ background: `linear-gradient(180deg, ${collection.accent} 0%, rgba(255,255,255,0.08) 100%)` }}
                    />
                    <div
                        className="absolute right-[-1.2rem] top-12 h-[56%] w-[68%] rounded-[2.4rem]"
                        style={{ background: `linear-gradient(180deg, ${collection.secondaryAccent} 0%, rgba(12,39,66,0.9) 100%)` }}
                    />
                    <div className="absolute right-7 top-0 h-28 w-20 rounded-b-[1.7rem] bg-[#2d8de3]/75" />
                    <div className="absolute right-8 top-24 h-40 w-40 rounded-full bg-white/35 blur-[16px]" />
                </>
            );
        case 'horizon':
            return (
                <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_55%)]" />
                    <div
                        className="absolute -left-12 top-8 h-[58%] w-[135%] rounded-[50%]"
                        style={{ background: `linear-gradient(180deg, ${collection.secondaryAccent} 0%, rgba(255,255,255,0.06) 100%)` }}
                    />
                    <div className="absolute bottom-[-4rem] left-0 h-[72%] w-full rounded-[50%] bg-[radial-gradient(circle_at_center,_rgba(146,199,208,0.62),_rgba(255,255,255,0.02)_68%)]" />
                    <div
                        className="absolute bottom-[-2rem] right-[-0.5rem] h-44 w-36 rounded-[46%]"
                        style={{ background: `radial-gradient(circle at top, rgba(255,255,210,0.88) 0%, ${collection.accent} 56%, rgba(255,255,255,0) 74%)` }}
                    />
                </>
            );
        default:
            return null;
    }
};

const BookArtwork = ({
    collection,
    size = 'regular',
    interactive = false
}: {
    collection: BlogCollection;
    size?: 'regular' | 'large';
    interactive?: boolean;
}) => {
    const dimensions = size === 'large'
        ? 'h-[280px] w-[188px] sm:h-[360px] sm:w-[240px] lg:h-[420px] lg:w-[285px]'
        : 'h-[250px] w-[168px] sm:h-[320px] sm:w-[215px] lg:h-[360px] lg:w-[240px]';
    const titleClass = size === 'large'
        ? 'max-w-[9ch] text-[1.75rem] sm:text-[2.35rem] lg:text-[2.55rem]'
        : 'max-w-[8.5ch] text-[1.45rem] sm:text-[1.9rem] lg:text-[2.1rem]';

    return (
        <div className={`group/book relative [perspective:1800px] ${dimensions}`}>
            <div
                className="absolute right-[12%] top-7 h-[86%] w-[80%] translate-x-3 rounded-r-[0.45rem] border border-[#ebe6de] bg-white/98 shadow-[18px_20px_30px_rgba(60,48,32,0.08)]"
            />
            <div
                className="absolute right-[12%] top-5 h-[88%] w-[83%] translate-x-1 rounded-r-[0.45rem] border border-[#ede8e1] bg-white/98 shadow-[18px_20px_30px_rgba(60,48,32,0.08)]"
            />
            <div
                className={`absolute left-0 top-0 h-full w-[88%] overflow-hidden rounded-[0.35rem_0.35rem_0.35rem_0.2rem] border border-white/40 shadow-[0_22px_50px_rgba(95,76,58,0.22)] [backface-visibility:hidden] [transform-origin:2.2%_50%] [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${interactive ? 'group-hover/book:[transform:rotateY(-32deg)]' : ''}`}
                style={{ background: collection.background }}
            >
                <div className="absolute inset-y-0 left-3 w-px bg-white/55" />
                <CoverPattern collection={collection} />
                <div className="absolute inset-x-0 bottom-0 h-[54%] bg-gradient-to-t from-black/32 via-black/8 to-transparent" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.18)_0%,_transparent_28%,_transparent_72%,_rgba(255,255,255,0.14)_100%)]" />
                <div className="relative z-10 flex h-full flex-col justify-between p-4 text-white sm:p-6">
                    <span className="font-serif text-[9px] tracking-[0.22em] text-white/85 sm:text-[10px] sm:tracking-wide">Lalith Kumar Notes</span>
                    <div className="space-y-3 sm:space-y-4">
                        <p className={`max-w-[18ch] text-[13px] font-semibold leading-relaxed text-white/88 sm:text-sm ${linesClampClass} [-webkit-line-clamp:3]`}>
                            {collection.description}
                        </p>
                        <h3 className={`${titleClass} font-black uppercase leading-[0.92] tracking-tight`}>
                            {collection.title}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PostCard = ({
    post,
    onClick
}: {
    post: BlogPost;
    onClick: () => void;
}) => (
    <button
        type="button"
        onClick={onClick}
        className="rounded-[1.35rem] border border-[#e7e0d4] bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#cbbfae] hover:shadow-[0_18px_40px_rgba(73,61,46,0.08)] sm:rounded-[1.5rem] sm:p-6"
    >
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8a7e6f] sm:mb-4 sm:text-sm">
            <span>{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-[#b8a892]" />
            <span>{post.readTime}</span>
        </div>
        <h4 className={`text-[1.3rem] font-semibold leading-tight tracking-tight text-[#1a1f24] sm:text-[1.75rem] lg:text-[1.9rem] ${linesClampClass} [-webkit-line-clamp:3]`}>
            {post.title}
        </h4>
        <p className={`mt-3 text-[0.98rem] leading-relaxed text-[#5f6670] sm:mt-4 sm:text-lg ${linesClampClass} [-webkit-line-clamp:3]`}>
            {post.excerpt}
        </p>
    </button>
);

export const BlogsSection = () => {
    useFavicon('blogs');

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCollectionId, setActiveCollectionId] = useState(BLOG_COLLECTIONS[0].id);
    const [openTopic, setOpenTopic] = useState('');
    const [canScrollCollectionsLeft, setCanScrollCollectionsLeft] = useState(false);
    const [canScrollCollectionsRight, setCanScrollCollectionsRight] = useState(true);
    const collectionsScrollerRef = useRef<HTMLDivElement | null>(null);

    const collectionParam = searchParams.get('collection');
    const postParam = searchParams.get('post');
    const routePost = getPostByRouteValue(postParam);
    const hasValidCollectionParam = Boolean(collectionParam && BLOG_COLLECTIONS.some((collection) => collection.id === collectionParam));
    const routeCollectionId = hasValidCollectionParam
        ? collectionParam!
        : routePost
            ? getCollectionIdForPost(routePost)
            : BLOG_COLLECTIONS[0].id;
    const view: BlogView = routePost ? 'article' : hasValidCollectionParam ? 'collection' : 'overview';
    const openedCollection = getCollectionById(routeCollectionId);
    const activeCollection = view === 'overview' ? getCollectionById(activeCollectionId) : openedCollection;
    const searchScopedPosts = sortByDateDesc(BLOG_POSTS.filter((post) => matchSearch(post, searchQuery)));
    const openedCollectionPosts = sortByDateDesc(
        getCollectionPosts(openedCollection.id).filter((post) => matchSearch(post, searchQuery))
    );
    const latestPosts = searchScopedPosts.slice(0, 3);
    const popularPosts = sortByPopularity(searchScopedPosts).slice(0, 3);
    const topicGroups = buildTopics(openedCollectionPosts);
    const selectedPost = routePost ?? getCollectionPosts(openedCollection.id)[0] ?? BLOG_POSTS[0];
    const relatedPosts = sortByDateDesc(
        getCollectionPosts(getCollectionIdForPost(selectedPost)).filter((post) => post.id !== selectedPost.id)
    ).slice(0, 3);
    const showManualRail = view === 'overview';

    useEffect(() => {
        if (view !== 'overview' && activeCollectionId !== routeCollectionId) {
            setActiveCollectionId(routeCollectionId);
        }
    }, [activeCollectionId, routeCollectionId, view]);

    useEffect(() => {
        const normalizedParams = new URLSearchParams();

        if (routePost) {
            normalizedParams.set('collection', routeCollectionId);
            normalizedParams.set('post', routePost.slug);
        } else if (hasValidCollectionParam) {
            normalizedParams.set('collection', routeCollectionId);
        }

        if (normalizedParams.toString() !== searchParams.toString()) {
            setSearchParams(normalizedParams, { replace: true });
        }
    }, [hasValidCollectionParam, routeCollectionId, routePost, searchParams, setSearchParams]);

    useEffect(() => {
        if (openTopic && !topicGroups.some((topicGroup) => topicGroup.topic === openTopic)) {
            setOpenTopic('');
        }
    }, [openTopic, topicGroups]);

    useEffect(() => {
        const scroller = collectionsScrollerRef.current;

        if (!scroller) {
            return;
        }

        const syncCollectionNav = () => {
            const maxScrollLeft = Math.max(scroller.scrollWidth - scroller.clientWidth, 0);
            setCanScrollCollectionsLeft(scroller.scrollLeft > 8);
            setCanScrollCollectionsRight(scroller.scrollLeft < maxScrollLeft - 8);
        };

        syncCollectionNav();
        scroller.addEventListener('scroll', syncCollectionNav, { passive: true });
        window.addEventListener('resize', syncCollectionNav);

        return () => {
            scroller.removeEventListener('scroll', syncCollectionNav);
            window.removeEventListener('resize', syncCollectionNav);
        };
    }, [view]);

    const updateBlogRoute = (
        nextState: {
            collectionId?: string;
            post?: BlogPost;
        },
        options?: {
            replace?: boolean;
        }
    ) => {
        const nextParams = new URLSearchParams();
        const nextCollectionId = nextState.post ? getCollectionIdForPost(nextState.post) : nextState.collectionId;

        if (nextCollectionId) {
            nextParams.set('collection', nextCollectionId);
        }

        if (nextState.post) {
            nextParams.set('post', nextState.post.slug);
        }

        setSearchParams(nextParams, { replace: options?.replace });
    };

    const openOverview = (options?: { replace?: boolean }) => {
        setOpenTopic('');
        updateBlogRoute({}, options);
    };

    const openCollection = (collectionId: string) => {
        setActiveCollectionId(collectionId);
        setOpenTopic('');
        updateBlogRoute({ collectionId });
    };

    const openPost = (post: BlogPost) => {
        setOpenTopic('');
        updateBlogRoute({ post });
    };

    const scrollCollections = (direction: 'left' | 'right') => {
        const scroller = collectionsScrollerRef.current;

        if (!scroller) {
            return;
        }

        const distance = Math.max(scroller.clientWidth * 0.78, 260);
        scroller.scrollBy({
            left: direction === 'left' ? -distance : distance,
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-full overflow-x-clip rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,_rgba(226,214,194,0.85),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(203,225,236,0.72),_transparent_30%),linear-gradient(180deg,_#f7f3ec_0%,_#f2eee7_100%)] p-2.5 sm:rounded-[2rem] sm:p-5 xl:p-8">
            <Helmet>
                <title>Notes | Lalith Kumar</title>
                <meta
                    name="description"
                    content="Editorial-style AI and ML notes by Siramdasu Lalith Kumar covering multi-modal AI, local LLMs, computer vision, healthcare ML, reinforcement learning, and engineering lessons from real projects."
                />
            </Helmet>

            <div className={`grid min-w-0 items-start gap-3 sm:gap-4 xl:gap-6 ${showManualRail ? '2xl:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]' : 'grid-cols-1'}`}>
                {showManualRail && (
                    <aside className="min-w-0 xl:sticky xl:top-6 xl:h-[calc(100vh-6rem)]">
                        <div className="flex h-full flex-col gap-6 overflow-hidden rounded-[1.75rem] bg-white/55 p-4 shadow-[0_24px_70px_rgba(148,123,95,0.08)] backdrop-blur-sm sm:p-6 xl:justify-between xl:gap-0 xl:rounded-[2rem] xl:p-7">
                            <div className="space-y-6 sm:space-y-8">
                                <div className="space-y-4 sm:space-y-5">
                                    <h1 className="max-w-[5.4ch] font-serif text-[clamp(2.65rem,14vw,4.65rem)] font-semibold leading-[0.84] tracking-[-0.045em] text-[#1f2328]">
                                        field notes
                                    </h1>
                                    <p className="max-w-[17rem] text-[0.96rem] leading-[1.7] text-[#666762] sm:text-[1.05rem]">
                                        A curated shelf of AI and ML essays drawn from my projects in multi-modal systems, local LLMs, healthcare ML, reinforcement learning, and research.
                                    </p>
                                </div>

                                <div className="max-w-full rounded-[1.4rem] border border-[#221f1d] bg-[#23211f] p-4 text-white shadow-xl sm:rounded-[1.5rem] sm:p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 sm:h-11 sm:w-11">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white/70">Editorial library</p>
                                            <p className="text-[1.85rem] font-semibold leading-none sm:text-2xl">8 focused posts</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm leading-relaxed text-white/75 sm:mt-4">
                                        Four AI builder essays and four ML systems essays, written to feel like a living archive of what I am learning and shipping.
                                    </p>
                                </div>
                            </div>

                            <div className="hidden pt-8 text-sm text-[#80786d] xl:block">
                                <div className="flex items-center justify-between border-t border-[#ddd5c7] pt-5">
                                    <span>Project-backed writing</span>
                                    <span>Readable editorial layout</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                <section className={`min-w-0 overflow-hidden rounded-[1.75rem] bg-white/84 p-3.5 shadow-[0_24px_80px_rgba(147,129,103,0.12)] backdrop-blur-sm sm:rounded-[2rem] sm:p-6 xl:p-8 ${showManualRail ? '' : 'w-full'}`}>
                    {view === 'overview' && (
                        <div className="space-y-8 sm:space-y-12">
                            <div className="flex min-w-0 flex-col gap-5 border-b border-[#ece5da] pb-8 sm:gap-6 sm:pb-10 lg:flex-row lg:items-center lg:justify-between">
                                <div className="space-y-2 sm:space-y-3">
                                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a8f80]">Collections</p>
                                    <h2 className="font-serif text-[2.45rem] font-semibold tracking-tight text-[#1f2328] sm:text-5xl">Collections</h2>
                                </div>
                                <div className="flex min-w-0 w-full max-w-xl items-center gap-3 rounded-full border border-[#e6dfd4] bg-[#faf7f2] px-4 py-3 shadow-inner sm:px-5 sm:py-4">
                                    <Search className="h-5 w-5 text-[#918473]" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        placeholder="Search articles, topics, or tags..."
                                        className="min-w-0 w-full border-none bg-transparent text-sm text-[#2f3337] outline-none placeholder:text-[#a59b8f] sm:text-base"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                {canScrollCollectionsLeft && (
                                    <>
                                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-[#faf7f1] via-[#faf7f1]/90 to-transparent sm:block" />
                                        <button
                                            type="button"
                                            onClick={() => scrollCollections('left')}
                                            className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#2a2622]/75 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all hover:bg-[#2a2622] sm:flex"
                                            aria-label="Scroll collections left"
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                    </>
                                )}

                                {canScrollCollectionsRight && (
                                    <>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-[#faf7f1] via-[#faf7f1]/90 to-transparent sm:block" />
                                        <button
                                            type="button"
                                            onClick={() => scrollCollections('right')}
                                            className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#2a2622]/75 text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all hover:bg-[#2a2622] sm:flex"
                                            aria-label="Scroll collections right"
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </button>
                                    </>
                                )}

                                <div
                                    ref={collectionsScrollerRef}
                                    className="-mx-3 overflow-x-auto px-3 pb-3 [scrollbar-width:none] [-ms-overflow-style:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
                                >
                                    <div className="flex min-w-max snap-x snap-mandatory gap-4 pr-3 sm:gap-8 sm:pr-6">
                                    {BLOG_COLLECTIONS.map((collection) => {
                                        const count = getCollectionPosts(collection.id).length;
                                        const isActive = collection.id === activeCollection.id;

                                        return (
                                            <button
                                                key={collection.id}
                                                type="button"
                                                onMouseEnter={() => setActiveCollectionId(collection.id)}
                                                onFocus={() => setActiveCollectionId(collection.id)}
                                                onClick={() => openCollection(collection.id)}
                                                className="group w-[182px] flex-none snap-start text-left sm:w-[260px] lg:w-[280px]"
                                            >
                                                <BookArtwork collection={collection} interactive />
                                                <div className="mt-4 flex items-start justify-between gap-3 sm:mt-5">
                                                    <div className="min-w-0 pr-1 sm:pr-4">
                                                        <p className="text-[1.15rem] font-semibold leading-tight tracking-tight text-[#1d2227] sm:text-[1.85rem] lg:text-[2rem]">
                                                            {collection.title}
                                                        </p>
                                                        <p className="mt-1 text-sm text-[#7d756b] sm:text-base">{count} articles</p>
                                                    </div>
                                                    <div className={`hidden h-12 w-12 items-center justify-center rounded-full border transition-all sm:flex ${isActive ? 'border-[#23211f] bg-[#23211f] text-white' : 'border-[#ddd5c7] bg-white text-[#6f6a63] group-hover:border-[#23211f] group-hover:bg-[#23211f] group-hover:text-white'}`}>
                                                        <ArrowRight className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-8 border-t border-[#ece5da] pt-8 sm:gap-12 sm:pt-10 lg:grid-cols-2">
                                <div>
                                    <h3 className="mb-4 font-serif text-[2rem] font-semibold text-[#1f2328] sm:mb-5 sm:text-4xl">Most popular</h3>
                                    <div className="space-y-3 sm:space-y-5">
                                        {popularPosts.map((post) => (
                                            <button
                                                key={post.id}
                                                type="button"
                                                onClick={() => openPost(post)}
                                                className="block rounded-[1.15rem] border border-[#ece5da] bg-[#fcfaf7] px-4 py-3 text-left text-[0.98rem] leading-[1.55] text-[#4f5861] transition-all hover:border-[#d8cdbf] hover:text-[#13171b] sm:rounded-[1.35rem] sm:px-5 sm:py-4 sm:text-[1.15rem]"
                                            >
                                                {post.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-4 font-serif text-[2rem] font-semibold text-[#1f2328] sm:mb-5 sm:text-4xl">Latest additions</h3>
                                    <div className="space-y-3 sm:space-y-5">
                                        {latestPosts.map((post) => (
                                            <button
                                                key={post.id}
                                                type="button"
                                                onClick={() => openPost(post)}
                                                className="block rounded-[1.15rem] border border-[#ece5da] bg-[#fcfaf7] px-4 py-3 text-left text-[0.98rem] leading-[1.55] text-[#4f5861] transition-all hover:border-[#d8cdbf] hover:text-[#13171b] sm:rounded-[1.35rem] sm:px-5 sm:py-4 sm:text-[1.15rem]"
                                            >
                                                {post.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'collection' && (
                        <div className="space-y-8 sm:space-y-12">
                            <div className="flex flex-col gap-4 border-b border-[#ece5da] pb-6 sm:pb-8 md:flex-row md:items-center md:justify-between">
                                <button
                                    type="button"
                                    onClick={() => openOverview()}
                                    className="inline-flex items-center gap-3 text-base text-[#1e2328] transition-colors hover:text-[#8a6f51] sm:text-lg"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                    <span>All collections</span>
                                </button>
                                <div className="flex min-w-0 w-full items-center gap-3 rounded-full border border-[#e6dfd4] bg-[#faf7f2] px-4 py-3 shadow-inner md:w-auto md:min-w-[20rem]">
                                    <Search className="h-4 w-4 shrink-0 text-[#918473]" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        placeholder="Search in this collection..."
                                        className="min-w-0 w-full border-none bg-transparent text-sm text-[#2f3337] outline-none placeholder:text-[#a59b8f] md:w-64"
                                    />
                                </div>
                            </div>

                            <div className="grid min-w-0 gap-6 sm:gap-8 2xl:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)] xl:items-start">
                                <div className="flex justify-center xl:justify-start">
                                    <BookArtwork collection={openedCollection} size="large" interactive />
                                </div>

                                <div className="min-w-0 space-y-6 sm:space-y-8">
                                    <div className="space-y-4 sm:space-y-5">
                                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a8f80]">{openedCollection.eyebrow}</p>
                                        <h2 className="font-serif text-[2.7rem] font-semibold tracking-tight text-[#1f2328] sm:text-5xl xl:text-6xl">
                                            {openedCollection.title}
                                        </h2>
                                        <p className="max-w-4xl text-[0.98rem] leading-[1.75] text-[#5d6670] sm:text-[1.08rem] xl:text-[1.15rem]">
                                            {openedCollection.description}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
                                            <p className="text-[1.7rem] font-semibold text-[#20252a] sm:text-2xl">All articles</p>
                                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8f816f]">
                                                {openedCollectionPosts.length} in this collection
                                            </p>
                                        </div>
                                        <div className="grid gap-5 md:grid-cols-2">
                                            {openedCollectionPosts.map((post) => (
                                                <PostCard key={post.id} post={post} onClick={() => openPost(post)} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="mb-4 text-lg font-semibold text-[#2a2f35] sm:mb-5 sm:text-xl">Browse by topic</p>
                                <div className="rounded-[1.5rem] border border-[#ebe3d8]">
                                    {topicGroups.map((topicGroup, index) => {
                                        const isOpen = topicGroup.topic === openTopic;

                                        return (
                                            <div key={topicGroup.topic} className={index === 0 ? '' : 'border-t border-[#ebe3d8]'}>
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenTopic(isOpen ? '' : topicGroup.topic)}
                                                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
                                                >
                                                    <div className="min-w-0">
                                                        <p className="text-lg font-semibold text-[#1e2328] sm:text-2xl">{topicGroup.topic}</p>
                                                        <p className="mt-1 text-sm text-[#7e7870]">{topicGroup.posts.length} articles</p>
                                                    </div>
                                                    <ChevronDown className={`h-6 w-6 text-[#5c5955] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                {isOpen && (
                                                    <div className="grid gap-4 px-4 pb-4 sm:px-6 sm:pb-6 md:grid-cols-2">
                                                        {topicGroup.posts.map((post) => (
                                                            <PostCard key={post.id} post={post} onClick={() => openPost(post)} />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'article' && (
                        <div className="space-y-8 sm:space-y-10">
                            <div className="flex flex-wrap items-center gap-3 border-b border-[#ece5da] pb-6 sm:gap-4 sm:pb-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        updateBlogRoute({ collectionId: getCollectionIdForPost(selectedPost) });
                                    }}
                                    className="inline-flex items-center gap-3 text-base text-[#1e2328] transition-colors hover:text-[#8a6f51] sm:text-lg"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                    <span>{getCollectionById(getCollectionIdForPost(selectedPost)).title}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openOverview()}
                                    className="text-sm uppercase tracking-[0.2em] text-[#8e8375] transition-colors hover:text-[#1e2328]"
                                >
                                    All collections
                                </button>
                            </div>

                            <div className="grid min-w-0 gap-6 sm:gap-8 2xl:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)] xl:items-start">
                                <div className="hidden justify-center md:flex xl:justify-start">
                                    <BookArtwork collection={getCollectionById(getCollectionIdForPost(selectedPost))} size="large" interactive />
                                </div>

                                <article className="min-w-0 space-y-6 sm:space-y-8">
                                    <div className="space-y-4 sm:space-y-5">
                                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a8f80]">{selectedPost.category}</p>
                                        <h2 className="max-w-4xl font-serif text-[2.45rem] font-semibold tracking-tight text-[#1b1f24] sm:text-5xl xl:text-6xl">
                                            {selectedPost.title}
                                        </h2>
                                        <p className="max-w-4xl text-[0.98rem] leading-[1.75] text-[#5f6872] sm:text-[1.08rem] xl:text-[1.15rem]">
                                            {selectedPost.excerpt}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-sm text-[#68655f] sm:gap-3">
                                        <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f2] px-3 py-2.5 sm:px-4 sm:py-3">
                                            <CalendarDays className="h-4 w-4" />
                                            <span>{dateFormatter.format(new Date(selectedPost.date))}</span>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-2xl bg-[#faf7f2] px-3 py-2.5 sm:px-4 sm:py-3">
                                            <Clock3 className="h-4 w-4" />
                                            <span>{selectedPost.readTime}</span>
                                        </div>
                                        <div className="rounded-2xl bg-[#faf7f2] px-3 py-2.5 sm:px-4 sm:py-3">
                                            {selectedPost.topic}
                                        </div>
                                    </div>

                                    <div className="max-w-4xl space-y-5 text-[1rem] leading-[1.85] text-[#2f363d] sm:space-y-6 sm:text-[1.08rem] xl:text-[1.1rem]">
                                        {selectedPost.body.map((paragraph) => (
                                            <p key={paragraph}>{paragraph}</p>
                                        ))}
                                    </div>

                                    <div className="rounded-[1.5rem] border border-[#e8dfd1] bg-[#fcfaf6] p-4 sm:rounded-[1.75rem] sm:p-6">
                                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9a8d79]">Tags</p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {selectedPost.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-[#f3ede4] px-3 py-2 text-sm font-medium text-[#4f5963]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            </div>

                            <div>
                                <p className="mb-4 text-[1.7rem] font-semibold text-[#20252a] sm:mb-5 sm:text-2xl">Continue reading</p>
                                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                                    {relatedPosts.map((post) => (
                                        <PostCard key={post.id} post={post} onClick={() => openPost(post)} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default BlogsSection;
