from typing import List
from pydantic import BaseModel, Field


class Experiencia(BaseModel):
    empresa: str
    cargo: str
    inicio: str
    fim: str
    descricao: str


class Formacao(BaseModel):
    curso: str
    instituicao: str
    ano: int


class Projeto(BaseModel):
    titulo: str
    link: str
    descricao: str


class Idioma(BaseModel):
    idioma: str
    nivel: str


class ProfissionalBase(BaseModel):
    nome: str
    foto: str
    cargo: str
    resumo: str
    localizacao: str
    area: str
    habilidadesTecnicas: List[str]
    softSkills: List[str]
    experiencias: List[Experiencia]
    formacao: List[Formacao]
    projetos: List[Projeto]
    certificacoes: List[str]
    idiomas: List[Idioma]
    areaInteresses: List[str]


class ProfissionalCreate(ProfissionalBase):
    pass


class Profissional(ProfissionalBase):
    id: int = Field(..., description="Identificador único do perfil")
    recomendacoes: int = 0

    class Config:
        orm_mode = True


class MessageCreate(BaseModel):
    profissional_id: int
    remetente: str
    conteudo: str


class Message(MessageCreate):
    id: str
