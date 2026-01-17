// router.ts
import { html, render, type TemplateResult } from 'lit';
export * as Component from './Component/index.js';
export * as Page from './Page/index.js';
export * as Style from './Style/index.js';

// Set this to the subfolder your app is deployed in (e.g., '/my-app')
// If deployed at root, just use '/'
const BASE_PATH = '/admin';

// Define static routes
type Route = {
    path: string;
    render: () => TemplateResult;
};

const routes: Route[] = [
    { path: '/', render: () => html`<admin-pwa-page-overview></admin-pwa-page-overview>` },
    { path: '/search-modules', render: () => html`<admin-pwa-page-search-modules></admin-pwa-page-search-modules>` },
    { path: '/settings', render: () => html`<admin-pwa-page-settings></admin-pwa-page-settings>` },
];

// Root element
const root = document.getElementById('app')!;

// Remove base path from current location for route matching
function getRoutePath(): string {
    let path = location.pathname;
    if (path.startsWith(BASE_PATH)) {
        path = path.slice(BASE_PATH.length) || '/';
    }
    return path;
}

// Render a route
function renderRoute() {
    const path = getRoutePath();
    const route = routes.find((r) => r.path === path);
    if (route) {
        render(route.render(), root);
    } else {
        render(html`<h1>404</h1><p>Page not found</p>`, root);
    }
}

// Navigate programmatically
export function navigate(path: string) {
    history.pushState({}, '', BASE_PATH + path);
    renderRoute();
}

// Handle browser forward/back
window.addEventListener('popstate', renderRoute);

// Intercept internal link clicks
document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('/')) {
            e.preventDefault();
            navigate(href);
        }
    }
});

// Initial render
renderRoute();
