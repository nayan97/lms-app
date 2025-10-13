import React, { useEffect, useState } from "react";
import useUserAxios from "../hooks/useUserAxios";
import { Link, useParams } from "react-router";
import { CiHeart } from "react-icons/ci";
import { t } from "i18next";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const LatestProducts = () => {
  const axios = useUserAxios();
  const axiosSecure = useAxiosSecure();
    const { id } = useParams();
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("White");

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

  // console.log(latestProducts);
  const handleAddToWishlist = async (id, e) => {
    e.preventDefault(); // prevent full page reload
    const formData = new FormData(e.target);

    const wishlistData = {
      product_id: formData.get("product_id"),
      qty: formData.get("qty"),
      size: formData.get("size"),
      color: formData.get("color"),
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
  }
  return (
    <section className="py-6 mx-auto container max-w-[1280px] bg-gray-100">
      <div className="px-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="mb-4 text-lg font-semibold">{t("LatestProducts")}</h4>
          <Link to={"/latestproduct"} className="text-sm text-gray-500">
            {t("SeeAll")}
          </Link>
        </div>

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

                    <form onSubmit={handleAddToWishlist}>
                      {/* Hidden inputs */}
                      <input
                        type="hidden"
                        name="product_id"
                        value={product.id}
                      />
                      <input type="hidden" name="qty" value={qty || 1} />
                      <input type="hidden" name="size" value={size || "M"} />
                      <input type="hidden" name="color" value={color || "White"} />

                      <button type="submit" className="flex items-center">
                        <CiHeart size={20} />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-25 mx-4 mt-4 bg-gray-100 ">
        <Link
          to="/latestproduct"
          className="bg-[#ff9100] rounded-2xl text-white btn w-full"
        >
          {t("SeeAllProducts")}
        </Link>
      </div>
    </section>
  );
};

export default LatestProducts;
