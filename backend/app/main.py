from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pymongo.collection import Collection

from .database import get_collection
from .models import Profissional, ProfissionalCreate, Message, MessageCreate
from . import crud
from .seed_data import seed_profissionais


app = FastAPI(
    title="API - Future.WORK",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_professionals_collection() -> Collection:
    return get_collection("professionals")


def get_messages_collection() -> Collection:
    return get_collection("messages")


@app.on_event("startup")
def on_startup() -> None:
    seed_profissionais()


@app.get("/api/professionals", response_model=List[Profissional])
def listar_profissionais_endpoint(
    area: Optional[str] = Query(None),
    cidade: Optional[str] = Query(None),
    tecnologia: Optional[str] = Query(None),
    busca: Optional[str] = Query(None),
    collection: Collection = Depends(get_professionals_collection),
) -> List[Profissional]:
    return crud.listar_profissionais(
        collection=collection,
        area=area,
        cidade=cidade,
        tecnologia=tecnologia,
        busca=busca,
    )


@app.get("/api/professionals/{profissional_id}", response_model=Profissional)
def obter_profissional_endpoint(
    profissional_id: int,
    collection: Collection = Depends(get_professionals_collection),
) -> Profissional:
    profissional = crud.obter_profissional_por_id(collection, profissional_id)
    if not profissional:
        raise HTTPException(status_code=404, detail="Profissional não encontrado.")
    return profissional


@app.post("/api/professionals", response_model=Profissional, status_code=201)
def criar_profissional_endpoint(
    payload: ProfissionalCreate,
    collection: Collection = Depends(get_professionals_collection),
) -> Profissional:
    return crud.criar_profissional(collection, payload)


@app.post("/api/professionals/{profissional_id}/recommend", response_model=Profissional)
def recomendar_profissional_endpoint(
    profissional_id: int,
    collection: Collection = Depends(get_professionals_collection),
) -> Profissional:
    profissional = crud.recomendar_profissional(collection, profissional_id)
    if not profissional:
        raise HTTPException(status_code=404, detail="Profissional não encontrado.")
    return profissional


@app.post("/api/messages", response_model=Message, status_code=201)
def enviar_mensagem_endpoint(
    payload: MessageCreate,
    collection: Collection = Depends(get_messages_collection),
) -> Message:
    if payload.profissional_id <= 0:
        raise HTTPException(status_code=400, detail="Profissional inválido.")
    return crud.criar_mensagem(collection, payload)


@app.get("/health")
def healthcheck() -> dict:
    return {"status": "ok"}
