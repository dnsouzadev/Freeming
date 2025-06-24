from pydantic import BaseModel


class VideoEmbedResponse(BaseModel):
    embed_url: str
    id: int
    title: str
    poster_url: str
    description: str
    release_date: str

    class Config:
        populate_by_name = True
        schema_extra = {
            "example": {
                "embed_url": "https://vidsrc.xyz/embed/movie?tmdb=12345",
                "id": 12345,
                "title": "Exemplo de Filme",
                "poster_url": "https://image.tmdb.org/t/p/w500/example_poster.jpg",
                "description": "Uma breve descrição do filme.",
                "release_date": "2023-10-01"
            }
        }