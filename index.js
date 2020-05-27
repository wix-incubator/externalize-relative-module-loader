const lodash = require('lodash');

// camelcase: camelCase
const lowerCaseToCamelCaseMap = Object.keys(lodash).reduce((map, key) => {
  map[key.toLowerCase()] = key;
  return map;
}, {});

module.exports = function(content) {
  let externalModule = extractModule(this.context);
  let actualModule;

  if (isDotted(externalModule)) {
    // 'lodash.camelcase'
    [externalModule, actualModule] = externalModule.split(/\./);
    actualModule = lowerCaseToCamelCaseMap[actualModule] || actualModule;
  } else {
    // 'lodash/camelCase'
    actualModule = extractModule(this.resourcePath).replace(/.js$/, '');
  }

  return `module.exports = require('${externalModule}').${actualModule}`;
};

function extractModule(path) {
  return path.split(/[\\/]/).pop();
}

function isDotted(externalModule) {
  return /\w+\.\w+/.test(externalModule);
}
