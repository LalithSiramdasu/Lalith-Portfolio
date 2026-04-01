export type BlogCategory = 'AI Builder' | 'ML Systems';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    body: string[];
    category: BlogCategory;
    topic: string;
    date: string;
    readTime: string;
    tags: string[];
    popularity: number;
}

export interface BlogCollection {
    id: string;
    title: string;
    eyebrow: string;
    description: string;
    accent: string;
    secondaryAccent: string;
    background: string;
    shadow: string;
    variant: 'sunrise' | 'dune' | 'frame' | 'horizon';
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 'ai-multimodal-gardener',
        slug: 'building-a-multimodal-agricultural-ai-assistant',
        title: 'Building a Multi-Modal Agricultural AI Assistant',
        excerpt: 'What it takes to combine crop vision, local LLM reasoning, vector search, and recommendation logic into one practical farming assistant.',
        body: [
            'AI Master Gardener taught me that useful AI products are rarely powered by one model alone. The strongest version of the system came from combining a CNN for disease detection, retrieval over agricultural knowledge, graph-based recommendation logic, and a local LLM that could turn technical output into natural guidance for a farmer. Each piece solved a different part of the user problem.',
            'The main engineering lesson was orchestration. Every model and subsystem had a different latency, confidence profile, and failure mode. Once I started thinking in terms of system behavior instead of single-model accuracy, the product became more reliable and much easier to explain. That shift from model-first thinking to workflow-first thinking has shaped how I approach AI applications now.'
        ],
        category: 'AI Builder',
        topic: 'Product Engineering',
        date: '2026-03-18',
        readTime: '6 min read',
        tags: ['Multi-Modal AI', 'Computer Vision', 'LLM Orchestration'],
        popularity: 99
    },
    {
        id: 'ai-local-llms-ollama',
        slug: 'using-local-llms-with-ollama-in-student-projects',
        title: 'Using Local LLMs with Ollama in Student Projects',
        excerpt: 'Why running models locally changes the way you prototype, debug, and trust conversational AI features.',
        body: [
            'Working with Ollama changed my assumptions about how quickly I could iterate on LLM-backed features. Local inference makes it easier to test prompts, inspect failure cases, and evaluate conversational behavior without depending on external API costs for every experiment. For student projects, that speed and control matters a lot.',
            'The trade-off is that local models force you to be disciplined about context, retrieval quality, and user expectations. They are good enough for many workflows, but only if the surrounding system is designed carefully. In my projects, the best results came when the model was treated as one component in a constrained product flow rather than as a magic answer engine.'
        ],
        category: 'AI Builder',
        topic: 'Local LLMs',
        date: '2026-02-21',
        readTime: '5 min read',
        tags: ['Ollama', 'Prompt Engineering', 'Local Inference'],
        popularity: 96
    },
    {
        id: 'ai-semantic-search-pgvector',
        slug: 'semantic-search-with-supabase-and-pgvector',
        title: 'Semantic Search with Supabase and pgvector',
        excerpt: 'A practical pattern for turning raw documents into context that an AI system can actually use well.',
        body: [
            'Semantic search became much more intuitive for me once I stopped thinking of embeddings as a feature and started treating them as infrastructure for relevance. With Supabase and pgvector, the workflow was clear: prepare clean chunks, store searchable embeddings, and retrieve only the most useful context before generation. That keeps the model grounded and improves the quality of final responses.',
            'The hardest part was not the database integration. It was chunk design, metadata discipline, and deciding what should be retrieved at all. Better retrieval usually came from clearer source data and tighter search scope rather than from more complexity. That lesson applies to almost every AI system that claims to be retrieval-augmented.'
        ],
        category: 'AI Builder',
        topic: 'Semantic Search',
        date: '2026-01-25',
        readTime: '6 min read',
        tags: ['Supabase', 'pgvector', 'Retrieval Augmented Generation'],
        popularity: 94
    },
    {
        id: 'ai-stack-decisions',
        slug: 'choosing-react-flask-and-node-for-ai-products',
        title: 'Choosing React, Flask, and Node for AI Products',
        excerpt: 'How I think about dividing responsibilities across the frontend, API layer, and ML-serving components in project work.',
        body: [
            'AI projects feel cleaner when the system boundaries are explicit. I like React for user interaction, Node for general application plumbing, and Flask when the ML-serving layer benefits from Python-native tooling. The stack is less important than keeping those responsibilities clear so the product remains debuggable as features grow.',
            'This separation also makes iteration easier. UI changes do not disturb training code, inference services stay focused, and API routes remain understandable. For student engineers, stack choice is often treated like identity. I think it is more useful to treat it like architecture: choose the tools that reduce coupling and let each part of the product evolve cleanly.'
        ],
        category: 'AI Builder',
        topic: 'Product Engineering',
        date: '2025-12-20',
        readTime: '5 min read',
        tags: ['React', 'Flask', 'Node.js'],
        popularity: 91
    },
    {
        id: 'ml-cnn-crop-disease',
        slug: 'cnn-lessons-from-crop-disease-prediction',
        title: 'CNN Lessons from Crop Disease Prediction',
        excerpt: 'Training on plant leaves taught me that data preparation and augmentation matter as much as architecture choice.',
        body: [
            'When I worked on crop disease prediction, the early instinct was to focus on the network design. In practice, the biggest gains came from improving image consistency, using smarter augmentation, and being honest about class balance. The model only started behaving well once the dataset reflected the visual variation that real leaves introduce in the field.',
            'That project reinforced a useful habit for computer vision work: treat preprocessing as part of model design. OpenCV pipelines, augmentation strategies, and label quality can completely change what the network learns. Once I started evaluating the full pipeline rather than only the CNN, the system became much more stable and useful.'
        ],
        category: 'ML Systems',
        topic: 'Computer Vision',
        date: '2026-03-04',
        readTime: '6 min read',
        tags: ['CNNs', 'OpenCV', 'Disease Detection'],
        popularity: 97
    },
    {
        id: 'ml-healthcare-classification',
        slug: 'designing-healthcare-ml-pipelines-that-stay-interpretable',
        title: 'Designing Healthcare ML Pipelines That Stay Interpretable',
        excerpt: 'What a liver disease classification project taught me about preprocessing, model comparison, and trust in prediction systems.',
        body: [
            'Healthcare prediction projects quickly remind you that accuracy alone is not enough. In my liver disease classification work, comparing Logistic Regression, Random Forest, SVM, and KNN was valuable because each model exposed a different balance of interpretability, robustness, and performance. The process mattered as much as the final score.',
            'I found that good preprocessing decisions made the results more trustworthy than any last-minute tuning trick. Missing value handling, feature scaling, class inspection, and careful evaluation created a pipeline that was easier to explain and defend. That experience made me appreciate interpretable machine learning as a product requirement, not just an academic preference.'
        ],
        category: 'ML Systems',
        topic: 'Healthcare ML',
        date: '2026-02-06',
        readTime: '6 min read',
        tags: ['Scikit-learn', 'Classification', 'Model Comparison'],
        popularity: 95
    },
    {
        id: 'ml-reinforcement-learning-snake',
        slug: 'what-snake-game-ai-taught-me-about-reinforcement-learning',
        title: 'What Snake Game AI Taught Me About Reinforcement Learning',
        excerpt: 'A reinforcement learning project that made exploration, reward design, and training stability finally feel concrete.',
        body: [
            'The Snake Game AI project made reinforcement learning click for me because every design mistake showed up immediately in behavior. A weak reward function produced dumb shortcuts, unstable exploration caused erratic policies, and poor replay settings slowed everything down. It was one of the clearest examples I have seen of how theory turns into engineering trade-offs.',
            'What I liked most was that the project rewarded iteration. Small changes to state representation, reward shaping, and training loops had visible impact. That made the learning process highly practical. Reinforcement learning can feel abstract in lectures, but a game environment turns it into something you can observe, debug, and improve step by step.'
        ],
        category: 'ML Systems',
        topic: 'Reinforcement Learning',
        date: '2026-01-10',
        readTime: '5 min read',
        tags: ['DQN', 'Reward Shaping', 'Neural Networks'],
        popularity: 92
    },
    {
        id: 'ml-student-research',
        slug: 'publishing-student-research-with-an-engineers-mindset',
        title: 'Publishing Student Research with an Engineer\'s Mindset',
        excerpt: 'My publication journey reinforced that research quality improves when you think clearly about systems, measurement, and communication.',
        body: [
            'Publishing a paper as a student was a different kind of challenge from building product demos. Research asks you to slow down, justify decisions, and communicate in a way that others can inspect. That process made me more careful about methodology and much more aware of how important clean explanation is to technical work.',
            'What stayed with me most was the discipline of measurement. Engineering projects often move fast, but research forces you to define what success means and how it is observed. Bringing that mindset back into project work has helped me build better experiments, write clearer documentation, and evaluate systems more thoughtfully.'
        ],
        category: 'ML Systems',
        topic: 'Student Research',
        date: '2025-12-01',
        readTime: '4 min read',
        tags: ['Research', 'Measurement', 'Technical Writing'],
        popularity: 89
    }
];

