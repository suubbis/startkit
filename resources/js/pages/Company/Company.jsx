import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomTable from "@/common/CustomTable";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getRoute} from "@/actions/appActions";

const column = [
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Abbreviation',
        accessorKey: 'abbreviation',
    },
    {
        header: 'Address',
        accessorKey: 'address',
    },
    {
        header: 'Manager',
        accessorKey: 'manager.first_name',
    },
    {
        header: 'Phone',
        accessorKey: 'phone',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Website',
        accessorKey: 'website',
    },
    {
        header: 'Created Date',
        accessorKey: 'created_at',
    },
];

const Company = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoute('/company-details'))
            .then(response => {
                console.log(response.data);
                setData(response.data);
            });
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Company" />

            <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                <CustomTable data={data} column={column} deleteUrl="company-details"/>
            </div>
        </DefaultLayout>
    );
}

export default Company;

