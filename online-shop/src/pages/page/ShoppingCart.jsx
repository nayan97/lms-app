import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ShoppingCart = () => {
  const axios = useAxiosSecure();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/cart", { withCredentials: true });

        console.log("Cart Response:", response.data);

        // Expecting { success: true, cartItems: [...] }
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

  // ✅ Subtotal using integer price & qty
  const subtotal = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0; // already integer from backend
    const qty = Number(item.product_qty) || 0;
    return sum + price * qty;
  }, 0);

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
      <section className="text-center py-6">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
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
                      <th>Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
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
                              src={item.photo}
                              alt={item.product_title}
                              className="w-14 h-14 object-cover rounded"
                            />
                            <h5 className="font-semibold">
                              {item.product_title}
                            </h5>
                          </td>
                          <td className="font-medium">${price}</td>
                          <td>
                            <input
                              type="number"
                              defaultValue={qty}
                              min="1"
                              className="input input-bordered w-20"
                              onChange={(e) =>
                                console.log("update qty", item.id, e.target.value)
                              }
                            />
                          </td>
                          <td className="font-medium">${total}</td>
                          <td>
                            <button
                              onClick={() => console.log("remove item", item.id)}
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

              {/* Buttons + Totals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Continue Shopping */}
                <div>
                  <Link
                    to="/shop"
                    className="btn bg-white text-gray-800 shadow rounded-xl"
                  >
                    CONTINUE SHOPPING
                  </Link>
                </div>

                {/* Cart Totals */}
                <div className="card bg-white shadow rounded-xl p-4">
                  <h5 className="text-lg font-semibold mb-2">Cart Total</h5>
                  <ul className="text-gray-700 space-y-1 mb-4">
                    <li className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal}</span>
                    </li>
                    <li className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${subtotal}</span>
                    </li>
                  </ul>
                  <Link
                    to="/checkout"
                    className="btn btn-primary w-full rounded-xl"
                  >
                    PROCEED TO CHECKOUT
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">No Product Found!</h1>
              <Link
                to="/shop"
                className="btn bg-white shadow rounded-xl text-gray-800"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ShoppingCart;
