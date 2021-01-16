const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const AutomaticVendorFederation = require("@module-federation/automatic-vendor-federation");
const webpack = require("webpack");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const packageJson = require("./package.json");
const exclude = ["babel", "plugin", "preset", "webpack", "loader", "serve"];
const ignoreVersion = ["react", "react-dom"];

const automaticVendorFederation = AutomaticVendorFederation({
	exclude,
	ignoreVersion,
	packageJson,
	shareFrom: ["dependencies", "peerDependencies"],
	ignorePatchVersion: false
});

const dotenv = require("dotenv").config({
	path: path.join(__dirname, ".env")
});

module.exports = {
	mode: "development",
	entry: "./src/index",
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	devServer: {
		contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "assets")],
		port: 3001,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers":
				"X-Requested-With, content-type, Authorization"
		},
		proxy: {
			"api.chec.io": {
				target: "https://api.chec.io/v1/products",
				secure: true
			}
		}
		// https: true,
		// stats: "errors-only",
		// overlay: true,
		// hot: true
	},
	output: {
		publicPath: "http://localhost:3001/"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				resolve: {
					extensions: [".js", ".jsx", ".ts", ".tsx"]
				},
				options: {
					presets: ["@babel/preset-react"]
				}
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000
						}
					}
				]
			}
		]
	},
	plugins: [
		new DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("development"),
			"process.env.REACT_APP_CHEC_PUBLIC_KEY": JSON.stringify("development")
		}),
		new ModuleFederationPlugin({
			name: "app1",
			library: { type: "var", name: "app1" },
			filename: "remoteEntry.js",
			exposes: {
				// expose each component
				"./App": "./src/App"
			},
			shared: {
				...automaticVendorFederation,
				react: {
					eager: true,
					singleton: true,
					requiredVersion: packageJson.dependencies.react
				},
				"react-dom": {
					eager: true,
					singleton: true,
					requiredVersion: packageJson.dependencies["react-dom"]
				}
			}
		}),
		new HtmlWebpackPlugin({
			template: "./public/index.html"
		}),
		new webpack.DefinePlugin({
			"process.env": dotenv.parsed
		})
	]
};