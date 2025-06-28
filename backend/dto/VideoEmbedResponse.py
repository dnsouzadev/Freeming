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