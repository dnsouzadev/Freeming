from fastapi import FastAPI
from routes.Filmes import router
from routes.Filme import router_filme


# Inicializa a aplicação FastAPI
app = FastAPI(
    title="Meu Stremio Legal API",
    description="Uma API para buscar informações de filmes de fontes legais."
)

app.include_router(router)
app.include_router(router_filme)


if __name__ == "__main__":
    import uvicorn
    # Inicia o servidor FastAPI na porta 8000
    uvicorn.run(app, host="0.0.0", port=8000)