// components/HomePage.tsx
import { useEffect, useState } from "react";
import {
  MapPin,
  Users,
  Sprout,
  Package,
  DollarSign,
  TrendingUp,
  Coffee,
} from "lucide-react";
import { Card } from "./ui/card";
import {
  getDashboardSummary,
  getDistribusiJenisKopi,
  getTrenProduksiKopi,
  getDistribusiMetodeBudidaya,
  getDistribusiMetodePenjualan,
  getDistribusiVarietasUnggul,
} from "../api/dashboard";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function HomePage() {
  const [summary, setSummary] = useState<any>(null);
  const [jenisKopi, setJenisKopi] = useState<any[]>([]);
  const [trenProduksi, setTrenProduksi] = useState<any[]>([]);
  const [budidayaData, setBudidayaData] = useState<any[]>([]);
  const [penjualanData, setPenjualanData] = useState<any[]>([]);
  const [varietasData, setVarietasData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          summaryData,
          jenisData,
          trenData,
          budidaya,
          penjualan,
          varietas,
        ] = await Promise.all([
          getDashboardSummary(),
          getDistribusiJenisKopi(),
          getTrenProduksiKopi(),
          getDistribusiMetodeBudidaya(),
          getDistribusiMetodePenjualan(),
          getDistribusiVarietasUnggul(),
        ]);

        // === Ringkasan ===
        setSummary(summaryData);

        // === Bar Chart: Jenis Kopi ===
        setJenisKopi(
          jenisData.map((i: any) => ({
            name: i.jenis,
            value: i.jumlah,
          }))
        );

        // === Area Chart: Tren Produksi ===
        setTrenProduksi(
          trenData.map((i: any) => ({
            month: i.bulan,
            value: i.total_produksi,
          }))
        );

        // === Donut Chart: 3 Data ===
        setBudidayaData(
          budidaya.map((d: any, idx: number) => ({
            name: d.kategori,
            value: d.jumlah,
            color: ["#2d5f3f", "#8b6f47", "#a78a5e", "#4a7c59"][idx % 4],
          }))
        );
        setPenjualanData(
          penjualan.map((d: any, idx: number) => ({
            name: d.kategori,
            value: d.jumlah,
            color: ["#8b6f47", "#4a7c59", "#a78a5e", "#2d5f3f"][idx % 4],
          }))
        );
        setVarietasData(
          varietas.map((d: any, idx: number) => ({
            name: d.kategori,
            value: d.jumlah,
            color: ["#2d5f3f", "#8b6f47", "#a78a5e"][idx % 3],
          }))
        );
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Memuat data dashboard...
      </div>
    );
  }

  // ==== Statistik Kartu ====
  const stats = summary
    ? [
        {
          icon: Users,
          label: "Total Petani",
          value: `${summary.total_petani} Orang`,
          trend: "+12%",
          gradient: "from-[#2d5f3f] to-[#4a7c59]",
        },
        {
          icon: Sprout,
          label: "Total Lahan",
          value: `${summary.total_lahan_ha} Ha`,
          trend: "+5%",
          gradient: "from-[#8b6f47] to-[#a78a5e]",
        },
        {
          icon: Package,
          label: "Total Produksi",
          value: `${summary.total_produksi_kg_tahun} kg/tahun`,
          trend: "+18%",
          gradient: "from-[#4a7c59] to-[#6b9d78]",
        },
        {
          icon: DollarSign,
          label: "Rata-Rata Harga",
          value: `Rp ${summary.rata_rata_harga_rp.toLocaleString("id-ID")}`,
          trend: "+8%",
          gradient: "from-[#a78a5e] to-[#c9a96e]",
        },
      ]
    : [];


  // === Komponen Donut Chart (compact & responsive) ===
  const DonutChart = ({ data, title }: { data: any[]; title: string }) => (
    <Card className="p-5 bg-white dark:bg-gray-800 shadow-md border-0 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-[1.02]">
      <h3 className="mb-3 text-gray-700 dark:text-gray-300 text-center font-medium text-sm">
        {title}
      </h3>

      <div className="flex items-center justify-center gap-4 w-full">
        {/* Donut Chart */}
        <div className="w-[110px] h-[110px] flex justify-center items-center">
          <PieChart width={110} height={110}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={50}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </div>

        {/* Legend Compact */}
        <div className="flex flex-col space-y-1 flex-1">
          {data.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs text-gray-700"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="truncate max-w-[70px]">{item.name}</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="dark:text-gray-100 max-w-7xl mx-auto p-6">
      {/* === HEADER === */}
      <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <Coffee className="w-full h-full" />
        </div>
        <div className="relative z-10">
          <h1 className="text-white mb-2">
            Dashboard Monitoring Produksi Kopi
          </h1>
          <div className="flex items-center text-white/90">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Kecamatan Doko, Kabupaten Blitar</span>
          </div>
        </div>
      </div>

      {/* === KARTU STATISTIK === */}
      <div className="grid grid-cols-4 gap-6 mb-14">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className="p-6 bg-white dark:bg-gray-800 shadow-md border-0 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs">
                  <TrendingUp className="w-3 h-3" /> {stat.trend}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-gray-900">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      {/* === DONUT CHARTS === */}
      <div className="grid grid-cols-3 gap-6 mt-24 mb-8">
        <DonutChart data={budidayaData} title="Metode Budidaya" />
        <DonutChart data={penjualanData} title="Metode Penjualan" />
        <DonutChart data={varietasData} title="Varietas Unggul" />
      </div>

      {/* === BAR & AREA CHART === */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-white shadow-md border-0">
          <h3 className="mb-6 text-gray-700">Distribusi Jenis Kopi</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={jenisKopi}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b5d4f" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b5d4f" }} />
              <Tooltip />
              <Bar dataKey="value" fill="#2d5f3f" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2 p-6 bg-white shadow-md border-0">
          <h3 className="mb-6 text-gray-700">Tren Produksi Kopi</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trenProduksi}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d5f3f" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2d5f3f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b5d4f" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b5d4f" }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2d5f3f"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
