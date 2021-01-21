import React from "react";
import { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Products = React.lazy(() => import("app1/App"));
// const CartRoutes = lazy(() => import("app2/routes"));
// const CheckoutRoutes = lazy(() => import("app3/routes"));

const Cart = React.lazy(() => import("app2/App"));
const Checkout = React.lazy(() => import("app3/App"));

export default () => (
	<Router>
		<React.Suspense fallback='loading all modules app4'>
			<Switch>
				<Route path='/' exact>
					<Products />
				</Route>
				<Route path='/cart' exact>
					<Cart />
				</Route>
				<Route path='/checkout' exact>
					<Checkout />
				</Route>
			</Switch>
		</React.Suspense>
	</Router>
);
