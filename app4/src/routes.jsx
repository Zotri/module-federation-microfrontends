import React from "react";
import { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Products = React.lazy(() => import("app1/App"));
//const ProductsRoutes = lazy(() => import("app1/routes"));
const CartRoutes = lazy(() => import("app2/routes"));
const CheckoutRoutes = lazy(() => import("app3/routes"));

export default () => (
	<Router>
		<React.Suspense fallback='loading all modules app4'>
			<Switch>
				<Route path='/' exact>
					<Products />
				</Route>
				<Route path='/cart' exact>
					<CartRoutes />
				</Route>
				<Route path='/checkout' exact>
					<CheckoutRoutes />
				</Route>
			</Switch>
		</React.Suspense>
	</Router>
);
