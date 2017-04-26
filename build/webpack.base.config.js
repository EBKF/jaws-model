import path from 'path';

export default {
  entry: {
    library: './src/JawsModel.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
};
