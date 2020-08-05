module.exports = {
  mozjpeg: { progressive: true, quality: 70 },
  pngquant: { quality: [0.65, 0.75] },
  svgo: {
    plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
  },
  webp: { quality: 70 },
};
