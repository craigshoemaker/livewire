module.exports = {
  devServer: {
    proxy: "http://localhost:7071",
  },
  configureWebpack: {
    devtool: "source-map",
  },
};
