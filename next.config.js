/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      encoding: false
    };
    return config;
  }
};

module.exports = nextConfig;
