import React from 'react';
import { InvoiceData } from '../types';
import { Camera, MapPin, Calendar } from 'lucide-react';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const tax = subtotal * (data.taxRate / 100);
  const total = subtotal + tax;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Add timezone offset to prevent day shifting
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-surface-1 rounded-xl shadow-lg border border-sand dark:border-surface-2 overflow-hidden print:shadow-none print:border-none print:rounded-none transition-colors">
      <div className="p-6 sm:p-14 min-h-[1056px] print:min-h-0 text-espresso dark:text-alabaster print:text-black bg-oatmeal/30 dark:bg-cocoa/30 print:bg-white transition-colors">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight text-espresso dark:text-alabaster print:text-black mb-2">INVOICE</h1>
            <p className="text-espresso/60 dark:text-alabaster/60 print:text-gray-500 font-medium">#{data.invoiceNumber || 'INV-0001'}</p>
          </div>
          
          <div className="text-left sm:text-right space-y-1 text-sm">
            <h2 className="text-lg font-semibold text-espresso dark:text-alabaster print:text-black">{data.businessName || 'Your Business Name'}</h2>
            <p className="text-espresso/80 dark:text-alabaster/80 print:text-gray-600 whitespace-pre-line leading-relaxed">
              {data.businessAddress || '123 Business St.\nCity, State 12345'}
            </p>
            {data.businessEmail && <p className="text-espresso/80 dark:text-alabaster/80 print:text-gray-600">{data.businessEmail}</p>}
            {data.businessPhone && <p className="text-espresso/80 dark:text-alabaster/80 print:text-gray-600">{data.businessPhone}</p>}
          </div>
        </div>

        {/* Dates and Client Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="bg-white dark:bg-surface-2 print:bg-gray-50 rounded-lg p-4 border border-sand dark:border-surface-2 print:border-gray-100 transition-colors">
              <h3 className="text-xs font-bold text-espresso/50 dark:text-alabaster/50 print:text-gray-400 uppercase tracking-wider mb-2">Bill To</h3>
              <p className="font-semibold text-espresso dark:text-alabaster print:text-black text-lg">{data.clientName || 'Client Name'}</p>
              {(data.clientAddress || data.clientEmail) && (
                <div className="mt-2 text-sm text-espresso/80 dark:text-alabaster/80 print:text-gray-600 space-y-1 whitespace-pre-line leading-relaxed">
                  {data.clientAddress && <p>{data.clientAddress}</p>}
                  {data.clientEmail && <p>{data.clientEmail}</p>}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4 sm:ml-auto">
            <div className="flex justify-between sm:justify-end sm:gap-12 text-sm">
              <span className="font-medium text-espresso/70 dark:text-alabaster/70 print:text-gray-500">Date</span>
              <span className="font-semibold text-espresso dark:text-alabaster print:text-black">{formatDate(data.date) || '-'}</span>
            </div>
            <div className="flex justify-between sm:justify-end sm:gap-12 text-sm">
              <span className="font-medium text-espresso/70 dark:text-alabaster/70 print:text-gray-500">Due Date</span>
              <span className="font-semibold text-espresso dark:text-alabaster print:text-black">{formatDate(data.dueDate) || '-'}</span>
            </div>
          </div>
        </div>

        {/* Photography Details - Rendered conditionally */}
        {data.isPhotography && (data.shootDate || data.shootLocation) && (
          <div className="mb-10 bg-purple-50/50 dark:bg-purple-900/10 print:bg-purple-50/50 rounded-lg p-5 border border-purple-100/50 dark:border-purple-900/30 print:border-purple-100/50 transition-colors">
            <h3 className="text-xs font-bold text-purple-900/50 dark:text-purple-300/60 print:text-purple-900/50 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5" />
              Shoot Details
            </h3>
            <div className="flex flex-wrap gap-8">
              {data.shootDate && (
                <div className="flex items-center gap-2.5 text-sm text-purple-900 dark:text-purple-300 print:text-purple-900">
                  <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 print:bg-purple-100 rounded-md">
                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 print:text-purple-600" />
                  </div>
                  <span className="font-medium">{formatDate(data.shootDate)}</span>
                </div>
              )}
              {data.shootLocation && (
                <div className="flex items-center gap-2.5 text-sm text-purple-900 dark:text-purple-300 print:text-purple-900">
                  <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 print:bg-purple-100 rounded-md">
                    <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 print:text-purple-600" />
                  </div>
                  <span className="font-medium">{data.shootLocation}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Line Items Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b-2 border-espresso dark:border-alabaster print:border-black text-sm transition-colors">
                <th className="pb-3 font-bold text-espresso dark:text-alabaster print:text-black w-1/2">Description</th>
                <th className="pb-3 font-bold text-espresso dark:text-alabaster print:text-black text-center w-1/6">Qty</th>
                <th className="pb-3 font-bold text-espresso dark:text-alabaster print:text-black text-right w-1/6">Rate</th>
                <th className="pb-3 font-bold text-espresso dark:text-alabaster print:text-black text-right w-1/6">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.items.map((item, index) => (
                <tr key={item.id} className="border-b border-sand dark:border-surface-2 print:border-gray-200 last:border-b-0 print:break-inside-avoid transition-colors">
                  <td className="py-4 text-espresso/90 dark:text-alabaster/90 print:text-gray-800 break-words pr-4">
                    {item.description || <span className="text-espresso/30 dark:text-alabaster/30 print:text-gray-300 italic">Item description...</span>}
                  </td>
                  <td className="py-4 text-espresso/70 dark:text-alabaster/70 print:text-gray-600 text-center">{item.quantity}</td>
                  <td className="py-4 text-espresso/70 dark:text-alabaster/70 print:text-gray-600 text-right">{formatCurrency(item.rate)}</td>
                  <td className="py-4 text-espresso dark:text-alabaster print:text-black font-medium text-right">
                    {formatCurrency(item.quantity * item.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-8 mb-12">
          <div className="w-full sm:w-1/2 space-y-4 order-2 sm:order-1">
            {data.notes && (
              <div>
                <h3 className="text-xs font-bold text-espresso/50 dark:text-alabaster/50 print:text-gray-400 uppercase tracking-wider mb-1">Notes</h3>
                <p className="text-sm text-espresso/80 dark:text-alabaster/80 print:text-gray-600 whitespace-pre-line leading-relaxed">{data.notes}</p>
              </div>
            )}
            {data.terms && (
              <div>
                <h3 className="text-xs font-bold text-espresso/50 dark:text-alabaster/50 print:text-gray-400 uppercase tracking-wider mb-1">Terms</h3>
                <p className="text-sm text-espresso/80 dark:text-alabaster/80 print:text-gray-600 whitespace-pre-line leading-relaxed">{data.terms}</p>
              </div>
            )}
          </div>
          
          <div className="w-full sm:w-80 space-y-3 order-1 sm:order-2 bg-white dark:bg-surface-2 print:bg-gray-50 p-6 rounded-lg border border-sand dark:border-surface-2 print:border-gray-100 transition-colors">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-espresso/80 dark:text-alabaster/80 print:text-gray-600">Subtotal</span>
              <span className="font-medium text-espresso dark:text-alabaster print:text-black">{formatCurrency(subtotal)}</span>
            </div>
            {data.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="font-medium text-espresso/80 dark:text-alabaster/80 print:text-gray-600">Tax ({data.taxRate}%)</span>
                <span className="font-medium text-espresso dark:text-alabaster print:text-black">{formatCurrency(tax)}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t border-sand dark:border-surface-2 print:border-gray-200 mt-3 transition-colors">
              <span className="font-bold text-espresso dark:text-alabaster print:text-black">Total</span>
              <span className="text-xl font-bold text-espresso dark:text-alabaster print:text-blue-600">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
