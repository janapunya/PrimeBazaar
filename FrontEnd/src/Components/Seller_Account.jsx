import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import axios from '../routes/axios'
import { LiaStoreAltSolid } from "react-icons/lia";
import ProductManager from './ProductManager';
const Seller_Account = () => {
    const { data } = useOutletContext();
    const [Submit, setSubmit] = useState(false);
    const [StoreName, setStoreName] = useState('');
    const [SellerAlreadyExist, setSellerAlreadyExist] = useState(false)
    const [formData, setFormData] = useState({
        sellerName: data?.name || '',
        email: data?.email || '',
        phoneNumber: data?.phnumber || '',
        storeName: ''
    });

    useEffect((e) => {
        seller();
    })

    const seller = async () => {
        const res = await axios.post('/seller/CheckSeller', {
            email: data.email
        })
        setSellerAlreadyExist(res.data.stutas);
        setStoreName(res.data.StoreName || '');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setSubmit(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res =await axios.post('/seller/newSeller', {
                SellerName: formData.sellerName,
                phnumber: formData.phoneNumber,
                email: formData.email,
                StoreName: formData.storeName
            })
            setSellerAlreadyExist(res.data.stutas);
            setStoreName(res.data.StoreName || '');
        } catch (error) {
            console.error('Error saving seller data:', error);
        }
    };

    if (!SellerAlreadyExist) {
        return (
            <>
                <div className='px-5  max-w-300'>
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

                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-zinc-500 to-zinc-700 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl font-bold">
                                    {data?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Seller Account Information</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Seller Name */}
                                <div>
                                    <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Seller Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="sellerName"
                                        name="sellerName"
                                        value={formData.sellerName}
                                        disabled
                                        className="w-full px-4 py-3 border-2 font-medium border-gray-300 text-zinc-500 rounded-lg cursor-not-allowed"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full px-4 py-3 border-2 font-medium border-gray-300 text-zinc-500 rounded-lg cursor-not-allowed"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        disabled
                                        className="w-full px-4 py-3 border-2 font-medium border-gray-300 text-zinc-500 rounded-lg cursor-not-allowed"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                {/* Store Name */}
                                <div>
                                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-2">
                                        Store Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="storeName"
                                        name="storeName"
                                        value={formData.storeName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-zinc-400 focus:ring-2 font-medium"
                                        placeholder="Enter your store name"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className={` text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg
                                        ${Submit ? 'bg-gradient-to-r from-zinc-500 to-zinc-700 hover:from-green-500 hover:to-green-600' : 'cursor-not-allowed bg-zinc-500'}`}
                                >
                                    Save Seller Information
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className='px-5  max-w-300'>
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
                                <p className="text-gray-600 text-xl flex mt-2"><LiaStoreAltSolid className="mr-2 mt-1" />{StoreName}</p>
                                <p className="text-gray-600 text-sm mt-1">{data?.email}</p>
                                <p className="text-gray-600 text-sm">{data?.phnumber}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                    <ProductManager data={data.email} />
                    </div>
                </div>
            </>
        )
    }

}

export default Seller_Account