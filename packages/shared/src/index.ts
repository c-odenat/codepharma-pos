import { currencies } from "./currencies";
export type { Currency } from "./currencies";

export type DeploymentMode = "standalone" | "terminal" | "server";

export type Permission =
  | "manage_users"
  | "manage_roles"
  | "manage_inventory"
  | "process_sale"
  | "process_refund"
  | "manage_prescriptions"
  | "view_reports"
  | "manage_suppliers"
  | "manage_customers"
  | "manage_pricing"
  | "manage_taxes"
  | "configure_terminal"
  | "audit_logs";

export type RoleKey = "admin" | "pharmacist" | "cashier" | "auditor";

export type Role = {
  key: RoleKey;
  label: string;
  permissions: Permission[];
};

export const roleCatalog: Role[] = [
  {
    key: "admin",
    label: "Administrator",
    permissions: [
      "manage_users",
      "manage_roles",
      "manage_inventory",
      "process_sale",
      "process_refund",
      "manage_prescriptions",
      "view_reports",
      "manage_suppliers",
      "manage_customers",
      "manage_pricing",
      "manage_taxes",
      "configure_terminal",
      "audit_logs"
    ]
  },
  {
    key: "pharmacist",
    label: "Pharmacist",
    permissions: [
      "process_sale",
      "process_refund",
      "manage_prescriptions",
      "view_reports",
      "manage_inventory",
      "manage_customers"
    ]
  },
  {
    key: "cashier",
    label: "Cashier",
    permissions: [
      "process_sale",
      "process_refund",
      "manage_customers"
    ]
  },
  {
    key: "auditor",
    label: "Auditor",
    permissions: ["view_reports", "audit_logs"]
  }
];

export const currencyCatalog = currencies;

// Domain Models
export type Product = {
  id: string;
  name: string;
  genericName?: string;
  sku: string;
  barcode?: string;
  category: string;
  manufacturer?: string;
  requiresPrescription: boolean;
  isControlled: boolean;
  unitPrice: number;
  taxRate: number;
  stockQuantity: number;
  reorderLevel: number;
  batchNumber?: string;
  expiryDate?: string;
  rackLocation?: string;
  imageUrl?: string; // Product image URL
};

export type CartItem = {
  product: Product;
  quantity: number;
  discount: number;
  subtotal: number;
};

export type Sale = {
  id: string;
  invoiceNumber: string;
  timestamp: string;
  cashierId: string;
  customerId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: "cash" | "card" | "insurance" | "credit";
  prescriptionId?: string;
  status: "completed" | "refunded" | "partial_refund";
};

export type Prescription = {
  id: string;
  patientName: string;
  patientId?: string;
  doctorName: string;
  doctorLicense: string;
  date: string;
  medications: Array<{
    productId: string;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
  }>;
  status: "pending" | "dispensed" | "cancelled";
  notes?: string;
};

export type Customer = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  dateOfBirth?: string;
  allergies?: string[];
  insuranceInfo?: string;
};
