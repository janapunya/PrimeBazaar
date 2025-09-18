import React from 'react'
import Search_bar from "./Search_Bar"
import 'primeicons/primeicons.css';
import { data,Link } from 'react-router-dom';
const ProductCatagory = ({Data,fiilterData}) => {
  
  
  
  return (
    <>
      <div className=" h-15  flex w-full justify-between px-5 md:px-15 items-center mb-2">
        <div className="relative inline-block text-left ">
          <select
            id='catagory'
            className="border-2 rounded-md w-40 h-12"
            defaultValue="All"
            onChange={fiilterData}
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Groceries">Groceries</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Toys & Games">Toys & Games</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Automotive">Automotive</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Art & Crafts">Art & Crafts</option>
          </select>

        </div>
        <div className=' border-2 border-zinc-700 flex items-center rounded-md'>
        <Link to={'/Search'} ><div className='py-2 px-3 border-l-zinc-800 hover:bg-zinc-600 hover:text-white duration-300'><i className="pi pi-search" style={{ fontSize: '1.5rem' }}></i></div></Link>
          
          {/* <Link to={'/Curt'} ><div className='py-2 px-3 border-l-2 border-l-zinc-800 hover:bg-zinc-600 hover:text-white duration-300'><i className="pi pi-shopping-cart" style={{ fontSize: '1.5rem' }}></i></div></Link> */}
          <Link to={'/like'} ><div className='py-2 px-3 border-l-2 border-l-zinc-800 hover:bg-zinc-600 hover:text-white duration-300'><i className="pi pi-heart" style={{ fontSize: '1.5rem' }}></i></div></Link>
        </div>
      </div>
    </>
  )
}

export default ProductCatagory
