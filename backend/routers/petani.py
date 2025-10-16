from fastapi import APIRouter, Depends, HTTPException
from typing import List
from .. import crud, schemas, auth

router = APIRouter(
    prefix="/petani",
    tags=["Petani"],
    dependencies=[Depends(auth.get_current_user)] # Melindungi semua rute di file ini
)

@router.post("/", response_model=schemas.Petani)
async def add_petani_data(petani: schemas.PetaniCreate):
    """Menambah data petani baru."""
    return await crud.create_petani(petani)

@router.get("/", response_model=List[schemas.Petani])
async def read_all_petani(skip: int = 0, limit: int = 100):
    """Membaca semua data petani."""
    return await crud.get_all_petani(skip, limit)

@router.get("/{petani_id}", response_model=schemas.Petani)
async def read_petani_by_id(petani_id: int):
    """Membaca satu data petani berdasarkan ID."""
    db_petani = await crud.get_petani_by_id(petani_id)
    if db_petani is None:
        raise HTTPException(status_code=404, detail="Petani not found")
    return db_petani

@router.put("/{petani_id}", response_model=schemas.Petani)
async def update_petani_data(petani_id: int, petani: schemas.PetaniCreate):
    """Mengupdate data petani."""
    return await crud.update_petani(petani_id, petani)

@router.delete("/{petani_id}")
async def delete_petani_data(petani_id: int):
    """Menghapus data petani."""
    return await crud.delete_petani(petani_id)