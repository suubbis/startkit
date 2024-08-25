import React, {useEffect, useState} from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layouts/DefaultLayout';
import {getRoute, patchRoute, postRoute} from "@/actions/appActions";
import {useDispatch} from "react-redux";

const daysOptions = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const AccessControl = () => {
    const dispatch = useDispatch();
    const [roleOptions, setRoleOptions] = useState([]);
    const [formData, setFormData] = useState({
        role: '',
        fromTime: '',
        toTime: '',
        days: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            days: {
                ...formData.days,
                [name]: checked,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const data = {
            role_id: formData.role,
            start_time: formData.fromTime,
            end_time: formData.toTime,
            schedule_monday: formData.days.monday,
            schedule_tuesday: formData.days.tuesday,
            schedule_wednesday: formData.days.wednesday,
            schedule_thursday: formData.days.thursday,
            schedule_friday: formData.days.friday,
            schedule_saturday: formData.days.saturday,
            schedule_sunday: formData.days.sunday,
        }

        dispatch(postRoute('access-controls', data, true))
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    };

    const handleRoleChange = (e) => {
        const { value } = e.target;
        getAccessDetails(value);
    }

    const getAccessDetails = ($roleId) =>{
        dispatch(getRoute(`/access-controls/${$roleId}`))
            .then(response => {
                const data = response.data;
                console.log(data);
                if (data){
                    setFormData({
                        ...formData,
                        role: data.role_id,
                        fromTime: data.start_time,
                        toTime: data.end_time,
                        days: {
                            ...formData.days,
                            monday: !!data.schedule_monday,
                            tuesday: !!data.schedule_tuesday,
                            wednesday: !!data.schedule_wednesday,
                            thursday: !!data.schedule_thursday,
                            friday: !!data.schedule_friday,
                            saturday: !!data.schedule_saturday,
                            sunday: !!data.schedule_sunday,
                        },
                    });
                }else{
                    setFormData({
                        ...formData,
                        role: $roleId,
                        fromTime: '',
                        toTime: '',
                        days: {
                            monday: false,
                            tuesday: false,
                            wednesday: false,
                            thursday: false,
                            friday: false,
                            saturday: false,
                            sunday: false,
                        },
                    })
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    useEffect(() => {
        dispatch(getRoute(`/roles`))
            .then(response => {
                const data = response.data;
                console.log(data);
                setRoleOptions(data.map((role) => {
                    return {'text': role.role_name, 'value': role.id};
                }));
                console.log(roleOptions);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Access Control" />

            <div className=" sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="p-6.5">
                            <div className="mb-5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Select Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleRoleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                >
                                    <option value="">Select Role</option>
                                    {
                                        roleOptions.map((role) => (
                                            <option key={role.value} value={role.value}>{role.text}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        From
                                    </label>
                                    <input
                                        type="time"
                                        name="fromTime"
                                        value={formData.fromTime}
                                        onChange={handleInputChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        To
                                    </label>
                                    <input
                                        type="time"
                                        name="toTime"
                                        value={formData.toTime}
                                        onChange={handleInputChange}
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-5">
                                <label className="block text-sm font-medium text-black dark:text-white">
                                    Days
                                </label>
                                <div className="flex space-x-4">
                                    {daysOptions.map((day) => (
                                        <div key={day} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name={day}
                                                checked={formData.days[day]}
                                                onChange={handleCheckboxChange}
                                                className="mr-2"
                                            />
                                            <label
                                                className="text-sm font-medium text-black dark:text-white capitalize">
                                                {day}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-5">
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AccessControl;