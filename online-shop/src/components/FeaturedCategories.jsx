import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";
import { t } from "i18next";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const axiosSecure = useAxiosSecure();

  const fetchCategories = async () => {
    try {
      const res = await axiosSecure.get("/admin/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-6 px-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold">{t("Category")}</h2>
        <Link to={"/categories"} className="text-sm text-gray-500">
          {t("SeeAll")}
        </Link>
      </div>

      {/* Scrollable container */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
        {categories
          .filter((cat) => cat.status !== 0)
          .map((cat) => (
            <div
              key={cat.name}
              className="bg-white min-w-[120px] rounded-xl shadow-sm p-3 flex flex-col items-center text-center shrink-0"
            >
              <span className="text-3xl">{cat.icon}</span>
              <img
                className="w-20 h-10 object-contain mt-1"
                src={cat.image_url}
                alt={cat.name}
              />
              <p className="text-sm mt-1">{cat.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
