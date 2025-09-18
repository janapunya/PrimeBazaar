import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../routes/axios";

export default function Order() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Productdrtail, setProductdrtail] = useState({});
    const [addresses, setAddresses] = useState([]);
    const [AddressId, setAddressId] = useState("")
    const [activeId, setActiveId] = useState(null);
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
        addres_Data();
    },[])
    const {ProductImgUrl,discount,price,productDetails,productName,email} =Productdrtail;
  const product = {
    ProductImgUrl,
    discount,
    price,
    productDetails,
    productName,
  };

  const addres_Data = async () => {
    try {
        const edata= await axios.post('/order/email')
        const res = await axios.post("/address/address_check", { email:edata.data.email});
        setAddresses(res.data);
    } catch (err) {
        console.error("Fetching address failed:", err);
    }
}

  const unitPrice = Number(product.price);
  const discountPct = Number(product.discount) || 0;
  const discountedUnitPrice = +(unitPrice * (1 - discountPct / 100)).toFixed(2);

  const [qty, setQty] = useState(1);

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));


  const subtotal = +(discountedUnitPrice * qty).toFixed(2);
  const savings = +((unitPrice - discountedUnitPrice) * qty).toFixed(2);

  const currency = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

  const placeOrder = async () => {
    const orderPayload = {
      productName,
      AddressId,
      qty,
      unitPrice,
      subtotal,
      SellerEmail:email,
    };
    try{
      if(AddressId== "" ){
        alert("Select address");
      }
      else{
        const res= axios.post('/order/PlaceOrder',orderPayload);
        setTimeout(() => {
            navigate('/');
        }, 1000);
      }
    }
    catch(err){
        console.log(err);
    }
  }

  const handleadd=(id)=>{
    setAddressId(id);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <div className="sm:col-span-1 flex justify-center">
          <img
            src={product.ProductImgUrl}
            alt={product.productName}
            className="w-40 h-40 object-cover rounded-lg shadow-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-sm text-gray-500 mt-1">{product.productDetails}</p>
              <div className="text-lg font-semibold mt-2">{currency(discountedUnitPrice)}
              {discountPct > 0 && (
                <span className=" ml-2 text-green-700 text-xs ">
                  {discountPct}% OFF
                </span>
              )}
              </div>
            </div>

          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={decrement}
                className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-semibold hover:bg-gray-50"
                aria-label="decrease"
              >
                −
              </button>

              <input
                type="number"
                value={qty}
                disabled
                className="w-16 text-center rounded-lg border px-2 py-1 no-arrows"
                min={1}
              />

              <button
                onClick={increment}
                className="w-9 h-9 rounded-lg border flex items-center justify-center text-lg font-semibold hover:bg-gray-50"
                aria-label="increase"
              >
                +
              </button>

            </div>
          </div>
              <div className="mt-4 text-sm text-gray-600">Items: <span className="font-medium">{qty}</span></div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={placeOrder}
              className="px-5 py-2 rounded-xl bg-stone-900 text-white font-medium hover:opacity-95"
            >
              Place order
            </button>
          </div>
        </div>
      </div>

    <div className="mt-6 bg-white rounded-2xl shadow p-4">

    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pb-2'>
                {addresses.map((address) => (
                    <div key={address.id} className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
                        <div className='flex justify-between items-start mb-4'>
                            <span className='bg-zinc-200 text-zinc-800 px-3 py-1 rounded-full text-sm font-medium capitalize'>
                                {address.type}
                            </span>
                            <button
                                type='button'
                                onClick={() => {handleadd(address._id);
                                  setActiveId(address._id)}
                                }
                                className={`text-4xl ${
                                  activeId === address._id ? "text-green-500" : "text-zinc-500"
                                }`}
                            >
                                +
                            </button>
                        </div>
                        <div className='space-y-2 text-gray-700'>
                            <p className='font-medium'>{address.street}</p>
                            <p>{address.city}, {address.state} {address.pinCode}</p>
                            <p>{address.country}</p>
                        </div>
                    </div>
                ))}
                <Link to={'/Address'} className="  h-10 w-40 bg-zinc-500 text-center  rounded-xl text-amber-50 font-bold"><span className="text-2xl">+</span> Add Address</Link>
            </div>
    </div>

      <div className="mt-6 bg-white rounded-2xl shadow p-4">
        <h3 className="text-sm font-medium">Order details</h3>
        <div className="mt-3 text-sm text-gray-600 grid grid-cols-2 gap-2">
          <div>Unit price</div>
          <div className="text-right font-medium">{currency(unitPrice)}</div>

          <div>Discount</div>
          <div className="text-right font-medium">{discountPct}%</div>

          <div>Price after discount</div>
          <div className="text-right font-medium">{currency(discountedUnitPrice)}</div>

          {savings > 0 && (
            <>
                <div>You save</div>
                <div className=" text-green-600 text-right font-medium ">{currency(savings)}</div>
            </>
)}

          <div>Quantity</div>
          <div className="text-right font-medium ">{qty}</div>

          <div className="border-t col-span-2 pt-3 flex justify-between items-center">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-lg font-semibold">{currency(subtotal)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
