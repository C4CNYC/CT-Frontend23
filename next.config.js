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
}

module.exports = withBundleAnalyzer(nextConfig)
