import React, { useEffect, useState } from "react";
import useUserAxios from "../hooks/useUserAxios";
import { Link } from "react-router";
const LatestProducts = () => {
  const axios = useUserAxios();

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/home");

        setLatestProducts(data.latestpros || []);

        // console.log(data.latestpros);
  
      } catch (err) {
        console.error("Error fetching shop data", err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <section className="py-6 mx-auto container max-w-[1280px] bg-gray-100 rounded-b-[50px]">
        <div className="px-4">
          <h4 className="mb-4 text-lg font-semibold">Latest Products</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {latestProducts.map((product) => (
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
                    className="w-full h-40 object-cover rounded-lg"
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
        </div>
      </section>
    </div>
  );
};

export default LatestProducts;
