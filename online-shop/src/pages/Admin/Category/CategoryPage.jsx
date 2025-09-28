import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CategoryPage = () => {
      const axiosSecure = useAxiosSecure();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({ id: null, name: "", status: "1", image: null });
  const [preview, setPreview] = useState(null);

  // Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fetch categories
const fetchCategories = async () => {
  setLoading(true);
  try {
    const res = await axiosSecure.get("/admin/categories");

    // Normalize response: if paginated, use res.data.data; otherwise use res.data
    const cats = Array.isArray(res.data) ? res.data : res.data.data;

    setCategories(cats || []);
  } catch (error) {
    console.error(error);
    setCategories([]); // fallback
  }
  setLoading(false);
};
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({ id: null, name: "", status: "1", image: null });
    setPreview(null);
  };

  // Submit create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("status", form.status);
    if (form.image) formData.append("image", form.image);

    try {
      if (form.id) {
        await axiosSecure.post(`/admin/categories/${form.id}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosSecure.post("/admin/categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchCategories();
      resetForm();
      setIsCreateOpen(false);
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error saving category");
    }
  };

  // Edit
  const handleEdit = (category) => {
    setForm({
      id: category.id,
      name: category.name,
      status: String(category.status),
      image: null,
    });
    setPreview(category.image ? `/storage/${category.image}` : null);
    setIsEditOpen(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axiosSecure.delete(`/admin/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2 lg:p-6 max-w-[425px] md:max-w-5xl lg:max-w-7xl xl:max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-2"
        >
          + Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#ddd] w-full shadow rounded-t-[50px] lg:rounded-2xl">
        <div className="overflow-x-auto p-6 lg:p-20">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full overflow-auto rounded-2xl bg-white">
              <thead className="bg-gray-100 rounded-2xl">
                <tr>
                  <th className="px-4 py-6">#</th>
                  <th className="px-4 py-6 text-left">Name</th>
                  <th className="px-4 py-6 text-left">Status</th>
                  <th className="px-4 py-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {category.image && (
                        <img
                          src={`/storage/${category.image}`}
                          alt={category.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                      )}
                      {category.name}
                    </td>
                    <td className="px-4 py-2">
                      {category.status ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(category)}
                        className="px-3 py-2 bg-yellow-500 text-white rounded flex items-center gap-2"
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-3 py-2 bg-red-600 text-white rounded flex items-center gap-2"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {(isCreateOpen || isEditOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {form.id ? "Edit Category" : "Create Category"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Image</label>
                <input type="file" name="image" onChange={handleChange} />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="mt-2 h-20 w-20 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateOpen(false);
                    setIsEditOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {form.id ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
