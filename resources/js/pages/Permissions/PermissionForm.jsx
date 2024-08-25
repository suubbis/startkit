import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layouts/DefaultLayout';
import {getRoute, patchRoute, postRoute} from "@/actions/appActions";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";

const PermissionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(getRoute(`/permissions/${id}`))
          .then(response => {
            const data = response.data;
            console.log(data);
            setFormData({
              name: data.name || '',
            });
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
  }, [id]);

  // Handle input change for text inputs and select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const data = {
        name: formData.name,
    };
    dispatch(id ? patchRoute(`/permissions/${id}`, data, true)  : postRoute(`/permissions`, data, true))
        .then(response => {
          const data = response;
          console.log(data);
          if (data.status) {
            navigate('/permissions');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  };

  return (
      <DefaultLayout>
        <Breadcrumb pageName={id ? "Edit Permission" : "Create Permission"} />
        <div className="p-6.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-5">
              <label className="block text-sm font-medium text-black dark:text-white">Name</label>
              <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="w-full mt-2 mb-4 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <button
                onClick={handleSubmit}
                type="button"
                className="w-full rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
            >
              {id ? "Update Permission" : "Create Permission"}
            </button>
        </div>
      </DefaultLayout>
  );
};

export default PermissionForm;