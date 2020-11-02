// https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/buy-bay/' : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
        `,
      },
    },
  },

  devServer: {
    watchOptions: {
      clientLogLevel: 'warning',
    },
  },
};
