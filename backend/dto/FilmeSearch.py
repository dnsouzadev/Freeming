from typing import Optional

from pydantic import BaseModel, Field


class FilmeSearch(BaseModel):
    """"Modelo de dados para a pesquisa de filmes."""
    id: int
    titulo: str = Field(alias="title", description="Título original do filme")
    poster_url: Optional[str] = None
    sinopse: Optional[str] = Field(alias="overview", description="Sinopse do filme")
    data_de_lancamento: str = Field(alias="release_date", description="Data de lançamento do filme")

    class Config:
        populate_by_name = True