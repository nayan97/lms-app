import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductModal from "../../../components/ProductModal";
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
      className="px-4 py-2 bg-yellow-500 text-white rounded-lg mb-2"
    >
      ➕ {t("Add New Product")}
    </button>
  </div>

  {/* Section Title */}
  <h4 className="text-2xl font-semibold mb-4 text-center pt-2">
    {t("Checkout")}
  </h4>

  {/* Table */}
  <div className="bg-[#ddd] w-full shadow rounded-t-[50px] lg:rounded-2xl">
    <div className="overflow-x-auto p-6 lg:p-20">
      <table className="min-w-full text-sm sm:text-base bg-white border rounded-lg">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            <th className="p-2 sm:p-3 border">{t("Image")}</th>
            <th className="p-2 sm:p-3 border">{t("Title")}</th>
            <th className="p-2 sm:p-3 border">{t("Price")}</th>
            <th className="p-2 sm:p-3 border">{t("Featured")}</th>
            <th className="p-2 sm:p-3 border text-center">{t("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                {t("Loading...")}
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                {t("No products found.")}
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50 border-t border-gray-200"
              >
                <td className="p-2 sm:p-3 border text-center">
                  {p.image ? (
                    <img
                      src={`http://192.168.110.207:8000/storage/${p.image}`}
                      alt={p.title}
                      className="w-10 h-10 sm:w-16 sm:h-16 object-cover rounded mx-auto"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2 sm:p-3 border break-words max-w-[120px] sm:max-w-none">
                  {p.title}
                </td>
                <td className="p-2 sm:p-3 border whitespace-nowrap">
                  {p.price}
                </td>
                <td className="p-2 sm:p-3 border text-center">
                  {p.is_featured ? t("Yes") : t("No")}
                </td>
                <td className="p-2 sm:p-3 border text-center">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <button
                      onClick={() => setModalProduct(p)}
                      className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      ✏ 
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      🗑 
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
