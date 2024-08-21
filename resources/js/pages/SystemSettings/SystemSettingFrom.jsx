import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layouts/DefaultLayout';
import {useDispatch} from "react-redux";
import {postRoute} from "@/actions/appActions";

const dateFormatOptions = [
  { value: 'YYYY-MM-DD', text: 'YYYY-MM-DD' },
  { value: 'DD-MM-YYYY', text: 'DD-MM-YYYY' },
  { value: 'MM-DD-YYYY', text: 'MM-DD-YYYY' },
];

const numberFormatOptions = [
  { value: '##.##', text: '##.##' },
  { value: '##.###', text: '##.###' },
  { value: '##.####', text: '##.####' },
  { value: '##.#####', text: '##.#####' },
];

const timeFormatOptions = [
  { value: 'HH:MM:SS XM', text: 'HH:MM:SS XM' },
  { value: 'HH:MM', text: 'HH:MM' },
  { value: 'HH:MM XM', text: 'HH:MM XM' },
];

const listTableFormatOptions = [
  { value: 'Ascending', text: 'Ascending' },
  { value: 'Descending', text: 'Descending' },
];

const idFormatOptions = [
  { value: 'Regular ID', text: 'Regular ID' },
  { value: 'Custom ID', text: 'Custom ID' },
];

const backupScheduleOptions = [
  { value: 'Hourly', text: 'Hourly' },
  { value: 'Daily', text: 'Daily' },
  { value: 'Weekly', text: 'Weekly' },
  { value: 'Monthly', text: 'Monthly' },
  { value: 'Year', text: 'Year' },
];

const sessionExpiryOptions = [
  { value: '5 minutes', text: '5 minutes' },
  { value: '10 minutes', text: '10 minutes' },
  { value: '30 minutes', text: '30 minutes' },
  { value: '1 hour', text: '1 hour' },
  { value: 'No expiry', text: 'No expiry' },
];

const minPasswordScoreOptions = [
  { value: 'Weak', text: 'Weak: example' },
  { value: 'Fair', text: 'Fair: Example123' },
  { value: 'Strong', text: 'Strong: Exam@ple321' },
];

const loginAttemptsOptions = [
  { value: '3', text: '3' },
  { value: '5', text: '5' },
  { value: '10', text: '10' },
];

const loginFailDelayOptions = [
  { value: '1 Minute', text: '1 Minute' },
  { value: '5 Minutes', text: '5 Minutes' },
  { value: '10 Minutes', text: '10 Minutes' },
  { value: '30 Minutes', text: '30 Minutes' },
  { value: '1 Hour', text: '1 Hour' },
  { value: '24 Hours', text: '24 Hours' },
];

const fetchCurrencyOptions = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data.map(country => ({
    value: country.currencies?.symbol || '',
    text: country.currencies?.name || '',
  }));
};

const SystemSettingForm = () => {
  const [formData, setFormData] = useState({
    dateFormat: '',
    numberFormat: '',
    timeFormat: '',
    listTableFormat: '',
    idFormat: '',
    defaultCurrency: '',
    usageFormat: '',
    backupSchedule: '',
    sessionExpiry: '',
    minPasswordScore: '',
    loginAttempts: '',
    loginFailDelay: '',
    twoFactorAuth: false,
  });
  const dispatch = useDispatch();
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    const loadCurrencyOptions = async () => {
      const options = await fetchCurrencyOptions();
      console.log(options)
      setCurrencyOptions(options);
    };

    loadCurrencyOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(postRoute('/system-settings', formData))
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
  }

  return (
      <DefaultLayout>
        <Breadcrumb pageName="System Settings" />

        <div className="sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <form action="#">
                <div className="p-6.5">
                  {/* Basic Information Card */}
                  <h3 className="mb-5 text-lg font-semibold text-black dark:text-white">Basic Information</h3>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Date Format
                      </label>
                      <select
                          name="dateFormat"
                          value={formData.dateFormat}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {dateFormatOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Number Format
                      </label>
                      <select
                          name="numberFormat"
                          value={formData.numberFormat}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {numberFormatOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Time Format
                      </label>
                      <select
                          name="timeFormat"
                          value={formData.timeFormat}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {timeFormatOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        List Table Format
                      </label>
                      <select
                          name="listTableFormat"
                          value={formData.listTableFormat}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {listTableFormatOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        ID Format
                      </label>
                      <select
                          name="idFormat"
                          value={formData.idFormat}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {idFormatOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Default Currency
                      </label>
                      <select
                          name="defaultCurrency"
                          value={formData.defaultCurrency}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {currencyOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Usage Format
                      </label>
                      <select
                          name="usageFormat"
                          value={formData.usageFormat}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="Currency Name">Currency Name</option>
                        <option value="Currency Symbol">Currency Symbol</option>
                      </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Backup Schedule
                      </label>
                      <select
                          name="backupSchedule"
                          value={formData.backupSchedule}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {backupScheduleOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The system will run scheduled jobs automatically based on your selection, except the Hourly every other schedule will run midnight EAT.
                  </p>

                  {/* Security Card */}
                  <h3 className="mt-8 mb-5 text-lg font-semibold text-black dark:text-white">Security</h3>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Session Expiry
                      </label>
                      <select
                          name="sessionExpiry"
                          value={formData.sessionExpiry}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {sessionExpiryOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Select the maximum inactivity duration before automatic logout; ranging from 5 minutes to 1 hour, or choose 'No expiry' for continuous access without auto-logout.
                      </p>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Minimum Password Score
                      </label>
                      <select
                          name="minPasswordScore"
                          value={formData.minPasswordScore}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {minPasswordScoreOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Allow Consecutive Login Attempts
                      </label>
                      <select
                          name="loginAttempts"
                          value={formData.loginAttempts}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {loginAttemptsOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Allow Login After Failure
                      </label>
                      <select
                          name="loginFailDelay"
                          value={formData.loginFailDelay}
                          onChange={handleInputChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        {loginFailDelayOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.text}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Enable Two-Factor Authentication
                    </label>
                    <input
                        type="checkbox"
                        name="twoFactorAuth"
                        checked={formData.twoFactorAuth}
                        onChange={handleCheckboxChange}
                        className="mt-2"
                    />
                  </div>

                  <div className="mt-5">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DefaultLayout>
  );
};

export default SystemSettingForm;