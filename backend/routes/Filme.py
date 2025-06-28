from typing import Any, Coroutine
import random
import httpx
from fastapi import APIRouter, HTTPException, FastAPI
from dto.VideoEmbedResponse import VideoEmbedResponse

domains = ["vidsrc.xyz", "vidsrc.in", "vidsrc.net", "vidsrc.pm"]

VIDSRC_BASE_URL = f"https://{random.choice(domains)}/embed/movie?tmdb="

app = FastAPI()
router_filme = APIRouter(
    prefix="/filme",
    tags=["Filme"],
    responses={404: {"description": "Not found"}}
)

@router_filme.get("/embed/{tmdb_id}", response_model=VideoEmbedResponse)
async def get_movie_embed(tmdb_id: int) -> str:
    """
    Obtém o link de embed de um filme usando o ID do TMDb.
    """
    embed_url = f"{VIDSRC_BASE_URL}{tmdb_id}"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.head(embed_url, follow_redirects=True, timeout=5.0)
            response.raise_for_status()
    except httpx.RequestError:
        raise HTTPException(
            status_code=404,
            detail="A fonte do vídeo está indisponível ou não foi encontrada (erro de rede)."
        )
    except httpx.HTTPStatusError as exc:
        raise HTTPException(
            status_code=404,
            detail=f"O vídeo para o ID {tmdb_id} não foi encontrado na fonte (status: {exc.response.status_code})."
        )

    return embed_url

app.include_router(router_filme)