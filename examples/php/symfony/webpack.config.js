const Encore =  require('@symfony/webpack-encore');

Encore
  .setPublicPath('/')
  .setOutputPath('public/js')
  .addEntry('app', './assets/app.js')
  .enableVueLoader();

module.exports = Encore.getWebpackConfig();