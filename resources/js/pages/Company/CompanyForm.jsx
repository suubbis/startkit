import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layouts/DefaultLayout';
import SelectGroupThree from "@/components/Forms/SelectGroup/SelectGroupThree";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getRoute, patchRoute, postRoute} from "@/actions/appActions";
import { useParams } from 'react-router-dom';
import {Field, Input, Label, Select} from "@headlessui/react";

const CompanyForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [abbreviation, setAbbreviation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [logo, setLogo] = useState('');
    const [manager, setManager] = useState('');


  useEffect(() => {
    if (id) {
      dispatch(getRoute(`/company-details/${id}`))
            .then(response => {
              const data = response.data;
                console.log(data);
                setName(data.name);
                setAbbreviation(data.abbreviation);
                setEmail(data.email);
                setPhone(data.phone);
                setAddress(data.address);
                setWebsite(data.website);
                setLogo(data.logo);
                setManager(data.manager_id);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
  }, [id]);

  const pageTitle = id ? 'Update' : 'Create';

    const submitForm = () => {
        const data = {
            name,
            abbreviation,
            email,
            phone,
            address,
            website,
            logo,
            manager,
        };
        console.log(data);
        dispatch(id ? patchRoute(`/company-details/${id}`, data, true) : postRoute('/company-details', data))
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
  return (
    <DefaultLayout>
      <Breadcrumb pageName={`${pageTitle} Company`} />

      <div className=" sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="#">
              <div className="p-6.5">
                <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Field>
                      <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Name
                      </Label>
                      <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Enter company name"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </Field>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <Field>
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Abbreviation
                    </Label>
                    <Input
                        value={abbreviation}
                        onChange={(e) => setAbbreviation(e.target.value)}
                        type="text"
                        placeholder="Enter company abbreviation"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </Field>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Field>
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email
                    </Label>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="yourmail@gmail.com"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </Field>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <Field>
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone
                    </Label>
                    <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        placeholder="(321) 5555-0115"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </Field>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Field>
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Address
                    </Label>
                    <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="Type your address"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </Field>
                  </div>
                  <div className="w-full xl:w-1/2">
                    <Field>
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Website
                    </Label>
                    <Input
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        type="text"
                        placeholder="Type your website"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </Field>
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <Field>
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Logo
                    </Label>
                    <Input
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                        type="file"
                        placeholder="Upload your logo"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    </Field>
                  </div>
                  <Field>
                    <Label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Manager
                    </Label>
                    <Select
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                        <option value="1">Manager 1</option>
                        <option value="2">Manager 2</option>
                        <option value="3">Manager 3</option>
                    </Select>
                  </Field>
                </div>

                <button
                    onClick={submitForm}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  {`${pageTitle} Company`}
                </button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CompanyForm;
