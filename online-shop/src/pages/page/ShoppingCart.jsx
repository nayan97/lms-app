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


  // ✅ Update quantity (supports + / − buttons)

 const handleQtyChange = async (id, actionOrQty) => {
  // 1️⃣ Find the current cart item
  const currentItem = cartItems.find((item) => item.id === id);
  if (!currentItem) return;

  const currentQty = Number(currentItem.product_qty) || 1;
  const price = Number(currentItem.price) || 0;

  // 2️⃣ Determine new quantity
  let newQty;
  if (actionOrQty === "inc") newQty = currentQty + 1;
  else if (actionOrQty === "dec") newQty = Math.max(1, currentQty - 1);
  else newQty = Number(actionOrQty) || 1;

  // 3️⃣ Calculate total price for the item
  const totalPrice = price * newQty;

  // 4️⃣ Update UI instantly (optimistic update)
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id ? { ...item, product_qty: newQty } : item
    )
  );

  // 5️⃣ Send update request to backend
  try {
    await axios.put(`/cart/${id}`, {
      product_qty: newQty,
      price: price,
      total_price: totalPrice,
    });

    Swal.fire({
      icon: "success",
      title: t("qtyUpdated"),
      text: `${t("productQtyUpdated")}`,
      timer: 1000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
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
          <h1 className="text-white  font-bold"> {t("mycart")}</h1>
        </div>
      </div>
      <main className="shadow-sm mx-auto min-h-screen max-w-[1280px] bg-gray-100 rounded-t-[50px] px-6 py-2">
        {/* navbar */}

       

        {/* Cart Section */}
        <section className="shopping-cart">
          <div className="container mx-auto">
            {cartItems.length > 0 ? (
              <>
                {/* Table for desktop */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="table w-full bg-white rounded-xl shadow">
                    <thead className="bg-gray-200 text-gray-700">
                      <tr>
                        <th>ID</th>
                        <th>{t("products")}</th>
                        <th>{t("price")}</th>
                        <th>{t("quantity")}</th>
                        <th>{t("total")}</th>
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
                            <td>${price}</td>
                            <td>
                              <input
                                type="number"
                                value={qty}
                                min="1"
                                className="input input-bordered w-20"
                                onChange={(e) =>
                                  handleQtyChange(
                                    item.id,
                                    Number(e.target.value)
                                  )
                                }
                              />
                            </td>
                            <td>${total}</td>
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

                {/* Card layout for mobile */}
                <div className="block sm:hidden space-y-4">
                  {cartItems.map((item) => {
                    const price = Number(item.price) || 0;
                    const qty = Number(item.product_qty) || 0;
                    const total = price * qty;

                    return (
                      <div
                        key={item.id}
                        className="card bg-white shadow rounded-xl"
                      >
                        <div className="card-body p-4">
                          <div className="flex gap-2 items-center">
                            
                            <img
                              src={item.image_url}
                              alt={item.product_title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex flex-col w-full">
                              <h3 className="font-semibold  text-lg">
                                {item.product_title}
                              </h3>
                              <p className="text-gray-600">
                                {t("price")}: ${price}
                              </p>
                              <p className="text-gray-600">
                                {t("total")}: ${total}
                              </p>
                              <div className="flex justify-between gap-2 items-center mt-4">
                            <div className="w-1/2 flex">
                              <button
                              type="button"
                              onClick={() => handleQtyChange(item.id, "dec")}
                              className="btn btn-sm border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                            >
                              −
                            </button>

                            <span className="px-3 text-base font-medium">
                              {item?.product_qty}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleQtyChange(item.id, "inc")}
                              className="btn btn-sm border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
                            >
                              +
                            </button>


                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="btn btn-error btn-sm text-white"
                            >
                              <FaTrash />
                            </button>
                          </div>
                            </div>
                             
                          </div>

                         
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totals & Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  

                  <div className="card bg-white shadow rounded-xl p-4">
  <div className="grid grid-cols-2 items-center gap-4">
    
    {/* Left Column - Total */}
    <div>
      <ul className="text-gray-700 space-y-1">
        <li className="flex flex-col font-medium">
          <span className="text-base">{t("total")}</span>
          <span>${subtotal}</span>
        </li>
      </ul>
    </div>

    {/* Right Column - Checkout Button */}
    <div className="flex justify-end">
      <Link
        to="/checkout"
        className="btn bg-[#ff9100] rounded-xl px-4 py-2 w-full sm:w-auto"
      >
        {t("proceedCheckout")}
      </Link>
    </div>

  </div>
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
