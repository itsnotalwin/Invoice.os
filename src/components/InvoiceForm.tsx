import React from 'react';
import { InvoiceData } from '../types';
import { Camera, Briefcase, Plus, Trash2 } from 'lucide-react';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export default function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    onChange({
      ...data,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [...data.items, { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 }],
    });
  };

  const removeItem = (id: string) => {
    if (data.items.length === 1) return; // Keep at least one item
    onChange({
      ...data,
      items: data.items.filter(item => item.id !== id),
    });
  };

  return (
    <div className="flex flex-col">
      {/* Template Type Selector - Fixed at top */}
      <div className="p-4 border-b border-sand dark:border-surface-2 bg-oatmeal/50 dark:bg-surface-1/50 transition-colors">
        <label className="text-sm font-medium text-espresso dark:text-alabaster mb-2 block">Invoice Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onChange({ ...data, isPhotography: false })}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              !data.isPhotography
                ? 'border-espresso dark:border-alabaster bg-espresso dark:bg-alabaster text-oatmeal dark:text-cocoa shadow-sm'
                : 'border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso/70 dark:text-alabaster/70 hover:bg-oatmeal dark:hover:bg-surface-1'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Standard
          </button>
          <button
            onClick={() => onChange({ ...data, isPhotography: true })}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              data.isPhotography
                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 shadow-sm'
                : 'border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso/70 dark:text-alabaster/70 hover:bg-oatmeal dark:hover:bg-surface-1'
            }`}
          >
            <Camera className="w-4 h-4" />
            Photography
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 space-y-8">
        
        {/* Basic Details */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-espresso dark:text-alabaster uppercase tracking-wider">Invoice Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-espresso/70 dark:text-alabaster/70 mb-1">Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                value={data.invoiceNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
              />
            </div>
            <div className="hidden sm:block" />
            <div>
              <label className="block text-xs font-medium text-espresso/70 dark:text-alabaster/70 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={data.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-espresso/70 dark:text-alabaster/70 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={data.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Photography Specific Fields */}
        {data.isPhotography && (
          <section className="space-y-4 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Shoot Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-purple-700 dark:text-purple-400 mb-1">Shoot Date</label>
                <input
                  type="date"
                  name="shootDate"
                  value={data.shootDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-purple-200 dark:border-purple-900/50 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-surface-2 text-espresso dark:text-alabaster transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-purple-700 dark:text-purple-400 mb-1">Shoot Location</label>
                <input
                  type="text"
                  name="shootLocation"
                  value={data.shootLocation}
                  onChange={handleChange}
                  placeholder="e.g. Central Park"
                  className="w-full px-3 py-2 border border-purple-200 dark:border-purple-900/50 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-white dark:bg-surface-2 text-espresso dark:text-alabaster transition-colors"
                />
              </div>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Your Details */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-espresso dark:text-alabaster uppercase tracking-wider">Your Details</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="businessName"
                placeholder="Business Name / Your Name"
                value={data.businessName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
              />
              <input
                type="email"
                name="businessEmail"
                placeholder="Email Address"
                value={data.businessEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
              />
              <input
                type="text"
                name="businessPhone"
                placeholder="Phone Number"
                value={data.businessPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
              />
              <textarea
                name="businessAddress"
                placeholder="Address"
                rows={2}
                value={data.businessAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm resize-none transition-colors"
              />
            </div>
          </section>

          {/* Client Details */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-espresso dark:text-alabaster uppercase tracking-wider">Client Details</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="clientName"
                placeholder="Client Name / Company"
                value={data.clientName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
              />
              <input
                type="email"
                name="clientEmail"
                placeholder="Client Email Address"
                value={data.clientEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
              />
              <textarea
                name="clientAddress"
                placeholder="Client Address"
                rows={2}
                value={data.clientAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm resize-none transition-colors"
              />
            </div>
          </section>
        </div>

        {/* Line Items */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-espresso dark:text-alabaster uppercase tracking-wider">Line Items</h3>
          </div>
          
          <div className="space-y-3">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-medium text-espresso/70 dark:text-alabaster/70 px-2">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-3 text-right">Rate</div>
              <div className="col-span-1"></div>
            </div>

            {/* Items */}
            {data.items.map((item, index) => (
              <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-2 items-start p-4 sm:p-0 border sm:border-0 border-sand dark:border-surface-2 rounded-lg sm:rounded-none">
                <div className="w-full sm:col-span-6">
                  <label className="block sm:hidden text-xs font-medium text-espresso/70 dark:text-alabaster/70 mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    placeholder="Item description"
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm transition-colors"
                  />
                </div>
                <div className="w-full sm:col-span-6 flex gap-3 items-center">
                  <div className="flex-1 sm:w-full sm:col-span-2">
                    <label className="block sm:hidden text-xs font-medium text-espresso/70 dark:text-alabaster/70 mb-1">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm text-center transition-colors"
                    />
                  </div>
                  <div className="flex-[2] sm:w-full sm:col-span-3 relative">
                    <label className="block sm:hidden text-xs font-medium text-espresso/70 dark:text-alabaster/70 mb-1">Rate</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/50 dark:text-alabaster/50 sm:text-sm">R</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate || ''}
                        onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                        className="w-full pl-6 pr-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm text-right transition-colors"
                      />
                    </div>
                  </div>
                  <div className="pt-5 sm:pt-0 sm:col-span-1 flex justify-center w-8">
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={data.items.length === 1}
                      className="text-espresso/40 dark:text-alabaster/40 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-sand dark:border-surface-2 rounded-md text-sm font-medium text-espresso/70 dark:text-alabaster/70 hover:border-espresso dark:hover:border-alabaster hover:text-espresso dark:hover:text-alabaster transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </section>

        {/* Totals & Notes */}
        <section className="space-y-6">
          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-espresso dark:text-alabaster">Tax Rate (%)</label>
                <input
                  type="number"
                  name="taxRate"
                  min="0"
                  max="100"
                  value={data.taxRate || ''}
                  onChange={handleChange}
                  className="w-24 px-3 py-1.5 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm text-right transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-espresso dark:text-alabaster mb-1">Notes</label>
              <textarea
                name="notes"
                value={data.notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm resize-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-espresso dark:text-alabaster mb-1">Terms & Conditions</label>
              <textarea
                name="terms"
                value={data.terms}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-sand dark:border-surface-2 bg-white dark:bg-surface-2 text-espresso dark:text-alabaster rounded-md shadow-sm focus:ring-espresso dark:focus:ring-alabaster focus:border-espresso dark:focus:border-alabaster sm:text-sm resize-none transition-colors"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
