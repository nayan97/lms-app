import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useTranslation } from "react-i18next";

const ProductModal = ({
  product = {},
  categories = [],
  sizes = [],
  colors = [],
  onClose,
}) => {
  const axiosSecure = useAxiosSecure();

   const { t, i18n } = useTranslation();

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [sizeSelection, setSizeSelection] = useState([]);
  const [colorSelection, setColorSelection] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    description: "",
    price: "",
    source_price: "",
    cross_price: "",
    max_price: "",
    profit: "",
    source_url: "",
    status: 0,
    is_featured: "no",
  });

  const inputClass =
    "w-full bg-gray-100 rounded-xl p-2 border border-transparent focus:border-[#ccc] outline-none transition-all duration-200";

  // Prefill data when editing
  // Prefill data when editing
  useEffect(() => {
    if (product && product.id) {
      setFormData({
        title: product.title || "",
        category_id: product.category_id || "",
        description: product.description || "",
        price: product.price || "",
        source_price: product.source_price || "",
        cross_price: product.cross_price || "",
        max_price: product.max_price || "",
        profit: product.profit || "",
        source_url: product.source_url || "",
        status: product.status ?? 0,
        is_featured: product.is_featured || "no",
      });

      // ✅ Fix main image preview
      if (product.image) {
        setMainImagePreview(
          product.image.startsWith("http")
            ? product.image
            : `https://apiv.lifechangebda.com/storage/${product.image}`
        );
      } else {
        setMainImagePreview(null);
      }

      // ✅ Fix gallery previews
      if (Array.isArray(product.image_gal) && product.image_gal.length > 0) {
        const normalized = product.image_gal.map((img) =>
          img.startsWith("http")
            ? img
            : `https://apiv.lifechangebda.com/storage/${img}`
        );
        setGalleryPreviews(normalized);
      } else {
        setGalleryPreviews([]);
      }

      // Sizes
      if (product.sizes && sizes.length > 0) {
        const selectedSizes = sizes
          .filter(
            (s) =>
              product.sizes.includes(String(s.id)) ||
              product.sizes.includes(Number(s.id))
          )
          .map((s) => ({ value: s.id, label: s.name }));
        setSizeSelection(selectedSizes);
      }

      // Colors
      if (product.colors && colors.length > 0) {
        const selectedColors = colors
          .filter(
            (c) =>
              product.colors.includes(String(c.id)) ||
              product.colors.includes(Number(c.id))
          )
          .map((c) => ({ value: c.id, label: c.name }));
        setColorSelection(selectedColors);
      }
    } else {
      // Reset form for create mode
      setFormData({
        title: "",
        category_id: "",
        description: "",
        price: "",
        source_price: "",
        cross_price: "",
        max_price: "",
        profit: "",
        source_url: "",
        status: 0,
        is_featured: "no",
      });
      setMainImagePreview(null);
      setGalleryPreviews([]);
      setSizeSelection([]);
      setColorSelection([]);
    }
  }, [product, sizes, colors]);

  // Handle gallery selection
  const handleGallerySelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveGallery = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Controlled form updates
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  // ✅ Universal handleSubmit (Create + Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();

      // Append all fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          submitData.append(key, value);
        }
      });

      // Numeric fields ensure integer
      ["price", "source_price", "cross_price", "max_price", "profit"].forEach(
        (key) => {
          if (formData[key]) {
            submitData.set(key, parseFloat(formData[key]));
          }
        }
      );

      // Sizes & Colors
      sizeSelection.forEach((s) => submitData.append("sizeIds[]", s.value));
      colorSelection.forEach((c) => submitData.append("colorIds[]", c.value));

      // Main image
      const mainFile = e.target.image?.files?.[0];
      if (mainFile) submitData.append("image", mainFile);

      // Gallery images
      galleryFiles.forEach((file) => submitData.append("image_gal[]", file));

      // ✅ Use POST + _method=PUT for updates
      const url = product.id
        ? `/admin/products/${product.id}?_method=PUT`
        : `/admin/products`;

      await axiosSecure.post(url, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

    Swal.fire({
      icon: "success",
      title: product.id ? t("successTitleUpdate") : t("successTitleCreate"),
      text: product.id ? t("successTextUpdate") : t("successTextCreate"),
      confirmButtonColor: "#16a34a",
    });

      onClose();
    } catch (err) {
      console.error("Error saving product", err.response?.data || err);
      Swal.fire("Error!", "Failed to save product.", "error");
      
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">
          {product.id ? "Edit Product" : "Add Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              name="title"
              placeholder="Title"
              className={inputClass}
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              className={inputClass}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                className={inputClass}
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Source Price</label>
              <input
                type="number"
                name="source_price"
                placeholder="Source Price"
                className={inputClass}
                value={formData.source_price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Cross Price</label>
              <input
                type="number"
                name="cross_price"
                placeholder="Cross Price"
                className={inputClass}
                value={formData.cross_price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Max Price</label>
              <input
                type="number"
                name="max_price"
                placeholder="Max Price"
                className={inputClass}
                value={formData.max_price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              {/* <input
                type="hidden"
                name="profit"
                placeholder="Profit"
                className={inputClass}
                value={formData.profit}
                onChange={handleChange}
              /> */}

              <label className="block text-sm mb-1">Category</label>
              <select
                name="category_id"
                className={inputClass}
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm mb-1">Source/Vendor</label>
              <input
                type="text"
                name="source_url"
                placeholder="Source URL"
                className={inputClass}
                value={formData.source_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-end gap-3">
            {/* Status */}
            <div className="flex-1">
              <label className="block text-sm mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select Status</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            {/* Featured */}
            <div className="flex-1">
              <label className="block text-sm mb-1">Featured</label>
              <select
                name="is_featured"
                value={formData.is_featured}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm mb-1">Sizes</label>
            <Select
              isMulti
              options={sizes.map((s) => ({ value: s.id, label: s.name }))}
              value={sizeSelection}
              onChange={setSizeSelection}
              placeholder="Select Sizes"
            />
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm mb-1">Colors</label>
            <Select
              isMulti
              options={colors.map((c) => ({ value: c.id, label: c.name }))}
              value={colorSelection}
              onChange={setColorSelection}
              placeholder="Select Colors"
            />
          </div>

          {/* Main Image */}
          <div>
            <label className="block mb-1 font-medium">Main Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className={inputClass}
              onChange={(e) =>
                setMainImagePreview(
                  e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : mainImagePreview
                )
              }
            />
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Preview"
                className="mt-2 h-24 rounded-lg object-cover"
              />
            )}
          </div>

          {/* Gallery */}

          {/* Gallery */}
          <div>
            <label className="block mb-1 font-medium">Gallery Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className={inputClass}
              onChange={handleGallerySelect}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {galleryPreviews.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={src}
                    alt="Gallery"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGallery(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* <div>
            <label className="block mb-1 font-medium">Gallery Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className={inputClass}
              onChange={handleGallerySelect}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {galleryPreviews.map((src, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={
                      product?.name
                        ? `https://apiv.lifechangebda.com/api/storage/${src}`
                        : src
                    }
                    alt="Gallery"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGallery(idx)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div> */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#ff9100] text-white rounded-lg hover:bg-[#f6a63e]"
            >
              {product.id ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
