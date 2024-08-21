import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DataTable from "@/common/DataTable";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getRoute} from "@/actions/appActions";

const column = [
    {
        Header: 'First Name',
        accessor: 'first_name',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Phone Number',
        accessor: 'phone_number',
    },
    {
        Header: 'Supervisor',
        accessor: 'supervisor',
    },
    {
        Header: 'Role',
        accessor: 'role',
    },
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Date of Birth',
        accessor: 'date_of_birth',
    },
    {
        Header: 'Created Date',
        accessor: 'created_at',
    },
];
const Staff = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoute('/users'))
            .then(response => {
                console.log(response.data);
                setData(response.data);
            });
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Staff" />

            <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                <DataTable data={data} column={column} deleteUrl="users"/>
            </div>
        </DefaultLayout>
    );
}

export default Staff;

