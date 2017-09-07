module.exports = {
  "extends": "airbnb-base",
  "parser": "babel-eslint",
  "globals": {
    "Vue": true,
    "$": true,
    "$data": true,
    "wx": true,
    "FastClick": true,
    "pingpp": true,
    "ga": true,
    "_czc": true,
    "fundebug": true,
    "__wxjs_is_wkwebview": true,
  },
  env: {
    browser: true,
  },
  "plugins": [
    'html'
  ],
  "rules": {
    "global-require": 0,
    "indent": [0, "tab"], // 去掉tab约定,IDE会有问题
    "no-new": 0, // 避免vue 必须new调用的注释
    "no-console": 0,
    "no-trailing-spaces": [0, { "skipBlankLines": true }],// 去掉行未得空格
    "no-param-reassign": 0,
    "no-tabs": 0,
    "key-spacing": 0,
    "import/no-dynamic-require": 0,
    "no-shadow": 0,
    "no-underscore-dangle": ["error", { "allow": ["__wxjs_is_wkwebview"] }],
    "no-else-return": 0,
    "no-restricted-syntax": 0,
    "no-mixed-spaces-and-tabs": 0,
  }
};