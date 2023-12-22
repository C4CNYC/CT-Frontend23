const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
}

module.exports = withBundleAnalyzer(nextConfig)
