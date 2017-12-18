const path = require('path');
const webpack = require('./helpers/compiler');

describe('Loader', () => {
  it('should transform imports', async () => {
    const config = {
      loader: {
        test: path.resolve('node_modules/lodash')
      },
      externals: ['lodash']
    };

    const stats = await webpack('lodash.js', config);
    const {source} = stats.toJson().modules[1];

    expect(source).toMatchSnapshot();
  });
});
