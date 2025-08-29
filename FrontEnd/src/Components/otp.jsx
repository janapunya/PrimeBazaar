import React ,{useRef,useState,useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../routes/axios';
const Otp = ({otp,email}) => {
    const [Data,setData]= useState("");
    const navigate = useNavigate();
    const [Availableuser,useAvailableuser]=useState(false)
    const inputsRef = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleChange = (e, index) => {
      const value = e.target.value;
      if (!/^\d?$/.test(value)) return e.target.value="";
      e.target.value = value;
      if (value.length === 1 && index < inputsRef.length - 1) {
        inputsRef[index + 1].current.focus();
      }
  
      const values = inputsRef.map((ref) => ref.current?.value || "");
      const combined = values.join("");
      console.log("All digits:", combined);
      setData(combined);
      
    };

    const handlesubmit=(e)=>{
        e.preventDefault();
        console.log(otp)
        try{
            if(Data.length == 4 && Data == otp){
                const Checkuser = async ()=>{
                    console.log(email);
                    const res = await axios.post('/userData/checkUser', {
                        email: email,
                    });
                    console.log(res);
                    useAvailableuser(res.data)

                }
                Checkuser();

                if(Availableuser == false){
                    navigate('/userData', { state: { email:email } });
                }
                else{
                    navigate('/Display');
                }
               
            }
            else{
                setData("");
                inputsRef.forEach(ref => {
                    if (ref.current) ref.current.value = "";
                });
            }
        }
        catch{

        }
    }
 
  
    useEffect(() => {
      console.log("Updated Data:", Data);
    }, [Data]);
    return (
        <>
            <div className='mb-5'>
                {inputsRef.map((ref, i) => (
                    <input
                        key={i}
                        ref={ref}
                        type="text"
                        maxLength={1}
                        onChange={(e) => handleChange(e, i)}
                        className="border-2 border-zinc-600 rounded-2xl w-16 h-16 text-center text-2xl ml-3 first:ml-0"
                    />
                ))}
            </div>
            <button className=' bg-blue-900 text-white hover:bg-blue-800 h-9 rounded-xl font-bold w-full' type='submit' onClick={handlesubmit}  >Verify your Email</button>
        </>
    )
}

export default Otp