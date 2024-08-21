import DefaultLayout from "@/layouts/DefaultLayout";

const Welcome = () => {

    return (
        <>
            <DefaultLayout>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                    <h1>Welcome to dashboard</h1>
                </div>
            </DefaultLayout>
        </>
    );
}

export default Welcome;