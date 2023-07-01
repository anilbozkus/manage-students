/** @type {import('next').NextConfig} */
const nextConfig = {
    
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true,
        },
      ]
    },
    
    images: {
      domains: ['robohash.org'],
    },
  }

module.exports = nextConfig
