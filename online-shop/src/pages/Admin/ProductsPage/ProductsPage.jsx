import React, { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";

const ProductsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Previews
  // const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]); // store File objects
  const [galleryPreviews, setGalleryPreviews] = useState([]); // preview URLs

  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm();

  // Watch main image
  // const watchMainImage = watch("image");
  // useEffect(() => {
  //   if (watchMainImage && watchMainImage[0]) {
  //     setMainImagePreview(URL.createObjectURL(watchMainImage[0]));
  //   }
  // }, [watchMainImage]);

  // ✅ React Dropzone for gallery
  const onDrop = useCallback((acceptedFiles) => {
    setGalleryFiles((prev) => [...prev, ...acceptedFiles]);
    const newPreviews = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      galleryPreviews.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [galleryPreviews]);

  // ✅ Load data
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/admin/products");
      const data = res.data?.data?.data ?? res.data?.data ?? [];
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch products error:", error);
    }
    setLoading(false);
  };

const fetchCategories = async () => {
  try {
    const res = await axiosSecure.get("/admin/categories");

    // console.log("Full Response:", res.data);

    setCategories(res.data ?? []); // set directly because response is already an array
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};



  useEffect(() => {
    axiosSecure.get("/admin/sizes").then((res) => {
      const active = res.data?.data?.filter((s) => s.status === 1) || [];
      setSizes(active);
    });
    axiosSecure.get("/admin/colors").then((res) => {
      const active = res.data?.data?.filter((c) => c.status === 1) || [];
      setColors(active);
    });
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Submit handler
const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    // Required fields
    formData.append("title", data.title);
    formData.append("category_id", data.category_id);
    formData.append("description", data.description || "");
    formData.append("status", data.status);
    formData.append("is_featured", data.is_featured);

    // Numeric fields → integers
    formData.append("price", parseInt(data.price, 10));
    if (data.source_price) formData.append("source_price", parseInt(data.source_price, 10));
    if (data.cross_price) formData.append("cross_price", parseInt(data.cross_price, 10));
    if (data.max_price) formData.append("max_price", parseInt(data.max_price, 10));
    if (data.profit) formData.append("profit", parseInt(data.profit, 10));

    // Optional URL
    if (data.source_url) formData.append("source_url", data.source_url);

    // Sizes & Colors
    if (data.sizeIds) data.sizeIds.forEach((id) => formData.append("sizeIds[]", id));
    if (data.colorIds) data.colorIds.forEach((id) => formData.append("colorIds[]", id));

    // Main image
 if (data.image && data.image[0]) {
  const file = data.image[0];
  const reader = new FileReader();
  
  reader.onloadend = () => {
    const base64String = reader.result; // this is a string now
    formData.append("image", base64String);
  };
  
  reader.readAsDataURL(file);
}
//     // Gallery images (Laravel expects image_gallery[])
    galleryFiles.forEach((file) => formData.append("image_gal[]", file));

    // Debug
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    await axiosSecure.post("/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Swal.fire("Success!", "Product added successfully.", "success");

    // Reset
    fetchProducts();
    setShowCreateModal(false);
    // setMainImagePreview(null);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    reset();
  } catch (err) {
    console.error("Error creating product", err.response?.data || err);
    Swal.fire("Error!", "Failed to create product.", "error");
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

      {/* Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg shadow max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold">Add New Product</h3>
              <button onClick={() => setShowCreateModal(false)}>✖</button>
            </div>

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
                <input type="hidden" {...register("sizeIds")} />

                {/* Colors */}
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

                {/* ✅ Main image */}


                {/* ✅ Gallery using Dropzone */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Gallery Images</label>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
                      isDragActive ? "border-blue-500" : "border-gray-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop files here ...</p>
                    ) : isDragReject ? (
                      <p className="text-red-500">File type not accepted</p>
                    ) : (
                      <p>Drag & drop images, or click to select</p>
                    )}
                  </div>

                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {galleryPreviews.map((file, i) => (
                        <div key={i} className="relative">
                          <img
                            src={file.preview}
                            alt={`preview-${i}`}
                            className="w-24 h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              // remove image
                              setGalleryFiles((prev) =>
                                prev.filter((_, idx) => idx !== i)
                              );
                              setGalleryPreviews((prev) =>
                                prev.filter((_, idx) => idx !== i)
                              );
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded px-1"
                          >
                            ✕
                          </button>
                        </div>
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
