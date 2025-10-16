from typing import List
from .database import database
from .schemas import PetaniCreate

TABLE_NAME = "petani"

async def get_all_petani(skip: int = 0, limit: int = 100) -> List:
    """Mengambil semua data petani dengan paginasi."""
    query = f'SELECT * FROM {TABLE_NAME} ORDER BY "NO" LIMIT :limit OFFSET :skip'
    return await database.fetch_all(query, values={"limit": limit, "skip": skip})

async def get_petani_by_no(petani_no: int):
    """Mengambil satu data petani berdasarkan 'NO' (Primary Key)."""
    query = f'SELECT * FROM {TABLE_NAME} WHERE "NO" = :no'
    return await database.fetch_one(query, values={"no": petani_no})

async def create_petani(petani: PetaniCreate):
    """
    Menambahkan data petani baru. "NO" tidak dimasukkan, database akan membuatnya.
    """
    petani_dict = petani.dict(by_alias=True)

    columns = [f'"{col}"' for col in petani_dict.keys()]
    placeholders = [f':{col.replace(" ", "_").replace("(", "").replace(")", "").replace("/", "_")}' for col in petani_dict.keys()]
    values_for_query = {ph.strip(':'): val for ph, val in zip(placeholders, petani_dict.values())}

    # Query ini secara eksplisit meminta 'NO' yang baru dibuat kembali
    query = f"""
        INSERT INTO {TABLE_NAME} ({', '.join(columns)}) 
        VALUES ({', '.join(placeholders)})
        RETURNING "NO"
    """
    
    new_petani_no = await database.fetch_val(query, values=values_for_query)
    
    return {**petani_dict, "NO": new_petani_no}


async def update_petani(petani_no: int, petani: PetaniCreate):
    """Mengupdate data petani."""
    petani_dict = petani.dict(by_alias=True)
    
    # Hapus PK dari dict agar tidak diupdate
    petani_dict.pop('NO', None)

    update_fields = [f'"{col}" = :{col.replace(" ", "_").replace("(", "").replace(")", "").replace("/", "_")}' for col in petani_dict.keys()]
    
    # Membuat 'safe' values dictionary
    values_for_query = {ph.split(' = ')[1].strip(':'): val for ph, val in zip(update_fields, petani_dict.values())}
    values_for_query['no'] = petani_no

    query = f"""
        UPDATE {TABLE_NAME} SET {', '.join(update_fields)}
        WHERE "NO" = :no
    """
    
    await database.execute(query, values=values_for_query)
    return {**petani_dict, "NO": petani_no}

async def delete_petani(petani_no: int):
    """Menghapus data petani."""
    query = f'DELETE FROM {TABLE_NAME} WHERE "NO" = :no'
    await database.execute(query, values={"no": petani_no})
    return {"status": "deleted", "NO": petani_no}