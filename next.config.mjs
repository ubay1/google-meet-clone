/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // reactStrictMode ini hanya running di dev, jika true useEffect render 2x
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.dog.ceo",
        port: "",
      },
    ],
  },
};

export default nextConfig;
