//配置具體的修改規則
const { override, fixBabelImports } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#61339e' },
      }
    }
  }),
);