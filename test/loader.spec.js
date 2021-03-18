const path = require('path');
const webpack = require('./helpers/compiler');

describe('Loader', () => {
  const config = {
    loader: {
      test: /[\\/]node_modules[\\/]lodash/
    },
    externals: ['lodash']
  };

  it('should transform imports for slashed imports', async () => {
    const stats = await webpack('with-slash.js', config);
    const {source} = stats.toJson().modules[1];

    expect(source).toMatchSnapshot();
  });

  it('should transform imports for slashed imports', async () => {
    const stats = await webpack('with-dot.js', config);
    const {source} = stats.toJson().modules[1];

    expect(source).toMatchSnapshot();
  });
});
