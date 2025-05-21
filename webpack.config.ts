import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin"

type EnvVariables = {
  mode: "development" | "production";
}

module.exports = (env: EnvVariables) => {
  const isDev = env.mode === "development"

  const config: webpack.Configuration = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    mode: env.mode ?? "development",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      !isDev && new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8]css",
        chunkFilename: "css/[name].[contenthash:8]css",
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg)$/,
          exclude: /node_modules/,
          use: ["file-loader"]
        }, 
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    icon: true,
                    svgoConfig: {
                      plugins: [
                        {
                          name: "convertColors",
                          params: {
                            currentColor: true,
                          }
                        }
                      ]
                    }
                  }
                }
              ],
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "style-loader" :MiniCssExtractPlugin.loader,
            "css-loader"
          ],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        "@": path.resolve(__dirname, "src"),
      }
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev ? {
      port: 3100,
      open: true,
    } : undefined,
  }

  return config;
};