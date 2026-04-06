import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configuredAppRoot = process.env.BACKEND_BLOGS_APP_ROOT;
const configuredSourceRoot = process.env.BACKEND_BLOGS_SOURCE_ROOT;

export const backendBlogsAppRoot = configuredAppRoot
    ? path.resolve(configuredAppRoot)
    : path.resolve(__dirname, '..', '..');
export const backendBlogsSourceRoot = configuredSourceRoot
    ? path.resolve(configuredSourceRoot)
    : path.join(backendBlogsAppRoot, 'source');

const readJsonLdScript = ($) => {
    const scripts = $('script[type="application/ld+json"]').toArray();

    return scripts.map((script) => {
        const raw = $(script).html()?.trim() ?? '';

        if (!raw) {
            return '';
        }

        try {
            return JSON.stringify(JSON.parse(raw));
        } catch (error) {
            return raw;
        }
    });
};

const extractTopicNumber = ($, slug) => {
    const eyebrowText = $('.eyebrow').first().text().trim();
    const topicMatch = eyebrowText.match(/Topic\s+([0-9.]+)/i);

    if (topicMatch?.[1]) {
        return topicMatch[1];
    }

    const slugMatch = slug.match(/^topic-([0-9]+(?:-[0-9]+)?)/i);

    return slugMatch?.[1]?.replace('-', '.') ?? '';
};

export const listBackendArticleSlugs = () =>
    fs
        .readdirSync(backendBlogsSourceRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name.startsWith('topic-') && fs.existsSync(path.join(backendBlogsSourceRoot, entry.name, 'index.html')))
        .map((entry) => entry.name)
        .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

export const readBackendArticle = (slug) => {
    const inputPath = path.join(backendBlogsSourceRoot, slug, 'index.html');
    const html = fs.readFileSync(inputPath, 'utf8');
    const $ = load(html);
    const [articleJsonLd = '', breadcrumbJsonLd = ''] = readJsonLdScript($);
    const pageFrameHtml = $('.page-frame').prop('outerHTML')?.trim();
    const pageTitle =
        $('title').first().text().trim() ||
        $('meta[property="og:title"]').attr('content')?.trim() ||
        $('.article-hero h1').first().text().trim() ||
        slug;

    if (!pageFrameHtml) {
        throw new Error(`Missing .page-frame in ${inputPath}`);
    }

    return {
        slug,
        lang: $('html').attr('lang')?.trim() || 'en',
        topicNumber: extractTopicNumber($, slug),
        title: pageTitle,
        description: $('meta[name="description"]').attr('content')?.trim() || '',
        keywords: $('meta[name="keywords"]').attr('content')?.trim() || '',
        canonicalPath: $('link[rel="canonical"]').attr('href')?.trim() || './index.html',
        ogTitle: $('meta[property="og:title"]').attr('content')?.trim() || pageTitle,
        ogDescription:
            $('meta[property="og:description"]').attr('content')?.trim() ||
            $('meta[name="description"]').attr('content')?.trim() ||
            '',
        ogUrl: $('meta[property="og:url"]').attr('content')?.trim() || './index.html',
        twitterTitle: $('meta[name="twitter:title"]').attr('content')?.trim() || pageTitle,
        twitterDescription:
            $('meta[name="twitter:description"]').attr('content')?.trim() ||
            $('meta[name="description"]').attr('content')?.trim() ||
            '',
        publishedAt:
            $('script[type="application/ld+json"]')
                .filter((_, element) => ($(element).html() || '').includes('"@type": "Article"'))
                .first()
                .html()
                ?.match(/"datePublished":\s*"([^"]+)"/)?.[1] || '',
        updatedAt:
            $('script[type="application/ld+json"]')
                .filter((_, element) => ($(element).html() || '').includes('"@type": "Article"'))
                .first()
                .html()
                ?.match(/"dateModified":\s*"([^"]+)"/)?.[1] || '',
        tags: $('.topic-pills span')
            .toArray()
            .map((tag) => $(tag).text().trim())
            .filter(Boolean),
        articleJsonLd,
        breadcrumbJsonLd,
        pageFrameHtml
    };
};
