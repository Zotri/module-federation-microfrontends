import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import Products from "./components/Products";
import NavBar from "./components/navBar/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
		console.log("msg from app1");
		setProducts(data);
	};

	const handleCartClick = async (producId, quantity) => {
		const { cart } = await commerce.cart.add(producId, quantity);

		setCart(cart);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	console.log("- - - cart app1- - -", cart);
	console.log("- - - products api commerce app1- - -", products);
	return (
		<>
			<Router>
				<div>
					<NavBar totalItems={cart.total_items} />
					<Route exact path='/'>
						<Products products={products} onCartClick={handleCartClick} />
					</Route>
				</div>
				<h4>Module Federation 1 - app1 &#128151;</h4>
			</Router>
		</>
	);
};

export default App;
