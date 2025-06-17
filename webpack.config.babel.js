import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import HtmlPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CnameWebpackPlugin from 'cname-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const dev = process.env.NODE_ENV === 'development';
const analyzeBundle = process.env.BUNDLE_ANALYZE === 'true';

const plugins = [
  new CleanPlugin(),
  new HtmlPlugin({
    template: './src/index.html'
  }),
  new MiniCssExtractPlugin(),
  new CnameWebpackPlugin({ domain: 'filacalc.andrewdelisa.com' })
];

if (dev) {
  plugins.push(
    new StylelintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.scss',
      failOnError: true,
      quiet: false
    }),
    new ESLintPlugin({
      configType: 'flat'
    })
  );
}

if (analyzeBundle) {
  plugins.push(new BundleAnalyzerPlugin());
}

export default {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-cheap-module-source-map' : false,
  entry: './src/index.js',
  devServer: {
    compress: dev,
    open: true,
    historyApiFallback: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [autoprefixer, postcssFlexbugsFixes]
              },
              sourceMap: dev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['svg-url-loader']
      }
    ]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
    alias: {
      components: resolve(__dirname, 'src/components'),
      utils: resolve(__dirname, 'src/utils')
    }
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react(-router)?(-dom)?[\\/]/,
          reuseExistingChunk: false,
          chunks: 'all'
        },
        spools: {
          test: /[\\/]node_modules[\\/](react-color|react-datepicker|tinycolor2)[\\/]/,
          reuseExistingChunk: false,
          chunks: 'all'
        }
      }
    }
  }
};
