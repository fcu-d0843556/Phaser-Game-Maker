//配置具體的修改規則
const { override, fixBabelImports,overrideDevServer } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');

const addDevServerConfig = () => (config) => {
  config.static.watch.ignored = ['**/public', "/^(?!E:\/FCU\/Phaser\x2dGame\x2dMaker\/src\/).+\/node_modules\//g"]
  // console.log(config);
  return config
} 

module.exports = {
  webpack:  override(
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
  ),
  devServer: overrideDevServer(
    addDevServerConfig(),
  )

}