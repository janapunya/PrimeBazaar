import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from '../routes/axios'
const Deader = () => {
  const [Checkuser,setCheckuser]=useState(false)
  useEffect(()=>{
      const fetchData = async () => {
        try {
          const res = await axios.get('/check_user/UserData');
          setCheckuser(res.data)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
  },[])
  return (
    <>
      <div className=' flex h-15 text-xl justify-between items-center px-5 md:px-15 font-medium '>
        <div>PrimeBazaar</div>
       <div>
        {Checkuser == false ? (
          <div className='flex items-center'>
            <Link to={'/Sign_Up'}><div className='w-20 border-r-3 border-zinc-400'><h1>Sign Up</h1></div></Link>
          </div>
        ) : (
          <Link to={'/Account'}><img src="./images/default_profile_picture.png" alt="" className='h-13 w-13' /></Link>
        )}
       
        
       </div>
      </div>
    </>
  )
}

export default Deader