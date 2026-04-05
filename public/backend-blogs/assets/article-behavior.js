(function () {
  var root = document.documentElement;
  var progress = document.getElementById("reading-progress");
  var articleRoot = document.querySelector(".reading-shell");
  var sectionAnchors = Array.prototype.slice.call(document.querySelectorAll(".section-anchor"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var themeOrder = ["blue", "red", "orange", "green"];
  var themeButtons = [];
  var defaultButton = null;
  var modeButton = null;
  var desktopThemeQuery = window.matchMedia("(min-width: 1100px)");
  var isDesktopViewport = function () {
    return desktopThemeQuery.matches;
  };
  var progressFrame = 0;
  var pendingActiveNavId = null;
  var defaultTheme = "black";
  var defaultMode = "dark";
  var themeStorageKey = "backend-article-theme-choice-v2";
  var modeStorageKey = "backend-article-mode-choice-v2";

  function resetThemeControls() {
    themeButtons = [];
    defaultButton = null;
    modeButton = null;
  }

  function setStoredTheme(themeName) {
    try {
      window.localStorage.setItem(themeStorageKey, themeName);
    } catch (error) {
      return;
    }
  }

  function getStoredTheme() {
    try {
      var value = window.localStorage.getItem(themeStorageKey);
      return themeOrder.indexOf(value) === -1 ? null : value;
    } catch (error) {
      return null;
    }
  }

  function clearStoredTheme() {
    try {
      window.localStorage.removeItem(themeStorageKey);
    } catch (error) {
      return;
    }
  }

  function setStoredMode(modeName) {
    try {
      window.localStorage.setItem(modeStorageKey, modeName);
    } catch (error) {
      return;
    }
  }

  function getStoredMode() {
    try {
      var value = window.localStorage.getItem(modeStorageKey);
      return value === "light" || value === "dark" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function applyTheme(themeName) {
    root.setAttribute("data-theme", themeName);

    if (defaultButton) {
      defaultButton.classList.toggle("is-active", themeName === defaultTheme);
    }

    themeButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-theme-choice") === themeName);
    });
  }

  function applyMode(modeName) {
    root.setAttribute("data-mode", modeName);

    if (modeButton) {
      var isLight = modeName === "light";
      var isCompactViewport = !isDesktopViewport();

      modeButton.classList.toggle("is-light", isLight);
      modeButton.setAttribute("aria-pressed", isLight ? "true" : "false");
      modeButton.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
      modeButton.textContent = isLight ? (isCompactViewport ? "Dark" : "Dark mode") : (isCompactViewport ? "Light" : "Light mode");
    }
  }

  function createThemeSwitcher() {
    var rail = document.querySelector(".side-rail");

    if (!rail) {
      return;
    }

    if (rail.querySelector(".theme-switcher")) {
      return;
    }

    resetThemeControls();

    var switcher = document.createElement("div");
    var palette = document.createElement("div");
    var label = document.createElement("p");
    var tools = document.createElement("div");
    var options = document.createElement("div");

    switcher.className = "theme-switcher";
    switcher.setAttribute("aria-label", "Theme palette");
    palette.className = "theme-palette";

    label.className = "theme-switcher-label";
    label.textContent = "Palette";

    tools.className = "theme-tools";

    defaultButton = document.createElement("button");
    defaultButton.type = "button";
    defaultButton.className = "default-button default-sun";
    defaultButton.setAttribute("aria-label", "Restore default theme");
    defaultButton.setAttribute("title", "Restore default theme");

    defaultButton.addEventListener("click", function () {
      clearStoredTheme();
      applyTheme(defaultTheme);
    });

    modeButton = document.createElement("button");
    modeButton.type = "button";
    modeButton.className = "mode-button";
    modeButton.setAttribute("aria-pressed", "false");

    modeButton.addEventListener("click", function () {
      var nextMode = root.getAttribute("data-mode") === "light" ? "dark" : "light";
      setStoredMode(nextMode);
      applyMode(nextMode);
    });

    options.className = "theme-options";

    themeOrder.forEach(function (themeName) {
      var button = document.createElement("button");
      var prettyName = themeName.charAt(0).toUpperCase() + themeName.slice(1);

      button.type = "button";
      button.className = "theme-button";
      button.setAttribute("data-theme-choice", themeName);
      button.setAttribute("aria-label", prettyName + " theme");
      button.title = prettyName + " theme";

      button.addEventListener("click", function () {
        setStoredTheme(themeName);
        applyTheme(themeName);
      });

      themeButtons.push(button);
      options.appendChild(button);
    });

    tools.appendChild(modeButton);
    tools.appendChild(options);
    tools.appendChild(defaultButton);
    palette.appendChild(label);
    palette.appendChild(tools);
    switcher.appendChild(palette);
    rail.appendChild(switcher);
  }

  function destroyThemeSwitcher() {
    var existing = document.querySelector(".theme-switcher");

    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }

    resetThemeControls();
  }

  function initializeThemePicker() {
    createThemeSwitcher();
    applyTheme(getStoredTheme() || defaultTheme);
    applyMode(getStoredMode() || defaultMode);
  }

  function syncResponsiveChrome() {
    createThemeSwitcher();
    applyTheme(getStoredTheme() || defaultTheme);
    applyMode(getStoredMode() || defaultMode);
  }

  function updateProgress() {
    if (!progress) {
      return;
    }

    var scrollTop = root.scrollTop || document.body.scrollTop;
    var scrollHeight = root.scrollHeight - root.clientHeight;
    var width = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progress.style.width = Math.max(0, Math.min(100, width)) + "%";
  }

  function getScrollTop() {
    return window.pageYOffset || root.scrollTop || document.body.scrollTop || 0;
  }

  function updateActiveNavFromScroll() {
    if (!sectionAnchors.length) {
      return;
    }

    var marker = getScrollTop() + (isDesktopViewport() ? 220 : 180);
    var activeId = sectionAnchors[0].id;

    sectionAnchors.forEach(function (section) {
      if (section.offsetTop <= marker) {
        activeId = section.id;
      }
    });

    setActiveNav(activeId);
  }

  function requestProgressUpdate() {
    if (progressFrame) {
      return;
    }

    progressFrame = window.requestAnimationFrame(function () {
      progressFrame = 0;
      updateProgress();
      updateActiveNavFromScroll();
    });
  }

  function syncActiveNavIntoView(link) {
    if (!link || typeof link.scrollIntoView !== "function") {
      return;
    }

    var container = link.parentElement;

    if (!container) {
      return;
    }

    if (!isDesktopViewport() && container.classList && container.classList.contains("rail-nav")) {
      return;
    }

    var style = window.getComputedStyle(container);
    var canScrollX = /(auto|scroll)/.test(style.overflowX);
    var canScrollY = /(auto|scroll)/.test(style.overflowY);

    if (!canScrollX && !canScrollY) {
      return;
    }

    var scrollBehavior = isDesktopViewport() ? "smooth" : "auto";

    if (canScrollX) {
      var targetLeft = link.offsetLeft - (container.clientWidth - link.offsetWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: scrollBehavior
      });
    }

    if (canScrollY) {
      var targetTop = link.offsetTop - (container.clientHeight - link.offsetHeight) / 2;
      container.scrollTo({
        top: Math.max(0, targetTop),
        behavior: scrollBehavior
      });
    }
  }

  function setActiveNav(id) {
    if (pendingActiveNavId === id) {
      return;
    }

    pendingActiveNavId = id;

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("data-nav") === id;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        syncActiveNavIntoView(link);
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      var id = link.getAttribute("data-nav");

      if (id) {
        setActiveNav(id);
      }

      if (!isDesktopViewport()) {
        window.setTimeout(function () {
          link.blur();
        }, 0);
      }
    });
  });


  window.addEventListener("scroll", requestProgressUpdate, { passive: true });
  window.addEventListener("resize", requestProgressUpdate);
  window.addEventListener("resize", syncResponsiveChrome);

  if (typeof desktopThemeQuery.addEventListener === "function") {
    desktopThemeQuery.addEventListener("change", syncResponsiveChrome);
  } else if (typeof desktopThemeQuery.addListener === "function") {
    desktopThemeQuery.addListener(syncResponsiveChrome);
  }

  initializeThemePicker();
  requestProgressUpdate();
})();

