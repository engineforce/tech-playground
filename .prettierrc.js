module.exports = {
  tabWidth: 2,
  printWidth: 80,
  trailingComma: 'es5',
  arrowParens: 'always',
  singleQuote: true,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 300,
      },
    },
    //   {
    //     files: '*.js',
    //     options: {
    //       trailingComma: 'none',
    //     },
    //   },
  ],
};
