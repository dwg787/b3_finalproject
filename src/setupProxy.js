const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://tong.visitkorea.or.kr',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    }),
  );
};
