import { useEffect, useState } from "react";
import WarehouseForm from "../components/WarehouseForm";
import WarehouseList from "../components/WarehouseList";
import StockTable from "../components/StockTable";
import AddStockForm from "../components/AddStockForm";
import { useApi } from "../services/useApi";



export default function Dashboard() {
  const api = useApi();
  const [stocks, setStocks] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {

      const [stocksData, warehousesData] = await Promise.all([
        api.getStocks(),
        api.getWarehouses()
      ]);
      setStocks(stocksData);
      setWarehouses(warehousesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
  
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Calculate stats
  const totalWarehouses = warehouses.length;
  const totalProducts = new Set(stocks.map(s => s.productName)).size;
  const totalStock = stocks.reduce((sum, s) => sum + s.quantity, 0);
  const lowStockItems = stocks.filter(s => s.quantity < 20).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Stock Transfer Management
        </h1>
        <p className="text-slate-600">
          Manage your warehouses and track inventory across locations
        </p>
      </div>

      {/* Stats Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Warehouses</p>
                  <p className="text-3xl font-bold text-slate-900">{totalWarehouses}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Products</p>
                  <p className="text-3xl font-bold text-slate-900">{totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Stock</p>
                  <p className="text-3xl font-bold text-slate-900">{totalStock}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Low Stock Items</p>
                  <p className="text-3xl font-bold text-slate-900">{lowStockItems}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-600">Loading dashboard data...</p>
          </div>
        </div>
      )}

      {/* Content */}
      {!isLoading && (
        <div className="space-y-8">
          {/* Warehouse Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-1">Warehouse Management</h2>
              <p className="text-sm text-slate-600">Add and manage your warehouse locations</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WarehouseForm onCreated={loadData} />
              <WarehouseList warehouses={warehouses} />
            </div>
          </div>

          {/* Stock Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-1">
                Current Stock Levels
              </h2>
              <p className="text-sm text-slate-600">
                View and manage inventory across all warehouses
              </p>
            </div>
                
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-1">
                <AddStockForm onAdded={loadData} />
              </div>
                
              <div className="lg:col-span-2">
                <StockTable stocks={stocks} />
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}