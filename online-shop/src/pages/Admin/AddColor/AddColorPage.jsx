import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AddColorPage = () => {
  const { t, i18n } = useTranslation();
  const axiosSecure = useAxiosSecure();
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({ id: null, name: "", status: "1" });

  // Modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchColors = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/admin/colors");

      // If paginated: colors are inside res.data.data.data
      const data = res.data?.data?.data ?? res.data?.data ?? [];

      setColors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch colors error:", error);
      setColors([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchColors();
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

  // Submit create/update

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // ✅ Update (PUT)
        await axiosSecure.put(`/admin/colors/${form.id}`, form, {
          headers: { "Content-Type": "application/json" },
        });

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Color has been updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // ✅ Create (POST)
        await axiosSecure.post("/admin/colors", form, {
          headers: { "Content-Type": "application/json" },
        });

        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "Color has been added successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      fetchColors();
      resetForm();
      setIsCreateOpen(false);
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Error saving color.",
      });
    }
  };

  // ✏️ Edit
  const handleEdit = (color) => {
    setForm({
      id: color.id,
      name: color.name,
      status: color.status?.toString() || "1",
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
        await axiosSecure.delete(`/admin/colors/${id}`);
        fetchColors();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Color has been deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to delete color.",
        });
      }
    }
  };

  return (
    <div className="p-2 lg:p-6 max-w-[425px] md:max-w-5xl lg:max-w-7xl xl:max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">{t("productscolor")}</h2>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-[#ff9100] text-white rounded-lg mb-2"
        >
          + {t("Addcolor")}
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#ddd] w-full shadow rounded-t-[50px] lg:rounded-2xl">
        <div className="overflow-x-auto p-6 lg:p-20">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {/* ✅ TABLE VIEW (Desktop) */}
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
                    {colors.map((color, index) => (
                      <tr key={color.id} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{color.name}</td>
                         <td className="px-4 py-2">{color.status == 1 ? "Active" : "Inactive"}</td>
                        <td className="px-4 py-2 flex space-x-2 justify-center">
                              <button
                          onClick={() => handleEdit(color)}
                          className="hover:text-yellow-600 text-yellow-600 border-none"
                        >
                          <FaEdit size={24} /> {/* 👈 Increased size */}
                        </button>
                        <button
                          onClick={() => handleDelete(color.id)}
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

              {/* ✅ CARD VIEW (Mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {colors.map((color, index) => (
                  <div
                    key={color.id}
                    className="card bg-white shadow-lg rounded-2xl p-4 border border-gray-200"
                  >
                    <div className="card-body p-0">
                      <div className="flex justify-between">
                        <h2 className="card-title text-lg font-semibold">
                          Title: {color.name}
                        </h2>
                        <h4>
                          Status:{" "}
                          <span
                            className={`badge ${
                              color.status == 1
                                ? "badge-success"
                                : "badge-error"
                            }`}
                          >
                            {" "}
                            {color.status == 1 ? "Active" : "Inactive"}
                          </span>
                        </h4>
                      </div>
                      <div className="flex justify-end space-x-2 mt-3">
                        <button
                          onClick={() => handleEdit(color)}
                          className="hover:text-yellow-600 text-yellow-600 border-none"
                        >
                          <FaEdit size={24} /> {/* 👈 Increased size */}
                        </button>
                        <button
                          onClick={() => handleDelete(color.id)}
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

export default AddColorPage;
