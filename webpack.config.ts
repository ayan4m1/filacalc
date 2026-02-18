import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import autoprefixer from 'autoprefixer';
import HtmlPlugin from 'html-webpack-plugin';
import { Configuration, WebpackPluginInstance } from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CnameWebpackPlugin from 'cname-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin as CleanPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import 'webpack-dev-server';

const dev = process.env.NODE_ENV === 'development';
const analyzeBundle = process.env.BUNDLE_ANALYZE === 'true';

const plugins: WebpackPluginInstance[] = [
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

const config: Configuration = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'eval-cheap-module-source-map' : false,
  entry: './src/index.tsx',
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
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
    path: resolve(dirname(fileURLToPath(import.meta.url)), 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    modules: ['node_modules', 'src']
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
  },
  ignoreWarnings: [/@import rules/]
};

export default config;
