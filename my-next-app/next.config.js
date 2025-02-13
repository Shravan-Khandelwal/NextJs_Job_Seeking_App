/** @type {import('next').NextConfig} */
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.plugins.push(new CaseSensitivePathsPlugin());
    return config;
  },
};

module.exports = nextConfig;
