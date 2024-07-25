"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../components/context/page';
import { users } from '@/data/data';
import { Button, notification, Space } from 'antd';

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm(); 
  const router = useRouter();
  const { setCurrentUser, setEmailOtp } = useUser();
  const [api, contextHolder] = notification.useNotification();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://192.168.0.163:2000/auth/send-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: data.email })
      });

      const output = await response.json();

      console.log(output.email_otp);

      if (output.email) {
        setCurrentUser(output.email);
        setEmailOtp(output.email_otp);
        router.push('verifyotp');
      } else {
        api.open({
          message: 'Notification',
          description: 'Email already exists.',
          placement: 'topLeft',
          duration: 3,
          style: {
            backgroundColor: '#ff4d4f', // Danger color
            color: '#fff' // Text color
          }
        });
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "An error occurred while sending OTP"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {contextHolder}
      <div className="max-w-sm w-full px-6 py-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-3">
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Microsoft</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.55 21H3v-8.55h8.55V21zM21 21h-8.55v-8.55H21V21zm-9.45-9.45H3V3h8.55v8.55zm9.45 0h-8.55V3H21v8.55z"></path>
                </svg>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
