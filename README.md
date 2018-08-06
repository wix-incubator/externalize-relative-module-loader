# externalize-relative-module-loader

This loader aims to solve cases where a library makes an import from a specific file:

```
import map from 'lodash/map';
```

and app (that uses that lib) strives to put this dependency in its [`externals`](https://webpack.js.org/configuration/externals/).

## Install

```
npm install --save externalize-relative-module-loader
```

## Usage

```js
module.exports = {
  module: {
    rules: [
      {
        test: path.resolve('node_modules/lodash'),
        use: {
          loader: 'externalize-relative-module-loader'
        }
      }
    ]
  }
}
```

## Assumptions

- Bundle is a library (usage of [`output.libraryTarget`](https://webpack.js.org/configuration/output/#output-librarytarget)).
- Dep is included in [`externals`](https://webpack.js.org/configuration/externals/).
- Dep has the same exported property like the name of the imported file (for instance, `map` is the intended property in `lodash/map`).
- Imported file is `.js` file - this one can be solved, PR is welcomed.
