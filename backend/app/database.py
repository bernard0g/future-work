from typing import Any
from pymongo import MongoClient
from .config import get_settings

settings = get_settings()

client = MongoClient(settings.mongodb_uri)
db = client[settings.mongodb_db]


def get_collection(name: str) -> Any:
    return db[name]
