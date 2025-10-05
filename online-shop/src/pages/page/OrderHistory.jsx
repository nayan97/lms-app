import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const orders = [
  {
    id: "#3455",
    product: "Remax RM-515 Candy Series Wired Earphone",
    image: "/images/earphone.jpg", // replace with your asset
    date: "Jul 19, 2025 7:20 PM",
    status: "Delivered",
    amount: 199,
  },
  {
    id: "#3456",
    product: "Wireless Bluetooth Headset",
    image: "/images/headset.jpg",
    date: "Jul 20, 2025 10:00 AM",
    status: "Pending",
    amount: 1299,
  },
  {
    id: "#3457",
    product: "Gaming Mouse",
    image: "/images/mouse.jpg",
    date: "Jul 21, 2025 5:45 PM",
    status: "Processing",
    amount: 799,
  },
  {
    id: "#3458",
    product: "Smart Watch",
    image: "/images/watch.jpg",
    date: "Jul 22, 2025 6:15 PM",
    status: "Cancelled",
    amount: 1599,
  },
];

export default function OrderHistory() {
    const { t } = useTranslation();
  const [filter, setFilter] = useState("Delivered");

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const tabs = ["Pending", "Processing", "Delivered", "Cancelled"];

  return (
    <div className="min-h-screen bg-gray-50 ">

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
        <h1 className="text-white  font-bold"> {t("OrderHistory")}
</h1>

        </div>
        
       
      </div>
        
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 rounded-t-[50px] justify-around">
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
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="card bg-white shadow rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={order.image}
                alt={order.product}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  Order ID: {order.id}
                </p>
                <p className="text-gray-600 text-sm">{order.product}</p>
              </div>
              <span
                className={`badge ${
                  order.status === "Delivered"
                    ? "badge-success"
                    : order.status === "Pending"
                    ? "badge-warning"
                    : order.status === "Processing"
                    ? "badge-info"
                    : "badge-error"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">{t("OrderDate")}:</span>{" "}
                {order.date}
              </p>
              <p>
                <span className="font-semibold">{t("TotalAmount")}:</span>{" "}
                {order.amount}৳
              </p>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No {filter} orders found
          </div>
        )}
      </div>
    </div>
  );
}
