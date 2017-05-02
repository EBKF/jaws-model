import path from 'path';

export default {
  entry: {
    library: './src/Model.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
};
