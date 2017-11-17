/**
 * 用于生存环境的构建脚本
 */
require('./check-versions')();

process.env.NODE_ENV = 'stage';

let ora = require('ora');
let rm = require('rimraf');
let path = require('path');
let chalk = require('chalk');
let webpack = require('webpack');
let config = require('../config');

// 引入 webpack 生成环境配置文件
let webpackConfig = require('./webpack.stage.conf');

let spinner = ora('正在为仿真测试环境构建资源...');
spinner.start();

// 先清除/dist/static目录
rm(path.join(config.stage.assetsRoot, config.stage.assetsSubDirectory), err => {
  if (err) throw err;

  // webpack 执行构建任务
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;

    // 输出状态信息
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n');

    console.log(chalk.cyan('  构建完毕.\n'));

    console.log(chalk.yellow(
      '  提示: 构建的文件只能在服务器上运行访问，\n' +
      '  不能在本地浏览器直接打开 index.html。\n'
    ))
  })
});
