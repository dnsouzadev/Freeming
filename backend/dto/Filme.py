from typing import Optional

from pydantic import BaseModel, Field


class Filme(BaseModel):
    """Modelo de dados para um filme."""
    id: int
    titulo: str = Field(alias="title", description="Título do filme")
    sinopse: Optional[str] = Field(alias="overview", description="Sinopse do filme")
    data_de_lancamento: str = Field(alias="release_date", description="Data de lançamento do filme")
    poster_url: Optional[str] = None

    class Config:
        populate_by_name = True