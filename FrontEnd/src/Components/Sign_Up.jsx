import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Otp from './otp'
import axios from '../routes/axios'
import { useNavigate, useLocation } from 'react-router-dom';
const Sign_Up = () => {
  const [submitcheck, useSubmitcheck] = useState(false)
  const [Otpdata, setOtpdata] = useState(null)
  const [Emaildata, setEmaildata] = useState(null)
  const navigate = useNavigate();
  const location = useLocation();


  const handelsubmit = ((e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setEmaildata(email)
    console.log(e.target.email.value);
    const fetchData = async () => {
      try {
        const res = await axios.post('/otp/otpsend', { email });
        setOtpdata(res.data.otp)
        console.log(Otpdata)
        useSubmitcheck(res.data.valu)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  })



  const google_oauth = (e) => {
    e.preventDefault();
    window.location.href = 'https://primebazaarbackend.onrender.com/google_oauth/google_check';
  };







  useEffect(() => {
   
    const fetchUser = async () => {
      try {
        const res = await axios.get('/google_oauth/user');

        const check = await axios.post('/userData/checkUser', {
          email: res.data.email|| "",
        });
        if (check.data == false) {
          console.log(res.data.email)
          if(res.data.email != null){
            console.log("check");
            navigate('/userData', { state: { email: res.data.email, name: res.data.name } });
          }
        }
        else {
          console.log("check2")
          navigate('/Display');
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <div className='h-screen w-full flex justify-center items-center p-2'>
        <div className='w-screen  max-w-100 border-2 border-amber-950 px-5 rounded-xl'>
          <center><h1 className='my-5 text-xl font-bold'>Welcome to PrimeBazaar</h1></center>
          <h1 className='font-bold mb-2'>Email Address</h1>
          <form action="" className='grid' onSubmit={handelsubmit} >
            <input type="email" placeholder='Enter your email' name='email' className=' border-2 border-zinc-400 h-10 pl-3 rounded-2xl mb-3' />
            {submitcheck === true ? (
              <>
                <h3 className='mb-3 text-green-600 font-medium'>
                  <img src="./images/green-tick.png" alt="" className='h-5 w-5 inline-block' /> Otp send successfully
                </h3>
                <center><Otp otp={Otpdata} email={Emaildata} /></center>
              </>
            ) : (<button className=' bg-blue-900 text-white hover:bg-blue-800 h-9 rounded-xl font-bold' type='submit'  >Send otp</button>)}

          </form>
          <div className='mt-4 flex items-center justify-center'>
            <hr className='flex-grow border-t border-gray-400 mx-1' />
            <span className='mx-2 text-gray-600'>or</span>
            <hr className='flex-grow border-t border-gray-400 mx-1' />
          </div>
          <button className='w-full flex items-center justify-center border-2 bor mt-5 rounded-2xl h-10' onClick={google_oauth} ><img src="./images/google-logo.png" alt="" className='h-8 w-15' /><h1>Continue With Google</h1></button>
          <div className=' mt-7 flex mb-10'>
            <Link to={'/'}>
              Go to Home Page?
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default Sign_Up