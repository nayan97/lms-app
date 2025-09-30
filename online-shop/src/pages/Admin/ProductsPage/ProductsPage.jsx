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

  // ✅ react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
  useEffect(() => {
    axiosSecure
      .get("/admin/sizes")
      .then((res) => {
        const sizesArray = res.data?.data ?? [];
        const activeSizes = sizesArray.filter((s) => s.status === 1);
        setSizes(activeSizes);
      })
      .catch((err) => console.error("Error fetching sizes:", err));
  }, []);

  useEffect(() => {
    axiosSecure
      .get("/admin/colors")
      .then((res) => {
        const colorArray = res.data?.data ?? [];
        const activeColors = colorArray.filter((s) => s.status === 1);
        setColors(activeColors);
      })
      .catch((err) => console.error("Error fetching Colors:", err));
  }, []);

  // const fetchColors = async () => {
  //   try {
  //     const res = await axiosSecure.get("/admin/colors");
  //     const data = res.data?.data?.data ?? res.data?.data ?? res.data ?? [];
  //     setColors(Array.isArray(data) ? data : []);
  //   } catch (err) {
  //     console.error("Error fetching colors", err);
  //   }
  // };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);


    const handleRemoveImage = (urlToRemove) => {
    setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  // ✅ Submit handler
  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      category_id: data.category_id,
      description: data.description || "",
      price: data.price,
      source_price: data.source_price || null,
      source_url: data.source_url || null,
      cross_price: data.cross_price || null,
      profit: data.profit || null,
      max_price: data.max_price || null,
      status: data.status,
      is_featured: data.is_featured,
      sizeIds: Array.isArray(data.sizeIds) ? data.sizeIds : [],
      colorIds: Array.isArray(data.colorIds) ? data.colorIds : [],
      image: mainImagePreview || null, // URL or Base64 string
      image_gallery: galleryPreviews.length ? galleryPreviews : [],
    };
    console.log(payload);

    try {
      await axiosSecure.post("/admin/products", payload);

      Swal.fire("Success!", "Product added successfully.", "success");

      fetchProducts();
      setShowCreateModal(false);
      setMainImagePreview(null);
      setGalleryPreviews([]);
      reset();
    } catch (err) {
      console.error("Error creating product", err);
      Swal.fire("Error!", "Failed to create product.", "error");
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
                    options={sizes.map((size) => ({
                      value: size.id,
                      label: size.name,
                    }))}
                    onChange={(selectedOptions) =>
                      setValue(
                        "sizeIds",
                        selectedOptions.map((opt) => opt.value)
                      )
                    }
                  />
                </div>

                <input
                  type="hidden"
                  {...register("sizeIds", { required: true })}
                />

                {/* Colors */}
                <div>
                  <label className="block text-sm mb-1">Colors</label>
                  <Select
                    isMulti
                    options={colors.map((color) => ({
                      value: color.id,
                      label: color.name,
                    }))}
                    onChange={(selectedOptions) =>
                      setValue(
                        "colorIds",
                        selectedOptions.map((opt) => opt.value)
                      )
                    }
                  />
                </div>

                <input
                  type="hidden"
                  {...register("colorIds", { required: true })}
                />

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
                  step="0.01"
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
                  step="0.01"
                  placeholder="Cross Price"
                  className="w-full border rounded p-2"
                />
                <input
                  {...register("profit")}
                  type="number"
                  step="0.01"
                  placeholder="Profit"
                  className="w-full border rounded p-2"
                />
                <input
                  {...register("max_price")}
                  type="number"
                  step="0.01"
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
                {/* ✅ Images */}
                <div>
                  <p className="font-medium mb-2">Current Images:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={url}
                          alt={`uploaded-${idx}`}
                          className="rounded shadow"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(url)}
                          className="absolute top-1 right-1 btn btn-xs btn-error"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input file-input-bordered w-full"
                />
                {uploading && (
                  <p className="text-blue-500 text-sm">Uploading images...</p>
                )}

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
