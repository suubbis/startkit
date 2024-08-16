import React from 'react';
import '../css/app.css'
import '../css/satoshi.css'

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import RouteList from "@/RouteList.tsx";
import {Provider} from "react-redux";
import store from "@/store";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <React.StrictMode>
                <Provider store={store}>
                    <RouteList />
                </Provider>
                {/*<Router>*/}
                {/*    <App {...props} />*/}
                {/*</Router>*/}
            </React.StrictMode>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
