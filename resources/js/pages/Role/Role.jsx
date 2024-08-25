import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomTable from "@/common/CustomTable";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getRoute} from "@/actions/appActions";

const column = [
    {
        header: 'Name',
        accessorKey: 'role_name',
    },
    {
        header: 'Session',
        accessorKey: 'session_control',
    },
    {
        header: 'Redirect Url',
        accessorKey: 'redirect_url',
    },
    {
        header: 'Created Date',
        accessorKey: 'created_at',
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
                <CustomTable data={data} column={column} deleteUrl="roles"/>
            </div>
        </DefaultLayout>
    );
}

export default Role;

