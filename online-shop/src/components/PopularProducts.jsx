import React, { useEffect, useState } from "react";
import useUserAxios from "../hooks/useUserAxios";
import { Link } from "react-router";
import { t } from "i18next";

const PopularProducts = () => {
  const axios = useUserAxios();
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/home");
        setPopularProducts(data.popularProducts || []);
      } catch (err) {
        console.error("Error fetching shop data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-6 mx-auto container max-w-[1280px] bg-gray-100 ">
      <div className="px-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="mb-4 text-lg font-semibold">
            {t("MostPopularProducts")}
          </h4>
          <Link to={"/popularproduct"} className="text-sm text-gray-500">
            {t("SeeAll")}
          </Link>
        </div>

        {/* 👇 Skeleton loader while loading */}
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 pb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="card bg-white shadow-md rounded-2xl overflow-hidden animate-pulse"
              >
                {/* Image placeholder */}
                <div className="p-3">
                  <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
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
          // 👇 Show real products after loading
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularProducts.map((product) => (
              <Link
                to={`/shop/${product.id}`}
                key={product.id}
                className="card bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                <figure className="p-3">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </figure>

                {/* Body */}
                <div className="card-body p-3">
                  <h6 className="text-sm text-gray-700 truncate">
                    {product.title}
                  </h6>

                  {product.cross_price && (
                    <p className="text-xs text-gray-500 line-through">
                      ৳ {Number(product.cross_price).toFixed(2)}
                    </p>
                  )}

                  <h5 className="text-red-600 font-bold">
                    ৳ {Number(product.price).toFixed(2)}
                  </h5>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
