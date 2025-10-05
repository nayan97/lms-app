import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  Store,
  Info,
  ArrowBigDownDash,
  Copy,
} from "lucide-react";
import productImg from "../../assets/offer.png"; // replace with your image path
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import useUserAxios from "../../hooks/useUserAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/Spinner";
import { IoCartOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

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
  console.log(colors);
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  const [cartCount, setCartCount] = useState(0);
 const [selectedImage, setSelectedImage] = useState(null);

// When product is loaded, set first gallery image or fallback to main image
useEffect(() => {
  if (product) {
    if (product.image_gal?.length > 0) {
      setSelectedImage(product.image_gal[0]);
    } else {
      setSelectedImage(product.image_url);
    }
  }
}, [product]); // <-- watch 'product'

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/product/${id}`);

        setProduct(data.data.product);
        setSizes(data.data.sizes || []);
        setColors(data.data.colors || []);
        setSelectedImage(data?.product?.image_gal[0]);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [axios, id]);

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
    // 🧠 Check if this product offers size or color options
    const hasSizeOption = product.sizes?.length > 0;
    console.log(hasSizeOption);
    const hasColorOption = product.colors?.length > 0;
    console.log(hasColorOption);

    // 🛑 Validate only if the option exists but isn’t selected
    if (hasSizeOption && !selectedSize) {
      return Swal.fire({
        icon: "warning",
        title: t("selectSizeTitle") || "Size Required",
        text:
          t("selectSizeText") ||
          "Please select a size before adding to wishlist.",
      });
    } else if (hasColorOption && !selectedColor) {
      return Swal.fire({
        icon: "warning",
        title: t("selectColorTitle") || "Color Required",
        text:
          t("selectColorText") ||
          "Please select a color before adding to wishlist.",
      });
    } else if (!selectedSize && !selectedColor) {
      return Swal.fire({
        icon: "warning",
        title: t("selectColor and size Title") || "Color and size Required",
        text:
          t("selectColorText") ||
          "Please select a size and a color  before adding to wishlist.",
      });
    }

    // ✅ Build payload — only include optional values
    const wishlistData = {
      product_id: product.id,
      qty,
      ...(selectedSize && { size: selectedSize }),
      ...(selectedColor && { color: selectedColor }),
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
  const referCode = "45425486";
  const handleCopy = () => {
    navigator.clipboard.writeText(referCode);
    console.log("Copied code!");
    // Optional: nice feedback
    alert("Product code copied!");
  };
  const handleCopyProductName = () => {
    navigator.clipboard.writeText(product.title);
    console.log("Copied Name!");
    // Optional: nice feedback
    alert("Product name copied!");
  };
  const handleCopyProductDetails = () => {
    navigator.clipboard.writeText(product.description);
    console.log("Copied Details!");
    // Optional: nice feedback
    alert("Product details copied!");
  };



  return (
    <div className="min-h-screen rounded-t-[50px] flex flex-col bg-[#ff9100]">
      {/* Header */}
      <div className="bg-[#ff9100]  p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
        >
          ←
        </button>
        <div className="flex flex-col w-2/3">
          <h1 className="text-white font-semibold text-sm truncate w-2/3">
            {product.title}
          </h1>

          <div className="flex items-center text-black">
            <span>
              {t("ProductCode")}: {referCode}
            </span>
            <Copy
              onClick={handleCopy}
              className="size-4 ml-2 cursor-pointer text-black transition"
            />
          </div>
        </div>

        <div className=" flex space-x-3  text-white">
          <Link
            to="/my-cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full shadow-lg bg-[#ff9100]"
          >
            <IoCartOutline className="text-2xl " />
            <span className="badge badge-xs rounded-full border-none bg-red-600 text-white absolute -top-1 -right-1">
              {cartCount ?? 0}
            </span>
          </Link>
          <div className="bg-[#ff9100] rounded-full p-1 shadow-lg text-white">
            <ArrowBigDownDash />
          </div>
        </div>
      </div>
      <div>
        {/* Main Image */}
        <div className="bg-white rounded-t-[50px] p-4">
          <img
            src={
              selectedImage}
            alt="Product"
            className="w-full rounded-xl transition-all duration-300"
          />
        </div>

        {/* Image Gallery Thumbnails */}
      </div>

      <div className="bg-gray-100">
        {/* Product Image */}

        {product.image_gal?.length > 0 && (
          <div className="flex gap-2 overflow-x-auto mt-3 pb-2">
            {product.image_gal.map((gal, index) => (
              <img
                key={index}
                src={gal}
                alt={product.title}
                onClick={() => setSelectedImage(gal)}
                className={`w-24 h-24 rounded-lg cursor-pointer object-cover transition-transform hover:scale-105 border-2 ${
                  selectedImage === gal
                    ? "border-yellow-500"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        )}

        {/* Product Info */}
        <div className="p-4 mt-2 rounded-xl shadow">
          <div className="flex w-full">
            <div className="flex w-2/3">
              <h2 className="text-lg font-bold">{product.title}</h2>
              <Copy
                onClick={handleCopyProductName}
                className="size-10 ml-2 cursor-pointer text-black transition"
              />
            </div>
            <div className="ml-25 rounded-full h-8 bg-red-100 p-2">
              <button onClick={handleAddToWishlist}>
                <CiHeart size={20} />
              </button>
            </div>
          </div>

          <p className="text-green-500 font-medium">Stock: instock</p>
          <div className="mt-2 space-y-1">
            <div className="flex bg-white rounded-2xl p-2 justify-center">
              <p className="font-semibold text-center ">
                Admin Price: <span className="text-black">৳999</span>
              </p>
            </div>
            <div className="flex bg-white rounded-2xl p-2 justify-center">
              <p className="font-semibold text-center">
                Reseller Price: <span className="text-green-600">৳1400</span>
              </p>
            </div>
          </div>

          {/* Size Selector */}
          {sizes.length > 0 && (
            <div className="p-4 mt-2 bg-gray-100 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Select Size</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg shadow ${
                      selectedSize === size
                        ? "bg-yellow-400 text-white border-yellow-500"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {colors.length > 0 && (
            <div className="p-4 mt-2 bg-gray-100 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">Select Color</h3>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg shadow ${
                      selectedColor === color
                        ? "bg-yellow-400 text-white border-yellow-500"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Seller */}
          {/* <div className="flex items-center justify-between mt-3 bg-gray-100 rounded-lg p-2">
            <div className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">{product.source_url}</span>
            </div>
            <button className="bg-yellow-400 text-white px-3 py-1 rounded-lg">
              Store
            </button>
          </div> */}
        </div>

        {/* Product Details */}
        <div className="p-4 mt-2 mb-20 bg-white shadow rounded-xl">
          <div className="flex justify-between">
            <h3 className="flex items-center font-semibold text-lg mb-2">
              <Info className="w-5 h-5 mr-2" /> Product Details
            </h3>
            <Copy
              onClick={handleCopyProductDetails}
              className="size-5 ml-2 cursor-pointer text-black transition"
            />
          </div>

          <p>{product.description || "No description available."}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed left-1/2 -translate-x-1/2 w-full gap-2 mb-2 bottom-0 flex px-2">
        <button
          onClick={handleAddToCart}
          className="w-full rounded-xl bg-yellow-400 text-white py-3 font-semibold flex items-center justify-center"
        >
          <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
        </button>
        <button
          onClick={handleBuy}
          className="w-full rounded-xl bg-orange-500 text-white py-3 font-semibold"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
