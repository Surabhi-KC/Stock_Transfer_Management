import { useEffect, useState } from "react";
import { useApi } from "../services/useApi";



export default function AddStockForm({ onAdded }) {
  const api = useApi();
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseId, setWarehouseId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state matching warehouse form pattern
  const [errors, setErrors] = useState({
    warehouseId: null,
    productName: null,
    quantity: null,
    submit: null
  });

  useEffect(() => {
    api.getWarehouses().then(setWarehouses);
  }, []);

  // Clear specific error when field is modified
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      warehouseId: null,
      productName: null,
      quantity: null,
      submit: null
    });
    
    // Validation
    const newErrors = {};
    
    if (!warehouseId) {
      newErrors.warehouseId = 'Please select a warehouse';
    }
    
    if (!productName.trim()) {
      newErrors.productName = 'Product name is required';
    } else if (productName.trim().length < 2) {
      newErrors.productName = 'Product name must be at least 2 characters';
    }
    
    if (!quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (parseInt(quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    } else if (!/^\d+$/.test(quantity)) {
      newErrors.quantity = 'Quantity must be a whole number';
    }
    
    // If validation errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit the form
    setIsLoading(true);
    
    try {
      await api.addStock({
        warehouseId: Number(warehouseId),
        productName: productName.trim(),
        quantity: Number(quantity),
      });

      // Clear form on success
      setProductName("");
      setQuantity("");
      setWarehouseId("");
      
      // Notify parent component
      onAdded();
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to add stock. Please try again.'
      }));
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Add Stock</h2>
            <p className="text-sm text-slate-600">Add new inventory to a warehouse</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Warehouse Selection with Error Handling */}
          <div>
            <label htmlFor="warehouse-select" className="block text-sm font-medium text-slate-700 mb-1.5">
              Warehouse *
            </label>
            <select
              id="warehouse-select"
              className={`input ${errors.warehouseId ? 'input-error' : ''}`}
              value={warehouseId}
              onChange={(e) => {
                setWarehouseId(e.target.value);
                clearError('warehouseId');
              }}
              disabled={isLoading}
            >
              <option value="">Select a warehouse</option>
              {warehouses.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
            {errors.warehouseId && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.warehouseId}
              </p>
            )}
          </div>

          {/* Product Name with Error Handling */}
          <div>
            <label htmlFor="product-name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Product Name *
            </label>
            <input
              id="product-name"
              type="text"
              className={`input ${errors.productName ? 'input-error' : ''}`}
              placeholder="e.g., Wireless Headphones"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                clearError('productName');
              }}
              disabled={isLoading}
            />
            {errors.productName && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.productName}
              </p>
            )}
          </div>

          {/* Quantity with Error Handling */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1.5">
              Quantity *
            </label>
            <input
              id="quantity"
              type="number"
              className={`input ${errors.quantity ? 'input-error' : ''}`}
              placeholder="e.g., 50"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                clearError('quantity');
              }}
              disabled={isLoading}
              step="1"
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

          {/* Submit Error Display */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-blue w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Stock
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}