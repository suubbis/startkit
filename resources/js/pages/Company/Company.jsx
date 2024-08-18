import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CompanyTable from "@/pages/Company/CompanyTable";

const Company = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Company" />

            <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                <CompanyTable />
            </div>
        </DefaultLayout>

        // <DefaultLayout>
        //     <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        //         <h1>Welcome to Company page</h1>
        //     </div>
        // </DefaultLayout>
    );
}

export default Company;

