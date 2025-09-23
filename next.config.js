/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações para PWA
  images: {
    unoptimized: true, // Desabilita otimização de imagens para evitar erros de conexão
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
