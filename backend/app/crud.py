from typing import List, Optional
from pymongo.collection import Collection
from .models import Profissional, ProfissionalCreate, Message, MessageCreate


def _normalize_profissional(doc: dict) -> Profissional:
    return Profissional(
        id=doc["id"],
        nome=doc["nome"],
        foto=doc["foto"],
        cargo=doc["cargo"],
        resumo=doc["resumo"],
        localizacao=doc["localizacao"],
        area=doc["area"],
        habilidadesTecnicas=doc.get("habilidadesTecnicas", []),
        softSkills=doc.get("softSkills", []),
        experiencias=doc.get("experiencias", []),
        formacao=doc.get("formacao", []),
        projetos=doc.get("projetos", []),
        certificacoes=doc.get("certificacoes", []),
        idiomas=doc.get("idiomas", []),
        areaInteresses=doc.get("areaInteresses", []),
        recomendacoes=doc.get("recomendacoes", 0),
    )


def listar_profissionais(
    collection: Collection,
    area: Optional[str] = None,
    cidade: Optional[str] = None,
    tecnologia: Optional[str] = None,
    busca: Optional[str] = None,
) -> List[Profissional]:
    filtro: dict = {}

    if area:
        filtro["area"] = area

    if cidade:
        filtro["localizacao"] = {"$regex": cidade, "$options": "i"}

    if tecnologia:
        filtro["habilidadesTecnicas"] = {"$in": [tecnologia]}

    if busca:
        filtro["$or"] = [
            {"nome": {"$regex": busca, "$options": "i"}},
            {"resumo": {"$regex": busca, "$options": "i"}},
            {"cargo": {"$regex": busca, "$options": "i"}},
        ]

    docs = collection.find(filtro).sort("id", 1)

    profissionais: List[Profissional] = []
    for doc in docs:
        profissionais.append(_normalize_profissional(doc))

    return profissionais


def obter_profissional_por_id(collection: Collection, profissional_id: int) -> Optional[Profissional]:
    doc = collection.find_one({"id": profissional_id})
    if not doc:
        return None
    return _normalize_profissional(doc)


def criar_profissional(collection: Collection, payload: ProfissionalCreate) -> Profissional:
    last = collection.find_one(sort=[("id", -1)])
    next_id = 1
    if last:
        next_id = int(last["id"]) + 1

    data = payload.model_dump()
    data["id"] = next_id
    data.setdefault("recomendacoes", 0)
    collection.insert_one(data)
    return _normalize_profissional(data)


def recomendar_profissional(collection: Collection, profissional_id: int) -> Optional[Profissional]:
    doc = collection.find_one({"id": profissional_id})
    if not doc:
        return None

    recomendacoes_atual = int(doc.get("recomendacoes", 0))
    recomendacoes_atual += 1

    collection.update_one(
        {"id": profissional_id},
        {"$set": {"recomendacoes": recomendacoes_atual}},
    )
    doc["recomendacoes"] = recomendacoes_atual
    return _normalize_profissional(doc)


def criar_mensagem(collection: Collection, payload: MessageCreate) -> Message:
    data = payload.model_dump()
    result = collection.insert_one(data)
    data["id"] = str(result.inserted_id)
    return Message(**data)
