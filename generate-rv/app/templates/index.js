module.exports = {
  pkjConfig : {
    "name": "",
    "version": "0.0.1",
    "description": "",
    "main": "index.js",
    "scripts": {
      "dev": "cross-env ENV=development webpack-dev-server --config webpackConfig/dev.js",
      "build": "cross-env ENV=production node webpackConfig/build.js",
    },
    "author": "zyp",
    "license": "ISC",
    "dependencies": {
    
    },
    "devDependencies": {
      "file-loader": "^4.0.0",
      "url-loader": "^1.0.1",
      "babel-core": "^6.26.3",
      "babel-loader": "^7.1.4",
      "babel-preset-env": "^1.6.1",
      "babel-preset-stage-0": "^6.24.1",
      "cross-env": "^5.2.0",
      "css-loader": "^0.28.11",
      "cssnano": "^4.1.10",
      "jquery": "^3.4.1",
      "mini-css-extract-plugin": "^0.7.0",
      "node-sass": "^4.12.0",
      "optimize-css-assets-webpack-plugin": "^5.0.1",
      "sass-loader": "^7.1.0",
      "style-loader": "^0.23.1",
      "webpack-merge": "^4.2.1",
      "clean-webpack-plugin": "^2.0.2",
      "html-webpack-plugin": "^3.2.0",
      "webpack": "^4.6.0",
      "webpack-cli": "^3.3.2",
      "webpack-dev-server": "^3.7.1",
      "extract-text-webpack-plugin": "^4.0.0-beta.0"
    }
  }

}