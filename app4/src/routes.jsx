import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

const Products = React.lazy(() => import("app1/App"));
const Cart = React.lazy(() => import("app2/App"));
const Checkout = React.lazy(() => import("app3/App"));

class RoutingApp extends React.Component {
	render() {
		return (
			<Router>
				<React.Suspense fallback='loading all modules app4'>
					<Switch>
						<Route path='/' exact component={Products} />
						<Route path='/cart' exact component={Cart} />
						<Route path='/checkout' exact component={Checkout} />
					</Switch>
				</React.Suspense>
			</Router>
		);
	}
}

export default withRouter(RoutingApp);
