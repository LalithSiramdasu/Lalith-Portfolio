type ThemeName = 'blue' | 'red' | 'orange' | 'green';
type ModeName = 'light' | 'dark';

const setupArticleBehavior = () => {
    const root = document.documentElement;
    const progress = document.getElementById('reading-progress') as HTMLSpanElement | null;
    const sectionAnchors = Array.from(document.querySelectorAll<HTMLElement>('.section-anchor'));
    const navLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'));
    const themeOrder: ThemeName[] = ['blue', 'red', 'orange', 'green'];
    const themeStorageKey = 'backend-article-theme-choice-v2';
    const modeStorageKey = 'backend-article-mode-choice-v2';
    const defaultTheme = 'black';
    const defaultMode: ModeName = 'dark';
    const desktopThemeQuery = window.matchMedia('(min-width: 1100px)');

    let progressFrame = 0;
    let sectionOffsets = sectionAnchors.map(({ id, offsetTop }) => ({ id, offsetTop }));
    let activeNavId = '';
    let themeButtons: HTMLButtonElement[] = [];
    let defaultButton: HTMLButtonElement | null = null;
    let modeButton: HTMLButtonElement | null = null;

    const isDesktopViewport = () => desktopThemeQuery.matches;

    const getScrollTop = () => window.pageYOffset || root.scrollTop || document.body.scrollTop || 0;

    const updateSectionOffsets = () => {
        sectionOffsets = sectionAnchors.map(({ id, offsetTop }) => ({ id, offsetTop }));
    };

    const syncActiveNavIntoView = (link: HTMLElement) => {
        const container = link.parentElement;

        if (!container) {
            return;
        }

        const style = window.getComputedStyle(container);
        const canScrollX = /(auto|scroll)/.test(style.overflowX);
        const canScrollY = /(auto|scroll)/.test(style.overflowY);

        if (!canScrollX && !canScrollY) {
            return;
        }

        const behavior: ScrollBehavior = isDesktopViewport() ? 'smooth' : 'auto';

        if (canScrollX) {
            const targetLeft = link.offsetLeft - (container.clientWidth - link.offsetWidth) / 2;
            container.scrollTo({
                left: Math.max(0, targetLeft),
                behavior
            });
        }

        if (canScrollY) {
            const targetTop = link.offsetTop - (container.clientHeight - link.offsetHeight) / 2;
            container.scrollTo({
                top: Math.max(0, targetTop),
                behavior
            });
        }
    };

    const setActiveNav = (nextId: string) => {
        if (!nextId || activeNavId === nextId) {
            return;
        }

        activeNavId = nextId;

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('data-nav') === nextId;
            link.classList.toggle('is-active', isActive);

            if (isActive) {
                syncActiveNavIntoView(link);
            }
        });
    };

    const updateProgress = () => {
        if (!progress) {
            return;
        }

        const scrollTop = getScrollTop();
        const scrollHeight = root.scrollHeight - root.clientHeight;
        const width = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        progress.style.width = `${Math.max(0, Math.min(100, width))}%`;
    };

    const updateActiveNavFromScroll = () => {
        if (!sectionOffsets.length) {
            return;
        }

        const marker = getScrollTop() + (isDesktopViewport() ? 220 : 180);
        let nextId = sectionOffsets[0].id;

        for (const section of sectionOffsets) {
            if (section.offsetTop <= marker) {
                nextId = section.id;
            }
        }

        setActiveNav(nextId);
    };

    const requestChromeUpdate = () => {
        if (progressFrame) {
            return;
        }

        progressFrame = window.requestAnimationFrame(() => {
            progressFrame = 0;
            updateProgress();
            updateActiveNavFromScroll();
        });
    };

    const setStoredTheme = (themeName: ThemeName) => {
        try {
            window.localStorage.setItem(themeStorageKey, themeName);
        } catch (error) {
            return;
        }
    };

    const getStoredTheme = (): ThemeName | null => {
        try {
            const value = window.localStorage.getItem(themeStorageKey);
            return themeOrder.includes(value as ThemeName) ? (value as ThemeName) : null;
        } catch (error) {
            return null;
        }
    };

    const clearStoredTheme = () => {
        try {
            window.localStorage.removeItem(themeStorageKey);
        } catch (error) {
            return;
        }
    };

    const setStoredMode = (modeName: ModeName) => {
        try {
            window.localStorage.setItem(modeStorageKey, modeName);
        } catch (error) {
            return;
        }
    };

    const getStoredMode = (): ModeName | null => {
        try {
            const value = window.localStorage.getItem(modeStorageKey);
            return value === 'light' || value === 'dark' ? value : null;
        } catch (error) {
            return null;
        }
    };

    const resetThemeControls = () => {
        themeButtons = [];
        defaultButton = null;
        modeButton = null;
    };

    const applyTheme = (themeName: string) => {
        root.setAttribute('data-theme', themeName);

        if (defaultButton) {
            defaultButton.classList.toggle('is-active', themeName === defaultTheme);
        }

        themeButtons.forEach((button) => {
            button.classList.toggle('is-active', button.getAttribute('data-theme-choice') === themeName);
        });
    };

    const applyMode = (modeName: ModeName) => {
        root.setAttribute('data-mode', modeName);

        if (!modeButton) {
            return;
        }

        const isLight = modeName === 'light';
        const compactLabel = !isDesktopViewport();

        modeButton.classList.toggle('is-light', isLight);
        modeButton.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        modeButton.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        modeButton.textContent = isLight ? (compactLabel ? 'Dark' : 'Dark mode') : (compactLabel ? 'Light' : 'Light mode');
    };

    const createThemeSwitcher = () => {
        const rail = document.querySelector('.side-rail');

        if (!rail || rail.querySelector('.theme-switcher')) {
            return;
        }

        resetThemeControls();

        const switcher = document.createElement('div');
        const palette = document.createElement('div');
        const label = document.createElement('p');
        const tools = document.createElement('div');
        const options = document.createElement('div');

        switcher.className = 'theme-switcher';
        switcher.setAttribute('aria-label', 'Theme palette');
        palette.className = 'theme-palette';

        label.className = 'theme-switcher-label';
        label.textContent = 'Palette';

        tools.className = 'theme-tools';

        defaultButton = document.createElement('button');
        defaultButton.type = 'button';
        defaultButton.className = 'default-button default-sun';
        defaultButton.setAttribute('aria-label', 'Restore default theme');
        defaultButton.setAttribute('title', 'Restore default theme');
        defaultButton.addEventListener('click', () => {
            clearStoredTheme();
            applyTheme(defaultTheme);
        });

        modeButton = document.createElement('button');
        modeButton.type = 'button';
        modeButton.className = 'mode-button';
        modeButton.setAttribute('aria-pressed', 'false');
        modeButton.addEventListener('click', () => {
            const nextMode: ModeName = root.getAttribute('data-mode') === 'light' ? 'dark' : 'light';
            setStoredMode(nextMode);
            applyMode(nextMode);
        });

        options.className = 'theme-options';

        themeOrder.forEach((themeName) => {
            const button = document.createElement('button');
            const prettyName = `${themeName.charAt(0).toUpperCase()}${themeName.slice(1)}`;

            button.type = 'button';
            button.className = 'theme-button';
            button.setAttribute('data-theme-choice', themeName);
            button.setAttribute('aria-label', `${prettyName} theme`);
            button.title = `${prettyName} theme`;
            button.addEventListener('click', () => {
                setStoredTheme(themeName);
                applyTheme(themeName);
            });

            themeButtons.push(button);
            options.appendChild(button);
        });

        tools.append(modeButton, options, defaultButton);
        palette.append(label, tools);
        switcher.appendChild(palette);
        rail.appendChild(switcher);
    };

    const initializeThemeChrome = () => {
        createThemeSwitcher();
        applyTheme(getStoredTheme() || defaultTheme);
        applyMode(getStoredMode() || defaultMode);
    };

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const id = link.getAttribute('data-nav');

            if (id) {
                setActiveNav(id);
            }

            if (!isDesktopViewport()) {
                window.setTimeout(() => link.blur(), 0);
            }
        });
    });

    window.addEventListener('scroll', requestChromeUpdate, { passive: true });
    window.addEventListener('resize', () => {
        updateSectionOffsets();
        initializeThemeChrome();
        requestChromeUpdate();
    });

    if (typeof desktopThemeQuery.addEventListener === 'function') {
        desktopThemeQuery.addEventListener('change', () => {
            updateSectionOffsets();
            initializeThemeChrome();
            requestChromeUpdate();
        });
    } else if (typeof desktopThemeQuery.addListener === 'function') {
        desktopThemeQuery.addListener(() => {
            updateSectionOffsets();
            initializeThemeChrome();
            requestChromeUpdate();
        });
    }

    initializeThemeChrome();
    updateSectionOffsets();
    requestChromeUpdate();
};

export default setupArticleBehavior;
