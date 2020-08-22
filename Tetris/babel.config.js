// babel.config.js

module.exports = {
    'presets': ['@babel/env'],
    'plugins': [["@babel/plugin-transform-runtime",
    {
      "regenerator": true
    }
  ]]
  }