const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  i18n: {
    // locales: ["en", "ar", "es", "pt", "fr", "vn"],
    locales: ["en"],
    defaultLocale: "en",
  },
  eslint: {
    // ESLint managed on the workspace level
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
  transpilePackages: ["mui-tel-input"],
  // experimental: {
  //   fallbackNodePolyfills: false
  // }
  // see https://github.com/react-icons/react-icons/issues/786
  // modularizeImports: {
  //   "react-icons/?(((\\w*)?/?)*)": {
  //     transform: "@react-icons/all-files/{{ matches.[1] }}/{{ member }}",
  //     skipDefaultConversion: true
  //   }
  // },
  // transpilePackages: ['react-icons', 'react-icons/ai','react-icons/bi','react-icons/bs','react-icons/cg','react-icons/ci','react-icons/di','react-icons/fa','react-icons/fa6','react-icons/fc','react-icons/fi','react-icons/gi','react-icons/go','react-icons/gr','react-icons/hi','react-icons/hi2','react-icons/im','react-icons/io','react-icons/io5','react-icons/lia','react-icons/lib','react-icons/lu','react-icons/md','react-icons/pi','react-icons/ri','react-icons/rx','react-icons/si','react-icons/sl','react-icons/tb','react-icons/tfi','react-icons/ti','react-icons/vsc','react-icons/wi'],
  // experimental: {
  //   optimizePackageImports: ['react-icons', 'react-icons/ai','react-icons/bi','react-icons/bs','react-icons/cg','react-icons/ci','react-icons/di','react-icons/fa','react-icons/fa6','react-icons/fc','react-icons/fi','react-icons/gi','react-icons/go','react-icons/gr','react-icons/hi','react-icons/hi2','react-icons/im','react-icons/io','react-icons/io5','react-icons/lia','react-icons/lib','react-icons/lu','react-icons/md','react-icons/pi','react-icons/ri','react-icons/rx','react-icons/si','react-icons/sl','react-icons/tb','react-icons/tfi','react-icons/ti','react-icons/vsc','react-icons/wi'],
  // },
}

module.exports = withBundleAnalyzer(nextConfig)



