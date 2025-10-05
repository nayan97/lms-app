import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { FaTrash, FaEdit } from "react-icons/fa";

const Wishlist = () => {
  const axios = useAxiosSecure();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/wishlist", {
          withCredentials: true,
        });

        if (response.data.status && Array.isArray(response.data.wishlist)) {
          setWishlistItems(response.data.wishlist);
        } else {
          setWishlistItems([]);
        }
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError(t("wishlistLoadFailed"));
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [axios, t]);

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
    axios.post(`/wishlist/move-to-cart/${itemId}`, {}, { withCredentials: true });
  };
  const handleDelete=(itemId)=>{
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
          setWishlistItems((prev) => prev.filter((item) => item.id !== itemId)); // ✅ update UI instantly
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
  }

  return (
    <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-[50px] px-6 py-2">
      <section className="flex justify-center items-center py-3">
        <h2 className="text-2xl font-bold text-center">{t("myWishlist")}</h2>
      </section>

      <section className="wishlist">
        <div className="container mx-auto">
          {wishlistItems.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full bg-white rounded-xl shadow">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th>Id</th>
                      <th>{t("products")}</th>
                      <th className="hidden sm:table-cell">{t("size")}</th>
                      <th className="hidden sm:table-cell">{t("color")}</th>
                      <th>{t("price")}</th>
                      <th>{t("action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((item) => (
                      <tr key={item.id}>
                        <td className="font-medium">{item.id}</td>
                        <td className="flex items-center gap-2">
                          <img
                            src={item.image_url}
                            alt={item.product_title}
                            className="w-14 h-14 object-cover rounded"
                          />
                          <h5 className="font-semibold">{item.product_title}</h5>
                        </td>
                        <td className="hidden sm:table-cell">{item.size || "-"}</td>
                        <td className="hidden sm:table-cell">{item.color || "-"}</td>
                        <td className="font-medium">${item.price}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleEdit(item.id)}
                              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              <FaEdit />
                            </button>

                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between mt-6">
                <Link
                  to="/shop"
                  className="btn bg-white text-gray-800 shadow rounded-xl"
                >
                  {t("continueShopping")}
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">{t("wishlistEmpty")}</h1>
              <Link
                to="/shop"
                className="btn bg-white shadow rounded-xl text-gray-800"
              >
                {t("continueShopping")}
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Wishlist;
