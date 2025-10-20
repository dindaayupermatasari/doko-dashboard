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

interface TambahPetaniPageProps {
  onBack: () => void;
}

export function TambahPetaniPage({ onBack }: TambahPetaniPageProps) {
  const [tglPendataan, setTglPendataan] = useState<Date>();
  const [tglPeriksa, setTglPeriksa] = useState<Date>();
  
  const [formData, setFormData] = useState({
    kecamatan: '',
    desa: '',
    dusun: '',
    dusunLainnya: '',
    rt: '',
    rtLainnya: '',
    rw: '',
    rwLainnya: '',
    surveyor: '',
    pemeriksa: '',
    jenisKelamin: '',
    kelompokTani: '',
    kelompokTaniLainnya: '',
    lamaBertani: '',
    statusKepemilikan: '',
    statusKepemilikanLainnya: '',
    jenisKopi: '',
    jenisKopiLainnya: '',
    varietasKopi: '',
    varietasKopiLainnya: '',
    varietasUnggul: '',
    varietasUnggulLainnya: '',
    tanamanLainnya: '',
    tanamanLainnyaLainnya: '',
    metodeBudidaya: '',
    metodeBudidayaLainnya: '',
    pupuk: '',
    sistemIrigasi: '',
    sistemIrigasiLainnya: '',
    panenNonKopi: '',
    panenNonKopiLainnya: '',
    metodePanen: '',
    metodePanenLainnya: '',
    metodePengolahan: '',
    metodePengolahanLainnya: '',
    alatPengolahan: '',
    alatPengolahanLainnya: '',
    lamaFermentasi: '',
    lamaFermentasiLainnya: '',
    prosesPengeringan: '',
    prosesPengeringanLainnya: '',
    bentukPenyimpanan: '',
    bentukPenyimpananLainnya: '',
    kadarAir: '',
    sistemPenyimpanan: '',
    sistemPenyimpananLainnya: '',
    metodePenjualan: '',
    metodePenjualanLainnya: '',
    kemitraan: '',
    kemitraanLainnya: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Data petani berhasil ditambahkan!');
    onBack();
  };

  const handleReset = () => {
    setTglPendataan(undefined);
    setTglPeriksa(undefined);
    setFormData({
      kecamatan: '',
      desa: '',
      dusun: '',
      dusunLainnya: '',
      rt: '',
      rtLainnya: '',
      rw: '',
      rwLainnya: '',
      surveyor: '',
      pemeriksa: '',
      jenisKelamin: '',
      kelompokTani: '',
      kelompokTaniLainnya: '',
      lamaBertani: '',
      statusKepemilikan: '',
      statusKepemilikanLainnya: '',
      jenisKopi: '',
      jenisKopiLainnya: '',
      varietasKopi: '',
      varietasKopiLainnya: '',
      varietasUnggul: '',
      varietasUnggulLainnya: '',
      tanamanLainnya: '',
      tanamanLainnyaLainnya: '',
      metodeBudidaya: '',
      metodeBudidayaLainnya: '',
      pupuk: '',
      sistemIrigasi: '',
      sistemIrigasiLainnya: '',
      panenNonKopi: '',
      panenNonKopiLainnya: '',
      metodePanen: '',
      metodePanenLainnya: '',
      metodePengolahan: '',
      metodePengolahanLainnya: '',
      alatPengolahan: '',
      alatPengolahanLainnya: '',
      lamaFermentasi: '',
      lamaFermentasiLainnya: '',
      prosesPengeringan: '',
      prosesPengeringanLainnya: '',
      bentukPenyimpanan: '',
      bentukPenyimpananLainnya: '',
      kadarAir: '',
      sistemPenyimpanan: '',
      sistemPenyimpananLainnya: '',
      metodePenjualan: '',
      metodePenjualanLainnya: '',
      kemitraan: '',
      kemitraanLainnya: '',
    });
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
        <h1 className="text-[#2d5f3f] dark:text-[#b88746] mb-2">Tambah Data Petani</h1>
        <p className="text-gray-600 dark:text-[#a3a3a3]">
          Lengkapi formulir di bawah untuk menambahkan data petani baru
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-8 bg-white dark:bg-[#242424] shadow-md border-0 mb-6">
          <h3 className="text-gray-900 dark:text-[#e5e5e5] mb-6">Informasi Lokasi</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="kecamatan">Kecamatan *</Label>
              <Input
                id="kecamatan"
                placeholder="Contoh: Doko"
                value={formData.kecamatan}
                onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desa">Desa *</Label>
              <Input
                id="desa"
                placeholder="Contoh: Sumberurip"
                value={formData.desa}
                onChange={(e) => setFormData({ ...formData, desa: e.target.value })}
                required
                className="border-gray-300 dark:border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dusun">Dusun *</Label>
              <Select 
                value={formData.dusun}
                onValueChange={(value) => setFormData({ ...formData, dusun: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih dusun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sumberurip">Sumberurip</SelectItem>
                  <SelectItem value="Sumbermanggis">Sumbermanggis</SelectItem>
                  <SelectItem value="Jawai Talu">Jawai Talu</SelectItem>
                  <SelectItem value="Sumberagung">Sumberagung</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.dusun === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan dusun lainnya"
                  value={formData.dusunLainnya}
                  onChange={(e) => setFormData({ ...formData, dusunLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rt">RT *</Label>
              <Select 
                value={formData.rt}
                onValueChange={(value) => setFormData({ ...formData, rt: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih RT" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.rt === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan RT lainnya"
                  value={formData.rtLainnya}
                  onChange={(e) => setFormData({ ...formData, rtLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rw">RW *</Label>
              <Select 
                value={formData.rw}
                onValueChange={(value) => setFormData({ ...formData, rw: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih RW" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.rw === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan RW lainnya"
                  value={formData.rwLainnya}
                  onChange={(e) => setFormData({ ...formData, rwLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jenisKelamin">Jenis Kelamin *</Label>
              <Select 
                value={formData.jenisKelamin}
                onValueChange={(value) => setFormData({ ...formData, jenisKelamin: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <h3 className="text-gray-900 dark:text-[#e5e5e5] mb-6 mt-8">Informasi Surveyor</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="surveyor">Surveyor</Label>
              <Input
                id="surveyor"
                placeholder="Nama surveyor"
                value={formData.surveyor}
                onChange={(e) => setFormData({ ...formData, surveyor: e.target.value })}
                className="border-gray-300 dark:border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tglPendataan">Tanggal Pendataan</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-start text-left font-normal border border-gray-300 dark:border-white/10 bg-white dark:bg-[#242424] hover:bg-gray-50 dark:hover:bg-[#1a2e23] px-3 py-2 rounded-md transition-colors"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-[#a3a3a3]" />
                    <span className={tglPendataan ? "text-gray-900 dark:text-[#e5e5e5]" : "text-gray-500 dark:text-[#a3a3a3]"}>
                      {tglPendataan ? format(tglPendataan, "PPP", { locale: id }) : "Pilih tanggal"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 dark:bg-[#242424] dark:border-white/10">
                  <Calendar
                    mode="single"
                    selected={tglPendataan}
                    onSelect={setTglPendataan}
                    initialFocus
                    locale={id}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pemeriksa">Pemeriksa</Label>
              <Input
                id="pemeriksa"
                placeholder="Nama pemeriksa"
                value={formData.pemeriksa}
                onChange={(e) => setFormData({ ...formData, pemeriksa: e.target.value })}
                className="border-gray-300 dark:border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tglPeriksa">Tanggal Periksa</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-start text-left font-normal border border-gray-300 dark:border-white/10 bg-white dark:bg-[#242424] hover:bg-gray-50 dark:hover:bg-[#1a2e23] px-3 py-2 rounded-md transition-colors"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-[#a3a3a3]" />
                    <span className={tglPeriksa ? "text-gray-900 dark:text-[#e5e5e5]" : "text-gray-500 dark:text-[#a3a3a3]"}>
                      {tglPeriksa ? format(tglPeriksa, "PPP", { locale: id }) : "Pilih tanggal"}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 dark:bg-[#242424] dark:border-white/10">
                  <Calendar
                    mode="single"
                    selected={tglPeriksa}
                    onSelect={setTglPeriksa}
                    initialFocus
                    locale={id}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <h3 className="text-gray-900 dark:text-[#e5e5e5] mb-6 mt-8">Informasi Pertanian</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="kelompokTani">Kelompok Tani *</Label>
              <Select 
                value={formData.kelompokTani}
                onValueChange={(value) => setFormData({ ...formData, kelompokTani: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih kelompok tani" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SBT 3">SBT 3</SelectItem>
                  <SelectItem value="SBT 6">SBT 6</SelectItem>
                  <SelectItem value="SBT 5">SBT 5</SelectItem>
                  <SelectItem value="SBT 1">SBT 1</SelectItem>
                  <SelectItem value="SBT 4">SBT 4</SelectItem>
                  <SelectItem value="SBT 7">SBT 7</SelectItem>
                  <SelectItem value="SBT 2">SBT 2</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.kelompokTani === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan kelompok tani lainnya"
                  value={formData.kelompokTaniLainnya}
                  onChange={(e) => setFormData({ ...formData, kelompokTaniLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lamaBertani">Lama Bertani (tahun)</Label>
              <Input
                id="lamaBertani"
                type="number"
                placeholder="Contoh: 10"
                value={formData.lamaBertani}
                onChange={(e) => setFormData({ ...formData, lamaBertani: e.target.value })}
                className="border-gray-300 dark:border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="statusKepemilikan">Status Kepemilikan</Label>
              <Select 
                value={formData.statusKepemilikan}
                onValueChange={(value) => setFormData({ ...formData, statusKepemilikan: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Milik Sendiri">Milik Sendiri</SelectItem>
                  <SelectItem value="Sewa">Sewa</SelectItem>
                  <SelectItem value="Milik Keluarga">Milik Keluarga</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.statusKepemilikan === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan status lainnya"
                  value={formData.statusKepemilikanLainnya}
                  onChange={(e) => setFormData({ ...formData, statusKepemilikanLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jenisKopi">Jenis Kopi</Label>
              <Select 
                value={formData.jenisKopi}
                onValueChange={(value) => setFormData({ ...formData, jenisKopi: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih jenis kopi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sersah">Sersah</SelectItem>
                  <SelectItem value="Robusta">Robusta</SelectItem>
                  <SelectItem value="Arabika">Arabika</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.jenisKopi === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan jenis kopi lainnya"
                  value={formData.jenisKopiLainnya}
                  onChange={(e) => setFormData({ ...formData, jenisKopiLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="varietasKopi">Varietas Kopi</Label>
              <Select 
                value={formData.varietasKopi}
                onValueChange={(value) => setFormData({ ...formData, varietasKopi: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih varietas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tugusari">Tugusari</SelectItem>
                  <SelectItem value="besuki">Besuki</SelectItem>
                  <SelectItem value="32">32</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.varietasKopi === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan varietas lainnya"
                  value={formData.varietasKopiLainnya}
                  onChange={(e) => setFormData({ ...formData, varietasKopiLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="varietasUnggul">Varietas Unggul</Label>
              <Select 
                value={formData.varietasUnggul}
                onValueChange={(value) => setFormData({ ...formData, varietasUnggul: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih varietas unggul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unggul">Unggul</SelectItem>
                  <SelectItem value="Tugusari">Tugusari</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="Besuki">Besuki</SelectItem>
                  <SelectItem value="Tidak ada">Tidak ada</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.varietasUnggul === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan varietas unggul lainnya"
                  value={formData.varietasUnggulLainnya}
                  onChange={(e) => setFormData({ ...formData, varietasUnggulLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanamanLainnya">Tanaman Lainnya</Label>
              <Select 
                value={formData.tanamanLainnya}
                onValueChange={(value) => setFormData({ ...formData, tanamanLainnya: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih tanaman" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rempah">Rempah</SelectItem>
                  <SelectItem value="buah">Buah</SelectItem>
                  <SelectItem value="kelapa">Kelapa</SelectItem>
                  <SelectItem value="kayu">Kayu</SelectItem>
                  <SelectItem value="naungan">Naungan</SelectItem>
                  <SelectItem value="cengkeh">Cengkeh</SelectItem>
                  <SelectItem value="pohon naungan">Pohon Naungan</SelectItem>
                  <SelectItem value="buah-buahan">Buah-buahan</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.tanamanLainnya === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan tanaman lainnya"
                  value={formData.tanamanLainnyaLainnya}
                  onChange={(e) => setFormData({ ...formData, tanamanLainnyaLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="metodeBudidaya">Metode Budidaya</Label>
              <Select 
                value={formData.metodeBudidaya}
                onValueChange={(value) => setFormData({ ...formData, metodeBudidaya: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih metode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kombinasi">Kombinasi</SelectItem>
                  <SelectItem value="tradisional">Tradisional</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.metodeBudidaya === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan metode lainnya"
                  value={formData.metodeBudidayaLainnya}
                  onChange={(e) => setFormData({ ...formData, metodeBudidayaLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pupuk">Pupuk</Label>
              <Input
                id="pupuk"
                placeholder="Jenis pupuk yang digunakan"
                value={formData.pupuk}
                onChange={(e) => setFormData({ ...formData, pupuk: e.target.value })}
                className="border-gray-300 dark:border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sistemIrigasi">Sistem Irigasi</Label>
              <Select 
                value={formData.sistemIrigasi}
                onValueChange={(value) => setFormData({ ...formData, sistemIrigasi: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih sistem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tadah hujan">Tadah Hujan</SelectItem>
                  <SelectItem value="kombinasi">Kombinasi</SelectItem>
                  <SelectItem value="pompa air">Pompa Air</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.sistemIrigasi === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan sistem lainnya"
                  value={formData.sistemIrigasiLainnya}
                  onChange={(e) => setFormData({ ...formData, sistemIrigasiLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="panenNonKopi">Panen Non Kopi</Label>
              <Select 
                value={formData.panenNonKopi}
                onValueChange={(value) => setFormData({ ...formData, panenNonKopi: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih panen non kopi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kelapa">Kelapa</SelectItem>
                  <SelectItem value="buah">Buah</SelectItem>
                  <SelectItem value="cengkeh">Cengkeh</SelectItem>
                  <SelectItem value="Tidak ada">Tidak ada</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.panenNonKopi === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan panen lainnya"
                  value={formData.panenNonKopiLainnya}
                  onChange={(e) => setFormData({ ...formData, panenNonKopiLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>
          </div>

          <h3 className="text-gray-900 dark:text-[#e5e5e5] mb-6 mt-8">Informasi Panen & Pengolahan</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="metodePanen">Metode Panen</Label>
              <Select 
                value={formData.metodePanen}
                onValueChange={(value) => setFormData({ ...formData, metodePanen: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih metode panen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petik merah">Petik Merah</SelectItem>
                  <SelectItem value="kombinasi">Kombinasi</SelectItem>
                  <SelectItem value="campuran">Campuran</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.metodePanen === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan metode panen lainnya"
                  value={formData.metodePanenLainnya}
                  onChange={(e) => setFormData({ ...formData, metodePanenLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="metodePengolahan">Metode Pengolahan</Label>
              <Select 
                value={formData.metodePengolahan}
                onValueChange={(value) => setFormData({ ...formData, metodePengolahan: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih metode pengolahan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Honey">Honey</SelectItem>
                  <SelectItem value="Dry Process">Dry Process</SelectItem>
                  <SelectItem value="Full Wash">Full Wash</SelectItem>
                  <SelectItem value="Semi Wash">Semi Wash</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.metodePengolahan === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan metode pengolahan lainnya"
                  value={formData.metodePengolahanLainnya}
                  onChange={(e) => setFormData({ ...formData, metodePengolahanLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="alatPengolahan">Alat Pengolahan</Label>
              <Select 
                value={formData.alatPengolahan}
                onValueChange={(value) => setFormData({ ...formData, alatPengolahan: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih alat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fermentasi">Fermentasi</SelectItem>
                  <SelectItem value="Tanpa Fermentasi">Tanpa Fermentasi</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.alatPengolahan === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan alat lainnya"
                  value={formData.alatPengolahanLainnya}
                  onChange={(e) => setFormData({ ...formData, alatPengolahanLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lamaFermentasi">Lama Fermentasi</Label>
              <Select 
                value={formData.lamaFermentasi}
                onValueChange={(value) => setFormData({ ...formData, lamaFermentasi: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih lama fermentasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10 hari">10 hari</SelectItem>
                  <SelectItem value="Tanpa Fermentasi">Tanpa Fermentasi</SelectItem>
                  <SelectItem value="5 hari">5 hari</SelectItem>
                  <SelectItem value="14 hari">14 hari</SelectItem>
                  <SelectItem value="20 hari">20 hari</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.lamaFermentasi === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan lama fermentasi lainnya"
                  value={formData.lamaFermentasiLainnya}
                  onChange={(e) => setFormData({ ...formData, lamaFermentasiLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="prosesPengeringan">Proses Pengeringan</Label>
              <Select 
                value={formData.prosesPengeringan}
                onValueChange={(value) => setFormData({ ...formData, prosesPengeringan: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih proses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lantai">Lantai</SelectItem>
                  <SelectItem value="para-para">Para-para</SelectItem>
                  <SelectItem value="terpal">Terpal</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.prosesPengeringan === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan proses lainnya"
                  value={formData.prosesPengeringanLainnya}
                  onChange={(e) => setFormData({ ...formData, prosesPengeringanLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bentukPenyimpanan">Bentuk Penyimpanan</Label>
              <Select 
                value={formData.bentukPenyimpanan}
                onValueChange={(value) => setFormData({ ...formData, bentukPenyimpanan: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih bentuk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gabah">Gabah</SelectItem>
                  <SelectItem value="green bean">Green Bean</SelectItem>
                  <SelectItem value="tidak tahu">Tidak Tahu</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.bentukPenyimpanan === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan bentuk lainnya"
                  value={formData.bentukPenyimpananLainnya}
                  onChange={(e) => setFormData({ ...formData, bentukPenyimpananLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="kadarAir">Kadar Air</Label>
              <Input
                id="kadarAir"
                placeholder="Contoh: 12%"
                value={formData.kadarAir}
                onChange={(e) => setFormData({ ...formData, kadarAir: e.target.value })}
                className="border-gray-300 dark:border-white/10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sistemPenyimpanan">Sistem Penyimpanan</Label>
              <Select 
                value={formData.sistemPenyimpanan}
                onValueChange={(value) => setFormData({ ...formData, sistemPenyimpanan: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih sistem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="karung">Karung</SelectItem>
                  <SelectItem value="plastik (iner)">Plastik (Iner)</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.sistemPenyimpanan === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan sistem lainnya"
                  value={formData.sistemPenyimpananLainnya}
                  onChange={(e) => setFormData({ ...formData, sistemPenyimpananLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>
          </div>

          <h3 className="text-gray-900 dark:text-[#e5e5e5] mb-6 mt-8">Informasi Penjualan</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="metodePenjualan">Metode Penjualan</Label>
              <Select 
                value={formData.metodePenjualan}
                onValueChange={(value) => setFormData({ ...formData, metodePenjualan: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih metode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tengkulak">Tengkulak</SelectItem>
                  <SelectItem value="Pengumpul">Pengumpul</SelectItem>
                  <SelectItem value="Koperasi">Koperasi</SelectItem>
                  <SelectItem value="Pengolah">Pengolah</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.metodePenjualan === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan metode lainnya"
                  value={formData.metodePenjualanLainnya}
                  onChange={(e) => setFormData({ ...formData, metodePenjualanLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="kemitraan">Kemitraan</Label>
              <Select 
                value={formData.kemitraan}
                onValueChange={(value) => setFormData({ ...formData, kemitraan: value })}
              >
                <SelectTrigger className="border-gray-300 dark:border-white/10">
                  <SelectValue placeholder="Pilih kemitraan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tengkulak">Tengkulak</SelectItem>
                  <SelectItem value="koperasi">Koperasi</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {formData.kemitraan === 'Lainnya' && (
                <Input
                  placeholder="Sebutkan kemitraan lainnya"
                  value={formData.kemitraanLainnya}
                  onChange={(e) => setFormData({ ...formData, kemitraanLainnya: e.target.value })}
                  className="mt-2 border-gray-300 dark:border-white/10"
                />
              )}
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="gap-2 border-gray-300 dark:border-white/10"
          >
            <X className="w-4 h-4" />
            Reset
          </Button>
          <Button
            type="submit"
            className="gap-2 bg-gradient-to-r from-[#2d5f3f] to-[#4a7c59] dark:from-[#b88746] dark:to-[#d4a373] hover:from-[#3d7050] hover:to-[#5a8c69] dark:hover:from-[#a07738] dark:hover:to-[#c49565] text-white"
          >
            <Save className="w-4 h-4" />
            Simpan Data
          </Button>
        </div>
      </form>
    </div>
  );
}
