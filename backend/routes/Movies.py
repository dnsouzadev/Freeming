from rich.pretty import Pretty
from dto.VideoEmbedResponse import VideoEmbedResponse
import asyncio
from rich import print
import random
import httpx
import os
from fastapi import APIRouter, HTTPException, FastAPI

app = FastAPI()
router_movies = APIRouter(
    prefix="/movies",
    tags=["Movies"],
    responses={404: {"description": "Route not found"}}
)

# Configuração da API do TMDB
TMDB_API_KEY = os.getenv("TMDB_API_KEY", "sua_api_key_aqui")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

domains = ["vidsrc.xyz", "vidsrc.in", "vidsrc.net", "vidsrc.pm"]


# Função auxiliar para fazer requisições à API do TMDB
async def make_tmdb_request(endpoint: str, params: dict = None) -> dict:
    """
    Faz uma requisição para a API do TMDB
    """
    if params is None:
        params = {}

    params["api_key"] = TMDB_API_KEY
    params["language"] = "pt-BR"

    url = f"{TMDB_BASE_URL}/{endpoint}"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Erro ao consultar TMDB: {str(e)}")


# Função para processar os dados do filme
def process_movie_data(movie_data: dict) -> VideoEmbedResponse:
    """
    Processa os dados do filme para o formato VideoEmbedResponse
    """
    tmdb_id = movie_data['id']
    poster_path = movie_data.get('poster_path')
    poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjNwitOkVehY1hzubk6LHbM6T4JLxZ-VXYJG1ufypJiFosTCUdOTkXVpUo2wfGc2nlY3Q&usqp=CAU"

    VIDSRC_BASE_URL = f"https://{random.choice(domains)}/embed/movie?tmdb="

    return VideoEmbedResponse(
        id=tmdb_id,
        title=movie_data.get('title') or "Título não disponível",
        poster_url=poster_url,
        description=movie_data.get('overview', "Descrição não disponível"),
        release_date=movie_data.get('release_date', "Data de lançamento não disponível"),
        embed_url=f"{VIDSRC_BASE_URL}{tmdb_id}"
    )


@router_movies.get("/trending")
async def get_trending_movies() -> dict[int, VideoEmbedResponse]:
    """
    Busca filmes em destaque (trending) no TMDb.
    :return: dict com filmes em destaque
    """
    try:
        dados = await make_tmdb_request("trending/movie/day", {"page": 1})

        if not dados.get('results'):
            raise HTTPException(status_code=404, detail="Nenhum filme em destaque encontrado.")

        response = {}
        r_id = 0

        for movie in dados['results']:
            print(Pretty(movie))
            model = process_movie_data(movie)
            response[r_id] = model
            r_id += 1

        return response

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Erro ao buscar filmes em destaque: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar filmes em destaque: {str(e)}")


@router_movies.get("/popular")
async def get_popular_movies() -> dict[int, VideoEmbedResponse]:
    """
    Busca filmes populares no TMDb.
    :return: dict com filmes populares
    """
    try:
        dados = await make_tmdb_request("movie/popular", {"page": 1})

        if not dados.get('results'):
            raise HTTPException(status_code=404, detail="Nenhum filme popular encontrado.")

        response = {}
        r_id = 0

        for movie in dados['results']:
            print(Pretty(movie))
            model = process_movie_data(movie)
            response[r_id] = model
            r_id += 1

        return response

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Erro ao buscar filmes populares: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar filmes populares: {str(e)}")


@router_movies.get("/now-playing")
async def get_now_playing_movies() -> dict[int, VideoEmbedResponse]:
    """
    Busca filmes em cartaz no TMDb.
    :return: dict com filmes em cartaz
    """
    try:
        dados = await make_tmdb_request("movie/now_playing", {"page": 1})

        if not dados.get('results'):
            raise HTTPException(status_code=404, detail="Nenhum filme em cartaz encontrado.")

        response = {}
        r_id = 0

        for movie in dados['results']:
            print(Pretty(movie))
            model = process_movie_data(movie)
            response[r_id] = model
            r_id += 1

        return response

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Erro ao buscar filmes em cartaz: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar filmes em cartaz: {str(e)}")


@router_movies.get("/top-rated")
async def get_top_rated_movies() -> dict[int, VideoEmbedResponse]:
    """
    Busca filmes com melhor avaliação no TMDb.
    :return: dict com filmes mais bem avaliados
    """
    try:
        dados = await make_tmdb_request("movie/top_rated", {"page": 1})

        if not dados.get('results'):
            raise HTTPException(status_code=404, detail="Nenhum filme bem avaliado encontrado.")

        response = {}
        r_id = 0

        for movie in dados['results']:
            print(Pretty(movie))
            model = process_movie_data(movie)
            response[r_id] = model
            r_id += 1

        return response

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Erro ao buscar filmes bem avaliados: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar filmes bem avaliados: {str(e)}")


@router_movies.get("/upcoming")
async def get_upcoming_movies() -> dict[int, VideoEmbedResponse]:
    """
    Busca filmes que serão lançados no TMDb.
    :return: dict com próximos lançamentos
    """
    try:
        dados = await make_tmdb_request("movie/upcoming", {"page": 1})

        if not dados.get('results'):
            raise HTTPException(status_code=404, detail="Nenhum lançamento encontrado.")

        response = {}
        r_id = 0

        for movie in dados['results']:
            print(Pretty(movie))
            model = process_movie_data(movie)
            response[r_id] = model
            r_id += 1

        return response

    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Erro ao buscar próximos lançamentos: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar próximos lançamentos: {str(e)}")


@router_movies.get("/dashboard")
async def get_movies_dashboard() -> dict[str, dict[int, VideoEmbedResponse]]:
    """
    Busca filmes de múltiplas categorias para dashboard.
    :return: dict com diferentes categorias de filmes
    """
    try:
        # Fazendo requisições paralelas
        async with httpx.AsyncClient() as client:
            params = {"api_key": TMDB_API_KEY, "language": "pt-BR", "page": 1}

            # Requisições paralelas
            trending_task = client.get(f"{TMDB_BASE_URL}/trending/movie/day", params=params)
            popular_task = client.get(f"{TMDB_BASE_URL}/movie/popular", params=params)
            now_playing_task = client.get(f"{TMDB_BASE_URL}/movie/now_playing", params=params)
            top_rated_task = client.get(f"{TMDB_BASE_URL}/movie/top_rated", params=params)

            # Aguardando todas as respostas
            trending_response = await trending_task
            popular_response = await popular_task
            now_playing_response = await now_playing_task
            top_rated_response = await top_rated_task

            # Processando os dados
            trending_data = trending_response.json()
            popular_data = popular_response.json()
            now_playing_data = now_playing_response.json()
            top_rated_data = top_rated_response.json()

            # Função para processar uma lista de filmes
            def process_movies_list(movies_list: list) -> dict[int, VideoEmbedResponse]:
                response = {}
                for r_id, movie in enumerate(movies_list):
                    model = process_movie_data(movie)
                    response[r_id] = model
                return response

            dashboard_response = {
                "trending": process_movies_list(trending_data.get('results', [])),
                "popular": process_movies_list(popular_data.get('results', [])),
                "now_playing": process_movies_list(now_playing_data.get('results', [])),
                "top_rated": process_movies_list(top_rated_data.get('results', []))
            }

            return dashboard_response

    except Exception as e:
        print(f"Erro ao buscar dashboard: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dashboard: {str(e)}")


app.include_router(router_movies)