"use client"

import { X } from "lucide-react"

interface PlayerModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
}

export default function PlayerModal({ isOpen, onClose, videoUrl }: PlayerModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-6xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video container */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={videoUrl}
            title="Movie Player"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
