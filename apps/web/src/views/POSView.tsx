import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "@codepharma/shared";

export default function POSView() {
  const { items, addItem, removeItem, updateQuantity, applyDiscount, clearCart, total, subtotal, tax } = useCart();
  const { hasPermission, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loginTime] = useState(new Date());

  useEffect(() => {
    // Mock products - 10 categories with 5 products each
    setProducts([
      // Pain Relief (5 products)
      { id: "1", name: "Paracetamol 500mg", genericName: "Acetaminophen", sku: "MED001", category: "Pain Relief", requiresPrescription: false, isControlled: false, unitPrice: 5.99, taxRate: 5, stockQuantity: 150, reorderLevel: 20 },
      { id: "2", name: "Ibuprofen 400mg", genericName: "Ibuprofen", sku: "MED002", category: "Pain Relief", requiresPrescription: false, isControlled: false, unitPrice: 8.99, taxRate: 5, stockQuantity: 200, reorderLevel: 30 },
      { id: "3", name: "Aspirin 325mg", genericName: "Acetylsalicylic Acid", sku: "MED003", category: "Pain Relief", requiresPrescription: false, isControlled: false, unitPrice: 4.50, taxRate: 5, stockQuantity: 180, reorderLevel: 25 },
      { id: "4", name: "Naproxen 500mg", genericName: "Naproxen Sodium", sku: "MED004", category: "Pain Relief", requiresPrescription: false, isControlled: false, unitPrice: 11.25, taxRate: 5, stockQuantity: 120, reorderLevel: 20 },
      { id: "5", name: "Diclofenac 50mg", genericName: "Diclofenac", sku: "MED005", category: "Pain Relief", requiresPrescription: true, isControlled: false, unitPrice: 13.50, taxRate: 5, stockQuantity: 95, reorderLevel: 15 },
      
      // Antibiotics (5 products)
      { id: "6", name: "Amoxicillin 250mg", genericName: "Amoxicillin", sku: "MED006", category: "Antibiotics", requiresPrescription: true, isControlled: false, unitPrice: 12.50, taxRate: 5, stockQuantity: 80, reorderLevel: 15 },
      { id: "7", name: "Azithromycin 500mg", genericName: "Azithromycin", sku: "MED007", category: "Antibiotics", requiresPrescription: true, isControlled: false, unitPrice: 18.75, taxRate: 5, stockQuantity: 65, reorderLevel: 10 },
      { id: "8", name: "Ciprofloxacin 500mg", genericName: "Ciprofloxacin", sku: "MED008", category: "Antibiotics", requiresPrescription: true, isControlled: false, unitPrice: 22.00, taxRate: 5, stockQuantity: 50, reorderLevel: 10 },
      { id: "9", name: "Doxycycline 100mg", genericName: "Doxycycline", sku: "MED009", category: "Antibiotics", requiresPrescription: true, isControlled: false, unitPrice: 15.50, taxRate: 5, stockQuantity: 70, reorderLevel: 12 },
      { id: "10", name: "Cephalexin 500mg", genericName: "Cephalexin", sku: "MED010", category: "Antibiotics", requiresPrescription: true, isControlled: false, unitPrice: 19.99, taxRate: 5, stockQuantity: 55, reorderLevel: 10 },
      
      // Gastrointestinal (5 products)
      { id: "11", name: "Omeprazole 20mg", genericName: "Omeprazole", sku: "MED011", category: "Gastrointestinal", requiresPrescription: true, isControlled: false, unitPrice: 15.00, taxRate: 5, stockQuantity: 100, reorderLevel: 20 },
      { id: "12", name: "Ranitidine 150mg", genericName: "Ranitidine", sku: "MED012", category: "Gastrointestinal", requiresPrescription: false, isControlled: false, unitPrice: 8.25, taxRate: 5, stockQuantity: 140, reorderLevel: 25 },
      { id: "13", name: "Loperamide 2mg", genericName: "Loperamide", sku: "MED013", category: "Gastrointestinal", requiresPrescription: false, isControlled: false, unitPrice: 6.50, taxRate: 5, stockQuantity: 110, reorderLevel: 20 },
      { id: "14", name: "Bismuth Subsalicylate", genericName: "Bismuth", sku: "MED014", category: "Gastrointestinal", requiresPrescription: false, isControlled: false, unitPrice: 9.75, taxRate: 5, stockQuantity: 85, reorderLevel: 15 },
      { id: "15", name: "Metoclopramide 10mg", genericName: "Metoclopramide", sku: "MED015", category: "Gastrointestinal", requiresPrescription: true, isControlled: false, unitPrice: 12.00, taxRate: 5, stockQuantity: 75, reorderLevel: 15 },
      
      // Cardiovascular (5 products)
      { id: "16", name: "Atenolol 50mg", genericName: "Atenolol", sku: "MED016", category: "Cardiovascular", requiresPrescription: true, isControlled: false, unitPrice: 14.50, taxRate: 5, stockQuantity: 90, reorderLevel: 15 },
      { id: "17", name: "Lisinopril 10mg", genericName: "Lisinopril", sku: "MED017", category: "Cardiovascular", requiresPrescription: true, isControlled: false, unitPrice: 16.25, taxRate: 5, stockQuantity: 105, reorderLevel: 20 },
      { id: "18", name: "Amlodipine 5mg", genericName: "Amlodipine", sku: "MED018", category: "Cardiovascular", requiresPrescription: true, isControlled: false, unitPrice: 18.00, taxRate: 5, stockQuantity: 95, reorderLevel: 18 },
      { id: "19", name: "Metoprolol 50mg", genericName: "Metoprolol", sku: "MED019", category: "Cardiovascular", requiresPrescription: true, isControlled: false, unitPrice: 15.75, taxRate: 5, stockQuantity: 88, reorderLevel: 15 },
      { id: "20", name: "Simvastatin 20mg", genericName: "Simvastatin", sku: "MED020", category: "Cardiovascular", requiresPrescription: true, isControlled: false, unitPrice: 21.50, taxRate: 5, stockQuantity: 72, reorderLevel: 12 },
      
      // Diabetes (5 products)
      { id: "21", name: "Metformin 500mg", genericName: "Metformin", sku: "MED021", category: "Diabetes", requiresPrescription: true, isControlled: false, unitPrice: 13.25, taxRate: 5, stockQuantity: 120, reorderLevel: 25 },
      { id: "22", name: "Glipizide 5mg", genericName: "Glipizide", sku: "MED022", category: "Diabetes", requiresPrescription: true, isControlled: false, unitPrice: 17.00, taxRate: 5, stockQuantity: 80, reorderLevel: 15 },
      { id: "23", name: "Insulin Glargine", genericName: "Insulin", sku: "MED023", category: "Diabetes", requiresPrescription: true, isControlled: false, unitPrice: 45.00, taxRate: 5, stockQuantity: 35, reorderLevel: 8 },
      { id: "24", name: "Glyburide 2.5mg", genericName: "Glyburide", sku: "MED024", category: "Diabetes", requiresPrescription: true, isControlled: false, unitPrice: 14.75, taxRate: 5, stockQuantity: 90, reorderLevel: 15 },
      { id: "25", name: "Sitagliptin 100mg", genericName: "Sitagliptin", sku: "MED025", category: "Diabetes", requiresPrescription: true, isControlled: false, unitPrice: 38.50, taxRate: 5, stockQuantity: 55, reorderLevel: 10 },
      
      // Respiratory (5 products)
      { id: "26", name: "Albuterol Inhaler", genericName: "Albuterol", sku: "MED026", category: "Respiratory", requiresPrescription: true, isControlled: false, unitPrice: 32.00, taxRate: 5, stockQuantity: 60, reorderLevel: 12 },
      { id: "27", name: "Montelukast 10mg", genericName: "Montelukast", sku: "MED027", category: "Respiratory", requiresPrescription: true, isControlled: false, unitPrice: 24.50, taxRate: 5, stockQuantity: 75, reorderLevel: 15 },
      { id: "28", name: "Cetirizine 10mg", genericName: "Cetirizine", sku: "MED028", category: "Respiratory", requiresPrescription: false, isControlled: false, unitPrice: 7.25, taxRate: 5, stockQuantity: 150, reorderLevel: 30 },
      { id: "29", name: "Loratadine 10mg", genericName: "Loratadine", sku: "MED029", category: "Respiratory", requiresPrescription: false, isControlled: false, unitPrice: 6.75, taxRate: 5, stockQuantity: 165, reorderLevel: 35 },
      { id: "30", name: "Fluticasone Nasal", genericName: "Fluticasone", sku: "MED030", category: "Respiratory", requiresPrescription: true, isControlled: false, unitPrice: 28.00, taxRate: 5, stockQuantity: 50, reorderLevel: 10 },
      
      // Vitamins & Supplements (5 products)
      { id: "31", name: "Vitamin D3 1000IU", genericName: "Cholecalciferol", sku: "MED031", category: "Vitamins", requiresPrescription: false, isControlled: false, unitPrice: 9.99, taxRate: 5, stockQuantity: 200, reorderLevel: 40 },
      { id: "32", name: "Multivitamin", genericName: "Multivitamin", sku: "MED032", category: "Vitamins", requiresPrescription: false, isControlled: false, unitPrice: 12.50, taxRate: 5, stockQuantity: 180, reorderLevel: 35 },
      { id: "33", name: "Vitamin C 500mg", genericName: "Ascorbic Acid", sku: "MED033", category: "Vitamins", requiresPrescription: false, isControlled: false, unitPrice: 8.25, taxRate: 5, stockQuantity: 220, reorderLevel: 45 },
      { id: "34", name: "Calcium 600mg", genericName: "Calcium Carbonate", sku: "MED034", category: "Vitamins", requiresPrescription: false, isControlled: false, unitPrice: 11.00, taxRate: 5, stockQuantity: 140, reorderLevel: 30 },
      { id: "35", name: "Omega-3 Fish Oil", genericName: "EPA/DHA", sku: "MED035", category: "Vitamins", requiresPrescription: false, isControlled: false, unitPrice: 15.75, taxRate: 5, stockQuantity: 95, reorderLevel: 20 },
      
      // Dermatology (5 products)
      { id: "36", name: "Hydrocortisone Cream 1%", genericName: "Hydrocortisone", sku: "MED036", category: "Dermatology", requiresPrescription: false, isControlled: false, unitPrice: 7.50, taxRate: 5, stockQuantity: 130, reorderLevel: 25 },
      { id: "37", name: "Clotrimazole Cream", genericName: "Clotrimazole", sku: "MED037", category: "Dermatology", requiresPrescription: false, isControlled: false, unitPrice: 8.99, taxRate: 5, stockQuantity: 110, reorderLevel: 20 },
      { id: "38", name: "Mupirocin Ointment", genericName: "Mupirocin", sku: "MED038", category: "Dermatology", requiresPrescription: true, isControlled: false, unitPrice: 16.50, taxRate: 5, stockQuantity: 65, reorderLevel: 12 },
      { id: "39", name: "Betamethasone Cream", genericName: "Betamethasone", sku: "MED039", category: "Dermatology", requiresPrescription: true, isControlled: false, unitPrice: 19.25, taxRate: 5, stockQuantity: 55, reorderLevel: 10 },
      { id: "40", name: "Benzoyl Peroxide Gel", genericName: "Benzoyl Peroxide", sku: "MED040", category: "Dermatology", requiresPrescription: false, isControlled: false, unitPrice: 12.75, taxRate: 5, stockQuantity: 85, reorderLevel: 15 },
      
      // Mental Health (5 products)
      { id: "41", name: "Sertraline 50mg", genericName: "Sertraline", sku: "MED041", category: "Mental Health", requiresPrescription: true, isControlled: false, unitPrice: 22.50, taxRate: 5, stockQuantity: 70, reorderLevel: 15 },
      { id: "42", name: "Fluoxetine 20mg", genericName: "Fluoxetine", sku: "MED042", category: "Mental Health", requiresPrescription: true, isControlled: false, unitPrice: 20.00, taxRate: 5, stockQuantity: 75, reorderLevel: 15 },
      { id: "43", name: "Alprazolam 0.5mg", genericName: "Alprazolam", sku: "MED043", category: "Mental Health", requiresPrescription: true, isControlled: true, unitPrice: 18.75, taxRate: 5, stockQuantity: 45, reorderLevel: 10 },
      { id: "44", name: "Zolpidem 10mg", genericName: "Zolpidem", sku: "MED044", category: "Mental Health", requiresPrescription: true, isControlled: true, unitPrice: 25.00, taxRate: 5, stockQuantity: 40, reorderLevel: 8 },
      { id: "45", name: "Escitalopram 10mg", genericName: "Escitalopram", sku: "MED045", category: "Mental Health", requiresPrescription: true, isControlled: false, unitPrice: 24.50, taxRate: 5, stockQuantity: 65, reorderLevel: 12 },
      
      // Cold & Flu (5 products)
      { id: "46", name: "Diphenhydramine 25mg", genericName: "Diphenhydramine", sku: "MED046", category: "Cold & Flu", requiresPrescription: false, isControlled: false, unitPrice: 6.25, taxRate: 5, stockQuantity: 175, reorderLevel: 35 },
      { id: "47", name: "Pseudoephedrine 30mg", genericName: "Pseudoephedrine", sku: "MED047", category: "Cold & Flu", requiresPrescription: false, isControlled: false, unitPrice: 7.50, taxRate: 5, stockQuantity: 120, reorderLevel: 25 },
      { id: "48", name: "Guaifenesin 400mg", genericName: "Guaifenesin", sku: "MED048", category: "Cold & Flu", requiresPrescription: false, isControlled: false, unitPrice: 8.75, taxRate: 5, stockQuantity: 145, reorderLevel: 30 },
      { id: "49", name: "Dextromethorphan 15mg", genericName: "Dextromethorphan", sku: "MED049", category: "Cold & Flu", requiresPrescription: false, isControlled: false, unitPrice: 9.25, taxRate: 5, stockQuantity: 130, reorderLevel: 28 },
      { id: "50", name: "Zinc Lozenges", genericName: "Zinc", sku: "MED050", category: "Cold & Flu", requiresPrescription: false, isControlled: false, unitPrice: 5.99, taxRate: 5, stockQuantity: 190, reorderLevel: 40 }
    ]);
  }, []);

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];
  
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.genericName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = async () => {
    if (!hasPermission("process_sale")) {
      alert("You don't have permission to process sales");
      return;
    }
    if (items.length === 0) {
      alert("Cart is empty");
      return;
    }
    
    // Mock checkout - replace with API call
    const confirmed = confirm(`Complete sale for ${total.toFixed(2)}?`);
    if (confirmed) {
      alert("Sale completed successfully!");
      clearCart();
    }
  };

  const [imagePreview, setImagePreview] = useState<{ url: string; name: string } | null>(null);

  const handleImagePreview = (product: Product) => {
    const imageUrl = product.imageUrl || '/assets/images/default-product.jpg';
    setImagePreview({ url: imageUrl, name: product.name });
  };

  return (
    <div className="pos-view">
      {/* Cart on the LEFT */}
      <div className="pos-cart">
        <div className="cart-customer-section">
          <select className="input customer-select">
            <option>Walk in customer</option>
            <option>Regular Customer</option>
          </select>
          <input
            type="text"
            className="input barcode-input"
            placeholder="Scan barcode or type the number then hit enter"
          />
        </div>

        <div className="cart-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>×</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="cart-empty">No items in cart</td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="cart-item-name">{item.product.name}</div>
                      <div className="cart-item-price">${item.product.unitPrice.toFixed(2)} each</div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input input-sm qty-input-table"
                        value={item.quantity}
                        min="1"
                        max={item.product.stockQuantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                      />
                    </td>
                    <td className="cart-price-col">${item.subtotal.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn-remove-small"
                        onClick={() => removeItem(item.product.id)}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="cart-footer">
          <div className="cart-totals-row">
            <div className="total-items">
              <span>Total Item(s):</span>
              <strong>{items.length}</strong>
            </div>
            <div className="discount-field">
              <label>Discount:</label>
              <input type="number" className="input input-sm" placeholder="amount" />
            </div>
            <div className="price-display">
              <span>Price:</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
          </div>
          <div className="gross-price">
            <span>Gross Price (inc {items[0]?.product.taxRate || 5}% Tax):</span>
            <h3>${total.toFixed(2)}</h3>
          </div>
        </div>

        <div className="cart-actions">
          <button className="btn-action btn-print">
            <span>🖨</span> Print
          </button>
          <button className="btn-action btn-cancel" onClick={clearCart}>
            <span>✖</span> Cancel
          </button>
          <button className="btn-action btn-hold">
            <span>⏸</span> Hold
          </button>
          <button
            className="btn-action btn-pay"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            <span>💳</span> Pay
          </button>
        </div>

        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-item">
            <span className="status-label">System:</span>
            <span className="status-value">CodePharma POS</span>
          </div>
          <div className="status-item">
            <span className="status-label">User:</span>
            <span className="status-value">{user?.username || 'Guest'}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Login:</span>
            <span className="status-value">{loginTime.toLocaleTimeString()}</span>
          </div>
          <div className="status-copyright">
            © CodePharma | Designed by C-o-d-e-Man
          </div>
        </div>
      </div>

      {/* Products on the RIGHT */}
      <div className="pos-products">
        <div className="product-search">
          <input
            type="text"
            className="input search-input"
            placeholder="Search product by name or sku"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "Select" : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card" onClick={() => addItem(product, 1)}>
              <div className="product-image-preview">
                <img 
                  src={product.imageUrl || '/assets/images/default-product.jpg'} 
                  alt={product.name}
                  className="product-thumbnail"
                />
                <button 
                  className="btn-view-image"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImagePreview(product);
                  }}
                  title="View product image"
                >
                  🔍
                </button>
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                {product.genericName && <p className="text-muted">{product.genericName}</p>}
                <div className="product-stock-info">
                  <span className="stock-badge">STOCK {product.stockQuantity}</span>
                  {product.requiresPrescription && <span className="badge badge-warning">RX</span>}
                </div>
                <div className="product-price-large">${product.unitPrice.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {imagePreview && (
        <div className="modal-overlay" onClick={() => setImagePreview(null)}>
          <div className="image-preview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setImagePreview(null)}>×</button>
            <h3>{imagePreview.name}</h3>
            <img src={imagePreview.url} alt={imagePreview.name} className="preview-image-large" />
          </div>
        </div>
      )}
    </div>
  );
}
