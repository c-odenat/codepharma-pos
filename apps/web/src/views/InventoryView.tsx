import { useState } from "react";
import { Product } from "@codepharma/shared";

export default function InventoryView() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: "",
    genericName: "",
    sku: "",
    barcode: "",
    category: "",
    manufacturer: "",
    requiresPrescription: false,
    isControlled: false,
    unitPrice: 0,
    taxRate: 5,
    stockQuantity: 0,
    reorderLevel: 0,
    batchNumber: "",
    expiryDate: "",
    rackLocation: "",
    imageUrl: ""
  });
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [categories] = useState(["Pain Relief", "Antibiotics", "Gastrointestinal", "Vitamins", "First Aid"]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setProductForm({ ...productForm, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to API with image upload
    console.log("Product:", productForm);
    console.log("Image file:", imageFile);
    alert("Product saved successfully!");
    setShowProductModal(false);
    resetProductForm();
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to API
    console.log("Category:", categoryName);
    alert("Category saved successfully!");
    setShowCategoryModal(false);
    setCategoryName("");
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      genericName: "",
      sku: "",
      barcode: "",
      category: "",
      manufacturer: "",
      requiresPrescription: false,
      isControlled: false,
      unitPrice: 0,
      taxRate: 5,
      stockQuantity: 0,
      reorderLevel: 0,
      batchNumber: "",
      expiryDate: "",
      rackLocation: "",
      imageUrl: ""
    });
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Inventory Management</h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-secondary" onClick={() => setShowCategoryModal(true)}>
            Add Category
          </button>
          <button className="btn-primary" onClick={() => setShowProductModal(true)}>
            Add New Product
          </button>
        </div>
      </div>
      <div className="view-content">
        <div className="info-card">
          <h3>📦 Inventory Module</h3>
          <p>Manage stock levels, track batches, expiry dates, and reorder points.</p>
          <ul>
            <li>Stock in/out tracking</li>
            <li>Batch & expiry management</li>
            <li>Low stock alerts</li>
            <li>Supplier management</li>
          </ul>
        </div>
      </div>

      {/* Add Product Modal */}
      {showProductModal && (
        <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProductModal(false)}>×</button>
            <h2>Add New Product</h2>
            <form onSubmit={handleProductSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="label">Product Name *</label>
                  <input
                    type="text"
                    className="input"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Paracetamol 500mg"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Generic Name</label>
                  <input
                    type="text"
                    className="input"
                    value={productForm.genericName}
                    onChange={(e) => setProductForm({ ...productForm, genericName: e.target.value })}
                    placeholder="e.g. Acetaminophen"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">SKU *</label>
                  <input
                    type="text"
                    className="input"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    placeholder="MED001"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Barcode</label>
                  <input
                    type="text"
                    className="input"
                    value={productForm.barcode}
                    onChange={(e) => setProductForm({ ...productForm, barcode: e.target.value })}
                    placeholder="123456789"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">Category *</label>
                  <select
                    className="input"
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Manufacturer</label>
                  <input
                    type="text"
                    className="input"
                    value={productForm.manufacturer}
                    onChange={(e) => setProductForm({ ...productForm, manufacturer: e.target.value })}
                    placeholder="Pharma Co"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">Unit Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input"
                    required
                    value={productForm.unitPrice}
                    onChange={(e) => setProductForm({ ...productForm, unitPrice: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input"
                    value={productForm.taxRate}
                    onChange={(e) => setProductForm({ ...productForm, taxRate: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">Stock Quantity *</label>
                  <input
                    type="number"
                    className="input"
                    required
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: parseInt(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Reorder Level</label>
                  <input
                    type="number"
                    className="input"
                    value={productForm.reorderLevel}
                    onChange={(e) => setProductForm({ ...productForm, reorderLevel: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">Batch Number</label>
                  <input
                    type="text"
                    className="input"
                    value={productForm.batchNumber}
                    onChange={(e) => setProductForm({ ...productForm, batchNumber: e.target.value })}
                    placeholder="BTH2024001"
                  />
                </div>
                <div className="form-group">
                  <label className="label">Expiry Date</label>
                  <input
                    type="date"
                    className="input"
                    value={productForm.expiryDate}
                    onChange={(e) => setProductForm({ ...productForm, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">Rack Location</label>
                  <input
                    type="text"
                    className="input"
                    value={productForm.rackLocation}
                    onChange={(e) => setProductForm({ ...productForm, rackLocation: e.target.value })}
                    placeholder="A1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="input"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div className="image-preview-box">
                    <img src={imagePreview} alt="Preview" className="uploaded-image-preview" />
                  </div>
                )}
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={productForm.requiresPrescription}
                    onChange={(e) => setProductForm({ ...productForm, requiresPrescription: e.target.checked })}
                  />
                  <span>Requires Prescription</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={productForm.isControlled}
                    onChange={(e) => setProductForm({ ...productForm, isControlled: e.target.checked })}
                  />
                  <span>Controlled Substance</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowProductModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCategoryModal(false)}>×</button>
            <h2>Add New Category</h2>
            <form onSubmit={handleCategorySubmit}>
              <div className="form-group">
                <label className="label">Category Name *</label>
                <input
                  type="text"
                  className="input"
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Pain Relief"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCategoryModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
