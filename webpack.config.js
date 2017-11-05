module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'EntryPoint'
  }
};