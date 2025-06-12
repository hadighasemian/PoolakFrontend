/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['back.poolak.salam-raya.ir'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/splash',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig