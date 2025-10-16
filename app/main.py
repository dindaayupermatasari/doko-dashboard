from fastapi import FastAPI
from dotenv import load_dotenv
load_dotenv()
from .database import connect_to_db, close_db_connection
from .routers import authentication, petani, dashboard, analysis

app = FastAPI(
    title="Smart Dashboard Kopi API",
    description="Backend untuk monitoring, manajemen, dan analisis data produksi kopi.",
    version="1.0.0"
)

# Event handlers untuk koneksi database
app.add_event_handler("startup", connect_to_db)
app.add_event_handler("shutdown", close_db_connection)

# Memasukkan semua router
app.include_router(authentication.router, tags=["Authentication"])
app.include_router(petani.router)
app.include_router(dashboard.router)
app.include_router(analysis.router)

@app.get("/", tags=["Root"])
async def read_root():
    """Endpoint root untuk mengecek status API."""
    return {"message": "Selamat datang di API Smart Dashboard Kopi."}