from fastapi import APIRouter
from ..database import database
import pandas as pd

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/summary")
async def get_dashboard_summary():
    """Menghasilkan data ringkasan untuk kartu di bagian atas dashboard."""
    # Menggunakan nama kolom yang benar dari database Supabase Anda
    # Perhatikan penggunaan tanda kutip ganda "" untuk kolom dengan spasi/huruf besar
    query_total_petani = 'SELECT COUNT("NO") FROM petani;'
    query_total_lahan = 'SELECT SUM("TOTAL LAHAN (M2)") / 10000.0 FROM petani;' # Konversi ke Ha
    query_total_produksi = 'SELECT SUM("HASIL PER TAHUN (kg)") FROM petani;'
    
    # Query ini membersihkan kolom teks harga (menghapus 'Rp', '.', ','), 
    # mengubahnya menjadi angka (cast to numeric), lalu menghitung rata-rata.
    query_rata_harga = """
        SELECT AVG(CAST(regexp_replace("HARGA JUAL PER KG", '[^0-9]', '', 'g') AS NUMERIC)) 
        FROM petani 
        WHERE "HARGA JUAL PER KG" ~ '[0-9]';
    """

    total_petani = await database.fetch_val(query_total_petani)
    total_lahan_ha = await database.fetch_val(query_total_lahan)
    total_produksi = await database.fetch_val(query_total_produksi)
    rata_harga = await database.fetch_val(query_rata_harga)

    return {
        "total_petani": total_petani or 0,
        "total_lahan_ha": round(total_lahan_ha, 2) if total_lahan_ha else 0,
        "total_produksi_kg_tahun": total_produksi or 0,
        "rata_rata_harga_rp": round(rata_harga) if rata_harga else 0
    }

@router.get("/distribusi-jenis-kopi")
async def get_distribusi_jenis_kopi():
    """Data untuk chart distribusi jenis kopi."""
    query = 'SELECT "JENIS KOPI", COUNT(*) as jumlah FROM petani WHERE "JENIS KOPI" IS NOT NULL GROUP BY "JENIS KOPI";'
    results = await database.fetch_all(query)
    return [{"jenis": row["JENIS KOPI"], "jumlah": row["jumlah"]} for row in results]

@router.get("/tren-produksi-kopi")
async def get_tren_produksi_kopi():
    """Data untuk chart tren produksi kopi."""
    # Query ini mengubah kolom teks 'TGL PENDATAAN' menjadi tipe DATE
    # lalu mengelompokkan berdasarkan tahun dan bulan.
    query = """
        SELECT 
            TO_CHAR(TO_DATE("TGL PENDATAAN", 'DD/MM/YYYY'), 'YYYY-MM') as bulan, 
            SUM("HASIL PER TAHUN (kg)") as total_produksi
        FROM petani
        WHERE "TGL PENDATAAN" IS NOT NULL AND "HASIL PER TAHUN (kg)" IS NOT NULL
        GROUP BY bulan
        ORDER BY bulan;
    """
    results = await database.fetch_all(query)
    return [{"bulan": row["bulan"], "total_produksi": row["total_produksi"]} for row in results]

# Anda bisa menambahkan lebih banyak endpoint untuk chart lainnya dengan cara yang sama
# Contoh:
# @router.get("/distribusi-kelompok-tani")
# async def get_distribusi_kelompok_tani():
#     query = "SELECT kelompok_tani, COUNT(*) as jumlah FROM petani GROUP BY kelompok_tani;"
#     ...