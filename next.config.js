const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  i18n: {
    // locales: ["en", "ar", "es", "pt", "fr", "vn"],
    locales: ['en'],
    defaultLocale: 'en',
  },
  transpilePackages: ['mui-tel-input'],
  images: {
    domains: ['devnest.s3.amazonaws.com'],
  },
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
      },
    ];
  },
}

module.exports = withBundleAnalyzer(nextConfig)
