/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

//module.exports = nextConfig;

/*
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
}*/

module.exports = {
  images: {
    loader: "custom",
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: "75",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",

    // If you do not want to use blurry placeholder images, then you can set
    // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
    // `placeholder="empty"` to all <ExportedImage> components.
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
    //const isStaticExport = true
    return {
      //'/': { page: '[network]', query: {network: "astar"} },
      '/': { page: '/', query: {} },
      '/wiki': { page:'/wiki'},
      '/shibuya': { page: isStaticExport?'[network]':'/shibuya' },
      '/shiden': { page: isStaticExport?'[network]':'/shiden' },
      '/astar': { page: isStaticExport?'[network]':'/astar' },
      '/lotto/shibuya': { page: isStaticExport?'/lotto/[network]':'/lotto/shibuya' },
      '/lotto/astar': { page: isStaticExport?'/lotto/[network]':'/lotto/astar' },
      '/lotto/astar.html': { page: isStaticExport?'/lotto/[network]':'/lotto/astar' },
      // Add more paths here
    };
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        // This is the asset module.
        type: 'asset/source',
      }
    )
    return config
  },
}