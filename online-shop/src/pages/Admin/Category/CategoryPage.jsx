import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const CategoryPage = () => {
  const { t } = useTranslation();
  const axiosSecure = useAxiosSecure();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    id: null,
    name: "",
    status: "1",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/admin/categories");
      const cats = Array.isArray(res.data) ? res.data : res.data.data;
      setCategories(cats || []);
      // console.log(cats);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Unified input change handler
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files && files.length > 0) {
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

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      if (form.id) {
        formData.append("_method", "PUT");

        await axiosSecure.post(`/admin/categories/${form.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.fire({
          icon: "success",
          title: "Category Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axiosSecure.post("/admin/categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.fire({
          icon: "success",
          title: "Category Created!",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      fetchCategories();
      resetForm();
      setIsCreateOpen(false);
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error saving category",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  // Edit
  const handleEdit = (category) => {
    setForm({
      id: category.id,
      name: category.name,
      status: String(category.status),
      image: category.image || null,
    });
    setPreview(
      category.image
        ? `https://apiv.lifechangebda.com/storage/${category.image}`
        : null
    );
    setIsEditOpen(true);
  };

  // Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/admin/categories/${id}`);
      fetchCategories();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Category has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong while deleting.",
      });
    }
  };

  return (
    <div className="p-2 lg:p-6 max-w-[425px] md:max-w-5xl lg:max-w-7xl xl:max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">{t("Categories")}</h2>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#ff9100] text-white rounded-lg mb-2"
        >
          + {t("AddCategory")}
        </button>
      </div>

      {/* Table & Cards */}
      <div className="bg-[#ddd] w-full shadow rounded-t-[50px] lg:rounded-2xl">
        <div className="overflow-x-auto p-6 lg:p-20">
          {loading ? (
            <>
              {/* 🖥️ Table skeleton for large screens */}
              <div className="hidden lg:block bg-white rounded-2xl p-6">
                <div className="skeleton h-6 w-1/4 mb-4"></div>
                <table className="min-w-full rounded-2xl bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-6">#</th>
                      <th className="px-4 py-6 text-left">Name</th>
                      <th className="px-4 py-6 text-left">Status</th>
                      <th className="px-4 py-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-4">
                          <div className="skeleton h-5 w-5"></div>
                        </td>
                        <td className="px-4 py-4 flex items-center gap-2">
                          <div className="skeleton h-10 w-10 rounded"></div>
                          <div className="skeleton h-5 w-32"></div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="skeleton h-5 w-20"></div>
                        </td>
                        <td className="px-4 py-4 flex justify-center gap-2">
                          <div className="skeleton h-8 w-16 rounded"></div>
                          <div className="skeleton h-8 w-16 rounded"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 📱 Card skeleton for mobile */}
              <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="card bg-white shadow-md rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="skeleton w-14 h-14 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="skeleton h-4 w-3/4"></div>
                        <div className="skeleton h-3 w-1/4"></div>
                      </div>
                    </div>
                    <div className="skeleton h-6 w-20"></div>
                    <div className="flex justify-end gap-2">
                      <div className="skeleton h-8 w-16 rounded"></div>
                      <div className="skeleton h-8 w-16 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* 🖥️ Table view for large screens */}
              <table className="hidden lg:table min-w-full overflow-auto rounded-2xl bg-white">
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
                            src={category.image_url}
                            alt={category.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        {category.name}
                      </td>
                      <td className="px-4 py-2">
                        {category.status == 1 ? (
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
                          className="hover:text-yellow-600 text-yellow-600 border-none"
                        >
                          <FaEdit size={24} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="hover:text-red-700 text-red-600 border-none"
                        >
                          <MdDelete size={26} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 📱 Card view for mobile */}
              <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="card bg-white shadow-md rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {category.image && (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="w-28 h-28 object-cover rounded"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-lg">{category.name}</h3>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4>
                        Status:{" "}
                        <span
                          className={`badge ${
                            category.status == 1
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {category.status == 1 ? "Active" : "Inactive"}
                        </span>
                      </h4>
                    </div>

                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="hover:text-yellow-600 text-yellow-600 border-none"
                      >
                        <FaEdit size={24} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="hover:text-red-700 text-red-600 border-none"
                      >
                        <MdDelete size={26} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
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
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
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
