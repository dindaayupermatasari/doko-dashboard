import pandas as pd
import numpy as np
import re

# --- Definisi Fungsi Transformasi Kustom ---

# Helper functions (dipanggil oleh transformer)
def clean_price(price):
    """Membersihkan kolom harga dari karakter non-numerik."""
    if pd.isna(price): return np.nan
    if isinstance(price, (int, float)): return float(price)
    if isinstance(price, str):
        price_cleaned = re.sub(r"\D", "", price)
        return float(price_cleaned) if price_cleaned else np.nan
    return np.nan

def clean_population(pop):
    """Membersihkan kolom populasi kopi."""
    if pd.isna(pop): return np.nan
    return str(pop).replace("btg", "").replace(".", "").strip()

def extract_farming_duration(duration):
    """Mengekstrak angka dari kolom lama bertani."""
    if pd.isna(duration): return np.nan
    match = re.search(r"(\d+)", str(duration))
    return float(match.group(1)) if match else np.nan

# Main transformer functions (untuk digunakan di FunctionTransformer)
def transform_clean_harga(X):
    """Transformer untuk membersihkan kolom harga."""
    X_copy = X.copy()
    # Ganti 'HARGA JUAL PER KG' menjadi "HARGA JUAL PER KG"
    X_copy["HARGA JUAL PER KG"] = X_copy["HARGA JUAL PER KG"].apply(clean_price)
    return X_copy

def transform_replace_kemitraan(X):
    """Transformer untuk mengganti nilai pada kolom kemitraan."""
    X_copy = X.copy()
    replacements = {"0": "Tidak Ada", 0: "Tidak Ada", "tengkulak": "Tengkulak", "user": "User"}
    # Ganti 'KEMITRAAN' menjadi "KEMITRAAN"
    X_copy["KEMITRAAN"] = X_copy["KEMITRAAN"].replace(replacements)
    return X_copy

def transform_clean_populasi(X):
    """Transformer untuk membersihkan kolom populasi kopi."""
    X_copy = X.copy()
    # Ganti 'POPULASI KOPI' menjadi "POPULASI KOPI"
    X_copy["POPULASI KOPI"] = pd.to_numeric(X_copy["POPULASI KOPI"].apply(clean_population), errors='coerce')
    return X_copy

def transform_clean_lama_bertani(X):
    """Transformer untuk membersihkan kolom lama bertani."""
    X_copy = X.copy()
    # Ganti 'LAMA BERTANI' menjadi "LAMA BERTANI"
    X_copy["LAMA BERTANI"] = X_copy["LAMA BERTANI"].apply(extract_farming_duration)
    return X_copy

def transform_impute_missing(X):
    """
    Transformer untuk mengisi nilai yang hilang dengan median.
    Dibuat lebih robust untuk menangani kolom yang sepenuhnya kosong.
    """
    X_copy = X.copy()
    
    # Daftar kolom yang akan diisi
    cols_to_impute = ["HARGA JUAL PER KG", "POPULASI KOPI", "LAMA BERTANI"]

    for col in cols_to_impute:
        if col in X_copy:
            # Hitung median hanya jika ada nilai non-NaN di kolom tersebut
            # Jika tidak, gunakan 0 sebagai nilai default.
            median_val = X_copy[col].median() if not X_copy[col].dropna().empty else 0
            X_copy[col] = X_copy[col].fillna(median_val)
            
    return X_copy