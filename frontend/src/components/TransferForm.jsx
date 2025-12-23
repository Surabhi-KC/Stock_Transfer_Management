import { useEffect, useState } from "react";
import { getWarehouses, createTransfer, getStocksByWarehouse } from "../services/api";

export default function TransferForm({ onCreated }) {
  const [warehouses, setWarehouses] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sourceStocks, setSourceStocks] = useState([]);


  useEffect(() => {
    getWarehouses().then(setWarehouses);
  }, []);

  useEffect(() => {
  if (!from) {
    setSourceStocks([]);
    return;
  }

  getStocksByWarehouse(from).then(setSourceStocks);
  }, [from]);


  const validate = () => {
  const newErrors = {};

  if (!from) newErrors.from = "Source warehouse is required";
  if (!to) newErrors.to = "Destination warehouse is required";
  if (from && to && from === to)
    newErrors.to = "Destination must be different from source";

  if (!product.trim()) {
    newErrors.product = "Product name is required";
  } else {
    const stockItem = sourceStocks.find(
      s => s.productName.toLowerCase() === product.trim().toLowerCase()
    );

    if (!stockItem) {
      newErrors.product = "Product not available in source warehouse";
    } else if (!quantity || quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    } else if (quantity > stockItem.quantity) {
      newErrors.quantity = `Only ${stockItem.quantity} available in source warehouse`;
    }
  }

  return newErrors;
};


  const submit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await createTransfer({
        fromWarehouseId: Number(from),
        toWarehouseId: Number(to),
        productName: product.trim(),
        quantity: Number(quantity),
      });

      setProduct("");
      setQuantity("");
      onCreated();
    } catch (error) {
      setErrors({ submit: "Failed to create transfer. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Create Transfer</h2>
            <p className="text-sm text-slate-600">Move stock between warehouses</p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-slate-700 mb-1.5">
                From Warehouse *
              </label>
              <div className="relative">
                <select
                  id="from"
                  className={`input appearance-none ${errors.from ? 'input-error' : ''}`}
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    if (errors.from) setErrors(prev => ({ ...prev, from: null }));
                  }}
                  disabled={isLoading}
                >
                  <option value="">Select source warehouse</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.from && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.from}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="to" className="block text-sm font-medium text-slate-700 mb-1.5">
                To Warehouse *
              </label>
              <div className="relative">
                <select
                  id="to"
                  className={`input appearance-none ${errors.to ? 'input-error' : ''}`}
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    if (errors.to) setErrors(prev => ({ ...prev, to: null }));
                  }}
                  disabled={isLoading}
                >
                  <option value="">Select destination warehouse</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.to && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.to}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="product" className="block text-sm font-medium text-slate-700 mb-1.5">
              Product Name *
            </label>
            <input
              id="product"
              type="text"
              className={`input ${errors.product ? 'input-error' : ''}`}
              placeholder="e.g., Laptop Model X"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value);
                if (errors.product) setErrors(prev => ({ ...prev, product: null }));
              }}
              disabled={isLoading}
            />
            {errors.product && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.product}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1.5">
                Quantity *
              </label>
              <input
                id="quantity"
                type="number"
                className={`input ${errors.quantity ? 'input-error' : ''}`}
                placeholder="0"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (errors.quantity) setErrors(prev => ({ ...prev, quantity: null }));
                }}
                disabled={isLoading}
              />
              {errors.quantity && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.quantity}
                </p>
              )}
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.submit}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-green w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Transfer...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Create Transfer
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}