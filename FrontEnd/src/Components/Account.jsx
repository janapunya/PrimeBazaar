import React, { useEffect, useState } from 'react'
import axios from '../routes/axios'
import { useOutletContext } from 'react-router-dom';

const Account = () => {
  const [Submit, setSubmit] = useState(false);
  const [Data, setData] = useState({})
  const [Name, setName] = useState('')
  const [Number, setNumber] = useState('')
  // const [isLoading, setIsLoading] = useState(false);


  const { data,fetchData } = useOutletContext();

  useEffect(() => {
    if (data) {
      setData(data);
      setName(data.name || '');
      setNumber(data.phnumber || '');
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      if (Data.name !== Name || Data.phnumber !== Number) {
        const res = await axios.post('/data/Update_data', {
          Name,
          email: Data.email,
          Number,
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error updating data:", error);
      setMessage({ type: 'error', text: 'Failed to update data' });
    } 
  };


  return (
    <div className='p-1 max-w-2xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Account Settings</h1>
        <p className='text-gray-600'>Manage your personal information and preferences</p>
      </div>


      <div className='bg-white border border-gray-200 rounded-lg p-8 shadow-sm'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Personal Information</h2>
        
        <form onSubmit={submitHandler} className='space-y-6'>

          <div>
            <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-2'>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              value={Name || ''}
              onChange={(e) => {
                setName(e.target.value);
                console.log(Name);
                setSubmit(true);
              }}
              placeholder="Enter your full name"
            />
          </div>


          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              value={Data.email || ''}
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
          </div>


          <div>
            <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-2'>
              Mobile Number
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              value={Number || ''}
              onChange={(e) => {
                setNumber(e.target.value);
                setSubmit(true);
              }}
              placeholder="Enter your mobile number"
            />
          </div>


          <div className='pt-4'>
            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200  text-white  ${Submit ? 'hover:bg-zinc-600 bg-zinc-500' : 'cursor-not-allowed bg-zinc-400'}`}
            >
              Update
            </button>
          </div>
        </form>

        
      </div>
      
    </div>
  )
}

export default Account