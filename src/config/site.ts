export const siteConfig = {
  name: "DongPlay",
  description: "Platform streaming donghua dengan subtitle Indonesia terlengkap dan terpercaya",
  url: "https://dongplay.com",
  ogImage: "https://dongplay.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/dongplay",
    instagram: "https://instagram.com/dongplay",
    facebook: "https://facebook.com/dongplay",
  },
  creator: "DongPlay Team",
  keywords: [
    "donghua",
    "anime china",
    "streaming donghua",
    "subtitle indonesia",
    "nonton donghua",
    "anime streaming",
    "chinese animation",
  ],
  metaTags: {
    type: "website",
    locale: "id_ID",
    siteName: "DongPlay - Nonton Donghua Subtitle Indonesia",
  },
}

export const navigationConfig = {
  mainNav: [
    {
      title: "Beranda",
      href: "/",
    },
    {
      title: "Donghua",
      href: "/donghua",
    },
    {
      title: "Bookmark",
      href: "/bookmark",
    },
    {
      title: "Jadwal",
      href: "/jadwal",
    },
  ],
  footerNav: {
    resources: [
      { title: "Donghua Terbaru", href: "/donghua?sort=latest" },
      { title: "Donghua Populer", href: "/donghua?sort=popular" },
      { title: "Jadwal Rilis", href: "/jadwal" },
      { title: "Acak Donghua", href: "/random" },
    ],
    company: [
      { title: "Tentang Kami", href: "/about" },
      { title: "Kontak", href: "/contact" },
      { title: "Blog", href: "/blog" },
      { title: "Karir", href: "/careers" },
    ],
    legal: [
      { title: "Kebijakan Privasi", href: "/privacy" },
      { title: "Syarat & Ketentuan", href: "/terms" },
      { title: "DMCA", href: "/dmca" },
      { title: "FAQ", href: "/faq" },
    ],
  },
}

export const playerConfig = {
  defaultVolume: 1,
  autoplay: false,
  quality: {
    default: "720p",
    options: ["1080p", "720p", "480p", "360p"],
  },
  subtitles: {
    default: "id",
    options: [
      { code: "id", label: "Indonesia" },
      { code: "en", label: "English" },
    ],
  },
  shortcuts: {
    play: "k",
    fullscreen: "f",
    mute: "m",
    seekBackward: "j",
    seekForward: "l",
    volumeUp: "ArrowUp",
    volumeDown: "ArrowDown",
  },
}

export const paginationConfig = {
  itemsPerPage: 24,
  maxPageNumbers: 5,
}

export const imageConfig = {
  domains: ["anichin.mov", "dongplay.com"],
  formats: ["image/avif", "image/webp"],
  defaultQuality: 75,
  placeholders: {
    anime: "/images/placeholder-anime.jpg",
    avatar: "/images/placeholder-avatar.jpg",
    banner: "/images/placeholder-banner.jpg",
  },
}

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.dongplay.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}

export const analyticsConfig = {
  googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
  facebookPixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
}

export const cacheConfig = {
  staleTime: 60 * 1000, // 1 minute
  cacheDuration: 24 * 60 * 60 * 1000, // 24 hours
  revalidateInterval: 60 * 60, // 1 hour
}

export const socialShareConfig = {
  platforms: [
    {
      name: "Facebook",
      icon: "facebook",
      color: "#1877f2",
      shareUrl: "https://www.facebook.com/sharer/sharer.php?u=",
    },
    {
      name: "Twitter",
      icon: "twitter",
      color: "#1da1f2",
      shareUrl: "https://twitter.com/intent/tweet?url=",
    },
    {
      name: "WhatsApp",
      icon: "whatsapp",
      color: "#25d366",
      shareUrl: "https://wa.me/?text=",
    },
    {
      name: "Telegram",
      icon: "telegram",
      color: "#0088cc",
      shareUrl: "https://t.me/share/url?url=",
    },
  ],
}

export const errorMessages = {
  notFound: "Halaman yang Anda cari tidak dapat ditemukan.",
  serverError: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
  networkError: "Koneksi internet terputus. Periksa koneksi Anda dan coba lagi.",
  invalidInput: "Input yang Anda masukkan tidak valid.",
  unauthorized: "Anda tidak memiliki akses ke halaman ini.",
}
