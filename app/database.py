import os
from databases import Database
# from dotenv import load_dotenv

# load_dotenv()

# Membangun URL Database dari file .env
DATABASE_URL = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)

# Inisialisasi objek database
database = Database(DATABASE_URL, statement_cache_size=0)

async def connect_to_db():
    """Menghubungkan ke database saat aplikasi dimulai."""
    await database.connect()
    print("Berhasil terhubung ke database.")

async def close_db_connection():
    """Memutus koneksi database saat aplikasi berhenti."""
    await database.disconnect()
    print("Koneksi database ditutup.")