import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { t } from "i18next";
import { Link } from "react-router";


const CategoryPageAll = () => {
  const [categories, setCategories] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosSecure.get("/admin/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  if (categories.length === 0) {
    return <p className="text-center mt-10">No categories found.</p>;
  }

  return (
    <div className="  ">
     <div className="bg-[#ff9100]">
              <div className="flex items-center gap-4">
                <Link
                to={"/shop"}
                className="text-white bg-[#ff9100] p-3 rounded-full text-xl"
              >
                ← 
              </Link>
              <h1 className="text-white  font-bold"> {t("Categories")}
      </h1>
      
              </div>
              
             
            </div>
      
      <div className="rounded-t-[50px] grid grid-cols-1 pt-10 bg-gray-100 sm:grid-cols-2 gap-2">
        {categories.map((category) => (
         <div
  key={category.id}
  className="card card-side bg-base-100 rounded-xl  mx-3 hover:shadow-xl transition-shadow"
>
  <figure className="w-1/10">
    <img
      src={category.image_url || "https://via.placeholder.com/150"}
      alt={category.name}
      className="rounded-full w-5 h-5 object-cover"
    />
  </figure>
  <div className="flex justify-center p-2 card-body w-full">
    <h2 className="text-sm ">{category.name}</h2>
  </div>
</div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPageAll;
