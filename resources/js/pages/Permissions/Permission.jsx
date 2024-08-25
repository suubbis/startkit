import DefaultLayout from "@/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getRoute} from "@/actions/appActions";
import CustomTable from "@/common/CustomTable";

const column = [
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Created Date',
        accessorKey: 'created_at',
    },
];

const Permission = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoute('/permissions'))
            .then(response => {
                console.log(response.data);
                setData(response.data);
            });
    }, []);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Permissions" />

            <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
                <CustomTable data={data} column={column} deleteUrl="permissions"/>
            </div>
        </DefaultLayout>
    );
}

export default Permission;

