import React, { useState, useEffect } from 'react'
import axios from '../routes/axios'
import { useLocation,useNavigate } from 'react-router-dom';
const userdata = () => {
  const location = useLocation();
  const emailFromState = location.state?.email || '';
  const nameFromState = location.state?.name || '';
  const [Email, setEmail] = useState(emailFromState);
  const [Name, setName] = useState(nameFromState);
  const [Phno, setPhno] = useState("");
  const navigate = useNavigate();

  const handleSubmit=  ( async (e)=>{

    e.preventDefault();
        const res = await axios.post('/userData/newUser',{
          name:Name,
          phnumber:Phno,
          email:Email,
        })
        if(res.data.submituser == true){
          navigate('/Display')
        }
        console.log(res.data.submituser)
    
    
  })


  return (
    <>
    <div className=' h-screen w-full flex justify-center items-center '>
    <div  className='max-w-100 w-full px-3 border-2 border-zine-700 py-10 rounded-2xl'>
      <h1 className='font-bold text-xl uppercase mb-7'>Continue with PrimeBazaar</h1>
        <form action="">
            <h3>Email:</h3>
            <input type="email" className='h-9 w-full rounded-xl  border-2 border-zinc-700 mt-2 pl-3' value={Email} readOnly />
            <h3>Name:</h3>
            <input type="text" className='h-9 w-full rounded-xl  border-2 border-zinc-700 mt-2 pl-3'
             value={Name} 
             onChange={(e) => setName(e.target.value)}
             
            />
            <h3>Nnumber</h3>
            <input type="number" className='h-9 w-full rounded-xl  border-2 border-zinc-700 mt-2 pl-3 no-spinner'
             value={Phno}
             onChange={(e) => setPhno(e.target.value)}
             
              />
            <button type='submit' onClick={handleSubmit} className='h-9 w-full rounded-xl mt-5 bg-blue-900 text-white hover:bg-blue-800'>Create Account</button>
        </form>
    </div>
    </div>
    </>
  )
}

export default userdata