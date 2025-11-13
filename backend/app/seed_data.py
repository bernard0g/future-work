import json
from pathlib import Path
from .database import get_collection

ROOT_DIR = Path(__file__).resolve().parents[2]
DATA_PATH = ROOT_DIR / "frontend" / "src" / "data" / "profissionais.json"


def seed_profissionais() -> None:
    collection = get_collection("professionals")

    if collection.count_documents({}) > 0:
        return

    if not DATA_PATH.exists():
        return

    with DATA_PATH.open(encoding="utf-8") as f:
        data = json.load(f)

    for profissional in data:
        profissional.setdefault("recomendacoes", 0)
        collection.insert_one(profissional)


if __name__ == "__main__":
    seed_profissionais()
    print("Base de profissionais criada com sucesso.")
