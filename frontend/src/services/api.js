const BASE_URL = "http://localhost:5000";

export function createApi(getToken) {
  async function authFetch(url, options = {}) {
    const token = await getToken();

    if (!token) {
      throw new Error("Not authenticated");
    }

    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  return {
    /* Warehouses */
    async getWarehouses() {
      const res = await authFetch(`${BASE_URL}/warehouses`);
      return res.json();
    },

    async createWarehouse(data) {
      const res = await authFetch(`${BASE_URL}/warehouses`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },

    /* Stocks */
    async getStocks() {
      const res = await authFetch(`${BASE_URL}/stocks`);
      return res.json();
    },

    async addStock(data) {
      const res = await authFetch(`${BASE_URL}/stocks`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },

    async getStocksByWarehouse(warehouseId) {
      const res = await authFetch(
        `${BASE_URL}/stocks?warehouseId=${warehouseId}`
      );
      return res.json();
    },

    /* Transfers */
    async getTransfers() {
      const res = await authFetch(`${BASE_URL}/transfers`);
      return res.json();
    },

    async createTransfer(data) {
      const res = await authFetch(`${BASE_URL}/transfers`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },

    async completeTransfer(id) {
      const res = await authFetch(
        `${BASE_URL}/transfers/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: "COMPLETED" }),
        }
      );
      return res.json();
    },
    async cancelTransfer(id) {
        return authFetch(`${BASE_URL}/transfers/${id}/cancel`, {
        method: "PATCH",
      });
    }
  };
}
