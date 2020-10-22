const path = require("path")

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    resolve: {
      alias: {
        "@a": path.resolve(__dirname, "src/api/"),
        "@p": path.resolve(__dirname, "src/pages/"),
        "@c": path.resolve(__dirname, "src/components/"),
        "@s": path.resolve(__dirname, "src/sass/")
      }
    }
  }
}
