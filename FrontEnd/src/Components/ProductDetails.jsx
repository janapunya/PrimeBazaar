import React, { useEffect,useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from '../routes/axios';
const ProductDetails = () => {
  const { id } = useParams();
  const [Productdrtail, setProductdrtail] = useState({});
  useEffect(  () => {

    const product= async ()=>{
        try{
            const res= await axios.post("/product/ProductDetails",{
                id
            });
            setProductdrtail(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    product();
},[])

  

  return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
  <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">

    <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center p-8 relative">
      {Productdrtail?.ProductImgUrl ? (
        <img
          src={Productdrtail.ProductImgUrl}
          alt={Productdrtail.productName}
          className="max-h-[500px] w-auto object-contain rounded-lg"
        />
      ) : (
        <p className="text-gray-400">No Image Available</p>
      )}
    </div>

    <div className="lg:w-1/2 p-8 flex flex-col relative">



      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        {Productdrtail.productName}
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        {Productdrtail.productDetails}
      </p>

      {/* Price */}
      <div className="mb-6">
        {Productdrtail.discount > 0 ? (
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-extrabold text-green-600">
              ₹{(Productdrtail.price * (1 - Productdrtail.discount / 100)).toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ₹{Productdrtail.price}
            </span>
            <span className="text-red-500 font-semibold">
              {Productdrtail.discount}% OFF
            </span>
          </div>
        ) : (
          <span className="text-3xl font-extrabold text-gray-800">
            ₹{Productdrtail.price}
          </span>
        )}
      </div>





      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        {/* <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition transform hover:scale-105">
          Add to Cart
        </button> */}
        <Link to={`/Order/${id}`}  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6  font-semibold rounded-lg shadow transition transform hover:scale-105">
        <button className='h-full w-full' >
          Buy Now
        </button>
         </Link> 
      </div>
    </div>
  </div>
</div>

  )
}

export default ProductDetails