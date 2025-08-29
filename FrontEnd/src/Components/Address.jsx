import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import axios from '../routes/axios'

const Address = () => {
    const { data } = useOutletContext();
    const [addresses, setAddresses] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newAddress, setNewAddress] = useState({
        type: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: ''
    });

    useEffect(() => {
            addres_Data();
    },[]);

    const addres_Data = async () => {
        try {
            const res = await axios.post("/address/address_check", { email:data.email });
            setAddresses(res.data);
        } catch (err) {
            console.error("Fetching address failed:", err);
        }
    }
    
    const handleAddAddress = async (e) => {
        e.preventDefault()
        if (newAddress.type && newAddress.street && newAddress.city) {
            const res = await axios.post('/address/update_address', {
                id: (addresses.length) + 1,
                email: data?.email,
                type: newAddress.type,
                street: newAddress.street,
                city: newAddress.city,
                state: newAddress.state,
                pinCode: newAddress.pinCode,
                country: newAddress.country
            })

            setNewAddress({ type: '', street: '', city: '', state: '', pinCode: '', country: '' });
            setShowAddForm(false);
            await addres_Data();
        }
    };

    const handleDeleteAddress = async (id) => {
        try {
            const res = await axios.post('/address/delete', { id });
            await addres_Data();
        } catch (error) {
            console.error("Delete request failed:", error);
        }
    };

    return (
        <div className='p-6 max-w-4xl mx-auto'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    Hi, <span className='text-zinc-600'>{data?.name || 'User'}</span>
                </h1>
                <p className='text-gray-600 text-sm'>{data?.email}</p>
            </div>

            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-semibold text-gray-800'>Your Addresses</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className='bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                >
                    {showAddForm ? 'Cancel' : '+ Add Address'}
                </button>
            </div>

            {showAddForm && (
                <form>
                    <div className='bg-gray-50 p-6 rounded-lg mb-6 border-2 border-gray-200'>
                        <h3 className='text-lg font-semibold mb-4 text-gray-800'>Add New Address</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <input
                                type="text"
                                placeholder="Address Type (Home/Work)"
                                value={newAddress.type}
                                className='p-3 border no-arrows border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-zinc-500'
                                onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="Street Address"
                                value={newAddress.street}
                                className='p-3 border no-arrows border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-zinc-500'
                                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="City"
                                value={newAddress.city}
                                className='p-3 border no-arrows border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500'
                                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="State"
                                value={newAddress.state}
                                className='p-3 border no-arrows border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-zinc-500'
                                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            />

                            <input
                                type="number"
                                placeholder="Pin Code"
                                value={newAddress.pinCode}
                                className='p-3 border no-arrows border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500'
                                onChange={(e) => setNewAddress({ ...newAddress, pinCode: e.target.value })}
                            />

                            <input
                                type="text"
                                placeholder="Country"
                                value={newAddress.country}
                                className='p-3 border no-arrows border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500'
                                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                            />

                        </div>
                        <button
                        type='submit'
                            onClick={handleAddAddress}
                            className='mt-4 bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg transition-colors duration-200'
                        >
                            Save Address
                        </button>
                    </div>
                </form>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pb-2'>
                {addresses.map((address) => (
                    <div key={address.id} className='bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
                        <div className='flex justify-between items-start mb-4'>
                            <span className='bg-zinc-200 text-zinc-800 px-3 py-1 rounded-full text-sm font-medium capitalize'>
                                {address.type}
                            </span>
                            <button
                                type='button'
                                onClick={() => handleDeleteAddress(address.id)}
                                className='text-red-500 hover:text-red-700 text-sm font-medium'
                            >
                                Delete
                            </button>
                        </div>
                        <div className='space-y-2 text-gray-700'>
                            <p className='font-medium'>{address.street}</p>
                            <p>{address.city}, {address.state} {address.pinCode}</p>
                            <p>{address.country}</p>
                        </div>
                    </div>
                ))}
            </div>

            {addresses.length === 0 && !showAddForm && (
                <div className='text-center py-12'>
                    <div className='text-gray-400 text-6xl mb-4'>🏠</div>
                    <h3 className='text-xl font-semibold text-gray-600 mb-2'>No addresses yet</h3>
                    <p className='text-gray-500 mb-4'>Add your first address to get started</p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className='bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg transition-colors duration-200'
                    >
                        Add Address
                    </button>
                </div>
            )}
        </div>
    )
}

export default Address