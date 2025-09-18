import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Display from '../Display'
import Sign_up from '../Components/Sign_Up'
import Userdata from '../Components/userdata'
import About_User from '../Components/About_User'
import Account from '../Components/Account' 
import Address from '../Components/Address'
import Logout from '../Components/Logout'
import Seller_Account from '../Components/Seller_Account'
import ProductDetails from '../Components/ProductDetails'
import Like from '../Components/Like'
import Curt from '../Components/Curt'
import Order from '../Components/Order'
import Search from '../Components/Search_Bar'
const AppRoutes = () => {
    return (
        <>

            <Routes>
                <Route path='/' element={<Display />} />
                <Route path='/Sign_Up' element={<Sign_up/>}/>
                <Route path='/Display' element={<Display/>}/>
                <Route path='/userData' element={<Userdata/>}/>
                <Route path='/About_user' element={<About_User/>} />
                <Route path='/product/:id' element={<ProductDetails/>}/>
                <Route path='/Like' element={<Like/>}/>
                <Route path='/Curt' element={<Curt />} />
                <Route path='/order/:id' element={<Order/>}/>
                <Route path='/Search' element={<Search/>}/>
                <Route element={<About_User/>}>
                    <Route path='/Account' element={<Account/>} />
                    <Route path='/Address' element={<Address/>} />
                    <Route path='/logout' element={<Logout/>} />
                    <Route path='/Seller_Account' element={<Seller_Account/>} />
                </Route>
            </Routes>

        </>
    )
}
export default AppRoutes