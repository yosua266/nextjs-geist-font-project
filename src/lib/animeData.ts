export interface Anime {
  id: string
  title: string
  slug: string
  imageUrl: string
  description: string
  episode?: string
  genres: string[]
  status: "Ongoing" | "Completed"
  rating: number
  releaseYear: number
  totalEpisodes?: number
}

export const featuredAnime: Anime[] = [
  {
    id: "1",
    title: "Left-Hand Layup!",
    slug: "left-hand-layup",
    imageUrl: "https://anichin.mov/wp-content/uploads/2022/12/Throne-of-Seal.webp",
    description: "Ini terutama bercerita tentang Xu Xingze, seorang remaja SMA yang bertemu dengan sekelompok rekannya. Mereka saling menemani dan bekerja sama satu sama lain karena kecintaan mereka pada bola basket.",
    genres: ["Sports", "School", "Drama"],
    status: "Ongoing",
    rating: 8.5,
    releaseYear: 2024,
    totalEpisodes: 12
  },
  {
    id: "2",
    title: "Jade Dynasty",
    slug: "jade-dynasty",
    imageUrl: "https://anichin.mov/wp-content/uploads/2022/12/Throne-of-Seal.webp",
    description: "Zhang Xiaofan, yang menjadi yatim piatu dalam semalam, diterima sebagai murid Sekte Qingyun. Setelah lima tahun berkultivasi dengan keras, ia unggul dalam Turnamen Tujuh Meridian dari murid lainnya.",
    genres: ["Action", "Fantasy", "Martial Arts"],
    status: "Ongoing",
    rating: 8.8,
    releaseYear: 2024,
    totalEpisodes: 24
  }
]

export const latestReleases: Anime[] = [
  {
    id: "3",
    title: "Throne of Seal",
    slug: "throne-of-seal",
    imageUrl: "https://anichin.mov/wp-content/uploads/2022/12/Throne-of-Seal.webp",
    description: "Manusia melawan invasi ras iblis yang dipimpin oleh 72 Dewa Iblis. Enam ribu tahun lalu, kejayaan manusia berakhir akibat serangan tersebut.",
    episode: "161",
    genres: ["Action", "Fantasy", "Supernatural"],
    status: "Ongoing",
    rating: 9.2,
    releaseYear: 2024
  },
  {
    id: "4",
    title: "Renegade Immortal",
    slug: "renegade-immortal",
    imageUrl: "https://anichin.mov/wp-content/uploads/2023/09/Renegade-Immortal-Subtitle-Indonesia.webp",
    description: "Wang Lin adalah anak yang sangat cerdas dengan orang tua yang penuh kasih. Meskipun dia dan orang tuanya dijauhi oleh anggota keluarga mereka yang lain.",
    episode: "90",
    genres: ["Action", "Adventure", "Fantasy"],
    status: "Ongoing",
    rating: 8.8,
    releaseYear: 2023
  },
  {
    id: "5",
    title: "Battle Through the Heavens Season 5",
    slug: "battle-through-the-heavens-season-5",
    imageUrl: "https://anichin.mov/wp-content/uploads/2022/12/BTTH-Season-5-Subtitle-Indonesia.webp",
    description: "Setelah tiga tahun tidak bertemu, Xiao Yan akhirnya bertemu Xun'er di Akademi Jia Nan. Setelah itu, mereka menjadi lebih dekat.",
    episode: "148",
    genres: ["Action", "Adventure", "Fantasy"],
    status: "Ongoing",
    rating: 9.2,
    releaseYear: 2023
  },
  {
    id: "6",
    title: "Stellar Transformation Season 6",
    slug: "stellar-transformation-season-6",
    imageUrl: "https://anichin.mov/wp-content/uploads/2025/01/Stellar-Transformation-Season-6-Subtitle-Indonesia.webp",
    description: "Melanjutkan petualangan epik Qin Yu dalam dunia kultivasi yang penuh tantangan.",
    episode: "13",
    genres: ["Action", "Adventure", "Fantasy"],
    status: "Ongoing",
    rating: 8.5,
    releaseYear: 2024
  }
]

export const popularAnime: Anime[] = [
  {
    id: "7",
    title: "Perfect World",
    slug: "perfect-world",
    imageUrl: "https://anichin.mov/wp-content/uploads/2021/12/Perfect-World-Subtitle-Indonesia-2.webp",
    description: "Donghua yang diadaptasi dari novel dengan judul yang sama, mengikuti perjalanan seorang kultivator muda.",
    genres: ["Action", "Adventure", "Fantasy"],
    status: "Completed",
    rating: 8.0,
    releaseYear: 2023,
    totalEpisodes: 78
  },
  {
    id: "8",
    title: "Heaven Swallowing Record",
    slug: "heaven-swallowing-record",
    imageUrl: "https://anichin.mov/wp-content/uploads/2025/05/Heaven-Swallowing-Record-1.webp",
    description: "Seorang pemuda biasa yang bertransformasi menjadi Buddha abadi melalui jalur kultivasi yang penuh tantangan.",
    episode: "07",
    genres: ["Action", "Fantasy", "Supernatural"],
    status: "Ongoing",
    rating: 8.7,
    releaseYear: 2024
  }
]

export function getAnimeBySlug(slug: string): Anime | undefined {
  const allAnime = [...featuredAnime, ...latestReleases, ...popularAnime]
  return allAnime.find((anime) => anime.slug === slug)
}

export function getAllAnime(): Anime[] {
  return [...featuredAnime, ...latestReleases, ...popularAnime]
}

export function getRandomAnime(): Anime {
  const allAnime = getAllAnime()
  return allAnime[Math.floor(Math.random() * allAnime.length)]
}
