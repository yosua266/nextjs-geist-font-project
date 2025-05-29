import AnimeCard from "./AnimeCard"

interface Anime {
  id: string
  title: string
  slug: string
  imageUrl: string
  description: string
  episode?: string
}

interface AnimeGridProps {
  title: string
  animeList: Anime[]
  type?: "regular" | "featured"
}

export default function AnimeGrid({ title, animeList, type = "regular" }: AnimeGridProps) {
  if (!animeList || animeList.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Tidak ada donghua yang tersedia saat ini.</p>
      </div>
    )
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className={`grid gap-6 ${
          type === "featured" 
            ? "grid-cols-1 md:grid-cols-2" 
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}>
          {animeList.map((anime) => (
            <AnimeCard
              key={anime.id}
              {...anime}
              type={type}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
