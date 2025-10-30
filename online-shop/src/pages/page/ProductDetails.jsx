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
import Header from "../Shared/Header";

export default function ProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;
  // console.log(page);
  const { id } = useParams();
  const axios = useUserAxios();
  const axiosSecure = useAxiosSecure();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  // console.log(product);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [colors, setColors] = useState([]);
  // console.log(colors);
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
        console.log(data.data.product);
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

    const hasSizeOption = product.sizes?.length > 0;
    const hasColorOption = product.colors?.length > 0;

    // 🧩 Validate only when size/color options exist
    if (hasSizeOption && !selectedSize) {
      return Swal.fire({
        icon: "warning",
        title: t("selectSizeTitle") || "Size Required",
        text:
          t("selectSizeText") || "Please select a size before adding to cart.",
      });
    }

    if (hasColorOption && !selectedColor) {
      return Swal.fire({
        icon: "warning",
        title: t("selectColorTitle") || "Color Required",
        text:
          t("selectColorText") ||
          "Please select a color before adding to cart.",
      });
    }

    try {
      const res = await axiosSecure.post(`/cart/${id}`, {
        qty: Number(qty),
        ...(selectedSize && { size: selectedSize }),
        ...(selectedColor && { color: selectedColor }),
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: t("addedToCart") || "Added to Cart!",
          text:
            res.data.message || t("cartSuccess") || "Item added successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        setQty(1);
        navigate("/shop");
      } else {
        Swal.fire({
          icon: "error",
          title: t("error") || "Error",
          text: res.data.message || t("cartFailed") || "Failed to add to cart.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error") || "Error",
        text:
          error.response?.data?.message ||
          t("cartFailed") ||
          "Failed to add to cart.",
      });
    }
  };

  const handleBuy = async (e) => {
    e.preventDefault();

    const hasSizeOption = product.sizes?.length > 0;
    const hasColorOption = product.colors?.length > 0;

    // ✅ Only validate if options exist
    if (hasSizeOption && !selectedSize) {
      return Swal.fire({
        icon: "warning",
        title: t("selectSizeTitle") || "Size Required",
        text: t("selectSizeText") || "Please select a size before buying.",
      });
    }

    if (hasColorOption && !selectedColor) {
      return Swal.fire({
        icon: "warning",
        title: t("selectColorTitle") || "Color Required",
        text: t("selectColorText") || "Please select a color before buying.",
      });
    }

    try {
      const res = await axiosSecure.post(`/oneclickorder/${id}`, {
        qty: Number(qty),
        ...(selectedSize && { size: selectedSize }),
        ...(selectedColor && { color: selectedColor }),
      });

      if (res.data.success) {
        // ✅ Reset quantity & go to checkout
        setQty(1);
        navigate("/oneclickorder");
      } else {
        Swal.fire({
          icon: "error",
          title: t("error") || "Error",
          text: res.data.message || t("cartFailed") || "Failed to add to cart.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error") || "Error",
        text:
          error.response?.data?.message ||
          t("cartFailed") ||
          "Failed to add to cart.",
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

  // Copy refer code
  const handleCopy = () => {
    navigator.clipboard
      .writeText(referCode)
      .then(() => {
        console.log("Copied code!");
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Product code copied to clipboard",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy the code",
        });
      });
  };

  // Copy product name
  const handleCopyProductName = () => {
    navigator.clipboard
      .writeText(product.title)
      .then(() => {
        console.log("Copied Name!");
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Product name copied to clipboard",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy the name",
        });
      });
  };

  // Copy product details
  const handleCopyProductDetails = () => {
    navigator.clipboard
      .writeText(product.description)
      .then(() => {
        console.log("Copied Details!");
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: "Product details copied to clipboard",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy the details",
        });
      });
  };

  const handleDownloadGallery = () => {
    if (!product?.image_gal?.length) {
      alert("No gallery images found!");
      return;
    }

    product.image_gal.forEach((image, index) => {
      // Full URL to Laravel public storage
      const imageUrl = `/${image}`;

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = image; // filename
      document.body.appendChild(link);

      // Delay to avoid browser blocking multiple downloads
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
      }, index * 1000);
    });
  };

  

//   const handleDownloadGallery = () => {
//     if (!product?.image_gal?.length) {
//       alert("No gallery images found!");
//       return;
//     }
// console.log( product.image_gal);

//     product.image_gal.forEach((image, index) => {
//       const imageUrl = `/storage/products/gallery/${image}`; // ✅ full URL

//       const link = document.createElement("a");
//       link.href = imageUrl;
//       link.download = image.split("/").pop(); // just filename
//       document.body.appendChild(link);

//       setTimeout(() => {
//         link.click();
//         document.body.removeChild(link);
//       }, index * 1000);
//     });
//   };

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
          <div
            onClick={handleDownloadGallery}
            className="bg-[#ff9100] rounded-full p-1 shadow-lg text-white"
          >
            <ArrowBigDownDash />
          </div>
        </div>
      </div>

      <div>
        {/* Main Image */}
        <div className="bg-white rounded-t-[50px] p-4">
          <img
            src={selectedImage}
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
                className="size-6 ml-2 cursor-pointer text-black transition"
              />
            </div>
            <div className="ml-25 rounded-full h-8 bg-red-100 p-2">
              <button onClick={handleAddToWishlist}>
                <CiHeart size={20} />
              </button>
            </div>
          </div>

          <p
            className={`font-medium ${
              product.status === 1 ? "text-green-500" : "text-red-500"
            }`}
          >
            {t("Stock")}:{" "}
            {product.status === 1 ? t("In Stock") : t("Stock Out")}
          </p>

          <div className="mt-2 space-y-1">
            <div className="flex bg-white rounded-2xl p-2 justify-center">
              <p className="font-semibold text-center ">
                Admin Price:{" "}
                <span className="text-black">৳{product.price}</span>
              </p>
            </div>
            <div className="flex bg-white rounded-2xl p-2 justify-center">
              <p className="font-semibold text-center">
                Reseller Price:{" "}
                <span className="text-green-600">৳{product.max_price}</span>
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
                        ? "bg-white text-gray-700 border-1 border-yellow-500"
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
                        ? "bg-white text-gray-700 border-1 border-yellow-500"
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
