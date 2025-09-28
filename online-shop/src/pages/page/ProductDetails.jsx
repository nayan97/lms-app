import React, { useEffect, useState } from "react";

import useUserAxios from "../../hooks/useUserAxios";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useParams } from "react-router";

import Spinner from "../../components/Spinner";

import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();

  // console.log(id);

  const axios = useUserAxios();

  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);

  const [sizes, setSizes] = useState([]);

  const [colors, setColors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/product/${id}`);

        // console.log(data);

        setProduct(data.data.product);

        setSizes(data.data.sizes || []);

        setColors(data.data.colors || []);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [axios, id]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!product) {
    return <p className="text-center py-10 text-red-500">Product not found!</p>;
  }

  const handleAddToCart = async (e) => {
    e.preventDefault();

    try {
      // Send only qty in body, product ID is in URL

      const res = await axiosSecure.post(`/cart/${id}`, {
        qty,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Added to cart!");

        // Optional: update local cart state or refetch cart

        // setCartItems(prev => [...prev, res.data.cartItem]);
      } else {
        toast.error(res.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error(error);

      // Show backend error message if exists

      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <main className="shadow-sm mx-auto max-w-[1280px] bg-gray-100 rounded-[50px] p-6">
      <section className="product-details">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT IMAGE SECTION */}

            <div className="product__details__pic">
              <div className="mb-4">
                <img
                  className="rounded-lg w-full object-cover"
                  src={product.image_url}
                  alt={product.title}
                />
              </div>

              {product.image_gal && product.image_gal.length > 0 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.image_gal.map((gal, index) => (
                    <img
                      key={index}
                      className="w-24 h-24 rounded-lg cursor-pointer hover:scale-105 transition"
                      src={gal}
                      alt={product.title}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT DETAILS SECTION */}

            <div className="product__details__text space-y-4">
              <h3 className="text-2xl font-bold">{product.title}</h3>

              <div className="flex items-center gap-1 text-yellow-500">
                <i className="fa fa-star"></i>

                <i className="fa fa-star"></i>

                <i className="fa fa-star"></i>

                <i className="fa fa-star"></i>

                <i className="fa fa-star-half-o"></i>

                <span className="ml-2 text-gray-600">(18 reviews)</span>
              </div>

              <div className="text-2xl font-semibold text-green-600">
                ${product.price}
                {product.cross_price && (
                  <span className="ml-2 text-gray-400 line-through">
                    ${product.cross_price}
                  </span>
                )}
              </div>

              <p className="text-gray-700">{product.short_description}</p>

              {/* Sizes */}

              {sizes.length > 0 && (
                <div>
                  <b>Sizes: </b>

                  {sizes.map((size, idx) => (
                    <span
                      key={idx}
                      className="badge badge-info mx-1 text-white"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}

              {/* Colors */}

              {colors.length > 0 && (
                <div>
                  <b>Colors: </b>

                  {colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="badge badge-secondary mx-1 text-white"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              )}

              <form onSubmit={handleAddToCart} className="flex items-end gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Quantity
                  </label>

                  <input
                    type="number"
                    name="qty"
                    value={qty}
                    min="1"
                    onChange={(e) => setQty(e.target.value)}
                    className="input input-bordered w-24"
                  />
                </div>

                <button
                  type="submit"
                  className="btn bg-green-600 hover:bg-green-700 text-white"
                >
                  🛒 Add to Cart
                </button>
              </form>

              <button className="btn btn-outline mt-2 flex items-center">
                <span className="icon_heart_alt mr-2"></span> Wishlist
              </button>

              <ul className="text-gray-700 space-y-1">
                <li>
                  <b>Availability:</b>{" "}
                  {product.status === 1 ? "In Stock" : "Out Of Stock"}
                </li>

                <li>
                  <b>Category:</b> {product.category?.name || "N/A"}
                </li>
              </ul>
            </div>
          </div>

          {/* DESCRIPTION / INFO / REVIEWS */}

          <div className="mt-10">
            <div role="tablist" className="tabs tabs-bordered">
              <input
                type="radio"
                name="tab"
                role="tab"
                className="tab"
                aria-label="Description"
                defaultChecked
              />

              <div role="tabpanel" className="tab-content p-4">
                <h6 className="font-semibold mb-2">Product Description</h6>

                <p>{product.description}</p>
              </div>

              <input
                type="radio"
                name="tab"
                role="tab"
                className="tab"
                aria-label="Additional Information"
              />

              <div role="tabpanel" className="tab-content p-4">
                <h6 className="font-semibold mb-2">Product Information</h6>

                <ul className="list-disc pl-6 text-gray-700">
                  <li>
                    <b>Category:</b> {product.category?.name || "N/A"}
                  </li>

                  <li>
                    <b>Weight:</b> 0.5 kg
                  </li>

                  <li>
                    <b>Shipping:</b> 1 Day shipping (Free pickup today)
                  </li>
                </ul>
              </div>

              <input
                type="radio"
                name="tab"
                role="tab"
                className="tab"
                aria-label="Reviews"
              />

              <div role="tabpanel" className="tab-content p-4">
                <h6 className="font-semibold mb-2">Customer Reviews</h6>

                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
