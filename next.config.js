/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "img.clerk.com",
      "i.pinimg.com",
    ],
  },
};

module.exports = nextConfig;
