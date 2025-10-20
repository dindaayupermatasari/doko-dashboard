import { useState } from 'react';
import { ArrowLeft, Save, X, CalendarIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface EditPetaniPageProps {
  onBack: () => void;
  petaniData: any;
}

export function EditPetaniPage({ onBack, petaniData }: EditPetaniPageProps) {
  const [tglPendataan, setTglPendataan] = useState<Date>();
  const [tglPeriksa, setTglPeriksa] = useState<Date>();
  
  const [formData, setFormData] = useState({
    nama: petaniData.nama || '',
    usia: petaniData.usia || '',
    noHp: petaniData.noHp || '',
    kelompokTani: petaniData.kelompokTani || '',
    dusun: petaniData.dusun || '',
    lahan: petaniData.lahan || '',
    produksi: petaniData.produksi || '',
    harga: petaniData.harga || '',
    kecamatan: 'Doko',
    desa: 'Sumberurip',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Data petani berhasil diupdate!');
    onBack();
  };

  return (
    <div className="dark:text-gray-100">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 hover:bg-gray-100 dark:hover:bg-[#1a2e23]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Data Petani
        </Button>
        <h1 className="text-[#2d5f3f] dark:text-[#b88746] mb-2">Edit Data Petani</h1>
        <p className="text-gray-600 dark:text-[#a3a3a3]">
          Edit data petani: {formData.nama}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-8 bg-white dark:bg-[#242424] shadow-md border-0 mb-6">
          <h3 className="text-gray-900 dark:text-[#e5e5e5] mb-6">Informasi Dasar</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap *</Label>
              <Input
                id="nama"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10 focus:border-[#2d5f3f] dark:focus:border-[#b88746]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usia">Usia *</Label>
              <Input
                id="usia"
                type="number"
                placeholder="Masukkan usia"
                value={formData.usia}
                onChange={(e) => setFormData({ ...formData, usia: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10 focus:border-[#2d5f3f] dark:focus:border-[#b88746]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="noHp">Nomor HP *</Label>
              <Input
                id="noHp"
                placeholder="08xxxxxxxxxx"
                value={formData.noHp}
                onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10 focus:border-[#2d5f3f] dark:focus:border-[#b88746]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kelompokTani">Kelompok Tani *</Label>
              <Input
                id="kelompokTani"
                placeholder="Contoh: SBT 03"
                value={formData.kelompokTani}
                onChange={(e) => setFormData({ ...formData, kelompokTani: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10 focus:border-[#2d5f3f] dark:focus:border-[#b88746]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dusun">Dusun *</Label>
              <Input
                id="dusun"
                placeholder="Nama dusun"
                value={formData.dusun}
                onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10 focus:border-[#2d5f3f] dark:focus:border-[#b88746]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lahan">Luas Lahan (m²) *</Label>
              <Input
                id="lahan"
                placeholder="Contoh: 15000"
                value={formData.lahan}
                onChange={(e) => setFormData({ ...formData, lahan: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10 focus:border-[#2d5f3f] dark:focus:border-[#b88746]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="produksi">Produksi per Tahun (kg) *</Label>
              <Input
                id="produksi"
                type="number"
                placeholder="Contoh: 680"
                value={formData.produksi}
                onChange={(e) => setFormData({ ...formData, produksi: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10 focus:border-[#2d5f3f] dark:focus:border-[#b88746]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="harga">Harga Jual *</Label>
              <Input
                id="harga"
                placeholder="Contoh: Rp 72.000"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10 focus:border-[#2d5f3f] dark:focus:border-[#b88746]"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="gap-2 border-gray-300 dark:border-white/10"
          >
            <X className="w-4 h-4" />
            Batal
          </Button>
          <Button
            type="submit"
            className="gap-2 bg-gradient-to-r from-[#2d5f3f] to-[#4a7c59] dark:from-[#b88746] dark:to-[#d4a373] hover:from-[#3d7050] hover:to-[#5a8c69] dark:hover:from-[#a07738] dark:hover:to-[#c49565] text-white"
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>
  );
}
