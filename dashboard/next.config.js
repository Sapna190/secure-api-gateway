module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Add your allowed image domains here
  },
  env: {
    API_URL: process.env.API_URL, // Example of using environment variables
  },
};