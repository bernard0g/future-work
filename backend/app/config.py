import os
from functools import lru_cache

from dotenv import load_dotenv
from pydantic import BaseModel


load_dotenv()


class Settings(BaseModel):
    mongodb_uri: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    mongodb_db: str = os.getenv("MONGODB_DB", "gs_future_work")


@lru_cache
def get_settings() -> Settings:
    return Settings()
