import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomTable from "@/common/CustomTable";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getRoute} from "@/actions/appActions";

const column = [
    {
        header: 'First Name',
        accessorKey: 'first_name',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Phone Number',
        accessorKey: 'phone_number',
    },
    {
        header: 'Supervisor',
        accessorKey: 'supervisor.first_name',
    },
    {
        header: 'Role',
        accessorKey: 'role.role_name',
    },
    {
        header: 'Username',
        accessorKey: 'username',
    },
    {
        header: 'Date of Birth',
        accessorKey: 'date_of_birth',
    },
    {
        header: 'Created Date',
        accessorKey: 'created_at',
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
                <CustomTable data={data} column={column} deleteUrl="users"/>
            </div>
        </DefaultLayout>
    );
}

export default Staff;

