import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

import useUserAxios from "../../hooks/useUserAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useUserAxios();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/product/${id}`);
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

  if (loading) return <Spinner />;
  if (!product)
    return (
      <p className="text-center py-10 text-red-500">{t("productNotFound")}</p>
    );

  // ✅ Add to cart
  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: t("selectSize"),
      });
      return;
    }
    if (!selectedColor) {
      Swal.fire({
        icon: "warning",
        title: t("selectColor"),
      });
      return;
    }

    try {
      const res = await axiosSecure.post(`/cart/${id}`, {
        qty: Number(qty),
        size: selectedSize,
        color: selectedColor,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: t("addedToCart"),
          text: res.data.message || t("cartSuccess"),
          timer: 1500,
          showConfirmButton: false,
        });
        setQty(1);
        navigate("/shop");
      } else {
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: res.data.message || t("cartFailed"),
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: error.response?.data?.message || t("cartFailed"),
      });
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();

    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: t("selectSize"),
      });
      return;
    }
    if (!selectedColor) {
      Swal.fire({
        icon: "warning",
        title: t("selectColor"),
      });
      return;
    }

    try {
      const res = await axiosSecure.post(`/cart/${id}`, {
        qty: Number(qty),
        size: selectedSize,
        color: selectedColor,
      });

      if (res.data.success) {
        // Swal.fire({
        //   icon: "success",
        //   title: t("addedToCart"),
        //   text: res.data.message || t("cartSuccess"),
        //   timer: 1500,
        //   showConfirmButton: false,
        // });
        setQty(1);
        navigate("/checkout");
      } else {
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: res.data.message || t("cartFailed"),
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: error.response?.data?.message || t("cartFailed"),
      });
    }
  };
  // ✅ Add to wishlist
  const handleAddToWishlist = async () => {
    const wishlistData = {
      product_id: product.id,
      size: selectedSize,
      color: selectedColor,
      qty,
    };

    try {
      const res = await axiosSecure.post(`/wishlist/${id}`, wishlistData);
      Swal.fire({
        icon: "success",
        title: t("addedToWishlist"),
        text: res.data.message || t("wishlistSuccess"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: error.response?.data?.message || t("wishlistFailed"),
      });
    }
  };

  return (
    <main className="shadow-sm mx-auto max-w-[1280px] bg-gray-100  rounded-[60px] px-6 py-2">
      {/* Welcome text */}
      <section className="text-center pb-4">
        <h1 className="mt-4 text-xl">{t("welcome")}</h1>
      </section>

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

              {product.image_gal?.length > 0 && (
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

              {/* <div className="flex items-center gap-1 text-yellow-500">
                <FaStar size={20} color="gold" />
                <FaStar size={20} color="gold" />
                <FaStar size={20} color="gold" />
                <FaStarHalfAlt size={20} color="gold" />
                <FaRegStar size={20} color="gold" />
                <i className="fa fa-star-half-o"></i>
                <span className="ml-2 text-gray-600">(18 {t("reviews")})</span>
              </div> */}

              <div className="text-2xl font-semibold text-green-600">
                ${product.price}
                {product.cross_price && (
                  <span className="ml-2 text-gray-400 line-through">
                    ${product.cross_price}
                  </span>
                )}
              </div>

              <form onSubmit={handleAddToCart}>
                {/* Sizes */}
                {sizes.length > 0 && (
                  <div className="mb-2">
                    <b>{t("sizes")}: </b>
                    <div className="flex gap-2 mt-2">
                      {sizes.map((size, idx) => (
                        <label key={idx} className="cursor-pointer">
                          <input
                            type="radio"
                            name="size"
                            value={size}
                            checked={selectedSize === size}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="hidden"
                          />
                          <span
                            className={`badge mx-1 cursor-pointer ${
                              selectedSize === size
                                ? "badge-success text-white"
                                : "badge-info text-white"
                            }`}
                          >
                            {size}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {colors.length > 0 && (
                  <div className="mb-2">
                    <b>{t("colors")}: </b>
                    <div className="flex gap-2 mt-2">
                      {colors.map((color, idx) => (
                        <label key={idx} className="cursor-pointer">
                          <input
                            type="radio"
                            name="color"
                            value={color}
                            checked={selectedColor === color}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="hidden"
                          />
                          <span
                            className={`badge mx-1 cursor-pointer ${
                              selectedColor === color
                                ? "badge-success text-white"
                                : "badge-info text-white"
                            }`}
                          >
                            {color}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity + Buttons */}
                <div className="mt-4">
                  {/* <div>
                    <label className="block mb-1 text-sm font-medium">
                      {t("quantity")}
                    </label>
                    <input
                      type="number"
                      name="qty"
                      value={qty}
                      min="1"
                      onChange={(e) => setQty(e.target.value)}
                      className="input input-bordered w-24"
                    />
                  </div> */}

                  <div className="flex gap-4 mt-4">
                    <button
                      type="submit"
                      className="btn bn:sm lg:btn-md bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <FaShoppingCart /> {t("addToCart")}
                    </button>
                    <button
                      type="button"
                      onClick={handleAddToWishlist}
                      className="btn btn-outline flex items-center gap-2"
                    >
                      <FaHeart /> {t("wishlist")}
                    </button>
                   
                  </div>
                   <button
                      type="button"
                      onClick={handleBuy}
                      className="btn btn-outline bg-yellow-400 border-none text-white w-1/2 my-4 flex items-center gap-2"
                    >
                      {t("Buy Now")}
                    </button>
                </div>
              </form>

              <ul className="text-gray-700 space-y-1">
                <li>
                  <b>{t("availability")}:</b>{" "}
                  {product.status === 1 ? t("inStock") : t("outOfStock")}
                </li>
                <li>
                  <b>{t("category")}:</b> {product.category?.name || "N/A"}
                </li>
              </ul>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10">
            <div role="tablist" className="tabs tabs-bordered">
              <input
                type="radio"
                name="tab"
                role="tab"
                className="tab"
                aria-label={t("description")}
                defaultChecked
              />
              <div role="tabpanel" className="tab-content p-4">
                <h6 className="font-semibold mb-2">
                  {t("productDescription")}
                </h6>
                <p>{product.description}</p>
              </div>

              <input
                type="radio"
                name="tab"
                role="tab"
                className="tab"
                aria-label={t("info")}
              />
              <div role="tabpanel" className="tab-content p-4">
                <h6 className="font-semibold mb-2">{t("productInfo")}</h6>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>
                    <b>{t("category")}:</b> {product.category?.name || "N/A"}
                  </li>
                  <li>
                    <b>{t("weight")}:</b> 0.5 kg
                  </li>
                  <li>
                    <b>{t("shipping")}:</b> 1 {t("dayShipping")}
                  </li>
                </ul>
              </div>

              {/* <input
                type="radio"
                name="tab"
                role="tab"
                className="tab"
                aria-label={t("reviews")}
              /> */}
              <div role="tabpanel" className="tab-content p-4">
                <h6 className="font-semibold mb-2">{t("customerReviews")}</h6>
                <p>{t("noReviews")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
