/**
 * 项目配置文件入库
 */

// path模块用于解析对应文件的绝对路径
const path = require('path');
const merge = require('webpack-merge');

// 配置localHost
let localHost = "http://localhost";
try {
  const localConf = require("../local.conf");
  if (localConf) {
    localHost = localConf;
  }
} catch (e) {
  console.log("");
  console.log("请在根目录添加：local.conf.js 本地信息配置，内容如下：");
  console.log('    module.exports = "http://[IP]";');
  console.log('其中[IP]为本机IP地址，以便手机访问，同时避免多人开发冲突。');
  console.log("");
}

module.exports = {

  // 生产环境构建配置
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  // 测试环境构建配置
  stage: {
    env: require('./stage.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  // 本地测试环境构建配置
  test: {
    env: require('./test.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },

  // 开发环境构建配置
  dev: {
    env: require('./dev.env'),
    port: 8000,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/baseUrl": {
        target: "http://192.168.0.26:8310",
        changeOrigin: true,
        pathRewrite: {
          '^/baseUrl': ''
        }
      },
      "/api": {
        target: "http://192.168.0.26:8310/api/v3",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      "/api/ua": {
        target: "http://192.168.0.26:8310/api/v3/ua",
        changeOrigin: true,
        pathRewrite: {
          '^/api/ua': ''
        }
      },
      "/api/wos": {
        target: "http://192.168.0.26:8310/api/v3/wos",
        changeOrigin: true,
        pathRewrite: {
          '^/api/wos': ''
        }
      },
      "/map": {
        target: "http://192.168.0.26:8310/api/v1",
        changeOrigin: true,
        pathRewrite: {
          '^/map': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  // 本地开发环境构建配置
  local: {
    env: require('./local.env'),
    port: 8000,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/baseUrl": {
        target: localHost + ":8310",
        changeOrigin: true,
        pathRewrite: {
          '^/baseUrl': ''
        }
      },
      "/api": {
        target: localHost + ":8310/api/v3",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      "/api/ua": {
        target: localHost + ":8310/api/v3/ua",
        changeOrigin: true,
        pathRewrite: {
          '^/api/ua': ''
        }
      },
      "/api/wos": {
        target: localHost + ":8310/api/v3/wos",
        changeOrigin: true,
        pathRewrite: {
          '^/api/wos': ''
        }
      },
      "/map": {
        target: localHost + ":8310/api/v1",
        changeOrigin: true,
        pathRewrite: {
          '^/map': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
