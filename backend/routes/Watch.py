from rich.pretty import Pretty

from dto.VideoEmbedResponse import VideoEmbedResponse
from .Filme import get_movie_embed
from .Filmes import search_movie
import asyncio
from rich import print
import random
from fastapi import APIRouter, HTTPException, FastAPI

app = FastAPI()
router_watch = APIRouter(
    prefix="/watch",
    tags=["Watch"],
    responses={404: {"description": "Route not found"}}
)

domains = ["vidsrc.xyz", "vidsrc.in", "vidsrc.net", "vidsrc.pm"]

VIDSRC_BASE_URL = f"https://{random.choice(domains)}/embed/movie?tmdb="


@router_watch.get("/search/{query}")
async def search_watch(query: str) -> dict[int, VideoEmbedResponse]:
    """
    Busca o filme pelo título no TMDb e retorna informações de embed.
    :param query: string
    :return:
    """
    try:
        dados = await search_movie(query)
        if not dados:
            raise HTTPException(status_code=404, detail="Nenhum filme encontrado.")

        response = {}
        r_id = 0
        for dado in dados:
            print(Pretty(dado))
            tmdb_id = dado['id']
            model = VideoEmbedResponse(
                id=tmdb_id,
                title=dado['title'] or "Título não disponível",
                poster_url = dado.get('poster_url') or "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjNwitOkVehY1hzubk6LHbM6T4JLxZ-VXYJG1ufypJiFosTCUdOTkXVpUo2wfGc2nlY3Q&usqp=CAU",
                description=dado.get('overview', "Descrição não disponível"),
                release_date=dado.get('release_date', "Data de lançamento não disponível"),
                embed_url=f"{VIDSRC_BASE_URL}{tmdb_id}" or "Embed URL não disponível"
            )
            response[r_id] = model
            r_id += 1

        return response

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Erro ao buscar informações: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar informações: {str(e)}")

app.include_router(router_watch)
