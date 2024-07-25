"use client";
import { Button, Modal, Select, Input, Typography } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useUser } from '../components/context/page';

const { Title } = Typography;
const { Option } = Select;

const options = [
  {
    label: 'nearluk',
    value: 'nearluk'
  },
  {
    label: 'stoxverse',
    value: 'stoxverse'
  },
  {
    label: 'infobyte',
    value: 'infobyte'
  },
  {
    label: 'digital marketing',
    value: 'digital marketing'
  },
];

const Signin = () => {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm();

  const onSubmit = (data) => {
    console.log('Form submitted with:', data);
  };

  const {currentUser} = useUser()
  console.log(currentUser.email)

  const mobileValue = useWatch({
    control,
    name: 'mobile',
    defaultValue: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (value) => {
    setValue('workspace', value);
    console.log('Select onChange:', value);
  };
  return (
    <>
      <div className="min-h-full">
        <div className="mx-auto w-full max-w-sm lg:w-96 shadow-lg py-6 px-12 rounded-lg mt-6">
          <div>
            <h2 className="mb-0 text-3xl text-center font-extrabold text-gray-900">Sign up</h2>
          </div>
          <div>
            <div className="mt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                    Organization Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="organizationName"
                      name="organizationName"
                      type="text"
                      {...register('organizationName', {
                        required: 'Organization name is required',
                        minLength: { value: 10, message: 'Organization name must be at least 10 characters long' },
                        maxLength: { value: 20, message: 'Organization name must be no more than 20 characters long' }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your Organization Name"
                    />
                    {errors.organizationName && <p className="mt-2 text-sm text-red-600">{errors.organizationName.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      {...register('firstName', {
                        required: 'First name is required',
                        minLength: { value: 2, message: 'First name must be at least 2 characters long' },
                        maxLength: { value: 20, message: 'First name must be no more than 20 characters long' }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your First Name"
                    />
                    {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      {...register('lastName', {
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'Last name must be at least 2 characters long' },
                        maxLength: { value: 20, message: 'Last name must be no more than 20 characters long' }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your Last Name"
                    />
                    {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      disabled
                      defaultValue={currentUser.email || ''}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' }
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                    {/* {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>} */}
                  </div>
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    Mobile Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="mobile"
                      type="tel"
                      maxLength={10}
                      {...register('mobile', {
                        required: 'Mobile number is required',
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your mobile number"
                    />
                    {errors.mobile && <p className="mt-2 text-sm text-red-600">{errors.mobile.message}</p>}
                    {mobileValue.length === 10 && <button
                      type="button"
                      onClick={showModal}
                      className="mt-3 bg-indigo-500 border border-transparent rounded-md py-2 px-4 flex justify-end text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                    >
                      Verify
                    </button>}
                    <Modal width={300} title="Enter Otp Code" className='verify__popup' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                      <div className='otp__input'>
                        <Input maxLength={5} placeholder="Enter OTP" />
                        <Button type="primary mt-5">Verify Otp</Button>
                      </div>
                    </Modal>
                  </div>
                </div>
                <div>
                  <label htmlFor="workspace" className="block text-sm font-medium text-gray-700">
                    WorkSpace Name
                  </label>
                  <div className="mt-1">
                    <Select
                      id="workspace"
                      mode="multiple"
                      allowClear
                      className="w-full"
                      placeholder="Select your WorkSpace"
                      onChange={onChange}
                    >
                      {options.map(option => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                    {errors.workspace && <p className="mt-2 text-sm text-red-600">{errors.workspace.message}</p>}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
