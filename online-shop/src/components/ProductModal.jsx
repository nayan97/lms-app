import React, { useEffect, useState } from "react";
import Select from "react-select";

const ProductModal = ({
  product = {},
  categories = [],
  sizes = [],
  colors = [],
  onClose,
  onSave,
}) => {
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [sizeSelection, setSizeSelection] = useState([]);
  const [colorSelection, setColorSelection] = useState([]);

  // ✅ Initialize main image preview
  useEffect(() => {
    setMainImagePreview(product.image ? `/storage/${product.image}` : null);
  }, [product]);

  // ✅ Initialize gallery previews
  useEffect(() => {
    if (Array.isArray(product.image_gal) && product.image_gal.length > 0) {
      setGalleryPreviews(product.image_gal.map((img) => `/storage/${img}`));
    } else {
      setGalleryPreviews([]);
    }
  }, [product]);

  // ✅ Initialize selected sizes/colors
  useEffect(() => {
    if (product.sizes && sizes.length > 0) {
      const selected = sizes
        .filter((s) => product.sizes.includes(String(s.id)) || product.sizes.includes(Number(s.id)))
        .map((s) => ({ value: s.id, label: s.name }));
      setSizeSelection(selected);
    } else setSizeSelection([]);

    if (product.colors && colors.length > 0) {
      const selected = colors
        .filter((c) => product.colors.includes(String(c.id)) || product.colors.includes(Number(c.id)))
        .map((c) => ({ value: c.id, label: c.name }));
      setColorSelection(selected);
    } else setColorSelection([]);
  }, [product, sizes, colors]);

  // ✅ Handle new gallery file selection
  const handleGallerySelect = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryFiles((prev) => [...prev, ...files]);
    setGalleryPreviews((prev) => [...prev, ...previews]);
  };

  // ✅ Remove gallery image
  const handleRemoveGallery = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Append new gallery images
    galleryFiles.forEach((file) => formData.append("image_gal[]", file));

    // Append selected sizes and colors
    formData.append(
      "sizes",
      JSON.stringify(sizeSelection.map((s) => s.value))
    );
    formData.append(
      "colors",
      JSON.stringify(colorSelection.map((c) => c.value))
    );

    onSave(formData, product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-bold">
            {product.id ? "Edit Product" : "Add New Product"}
          </h3>
          <button onClick={onClose}>✖</button>
        </div>

        {/* Form */}
        <div className="p-4">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Title */}
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                name="title"
                defaultValue={product.title || ""}
                className="w-full border rounded p-2"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                name="category_id"
                defaultValue={product.category_id ? String(product.category_id) : ""}
                className="w-full border rounded p-2"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm mb-1">Sizes</label>
              <Select
                isMulti
                options={sizes.map((s) => ({ value: s.id, label: s.name }))}
                value={sizeSelection}
                onChange={setSizeSelection}
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
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={product.description || ""}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Prices */}
            {[
              { name: "price", label: "Price" },
              { name: "cross_price", label: "Cross Price" },
              { name: "source_price", label: "Source Price" },
              { name: "profit", label: "Profit" },
              { name: "max_price", label: "Max Price" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm mb-1">{f.label}</label>
                <input
                  type="number"
                  step="0.01"
                  name={f.name}
                  defaultValue={product[f.name] || ""}
                  className="w-full border rounded p-2"
                />
              </div>
            ))}

            {/* Source URL */}
            <div>
              <label className="block text-sm mb-1">Source URL</label>
              <input
                type="url"
                name="source_url"
                defaultValue={product.source_url || ""}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Status & Featured */}
            <div>
              <label className="block text-sm mb-1">Status</label>
              <select
                name="status"
                defaultValue={product.status ?? "1"}
                className="w-full border rounded p-2"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Featured</label>
              <select
                name="is_featured"
                defaultValue={product.is_featured || "no"}
                className="w-full border rounded p-2"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Main Image */}
            {mainImagePreview && (
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Current Main Image</label>
                <img
                  src={mainImagePreview}
                  alt="Main"
                  className="w-24 h-24 object-cover rounded border mb-2"
                />
              </div>
            )}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Change Main Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full border rounded p-2"
              />
            </div>

            {/* Gallery */}
            {galleryPreviews.length > 0 && (
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Gallery Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {galleryPreviews.map((src, i) => (
                    <div key={i} className="relative">
                      <img
                        src={src}
                        alt={`Gallery ${i}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGallery(i)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Add New Gallery</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleGallerySelect}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded"
              >
                {product.id ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
