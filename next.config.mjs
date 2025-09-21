/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

// export default nextConfig;
export default withNextIntl(nextConfig);
