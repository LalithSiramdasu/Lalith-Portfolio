export type BackendBlogCategory =
    | 'Foundations'
    | 'Application Design'
    | 'Data Systems'
    | 'Reliability & Security'
    | 'Scale & Performance';

export interface BackendBlogPost {
    id: string;
    topicNumber: string;
    title: string;
    summary: string;
    category: BackendBlogCategory;
    sourceFolderName: string;
    tags: string[];
    href: string;
    slug: string;
}

interface BackendBlogSeed {
    topicNumber: string;
    title: string;
    summary: string;
    category: BackendBlogCategory;
    sourceFolderName: string;
    tags: string[];
}

export const slugifyBackendFolderName = (folderName: string) => {
    const slug = folderName
        .normalize('NFKD')
        .replace(/[^\x00-\x7F]/g, '')
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/\./g, ' ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return `topic-${slug}`;
};

const BACKEND_BLOG_SEEDS: BackendBlogSeed[] = [
    {
        topicNumber: '01',
        title: 'Backend Engineering Roadmap From First Principles',
        summary: 'A big-picture guide to the backend learning path, from HTTP fundamentals to scaling and production systems.',
        category: 'Foundations',
        sourceFolderName: '01. Roadmap for backend from first principles',
        tags: ['Roadmap', 'Learning Path', 'System Design']
    },
    {
        topicNumber: '02',
        title: 'Walk the Path of a True Backend Engineer',
        summary: 'A mindset-first chapter on how backend engineers think about systems, correctness, and long-term technical growth.',
        category: 'Foundations',
        sourceFolderName: '02. Walk the path of a true backend engineer',
        tags: ['Mindset', 'Career', 'Engineering Practice']
    },
    {
        topicNumber: '03',
        title: 'What Is a Backend and Why Do We Need It?',
        summary: 'A practical explanation of what backend systems do, what they own, and why modern products depend on them.',
        category: 'Foundations',
        sourceFolderName: '03. What is a Backend, how do they work and why do we need them',
        tags: ['Backend Basics', 'Architecture', 'Web Systems']
    },
    {
        topicNumber: '04',
        title: 'Benefits of Learning Backend Engineering from First Principles',
        summary: 'Why a first-principles approach helps you reason about APIs, reliability, performance, and architecture choices.',
        category: 'Foundations',
        sourceFolderName: '04. Benefits of learning backend engineering from first principles',
        tags: ['First Principles', 'Learning', 'Architecture']
    },
    {
        topicNumber: '05',
        title: 'Understanding HTTP for Backend Engineers',
        summary: 'A solid walkthrough of requests, responses, methods, headers, and the protocol details every backend engineer uses daily.',
        category: 'Application Design',
        sourceFolderName: '05. Understanding HTTP for backend engineers, where it all starts',
        tags: ['HTTP', 'Requests', 'Responses']
    },
    {
        topicNumber: '06',
        title: 'What Is Routing in Backend Systems?',
        summary: 'How incoming requests find the correct code path, and why routing design affects clarity, scale, and maintainability.',
        category: 'Application Design',
        sourceFolderName: '06. What is Routing in Backend How Requests Find Their Way Home',
        tags: ['Routing', 'Frameworks', 'Request Flow']
    },
    {
        topicNumber: '07',
        title: 'Serialization and Deserialization for Backend Engineers',
        summary: 'A clear explanation of how data moves between memory, wire formats, and persistence layers.',
        category: 'Application Design',
        sourceFolderName: '07. Serialization and Deserialization for backend engineers',
        tags: ['Serialization', 'JSON', 'Contracts']
    },
    {
        topicNumber: '08',
        title: 'Authentication and Authorization for Backend Engineers',
        summary: 'The difference between identity and permissions, plus the practical flows behind secure access control.',
        category: 'Reliability & Security',
        sourceFolderName: '08. Authentication and authorization for backend engineers',
        tags: ['Authentication', 'Authorization', 'Security']
    },
    {
        topicNumber: '09',
        title: 'Validations and Transformations for Backend Engineers',
        summary: 'Why input validation, parsing, and normalization are key to building safe and predictable APIs.',
        category: 'Application Design',
        sourceFolderName: '09. Validations and transformations for backend engineers',
        tags: ['Validation', 'Transformation', 'API Design']
    },
    {
        topicNumber: '10',
        title: 'Controllers, Services, Repositories, and Middleware',
        summary: 'A chapter on request lifecycle boundaries and how to structure backend code without turning everything into a blob.',
        category: 'Application Design',
        sourceFolderName: '10. What are controllers, services, repositories, middlewares and request context',
        tags: ['Controllers', 'Services', 'Request Context']
    },
    {
        topicNumber: '11',
        title: 'Complete REST API Design',
        summary: 'Core REST design ideas including resources, status codes, payload design, and consistency across endpoints.',
        category: 'Application Design',
        sourceFolderName: '11. Complete REST API Design',
        tags: ['REST', 'API Design', 'HTTP Semantics']
    },
    {
        topicNumber: '12',
        title: 'Mastering Databases with Postgres',
        summary: 'A grounded introduction to relational thinking, Postgres features, and why databases shape backend quality.',
        category: 'Data Systems',
        sourceFolderName: '12. Mastering Databases with Postgres',
        tags: ['Postgres', 'Databases', 'SQL']
    },
    {
        topicNumber: '13',
        title: 'Caching, the Secret Behind It All',
        summary: 'How caches reduce latency and load, plus the trade-offs around freshness, invalidation, and system complexity.',
        category: 'Data Systems',
        sourceFolderName: '13. Caching, the secret behind it all',
        tags: ['Caching', 'Performance', 'Latency']
    },
    {
        topicNumber: '14',
        title: 'Task Queues and Background Jobs',
        summary: 'When to move work off the request path and how queues help throughput, reliability, and user experience.',
        category: 'Scale & Performance',
        sourceFolderName: '14. Task queues and background jobs',
        tags: ['Queues', 'Background Jobs', 'Asynchronous Work']
    },
    {
        topicNumber: '15',
        title: 'Full-Text Search Using Elasticsearch',
        summary: 'A practical look at search indexing, inverted indexes, and why dedicated search systems outperform naive filtering.',
        category: 'Data Systems',
        sourceFolderName: '15. Full text search using Elasticsearch for blazingly fast search',
        tags: ['Elasticsearch', 'Search', 'Indexing']
    },
    {
        topicNumber: '16',
        title: 'Error Handling and Building Fault-Tolerant Systems',
        summary: 'Patterns for dealing with failure gracefully, surfacing useful errors, and keeping services resilient under stress.',
        category: 'Reliability & Security',
        sourceFolderName: '16. Error Handling and Building Fault Tolerant Systems',
        tags: ['Error Handling', 'Fault Tolerance', 'Resilience']
    },
    {
        topicNumber: '17',
        title: 'Production-Grade Configuration Management',
        summary: 'How configuration, environment separation, and secret handling influence operational safety and developer sanity.',
        category: 'Reliability & Security',
        sourceFolderName: '17. Production-grade Configuration Management',
        tags: ['Configuration', 'Secrets', 'Environments']
    },
    {
        topicNumber: '18',
        title: 'Logging, Monitoring, and Observability',
        summary: 'A systems view of logs, metrics, traces, and how to understand real production behavior.',
        category: 'Reliability & Security',
        sourceFolderName: '18. Logging, Monitoring and Observability',
        tags: ['Observability', 'Logging', 'Monitoring']
    },
    {
        topicNumber: '19',
        title: 'Graceful Shutdown',
        summary: 'Why shutdown logic matters for data integrity, in-flight work, and clean service restarts in production.',
        category: 'Reliability & Security',
        sourceFolderName: '19. Graceful Shutdown',
        tags: ['Graceful Shutdown', 'Lifecycle', 'Reliability']
    },
    {
        topicNumber: '20',
        title: 'Backend Security: Everything You Need to Know',
        summary: 'A broad operational view of securing backend systems, from trust boundaries to common attack surfaces.',
        category: 'Reliability & Security',
        sourceFolderName: '20. Backend Security Everything You Need to Know',
        tags: ['Security', 'Threat Modeling', 'Defense in Depth']
    },
    {
        topicNumber: '21.1',
        title: 'Backend Scaling and Performance Engineering, Part 1',
        summary: 'The first scaling chapter: load, throughput, bottlenecks, and how systems evolve under growing traffic.',
        category: 'Scale & Performance',
        sourceFolderName: '21.1 Backend Scaling and Performance Engineering - Part 1',
        tags: ['Scaling', 'Performance', 'Architecture']
    },
    {
        topicNumber: '21.2',
        title: 'Backend Scaling and Performance Engineering, Part 2',
        summary: 'The follow-up chapter on horizontal scaling, shared state, bottlenecks, and operational performance trade-offs.',
        category: 'Scale & Performance',
        sourceFolderName: '21.2 Backend Scaling and Performance Engineering - Part 2',
        tags: ['Horizontal Scaling', 'Distributed Systems', 'Performance']
    },
    {
        topicNumber: '22',
        title: 'Concurrency and Parallelism: IO-Bound vs CPU-Bound Work',
        summary: 'A backend-focused explanation of concurrency models, workload shape, and why execution strategy affects scale.',
        category: 'Scale & Performance',
        sourceFolderName: '22. Concurrency and Parallelism IO Bound vs CPU Bound',
        tags: ['Concurrency', 'Parallelism', 'Performance Models']
    }
];

export const BACKEND_BLOGS: BackendBlogPost[] = BACKEND_BLOG_SEEDS.map((seed) => {
    const slug = slugifyBackendFolderName(seed.sourceFolderName);

    return {
        ...seed,
        id: slug,
        slug,
        href: `/backend-blogs/${slug}/index.html`
    };
});

export const BACKEND_BLOGS_COUNT = BACKEND_BLOGS.length;

export const BACKEND_BLOG_CATEGORIES: Array<'All' | BackendBlogCategory> = [
    'All',
    'Foundations',
    'Application Design',
    'Data Systems',
    'Reliability & Security',
    'Scale & Performance'
];
