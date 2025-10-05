import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['plus.unsplash.com','images.unsplash.com'],
  },
  
  // Optimasi untuk mengurangi penggunaan memory saat build
  experimental: {
    // Nonaktifkan worker threads untuk mengurangi overhead memory
    workerThreads: false,
    // Batasi jumlah CPU yang digunakan
    cpus: 1,
  },
  
  // Optimasi webpack untuk build yang lebih efisien
  webpack: (config, { isServer }) => {
    // Batasi parallel processing
    config.parallelism = 1;
    
    // Optimasi memory
    config.optimization = {
      ...config.optimization,
      minimize: true,
      // Batasi chunk size
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
        },
      },
    };
    
    return config;
  },
};

export default nextConfig;