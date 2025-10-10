import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { t } from "i18next";
import { Link } from "react-router";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get("/admin/checkout-orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosSecure.put(`/admin/checkout-orders/${orderId}`, {
        delivery_status: newStatus,
      });

      // Update local state instantly
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, delivery_status: newStatus } : order
        )
      );

      console.log(`✅ Order ${orderId} updated to ${newStatus}`);
    } catch (error) {
      console.error("❌ Failed to update status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Table */}
      <div className="p-4 overflow-x-auto">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">No orders found.</p>
        ) : (
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Admin Price</th>
                <th className="py-3 px-4 text-left">Delivery Charge</th>
                <th className="py-3 px-4 text-left">Delivery Status</th>
                <th className="py-3 px-4 text-left">Product ID</th>
                <th className="py-3 px-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{order?.name}</td>
                  <td className="py-3 px-4">{order?.address}</td>
                  <td className="py-3 px-4">{order?.admin_price}</td>
                  <td className="py-3 px-4">{order?.delivery_charge}</td>

                  {/* ✅ Editable Status Dropdown */}
                  <td className="py-3 px-4">
                    <select
                      value={order?.delivery_status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`border rounded-lg px-2 py-1 text-sm ${
                        order?.delivery_status === "Completed"
                          ? "text-green-600 border-green-300"
                          : order?.delivery_status === "Processing"
                          ? "text-yellow-600 border-yellow-300"
                          : order?.delivery_status === "Cancelled"
                          ? "text-red-600 border-red-300"
                          : "text-gray-600 border-gray-300"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="py-3 px-4">{order?.product_id}</td>
                  <td className="py-3 px-4 font-bold text-gray-800">
                    ৳{order?.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
