// frontend/api/dashboard.ts
import api from "./api";

// ===========================
// 🔹 Ringkasan Dashboard
// ===========================
export async function getDashboardSummary() {
  const token = localStorage.getItem("access_token");
  const res = await api.get("/dashboard/summary", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ===========================
// 🔹 Bar & Area Charts
// ===========================
export async function getDistribusiJenisKopi() {
  const token = localStorage.getItem("access_token");
  const res = await api.get("/dashboard/distribusi-jenis-kopi", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getTrenProduksiKopi() {
  const token = localStorage.getItem("access_token");
  const res = await api.get("/dashboard/tren-produksi-kopi", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ===========================
// 🔸 Donut Charts (3 Data)
// ===========================

// Distribusi Metode Budidaya
export async function getDistribusiMetodeBudidaya() {
  const token = localStorage.getItem("access_token");
  const res = await api.get("/dashboard/distribusi-metode-budidaya", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Distribusi Varietas Unggul
export async function getDistribusiVarietasUnggul() {
  const token = localStorage.getItem("access_token");
  const res = await api.get("/dashboard/distribusi-varietas-unggul", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// Distribusi Metode Penjualan
export async function getDistribusiMetodePenjualan() {
  const token = localStorage.getItem("access_token");
  const res = await api.get("/dashboard/distribusi-metode-penjualan", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
