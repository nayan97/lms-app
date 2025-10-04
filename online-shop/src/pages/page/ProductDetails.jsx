import React, { useEffect, useState } from "react";
import { ShoppingCart, Store, Info } from "lucide-react";
import productImg from "../../assets/offer.png"; // replace with your image path
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import useUserAxios from "../../hooks/useUserAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner";

export default function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;
  console.log(page);
   const { id } = useParams();
  const axios = useUserAxios();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  console.log(product);
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
    <div className="min-h-screen  flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-yellow-400 p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-white text-xl">←</button>
        <h1 className="text-white font-semibold text-sm truncate w-2/3">
            {product.title}
        </h1>
        <div className="flex space-x-3 text-white">
          <button>🛒</button>
          <button>↗</button>
        </div>
      </div>

      {/* Product Image */}
      <div className="bg-white p-4">
        <img src={product.image_url} alt="Product" className="w-full rounded-xl" />
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

      {/* Product Info */}
      <div className="p-4 mt-2 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
            {product.title}
        </h2>
        <p className="text-green-500 font-medium">Stock: instock</p>
        <div className="mt-2 space-y-1">
            <div className="flex bg-white rounded-2xl p-2 justify-center">
                <p className="font-semibold text-center ">
                  Admin Price: <span className="text-red-500">৳999</span>
            </p>
            </div>
            <div className="flex bg-white rounded-2xl p-2 justify-center">
                <p className="font-semibold text-center">
            Reseller Price: <span className="text-green-600">৳1400</span>
          </p>
            </div>
          
         
        </div>

        

      {/* Size Selector */}
      <div className="p-4 mt-2 bg-white shadow rounded-xl">
        <h3 className="font-semibold text-lg mb-2">Select Size</h3>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-lg border ${
                selectedSize === size
                  ? "bg-yellow-400 text-white border-yellow-500"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selector */}
      <div className="p-4 mt-2 bg-white shadow rounded-xl">
        <h3 className="font-semibold text-lg mb-2">Select Color</h3>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 rounded-lg border ${
                selectedColor === color
                  ? "bg-yellow-400 text-white border-yellow-500"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Seller */}
        <div className="flex items-center justify-between mt-3 bg-gray-100 rounded-lg p-2">
          <div className="flex items-center space-x-2">
            <Store className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">Sunlight Enterpris</span>
          </div>
          <button className="bg-yellow-400 text-white px-3 py-1 rounded-lg">
            Store
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 mt-2 mb-20 bg-white shadow rounded-xl">
        <h3 className="flex items-center font-semibold text-lg mb-2">
          <Info className="w-5 h-5 mr-2" /> Product Details
        </h3>
        <p>
            {product.description || "No description available."}
        </p>
      </div>

      {/* Footer */}
      <div className="fixed w-full gap-2 mb-2 bottom-0 flex px-2">
        <button onClick={handleAddToCart} className="w-full rounded-xl bg-yellow-400 text-white py-3 font-semibold flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
        </button>
        <button onClick={handleBuy} className="w-full rounded-xl bg-orange-500 text-white py-3 font-semibold">
          Order Now
        </button>
      </div>
    </div>
  );
}
