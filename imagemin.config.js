module.exports = {
  mozjpeg: { progressive: true, quality: 10 },
  pngquant: { quality: [0.25, 0.5] },
  svgo: {
    plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
  },
  webp: { quality: 10 },
};
