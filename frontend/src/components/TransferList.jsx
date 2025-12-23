import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function TransferList({ transfers, onComplete, onCancel }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleComplete = async (id) => {
    setLoadingId(id);
    try {
      await onComplete(id);
    } finally {
      setLoadingId(null);
    }
  };

const handleCancel = async (id) => {
  if (!confirm("Are you sure you want to cancel this transfer?")) return;

  try {
    setLoadingId(id);
    await cancelTransfer(id);
    await load();
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to cancel transfer");
  } finally {
    setLoadingId(null);
  }
};



  if (!transfers.length) {
    return (
      <div className="card">
        <div className="empty-state">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No transfers yet</h3>
          <p className="text-slate-600">Create your first transfer to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Transfer Route</th>
            <th>Product</th>
            <th className="text-right">Quantity</th>
            <th>Status</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t, index) => (
            <tr key={t.id} className="animate-slide-up" style={{ animationDelay: `${index * 30}ms` }}>
              <td>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 truncate">
                        {t.fromWarehouse.name}
                      </div>
                      <div className="text-xs text-slate-500">Source</div>
                    </div>
                  </div>
                  
                  <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 truncate">
                        {t.toWarehouse.name}
                      </div>
                      <div className="text-xs text-slate-500">Destination</div>
                    </div>
                  </div>
                </div>
              </td>
              
              <td>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-900">{t.productName}</span>
                </div>
              </td>
              
              <td className="text-right">
                <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-semibold">
                  {t.quantity}
                </span>
              </td>
              
              <td>
                <StatusBadge status={t.status} />
              </td>
              
              <td className="text-right">
                {t.status === "PENDING" && (
                  <div className="flex items-center gap-2">
                    
                    {/* COMPLETE */}
                    <button
                      onClick={() => handleComplete(t.id)}
                      disabled={loadingId === t.id}
                      className="btn-green btn-sm inline-flex items-center gap-2"
                    >
                      {loadingId === t.id ? (
                        <>
                          <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Completing...
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Complete
                        </>
                      )}
                    </button>
                    
                    {/* CANCEL */}
                    <button
                      onClick={() => onCancel(t.id)}
                      disabled={loadingId === t.id}
                      className="btn-red btn-sm inline-flex items-center gap-2"
                    >
                      {loadingId === t.id ? (
                        <>
                          <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Cancel
                        </>
                      )}
                    </button>
                    
                  </div>
                )}

                {t.status === "COMPLETED" && (
                  <span className="text-sm text-slate-500 italic">Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}