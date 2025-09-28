import React, { useState } from "react";

const ProductDetailPage= () => {
  const [products, setProducts] = useState([]);

  const [categories] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newProduct = {
      id: Date.now(),
      title: form.get("title"),
      category_id: parseInt(form.get("category_id")),
      status: parseInt(form.get("status")),
    };
    setProducts([...products, newProduct]);
    document.getElementById("createProductModal").close();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updated = {
      ...selectedProduct,
      title: form.get("title"),
      category_id: parseInt(form.get("category_id")),
      status: parseInt(form.get("status")),
    };
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    document.getElementById(`editProductModal`).close();
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Products Details</h2>
        <button
          className="btn btn-primary"
          onClick={() =>
            document.getElementById("createProductModal").showModal()
          }
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-base-200 w-full shadow rounded-xl">
        <div className="overflow-x-auto p-6">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.title}</td>
                  <td className="flex gap-2">
                    {/* Edit */}
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setSelectedProduct(p);
                        document.getElementById("editProductModal").showModal();
                      }}
                    >
                      <i className="fa fa-pencil-alt"></i>
                    </button>

                    {/* Delete */}
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <dialog id="createProductModal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Add New Product</h3>
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-4">
            <div>
              <label className="label">Title</label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">Category</label>
              <select name="category_id" className="select select-bordered w-full" required>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select name="status" className="select select-bordered w-full">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("createProductModal").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Edit Modal */}
      <dialog id="editProductModal" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Edit Product</h3>
          {selectedProduct && (
            <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
              <div>
                <label className="label">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedProduct.title}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Category</label>
                <select
                  name="category_id"
                  defaultValue={selectedProduct.category_id}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select
                  name="status"
                  defaultValue={selectedProduct.status}
                  className="select select-bordered w-full"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    document.getElementById("editProductModal").close()
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetailPage;
