/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { InvoiceData, INITIAL_INVOICE_DATA } from './types';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { Printer, Download, Command } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<InvoiceData>(INITIAL_INVOICE_DATA);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-oatmeal dark:bg-cocoa text-espresso dark:text-alabaster font-sans transition-colors duration-200">
      {/* Header - Hidden on Print */}
      <header className="bg-oatmeal dark:bg-cocoa border-b border-sand dark:border-surface-2 sticky top-0 z-10 print:hidden transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-default group">
            <div className="flex items-center justify-center w-8 h-8 bg-espresso dark:bg-alabaster rounded shadow-sm relative overflow-hidden transition-transform group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Command className="w-4 h-4 text-oatmeal dark:text-cocoa" strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold tracking-tighter flex items-center">
              invoice<span className="text-espresso/40 dark:text-alabaster/40 font-medium">.os</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-oatmeal dark:text-cocoa bg-espresso dark:bg-alabaster rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-espresso dark:focus:ring-alabaster transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Save as PDF / </span>Print
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:m-0 print:max-w-none">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Form - Hidden on Print */}
          <div className="w-full lg:w-1/2 xl:w-5/12 print:hidden bg-white dark:bg-surface-1 rounded-xl shadow-sm border border-sand dark:border-surface-2 overflow-hidden transition-colors duration-200">
            <InvoiceForm data={data} onChange={setData} />
          </div>

          {/* Right Column: Preview - Full width on Print */}
          <div className="w-full lg:w-1/2 xl:w-7/12 sticky top-24 print:static print:w-full">
            <InvoicePreview data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}

