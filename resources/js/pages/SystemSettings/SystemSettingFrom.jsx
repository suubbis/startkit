import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layouts/DefaultLayout';
import {useDispatch} from "react-redux";
import {getRoute, patchRoute} from "@/actions/appActions";

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
  { value: '5 minutes', text: '5 Minutes' },
  { value: '10 minutes', text: '10 Minutes' },
  { value: '30 minutes', text: '30 Minutes' },
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
  { value: '1 minute', text: '1 Minute' },
  { value: '5 minutes', text: '5 Minutes' },
  { value: '10 minutes', text: '10 Minutes' },
  { value: '30 minutes', text: '30 Minutes' },
  { value: '1 hour', text: '1 Hour' },
  { value: '24 hours', text: '24 Hours' },
];

const currencyAndSymbolsOptions = [
    { value: '$', text: 'USD' , name: 'Dollar'},
    { value: '€', text: 'EUR' , name: 'Euro'},
    { value: '£', text: 'GBP' , name: 'Pound'},
    { value: '¥', text: 'JPY' , name: 'Yen'},
];

// const fetchCurrencyOptions = async () => {
//   const response = await fetch('https://restcountries.com/v3.1/all');
//   const data = await response.json();
//   console.log(data[0], 'country')
//   return data.map(country => {
//     console.log(country.currencies, 'currencies');
//     if (country.currencies){
//       const currencyKey = Object.keys(country.currencies)[0] ?? null;
//       const option = {
//         value: country.currencies[currencyKey].symbol || '',
//         text: country.currencies[currencyKey].name || '',
//       }
//       console.log(option, 'option');
//       return option;
//     }
//
//   });
// };

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
    currencySymbol: '',
    currencyName: '',
    twoFactorAuth: false,
  });
  const dispatch = useDispatch();
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    const loadCurrencyOptions = async () => {
      // const options = await fetchCurrencyOptions();
      const options = currencyAndSymbolsOptions;
      console.log(options)
      setCurrencyOptions(options);
    };

    loadCurrencyOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    const currencyOption = currencyOptions.find(option => option.value === value);
    const symbol = currencyOption?.value ?? '';
    const defaultCurrency = currencyOption?.text ?? '';
    const currencyName = currencyOption?.name ?? '';
    setFormData((prev) => ({ ...prev, defaultCurrency: defaultCurrency, currencyName: currencyName, currencySymbol: symbol }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        date_format: formData.dateFormat,
        number_format: formData.numberFormat,
        time_format: formData.timeFormat,
        list_table_format: formData.listTableFormat,
        id_format: formData.idFormat,
        default_currency: formData.defaultCurrency,
        usage_format: formData.usageFormat,
        backup_schedule: formData.backupSchedule,
        session_expiry: formData.sessionExpiry,
        min_password_score: formData.minPasswordScore,
        allow_consecutive_login_attempts: formData.loginAttempts,
        allow_login_after_fail: formData.loginFailDelay,
        enable_two_factor_auth: formData.twoFactorAuth,
        currency_symbol: formData.currencySymbol,
        currency_name: formData.currencyName,
    }
    console.log(formData);
    dispatch(patchRoute('/system-settings/1', data, true))
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
  }

  useEffect(() => {
    dispatch(getRoute('/system-settings/1'))
        .then(response => {
          const data = response.data;
          console.log(data);
          setFormData({
            dateFormat: data.date_format || '',
            numberFormat: data.number_format || '',
            timeFormat: data.time_format || '',
            listTableFormat: data.list_table_format || '',
            idFormat: data.id_format || '',
            defaultCurrency: data.default_currency || '',
            usageFormat: data.usage_format || '',
            backupSchedule: data.backup_schedule || '',
            sessionExpiry: data.session_expiry || '',
            minPasswordScore: data.min_password_score || '',
            loginAttempts: data.allow_consecutive_login_attempts || '',
            loginFailDelay: data.allow_login_after_fail || '',
            twoFactorAuth: data.enable_two_factor_auth || false,
            currencySymbol: data.currency_symbol || '',
            currencyName: data.currency_name || '',
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
  }, []);

  return (
      <DefaultLayout>
        <Breadcrumb pageName="System Settings" />

        <div className="sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                          value={formData.currencySymbol}
                          onChange={handleCurrencyChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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
                        <option value="">Select Option</option>
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

export default SystemSettingForm;