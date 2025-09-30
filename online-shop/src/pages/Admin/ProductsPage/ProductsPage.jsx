import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

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

  // ✅ react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Watch file inputs for previews
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

  // Load data
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
      const data = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchSizes = async () => {
    try {
      const res = await axiosSecure.get("/admin/sizes");
      const data = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
      setSizes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching sizes", err);
    }
  };

  const fetchColors = async () => {
    try {
      const res = await axiosSecure.get("/admin/colors");
      const data = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
      setColors(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching colors", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSizes();
    fetchColors();
  }, []);

  // ✅ Submit handler
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append text fields
      Object.keys(data).forEach((key) => {
        if (key !== "image" && key !== "image_gallery") {
          formData.append(key, data[key]);
        }
      });

      // Append files
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

      fetchProducts();
      setShowCreateModal(false);
      setMainImagePreview(null);
      setGalleryPreviews([]);
      reset();
    } catch (err) {
      console.error("Error creating product", err);
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

      {/* Table (same as before)... */}

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
                  <span className="text-red-500 text-sm">Title is required</span>
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
                  <select {...register("sizes[]")} multiple className="w-full border rounded p-2">
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
                  <select {...register("colors[]")} multiple className="w-full border rounded p-2">
                    {colors.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  {...register("price", { required: true })}
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="w-full border rounded p-2"
                />
                <input {...register("source_price")} type="number" step="0.01" placeholder="Source Price" className="w-full border rounded p-2" />
                <input {...register("source_url")} type="url" placeholder="Source URL" className="w-full border rounded p-2" />
                <input {...register("cross_price")} type="number" step="0.01" placeholder="Cross Price" className="w-full border rounded p-2" />
                <input {...register("profit")} type="number" step="0.01" placeholder="Profit" className="w-full border rounded p-2" />
                <input {...register("max_price")} type="number" step="0.01" placeholder="Max Price" className="w-full border rounded p-2" />

                <select {...register("status")} className="w-full border rounded p-2">
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>

                <select {...register("is_featured")} className="w-full border rounded p-2">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                {/* ✅ Main image with preview */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Main Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    accept="image/*"
                    className="w-full border rounded p-2"
                  />
                  {mainImagePreview && (
                    <div className="mt-2">
                      <img
                        src={mainImagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                {/* ✅ Gallery with multiple previews */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Image Gallery</label>
                  <input
                    {...register("image_gallery")}
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full border rounded p-2"
                  />
                  {galleryPreviews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {galleryPreviews.map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt={`Preview ${idx}`}
                          className="w-24 h-24 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end mt-4">
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
    </div>
  );
};

export default ProductsPage;
