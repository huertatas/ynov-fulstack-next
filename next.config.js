module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
