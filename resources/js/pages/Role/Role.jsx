import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataTable from "@/common/DataTable";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getRoute} from "@/actions/appActions";

const column = [
    {
        Header: 'Name',
        accessor: 'role_name',
    },
    {
        Header: 'Session',
        accessor: 'session_control',
    },
    {
        Header: 'Redirect Url',
        accessor: 'redirect_url',
    },
    {
        Header: 'Created Date',
        accessor: 'created_at',
    },
];

const Role = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoute('/roles'))
            .then(response => {
                console.log(response.data);
                setData(response.data);
            });
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Company" />

            <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                <DataTable data={data} column={column} deleteUrl="roles"/>
            </div>
        </DefaultLayout>
    );
}

export default Role;

