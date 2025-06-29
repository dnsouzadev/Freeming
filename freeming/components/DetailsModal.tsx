"use client"

import { X, Play, Calendar, Clock } from "lucide-react"

interface Movie {
  id: string
  title: string
  poster_url: string
  release_date: string
  description: string
  embed_url: string
}

interface DetailsModalProps {
  isOpen: boolean
  onClose: () => void
  movie: Movie | null
  onPlayClick: () => void
}

export default function DetailsModal({ isOpen, onClose, movie, onPlayClick }: DetailsModalProps) {
  if (!isOpen || !movie) {
    return null
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : ""

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Background image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={movie.poster_url || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative -mt-20 px-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={movie.poster_url || "/placeholder.svg"}
                alt={movie.title}
                className="w-32 md:w-48 rounded-lg shadow-lg"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{movie.title}</h1>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{releaseYear}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>2h 15min</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">{movie.description}</p>

              <button
                onClick={onPlayClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Play className="w-5 h-5" fill="white" />
                <span>Assistir Agora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
