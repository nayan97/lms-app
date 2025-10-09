import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

const LatestProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [cartCount, setCartCount] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosSecure.get("/home");
        setLatestProducts(data.allProducts || []);
      } catch (err) {
        console.error("Error fetching shop data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(latestProducts);
  // Fetch cart count
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axiosSecure.get("/cart");
        if (data.success) {
          setCartCount(data.cartItems.length);
        }
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };
    fetchCart();
  }, [axiosSecure]);

  const handleAddToWishlist = async (id) => {
      
  
      
  
      // ✅ Build payload — only include optional values
      const wishlistData = {
        product_id: id,
        qty
      };
  
      try {
        const res = await axiosSecure.post(`/wishlist/${id}`, wishlistData);
        Swal.fire({
          icon: "success",
          title: t("addedToWishlist") || "Added to Wishlist!",
          text:
            res.data.message ||
            t("wishlistSuccess") ||
            "Your item has been added successfully.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("error") || "Error",
          text:
            error.response?.data?.message ||
            t("wishlistFailed") ||
            "Failed to add to wishlist.",
        });
      }
    };

  // ✅ Skeleton loader while fetching
  if (loading) {
    return (
      <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-t-[50px] px-6 py-6">
        <section className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>

          <div className="overflow-x-auto mt-6">
            <table className="table w-full bg-white rounded-xl shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="h-4"></th>
                  <th className="h-4"></th>
                  <th className="hidden sm:table-cell h-4"></th>
                  <th className="hidden sm:table-cell h-4"></th>
                  <th className="h-4"></th>
                  <th className="h-4"></th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </td>
                    <td className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gray-200 rounded"></div>
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="hidden sm:table-cell">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td className="hidden sm:table-cell">
                      <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td>
                      <div className="w-12 h-4 bg-gray-200 rounded"></div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="text-center py-12">
        <h2 className="text-red-600 text-xl">{error}</h2>
      </main>
    );
  }

  
  

  return (
    <div>
      <div className="bg-[#ff9100] h-20">
        <div className="flex justify-around items-center gap-4">
          <Link
            to={"/shop"}
            className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
          >
            ←
          </Link>
          <h1 className="text-white  font-bold">
            {" "}
            {t("AllProduct")}
            {/* Cart & Wishlist */}
          </h1>

          <Link
            to="/wishlist"
            className="relative w-10 h-10 flex text-white items-center justify-center rounded-full shadow-lg bg-[#ff9100]"
          >
            <CiHeart size={20} className="text-2xl" />
          </Link>

          <Link
            to="/my-cart"
            className="relative w-10 h-10 text-white flex items-center justify-center rounded-full shadow-lg bg-[#ff9100]"
          >
            <IoCartOutline className="text-2xl " />
            <span className="badge badge-sm border-none text-white bg-red-600 absolute -top-1 -right-1">
              {cartCount ?? 0}
            </span>
          </Link>
        </div>
      </div>

      <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-t-[50px] px-6 py-2">
        <section className="wishlist">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {latestProducts?.map((product) => (
                        <div
            key={product?.id}
            className="card bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            {/* Image — clickable to product details */}
            <figure className="p-3">
              <Link to={`/shop/${product?.id}`}>
                <img
                  src={product?.image_url}
                  alt={product?.title}
                  className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition"
                />
              </Link>
            </figure>
          
            {/* Body */}
            <div className="card-body p-3 space-y-1">
              {/* Product Title — also clickable */}
              <Link
                to={`/shop/${product?.id}`}
                className="block text-sm text-gray-700 font-medium truncate hover:text-blue-600 transition"
              >
                {product?.title}
              </Link>
              <div className="flex justify-between">
                {/* Prices (not clickable) */}
                <div className="flex flex-col">
                  <Link
                to={`/shop/${product?.id}`}
                className="block text-sm text-gray-700 font-medium truncate hover:text-blue-600 transition"
              >
                {product?.cross_price && (
                <p className="text-xs text-gray-500 line-through">
                  ৳ {Number(product?.cross_price).toFixed(2)}
                </p>
              )}
          
              <h5 className="text-red-600 font-bold">
                ৳ {Number(product?.price).toFixed(2)}
              </h5>
          
              </Link>
                  
          
                </div>
              
                <Link
                  onClick={() => handleAddToWishlist(product?.id)}
                  
                >
                  <CiHeart size={20} />
                </Link>
              </div>
            </div>
          </div>
          
                      ))}
                    </div>
        </section>
      </main>
    </div>
  );
};

export default LatestProduct;
