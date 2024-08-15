import React from 'react';

const GuestLayout = ({ children }) => {

    return (
        <div className="bg-white px-4 dark:bg-boxdark-2 sm:px-6">
            <div className="flex h-screen flex-col overflow-hidden">
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default GuestLayout;
