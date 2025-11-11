const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  transpilePackages: ['mui-tel-input'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'devnest.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  async headers() {
    return [
      {
        source: '/fonts/:font*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // Cache for 1 year, immutable
          },
        ],
      },{
        source: '/assets/js/service-worker.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      }
    ];
  },
}

module.exports = withBundleAnalyzer(nextConfig)
