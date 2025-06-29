"use client"

import { useState } from "react"
import MovieCard from "./MovieCard"
import DetailsModal from "./DetailsModal"
import PlayerModal from "./PlayerModal"
import { ChevronRight } from "lucide-react"

interface Movie {
  id: string
  title: string
  poster_url: string
  release_date: string
  description: string
  embed_url: string
}

interface MovieSectionProps {
  title: string
  movies: Movie[]
  showAll?: boolean
}

export default function MovieSection({ title, movies, showAll = false }: MovieSectionProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const displayMovies = showAll ? movies : movies.slice(0, 5)

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
        {!showAll && movies.length > 5 && (
          <button className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors">
            <span>Ver todos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {displayMovies.map((movie, index) => (
          <div key={movie.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <MovieCard movie={movie} onCardClick={handleCardClick} />
          </div>
        ))}
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
    </section>
  )
}
