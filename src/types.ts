export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  
  invoiceNumber: string;
  date: string;
  dueDate: string;
  
  isPhotography: boolean;
  shootDate: string;
  shootLocation: string;
  
  items: InvoiceItem[];
  taxRate: number;
  notes: string;
  terms: string;
}

export const INITIAL_INVOICE_DATA: InvoiceData = {
  businessName: '',
  businessAddress: '',
  businessEmail: '',
  businessPhone: '',
  
  clientName: '',
  clientAddress: '',
  clientEmail: '',
  
  invoiceNumber: 'INV-0001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
  
  isPhotography: false,
  shootDate: '',
  shootLocation: '',
  
  items: [
    { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 }
  ],
  taxRate: 0,
  notes: 'Thank you for your business!',
  terms: 'Please pay within 14 days of receiving this invoice.',
};
