/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // the old /projects page now lives in the observatory chapter
    return [{ source: "/projects", destination: "/#observatory", permanent: false }];
  },
};

module.exports = nextConfig;
