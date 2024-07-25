
'use client'
import { Flex, Input, Typography } from 'antd';
const { Title } = Typography;
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '../components/context/page';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const {currentUser , emailOtp} = useUser()

  const onChange = (text) => {
    setOtp(text);
    console.log('onChange:', text);
  };

  const sharedProps = {
    onChange,
  };

//   const handleVerify = (e) => {
//     e.preventDefault();
//     const userExists = users.some(user => user.otp === otp);

//     if (userExists) {
//       router.push('/signin');
//     } else {
//       alert('Invalid OTP');
//     }
//   };
 

  const handleVerify = (e) => {
    e.preventDefault();
 
  
    if (currentUser && emailOtp === otp) {
      router.push('/signin');
    } else {
      alert('Invalid OTP')
    }
  };


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 email_verify_bg'>
      <div className="mx-auto w-50 px-6 py-5 bg-white rounded-lg shadow shadow-xl text-center email__verify">
        <div className='font-bold my-4 text-[18px] text-[#130e61]'>Enter OTP</div>
        <form onSubmit={handleVerify}>
          <div className="otp__inputs">
            <Input.OTP
              onChange={(e) => setOtp(e.target.value)}
              length={5}
              formatter={(str) => str.toUpperCase()}
              {...sharedProps}
            />
          </div>   
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#130e61] hover:bg-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;