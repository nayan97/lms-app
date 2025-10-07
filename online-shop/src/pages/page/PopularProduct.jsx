import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

const PopularProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [cartCount, setCartCount] = useState(0);

  const [wishlistItems, setPopularProductItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPopularProduct = async () => {
      try {
        const response = await axios.get("/wishlist", {
          withCredentials: true,
        });

        if (response.data.status && Array.isArray(response.data.wishlist)) {
          setPopularProductItems(response.data.wishlist);
        } else {
          setPopularProductItems([]);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError(t("wishlistLoadFailed"));
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProduct();
  }, [axios, t]);

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

  // ✅ Skeleton loader while fetching
  if (loading) {
    return (
      <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-[50px] px-6 py-6">
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

  const handleEdit = (itemId) => {
    axios.post(
      `/wishlist/move-to-cart/${itemId}`,
      {},
      { withCredentials: true }
    );
  };
  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your wishlist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`/wishlist/remove/${itemId}`);
          if (res.status === 200) {
            setPopularProductItems((prev) =>
              prev.filter((item) => item.id !== itemId)
            ); // ✅ update UI instantly
            Swal.fire({
              title: "Deleted!",
              text: "The item has been removed from your wishlist.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete item. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

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
            {t("PopularProduct")}
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
        </section>
      </main>
    </div>
  );
};

export default PopularProduct;
