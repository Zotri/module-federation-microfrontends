import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import Products from "./components/Products";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//"/Users/motri/react_project/bit-module-federation-microfrontend/app1/components/Products.jsx"

const App = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({
		line_items: [],
		subtotal: {
			formatted_with_symbol: ""
		}
	});

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();
		console.log("msg from mf-01");
		setProducts(data);
	};

	const handleCartClick = async (producId, quantity) => {
		const { cart } = await commerce.cart.add(producId, quantity);

		setCart(cart);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	console.log("- - - cart - - -", cart);
	console.log("- - - products api commerce - - -", products);
	return (
		<Router>
			<div>
				<h1>Module Federation 1 - app1</h1>
				<br />
				<NavBar totalItems={cart.total_items} />
				<Switch>
					<Route exact path='/'>
						<Products products={products} onCartClick={handleCartClick} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
