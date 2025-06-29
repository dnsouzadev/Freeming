"use client"

import { Play } from "lucide-react"

interface Movie {
  id: string
  title: string
  poster_url: string
  release_date: string
  description: string
  embed_url: string
}

interface MovieCardProps {
  movie: Movie
  onCardClick: (movie: Movie) => void
}

export default function MovieCard({ movie, onCardClick }: MovieCardProps) {
  const { title, poster_url, release_date } = movie
  const releaseYear = release_date ? new Date(release_date).getFullYear() : "N/A"

  return (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => onCardClick(movie)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={poster_url || "/placeholder.svg"}
            alt={`Pôster de ${title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Play className="w-8 h-8 text-white" fill="white" />
            </div>
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 mb-1">{title}</h3>
          <p className="text-gray-300 text-xs md:text-sm">{releaseYear}</p>
        </div>
      </div>
    </div>
  )
}
