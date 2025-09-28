import { useEffect, useState } from "react";
import useUserAxios from "../../hooks/useUserAxios";

const Home = () => {
  const axios = useUserAxios();
  const [popularProducts, setPopularProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/home");
        setPopularProducts(data.popularProducts);
        setLatestProducts(data.latestpros);
      } catch (error) {
        console.error("Error fetching home products", error);
      }
    };
    fetchProducts();
  }, [axios]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Popular Products */}
      <section className="py-6 rounded-t-[50px] bg-gray-100">
        <div className="container mx-auto px-4">
          <h4 className="mb-4 text-xl font-bold">Most Popular Products</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="card bg-white shadow-sm rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <figure className="p-2">
                  <img
                    src={`/storage/${product.image}`}
                    alt={product.title}
                    className="rounded-xl object-cover aspect-[4/3] w-full"
                  />
                </figure>

                {/* Card Body */}
                <div className="card-body p-2">
                  <h6 className="text-sm text-gray-600">{product.title}</h6>

                  {product.cross_price && (
                    <p className="text-xs text-gray-400 line-through">
                      ৳ {Number(product.cross_price).toFixed(2)}
                    </p>
                  )}

                  <h5 className="text-red-600 font-bold text-base">
                    ৳ {Number(product.price).toFixed(2)}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-6 rounded-b-[50px] bg-gray-100">
        <div className="container mx-auto px-4">
          <h4 className="mb-4 text-xl font-bold">Latest Products</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {latestProducts.map((product) => (
              <div
                key={product.id}
                className="card bg-white shadow-sm rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <figure className="p-2">
                  <img
                    src={`/storage/${product.image}`}
                    alt={product.title}
                    className="rounded-xl object-cover aspect-[4/3] w-full"
                  />
                </figure>

                {/* Card Body */}
                <div className="card-body p-2">
                  <h6 className="text-sm text-gray-600">{product.title}</h6>

                  {product.cross_price && (
                    <p className="text-xs text-gray-400 line-through">
                      ৳ {Number(product.cross_price).toFixed(2)}
                    </p>
                  )}

                  <h5 className="text-red-600 font-bold text-base">
                    ৳ {Number(product.price).toFixed(2)}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
