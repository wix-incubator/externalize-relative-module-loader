module.exports = function (content) {
  const externalModule = extractModule(this.context);
  const actualModule = extractModule(this.resourcePath).replace(/.js$/, '');

  return `module.exports = require('${externalModule}').${actualModule}`;
};

function extractModule(path) {
  return path.split(/[\\/]/).pop();
}
