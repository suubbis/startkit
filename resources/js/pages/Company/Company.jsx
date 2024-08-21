import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataTable from "@/common/DataTable";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getRoute} from "@/actions/appActions";

const column = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Abbreviation',
        accessor: 'abbreviation',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Manager',
        accessor: 'manager_id',
    },
    {
        Header: 'Phone',
        accessor: 'phone',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Website',
        accessor: 'website',
    },
    {
        Header: 'Created Date',
        accessor: 'created_at',
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
                <DataTable data={data} column={column} deleteUrl="company-details"/>
            </div>
        </DefaultLayout>
    );
}

export default Company;

