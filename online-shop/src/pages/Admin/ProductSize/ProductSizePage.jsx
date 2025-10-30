import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ProductSizePage = () => {
    const { t, i18n } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({ id: null, name: "", status: "1" });

  // Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchSizes = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/admin/sizes");

      // If paginated: sizes are inside res.data.data.data
      const data = res.data?.data?.data ?? res.data?.data ?? [];

      setSizes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch sizes error:", error);
      setSizes([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Reset form
  const resetForm = () => {
    setForm({ id: null, name: "", status: "1" });
  };

  // ✅ Submit create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        // ✅ Update using POST + _method=PUT
        await axiosSecure.post(`/admin/sizes/${form.id}?_method=PUT`, form, {
          headers: { "Content-Type": "application/json" },
        });

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Size has been updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // ✅ Create new size
        await axiosSecure.post("/admin/sizes", form, {
          headers: { "Content-Type": "application/json" },
        });

        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Size has been added successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      fetchSizes();
      resetForm();
      setIsCreateOpen(false);
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Error saving size.",
      });
    }
  };

  // ✏️ Edit
  const handleEdit = (size) => {
    setForm({
      id: size.id,
      name: size.name,
      status: size.status?.toString() || "1",
    });
    setIsEditOpen(true);
  };

  // 🗑️ Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/admin/sizes/${id}`);
        fetchSizes();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Size has been deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete size.",
        });
      }
    }
  };

  return (
    <div className="p-2 lg:p-6 max-w-[425px] md:max-w-5xl lg:max-w-7xl xl:max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold mb-4">{t("ProductSizes")}</h2>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#ff9100] text-white rounded-lg mb-2"
        >
          + {t("AddSize")}
        </button>

      </div>
    </div>

      {/* Table */}
      <div className="bg-[#ddd] w-full shadow rounded-t-[50px] lg:rounded-2xl">
        <div className="overflow-x-auto p-6 lg:p-20">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* 🖥 TABLE VIEW (Desktop and Tablet) */}
              <div className="hidden md:block">
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
                    {sizes.map((size, index) => (
                      <tr key={size.id} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{size.name}</td>
                        <td className="px-4 py-2">{size.status == 1 ? "Active" : "Inactive"}</td>
                        <td className="px-4 py-2 flex space-x-2 justify-center">
                         <button
                          onClick={() => handleEdit(size)}
                          className="hover:text-yellow-600 text-yellow-600 border-none"
                        >
                          <FaEdit size={24} /> {/* 👈 Increased size */}
                        </button>
                        <button
                          onClick={() => handleDelete(size.id)}
                          className="hover:text-red-700 text-red-600 border-none"
                        >
                          <MdDelete size={26} /> {/* 👈 Increased size */}
                        </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 📱 CARD VIEW (Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {sizes.map((size) => (
                  <div
                    key={size.id}
                    className="card bg-white shadow-md border border-gray-200 rounded-2xl"
                  >
                    <div className="card-body p-4 text-center">
                      <div className="flex justify-between">
                        <h2 className="card-title text-lg font-semibold">
                          Title: {size.name}
                        </h2>
                        <h4>
                          Status:{" "}
                          <span
                            className={`badge ${
                              size.status == 1
                                ? "badge-success"
                                : "badge-error"
                            }`}
                          >
                            {" "}
                            {size.status == 1 ? "Active" : "Inactive"}
                          </span>
                        </h4>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => handleEdit(size)}
                          className="hover:text-yellow-600 text-yellow-600 border-none"
                        >
                          <FaEdit size={24} /> {/* 👈 Increased size */}
                        </button>
                        <button
                          onClick={() => handleDelete(size.id)}
                          className="hover:text-red-700 text-red-600 border-none"
                        >
                          <MdDelete size={26} /> {/* 👈 Increased size */}
                        </button>
                      </div>
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
              {form.id ? "Edit Size" : "Create Size"}
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

export default ProductSizePage;
