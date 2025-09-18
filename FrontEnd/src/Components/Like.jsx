import React,{useState,useEffect} from "react";
import axios from '../routes/axios';
import { Link } from "react-router-dom";
const Like = () => {
    const [likedProducts, setlikedProducts] = useState([])

    useEffect(() => {
        fatchlikedata();
    },[])
    

  const fatchlikedata = async () => {
    try {
      const res = await axios.post('/like/LikedataAll');
      console.log(res.data)
      setlikedProducts(res.data)
    } catch (err) {
      console.error('fetch likedata error', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center">
        ❤️ Your Liked Products
      </h2>


      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {likedProducts.map((product,index) => (
         <Link to={`/product/${product._id}`}> <div
            key={index}
            className="rounded-2xl bg-white shadow-md hover:shadow-xl transition overflow-hidden border-2 border-amber-400"
          >

            <div className="relative">
              <img
                src={product.ProductImgUrl}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition">
              <i
                    className={`pi pi-heart text-red-700`}
                    style={{ fontSize: '1.5rem' }}
                  />
              </button>
            </div>


            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.productName}</h3>
              <div className="flex items-center gap-2 mb-2 font-semibold text-lg">
                {product.discount > 0 && (
                  <span className="text-green-600 font-semibold text-lg">
                    Now ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                )}
                <del className="text-sm text-zinc-500">₹{product.price}</del>
              </div>
            </div>
          </div></Link>
        ))}
      </div>
    </div>
  );
};

export default Like;
