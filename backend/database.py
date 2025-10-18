import os
from databases import Database
from dotenv import load_dotenv  

# Load .env supaya os.getenv() kebaca
env_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=env_path)

# Ambil variabel dengan default aman
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", 5432)) 
DB_NAME = os.getenv("DB_NAME", "postgres")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Inisialisasi objek database
database = Database(DATABASE_URL, statement_cache_size=0)

async def connect_to_db():
    """Menghubungkan ke database saat aplikasi dimulai."""
    await database.connect()
    print("✅ Berhasil terhubung ke database.")

async def close_db_connection():
    """Memutus koneksi database saat aplikasi berhenti."""
    await database.disconnect()
    print("🛑 Koneksi database ditutup.")
