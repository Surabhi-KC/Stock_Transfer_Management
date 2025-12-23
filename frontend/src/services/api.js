const BASE_URL = "http://localhost:5000";

export async function getWarehouses() {
  const res = await fetch(`${BASE_URL}/warehouses`);
  return res.json();
}

export async function createWarehouse(data) {
  const res = await fetch(`${BASE_URL}/warehouses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getStocks() {
  const res = await fetch(`${BASE_URL}/stocks`);
  return res.json();
}

export async function getTransfers() {
  const res = await fetch(`${BASE_URL}/transfers`);
  return res.json();
}

export async function createTransfer(data) {
  const res = await fetch(`${BASE_URL}/transfers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function completeTransfer(id) {
  const res = await fetch(`${BASE_URL}/transfers/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "COMPLETED" }),
  });
  return res.json();
}

export async function addStock(data) {
  const res = await fetch(`${BASE_URL}/stocks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getStocksByWarehouse(warehouseId) {
  const res = await fetch(`http://localhost:5000/stocks?warehouseId=${warehouseId}`);
  return res.json();
}
