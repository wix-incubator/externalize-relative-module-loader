const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');

const modules = config => {
  return {
    rules: [{
      test: config.loader.test,
      use: {
        loader: path.resolve(__dirname, '../..')
      }
    }]
  };
};

module.exports = (fixture, config) => {
  config = {
    context: path.resolve(__dirname, '..', 'fixtures'),
    module: modules(config),
    entry: `./${fixture}`,
    externals: config.externals
  };

  compiler = webpack(config);

  compiler.outputFileSystem = new MemoryFS();

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) reject(err);

      resolve(stats);
    })
  );
}
