import React from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';
import { TbLogout } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import axios from '../routes/axios';

const Logout = () => {
  const { data } = useOutletContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/data/logout');
      if (response.status === 200) {
        // Redirect to home page after successful logout
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, redirect to home page
      navigate('/');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Show confirmation dialog
      const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      
      if (confirmed) {
        const response = await axios.post('/data/delete_account', {
          email: data?.email
        });
        
        if (response.status === 200) {
          alert('Account deleted successfully');
          // Redirect to home page after successful account deletion
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Delete account error:', error);
      if (error.response?.status === 404) {
        alert('User not found');
      } else {
        alert('Error deleting account. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gradient-to-brpy-8 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-zinc-500 to-zinc-700 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {data?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Hi, <span className="text-zinc-600">{data?.name || 'User'}</span>
              </h1>
              <p className="text-gray-600 text-sm mt-1">{data?.email}</p>
              <p className="text-gray-600 text-sm">{data?.phnumber}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-600 "  >
              <TbLogout size={"h-5"} />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Logout Account</h2>
          </div>
          <p className="text-gray-600 mb-6">Are you sure you want to logout from this account?</p>
          <button onClick={handleLogout} className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-500">
            <TbLogout size={"h-5"} />
            </svg>
            <span>Logout</span>
          </button>
        </div>


        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-zinc-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-800" >
              <MdDelete  size={'h-5'}/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Delete Account</h2>
          </div>
          <p className="text-gray-600 mb-6">This action cannot be undone. All your data will be permanently deleted.</p>
          <button onClick={handleDeleteAccount} className="bg-zinc-500 hover:bg-zinc-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <MdDelete  size={'h-5'}/>
            </svg>
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logout