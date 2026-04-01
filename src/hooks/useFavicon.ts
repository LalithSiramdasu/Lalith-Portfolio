import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Map routes to their favicon identifiers
const ROUTE_FAVICON_MAP: Record<string, string> = {
    '/': 'home',
    '/about': 'about',
    '/resume': 'resume',
    '/projects': 'projects',
    '/blogs': 'blogs',
    '/contact': 'contact',
    '/skills': 'skills',
    '/education': 'education',
    '/certifications': 'certifications',
    '/coding-profiles': 'coding',
    '/privacy': 'legal',
    '/terms': 'legal',
};

/**
 * Custom hook to dynamically change the favicon based on the current page.
 * Uses animated SVG favicons for a modern, dynamic feel.
 */
export const useFavicon = (overrideFavicon?: string) => {
    const location = useLocation();

    useEffect(() => {
        const faviconId = overrideFavicon || ROUTE_FAVICON_MAP[location.pathname] || 'home';
        const faviconPath = `/favicons/${faviconId}.svg`;

        // Find existing favicon links
        let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");

        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }

        link.type = 'image/svg+xml';
        link.href = faviconPath;

        // Also update shortcut icon for broader compatibility
        let shortcutLink = document.querySelector<HTMLLinkElement>("link[rel='shortcut icon']");
        if (shortcutLink) {
            shortcutLink.type = 'image/svg+xml';
            shortcutLink.href = faviconPath;
        }

        return () => {
            // Cleanup not needed as we want favicon to persist
        };
    }, [location.pathname, overrideFavicon]);
};

export default useFavicon;
