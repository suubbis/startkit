import './bootstrap';
import '../css/app.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/style.css';
import '../css/satoshi.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <React.StrictMode>
                <Router>
                    <App {...props} />
                </Router>
            </React.StrictMode>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
