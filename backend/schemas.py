from pydantic import BaseModel, Field
from typing import Optional

# Skema ini mencerminkan SEMUA kolom di tabel Supabase Anda.
# 'Optional' digunakan untuk kolom yang bisa NULL.
class PetaniBase(BaseModel):
    kecamatan: Optional[str] = Field(None, alias='KECAMATAN')
    desa: Optional[str] = Field(None, alias='DESA')
    dusun: Optional[str] = Field(None, alias='DUSUN')
    rt: Optional[int] = Field(None, alias='RT')
    rw: Optional[int] = Field(None, alias='RW')
    surveyor: Optional[str] = Field(None, alias='SURVEYOR')
    tgl_pendataan: Optional[str] = Field(None, alias='TGL PENDATAAN')
    pemeriksa: Optional[str] = Field(None, alias='PEMERIKSA')
    tgl_periksa: Optional[str] = Field(None, alias='TGL PERIKSA')
    nama: Optional[str] = Field(None, alias='NAMA')
    jenis_kelamin: Optional[str] = Field(None, alias='JENIS KELAMIN')
    usia: Optional[int] = Field(None, alias='USIA')
    no_hp: Optional[int] = Field(None, alias='NO HP')
    kelompok_tani: Optional[str] = Field(None, alias='KELOMPOK TANI')
    lama_bertani: Optional[str] = Field(None, alias='LAMA BERTANI')
    total_lahan_m2: Optional[int] = Field(None, alias='TOTAL LAHAN (M2)')
    jumlah_lahan: Optional[int] = Field(None, alias='JUMLAH LAHAN')
    status_kepemilikan: Optional[str] = Field(None, alias='STATUS KEPEMILIKAN')
    jenis_kopi: Optional[str] = Field(None, alias='JENIS KOPI')
    varietas_kopi: Optional[str] = Field(None, alias='VARIETAS KOPI')
    varietas_unggul: Optional[str] = Field(None, alias='VARIETAS UNGGUL')
    populasi_kopi: Optional[str] = Field(None, alias='POPULASI KOPI')
    tanaman_lainnya: Optional[str] = Field(None, alias='TANAMAN LAINNYA')
    metode_budidaya: Optional[str] = Field(None, alias='METODE BUDIDAYA')
    pupuk: Optional[str] = Field(None, alias='PUPUK')
    sistem_irigasi: Optional[str] = Field(None, alias='SISTEM IRIGASI')
    hasil_per_tahun_kg: Optional[int] = Field(None, alias='HASIL PER TAHUN (kg)')
    panen_non_kopi: Optional[str] = Field(None, alias='PANEN NON KOPI')
    metode_panen: Optional[str] = Field(None, alias='METODE PANEN')
    metode_pengolahan: Optional[str] = Field(None, alias='METODE PENGOLAHAN')
    alat_pengolahan: Optional[str] = Field(None, alias='ALAT PENGOLAHAN')
    lama_fermentasi: Optional[str] = Field(None, alias='LAMA FERMENTASI')
    proses_pengeringan: Optional[str] = Field(None, alias='PROSES PENGERINGAN')
    bentuk_penyimpanan: Optional[str] = Field(None, alias='BENTUK PENYIMPANAN')
    kadar_air: Optional[str] = Field(None, alias='KADAR AIR')
    sistem_penyimpanan: Optional[str] = Field(None, alias='SISTEM PENYIMPANAN')
    metode_penjualan: Optional[str] = Field(None, alias='METODE PENJUALAN')
    harga_jual_per_kg: Optional[str] = Field(None, alias='HARGA JUAL PER KG')
    kemitraan: Optional[str] = Field(None, alias='KEMITRAAN')
    masalah: Optional[str] = Field(None, alias='MASALAH')
    pelatihan_yang_diperlukan: Optional[str] = Field(None, alias='PELATIHAN YANG DIPERLUKAN')
    catatan: Optional[str] = Field(None, alias='CATATAN')

    class Config:
        from_attributes = True
        populate_by_name = True

class PetaniCreate(PetaniBase):
    pass

class Petani(PetaniBase):
    no: int = Field(..., alias='NO')

# Skema untuk Autentikasi (tetap sama)
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    username: str

class UserInDB(User):
    hashed_password: str

# Skema untuk Sistem Rekomendasi (tetap sama)
class RecommendationRequest(BaseModel):
    masalah: str
    detail_petani: Optional[dict] = {}