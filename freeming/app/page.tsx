import Hero from "@/components/Hero"
import MovieSection from "@/components/MovieSection"
import { getFeaturedMovies, getPopularMovies, getRecentMovies } from "@/lib/mockData"

export default function HomePage() {
  const featuredMovies = getFeaturedMovies()
  const popularMovies = getPopularMovies()
  const recentMovies = getRecentMovies()

  return (
    <div className="min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <MovieSection title="Filmes em Destaque" movies={featuredMovies} showAll={false} />

        <MovieSection title="Populares" movies={popularMovies} showAll={false} />

        <MovieSection title="Lançamentos Recentes" movies={recentMovies} showAll={false} />
      </div>
    </div>
  )
}
