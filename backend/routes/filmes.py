from fastapi import APIRouter, HTTPException, FastAPI
import httpx
import os
from dotenv import load_dotenv
from dto.Filme import Filme

load_dotenv()

TMDB_API_TOKEN = os.getenv("API_TMDB_TOKEN")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

# Headers para autenticar nossas requisições no TMDb
HEADERS = {
    "accept": "application/json",
    "Authorization": f"Bearer {TMDB_API_TOKEN}"
}

app = FastAPI()
router = APIRouter(
    prefix="/filmes",
    tags=["Filmes"],
    responses={404: {"description": "Not found"}}
)


@router.get("/popular")
async def obter_filmes_populares() -> list[Filme]:
    """
    Busca os filmes mais populares do momento no TMDb.
    """
    # URL do endpoint do TMDb que queremos consultar
    endpoint = f"{TMDB_BASE_URL}/movie/popular?language=pt-BR&page=1"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(endpoint, headers=HEADERS)
            response.raise_for_status()
        except httpx.RequestError as exc:
            raise HTTPException(
                status_code=500,
                detail=f"Erro ao se comunicar com a API do TMDb: {exc}"
            )
        except httpx.HTTPStatusError as exc:
            raise HTTPException(
                status_code=exc.response.status_code,
                detail=f"Erro retornado pela API do TMDb: {exc.response.text}"
            )
    dados_brutos = response.json()
    filmes_populares = dados_brutos.get("results", [])

    filmes_processados = []

    for filme_bruto in filmes_populares:
        poster_path = filme_bruto.get("poster_path")
        filme_bruto['poster_url'] = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else None
        filmes_processados.append(filme_bruto)

    return filmes_processados

@router.get("/search/{query}")
async def search_movie(query: str):
    """
    Busca filmes pelo título no TMDb.
    """
    endpoint = f"{TMDB_BASE_URL}/search/movie?query={query}&language=pt-BR&page=1"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(endpoint, headers=HEADERS)
            response.raise_for_status()
        except httpx.RequestError as exc:
            raise HTTPException(
                status_code=500,
                detail=f"Erro ao se comunicar com a API do TMDb: {exc}"
            )
        except httpx.HTTPStatusError as exc:
            raise HTTPException(
                status_code=exc.response.status_code,
                detail=f"Erro retornado pela API do TMDb: {exc.response.text}"
            )

    return response.json()

# Adiciona o roteador de filmes à aplicação FastAPI
app.include_router(router)