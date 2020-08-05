module.exports = {
  mozjpeg: { progressive: true, quality: 70 },
  pngquant: { quality: [0.75, 0.5] },
  svgo: {
    plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
  },
  webp: { quality: 70 },
};
