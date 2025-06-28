from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.Filmes import router
from routes.Filme import router_filme
from routes.Watch import router_watch

# Inicializa a aplicação FastAPI
app = FastAPI(
    title="Meu Stremio Legal API",
    description="Uma API para buscar informações de filmes de fontes legais."
)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(router_filme)
app.include_router(router_watch)

if __name__ == "__main__":
    import uvicorn
    # Inicia o servidor FastAPI na porta 8000
    uvicorn.run(app, host="0.0.0", port=8000)