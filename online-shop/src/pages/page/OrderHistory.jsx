import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Copy } from "lucide-react";
import Swal from "sweetalert2";

export default function OrderHistory() {
  const { t } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [loading, setLoading] = useState(true);

  const tabs = ["Pending", "Processing", "Delivered", "Cancelled"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosSecure.get("/checkout-orders"); // API endpoint for logged-in user
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [axiosSecure]);

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.delivery_status === filter);

  const handleCopyProductName = (id) => {
    navigator.clipboard
      .writeText(`#${id}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Copied!",
          text: `Order ID #${id} copied to clipboard`,
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to copy the Order ID",
        });
      });
  };

  return (
    <div>
      {/* Header */}
      <div className=" mb-4">
        <div className="bg-[#ff9100] h-20">
          <div className="flex items-center gap-4">
            <Link
              to={"/"}
              className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
            >
              ←
            </Link>
            <h1 className="text-white font-bold">{t("OrderHistory")}</h1>
          </div>
        </div>
      </div>
      <main className="bg-gray-100 min-h-screen rounded-t-[50px] pt-4 pb-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 justify-around px-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`btn btn-sm rounded-lg ${
                filter === tab
                  ? "btn-warning text-white"
                  : "btn-outline btn-warning"
              }`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : (
          <div className="space-y-4 px-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 bg-white rounded-xl shadow-sm p-4"
              >
                {/* Top Section */}
                <div className="">
                  <div className="">
                    <div>
                      <div className="flex justify-between py-4">
                        <p className="text-sm font-semibold text-gray-800">
                          Order ID: #{order.id}
                        </p>
                        <Copy
                          onClick={() => handleCopyProductName(order.id)}
                          className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700 transition"
                        />
                      </div>
                    </div>
                    <div className="flex border-y-[1px] border-amber-100 py-2">
                      <img
                        src={
                          order.product_image_url
                            ? order.product_image_url
                            : "/images/default-product.jpg"
                        }
                        alt={
                          order.product_title ||
                          order.product?.title ||
                          "Product"
                        }
                        className="w-14 h-14 rounded-md object-cover"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        {order.product?.title || "Product not found"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      {t("OrderDate")}:
                    </span>
                    <span>{new Date(order.created_at).toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      {t("OrderStatus")}:
                    </span>
                    <span
                      className={`${
                        order.delivery_status === "Delivered"
                          ? "text-green-600"
                          : order.delivery_status === "Pending"
                          ? "text-yellow-500"
                          : order.delivery_status === "Processing"
                          ? "text-blue-500"
                          : "text-red-500"
                      } font-semibold`}
                    >
                      {order.delivery_status}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      {t("TotalAmount")}:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {order.total}৳
                    </span>
                  </p>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                <p>No orders found</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
