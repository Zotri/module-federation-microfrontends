# Micro front-end implementation using Webpack 5 Module Federation

This example shows how you can create a component library application that exposes components for other apps to use.

For more information, visit the article [explaining this project](https://blog.bitsrc.io/revolutionizing-micro-frontends-with-webpack-5-module-federation-and-bit-99ff81ceb0)

- `app1`, `app2` and `app3` are standalone applications that exposes its App file for reuse.
- `app4` is the master Application that consumes both `app1`, `app2` and `app3` combined together.

## Running E-Commerce App Demo

Run `npm install` and `npm start` inside each module respectively. This will build and serve your apps on ports 3001, 3002, 3003 and 3004

- [localhost:3001](http://localhost:3001/)
- [localhost:3002](http://localhost:3002/)
- [localhost:3003](http://localhost:3003/)
- [localhost:3004](http://localhost:3004/)
