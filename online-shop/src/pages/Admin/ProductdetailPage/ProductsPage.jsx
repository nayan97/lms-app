import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProductsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load products + categories
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/admin/products");

      // If paginated: products are inside res.data.data.data
      const data = res.data?.data?.data ?? res.data?.data ?? [];

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch products error:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  // --- Updated Functions ---

  const fetchCategories = async () => {
    setLoading(true); // Assuming you use a single loading state for all fetches, or use a specific one like setCategoriesLoading(true)
    try {
      const res = await axiosSecure.get("/admin/categories");

      // Handle paginated (data.data.data) or non-paginated (data.data) or direct (data)
      const data = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];

      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories", err);
      setCategories([]);
    }
    setLoading(false);
  };

  const fetchSizes = async () => {
    setLoading(true); // Assuming you use a single loading state
    try {
      const res = await axiosSecure.get("/admin/sizes");

      // Handle paginated (data.data.data) or non-paginated (data.data) or direct (data)
      const data = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];

      setSizes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching sizes", err);
      setSizes([]);
    }
    setLoading(false);
  };

  const fetchColors = async () => {
    setLoading(true); // Assuming you use a single loading state
    try {
      const res = await axiosSecure.get("/admin/colors");

      // Handle paginated (data.data.data) or non-paginated (data.data) or direct (data)
      const data = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];

      setColors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching colors", err);
      setColors([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSizes();
    fetchColors();
  }, []);

  // Create product
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axiosSecure.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts();
      setShowCreateModal(false);
    } catch (err) {
      console.error("Error creating product", err);
    }
  };

  // Update product
  const handleUpdate = async (id, e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await axiosSecure.post(`/admin/products/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchProducts();
      setEditProduct(null);
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosSecure.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  return (
    <div className="lg:p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 p-2">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-2"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#ddd] w-full shadow rounded-t-[50px] lg:rounded-2xl">
        <div className="overflow-x-auto p-6 lg:p-20">
          <table className="min-w-full overflow-auto rounded-2xl bg-white">
            <thead className="bg-gray-100 rounded-2xl">
              <tr>
                <th className="px-4 py-6 rounded-tl-2xl">#</th>
                <th className="px-4 py-6">Title</th>
                <th className="px-4 py-6">Image</th>
                <th className="px-4 py-6 hidden sm:table-cell">Category</th>
                <th className="px-4 py-6">Price</th>
                <th className="px-4 py-6 hidden sm:table-cell">Status</th>
                <th className="px-4 py-6 hidden sm:table-cell">Featured</th>
                <th className="px-4 py-6 rounded-tr-2xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr key={product.id}>
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">
                    {product.image && (
                      <img
                        src={`/storage/${product.image}`}
                        alt={product.title}
                        className="w-12 h-12 rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 hidden sm:table-cell">
                    {product.category?.name ??
                      categories.find((c) => c.id === product.category_id)
                        ?.name ??
                      "N/A"}
                  </td>
                  <td className="px-4 py-2">৳{product.price}</td>
                  <td className="px-4 py-2 hidden sm:table-cell">
                    {product.status ? "Active" : "Inactive"}
                  </td>
                  <td className="px-4 py-2 hidden sm:table-cell">
                    {product.is_featured === "yes" ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => setEditProduct(product)}
                      className="px-3 py-2 bg-[#ff9100] text-white rounded flex items-center gap-2"
                    >
                      <i className="fa fa-pencil-alt"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow max-w-4xl w-full">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold">Add New Product</h3>
              <button onClick={() => setShowCreateModal(false)}>✖</button>
            </div>

            {/* Body */}
            <div className="p-4">
              <form
                onSubmit={handleCreate}
                encType="multipart/form-data"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* Title */}
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  className="w-full border rounded p-2"
                />

                {/* Category */}
                <select
                  name="category_id"
                  required
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {/* Description - full width */}
                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full border rounded p-2 md:col-span-2"
                ></textarea>

                {/* Sizes */}
                <div>
                  <label className="block text-sm mb-1">Sizes</label>
                  <select
                    name="sizes[]"
                    multiple
                    className="w-full border rounded p-2"
                  >
                    {sizes.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm mb-1">Colors</label>
                  <select
                    name="colors[]"
                    multiple
                    className="w-full border rounded p-2"
                  >
                    {colors.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  placeholder="Price"
                  required
                  className="w-full border rounded p-2"
                />

                {/* Source Price */}
                <input
                  type="number"
                  step="0.01"
                  name="source_price"
                  placeholder="Source Price"
                  className="w-full border rounded p-2"
                />

                {/* Source URL */}
                <input
                  type="url"
                  name="source_url"
                  placeholder="Source URL"
                  className="w-full border rounded p-2"
                />

                {/* Cross Price */}
                <input
                  type="number"
                  step="0.01"
                  name="cross_price"
                  placeholder="Cross Price"
                  className="w-full border rounded p-2"
                />

                {/* Profit */}
                <input
                  type="number"
                  step="0.01"
                  name="profit"
                  placeholder="Profit"
                  className="w-full border rounded p-2"
                />
                
                {/* max_price */}
                <input
                  type="number"
                  step="0.01"
                  name="max_price"
                  placeholder="Max Price"
                  className="w-full border rounded p-2"
                />

                {/* Status */}
                <select
                  name="status"
                  required
                  className="w-full border rounded p-2"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>

                {/* Featured */}
                <select
                  name="is_featured"
                  required
                  className="w-full border rounded p-2"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                {/* Image */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Main Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    className="w-full border rounded p-2"
                  />
                </div>

                {/* Gallery */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Image Gallery</label>
                  <input
                    type="file"
                    name="image_gallery[]"
                    accept="image/*"
                    multiple
                    className="w-full border rounded p-2"
                  />
                </div>

                {/* Submit button - full width */}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow max-w-lg w-full">
            <div className="flex justify-between p-4 border-b">
              <h3 className="text-lg font-bold">Edit Product</h3>
              <button onClick={() => setEditProduct(null)}>✖</button>
            </div>
            <div className="p-4">
              <form
                onSubmit={(e) => handleUpdate(editProduct.id, e)}
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  name="title"
                  defaultValue={editProduct.title}
                  className="w-full border rounded p-2 mb-3"
                />
                <select
                  name="category_id"
                  defaultValue={editProduct.category_id}
                  className="w-full border rounded p-2 mb-3"
                >
                  <option value="">Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <textarea
                  name="description"
                  defaultValue={editProduct.description}
                  className="w-full border rounded p-2 mb-3"
                ></textarea>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  defaultValue={editProduct.price}
                  className="w-full border rounded p-2 mb-3"
                />
                <input
                  type="number"
                  step="0.01"
                  name="cross_price"
                  defaultValue={editProduct.cross_price}
                  className="w-full border rounded p-2 mb-3"
                />
                <select
                  name="status"
                  defaultValue={editProduct.status}
                  className="w-full border rounded p-2 mb-3"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                <select
                  name="is_featured"
                  defaultValue={editProduct.is_featured}
                  className="w-full border rounded p-2 mb-3"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {editProduct.image && (
                  <div className="mb-3">
                    <span className="block text-sm text-gray-600 mb-1">
                      Image
                    </span>
                    <img
                      src={`/storage/${editProduct.image}`}
                      alt={editProduct.title}
                      className="w-20 h-20 rounded border"
                    />
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  className="w-full border rounded p-2 mb-3"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
