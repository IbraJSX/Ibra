/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Reemplaza '<repository-name>' con el nombre de tu repositorio de GitHub
  basePath: process.env.NODE_ENV === 'production' ? '/Portafolio/' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portafolio/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;