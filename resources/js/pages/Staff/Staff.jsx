import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import StaffTable from "@/pages/Staff/StaffTable";

const Staff = () => {
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Company" />

            <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                <StaffTable />
            </div>
        </DefaultLayout>
    );
}

export default Staff;

