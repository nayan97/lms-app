import React, { useEffect, useState } from "react";
import useUserAxios from "../hooks/useUserAxios";
import { Link } from "react-router";
import { CiHeart } from "react-icons/ci";
import { t } from "i18next";

const LatestProducts = () => {
  const axios = useUserAxios();
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/home");
        setLatestProducts(data.latestpros || []);

      } catch (err) {
        console.error("Error fetching shop data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(latestProducts);
  const handleAddToWishlist=()=>{
    console.log("Item added to wishlist");
  }
  

  return (
    <section className="py-6 mx-auto container max-w-[1280px] bg-gray-100">
      <div className="px-4">
        <h4 className="mb-4 text-lg font-semibold">Latest Products</h4>

        {/* 👇 Skeleton while loading */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="card bg-white shadow-md rounded-2xl overflow-hidden animate-pulse"
              >
                {/* Image placeholder */}
                <div className="p-3">
                  <div className="w-full h-40 bg-gray-200 rounded-lg"></div>
                </div>

                {/* Body placeholder */}
                <div className="card-body p-3 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 👇 Real products after loading
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {latestProducts.map((product) => (
              <div
  key={product.id}
  className="card bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
>
  {/* Image — clickable to product details */}
  <figure className="p-3">
    <Link to={`/shop/${product.id}`}>
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition"
      />
    </Link>
  </figure>

  {/* Body */}
  <div className="card-body p-3 space-y-1">
    {/* Product Title — also clickable */}
    <Link
      to={`/shop/${product.id}`}
      className="block text-sm text-gray-700 font-medium truncate hover:text-blue-600 transition"
    >
      {product.title}
    </Link>
    <div className="flex justify-between">
      {/* Prices (not clickable) */}
      <div className="flex flex-col">
        <Link
      to={`/shop/${product.id}`}
      className="block text-sm text-gray-700 font-medium truncate hover:text-blue-600 transition"
    >
      {product.cross_price && (
      <p className="text-xs text-gray-500 line-through">
        ৳ {Number(product.cross_price).toFixed(2)}
      </p>
    )}

    <h5 className="text-red-600 font-bold">
      ৳ {Number(product.price).toFixed(2)}
    </h5>

    </Link>
        

      </div>
    
      <Link
        onClick={() => handleAddToWishlist(product.id)}
        
      >
        <CiHeart size={20} />
      </Link>
    </div>
  </div>
</div>

            ))}
          </div>
          
        )}
      </div>
       <div className="mb-25 mx-4 mt-4 bg-gray-100 ">
        <button className="bg-[#ff9100] rounded-2xl text-white btn w-full">{t("SeeAllProducts")}
        </button>
      </div>
    </section>
  );
};

export default LatestProducts;
