import { Head } from '@inertiajs/react';
import DefaultLayout from "@/layouts/DefaultLayout.tsx";

const Dashboard = () => {
    return (
        <DefaultLayout
            user={'Test'}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Dashboard;

