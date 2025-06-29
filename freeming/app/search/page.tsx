"use client"

import { useCallback, useState } from "react"
import DetailsModal from "@/components/DetailsModal"
import MovieCard from "@/components/MovieCard"
import PlayerModal from "@/components/PlayerModal"
import SearchBar from "@/components/SearchBar"

interface Movie {
  id: string
  title: string
  poster_url: string
  release_date: string
  description: string
  embed_url: string
}

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true)
    setError("")
    setSearched(true)
    setMovies([])

    const searchUrl = `http://localhost:8000/watch/search/${encodeURIComponent(query)}`

    try {
      const response = await fetch(searchUrl)
      if (!response.ok) throw new Error("Falha na resposta da API")
      const data = await response.json()
      const results = Object.values(data) as Movie[]
      if (results.length > 0) {
        setMovies(results)
      } else {
        setMovies([])
      }
    } catch (err) {
      setError("Ocorreu um erro ao buscar o filme. Tente novamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleCardClick = (movie: Movie) => {
    setSelectedMovie(movie)
    setIsDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false)
    setIsPlayerOpen(false)
    setSelectedMovie(null)
  }

  const handlePlayClick = () => {
    setIsPlayerOpen(true)
  }

  const handleClosePlayer = () => {
    setIsPlayerOpen(false)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Buscar Filmes</h1>
          <p className="text-gray-400 text-lg">Encontre seus filmes favoritos</p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-12">
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          )}

          {!isLoading && !error && searched && movies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum filme encontrado com esse nome.</p>
            </div>
          )}

          {!isLoading && !error && !searched && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Comece buscando por um filme no campo acima.</p>
            </div>
          )}

          {movies.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onCardClick={handleCardClick} />
              ))}
            </div>
          )}
        </div>
      </div>

      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        movie={selectedMovie}
        onPlayClick={handlePlayClick}
      />

      {selectedMovie && (
        <PlayerModal isOpen={isPlayerOpen} onClose={handleClosePlayer} videoUrl={selectedMovie.embed_url} />
      )}
    </div>
  )
}
