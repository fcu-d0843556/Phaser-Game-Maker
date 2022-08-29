const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api1', //遇見api1前綴的請求，就會觸發該代理配置
    createProxyMiddleware({
      target: 'http://localhost:5000', //請求轉發給誰
      changeOrigin: true,              //控制服務器收到的請求頭中Host字段的值
      pathRewrite:{'^/api1':''}        //重寫請求路徑
    })
  );

};