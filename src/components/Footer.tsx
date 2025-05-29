export default function Footer() {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-4">Tentang DongPlay</h3>
            <p className="text-gray-600">
              DongPlay adalah platform streaming donghua dengan subtitle Indonesia terlengkap.
              Nikmati berbagai judul donghua terbaru dan terpopuler dengan kualitas terbaik.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-black">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/donghua" className="text-gray-600 hover:text-black">
                  Donghua
                </a>
              </li>
              <li>
                <a href="/jadwal" className="text-gray-600 hover:text-black">
                  Jadwal Rilis
                </a>
              </li>
              <li>
                <a href="/bookmark" className="text-gray-600 hover:text-black">
                  Bookmark
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:info@dongplay.com" 
                  className="text-gray-600 hover:text-black"
                >
                  info@dongplay.com
                </a>
              </li>
              <li className="text-gray-600">
                Jam Operasional: 24/7
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} DongPlay. Semua hak cipta dilindungi.
          </p>
          <div className="mt-4 space-x-4">
            <a href="/privacy" className="text-gray-600 hover:text-black">
              Kebijakan Privasi
            </a>
            <a href="/terms" className="text-gray-600 hover:text-black">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
