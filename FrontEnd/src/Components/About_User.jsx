import React, { useState,useEffect } from 'react';
import { Outlet,Link } from 'react-router-dom';
import axios from '../routes/axios'

const About_User = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [Data,setData]=useState('')



  useEffect(() => {
    fetchData();
  },[]);
  
  const fetchData = async () => {
    try {
      const res = await axios.post('/data/About_user');
      console.log(res)
      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };

  return (
    <>
      <nav className=" h-15 ">
        <h1 className=" text-balance font-bold capitalize  pl-3 w-60 h-15 flex items-center bg-zinc-700 text-white">
          {!sidebarOpen && (
            <button
              className=" md:hidden bg-zinc-700 text-amber-50 rounded-full p-2"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              ☰
            </button>
          )}
          <img src="./images/profile-pic-male_4811a1.svg" alt="" className=' h-10 w-10 mr-2' />
          <div className='h-10'>
            <p className='font-normal '>Hi ,</p>
            <p className='tracking-wide '>{Data.name}</p>
          </div>
          
        </h1>
      </nav>
      <div className="flex relative h-[calc(100vh-60px)]">

        {/* Sidebar */}
        <aside
          className={`fixed z-30 top-0 left-0 w-60 h-full bg-zinc-800 text-amber-50 flex flex-col transform transition-transform duration-300 ease-in-out mt-[60px] md:mt-0
        ${sidebarOpen ? 'translate-x-0 ' : '-translate-x-full'}
        md:static md:translate-x-0 md:w-60 `}
        >

          <div className="flex-1  ">
            <ul>
              <Link to='/Account'> <li className=" hover:bg-zinc-600 transform duration-300 cursor-pointer w-full h-11 flex items-center pl-4 border-b-2 border-zinc-700 ">Account</li></Link>
              <Link to='/Address'><li className=" hover:bg-zinc-600 transform duration-300 cursor-pointer w-full h-11 flex items-center pl-4 border-b-2 border-zinc-700 ">Address</li></Link>
              <Link to='/Seller_Account'><li className=" hover:bg-zinc-600 transform duration-300 cursor-pointer w-full h-11 flex items-center pl-4 border-b-2 border-zinc-700 ">Sell your Product?</li></Link>

              <Link to='/logout'><li className=" hover:bg-zinc-600 transform duration-300 cursor-pointer w-full h-11 flex items-center pl-4 border-b-2 border-zinc-700 ">Logout</li></Link>
            </ul>
          </div>
          <button
            className="absolute top-[-50px] right-3 md:hidden bg-zinc-700 text-amber-50 rounded-full p-2  font-extrabold"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </aside>

        <main className="flex-1  w-full overflow-auto">
        <Outlet context={{ data: Data , fetchData}} />
        </main>
      </div>
    </>
  );
};

export default About_User;