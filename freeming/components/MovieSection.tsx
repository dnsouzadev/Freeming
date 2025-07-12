"use client"

import { useEffect, useState } from "react"
import DetailsModal from "./DetailsModal"
import MovieCard from "./MovieCard"
import PlayerModal from "./PlayerModal"

// swiper imports
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

interface Movie {
  id: string
  title: string
  poster_url: string
  release_date: string
  description: string
  embed_url: string
}

interface ApiMovie {
  id: number | string
  title: string
  poster_url: string
  release_date: string
  overview: string
  embed_url?: string
}

interface MovieSectionProps {
  title: string
  showAll?: boolean
}

export default function MovieSection({ title, showAll = false }: MovieSectionProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:8000/filmes/popular")
        if (!res.ok) throw new Error("Erro ao buscar filmes populares")
        const data = await res.json()
        const moviesData = (data as ApiMovie[]).map((movie) => ({
          id: String(movie.id),
          title: movie.title,
          poster_url: movie.poster_url,
          release_date: movie.release_date,
          description: movie.overview,
          embed_url: movie.embed_url ?? "",
        }))
        setMovies(moviesData)
      } catch (err) {
        setError("Erro ao carregar filmes populares.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [])

  const displayMovies = showAll ? movies : movies.slice(0, 20) // Mostra até 20 no carrossel

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
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
        {/* Você pode ativar o "Ver todos" se quiser */}
        {/* {!showAll && movies.length > 5 && (
          <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors">
            <span>Ver todos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )} */}
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={18}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="mb-6"
        >
          {displayMovies.map((movie, idx) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} onCardClick={handleCardClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        movie={selectedMovie}
        onPlayClick={handlePlayClick}
      />

      {selectedMovie && (
        <PlayerModal isOpen={isPlayerOpen} onClose={handleClosePlayer} videoUrl={selectedMovie.embed_url} />
      )}
    </section>
  )
}
