import React, { useState, useEffect } from 'react';
import { FiPlus, FiShoppingBag } from 'react-icons/fi';
import axios from '../routes/axios'



const placeholderImg ='https://ik.imagekit.io/punya/Primebazaar/images_q=tbn:ANd9GcRssaEpDZ2QDfCM4FHEBDx6C9lJ2VolMcKtvm3QdvSxTcDrWnMjzAUAja636gNn0LBYlbY&usqp=CAU?updatedAt=1754802720237';

const ProductManager = (data) => {
  const [SubmitStutas, setSubmitStutas] = useState(false)
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [initialOrders, setinitialOrders] = useState([])
  const [form, setForm] = useState({
    email: data.data,
    name: '',
    image: '',
    keyword: '',
    price: '',
    discount: '',
    details: '',
    productType: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [search, setSearch] = useState('');
  const [showDetails, setShowDetails] = useState(null);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    fetchProductData();
    OrderData();
  }, [])

  const OrderData= async ()=>{
    try {
      const response = await axios.post('order/OrderData', {
        email: data.data,
      });

      setinitialOrders(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  const fetchProductData = async () => {
    try {
      const response = await axios.post('/product/findProduct', {
        email: data.data,
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };


  const submitProductDetails = (async (e) => {
    e.preventDefault();
    setSubmitStutas(true);
    const formData = new FormData();
    formData.append('email', form.email);
    formData.append('productName', form.name);
    formData.append('searchKeyword', form.keyword);
    formData.append('price', form.price);
    formData.append('discount', form.discount);
    formData.append('productDetails', form.details);
    formData.append('productType', form.productType);
    formData.append('image', form.image);

    try {
      const res = await axios.post('/product/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm({
        email: data.data,
        name: '',
        image: '',
        keyword: '',
        price: '',
        discount: '',
        details: ''
      });
      setImagePreview("")
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error, show error message to user
    } finally {
      fetchProductData();
      setSubmitStutas(false)
    }

  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 pb-20 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-500 to-zinc-400 py-10 px-6 shadow-lg rounded-3xl relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Products
          </h1>
          <div className="flex items-center gap-3 mt-4 md:mt-0">

            <button
              className=" flex ml-2 bg-zinc-700 text-white p-3 rounded-full shadow-lg transition transform hover:scale-108"
              onClick={() => setShowForm(true)}
              title="Add Product"
            >
              <FiPlus className="text-2xl" />Add Product
            </button>
            <button
              className="flex ml-2 bg-zinc-700 text-white p-3 rounded-full shadow-lg transition transform hover:scale-108"
              onClick={() => setShowOrders(true)}
              title="View Orders"
            >
              <FiShoppingBag className="text-2xl" /> View Orders
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showForm && (
        <div className="   flex items-center justify-center pt-5 ">

          <div className="bg-zinc-200 rounded-2xl h-auto p-8 w-full max-w-lg relative  ">

            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-700 text-2xl"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-zinc-800">Add New Product</h2>
            <form  className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Seller Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-2 border-2 border-zinc-300 rounded-lg text-zinc-500 cursor-not-allowed"
                  placeholder="Enter seller email"
                />
              </div>
              <div>
                <label htmlFor="productType" className="block text-sm font-medium text-zinc-700 mb-1">Product Type *</label>
                <select
                  id="productType"
                  name="productType"
                  value={form.productType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-zinc-300 rounded-lg text-zinc-700"
                >
                  <option value="">Select a product type</option>
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
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 "
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Product Image *</label>
                <label htmlFor="image" className=' '>
                  <h1 className='my-5 w-full px-4 py-2 border-2 border-zinc-300 rounded-lg bg-zinc-500 text-white'><span className='text-xl'>+</span> Add Image</h1>
                </label>
                <input
                  id='image'
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  required
                  className=" hidden"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="mt-2 h-24 rounded-lg object-cover" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Search Keyword *</label>
                <input
                  type="text"
                  name="keyword"
                  value={form.keyword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  placeholder="e.g. electronics, phone, gadget"
                />
              </div>

              <fieldset className="flex gap-4 border-2 p-3 rounded-md border-zinc-400">
                <legend className='px-1'>Price&Discount</legend>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 no-arrows"
                    placeholder="Price"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={form.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    required
                    className="w-full px-4 py-2 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 no-arrows"
                    placeholder="Discount"
                  />
                </div>
              </fieldset>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Product Details *</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  placeholder="Describe the product"
                />
              </div>
              <button
                type="submit"
                onClick={submitProductDetails}
                className={`w-full  text-white py-2 rounded-lg font-semibold transition duration-300
                  ${SubmitStutas ? " bg-zinc-400 cursor-not-allowed" : "bg-gradient-to-r from-zinc-500 to-zinc-700  hover:from-zinc-700 hover:to-zinc-600"}
                  `}
              >
                {SubmitStutas ? <div className=" h-full inset-0 flex items-center justify-center  bg-opacity-75 rounded-lg">
                  <div className="w-8 h-8 border-4 border-t-4 border-zinc-300 border-t-zinc-700 rounded-full animate-spin"></div>
                </div> : "Add Product"}

              </button>
            </form>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 ">
        {products.length === 0 && (
          <div className="col-span-full text-center text-zinc-500 text-lg">No products found.</div>
        )}
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-5 flex flex-col relative group border border-zinc-100 hover:border-zinc-400"
          >
            {/* Discount badge */}
            {product.discount > 0 && (
              <span className="absolute top-4 right-4 bg-zinc-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                -{product.discount}%
              </span>
            )}
            <div className="h-40 w-full mb-4 flex items-center justify-center bg-zinc-100 rounded-lg overflow-hidden">
              <img
                src={product.ProductImgUrl || placeholderImg}
                alt={product.productName}
                className="object-contain h-full w-full group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className=" text-xl font-bold  text-zinc-800 mb-1 ">{product.productName}:<span className='font-normal text-base '>{product.productDetails}</span></h3>
            <p className="text-zinc-600 text-xs mb-2 truncate">
              Keywords:{" "}
              {product.searchKeyword?.map((word, i) => (
                <span key={i} className="bg-zinc-200 px-2 py-0.5 rounded-full mr-1">
                  {word}
                </span>
              ))}
            </p>
            <p className="text-zinc-600 text-xs mb-2 truncate">productType:{product.productType}</p>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold text-zinc-800">₹{product.price}</span>
              {product.discount > 0 && (
                <span className="text-green-600 text-sm font-medium">Now ₹{(
                  product.price * (1 - product.discount / 100)
                ).toFixed(2)}</span>
              )}
            </div>
            <button
              className="mt-auto bg-gradient-to-r from-zinc-500 to-zinc-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:from-zinc-600 hover:to-zinc-700 transition"
              onClick={() => setShowDetails(product)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 mt-15  to-transparent  md:ml-60 flex items-center justify-center z-20 backdrop-blur-[3px]">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn   z-50 opacity-100">
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-700 text-2xl"
              onClick={() => setShowDetails(null)}
            >
              &times;
            </button>
            <img
              src={showDetails.ProductImgUrl || placeholderImg}
              alt={showDetails.productName}
              className="h-40 w-full object-contain rounded-lg mb-4 bg-zinc-100"
            />
            <h2 className="text-2xl font-bold text-zinc-800 mb-2">{showDetails.productName}</h2>
            <p className="text-zinc-500 text-sm mb-2">By: {showDetails.email}</p>
            <p className="text-zinc-600 text-xs mb-2 truncate">
              Keywords:{" "}
              {showDetails.searchKeyword?.map((word, i) => (
                <span key={i} className="bg-zinc-200 px-2 py-0.5 rounded-full mr-1">
                  {word}
                </span>
              ))}
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold text-zinc-800">₹{showDetails.price}</span>
              {showDetails.discount > 0 && (
                <span className="text-green-600 text-sm font-medium">Now ₹{(
                  showDetails.price * (1 - showDetails.discount / 100)
                ).toFixed(2)}</span>
              )}
            </div>
            <p className="text-zinc-700 text-base mb-2">{showDetails.productDetails}</p>
          </div>
        </div>
      )}
      {showOrders && (
        <div className="fixed inset-0 mt-15  to-transparent  md:ml-60  flex items-center justify-center z-20 backdrop-blur-[3px]">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative animate-fadeIn   z-50 opacity-100">
            <button
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-700 text-2xl"
              onClick={() => setShowOrders(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-zinc-800 mb-4">Purchased Products</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {initialOrders.length === 0 && (
                <div className="text-center text-zinc-500">No orders found.</div>
              )}
              {initialOrders.map(order => (
                <div key={order.id} className="bg-zinc-100 p-4 rounded-lg shadow-md">
                  <p className="text-lg font-semibold text-zinc-800">Product: {order.productName}</p>
                  <p className="text-zinc-600">Customer: {order.customerName}</p>
                  <p className="text-zinc-600">Address: {order.address}</p>
                  <p className="text-zinc-600">Quantity: {order.qty}</p>
                  <p className="text-zinc-600">Total Price: ₹{order.subtotal}</p>
                  <p className="text-zinc-600 text-sm">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className="text-zinc-600 text-sm">Order Time: {new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;