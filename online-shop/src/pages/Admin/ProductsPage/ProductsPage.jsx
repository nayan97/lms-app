import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductModal from "../../../components/ProductModal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ProductsPage = () => {
  const { t, i18n } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch filters
  const fetchFilters = async () => {
    try {
      const [catRes, sizeRes, colorRes] = await Promise.all([
        axiosSecure.get("/admin/categories"),
        axiosSecure.get("/admin/sizes"),
        axiosSecure.get("/admin/colors"),
      ]);

      setCategories(catRes.data);
      setCategoryData(catRes.data);
      setSizes(sizeRes.data?.data ?? []);
      setColors(colorRes.data?.data ?? []);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/admin/products");
      setProducts(res?.data?.data?.products ?? []);
      console.log(res);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/admin/products/${id}`);
      Swal.fire("Deleted!", "Product deleted successfully.", "success");
      fetchProducts();
    } catch (error) {
      Swal.fire("Error", `${error}`);
    }
  };

  // Save or update product
  const handleSaveProduct = async (formData, id = null) => {
    try {
      if (id) {
        await axiosSecure.post(`/admin/products/${id}?_method=PUT`, formData);
        Swal.fire("Updated!", "Product updated successfully.", "success");
      } else {
        await axiosSecure.post(`/admin/products`, formData);
        Swal.fire("Created!", "New product added successfully.", "success");
      }
      setModalProduct(null);
      fetchProducts();
    } catch (error) {
      Swal.fire("Error", `${error}`);
    }
  };

  return (
    <div className="p-2 lg:p-6 max-w-[425px] md:max-w-5xl lg:max-w-7xl xl:max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold">{t("Products")}</h2>
        <button
          onClick={() => setModalProduct({})}
          className="px-4 py-2 bg-[#ff9100] text-white rounded-lg mb-2"
        >
          ➕ {t("AddNewProduct")}
        </button>
      </div>

      {/* Table */}
      {/* Product Table & Card Layout */}
      <div className="bg-[#ddd] w-full shadow rounded-t-[50px] lg:rounded-2xl">
        <div className="overflow-x-auto p-6 lg:p-20">
          {loading ? (
            <>
              {/* 🖥️ Desktop Skeleton Table */}
              <div className="hidden lg:block bg-white rounded-lg">
                <table className="min-w-full text-sm bg-white border rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 border">{t("Image")}</th>
                      <th className="p-3 border">{t("Title")}</th>
                      <th className="p-3 border">{t("Price")}</th>
                      <th className="p-3 border">{t("Featured")}</th>
                      <th className="p-3 border text-center">{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-3 border text-center">
                          <div className="skeleton h-12 w-12 mx-auto rounded"></div>
                        </td>
                        <td className="p-3 border">
                          <div className="skeleton h-4 w-3/4"></div>
                        </td>
                        <td className="p-3 border">
                          <div className="skeleton h-4 w-1/3"></div>
                        </td>
                        <td className="p-3 border text-center">
                          <div className="skeleton h-5 w-16 mx-auto"></div>
                        </td>
                        <td className="p-3 border text-center">
                          <div className="flex justify-center gap-2">
                            <div className="skeleton h-8 w-16 rounded"></div>
                            <div className="skeleton h-8 w-16 rounded"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 📱 Mobile Skeleton Cards */}
              <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="card bg-white shadow-md p-4 rounded-xl space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="skeleton w-16 h-16 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="skeleton h-4 w-3/4"></div>
                        <div className="skeleton h-4 w-1/3"></div>
                      </div>
                    </div>
                    <div className="skeleton h-6 w-24"></div>
                    <div className="flex justify-end gap-2">
                      <div className="skeleton h-8 w-16 rounded"></div>
                      <div className="skeleton h-8 w-16 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : products.length === 0 ? (
            <p className="text-center bg-white p-6 rounded-lg">
              {t("No products found.")}
            </p>
          ) : (
            <>
              {/* 🖥️ Desktop Table View */}
              <table className="hidden lg:table min-w-full text-sm sm:text-base bg-white border rounded-lg">
                <thead className="sticky top-0 bg-gray-100 z-10">
                  <tr>
                    <th className="p-3 border">{t("Image")}</th>
                    <th className="p-3 border">{t("Title")}</th>
                    <th className="p-3 border">{t("Price")}</th>
                    <th className="p-3 border">{t("Featured")}</th>
                    <th className="p-3 border text-center">{t("Actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 border-t border-gray-200"
                    >
                      <td className="p-3 border text-center">
                        {p.image ? (
                          <img
                            src={`https://apiv.lifechangebda.com/storage/${p.image}`}
                            alt={p.title}
                            className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded mx-auto"
                          />
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3 border break-words truncate max-w-[120px] sm:max-w-none">
                        {p.title}
                      </td>
                      <td className="p-3 border whitespace-nowrap">
                        {p.price}
                      </td>
                      <td className="p-3 border text-center">
                        {p.is_featured == "yes"? (
                          <span className="badge badge-success">
                            {t("Yes")}
                          </span>
                        ) : (
                          <span className="badge badge-error">{t("No")}</span>
                        )}
                      </td>
                      <td className="p-3 border text-center">
                        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                          <button
                            onClick={() => setModalProduct(p)}
                            className="hover:text-yellow-600 text-yellow-600 border-none"
                          >
                            <FaEdit size={24} /> {/* 👈 Increased size */}
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="hover:text-red-700 text-red-600 border-none"
                          >
                            <MdDelete size={26} /> {/* 👈 Increased size */}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 📱 Mobile Card View */}
              <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((p) => (
                  <>
                    <div key={p.id} className="card bg-base-100 w-80 shadow-sm">
                      <figure className="p-3">
                        {p.image ? (
                          <img
                            src={`https://apiv.lifechangebda.com/storage/${p.image}`}
                            alt={p.title}
                            className="w-full h-46 object-cover rounded-t-xl"
                          />
                        ) : (
                          <div className="w-full h-46 bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
                      </figure>

                      <div className="card-body">
                        <h2 className="card-title flex items-center gap-2 max-w-[200px] sm:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                          <span className="truncate">{p.title}</span>
                          {p.is_featured && (
                            <div className="badge badge-secondary flex-shrink-0">
                              {t("Featured")}
                            </div>
                          )}
                        </h2>

                        <p className="text-gray-600">💰 {p.price}</p>

                        <div className="card-actions justify-between items-center mt-3">
                          <div className="space-x-2">
                            {p.category && (
                              <div className="badge badge-outline">
                                {p.category}
                              </div>
                            )}
                            {p.type && (
                              <div className="badge badge-outline">
                                {p.type}
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => setModalProduct(p)}
                              className="hover:text-yellow-600 text-yellow-600 border-none"
                            >
                              <FaEdit size={22} />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="hover:text-red-700 text-red-600 border-none"
                            >
                              <MdDelete size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {modalProduct !== null && (
        <ProductModal
          product={modalProduct}
          categories={categoryData}
          sizes={sizes}
          colors={colors}
          onClose={() => setModalProduct(null)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
