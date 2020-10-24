import { VueLoaderPlugin } from 'vue-loader';

module.exports = {
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          // это применяется к `<template lang="pug">` в компонентах Vue
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // это применяется к импортам pug внутри JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader'],
          },
        ],
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
