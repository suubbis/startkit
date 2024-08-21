import {useEffect, useState} from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layouts/DefaultLayout';
import SelectGroupThree from "@/components/Forms/SelectGroup/SelectGroupThree";
import {getRoute, patchRoute, postRoute} from "@/actions/appActions";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {toastAlert} from "@/helpers/Functions";

const StaffForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    supervisor: '',
    role: '',
    username: '',
    password: '',
    sendNotification: false,
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const supervisorOptions = [
    { value: '', text: 'Select Supervisor' },
    { value: '1', text: 'Supervisor 1' },
    { value: '2', text: 'Supervisor 2' },
  ];

  const roleOptions = [
    { value: '', text: 'Select Role' },
    { value: 'admin', text: 'Administrator' },
    { value: 'editor', text: 'Editor' },
    { value: 'viewer', text: 'Viewer' },
  ];
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getRoute(`/users/${id}`))
          .then(response => {
            const data = response.data;
            console.log(data);
            setFormData({
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phoneNumber: data.phone_number,
              address: data.address,
              dateOfBirth: data.date_of_birth,
              supervisor: data.supervisor_id,
              role: data.role_id,
              username: data.username,
              sendNotification: data.send_notification,
            });
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
  }, [id]);

  const pageTitle = id ? 'Update' : 'Create';

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here, you would send formData to your backend for processing (create or update)
      console.log('Submitting:', formData);
      // Replace with actual API call
      // const response = await apiCall(formData);

      dispatch(id ? patchRoute(`/users/${id}`, formData, true) : postRoute('/users', formData))
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            toastAlert('error', error.message);
            console.error('Error fetching data:', error);
          });
    } catch (error) {
      console.error('Error submitting form:', error);
      toastAlert('error', error.message);
    }
  };

  return (
      <DefaultLayout>
        <Breadcrumb pageName={`${pageTitle} Staff`} />

        <div className="sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* Personal Information Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="p-6.5">
                  <h3 className="mb-5 text-lg font-semibold text-black dark:text-white">Personal Information</h3>
                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        First Name
                      </label>
                      <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter First Name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Last Name
                      </label>
                      <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter Last Name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Email
                      </label>
                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter Email"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Phone Number
                      </label>
                      <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Enter Phone Number"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Address
                      </label>
                      <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Enter Address"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Date of Birth
                      </label>
                      <input
                          type="text"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          placeholder="dd/mm/yyyy"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Supervisor
                      </label>
                      <SelectGroupThree
                          name="supervisor"
                          value={formData.supervisor}
                          onChange={(value) => setFormData({ ...formData, supervisor: value })}
                          options={supervisorOptions}
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Role
                      </label>
                      <SelectGroupThree
                          name="role"
                          value={formData.role}
                          onChange={(value) => setFormData({ ...formData, role: value })}
                          options={roleOptions}
                      />
                    </div>
                  </div>

                  <div className="mb-5 flex items-center">
                    <input
                        type="checkbox"
                        id="viewJournalEntry"
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        disabled
                    />
                    <label htmlFor="viewJournalEntry" className="text-sm font-medium text-black dark:text-white">
                      View Journal Entry Information
                    </label>
                  </div>
                </div>
            </div>

            {/* Account Information Card */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-6.5">
                <h3 className="mb-5 text-lg font-semibold text-black dark:text-white">Account Information</h3>
                <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter Username"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter Password"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-sm text-gray-500 dark:text-gray-300"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mb-5 flex items-center">
                  <input
                      type="checkbox"
                      name="sendNotification"
                      checked={formData.sendNotification}
                      onChange={handleCheckboxChange}
                      id="sendNotification"
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="sendNotification" className="text-sm font-medium text-black dark:text-white">
                    Send Notification
                  </label>
                </div>
              </div>
            </div>

            <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {`${pageTitle} Staff`}
            </button>
          </div>
        </div>
      </DefaultLayout>
  );
};

export default StaffForm;