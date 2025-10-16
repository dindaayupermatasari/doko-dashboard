import os
import joblib
import pandas as pd
from fastapi import APIRouter, HTTPException
import google.generativeai as genai
from collections import Counter
import re
import sys

from ..schemas import RecommendationRequest
from ..database import database
from .. import ai_utils

# Trik untuk membuat fungsi kustom dikenal oleh joblib/pickle
# Ini menempatkan fungsi-fungsi dari ai_utils ke dalam modul __main__
# sehingga joblib dapat menemukannya saat memuat pipeline.
sys.modules['__main__'].transform_clean_harga = ai_utils.transform_clean_harga
sys.modules['__main__'].transform_replace_kemitraan = ai_utils.transform_replace_kemitraan
sys.modules['__main__'].transform_clean_populasi = ai_utils.transform_clean_populasi
sys.modules['__main__'].transform_clean_lama_bertani = ai_utils.transform_clean_lama_bertani
sys.modules['__main__'].transform_impute_missing = ai_utils.transform_impute_missing


router = APIRouter(
    prefix="/analysis",
    tags=["Analysis & AI"]
)

# --- Load Model AI saat startup ---
try:
    CLEANING_PIPELINE = joblib.load("app/models_ai/pipeline_cleaning.joblib")
    PROXY_CLASSIFIER_PIPELINE = joblib.load("app/models_ai/proxy_classifier_pipeline_produk_budidaya.joblib")
    print("✅ Model AI berhasil dimuat.")
except FileNotFoundError:
    CLEANING_PIPELINE = None
    CLUSTERING_PIPELINE = None
    print("⚠️ Peringatan: File model AI tidak ditemukan. Endpoint clustering tidak akan berfungsi.")

# --- Konfigurasi Gemini API ---
try:
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
    GEMINI_MODEL = genai.GenerativeModel("gemini-2.5-flash")
    print("✅ Model Gemini berhasil dikonfigurasi.")
except Exception as e:
    GEMINI_MODEL = None
    print(f"❌ Gagal mengkonfigurasi Gemini: {e}")


@router.get("/clustering-result")
async def get_clustering_result():
    """Menjalankan clustering pada data terbaru dan mengembalikan analisisnya."""
    if not PROXY_CLASSIFIER_PIPELINE or not CLEANING_PIPELINE:
        raise HTTPException(status_code=503, detail="Model clustering tidak tersedia.")

    query = "SELECT * FROM petani;"
    rows = await database.fetch_all(query)
    if not rows:
        return {"message": "Tidak ada data petani untuk di-cluster."}

    df = pd.DataFrame.from_records(rows, columns=rows[0].keys())

    df_cleaned = CLEANING_PIPELINE.transform(df)

    numeric_cols_for_model = [
        'HASIL PER TAHUN (kg)', 'TOTAL LAHAN (M2)', 'JUMLAH LAHAN',
        'HARGA JUAL PER KG', 'POPULASI KOPI', 'LAMA BERTANI'
    ]
    for col in numeric_cols_for_model:
        if col in df_cleaned.columns:
            df_cleaned[col] = pd.to_numeric(df_cleaned[col], errors='coerce')
    df_cleaned[numeric_cols_for_model] = df_cleaned[numeric_cols_for_model].fillna(
        df_cleaned[numeric_cols_for_model].median()
    )

    try:
        labels = PROXY_CLASSIFIER_PIPELINE.predict(df_cleaned)
        df_cleaned['cluster'] = labels
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saat clustering: {str(e)}")

    cluster_analysis = df_cleaned.groupby('cluster')[['HASIL PER TAHUN (kg)', 'HARGA JUAL PER KG']].mean().reset_index()
    cluster_analysis.fillna(0, inplace=True)

    cluster_analysis = cluster_analysis.sort_values('HASIL PER TAHUN (kg)', ascending=False).reset_index(drop=True)
    cluster_names = {}
    if len(cluster_analysis) > 0:
        cluster_names[cluster_analysis.loc[0, 'cluster']] = "Produktivitas Tinggi"
    if len(cluster_analysis) > 1:
        cluster_names[cluster_analysis.loc[1, 'cluster']] = "Produktivitas Sedang"
    if len(cluster_analysis) > 2:
        cluster_names[cluster_analysis.loc[2, 'cluster']] = "Produktivitas Rendah"

    petani_count = df_cleaned['cluster'].value_counts().to_dict()

    result = []
    for index, row in cluster_analysis.iterrows():
        cluster_id = int(row['cluster'])
        result.append({
            "name": cluster_names.get(cluster_id, f"Cluster {cluster_id}"),
            "petani_count": petani_count.get(cluster_id, 0),
            "avg_produktivitas_kg": round(row['HASIL PER TAHUN (kg)'], 2),
            "avg_harga_jual_rp": round(row['HARGA JUAL PER KG'], 2)
        })

    return result

@router.post("/recommendation")
async def get_recommendation(request: RecommendationRequest):
    """Memberikan rekomendasi berbasis AI menggunakan Gemini."""
    if not GEMINI_MODEL:
        raise HTTPException(status_code=503, detail="Model rekomendasi (Gemini) tidak tersedia.")

    # Anda dapat meningkatkan prompt ini lebih lanjut
    prompt = f"""
    Anda adalah ahli pertanian kopi. Berikan rekomendasi untuk petani dengan masalah berikut:
    Masalah: "{request.masalah}"
    
    Detail tambahan tentang petani (jika ada):
    {request.detail_petani}

    Berikan output dalam format JSON dengan kunci: 'masalah_utama', 'prioritas_penanganan', 'rekomendasi_pelatihan', 'solusi_praktis'.
    """
    try:
        response = GEMINI_MODEL.generate_content(prompt)
        # Membersihkan output agar valid JSON
        cleaned_text = response.text.strip().replace("```json", "").replace("```", "")
        return {"recommendation": cleaned_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saat menghubungi Gemini API: {e}")


@router.get("/wordcloud-data")
async def get_wordcloud_data():
    """Menyediakan data frekuensi kata untuk word cloud dari kolom masalah."""
    # Asumsi ada kolom 'masalah'
    query = 'SELECT "MASALAH" FROM petani WHERE "MASALAH" IS NOT NULL AND "MASALAH" <> \'\';'
    rows = await database.fetch_all(query)
    
    if not rows:
        return []

    # Gabungkan semua teks masalah dan hitung frekuensi kata
    all_text = ' '.join([row['MASALAH'] for row in rows])
    words = re.findall(r'\b\w+\b', all_text.lower())
    
    # Hapus stopwords sederhana (bisa diperluas)
    stopwords = {'dan', 'yang', 'pada', 'untuk', 'dengan', 'belum', 'juga'}
    filtered_words = [word for word in words if word not in stopwords and len(word) > 2]
    
    word_counts = Counter(filtered_words)
    
    # Format untuk library word cloud di frontend
    return [{"text": word, "value": count} for word, count in word_counts.most_common(50)]