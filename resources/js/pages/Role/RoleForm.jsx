import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layouts/DefaultLayout';
import {getRoute, patchRoute, postRoute} from "@/actions/appActions";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

const sessionExpiryOptions = [
  { value: 'Default', text: 'Default (from system settings)' },
  { value: '5 minutes', text: '5 minutes' },
  { value: '10 minutes', text: '10 minutes' },
  { value: '30 minutes', text: '30 minutes' },
  { value: '1 hour', text: '1 hour' },
  { value: 'No expiry', text: 'No expiry' },
];

const RoleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [permissions, setPermissions] = useState([]);
  const [formData, setFormData] = useState({
    roleName: '',
    sessionControl: '',
    roleUrl: '',
    permissions: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(getRoute(`/roles/${id}`))
          .then(response => {
            const data = response.data;
            console.log(data);

            setFormData({
              roleName: data.role_name || '',
              sessionControl: data.session_control || '',
              roleUrl: data.redirect_url || '',
              permissions: data.permissions.map((permission) => {
                  return permission.id;
              }) || [],
            });
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
  }, [id]);

useEffect(() => {
    dispatch(getRoute(`/permissions`))
        .then(response => {
            const data = response.data;
            console.log(data);
            setPermissions(data.map((permission) => {
                return {'value': permission.id, 'text': permission.name}
            }));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}, []);

  // Handle input change for text inputs and select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox change for permissions
    const handlePermissionChange = (permission) => {
        setFormData((prevData) => {
            const updatedPermissions = prevData.permissions.includes(permission)
                ? prevData.permissions.filter((p) => p !== permission)
                : [...prevData.permissions, permission];

            return {
                ...prevData,
                permissions: updatedPermissions,
            };
        });

        console.log(formData.permissions);
    };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const data = {
        role_name: formData.roleName,
        session_control: formData.sessionControl,
        redirect_url: formData.roleUrl,
        permissions: formData.permissions,
        };
    dispatch(id ? patchRoute(`/roles/${id}`, data, true)  : postRoute(`/roles`, data, true))
        .then(response => {
         if (response.status) {
           navigate('/role');
         }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  };

    const handleSelectAllChange = () => {
        setFormData((prevData) => {
            const allPermissionsSelected = permissions.every((permission) =>
                prevData.permissions.includes(permission.value)
            );

            return {
                ...prevData,
                permissions: allPermissionsSelected ? [] : permissions.map((p) => p.value),
            };
        });
    };

  return (
      <DefaultLayout>
        <Breadcrumb pageName={id ? "Edit Role" : "Create New Role"} />
        <div className="p-6.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-5">
              <label className="block text-sm font-medium text-black dark:text-white">Role Name</label>
              <input
                  type="text"
                  name="roleName"
                  value={formData.roleName}
                  onChange={handleChange}
                  placeholder="Enter role name"
                  className="w-full mt-2 mb-4 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <label className="block text-sm font-medium text-black dark:text-white">Session Control</label>
              <select
                  name="sessionControl"
                  value={formData.sessionControl}
                  onChange={handleChange}
                  className="w-full mt-2 mb-4 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              >
                <option value="">Select Option</option>
                {sessionExpiryOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.text}</option>
                ))}
              </select>
              <label className="block text-sm font-medium text-black dark:text-white">Role Direct URL</label>
              <input
                  type="text"
                  name="roleUrl"
                  value={formData.roleUrl}
                  onChange={handleChange}
                  placeholder="Enter direct URL"
                  className="w-full mt-2 mb-4 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-5">
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={permissions.every((permission) =>
                            formData.permissions.includes(permission.value)
                        )}
                        onChange={handleSelectAllChange}
                        className="mr-2 rounded text-primary"
                    />
                    <label className="text-sm text-black dark:text-white capitalize">
                        Select All
                    </label>
                </div>
                <div className="grid grid-cols-5 gap-6">
                    {permissions.map((permission) => (
                        <div key={permission.value} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.permissions.includes(permission.value)}
                                onChange={() => handlePermissionChange(permission.value)}
                                className="mr-2 rounded text-primary"
                            />
                            <label className="text-sm text-black dark:text-white capitalize">{permission.text}</label>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                type="button"
                className="w-full rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
            >
                {id ? "Update Role" : "Create Role"}
            </button>
        </div>
      </DefaultLayout>
  );
};

export default RoleForm;