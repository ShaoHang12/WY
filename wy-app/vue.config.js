const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
    devServer: {
      proxy: {
        "/api": {
          // 匹配所有以 '/api'开头的请求路径
          target: "http://localhost:3000", // 代理目标的基础路径
          // changeOrigin: true,
          changOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },
      },
    },
  };
  