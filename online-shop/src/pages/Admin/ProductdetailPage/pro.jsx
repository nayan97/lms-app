import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";

const ProductsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Previews
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // ✅ Upload state
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Watch files
  const watchMainImage = watch("image");
  const watchGallery = watch("image_gallery");

  useEffect(() => {
    if (watchMainImage && watchMainImage[0]) {
      setMainImagePreview(URL.createObjectURL(watchMainImage[0]));
    }
  }, [watchMainImage]);

  useEffect(() => {
    if (watchGallery && watchGallery.length > 0) {
      const previews = Array.from(watchGallery).map((file) =>
        URL.createObjectURL(file)
      );
      setGalleryPreviews(previews);
    }
  }, [watchGallery]);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/admin/products");
      const data = res.data?.data?.data ?? res.data?.data ?? [];
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch products error:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosSecure.get("/admin/categories");
      const data = res.data?.data?.data ?? res.data?.data ?? [];
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    axiosSecure.get("/admin/sizes").then((res) => {
      const sizesArray = res.data?.data ?? [];
      setSizes(sizesArray.filter((s) => s.status === 1));
    });
    axiosSecure.get("/admin/colors").then((res) => {
      const colorArray = res.data?.data ?? [];
      setColors(colorArray.filter((s) => s.status === 1));
    });
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Submit handler with FormData
  const onSubmit = async (data) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("category_id", data.category_id);
      formData.append("description", data.description || "");
      formData.append("price", data.price);
      formData.append("source_price", data.source_price || "");
      formData.append("source_url", data.source_url || "");
      formData.append("cross_price", data.cross_price || "");
      formData.append("profit", data.profit || "");
      formData.append("max_price", data.max_price || "");
      formData.append("status", data.status);
      formData.append("is_featured", data.is_featured);

      if (data.sizeIds) {
        data.sizeIds.forEach((id) => formData.append("sizeIds[]", id));
      }
      if (data.colorIds) {
        data.colorIds.forEach((id) => formData.append("colorIds[]", id));
      }

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }
      if (data.image_gallery && data.image_gallery.length > 0) {
        Array.from(data.image_gallery).forEach((file) => {
          formData.append("image_gallery[]", file);
        });
      }

      await axiosSecure.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success!", "Product added successfully.", "success");

      fetchProducts();
      setShowCreateModal(false);
      setMainImagePreview(null);
      setGalleryPreviews([]);
      reset();
    } catch (err) {
      console.error("Error creating product", err);
      Swal.fire("Error!", "Failed to create product.", "error");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete product
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

      {/* ✅ Product Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>${p.price}</td>
                  <td>{p.category?.name || "-"}</td>
                  <td>{p.status === 1 ? "Active" : "Inactive"}</td>
                  <td>{p.is_featured === "yes" ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold">Add New Product</h3>
              <button onClick={() => setShowCreateModal(false)}>✖</button>
            </div>

            {/* Body */}
            <div className="p-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Title"
                  className="w-full border rounded p-2"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    Title is required
                  </span>
                )}

                <select
                  {...register("category_id", { required: true })}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="w-full border rounded p-2 md:col-span-2"
                ></textarea>

                {/* Sizes */}
                <div>
                  <label className="block text-sm mb-1">Sizes</label>
                  <Select
                    isMulti
                    options={sizes.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                    onChange={(opts) =>
                      setValue("sizeIds", opts.map((o) => o.value))
                    }
                  />
                </div>
                <input type="hidden" {...register("sizeIds")} />

                {/* Colors */}
                <div>
                  <label className="block text-sm mb-1">Colors</label>
                  <Select
                    isMulti
                    options={colors.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                    onChange={(opts) =>
                      setValue("colorIds", opts.map((o) => o.value))
                    }
                  />
                </div>
                <input type="hidden" {...register("colorIds")} />

                {/* Pricing fields */}
                <input
                  {...register("price", { required: true })}
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="w-full border rounded p-2"
                />
                <input
                  {...register("source_price")}
                  type="number"
                  placeholder="Source Price"
                  className="w-full border rounded p-2"
                />
                <input
                  {...register("source_url")}
                  type="url"
                  placeholder="Source URL"
                  className="w-full border rounded p-2"
                />
                <input
                  {...register("cross_price")}
                  type="number"
                  placeholder="Cross Price"
                  className="w-full border rounded p-2"
                />
                <input
                  {...register("profit")}
                  type="number"
                  placeholder="Profit"
                  className="w-full border rounded p-2"
                />
                <input
                  {...register("max_price")}
                  type="number"
                  placeholder="Max Price"
                  className="w-full border rounded p-2"
                />

                <select
                  {...register("status")}
                  className="w-full border rounded p-2"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>

                <select
                  {...register("is_featured")}
                  className="w-full border rounded p-2"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                {/* Main image */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Main Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    accept="image/*"
                    className="w-full border rounded p-2"
                  />
                  {mainImagePreview && (
                    <img
                      src={mainImagePreview}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded border"
                    />
                  )}
                </div>

                {/* Gallery */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Gallery</label>
                  <input
                    {...register("image_gallery")}
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full border rounded p-2"
                  />
                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {galleryPreviews.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`preview-${i}`}
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end mt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                  >
                    {uploading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
