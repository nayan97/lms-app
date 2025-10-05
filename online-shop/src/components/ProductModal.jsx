import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ProductModal = ({
  product = {},
  categories = [],
  sizes = [],
  colors = [],
  onClose,

}) => {
  const axiosSecure = useAxiosSecure();

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
    is_featured: 0,
  });

  // Shared input style
  const inputClass =
    "w-full bg-gray-100 rounded-xl p-2 border border-transparent focus:border-[#ccc] outline-none transition-all duration-200";

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
        status: product.status || 0,
        is_featured: product.is_featured || 0,
      });

      setMainImagePreview(product.image ? `/storage/${product.image}` : null);
      if (Array.isArray(product.image_gal) && product.image_gal.length > 0) {
        setGalleryPreviews(product.image_gal.map((img) => `/storage/${img}`));
      }

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
        status: [],
        is_featured: [],
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

  // ✅ Universal handleSubmit (works for both Create & Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();

      // Basic fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          submitData.append(key, value);
        }
      });

      // Numeric fields
      ["price", "source_price", "cross_price", "max_price", "profit"].forEach(
        (key) => {
          if (formData[key]) {
            submitData.set(key, parseInt(formData[key], 10));
          }
        }
      );

      // Sizes & Colors
      sizeSelection.forEach((s) => submitData.append("sizeIds[]", s.value));
      colorSelection.forEach((c) => submitData.append("colorIds[]", c.value));

      // Main image
      const mainFile = e.target.image.files[0];
      if (mainFile) submitData.append("image", mainFile);

      // Gallery images
      galleryFiles.forEach((file) => submitData.append("image_gal[]", file));

      // Debug
      for (let [k, v] of submitData.entries()) {
        console.log(k, v);
      }

      // Request: POST or PUT
      const url = product.id
        ? `/admin/products/${product.id}`
        : `/admin/products`;
      const method = product.id ? "put" : "post";

     await axiosSecure[method](url, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      


      Swal.fire(
        "Success!",
        `Product ${product.id ? "updated" : "created"} successfully.`,
        "success"
      );

      // fetchProducts();
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
          <input
            name="title"
            placeholder="Title"
            className={inputClass}
            value={formData.title}
            onChange={handleChange}
            required
          />

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

          <textarea
            name="description"
            placeholder="Description"
            className={inputClass}
            value={formData.description}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className={inputClass}
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="source_price"
              placeholder="Source Price"
              className={inputClass}
              value={formData.source_price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="cross_price"
              placeholder="Cross Price"
              className={inputClass}
              value={formData.cross_price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="max_price"
              placeholder="Max Price"
              className={inputClass}
              value={formData.max_price}
              onChange={handleChange}
            />
            <input
              type="number"
              name="profit"
              placeholder="Profit"
              className={inputClass}
              value={formData.profit}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="source_url"
            placeholder="Source URL"
            className={inputClass}
            value={formData.source_url}
            onChange={handleChange}
          />

          <div className="flex items-center gap-3">
            {/* <label className="font-medium">Active</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select> */}

            {/* <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured === 1}
                onChange={handleChange}
              />
              Featured
            </label> */}

            {/* Featured */}
            <div>
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
            <div>
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
          <Select
            isMulti
            options={sizes.map((s) => ({ value: s.id, label: s.name }))}
            value={sizeSelection}
            onChange={setSizeSelection}
            placeholder="Select Sizes"
          />

          {/* Colors */}
          <Select
            isMulti
            options={colors.map((c) => ({ value: c.id, label: c.name }))}
            value={colorSelection}
            onChange={setColorSelection}
            placeholder="Select Colors"
          />

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

                    src={product?.name ? `http://192.168.110.207:8000/api/storage/${src}`:src}
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
