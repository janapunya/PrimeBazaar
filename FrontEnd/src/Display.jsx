import React,{useState,useEffect} from 'react'
import Header from './Components/Header'
import ProductCard from './Components/ProductCard'
import ProductCatagory from './Components/ProductCatagory'
import axios from './routes/axios'

const Diisplay = () => {
  const [Data, setData] = useState([])
  useEffect(() => {
    fiilterData({ target: { value: "All" } });
  }, ["All"])

  const fiilterData= async (e)=>{
    try{
      const res=await axios.post("/product/AllProduct",{
        data:e.target.value
      })
      setData(res.data);
    }
    catch(err){
      console.log(err)
    }
  }
  return (
   <>
    <div>
      <Header/>
      <ProductCatagory Data={Data} fiilterData={fiilterData}/>
      <h1 className='md:px-15 px-5 text-2xl font-bold my-5 uppercase'>Just For You</h1>
      <div className=' md:mx-15 sm:mx-5 mx-5 '>
        <ProductCard data={Data}/>
      </div>
    </div>
   </>
  )
}

export default Diisplay