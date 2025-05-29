import Link from "next/link"
import Image from "next/image"

interface AnimeCardProps {
  id: string
  title: string
  slug: string
  imageUrl: string
  description: string
  episode?: string
  type?: "regular" | "featured"
}

export default function AnimeCard({ 
  title, 
  slug, 
  imageUrl, 
  description, 
  episode,
  type = "regular" 
}: AnimeCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 ${
      type === "featured" ? "col-span-full md:col-span-2" : ""
    }`}>
      <Link href={`/donghua/${slug}`}>
        <div className="relative">
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {episode && (
            <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-sm">
              Episode {episode}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          <div className="mt-4">
            <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
              Tonton Sekarang
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
