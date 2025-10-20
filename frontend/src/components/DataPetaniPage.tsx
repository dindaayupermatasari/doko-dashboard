import { useState, useEffect } from "react";
import { Search, Download, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import api from "../api/api";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface DataPetaniPageProps {
  onNavigateToTambahPetani?: () => void;
  onNavigateToEditPetani?: (petaniData: any) => void;
}

export function DataPetaniPage({
  onNavigateToTambahPetani,
  onNavigateToEditPetani,
}: DataPetaniPageProps) {
  const [petaniData, setPetaniData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKelompok, setSelectedKelompok] = useState("all");
  const [selectedDusun, setSelectedDusun] = useState("all");
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const [viewDetailData, setViewDetailData] = useState<any>(null);
  const [deleteConfirmData, setDeleteConfirmData] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // === FETCH DATA DARI BACKEND ===
  const fetchPetani = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/petani/");
      console.log("DATA DARI BACKEND:", res.data);

      // Normalisasi data dari backend agar sesuai format frontend
      const normalized = (res.data || []).map((item: any, index: number) => ({
        id: item.id ?? item.ID ?? index + 1,
        nama: item.NAMA ?? item.nama ?? "",
        usia: item.USIA ?? item.usia ?? "",
        no_hp: item["NO HP"] ?? item.no_hp ?? item.nohp ?? "",
        kelompok_tani:
          item["KELOMPOK TANI"] ?? item.kelompok_tani ?? item.kelompok ?? "",
        dusun: item.DUSUN ?? item.dusun ?? "",
        luas_lahan: item["TOTAL LAHAN (M2)"] ?? item.luas_lahan ?? "",
        produksi: item["HASIL PER TAHUN (kg)"] ?? item.produksi ?? "",
        harga: item["HARGA JUAL PER KG"] ?? item.harga ?? "",
      }));

      setPetaniData(normalized);
    } catch (error) {
      console.error("Gagal memuat data petani:", error);
      alert("Gagal memuat data petani dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPetani();
  }, []);

  // === FILTER DATA ===
  const filteredData = petaniData.filter((p) => {
    const nama = (p.nama ?? "").toLowerCase();
    const dusun = (p.dusun ?? "").toLowerCase();
    const matchSearch =
      nama.includes(searchQuery.toLowerCase()) ||
      dusun.includes(searchQuery.toLowerCase());
    const matchKelompok =
      selectedKelompok === "all" || p.kelompok_tani === selectedKelompok;
    const matchDusun =
      selectedDusun === "all" || dusun === selectedDusun.toLowerCase();
    return matchSearch && matchKelompok && matchDusun;
  });

  // === EXPORT ===
  const handleExport = (format: string) => {
    if (filteredData.length === 0) {
      alert("Tidak ada data untuk diekspor.");
      return;
    }

    switch (format) {
      case "CSV": {
        const csvHeader = [
          "Nama",
          "Usia",
          "No HP",
          "Kelompok Tani",
          "Dusun",
          "Lahan",
          "Produksi",
          "Harga",
        ];
        const csvRows = filteredData.map((f) =>
          [
            f.nama,
            f.usia,
            f.no_hp,
            f.kelompok_tani,
            f.dusun,
            f.luas_lahan,
            f.produksi,
            f.harga,
          ].join(",")
        );
        const csvData = [csvHeader.join(","), ...csvRows].join("\n");
        const blob = new Blob([csvData], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data_petani.csv";
        link.click();
        break;
      }

      case "Excel": {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "DataPetani");
        XLSX.writeFile(workbook, "data_petani.xlsx");
        break;
      }

      case "PDF": {
        const doc = new jsPDF();
        doc.text("Data Petani Kopi", 14, 15);
        const tableData = filteredData.map((f) => [
          f.nama,
          f.usia,
          f.no_hp,
          f.kelompok_tani,
          f.dusun,
          f.luas_lahan,
          f.produksi,
          f.harga,
        ]);
        (doc as any).autoTable({
          head: [
            [
              "Nama",
              "Usia",
              "No HP",
              "Kelompok",
              "Dusun",
              "Lahan",
              "Produksi",
              "Harga",
            ],
          ],
          body: tableData,
          startY: 20,
        });
        doc.save("data_petani.pdf");
        break;
      }

      case "JSON": {
        const jsonStr = JSON.stringify(filteredData, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "data_petani.json";
        link.click();
        break;
      }

      default:
        alert("Format tidak dikenali");
    }

    setIsExportDialogOpen(false);
  };

  // === AKSI ===
  const handleView = (f: any) => setViewDetailData(f);
  const handleEdit = (f: any) => onNavigateToEditPetani?.(f);
  const handleDeleteClick = (f: any) => setDeleteConfirmData(f);

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmData) return;
    setIsDeleting(true);
    try {
      await api.delete(`/petani/${deleteConfirmData.id}`);
      await fetchPetani();
      setDeleteConfirmData(null);
    } catch (err) {
      console.error("Gagal menghapus:", err);
      alert("Gagal menghapus data petani.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading)
    return <p className="text-center py-10">Memuat data petani...</p>;

  return (
    <div className="dark:text-gray-100">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-[#2d5f3f] dark:text-green-400 mb-2">
          Data Petani Kopi
        </h1>
        <p className="text-gray-600">
          Kelola dan pantau data petani kopi di wilayah Anda
        </p>
      </div>

      {/* FILTER & TOMBOL */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Cari Nama Petani / Dusun"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 focus:border-[#2d5f3f]"
            />
          </div>

          <Select value={selectedKelompok} onValueChange={setSelectedKelompok}>
            <SelectTrigger className="w-[200px] border-gray-300">
              <SelectValue placeholder="Semua Kelompok" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelompok</SelectItem>
              <SelectItem value="SBT 03">SBT 03</SelectItem>
              <SelectItem value="SBT 04">SBT 04</SelectItem>
              <SelectItem value="SBT 05">SBT 05</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDusun} onValueChange={setSelectedDusun}>
            <SelectTrigger className="w-[200px] border-gray-300">
              <SelectValue placeholder="Semua Dusun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Dusun</SelectItem>
              <SelectItem value="sumberurip">Sumberurip</SelectItem>
              <SelectItem value="sumberagung">Sumberagung</SelectItem>
              <SelectItem value="jawai talu">Jawai Talu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* EXPORT & TAMBAH */}
        <div className="flex gap-2">
          <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-[#8b6f47] text-[#8b6f47] hover:bg-[#8b6f47] hover:text-white"
              >
                <Download className="w-4 h-4" /> Export
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Data</DialogTitle>
                <DialogDescription>
                  Pilih format file untuk export data petani
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button
                  onClick={() => handleExport("CSV")}
                  className="w-full justify-start gap-3"
                >
                  <Download className="w-4 h-4" /> Export as CSV
                </Button>
                <Button
                  onClick={() => handleExport("Excel")}
                  className="w-full justify-start gap-3"
                >
                  <Download className="w-4 h-4" /> Export as Excel (.xlsx)
                </Button>
                <Button
                  onClick={() => handleExport("PDF")}
                  className="w-full justify-start gap-3"
                >
                  <Download className="w-4 h-4" /> Export as PDF
                </Button>
                <Button
                  onClick={() => handleExport("JSON")}
                  className="w-full justify-start gap-3"
                >
                  <Download className="w-4 h-4" /> Export as JSON
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={onNavigateToTambahPetani}
            className="gap-2 bg-gradient-to-r from-[#2d5f3f] to-[#4a7c59] hover:from-[#3d7050] hover:to-[#5a8c69] text-white"
          >
            <Plus className="w-4 h-4" /> Tambah Petani
          </Button>
        </div>
      </div>

      {/* === TABEL DATA === */}
      <Card className="bg-white dark:bg-[#242424] shadow-md overflow-hidden border-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-[#2d5f3f] to-[#4a7c59]">
              <TableHead className="text-white">NO</TableHead>
              <TableHead className="text-white">NAMA</TableHead>
              <TableHead className="text-white">USIA</TableHead>
              <TableHead className="text-white">NO. HP</TableHead>
              <TableHead className="text-white">KELOMPOK</TableHead>
              <TableHead className="text-white">DUSUN</TableHead>
              <TableHead className="text-white">LAHAN (M²)</TableHead>
              <TableHead className="text-white">PRODUKSI (KG/TH)</TableHead>
              <TableHead className="text-white">HARGA</TableHead>
              <TableHead className="text-center text-white">AKSI</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((f, i) => (
              <TableRow key={f.id ?? i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{f.nama}</TableCell>
                <TableCell>{f.usia}</TableCell>
                <TableCell>{f.no_hp}</TableCell>
                <TableCell>{f.kelompok_tani}</TableCell>
                <TableCell>{f.dusun}</TableCell>
                <TableCell>{f.luas_lahan}</TableCell>
                <TableCell>{f.produksi}</TableCell>
                <TableCell>{f.harga}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleView(f)} title="Lihat Detail">
                      <Eye className="w-4 h-4 text-[#2d5f3f]" />
                    </button>
                    <button onClick={() => handleEdit(f)} title="Edit Data">
                      <Edit className="w-4 h-4 text-[#8b6f47]" />
                    </button>
                    <button onClick={() => handleDeleteClick(f)} title="Hapus Data">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* === DIALOG DETAIL === */}
      <Dialog open={!!viewDetailData} onOpenChange={() => setViewDetailData(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Petani</DialogTitle>
          </DialogHeader>
          {viewDetailData && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <p><b>Nama:</b> {viewDetailData.nama}</p>
              <p><b>Usia:</b> {viewDetailData.usia}</p>
              <p><b>No. HP:</b> {viewDetailData.no_hp}</p>
              <p><b>Kelompok:</b> {viewDetailData.kelompok_tani}</p>
              <p><b>Dusun:</b> {viewDetailData.dusun}</p>
              <p><b>Lahan:</b> {viewDetailData.luas_lahan}</p>
              <p><b>Produksi:</b> {viewDetailData.produksi}</p>
              <p><b>Harga:</b> {viewDetailData.harga}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* === DIALOG HAPUS === */}
      <AlertDialog open={!!deleteConfirmData} onOpenChange={() => setDeleteConfirmData(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Petani</AlertDialogTitle>
          </AlertDialogHeader>
          <p>
            Yakin ingin menghapus data petani{" "}
            <strong>{deleteConfirmData?.nama}</strong>?
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 text-white"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
