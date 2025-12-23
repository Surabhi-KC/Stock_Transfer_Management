import StatusBadge from "./StatusBadge";

export default function HistoryList({ transfers }) {
  if (!transfers.length) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No transfer history</h3>
          <p className="text-slate-600">Transfer history will appear here once you create transfers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transfers.map((t, index) => (
        <div
          key={t.id}
          className="card-hover animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="card-body">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">
                    Transfer #{t.id}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="font-medium">{t.fromWarehouse.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="font-medium">{t.toWarehouse.name}</span>
                  </div>
                </div>
              </div>
              
              <StatusBadge status={t.status} />
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-100">
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  Product
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-900">{t.productName}</span>
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  Quantity
                </div>
                <span className="inline-flex items-center justify-center px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold">
                  {t.quantity} units
                </span>
              </div>
            </div>

            {/* History Timeline */}
            <div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Transfer History
              </div>
              
              <div className="space-y-3">
                {[...t.history]
                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                .map((h, idx) => (
                  <div key={h.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${idx === t.history.length - 1 ? 'bg-blue-600' : 'bg-slate-200'}
                      `}>
                        {idx === t.history.length - 1 ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        )}
                      </div>
                      {idx < t.history.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-200 my-1"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-medium text-slate-900">
                          {h.status}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(h.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600">
                        {h.status === 'PENDING' && 'Transfer request created and awaiting processing'}
                        {h.status === 'COMPLETED' && 'Transfer successfully completed'}
                        {h.status === 'CANCELLED' && 'Transfer was cancelled'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}