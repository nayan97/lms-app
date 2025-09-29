import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const Wishlist = () => {
  const axios = useAxiosSecure();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t} = useTranslation();



  // ✅ Fetch wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/wishlist", { withCredentials: true });

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

  const handleQtyChange = async (id, newQty) => {
    if (newQty < 1) return;

    try {
      await axios.put(`/cart/${id}`, { product_qty: newQty });
      setWishlistItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, product_qty: newQty } : item
        )
      );
      Swal.fire({
        icon: "success",
        title: t("qtyUpdated"),
        text: t("productQtyUpdated"),
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("updateFailed"),
      });
    }
  };

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
    <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-[50px] p-6">
      {/* Breadcrumb Section */}
      <section className="flex justify-between items-center py-6">
        <h2 className="text-2xl font-bold">{t("myWishlist")}</h2>

  
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
                      <th>{t("size")}</th>
                      <th>{t("color")}</th>
                      <th>{t("qty")}</th>
                      <th>{t("total")}</th>
                      <th>{t("action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((item) => {
                      const price = Number(item.price) || 0;
                      const qty = Number(item.product_qty) || 0;
                      const total = price * qty;

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
                          <td>{item.size || "-"}</td>
                          <td>{item.color || "-"}</td>
                          <td>
                            <input
                              type="number"
                              value={qty}
                              min="1"
                              className="input input-bordered w-20"
                              onChange={(e) =>
                                handleQtyChange(item.id, Number(e.target.value))
                              }
                            />
                          </td>
                          <td className="font-medium">${total}</td>
                          <td>
                            <button
                              onClick={() =>
                                console.log("remove from wishlist", item.id)
                              }
                              className="btn btn-sm btn-error text-white"
                            >
                              ✕
                            </button>
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
              <h1 className="text-2xl font-bold mb-4">
                {t("wishlistEmpty")}
              </h1>
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
