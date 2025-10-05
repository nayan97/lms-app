import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { FaTrash, FaEdit } from "react-icons/fa";

const ShoppingCart = () => {
  const axios = useAxiosSecure();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.pathname;



  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/cart", { withCredentials: true });

        console.log("Cart Response:", response.data);

        if (response.data.success && Array.isArray(response.data.cartItems)) {
          setCartItems(response.data.cartItems);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [axios]);

  // ✅ Subtotal
  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.product_qty) || 0;
    return sum + price * qty;
  }, 0);

  // ✅ Update quantity
  const handleQtyChange = async (id, newQty) => {
    if (newQty < 1) return;

    try {
      await axios.put(`/cart/${id}`, { product_qty: newQty });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, product_qty: newQty } : item
        )
      );
      Swal.fire({
        icon: "success",
        title: t("qtyUpdated"),
        text: `${t("productQtyUpdated")}`,
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

  // ✅ Remove item
  const handleRemove = async (id) => {
    try {
      await axios.delete(`/removecart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      Swal.fire({
        icon: "success",
        title: t("removed"),
        text: t("itemRemoved"),
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("removeFailed"),
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
    <div>
      <div className="bg-[#ff9100] h-20">
        <div className="flex items-center gap-4">
          <Link
          to={"/shop"}
          className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
        >
          ← 
        </Link>
        <h1 className="text-white  font-bold"> {t("mycart")}
</h1>

        </div>
        
       
      </div>
       <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-t-[50px] px-6 py-2">
      {/* navbar */}
      
      {/* Welcome Section */}
      <section className="text-center">
        <h1 className="mt-4 text-xl">{t("welcome")}</h1>
      </section>

      {/* Breadcrumb Section */}
      <section className="text-center py-6">
        <h2 className="text-2xl font-bold">{t("cart")}</h2>
      </section>

      {/* Cart Section */}
      <section className="shopping-cart">
        <div className="container mx-auto">
          {cartItems.length > 0 ? (
            <>
              {/* Cart Table */}
              <div className="overflow-x-auto">
                <table className="table w-full bg-white rounded-xl shadow">
                  <thead className="bg-gray-200 text-gray-700">
                    <tr>
                      <th>Id</th>
                      <th>{t("products")}</th>
                      <th>{t("price")}</th>
                      <th className="hidden sm:table-cell">{t("quantity")}</th>
                      <th className="hidden sm:table-cell">{t("total")}</th>
                      <th>{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
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
                          <td className="font-medium">${price}</td>
                          <td className="hidden sm:table-cell">
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
                          <td className="font-medium hidden sm:table-cell">
                            ${total}
                          </td>
                          <td>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Buttons + Totals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <Link
                    to="/shop"
                    className="btn bg-white text-gray-800 shadow rounded-xl"
                  >
                    {t("continueShopping")}
                  </Link>
                </div>

                <div className="card bg-white shadow rounded-xl p-4">
                  <h5 className="text-lg font-semibold mb-2">
                    {t("cartTotal")}
                  </h5>
                  <ul className="text-gray-700 space-y-1 mb-4">
                    <li className="flex justify-between">
                      <span>{t("subtotal")}</span>
                      <span>${subtotal}</span>
                    </li>
                    <li className="flex justify-between font-semibold">
                      <span>{t("total")}</span>
                      <span>${subtotal}</span>
                    </li>
                  </ul>
                  <Link
                    to="/checkout"
                    className="btn btn-primary w-full rounded-xl"
                  >
                    {t("proceedCheckout")}
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">{t("noProduct")}</h1>
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

    </div>
   
  );
};

export default ShoppingCart;
