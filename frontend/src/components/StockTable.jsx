export default function StockTable({ stocks }) {
  if (!stocks.length) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No stock available</h3>
          <p className="text-slate-600">Stock items will appear here once you add them</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="w-16">#</th>
            <th>Warehouse</th>
            <th>Product</th>
            <th className="text-right">Quantity</th>
            <th className="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s, index) => (
            <tr key={s.id} className="animate-slide-up" style={{ animationDelay: `${index * 30}ms` }}>
              <td className="text-slate-500 font-medium">
                {index + 1}
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-900">{s.warehouse.name}</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="text-slate-900">{s.productName}</span>
                </div>
              </td>
              <td className="text-right">
                <span className={`
                  inline-flex items-center justify-center min-w-[60px] px-3 py-1 rounded-full text-sm font-semibold
                  ${s.quantity > 50 ? 'bg-green-100 text-green-800' : 
                    s.quantity > 20 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}
                `}>
                  {s.quantity}
                </span>
              </td>
              <td className="text-right">
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
                  <span className={`
                    w-2 h-2 rounded-full
                    ${s.quantity > 20 ? 'bg-green-500' : 'bg-red-500'}
                  `}></span>
                  {s.quantity > 20 ? 'In Stock' : 'Low Stock'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}