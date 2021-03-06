module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.dicebear.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/login',
        has: [
          {
            type: 'cookie',
            key: 'refreshToken',
          },
        ],
        permanent: false,
        destination: '/user/dashboard',
      },
      {
        source: '/register',
        has: [
          {
            type: 'cookie',
            key: 'refreshToken',
          },
        ],
        permanent: false,
        destination: '/user/dashboard',
      },
    ]
  },

}
