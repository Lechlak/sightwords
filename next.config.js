/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This enables static export mode
  distDir: 'out', // Specifies 'out' as the output directory for static files
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // Required to make pdfjs work
    return config;
  },
};

module.exports = nextConfig;
