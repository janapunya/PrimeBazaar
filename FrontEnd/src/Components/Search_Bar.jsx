import React, { useEffect, useState } from 'react'
import axios from '../routes/axios'
import { useNavigate } from 'react-router-dom'
const placeholderImg =
  'https://ik.imagekit.io/punya/Primebazaar/images_q=tbn:ANd9GcRssaEpDZ2QDfCM4FHEBDx6C9lJ2VolMcKtvm3QdvSxTcDrWnMjzAUAja636gNn0LBYlbY&usqp=CAU?updatedAt=1754802720237';

const Search_Bar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/search/searchProduct', {
        searchQuery
      })
      setProducts(res.data)
    } catch (err) {
      console.log(err)
    }
    console.log('Searching for:', searchQuery)
  }

  return (
    <>
      <div className='w-full  pl-10 pt-2 min-h-screen'>
        <div className='w-full  flex justify-center'>

        <form onSubmit={handleSearch} className='w-full flex justify-center'>
          <div className="flex items-center border-2 border-gray-300 rounded-full md:w-1/2 w-full mx-5  bg-white shadow-sm hover:shadow-md transition-shadow max-w-150">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => {setSearchQuery(e.target.value); handleSearch(e)}}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e)
                }
              }}
              className="w-full px-4 py-3 text-gray-700 bg-transparent outline-none placeholder-gray-400"
            />
            <button type="submit" className="px-4 py-3 text-gray-700 bg-transparent outline-none placeholder-gray-400">
              <i className="pi pi-search" style={{ fontSize: '1.5rem' }}></i>
            </button>
          </div>
        </form>
        </div>
        <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg shadow-lg p-2 my-4'>
        {products.map((product) => (
          <div key={product._id} className='max-w-100 max-h-150 bg-white rounded-lg shadow-lg p-2 my-4'>
            <div className="h-40 w-full mb-4 flex items-center justify-center bg-zinc-100 rounded-lg overflow-hidden overflow-y-hidden">
                <img
                  src={product.ProductImgUrl || placeholderImg}
                  alt={product.productName}
                  className="object-contain h-full w-full"
                />
              </div>
            <div className='w-full min-h-1/2 overflow-hidden'>
              <h1 className='text-lg font-bold'>Name:{product.productName}</h1>
              <p>{product.productDetails}</p>
              <p>{product.productType}</p>
              <div className="flex items-center gap-2 mb-2 font-semibold text-lg">
                {product.discount > 0 && (
                  <span className="text-green-600 font-semibold text-lg">
                    Now ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </span>
                )}
                <del className="text-sm text-zinc-500">₹{product.price}</del>
              </div>
              <button onClick={() => navigate(`/product/${product._id}`)} className='bg-blue-500 text-white px-4 py-2 rounded-lg '>View Details</button>
            </div>
          </div>
          
        ))}
        </div>
      </div>
    </>
  )
}

export default Search_Bar