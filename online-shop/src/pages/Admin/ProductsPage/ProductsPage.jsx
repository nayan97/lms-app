import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ProductModal from "../../../components/ProductModal";

const ProductsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryData,setCategoryData]=useState([])
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories, sizes, colors
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
      console.log(res?.data?.data?.products);
      setProducts(res?.data?.data?.products ?? []);
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
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products</h2>
        <button
          onClick={() => setModalProduct({})}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          ➕ Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Featured</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    {p.image ? (
                      <img
                        src={`/storage/${p.image}`}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 border">{p.title}</td>
                  <td className="p-3 border">{p.price}</td>
                  <td className="p-3 border">{p.status === 1 ? "Active" : "Inactive"}</td>
                  <td className="p-3 border">{p.is_featured}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => setModalProduct(p)}
                      className="px-3 py-2 bg-yellow-500 text-white rounded"
                    >
                      ✏
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-3 py-2 bg-red-600 text-white rounded"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
