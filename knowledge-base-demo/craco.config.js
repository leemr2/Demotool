module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "zlib": require.resolve("browserify-zlib"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "url": require.resolve("url"),
          "assert": require.resolve("assert/"),
          "stream": require.resolve("stream-browserify"),
          "fs": false
        }
      }
    }
  }
}; 