export const BLOG_COLLECTIONS: BlogCollection[] = [
    {
        id: 'ai-builder-notes',
        title: 'AI Builder Notes',
        eyebrow: 'Lalith Kumar Notes',
        description: 'Four essays on multi-modal AI products, local LLMs, semantic retrieval, and the engineering choices behind practical intelligent systems.',
        accent: '#9ed8ff',
        secondaryAccent: '#1c68a4',
        background: 'linear-gradient(145deg, #d9efff 0%, #6cb6ff 45%, #0d3557 100%)',
        shadow: 'rgba(22, 88, 146, 0.28)',
        variant: 'frame'
    },
    {
        id: 'ml-systems-journal',
        title: 'ML Systems Journal',
        eyebrow: 'Lalith Kumar Notes',
        description: 'Four project-backed essays on computer vision, healthcare ML, reinforcement learning, and research habits that improve model building.',
        accent: '#88d6b2',
        secondaryAccent: '#496f5c',
        background: 'linear-gradient(145deg, #ebfaf2 0%, #a8dfc3 40%, #456354 100%)',
        shadow: 'rgba(68, 99, 84, 0.28)',
        variant: 'dune'
    },
    {
        id: 'applied-intelligence',
        title: 'Applied Intelligence',
        eyebrow: 'Cross-cutting Collection',
        description: 'A blended shelf of posts focused on AI products, retrieval, computer vision, and practical system design.',
        accent: '#e7c071',
        secondaryAccent: '#977a33',
        background: 'linear-gradient(145deg, #fff3d4 0%, #f0cf81 40%, #8a6d2b 100%)',
        shadow: 'rgba(138, 109, 43, 0.24)',
        variant: 'sunrise'
    },
    {
        id: 'research-systems',
        title: 'Research and Systems',
        eyebrow: 'Cross-cutting Collection',
        description: 'A reliability-first read through healthcare ML, reinforcement learning experiments, transfer habits, and student research discipline.',
        accent: '#b6c8ff',
        secondaryAccent: '#465f9b',
        background: 'linear-gradient(145deg, #f0f4ff 0%, #cbd8ff 42%, #51699f 100%)',
        shadow: 'rgba(81, 105, 159, 0.24)',
        variant: 'horizon'
    }
];
