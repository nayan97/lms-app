import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2"; // ✅ Import Swal
import { t } from "i18next";
import { Link } from "react-router";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get("/admin/checkout-orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to load orders",
          text: "Please check your server or network connection.",
        });
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

      // Update UI immediately
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, delivery_status: newStatus } : order
        )
      );

      // ✅ Success alert
      Swal.fire({
    icon: "success",
    title: t("status_updated"), // e.g., "Status Updated!"
    text: t("order_status_changed", { status: newStatus }), // e.g., "Order status changed to Delivered."
    timer: 1800,
    showConfirmButton: false,
  });
} catch (error) {
  console.error("❌ Failed to update status:", error);

  // ❌ Error alert (with t())
  Swal.fire({
    icon: "error",
    title: t("update_failed"), // e.g., "Update Failed"
    text: t("update_failed_message"), // e.g., "Something went wrong while updating the order status."
  });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        {orders.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">No orders found.</p>
        ) : (
          <>
            {/* ✅ TABLE VIEW */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Address</th>
                    <th className="py-3 px-4 text-left">Admin Price</th>
                    <th className="py-3 px-4 text-left">Delivery Charge</th>
                    <th className="py-3 px-4 text-left">Delivery Status</th>
                    <th className="py-3 px-4 text-left">Profit</th>
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

                      {/* Editable Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={order?.delivery_status}
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
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="py-3 px-4">{order?.reseller_profit}</td>
                      <td className="py-3 px-4">{order?.product_id}</td>
                      <td className="py-3 px-4 font-bold text-gray-800">
                        ৳{order?.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ MOBILE CARD VIEW */}
            <div className="block sm:hidden space-y-4 mt-4">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-gray-800">
                      #{index + 1} - {order?.name}
                    </h2>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        order?.delivery_status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order?.delivery_status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : order?.delivery_status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order?.delivery_status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {order?.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Product ID:</span>{" "}
                    {order?.product_id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Admin Price:</span> ৳
                    {order?.admin_price}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Delivery Charge:</span> ৳
                    {order?.delivery_charge}
                  </p>
                  <p className="text-sm text-gray-800 font-semibold mt-2">
                    Total: ৳{order?.total}
                  </p>

                  <div className="mt-3">
                    <span className="font-sm">Update Delivery Status:</span>
                    <select
                      value={order?.delivery_status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className={`w-full border rounded-lg px-2 py-1 text-sm ${
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
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
