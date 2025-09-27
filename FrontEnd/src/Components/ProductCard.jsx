import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../routes/axios';

const placeholderImg =
  'https://ik.imagekit.io/punya/Primebazaar/images_q=tbn:ANd9GcRssaEpDZ2QDfCM4FHEBDx6C9lJ2VolMcKtvm3QdvSxTcDrWnMjzAUAja636gNn0LBYlbY&usqp=CAU?updatedAt=1754802720237';

const ProdutsCard = (props) => {
  const incoming = props.data ?? props.products ?? [];
  const navigate = useNavigate();
  const [ProductData, setProductData] = useState([]);
  const [Likedata, setLikedata] = useState([]);
  const [Checkuser, setCheckuser] = useState(false);

  useEffect(() => {
    setProductData(Array.isArray(incoming) ? incoming : []);
    const fetchData = async () => {
      try {
        const res = await axios.get('/check_user/UserData');
        setCheckuser(Boolean(res.data));
      } catch (error) {
        console.log('check user failed', error);
      }
    };
    fetchData();
    fatchlikedata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incoming]);

  useEffect(() => {
    let arr = [];
    if (Array.isArray(incoming)) {
      arr = incoming;
    } else if (incoming && Array.isArray(incoming.data)) {
      arr = incoming.data;
    } else if (incoming && Array.isArray(incoming.items)) {
      arr = incoming.items;
    }
    setProductData(arr);
  }, [incoming]);

  const fatchlikedata = async () => {
    try {
      const res = await axios.post('/like/Likedata');
      // DEBUG: log the response so you can inspect in prod
      console.log('/like/Likedata response:', res?.data);

      // Normalize to an array no matter what the API returns
      const normalized =
        Array.isArray(res.data) ? res.data :
        Array.isArray(res.data?.data) ? res.data.data :
        [];
      setLikedata(normalized);
    } catch (err) {
      console.error('fetch likedata error', err);
      setLikedata([]); // defensive fallback
    }
  };

  const likestutas = async (id, status) => {
    try {
      if (status) {
        await axios.post('/like/DeleteLike', { id });
      } else {
        await axios.post('/like/CreateLike', { id });
      }
      // Re-fetch to ensure server and client stay in sync
      await fatchlikedata();
    } catch (err) {
      console.error('like toggle failed', err);
      // still try to re-fetch so UI stays consistent
      fatchlikedata();
    }

    // Defensive state update if previous value isn't an array
    setLikedata((prev) => {
      const prevArr = Array.isArray(prev) ? prev : [];
      if (status) {
        return prevArr.filter((d) => d.Productid !== id);
      } else {
        return [...prevArr, { Productid: id, status: true }];
      }
    });
  };

  return (
    <div className="">
      <div className=" overflow-hidden grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4">
        {(Array.isArray(ProductData) ? ProductData : []).length === 0 ? (
          <p>No products found</p>
        ) : (
          ProductData.map((product, index) => {
            // Defensive: only call .some if Likedata is an array
            const isLiked =
              Array.isArray(Likedata) &&
              Likedata.some((d) => d.Productid === (product._id ?? product.id) && d.status);

            return (
              <div
                key={product._id ?? index}
                className="bg-white rounded-sm shadow-lg hover:shadow-2xl transition-shadow p-5 flex flex-col relative group border border-zinc-100 hover:border-zinc-400"
              >
                {product.discount > 0 && (
                  <span className="absolute top-4 right-4 bg-zinc-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    -{product.discount}% <span className="text-green-500">off</span>
                  </span>
                )}

                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full">
                  {Checkuser ? (
                    <button onClick={() => likestutas(product._id, isLiked)}>
                      <i
                        className={`pi pi-heart ${isLiked ? 'text-red-600' : 'text-black'}`}
                        style={{ fontSize: '1.5rem' }}
                      />
                    </button>
                  ) : (
                    ''
                  )}
                </span>

                <div className="h-40 w-full mb-4 flex items-center justify-center bg-zinc-100 rounded-lg overflow-hidden">
                  <img
                    src={product.ProductImgUrl || placeholderImg}
                    alt={product.productName}
                    className="object-contain h-full w-full"
                  />
                </div>

                <h3 className="text-xl font-bold text-zinc-600 mb-1 capitalize">
                  {product.productName}{' '}
                </h3>
                <span className=" font-normal">{product.productDetails}</span>

                <div className="flex items-center gap-2 mb-2 font-semibold text-lg">
                  {product.discount > 0 && (
                    <span className="text-green-600 font-semibold text-lg">
                      Now ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  )}
                  <del className="text-sm text-zinc-500">₹{product.price}</del>
                </div>

                <button
                  className="mt-auto bg-gradient-to-r from-zinc-500 to-zinc-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:from-zinc-600 hover:to-zinc-700 transition"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  View Details
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProdutsCard;
