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

  // ✅ Fetch wishlist data
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

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
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

  return (
    <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-[50px] px-6 py-2">
      {/* Breadcrumb Section */}
      <section className="flex justify-between items-center py-3">
        <h2 className="text-2xl font-bold text-center">{t("myWishlist")}</h2>
      </section>

      {/* Wishlist Section */}
      <section className="wishlist">
        <div className="container mx-auto">
          {wishlistItems.length > 0 ? (
            <>
              {/* Wishlist Table */}
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
                    {wishlistItems.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="font-medium">{item.id}</td>
                          <td className="flex items-center gap-2">
                            <img
                              src={item.image_url}
                              alt={item.product_title}
                              className="w-14 h-14 object-cover rounded"
                            />
                            <h5 className="font-semibold">
                              {item.product_title}
                            </h5>
                          </td>
                          <td className="hidden sm:table-cell">
                            {item.size || "-"}
                          </td>
                          <td className="hidden sm:table-cell">
                            {item.color || "-"}
                          </td>

                          <td className="font-medium">${item.price}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              {/* Edit Button */}
                              <button
                                onClick={() =>
                                  console.log("edit wishlist", item.id)
                                }
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                <FaEdit />
                              </button>

                              {/* Delete Button */}
                              <button
                                onClick={() =>
                                  console.log("remove from wishlist", item.id)
                                }
                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Buttons */}
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
